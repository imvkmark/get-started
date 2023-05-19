---
title: "配置浏览器缓存"
date: 2022-04-20 19:00:51
toc: true
categories:
- ["Ops","Nginx","示例"]
---

使用 `expires` 参数。


## 不缓存
```nginx
server {
    expires -1;
}
```
输出 Response Headers:
```
Cache-Control:no-cache
```
当文件没有变更时会返回 304 ，有变更时会是 200 ，如果强制命中 200 可以再添加: `if_modified_since off;` 忽略 Request Headers 里的 `If-Modified-Since` 字段。

## 缓存
```nginx
server {
    expires 1d;
}
```
1d 为 1 天，单位如下:
```
ms  milliseconds
s   seconds
m   minutes
h   hours
d   days
w   weeks
M   months，30 days
y   years，365 days
```
如果希望最大缓存可以:
```nginx
server {
    expires max;
}
```
输出 Response Headers:
```
Cache-Control:max-age=315360000
```

## 根据链接设置缓存时间
```nginx
server {
    # 设置为1月
    set $expires_time           1M;
    # 针对后台不缓存
    if ($request_uri ~* ^/admin(\/.*)?$) {
        set $expires_time       -1;
    }
    # 针对静态文件缓存最大
    if ($request_uri ~* ^/static(\/.*)?$) {
        set $expires_time       max;
    }
    # 设置吧
    expires $expires_time;
}
```

