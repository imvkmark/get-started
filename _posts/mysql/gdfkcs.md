---
title: "Mysql 主从服务器配置"
date: 2021-02-24 11:35:28
toc: true
categories:
- ["Mysql","主从"]
---

## 1. 简介

mysql 复制的原理现阶段都是一样的，master 将操作记录到 bin-log 中，slave 的一个线程去 master 读取 bin-log，并将他们保存到relay-log 中，slave 的另外一个线程去重放 relay-log 中的操作来实现和 master 数据同步。

**账号准备**

> 主服务器 : 10.20.30.1 (master) repl
> 从服务器 : 10.20.30.2 (slave)  repl_read
> 从服务器 : 10.20.30.3 (slave)  repl_read






## 2. 主(master)服务器配置
配置 binlog 及 server ID 时需要关闭mysql服务器

- 开启二进制日志(log-bin)

开启二进制日志, 二进制日志是因为它是 master 向 slave 复制变化数据的基础, 

- 配置 server_id

对一个复制组里的主机建立唯一server ID是为了将一组内的数据库服务器区分开来，server ID的取值范围为1至2^32-1之间任意值。如果我们忽略了server ID选项或明确指定其值为默认值0，master主机将拒绝来自slave从机的任何连接.

- 禁用 skip_networking

启用 skip_networking 表示 master 主机数据库只允许通过本地 mysql.sock 文件进行连接，slave 从机将无法连接到主机

