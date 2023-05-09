# 介绍

## 安装

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

## 相关支持

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

## 报错信息

### openssl/ssl.h 缺失

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