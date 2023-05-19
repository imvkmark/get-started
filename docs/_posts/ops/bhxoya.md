---
title: "在 Centos 中查找占用磁盘空间的罪魁祸首"
date: 2021-05-31 23:56:36
toc: true
categories:
- ["Ops","CentOS"]
---

起源是服务器告警但是找不到占用文件的信息

```xml
[root@ff ff]# df -h
文件系统        容量  已用  可用 已用% 挂载点
devtmpfs        486M     0  486M    0% /dev
tmpfs           496M     0  496M    0% /dev/shm
tmpfs           496M  480K  495M    1% /run
tmpfs           496M     0  496M    0% /sys/fs/cgroup
/dev/vda1        50G   43G  4.3G   91% /
tmpfs           100M     0  100M    0% /run/user/1001
```
在这里查看磁盘空间, 显示已经占用 90+<br />运行 显示当前实体文件使用才 7.1 G
```xml
[root@ff ff]# du -h / --max-depth=1
4.5G	/var
7.9M	/root
206M	/boot
4.0K	/srv
du: 无法访问"/proc/17690/task/17690/fd/4": 没有那个文件或目录
du: 无法访问"/proc/17690/task/17690/fdinfo/4": 没有那个文件或目录
du: 无法访问"/proc/17690/fd/3": 没有那个文件或目录
du: 无法访问"/proc/17690/fdinfo/3": 没有那个文件或目录
0	/proc
4.0K	/media
480K	/run
0	/dev
4.0K	/mnt
16K	/lost+found
200M	/webdata
2.2G	/usr
36K	/tmp
84K	/home
0	/sys
4.0K	/opt
39M	/etc
7.1G	/
```
查找僵尸文件
```xml
yum install lsof -y

# 刹看僵尸文件占用情况
lsof |grep delete | more
```
这里发现一条比较过分的
```xml
nginx       834           root  txt       REG              253,1     1342640    1578056 /usr/sbin/ng
inx;60b5042f (deleted)
nginx      7329       liexiang  txt       REG              253,1     1342640    1578056 /usr/sbin/ng
inx;60b5042f (deleted)
nginx      7329       liexiang   19w      REG              253,1 37715773789    2490370 /webdata/log
s/fadan/web.access.log (deleted)
nginx      7329       liexiang   20w      REG              253,1     5540877    2490372 /webdata/log
s/fadan/web.error.log (deleted)
aliyun-se 14711           root    7uW     REG              253,1           0     393225 /tmp/AliyunA
ssistClientSingleLock.lock (deleted)
```
进程号 7329, 查看
```xml
[root@ff ff]# ps -ef |grep 7329
liexiang  7329   834  0 4月12 ?       03:02:07 nginx: worker process is shutting down
root     17889 24838  0 00:00 pts/0    00:00:00 grep --color=auto 7329
```
当前进程已经截止掉, 可以放心关闭

```xml
kill -9 7329
```

> 如果磁盘和inode都没有问题，则需要查看是否存在未被清除句柄的僵尸文件。这些文件实际上已经被删除，但是有服务程序在使用这些文件，导致这些文件一直被占用，无法释放磁盘空间。如果这些文件过多，会占用很大的磁盘空间。参考以下步骤查看并删除僵尸文件。

查看磁盘空间: 

```xml
[root@ff ff]# df -h
文件系统        容量  已用  可用 已用% 挂载点
devtmpfs        486M     0  486M    0% /dev
tmpfs           496M     0  496M    0% /dev/shm
tmpfs           496M  480K  495M    1% /run
tmpfs           496M     0  496M    0% /sys/fs/cgroup
/dev/vda1        50G  7.2G   40G   16% /
tmpfs           100M     0  100M    0% /run/user/1001
```
参考文章: [https://help.aliyun.com/document_detail/42531.html](https://help.aliyun.com/document_detail/42531.html)