- 开启 gtid [MySQL5.7杀手级新特性：GTID原理与实战](https://app.yinxiang.com/fx/53aa32b7-8fd9-4176-a576-6768d55f2b75) 
```
[mysqld]
log_bin=mysql-bin
server_id=1
skip_networking=0
expire_logs_days=14

# gtid
gtid_mode = ON
enforce_gtid_consistency = ON
```
更改完后重启mysql服务器

注意配置说明(无需配置[根据版本来]): 

- innodb_flush_log_at_trx_commit ([Mysql 5.7 Ref](https://dev.mysql.com/doc/refman/5.7/en/innodb-parameters.html#sysvar_innodb_flush_log_at_trx_commit))

Innodb 的默认设置是 `innodb_flush_log_at_trx_commit=1` 。我们每次事务的结束都会触发Log Thread 将log buffer 中的数据写入文件并通知文件系统同步文件。这个设置是最安全的设置，能够保证不论是MySQL Crash 还是OS Crash 或者是主机断电都不会丢失任何已经提交的数据。

- sync_binlog ([Mysql 5.7 Ref](https://dev.mysql.com/doc/refman/5.7/en/replication-options-binary-log.html#sysvar_sync_binlog))

默认设置是 `1` (>5.7.7), 当每进行n次事务提交之后，MySQL将进行一次fsync之类的磁盘同步指令来将binlog_cache中的数据强制写入磁盘

```
[mysqld]
innodb_flush_log_at_trx_commit=1
sync_binlog=1
```



## 3. 从服务器配置信息

- 配置 server_id

slave从机开启二进制日志不是必要操作，server ID一定要设置，my.cnf 文件中 server-id 需要设置并且与master 的 server-id 不能冲突, 如果有多个从机，每个从机的server-id都不能与master主机及其它slave从机相同
> 如果我们没有指定 server-id 或指定 server-id 数字为默认值 0，slave 从机都不会去连接主机

- relay_log

relay log很多方面都跟binary log差不多，区别是：从服务器I/O线程将主服务器的二进制日志读取过来记录到从服务器本地文件，然后SQL线程会读取relay-log日志的内容并应用到从服务器

- log_slave_updates

从库更新也写binlog，主要用于链式复制，从库作为另一个库的主库，或者HA架构中，从库可升级为主库

- skip_slave_start

启动数据库后，需手动开启同步进程, 防止从库启动后自动进行复制

- read-only  

 在从库开启该选项，避免在从库上进行写操作，导致主从数据不一致（对super权限无效）
```
[mysqld]
server-id=2

relay-log = mysql-relay-bin
log-slave-updates=ON
skip_slave_start = ON
read_only = ON

replicate_wild_do_table=play.%

# gtid
gtid-mode = ON
enforce-gtid-consistency = 1
```

注意配置说明(非必要配置)

- log_bin

如果我们开启了从机的二进制日志，我们可以将从机的binlog用于数据备份及数据损坏恢复，也可以用于复杂的复制拓扑结构中，如当前从机作为其它从机的主机, 在项目中用作高可用来进行切换

- **表复制相关**

`replicate-wild-do-table` : 需要同步的表，支持正则表达式，数据库example1下的所有表

`replicate-wild-ignore-table` : 同步过程中需要忽略的表，支持正则表达式。全库同步时，必须屏蔽mysql系统库和test测试库

使用replicate_do_db和replicate_ignore_db时有一个隐患，跨库更新时会出错。

如在Master（主）服务器上设置 replicate_do_db=test
```
use mysql;
update test.table1 set ......
```
那么Slave（从）服务器上第二句将不会被执行

如Master设置 replicate_ignore_db=mysql
```
use mysql;
update test.table1 set ......
```
那么Slave上第二句会被忽略执行

 

原因是设置replicate_do_db或replicate_ignore_db后，MySQL执行sql前检查的是当前默认数据库，所以跨库更新语句在Slave上会被忽略。

可以在Slave上使用 replicate_wild_do_table 和 replicate_wild_ignore_table 来解决跨库更新的问题，如：
```
replicate_wild_do_table=test.%
# or
replicate_wild_ignore_table=mysql.%
```

## 4. 主(master)服务器为从服务器授权读取 bin-log 的账号

每个 slave 连接到 master 需要使用用户名及密码，所以 master 主机上需要创建用于 slave 访问的用户及密码。我们可以在 master 主机上为每个 slave 创建一个访问的用户名及密码，不同的 slave 也可以访问 master 的同一个用户名及密码。

```
mysql> grant replication slave on *.* to 'repl-h2'@'%' identified by 'password';
```


## 5. 获取 master 主机 binlog 文件及位置信息

如果 master 主机上有数据，我们同步之前，需要停止向主机上做更新操作，获取 master 的文件及位置信息，然后将主机数据导出，导出数据可通过mysqldump 等相关工具或者直接拷贝data目录。

在master主机上使用mysql命令行客户端，将所有数据刷进磁盘，并阻塞所有的写入操作

```
# 主数据库进行锁表操作，不让数据再进行写入动作
mysql> FLUSH TABLES WITH READ LOCK;

# 查看主数据库状态, 查看binlog日志信息
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 | 5765231  |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+   

# 记录下 FILE 及 Position 的值。
# 将主服务器的需要同步的数据库复制到从服务器
# mysqldump db1 -uroot -ppassword --add-drop-table | mysql -h 192.168.1.22 newdb -uroot -ppassword

# 取消主数据库锁定
mysql> UNLOCK TABLES;
```

> 注意 : 执行该命令的mysql命令行客户端一旦关闭，该命令便会失效。



## 6. 备份主机文件


### 6.1 通过 mysqldump 方式

#### 6.1.1 数据导出的方式

在 slave 从机开始同步前，需要先将主机的备份文件导入，master主机备份有多种方式，我们介绍两种简单方式

```
$ /usr/local/mysql/bin/mysqldump --all-databases --master-data > /tmp/datadump.db
```

`--master-data` ：该参数有两个值1和2，默认为1，mysqldump 导出数据时，当这个参数的值为1的时候，mysqldump 出来的文件就会包括 CHANGE MASTER TO 这个语句，CHANGE MASTER TO 后面紧接着就是 file 和position 的记录，在 slave 上导入数据时就会执行这个语句，salve 就会根据指定这个文件位置从 master 端复制 binlog。当这个值是2的时候，chang master to也是会写到dump文件里面去的，但是这个语句是被注释的状态。

使用该参数时，执行 mysqldump 前就没有必要在 master主机上执行 FLUSH TABLES WITH READ LOCK和SHOW MASTER STATUS 等相关操作。

#### 6.1.2 跨库直接导入
```
# 将主服务器的需要同步的数据库复制到从服务器
# mysqldump db1 -uroot -ppassword --add-drop-table | mysql -h 192.168.1.22 newdb -uroot -ppassword
```

### 6.2 直接拷贝原始数据文件

如果数据量比较大，直接拷贝原始数据文件比使用mysqldump更加有效，也省去了执行insert语句更新索引的开销。


#### 6.2.1 包含InnoDB表的拷贝：

1). 在 master 主机上使用 mysql 命令行客户端，将所有数据刷进磁盘，并阻塞所有的写入操作

```
mysql> FLUSH TABLES WITH READ LOCK;
```

2).  在另外一个shell客户端关闭master数据库

```
$ mysqladmin shutdown
```

3. 拷贝并压缩数据文件
> !!! 如果这里数据量过大, 不要压缩, 太耗时间 !!!

```
$ tar czvf /tmp/databack.tar.gz /usr/local/mysql/data
```

4. 重启mysql master服务


#### 6.2.2 不包含InnoDB表的拷贝：

1 在master主机上使用mysql命令行客户端，将所有数据刷进磁盘，并阻塞所有的写入操作

```
mysql> FLUSH TABLES WITH READ LOCK;
```

2 拷贝并压缩数据文件

```
$ tar czvf /tmp/databack.tar.gz /usr/local/mysql/data
```

3 释放读锁

```
mysql> UNLOCK TABLES;
```


### 6.3 其它备份方法：如xtrabackup，meb等

可自行研究。


## 7 在从机上设置复制


### 7.1 初始安装mysql设置主从复制

最简单的方式是在两台新安装的mysql主机上设置主从复制。

设置步骤如下：

1. 配置master主机my.cnf文件（参考上面第2节-主机配置信息）
2. 启动mysql master服务
3. 在master上设置复制用户及密码（参考上面第4节-在主机上创建复制用户）。
4. 获取master主机binlog信息（参考上面第5节, 如果启用了 GTID, 此步骤可以忽略）
5. 在master上释放读锁（如果前面执行过FLUSH TABLES WITH READ LOCK;）

```
mysql> UNLOCK TABLES;
```

6. 配置slave从机my.cnf文件（参考上面第3节）
7. 启动slave mysqld服务
8. 在slave从机上执行change master操作（参考下面第9节）
9. 在slave从机上启动复制线程

```
mysql> START SLAVE;
```

完成上述操作之后 slave 便可以连接到 master 并同步数据了。

10. 查看主从复制状态

```
mysql> show slave status \G
```

注意：

如果mysql采用5.6及其后续版本，开启了GTID，第四步可省略，slave会自动寻找master主节点binlog文件及位置。


### 7.2 已有数据的mysql设置主从复制

> 如果是复制, 则 data 目录下的 `auto.cnf` 以及 err 日志必须删除, 因为 `auto.cnf` 文件会导致 server_uuid 一致, 导致数据无法同步


如果 master 主机中已经存在数据，新加入 slave 从机进行同步，同步前需要从主机上拿到备份文件，获取备份文件可使用mysqldump，xtrabackup或直接拷贝原始数据文件等。

配置的基本方法如下：

对于master的设置方法不在赘述，可参考上面第2节

对于master数据文件的备份方法不在赘述，可参考上面第6节

对于slave从机的操作步骤如下：

1 更新从机的配置文件（参考上面第3节）

2 将数据导入从机

2.1 使用mysqldump备份的数据导入

启动slave mysql数据库

导入从master获得的备份数据

```
$ mysql < datadump.db
```

2.2 使用直接复制原始数据文件备份的数据导入

解压从master获得的备份数据到salve的data目录

```
$ tar xzvf databack.tar.gz
```

注：我们可能需要设置解压出来文件的权限确保slave能够读取或更改它们，删除data目录下的auto.cnf文件及err日志（server_uuid：服务器身份ID。在第一次启动Mysql时，会自动生成一个server_uuid并写入到数据目录下auto.cnf文件里，官方不建议修改）。

启动slave mysql数据库

3 在 slave 从机上执行 change master 操作（参考后面第九节）

4 在 slave 从机上启动复制线程

```
mysql> START SLAVE;
```

完成上述操作之后slave便可以连接到master并同步数据了。

注：

slave 从库使用的信息存储在它的主机信息库里面，以便追踪master的二进制日志应用了多少。信息库可以是文件或表的形式，取决于参数--master-info-repository，如果该参数是FILE，我们可以在从机的data目录下看到master.info 和 relay-log.info两个文件，如果参数是TABLE，相关信息会存储在mysql库的slave_master_info 表里面。这两种情况之下都不建议删除或修改文件或表，除非明确知道我们要做什么并充分理解这样做所带来的影响。


## 8 向主从复制环境中添加额外的从机
向现有复制环境增加一台slave从机，可以参考下面方法。


1. 关闭已有的slave
```
$ mysqladmin shutdown
```

2. 拷贝已有slave的data目录文件到新的slave的data目录。
3. 从已有slave拷贝master info以及relay log info信息到新的slave，它们包含master的二进制日志及slave的relay log日志的当前位置。
4. 启动已有slave
5. 在新的slave上编辑my.cnf配置文件，确保server-id 没有被master及其他slave使用。
6. 启动新的salve。新的slave使用master信息库开启复制进程。


## 9 从(slave)服务器读取主服务器的 bin-log

这里的参考文档:  https://dev.mysql.com/doc/refman/5.7/en/change-master-to.html 

设置从机与master主机进行通信，我们必须告诉从机必须的连接信息


### 9.1 基本的配置如下：

设置主库的地址, 以方便进行同步

```
mysql> CHANGE MASTER TO
    ->     MASTER_HOST='10.20.30.1',
    ->     MASTER_USER='repl',
    ->     MASTER_PASSWORD='repl_pwd',
    ->     MASTER_LOG_FILE='mysql-bin.000001',
    ->     MASTER_LOG_POS=1100;
```


### 9.2 如果开启GTID，也可以不指定MASTER_LOG_FILE及MASTER_LOG_POS：

```
mysql> CHANGE MASTER TO
         MASTER_HOST='10.20.30.1',
         MASTER_USER='repl',
         MASTER_PASSWORD='repl_pwd',
         MASTER_AUTO_POSITION = 1;
```

> 注：复制不能通过unix的socket文件，必须使用tcp/ip连接master主机。


```
# 开始从服务器
mysql> start slave;
# 从服务器状态
mysql> show slave status\G;
```


## 10. 配置应用可读从库数据

```
mysql > grant select on *.* to 'repl_read'@'%' identified by 'repl_read_pwd'
mysql > flush privileges;
```


## 注意

1. 如果是复制目录一定要删除 `auto.cnf`, 否则出现数据不一致情况

```
[auto]
server-uuid=b066bd69-cb96-11ea-9358-00163e05c33d
```


## 参考

- [mysql主从复制-mysql5.6配置主从复制](https://blog.csdn.net/jesseyoung/article/details/41894521)

