# CentOS - FAQ

## Centos 如何清空 dns 缓存

```
$ yum -y install nscd
$ systemctl enable nscd
$ systemctl start nscd
$ nscd -i hosts
```

## 用户权限错误 / 无法执行 crontab -e

出现错误场景, 无法执行 su

```
$ su root
密码：
su: 鉴定故障
$ crontab -e
crontab: installing new crontab
fchown: 不允许的操作
crontab: edits left in /tmp/crontab.jt1XUI
```

解决办法: 变更两个应用的权限, 让应用可以执行计划数据

```
[root@linux ~]# chmod 4755 /usr/bin/crontab
[root@linux ~]# chmod 4755 /usr/bin/su
```

参考地址 : [crontab -e on gentoo failing: "chown: Operation not permitted"](https://serverfault.com/questions/193732/crontab-e-on-gentoo-failing-chown-operation-not-permitted)

## 出现 inotify 资源耗尽，无法使用 inotify 机制，回归为 polling 机制 问题

同时出现的错误还有, 我这里的操作是在进行重启 php-fpm 时候出现的
> Error : Too Many Open Files

解决方法, 编辑 `/etc/sysctl.conf`, 添加如下两行

```
fs.inotify.max_user_watches=1048567
fs.inotify.max_user_instances=1048576
```

## 解决 yum install 时出现 Thread died in Berkeley DB library 的错误

```
[root@server www]# yum install unzip
错误：rpmdb: BDB0113 Thread/process 19640/139952284849984 failed: BDB1507 Thread died in Berkeley DB library
错误：db5 错误(-30973) 来自 dbenv->failchk：BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
错误：无法使用 db5 -  (-30973) 打开 Packages 索引
错误：无法从 /var/lib/rpm 打开软件包数据库
CRITICAL:yum.main:

Error: rpmdb open failed
```

解决

```
$ mkdir /var/lib/rpm/backup
$ cp -a /var/lib/rpm/__db* /var/lib/rpm/backup/
$ rm -f /var/lib/rpm/__db.[0-9][0-9]*
$ rpm --quiet -qa
$ rpm --rebuilddb
$ yum clean all
```

## /var/run/yum.pid 已被锁定 解决办法

```
# yum install glibc.i686
已加载插件：fastestmirror, langpacks
/var/run/yum.pid 已被锁定，PID 为 49901 的另一个程序正在运行。
Another app is currently holding the yum lock; waiting for it to exit...
  另一个应用程序是：PackageKit
    内存：103 M RSS （432 MB VSZ）
    已启动： Mon Jan 11 10:43:58 2016 - 02:36之前
    状态  ：睡眠中，进程ID：49901
```

解决办法：直接在终端运行 `rm -f /var/run/yum.pid` 将该文件删除，然后再次运行yum

```
# rm -f /var/run/yum.pid 
# yum install glibc.i686
已加载插件：fastestmirror, langpacks
Loading mirror speeds from cached hostfile
 * base: mirrors.163.com
 * extras: mirrors.163.com
 * updates: mirrors.163.com
```

## 使用 scim 输入法及输入法乱码解决

由于默认安装为IBUS输入法，想使用SCIM

```sh
yum install -y scim-table scim-table-chinese
```

scim-setup 可进行相关配置。

然而可以看到scim图标，但是却切换不出输入法。解决办法如下

依次点击 `system->preferences->input method` ,在弹出的对话框中在 `Enable input method feature`
前打上勾，然后选择`Use scim`(没有安装scim,请安装好后再设置),再点 `close` ,重启系统，你就可看到开机自动启动了scim，并可以切换出相应的输入法。.

输入法乱码解决方法

在终端中敲入：

```
yum install fonts-chinese.noarch 
yum install fonts-ISO8859-2.noarch
```

然后注销系统就可以了

## 「译」ifconfig 命令在 CentOS 7 中不存在

原文地址: [ifconfig command not found on CentOS 7](http://sharadchhetri.com/2014/07/25/ifconfig-command-found-centos-7/)

众所周知, CentOS 7 已经发布, 并且包含了很多心的功能, 在使用 centos 7 的时候我遇到了第一个挑战,
在我上一篇文章  [finding the CentOS release version on CentOS 7](http://sharadchhetri.com/2014/07/24/how-to-find-centos-linux-release-version-on-centos-7-series/),
同样也发现了网络的变化

几天后我使用  **minimal installed CentOS 7** , 在 CentOS 6.x 发布的时候我习惯的使用命令`ifconfig`, `ifconfig`
命令提供了我们服务器的网络信息. 在 CentOS 6.x
之前, `ifconfig`命令默认是集成在系统中的. 但是在 CentOS 7 安装完成之后却没有发现这个命令. 这个会给你一个错误信息

> ifconfig command not found.


在系统中使用 ifconfig 命令, 使用以下命令.

```
yum install net-tools
```

现在检查 ifconfig 命令和他的系统路径(使用 `which` 和 `whereis`命令)

```
ifconfig
ifconfig -a
which ifconfig
whereis ifconfig
```

**我怎么知道我需要安装 net-tools包**

使用 yum 命令`provides` 和 `whatprovides` 选项会帮助你列出一系列的支持这个命令的包

一个 yum 的 man 页面是这样写的:

> **provides or whatprovides**


Is used to find out which package provides some feature or file. Just use a specific name or a file-glob-syntax
wildcards to list the packages available or
installed that provide that feature or file.

我们使用以下给定的命令来寻找那个包提供了 ifconfig 命令

```
yum provides ifconfig
```

以下截图便是输出(ps:自己试验的):

![](https://file.wulicode.com/yuque/202208/04/15/0021HVAH05Yl.png)