---
description: 'Redis 是一款高性能的键值数据库。本文介绍了其在 Ubuntu 中的安装步骤，包括服务器端安装、进程检查、状态验证，以及通过命令行客户端进行基本操作和配置修改。'
lastUpdated: '2026-07-02 21:09:28'
head:
  - - meta
    - name: 'og:title'
      content: 'Redis 简介'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 是一款高性能的键值数据库。本文介绍了其在 Ubuntu 中的安装步骤，包括服务器端安装、进程检查、状态验证，以及通过命令行客户端进行基本操作和配置修改。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/database/redis/index.html'
---
# Redis 简介

## 前言

Redis是常用基于内存的Key-Value数据库，比Memcache更先进，支持多种数据结构，高效，快速。用Redis可以很轻松解决高并发的数据访问问题；做为实时监控信号处理也非常不错。

## Redis在Linux Ubuntu中安装

本文使用的Linux是Ubuntu Kylin 15.04 64bit的系统，安装Redis数据库软件包可以通过 `apt-get` 实现。在Linux Ubuntu中安装Redis数据库

### 安装Redis服务器端

```Plaintext
sudo apt-get install redis-server
```

安装完成后，Redis服务器会自动启动，我们检查Redis服务器程序

### 检查Redis服务器系统进程

```Plaintext
ps -aux|grep redisredis
```

> root 27524 0.0 0.0 11188 2320 pts/3 S+ 20:04 0:00 grep –color=auto redisredis

### 通过启动命令检查Redis服务器状态

```Plaintext
netstat -nlt|grep 6379
```

> tcp 0 0 127.0.0.1:6379 0.0.0.0:\* LISTEN

### 通过启动命令检查Redis服务器状态

```Plaintext
/etc/init.d/redis-server status
```

> redis-server is running

## 通过命令行客户端访问Redis

安装Redis服务器，会自动地一起安装Redis命令行客户端程序。在本机输入redis-cli命令就可以启动，客户端程序访问Redis服务器。

```Plaintext
redis-cli
```

> redis 127.0.0.1:6379>

### 命令行的帮助

```Plaintext
redis 127.0.0.1:6379> help
```

> Type: help `@<group>` to get a list of commands in `<group>` help `<command>` for help on `<command>` help `<tab>` to get a list of possible help topics quit to exit

### 查看所有的key列表

```Plaintext
redis 127.0.0.1:6379> keys *
```

> (empty list or set)

## 基本的Redis客户端命令操作

- 增加一条字符串记录 string

```Plaintext
redis 127.0.0.1:6379> set string "hello"
```

> OK

- 打印记录

```Plaintext
127.0.0.1:6379> get string
```

> “hello”

- 增加一条数字记录 int

```Plaintext
set int 1
```

> OK

- 让数字自增

```Plaintext
127.0.0.1:6379> INCR int
```

> (integer) 2

- 增加一个列表记录list

```Plaintext
redis 127.0.0.1:6379> LPUSH list a
```

> (integer) 1

- 从左边插入列表

```Plaintext
redis 127.0.0.1:6379> LPUSH list b
```

> (integer) 2

- 从右边插入列表

```Plaintext
127.0.0.1:6379> RPUSH list c
```

> (integer) 3

- 打印列表记录，按从左到右的顺序

```Plaintext
127.0.0.1:6379> LRANGE list 0 3
```

> “b”

1. “a”
2. “c”

- 增加一条哈希表记录 hash

```Plaintext
127.0.0.1:6379> HSET hash name "John Smith"
```

> (integer) 1

- 在哈希表中插入，email的Key和Value的值

```Plaintext
redis 127.0.0.1:6379> HSET hash email "abc@gmail.com"
```

> (integer) 1

- 打印哈希表中，key 是 name 的 值

```Plaintext
127.0.0.1:6379> HGET hash name
```

> “John Smith”

- 打印整个哈希表

```Plaintext
127.0.0.1:6379> HGETALL hash
```

> “name”

1. “John Smith”
2. “email”
3. “abc@gmail.com”

- 增加一条哈希表记录 hash2一次插入多个Key和value的值

```Plaintext
127.0.0.1:6379> HMSET hash1 username antirez password P1pp0 age 3
```

> OK

- 打印哈希表中，key 是 username和age的值

```Plaintext
127.0.0.1:6379> HMGET hash1 username age
```

> “antirez”

1. “3”

- 打印完整的哈希表记录

```Plaintext
127.0.0.1:6379> HGETALL hash1
```

> “username”

1. “antirez”
2. “password”
3. “P1pp0”
4. “age”
5. “3”

- 查看所有的key列表

```Plaintext
127.0.0.1:6379> keys *
```

> “hash”

1. “hash1”
2. “list”
3. “string”
4. “int”

- 删除 hash

```Plaintext
127.0.0.1:6379> del hash
127.0.0.1:6379> del string
```

> (integer) 1 (integer) 1

- 查看所有的key列表

```Plaintext
127.0.0.1:6379> keys *
```

> “hash1”

1. “list”
2. “int”

### 修改Redis的配置

> 配置文件位置 `/etc/redis/redis.conf`

- 使用Redis的访问账号默认情况下，访问Redis服务器是不需要密码的，为了增加安全性我们需要设置Redis服务器的访问密码。设置访问密码为 `redis_pwd`。取消注释 `requirepass`

```Plaintext
requirepass redis_pwd
```

- 让Redis服务器被远程访问默认情况下，Redis服务器不允许远程访问，只允许本机访问，所以我们需要设置打开远程访问的功能。用vi打开Redis服务器的配置文件 `redis.conf`注释bind

```Plaintext
bind 127.0.0.1
```

修改后，重启Redis服务器。`/etc/init.d/redis-server restart` > Stopping redis-server: redis-server.Starting redis-server: redis-server.

- 未使用密码登陆Redis服务器发现可以登陆，但无法执行命令了。

```Plaintext
$ redis-cli
127.0.0.1:6379> keys *
```

> (error) ERR operation not permitted

- 登陆Redis服务器，输入密码

```Plaintext
redis-cli -a redis_pwd
```

127.0.0.1:6379> keys \* > 1. “int”

1. “hash1”
2. “list”

登陆后，一切正常。我们检查Redis的网络监听端口检查Redis服务器占用端口

```Plaintext
$ netstat -nlt|grep 6379
```

> tcp 0 0 0.0.0.0:6379 0.0.0.0:\* LISTEN

我们看到从之间的网络监听从 `127.0.0.1:6379` 变成 `0 0.0.0.0:6379`，表示Redis已经允许远程登陆访问。我们在远程的另一台Linux访问Redis服务器

```Plaintext
redis-cli -a redis_pwd -h 192.168.1.111
```

192.168.1.111:6379> keys \* > 1. “int”

1. “hash1”
2. “list”

远程访问正常。通过上面的操作，我们就把Redis数据库服务器，在Linux Ubuntu中的系统安装完成。原文地址: [在Ubuntu中安装Redis](http://blog.fens.me/linux-redis-install/)

## 常用链接

[Redis容量预估-极数云舟](http://www.redis.cn/redis_memory/)

Redis容量预估