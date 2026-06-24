---
description: '提供 Rocky Linux 8/9 上部署 LEMP 环境的完整指南：更新系统、安装 EPEL 与 Remi 源，配置 Nginx 稳定版及缓存，安装配置 PHP（含多版本）、php-fpm（时区、上传、缓存），以及 MySQL 8.0。涵盖常见错误及 Alibaba Linux 3 无法安装 Remi 的问题。'
lastUpdated: '2026-06-21 20:38:47'
head:
  - - meta
    - name: 'og:title'
      content: 'Rocky Linux (RHEL 8/9) 安装 nginx, php,mysql '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供 Rocky Linux 8/9 上部署 LEMP 环境的完整指南：更新系统、安装 EPEL 与 Remi 源，配置 Nginx 稳定版及缓存，安装配置 PHP（含多版本）、php-fpm（时区、上传、缓存），以及 MySQL 8.0。涵盖常见错误及 Alibaba Linux 3 无法安装 Remi 的问题。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/primer/install-lnmp-at-rocky.html'
---
# Rocky Linux (RHEL 8/9) 安装 nginx, php,mysql

这里以 rocky linux 为例, 使用的用户是 `duoli:duoli`

## 系统更新

查看系统版本

```Bash
$ cat /etc/rocky-release
Rocky Linux release 9.1 (Blue Onyx)
```

### 更新系统

```Bash
dnf update
```

### 安装 epel

