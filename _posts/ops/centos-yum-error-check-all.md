---
title: " 「转+」 yum check报错Error: check all 解决办法"
date: 2021-06-26 10:30:12
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

原文地址: [yum check报错Error: check all 解决办法](https://www.91linux.org/592.html)





### 错误信息：

```
$ yum check
Loaded plugins: fastestmirror
glibc-2.12-1.107.el6_4.5.x86_64 is a duplicate with glibc-2.12-1.107.el6_4.4.x86_64
glibc-common-2.12-1.107.el6_4.5.x86_64 is a duplicate with glibc-common-2.12-1.107.el6_4.4.x86_64
glibc-devel-2.12-1.107.el6_4.5.x86_64 is a duplicate with glibc-devel-2.12-1.107.el6_4.4.x86_64
glibc-devel-2.12-1.107.el6_4.5.x86_64 has missing requires of glibc-headers = (‘0’, ‘2.12’, ‘1.107.el6_4.5’)
iputils-20071127-17.el6_4.2.x86_64 is a duplicate with iputils-20071127-17.el6_4.x86_64
nspr-4.9.5-2.el6_4.x86_64 is a duplicate with nspr-4.9.2-1.el6.x86_64
nss-3.14.3-4.el6_4.x86_64 is a duplicate with nss-3.14.0.0-12.el6.x86_64
nss-softokn-3.14.3-3.el6_4.x86_64 is a duplicate with nss-softokn-3.12.9-11.el6.x86_64
nss-util-3.14.3-3.el6_4.x86_64 is a duplicate with nss-util-3.14.0.0-2.el6.x86_64
tzdata-2013g-1.el6.noarch is a duplicate with tzdata-2013c-2.el6.noarch
2:xinetd-2.3.14-39.el6_4.x86_64 is a duplicate with 2:xinetd-2.3.14-38.el6.x86_64
Error: check all
```


### 解决办法：

引起上述错误的原因是升级软件包的过程中重新启动计算机（或崩溃）。所以安装新的软件包，但旧的软件包没有删除。

首先安装yum软件包清除工具

```
$ yum install yum-utils -y
```

看看是否有任何未完成的安装，并做继续处理：`yum-complete-transaction`

如果上述没有解决问题，那么请使用yum-utils软件包中的软件包清除工具。

```
#  列出重复的包
$ package-cleanup --dupes
```

```
# 删除重复的包(硬性移除)
rpm -e [duplicated packages]
```

如果重复的包的版本较低, 则可以进行删除, 如果版本较高. 则可能无法删除成功.

运行删除命令之前请一定做好备份工作

如果此时不能进入图形界面

```
$ yum groupinstall "GNOME Desktop" "Graphical Administration Tools"
```

重启即可

