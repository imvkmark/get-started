---
title: "centos apache 使用 mod_proxy_fcgi 支持多版本 php"
date: 2021-06-26 10:30:49
toc: true
categories:
  - [ "Ops","CentOS" ]
---

### remi 源安装的PHP分析

```
/usr/bin/php56  # 执行文件
/opt/remi/php56/root/etc                    # 配置文件目录
/opt/remi/php56/root/etc/php.ini            # 配置文件
/opt/remi/php56/root/usr/bin/php-cgi        # cgi 运行文件
/opt/remi/php56/root/usr/sbin/php-fpm       # php-fpm
/opt/remi/php56/root/etc/sysconfig/php-fpm  # php-fpm 系统变量配置文件
/opt/remi/php56/root/var/run/php-fpm        # 运行pid
/opt/remi/php56/root/var/log/php-fpm        # 日志
```

#### 配置文件树状结构

配置根目录 : `/opt/remi/php56/root/etc`

```
php.ini
php-fpm.conf
/php-fpm.d
    www.conf
```

### 修改 php-fpm 运行时候的端口配置

修改配置目录下 `/php-fpm.d/www.conf`

```
; 进程池名称, 之前是 www
[php56-fpm]
...
; 监听端口, 之前是 9000
listen = 127.0.0.1:9056
```

### 配置 apache 配置文件

目录 `/etc/httpd/conf.d/`

`vim test_host.conf`

```
<VirtualHost *:80>
    DocumentRoot "/webdata/www/test_host/"
    ServerName    test_host.com
    <FilesMatch "\.php$">
        SetHandler  "proxy:fcgi://localhost:9056"
    </FilesMatch>
    <Directory "/webdata/www/test_host/">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from All 
    </Directory>
</VirtualHost>
```

### 启动 php-fpm, 重启 apache

```
/opt/remi/php56/root/usr/sbin/php-fpm
service httpd restart
```

![](https://file.wulicode.com/yuque/202208/04/15/3332zhtjt1JN.png)

![](https://file.wulicode.com/yuque/202208/04/15/3333pLfa0fYS.png)

### 管理脚本

由于这个remi 的没有启动脚本, 所以新建立一个脚本进行管理

放置位置

`/etc/init.d/php56-fpm` , 并给定执行权限

```
#!/bin/bash
#
# Startup script for the remi PHP56-FPM server.
#
# processname: php-fpm
# config: /opt/remi/php56/root/etc/php.ini 

DESC="php56-fpm daemon"
NAME=php56-fpm
# php-fpm路径
DAEMON=/opt/remi/php56/root/usr/sbin/php-fpm
# 配置文件路径
CONFIGFILE=/opt/remi/php56/root/etc/php-fpm.conf
# PID文件路径(在php-fpm.conf设置)
PIDFILE=/opt/remi/php56/root/var/run/php-fpm/php-fpm.pid
SCRIPTNAME=/usr/init.d/$NAME

# Gracefully exit if the package has been removed.
test -x $DAEMON || exit 0

rh_start() {
  $DAEMON -y $CONFIGFILE || echo -n " already running"
}

rh_stop() {
  kill -QUIT `cat $PIDFILE` || echo -n " not running"
}

rh_reload() {
  kill -HUP `cat $PIDFILE` || echo -n " can't reload"
}

case "$1" in
  start)
        echo -n "Starting $DESC: $NAME"
        rh_start
        echo "."
        ;;
  stop)
        echo -n "Stopping $DESC: $NAME"
        rh_stop
        echo "."
        ;;
  reload)
        echo -n "Reloading $DESC configuration..."
        rh_reload
        echo "reloaded."
  ;;
  restart)
        echo -n "Restarting $DESC: $NAME"
        rh_stop
        sleep 1
        rh_start
        echo "."
        ;;
  *)
         echo "Usage: $SCRIPTNAME {start|stop|restart|reload}" >&2
         exit 3
        ;;
esac
exit 0
```

### 运行

```
service php56-fpm start
service php56-fpm stop
service php56-fpm restart
service php56-fpm reload
```

参考链接:

- [Apache Module mod_proxy_fcgi](http://httpd.apache.org/docs/trunk/mod/mod_proxy_fcgi.html)
- [Nginx和PHP-FPM的启动/重启脚本](http://www.lovelucy.info/nginx-phpfpm-init-script.html)