[Extra Packages for Enterprise Linux (EPEL)](https://docs.fedoraproject.org/en-US/epel/)

EPEL (Extra Packages for Enterprise Linux)是基于Fedora的一个项目，为“红帽系”的操作系统提供额外的软件包，适用于RHEL、CentOS和Scientific Linux.

```Bash
# v8
dnf install https://mirrors.aliyun.com/epel/epel-release-latest-8.noarch.rpm

# v8 way 2
dnf config-manager --set-enabled powertools
dnf install epel-release

# v9
dnf config-manager --set-enabled crb
dnf install epel-release
```

这会将存储库文件下载到 `/etc/yum.repos.d/epel.repo` 并启用它查看是否启用了 epel

```Bash
dnf repolist epel
```

查看当前可以安装的软件

```Bash
dnf --disablerepo="*" --enablerepo="epel" list available
```

安装 epel 的包

```Bash
dnf --enablerepo="epel" install <package>
```

### 启用 remi

安装 remi, 这里使用的是 aliyun 源

```Bash
# v8
dnf -y install https://mirrors.aliyun.com/remi/enterprise/remi-release-8.rpm

# v9
dnf -y install https://mirrors.aliyun.com/remi/enterprise/remi-release-9.rpm
```

启用之后需要更换源地址, 如果使用的国外服务器, 无需进行源的更换

```Bash
sed -i 's/^mirrorlist=http:\/\/cdn.remirepo.net/#mirrorlist=http:\/\/cdn.remirepo.net/g' /etc/yum.repos.d/remi*.repo && \
sed -i 's/rpms.remirepo.net/mirrors.aliyun.com\/remi/g' /etc/yum.repos.d/remi**.repo && \
sed -i 's/^#baseurl=http:\/\/mirrors.aliyun.com/baseurl=http:\/\/mirrors.aliyun.com/g' /etc/yum.repos.d/remi*.repo
```

更新已有的数据

```Bash
dnf update
```

## 安装 nginx

### 安装

如果是 v9 版本, 直接运行安装即可

```Bash
# v8 安装稳定版
dnf module list nginx
dnf module enable nginx:mainline

# v9
dnf install nginx
systemctl enable --now nginx
```

在安装了一些自动化的维护系统后可能会出现如下提示

> All matches were filtered out by exclude filtering for argument: nginx  
> Error: Unable to find a match: nginx

这代表没有找到匹配的软件

可以使用 `grep -r "exclude" /etc/dnf/ /etc/yum.repos.d/` 来检查下是否存在被排除的软件, 如果有, 可以编辑或者使用禁用规则来安装

```Bash
dnf install nginx --disableexcludes=all
systemctl enable --now nginx
```

### 配置

这里配置 nginx 子进程的运行用户组, 替换运行的用户组

```Bash
sed -i 's/^user nginx/user duoli/' /etc/nginx/nginx.conf
```

也可以直接修改文件

```Plaintext
- user nginx;
+ user duoli;
```

### 缓存

修改缓存的执行权限, 文件的上传以及资源文件的访问会生成缓存放到 nginx 目录下, 所以保障 nginx 的运行用户对这个用户可读写

```Bash
chown -R duoli.duoli /var/lib/nginx
```

加入自定义的变量, log 命令, 用于搜集日志

```Bash
# replace nginx
sed -i \
    '/log_format/,/;$/c\    include conf.d\/opts\/vars;\n    include conf.d\/opts\/log-main;\n    include conf.d\/opts\/block-ips;\n    include conf.d\/opts\/gzip;\n\n    client_max_body_size 50m;' \
/etc/nginx/nginx.conf

# download all vars
mkdir -p /etc/nginx/conf.d/opts && \
wget https://i.wulicode.com/op/file/opts-vars.nginx -O /etc/nginx/conf.d/opts/vars && \
wget https://i.wulicode.com/op/file/opts-gzip.nginx -O /etc/nginx/conf.d/opts/gzip && \
wget https://i.wulicode.com/op/file/opts-log-vars.nginx -O /etc/nginx/conf.d/opts/log-vars && \
wget https://i.wulicode.com/op/file/opts-log-main.nginx -O /etc/nginx/conf.d/opts/log-main  && \
wget https://i.wulicode.com/op/file/opts-proxy.nginx -O /etc/nginx/conf.d/opts/proxy && \
wget https://i.wulicode.com/op/file/opts-block-ips.nginx -O /etc/nginx/conf.d/opts/block-ips && \
# modify permission
chown -R duoli.duoli /var/lib/nginx
```

### 卸载

```Bash
# 默认卸载
$ dnf remove nginx
 
# 排除所有忽略规则
$ dnf remove nginx --disableexcludes=all
```

排除忽略规则, 如果在卸载过程中出现如下错误

```Bash
$ dnf remove nginx
All matches were filtered out by exclude filtering for argument: nginx
No packages marked for removal.
Dependencies resolved.
Nothing to do.
Complete!
```

若 `dnf list installed | grep nginx` 能查到 Nginx 包，说明 `dnf` 有记录，但被 `exclude` 规则过滤 (可能是 `/etc/dnf/dnf.conf` 或仓库配置中设置了排除 `nginx` ), 使用排除忽略规则方法来卸载软件

## 安装 php

### 安装

```Bash
dnf module list php
```

```Plaintext
Rocky Linux 8 - AppStream
Name                 Stream        ...
php                  7.2 [d]       ...
php                  7.3           ...
php                  7.4           ...
php                  8.0           ...

Remi's Modular repository for Enter...
Name                 Stream        ...
php                  remi-7.2      ...
php                  remi-7.3      ...
php                  remi-7.4      ...
php                  remi-8.0      ...
php                  remi-8.1      ...
```

```Bash
# 这个源的版本比较新
dnf module enable php:remi-7.4

dnf install php \
  php-cli \
  php-gd \
  php-bcmath \
  php-curl \
  php-zip \
  php-mbstring \
  php-mysqlnd \
  php-opcache \
  php-pdo \
  php-xml \
  php-mysqlnd \
  php-zip \
  php-fpm 

systemctl enable --now php-fpm
```

### 配置 php-fpm

配置权限 `vim /etc/php-fpm.d/www.conf`

```Plaintext
; 配置用户访问组
user = duoli
group = duoli
```

配置 Nginx 对php 的访问php 对外访问分为 sock 方式 和端口方式两种**sock 方式**

```Plaintext
; sock file
listen = /run/php-fpm/www.sock

; sock access users
listen.acl_users = duoli
```

**listen** 方式

```Plaintext
; ip:port
listen = 127.0.0.1:9000
```

```Bash
sed -i 's/^\(user\).*$/\1 = duoli/' /etc/php-fpm.d/www.conf && \
sed -i 's/^\(group\).*$/\1 = duoli/' /etc/php-fpm.d/www.conf && \
sed -i 's/^\(listen.acl_users\).*$/\1 = duoli/' /etc/php-fpm.d/www.conf
```

### 配置 php.ini

```Plaintext
# 时区
date.timezone = Asia/Shanghai
# upload
post_max_size       = 50M
upload_max_filesize = 50M
```

### 配置 php 缓存文件

配置 session 是可写状态

```Bash
chown -R duoli:duoli /var/lib/php/
```

```Bash
sed -i 's/^;\(date.timezone\).*$/\1 = Asia\/Shanghai/' /etc/php.ini && \
sed -i 's/^\(post_max_size\).*$/\1 = 50M/'  /etc/php.ini && \
sed -i 's/^\(upload_max_filesize\).*$/\1 = 50M/'  /etc/php.ini && \
chown -R duoli:duoli /var/lib/php/
```

### 配置 nginx 的访问

**PHP服务器**

对于sock 文件, 需要配置sock 文件位置

```Plaintext
# PHP-FPM FastCGI server
# network or unix domain socket configuration

upstream php-fpm {
    server unix:/run/php-fpm/www.sock;
}
```

对于 listen 方式, 我们需要配置端口方式

```Plaintext
# PHP-FPM FastCGI server
# network or unix domain socket configuration

upstream php-fpm {
    server 127.0.0.1:9000;
}
```

**虚拟主机**

这里使用 upstream 的方式来配置 fastcgi 代理

```Plaintext
server{
    listen 80;
    server_name sub.domain.com;
    index index.php;
    root /path/of/php/project/;

    location ~ \.php$ {
        fastcgi_pass   php-fpm;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

遵循标准化的快捷安装命令

```Bash
# define project
export WULI_NAME=proj && \
export WULI_USER=duoli && \
export WULI_DOMAIN=proj.domain.com && \

# mkdir
mkdir -p /etc/nginx/conf.d/$WULI_NAME && \
mkdir -p /webdata/logs/$WULI_NAME && \
mkdir -p /webdata/www && \
cd /etc/nginx/conf.d && \
wget "https://i.wulicode.com/op/file/vps-sub-laravel.nginx?domain=$WULI_DOMAIN&name=$WULI_NAME" -O $WULI_NAME.conf && \
cd /etc/nginx/conf.d/$WULI_NAME && \
wget https://i.wulicode.com/op/file/host-assets.nginx -O assets.conf && \
wget "https://i.wulicode.com/op/file/host-ssl.nginx?domain=$WULI_DOMAIN&name=$WULI_NAME" -O ssl.conf && \
wget "https://i.wulicode.com/op/file/host-web.nginx?name=$WULI_NAME" -O web.conf  
```

### 安装多版本PHP

以上的安装方式是将 `php@7.4` 安装到 php 默认的目录中, 也就是系统默认的路径, 使用 remi 源替代官方源, 但是如果要安装多版本的 php 来运行, 则需要直接使用 remi 版本来安装

```Bash
yum install php82 \
  php82-php-curl \
  php82-php-fpm \
  php82-php-gd \
  php82-php-mbstring \
  php82-php-opcache \
  php82-php-pdo \
  php82-php-sodium \
  php82-php-xml \
  php82-php-mysqlnd \
  php82-php-zip \
  --enablerepo=remi
```

```Bash
dnf install php@8.2
```

这里的 fpm 的服务名称是 `php82-php-fpm` , 操作命令如下

```JSON
systemctl restart php82-php-fpm
```

这里配置目录和缓存文件的目录和 tree 如下

```Plaintext
# 配置目录
/etc/opt/remi
└── php82
    ├── opt
    ├── php.d
    │   ├── 10-opcache.ini
    │   ├── ...
    │   └── opcache-default.blacklist
    ├── php-fpm.conf
    ├── php-fpm.d
    │   └── www.conf
    ├── php.ini
    ├── pki
    ├── pm
    │   ├── config.d
    │   ├── power.d
    │   └── sleep.d
    ├── skel
    ├── sysconfig
    ├── X11
    │   ├── applnk
    │   └── fontpath.d
    ├── xdg
    │   └── autostart
    └── xinetd.d

# 缓存目录
/var/opt/remi/php82/
.
├── adm
├── cache
├── db
├── empty
├── games
├── gopher
├── lib             
│   ├── games
│   ├── misc
│   ├── pear
│   │   └── pkgxml
│   ├── php                 # 缓存目录
│   │   ├── opcache
│   │   ├── peclxml
│   │   │   ├── php82-php-pecl-igbinary.xml
│   │   │   ├── php82-php-pecl-msgpack.xml
│   │   │   └── php82-php-pecl-redis5.xml
│   │   ├── session
│   │   │   ├── sess_00apj8r2tuc45u1prjl5inl9pc
│   │   │   ├── sess_...
│   │   │   └── sess_vtg4s41n108rrb5j8mgclkdufv
│   │   └── wsdlcache
│   └── rpm-state
├── local
├── log
│   └── php-fpm
│       ├── error.log-...   # 日志切割
│       └── error.log
├── mail -> spool/mail
├── nis
├── opt
├── preserve
├── run
│   └── php-fpm
│       └── php-fpm.pid
├── spool
│   ├── lpd
│   └── mail
├── tmp
└── yp
```

其他配置和 7.4 安装流程以及配置一致

## 安装 Mysql 8.0

这里默认的源是 8.0

```Bash
dnf module list mysql
```

```Plaintext
Last metadata expiration check: 2:43:29 ago on Mon 06 Jun 2022 07:02:36 PM CST.
Rocky Linux 8 - AppStream
Name                     Stream                     Profiles                              Summary
mysql                    8.0 [d]                    client, server [d]                    MySQL Module
```

安装并启动 `mysqld` 服务

```Plaintext
dnf install mysql mysql-server

systemctl enable --now mysqld

mysql_secure_installation

-------- 开始部署安装 --------
Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

-------- 启用密码组件 --------
Press y|Y for Yes, any other key for No:

-------- 设置密码强度 --------
There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1

-------- 设置密码 --------
Please set the password for root here.

-------- 继续使用当前密码操作 --------
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y

-------- 移除匿名用户 --------
Remove anonymous users? (Press y|Y for Yes, any other key for No) :

-------- 禁用 root 远程登录 --------
Disallow root login remotely? (Press y|Y for Yes, any other key for No) :

-------- 移除测试数据库服务器 --------
Remove test database and access to it? (Press y|Y for Yes, any other key for No) :

-------- 重新加载权限表 --------
Reload privilege tables now? (Press y|Y for Yes, any other key for No) :

All done!
```

## FAQ

### alibaba linux 3 无法安装 remi

因为无法安装浪费了时间, 同时再切换到 rockylinux, 如果有谁在 alibaba linux 3 上可以安装成功(使用 remi) 可以给我留言

```Plaintext
# # dnf -y install https://mirrors.aliyun.com/remi/enterprise/remi-release-8.rpm
Last metadata expiration check: 0:06:02 ago on Mon 23 May 2022 11:33:13 PM CST.
remi-release-8.rpm                                                                       181 kB/s |  29 kB     00:00
Error:
 Problem: conflicting requests
  - nothing provides redhat-release >= 8.5 needed by remi-release-8.5-3.el8.remi.noarch
  - nothing provides system-release(releasever) = 8 needed by remi-release-8.5-3.el8.remi.noarch
(try to add '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

### ERROR: Unable to set php_value `soap.wsdl_cache_dir`

如果你不需要soap扩展 直接在php-fpm的配置文件中 将那一行设置去掉, 如果需要则安装相应的配置并开启权限即可