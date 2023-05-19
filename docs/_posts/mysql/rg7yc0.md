---
title: "Mysql 从库 Exec_Master_Log_Pos 不执行"
date: 2021-02-26 12:40:14
toc: true
categories:
- ["Mysql","主从"]
---

今天查看从库状态的时候发现


```
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
...
             Slave_IO_Running: Yes
            Slave_SQL_Running: NO
              Replicate_Do_DB:
...
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 890230198
              Relay_Log_Space: 35074175
...
```
这里标识几个状态

Slave_IO_State : Waiting for master to send event 代表数据库执行正常<br />Slave_SQL_Running : NO 代表从库运行异常<br />Exec_Master_Log_Pos : 890230198 : 不动

因为卡主在 Exec_Master_Log_Pos 位置不动, 代表执行异常, 出现的错误是mysql 执行失败, 出现错误, 由于知道是什么位置, 于是使用了一个笨办法找到了执行 pos 的位置

```
mysql> show binlog events in 'mysql-bin.000053' limit 7034300, 1000
```
找到了执行失败的sql
```
890230167	use `fadan_v4`; update `pt_order` set `last_log` = '游戏角色变动:[飞将 ->飞将电话:18620806845]', `pt_order`.`updated_at` = '2021-02-26 09:48:53' where `id` = 4914426
890230198	COMMIT /* xid=1637645127 */
890230263	SET @@SESSION.GTID_NEXT= 'aedf6a09-4067-11e6-b439-00163e080caf:59716071'
# 意思是在执行以下 sql 的时候出现的问题
890230414	use `mysql`; REVOKE ALL PRIVILEGES ON  *.* FROM 'liex_repl'@'%'
890230479	SET @@SESSION.GTID_NEXT= 'aedf6a09-4067-11e6-b439-00163e080caf:59716072'
```
考虑到可能是执行sql 的时候没有权限, 因为运行的是子账号, 所以无权执行 mysql 表, 所以导致无法执行

解决方法: 编辑 my.cnf, 忽略掉 mysql 表的同步(非业务逻辑需要), 重启 mysqld, 开启 slave 即可
```
replicate_wild_ignore_table=mysql.%
```
查看 slave 状态

```
mysql> show slave status\G;
*************************** 1. row ***************************
# 执行状态
               Slave_IO_State: Waiting for master to send event
...
              Master_Log_File: mysql-bin.000053
          Read_Master_Log_Pos: 927644340
               Relay_Log_File: mysql-relay-bin.000002
                Relay_Log_Pos: 37414556
        Relay_Master_Log_File: mysql-bin.000053
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
# mysql 的配置
...
  Replicate_Wild_Ignore_Table: mysql.%
                   Last_Errno: 0
```

## 参考

- [MySQL Binlog 介绍](https://mp.weixin.qq.com/s?__biz=MzI1NDU0MTE1NA==&mid=2247483875&idx=1&sn=2cdc232fa3036da52a826964996506a8&chksm=e9c2edeedeb564f891b34ef1e47418bbe6b8cb6dcb7f48b5fa73b15cf1d63172df1a173c75d0&scene=0&xtrack=1&key=e3977f8a79490c6345befb88d0bbf74cbdc6b508a52e61ea076c830a5b64c552def6c6ad848d4bcc7a1d21e53e30eb5c1ead33acdb97df779d0e6fa8a0fbe4bda32c04077ea0d3511bc9f9490ad0b46c&ascene=1&uin=MjI4MTc0ODEwOQ==&devicetype=Windows+7&version=62060719&lang=zh_CN&pass_ticket=h8jyrQ71hQc872LxydZS/3aU1JXFbp4raQ1KvY908BcKBeSBtXFgBY9IS9ZaLEDi) 
- [MySQL 复制夯住排查以及原理探讨](https://dbarobin.com/2015/08/22/mysql-replication-hanging/)

