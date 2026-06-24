---
description: '本文介绍了在Mac上通过Homebrew搭建LNMP环境（Nginx、MySQL、PHP）的步骤，包括关闭Apache、配置Nginx、替换MySQL配置、安装多版本PHP、配置PHP-FPM及常见问题。'
lastUpdated: '2026-06-17 18:28:04'
head:
  - - meta
    - name: 'og:title'
      content: 'Mac 使用 brew 安装 Nginx、MySQL、Php 的 LNMP 开发环境'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了在Mac上通过Homebrew搭建LNMP环境（Nginx、MySQL、PHP）的步骤，包括关闭Apache、配置Nginx、替换MySQL配置、安装多版本PHP、配置PHP-FPM及常见问题。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/primer/install-lnmp-at-mac.html'
---
# Mac 使用 brew 安装 Nginx、MySQL、Php 的 LNMP 开发环境

::: info 🔗
文章同步发布到掘金 : https://juejin.cn/post/7615074040147345418
:::

## 准备

### Homebrew

Homebrew 是 macOS 的包管理工具, 可以安装多款 unix 软件, 可以根据官网的命令来进行安装

<bookmark name="Homebrew" href="https://brew.sh/"></bookmark>

::: info 🔗<p>更多 Homebrew 使用查看 : [Mac 下安装和使用 Homebrew](/ops/mac/homebrew.md)</p><p>对于不同芯片的 homebrew 目录有所不同, 需要注意</p><ul><li>M 系列芯片, 所有的目录基于 <code>/opt/homebrew </code>, 本文基于此定义</li><li>intel 芯片, 目录基于 <code>/usr/local</code></li></ul>:::

如果你尚未安装, macOS 将会提醒你安装 Xcode 命令行工具, 安装完成后根据提示配置命令行目录

### 内置环境

Mac OS 内置了 Apache ,  但 Apple 已不再为内置 Apache 提供更新维护

PHP 在  macOS 12 (Monterey) 及之后的版本完全移除了内置 PHP，需要通过第三方包来进行安装

```Plaintext
$ httpd -v
Server version: Apache/2.4.62 (Unix)
Server built:   Jan 16 2026 08:09:39
```

因为我们要自己动手来安装 Nginx，如果 apache 启动则会出现端口占用的情况, 所以需要关闭系统自带的 apache(如果启动的话)：

```Shell
# 关闭apache，如果事先没开启过，可以忽略报错信息
$ sudo apachectl stop  
```

如果你的 apache 已经加入了 launchctl，使用下面的命令来关闭：

```Plaintext
$ sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

为什么选择关闭 apache？因为 mac os x 系统自带的 apache 是没有优雅的 remove/uninstall 的方式的.

默认目录位置如下

```Plaintext
$ /usr/sbin/apachectl
$ /usr/sbin/httpd
$ /etc/apache2/
```

## Nginx

### 安装

```Plaintext
$ brew install nginx
$ sudo brew services enable|start|restart|stop nginx
```

尽管我们不需要使用 sudo 来进行安装, 但是如果我们需要使用 80 端口来运行的话我们需要使用 sudo 来启动应用

### 配置

首先，我们必须给 Nginx 权限来访问我们的文件，以避免一个讨厌的 `403 Forbidden` 错误。为此，我们更改第一行，其中 `{user}`是你的用户名:

```Plaintext
# /opt/homebrew/etc/nginx/nginx.conf
user {user} staff;
```

给予管理员权限

```Bash
# for intel
sudo chown root:wheel /usr/local/opt/nginx/bin/nginx
sudo chmod u+s /usr/local/opt/nginx/bin/nginx

