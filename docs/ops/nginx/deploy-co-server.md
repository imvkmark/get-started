---
description: '部署Nginx分发服务器，配置测试域名并调通；设置高防服务器与应用服务器参数，调整阿里云安全组规则；完成域名解析后测试连通性，确认无误后切换至正式域名。'
lastUpdated: '2026-06-17 12:31:44'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 分发服务器部署'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '部署Nginx分发服务器，配置测试域名并调通；设置高防服务器与应用服务器参数，调整阿里云安全组规则；完成域名解析后测试连通性，确认无误后切换至正式域名。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/deploy-co-server.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/75bd2ac62b1fbb96ed212b1a4f102908.png'
---
# Nginx 分发服务器部署

![](https://file.wulicode.com/feishu-images/75bd2ac62b1fbb96ed212b1a4f102908.png)

### 测试域名调通

### 高防服务器配置

```Plaintext
server{
  listen 80;
  listen 443 ssl;
  server_name wulicode.com;

  if ($https = 'on') {
    set $proxy https://wulicode-https;
  }
  if ($https = '') {
    set $proxy http://wulicode-http;
  }

  ## ssl
  ssl_certificate cert.d/wulicode.com.pem;
  ssl_certificate_key cert.d/wulicode.com.key;
  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
  ssl_prefer_server_ciphers on;

  # php/log
  include conf.d/wulicode/web.conf;
}
```

配置完成后重启nginx

### 应用服务器配置

```Plaintext
server{
    listen 9080;
    server_name wulicode.com;
    include conf.d/wulicode/web-laravel.conf;

    access_log /webdata/logs/wulicode/web.access.log main;
    error_log /webdata/logs/wulicode/web.error.log;
}
```

配置完成后重启nginx

### 阿里云安全组

将 应用服务器 加入 对高防的安全组内

### 域名解析

增加 wulicode 域名 解析 到 高防公网IP

### 测试是否调通

```Plaintext
ping wulicode.com # 是否返回高防IP 无超时

telnet 应用服务器IP 9080 / 9443 / 9190

通过浏览器进行访问
```

如果浏览器访问不了，清除DNS缓存，或者通过无痕模式进行访问

### 正式域名切换

注意一定要将应用服务器 自定义的端口 加入高防安全组内，并且确认应用服务器是否开启了端口

将主域和 www 解析到相应的 cname 地址

增加高防 cdn 后获取真实 ip

```Plaintext
- proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for

+ proxy_set_header X-Forwarded-For $http_x_forwarded_for;
```

因为加了层 cdn，所以高防服务器的 nginx 中要使用 \$http_x_forwarded_for 获取访客 ip，否则获取到的是cdn的ip