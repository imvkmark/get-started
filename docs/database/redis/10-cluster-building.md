# Redis原生命令搭建集群

[高可用Redis(十)：Redis原生命令搭建集群](https://www.cnblogs.com/renpingsheng/p/9813959.html)





## 1.搭建Redis Cluster主要步骤

```
1.配置开启节点
2.meet
3.指派槽
4.主从关系分配
```


## 2.环境说明

```
两台虚拟机，IP地址分别为：192.168.81.100和192.168.81.101
两台虚拟机操作系统均为：CentOS 7.5 64位
两台虚拟机系统说明：
    使用yum方式安装Redis
    关闭firewalld防火墙
使用两台虚拟机的7000,7001,7002端口搭建三主三从的Redis Cluster
    其中192.168.81.100主机三个端口启动的Redis Server为主节点
    192.168.81.101主机三个端口启动的Redis Server为从节点
```


## 3.搭建Redis Cluster步骤


### 3.1 在192.168.81.100虚拟机上操作

```
[root@host1 etc]# cd /opt
[root@host1 opt]# mkdir config
[root@host1 opt]# cd config
[root@host1 config]# vi redis_7000.conf             # 创建7000端口运行需要的配置文件，文件内容如下
    port 7000
    daemonize yes
    dir '/var/lib/redis'
    logfile '/var/log/redis/redis_7000.log'
    dbfilename 'redis_7000.data'
    cluster-enabled yes
    cluster-config-file nodes-7000.conf
    cluster-require-full-coverage no
[root@host1 config]# sed 's/7000/7001/g' redis_7000.conf > redis_7001.conf  # 把redis_7000.conf文件中的7000替换成7001，并生成redis_7001.conf文件
[root@host1 config]# sed 's/7000/7002/g' redis_7000.conf > redis_7002.conf  # 把redis_7000.conf文件中的7000替换成7002，并生成redis_7002.conf文件
[root@host1 config]# redis-server /opt/config/redis_7000.conf               # 指定配置文件，启动redis server节点
[root@host1 config]# redis-server /opt/config/redis_7001.conf               # 指定配置文件，启动redis server节点            
[root@host1 config]# redis-server /opt/config/redis_7002.conf               # 指定配置文件，启动redis server节点
[root@host1 config]# ps aux | grep redis-server                             # 查看redis-server进程运行情况                        
root       2444  0.1  0.5 142904  5328 ?        Ssl  19:38   0:00 redis-server *:7000 [cluster]
root       2475  0.0  0.5 142904  5328 ?        Ssl  19:39   0:00 redis-server *:7001 [cluster]
root       2479  0.2  0.5 142904  5328 ?        Ssl  19:39   0:00 redis-server *:7002 [cluster]
root       2483  0.0  0.0 112648   964 pts/0    R+   19:39   0:00 grep --color=auto redis-server
```


### 3.2 在192.168.81.101虚拟机上进行第一步的操作，生成三个配置文件,并启动Redis server

```
[root@mysql config]# redis-server /opt/config/redis_7000.conf               # 指定配置文件，启动redis server节点
[root@mysql config]# redis-server /opt/config/redis_7001.conf               # 指定配置文件，启动redis server节点           
[root@mysql config]# redis-server /opt/config/redis_7002.conf               # 指定配置文件，启动redis server节点
[root@mysql config]# ps aux  | grep redis-server                            # 查看redis-server的进程运行情况                        
root       1704  0.1  0.2 142916  5344 ?        Ssl  19:41   0:00 redis-server *:7000 [cluster]
root       1736  0.0  0.2 142916  5344 ?        Ssl  19:41   0:00 redis-server *:7001 [cluster]
root       1740  0.0  0.2 142916  5340 ?        Ssl  19:42   0:00 redis-server *:7002 [cluster]
```


### 3.3 在192.168.81.100虚拟机上查看cluster节点的信息

```
[root@host1 config]# redis-cli -p 7000
127.0.0.1:7000> set hello world             # 向当前节点执行写入命令，失败
(error) CLUSTERDOWN Hash slot not served
127.0.0.1:7000> cluster nodes               # 查看集群节点信息，只有当前节点的信息，且显示为主节点
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed :7000 myself,master - 0 0 0 connected
127.0.0.1:7000> cluster info                # 查看cluster的信息
cluster_state:fail                          # 集群为失败状态
cluster_slots_assigned:0
cluster_slots_ok:0                          # 当前集群中有0个slot(槽)
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:1                       # 当前集群中节点个数为1
cluster_size:0
cluster_current_epoch:0
cluster_my_epoch:0
cluster_stats_messages_sent:0
cluster_stats_messages_received:0
127.0.0.1:7000> exit
[root@host1 config]# cd /var/lib/redis/
[root@host1 redis]# ls              
dump.rdb  nodes-7000.conf  nodes-7001.conf  nodes-7002.conf
[root@host1 redis]# cat nodes-7000.conf    # 查看7000端口上运行的redis-server的run_id与执行cluster nodes命令得到的run_id相同
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed :0 myself,master - 0 0 0 connected
vars currentEpoch 0 lastVoteEpoch 0
```


### 3.4 在192.168.81.100上执行meet操作

```
[root@host1 redis]# redis-cli -p 7000 cluster meet 127.0.0.1 7001       # 通过7000端口的redis server向7001端口的redis server发送meet操作
OK
[root@host1 redis]# redis-cli -p 7000 cluster nodes                     # 通过7000端口运行的redis server查看cluster的节点信息，已经添加7001端口运行的redis server,且都为master节点
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 myself,master - 0 0 0 connected
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539719395866 1 connected
[root@host1 redis]# redis-cli -p 7001 cluster nodes                     # 通过7001端口运行的redis server查看cluster的节点信息，也可以看到7000端口运行的redis server
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 master - 0 1539719408423 0 connected
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 myself,master - 0 0 1 connected
[root@host1 redis]# redis-cli -p 7002 cluster nodes                     # 通过7002端口的redis server查看cluster的节点信息，7000端口和7001端口运行的redis server都不在其中，因为7002端口运行的redis server没有meet
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a :7002 myself,master - 0 0 0 connected
[root@host1 redis]# redis-cli -p 7000 cluster meet 127.0.0.1 7002       # 向7002端口运行的redis server发送meet操作
OK
[root@host1 redis]# redis-cli -p 7001 cluster nodes                     # 7002端口运行的redis server已经添加到集群中了            
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 master - 0 1539719438785 0 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 master - 0 1539719439689 2 connected
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 myself,master - 0 0 1 connected
[root@host1 redis]# redis-cli -p 7002 cluster nodes              
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539719442308 1 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 master - 0 1539719441301 2 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 myself,master - 0 0 0 connected
[root@host1 redis]# redis-cli -p 7000 cluster meet 192.168.81.101 7002  # 向192.168.81.101:7002端口运行的redis server执行meet操作              
OK
[root@host1 redis]# redis-cli -p 7000 cluster meet 192.168.81.101 7000  # 向192.168.81.101:7000端口运行的redis server执行meet操作
OK
[root@host1 redis]# redis-cli -p 7000 cluster meet 192.168.81.101 7001  # 向192.168.81.101:7001端口运行的redis server执行meet操作
OK
[root@host1 redis]# redis-cli -p 7000 cluster nodes
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539719546060 5 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 master - 0 1539719548113 3 connected
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 master - 0 1539719547106 4 connected
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539719544042 1 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 myself,master - 0 0 2 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 master - 0 1539719545050 0 connected
[root@host1 redis]# redis-cli -p 7002 cluster nodes                     # 查看集群中的节点信息，发现6个node都已经添加到当前集群中了
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539719554166 1 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 master - 0 1539719554668 2 connected
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 master - 0 1539719555174 4 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 master - 0 1539719556180 3 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 myself,master - 0 0 0 connected
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539719557188 5 connected
[root@host1 redis]# redis-cli -p 7002 cluster info         # 查看集群相关的信息
cluster_state:fail                  # 集群状态为失败
cluster_slots_assigned:0
cluster_slots_ok:0
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6               # 集群中有6个已知节点
cluster_size:0
cluster_current_epoch:5
cluster_my_epoch:0
cluster_stats_messages_sent:507
cluster_stats_messages_received:507
```


## 3.5 在192.168.81.101虚拟机上查看cluster的信息

```
[root@mysql config]# redis-cli -p 7000 cluster nodes        # 查看cluster的节点信息，6个节点的信息都显示出来，且都为master
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 master - 0 1539690828453 3 connected
45d79e730593df3216a4236a19c21ff601949449 192.168.81.100:7001 master - 0 1539690825432 1 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 192.168.81.100:7000 master - 0 1539690826437 2 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 192.168.81.100:7002 master - 0 1539690827448 0 connected
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 master - 0 1539690827950 4 connected
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 myself,master - 0 0 5 connected
[root@mysql config]# redis-cli -p 7001 cluster nodes        # 查看cluster的节点信息，6个节点的信息都显示出来，且都为master
53911425f4479ce4f054b8b714f4700715f0dc64 127.0.0.1:7002 master - 0 1539690840955 3 connected
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539690842968 5 connected
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 myself,master - 0 0 4 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 192.168.81.100:7002 master - 0 1539690844979 0 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 192.168.81.100:7000 master - 0 1539690841960 2 connected
45d79e730593df3216a4236a19c21ff601949449 192.168.81.100:7001 master - 0 1539690843977 1 connected
[root@mysql config]# redis-cli -p 7002 cluster nodes        # 查看cluster的节点信息，6个节点的信息都显示出来，且都为master
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 127.0.0.1:7001 master - 0 1539690847798 4 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 myself,master - 0 0 3 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 192.168.81.100:7000 master - 0 1539690846795 2 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 192.168.81.100:7002 master - 0 1539690843775 0 connected
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539690844780 5 connected
45d79e730593df3216a4236a19c21ff601949449 192.168.81.100:7001 master - 0 1539690845786 1 connected
[root@mysql config]# redis-cli -p 7002 cluster info         # 查看cluster的信息
cluster_state:fail              # 集群状态为失败状态
cluster_slots_assigned:0
cluster_slots_ok:0
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6           # 集群中添加了6个节点
cluster_size:0                  # 集群中
cluster_current_epoch:5
cluster_my_epoch:3
cluster_stats_messages_sent:413
cluster_stats_messages_received:413
```


### 3.6 在192.168.81.100虚拟机上编写脚本，完成分配slot

```
[root@host1 ~]# cd /opt/config/
[root@host1 config]# vi add_slots.sh                    # 编写add_slots.sh脚本

    #!/bin/bash

    start=$1
    end=$2
    port=$3

    for slot in `seq ${start} ${end}`
    do
        echo "slot:${slot}"
        redis-cli -p ${port} cluster addslots ${slot}
    done                                                                                                                
[root@host1 config]# sh add_slots.sh 0 5461 7000        # 运行add_slots.sh脚本，把0到5461号槽分配给192.168.81.100:7000的redis server节点
slot:0
OK
slot:1
OK
slot:2
OK
slot:3
OK
slot:4
OK
slot:5
OK
...中间省略
slot:5459
OK
slot:5460
OK
slot:5461
OK
[root@host1 config]# redis-cli -p 7000 cluster info        # 查看cluster集群的信息
cluster_state:ok                    # 集群状态为OK状态
cluster_slots_assigned:5462         # 集群中已经有5462个数据槽
cluster_slots_ok:5462               # 5462个槽的状态为0K状态
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6               # 集群添加了6个节点   
cluster_size:1                      # 集群的大小为1个
cluster_current_epoch:5
cluster_my_epoch:2
cluster_stats_messages_sent:2237
cluster_stats_messages_received:2237
[root@host1 config]# redis-cli -p 7000 cluster nodes        # 查看集群中节点的信息
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539720483326 5 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 master - 0 1539720484336 3 connected
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 master - 0 1539720485346 4 connected
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539720482314 1 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 myself,master - 0 0 2 connected 0-5461                # 192.168.81.100:7000端口运行的redis server已经分配的槽为0到5461号槽，其他节点还没有分配槽
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 master - 0 1539720486351 0 connected
[root@host1 config]# redis-cli -p 7002 cluster nodes 
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539720507768 1 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 master - 0 1539720509782 2 connected 0-5461
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 master - 0 1539720510789 4 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 master - 0 1539720508776 3 connected
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 myself,master - 0 0 0 connected
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539720511799 5 connected
[root@host1 config]# sh add_slots.sh 5462 10922 7001    # 运行add_slots.sh脚本，把5462号到10922号槽分配给7001端口运行的redis server
[root@host1 config]# sh add_slots.sh 10923 16383 7002   # 运行add_slots.sh脚本，把10923号到16383号槽分配给7002端口运行的redis server          
[root@host1 config]# redis-cli -p 7000 cluster nodes    # 查看集群的节点信息
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539720810075 5 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 master - 0 1539720807558 3 connected
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 192.168.81.101:7001 master - 0 1539720804033 4 connected
45d79e730593df3216a4236a19c21ff601949449 127.0.0.1:7001 master - 0 1539720809067 1 connected 5462-10922        # 7001端口运行的redis server的槽编号为5462号到10922号槽
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 127.0.0.1:7000 myself,master - 0 0 2 connected 0-5461                            # 7000端口运行的redis server的槽编号为0号到5461号槽
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 127.0.0.1:7002 master - 0 1539720808061 0 connected 10923-16383       # 7002端口运行的redis server的槽编号为10922号到16383号槽
[root@host1 config]# redis-cli -p 7000 cluster info     # 查看集群的信息
cluster_state:ok                    # 集群状态为ok状态
cluster_slots_assigned:16384        # 集群已经被分配16384个槽
cluster_slots_ok:16384              # 集群中状态为ok的槽有16384个
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6               # 集群有6个节点
cluster_size:3                      # 集群大小为3个
cluster_current_epoch:5
cluster_my_epoch:2
cluster_stats_messages_sent:2950
cluster_stats_messages_received:2950
[root@host1 config]# redis-cli -p 7001 cluster info 
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:5
cluster_my_epoch:1
cluster_stats_messages_sent:3158
cluster_stats_messages_received:3158
[root@host1 config]# redis-cli -p 7002 cluster info 
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:5
cluster_my_epoch:0
cluster_stats_messages_sent:2828
cluster_stats_messages_received:2828
[root@host1 config]# redis-cli -p 7000
127.0.0.1:7000> set hello world     # 成功向集群中写入数据
OK
127.0.0.1:7000> config get cluster* # 获取集群的配置信息
1) "cluster-node-timeout"
2) "15000"
3) "cluster-migration-barrier"
4) "1"
5) "cluster-slave-validity-factor"
6) "10"
7) "cluster-require-full-coverage"
8) "no"
127.0.0.1:7000> exit
```


### 3.7 在192.168.81.101虚拟机上操作

```
[root@mysql config]# redis-cli -p 7002 cluster nodes        # 查看集群的节点信息，都是master
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 127.0.0.1:7001 master - 0 1539693824725 4 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 myself,master - 0 0 3 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 192.168.81.100:7000 master - 0 1539693826743 2 connected 0-5461
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 192.168.81.100:7002 master - 0 1539693829260 0 connected 10923-16383
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 master - 0 1539693830266 5 connected
45d79e730593df3216a4236a19c21ff601949449 192.168.81.100:7001 master - 0 1539693828252 1 connected 5462-10922
[root@mysql config]# redis-cli -p 7000 cluster replicate d20aa403c5d7d9507adcc4ef6132c14f3c9486ed        # 使192.168.81.101:7000端口运行的redis server做为192.168.81.100:7000端口运行的redis server的master
OK
[root@mysql config]# redis-cli -p 7001 cluster replicate 45d79e730593df3216a4236a19c21ff601949449
OK
[root@mysql config]# redis-cli -p 7002 cluster replicate e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 
OK
[root@mysql config]# redis-cli -p 7002 cluster nodes        # 查看集群的节点信息
bb88f0996503bac3b222b9cc4ec25139ad34ed3a 127.0.0.1:7001 slave 45d79e730593df3216a4236a19c21ff601949449 0 1539693962338 4 connected
53911425f4479ce4f054b8b714f4700715f0dc64 192.168.81.101:7002 myself,slave e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 0 0 3 connected
d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 192.168.81.100:7000 master - 0 1539693958297 2 connected 0-5461
e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a 192.168.81.100:7002 master - 0 1539693960324 0 connected 10923-16383
c96589b19b8ff5d9d286d470b8efff9a540726d8 192.168.81.101:7000 slave d20aa403c5d7d9507adcc4ef6132c14f3c9486ed 0 1539693961329 5 connected
45d79e730593df3216a4236a19c21ff601949449 192.168.81.100:7001 master - 0 1539693963347 1 connected 5462-10922
[root@mysql config]# redis-cli -p 7002 cluster slots        # 查看集群的槽与节点的关系
1) 1) (integer) 0
   2) (integer) 5461
   3) 1) "192.168.81.100"
      2) (integer) 7000
      3) "d20aa403c5d7d9507adcc4ef6132c14f3c9486ed"
   4) 1) "192.168.81.101"
      2) (integer) 7000
      3) "c96589b19b8ff5d9d286d470b8efff9a540726d8"
2) 1) (integer) 10923
   2) (integer) 16383
   3) 1) "192.168.81.100"
      2) (integer) 7002
      3) "e5ea887c98e79ef2b2205d6cc1d7ac5cfe936d9a"
   4) 1) "192.168.81.101"
      2) (integer) 7002
      3) "53911425f4479ce4f054b8b714f4700715f0dc64"
3) 1) (integer) 5462
   2) (integer) 10922
   3) 1) "192.168.81.100"
      2) (integer) 7001
      3) "45d79e730593df3216a4236a19c21ff601949449"
   4) 1) "127.0.0.1"
      2) (integer) 7001
      3) "bb88f0996503bac3b222b9cc4ec25139ad34ed3a"
```


### 3.8 向集群中写入数据

```
[root@host1 config]# redis-cli -c -p 7000
127.0.0.1:7000> set hello world
OK
127.0.0.1:7000> exit
```


## 4.集群扩容


### 4.1 在192.168.81.100虚拟机上生成配置文件，并启动redis server

```
[root@host1 config]# ls
add_slots.sh  redis_7000.conf  redis_7001.conf  redis_7002.conf
[root@host1 config]# sed 's/7000/7003/g' redis_7000.conf > redis_7003.conf  # 生成配置文件
[root@host1 config]# redis-server /opt/config/redis_7003.conf               # 启动redis-server
[root@host1 config]# ps aux | grep redis-server
root       2553  0.2  0.7 142904  7552 ?        Ssl  12:23   0:12 redis-server 0.0.0.0:7000 [cluster]
root       2557  0.2  0.7 142904  7548 ?        Ssl  12:23   0:13 redis-server 0.0.0.0:7001 [cluster]
root       2561  0.2  0.7 142904  7556 ?        Ssl  12:23   0:13 redis-server 0.0.0.0:7002 [cluster]
root       2596  0.1  0.5 142904  5336 ?        Ssl  13:53   0:00 redis-server 0.0.0.0:7003 [cluster]
root       2600  0.0  0.0 112648   964 pts/0    R+   13:53   0:00 grep --color=auto redis-server
```


### 4.2 在192.168.81.101虚拟机上生成配置文件，并启动redis-server

```
[root@mysql config]# ls
dump.rdb  redis_7000.conf  redis_7001.conf  redis_7002.conf
[root@mysql config]# sed 's/7000/7003/g' redis_7000.conf > redis_7003.conf      # 生成配置文件
[root@mysql config]# ls
dump.rdb  redis_7000.conf  redis_7001.conf  redis_7002.conf  redis_7003.conf
[root@mysql config]# redis-server /opt/config/redis_7003.conf   # 指定配置文件，启动redis-server
[root@mysql config]# ps aux | grep redis-server
root       1948  0.2  0.3 142916  7560 ?        Ssl  12:21   0:13 redis-server 0.0.0.0:7002 [cluster]
root       1952  0.2  0.3 142916  7560 ?        Ssl  12:21   0:12 redis-server 0.0.0.0:7001 [cluster]
root       1964  0.2  0.3 142916  7356 ?        Ssl  12:21   0:12 redis-server 0.0.0.0:7000 [cluster]
root       7348  0.0  0.2 142916  5352 ?        Ssl  13:53   0:00 redis-server 0.0.0.0:7003 [cluster]
root       7352  0.0  0.0 112664   972 pts/0    R+   13:53   0:00 grep --color=auto redis-server
```


### 4.3 在192.168.81.101虚拟机上执行meet操作，对集群扩容

```
[root@mysql config]# redis-cli -p 7000 cluster meet 127.0.0.1 7003          # 对新添加的redis-server执行meet操作
OK
[root@mysql config]# redis-cli -p 7000 cluster meet 192.168.81.100 7003
OK
[root@mysql config]# redis-cli -p 7000 cluster nodes            # 查看集群的节点信息
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:7002 slave cb8c114d44d289687798508232d31e0a065fdab5 0 1539755696566 4 connected
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:7002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539755699589 6 connected
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:7001 slave cf74b2d9570665b74525802462c74cf2e072ef99 0 1539755694553 5 connected
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:7003 master - 0 1539755697570 7 connected       # 已经添加到集群中了
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:7000 master - 0 1539755694553 4 connected 5461-10922
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:7001 master - 0 1539755698572 2 connected 10923-16383
cf74b2d9570665b74525802462c74cf2e072ef99 192.168.81.101:7000 myself,master - 0 0 1 connected 0-5460
2ff22acb1e006b9881abc80238e15b4e3fcefbef 127.0.0.1:7003 master - 0 1539755695560 0 connected       # 已经添加到集群中了
[root@mysql config]# redis-cli -p 7000 cluster info
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
[root@mysql config]# redis-cli -p 7003 cluster replicate 27266dcfd098dfe2a42361d6ab59edf8fb9f5413        # 绑定主从关系
OK
[root@mysql config]# redis-cli -p 7003 cluster nodes 
27266dcfd098dfe2a42361d6ab59edf8fb9f5413 192.168.81.100:7003 master - 0 1539756040013 7 connected
2ff22acb1e006b9881abc80238e15b4e3fcefbef 192.168.81.101:7003 myself,slave 27266dcfd098dfe2a42361d6ab59edf8fb9f5413 0 0 0 connected
cb8c114d44d289687798508232d31e0a065fdab5 192.168.81.100:7000 master - 0 1539756035980 4 connected 5461-10922
ac153a3c1fb10d9d502b153c32dec65c85b2f97c 192.168.81.100:7002 slave fceba6001b95e2169ddd6622436b213324fe8f77 0 1539756037488 2 connected
cf74b2d9570665b74525802462c74cf2e072ef99 127.0.0.1:7000 master - 0 1539756040516 1 connected 0-5460
6f369311b0ca4c503f337c4bb23424eed3eeb188 127.0.0.1:7002 slave cb8c114d44d289687798508232d31e0a065fdab5 0 1539756038998 4 connected
fceba6001b95e2169ddd6622436b213324fe8f77 127.0.0.1:7001 master - 0 1539756041017 2 connected 10923-16383
71f5695dc1f4322c8ea9066d1b3cd8bb0ab7a329 192.168.81.100:7001 slave cf74b2d9570665b74525802462c74cf2e072ef99 1539756042024 1539756037992 1 connected
```


## 5.优点

```
可以深入理解Redis Cluster架构
```


## 6.缺点

```
容易出差错，生产环境中不建议使用
```

