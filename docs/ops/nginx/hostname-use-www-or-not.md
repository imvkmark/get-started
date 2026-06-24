---
description: '当使用域名（如example.com）或带www前缀的域名（如www.example.com）作为主域名时，需统一选择其一并做重定向：若主站为裸域名，则将所有www访问301重定向至裸域名；若主站为www域名，则将裸域名301重定向至www域名。避免重复内容，确保SEO和用户访问一致性。'
lastUpdated: '2026-06-17 14:10:10'
head:
  - - meta
    - name: 'og:title'
      content: '使用域名或者 www 域名做主域名'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '当使用域名（如example.com）或带www前缀的域名（如www.example.com）作为主域名时，需统一选择其一并做重定向：若主站为裸域名，则将所有www访问301重定向至裸域名；若主站为www域名，则将裸域名301重定向至www域名。避免重复内容，确保SEO和用户访问一致性。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/hostname-use-www-or-not.html'
---
# 使用域名或者 www 域名做主域名

你的网站可能有多个域名访问，比如：`www.wulicode.com`、`wulicode.com` 等，设置主域意思是不管用户输入哪个域名，都会 `301` 重定向到主域上，设置主域可以对 SEO 更友好，比如：

## 移除 www 前缀

> 以 wulicode.com 为主域

```Plaintext
www.wulicode.com => wulicode.com
www.wulicode.com/search/xxoo => wulicode.com/search/xxoo
www.wulicode.com/a/b/c/404.html => wulicode.com/a/b/c/404.html
```

这里把所有的 80 端口匹配域名都重新定向到 https 访问

```Plaintext
server {
    listen       80;
    server_name domain.com www.domain.com;
    return 301 https://domain.com$request_uri;
}
```

另外一种方式, 这一种方式可以将 80 和 443 写在一个配置文件中

```Plaintext
if ($https = '') {
    return 301 https://domain.com$request_uri;
}
```

## 添加 www 前缀

```Plaintext
server {
    server_name example.com;
    return 301 https://www.example.com$request_uri;
}
```

上述规则将导致对`http(s)://example.com/`的所有请求被重定向到 `https://www.example.com/`。处于 SEO目的，这个重定向应该设置为永久的(301重定向)