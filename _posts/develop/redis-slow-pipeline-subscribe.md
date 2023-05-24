---
title: "[转] 高可用Redis(五)：瑞士军刀之慢查询，Pipeline和发布订阅"
date: 2021-06-26 10:22:08
toc: true
categories:
- ["开发","Redis"]
---

[高可用Redis(五)：瑞士军刀之慢查询，Pipeline和发布订阅](https://www.cnblogs.com/renpingsheng/p/9779926.html)





## 1.慢查询


### 1.1 慢查询的生命周期

```
步骤一：client通过网络向Redis发送一条命令
步骤二：由于Redis是单线程应用，可以把Redis想像成一个队列，client执行的所有命令都在排队等着server端执行
步骤三：Redis服务端按顺序执行命令
步骤四：server端把命令结果通过网络返回给client
```

说明：

```
慢查询发生在命令执行过程中，不包含网络延迟时间及排除等待执行的时间
客户端超时不一定慢查询，但慢查询是客户端超时的一个可能因素
```


### 1.2 慢查询的配置项

```
slowlog-max-len             慢查询队列的长度
slowlog-log-slower-than     慢查询阈值(单位：微秒)，执行时间超过阀值的命令会被加入慢查询命令
    如果设置为0，则会记录所有命令，通常在需要记录每条命令的执行时间时使用
    如果设置为小于0，则不记录任何命令
slowlog list                慢查询记录
```

说明：

```
慢查询是一个先进先出的队列，如果一条命令在执行过程中被列入慢查询范围内，就会被放入一个队列，这个队列是基于Redis的列表来实现
，而且这个队列是固定长度的，当队列的长度达到固定长度时，最先被放入队列就会被pop出去
慢查询队列保存在内存之中，不会做持久化，当Redis重启之后就会消失
```


### 1.3 慢查询配置方法


#### 1.3.1 修改配置文件重启

```
修改/etc/redis.conf配置文件，配置慢查询
修改配置方式应该在第一次配置Redis中时配置完成，生产后不建议修改配置文件
```


#### 1.3.2 动态配置

```
127.0.0.1:6379> config get slowlog-max-len
1) "slowlog-max-len"
2) "128"
127.0.0.1:6379> config get slowlog-log-slower-than
1) "slowlog-log-slower-than"
2) "10000"
127.0.0.1:6379> config set slowlog-max-len 1000
OK
127.0.0.1:6379> config get slowlog-max-len
1) "slowlog-max-len"
2) "1000"
127.0.0.1:6379> config set slowlog-log-slower-than 1000
OK
127.0.0.1:6379> config get slowlog-log-slower-than
1) "slowlog-log-slower-than"
2) "1000"
```


### 1.4 慢查询命令

```
slowlog get [n]         获取慢查询队列
slowlog len             获取慢查询队列长度
slowlog reset           清空慢查询队列
```


### 1.5 Redis慢查询运维经验

```
slowlog-max-len不要设置过小，通常设置1000左右
slowlog-log-slower-than不要设置过大，默认10ms，通常设置1ms
理解命令生命周期
可以通过slowlog get等命令定期将慢查询命令持久化到其他数据源，这样就可以查到很多历史的慢查询操作命令
在生产环境中，不管slowlog-max-len设置多大，当慢查询命令逐步增多时，最开始的慢查询命令会被丢掉
当需要查询历史数据时，这些慢查询命令都是非常关键的
可以使用开源软件来实现这些功能，对于分析解决Redis问题是非常有帮助的
```


## 2.Pipeline


### 2.1 Pipeline的概念

一次网络命令通信模型：

```
client通过网络传输命令到server端
server端通过计算得到命令执行结果
server端把命令执行结果给client
```

此时：

```
一次网络命令通信时间＝1次网络时间 + 1次命令时间
```

此时如果有多条命令呢，那就只能一条一条的输入命令执行了

```
n次时间 ＝ n次网络时间 + n次命令时间
```

Redis执行命令的时间很快，但是网络传输却可能有很大延迟，

pipeline就是把一批命令进行打包，然后传输给server端进行批量计算，然后按顺序将执行结果返回给client端

使用Pipeline模型进行n次网络通信需要的时间

```
1次pipeline(n条命令) ＝ 1次网络时间 + n次命令时间
```


### 2.2 例子

```
import redis
import time

client = redis.StrictRedis(host='192.168.81.100',port=6379)
start_time = time.time()

for i in range(10000):
    client.hset('hashkey','field%d' % i,'value%d' % i)

ctime = time.time()
print(client.hlen('hashkey'))
print(ctime - start_time)
```

程序执行结果：

```
10000
2.0011684894561768
```

在上面的例子里，直接向Redis中写入10000条hash记录，需要的时间为2.00秒

使用pipeline的方式向Redis中写入1万条hash记录

```
import redis
import time

client = redis.StrictRedis(host='192.168.81.100',port=6379)
start_time = time.time()

for i in range(100):
    pipeline = client.pipeline()
    j = i * 100
    while j < (i+ 1) * 100:
        pipeline.hset('hashkey1','field%d' % j * 100,'value%d' % i)
        j += 1
    pipeline.execute()

ctime = time.time()
print(client.hlen('hashkey1'))
print(ctime - start_time)
```

程序执行结果：

```
10000
0.3175079822540283
```

可以看到使用Pipeline方式每次向Redis服务端发送100条命令，发送100次所需要的时间仅为0.31秒，可以看到使用Pipeline可以节省网络传输时间


### 2.3 Pipeline使用建议

```
首先要注意每次pipeline携带数据量不能太大
pipeline可以提高Redis批量处理的并发的能力，但是并不能无节制的使用
如果批量执行的命令数量过大，则很容易对网络及客户端造成很大影响，此时可以把命令分割，每次发送少量的命令到服务端执行
pipeline每次只能作用在一个Redis节点上
```


## 3.发布订阅


### 3.1 发布订阅中的角色

```
发布者(publisher)
订阅者(subscriber)
频道(channel)
```


### 3.2 发布订阅的模型

```
Redis server就相当于频道
发布者是一个redis-cli，通过redis server发布消息
订阅者也是于一个redis-cli,如果订阅了这个频道，就可以通过redis server获取消息
```

说明：

```
发布订阅就是一个生产者消费者模型
每个订阅者可以订阅多个频道
发布者发布消息后，订阅者就可以收到不同频道的消息
订阅者不可以接收未订阅频道的消息
订阅者订阅某个频道后，Redis无法做消息的堆积，不能接收频道被订阅之前发布的消息
```


### 3.3 发布订阅的命令

```
publish channel message         发布消息
subscribe [channel]             订阅频道
unsubscribe [channel]           取消订阅
psubscribe [pattern...]         订阅指定模式的频道
punsubscribe [pattern...]       退订指定模式的频道
pubsub channels                 列出至少有一个订阅者的频道
pubsub numsub [channel...]      列表给定频道的订阅者数量
pubsub numpat                   列表被订阅模式的数量
```

例子:

打开一个终端1

```
127.0.0.1:6379> subscribe sohu_tv               # 订阅sohu_tv频道
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "sohu_tv"
3) (integer) 1
```

再次打开一个终端2

```
127.0.0.1:6379> publish sohu_tv 'hello python'      # sohu_tv频道发布消息
(integer) 1
127.0.0.1:6379> publish sohu_tv 'hello world'       # sohu_tv频道发布消息
(integer) 3
```

可以看到终端1中已经接收到sohu_tv发布的消息

```
127.0.0.1:6379> subscribe sohu_tv
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "sohu_tv"
3) (integer) 1
1) "message"
2) "sohu_tv"
3) "hello python"
1) "message"
2) "sohu_tv"
3) "hello world"
```

打开终端3，取消订阅sohu_tc频道

```
127.0.0.1:6379> unsubscribe sohu_tv
1) "unsubscribe"
2) "sohu_tv"
3) (integer) 0
```


### 3.4 发布订阅与消息队列

```
redis server维护一个队列
消息发布者，相当于一个redis-cli,通过redis server发布消息
消息订阅者就相当于一个redis-cli,所有的消息订阅者通过redis server抢消息发布者发布的消息
```

