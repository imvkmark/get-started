---
title: "[转] 删除 CentOS 的旧内核，清理 CentOS 的 /boot 分区"
date: 2021-06-26 10:30:06
toc: true
categories:
- ["Ops","CentOS"]
---

原文地址 : [删除CentOS的旧内核，清理CentOS的/boot分区](https://qiaodahai.com/centos-boot-partition.html)

Linux系统在分区的时候一般不会分配过多的磁盘空间给启动分区/boot，通常情况下是300MB左右。在使用yum update升级内核（kernel）后，CentOS并不会自动删除旧内核，在启动选项中会有多个内核选项，会出现/boot分区逐渐减小、空间不足、无法更新内核的情况。如果出现这些问题，可以手动使用以下命令删除多余的内核，清理/boot分区。方法如下：

1.查看系统当前使用的内核（kernel）版本。




```
uname -a
```

可以看到内核的版本和更新的日期等信息。

2.查看系统中全部的内核RPM包。

```
rpm -qa | grep kernel
```

3.自行选择删除旧内核的RPM包。

```
yum -y remove kernel-3.10.0-514.el7.x86_64
yum -y remove kernel-devel-3.10.0-514.el7.x86_64
yum -y remove kernel-3.10.0-693.11.1.el7.x86_64
yum -y remove kernel-tools-3.10.0-693.11.1.el7.x86_64
yum -y remove kernel-tools-libs-3.10.0-693.11.1.el7.x86_64
```

> 注：此命令仅为举例说明，请以系统中实际存在的内核包为准。


4.重启系统。

```
reboot
```

5.使用命令df -h 查看/boot分区的使用情况。

> 注：不需要手动修改/boot/grub/menu.lst

