---
title: "my.cnf 参数调优"
date: 2021-06-26 10:36:05
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

```
[mysqld]



# bin log
log_bin=mysql-bin

# charset
init-connect='SET NAMES utf8mb4'
character-set-server=utf8mb4

skip-name-resolve
back_log=300

max_connections=1258
max_connect_errors=6000
open_files_limit=65535
table_open_cache=1024 
max_allowed_packet=500M
binlog_cache_size=1M
max_heap_table_size=8M
tmp_table_size=128M
```


## 参数说明

数据库属于IO密集型的应用程序，主要职责是数据的管理和存储工作。从内存中读取数据的速度远远大于从磁盘上读取数据，所以优化数据库就是尽可能的将磁盘IO转化为内存IO。接下来介绍的是IO相关参数（缓存参数）：

`skip-name-resolve`:

> 如果启用此参数, mysql日志显示[Warning] IP address 'xxxx' could not be resolved: Name or service not known，那是因为mysql默认会反向解析DNS，对于访问者Mysql不会判断是hosts还是ip都会进行dns反向解析，频繁地查询数据库和权限检查，这大大增加了数据库的压力，导致数据库连接缓慢，严重的时候甚至死机，出现“连接数据库时出错”等字样。


`back_log` :

> back_log 指MySQL暂时停止响应新的请求之前，多少个请求可以被存在堆栈中。（如果MySQL的连接达到max_connection后，新来的请求将会被存在堆栈中，以等待某一连接释放资源）


注：back_log超过TCP/IP连接的侦听队列的大小则无效，查看命令：


cat /proc/sys/net/ipv4/tcp_max_syn_backlog


`wait_timeout`（单位：秒） :

> mysql客户端与服务端的连接最长闲置时间，到达后将会被强行关闭。MySQL默认的wait_timeout为8个小时。


interactive_timeout:服务器关闭交互式连接前等待的秒数。


wait_timeout：服务器关闭非交互连接之前等待活动的秒数。（心跳？）


这两个参数必须配合使用。单独设置wait_timeout则无效。


`max_connections` :

> max_connections是指MySQL的最大连接数，如果服务器的并发连接请求量比较大，建议调高此值，以增加并发连接数据量。


MySQL服务器允许的最大连接数量： 16384


`max_user_connection`:

> max_user_connections:是指每个数据库用户的最大连接。


默认值0：表示不受限制


max_used_connections:指MySQL服务启动到此刻，同一时刻并行连接的最大值。查看方式:


show status like "max_used_connections"


`thread_concurrency`:

> thread_concurrency 对MySQL的性能影响很大，错误的设置thread_concurrency的值会导致MySQL不能充分利用CPU。


thread_concurrency应设为CPU核数的2倍。比如，2个双核的CPU，thread_concurrency的值应为2_2_2=8



## 全局缓存

`key_buffer_size` :

> key_buffer_size是用于索引块的缓冲区大小，调整该值的大小能够更好的处理索引（对所有读和多重写），严格来说它决定了数据库索引的处理速度，尤其是读索引块的速度


检查状态值：Key_read_requests和Key_read的比值，检查该值设置是否合理， Key_read:Key_read_requests应尽可能小


MySQL > show status like "Key_read%";


+-------------------+-------------+


| Variable_name     | Value       |


+-------------------+-------------+


| Key_read_requests | 35072256038 |


| Key_reads         | 593121872   |


+-------------------+-------------+


一般未命中率在0.1以下比较好


`innodb_buffer_pool_size` :

> 缓冲池是数据和索引缓存的地方。


检查状态值：Innodb_buffer_pool_read_requests 和Innodb_buffer_pool_reads 可计算出该值设置的是否合理， (Innodb_buffer_pool_read_requests – Innodb_buffer_pool_reads) / Innodb_buffer_pool_read_requests * 100% 计算缓存命中率，缓存命中率越高越好


mysql> show status like "innodb_buffer_pool_r%";


+---------------------------------------+-------------+


| Variable_name                         | Value       |


+---------------------------------------+-------------+


| Innodb_buffer_pool_read_requests      | 10585231877 |


| Innodb_buffer_pool_reads              | 2083477     |


+---------------------------------------+-------------+


2 rows in set (0.01 sec)


`innodb_additional_mem_pool_size`:

> 设置了InnoDB存储引擎用来存放数据字典信息以及一些内部数据的内存空间大小


查看MySQL的 error 日志，如果发现很多warning警告就需要调大该值


`innodb_log_buffer_size`:

> innodb_log_buffer_size:设置InnoDB将日志写入日志磁盘文件前的缓冲大小。大的日志缓冲允许事务运行时不需要将日志保存到磁盘直到事务被提交（commit）。大的日志缓冲可以减少磁盘I/O,默认值为8M，一般来说不建议超过32M


注：innodb_flush_log_trx_commit参数对innodb log的写入性能有非常关键的影响,默认值为1。


