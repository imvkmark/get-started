---
description: 'rockylinux 9CentOS 镜像Remi 镜像Remi repository 是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护官方源 : https://rpms.remirepo.net/Aliyun : https://developer.aliyun.com/mirror/remi这里遇到一个坑, 如果不关闭 SELinux, 可能会遇到开发的坑.检查 SELinux 是否在运行:下次重启前禁用 SELinux:重新启动 Nginx，看看问题是否仍然存在。如果您想永久更改 Selinux 设置，可以编辑 /'
lastUpdated: '2025-11-12 03:57:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'CentOS 7 进行服务器完善和升级'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'rockylinux 9CentOS 镜像Remi 镜像Remi repository 是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护官方源 : https://rpms.remirepo.net/Aliyun : https://developer.aliyun.com/mirror/remi这里遇到一个坑, 如果不关闭 SELinux, 可能会遇到开发的坑.检查 SELinux 是否在运行:下次重启前禁用 SELinux:重新启动 Nginx，看看问题是否仍然存在。如果您想永久更改 Selinux 设置，可以编辑 /'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/os/linux/centos7-upgrade.html'
---
# CentOS 7 进行服务器完善和升级



## 系统软件安装以及升级

### 基础工具安装

```shell
# normal tools
yum install wget vim yum-utils gcc git

# autojump
yum install autojump

# zip
yum install zip unzip
```

rockylinux 9

```shell
dnf install autojump
```

## 源添加和更换

**CentOS 镜像**

```shell
# 更换为 aliyun 提高下载速度, 设置aliyun库
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

**Remi 镜像**

Remi repository 是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护

官方源 : [https://rpms.remirepo.net/](https://rpms.remirepo.net/)

Aliyun : [https://developer.aliyun.com/mirror/remi](https://developer.aliyun.com/mirror/remi)

```shell
# 设置 remi 库 , 二选一
# official
yum install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

# aliyun mirror
yum install https://mirrors.aliyun.com/remi/enterprise/remi-release-7.rpm
```

### 系统升级

```shell
# 更新元数据
yum makecache

# 更新和升级
yum update
yum upgrade
```

## 关闭 Seliunx

这里遇到一个坑, 如果不关闭 SELinux, 可能会遇到开发的坑.检查 SELinux 是否在运行:

```shell
getenforce
```

下次重启前禁用 SELinux:

```shell
setenforce Permissive
```

重新启动 Nginx，看看问题是否仍然存在。如果您想永久更改 Selinux 设置，可以编辑  `/etc/sysconfig/selinux`

## QA:

### 如果提示缺少依赖 libnghttp2.so.14()(64bit) 

> 错误：软件包：libcurl-7.75.0-1.1.cf.rhel7.x86_64 (city-fan.org) > 需要：libnghttp2.so.14()(64bit)

```shell
rpm -ivh https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/l/libnghttp2-1.33.0-1.1.el7.x86_64.rpm
```

这里地址是 centos7 版本, 如果是其他系统, 可以在一下路径自己寻找 [https://dl.fedoraproject.org/pub/epel/](https://dl.fedoraproject.org/pub/epel/)

