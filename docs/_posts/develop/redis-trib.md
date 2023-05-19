---
title: "[转] 高可用Redis(十一)：使用redis-trib.rb工具搭建集群"
date: 2021-06-26 10:24:57
toc: true
categories:
- ["开发","Redis"]
---

[高可用Redis(十一)：使用redis-trib.rb工具搭建集群](https://www.cnblogs.com/renpingsheng/p/9833740.html)

环境说明：


```
两台虚拟机，IP地址分别为：192.168.81.100和192.168.81.101
虚拟机系统为：CentOS 7.5
Redis为yum安装，版本为3.2
系统环境：关闭firewalld
Redis Cluster集群节点包括：192.168.81.101机器的9000.9001,9002端口运行的redis-server以及192.168.81.100机器的9000.9001,9002端口运行的redis-server
```

步骤：


### 1.Ruby环境准备

```
官网下载Ruby源码包，解压，编译，安装，进行软链接
```


### 2.Ruby环境安装redis模块

```
[root@mysql ruby_package]# ruby -v              # ruby安装完成，查看版本
ruby 2.3.7p456 (2018-03-28 revision 63024) [x86_64-linux]
[root@mysql ruby_package]# gem install redis    # 安装ruby操作redis模块
Successfully installed redis-4.0.2
Parsing documentation for redis-4.0.2
Done installing documentation for redis after 0 seconds
1 gem installed
[root@mysql ruby_package]# gem list -- check    # 查看ruby环境已经安装的模块

*** LOCAL GEMS ***

bigdecimal (1.2.8)
did_you_mean (1.0.0)
io-console (0.4.5)
json (1.8.3.1)
minitest (5.8.5)
net-telnet (0.1.1)
power_assert (0.2.6)
psych (2.1.0.1)
rake (10.4.2)
rdoc (4.2.1)
redis (4.0.2, 3.3.0)
test-unit (3.1.5)
```


### 3.获取redis-trib.rb工具

```
[root@mysql ruby_package]# rz       # 从Redis官网下载Redis安装包，并上传到虚拟机中
rz waiting to receive.
Starting zmodem transfer.  Press Ctrl+C to cancel.
Transferring redis-3.2.12.tar.gz...
  100%    1515 KB    1515 KB/sec    00:00:01       0 Errors  

[root@mysql ruby_package]# ls
redis-3.2.12.tar.gz  ruby-2.3.7  ruby-2.3.7.tar.gz  rubygems-2.7.7.zip
[root@mysql ruby_package]# tar xf redis-3.2.12.tar.gz       # 对Redis安装包进行解压
[root@mysql ruby_package]# ls
[root@mysql ruby_package]# cd redis-3.2.12/src      # 进入Redis目录的src目录下
[root@mysql src]# ls
adlist.c     asciilogo.h  crc64.h       help.h         Makefile.dep     quicklist.h        release.c      setproctitle.c  t_hash.c      zipmap.c
adlist.h     bio.c        db.c          hyperloglog.c  memtest.c        rand.c             replication.c  sha1.c          t_list.c      zipmap.h
ae.c         bio.h        debug.c       intset.c       mkreleasehdr.sh  rand.h             rio.c          sha1.h          t_set.c       zmalloc.c
ae_epoll.c   bitops.c     debugmacro.h  intset.h       multi.c          rdb.c              rio.h          slowlog.c       t_string.c    zmalloc.h
ae_evport.c  blocked.c    dict.c        latency.c      networking.c     rdb.h              scripting.c    slowlog.h       t_zset.c
ae.h         cluster.c    dict.h        latency.h      notify.c         redisassert.h      sdsalloc.h     solarisfixes.h  util.c
ae_kqueue.c  cluster.h    endianconv.c  lzf_c.c        object.c         redis-benchmark.c  sds.c          sort.c          util.h
ae_select.c  config.c     endianconv.h  lzf_d.c        pqsort.c         redis-check-aof.c  sds.h          sparkline.c     valgrind.sup
anet.c       config.h     fmacros.h     lzf.h          pqsort.h         redis-check-rdb.c  sentinel.c     sparkline.h     version.h
anet.h       crc16.c      geo.c         lzfP.h         pubsub.c         redis-cli.c        server.c       syncio.c        ziplist.c
aof.c        crc64.c      geo.h         Makefile       quicklist.c      redis-trib.rb      server.h       testhelp.h      ziplist.h
[root@mysql src]# cp redis-trib.rb /usr/bin     # 把redis-trib.rb拷贝到/usr/bin目录下
[root@mysql src]# redis-trib.rb                 # 查看redis-trib.rb的帮助文档
Usage: redis-trib <command> <options> <arguments ...>

  create          mysql:port1 ... hostN:portN
                  --replicas <arg>
  check           host:port
  info            host:port
  fix             host:port
                  --timeout <arg>
  reshard         host:port
                  --from <arg>
                  --to <arg>
                  --slots <arg>
                  --yes
                  --timeout <arg>
                  --pipeline <arg>
  rebalance       host:port
                  --weight <arg>
                  --auto-weights
                  --use-empty-masters
                  --timeout <arg>
                  --simulate
                  --pipeline <arg>
                  --threshold <arg>
  add-node        new_host:new_port existing_host:existing_port
                  --slave
                  --master-id <arg>
  del-node        host:port node_id
  set-timeout     host:port milliseconds
  call            host:port command arg arg .. arg
  import          host:port
                  --from <arg>
                  --copy
                  --replace
  help            (show this help)

For check, fix, reshard, del-node, set-timeout you can specify the host and port of any working node in the cluster.
```


### 4.在192.168.81.101虚拟机上创建配置文件，并非常用启动Redis server

```
[root@mysql ~]# ps aux | grep redis-server
root       1684  0.0  0.0 112664   972 pts/0    R+   11:44   0:00 grep --color=auto redis-server
[root@mysql ~]# cd /opt/config/
[root@mysql config]# ls
redis_7000.conf  redis_7001.conf  redis_7002.conf
[root@mysql config]# sed 's/7000/9000/g' redis_7000.conf > redis_9000.conf      # 创建redis_9000.conf配置文件
[root@mysql config]# sed 's/7000/9001/g' redis_7000.conf > redis_9001.conf      # 创建redis_9001.conf配置文件
[root@mysql config]# sed 's/7000/9002/g' redis_7000.conf > redis_9002.conf      # 创建redis_9002.conf配置文件
[root@mysql config]# redis-server /opt/config/redis_9000.conf       # 指定配置文件，启动redis-server
[root@mysql config]# redis-server /opt/config/redis_9001.conf       # 指定配置文件，启动redis-server
[root@mysql config]# redis-server /opt/config/redis_9002.conf       # 指定配置文件，启动redis-server
[root@mysql config]# ps aux | grep redis-server         # 查看已经启动的redis-server
root       1948  0.2  0.3 142916  7572 ?        Ssl  12:21   0:02 redis-server 0.0.0.0:9002 [cluster]
root       1952  0.2  0.3 142916  7560 ?        Ssl  12:21   0:02 redis-server 0.0.0.0:9001 [cluster]
root       1964  0.2  0.3 142916  7356 ?        Ssl  12:21   0:02 redis-server 0.0.0.0:9000 [cluster]
root       6640  0.0  0.0 112664   972 pts/1    R+   12:42   0:00 grep --color=auto redis-server
[root@mysql config]# cat redis_9000.conf        # redis_9000.conf配置文件内容
port 9000
bind 0.0.0.0
daemonize yes
dir '/var/lib/redis'
logfile '/var/log/redis/redis_9000.log'
dbfilename 'redis_9000.data'
cluster-enabled yes
cluster-config-file nodes-9000.conf
cluster-require-full-coverage no
[root@mysql config]# redis-cli -p 9000 cluster nodes        # 查看集群中节点的信息，都只显示自身节点
5eba129e4f4a4be2ffe630fe9fac19ba30f5b419 :9000 myself,master - 0 0 0 connected
[root@mysql config]# redis-cli -p 9001 cluster nodes        # 查看集群中节点的信息，都只显示自身节点
32d2d969c41f4af646b1052f10d69fd29510f3e4 :9001 myself,master - 0 0 0 connected
[root@mysql config]# redis-cli -p 9002 cluster nodes        # 查看集群中节点的信息，都只显示自身节点
6c43b4ddfeaeb3030af397e7469bb0d0b7673979 :9002 myself,master - 0 0 0 connected

使用同样的步骤，在192.168.81.100虚拟机上生成配置文件：redis_9000.conf,redis_9001.conf,redis_9002.conf
```


### 5.在192.168.81.101虚拟机上使用redis-trib.rb工具构建集群

```
[root@mysql config]# redis-trib.rb create --replicas 1 127.0.0.1:9000 127.0.0.1:9001 127.0.0.1:9002 192.168.81.100:9000 192.168.81.100:9001 192.168.81.100:9002         # 构建集群，replicas后的参数为集群的节点
>>> Creating cluster
>>> Performing hash slots allocation on 6 nodes...
Using 3 masters:            # 指定master
127.0.0.1:9000
192.168.81.100:9000
127.0.0.1:9001
Adding replica 192.168.81.100:9001 to 127.0.0.1:9000        # 为master添加slave
Adding replica 127.0.0.1:9002 to 192.168.81.100:9000
Adding replica 192.168.81.100:9002 to 127.0.0.1:9001
M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:0-5460 (5461 slots) master
M: fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001
   slots:10923-16383 (5461 slots) master
S: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   replicates cb8c114d44d289687798508232d31e0a065fdab5
M: cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000
   slots:5461-10922 (5462 slots) master
S: 71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001
   replicates cf74b2d9570665b74525802462c74cf2e072ef99
S: ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002
   replicates fceba6001b95e2169ddd6622436b213324fe8f77
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join..........
>>> Performing Cluster Check (using node 127.0.0.1:9000)
M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:0-5460 (5461 slots) master
   1 additional replica(s)
M: cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000
   slots:5461-10922 (5462 slots) master
   1 additional replica(s)
S: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   slots: (0 slots) slave
   replicates cb8c114d44d289687798508232d31e0a065fdab5
M: fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001
   slots:10923-16383 (5461 slots) master
   1 additional replica(s)
S: ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002
   slots: (0 slots) slave
   replicates fceba6001b95e2169ddd6622436b213324fe8f77
S: 71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001
   slots: (0 slots) slave
   replicates cf74b2d9570665b74525802462c74cf2e072ef99
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```

需要注意的是：如果上面的操作中，一直阻塞在'Waiting for the cluster to join'，则是因为meet操作阻塞，可以手动进行meet操作

具体步骤为：在当前虚拟机上另开启一个命令提示符，进行meet操作

```
[root@mysql ~]# redis-cli -p 9000 cluster meet 127.0.0.1 9001       # 192.168.81.101:9000端口运行的redis-server向192.168.81.101:9001端口运行的redis-server发送meet请求
OK
[root@mysql ~]# redis-cli -p 9000 cluster meet 127.0.0.1 9002       # 192.168.81.101:9000端口运行的redis-server向192.168.81.101:9001端口运行的redis-server发送meet请求
OK
[root@mysql ~]# redis-cli -p 9000 cluster meet 192.168.81.100 9002  # 192.168.81.101:9000端口运行的redis-server向192.168.81.100:9002端口运行的redis-server发送meet请求
OK
[root@mysql ~]# redis-cli -p 9000 cluster meet 192.168.81.100 9001  # 192.168.81.101:9000端口运行的redis-server向192.168.81.100:9001端口运行的redis-server发送meet请求
OK
[root@mysql ~]# redis-cli -p 9000 cluster meet 192.168.81.100 9000  # 192.168.81.101:9000端口运行的redis-server向192.168.81.100:9000端口运行的redis-server发送meet请求
OK
[root@mysql ~]# redis-cli -p 9000 cluster info      # 查看集群的信息
cluster_state:ok                        # 状态为ok
cluster_slots_assigned:16384            # 标记的slot共有16384个
cluster_slots_ok:16384                  # 已分配的slot有16384个
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6                   # 当前集群共有6个节点
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_sent:1890
cluster_stats_messages_received:1890
[root@mysql ~]# redis-cli -p 9000 cluster nodes         # 查看当前集群节点信息
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 master - 0 1539751180759 4 connected 5461-10922
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 slave cb8c114d44d289687798508232d31e0a065fdab5 0 1539751183277 4 connected
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539751181266 2 connected 10923-16383
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539751182272 6 connected
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539751180255 5 connected
cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000 myself,master - 0 0 1 connected 0-5460
```


### 6.Redis Cluster扩容集群


#### 6.1 在192.168.81.100虚拟机上准备新节点

```
[root@host1 config]# ls
add_slots.sh  redis_9000.conf  redis_9001.conf  redis_9002.conf
[root@host1 config]# sed 's/9000/9003/g' redis_9000.conf > redis_9003.conf  # 生成配置文件
[root@host1 config]# redis-server /opt/config/redis_9003.conf               # 指定配置文件启动redis-server
[root@host1 config]# ps aux | grep redis-server                             # 查看redis-server的进程
root       2553  0.2  0.7 142904  7552 ?        Ssl  12:23   0:12 redis-server 0.0.0.0:9000 [cluster]
root       2557  0.2  0.7 142904  7548 ?        Ssl  12:23   0:13 redis-server 0.0.0.0:9001 [cluster]
root       2561  0.2  0.7 142904  7556 ?        Ssl  12:23   0:13 redis-server 0.0.0.0:9002 [cluster]
root       2596  0.1  0.5 142904  5336 ?        Ssl  13:53   0:00 redis-server 0.0.0.0:9003 [cluster]
root       2600  0.0  0.0 112648   964 pts/0    R+   13:53   0:00 grep --color=auto redis-server
```


#### 6.2 在192.168.81.101虚拟机上生成配置文件，手动扩容集群

```
[root@mysql config]# redis-cli -p 9000 cluster meet 127.0.0.1 9003          # 对新添加节点执行meet操作
OK
[root@mysql config]# redis-cli -p 9000 cluster meet 192.168.81.100 9003     # 对新添加节点执行meet操作
OK
[root@mysql config]# redis-cli -p 9000 cluster nodes            # 查看集群节点信息
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 slave cb8c114d44d289687798508232d31e0a065fdab5 0 1539755696566 4 connected
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539755699589 6 connected
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539755694553 5 connected
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539755697570 7 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 master - 0 1539755694553 4 connected 5461-10922
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539755698572 2 connected 10923-16383
cf74b2d9570665b74525802462c74cf2e072ef99 192.168.81.101:9000 myself,master - 0 0 1 connected 0-5460
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 master - 0 1539755695560 0 connected
[root@mysql config]# redis-cli -p 9000 cluster info         # 查看集群信息
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:8
cluster_size:3
cluster_current_epoch:7
cluster_my_epoch:1
cluster_stats_messages_sent:11829
cluster_stats_messages_received:11829
[root@mysql config]# redis-cli -p 9003 cluster replicate 27266dcfd098dfe2a42361d6ab59edf8fb9f5413            # 新添加节点设置主从关系 
OK
[root@mysql config]# redis-cli -p 9003 cluster nodes    # 查看集群中节点信息
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539756040013 7 connected
2ff22acb1e006b9881abc80238e15b4e3fcefbef 192.168.81.101:9003 myself,slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 0 0 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 master - 0 1539756035980 4 connected 5461-10922
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539756037488 2 connected
cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000 master - 0 1539756040516 1 connected 0-5460
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 slave cb8c114d44d289687798508232d31e0a065fdab5 0 1539756038998 4 connected
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539756041017 2 connected 10923-16383
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 1539756042024 1539756037992 1 connected
```


#### 6.3 在192.168.81.101虚拟机上生成配置文件，使用redis-trib.rb工具扩容集群

说明：

```
向集群中添加192.168.81.100:9003和192.168.81.101:9003节点
```

> 建议使用redis-trib.rb工具，避免新节点已经加入了其他集群，造成故障


```
[root@mysql config]# ls
dump.rdb  redis_9000.conf  redis_9001.conf  redis_9002.conf
[root@mysql config]# sed 's/9000/9003/g' redis_9000.conf > redis_9003.conf      # 生成配置文件
[root@mysql config]# ls
dump.rdb  redis_9000.conf  redis_9001.conf  redis_9002.conf  redis_9003.conf
[root@mysql config]# redis-server /opt/config/redis_9003.conf       # 指定配置文件运行redis-server
[root@mysql config]# ps aux | grep redis-server                     # 查看redis-server的进程信息
root       1948  0.2  0.3 142916  7560 ?        Ssl  12:21   0:13 redis-server 0.0.0.0:9002 [cluster]
root       1952  0.2  0.3 142916  7560 ?        Ssl  12:21   0:12 redis-server 0.0.0.0:9001 [cluster]
root       1964  0.2  0.3 142916  7356 ?        Ssl  12:21   0:12 redis-server 0.0.0.0:9000 [cluster]
root       7348  0.0  0.2 142916  5352 ?        Ssl  13:53   0:00 redis-server 0.0.0.0:9003 [cluster]
root       7352  0.0  0.0 112664   972 pts/0    R+   13:53   0:00 grep --color=auto redis-server
[root@mysql config]# redis-trib.rb add-node 127.0.0.1:9003 192.168.81.100:9003     # 向集群添加节点
[root@mysql config]# redis-cli -p 9000 cluster nodes        # 查看集群的节点信息
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 1539826328082 7 connected
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539826326067 9 connected 5461-10922
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539826330601 2 connected 10923-16383
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539826331108 6 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539826332115 9 connected
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539826329091 7 connected
cf74b2d9570665b74525802462c74cf2e072ef99 192.168.81.101:9000 myself,master - 0 0 1 connected 0-5460
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539826330098 5 connected
[root@mysql config]# redis-trib.rb reshard 127.0.0.1:9000       # 迁移槽
>>> Performing Cluster Check (using node 127.0.0.1:9000)
M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:0-5460 (5461 slots) master
   1 additional replica(s)
S: 2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003
   slots: (0 slots) slave
   replicates 27266dcfd098dfe2a42361d6ab59edf8fb9f5413
M: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   slots:5461-10922 (5462 slots) master
   1 additional replica(s)
M: fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001
   slots:10923-16383 (5461 slots) master
   1 additional replica(s)
S: ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002
   slots: (0 slots) slave
   replicates fceba6001b95e2169ddd6622436b213324fe8f77
S: cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000
   slots: (0 slots) slave
   replicates 6f369311b0ca4c503f337c4bb23424eed3eeb188
M: 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003
   slots: (0 slots) master
   1 additional replica(s)
S: 71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001
   slots: (0 slots) slave
   replicates cf74b2d9570665b74525802462c74cf2e072ef99
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
How many slots do you want to move (from 1 to 16384)? 4096
What is the receiving node ID? 27266dcfd098dfe2a42361d6ab59edf8fb9f5413
Please enter all the source node IDs.
  Type 'all' to use all the nodes as source nodes for the hash slots.
  Type 'done' once you entered all the source nodes IDs.
Source node #1:all

Ready to move 4096 slots.
  Source nodes:
    M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:0-5460 (5461 slots) master
   1 additional replica(s)
    M: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   slots:5461-10922 (5462 slots) master
   1 additional replica(s)
    M: fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001
   slots:10923-16383 (5461 slots) master
   1 additional replica(s)
  Destination node:
    M: 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003
   slots: (0 slots) master
   1 additional replica(s)
  Resharding plan:
    Moving slot 5461 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5462 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5463 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5464 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5465 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5466 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5467 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5468 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5469 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5470 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5471 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5472 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5473 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5474 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5475 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5476 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5477 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5478 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5479 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5480 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5481 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5482 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5483 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5484 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5485 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5486 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5487 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5488 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5489 from 6f369311b0ca4c503f337c4bb23424eed3eeb188
    Moving slot 5490 from 6f369311b0ca4c503f337c4bb23424eed3eeb188

Moving slot 12283 from 127.0.0.1:9001 to 192.168.81.100:9003: 
Moving slot 12284 from 127.0.0.1:9001 to 192.168.81.100:9003: 
Moving slot 12285 from 127.0.0.1:9001 to 192.168.81.100:9003: 
Moving slot 12286 from 127.0.0.1:9001 to 192.168.81.100:9003: 
Moving slot 12287 from 127.0.0.1:9001 to 192.168.81.100:9003: 
[root@mysql config]# redis-cli -p 9000 cluster slots            # 查看集群中槽的信息
1) 1) (integer) 6827
   2) (integer) 10922
   3) 1) "127.0.0.1"
      2) (integer) 9002
      3) "6f369311b0ca4c503f337c4bb23424eed3eeb188"
   4) 1) "192.168.81.100"
      2) (integer) 9000
      3) "cb8c114d44d289687798508232d31e0a065fdab5"
2) 1) (integer) 12288
   2) (integer) 16383
   3) 1) "127.0.0.1"
      2) (integer) 9001
      3) "fceba6001b95e2169ddd6622436b213324fe8f77"
   4) 1) "192.168.81.100"
      2) (integer) 9002
      3) "ac153a3c1fb10d9d502b153c32dec65c85b2f97c"
3) 1) (integer) 0
   2) (integer) 1364
   3) 1) "192.168.81.100"
      2) (integer) 9003
      3) "27266dcfd098dfe2a42361d6ab59edf8fb9f5413"
   4) 1) "127.0.0.1"
      2) (integer) 9003
      3) "2ff22acb1e006b9881abc80238e15b4e3fcefbef"
4) 1) (integer) 5461
   2) (integer) 6826
   3) 1) "192.168.81.100"
      2) (integer) 9003
      3) "27266dcfd098dfe2a42361d6ab59edf8fb9f5413"
   4) 1) "127.0.0.1"
      2) (integer) 9003
      3) "2ff22acb1e006b9881abc80238e15b4e3fcefbef"
5) 1) (integer) 10923
   2) (integer) 12287
   3) 1) "192.168.81.100"
      2) (integer) 9003
      3) "27266dcfd098dfe2a42361d6ab59edf8fb9f5413"
   4) 1) "127.0.0.1"
      2) (integer) 9003
      3) "2ff22acb1e006b9881abc80238e15b4e3fcefbef"
6) 1) (integer) 1365
   2) (integer) 5460
   3) 1) "192.168.81.101"
      2) (integer) 9000
      3) "cf74b2d9570665b74525802462c74cf2e072ef99"
   4) 1) "192.168.81.100"
      2) (integer) 9001
      3) "71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329"
[root@mysql config]# redis-cli -p 9000 cluster nodes            # 查看集群中节点的信息
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 1539826689921 12 connected
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539826692961 9 connected 6827-10922
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539826693970 2 connected 12288-16383
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539826688916 6 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539826693475 9 connected
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539826690944 12 connected 0-1364 5461-6826 10923-12287
cf74b2d9570665b74525802462c74cf2e072ef99 192.168.81.101:9000 myself,master - 0 0 1 connected 1365-5460
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539826691953 5 connected
[root@mysql config]# redis-cli -p 9000 cluster nodes | grep master      # 只查看master的节点信息
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539826726695 9 connected 6827-10922
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539826728205 2 connected 12288-16383
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539826726192 12 connected 0-1364 5461-6826 10923-12287
cf74b2d9570665b74525802462c74cf2e072ef99 192.168.81.101:9000 myself,master - 0 0 1 connected 1365-5460
```


### 7.Redis Cluster集群收缩

说明：把192.168.81.101:9000这个master及对应slave节点从集群中移除

```
[root@mysql ~]# redis-cli -p 9000 cluster nodes         # 查看集群中的节点信息
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 1539827599055 12 connected
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539827597043 9 connected 6827-10922
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539827598049 2 connected 12288-16383
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539827601066 6 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539827596039 9 connected
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539827600062 12 connected 0-1364 5461-6826 10923-12287
cf74b2d9570665b74525802462c74cf2e072ef99 192.168.81.101:9000 myself,master - 0 0 1 connected 1365-5460         # 要移除的节点的槽编号为：1365到5460
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539827595029 5 connected
[root@mysql ~]# redis-trib.rb reshard --from cf74b2d9570665b74525802462c74cf2e072ef99 --to 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 --slots 1366 127.0.0.1:9001    # 迁移槽，从192.168.81.101:9000迁移到集群中别的节点上
>>> Performing Cluster Check (using node 127.0.0.1:9001)
M: fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001
   slots:12288-16383 (4096 slots) master
   1 additional replica(s)
S: 71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001
   slots: (0 slots) slave
   replicates cf74b2d9570665b74525802462c74cf2e072ef99
M: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   slots:6827-10922 (4096 slots) master
   1 additional replica(s)
M: 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003
   slots:0-1364,5461-6826,10923-12287 (4096 slots) master
   1 additional replica(s)
M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:1365-5460 (4096 slots) master
   1 additional replica(s)
S: ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002
   slots: (0 slots) slave
   replicates fceba6001b95e2169ddd6622436b213324fe8f77
S: 2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003
   slots: (0 slots) slave
   replicates 27266dcfd098dfe2a42361d6ab59edf8fb9f5413
S: cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000
   slots: (0 slots) slave
   replicates 6f369311b0ca4c503f337c4bb23424eed3eeb188
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.

Ready to move 1366 slots.       # 此次可以迁移1366个槽
  Source nodes:
    M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:1365-5460 (4096 slots) master
   1 additional replica(s)
  Destination node:
    M: 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003
   slots:0-1364,5461-6826,10923-12287 (4096 slots) master
   1 additional replica(s)
  Resharding plan:
    Moving slot 1365 from cf74b2d9570665b74525802462c74cf2e072ef99
    Moving slot 1366 from cf74b2d9570665b74525802462c74cf2e072ef99
    ...
    Moving slot 2729 from cf74b2d9570665b74525802462c74cf2e072ef99
    Moving slot 2730 from cf74b2d9570665b74525802462c74cf2e072ef99
Do you want to proceed with the proposed reshard plan (yes/no)? yes
Moving slot 1365 from 127.0.0.1:9000 to 192.168.81.100:9003: 
Moving slot 1366 from 127.0.0.1:9000 to 192.168.81.100:9003: 
...
Moving slot 2728 from 127.0.0.1:9000 to 192.168.81.100:9003: 
Moving slot 2729 from 127.0.0.1:9000 to 192.168.81.100:9003: 
Moving slot 2730 from 127.0.0.1:9000 to 192.168.81.100:9003:
[root@mysql ~]# redis-cli -p 9001 cluster nodes             # 查看集群节点信息
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539827870363 5 connected
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539827868350 9 connected 6827-10922
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539827872375 12 connected 0-2730 5461-6826 10923-12287
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 myself,master - 0 0 2 connected 12288-16383
cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000 master - 0 1539827873385 1 connected 2731-5460         # 还有2731到5460号槽还没有迁移完
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539827867345 6 connected
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 1539827869356 12 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539827871370 9 connected
[root@mysql ~]# redis-trib.rb reshard --from cf74b2d9570665b74525802462c74cf2e072ef99 --to 6f369311b0ca4c503f337c4bb23424eed3eeb188 --slots 2730 127.0.0.1:9002     # 迁移槽，把192.168.81.101:9000剩余的槽迁移到别的节点                     
>>> Performing Cluster Check (using node 127.0.0.1:9002)
M: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   slots:6827-10922 (4096 slots) master
   1 additional replica(s)
S: cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000
   slots: (0 slots) slave
   replicates 6f369311b0ca4c503f337c4bb23424eed3eeb188
S: ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002
   slots: (0 slots) slave
   replicates fceba6001b95e2169ddd6622436b213324fe8f77
S: 2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003
   slots: (0 slots) slave
   replicates 27266dcfd098dfe2a42361d6ab59edf8fb9f5413
S: 71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001
   slots: (0 slots) slave
   replicates cf74b2d9570665b74525802462c74cf2e072ef99
M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:2731-5460 (2730 slots) master
   1 additional replica(s)
M: fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001
   slots:12288-16383 (4096 slots) master
   1 additional replica(s)
M: 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003
   slots:0-2730,5461-6826,10923-12287 (5462 slots) master
   1 additional replica(s)
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.

Ready to move 2730 slots.
  Source nodes:
    M: cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000
   slots:2731-5460 (2730 slots) master
   1 additional replica(s)
  Destination node:
    M: 6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002
   slots:6827-10922 (4096 slots) master
   1 additional replica(s)
  Resharding plan:
    Moving slot 2731 from cf74b2d9570665b74525802462c74cf2e072ef99
    Moving slot 2732 from cf74b2d9570665b74525802462c74cf2e072ef99
    ...
    Moving slot 5459 from cf74b2d9570665b74525802462c74cf2e072ef99
    Moving slot 5460 from cf74b2d9570665b74525802462c74cf2e072ef99
Do you want to proceed with the proposed reshard plan (yes/no)? yes
Moving slot 2731 from 127.0.0.1:9000 to 127.0.0.1:9002: 
Moving slot 2732 from 127.0.0.1:9000 to 127.0.0.1:9002: 
...
Moving slot 5459 from 127.0.0.1:9000 to 127.0.0.1:9002: 
Moving slot 5460 from 127.0.0.1:9000 to 127.0.0.1:9002: 
[root@mysql ~]# redis-cli -p 9001 cluster nodes     # 查看集群中节点的信息
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539828016103 13 connected
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539828017610 13 connected 2731-5460 6827-10922
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539828016605 12 connected 0-2730 5461-6826 10923-12287
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 myself,master - 0 0 2 connected 12288-16383
cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000 master - 0 1539828013588 1 connected       # 192.168.81.101:9000上已经没有槽了
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539828015601 6 connected
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 1539828014593 12 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:9000 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539828012582 13 connected
[root@mysql ~]# redis-cli -p 9001 cluster nodes |grep master
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 master - 0 1539828068951 13 connected 2731-5460 6827-10922
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539828071970 12 connected 0-2730 5461-6826 10923-12287
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 myself,master - 0 0 2 connected 12288-16383
cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:9000 master - 0 1539828073980 1 connected
[root@mysql ~]# redis-trib.rb del-node 127.0.0.1:9001 cb8c114d44d289687798508232d31e0a065fdab5        # 先移除192.168.81.101:9000的slave节点
>>> Removing node cb8c114d44d289687798508232d31e0a065fdab5 from cluster 127.0.0.1:9001
>>> Sending CLUSTER FORGET messages to the cluster...
>>> SHUTDOWN the node.
[root@mysql ~]# redis-trib.rb del-node 127.0.0.1:9001 cf74b2d9570665b74525802462c74cf2e072ef99        # 移除192.168.81.101:9000节点
>>> Removing node cf74b2d9570665b74525802462c74cf2e072ef99 from cluster 127.0.0.1:9001
>>> Sending CLUSTER FORGET messages to the cluster...
>>> SHUTDOWN the node.
[root@mysql ~]# redis-cli -p 9000       # 连接192.168.81.101:9000客户端，显示连接失败
Could not connect to Redis at 127.0.0.1:9000: Connection refused
Could not connect to Redis at 127.0.0.1:9000: Connection refused
not connected> exit
[root@mysql ~]# redis-trib.rb del-node 127.0.0.1:9001 cf74b2d9570665b74525802462c74cf2e072ef99        # 移除192.168.81.101:9000节点，显示移除失败，因为集群中已经没有这个节点了 
>>> Removing node cf74b2d9570665b74525802462c74cf2e072ef99 from cluster 127.0.0.1:9001
[ERR] No such node ID cf74b2d9570665b74525802462c74cf2e072ef99
[root@mysql ~]# redis-cli -p 9002 cluster nodes     # 查看集群中的节点信息
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:9002 myself,master - 0 0 13 connected 2731-5460 6827-10922
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:9002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539828535088 6 connected
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:9003 slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 1539828539118 12 connected
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:9001 slave 6f369311b0ca4c503f337c4bb23424eed3eeb188 0 1539828536098 13 connected
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:9001 master - 0 1539828537106 2 connected 12288-16383
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:9003 master - 0 1539828538114 12 connected 0-2730 5461-6826 10923-12287
```


### 8.使用官方工具安装集群的优点

```
简单高效，准确
生产环境可以使用
```

