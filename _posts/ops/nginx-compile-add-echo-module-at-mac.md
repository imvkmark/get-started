---
title: "Mac 编译 Nginx 并增加 echo 模块"
date: 2022-04-20 19:00:52
toc: true
categories:
- ["Ops","Nginx","入门"]
---

## 方法 1 : 使用 openrestry
安装地址 : [http://openresty.org/en/installation.html]()



```
$ brew install openresty/brew/openresty
```
如果是 nginx 也安装了, 可以停掉 nginx , 将配置文件复制到 openresty 文件夹 `/usr/local/etc/openresty` , 启动 openresty 即可运行
```
$ brew services stop nginx
$ brew services start openresty/brew/openresty
```

## 编译 echo module 并加载(失败)
> !!! 此方法不能使用, 仅仅作为记录

**解压源文件**

Nginx 目录 : `/usr/local/share/nginx/src`

包含的文件列表
```
-rw-r--r--  1 duoli  staff   1.4K  8 11 22:52 configure_args.txt
-rw-r--r--  1 duoli  staff   658K  8 11 22:52 src.tar.xz
```
解压 源文件
```
$ xz -dk src.tar.xz
$ tar -zxvf src.tar
```
查看编译参数
```
$ cat configure_args.txt
...
--sbin-path=/usr/local/Cellar/nginx/1.19.2/bin/nginx
...
```
**下载 echo module**

当前目录: `/usr/local/share/nginx/src/`
```
$ mkdir modules
$ cd modules
$ git clone https://github.com/openresty/echo-nginx-module
```
我们编译的基础之上在加上 echo 目录, 由于无需覆盖, 所以这里修改 nginx 的文件目录 `--sbin-path=/usr/local/Cellar/nginx/1.19.2/bin/nginx-echo`

这里增加编译参数 `--with-echo-module=/usr/local/share/nginx/src/modules/echo-nginx-module`

这里使用 echo 官方使用动态模块加入:

[https://github.com/openresty/echo-nginx-module#installation](https://github.com/openresty/echo-nginx-module#installation)
```
$ ./configure --prefix=/usr/local/Cellar/nginx/1.19.2 \
--add-dynamic-module=/usr/local/share/nginx/src/modules/echo-nginx-module \
--with-cc-opt='-DNGX_HTTP_HEADERS' $(nginx -V)
checking for OS
 + Darwin 19.6.0 x86_64
checking for C compiler ... found
 + using Clang C compiler
 + clang version: 11.0.3 (clang-1103.0.32.62)
...
...
creating objs/Makefile
Configuration summary
  + using system PCRE library
  + OpenSSL library is not used
  + using system zlib library
  nginx path prefix: "/usr/local/Cellar/nginx/1.19.2"
  nginx binary file: "/usr/local/Cellar/nginx/1.19.2/sbin/nginx"
  nginx modules path: "/usr/local/Cellar/nginx/1.19.2/modules"
  ...
$ make -j2
$ make install
```
这样存在动态模块 `/usr/local/Cellar/nginx/1.19.2/modules`
```
$ ll
-rwxr-xr-x  1 duoli  staff    49K  8 25 17:08 ngx_http_echo_module.so
```
nginx 配置加载动态模块

但是这样加载的模块出现 不兼容
```
nginx: [emerg] module "/usr/local/Cellar/nginx/1.19.2/modules/ngx_http_echo_module.so" is not binary compatible in /usr/local/etc/nginx/nginx.conf:11
```
原因可能是版本不兼容: [https://github.com/openresty/echo-nginx-module#compatibility](https://github.com/openresty/echo-nginx-module#compatibility)

