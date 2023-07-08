
# 查看系统版本号

## 查看内核版本命令：

-

`cat /proc/version`

Linux version 5.14.0-284.11.1.el9_2.x86_64 (mockbuild@iad1-prod-build001.bld.equ.rockylinux.org) (gcc (GCC) 11.3.1
20221121 (Red Hat 11.3.1-4), GNU ld version 2.35.2-37.el9) #1 SMP PREEMPT_DYNAMIC Tue May 9 17:09:15 UTC 2023

-

`uname -a`

Linux fa-com 5.14.0-284.11.1.el9_2.x86_64 #1 SMP PREEMPT_DYNAMIC Tue May 9 17:09:15 UTC 2023 x86_64 x86_64 x86_64
GNU/Linux

-

`uname -r`

5.14.0-284.11.1.el9_2.x86_64

## 查看linux版本

- `cat /etc/redhat-release`

这种方式下可以直接看到具体的版本号, 如

Rocky Linux release 9.2 (Blue Onyx)

- 查看系统是64位还是32位:

```
$ getconf LONG_BIT
64

$ getconf WORD_BIT
32

$ file /bin/ls
/bin/ls: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=cedbe8d7fb5757dd39992c1524f8d362adafcf41, for GNU/Linux 3.2.0, stripped
```

## redhat 查看版本号

- `lsb_release -a`

列出所有版本信息, 这个命令适用于所有的linux，包括Redhat、SuSE、Debian等发行版

```
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

- `rpm -q redhat-release`

这种方式下可看到一个所谓的release号

redhat-release-4AS-3


