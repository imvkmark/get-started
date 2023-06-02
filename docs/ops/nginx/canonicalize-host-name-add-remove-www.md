# 主域 - 添加或者移除 www

你的网站可能有多个域名访问，比如：`www.wulicode.com`、`wulicode.com` 等，设置主域意思是不管用户输入哪个域名，都会 `301` 重定向到主域上，设置主域可以对 SEO 更友好，比如：




## 移除 www 前缀
> 以 wulicode.com 为主域

```
www.wulicode.com => wulicode.com
www.wulicode.com/search/xxoo => wulicode.com/search/xxoo
www.wulicode.com/a/b/c/404.html => wulicode.com/a/b/c/404.html
```
这里把所有的 80 端口匹配域名都重新定向到 https 访问

_domain.com.conf_
```nginx
server {
    listen       80;
    server_name domain.com www.domain.com;
    return 301 https://domain.com$request_uri;
}
```

另外一种方式, 这一种方式可以将 80 和 443 写在一个配置文件中
```nginx
if ($https = '') {
    return 301 https://domain.com$request_uri;
}
```

## 添加 www 前缀
```nginx
server { 
    server_name example.com;
    return 301 https://www.example.com$request_uri;
}
```
上述规则将导致对`http(s)://example.com/`的所有请求被重定向到 `https://www.example.com/`。处于 SEO目的，这个重定向应该设置为永久的(301重定向)

