---
title: "[转] 高可用Redis(九)：Redis Sentinel"
date: 2021-06-26 10:24:08
toc: true
categories:
- ["开发","Redis"]
---

[高可用Redis(九)：Redis Sentinel](https://www.cnblogs.com/renpingsheng/p/9803838.html)





## 1.主从复制高可用的问题

主从复制高可用的作用

```
1.为master提供备份，当master宕机时，slave有完整的备份数据
2.对master实现分流，实现读写分离
```

但是主从架构有一个问题

1.如果master宕机，故障转移需要手动完成或者由别的工具来完成，从slave中选择一个slave做为新的master

```
写能力和存储能力受限
只能在一个节点是写入数据
所有数据只能保存在一个节点上
```

![](https://file.wulicode.com/yuque/202208/04/15/0115gaMN6DjD.png?x-oss-process=image/resize,h_485)

上图模拟了主从复制架构中一主两从情况下，master宕机，则slave从master同步数据也断开，此时client向master写入数据会失败，读写分离时读取数据正常，但不能更新数据

master出现故障之后，手动进行故障转移步骤

```
1.选择一个slave，执行slave no one命令使之成为一个master
```

![](https://file.wulicode.com/yuque/202208/04/15/0115Vln6Eu1c.png?x-oss-process=image/resize,h_492)

```
2.对其余的slave执行slaveof new master命令，将这些slave指定为新的master的slave
```

![](https://file.wulicode.com/yuque/202208/04/15/0116wCPEwUUM.png?x-oss-process=image/resize,h_505)

```
3.client会对新的master进行写入数据，从slave中读取原来的数据
```

![](https://file.wulicode.com/yuque/202208/04/15/0117kbZJtYrq.png?x-oss-process=image/resize,h_481)

上面的操作过程需要手动完成，或者编写脚本，由脚本来执行这个过程，但是这个过程是有问题的：

```
怎么判断一个Redis节点是有问题的，怎么通知client对新master进行写入操作
怎么保证一个完整的事务实现过程
```

上面的过程就可以使用Redis Sentinel来实现


## 2.Redis Sentinel架构说明

Redis Sentinel的功能：对Redis节点进行监控，故障判断，故障转移，故障通知

![](https://file.wulicode.com/yuque/202208/04/15/0117YxILaegt.png?x-oss-process=image/resize,h_560)

对于Redis的主从架构，Redis Sentinel会运行几个sentinel进程

sentinel进程不操作数据，而是对Redis故障进行判断和转移

同时多个sentinel运行，即使一个sentinel进程运行异常，还有别的sentinel继续运行，可以保证对故障节点判断的准确性，同时保证Redis的高可用

对于redis-cli来说，Redis cli不会再记录Redis的IP和端口，而是从sentinel获取Redis信息，然后进行连接Redis节点，进行数据写入和读取操作

多个Redis Sentinel对所有的master和slave进行监控，会实时记录master和slave的地址信息

![](https://file.wulicode.com/yuque/202208/04/15/0118xTgRki2W.png?x-oss-process=image/resize,h_581)


### Redis Sentinel故障转移步骤：

```
1.当某个master发生故障，多个sentinel会监控到这个异常，这些sentinel会按照一定规则从多个slave中选中一个做为新的master,并通知别的slave从新的master中同步数据
2.当某个slave转换为新的master，sentinel会记录新的master的地址信息和slave的地址信息，通知Redis cli
3.Redis cli接收到新的master和slave的信息，就会向新的master写入数据，从slave中读取数据
4.等到原来的master重启之后，会变成新的master的slave,并从新的master同步数据
```

![](https://file.wulicode.com/yuque/202208/04/15/0119icDutDPz.png?x-oss-process=image/resize,h_538)

在上面的步骤里，sentinel实现了Redis的故障自动发现，自动转移和自动通知

> 说明：一套Redis sentinel集合可以通知master-name做为标识同时监控多套主从架构



## 3.Redis Sentinel安装配置


### 3.1 环境说明

实验在两台虚拟机上完成，IP地址分别为：192.168.81.100和192.168.81.101

在两台虚拟机上运行4个redis-server,其中

```
192.168.81.100的6379端口为master节点
192.168.81.100的6380端口为slave节点
192.168.81.101的6379端口和6380端口为slave节点
```

在192.168.81.101的26379，26380，26381端口开启三个sentinel进行监控


### 3.2 在192.168.81.100虚拟机上配置主从节点

```
[root@localhost ~]# cd /etc/                            # 进入/etc目录
[root@localhost ~]# systemctl stop redis                # 关闭系统中运行的redis
[root@localhost etc]# cp redis.conf redis_6379.conf     # 复制redis配置文件，以端口区分，方便后面进行配置
[root@localhost etc]# cp redis.conf redis_6380.conf     # 复制redis配置文件，以端口区分，方便后面进行配置
[root@localhost etc]# vi redis_6379.conf                # 编辑redis-server配置文件，修改下面几行
    bind 0.0.0.0                                        # 修改bing选项，才能从系统外连接redis
    protected-mode yes                                  # 开启保存模式
    port 6379                                           # 指定redis运行的端口
    daemonize yes                                       # 以守护进程启动redis
    pidfile "/var/run/redis_6379.pid"                   # 指定redis运行时pid保存路径
    logfile "/var/log/redis/redis_6379.log"             # 指定redis运行时日志保存路径
    dir /var/lib/redis_6379                             # 指定redis运行时数据文件保存路径

[root@localhost etc]# vi redis_6380.conf                # 修改redis-server,修改下面几行
    bind 0.0.0.0
    port 6380                                           # 指定redis运行的端口
    daemonize yes
    pidfile "/var/run/redis_6380.pid"
    logfile "/var/log/redis/redis_6380.log"
    dir /var/lib/redis_6380
    slaveof 192.168.81.100 6379                         # 指定redis-server为192.168.81.100:6379的slave

[root@localhost etc]# redis-server /etc/redis_6379.conf     # 指定配置文件运行redis-server
[root@localhost etc]# redis-server /etc/redis_6380.conf     # 指定配置文件运行redis-server
[root@localhost etc]# ps aux | grep redis-server            # 查看redis-server是否运行
root       2548  0.3  1.7 155192 17720 ?        Ssl  23:14   0:00 redis-server 0.0.0.0:6379
root       2562  1.3  1.7 155192 17596 ?        Ssl  23:15   0:00 redis-server 0.0.0.0:6380
root       2567  0.0  0.0 112648   960 pts/3    R+   23:15   0:00 grep --color=auto redis-server
[root@localhost etc]# redis-cli -p 6380 info replication    # 进入6380端口运行redis客户端，并执行'info replication'命令
# Replication
role:slave                              # 角色为slave
master_host:192.168.81.100              # master为192.168.81.100
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0
slave_repl_offset:1919
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```


### 3.3 在192.168.81.101虚拟机上配置从节点

```
[root@mysql ~]# cd /etc/                                # 操作同192.168.81.100相同
[root@mysql ~]# systemctl stop redis
[root@mysql etc]# cp redis.conf redis_6379.conf
[root@mysql etc]# cp redis.conf redis_6380.conf
[root@mysql etc]# vi redis_6379.conf
    bind 0.0.0.0
    protected-mode yes
    port 6379
    daemonize yes
    pidfile "/var/run/redis_6379.pid"
    logfile "/var/log/redis/redis_6379.log"
    dir /var/lib/redis_6379
    slaveof 192.168.81.100 6379                         # 指定redis-server为192.168.81.100:6379的slave

[root@mysql etc]# vi redis_6380.conf    
    bind 0.0.0.0
    port 6380
    daemonize yes
    pidfile "/var/run/redis_6380.pid"
    logfile "/var/log/redis/redis_6380.log"
    dir /var/lib/redis_6380
    slaveof 192.168.81.100 6379                         # 指定redis-server为192.168.81.100:6379的slave

[root@mysql etc]# redis-server /etc/redis_6379.conf     # 指定配置文件运行redis-server
[root@mysql etc]# redis-server /etc/redis_6380.conf     # 指定配置文件运行redis-server
[root@mysql ~]# ps aux | grep redis-server              # 查看redis-server是否运行
root       2178  0.2  0.8 155204 17728 ?        Ssl  15:10   0:02 redis-server 0.0.0.0:6379
root       2184  0.2  0.8 155204 17724 ?        Ssl  15:10   0:02 redis-server 0.0.0.0:6380
root       2411  0.0  0.0 112664   972 pts/2    R+   15:29   0:00 grep --color=auto redis-server
[root@mysql ~]# redis-cli -p 6379 info replication
# Replication
role:slave                              # 角色为slave
master_host:192.168.81.100              # master为192.168.81.100
master_port:6379
master_link_status:up
master_last_io_seconds_ago:6
master_sync_in_progress:0
slave_repl_offset:1961
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
[root@mysql ~]# redis-cli -p 6380 info replication   
# Replication
role:slave                              # 角色为slave
master_host:192.168.81.100              # master为192.168.81.100
master_port:6379
master_link_status:up
master_last_io_seconds_ago:2
master_sync_in_progress:0
slave_repl_offset:1975
slave_priority:100
slave_read_only:1
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0
```


### 3.4 在192.168.81.101虚拟机上配置并运行sentinel

```
[root@mysql etc]# cp redis-sentinel.conf sentinel_26379.conf    # 复制sentinel配置文件，方便区分
[root@mysql etc]# cp redis-sentinel.conf sentinel_26380.conf    # 复制sentinel配置文件，方便区分
[root@mysql etc]# cp redis-sentinel.conf sentinel_26381.conf    # 复制sentinel配置文件，方便区分
[root@mysql etc]# vi sentinel_26379.conf                        # 修改sentinel配置文件,修改下面几行
    daemonize yes                                               # 以守护进程方式启动
    port 26379                                                  # 指定端口
    protected-mode no                                           # 关闭保护模式
    sentinel monitor mymaster 192.168.81.100 6379 2             # 设置sentinel监控信息
    logfile /var/log/redis/sentinel_26379.log                   # 设置日志文件保存路径
[root@mysql etc]# vi sentinel_26380.conf 
    daemonize yes
    port 26380  
    protected-mode no  
    sentinel monitor mymaster 192.168.81.100 6379 2
    logfile /var/log/redis/sentinel_26380.log
[root@mysql etc]# vi sentinel_26381.conf 
    protected-mode no  
    port 26381
    daemonize yes  
    sentinel monitor mymaster 192.168.81.100 6379 2
    logfile /var/log/redis/sentinel_26381.log
[root@mysql etc]# redis-sentinel /etc/sentinel_26379.conf       # 指定配置文件，启动Redis Sentinel
[root@mysql etc]# redis-sentinel /etc/sentinel_26380.conf       # 指定配置文件，启动Redis Sentinel  
[root@mysql etc]# redis-sentinel /etc/sentinel_26381.conf       # 指定配置文件，启动Redis Sentinel
[root@mysql etc]# ps aux | grep sentinel                        # 查看Redis Sentinel是否运行
root       2709  0.9  0.2 142916  5464 ?        Ssl  15:49   0:00 redis-sentinel *:26379 [sentinel]
root       2713  1.1  0.2 142916  5472 ?        Ssl  15:49   0:00 redis-sentinel *:26380 [sentinel]
root       2717  2.0  0.2 142916  5476 ?        Rsl  15:49   0:00 redis-sentinel *:26381 [sentinel]
root       2721  0.0  0.0 112664   964 pts/2    R+   15:49   0:00 grep --color=auto sentinel
[root@mysql ~]# redis-cli -p 26379
127.0.0.1:26379> ping                                           # 执行ping操作
PONG
127.0.0.1:26379> info sentinel                                  # 查看所有sentinel的信息
# Sentinel
sentinel_masters:1
sentinel_tilt:0
sentinel_running_scripts:0
sentinel_scripts_queue_length:0
sentinel_simulate_failure_flags:0
master0:name=mymaster,status=ok,address=192.168.81.100:6379,slaves=3,sentinels=3                   # 被监控的Redis主从架构命名为mymaster，被监控Redis节点的master为192.168.81.100L6379,有三个slave,同时有3个sentinel运行
127.0.0.1:26379> exit
[root@mysql ~]# grep -v '^#' /etc/sentinel_26379.conf | grep -v '^/div>     #查看sentinel_26379配置文件，去除注释和空行，Redis Sentinel向配置文件中添加了几行内容
port 26379                                                  # sentinel运行的端口
dir "/tmp"
sentinel myid 9611958fc3e8b7c2be43385e44be88f87d725a77
sentinel monitor mymaster 192.168.81.100 6379 2             # sentinel监控的Redis节点名为mymaster,master地址为192.168.81.100:6379,quorem设置为2
sentinel config-epoch mymaster 0
sentinel leader-epoch mymaster 0
logfile "/var/log/redis/sentinel_26379.log"
daemonize yes
sentinel known-slave mymaster 192.168.81.101 6379           # sentinel探测到的slave
sentinel known-slave mymaster 192.168.81.100 6380           # sentinel探测到的slave
sentinel known-slave mymaster 192.168.81.101 6380           # sentinel探测到的slave
sentinel known-sentinel mymaster 192.168.81.101 26380 17ca0cb82becb58bd24e5a87ee3b6e8e9a49caf1                    # Redis Sentinel深测到的别的运行的sentinel
sentinel known-sentinel mymaster 127.0.0.1 26381 fb9342f3007e2abff165f5c33de1d48cf089f062                    # Redis Sentinel深测到的别的运行的sentinel
sentinel current-epoch 0
[root@mysql ~]# grep -v '^#' /etc/sentinel_26380.conf | grep -v '^/div>  
port 26380
dir "/tmp"
sentinel myid 17ca0cb82becb58bd24e5a87ee3b6e8e9a49caf1
sentinel monitor mymaster 192.168.81.100 6379 2
sentinel config-epoch mymaster 0
sentinel leader-epoch mymaster 0
logfile "/var/log/redis/sentinel_26380.log"
daemonize yes
sentinel known-slave mymaster 192.168.81.101 6379
sentinel known-slave mymaster 192.168.81.101 6380
sentinel known-slave mymaster 192.168.81.100 6380
sentinel known-sentinel mymaster 127.0.0.1 26381 fb9342f3007e2abff165f5c33de1d48cf089f062
sentinel known-sentinel mymaster 192.168.81.101 26379 9611958fc3e8b7c2be43385e44be88f87d725a77
sentinel current-epoch 0
[root@mysql ~]# grep -v '^#' /etc/sentinel_26381.conf | grep -v '^/div> 
port 26381
daemonize yes
dir "/tmp"
sentinel myid fb9342f3007e2abff165f5c33de1d48cf089f062
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel config-epoch mymaster 0
sentinel leader-epoch mymaster 0
logfile "/var/log/redis/sentinel_26381.log"
sentinel known-sentinel mymaster 127.0.0.1 26380 17ca0cb82becb58bd24e5a87ee3b6e8e9a49caf1
sentinel known-sentinel mymaster 192.168.81.101 26379 9611958fc3e8b7c2be43385e44be88f87d725a77
sentinel current-epoch 0
```

至此，3个sentinel已经正常运行了


### 3.5 python客户端持续通过sentinel向Redis写入数据，读取数据

```
import random
import time
from redis.sentinel import Sentinel

sentinel = Sentinel([
    ('192.168.81.101',26379),
    ('192.168.81.101',26380),
    ('192.168.81.101',26381),
],socket_timeout=0.1)               # 传入Redis Sentinel集合

while True:
    try:
        master = sentinel.discover_master('mymaster')
        print('current master IP:',master)          # 打印当前master的IP地址和端口
        val = random.randint(0,10000)               # 获取10000以内随机整数
        key = 'k%d' % val
        m = sentinel.master_for('mymaster', socket_timeout=0.5)
        m.set(key,'val%d' % val)                    # 通过sentinel向master节点写入数据
        v = m.get(key)                              # 通过sentinel读取数据
        print('{0} value is {1}'.format(key,v))
        time.sleep(1)
    except Exception as e:
        print("get no val:",e)
```

运行上面的代码：

```
current master IP: ('192.168.81.100', 6379)
k6081 value is b'val6081'
current master IP: ('192.168.81.100', 6379)
k1778 value is b'val1778'
current master IP: ('192.168.81.100', 6379)
k4927 value is b'val4927'
current master IP: ('192.168.81.100', 6379)
k4074 value is b'val4074'
current master IP: ('192.168.81.100', 6379)
k1138 value is b'val1138'
current master IP: ('192.168.81.100', 6379)
k862 value is b'val862'
current master IP: ('192.168.81.100', 6379)
k4854 value is b'val4854'
current master IP: ('192.168.81.100', 6379)
k9233 value is b'val9233'
current master IP: ('192.168.81.100', 6379)
k6844 value is b'val6844'
current master IP: ('192.168.81.100', 6379)
k8089 value is b'val8089'
```


### 3.6 在192.168.81.100虚拟机上模拟master故障

```
[root@localhost etc]# redis-cli -p 6379                 # 连接6379端口连接redis-server
127.0.0.1:6379> info server                             # 执行命令查看当前redis-server的进程ID
# Server
redis_version:3.2.10
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:c8b45a0ec7dc67c6
redis_mode:standalone
os:Linux 3.10.0-514.el7.x86_64 x86_64
arch_bits:64
multiplexing_api:epoll
gcc_version:4.8.5
process_id:2548                                         # 192.168.81.100:6379这个master节点的进程ID为2548
run_id:8ae71ba92660697d52bfb74b99fb15ee82a7cf84
tcp_port:6379
uptime_in_seconds:6552
uptime_in_days:0
hz:10
lru_clock:12896355
executable:/etc/redis-server
config_file:/etc/redis_6379.conf
127.0.0.1:6379> exit
[root@localhost etc]# kill -9 2548                      # 在系统中kill掉2548这个进程
[root@localhost etc]# ps aux | grep redis-server        # 查看redis-server运行的进程，2548已经被终止
root       2562  0.2  1.7 155192 17756 ?        Ssl  Oct15   0:19 redis-server 0.0.0.0:6380
root       2651  0.0  0.0 112648   960 pts/3    S+   01:19   0:00 grep --color=auto redis-server
```


### 3.7 查看python代码执行结果

```
current master IP: ('192.168.81.100', 6379)
1539597332.9189174 k6187 value is b'val6187'
current master IP: ('192.168.81.100', 6379)
1539597333.9236474 k1462 value is b'val1462'
current master IP: ('192.168.81.100', 6379)
get no val: Timeout connecting to server
current master IP: ('192.168.81.100', 6379)
get no val: Timeout connecting to server
current master IP: ('192.168.81.100', 6379)
get no val: Timeout connecting to server
...中间报错信息省略
get no val: No master found for 'mymaster'
get no val: No master found for 'mymaster'
get no val: DENIED Redis is running in protected mode because protected mode is enabled, no bind address was specified, no authentication password is requested to clients. In this mode connections are only accepted from the loopback interface. If you want to connect from external computers to Redis you may adopt one of the following solutions: 1) Just disable protected mode sending the command 'CONFIG SET protected-mode no' from the loopback interface by connecting to Redis from the same host the server is running, however MAKE SURE Redis is not publicly accessible from internet if you do so. Use CONFIG REWRITE to make this change permanent. 2) Alternatively you can just disable the protected mode by editing the Redis configuration file, and setting the protected mode option to 'no', and then restarting the server. 3) If you started the server manually just for testing, restart it with the '--protected-mode no' option. 4) Setup a bind address or an authentication password. NOTE: You only need to do one of the above things in order for the server to start accepting connections from the outside.
get no val: No master found for 'mymaster'
...中间报错信息省略
get no val: DENIED Redis is running in protected mode because protected mode is enabled, no bind address was specified, no authentication password is requested to clients. In this mode connections are only accepted from the loopback interface. If you want to connect from external computers to Redis you may adopt one of the following solutions: 1) Just disable protected mode sending the command 'CONFIG SET protected-mode no' from the loopback interface by connecting to Redis from the same host the server is running, however MAKE SURE Redis is not publicly accessible from internet if you do so. Use CONFIG REWRITE to make this change permanent. 2) Alternatively you can just disable the protected mode by editing the Redis configuration file, and setting the protected mode option to 'no', and then restarting the server. 3) If you started the server manually just for testing, restart it with the '--protected-mode no' option. 4) Setup a bind address or an authentication password. NOTE: You only need to do one of the above things in order for the server to start accepting connections from the outside.
current master IP: ('192.168.81.101', 6379)
1539597365.971147 k3568 value is b'val3568'
current master IP: ('192.168.81.101', 6379)
1539597366.974567 k7745 value is b'val7745'
current master IP: ('192.168.81.101', 6379)
1539597367.9783657 k6281 value is b'val6281'
current master IP: ('192.168.81.101', 6379)
```

可以看到`初始master是192.168.81.100:6379`，在系统命令提示符中kill掉6379端口的redis-server后，python程序从`1539597333.9236474`秒后一直抛出异常，直到`1539597365.971147`秒，python程序通过sentinel获取到新的master为`192.168.81.101:6379`。

`1539597365.971147`减去`1539597333.9236474`恰好就是sentinel配置文件中`sentinel down-after-milliseconds mymaster`选项设定的`30000毫秒`，也就是30秒


### 3.8 查看Redis Sentinel的日志

在192.168.81.101虚拟机上查看`/var/log/redis/sentinel_26379.log`日志，下面的部分日志就是sentinel在切换master的记录

```
4067:X 15 Oct 17:55:40.303 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:42.119 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:42.334 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:44.208 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:44.349 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:46.266 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:46.365 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:48.419 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:48.481 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:50.429 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:50.506 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:52.548 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:52.571 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:54.592 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:54.598 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:56.655 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:56.662 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:58.734 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:55:58.886 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:00.798 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:00.972 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:02.884 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:03.042 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:04.917 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:05.099 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:07.045 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:07.112 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:09.145 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:09.324 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:11.218 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:11.345 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:12.211 # +sdown master mymaster 192.168.81.100 6379
4067:X 15 Oct 17:56:12.345 # +new-epoch 8
4067:X 15 Oct 17:56:12.346 # +vote-for-leader fb9342f3007e2abff165f5c33de1d48cf089f062 8
4067:X 15 Oct 17:56:13.267 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:13.269 * +sentinel-address-switch master mymaster 192.168.81.100 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:13.289 # +odown master mymaster 192.168.81.100 6379 #quorum 2/2
4067:X 15 Oct 17:56:13.289 # Next failover delay: I will not start a failover before Mon Oct 15 18:02:13 2018
4067:X 15 Oct 17:56:13.440 # +config-update-from sentinel fb9342f3007e2abff165f5c33de1d48cf089f062 192.168.81.101 26381 @ mymaster 192.168.81.100 6379
4067:X 15 Oct 17:56:13.441 # +switch-master mymaster 192.168.81.100 6379 192.168.81.101 6379
4067:X 15 Oct 17:56:13.441 * +slave slave 192.168.81.101:6380 192.168.81.101 6380 @ mymaster 192.168.81.101 6379
4067:X 15 Oct 17:56:13.441 * +slave slave 192.168.81.100:6380 192.168.81.100 6380 @ mymaster 192.168.81.101 6379
4067:X 15 Oct 17:56:13.441 * +slave slave 192.168.81.100:6379 192.168.81.100 6379 @ mymaster 192.168.81.101 6379
4067:X 15 Oct 17:56:15.586 * +sentinel-address-switch master mymaster 192.168.81.101 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:15.604 * +sentinel-address-switch master mymaster 192.168.81.101 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:15.689 * +sentinel-address-switch master mymaster 192.168.81.101 6379 ip 127.0.0.1 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
4067:X 15 Oct 17:56:15.693 * +sentinel-address-switch master mymaster 192.168.81.101 6379 ip 192.168.81.101 port 26381 for fb9342f3007e2abff165f5c33de1d48cf089f062
```

从上面的日志可以看出，`在17:56:13.441时间点sentinel把master从182.168.81.100:6379切换到192.168.81.101:6379`


## 4.Redis Sentinel客户端连接(python版)

Redis Sentinel的高可用指的是服务端的高可用，对于Redis服务端的master宕机，sentinel可以对故障实现自动发现，自动转移，自动通知。这个过程客户端是感知不到的

Redis高可用即依赖于服务端的高可用，又依赖于客户端的高可用

通过分析Redis Sentinel的请求响应流程，可以知道客户端实现高可用步骤：

```
1.客户端遍历sentinel节点集合，获取一个可用的sentinel节点，同时获取masterName
2.在可用的sentinel节点上执行sentinel的API，获取master的地址和端口
3.在sentinel内部，sentinel会按照一定频率在master或者slave上执行info命令，获取对应节点的信息
4.客户端获取到master的地址和端口，会执行role命令或者role replication命令，对master进行验证
5.当master出现故障，sentinel按照算法从slave中选出一个做为新的master，同时把其余的slave做为新的master的slave
6.sentinel维护一个频道，sentinel在这个频道中发布消息，指出新master的IP和端口
7.客户端订阅这个频道，接收消息后就知道新master的IP和端口，向新master连接进行数据处理
```

原理图如下

![](https://file.wulicode.com/yuque/202208/04/15/0120IQ1rkV6C.png?x-oss-process=image/resize,h_581)

python客户端接入Redis Sentinel需要两个参数：sentinel地址集合，masterName

> 需要注意的是Redis节点的配置文件中的`protected-mode`必须设置为`yes`，否则连接会失败


```
from redis.sentinel import Sentinel

sentinel = Sentinel([
    ('192.168.81.101',26379),
    ('192.168.81.101',26380),
    ('192.168.81.101',26381),
],socket_timeout=0.1)

master = sentinel.discover_master('mymaster')
print(master)       # ('192.168.81.100', 6379)
slave = sentinel.discover_slaves('mymaster')
print(slave)        # [('192.168.81.100', 6380), ('192.168.81.101', 6379), ('192.168.81.101', 6380)]
```


## 5.Redis Sentinel实现原理


### 5.1 Redis Sentinel内部的三个定时任务

Redis Sentinel内部有三个定时任务来对redid节点进行故障判断和转移

- 1.每10秒每个sentinel对master和slave执行`info`命令，以发现slave节点和确认主从关系

sentinel在master节点执行`info replication`命令，从命令执行结果中解析出slave节点

![](https://file.wulicode.com/yuque/202208/04/15/01217PmEwA9p.png?x-oss-process=image/resize,h_548)

- 2.每2秒每个sentinel通过master节点的channel交换信息(发布订阅)

master节点上有一个发布订阅的channel频道：`__sentinel__:hello`，用于所有sentinel之间进行信息交换

一个sentinel发布消息，消息包含当前sentinel节点的信息，对其他sentinel节点的判断以及当前sentinel对master节点和slave节点的一些判断

其他sentinel都可以接收到这条消息

新加入sentinel节点时，sentinel节点之间可以相互感知，以达到信息交互的功能

![](https://file.wulicode.com/yuque/202208/04/15/0121sZIEmwu9.png?x-oss-process=image/resize,h_539)

- 3.每1秒每个sentinel对其他sentinel节点和Redis节点执行ping操作

每个sentinel都可以知道其他sentinel节点，当监控的master发生故障时，方便进行判断和新master的挑选，这个定时任务是master进行故障判定的依据

![](https://file.wulicode.com/yuque/202208/04/15/0122mwLwbY6f.png?x-oss-process=image/resize,h_544)


### 5.2 主观下线和客观下线

主观下线：每个sentinel节点对Redis节点失败的'偏见'

在redis-sentinel配置文件中，有下面这种配置

```
sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel down-after-milliseconds <master-name> <timeout>
```

一个sentinel集合可以同时监控多个master,slave的节点

```
sentinel对多个master，slave节点进行区分的标识就是master-name,ip和port是master节点的IP地址和端口,quorum是master客观下线之后sentinel进行判断的节点数
```

sentinel对master进行主观下线判断的时间，单们为毫秒

```
每个sentinel每秒对master和slave执行ping操作，当sentinel对master或slave在timeout定义的毫秒时间内没有回复，则sentinel会认为这个节点已经被主观下线了
```

在前面的例子中对sentinel的配置是

```
sentinel monitor mymaster 192.168.81.100 6379 2
sentinel down-after-milliseconds mymaster 30000
```

解释：

```
sentinel集合监控名为mymaster的master,slave节点
被监控的master节点的IP地址是192.168.81.100，端口为6379，
sentinel会在`__sentinel__:hello`频道中交流对master节点的看法，如果sentinel节点都对master节点ping失败'达成共识'，sentinel个数超过quorum的个数，sentinel集合则会认为master节点客观下线
当两个sentinel对master节点执行ping操作，在30000毫秒(30秒)时间内没有得到回复，则认为节点已经被主观下线
```

> quorum建议设置为：(sentinel节点数 / 2) + 1，可以根据应用场景进行设定



### 5.3 sentinel领导者选举

要点：

```
只需要一个sentinel节点就可以完成故障转移
通过`sentinel is-master-down-by-addr`命令来完成sentinel交换对master节点的失败判定和新master的选举
```

完成sentinel领导者选举步骤：

```
1.每个做主观下线的sentinel节点向其他sentinel节点发送命令，要求将自己设置为领导者
2.收到命令的sentinel节点如果没有同意同意其他sentinel节点发送的命令，那么将同意该请求，否则拒绝
3.如果该sentinel节点发现自己的票数已经超过sentinel集合半数且超过quorum，将成为领导者
4.如果此过程中有多个sentinel节点成为领导者，那么将等待一段时间重新进行选举
```


### 5.4 故障转移(由sentinel领导者节点完成)

故障转移步骤：

```
1.从slave节点中选出一个合适的节点作为新的master节点
2.对选出的slave节点执行`slaveof no one`命令，使成为新的master节点
3.向剩余的slave节点发送命令，让slave节点成为新master节点的slave节点，然后从新master节点同步数据
    数据同步规则和parallel-syncs参数有关
    如一个一主三从架构中，master故障，sentinel领导者从3个slave中选出一个作为新的master节点，剩余的两个slave节点会成为新master节点的slave，从新master节点同步同步数据
    master节点只需要生成一次RDB文件
        如果parallel-syncs参数设置为1，则剩余两个slave节点会按顺序从新master节点拷贝数据，一个slave切点拷贝完成，另外一个slave才会从新master节点拷贝数据
        如果parallel-syncs参数设置为2，则两个slave节点会同时从master节点进行数据拷贝，这无疑会加入新master的开销
4.sentinel领导者会把原来的master节点设置为slave节点，并保持对其'关注'，当原来的master节点恢复后，sentinel会使其去复制新master节点的数据
```


### 5.5 slave节点的选择

slave节点选择规则

```
1.选择slave-priority(slave节点优先级)最高的slave节点，如果存在则返回，不存在则继续
2.选择复制偏移量(offset)最大的slave节点,offset最大说明对master的数据复制的最完整，如果存在则返回，不存在则继续
3.选择run_id最小的slave节点，run_id最小说明slave节点启动最早
```


## 6.总结：

```
Redis Sentinel是Redis的高可用实现方案：故障发现，故障自动转移，配置中心，客户端通知
Redis Sentinel是Redis 2.8版本开始才正式生产可用，之前版本不可用于生产
尽可以在不同物理机上部署Redis Sentinel所有节点，但是最好一个局域网内
Redis Sentinel中sentinel节点个数应该大于等于3，且最好为奇数，可以保证判断的公平
Redis Sentinel中的数据节点与普通数据节点没有区别
客户端初始化时连接的是Sentinel节点集合，不是具体的Redis节点，但是Sentinel只是配置中心不是代理
Redis Sentinel通过三个定时任务实现了Sentinel节点对于master，slave，其余sentinel节点的监控
Redis Sentinel在对节点做失败判定时分为主观下线和客观下线
看懂Redis Sentinel故障转移日志对于Redis Sentinel以及问题排查非常有帮助
Redis Sentinel实现读写分离高可用可以依赖Redis Sentinel节点的消息通知，获取Redis数据节点的状态变化
```

