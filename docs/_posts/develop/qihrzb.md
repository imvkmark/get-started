---
title: "安装 Canal"
date: 2021-02-08 16:45:13
toc: true
categories:
- ["开发","Es"]
---

## Mysql 开启binlog


```
[mysqld]
# open bin log
log-bin=mysql-bin
binlog-format=ROW

# server id
server_id=1
```
重启之后 在 mysql 的数据库目录存在 bin-log, mac 位置: `/usr/local/var/mysql` 
```
-rw-r-----    1 duoli  admin   154B  2 18 18:01 mysql-bin.000001
-rw-r-----    1 duoli  admin    19B  2 18 18:01 mysql-bin.index
```

## 参考地址 

- [简介](https://github.com/alibaba/canal/wiki) 
- [QuickStart](https://github.com/alibaba/canal/wiki/QuickStart)

