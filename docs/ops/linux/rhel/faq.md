---
description: '本文档汇总了Linux系统常见问题及解决方法，涵盖RHEL、Debian等发行版，包括端口占用、磁盘挂载、sudo权限、wget网络、内存配置、DNS缓存、inotify资源限制、yum错误、crontab执行失败及磁盘空间排查等，提供实用命令与配置调整。'
lastUpdated: '2026-06-29 15:22:11'
head:
  - - meta
    - name: 'og:title'
      content: 'RHEL - Faq'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档汇总了Linux系统常见问题及解决方法，涵盖RHEL、Debian等发行版，包括端口占用、磁盘挂载、sudo权限、wget网络、内存配置、DNS缓存、inotify资源限制、yum错误、crontab执行失败及磁盘空间排查等，提供实用命令与配置调整。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/linux/rhel/faq.html'
---
# RHEL - Faq

## 通用

### 查看当前端口占用情况

**linux**

```Plaintext
$ netstat -nlp | grep 5000
tcp 0 0 127.0.0.1:5000 0.0.0.0:* LISTEN 6847/python
```

linux/macOS

```Plaintext
$ lsof -P -i :5000
Python 6847 IPv4 TCP localhost:5000 (LISTEN)
```

windows

```Plaintext
> netstat -ano | findstr 5000
TCP 127.0.0.1:5000 0.0.0.0:0 LISTENING 6847
```

### 挂载磁盘 ext3/ext4 格式异常

出现的详细报错现在没有记下来, 大致的意思是, 你为什么还用 ext3 的方式来挂载 ext4 的硬盘唻.

重启之后进入系统中, 想要修改 `/ext/fstab` 的时候提示文件不能修改, 所以重新挂载磁盘进入读写状态

```Bash
$ mount -o remount,rw /
```

修改然后进行挂载

```Bash
$ vim /etc/fstab
```

```Plaintext
#
# /etc/fstab
# Created by anaconda on Tue May  3 13:48:10 2016
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=80b9b662-0a1d-4e84-b07b-c1bf19e72d97 /    ext4    defaults        1 1
/dev/vdb1 /storage                             ext4    defaults        0 0
/dev/vdc1 /webdata/wulihub                     ext4    defaults        0 0
```

使用 `mount -a` 进行挂载

### Linux: 'xxx' is not in the sudoers file. This incident will be reported

使用更简单的命令来添加 root 用户

```Bash
# debian (ubuntu/kbuntu, debian)
$ usermod -a -G sudo user
# rhel (redhat, fedora, centos)
$ usermod -a -G wheel user
```

### wget unable to resolve host address的解决方法

wget：无法解析主机地址。这就能看出是DNS解析的问题。

**解决办法：**

1. 登入 `root`（VPS）。
2. 进入 `/etc/resolv.conf`。
3. 修改内容为下

```Plaintext
nameserver 8.8.8.8 # google dns
nameserver 8.8.4.4 # google dns
```

### 操作系统内存配置 overcommit_memory

