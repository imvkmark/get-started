---
description: '在CentOS 7上安装ElasticSearch和Kibana：先导入GPG密钥并配置yum源，安装elasticsearch后启动服务；再安装kibana，设置监听的网络地址（需与ElasticSearch监听地址一致），启动服务。注意初始化节点可能遇到状态未恢复错误。'
lastUpdated: '2026-07-02 12:17:51'
head:
  - - meta
    - name: 'og:title'
      content: '在 CentOS 7 上安装 ElasticSearch 和 Kibana'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在CentOS 7上安装ElasticSearch和Kibana：先导入GPG密钥并配置yum源，安装elasticsearch后启动服务；再安装kibana，设置监听的网络地址（需与ElasticSearch监听地址一致），启动服务。注意初始化节点可能遇到状态未恢复错误。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/elastic-search/install-at-rhel.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/a6eaba14823d1f6043c2f8d297195b16.png'
---
# 在 CentOS 7 上安装 ElasticSearch 和 Kibana

Elasticsearch 是一个分布式的免费开源搜索和分析引擎，适用于包括文本、数字、地理空间、结构化和非结构化数据等在内的所有类型的数据。Elasticsearch 在 Apache Lucene 的基础上开发而成，由 Elasticsearch N.V.（即现在的 Elastic）于 2010 年首次发布。Elasticsearch 以其简单的 REST 风格 API、分布式特性、速度和可扩展性而闻名，是 Elastic Stack 的核心组件；

Elastic Stack 是一套适用于数据采集、扩充、存储、分析和可视化的免费开源工具。人们通常将 Elastic Stack 称为 ELK Stack（代指 Elasticsearch、Logstash 和 Kibana），目前 Elastic Stack 包括一系列丰富的轻量型数据采集代理，这些代理统称为 Beats，可用来向 Elasticsearch 发送数据。

## 1. 安装 ElasticsSearch

默认情况下，Elastic Stack 组件不能通过包管理器获得，但 yum 可以通过添加 Elastic 的包存储库来安装它们。

所有 Elastic Stack 的软件包都使用 Elasticsearch 签名密钥进行签名，以保护您的系统免受软件包欺骗。使用密钥进行身份验证的软件包将被包管理器视为可信的。在此步骤中，将导入 Elasticsearch 公共 GPG 密钥并添加 Elastic 存储库以安装 Elasticsearch。

**下载并且安装公共签名密钥**

```Plaintext
# rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
```

**安装 Rpm Repo**

在 `/etc/yum.repos.d/` 下创建 `elastic.repo`

```Plaintext
# vim /etc/yum.repos.d/elastic.repo
```

```Plaintext
[elastic-7.x]
name=Elastic repository for 7.x packages
baseurl=https://artifacts.elastic.co/packages/7.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

```Plaintext
# yum update
# yum install elasticsearch
```

安装的目录位置

```Plaintext
/usr/share/elasticsearch
```

完成 Elasticsearch 安装后，在编辑器中打开其主配置文件 `elasticsearch.yml`

> Elasticsearch的配置文件采用YAML格式，这意味着缩进非常重要！编辑此文件时，请确保不添加任何额外的空格, 并且不能使用 tab 缩进符, `:` 后必须存在空格

Elasticsearch 侦听来自端口 `9200` 上的任何流量。所以需要限制对 Elasticsearch 实例的外部访问，以防止外人通过 REST API 读取您的数据或关闭您的 Elasticsearch 集群。找到指定的行`network.host`，取消注释，并替换它的值为 : `192.168.1.21` (这里如果是内网访问, 可以替换成内网地址, 这样外部也无法进行访问) 如下所示: > 查看关于网络的更多说明 : [https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-network.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-network.html)

```Plaintext
# . . .
network.host: 192.168.1.21
# . . .

# 这里 7.x 需要打开
cluster.initial_master_nodes: ["node-1"]
# . . .

