# RockyLinux (RHEL 8) 安装 nginx, php,mysql


这里以 rocky linux 为例, 使用的用户是 duoli:duoli

## 系统更新

### 更新系统

```shell
# dnf update
```

### 安装 epel

EPEL (Extra Packages for Enterprise Linux)是基于Fedora的一个项目，为“红帽系”的操作系统提供额外的软件包，适用于RHEL、CentOS和Scientific Linux.

```shell
# dnf install https://mirrors.aliyun.com/epel/epel-release-latest-8.noarch.rpm
```

这会将存储库文件下载到 `/etc/yum.repos.d/epel.repo`并启用它

查看是否启用了 epel

```shell
# dnf repolist epel
```

查看当前可以安装的软件

```shell
# dnf --disablerepo="*" --enablerepo="epel" list available
```

安装 epel 的包

```shell
# dnf --enablerepo="epel" install <package>
```

### 启用 remi

安装 remi, 这里使用的是 aliyun 源

```shell
# dnf -y install https://mirrors.aliyun.com/remi/enterprise/remi-release-8.rpm
```

启用之后需要更换源地址

```
# sed -i 's/^mirrorlist=http:\/\/cdn.remirepo.net/#mirrorlist=http:\/\/cdn.remirepo.net/g' /etc/yum.repos.d/remi*.repo
# sed -i 's/rpms.remirepo.net/mirrors.aliyun.com\/remi/g' /etc/yum.repos.d/remi**.repo
# sed -i 's/^#baseurl=http:\/\/mirrors.aliyun.com/baseurl=http:\/\/mirrors.aliyun.com/g' /etc/yum.repos.d/remi*.repo
```

更新已有的数据

```shell
# dnf update
```

## 安装 nginx

### 安装

```shell
# dnf module list nginx

# dnf module enable nginx:mainline

# dnf install nginx

# systemctl enable --now nginx
```

### 配置

这里配置 nginx 子进程的运行用户组

```nginx
user duoli;
```

### 缓存

修改缓存的执行权限, 文件的上传以及资源文件的访问会生成缓存放到 nginx 目录下, 所以保障 nginx 的运行用户对这个用户可读写

```shell
# chown -R duoli.duoli /var/lib/nginx
```

## 安装 php

```shell
# dnf module list php
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

# 这个源的版本比较新
# dnf module enable php:remi-7.4

# dnf install php php-cli php-gd php-curl php-zip php-mbstring php-mysqlnd

# systemctl enable --now php-fpm

```

### 配置 php-fpm

配置权限

```
; 配置用户访问组
user = duoli
group = duoli
```

配置 Nginx 对php 的访问

php 对外访问分为 sock 方式 和端口方式两种

**sock 方式**

```
; sock file 
listen = /run/php-fpm/www.sock

; sock access users
listen.acl_users = duoli 
```

**listen** 方式

```
; ip:port
listen = 127.0.0.1:9000
```

### 配置 php.ini

```
# 时区
date.timezone = Asia/Shanghai
# upload
post_max_size       = 20M
upload_max_filesize = 20M
```

### 配置 php 缓存文件

配置 session 是可写状态

```
$ chown -R duoli:duoli /var/lib/php/
```

### 配置 nginx 的访问

**PHP服务器**

对于sock 文件, 需要配置sock 文件位置

```nginx
# PHP-FPM FastCGI server
# network or unix domain socket configuration

upstream php-fpm {
    server unix:/run/php-fpm/www.sock;
}
```

对于 listen 方式, 我们需要配置端口方式

```nginx
# PHP-FPM FastCGI server
# network or unix domain socket configuration

upstream php-fpm {
    server 127.0.0.1:9000;
}
```

**虚拟主机**

这里使用 upstream 的方式来配置 fastcgi 代理

```nginx
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

## 安装 Mysql 8.0

这里默认的源是 8.0

```shell
# dnf module list mysql
Last metadata expiration check: 2:43:29 ago on Mon 06 Jun 2022 07:02:36 PM CST.
Rocky Linux 8 - AppStream
Name                     Stream                     Profiles                              Summary
mysql                    8.0 [d]                    client, server [d]                    MySQL Module
```

安装并启动 `mysqld` 服务

```shell
# dnf install mysql mysql-server

# systemctl enable --now mysqld

# mysql_secure_installation

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

```
# # dnf -y install https://mirrors.aliyun.com/remi/enterprise/remi-release-8.rpm
Last metadata expiration check: 0:06:02 ago on Mon 23 May 2022 11:33:13 PM CST.
remi-release-8.rpm                                                                       181 kB/s |  29 kB     00:00
Error:
 Problem: conflicting requests
  - nothing provides redhat-release >= 8.5 needed by remi-release-8.5-3.el8.remi.noarch
  - nothing provides system-release(releasever) = 8 needed by remi-release-8.5-3.el8.remi.noarch
(try to add '--skip-broken' to skip uninstallable packages or '--nobest' to use not only best candidate packages)
```

### ERROR: Unable to set php_value 'soap.wsdl_cache_dir'

如果你不需要soap扩展 直接在php-fpm的配置文件中 将那一行设置去掉, 如果需要则安装相应的配置并开启权限即可

