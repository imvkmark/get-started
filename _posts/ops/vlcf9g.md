---
title: "使用 vmware fusion Centos后连接网络"
date: 2021-02-04 13:59:45
toc: true
categories:
- ["Ops","CentOS"]
---

`vi /etc/sysconfig/network-scripts/ifcfg-ens33` , 修改为 根据网络自启动网卡



```
...
BOOTPROTO=dhcp
...
ONBOOT=yes                             
```

`vi /etc/sysconfig/network`, 修改为 启用网络
```
# Created by anaconda
NETWORKING=yes
```

`vi /etc/resolv.conf`, 编辑文件, 增加域名解析服务器
```
nameserver 114.114.114.114
```
重启网卡
```
$ systemctl restart network
```
```
$ ping www.baidu.com
PING www.a.shifen.com (110.242.68.3) 56(84) bytes of data.
```
连接成功

