---
title : "「译」 ifconfig 命令在 CentOS 7 中不存在"
date : 2021-06-26 10:31:19
toc : true
categories :
  - [ "Ops","CentOS" ]
---

原文地址: [ifconfig command not found on CentOS 7](http://sharadchhetri.com/2014/07/25/ifconfig-command-found-centos-7/)

众所周知, CentOS 7 已经发布, 并且包含了很多心的功能, 在使用 centos 7 的时候我遇到了第一个挑战,
在我上一篇文章  [finding the CentOS release version on CentOS 7](http://sharadchhetri.com/2014/07/24/how-to-find-centos-linux-release-version-on-centos-7-series/),
同样也发现了网络的变化

几天后我使用  **minimal installed CentOS 7** , 在 CentOS 6.x 发布的时候我习惯的使用命令`ifconfig`, `ifconfig`命令提供了我们服务器的网络信息. 在 CentOS 6.x
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

### 我怎么知道我需要安装 net-tools包

使用 yum 命令`provides` 和 `whatprovides` 选项会帮助你列出一系列的支持这个命令的包

一个 yum 的 man 页面是这样写的:

> **provides or whatprovides**


Is used to find out which package provides some feature or file. Just use a specific name or a file-glob-syntax wildcards to list the packages available or
installed that provide that feature or file.

我们使用以下给定的命令来寻找那个包提供了 ifconfig 命令

```
yum provides ifconfig
```

以下截图便是输出(ps:自己试验的):

![](https://file.wulicode.com/yuque/202208/04/15/0021HVAH05Yl.png)

