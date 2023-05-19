---
title: "[转+] Mac 使用 brew 安装 Nginx、MySQL、PHP-FPM 的 LNMP 开发环境"
date: 2022-04-20 19:00:58
toc: true
categories:
- ["Php","环境搭建"]
---

原文地址： [Mac OS 使用 brew 安装 Nginx、MySQL、PHP-FPM 的 LAMP 开发环境](http://tabalt.net/blog/install-nginx-mysql-php-fpm-by-brew-on-mac/)


## Homebrew
Homebrew 是 macOS 的包管理工具, 可以安装多款 unix 软件, 可以根据官网的命令来进行安装
> [Homebrew 官网](https://brew.sh/)

如果你尚未安装, macOS 将会提醒你安装 Xcode 命令行工具

## 准备
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
$ brew install php@7.2
$ sudo brew services start php@7.2
```
安装之后有两段话需要注意
> php@7.2  is keg-only, which means it was not symlinked into /usr/local, 
> because this is an alternate version of another formula.
> If you need to have php@7.2  first in your PATH run: 
> echo 'export PATH="/usr/local/opt/php@7.2/bin:$PATH"' >> ~/.zshrc
> echo 'export PATH="/usr/local/opt/php@7.2/sbin:$PATH"' >> ~/.zshrc
> For compilers to find php@7.2  you may need to set:
> export LDFLAGS="-L/usr/local/opt/php@7.2/lib"
> export CPPFLAGS="-I/usr/local/opt/php@7.2/include"


### 命令行启动
因为 mac 系统自带 php, 如果想使用我们安装的作为第一命令行, 则需要将路径寻找优先级高于系统 `$PATH` 位置<br />这里将 php 路径加入 PATH 有两种方式:<br />第一种, 修改 `~/.bash_profile` 文件, 可以根据自己的命令行工具来使用
```shell
$ sudo vim ~/.bash_profile
# add to files
export PATH="$(brew --prefix php@7.2)/bin:$PATH"
# enable setting
$ source ~/.bash_profile
```
这种方式如果使用 `pecl` 来安装 php 扩展的时候则由于 `keg-only` 冲突无法安装, 提示无权创建<br />第二种方式是<br />这里强制 php7.2 作为可以执行的版本, 这种可以使用 `pecl` 进行安装 相关扩展, 比如 `redis`, `swoole`
```shell
$ brew link --force php@7.2
```

### 配置 Php-Fpm
```
/usr/local/etc/php/{version}/php.ini
/usr/local/etc/php/{version}/php-fpm.conf
```
配置 Nginx 支持 PHP-FPM
```nginx
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
# /usr/local/etc/php/7.2/php-fpm.d/www.conf
user = <user>
group = staff
```
最后, 重启 nginx 来激活这些改动, 如果我们忘记启动 php, 则会出现 `502 Bad Gateway` 错误
```
$ sudo brew services restart nginx
$ sudo brew services start php@7.2
```

## 结语
到目前为止，我们的 Nginx、MySQL、PHP-FPM 三大软件已经安装好了，针对不同的系统版本和软件版本，可能会遇到一些问题，欢迎留言探讨。

- 参考文章 : [Setting up a Nginx web server on macOS](https://sylvaindurand.org/setting-up-a-nginx-web-server-on-macos/)

### 是否使用 sudo 启动区别
> If sudo is passed, operate on /Library/LaunchDaemons (started at boot).
> Otherwise, operate on ~/Library/LaunchAgents (started at login)

