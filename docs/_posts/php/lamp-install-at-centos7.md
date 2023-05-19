---
title: "centos 7.0 安装 httpd 2.4 + php5.6 + mysql5.6"
date: 2022-04-14 22:14:52
toc: true
categories:
- ["Php","环境搭建"]
---

## 1. 更新系统环境


### 1.1 更新补丁
```
$ yum update
$ yum upgrade
```
**查看环境**
```
$ cat /etc/redhat-release
CentOS Linux release 7.1.1503 (Core)
$ uname -a
Linux AY131027170704Z 3.10.0-229.7.2.el7.x86_64 #1 SMP Tue Jun 23 22:06:11 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux
```

## 2. 安装 mysql
由于mysql 版权方面的限制, centos 7 没有内置mysql 服务器, 必须从mysql 官方进行安装
```
# 安装repo 源
yum install http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
# 安装 mysql server
yum install mysql-server
# 启动 mysql
$ systemctl start mysqld
```
初次安装mysql是root账户是没有密码的<br />设置密码的方法
```
$ mysql -uroot
mysql> set password for 'root'@'localhost' = password('markzhao123456');
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'markzhao123456';
mysql> exit
```
系统自启动mysql
```
$ systemctl enable mysqld
```

## 3. 安装PHP5.6
webtatic 主要供应最新LAMP等软件源
```
# install Webtatic EL7 for CentOS/RHEL 7:
$ rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
# 安装 php
$ yum --disablerepo=* --enablerepo=webtatic-archive list available
$ yum install php56w php56w-gd --disablerepo=* --enablerepo=webtatic-archive
$ yum install php56w-bcmath php56w-fpm php56w-pdo php56w-mbstring php56w-mysqlnd php56w-mcrypt --disablerepo=* --enablerepo=webtatic-archive
```
**配置 PHP**
```
# 时区
date.timezone = Asia/Shanghai
```

## 4. 安装httpd
```
$ yum install httpd
```
配置虚拟主机, 使用 php-fpm 的方式运行php
```
<VirtualHost *:80>
    DocumentRoot "/webdata/www/wctx123.com/public/"
    ServerName    wctx.zcmjm.com
    ServerAlias   www.wctx123.com
    <FilesMatch "\.php$">
        SetHandler  "proxy:fcgi://localhost:9000"
    </FilesMatch>
    <Directory "/webdata/www/wctx123.com/public/">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from All 
    </Directory>
</VirtualHost>
```

- Apache/2.4.9启动错误：AH01630: client denied by server configuration, 原因是Apache2.4的部分指令和Apache2.2有所不兼容, 详细升级说明文档见：[http://httpd.apache.org/docs/2.4/upgrading.html](http://httpd.apache.org/docs/2.4/upgrading.html)
```
<Directory />
    AllowOverride none
    Require all denied
    Order allow,deny
    # old way
    # Allow from all  
    # new way
    Require all granted 
</Directory>
```

## 5. 随系统启动
```
systemctl enable httpd
systemctl enable php-fpm
systemctl enable mysqld
```

## 6. 运行用户
```
.... apache
```

