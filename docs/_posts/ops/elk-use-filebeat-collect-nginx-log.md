---
title: "使用 filebeat 收集日志"
date: 2022-08-19 21:51:54
toc: true
categories:
- ["Ops","软件","ELK"]
---

> 此文章是多年前学习安装 elk 时候的日志, 现在已经有了更好的解决方案, 并且费用也不高, 参考 
> 阿里云 : [日志服务sls_实时日志分析-阿里云](https://www.aliyun.com/product/sls)



## 安装
Elastic Stack 使用几个名为 *Beats 的轻量级数据发送器来收集各种来源的数据，并将它们传输到 Logstash 或 Elasticsearch。以下是目前 Elastic 提供的Beats：这里我们

- [Filebeat](https://www.elastic.co/products/beats/filebeat): 收集并发送日志文件.
- [Metricbeat](https://www.elastic.co/products/beats/metricbeat): 从您的系统和服务中收集指标.
- [Packetbeat](https://www.elastic.co/products/beats/packetbeat): 收集和分析网络数据
- [Winlogbeat](https://www.elastic.co/products/beats/winlogbeat): 收集Windows事件日志
- [Auditbeat](https://www.elastic.co/products/beats/auditbeat): 收集Linux 监控框架数据并监视文件完整性
- [Heartbeat](https://www.elastic.co/products/beats/heartbeat): 通过主动探测监控服务的可用性

在本教程中，我们将使用 Filebeat 将本地日志转发到我们的 Elastic Stack。<br />使用 `yum` 安装 filebeat:
```
$ sudo yum install filebeat
```

接下来，配置 Filebeat 以连接到 Elastic Search. 在这里，我们将修改 Filebeat 附带的示例配置文件<br />打开 Filebeat 配置文件
```
$ sudo vi /etc/filebeat/filebeat.yml
```
Filebeat 支持多种输出，但通常只将事件直接发送到 Elasticsearch 或 Logstash 以进行其他处理。在本教程中，我们将使用 Elasticsearch 对 Filebeat 收集的数据执行其他处理。Filebeat 需要直接向 Elasticsearc 发送数据，所以让我们启用该输出。为此，请找到 `output.elasticsearch` 部分并保证此部分不会被 `#` 注释
```
...
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["localhost:9200"]
...
```
下面我们配置 filebeat 支持 nginx 日志的收集<br />现在可以使用 [Filebeat模块](https://www.elastic.co/guide/en/beats/filebeat/6.6/filebeat-modules.html#filebeat-modules)扩展 Filebeat 的功能。在本教程中，您将使用 [Nginx模块](https://www.elastic.co/guide/en/beats/filebeat/6.6/filebeat-module-nginx.html)，该模块收集和分析由 Nginx 生成的访问日志和错误日志。<br />让我们启用他
```
sudo filebeat modules enable nginx
```
您可以通过运行以下命令查看启用和禁用模块的列表：
```
sudo filebeat modules list
```
```
Enabled:
nginx

Disabled:
apache2
auditd
elasticsearch
haproxy
icinga
iis
kafka
kibana
logstash
mongodb
mysql
osquery
postgresql
redis
suricata
system
traefik
```
接下来我们需要初始化环境, 为日志的解析铺好路
```
$ sudo filebeat setup -e
```

默认情况下，Filebeat配置为使用syslog和授权日志的默认路径。在本教程中，需要增加配置中的内容为 nginx 的日志路径。你可以在 `/etc/filebeat/modules.d/nginx.yml` 配置文件中查看模块的参数。

```
vim /etc/filebeat/modules.d/nginx.yml
```

```yaml
- module: nginx
  # Access logs
  access:
    enabled: true

    # Set custom paths for the log files. If left empty,
    # Filebeat will choose the paths depending on your OS.
    var.paths:
        - /webdata/logs/*_access.log

  # Error logs
  error:
    enabled: true

    # Set custom paths for the log files. If left empty,
    # Filebeat will choose the paths depending on your OS.
    var.paths:
        - /webdata/logs/*_error.log
```
配置完成后需要检测下配置文件是否正确
```
$ sudo filebeat test config
```

如果在这一步启动的话并不会成功,因为 需要 Elasticsearch 支持nginx 的文件解析还需要两个插件, 这里需要安装这两个插件

```
$ sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-user-agent
$ sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install ingest-geoip
```
下面我们启动 filebeat
```
$ sudo systemctl start filebeat
```
以下便是运行效果<br />![image.png](https://file.wulicode.com/yuque/202208/19/22/1011FunqjVRW.png?x-oss-process=image/resize,h_541)

## filebeat nginx 模块的自定义字段

### 说明
filebeat 提供了多种 Module 预制模块，简化了各种日志的格式化, 但是默认的字段并不能满足实际需求, 例如我们需要记录额外的 Nginx 字段<br />例如 请求时间、后端响应时间、主机头等信息<br />那么在filebeat的nginx module中需要同步定义<br />Nginx 的模块位置在 `/usr/share/filebeat/module/nginx`, 下边是目录结构.<br />**目录结构**
```
├── access
│   ├── config
│   │   └── nginx-access.yml
│   ├── ingest
│   │   └── default.json       # 默认的解析字段
│   ├── machine_learning
│   │   └── ....json
│   └── manifest.yml
└── module.yml
```
**默认的解析模块**<br />这里我们需要修改的是 patterns 中的数据, 注意这里是经过 json 转义的.
```json
{
    "description": "Pipeline for parsing Nginx access logs. Requires the geoip and user_agent plugins.",
    "processors": [
        {
            "grok": {
                "field": "message",
                "patterns": [
                    "\"?%{IP_LIST:nginx.access.remote_ip_list} - %{DATA:user.name} \\[%{HTTPDATE:nginx.access.time}\\] \"%{GREEDYDATA:nginx.access.info}\" %{NUMBER:http.response.status_code:long} %{NUMBER:http.response.body.bytes:long} \"%{DATA:http.request.referrer}\" \"%{DATA:user_agent.original}\""
                ],
                "pattern_definitions": {
                    "IP_LIST": "%{IP}(\"?,?\\s*%{IP})*"
                },
                "ignore_missing": true
            }
        },
    ]
}
```

### 更改 nginx 日志的格式
**之前**
```nginx
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" ';
```
**之后**
```nginx
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      '"$host" $request_time $upstream_response_time';
```
这里我们增加了三个字段
```
192.168.1.112 - - [25/Apr/2019:18:22:01 +0800] "GET /help/show/20 HTTP/1.1" 200 7474 "http://t.dailian.iliexiang.com/help?cat_id=2" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36" "-" "t.dailian.iliexiang.com" 0.063 0.021
```

### 更新 Patterns
> 支持的 Patterns [grok-patterns](https://github.com/elastic/logstash/blob/v1.4.2/patterns/grok-patterns)

```
vim /usr/share/filebeat/module/nginx/access/ingest/default.json
```
**之前**
```
"\"?%{IP_LIST:nginx.access.remote_ip_list} - %{DATA:user.name} \\[%{HTTPDATE:nginx.access.time}\\] \"%{GREEDYDATA:nginx.access.info}\" %{NUMBER:http.response.status_code:long} %{NUMBER:http.response.body.bytes:long} \"%{DATA:http.request.referrer}\" \"%{DATA:user_agent.original}\""
```
**之后**
```
"?%{IP_LIST:nginx.access.remote_ip_list} - %{DATA:user.name} \[%{HTTPDATE:nginx.access.time}\] \"%{GREEDYDATA:nginx.access.info}\" %{NUMBER:http.response.status_code:long} %{NUMBER:http.response.body.bytes:long} "%{DATA:http.request.referrer}" \"%{DATA:user_agent.original}\" \"%{DATA:nginx.access.x_forwarded_for}\" \"%{DATA:nginx.access.host}\" %{NUMBER:nginx.access.request_time:float} %{NUMBER:nginx.access.upstream_response_time:float}
```
调试工具: 使用 kibana 的Debuger
```
http://192.168.1.21:5601/app/kibana#/dev_tools/grokdebugger?_g=()
```
这里需要填写自定义的 Patterns , 否则无法识别<br />**Custom Patterns**
```
IP_LIST %{IP}(\"?,?\\s*%{IP})*
```

#### 更新 Fields
编辑字段
```
vim /etc/filebeat/fields.yml
```
在文件 `/etc/filebeat/fields.yml`, 找到 `nginx` 字段, 添加以上的三个字段
```
            - name: host
              type: group
              description: >
                Server hostname.
            - name: request_time
              type: group
              description: >
                Url Request Time
            - name: upstream_response_time
              type: group
              description: >
                Upstream Response Time.
```

#### 让新修改的文件生效
先检查配置文件是否正确
```shell
# filebeat test config
```
```shell
# systemctl restart filebeat
```
```graphql
# 获取所有的 pipeline
GET _ingest/pipeline

DELETE _ingest/pipeline/filebeat-7.0.0-nginx-access-default
```

#### 模拟请求 pattern
```
POST _ingest/pipeline/filebeat-6.6.1-nginx-access-default/_simulate
{
  "docs":[
    {
      "_source": {
        "message": "10.10.10.10 - - [17/Oct/2017:03:48:00 +0200] \"GET /my_page/40 HTTP/1.1\" 200 75793 \"-\" \"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)\" 0.277"
      }
    }
  ]
}
```

