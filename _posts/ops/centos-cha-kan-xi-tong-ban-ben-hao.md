---
title: "CentOS 查看系统版本号"
date: 2021-06-26 10:31:14
toc: true
categories:
- ["Ops","CentOS"]
---

## 查看内核版本命令：

- 
`cat /proc/version`


Linux version 2.6.9-22.ELsmp ([bhcompile@crowe.devel.redhat.com](mailto:bhcompile@crowe.devel.redhat.com)) (gcc version 3.4.4 20050721


3.4.4-2)) #1 SMP Mon Sep 19 18:00:54 EDT 2005

- 
`uname -a`


Linux q1test01 2.6.9-22.ELsmp #1 SMP Mon Sep 19 18:00:54 EDT 2005 x86_64 x86_64 x86_64 GNU/Linux

- 
`uname -r`


2.6.9-22.ELsmp






## 查看linux版本

- `lsb_release -a`

列出所有版本信息, 这个命令适用于所有的linux，包括Redhat、SuSE、Debian等发行版

```sh
LSB Version:    :core-3.0-amd64:core-3.0-ia32:core-3.0-noarch:graphics-3.0-amd64:graphics-3.0-
ia32:graphics-3.0-noarch
Distributor ID: RedHatEnterpriseAS
Description:    Red Hat Enterprise Linux AS release 4 (Nahant Update 2)
Release:        4
Codename:       NahantUpdate2
```

提示: lsb_release: command not found 解决

解决方法

```
yum install redhat-lsb -y
```

- `cat /etc/issue`

```
Red Hat Enterprise Linux AS release 4 (Nahant Update 2)
Kernel \r on an \m
```

- `cat /etc/redhat-release`

这种方式下可以直接看到具体的版本号，比如 AS4 Update 1


Red Hat Enterprise Linux AS release 4 (Nahant Update 2)

- `rpm -q redhat-release`

这种方式下可看到一个所谓的release号


redhat-release-4AS-3

查看系统是64位还是32位:

`getconf LONG_BIT` 或者 `getconf WORD_BIT`


`file /bin/ls`


`lsb_release -a`