# Node 名称
node.name: node-1
```

保存并关闭 `elasticsearch.yml`。然后，使用 `systemctl` 命令启动 Elasticsearch 服务, 并且加入开机启动

```Plaintext
# systemctl enable elasticsearch
# systemctl start elasticsearch
```

你可以通过发送 HTTP 请求来测试你的 Elasticsearch 服务是否正在运行：

```Plaintext
$ curl "192.168.1.21:9200"
```

您将看到一个响应，显示有关本地节点的一些基本信息，类似于：

```JSON
{
  "name": "node-1",
  "cluster_name": "elasticsearch",
  "cluster_uuid": "YqPpV6ZVQ3uAl_b_wv0t5Q",
  "version": {
    "number": "7.17.5",
    "build_flavor": "default",
    "build_type": "rpm",
    "build_hash": "8d61b4f7ddf931f219e3745f295ed2bbc50c8e84",
    "build_date": "2022-06-23T21:57:28.736740635Z",
    "build_snapshot": false,
    "lucene_version": "8.11.1",
    "minimum_wire_compatibility_version": "6.8.0",
    "minimum_index_compatibility_version": "6.0.0-beta1"
  },
  "tagline": "You Know, for Search"
}
```

现在 Elasticsearch 已启动并运行，让我们安装 Kibana，它是 Elastic Stack 的下一个组件。

### 客户端连接

为了方便的管理, 我们需要一个客户端工具, 最近刚刚挖掘了一个宝藏

Elasticvue :

[https://elasticvue.com/](https://elasticvue.com/)

Elasticvue@ChromeStore :

[https://chrome.google.com/webstore/detail/elasticvue/hkedbapjpblbodpgbajblpnlpenaebaa](https://chrome.google.com/webstore/detail/elasticvue/hkedbapjpblbodpgbajblpnlpenaebaa)

![](https://file.wulicode.com/feishu-images/a6eaba14823d1f6043c2f8d297195b16.png)

### Tcp 连接 / Transport 模式

这个是Tcp 连接方式 : 官方支持文档查看 : [Networking | Elasticsearch Guide [7.17] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-network.html)范围开启 : 对于经过防火墙的端口过滤应该开启端口范围 `9300/9400`, 否则可能会出现 `transport client is closed`否则编辑 `etc/elasticsearch.yml`增加 transport 配置

```YAML
transport.port: 9300
```

## 2. 安装 Kibana仪表板

根据[官方文档中](https://www.elastic.co/guide/en/elastic-stack/current/installing-elastic-stack.html)的安装顺序，你应该在 Elasticsearch 之后安装 Kibana 作为下一个组件。设置 Kibana 后，我们能够使用其界面搜索并查看 Elasticsearch 存储的数据。

因为在上一步中添加了 Elastic 存储库，所以您可以使用 `yum` 安装 Elastic Stack 的其余组件：

```Plaintext
# yum install kibana
```

配置

```YAML
# 为了在我的局域网访问, 这里我填写的地址是
# To allow connections from remote users, set this parameter to a non-loopback 
address.server.host: "192.168.1.21"
# ...
# The URLs of the Elasticsearch instances to use for all your queries.
# 这里的主机地址和 elasticsearch 监听地址需要相同
elasticsearch.hosts: ["http://192.168.1.21:9200"]...
```

然后启用并启动Kibana服务：

```Plaintext
# systemctl enable kibana
# systemctl start kibana
```

由于主机不一定仅仅侦听 localhost 地址, 所以也可以使用局域网访问(可能是 7.0 加入的, 暂不可考), 如果 `server.host` 写入的是局域网, 便可使用局域网进行访问.

### Kibana 反向代理的设定

如果不侦听局域网地址我们需要配置反向代理

由于Kibana配置为仅侦听 `localhost` ，因此我们必须设置[反向代理](https://www.digitalocean.com/community/tutorials/digitalocean-community-glossary#reverse-proxy) 以允许外部访问它。我们将使用 Nginx 来实现此目的

首先，使用该 `openssl` 命令创建一个管理 Kibana 用户，您将使用该用户访问 Kibana Web 界面。例如，我们将为此帐户命名`kibanaadmin`，但为了确保更高的安全性，我们建议您为用户选择难以猜测的非标准名称。

以下命令将创建管理 Kibana 用户和密码，并将它们存储在 `htpasswd.users` 文件中。您将配置Nginx以要求此用户名和密码并立即读取此文件：

```Plaintext
echo "kibanaadmin:`openssl passwd -apr1`" | sudo tee -a /etc/nginx/htpasswd.users
```

在提示符下输入并确认密码。记住或记下此登录信息，因为需要用它来访问 Kibana Web界面。

接下来，我们将创建一个 Nginx 服务器块文件。例如，我们将此文件称为`example.com.conf`，尽管您可能会发现为您提供更具描述性的名称会很有帮助。例如，如果您为此服务器设置了 FQDN 和 DNS 记录，则可以在 FQDN 之后命名此文件：

```Plaintext
sudo vi /etc/nginx/conf.d/example.com.conf
```

将以下代码块添加到文件中，确保更新 `example.com` 并匹配服务器的 FQDN 或公共 IP 地址。此代码将 Nginx 配置为将服务器的 HTTP 流量定向到正在侦听的 Kibana 应用程序。此外，它配置 Nginx 以读取文件并需要基本身份验证。`www.example.com` `localhost:5601` `htpasswd.users`

example.com.conf > `/etc/nginx/conf.d/example.com.conf`

```Plaintext
server {
    listen 80;

    server_name example.com www.example.com;

    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/htpasswd.users;

    location / {
        proxy_pass http://localhost:5601;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

完成后，保存并关闭文件。

然后检查配置是否存在语法错误：

```Plaintext
sudo nginx -t
```

如果输出中报告了任何错误，请返回并仔细检查您在配置文件中放置的内容是否已正确添加。配置检测时候输出 `syntax is ok`再继续并重新启动 Nginx 服务：

```Plaintext
sudo systemctl restart nginx
```

现在可以通过您的FQDN或 Elastic Stack 服务器的公共IP地址访问Kibana。您可以通过导航到以下地址并在出现提示时输入登录凭据来检查Kibana服务器的状态页面：

```Plaintext
http://{your_server_ip}/status
```

此状态页面显示有关服务器资源使用情况的信息，并列出已安装的插件

![](https://file.wulicode.com/feishu-images/ad88346c542e621afdfb3d992b74b5fa.png)

## FAQ

### 1. SERVICE_UNAVAILABLE/1/state not recovered

检查是否服务器配置的节点名称是否配置一致, 否则无法启动, 状态异常

```Plaintext
# 初始化节点
cluster.initial_master_nodes: ["node-1"]

# Node 名称
node.name: node-1
```

## 附录

### 参考文章

- [How To Install Elasticsearch, Logstash, and Kibana (Elastic Stack) on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-centos-7#step-1-%E2%80%94-installing-and-configuring-elasticsearch)
- [A step-by-step guide to enabling security, TLS/SSL, and PKI authentication in Elasticsearch](https://alexmarquardt.com/2018/11/05/security-tls-ssl-pki-authentication-in-elasticsearch/)(如何启用安全设置)

---

::: info 📆

更新记录
2022-10-13
- 增加: tcp 连接时候 transport 模式通过防火墙时候的端口配置
2022-08-20
- 移除 : filebeat 使用说明
- 增加: 客户端连接工具

:::