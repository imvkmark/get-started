---
title: "挂载磁盘出现的问题"
date: 2022-06-15 14:56:41
toc: true
categories:
- ["Ops","Linux","挂载"]
---

出现的详细报错现在没有记下来, 大致的意思是, 你为什么还用 ext3 的方式来挂载 ext4 的硬盘唻.<br />重启之后进入系统中, 想要修改 `/ext/fstab` 的时候提示文件不能修改, 所以重新挂载磁盘进入读写状态

```
mount -o remount,rw /
```
修改然后进行挂载
```
vim /etc/fstab
```
```
#
# /etc/fstab
# Created by anaconda on Tue May  3 13:48:10 2016
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=80b9b662-0a1d-4e84-b07b-c1bf19e72d97 /    ext4    defaults        1 1
/dev/vdb1 /storage                          ext4    defaults        0 0
/dev/vdc1 /webdata/wulihub                   ext4    defaults        0 0
```
使用 `mount -a` 进行挂载

