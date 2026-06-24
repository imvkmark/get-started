---
description: 'cat /proc/versionuname -auname -rlsb_release -a列出所有版本信息, 这个命令适用于所有的linux，包括Redhat、SuSE、Debian等发行版解决方法cat /etc/issuecat /etc/redhat-release这种方式下可以直接看到具体的版本号rpm -q redhat-release (centos) or rpm -q rocky-release (rocky)这种方式下可看到一个所谓的release号, centos 和 rocky 不同的分发使用的命令是不一致的getcon'
lastUpdated: '2025-11-12 04:18:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'RHEL 查看系统名称版本号'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'cat /proc/versionuname -auname -rlsb_release -a列出所有版本信息, 这个命令适用于所有的linux，包括Redhat、SuSE、Debian等发行版解决方法cat /etc/issuecat /etc/redhat-release这种方式下可以直接看到具体的版本号rpm -q redhat-release (centos) or rpm -q rocky-release (rocky)这种方式下可看到一个所谓的release号, centos 和 rocky 不同的分发使用的命令是不一致的getcon'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/os/rhel/view-version.html'
---
# RHEL 查看系统名称版本号



## 查看内核版本命令：

`cat /proc/version`

```
[root@rocky8 ~]# cat /proc/version
Linux version 4.18.0-372.19.1.el8_6.x86_64 (mockbuild@dal1-prod-builder001.bld.equ.rockylinux.org) (gcc version 8.5.0 20210514 (Red Hat 8.5.0-10) (GCC)) #1 SMP Tue Aug 2 16:19:42 UTC 2022
```

`uname -a`

```
[root@rocky8 ~]# uname -a
Linux rocky8 4.18.0-372.19.1.el8_6.x86_64 #1 SMP Tue Aug 2 16:19:42 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
```

`uname -r`

```
[root@rocky8 ~]# uname -r
4.18.0-372.19.1.el8_6.x86_64
```

## 查看linux版本

`lsb_release -a`

列出所有版本信息, 这个命令适用于所有的linux，包括Redhat、SuSE、Debian等发行版

```
[root@rocky8 ~]# lsb_release -a
LSB Version:     :core-4.1-amd64:core-4.1-noarch
Distributor ID:  Rocky
Description:     Rocky Linux release 8.6 (Green Obsidian)
Release:         8.6
Codename:        GreenObsidian
```

> 提示: lsb_release: command not found 解决

解决方法

```shell
# at rhel 8+
dnf install lsb_release

# at centos 
yum install redhat-lsb -y -a
```

`cat /etc/issue`

```
Red Hat Enterprise Linux AS release 4 (Nahant Update 2)
Kernel \r on an \m
```

`cat /etc/redhat-release`

这种方式下可以直接看到具体的版本号

```
[root@rocky8 ~]# cat /etc/redhat-release
Rocky Linux release 8.6 (Green Obsidian)
```

`rpm -q redhat-release`  (centos) or  `rpm -q rocky-release`  (rocky)

这种方式下可看到一个所谓的release号, centos 和 rocky 不同的分发使用的命令是不一致的

```
[root@rocky8 ~]# rpm -q rocky-release
rocky-release-8.8-1.8.el8.noarch
```

`getconf LONG_BIT`  或者  `getconf WORD_BIT`

查看系统是64位还是32位

```
[root@rocky8 ~]# getconf LONG_BIT
64
[root@rocky8 ~]# getconf WORD_BIT
32
```

`file /bin/ls`

用来探测给定文件的类型

```
[root@rocky8 ~]# file /bin/ls
/bin/ls: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=618c637a7d4bcfd24f3b7017c3198b38b10362e9, stripped
```

`lsb_release -a`



．



