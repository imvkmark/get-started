---
description: '使用 Packeton 管理私有包，包括环境配置、PHP 及用户权限设置、Nginx 运行权限、代码目录权限、自动化代码拉取与 SSH 配置。项目可从 1.4 版本通过迁移升级至 2.0。'
lastUpdated: '2026-06-18 08:36:56'
head:
  - - meta
    - name: 'og:title'
      content: '使用 packeton 来管理私有包'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用 Packeton 管理私有包，包括环境配置、PHP 及用户权限设置、Nginx 运行权限、代码目录权限、自动化代码拉取与 SSH 配置。项目可从 1.4 版本通过迁移升级至 2.0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/composer/packeton.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/dac037f399938469e63fd0cd6f59f671.png'
---
# 使用 packeton 来管理私有包

packeton 是一个私有, 可独立部署的包管理工具, 支持无限的私有包地址

- 项目地址 : [https://github.com/vtsykun/packeton](https://github.com/vtsykun/packeton)

## 项目安装

> 环境要求  
> php ≥ 8.1  
> 扩展 : redis, pdo, mysqlnd, fpm

::: info 🔗<p>扩展阅读</p><ul><li>[Rocky Linux (RHEL 8 9) 安装 nginx, php,mysql ](/back-end/php/primer/install-lnmp-at-rocky.md)</li></ul>:::

### 配置环境

这里需要保障 nginx, php 运行的用户是一致的

```Plaintext
# PHP 配置文件更改用户权限
/etc/opt/remi/php82/

# PHP 缓存权限
/var/opt/remi/php82/lib/php

# 代码目录的权限
/webdata/www/packeton

# nginx 配置用户运行权限
/etc/nginx/nginx.conf
```

**nginx**

[Installation - Packeton Docs](https://docs.packeton.org/installation.html)

这里复制官网文档中的代码, 因为代码使用的是 sf 框架, 所以配置和其他项目不同, 如果配置有问题可能会出现 403 错误

```Plaintext
server {
    listen *:443 ssl http2;
    server_name packeton.example.org;
    root /var/www/packeton/public;

    ssl_certificate /etc/nginx/ssl/example.crt;
    ssl_certificate_key /etc/nginx/ssl/example.key;

    ssl_ciphers 'TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-256-GCM-SHA384:ECDHE:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4';

    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_session_cache  builtin:1000  shared:SSL:10m;
    ssl_session_timeout  5m;

    rewrite ^/index\.php/?(.+)$ /$1 permanent;
    try_files $uri @rewriteapp;

    location @rewriteapp {
        rewrite ^(.*)$ /index.php/$1 last;
    }

    access_log off;

    location ~ ^/index\.php(/|$) {
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_index index.php;
        send_timeout 300;
        fastcgi_read_timeout 300;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    }
}
```

### 配置代码

这里我是多版本运行的 php, 所以我这里使用 php82 作为 php 的运行全局变量

克隆项目

```Bash
$ git clone git@github.com:vtsykun/packeton.git
```

使用指定的标签来安装, 当使用 master 分支的时候会出现莫名的错误, 所以切换了标签(2023-03-14)

```Bash
$ git checkout 2.1.2
```

安装依赖

```Bash
php82 composer install
```

配置环境变量

复制 `.env` 到 `.env.local` , 在 `.env.local` 中进行如下配置

- 更改 APP_SECRET, 这里的密钥采用了一个 md5 之后的值
- 配置数据库, 这里的数据库采用了 MySQL, 需要配置 MySQL 的 DSN

```Plaintext
DATABASE_URL="mysql://username:password@127.0.0.1:3306/packeton?serverVersion=5.7&charset=utf8mb4"
```

> 注意这里的权限需要有 `REFERENCE` 这个项, 否则在后续执行的时候会因为权限问题无法继续

初始化数据库

```Bash
$ php82 bin/console doctrine:schema:update --force --complete
```

创建用户

```Bash
$ php82 bin/console packagist:user:manager weiran --email=admin@example.com --password=123456 --admin
User weiran was created successfully, api token: AJG1rxxxxM2
```

这样访问设定的域名, 便可以访问了

![](https://file.wulicode.com/feishu-images/dac037f399938469e63fd0cd6f59f671.png)

## 项目配置

### 自动化

配置计划任务的自动化

```Plaintext
* * * * * php82 /webdata/www/packeton/bin/console --env=prod okvpn:cron >> /dev/null
```

如果需要手动运行任务可以执行

```Bash
$ php82 bin/console okvpn:cron --demand
```

配置队列

```Plaintext
[program:packeton]
environment =
        HOME=/webdata/www/
command=php82 /webdata/www/packeton/bin/console packagist:run-workers --env=prod --no-debug
directory=/webdata/www/packeton
process_name=%(program_name)s_%(process_num)02d
numprocs=1
autostart=true
autorestart=true
startsecs=0
redirect_stderr=true
priority=1
user=liexiang
```

![](https://file.wulicode.com/feishu-images/11e0e5cddbcfcadfc7e35de3cf9b416d.png)

### 拉取代码

**配置公私钥**

使用 SSH 密钥登录服务器或拉取代码

Packeton 使用全局 composer 配置和全局 ssh 设置来读取仓库信息, 所以 supervisor 必须以当前用户的身份去运行, 这样需要给仓库读取的权限, 建议仓库使用如下结构

```Plaintext
└── /webdata/www/packeton/
  └── .ssh/ # ssh keys directory
    ├── config     # 配置文件
    ├── rsa        # ssh 密钥
```

```Plaintext
# .ssh/config

Host github-packeton
        HostName github.com
        User git
        IdentityFile /webdata/www/packeton/.ssh/rsa
        IdentitiesOnly yes
```

这样可以让代码仓库的配置和普通的 ssh 区分开, 方便于安全拆分

设置代码仓库

检测代码仓库并进行提交

![](https://file.wulicode.com/feishu-images/98142a5533fe39917fa9d640e8a171a4.png)

### 自动更新

[Update Webhooks](https://github.com/vtsykun/packeton#update-webhooks)

在完成了以上操作之后, 包尚未根据代码的推送或者标签来进行自动更新, 所以需要通过 webhook 来设定更新, 这样在创建用户的时候生成的 User Token 便起到相应的作用了, 这里根据自己使用的托管平台来定义回调的 Url 地址

```Plaintext
https://<app>/api/update-package/{package/name}?token=user:token
```

## 项目应用

默认情况下, 管理员存在所有的包的访问权限和包管理权限, 其他用户需要设定自己的访问 token

```Plaintext
composer config --global --auth http-basic.example.org <user> <token>
```

```Plaintext
{
  "repositories": [{
      "type": "composer",
      "url": "https://packeton.company.com"
  }],
  "require": {
    "company/name1": "1.0.*",
    ....
  }
}
```

## 项目升级

### 从 1.4 升级到 2.0

- Require PHP 8.1+
- Symfony LTS has been changed from `3.4` to `5.4`
- Application composer HOME was changed to `%kernel.project_dir%/var/.composer`

### 运行 migration

没有主要的向后兼容性问题

运行命令来展示改动

```Bash
$ bin/console doctrine:schema:update --dump-sql
```

运行命令来进行数据库集成

```Plaintext
bin/console doctrine:schema:update --force
```

---

::: info 📆
更新记录
**2024年01月09日**
- 增加项目的升级记录说明
:::