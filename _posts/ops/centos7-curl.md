---
title: " 「转+」 CentOS 7 更新 curl 为最新版本"
date: 2022-04-20 19:00:53
toc: true
categories:
- ["Ops","CentOS"]
---

## 介绍
由于 CentOS 7 内置的 curl 和 libcurl 源为较旧的 7.29.0，不支持一些新特性且有安全性问题，所以需要更新一下, 这里使用 city-fan 的更新源来更新。

查看默认版本号



```
# curl -V
curl 7.29.0 (x86_64-redhat-linux-gnu) libcurl/7.29.0 NSS/3.53.1 zlib/1.2.7 libidn/1.28 libssh2/1.8.0
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp scp sftp smtp smtps telnet tftp
```

## 更新 ca-bundle 证书

1. 备份证书
```
# cp /etc/pki/tls/certs/ca-bundle.crt /etc/pki/tls/certs/ca-bundle.crt.bak
```

2. 更新并替换
```
# curl http://curl.haxx.se/ca/cacert.pem -o /etc/pki/tls/certs/ca-bundle.crt
```

## 新增 repo 源
新增 repo：
```
# rpm -Uvh http://www.city-fan.org/ftp/contrib/yum-repo/city-fan.org-release-2-1.rhel7.noarch.rpm
Retrieving http://www.city-fan.org/ftp/contrib/yum-repo/city-fan.org-release-2-1.rhel7.noarch.rpm
warning: /var/tmp/rpm-tmp.ttjkC5: Header V4 DSA/SHA1 Signature, key ID b56a8bac: NOKEY
Preparing...                          ################################# [100%]
Updating / installing...
   1:city-fan.org-release-2-1.rhel7   ################################# [100%]
```
启用 city-fan.org repo：
```
# yum install -y yum-utils
# yum-config-manager --enable city-fan.org
```

## 更新 curl
直接使用如下命令进行更新：
```
# yum update curl --enablerepo=city-fan.org  -y
```
安装完成, 查看版本
```
# curl -V
curl 7.79.1 (x86_64-redhat-linux-gnu) libcurl/7.79.1 NSS/3.53.1 zlib/1.2.7 libpsl/0.7.0 (+libicu/50.1.2) libssh2/1.10.0 nghttp2/1.33.0 OpenLDAP/2.4.44
```

## QA:

1. 如果提示缺少依赖  libnghttp2.so.14()(64bit)
> 错误：软件包：libcurl-7.75.0-1.1.cf.rhel7.x86_64 (city-fan.org)
>           需要：libnghttp2.so.14()(64bit)

```
# rpm -ivh https://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/l/libnghttp2-1.33.0-1.1.el7.x86_64.rpm
```
这里地址是 centos7 版本, 如果是其他系统, 可以在一下路径自己寻找 [https://dl.fedoraproject.org/pub/epel/](https://dl.fedoraproject.org/pub/epel/)

## 参考地址

- [How to yum update curl 7.29 to 7.61 - CentOS 7.X](https://qiita.com/tkprof/items/5460b8d603cbbc542c8c)
- CentOS 7 更新 curl 为最新版本

