---
description: '在RHEL/CentOS 7和8上构建安装最新cURL的指南（作者Suhu，2021年）。步骤：下载最新版、编译构建、版本检查。快速方法：访问curl.se/download。'
lastUpdated: '2026-07-01 20:01:03'
head:
  - - meta
    - name: 'og:title'
      content: '在 RHEL 中构建和安装最新的 cURL'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在RHEL/CentOS 7和8上构建安装最新cURL的指南（作者Suhu，2021年）。步骤：下载最新版、编译构建、版本检查。快速方法：访问curl.se/download。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/curl/upgrade-at-rhel.html'
---
# 在 RHEL 中构建和安装最新的 cURL

快捷安装命令, 此命令不对系统进行强制性更新, 如果存在新版请更新后边的版本号

curl official site: [https://curl.se/download/](https://curl.se/download/)

以下脚本在系统 `rocky linux 8.6` 测试通过

```Bash
/bin/bash -c "$(curl -fsSL https://i.wulicode.com/op/file/centos-curl.sh?version=8.10.1)"
```

---

以下为原文

[How to Build and Install Latest cURL Version CentOS](https://gist.github.com/thesuhu/bccd43a4dc998e738d1f3578f34949ce)

```Plaintext
# Written by The Suhu (2021).

# Tested on CentOS 7 and CentOS 8
```

在此之前，我曾写过[如何在Ubuntu上构建和安装最新的cURL版本](https://medium.com/@thesuhu/how-to-build-and-install-latest-curl-version-on-ubuntu-97af10675740)。在本文中，会介绍如何在CentOS上构建和安装最新的cURL版本。  
操作系统上的默认 cURL 可能不是最新版本。如果您想要最新的版本，那么需要从源代码开始构建。让我们使用以下命令检查安装的 cURL 版本

```Bash
curl -V
```

```Plaintext
curl 7.76.1 (x86_64-redhat-linux-gnu) libcurl/7.76.1 OpenSSL/3.0.7 zlib/1.2.11 brotli/1.0.9 libidn2/2.3.0 libpsl/0.21.1 (+libidn2/2.3.0) libssh/0.10.4/openssl/zlib nghttp2/1.43.0
Release-Date: 2021-04-14
Protocols: dict file ftp ftps gopher gophers http https imap imaps ldap ldaps mqtt pop3 pop3s rtsp scp sftp smb smbs smtp smtps telnet tftp
Features: alt-svc AsynchDNS brotli GSS-API HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz NTLM NTLM_WB PSL SPNEGO SSL TLS-SRP UnixSockets
```

上面显示的是安装的 cURL 版本是 7.76.1 。而目前 cURL 的最新版本是 8.9.1(2024年09月)。请访问 [https://curl.se/download/](https://curl.se/download/) 查看最新的 cURL 版本

## 下载 cURL 最新版

在下载最新版本的 cURL 之前，让我们先更新一下系统。这是可选的，但我更喜欢这样做，以保持安装的包是最新的

```Plaintext
sudo yum update -y
```

安装所需的程序包

```Plaintext
sudo yum install wget gcc openssl-devel make -y
```

下载最新的 cURL 源代码。在本教程中，我们将下载 8.9.1 版本

```Plaintext
wget https://curl.haxx.se/download/curl-8.9.1.tar.gz
```

然后解压下载的内容

```Plaintext
tar -xzvf curl-8.9.1.tar.gz
```

## 构建 cURL

转到下载的 cURL 源文件的解压缩目录

```Bash
cd curl-8.9.1
```

现在使用 `configure` 命令进行构建

```Bash
./configure --prefix=/usr/local --with-ssl
```

确保上述命令执行过程中没有错误。如果没有错误，最后我们可以使用 `make` 命令安装它

```Bash
make
sudo make install
sudo ldconfig
```

## 新版本检查

要确保成功安装新版本，请从 终端/ssh 打开一个新会话并运行命令

```Shell
curl -V
```

```Plaintext
curl 8.9.1 (x86_64-pc-linux-gnu) libcurl/8.9.1 OpenSSL/1.1.1k-fips zlib/1.2.11
Release-Date: 2024-07-31
Protocols: dict file ftp ftps gopher gophers http https imap imaps ipfs ipns mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet tftp
Features: alt-svc AsynchDNS HSTS HTTPS-proxy IPv6 Largefile libz NTLM SSL threadsafe TLS-SRP UnixSockets
```

CURL版本应该是 8.9.1

## 快速方法

如果不想费劲的逐个运行命令，可以创建下面的脚本文件并运行它

```Bash
#! /bin/bash

# Tested on CentOS 7 and CentOS 8
# Check the latest version at https://curl.se/download/
VERSION=8.9.1

cd ~
sudo yum update -y
sudo yum install wget gcc openssl-devel make -y
wget https://curl.se/download/curl-${VERSION}.tar.gz
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

::: info ℹ️

更新记录
2024年09月01日
- 更新 curl 版本, 并且测试通过 rocky 8.6
2023年05月23日
- 增加快捷安装

:::