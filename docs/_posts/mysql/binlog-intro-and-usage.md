---
title: "Mysql 二进制日志 binlog 介绍以及使用"
date: 2021-06-26 10:35:59
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

## 介绍

binlog 就是binary log，二进制日志文件，这个文件记录了MySQL所有的DML操作。通过binlog日志我们可以做数据恢复，增量备份，主主复制和主从复制等等。对于开发者可能对binlog并不怎么关注，但是对于运维或者架构人员来讲是非常重要的。



## 开启

MySQL 5.7这个版本默认是不开启binlog日志的，具体的开启方式如下<br />
在 `my.conf`主配置文件中直接添加三行

```
[mysqld]
log_bin=mysql-bin

# for mysql 5.7+
server-id=1
```

```
log-bin=mysql-bin
```

mysql 会根据这个配置自动设置 log_bin 为 on 状态，自动设置 log_bin_index 文件为你指定的文件名后跟 `.index`

`server-id` 这个参数对于 5.7+ 版本是必须指定的, 为了便于区分, 一般主服务器会设置为 1, 其他服务器根据数量多少以及网段来进行相应的定义.

配置好了之后重启 mysql 便可以查看二进制日志

```
mysql root@192.168.1.21:(none)> show variables like "%log_bin%"
+---------------------------------+--------------------------------+
| Variable_name                   | Value                          |
+---------------------------------+--------------------------------+
| log_bin                         | ON                             |
| log_bin_basename                | /var/lib/mysql/mysql-bin       |
| log_bin_index                   | /var/lib/mysql/mysql-bin.index |
| log_bin_trust_function_creators | OFF                            |
| log_bin_use_v1_row_events       | OFF                            |
| sql_log_bin                     | ON                             |
+---------------------------------+--------------------------------+
```

下面我们可以找到这个目录 `/var/lib/mysql` 来看一下

```
...
-rw-r-----  1 mysql mysql     2729 3月  26 11:38 mysql-bin.000001
-rw-r-----  1 mysql mysql   188510 3月  26 11:44 mysql-bin.000002
-rw-r-----  1 mysql mysql    97946 3月  26 11:46 mysql-bin.000003
-rw-r-----  1 mysql mysql       83 3月  26 11:44 mysql-bin.index
...
```

至此便开启了 binlog

查询主服务器的状态

```
mysql root@192.168.1.21:(none)> show master status
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 | 5765231  |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
```

查询当前 binlog 的事件状态

```
mysql root@192.168.1.21:(none)> show binlog events
+------------------+------+----------------+-----------+-------------+---------------------------------------+
| Log_name         | Pos  | Event_type     | Server_id | End_log_pos | Info                                  |
+------------------+------+----------------+-----------+-------------+---------------------------------------+
| mysql-bin.000001 | 4    | Format_desc    | 1         | 123         | Server ver: 5.7.29-log, Binlog ver: 4 |
| mysql-bin.000001 | 123  | Previous_gtids | 1         | 154         |                                       |
| mysql-bin.000001 | 154  | Anonymous_Gtid | 1         | 219         | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'  |
| mysql-bin.000001 | 219  | Query          | 1         | 294         | BEGIN                                 |
| mysql-bin.000001 | 294  | Table_map      | 1         | 653         | table_id: 109 (play_v1.user_profile)  |
| mysql-bin.000001 | 653  | Update_rows    | 1         | 2675        | table_id: 109 flags: STMT_END_F       |
| mysql-bin.000001 | 2675 | Xid            | 1         | 2706        | COMMIT /* xid=13 */                   |
| mysql-bin.000001 | 2706 | Stop           | 1         | 2729        |                                       |
+------------------+------+----------------+-----------+-------------+---------------------------------------+
```


## 参考

- [MySQL的binlog日志详解](https://blog.csdn.net/king_kgh/article/details/74833539)

