---
description: '配置泛域名解析后，可将不同子域名分别转发到对应子目录，实现多站点管理。例如将 `*.example.com` 解析到服务器，再通过URL重写或反向代理，把 `blog.example.com` 定向到 `/blog` 目录，`shop.example.com` 定向到 `/shop`，各子域名独立配置不同目录。'
lastUpdated: '2026-06-17 14:02:53'
head:
  - - meta
    - name: 'og:title'
      content: '配置泛域名 泛解析转发'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '配置泛域名解析后，可将不同子域名分别转发到对应子目录，实现多站点管理。例如将 `*.example.com` 解析到服务器，再通过URL重写或反向代理，把 `blog.example.com` 定向到 `/blog` 目录，`shop.example.com` 定向到 `/shop`，各子域名独立配置不同目录。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/domain-setting-use-wildcard.html'
---
# 配置泛域名 泛解析转发

有的时候，我们需要配置一些自定义的子域名，如：

- `html-get-started.wulicode.com`
- `vant-demo.wulicode.com`

这时候就需要域名的 DNS 解析一个泛域名(一称为泛解析) `*.wulicode.com` 到服务器，Nginx 可以配置如下：

## 子域名转发到子目录

```Plaintext
server {
    listen       80;
    server_name ~^([\w-]+)\.wulicode\.com$;
    location / {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;
        proxy_pass              http://127.0.0.1:88/$1$request_uri;
    }
}
```

以上配置表示：

- `html-get-started.wulicode.com/path?a=1` -> `127.0.0.1:88/html-get-started/path?a=1`
- `vant-demo.wulicode.com/path?a=1` -> `127.0.0.1:88/vant-demo/path?a=1`

这样后端就可以根据子目录解析不同的规则，甚至 Nginx 可以再进行链接重写

## 子域名配置不同的目录

```Plaintext
server {
    listen       80;
    server_name ~^([\w-]+)\.wulicode\.com$;
    root /var/wwwroot/user/$1;
}
```

以上配置可以把不同的子域名分发到不同的目录中，做到路径分离的功能，如：

- `html-get-started.demo.com` -> `/var/wwwroot/user/html-get-started`
- `vant-demo.wulicode.com` -> `/var/wwwroot/user/vant-demo`