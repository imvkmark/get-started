# CentOS 7 安装 nginx,php, mysql, redis,supervisor 套件

## 初始化系统

这里设置的用户是 `duoli`, 在此之前先需要对服务器进行完善和升级 [CentOS 7 进行服务器完善和升级](../../ops/centos/upgrade-at-7.md)

### 设置Mysql源

```
# 由于mysql 版权方面的限制, centos 7 没有内置mysql 服务器, 必须从mysql 官方进行安装
$ yum install https://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
```

### 设置 nginx 源

**方式一:(安装 rpm:推荐)**

```
$ yum install https://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

**方式二:(手动创建)**

源地址: [nginx: Linux packages](http://nginx.org/en/linux_packages.html)

创建 vim `/etc/yum.repos.d/nginx.repo` , 并且填充以下内容来安装 yum repository 库

```
[nginx-stable]
name=nginx stable repo
baseurl=https://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key

[nginx-mainline]
name=nginx mainline repo
baseurl=https://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
```

默认情况下，使用稳定 `nginx` 仓库包。如果您想使用 `mainline nginx` 包，运行以下命令

```
$ sudo yum-config-manager --enable nginx-mainline
```

### 安装基础软件

```
# 安装常用软件
$ yum install vim git yum-utils
$ yum install redis --enablerepo=remi
```

## 安装软件以及配置

### 安装并配置 Mysql 数据库

```
# 安装 mysql server
$ yum install mysql-server
```

**启动mysql并且获取密码**

```
$ systemctl start mysqld
# mysql 5.7 在安装完成的时候会生成一个临时密码, 我们需要找到错误日志 `/var/log/mysqld.log`来获取这个临时密码
# use below command to see the password:
$ grep 'temporary password' /var/log/mysqld.log
[Note] A temporary password is generated for root@localhost: _ab3BAKulW?r
```

**初始化 mysql**

```
$ mysql_secure_installation
Securing the MySQL server deployment.
Enter password for user root: ******
New password: ******
Re-enter new password: ******
The 'validate_password' plugin is installed on the server.
The subsequent steps will run with the existing configuration
of the plugin.
Using existing password for root.
Estimated strength of the password: 100
Change the password for root ? ((Press y|Y for Yes, any other key for No) : *
Estimated strength of the password: 100
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.
Remove anonymous users? (Press y|Y for Yes, any other key for No) :  Y
Success.
Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.
Disallow root login remotely? (Press y|Y for Yes, any other key for No) : N
... skipping.
By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.
Remove test database and access to it? (Press y|Y for Yes, any other key for No) : N
  ... skipping.
Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
Success.
All done!
```

设置密码的方法

```
$ mysql -uroot -p******
mysql> set password for 'root'@'localhost' = password('password@wulicode');
mysql> exit
```

**配置数据库用户**

```sql
CREATE
USER 'duoli'@'%' IDENTIFIED BY 'U*OSy)iKk$XO9dMB';
GRANT ALL PRIVILEGES ON *.* TO
'duoli'@'%' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `duoli_demo`.* TO
'duoli'@'%' WITH GRANT OPTION;FLUSH
PRIVILEGES
```

**让用户可以远程访问**在 my.conf 中 `[mysqld]` 部分增加以下行并重启 mysqld

```
bind-address=0.0.0.0
```

**开机自启动**

```
$ systemctl enable mysqld
```

### 安装并配置nginx

**安装Nginx**

```
# 安装 nginx
$ yum install nginx --enablerepo=nginx
```

**配置 nginx 时候的运行组**

### 配置

这里配置 nginx 子进程的运行用户组, 替换运行的用户组

```bash
sed -i 's/^user nginx/user duoli/' /etc/nginx/nginx.conf
```

也可以直接修改文件

```diff
- user nginx;
+ user duoli;
```

### 缓存

修改缓存的执行权限, 文件的上传以及资源文件的访问会生成缓存放到 nginx 目录下, 所以保障 nginx 的运行用户对这个用户可读写

```
# chown -R duoli.duoli /var/lib/nginx
```

(可选) 加入自定义的变量, log 命令, 用于搜集日志

```bash
# replace nginx
sed -i \
    '/log_format/,/;$/c\    include conf.d\/opts\/vars;\n    include conf.d\/opts\/log-main;\n    include conf.d\/opts\/block-ips;\n    include conf.d\/opts\/gzip;\n\n    client_max_body_size 50m;' \
nginx.conf

# download all vars
mkdir -p /etc/nginx/conf.d/opts && \
wget https://i.wulicode.com/op/file/opts-vars.nginx -O /etc/nginx/conf.d/opts/vars && \
wget https://i.wulicode.com/op/file/opts-gzip.nginx -O /etc/nginx/conf.d/opts/gzip && \
wget https://i.wulicode.com/op/file/opts-log-main.nginx -O /etc/nginx/conf.d/opts/log-main  && \
wget https://i.wulicode.com/op/file/opts-proxy.nginx -O /etc/nginx/conf.d/opts/proxy && \
wget https://i.wulicode.com/op/file/opts-block-ips.nginx -O /etc/nginx/conf.d/opts/block-ips && \

# modify permission
chown -R duoli.duoli /var/lib/nginx
```

如果不同的服务器需要设置不同的限制上传大小, 可以按照如下设置

```
# /etc/nginx/nginx.conf
user duoli;
# max upload setting
http {
    # http level
    client_max_body_size 20m;
    server
    {
        # server level
        client_max_body_size 20m;
    }
}
```

这里需要注意 nginx 缓存目录的权限需要和运行用户一致

```
# 目录位置
/var/cache/nginx
/var/log/nginx
```

**配置nginx虚拟主机**

```
server{
    listen 80;
    
    # 如果这里是 IP, 则才会允许访问
    server_name www.domain.com ;
    index index.php index.html;
    root /webdata/www/domain/public;
    
    # 这里注意和服务器自带不同的是
    # fastcgi_param  SCRIPT_FILENAME  /scripts/$fastcgi_script_name;
    # fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    # 会导致 FastCGI sent in stderr: "Primary script unknown" while reading response header from upstream
    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    access_log /webdata/logs/domain/web.access.log main;
    error_log /webdata/logs/domain/web.error.log;
}
```

### 安装并配置 php

```
# 安装 php 基于 remi , 所以需要安装 remi 源
# 如果需要安装其他版本, 则需要将 repo=remi-php7x
$ yum install --enablerepo=remi-php74 php php-pdo php-fpm php-mbstring php-pecl-mcrypt php-gd php-mysqli php-zip php-bcmath php-xml
```

如果需要安装其他扩展可以参考 [安装 Php 扩展和优化](./install-extension-and-optimize.md)

**配置 php-fpm 权限**

```
# /etc/php-fpm.d/www.conf
user = duoli
group = duoli
```

**配置 php.ini**

```
# 时区
date.timezone = Asia/Shanghai
# upload
post_max_size       = 20M
upload_max_filesize = 20M
```

**配置 session 是可写状态**

```
$ chown -R duoli:duoli /var/lib/php/
```

### 安装并配置多版本 php

安装多版本 php 需要注意的是 php 的 fastcgi 的运行端口, 配置文件目录, 缓存目录注意应用的名称

```
# yum install php82
# yum install php82-php-fpm
```

文件位置

```
# 配置
/etc/opt/remi/php82/

# 缓存
/var/opt/remi/php82/lib/php
```

服务名称

```
# systemctl start php82-php-fpm
```

### 配置系统端口允许访问并加入自启动

配置的端口有 80/3306 等

```
# 配置 http
$ firewall-cmd --permanent --zone=public --add-service=http

# 配置 3306
$ firewall-cmd --permanent --zone=public --add-port=3306/tcp

# 重启 防火墙
$ firewall-cmd --reload

# 如未启动服务, 可启动服务
$ systemctl start php-fpm mysqld nginx redis

# 开机启动
$ systemctl enable php-fpm mysqld nginx redis
```

### Supervisor 安装

> 参考其他文档
>

[Centos 使用 pip3 安装-升级 supervisor](../../python/install/use-mirror-to-speed.md)

## 补充

### 下载安装mysql

获取最新下载地址: [http://dev.mysql.com/downloads/mysql/](http://dev.mysql.com/downloads/mysql/)

```
# 下载
$ wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-client-5.7.*-1.el7.i686.rpm
$ wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-server-5.7.*-1.el7.i686.rpm
# 安装
yum localinstall mysql-community-client**.rpm
yum localinstall mysql-community-server**.rpm
```

### mysql 更换安装目录

默认位置在:

```
/var/lib/mysql
```

新建目标位置并移动数据

```
# new dir
$ mkdir /webdata/db/
# move data
$ mv -R /var/lib/mysql /webdata/db
# permission
$ chown -R mysql.mysql /webdata/db
```

编辑配置文件

```
# vi config
$ vi /etc/my.cnf
datadir=/webdata/db/mysql
socket=/webdata/db/mysql/mysql.sock
```

更改 mysql 链接 socket, 否则 mysql 客户端无法使用默认配置连接

```
[client]
port=3306
socket=/webdata/db/mysql/mysql.sock
```

重启服务

```
# restart mysql
$ systemctl restart mysqld
```

### Centos 进行 Php 升级/降级(使用 remi-php 源)

安装启用 remi 的工具包

```
# 安装 util 工具
$ yum install yum-utils

# 启用相应的源
$ yum-config-manager --enable remi-php81

# 降级
$ yum-config-manager --enable remi-php74
$ yum-config-manager --disable remi-php81
```

进行 PHP 升级

```
$ yum upgrade php
```

升级之后权限会进行重置

```
drwxrwx--- 2 root apache 4096 10月 20 14:03 opcache
drwxrwx--- 2 root apache 4096 10月 20 14:03 session
drwxrwx--- 2 root apache 4096 10月 20 14:03 wsdlcache
```

更改目录权限

```
$ chown -R userxxx.userxxx /var/lib/php/

# 更改文件执行权限(一般升级不用)
$ vim /etc/php-fpm.d/www.conf
# user=...
# group=xxx
```

## FAQ

### File not found

`nginx/apache` 网页文件的 selinux 上下文需要配置,
如果未配置则日志中返回的错误是 `FastCGI sent in stderr: "Primary script unknown" while reading response header from upstream`, 暴力解决方法: 关闭

```
$ vim /etc/sysconfig/selinux
```

设置为禁用

```
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
```

### 源 “MySQL 5.7 Community Server” 的 GPG 密钥已安装，但是不适用于此软件包

> 源 “MySQL 5.7 Community Server” 的 GPG 密钥已安装，但是不适用于此软件包。请检查源的公钥 URL 是否配置正确 失败的软件包是：mysql-community-libs-5.7.38-1.el7.x86_64
> GPG 密钥配置为：file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
>

解决办法:

```
# rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
```

### supervisor 在代码更新之后需要重启

supervisor 在启动的时候是把代码放到内存中, 然后使用单线程来跑, 并不是每次都重启一个线程, 所以 php 在运行的时候会是以一个单例的方式来运行, 这样便会导致使用静态变量不会释放,
代码更新不会重新获取新代码, 加载到内存中(假定)所以

- 更新代码必须要重启队列
- 不要在 supervisor 中使用队列

## 补充附录

### 变更记录

**2022-08-05**

- supervisord 进行移动, 加入提醒

**2022-04-26**

- 补充升级, mysql 常用配置, 更新用户名

**2021-10-28**

- 增加权限改动示例

**2019-09-20**

- pip 更新为 pip3, 不使用 python2
- 加入 redis

**2019-04-03**

- redis 使用 remi 安装最新版
- supervisor 使用 pip 安装最新版, 系统自带的版本较低
- supervisor 启动加入自己写入配置文件

**2016-10-05**

- 第一版版本

### 参考文章

- [How To Install Nginx on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7)(很及时,
  解决了无法使用IP连接上服务器的问题)
- [Nginx安装（官网翻译）](http://www.cnblogs.com/toughlife/p/5487575.html)
- [nginx FastCGI错误Primary script unknown解决办法](http://www.jb51.net/article/47916.htm)