---
title: "Canal 快速入门"
date: 2022-08-20 16:07:26
toc: true
categories:
- ["Ops","软件","Canal"]
---

## 文档
这里为 Canal 这个优秀的工具的简单用法以及文档做下记录<br />已经备份的文档树如下<br />--[Canal 简介](https://wulicode.com/ops/canal-intro.html)<br />--[Deployer](https://wulicode.com/ops/canal-deployer.html)<br />--Client-Adapter <br />     -- [ElasticSearch 适配器](https://wulicode.com/ops/canal-client-sync-es.html)<br />本文主要描述一下功能<br />![image.png](https://file.wulicode.com/yuque/202212/08/23/1209lo4WJx2z.png?x-oss-process=image/resize,h_351)


## 准备

### 服务器配置和账号

-  对于自建 MySQL , 需要先开启 Binlog 写入功能，配置 binlog-format 为 ROW 模式，my.cnf 中配置如下 
```
[mysqld]
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
```
修改完成之后重启 mysql, 可以使用如下的命令检查是否开启 binlog
```sql
show variables like 'log_bin'; 
```

-  授权 canal 链接 MySQL 账号具有作为 MySQL slave 的权限, 如果已有账户可直接 grant 
```sql
CREATE USER canal IDENTIFIED BY 'canal*#06#';  
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
FLUSH PRIVILEGES;
```

### Java 运行环境
如果在项目中存在多个 Java 版本, 我们可以设置全局环境变量来让 canal 也可以在服务器上运行
```
export JAVA=/path/of/java
```
在后续的运行脚本中, 可以在启动文件中发现
```bash
## set java path
if [ -z "$JAVA" ] ; then
  JAVA=$(which java)
fi
```

## Deployer - Slave 伪装实例

### 下载
下载 canal, 访问 [release 页面](https://github.com/alibaba/canal/releases) , 选择需要的包下载, 如以 1.1.17 版本为例 
```shell
wget https://github.com/alibaba/canal/releases/download/canal-1.1.7-alpha-1/canal.deployer-1.1.7-SNAPSHOT.tar.gz
```
解压缩 
```
mkdir /tmp/canal
tar zxvf canal.deployer-$version.tar.gz  -C /tmp/canal
```
解压完成后，进入 /tmp/canal 目录，可以看到如下结构 
```
.
├── bin                 # 命令行
│   ├── restart.sh
│   ├── startup.sh
│   └── stop.sh
├── conf                # 配置文件
│   ├── canal.properties
│   ├── canal_local.properties
│   ├── example
│   │   └── instance.properties
│   ├── logback.xml
│   ├── metrics
│   └── spring
├── lib                 # 公共仓库
├── logs                # 日志
│   ├── canal
│   │   ├── canal.log
│   │   ├── canal_stdout.log
│   │   └── rocketmq_client.log
│   └── example         # 示例实例
│       ├── example.log
│       └── meta.log
└── plugin              # 插件
```

### 配置
`conf` 目录下的每一个文件夹便是一个单独的实例, 实例的配置文件是 `instance.properties`<br /> 配置文件位置可以查看 : [https://www.yuque.com/duoli/ops/canal-deployer](https://wulicode.com/ops/canal-deployer.html) 

#### 配置  - canal.properties
完整的配置文件查看上述链接, 这里取几个用到的进行下说明
```properties
# 开启 conf 目录下的自动扫描
canal.auto.scan = true
```

#### 配置 - instance.properties
```properties
# 配置主数据库的地址
canal.instance.master.address=127.0.0.1:3306

# 开启 tsdb 来缓存数据信息, 如果开启之后遇到异常情况可以删除实例下的 tsdb 缓存, 并重新启动 deployer
canal.instance.tsdb.enable=true

# 配置实例访问主服务器的账号密码
canal.instance.dbUsername=canal
canal.instance.dbPassword=canal*#06#
canal.instance.connectionCharset = UTF-8

# 配置同步数据库正则索引
canal.instance.filter.regex=wulicode_start\\.misc_canal
```

### 启动 & 关闭
启动  & 关闭
```
./bin/startup.sh  # 启动
./bin/stop.sh     # 关闭
```
查看 server 日志, 启动后首先查看日志, 如果有异常可以通过此文件进行配置纠错和协查, 同时也会存在 `logs/canal/canal_stdout.log` 文件来协助纠错
```
$ tail -20f logs/canal/canal.log
2013-02-05 22:45:27.967 [main] INFO  com.alibaba.otter.canal.deployer.CanalLauncher - ## start the canal server.
2013-02-05 22:45:28.113 [main] INFO  com.alibaba.otter.canal.deployer.CanalController - ## start the canal server[10.1.29.120:11111]
2013-02-05 22:45:28.210 [main] INFO  com.alibaba.otter.canal.deployer.CanalLauncher - ## the canal server is running now ......
```
查看 instance 的日志 
```
$ tail -20f logs/example/example.log
```

## Adapter - canal 增量监听器

### 下载
下载 canal, 访问 release 页面 , 选择需要的包下载, 如以 1.1.17 版本为例 
```
wget https://github.com/alibaba/canal/releases/download/canal-1.1.7-alpha-1/canal.adapter-1.1.7-SNAPSHOT.tar.gz
```
解压缩 
```
mkdir /tmp/adapter
tar zxvf canal.adapter-$version.tar.gz  -C /tmp/adapter
```
解压完成后，进入 /tmp/adapter 目录，可以看到如下结构
> 这个目录结构是经过调整过的, 如果和官方有差异, 以官方为准

```
.
├── bin                 # 命令行启动文件
│     ├── restart.sh
│     ├── startup.sh
│     └── stop.sh
├── conf                # 监听器目录
│     ├── META-INF
│     │     └── spring.factories
│     ├── application-example.yml
│     ├── application-local.yml
│     ├── application.yml
│     ├── bootstrap.yml
│     ├── es6
│     ├── es7
│     ├── hbase
│     ├── kudu
│     ├── logback.xml
│     ├── rdb
│     └── tablestore
├── lib                 # 框架文件
├── logs                # 日志文件
│     └── adapter
│         ├── adapter.log
│         └── rocketmq_client.log
└── plugin              # 插件
```

### 配置
**application.yml**<br />这里适用 spring 的配置文件环境变量配置, 对配置文件进行拆分, 参考 : [22. Profiles](https://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/html/boot-features-profiles.html#boot-features-profiles)
```yaml
spring:
  profiles:
    active: local
```
**application-local.yml**<br />以下是全部的配置, 这里把部分使用到的配置简单做下注释
```yaml
server:
  # 这里是 canal adapter 的对外服务(例如 es 的全量导入)的端口, 默认 8081
  # adapter 的管理的 rest 接口IP
  port: 8081                
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    default-property-inclusion: non_null

canal.conf:
  mode: tcp #tcp kafka rocketMQ rabbitMQ
  flatMessage: true
  zookeeperHosts:
  syncBatchSize: 1000
  retries: -1
  timeout:
  accessKey:
  secretKey:
  consumerProperties:
    # canal tcp consumer
    # 这里是和本机 deployer 进行通讯的端口
    canal.tcp.server.host: 127.0.0.1:11111
    canal.tcp.zookeeper.hosts:
    canal.tcp.batch.size: 500
    canal.tcp.username:
    canal.tcp.password:

    # kafka consumer
    kafka.bootstrap.servers: 127.0.0.1:9092
    kafka.enable.auto.commit: false
    kafka.auto.commit.interval.ms: 1000
    kafka.auto.offset.reset: latest
    kafka.request.timeout.ms: 40000
    kafka.session.timeout.ms: 30000
    kafka.isolation.level: read_committed
    kafka.max.poll.records: 1000

    # rocketMQ consumer
    rocketmq.namespace:
    rocketmq.namesrv.addr: 127.0.0.1:9876
    rocketmq.batch.size: 1000
    rocketmq.enable.message.trace: false
    rocketmq.customized.trace.topic:
    rocketmq.access.channel:
    rocketmq.subscribe.filter:

    # rabbitMQ consumer
    rabbitmq.host:
    rabbitmq.virtual.host:
    rabbitmq.username:
    rabbitmq.password:
    rabbitmq.resource.ownerId:

  # 数据源, yaml 对象格式
  srcDataSources:
    dsDuoliPoppy:
      url: jdbc:mysql://127.0.0.1:3306/wulicode_start?useUnicode=true&characterEncoding=utf8&autoReconnect=true&useSSL=false&zeroDateTimeBehavior=convertToNull
      username: canal
      password: canal*#06#
  
  # 适配器
  canalAdapters:
    - instance: example # canal instance Name or mq topic name
      groups:
        - groupId: g1
          outerAdapters:
            - name: logger
    - instance: duoli-misc_canal
      groups:
        - groupId: g1
          outerAdapters:
            - name: logger
            - name: es7
              hosts: 47.96.30.211:9300 # http://127.0.0.1:9200 for rest mode
              properties:
                mode: transport
                cluster.name: elasticsearch
```

### logger  - 日志监听器
适配器的类型, 对当前的实例开启日志实例<br />配置
```yaml
canal.conf:
  canalAdapters:
    - instance: example # canal instance Name
      groups:
        - groupId: g1
          outerAdapters:
            - name: logger
```
在数据运行之后我们查看 adapter 实例日志, 这里为了方便, 对日志进行了格式化
```
2022-10-16 08:00:06.845 [pool-5-thread-1] INFO  c.a.o.canal.client.adapter.logger.LoggerAdapterExample - DML: {
  "data":[{...}],
  "database":"example",
  "destination":"example",
  "es":1665878406000,
  "groupId":"g1",
  "isDdl":false,
  "old":[{...}],
  "pkNames":["id"],
  "sql":"",
  "table":"canal",
  "ts":1665878406845,
  "type":"UPDATE"
}
```

### es7 - es7 监听器

#### canal 配置
```yaml
canal.conf:
  canalAdapters:
    # canal 实例名称, 用以匹配实例进行增量消费
    - instance: duoli-misc_canal   
      groups:
        - groupId: g1
          outerAdapters:
            - name: es7
              hosts: 127.0.0.1:9300 # http://127.0.0.1:9200 for rest mode
              properties:
                mode: transport
                cluster.name: elasticsearch
```

#### canal - hosts
这里的hosts 支持两种模式的配置

- rest 模式

这里使用es 的 http 协议进行通讯, 使用 rest 模式向 es 服务器发送数据
```yaml
- name: es7
  hosts: 127.0.0.1:9200 # http://127.0.0.1:9200 for rest mode
  properties:
    mode: http
```

- transport 模式

这里使用 tcp 模式和 es 服务器进行通讯, 效率比 http 要好一些, 在配置 es 的过程中需要注意
```yaml
- name: es7
  hosts: 127.0.0.1:9300 
  properties:
    mode: transport
    cluster.name: elasticsearch
```

#### 配置 - es7/{file}.yml
es7 数据索引对应的配置, 修改相关配置之后需要重启 adapter
```yaml
# 数据源, 对应 canal 的数据源配置
dataSourceKey: dsDuoliPoppy

# 对应 canal 的实例名称
destination: duoli-misc_canal
groupId: g1

# es 映射
esMapping:
  # es - 索引名称
  _index: duoli-misc-canal
  _id: _id
  _type: _doc
  #  upsert: true
  #  pk: id
  sql: "select mc.id as _id, mc.id, mc.title, mc.price, mc.stock, mc.stock_at, mc.created_at from misc_canal as mc"
  objFields:
    property: object
  #    _labels: array:;
  #  etlCondition: "where "
  commitBatch: 500
```

### REST 模式

#### destinations - 查看所有订阅同步的 canal 的实例
```
$ curl http://127.0.0.1:8081/destinations
[{"destination":"example","status":"on"}]
```

#### syncSwitch/{instance} - 数据同步状态
```
$ curl http://127.0.0.1:8081/syncSwitch/example
{"stauts":"on"}
```

#### syncSwitch/{instance}/{off|on} - 数据同步开关
```
# 针对于这个实例开启/关闭数据同步
$ curl http://127.0.0.1:8081/syncSwitch/example/off -X PUT
$ curl http://127.0.0.1:8081/syncSwitch/example/on -X PUT
```

#### etl/{type}/{instance} - 数据全量同步
对数据进行全量同步
```
# 全量同步
$ curl http://127.0.0.1:8081/etl/es7/order.yml -X POST
# 带有参数的同步
$ curl http://127.0.0.1:8081/etl/es7/order.yml -X POST -d "params=1"
```

## QA

### java 版本不正确导致的错误
```
Java HotSpot(TM) 64-Bit Server VM warning: Ignoring option PermSize; support was removed in 8.0
Java HotSpot(TM) 64-Bit Server VM warning: Ignoring option MaxPermSize; support was removed in 8.0
Java HotSpot(TM) 64-Bit Server VM warning: Ignoring option UseConcMarkSweepGC; support was removed in 14.0
Java HotSpot(TM) 64-Bit Server VM warning: Ignoring option CMSParallelRemarkEnabled; support was removed in 14.0
Unrecognized VM option 'UseCMSCompactAtFullCollection'
Error: Could not create the Java Virtual Machine.
Error: A fatal exception has occurred. Program will exit.
```
这里可以修改 java 运行环境

### es7  - transport client is closed
> 参考文章 : [在 CentOS 7 上安装 ElasticSearch 和 Kibana](https://wulicode.com/ops/centos7-elk-install.html#Tcp-%E8%BF%9E%E6%8E%A5-x2F-Transport-%E6%A8%A1%E5%BC%8F)

这是 es7 / transport 模式会出现错误<br />可能原因 : 对于经过防火墙的端口过滤应该开启端口范围 9300/9400, 否则可能会出现 transport client is closed<br />否则编辑 `etc/elasticsearch.yml` 增加 transport 配置
```yaml
transport.port: 9300
```

### es7 - None of the configured nodes are available
这是因为没有匹配的 es 节点, 需要 es 服务器进行配置

### es7 - enum 导入匹配字段
表中字段为enum枚举类型，如`cancel_status` enum('none','ing','done','reject','force')，全量导入时没有问题，但是后续自动读取binlog时，数据表中为none时，es中数据会变成1，ing会变成2

###

