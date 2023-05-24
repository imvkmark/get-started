---
title: "[转] 高可用Redis(一)：通用命令，数据结构和内部编码，单线程架构"
date: 2021-06-26 10:20:49
toc: true
categories:
- ["开发","Redis"]
---

原文地址 : [高可用Redis(一)：通用命令，数据结构和内部编码，单线程架构](https://www.cnblogs.com/renpingsheng/p/9773913.html)





## 1.通用API


### 1.1 keys命令和dbsize命令

```
keys *              遍历所有key
keys [pattern]      遍历模式下所有的key
dbsize              计算Redis中所有key的总数
```

例子：

```
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> set php good
OK
127.0.0.1:6379> set python best
OK
127.0.0.1:6379> keys *          # 查看Redis中所有的key
1) "hello"
2) "python"
3) "php"
127.0.0.1:6379> dbsize          # 查看Redis中key的总数
(integer) 3
127.0.0.1:6379> keys p*         # 查看Redis中以p开头的所有的key
1) "python"
2) "php"
127.0.0.1:6379> set perl aaa
OK
127.0.0.1:6379> set c++ bbb
OK
127.0.0.1:6379> keys p*          # 查看Redis中所有的key
1) "python"
2) "php"
3) "perl"
127.0.0.1:6379> dbsize          # 查看Redis中key的总数
(integer) 5
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3 k4 v4
OK
127.0.0.1:6379> dbsize          # 查看Redis中key的总数
(integer) 9
```

注意事项：

```
!.keys命令的时间复杂度为O(n)
2.在生产环境中，使用keys命令取出所有key并没有什么意义，而且Redis是单线程应用，如果Redis中存的key很多，使用keys命令会阻塞其他命令执行，所以keys命令一般不在生产环境中使用
3.dbsize命令的时间复杂度是O(1)
4.Redis内置一个计数器，可以实时更新Redis中key的总数，所以dbsize命令可以在线上使用
```


### 1.2 exists命令和del命令

```
exists key              判断一个key是否存在
del key [key...]        删除指定的key-value
```

例子：

```
127.0.0.1:6379> set k1 v1
OK
127.0.0.1:6379> set k2 v2
OK
127.0.0.1:6379> exists k1       # 判断k1是否存在
(integer) 1     
127.0.0.1:6379> exists k2       # 判断k2是否存在
(integer) 1
127.0.0.1:6379> del k1          # 删除k1这个键值对
(integer) 1
127.0.0.1:6379> exists k1       # 判断k1是否存在，0表示不存在 
(integer) 0
127.0.0.1:6379> exists k2       # 判断k2是否存在，1表示key存在
(integer) 1
127.0.0.1:6379> set a1 b1 
OK
127.0.0.1:6379> set a2 b2
OK
127.0.0.1:6379> del a1 a2       # 删除a1和a2键值对
(integer) 2
```

注意事项：

```
del命令和exists命令的时间复杂度为O(1)
```


### 1.3 expire命令，ttl命令和persist命令

```
expire key seconds      设置key的过期时间，多少seconds后过期
ttl key                 查看key剩余的过期时间
persist key             去掉key的过期时间
```

例子：

```
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> expire hello 20
(integer) 1             # 设置hello这个key的过期时间为20秒
127.0.0.1:6379> ttl hello
(integer) 17            # 还有17秒过期
127.0.0.1:6379> ttl hello
(integer) 11            # 还有11秒过期
127.0.0.1:6379> get hello
"world"
127.0.0.1:6379> ttl hello
(integer) 5             # 还有5秒过期
127.0.0.1:6379> ttl hello
(integer) -2            # -2表示key已经不存在了 
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> expire hello 20
(integer) 1             # 设置hello这个key的过期时间为20秒
127.0.0.1:6379> ttl hello
(integer) 15            # 还有15秒过期
127.0.0.1:6379> persist hello
(integer) 1             # 删除hello的过期时间
127.0.0.1:6379> ttl hello 
(integer) -1            # -1表示key存在，并且没有过期时间
127.0.0.1:6379> get hello
"world"
```

注意事项：

```
expire命令和ttl命令，persist命令的时间复杂度都是O(1)
```


### 1.4 type命令

```
type key        # 返回key的类型
```

例子：

```
127.0.0.1:6379> set a b
OK
127.0.0.1:6379> type a
string
127.0.0.1:6379> sadd myset 1 2 3
(integer) 3
127.0.0.1:6379> type myset
set
127.0.0.1:6379> type abc        # 查看一个不存在的key时，返回None，表示key不存在
none
```

注意事项：

```
type的返回结果有6种：string,hash,list,set,zset,none
type命令的时间复杂度为O(1)
```


## 2.数据结构和内部编码

Redis每种数据结构及对应的内部编码如下图所示

![](https://file.wulicode.com/yuque/202208/04/15/0008zh11wAnr.jpeg)


## 3.单线程架构

Redis内部使用单线程架构。

比如一条公路，这条公路只有一条车道。所有从这条车道上行驶的车，都必须按先来后到的顺序依次行驶

Redis一个瞬间只能执行一条命令，不能执行两条命令


### 3.1 Redis单线程为什么这么快

```
1.纯内存
Redis把所有的数据都保存在内存中，而内存的响应速度是非常快的

2.非阻塞IO
Redis使用epoll异步非阻塞模型
Redis自身实现了事件处理

3.避免线程切换和竞态消耗
在使用多线程编程中，线程之间的切换也会消耗一部分CPU资源，
如果不合理的实现多线程编程，可能比单线程还要慢
```

注意事项:

```
一次只运行一条命令
拒绝长(慢)命令
    keys 
    flushall
    flushdb
    slow lua script
    mutil/exec
    operate
```

