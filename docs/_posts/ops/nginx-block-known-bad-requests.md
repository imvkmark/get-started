---
title: "阻止无意义的请求"
date: 2022-09-29 16:09:10
toc: true
categories:
- ["Ops","Nginx","示例"]
---

原文地址 : [NGINX : Block Known Bad Requests - RewriteGuide](https://www.rewriteguide.com/nginx-block-known-bad-requests/)
> 阻止对服务器上不支持的文件扩展名的请求。例如，在仅支持 PHP 的服务器上`.asp`或`.jsp`的请求。可以帮助防止网站/应用程序因无效请求而过载。


```nginx
server {
 
    # ...
 
    location ~ \.(aspx|cfm|jsp|cgi)$ {
        return 410;
    }
 
    # ...
 
}
```
这将导致扩展名位于上面列表中的所有请求文件, 返回 410 Gone 响应

