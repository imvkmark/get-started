---
description: 'Nginx常见问题包括：出现500错误时可能泄露版本号，需隐藏；413错误表示请求实体过大，需调整client_max_body_size；前后端混排时，URL添加后缀“/”可优化连接数，避免重定向。'
lastUpdated: '2026-06-17 12:37:24'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx常见问题包括：出现500错误时可能泄露版本号，需隐藏；413错误表示请求实体过大，需调整client_max_body_size；前后端混排时，URL添加后缀“/”可优化连接数，避免重定向。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ef88a3810641c9cdc1c59d868ea686dc.png'
---
# Nginx - FAQ

## Nginx 出现 500 错误, 并且错误下方存在nginx 版本号

![](https://file.wulicode.com/feishu-images/ef88a3810641c9cdc1c59d868ea686dc.png)

首先考虑nginx 缓存位置的权限, 权限位置在 `/var/lib/nginx` 目录

## Nginx 出现 413 Request Entity Too Large 错误

这个错误一般在上传文件的时候出现, 原因是请求包体过大

解决方法就是

打开 nginx 主配置文件 `nginx.conf`，一般在 `/usr/local/nginx/conf/nginx.conf` 这个位置，找到 `http{}`, 或者 `server{}` 段, 或者 `location / {}` 段，修改或者添加:

```Plaintext
client_max_body_size 20m;
```

如果以 php 运行的话，这个大小 `client_max_body_size` 要和 `php.ini` 中的如下值的最大值差不多或者稍大，这样就不会因为提交数据大小不一致出现错误

```Plaintext
post_max_size = 20M
upload_max_filesize = 20M
```

重启 NGINX

```Plaintext
nginx -s reload
```

恢复正常

## Nginx 前后端混排时候给 url 添加后缀 /

在对后端资源进行转发的时候会遇到 `/webapp` 地址访问的是后端的 404 页面, 而我们转发的地址是 `/webapp/` , 这样对于转发地址是无后缀的, 我们对参数进行一层转发

```Plaintext
location = /webapp {
    return 301 /webapp/$query_string;
}

location ~ ^/webapp/(.*) {
    rewrite ^/webapp/(.*) /$1 break;
    proxy_pass http://127.0.0.1:9361;
}
```

这里注意不能两者合并写为

```Plaintext
location ~ ^/webapp(.*) {
    // ...
}
```

这样会导致 `webappsomeurl` 也会访问到这个地址

> 如果这里涉及到后置机器的转发, 这里的 301 地址应当映射为完整地址, 否则会出现转发不一致的情况

### 优化连接数

![](https://file.wulicode.com/feishu-images/4c97285ca19e2b83725da93e7866ba17.png)

未优化之前的连接数 NotEstablished 的数量到达了一定的峰值, 然后处于持平状态, 在这个时候服务器日志会报 500 错误

![](https://file.wulicode.com/feishu-images/2530ea87422deb5c87e34d5a49805a3d.png)

这个地方考虑到的可能性是链接数过多导致的服务器

**/etc/sysctl.conf**

```Plaintext
net.ipv4.tcp_max_tw_buckets = 8000
```

**nginx.conf**

```Plaintext
...
worker_processes  32;
worker_rlimit_nofile 65535;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
    worker_connections  10240;
}
...
```

优化之后的数据

![](https://file.wulicode.com/feishu-images/6c4150d59f1831831e8d455521dd7486.png)