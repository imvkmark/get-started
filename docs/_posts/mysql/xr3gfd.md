---
title: "数据库配置"
date: 2021-06-26 17:13:05
toc: true
categories:
- ["Mysql"]
---

**当前项目需要配置的**


```
# bin log / master
server_id = 1
log-bin = mysql-bin
binlog_format = mixed

# 性能
innodb_flush_log_at_trx_commit = 1
sync_binlog = 1

# gtid
gtid-mode = ON
enforce-gtid-consistency = 1

character-set-server=utf8mb4
max_connections=1000

slow_query_log=1
slow_query_log=/webdata/backup/db-slow/query.log
long_query_time=2

skip-name-resolve
```

> 注意:
> 需要确定 `/webdata/backup/db-slow/` 这个目录必须存在
> 并且需要这个目录需要对 `mysql.mysql` 可读写



## 部分参数调整原理


### 连接数

> 最大连接数
> 最大使用链接数/最大链接数 ≈ 85%


```
# 查看连接数
show variables like 'max_connections';

# 查看最大使用的连接数
SHOW GLOBAL STATUS LIKE 'Max_used_connections';

# 设置最大连接数
set global max_connections=xxxx;
```


### 慢日志

**临时开启**

```
# 开启慢查询日志
set global slow_query_log = on;
# 设置慢查询临界点
set long_query_time = 1;
```

**永久开启**<br />mysql配置文件一般在 `/etc/my.cnf`

```
slow_query_log       = 1
slow_query_log_file  = /var/lib/mysql/mysql-slow.log
long_query_time      = 2
```


### binlog/ 二进制日志

开启 binlog, 在 `/etc/my.cnf` 目录下, 去掉 server-id 和 log_bin 前面的注释

```
server-id     = 1
log_bin       = mysql-bin
```

