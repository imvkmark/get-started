# 如何在 CentOS 中构建和安装最新的 cURL

## 快捷命令

快捷安装命令, 此命令不对系统进行强制性更新, 如果存在新版请更新后边的版本号

curl official site: https://curl.se/download/

```shell
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/centos-curl.sh?version=8.1.0)"
```

## 以下是正文

原文地址 : https://gist.github.com/thesuhu/bccd43a4dc998e738d1f3578f34949ce

```
# Written by The Suhu (2021).

# Tested on CentOS 7 and CentOS 8
```

在此之前，我曾写过[如何在Ubuntu上构建和安装最新的cURL版本](https://medium.com/@thesuhu/how-to-build-and-install-latest-curl-version-on-ubuntu-97af10675740)
。在本文中，会介绍如何在CentOS上构建和安装最新的cURL版本。
操作系统上的默认 cURL 可能不是最新版本。如果您想要最新的版本，那么需要从源代码开始构建。让我们使用以下命令检查安装的 cURL 版本

```
[thesuhu@centos-8-1 ~]$ curl --version
curl 7.61.1 (x86_64-redhat-linux-gnu) libcurl/7.61.1 OpenSSL/1.1.1g zlib/1.2.11 brotli/1.0.6 libidn2/2.2.0 libpsl/0
.20.2 (+libidn2/2.2.0) libssh/0.9.4/openssl/zlib nghttp2/1.33.0
Release-Date: 2018-09-05
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp scp sftp smb smbs smtp smtps 
telnet tftp 
Features: AsynchDNS IDN IPv6 Largefile GSS-API Kerberos SPNEGO NTLM NTLM_WB SSL libz brotli TLS-SRP HTTP2 UnixSocke
ts HTTPS-proxy PSL 
```

上面显示的是安装的 cURL 版本是 7.61.0 。而目前 cURL 的最新版本是 8.1.1(2023年05月23日)。请访问 https://curl.se/download/ 查看最新的 cURL 版本

## 下载 cURL 最新版

在下载最新版本的 cURL 之前，让我们先更新一下系统。这是可选的，但我更喜欢这样做，以保持安装的包是最新的

```
sudo yum update -y
```

安装所需的程序包

```
sudo yum install wget gcc openssl-devel make -y
```

下载最新的 cURL 源代码。在本教程中，我们将下载 8.1.1 版本

```
wget https://curl.haxx.se/download/curl-8.1.1.tar.gz
```

然后解压下载的内容

```
tar -xzvf curl-8.1.1.tar.gz
```

## 构建 cURL

转到下载的 cURL 源文件的解压缩目录

```
cd curl-8.1.1
```

现在使用 `configure` 命令进行构建

```
./configure --prefix=/usr/local --with-ssl
```

确保上述命令执行过程中没有错误。如果没有错误，最后我们可以使用 `make` 命令安装它

```
make
sudo make install
sudo ldconfig
```

## 新版本检查

要确保成功安装新版本，请从 终端/ssh 打开一个新会话并运行命令

```
[thesuhu@centos-8-1 ~]$ curl --version
curl 8.1.1 (x86_64-pc-linux-gnu) libcurl/8.1.1 OpenSSL/1.1.1k-fips zlib/1.2.11
Release-Date: 2021-11-10
Protocols: dict file ftp ftps gopher gophers http https imap imaps mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet 
tftp 
Features: alt-svc AsynchDNS HSTS HTTPS-proxy IPv6 Largefile libz NTLM NTLM_WB SSL TLS-SRP UnixSockets
```

CURL版本应该是 8.1.1

## 快速方法

如果不想费劲的逐个运行命令，可以创建下面的脚本文件并运行它

```bash
#! /bin/bash

# Tested on CentOS 7 and CentOS 8
# Check the latest version at https://curl.se/download/
VERSION=8.1.1

cd ~
sudo yum update -y
sudo yum install wget gcc openssl-devel make -y
wget https://curl.haxx.se/download/curl-${VERSION}.tar.gz
tar -xzvf curl-${VERSION}.tar.gz 
rm -f curl-${VERSION}.tar.gz
cd curl-${VERSION}
./configure --prefix=/usr/local --with-ssl
make
sudo make install
sudo ldconfig
cd ~
rm -rf curl-${VERSION}
```

这就是全部的文档，如果你觉得有用，请上星(⭐)并分享

## 更新记录

**2023年05月23日**

- 增加快捷安装