# for arm
sudo chown root:wheel /opt/homebrew/opt/nginx/bin/nginx
sudo chmod u+s /opt/homebrew/opt/nginx/bin/nginx
```

> 这里无法启动一定要确认权限是否正确, 尤其是在升级之后

运行 nginx

```Plaintext
sudo nginx # 打开 nginx(和 sudo brew services start nginx 一致)
nginx -s reload|reopen|stop|quit  #重新加载配置|重启|停止|退出 nginx
nginx -t   #测试配置是否有语法错误
```

用法详解

```Plaintext
nginx [-?hvVtq] [-s signal] [-c filename] [-p prefix] [-g directives]
```

选项列表

```Plaintext
-?,-h           : 打开帮助信息
-v              : 显示版本信息并退出
-V              : 显示版本和配置选项信息，然后退出
-t              : 检测配置文件是否有语法错误，然后退出
-q              : 在检测配置文件期间屏蔽非错误信息
-s signal       : 给一个 nginx 主进程发送信号：stop（停止）, quit（退出）, reopen（重启）, reload（重新加载配置文件）
-p prefix       : 设置前缀路径
-c filename     : 设置配置文件
-g directives   : 设置配置文件外的全局指令
```

## Mysql

```Plaintext
$ brew install mysql@8.0
$ brew services start mysql@8.0
```

修改配置文件

```Plaintext
$ vim /opt/homebrew/etc/my.cnf
```

这里我们添加错误日志, 否则默认的错误日志均会记录到系统中

```Plaintext
[mysqld]
log_error=/opt/homebrew/var/log/mysqld.log
```

初始化 mysql

```Plaintext
./bin/mysql_install_db
```

执行安全设置脚本,设置 root 账号密码

```Plaintext
./bin/mysql_secure_installation
```

命令行连接 mysql

```Plaintext
mysql -uroot -p
```

mysql 可以对外服务

```Plaintext
vim ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
# 将这一行
<string>--bind-address=127.0.0.1</string>
# 替换为
<string>--bind-address=0.0.0.0</string>
```

## Php

### 安装

如果这里加上版本号, 则为指定版本,如果不加则是默认的版本, 非默认版本的属性是 `keg-only`, 意思就是可以支持多版本默认不会将命令行软链到 `/usr/homebrew`

```Plaintext
$ brew install php@8.2
$ brew services start php@8.2
```

注意如下内容

```Plain Text
php@8.2 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have php@8.2 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/php@8.2/bin:$PATH"' >> ~/.zshrc
  echo 'export PATH="/opt/homebrew/opt/php@8.2/sbin:$PATH"' >> ~/.zshrc

For compilers to find php@8.2 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/php@8.2/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/php@8.2/include"
```

### 安装多版本 PHP

在 Mac 上官方 brew 支持的 php 版本根据 Php 的支持度会有变化, 某些版本当前已经不存在, 在这种状态下如果我们需要低版本的 php , 我们可以安装以下这个包, 如果不熟悉 brew tap, 查看顶部首页的链接

<bookmark name="GitHub - shivammathur/homebrew-php: Homebrew tap for PHP 5.6 to 8.6. PHP 8.6 is built nightly :beer:" href="https://github.com/shivammathur/homebrew-php"></bookmark>

这样即使低版本的php 我们一样可以安装使用了

```Bash
$ brew install php@7.4
```

### 命令行启动 / 版本更换

在 mac 上首先安装的版本是最新的版本, 这样如果想切换默认的 php 版本则需要使用如下命令

```Bash
$ brew link --force php@8.2
```

### 扩展安装

这种可以使用 `pecl` 进行安装 相关扩展, 比如 `redis`, `swoole`, `xdebug`

```Plaintext
$ pecl install redis
```

### 配置 Php-Fpm

```Plaintext
/opt/homebrew/etc/php/{version}/php.ini
/opt/homebrew/etc/php/{version}/php-fpm.conf
```

配置 Nginx 支持 PHP-FPM

```Plaintext
# /opt/homebrew/etc/nginx/nginx.conf
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

```Plaintext
# /opt/homebrew/etc/php/8.2/php-fpm.d/www.conf
user = <user>
group = staff
```

最后, 重启 nginx 来激活这些改动, 如果我们忘记启动 php, 则会出现 `502 Bad Gateway` 错误

```Plaintext
$ sudo brew services restart nginx
$ sudo brew services start php@8.2
```

到目前为止，我们的 Nginx、MySQL、PHP-FPM 三大软件已经安装好了，针对不同的系统版本和软件版本，可能会遇到一些问题，欢迎留言探讨

## FAQ

### 是否使用 sudo 启动区别

如果使用 sudo 执行，则操作 `/Library/LaunchDaemons`（开机启动）；否则操作 `~/Library/LaunchAgents`（登录启动）

### 参考资料

- 参考文章 : [Setting up a Nginx web server on macOS](https://sylvaindurand.org/setting-up-a-nginx-web-server-on-macos/)

::: info 📆
更新记录
2026年03月11日
- 更新内容适配 Mac 芯片
2023年01月16日
- 加入 php 多版本, 移除和当前版本不符合的描述
:::