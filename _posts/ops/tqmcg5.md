---
title: "CentOS Faq"
date: 2021-06-10 22:37:47
toc: true
categories:
- ["Ops","CentOS"]
---

## 1. 如何清空dns 缓存




```
$ yum -y install nscd
$ systemctl enable nscd
$ systemctl start nscd
$ nscd -i hosts
```

## 2. 出现 inotify 资源耗尽，无法使用 inotify 机制，回归为 polling 机制 问题
同时出现的错误还有, 我这里的操作是在进行重启 php-fpm 时候出现的
> Error : Too Many Open Files 

解决方法, 编辑 `/etc/sysctl.conf`, 添加如下两行
```
fs.inotify.max_user_watches=1048567
fs.inotify.max_user_instances=1048576
```

## 3. 解决 yum install 时出现 Thread died in Berkeley DB library 的错误
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

