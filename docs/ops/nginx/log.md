---
description: 'Nginx中可配置日志切割避免日志文件过大，支持按天或大小轮转。关闭不必要的access log能减少磁盘IO，提升静态资源服务性能。处理静态资源时建议关闭日志记录，并做好备份与清理备注。'
lastUpdated: '2026-06-17 12:31:17'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 日志'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx中可配置日志切割避免日志文件过大，支持按天或大小轮转。关闭不必要的access log能减少磁盘IO，提升静态资源服务性能。处理静态资源时建议关闭日志记录，并做好备份与清理备注。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/log.html'
---
# Nginx 日志

## 日志切割

> logrotate 程序是一个日志文件管理工具。用于分割日志文件，删除旧的日志文件，并创建新的日志文件，起到“转储”作用

这里参考另一篇文章 logrotate / 日志切割的使用

## 关闭 access log

在配置本地 nginx 开发环境时，发现一个问题，当 server 段不指定 access_log 时，并且 http 段中也未指定任何 access_log 参数时，它会默认写到`logs/access.log` 这个文件，也就是 access_log 默认值就是 `logs/access.log`，而且是所有 server 的访问日志。但 nginx 网站上我并未找到此配置的默认值。如果我们不需要，在http段中加一行 access_log off; 然后在特定的 server 中配置自己想写入的日志。开发环境我默认不写日志，即不配置任何 access_log，需要时才打开。nginx 的 http 段中，设置 access log：

```Plaintext
http{
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';

  log_format gzip '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $bytes_sent "$http_referer" '
                  '"$http_user_agent" "$gzip_ratio"';

  log_format download '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $bytes_sent "$http_referer" "$http_user_agent" '
                      '"$http_range" "$sent_http_content_range"';
  access_log off;
}
```

## 静态资源

对于静态资源, 本地缓存 + 服务端变动验证, 并不对资源文件进行访问日志记录

```Plaintext
location ~* \.(jpg|gif|png|jpeg|bmp|svg|eot|woff|woff2|ico|js|css)$
{
    access_log off;
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

如果是反向代理的机器需要去掉 access_log 的记录, 则需要对静态资源进行设置和转发识别, 否则

- 如果是反向代理, 需要加入转发, 否则就会在本地目录查找
- 如果目标机器是根据主机头区分的, 需要添加主机头

```Plaintext
location ~* \.(jpg|gif|png|jpeg|bmp|svg|eot|woff|woff2|ico|js|css)$ {
    access_log off;
    add_header Cache-Control "public, max-age=0, must-revalidate";
    proxy_set_header Host $host;
    proxy_pass http://192.168.1.248:80;
}
```

参考文章 :

## 备注

**2022年11月08日**

- 移除通过脚本来生成日志, 推荐使用 logrotate 处理日志

参考:

- [nginx不记录js、css、图片等资源文件的访问日志](https://www.rootop.org/pages/4727.html)