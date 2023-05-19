---
title: "[转] 高可用Redis(二)：字符串类型"
date: 2021-06-26 10:21:10
toc: true
categories:
- ["开发","Redis"]
---

[高可用Redis(二)：字符串类型](https://www.cnblogs.com/renpingsheng/p/9774352.html)



## 1.Redis字符串结构

对于Redis来说，所有的key都是字符串，其value可以是string,list,hash,set,zset

比如下面的

![](https://file.wulicode.com/yuque/202208/04/23/0301U5Xe65tV.jpeg)

键值对的value还可以更加复杂，比如可以是json格式，xml格式，序列化等

> 字符串类型的value的长度不能大于512MB。


在实际生产中，如果一个值保存成500MB的话，获取这个值的时候会占用很多的网络流量，其次读取的时候也会非常慢，这对于Redis这种单线程应用来说并不明智

> 在生产环境中，考虑到并发和网络流量的因素，value的大小建议在100KB以内


Redis字符串的使用场景：

```
缓存
计数器，比如视频网站中视频的播放次数统计等
分布式锁
```


## 2.Redis字符串相关命令


### 2.1 get命令，set命令和del命令

```
get key             获取key对应的value
set key value       设置key-value
del key             删除key-value
```

例子：

```
127.0.0.1:6379> set hello 'world'
OK
127.0.0.1:6379> get hello
"world"
127.0.0.1:6379> del hello
(integer) 1
127.0.0.1:6379> get hello
(nil)
```

注意事项：

```
get命令，set命令和del命令的时间复杂度都是O(1)
```


### 2.2 整型操作命令

```
incr key        key自增1，如果key不存在，自增后get(key) = 1
decr key        key自减1，如果key不存在，自减后get(key) = -1
incrby key k    key自增k,如果key不存在，自增后get(key) = k
decrby key k    key自减k,如果key不存在，自减后get(key) = -k
```

例子：

```
127.0.0.1:6379> get counter
(nil)
127.0.0.1:6379> incr counter
(integer) 1
127.0.0.1:6379> get counter
"1"
127.0.0.1:6379> incrby counter 99
(integer) 100
127.0.0.1:6379> get counter
"100"
127.0.0.1:6379> decr counter
(integer) 99
127.0.0.1:6379> get counter
"99"
127.0.0.1:6379> decrby counter 50
(integer) 49
127.0.0.1:6379> get counter
"49"
```

注意事项：

```
incr/decr命令和incrby/decrby命令时间复杂度为O(1)
Redis是天然适合做计数器的
Redis是单线程的，顺序执行，并发执行incr命令不会有竞争的问题，不会计错数
```

**_实战_**

记录网站每个用户的个人主页的访问量，可以使用如下命令

```
incr userid:pageview(单线程：无竞争)
```

说明：假如一个用户的id为123,初始pageview为0,别的用户每浏览一次123用户的主页，pageview自增1,这样每个用户id的访问量就进行了区分。


### 2.3 set命令和setnx命令

```
set key value           不管key是否存在，都进行设置
setnx key value         key不存在，才进行设置
set key value xx        key存在才设置
```

例子：

```
127.0.0.1:6379> exists python
(integer) 1
127.0.0.1:6379> del python
(integer) 1
127.0.0.1:6379> exists python
(integer) 0
127.0.0.1:6379> set python good
OK
127.0.0.1:6379> setnx python good
(integer) 0
127.0.0.1:6379> set python base xx
OK
127.0.0.1:6379> get python
"base"
127.0.0.1:6379> exists python
(integer) 1
127.0.0.1:6379> 
127.0.0.1:6379> 
127.0.0.1:6379> exists java
(integer) 0
127.0.0.1:6379> setnx java easy
(integer) 1
127.0.0.1:6379> set java aaa xx
OK
127.0.0.1:6379> get java
"aaa"
```

注意事项：

```
set命令和setnx命令的时间复杂度为O(1)
```


### 2.4 mget命令和mset命令

```
mget key1 key2 key3                         批量获取key,原子操作
mset key1 value1 key2 value2 key3 value3    批量设置key-value
```

例子：

```
127.0.0.1:6379> mset hello world python best php easy
OK
127.0.0.1:6379> mget hello python php
1) "world"
2) "best"
3) "easy"
```

注意事项：

```
1.mget命令和mset命令的时间复杂度为O(n)
2.使用get命令获取某个key的值，server端计算后返回对应的值给client端
此时如果想获取n个key的值，需要传输n次，server端也需要计算n次，这样所需要的时间为 n次get = n次网络时间 + n次命令时间
3.如果使用mget命令一次传递n个key的值到server端，只需要传输一次，server端计算之后，一次性把计算结果返回给client端
这样所需要的时间为：1次mget = 1次网络时间 + n次命令时间
4.在很多场景中，使用mget命令的效率比get命令效率高很多，mget命令后接的key越多效率越明显，但是当key的量很多时，可以对key进行拆分，分批获取key的值，
```


### 2.5 getset命令,append命令和strlen命令

```
getset key newvalue     set key newvalue并返回旧的value
append key value        将value追加到旧的value
strlen key              返回字符串的长度(注意中文)
```

例子：

```
127.0.0.1:6379> set hello world
OK
127.0.0.1:6379> getset hello python
"world"
127.0.0.1:6379> append hello ',java'
(integer) 11
127.0.0.1:6379> get hello
"python,java"
127.0.0.1:6379> strlen(hello)
(error) ERR unknown command 'strlen(hello)'
127.0.0.1:6379> strlen hello
(integer) 11
127.0.0.1:6379> set hello '足球'
OK
127.0.0.1:6379> strlen hello
(integer) 6
```

注意事项：

```
getset命令,append命令和strlen命令的时间复杂度为O(1)
```


### 2.6 incrby命令,getrange命令和setrange命令

```
incrbyfloat key float       key自增float值
getrange key start end      获取字符串指定下标所有的值
setrange key index value    设置指定下标所有对应的值
```

例子：

```
127.0.0.1:6379> incr counter
(integer) 50
127.0.0.1:6379> del counter
(integer) 1
127.0.0.1:6379> incr counter
(integer) 1
127.0.0.1:6379> incrbyfloat counter 1.1
"2.1"
127.0.0.1:6379> get counter
"2.1"
127.0.0.1:6379> set hello pythonbest
OK
127.0.0.1:6379> getrange hello 0 6
"pythonb"
127.0.0.1:6379> getrange hello 0 5
"python"
127.0.0.1:6379> setrange hello 6 e
(integer) 10
127.0.0.1:6379> get hello
"pythoneest"
```

注意事项：

```
incrby命令,getrange命令和setrange命令的时间复杂度为O(1)
```

