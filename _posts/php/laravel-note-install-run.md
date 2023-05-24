---
title: "laravel 学习笔记 01 - Laravel 安装和运行"
date: 2022-04-14 22:15:01
toc: true
categories:
- ["Php","Laravel"]
---

## composer 安装




### 介绍
composer 是一个便于管理php 框架的工具, 因为有很多的教程来介绍这个 `composer` 所以这里不会介绍

### 学习资料

1. 入门
   - [PHP 开发者该知道的 5 个 Composer 小技巧](http://www.phpcomposer.com/)
   - [简介](http://docs.phpcomposer.com/00-intro.html)
   - [基本用法](http://docs.phpcomposer.com/01-basic-usage.html)
   - [库（资源包）](http://docs.phpcomposer.com/02-libraries.html)
   - [命令行](http://docs.phpcomposer.com/03-cli.html)
   - [composer.json 架构](http://docs.phpcomposer.com/04-schema.html)
   - [资源库](http://docs.phpcomposer.com/05-repositories.html)
   - [社区](http://docs.phpcomposer.com/06-community.html)
2. [下载](http://docs.phpcomposer.com/download/)
3. [安装包列表](https://packagist.org/)

### 安装
下载并且指定安装目录, 并且确定 win 平台的的环境变量中有这个目录, 使用 `composer` 命令能够直接调用

### 设置镜像
参考 : [Composer 安装 / 加速](https://wulicode.com/php/composer-install-and-use-mirror.html)

## 安装 Laravel

### 安装 Laravel installer

- 使用 composer 下载运行需要的文件
```
composer global require "laravel/installer=~1.1"
```

- 将 `~/.composer/vendor/bin` 放入到环境变量中

### 使用 `new` 方法来创建项目
测试的目录为 `laravelRun`
```
laravel new laravelRun
```
这是初始化之后的文件目录结构

![](https://file.wulicode.com/yuque/202208/04/23/08517ntIai6o.png?x-oss-process=image/resize,h_565)

### 检测权限(linux)
同时检测下 `./storage` 有没有权限, 否则可能报错 `Error in exception handler`.由于 5.0 版本和 4.* 版本的差别. 5.0版本的存储位置被放置在 `./storage` 目录下

## 测试运行

### 系统需求

- PHP >= 5.4
- Mcrypt PHP Extension
- OpenSSL PHP Extension
- Mbstring PHP Extension

### 配置

- 设置 `key`, 这里生成的key 放在 `.env` 文件中, 用于数据的加密

**生成key**
```
cd laravelRun
php artisan key:generate
# Application key [1hSm25JlcusKQGdShlbnZlgVaCb3DetR] set successfully.
```
**配置.env 文件**
```
APP_KEY=1hSm25JlcusKQGdShlbnZlgVaCb3DetR
```

- 设置 `config/app.php`文件

### Apache 虚拟主机方式运行

- 配置Apache

我这里是 apache , 这里以 apache 为例, 这里需要配置 apache 对重写的支持 [使用 MOD_REWRITE 启用 url rewrite/url重写](http://my.oschina.net/duoli/blog/389248)

配置域名为 `www.lartest.com`
```
<VirtualHost *:80>
  ServerName www.lartest.com
  DocumentRoot "G:/wamp/www/mark/laravelRun/public"
  Options FollowSymLinks Indexes
</VirtualHost>
```

- 运行成功

[http://www.lartest.com](http://www.lartest.com/)

![](https://file.wulicode.com/yuque/202208/04/23/08510Zn21MMz.png?x-oss-process=image/resize,h_524)

### 使用artisan 服务器方式运行
```
php artisan serve
# Laravel development server started on http://localhost:8000
```
然后运行 http://localhost:8000/ 也会访问到这个位置, 以后我使用Apache方式运行

### 使用 nginx 配置 Laravel
```nginx
server {
    listen 80;
    server_name l.start.duoli.com;
    index index.php index.html index.htm default.html default.htm default.php;
    root /data/workbench/www/laravelRun/public;
    client_max_body_size 20m;
    location ~ .*\.(php|php5)?$ {
        fastcgi_pass 127.0.0.1:9000;
	      # fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        include fastcgi.conf;
    }
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ .*\.(js|css)?$ {
        expires 12h;
    }
    # more_set_headers 'Access-Control-Allow-Origin *';
    # more_set_headers 'Access-Control-Allow-Headers X-Requested-With,X-ACCESS-TOKEN,Content-Type';
    # more_set_headers 'Access-Control-Allow-Methods GET,POST,OPTIONS';
    access_log /data/workbench/logs/wulihub_access.log;
    error_log /data/workbench/logs/wulihub_error.log;
}
```

## 工欲善其事, 必先利其器
这里推荐一篇文章

- [[译+] 使用 PhpStorm 开发 Laravel 应用](https://wulicode.com/develop/ide-phpstorm-develop-on-laravel.html)

对于代码提示的强迫症人员和提示人员, 请移步观看下