[https://developer.aliyun.com/article/425871](https://developer.aliyun.com/article/425871)

**问题描述：**

在安装Redis时，会得到如下警告：

> WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

**内核参数 overcommit_memory** 是 内存分配策略, 可选值：0、1、2。

- 0， 表示内核将检查是否有足够的可用内存供应用进程使用；如果有足够的可用内存，内存申请允许；否则，内存申请失败，并把错误返回给应用进程。
- 1， 表示内核允许分配所有的物理内存，而不管当前的内存状态如何。
- 2， 表示内核允许分配超过所有物理内存和交换空间总和的内存

**什么是Overcommit**

Linux对大部分申请内存的请求都回复"yes"，以便能跑更多更大的程序。因为申请内存后，并不会马上使用内存。这种技术叫做Overcommit。当linux发现内存不足时，会发生OOM killer(OOM=out-of-memory)。它会选择杀死一些进程(用户态进程，不是内核线程)，以便释放内存。

当oom-killer发生时，linux会选择杀死哪些进程？选择进程的函数是oom_badness函数(在mm/oom_kill.c中)，该函数会计算每个进程的点数(0\~1000)。点数越高，这个进程越有可能被杀死。每个进程的点数跟oom_score_adj有关，而且oom_score_adj可以被设置(-1000最低，1000最高)。

**解决方法：**

很简单，按提示的操作（将vm.overcommit_memory 设为1）即可：

有三种方式修改内核参数，但要有root权限：

（1）编辑 `/etc/sysctl.conf` ，改 `vm.overcommit_memory=1`，然后 `sysctl -p` 使配置文件生效

（2）`sysctl vm.overcommit_memory=1`

（3）`echo 1 > /proc/sys/vm/overcommit_memory`

### 如何清空dns 缓存

```Plaintext
$ yum -y install nscd
$ systemctl enable nscd
$ systemctl start nscd
$ nscd -i hosts
```

### 出现 inotify 资源耗尽，无法使用 inotify 机制，回归为 polling 机制 问题

同时出现的错误还有, 我这里的操作是在进行重启 php-fpm 时候出现的

> Error : Too Many Open Files

解决方法, 编辑 `/etc/sysctl.conf`, 添加如下两行

```Plaintext
fs.inotify.max_user_watches=1048567
fs.inotify.max_user_instances=1048576
```

### 解决 yum install 时出现 Thread died in Berkeley DB library 的错误

```Plaintext
[root@server www]# yum install unzip
错误：rpmdb: BDB0113 Thread/process 19640/139952284849984 failed: BDB1507 Thread died in Berkeley DB library
错误：db5 错误(-30973) 来自 dbenv->failchk：BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
错误：无法使用 db5 -  (-30973) 打开 Packages 索引
错误：无法从 /var/lib/rpm 打开软件包数据库
CRITICAL:yum.main:

Error: rpmdb open failed
```

解决

```Plaintext
$ mkdir /var/lib/rpm/backup
$ cp -a /var/lib/rpm/__db* /var/lib/rpm/backup/
$ rm -f /var/lib/rpm/__db.[0-9][0-9]*
$ rpm --quiet -qa
$ rpm --rebuilddb
$ yum clean all
```

### xxxx is not in the sudoers file. This incident will be reported

用户不在 sudo 操作文件权限内, `xxxx` 代表的是用户名

```Plaintext
# usermod -aG wheel xxxx
```

### 用户权限错误 / 无法执行 crontab -e

出现错误场景, 无法执行 su

```Plaintext
$ su root
密码：
su: 鉴定故障
$ crontab -e
crontab: installing new crontab
fchown: 不允许的操作
crontab: edits left in /tmp/crontab.jt1XUI
```

解决办法: 变更两个应用的权限, 让应用可以执行计划数据

```Plaintext
[root@linux ~]# chmod 4755 /usr/bin/crontab
[root@linux ~]# chmod 4755 /usr/bin/su
```

参考地址 : [crontab -e on gentoo failing: “chown: Operation not permitted”](https://serverfault.com/questions/193732/crontab-e-on-gentoo-failing-chown-operation-not-permitted)

### There are unfinished transactions remaining

There are unfinished transactions remaining. You might consider running yum-complete-transaction first to finish them.

处理步骤：

```Bash
# 安装 yum-complete-transaction
yum install yum-utils

# 运行 yum-complete-transaction
yum-complete-transaction –cleanup-only

# 清除可能存在的重复包
package-cleanup –dupes

# 清除可能存在的损坏包
package-cleanup –problems
```

### Gtk-WARNING **: cannot open display      (:3825): Gtk-WARNING** : cannot open display: :0.0

> Gtk-WARNING **: cannot open display      (:3825): Gtk-WARNING** : cannot open display: :0.0

这是因为Xserver默认情况下不允许别的用户的图形程序的图形显示在当前屏幕上. 如果需要别的用户的图形显示在当前屏幕上, 则应以当前登陆的用户, 也就是切换身份前的用户执行如下命令。

```Bash
xhost +
```

通过执行这条命令，就授予了其它用户访问当前屏幕的权限，于是就可以以另外的用户运行需要运行的程序了。

### CentOS 查找占用磁盘空间的罪魁祸首

起源是服务器告警但是找不到占用文件的信息

```Plaintext
[root@ff ff]# df -h
文件系统        容量  已用  可用 已用% 挂载点
devtmpfs        486M     0  486M    0% /dev
tmpfs           496M     0  496M    0% /dev/shm
tmpfs           496M  480K  495M    1% /run
tmpfs           496M     0  496M    0% /sys/fs/cgroup
/dev/vda1        50G   43G  4.3G   91% /
tmpfs           100M     0  100M    0% /run/user/1001
```

在这里查看磁盘空间, 显示已经占用 90+

运行 显示当前实体文件使用才 7.1 G

```Plaintext
[root@ff ff]# du -h / --max-depth=1
4.5G        /var
7.9M        /root
206M        /boot
4.0K        /srv
du: 无法访问"/proc/17690/task/17690/fd/4": 没有那个文件或目录
du: 无法访问"/proc/17690/task/17690/fdinfo/4": 没有那个文件或目录
du: 无法访问"/proc/17690/fd/3": 没有那个文件或目录
du: 无法访问"/proc/17690/fdinfo/3": 没有那个文件或目录
0        /proc
4.0K        /media
480K        /run
0        /dev
4.0K        /mnt
16K        /lost+found
200M        /webdata
2.2G        /usr
36K        /tmp
84K        /home
0        /sys
4.0K        /opt
39M        /etc
7.1G        /
```

查找僵尸文件

```Plaintext
yum install lsof -y

# 刹看僵尸文件占用情况
lsof |grep delete | more
```

这里发现一条比较过分的

```Plaintext
nginx       834           root  txt   REG  253,1     1342640    1578056 /usr/sbin/nginx;60b5042f (deleted)
nginx      7329       liexiang  txt   REG  253,1     1342640    1578056 /usr/sbin/nginx;60b5042f (deleted)
nginx      7329       liexiang  19w   REG  253,1 37715773789    2490370 /webdata/logs/fadan/web.access.log (deleted)
nginx      7329       liexiang  20w   REG  253,1     5540877    2490372 /webdata/logs/fadan/web.error.log (deleted)
aliyun-se 14711           root  7uW   REG  253,1           0    393225 /tmp/AliyunAssistClientSingleLock.lock (deleted)
```

进程号 7329, 查看

```Plaintext
[root@ff ff]# ps -ef |grep 7329
liexiang  7329   834  0 4月12 ?       03:02:07 nginx: worker process is shutting down
root     17889 24838  0 00:00 pts/0    00:00:00 grep --color=auto 7329
```

当前进程已经截止掉, 可以放心关闭

```Plaintext
kill -9 7329
```

> 如果磁盘和inode都没有问题，则需要查看是否存在未被清除句柄的僵尸文件。这些文件实际上已经被删除，但是有服务程序在使用这些文件，导致这些文件一直被占用，无法释放磁盘空间。如果这些文件过多，会占用很大的磁盘空间。参考以下步骤查看并删除僵尸文件。

查看磁盘空间:

```Plaintext
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

## CentOS 

### 使用 scim 输入法及输入法乱码解决

由于默认安装为IBUS输入法，想使用SCIM

```Plaintext
yum install -y scim-table scim-table-chinese
```

scim-setup 可进行相关配置。

然而可以看到scim图标，但是却切换不出输入法。解决办法如下

依次点击 `system->preferences->input method` ,在弹出的对话框中在 `Enable input method feature`  
前打上勾，然后选择`Use scim`(没有安装scim,请安装好后再设置),再点 `close` ,重启系统，你就可看到开机自动启动了scim，并可以切换出相应的输入法。.

输入法乱码解决方法

在终端中敲入：

```Plaintext
yum install fonts-chinese.noarch
yum install fonts-ISO8859-2.noarch
```

然后注销系统就可以了

### ifconfig 命令在 CentOS 7 中不存在

原文地址: [ifconfig command not found on CentOS 7](http://sharadchhetri.com/2014/07/25/ifconfig-command-found-centos-7/)

众所周知, CentOS 7 已经发布, 并且包含了很多心的功能, 在使用 centos 7 的时候我遇到了第一个挑战,  
在我上一篇文章 [finding the CentOS release version on CentOS 7](http://sharadchhetri.com/2014/07/24/how-to-find-centos-linux-release-version-on-centos-7-series/),  
同样也发现了网络的变化

几天后我使用 **minimal installed CentOS 7** , 在 CentOS 6.x 发布的时候我习惯的使用命令`ifconfig`, `ifconfig`  
命令提供了我们服务器的网络信息. 在 CentOS 6.x  
之前, `ifconfig`命令默认是集成在系统中的. 但是在 CentOS 7 安装完成之后却没有发现这个命令. 这个会给你一个错误信息

> ifconfig command not found.

在系统中使用 ifconfig 命令, 使用以下命令.

```Plaintext
yum install net-tools
```

现在检查 ifconfig 命令和他的系统路径(使用 `which` 和 `whereis`命令)

```Plaintext
ifconfig
ifconfig -a
which ifconfig
whereis ifconfig
```

**我怎么知道我需要安装 net-tools包**

使用 yum 命令`provides` 和 `whatprovides` 选项会帮助你列出一系列的支持这个命令的包

一个 yum 的 man 页面是这样写的:

> provides or whatprovides Is used to find out which package provides some feature or file. Just use a specific name or a file-glob-syntax  
> wildcards to list the packages available or  
> installed that provide that feature or file.

我们使用以下给定的命令来寻找那个包提供了 ifconfig 命令

```Plaintext
yum provides ifconfig
```

以下便是输出(ps:自己试验的):

```Plaintext
[root@rocky9]# yum provides php74
Last metadata expiration check: 0:06:27 ago on Wed 31 Jan 2024 08:18:33 AM CST.
php74-7.4-1.el9.remi.x86_64 : Package that installs PHP 7.4
Repo        : remi-safe
Matched from:
Provide    : php74 = 7.4-1.el9.remi

php74-7.4-3.el9.remi.x86_64 : Package that installs PHP 7.4
Repo        : remi-safe
Matched from:
Provide    : php74 = 7.4-3.el9.remi
```