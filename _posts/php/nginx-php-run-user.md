---
title : "linux 将 php/nginx 的权限执行用户进行更换"
date : 2022-04-14 22:15:03
toc : true
categories :
  - [ "Php","环境搭建" ]
---

- 用户
- 代码
- nginx
- php
- Supervisor
- Crontab 计划任务
- 一键命令

> 之前默认的执行用户是 nginx, 由于业务需要需要更换为其他的用户 liexiang

### 用户

用户创建以及用户组创建

```
$ useradd liexiang
```

这里需要需要变更的几个目录

### 代码

**代码目录**

```
$ chown -R liexiang.liexiang /webdata/www
```

### nginx

**nginx 执行用户**

`/etc/nginx/nginx.conf`

```
user liexiang;
```

**nginx 缓存目录**

```
$ chown -R liexiang.liexiang /var/cache/nginx/
$ chown -R liexiang.liexiang /var/lib/nginx
```

此错误处理来自于以下日志

> 2019/11/03 23:00:36 [crit] 17371#17371: *2512110 open() "/var/cache/nginx/fastcgi_temp/5/82/0000008825" failed (13: Permission denied) while reading upstream,
> client: 112.232.241.204 ...

### php

**php 执行用户**

`/etc/php-fpm.d/www.conf`

```
; RPM: apache Choosed to be able to access some dir as httpd
user = liexiang
; RPM: Keep a group allowed to write in log dir.
group = liexiang
```

**php 缓存路径**

```
$ chown -R liexiang.liexiang /var/lib/php
/var/lib/php
   - opcache
   - session
   - wsdlcache
```

### Supervisor

**supervisorctl 配置文件**

`/etc/supervisord.conf`

```
chmod=0770          ; subuser
chown=root:liexiang  ; socket file uid:gid owner
```

`supervisor.d/*.ini`

```
[program:play-web]
process_name=%(process_num)02d
command=php /webdata/www/play-web/artisan queue:work --sleep=3 --tries=3 --daemon --queue=play,micro_server
autostart=true
autorestart=true
user=liexiang
numprocs=1
redirect_stderr=true
stdout_logfile=/webdata/logs/play-web.job.log
```

### Crontab 计划任务

将计划任务用户权限更改为 liexiang

### 一键命令

```
sed -i -e 's/user=nginx/user=liexiang/g' /etc/supervisord.d/*.ini && chown -R liexiang.liexiang /var/lib/php && chown -R liexiang.liexiang /var/cache/nginx && chown -R liexiang.liexiang /webdata/www && nginx -s reload && systemctl reload php-fpm && systemctl reload supervisord && supervisorctl reload
```