```
0：log buffer中的数据将以每秒一次的频率写入到log file中，且同时会进行文件系统到磁盘的同步操作，但是每个事务的commit并不会触发任何log buffer 到log file的刷新或者文件系统到磁盘的刷新操作;
1：在每次事务提交的时候将log buffer 中的数据都会写入到log file，同时也会触发文件系统到磁盘的同步;
2：事务提交会触发log buffer到log file的刷新，但并不会触发磁盘文件系统到磁盘的同步。此外，每秒会有一次文件系统到磁盘同步操作。
```

`query_cache_size`

> query_cache_size主要用来缓存mysql的结果集，所以仅针对于select语句。致命缺陷是当某个表的数据有任何变化，都会导致所有引用该表的select语句在query cache中的缓存数据失效。当数据变化非常多的情况下，不建议使用。


query_cache_size和query_cache_type需要配合使用，query_cache_type设置在何种场景下使用，0(off)表示完全不使用，1（on)除显示要求不使用外均使用，2（demond)只有显示要求才使用



## 局部缓存

MySQL还为每个连接设置连接缓存，每个连接包含线程堆栈，网络缓存等，默认的大小为256K 。事务开始之后，则需要更多的空间。运行较小的查询可能仅给指定的线程增加少量的内存消耗，然而如果对数据表做复杂的操作例如全表扫描、排序或者临时表，则需要分配read_buffer_size、sort_buffer_size、read_rnd_buffer_size、tmp_table_size 大小的内存空间，不过它们是在需要的时候分配，并且在操作完成之后就释放了。tmp_table_size 可以达到MySQL所能分配给这个操作的最大内存空间。

`read__buffer_size` :

read_buffer_size是MySQL读入缓存区大小。对表进行顺序扫描的请求将分配一个读入缓冲区。

`sort_buffer_size`

sort_buffer_size是MySQL执行排序使用的缓冲大小

`read_rnd_buffer_size`

read_rnd_buffer_size是MySQL随机读缓冲区大小。

`tmp_table_size`

tmp_table_size是MySQL的heap(堆)表缓冲大小。需要与max_heap_table_size参数一起调整。

`record_buffer`

record_buffer每个进行顺序扫描的线程为其扫描的表分配一个缓冲区。如果做了很多顺序扫描，可以显示的改变该值


## 其他缓存

`table_open_cache`

> mysql每打开一个表，都会读入一些数据到table_open_cache缓存中，当mysql在这个缓存中找不到相应的信息时，才会去磁盘读取


注：如果table_open_cache设置很大时，如果系统处理不了那么多文件描述符，那么就会出现客户端失效，连接不上。


mysql> show status like 'Open%tables';


+---------------+-------+


| Variable_name | Value |


+---------------+-------+


| Open_tables   | 0     |


| Opened_tables | 0     |


+---------------+-------+


2 rows in set (0.00 sec)


open_tables表示当前打开的表缓存数，如果执行flush tables操作，则此系统会关闭一些当前没有使用的表缓存而使得此状态值减小；


opend_tables表示曾经打开的表缓存数，会一直进行累加，如果执行flush tables操作，值不会减小。


`thread_cache_size`

> 默认值8，表示可以重新利用保存在缓存中线程的数量，当断开连接时如果缓存中还有空间，那么客户端的线程将被放在缓存中。如果线程重新被请求，那么请求将从缓存中读取，如果缓存中是空或者是新的请求那么这个线程将被重新创建，如果很多新的线程增加这个值可以改善系统的性能，根据物理内存设置如下规则：


```
# 1G  —> 8  


# 2G  —> 16  


# 3G  —> 32  


# 大于3G  —> 64  

mysql> show status like 'thread%';
+-------------------+-------+
| Variable_name     | Value |
+-------------------+-------+
| Threads_cached    | 12    | <-当前被缓存的空闲线程的数量
| Threads_connected | 11    | <-处于连接状态的线程
| Threads_created   | 38    | <-服务启动以来，建立了多少线程
| Threads_running   | 1     | <-正使用中的线程（查询数据，传输数据等）
+-------------------+-------+
4 rows in set (0.00 sec)


mysql> show status like '%connection%';
+-----------------------------------+-------+
| Variable_name                     | Value |
+-----------------------------------+-------+
| Connections                       | 52997 | ->服务启动以来，历史连接数
| Max_used_connections              | 29    |
+-----------------------------------+-------+
2 rows in set (0.01 sec)

通过以下公式判断设置值是否合适？命中率超过90%，设置合理
(Connections - Treads_created) / Connections * 100%
```


## 参考

- [Mysql 性能优化](https://so.csdn.net/so/search/s.do?q=mysql%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96&t=blog&u=zengdeqing2012)
- [mysql显示[Warning] IP address 'xxxx' could not be resolved: Name or service not known错误解决](https://blog.csdn.net/u013591306/article/details/77602553)

