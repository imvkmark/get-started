---
description: '本文总结了Nginx缓存最佳实践，包括开启gzip压缩、配置转发服务器和源服务器、使用阿里云全站加速、开启ETag，以及对html/js/css、img/font等资源文件的缓存配置。针对加载时间过长问题，通过对比高防层和服务器nginx未开启压缩的情况，提出启用服务器gzip及全局流量管理的解决方案，并展示结果对比。'
lastUpdated: '2026-06-17 12:50:08'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 缓存最佳实践'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文总结了Nginx缓存最佳实践，包括开启gzip压缩、配置转发服务器和源服务器、使用阿里云全站加速、开启ETag，以及对html/js/css、img/font等资源文件的缓存配置。针对加载时间过长问题，通过对比高防层和服务器nginx未开启压缩的情况，提出启用服务器gzip及全局流量管理的解决方案，并展示结果对比。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/cache-control-best-practice.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/edee3de4f9a828f5e9aeb8c0d07f64c3.png'
---
# Nginx 缓存最佳实践

对于静态资源 , 我们采用这几个策略

1. 开启 `gzip` 压缩
2. 开启 `Etag` , 采用服务器命中模式, 减少服务器数据传输
3. `html` 文件不缓存
4. `js/css/img/font` 缓存 `2h` 并开启 `must-revalidate` 服务端校验
5. `font` 文件不启用跨域(除非特定需要)

## 开启 gzip

### 转发服务器和源服务器

转发服务器需要开启 `gzip` , 并且源服务器也需要开启 `gzip` , 同时开启 vary 的缓存标识, 对于 \*\*`Vary:** Accept-Encoding` 标识进行不同处理

```Bash
mkdir -p /etc/nginx/conf.d/opts && \
wget https://i.wulicode.com/op/file/opts-gzip.nginx -O /etc/nginx/conf.d/opts/gzip
```

在 `nginx.conf` 中加入开启 gzip 的配置

```Plaintext
http {
    # ...
    include conf.d/opts/gzip;
    # ...
}
```

### aliyun 全站加速

开启 brotli 压缩或者 gzip 压缩

> brotli 仅仅在开启了 https 的场景下启用, 如果是 http 则需要开启 gzip 压缩

![](https://file.wulicode.com/feishu-images/edee3de4f9a828f5e9aeb8c0d07f64c3.png)

## 开启 etag

Etag 作为缓存标识, 优先级高于 last_modify

[Module ngx_http_core_module](http://nginx.org/en/docs/http/ngx_http_core_module.html#etag)

```Plaintext
http {
    etag on;
}
```

## 资源文件的缓存配置

不缓存 html, 不记录日志 `no-cache` = `max-age=0,must-revalidate`

```Plaintext
# html, js, css files
location ~* \.(html)$ {
   add_header Cache-Control "no-cache";
   access_log off;
}
```

对图片资源, 字体, js, css 采取 2h 缓存, 采用本地缓存过期之后 + 服务端变动验证, 并不对资源文件进行访问日志记录

```Plaintext
# img, font files
location ~* \.(jpg|gif|js|css|png|jpeg|bmp|svg|eot|woff|woff2|ico)$ {
  # max-age : 2 hour
  add_header Cache-Control "public, max-age=7200, must-revalidate";
  access_log off;
}
```

## 实操问题(加载时间过长)

当前存在的问题是加载页面时间过长, 可以从 `带宽` , `资源` , `渲染` 三方面来说明下

- 带宽

指的服务器的出口速率

- 资源

在框架加载完毕之后加载的资源数据

- 渲染

加载完毕基础 dom 之后渲染骨架的时间

![](https://file.wulicode.com/feishu-images/a958556522be74eed766bb8a03fe7ed4.png)

当前服务器拓扑结构如下

![](https://file.wulicode.com/feishu-images/c877707e2b3d6f65934111de4d82870b.png)

## 查找原因

### 高防层加载速度对比

这里有个更好的方式来对比, 就是使用 curl 根据不同的主机来下载数据

加入高防层

![](https://file.wulicode.com/feishu-images/39402287d74cd9262514d8603dd6fe43.png)

未加入高防层

![](https://file.wulicode.com/feishu-images/117be59d08b87878b2955e464f924f9a.png)

对比原因, 高防层加载速度有限制, 当前无法对高防层进行处理, 所以把高防层作为备选通道

### 服务器 nginx 未开启压缩

经过查看服务器的返回, 发现未对文本类型文件进行压缩处理, 增大了服务器之间的流量流出

## 解决方案

- gzip 压缩 : 减少贷款成本
- 启用缓存 : 减少二次加载成本
- 线路切换: 首选并非低速高防

### 全局流量管理

使用全局流量管理, 保留最优线路访问, 在最优线路崩溃的情况下切换到防护线路

![](https://file.wulicode.com/feishu-images/a8e8f2037922f31c1783f1784a92cee3.png)

### 启用服务器 gzip

因为服务器有两层代理, 服务器之前均需要数据传输所以两边都需要开启压缩

仅开启防护机

![](https://file.wulicode.com/feishu-images/6b57ef10e0f4065069c9336f1a05d58f.png)

开启服务机

![](https://file.wulicode.com/feishu-images/4730bcd597612be4601a145e60aef022.png)

发现大小并没有变化, 但是减少了 `防护机->服务机` 之间的网络流量

## 结果对比

服务器调整之后

![](https://file.wulicode.com/feishu-images/3e3087f7eeb3868064273f9de69d0136.png)

Dom 加载 3.86->1.16, 减少 2.7s