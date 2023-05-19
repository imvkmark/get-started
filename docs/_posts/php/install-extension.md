---
title: "安装 Php 扩展"
date: 2022-04-20 19:01:02
toc: true
categories:
- ["Php","环境搭建"]
---

> 环境: 当前执行环境为 7.2, 同时也适用于 8



## 安装 pecl
pecl 是属于 php 扩展库的一个工具, pecl 可以安装 [https://pecl.php.net/](https://wulicode.com/php/install-lnmp-on-centos7.html) 文章中提到使用 remi 的仓库来安装 php 那同样安装 pecl 也使用 remi 的仓库来安装
```markdown
$ yum install php-pear --enablerepo=remi-php74
```

## 安装 redis
安装  redis , 需要额外的支持, 如果你需要安装的话

- igbinary serializer : ig 序列化工具
- lzf compress : lzf 压缩算法
- zstd compress   : facebook 出品的一款快捷压缩算法

需要运行命令
```
$ pecl install igbinary
$ pecl install lzf
$ pecl install zstd
```
这样在运行安装的时候可以开启这些支持
```
$ pecl install redis
...
enable igbinary serializer support? [no] : yes
enable lzf compression support? [no] : yes
enable zstd compression support? [no] : yes
```
否则会出现需要  igbinary 的扩展
```
checking for json includes... /usr/local/Cellar/php@7.2/7.2.29/include/php
checking for redis json support... enabled
checking for igbinary includes... configure: error: Cannot find igbinary.h
ERROR: `/private/tmp/pear/temp/redis/configure --with-php-config=/usr/local/opt/php@7.2/bin/php-config --enable-redis-igbinary=y --enable-redis-lzf=y --enable-redis-zstd=y' failed
```

## 安装 swoole
```
$ pecl install swoole
```
在安装 swoole 的时候会遇到<br />错误信息如下：
```
....
In file included from /private/tmp/pear/temp/swoole/php_swoole.h:53:
/private/tmp/pear/temp/swoole/include/swoole.h:620:10: fatal error: 'openssl/ssl.h' file not found
#include <openssl/ssl.h>
         ^~~~~~~~~~~~~~~
1 error generated.
make: *** [php_swoole_cxx.lo] Error 1
ERROR: `make' failed
```
没有加 openssl 库的路径或者指定 openssl 库的路径不对，缺少头文件。<br />没有 openssl 的话使用 brew 安装一个 openssl，在 pecl 安装的时候加上对应路径即可
```javascript
enable openssl support? [no] : yes --with-openssl-dir=/usr/local/opt/openssl@1.1
```

## 安装 mcrypt

### mac 安装
mac 上 mcrypt 依托于 libmcrypt, 所以在 mac 上需要提前安装 
```
$ brew install mcrypt
$ pecl install mcrypt
```

