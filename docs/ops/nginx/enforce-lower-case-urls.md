---
title: ""
date: 2022-09-29 16:36:39
toc: true
categories:
- ["Ops","Nginx","示例"]
---

# 强制使用小写的 url 地址

> 强制 使用小写的 url，这对于SEO避免重复内容惩罚尤其重要。在基于 windows 的服务器上更应该如此，因为 windows 默认情况下不区分大小写。对于良好的架构SEO来说，大小写混合的 url 重定向到标准化小写的 url 是非常有必要的





## 使用 lua
Lua 必须在 NGINX 中安装并启用。如果没有，它通常是捆绑在 `nginx-extras` 包中。例如，在Ubuntu上:
```
# apt-get install nginx-extras
```
替代 nginx 标准包, 一旦 Lua 启用, 添加如下代码块
```nginx
server {
 
    # ...
 
    location ~ [A-Z] {
        rewrite_by_lua_block {
            ngx.redirect(string.lower(ngx.var.uri), 301);
        }
    }
 
    # ...
 
}
```
上面的 Lua 方法优于下面的嵌入式 Perl 版本，因为它的性能更好。对于 SEO 来讲，应该使用 301 重定向.

## 使用 Perl 重写
Perl 同样也要求安装并启用, 把以下代码放置到 `http` 部分
```nginx
http {
    perl_set $uri_lowercase 'sub {
        my $r = shift;
        my $uri = $r->uri;
        $uri =~ s/\R//; # replace all newline characters
        $uri = lc($uri);
        return $uri;
    }';
}
```
一旦设定完成, 你需要添加以下的 `location`不分到 `server` 配置中. 
```nginx
server {
 
    # ...
 
    location ~ [A-Z] {
        rewrite ^(.*)$ $scheme://$host$uri_lowercase permanent;
    }
 
    # ...
 
}
```

