# Mac 安装 LNMP 开发环境

## 准备

我们本次使用 homebrew 来安装需要的工具, 如果没有安装可以移步 [Homebrew 的安装和使用](./../../development/tools/homebrew.md)

新版的 Mac OS 内置了 Apache 和 PHP，可以通过以下命令查看 Apache 和 PHP 的版本号：

```
$ httpd -v
Server version: Apache/2.4.46 (Unix)
Server built:   Oct 29 2020 20:35:15
$ php --version
PHP 5.4.24 (cli) (built: Jan 19 2014 21:32:15)
Copyright (c) 1997-2013 The PHP Group
Zend Engine v2.4.0, Copyright (c) 1998-2013 Zend Technologies
```

因为我们要自己动手来安装 Nginx，如果 apache 启动则会出现端口占用的情况, 所以需要关闭系统自带的 apache(如果启动的话)：

```
$ sudo apachectl stop  #关闭apache，如果事先没开启过，可以忽略报错信息
```

如果你的 apache 已经加入了 launchctl，使用下面的命令来关闭：

```
$ sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

为什么选择关闭 apache？因为 mac os x 系统自带的 apache 是没有优雅的 remove/uninstall 的方式的… 默认目录位置是, 可以按需处理

```
$ /usr/sbin/apachectl
$ /usr/sbin/httpd
$ /etc/apache2/
```

默认 php 的位置

```
$ /usr/bin/php
$ /usr/bin/phpize
$ /usr/bin/php-config
$ /usr/sbin/php-fpm
```

## Nginx

### 安装

```
$ brew install nginx
$ sudo brew services enable|start|restart|stop nginx
```

尽管我们不需要使用 sudo 来进行安装, 但是如果我们需要使用 80 端口来运行的话我们需要使用 sudo 来启动应用

### 配置

首先，我们必须给 Nginx 权限来访问我们的文件，以避免一个讨厌的 `403 Forbidden` 错误。为此，我们更改第一行，其中 `{user}`是你的用户名:

```
# /usr/local/etc/nginx/nginx.conf
user {user} staff;
```

给予管理员权限

```
$ sudo chown root:wheel /usr/local/opt/nginx/bin/nginx
$ sudo chmod u+s /usr/local/opt/nginx/bin/nginx
```

> 这里无法启动一定要确认权限是否正确, 尤其是在升级之后
>

运行 nginx

```
sudo nginx # 打开 nginx(和 sudo brew services start nginx 一致)
nginx -s reload|reopen|stop|quit  #重新加载配置|重启|停止|退出 nginx
nginx -t   #测试配置是否有语法错误
```

用法详解

```
nginx [-?hvVtq] [-s signal] [-c filename] [-p prefix] [-g directives]
```

选项列表

```
-?,-h           : 打开帮助信息
-v              : 显示版本信息并退出
-V              : 显示版本和配置选项信息，然后退出
-t              : 检测配置文件是否有语法错误，然后退出
-q              : 在检测配置文件期间屏蔽非错误信息
-s signal       : 给一个 nginx 主进程发送信号：stop（停止）, quit（退出）, reopen（重启）, reload（重新加载配置文件）
-p prefix       : 设置前缀路径（默认是：/usr/local/Cellar/nginx/1.2.6/）
-c filename     : 设置配置文件（默认是：/usr/local/etc/nginx/nginx.conf）
-g directives   : 设置配置文件外的全局指令
```

## Mysql

```
$ brew install mysql@5.7
$ brew services start mysql@5.7
```

修改配置文件

```
$ vim /usr/local/opt/mysql/my.cnf
```

这里我们添加错误日志, 否则默认的错误日志均会记录到系统中

```
[mysqld]
log_error=/usr/local/var/log/mysqld.log
```

初始化 mysql

```
./bin/mysql_install_db
```

执行安全设置脚本,设置 root 账号密码

```
./bin/mysql_secure_installation
```

命令行连接 mysql

```
mysql -uroot -p
```

mysql 可以对外服务

```
vim ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
# 将这一行
<string>--bind-address=127.0.0.1</string>
# 替换为
<string>--bind-address=0.0.0.0</string>
```

## Php

### 安装

如果这里加上版本号, 则为指定版本,如果不加则是默认的版本, 非默认版本的属性是 `keg-only`, 意思就是可以支持多版本默认不会将命令行软链到 `/usr/local`

```
$ brew install php@7.3
$ sudo brew services start php@7.3
```

安装之后有两段话需要注意

> php@7.3 is keg-only, which means it was not symlinked into /usr/local,
> because this is an alternate version of another formula.
>
>
> If you need to have php@7.3 first in your PATH, run:
> echo 'export PATH="/usr/local/opt/php@7.3/bin:$PATH"' >> ~/.zshrc
> echo 'export PATH="/usr/local/opt/php@7.3/sbin:$PATH"' >> ~/.zshrc
>
> For compilers to find php@7.3 you may need to set:
> export LDFLAGS="-L/usr/local/opt/php@7.3/lib"
> export CPPFLAGS="-I/usr/local/opt/php@7.3/include"
>

### 安装多版本 PHP

在 Mac 上官方 brew 支持的 php 版本根据 Php 的支持度会有变化, 某些版本当前已经不存在, 在这种状态下如果我们需要低版本的 php , 我们可以安装以下这个包, 如果不熟悉
brew tap, 查看顶部首页的链接

 https://github.com/shivammathur/homebrew-php 

这样即使低版本的php 我们一样可以安装使用了

```bash
$ brew install php@5.6
```

### 命令行启动 / 版本更换

在 mac 上首先安装的版本是最新的版本, 这样如果想切换默认的 php 版本则需要使用如下命令

```bash
$ brew link --force php@7.3
```

这种可以使用 `pecl` 进行安装 相关扩展, 比如 `redis`, `swoole`

```
$ pecl install redis
```

### 配置 Php-Fpm

```
/usr/local/etc/php/{version}/php.ini
/usr/local/etc/php/{version}/php-fpm.conf
```

配置 Nginx 支持 PHP-FPM

```
# /usr/local/etc/nginx/nginx.conf
# 添加默认首页 php
index  index.php index.html index.htm;
# 取消以下内容的注释，并做修改
location ~ \.php$ {
    fastcgi_intercept_errors on;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include        fastcgi_params;
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_buffers 16 16k;
    fastcgi_buffer_size 32k;
}
```

为了避免 出现 `File not found` 错误, 我们需要给定 php 正确的权限

```
# /usr/local/etc/php/7.3/php-fpm.d/www.conf
user = <user>
group = staff
```

最后, 重启 nginx 来激活这些改动, 如果我们忘记启动 php, 则会出现 `502 Bad Gateway` 错误

```
$ sudo brew services restart nginx
$ sudo brew services start php@7.3
```

## 结语

到目前为止，我们的 Nginx、MySQL、PHP-FPM 三大软件已经安装好了，针对不同的系统版本和软件版本，可能会遇到一些问题，欢迎留言探讨。

- 参考文章 : [Setting up a Nginx web server on macOS](https://sylvaindurand.org/setting-up-a-nginx-web-server-on-macos/)

### 是否使用 sudo 启动区别

> If sudo is passed, operate on /Library/LaunchDaemons (started at boot). Otherwise, operate on ~/Library/LaunchAgents (started at login)
>

### 更新记录

2023-01-16

- 加入 php 多版本, 移除和当前版本不符合的描述