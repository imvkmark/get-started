---
title: "Canal For ElasticSearch 适配器"
date: 2022-08-20 16:18:53
toc: true
categories:
- ["Ops","软件","Canal"]
---

canal 1.1.1版本之后, 内置增加客户端数据同步功能, Client适配器整体介绍: [ClientAdapter](https://github.com/alibaba/canal/wiki/ClientAdapter)<br />canal adapter 的 Elastic Search 版本支持6.x.x以上, 如需其它版本的es可替换依赖重新编译client-adapter.elasticsearch模块


## 1 修改启动器配置: application.yml
```yaml
canal.conf:
  canalServerHost: 127.0.0.1:11111
  batchSize: 500
  syncBatchSize: 1000
  retries: 0
  timeout:
  mode: tcp 
  srcDataSources:
    defaultDS:
      url: jdbc:mysql://127.0.0.1:3306/mytest?useUnicode=true
      username: root
      password: 121212
  canalAdapters:
  - instance: example 
    groups:
    - groupId: g1
      outerAdapters:
      - 
        key: exampleKey
        name: es7                           # or es7
        hosts: 127.0.0.1:9300               # es 集群地址, 逗号分隔
        properties:
          mode: transport # or rest         # 可指定transport模式或者rest模式
          # security.auth: test:123456      # only used for rest mode
          cluster.name: elasticsearch       # es cluster name
```

adapter将会自动加载 conf/es 下的所有.yml结尾的配置文件

## 2 适配器表映射文件
修改 conf/es/mytest_user.yml文件:
```yaml
dataSourceKey: defaultDS        # 源数据源的key, 对应上面配置的srcDataSources中的值
outerAdapterKey: exampleKey     # 对应application.yml中es配置的key 
destination: example            # cannal的instance或者MQ的topic
groupId:                        # 对应MQ模式下的groupId, 只会同步对应groupId的数据
esMapping:
  _index: mytest_user           # es 的索引名称
  _type: _doc                   # es 的type名称, es7下无需配置此项
  _id: _id                      # es 的_id, 如果不配置该项必须配置下面的pk项_id则会由es自动分配
#  pk: id                       # 如果不需要_id, 则需要指定一个属性为主键属性
  # sql映射
  sql: "select a.id as _id, a.name as _name, a.role_id as _role_id, b.role_name as _role_name,
        a.c_time as _c_time, c.labels as _labels from user a
        left join role b on b.id=a.role_id
        left join (select user_id, group_concat(label order by id desc separator ';') as labels from label
        group by user_id) c on c.user_id=a.id"
#  objFields:
#    _labels: array:;           # 数组或者对象属性, array:; 代表以;字段里面是以;分隔的
#    _obj: object               # json对象
  etlCondition: "where a.c_time>='{0}'"     # etl 的条件参数
  commitBatch: 3000                         # 提交批大小
```

sql映射说明:

sql支持多表关联自由组合, 但是有一定的限制:

1. 主表不能为子查询语句
2. 只能使用left outer join即最左表一定要是主表
3. 关联从表如果是子查询不能有多张表
4. 主sql中不能有where查询条件(从表子查询中可以有where条件但是不推荐, 可能会造成数据同步的不一致, 比如修改了where条件中的字段内容)
5. 关联条件只允许主外键的'='操作不能出现其他常量判断比如: on a.role_id=b.id and b.statues=1
6. 关联条件必须要有一个字段出现在主查询语句中比如: on a.role_id=b.id 其中的 a.role_id 或者 b.id 必须出现在主select语句中

Elastic Search的mapping 属性与sql的查询值将一一对应(不支持 select *), 比如: select a.id as _id, a.name, a.email as _email from user, 其中name将映射到es mapping的name field, _email将 映射到mapping的_email field, 这里以别名(如果有别名)作为最终的映射字段. 这里的_id可以填写到配置文件的 _id: _id映射.

### 2.1.单表映射索引示例sql:

```
select a.id as _id, a.name, a.role_id, a.c_time from user a
```

该sql对应的es mapping示例:

```json
{
    "mytest_user": {
        "mappings": {
            "_doc": {
                "properties": {
                    "name": {
                        "type": "text"
                    },
                    "role_id": {
                        "type": "long"
                    },
                    "c_time": {
                        "type": "date"
                    }
                }
            }
        }
    }
}
```


### 2.2.单表映射索引示例sql带函数或运算操作:

```sql
select a.id as _id, concat(a.name,'_test') as name, a.role_id+10000 as role_id, a.c_time from user a
```

函数字段后必须跟上别名, 该sql对应的es mapping示例:

```json
{
    "mytest_user": {
        "mappings": {
            "_doc": {
                "properties": {
                    "name": {
                        "type": "text"
                    },
                    "role_id": {
                        "type": "long"
                    },
                    "c_time": {
                        "type": "date"
                    }
                }
            }
        }
    }
}
```


### 2.3.多表映射(一对一, 多对一)索引示例sql:

```
select a.id as _id, a.name, a.role_id, b.role_name, a.c_time from user a 
left join role b on b.id = a.role_id
```

注:这里join操作只能是left outer join, 第一张表必须为主表!!<br />该sql对应的es mapping示例:
```json
{
    "mytest_user": {
        "mappings": {
            "_doc": {
                "properties": {
                    "name": {
                        "type": "text"
                    },
                    "role_id": {
                        "type": "long"
                    },
                    "role_name": {
                        "type": "text"
                    },
                    "c_time": {
                        "type": "date"
                    }
                }
            }
        }
    }
}
```

### 2.4.多表映射(一对多)索引示例sql:
```
select a.id as _id, a.name, a.role_id, c.labels, a.c_time from user a 
left join (select user_id, group_concat(label order by id desc separator ';') as labels from label
        group by user_id) c on c.user_id=a.id
```

注:left join 后的子查询只允许一张表, 即子查询中不能再包含子查询或者关联!!<br />该sql对应的es mapping示例:
```json
{
  "mytest_user": {
    "mappings": {
      "_doc": {
        "properties": {
          "name": {
            "type": "text"
          },
          "role_id": {
            "type": "long"
          },
          "c_time": {
            "type": "date"
          },
          "labels": {
            "type": "text"
          }
        }
      }
    }
  }
}
```


### 2.5.其它类型的sql示例:

- geo type

```
select ... concat(IFNULL(a.latitude, 0), ',', IFNULL(a.longitude, 0)) AS location, ...
```

- 复合主键

```
select concat(a.id,'_',b.type) as _id, ... from user a left join role b on b.id=a.role_id
```

- 数组字段

```
select a.id as _id, a.name, a.role_id, c.labels, a.c_time from user a 
left join (select user_id, group_concat(label order by id desc separator ';') as labels from label
        group by user_id) c on c.user_id=a.id
```

配置中使用:

```
objFields:
  labels: array:;
```

- 对象字段

```
select a.id as _id, a.name, a.role_id, c.labels, a.c_time, a.description from user a
```

配置中使用:

```
objFields:
  description: object
```

其中a.description字段内容为json字符串

- 父子文档索引

es/customer.yml

```yaml
# ......
esMapping:
  _index: customer
  _type: _doc
  _id: id
  relations:
    customer_order:
      name: customer
  sql: "select t.id, t.name, t.email from customer t"
```

es/order.yml

```yaml
esMapping:
  _index: customer
  _type: _doc
  _id: _id
  relations:
    customer_order:
      name: order
      parent: customer_id
  sql: "select concat('oid_', t.id) as _id,
        t.customer_id,
        t.id as order_id,
        t.serial_code as order_serial,
        t.c_time as order_time
        from biz_order t"
  skips:
    - customer_id
```

mapping示例:

```json
{
    "mappings":{
        "_doc":{
            "properties":{
                "id": {
                    "type": "long"
                },
                "name": {
                    "type": "text"
                },
                "email": {
                    "type": "text"
                },
                "order_id": {
                    "type": "long"
                },
                "order_serial": {
                    "type": "text"
                },
                "order_time": {
                    "type": "date"
                },
                "customer_order":{
                    "type":"join",
                    "relations":{
                        "customer":"order"
                    }
                }
            }
        }
    }
}
```


## 3 启动ES数据同步

### 启动canal-adapter启动器
```
bin/startup.sh
```

### 验证

1. 新增mysql mytest.user表的数据, 将会自动同步到es的mytest_user索引下面, 并会打出DML的log
2. 修改mysql mytest.role表的role_name, 将会自动同步es的mytest_user索引中的role_name数据
3. 新增或者修改mysql mytest.label表的label, 将会自动同步es的mytest_user索引中的labels数据

### 全量同步
```
$ curl localhost:8081/etl/es7/mytest_user.yml -X 'POST'
```
这里的端口号 默认是 `8081`, 可以配置 `adapter/application.yml` 文件进行更改<br />_application.yml_
```yaml
server:
  port: 8082
```

## FAQ

### None of the configured nodes are available
检查下 `es7`的 `properties` 的 `cluster.name ` 是否已经设置, 这里设置的值应当和ES 返回的 `cluster_name`一致<br />_curl 192.168.1.23:9200_
```json
{
    "name" : "node-1",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "YqPpV6ZVQ3uAl_b_wv0t5Q",
    "version" : {
        "number" : "7.17.6",
        "build_flavor" : "default",
        "build_type" : "rpm",
        "build_hash" : "f65e9d338dc1d07b642e14a27f338990148ee5b6",
        "build_date" : "2022-08-23T11:08:48.893373482Z",
        "build_snapshot" : false,
        "lucene_version" : "8.11.1",
        "minimum_wire_compatibility_version" : "6.8.0",
        "minimum_index_compatibility_version" : "6.0.0-beta1"
    },
    "tagline" : "You Know, for Search"
}
```

