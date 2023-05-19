---
title: "Client Adapter"
date: 2022-08-20 16:15:43
toc: true
categories:
- ["Ops","软件","Canal"]
---

## 基本说明

canal 1.1.1版本之后, 增加客户端数据落地的适配及启动功能, 目前支持功能:

- 客户端启动器
- 同步管理REST接口
- 日志适配器, 作为DEMO
- 关系型数据库的数据同步(表对表同步), ETL功能
- HBase的数据同步(表对表同步), ETL功能
- (后续支持) ElasticSearch多表数据同步,ETL功能



## 环境版本

- 操作系统：无要求
- java版本: jdk1.8 以上
- canal 版本: 请下载最新的安装包，本文以当前v1.1.1 的canal.deployer-1.1.1.tar.gz为例
- MySQL版本 ：5.7.18
- HBase版本: Apache HBase 1.1.2, 若和服务端版本不一致可自行替换客户端HBase依赖


## 一、适配器整体结构

client-adapter分为适配器和启动器两部分, 适配器为多个fat jar, 每个适配器会将自己所需的依赖打成一个包, 以SPI的方式让启动器动态加载, 目前所有支持的适配器都放置在plugin目录下

启动器为 SpringBoot 项目, 支持canal-client启动的同时提供相关REST管理接口, 运行目录结构为:

```
- bin
    restart.sh
    startup.bat
    startup.sh
    stop.sh
- lib
   ...
- plugin 
    client-adapter.logger-1.1.1-jar-with-dependencies.jar
    client-adapter.hbase-1.1.1-jar-with-dependencies.jar
    ...
- conf
    application.yml
    - hbase
        mytest_person2.yml
- logs
```

以上目录结构最终会打包成 canal-adapter-*.tar.gz 压缩包


## 二、适配器配置介绍


### 2.1 总配置文件 application.yml

#### adapter定义配置部分
```yaml
canal.conf:
  canalServerHost: 127.0.0.1:11111          # 对应单机模式下的canal server的ip:port
  zookeeperHosts: slave1:2181               # 对应集群模式下的zk地址, 如果配置了canalServerHost, 则以canalServerHost为准
  mqServers: slave1:6667 #or rocketmq       # kafka或rocketMQ地址, 与canalServerHost不能并存
  flatMessage: true                         # 扁平message开关, 是否以json字符串形式投递数据, 仅在kafka/rocketMQ模式下有效
  batchSize: 50                             # 每次获取数据的批大小, 单位为K
  syncBatchSize: 1000                       # 每次同步的批数量
  retries: 0                                # 重试次数, -1为无限重试
  timeout:                                  # 同步超时时间, 单位毫秒
  mode: tcp # kafka rocketMQ                # canal client的模式: tcp kafka rocketMQ
  srcDataSources:                           # 源数据库
    defaultDS:                              # 自定义名称
      url: jdbc:mysql://127.0.0.1:3306/mytest?useUnicode=true   # jdbc url 
      username: root                                            # jdbc 账号
      password: 121212                                          # jdbc 密码
  canalAdapters:                            # 适配器列表
  - instance: example                       # canal 实例名或者 MQ topic 名
    groups:                                 # 分组列表
    - groupId: g1                           # 分组id, 如果是MQ模式将用到该值
      outerAdapters:                        # 分组内适配器列表
      - name: logger                        # 日志打印适配器
......
```

说明:

1. 一份数据可以被多个group同时消费, 多个group之间会是一个并行执行, 一个group内部是一个串行执行多个outerAdapters, 比如例子中logger和hbase
2. 目前client adapter数据订阅的方式支持两种，直连canal server 或者 订阅kafka/RocketMQ的消息


### 2.2 使用远程配置(Mysql)

可以使用远程配置中心(Mysql，可扩展)作为统一配置管理


#### 2.1.1 创建mysql schema

```
CREATE SCHEMA `canal_manager` DEFAULT CHARACTER SET utf8mb4 ;
```


#### 2.1.2 初始化数据

使用manager_ddl.sql脚本建表并初始化Demo数据，其中canal_config表id=2的数据对应adapter下的application.yml文件，canal_adapter_config表对应每个adapter的子配置文件


#### 2.1.3 修改bootstrap.yml配置

```yaml
canal:
  manager:
    jdbc:
      url: jdbc:mysql://127.0.0.1:3306/canal_manager?useUnicode=true&characterEncoding=UTF-8
      username: root
      password: 121212
```

可以将本地application.yml文件和其他子配置文件删除或清空， 启动工程将自动从远程加载配置

修改mysql中的配置信息后会自动刷新到本地动态加载相应的实例或者应用


## 三、适配器启动

### 3.1 启动canal-adapter示例

#### 3.1.1 启动canal server (单机模式), 参考: [Canal QuickStart](https://github.com/alibaba/canal/wiki/QuickStart)

#### 3.1.2 修改conf/application.yml为:
```yaml
server:
  port: 8081
logging:
  level:
    com.alibaba.otter.canal.client.adapter.hbase: DEBUG
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    default-property-inclusion: non_null

canal.conf:
  canalServerHost: 127.0.0.1:11111
  batchSize: 500                            
  syncBatchSize: 1000                       
  retries: 0                               
  timeout:                                 
  mode: tcp 
  canalAdapters:                            
  - instance: example                       
    groups:                                 
    - groupId: g1                           
      outerAdapters:                        
      - name: logger
```


#### 3.1.3 启动

```
bin/startup.sh
```


### 3.2 adapter管理REST接口


#### 3.2.1 查询所有订阅同步的canal instance或MQ topic

```
curl http://127.0.0.1:8081/destinations
```


#### 3.2.2 数据同步开关

```
curl http://127.0.0.1:8081/syncSwitch/example/off -X PUT
```

针对 example 这个canal instance/MQ topic 进行开关操作. off代表关闭, instance/topic下的同步将阻塞或者断开连接不再接收数据, on代表开启

注: 如果在配置文件中配置了 zookeeperHosts 项, 则会使用分布式锁来控制HA中的数据同步开关, 如果是单机模式则使用本地锁来控制开关


#### 3.2.3 数据同步开关状态

```
curl http://127.0.0.1:8081/syncSwitch/example
```

查看指定 canal instance/MQ topic 的数据同步开关状态


#### 3.2.4 手动ETL

```
curl http://127.0.0.1:8081/etl/hbase/mytest_person2.yml -X POST -d "params=2018-10-21 00:00:00"
```

导入数据到指定类型的库, 如果params参数为空则全表导入, 参数对应的查询条件在配置中的etlCondition指定


#### 3.2.5 查看相关库总数据

```
curl http://127.0.0.1:8081/count/hbase/mytest_person2.yml
```


## 适配器列表


### logger适配器

```
最简单的处理, 将受到的变更事件通过日志打印的方式进行输出, 如配置所示, 只需要定义name: logger即可
...
      outerAdapters:                        
      - name: logger
```


### Hbase适配器

同步HBase配置 : [Sync-HBase](https://github.com/alibaba/canal/wiki/Sync-HBase)


### RDB适配器

同步关系型数据库配置 : [Sync-RDB](https://github.com/alibaba/canal/wiki/Sync-RDB)

目前内置支持的数据库列表:

1. MySQL
2. Oracle
3. PostgresSQL
4. SQLServer

使用了JDBC driver,理论上支持绝大部分的关系型数据库


### ES适配器

同步关ES配置 : [Sync-ES](https://github.com/alibaba/canal/wiki/Sync-ES)


### MongoDB适配器


### Redis适配器

