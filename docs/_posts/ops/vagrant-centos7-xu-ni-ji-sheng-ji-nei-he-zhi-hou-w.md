---
title: "vagrant centos7 虚拟机升级内核之后无法挂载 vagrant 目录"
date: 2021-06-26 10:30:35
toc: true
categories:
- ["Ops","CentOS"]
---

**错误信息**

> The error output from the last command was:<br />
/sbin/mount.vboxsf: mounting failed with the error: No such device


**解决方案**

这个出现的原因是 升级 linux 内核 将导致 虚拟机的Guest无法访问, 知道重建并且运行 以下的命令<br />
It turns out, upgrading the Linux kernel will cause the Virtual Box Guest Additions to stop working until they are rebuilt by running the following command in the VM


```
sudo /etc/init.d/vboxadd setup
```

I had upgraded the kernel without thinking about it when I ran `yum update` (similar to `apt-get upgrade`) to get updates to other software.

Alternatively, if you install the dkms package as described here, then the kernel module should be automatically updated when the kernel is updated.

