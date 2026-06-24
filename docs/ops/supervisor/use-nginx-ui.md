---
description: '通过Nginx反向代理配置，可安全访问SupervisorUI。需在Nginx中设置location规则转发请求至Supervisor服务端口，同时支持WebSocket或长连接以启用tail功能，实现进程日志的实时滚动查看。'
lastUpdated: '2026-06-21 20:15:49'
head:
  - - meta
    - name: 'og:title'
      content: '设置通过 Nginx 来访问 SupervisorUI 并支持 tail 访问'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '通过Nginx反向代理配置，可安全访问SupervisorUI。需在Nginx中设置location规则转发请求至Supervisor服务端口，同时支持WebSocket或长连接以启用tail功能，实现进程日志的实时滚动查看。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/supervisor/use-nginx-ui.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/9279c347eb00d71b29ed989f55de6fa4.png'
---
# 设置通过 Nginx 来访问 SupervisorUI 并支持 tail 访问

::: info ℹ️
此文系翻译, 原文地址 : [Set up Supervisor Web UI behind nginx with tail function working](http://www.jfabre.com/set-up-supervisor-web-ui-behind-nginx-with-tail-function-working/)
:::

Supervisor (supervisord) 是广为人知的 UNIX 进程控制系统

它包含了 Web UI, 可以列出当前的进程, start/stop, tail log;

![](https://file.wulicode.com/feishu-images/9279c347eb00d71b29ed989f55de6fa4.png)

使用 *nginx* 作为代理来访问 supervisord, 使用访问 supervisord 作为示例, 如果使用 tail 函数可以正常访问可能会有些棘手.

首先，确保您的 Supervisor 配置文件(默认位于 `/etc/supervisord.conf`中)包含以下内容:

```Plaintext
[inet_http_server]
port=127.0.0.1:9001
username=your_username
password=your_password
```

注意，设置 *用户名* 和 *密码* 是可选的。重新启动Supervisor来应用您的新配置。

```Plaintext
systemctl stop supervisord
systemctl start supervisord

# or
systemctl restart supervisord
```

Supervisor HTTP服务现在正在监听端口 9001 端口。现在配置  *nginx*  通过  `/supervisord/` 来访问 UI:

```Plaintext
server {
  location / supervisord/ {
    proxy_pass http://127.0.0.1:9001/;
    proxy_http_version 1.1;
    proxy_buffering     off;
    proxy_set_header   Connection       "";
    proxy_max_temp_file_size 0;
    proxy_redirect     default;
    proxy_set_header   Host             $host;
    proxy_set_header   X-Real-IP        $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
```

> 不要忘记Url后边的斜线  (/)    `proxy_pass http://127.0.0.1:9001/;`

**tail**  函数现在已经是可以使用了.  `proxy_buffering off;`,  `proxy_http_version 1.1;`  和  `proxy_set_header Connection "";`  弄得我有点焦躁. 这个是持续化访问必须使用的