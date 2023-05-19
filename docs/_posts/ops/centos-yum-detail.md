---
title: "CentOS yum的详细使用方法"
date: 2021-06-11 09:16:23
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

## yum是什么

yum = Yellow dog Updater, Modified<br />
主要功能是更方便的添加/删除/更新RPM包.<br />
它能自动解决包的倚赖性问题.<br />
它能便于管理大量系统的更新问题yum特点<br />
可以同时配置多个资源库(Repository)<br />
简洁的配置文件(/etc/yum.conf<br />
自动解决增加或删除rpm包时遇到的倚赖性问题<br />
使用方便<br />
保持与RPM数据库的一致性



## rpm包的更新

```sh
# 检查可更新的rpm包
yum check-update
# 更新所有的rpm包
yum update
# 更新指定的rpm包,如更新kernel
yum update kernel
# 大规模的版本升级,与yum update不同的是,连旧的淘汰的包也升级
yum upgrade
```


## rpm包的安装和删除

```sh
# 安装rpm包,如xmms-mp3
yum install xmms-mp3
# 删除rpm包,包括与该包有倚赖性的包
# 同时会提示删除licq-gnome,licq-qt,licq-text
yum remove licq
```


## yum暂存(/var/cache/yum/)的相关参数

```sh
# 清除暂存中rpm包文件
yum clean packages
# 清除暂存中rpm头文件
yum clean headers
# 清除暂存中旧的rpm头文件
yum clean oldheaders
# 清除暂存中旧的rpm头文件和包文件
yum clean
# 相当于yum clean packages + yum clean oldheaders
yum clean all
```


## 包列表

```sh
# 列出资源库中所有可以安装或更新的rpm包
yum list
# 列出资源库中特定的可以安装或更新以及已经安装的rpm包
# 可以在rpm包名中使用匹配符,如列出所有以mozilla开头的rpm包
yum list mozilla#yum list mozilla*
# 列出资源库中所有可以更新的rpm包
yum list updates
# 列出已经安装的所有的rpm包
yum list installed
# 列出已经安装的但是不包含在资源库中的rpm包
yum list extras
# 注:通过其它网站下载安装的rpm包
```


## rpm包信息显示(info参数同list)

```sh
# 列出资源库中所有可以安装或更新的rpm包的信息
yum info
# 列出资源库中特定的可以安装或更新以及已经安装的rpm包的信息
# 可以在rpm包名中使用匹配符,如列出所有以mozilla开头的rpm包的信息
yum info mozilla#yum info mozilla*
# 列出资源库中所有可以更新的rpm包的信息
yum info updates
# 列出已经安装的所有的rpm包的信息
yum info installed
# 列出已经安装的但是不包含在资源库中的rpm包的信息
# 通过其它网站下载安装的rpm包的信息
yum info extras
```


## 搜索rpm包

如果您不知道软件的名称，使用 search 或 provides 功能。另外，可以在任何 yum 搜索选项中使用通配符和正则表达式，来扩大搜索范围。<br />
search 功能检测所有可用的软件的名称、描述、概述和已列出的维护者，查找匹配的值。例如，要从所有软件包中搜索与 PalmPilots 相关的内容，输入：

```
yum search PalmPilot
```

provides 功能检测软件包中包含的文件以及软件提供的功能。与 search 相比，这个选项要求 yum 下载并读取一个很大的索引文件。

```
yum provides realplay
```


## yum常用的命令

```sh
# 安装xxx软件
yum install xxx 
# 查看xxx软件的信息
yum info xxx 
# 删除软件包
yum remove xxx 
# 列出软件包
yum list 
# 清除缓冲和就的包
yum clean 
# 以xxx为关键字搜索包（提供的信息为关键字）
yum provides xxx 
# 搜索软件包（以名字为关键字）
yum search xxx 
# 这三个都是一组为单位进行升级 列表和删除的操作
yum groupupdate xxx
yum grouplist xxx
yum groupremove xxx
# 系统升级
yum update 
# 列出所有升级源上的包
yum list available
# 列出所有升级源上的可以更新包
yum list updates
# 列出已经安装的包
yum list installed
# 升级内核
yun update kernel
```


## yum常用的源

- 自动选择最快的源<br />
由于yum中有的mirror速度是非常慢的，如果yum选择了这个mirror，这个时候yum就会非常慢，对此，可以下载fastestmirror插件，它会自动选择最快的mirror：

```
yum install yum-fastestmirror
```

配置文件：（一般不用动）/etc/yum/pluginconf.d/fastestmirror.conf<br />
你的yum镜像的速度测试记录文件：/var/cache/yum/timedhosts.txt

- 使用图形界面的yum<br />
如果觉得命令行的yum不方便，那么可以使用图形化的yumex，这个看起来更方便，因为可以自由地选择软件仓库：

```
yum install yumex
```

然后在系统工具中就可以看到yum extender了。实际上系统自带的“添加/删除程序“也可以实现图形化的软件安装，但有些yumex的功能它没有。

