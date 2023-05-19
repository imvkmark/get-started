---
title: "升级CentOS7 到 CentOS8"
date: 2022-05-23 09:03:18
toc: true
categories:
- ["Ops","CentOS"]
---

## 1. 前言
在本文中，您将了解如何将CentOS 7升级到CentOS 8.5版本。注意的是，本文介绍的方式仅仅是用于测试，生产环境上应该慎重使用。

![](https://file.wulicode.com/yuque/202208/04/14/58394iJWLztr.png)



## 2. Step 1: 安装EPEL仓库

执行以下命令安装EPEL仓库，用于补充软件库：

```shell
# yum install epel-release -y
```

## 3. Step 2: 安装yum-utils工具
yum-utils 工具用于管理 yum 源，执行以下命令安装它：
```shell
# yum install yum-utils
```

此时需要执行该命令解析RPM包。

```
# yum install rpmconf
# rpmconf -a

Configuration file '/etc/php.ini'
-rw-r--r-- 1 root root 63217 5月  17 2019 /etc/php.ini
-rw-r--r-- 1 root root 63250 3月   2 2021 /etc/php.ini.rpmnew

==> Package distributor has shipped an updated version.
What would you like to do about it ?  Your options are:
Y or I  : install the package maintainer's version
N or O  : keep your currently-installed version
D     : show the differences between the versions
M     : merge configuration files
Z     : background this process to examine the situation
S     : skip this file
The default action is to keep your current version.
*** aliases (Y/I/N/O/D/M/Z/S) [default=N] ?
```
提示的时候根据需要的版本进行不同的选择,  接下来，对所有不需要的包进行清理。

```bash
# package-cleanup --leaves
# package-cleanup --orphans
```

## 4. Step 3: 在CentOS 7中安装dnf工具

![](https://file.wulicode.com/yuque/202208/04/14/5839IjaPcbfv.jpg)

dns可以理解为下一代的yum，它在CentOS 8上被设置为默认的软件包安装工具。

通过以下命令安装它：

```bash
# yum install dnf
```

您还需要使用以下命令删除yum包管理器。

```bash
# dnf -y remove yum yum-metadata-parser
```

## 5. Step 4: 把CentOS 7升级至CentOS 8
现在我们已经准备好升级CentOS 7到CentOS 8，但是在升级之前，请使用新安装的dnf包管理器升级系统。
```bash
# dnf upgrade
```
接下来，使用如下所示的dnf安装CentOS 8的软件包。这需要一段时间。这里使用的阿里云的地址<br />[https://mirrors.aliyun.com/centos/8-stream/BaseOS/x86_64/os/Packages/](https://mirrors.aliyun.com/centos/8-stream/BaseOS/x86_64/os/Packages/)
```bash
# dnf install https://mirrors.aliyun.com/centos/8-stream/BaseOS/x86_64/os/Packages/centos-stream-repos-8-6.el8.noarch.rpm
# dnf install https://mirrors.aliyun.com/centos/8-stream/BaseOS/x86_64/os/Packages/centos-stream-release-8.6-1.el8.noarch.rpm
# dnf install https://mirrors.aliyun.com/centos/8-stream/BaseOS/x86_64/os/Packages/centos-gpg-keys-8-6.el8.noarch.rpm
```

接下来，升级适配于CentOS 8的EPEL软件仓库。

```bash
dnf -y upgrade https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
```

成功升级EPEL软件仓库之后，删除所有临时文件。

```bash
dnf clean all
```

删除CentOS 7的旧内核

```bash
rpm -e `rpm -q kernel`
```

接下来，一定要删除冲突的软件包。

```bash
rpm -e --nodeps sysvinit-tools
```

之后，启动CentOS 8系统升级。

```bash
dnf -y --releasever=8 --allowerasing --setopt=deltarpm=false distro-sync
```

_注意:如果您得到关于冲突包的错误，例如在我的升级过程中，存在关于现有python36-rpmconf包的冲突。我删除了这个包，类似地，如果有任何冲突，只需删除这些包并尝试运行上面的升级命令。_


## 6. Step 5: 为CentOS 8安装新内核

执行以下命令为CentOS 8安装新内核：

```bash
dnf -y install kernel-core
```

最后，为CentOS 8安装最基础的软件包。

```bash
dnf -y groupupdate "Core" "Minimal Install"
```

现在您可以通过运行CentOS检查安装的版本。

```bash
cat /etc/redhat-release
```

看看是不是已经升级到8.5版本了？如果你在上面的输出信息中看到8.5，证明你已经成功地从CentOS 7升级到CentOS 8.5版本了。

## 7: 结论
通过本文的指导，您应该已经成功把CentOS 7升级到CentOS 8.5版本了。但我还是强烈建议您先测试一段时间然后再考虑是否要应用于生产环境。

