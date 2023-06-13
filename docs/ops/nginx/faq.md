# 常见问题

## 不记录资源请求

```nginx
server {
    // static file log off
    location ~* \.(ico|jpg|jpeg|gif|png|swf|flv|js|css)$ {
        access_log off;
    }
}
```

## 默认 IP 不允许访问网站

_conf.d/default.conf_

```nginx
server {
    listen 80 default;
    return 404;
}
```

## nginx 错误 - ERR_CONTENT_LENGTH_MISMATCH

**问题说明**

![](https://file.wulicode.com/note/2021/11-03/19-42-36767.png)
> 错误详细 :
> GET http://example.com/_static/1594691975/sentry/dist/app.js net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)
> GET http://example.com/_static/1594691975/sentry/dist/vendor.js net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)
> Uncaught ReferenceError: $ is not defined

**查看日志**
> 2020/07/14 11:32:23 [crit] 16348#0: *1508 open() "/var/lib/nginx/tmp/proxy/3/28/0000000283" failed (13: Permission denied) while reading upstream, client:
> 60.216.119.220, server: sentry.liex.sour-lemon.com, request: "GET /_static/1594691975/sentry/dist/app.js HTTP/1.1",
> upstream: "http://127.0.0.1:9080/_static/1594691975/sentry/dist/app.js", host: "sentry.liex.sour-lemon.com",
> referrer: "http://example.com/join-request/sentry/"

**解决方案**

```
$ sudo chmod -R 775 /var/lib/nginx/
```

## 日志切割

关于日志切割参考 [运维中的日志切割(logrotate)](../software/logrotate/introduction.md)

## nginx: [error] invalid PID number "" in "/run/nginx.pid"

先执行

```
$ nginx -c /etc/nginx/nginx.conf
```

`nginx.conf` 文件的路径可以从 `nginx -t` 的返回中找到。

```
$ nginx -s reload
```

## 不记录 404 日志

nginx 有个选项 `log_not_found` 用来开启和禁用未发现的文件日志, 可用区块是 `http`, `server`, `location`

```nginx
server {
    location =  /favicon.ico {
        log_not_found off;
        access_log off;
    }
}
```

## 配置不生效

更新配置后使用 `[sudo] /your/path/nginx -s reload` 热重载服务。

## getpwnam("nginx") failed

表示该用户 `nginx` 不存在， 解决方法:

1. 在 `nginx.conf` 里添加 `user nobody;`
2. 创建用户和用户对应的分组

## getgrnam("xiaowu") failed

表示用户分组不存在，解决方法:

1. 在 `nginx.conf` 里添加 `user nobody;`
2. 创建用户对应的分组

## could not open error log file: open() "/logs/error.log" failed (13: Permission denied)

启动 Nginx 的用户权限不够导致无法写入日志文件，常见于非 `root` 用户启动报错。

## bind() to 0.0.0.0:80 failed (48: Address already in use)

80 端口被占用启动失败，修改端口或者杀死占用者再启动即可。

## open() "nginx.pid" failed (2: No such file or directory)

pid 进程 id 文件不存在，可能文件被删除或者已经停止，在停止 Nginx 时会使用该进程 id，如果不存在将失败，可以手动 kill 掉。

## unknown "realpath_roots_xxx" variable

变量 `$realpath_roots_xxx` 不存在

## "add_header" directive is not allowed here in xx

`add_header` 指令不能直接在 `if` 判断内，可以在 `http`、`server`、`server.location`、`server.location.if` 下。

## "proxy_pass" cannot have URI part in location given by regular expression, or inside named location, or inside "if" statement, or inside "limit_except" block in xx

这是 `proxy_pass` 指令在正则匹配时不能使用包含路径的链接，如以下都会报错：

```nginx
location ~* ^/api/ {
    proxy_pass http://host/;
}
location / {
    if ($uri ~* ^/api/) {
        proxy_pass http://host/;
    }
}
```

解决办法就是把 `/` 去掉，更多关于 `proxy_pass` 请看：`[proxy_pass](nginx_example_proxy_pass)`[ 技巧](proxy-pass.md) 。

## 技术栈

![image.png](https://file.wulicode.com/yuque/202208/04/14/4851hXRmvIGO.png?x-oss-process=image/resize,h_1797)

## 参考

- [invalid PID number "" in "/run/nginx.pid"](https://blog.csdn.net/achang21/article/details/80039561)

