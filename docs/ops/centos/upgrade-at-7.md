# CentOS 7 进行服务器完善和升级

## 系统软件安装以及升级

### 基础工具安装

```bash
# normal tools
$ yum install wget vim yum-utils gcc git

# autojump
$ yum install autojump

# zip
$ yum install zip unzip
```

### 升级 curl 为最新版本

由于 CentOS 7 内置的 curl 和 libcurl 源为较旧的版本 7.29/7.68，不支持一些新特性且有安全性问题，所以需要更新一下

> 快捷安装命令, 此命令不对系统进行强制性更新

```shell
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/centos-curl.sh?version=8.1.1)"
```

安装完成, 查看版本

```
# curl -V
curl 8.1.1 (x86_64-pc-linux-gnu) libcurl/8.1.0 OpenSSL/1.0.2k-fips zlib/1.2.7
Release-Date: 2023-05-17
Protocols: dict file ftp ftps gopher gophers http https imap imaps mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
Features: alt-svc AsynchDNS HSTS HTTPS-proxy IPv6 Largefile libz NTLM NTLM_WB SSL UnixSockets
```

::: info 补充阅读
[如何在 CentOS 中构建和安装最新的 cURL](../curl/install-latest-at-centos.md)
:::

## 源添加和更换

**CentOS 镜像**

```
# 更换为 aliyun 提高下载速度, 设置aliyun库
$ wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```

**Remi 镜像**

Remi repository 是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护

官方源 : [https://rpms.remirepo.net/](https://rpms.remirepo.net/)

Aliyun : [https://developer.aliyun.com/mirror/remi](https://developer.aliyun.com/mirror/remi)

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

这里遇到一个坑, 如果不关闭 SELinux, 可能会遇到开发的坑.检查 SELinux 是否在运行:

```
$ getenforce
```

下次重启前禁用 SELinux:

```
$ setenforce Permissive
```

重新启动 Nginx，看看问题是否仍然存在。如果您想永久更改 Selinux 设置，可以编辑 `/etc/sysconfig/selinux`

## 更新记录

**2023年05月23日**

- 移除 city-fan.org curl 支持