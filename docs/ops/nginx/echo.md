# 学习使用 echo 模块

Nginx echo 模块是在 nginx 程序上扩展了 `echo`
输出字符的功能，对于调试很方便，项目地址: https://github.com/openresty/echo-nginx-module 。

## Mac 安装或者替代方案

### 方法 1 : 使用 openrestry

安装地址 : [http://openresty.org/en/installation.html]()

```
$ brew install openresty/brew/openresty
```

如果是 nginx 也安装了, 可以停掉 nginx , 将配置文件复制到 openresty 文件夹 `/usr/local/etc/openresty` , 启动 openresty 即可运行

```
$ brew services stop nginx
$ brew services start openresty/brew/openresty
```

### 编译 echo module 并加载(失败)

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

https://github.com/openresty/echo-nginx-module#installation

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

原因可能是版本不兼容: https://github.com/openresty/echo-nginx-module#compatibility

### 其他 *nix 系统

> 目前支持 `nginx-1.11.2`，高版本可能安装失败，我装 `1.11.13` 失败了，更多支持 nginx
> 的版本见: https://github.com/openresty/echo-nginx-module#compatibility

去 [release](https://github.com/openresty/echo-nginx-module/releases) 下载最新的安装包，并解压.

在配置 Nginx 时用: `./configure --add-module=/你的解压路径`，并编译安装

## 使用

> 只是研究了一些常用的

### echo - 输出字符

- 语法: `echo [options] <string>...`
- 默认值: `no`

```nginx
# 简单的hello，world!
server {
    location = /api/hello {
        echo "hello，world!";
    }
}
```

默认 echo 会自动换行，不需要换行可以: `echo -n xxx;`;

### echo_before_body，echo_after_body - 页面前、后插入内容

- 语法: `echo_before_body [options] [argument]...`
- 默认值: `no`

```nginx
server {
    # 简单的输出
    location = /api/hello {
        echo_before_body echo_before_body;
        echo "hello，world!";
        echo_after_body echo_after_body;
    }
    # 常见于代理页面前、后插内容
    location = /api/proxy_before_after {
        echo_before_body echo_before_body;
        echo_before_body echo_before_body;
        proxy_pass http://127.0.0.1;
        echo_after_body echo_after_body;
        echo_after_body echo_after_body;
    }
}
```

### echo_sleep - 请求等待

- 语法: `echo_sleep <seconds>`
- 默认值: `no`

```nginx
server {
    # 简单的输出
    location = /api/sleep {
        echo 1;
        # 等待1秒
        echo_sleep 1;
        echo 2;
    }
}
```

### echo_location_async，echo_location - 请求指定路径

- 语法: `echo_location_async <location> [<url_args>]`
- 默认值: `no`

```nginx
location /main {
    # 异步调用/sub
    echo_location_async /sub;
    echo world;
}
location /main2 {
    # 同步调用/sub
    echo_location_async /sub;
    echo world;
}
location /sub {
    echo hello;
}
```

异步跟同步的区别是:

1. 异步会并行的去请求
2. 同步等待当前请求结束才会往下执行

下面这个整个时间为 2s，因为新路径最大是 2s:

```nginx
location /main {
     echo_location_async /sub1;
     echo_location_async /sub2;
     echo "took $echo_timer_elapsed sec for total.";
 }
 location /sub1 {
     echo_sleep 2;
 }
 location /sub2 {
     echo_sleep 1;
 }
```

下面这个整个时间为 3s，因为需要等待`/sub1`完成才进入`/sub2`:

```nginx
location /main {
     echo_location /sub1;
     echo_location /sub2;
     echo "took $echo_timer_elapsed sec for total.";
 }
 location /sub1 {
     echo_sleep 2;
 }
 location /sub2 {
     echo_sleep 1;
 }
```

可以通过第二个参数传`querystring`: `echo_location_async /sub 'foo=Foo&bar=Bar';`

### echo_foreach_split - 分隔循环

- 语法: `echo_foreach_split <delimiter> <string>`

```nginx
location /split {
    echo_foreach_split ',' $arg_list;
        echo "item: $echo_it";
    echo_end;
}
```

上面配置当访问: `/split?list=cat,dog,mouse` 时会输出:

```
item: cat
item: dog
item: mouse
```

`$arg_list`是对应`$args.list`

那么配置全`echo_location_async`可以做成`nginx-combo`服务了，如:

```nginx
location = /api/combo {
    echo_foreach_split ',' $query_string;
        echo "/* combo: $echo_it */";
        echo_location_async $echo_it;
        echo;
    echo_end;
}
```

访问: `/api/combo?/a.js,/b.js`，需要注意的是文件的路径必须以`/`开始，因为匹配的`location`，当然真的 `nginx-combo`
服务请看: [nginx-http-concat](http-concat.md)

其他变量请去官网查看~

## link

- [官网](https://github.com/openresty/echo-nginx-module)
- [在线 Demo](https://echo.xuexb.com)

