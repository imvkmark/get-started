---
title: "CentOS 进行服务器完善和升级"
date: 2022-04-20 19:00:55
toc: true
categories:
- ["Ops","CentOS"]
---

## 系统软件安装以及升级


### 基础工具安装
```shell
# normal tools
$ yum install wget vim yum-utils gcc
# autojump
$ yum install autojump
# zip
$ yum install zip unzip
```

### 升级 curl 为最新版本
[[转+] CentOS 7 更新 curl 为最新版本](https://www.yuque.com/go/doc/74347798?view=doc_embed)

## 源添加和更换
**CentOS 镜像**<br />CentOS，是基于 Red Hat Linux 提供的可自由使用源代码的企业级 Linux 发行版本；是一个稳定，可预测，可管理和可复制的免费企业级计算平台。
```shell
# 更换为 aliyun 提高下载速度, 设置aliyun库
$ wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```
**Remi 镜像**<br />Remi repository 是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护<br />官方源 : [https://rpms.remirepo.net/](https://rpms.remirepo.net/)<br />Aliyun : [https://developer.aliyun.com/mirror/remi](https://developer.aliyun.com/mirror/remi)
```
# 设置 remi 库 , 二选一
# official
$ yum install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
# aliyun mirror
$ yum install https://mirrors.aliyun.com/remi/enterprise/remi-release-7.rpm
```

### 系统升级
```
# 更新元数据
$ yum makecache
# 更新和升级
$ yum update
$ yum upgrade
```

## 关闭 Seliunx
这里遇到一个坑, 如果不关闭 SELinux, 可能会遇到开发的坑.<br />检查 SELinux 是否在运行:
```
$ getenforce
```
下次重启前禁用 SELinux:
```
$ setenforce Permissive
```
重新启动 Nginx，看看问题是否仍然存在。如果您想永久更改 Selinux 设置，可以编辑 `/etc/sysconfig/selinux`<br />[<br />](https://app.yinxiang.com/shard/s2/nl/120678/8e7d8ac2-37c1-4ce4-b17c-05fde158c97b/)

