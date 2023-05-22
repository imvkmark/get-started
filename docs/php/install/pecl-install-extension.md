# 使用 pecl 安装 Php 扩展

> 环境: 当前执行环境为 7.4, 同时也适用于 8
>

## 安装 pecl

pecl 是属于 php 扩展库的一个工具, pecl 可以安装 https://pecl.php.net/ 版本匹配的所有扩展

Mac 上在安装完毕之后便会存在此工具, 如果是其他系统则需要安装相关的扩展

**依托于 remi库 @centos7**

```shell
$ yum install php-pear --enablerepo=remi-php74
```

可以通过 pecl 命令来检测 pecl 的版本和信息

```
$ pecl version
PEAR Version: 1.10.13
PHP Version: 7.4.33
Zend Engine Version: 3.4.0
Running on: Darwin Op-Zhaodianyou.local 22.4.0 Darwin Kernel Version 22.4.0: Mon Mar  6 21:00:17 PST 2023; root:xnu-8796.101.5~3/RELEASE_X86_64 x86_64
```

## 安装 redis

安装 redis , 需要额外的支持, 如果你需要安装的话

- igbinary serializer : ig 序列化工具
- lzf compress : lzf 压缩算法
- zstd compress : facebook 出品的一款快捷压缩算法

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

否则会出现需要 igbinary 的扩展

```
checking for json includes... /usr/local/Cellar/php@7.2/7.2.29/include/php
checking for redis json support... enabled
checking for igbinary includes... configure: error: Cannot find igbinary.h
ERROR: `/private/tmp/pear/temp/redis/configure --with-php-config=/usr/local/opt/php@7.2/bin/php-config --enable-redis-igbinary=y --enable-redis-lzf=y --enable-redis-zstd=y' failed
```

## 安装 mcrypt

mac 上 mcrypt 依托于 libmcrypt, 所以在 mac 上需要提前安装

```shell
$ brew install mcrypt
```

安装 mcrypt 组件

```
$ pecl install mcrypt
```

## 安装 Swoole

安装默认版本

```
$ pecl install swoole
```

安装其他版本, 所有的版本清单可以在 [PECL :: Package :: swoole (php.net)](https://pecl.php.net/package/swoole) 查找到

![](https://file.wulicode.com/doc/20230508/1683541593696.png)


```
$ pecl install swoole-4.8.13
```

安装完毕之后的提示

```
Installing '/usr/local/Cellar/php@7.4/7.4.33_1/include/php/ext/swoole/php_swoole.h'
Installing '/usr/local/Cellar/php@7.4/7.4.33_1/include/php/ext/swoole/config.h'
Installing '/usr/local/Cellar/php@7.4/7.4.33_1/pecl/20190902/swoole.so'
install ok: channel://pecl.php.net/swoole-4.8.12
Extension swoole enabled in php.ini
```

### 相关支持

在安装的时候会询问是否安装相关支持

```
enable sockets supports? [no] : 
enable openssl support? [no] : 
enable http2 support? [no] : 
enable mysqlnd support? [no] : 
enable json support? [no] : 
enable curl support? [no] : 
enable cares support? [no] : 
```

### 报错信息

**openssl/ssl.h 缺失**

在安装 swoole 的时候会遇到错误信息如下：

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

没有加 openssl 库的路径或者指定 openssl 库的路径不对，缺少头文件。没有 openssl 的话使用 brew 安装一个 openssl，在 pecl 安装的时候加上对应路径即可

```
enable openssl support? [no] : yes --with-openssl-dir=/usr/local/opt/openssl@1.1
```