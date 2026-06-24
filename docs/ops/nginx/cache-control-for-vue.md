---
description: 'Nginx静态资源加载技术验证，重点检测源与主服务器的Gzip、Brotli压缩及ETag开启情况；制定HTML/JS/CSS和图片/字体文件的缓存策略；对比打包优化（拆分入口文件）前后及不同缓存与压缩组合下的加载速度。'
lastUpdated: '2026-06-17 12:47:20'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 静态资源的加载'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx静态资源加载技术验证，重点检测源与主服务器的Gzip、Brotli压缩及ETag开启情况；制定HTML/JS/CSS和图片/字体文件的缓存策略；对比打包优化（拆分入口文件）前后及不同缓存与压缩组合下的加载速度。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/cache-control-for-vue.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/edee3de4f9a828f5e9aeb8c0d07f64c3.png'
---
# Nginx 静态资源的加载

## 技术验证

### 服务器开启 Gzip 和验证

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

入口服务器需要开启 gzip, 否则数据返回是原始数据, 并且开启 vary 的缓存标识, 对于 \*\*`Vary:** Accept-Encoding` 标识进行不同处理

```Bash
# 检测源服务器是否开启 gzip
curl -H 'Accept-Encoding:gzip' -I http://kejinshou-m-test.dd.sour-lemon.com/m/main/home/42/38?page=1

# 检测主服务器是否开启 gzip
curl -H 'Accept-Encoding:gzip' -I https://t.kejinshou.iliexiang.com/m/main/home/42/38?page=1
```

查看是否存在这个 Header 返回

```Plaintext
Content-Encoding: gzip
Vary: Accept-Encoding
```

### 全站加速开启 brotli 压缩或者 gzip 压缩

开启 brotli 压缩或者 gzip 压缩

> brotli 仅仅在开启了 https 的场景下启用, 如果是 http 则需要开启 gzip 压缩

![](https://file.wulicode.com/feishu-images/edee3de4f9a828f5e9aeb8c0d07f64c3.png)

验证

```Bash
# 源服务器是否开启 gzip
curl --resolve xuan-t1.wulicode.com:80:47.96.30.211 -H 'Accept-Encoding:gzip' -I http://xuan-t1.wulicode.com/

# 主服务器是否开启 gzip
curl -H 'Accept-Encoding:gzip' -I https://xuan-t1.wulicode.com/
```

### 开启 Etag 和验证

Etag 作为缓存标识, 优先级高于 last_modify

[Module ngx_http_core_module](http://nginx.org/en/docs/http/ngx_http_core_module.html#etag)

```Plaintext
http {
    etag on;
}
```

检测是否开启 etag

```Bash
# 检测源服务器是否开启 etag
curl -I http://kejinshou-m-test.dd.sour-lemon.com/m/main/home/42/38?page=1

# 检测主服务器是否可以获取到 ETAG 标签
curl -I https://t.kejinshou.iliexiang.com/m/main/home/42/38?page=1
```

### 缓存策略

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

## 开启策略

### 入口/分发服务器/aliyun

- 开启 gzip 或者 brotli 压缩
- 分流不走应用服务器, 减少应用服务器的转发

### 源服务器

- 开启 gzip 压缩
- 开启缓存策略
- 开启 etag

## 问题验证

### 打包配置

在使用 vite 打包之后发现第一次打包的 入口文件

```Plaintext
# 两次打包数据对比
build
  - kr-xuan-dev
      - assets
           index.a8c2c83e.js             # 入口文件 A
# 未拆分之前
           index.62c39ce5.js             # 资源文件 B
# 拆分入口文件之后
-          index-1682560992-148907cd.js
+          index-1682561079-08317e99.js
-          QrCode.7c1bcd26.js            变化
+          QrCode.d75672d4.js            增加
-          QrCode-legacy.f9e63f06.js
+          QrCode-legacy.275b97b7.js
           QrCode.f5f9758b.css           不变
           match-url.js                  匹配 URL, 不变
           login-bg.d8a70d22.png         不变
```

因为入口文件 `index.a8c2c83e.js` 缓存的是 js 部件, 所以需要 index 文件在打包的时候文件名称变化才能够读到最新的

```JavaScript
[{
    path: "",
    component: Jr,
    children: [{
        path: "/order",
        component: ()=>Fe(()=>import("./User.a1deb8a8.js"), ["assets/User.a1deb8a8.js", "assets/IconFont.91da436f.js", "assets/vant.5e7ee7d8.js", "assets/antdv.98a5a477.js", "assets/IconFont.89e22452.css", "assets/XNavBar.0e6122e0.js", "assets/arrow-left.ae6dbd59.js", "assets/XNavBar.879a3e23.css", "assets/lodash.53de391a.js", "assets/account.93cd528b.js", "assets/crypto.c73800d5.js", "assets/User.703e2baa.css", "assets/index.a3a521ba.css", "assets/index.e8224928.css", "assets/index.5987bc0e.css", "assets/index.f9f43572.css"]),
        name: "order.home",
        meta: {
            title: "\u5305\u8D54\u4FE1\u606F"
        }
    }]
}]
```

```JavaScript
import{c as t,g as e}from"./vendor.fa32c04d.js";var n={exports:{}};
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */const o=e(n.exports=function(){return function(){var t={686:function(t,e,n){n
```

所以需要在 vite / rollup 的配置中加上入口文件的打包配置, 保证每次生成的入口文件都是唯一的, 避免出现内容页的改动导致命中缓存情况出现

```JavaScript
const timestamp = Math.floor(Date.now() / 1000);
return {
                build: {
                    rollupOptions: {
                        output: {
                            entryFileNames: '[name]-' + timestamp + '-[hash].js'
                        }
                    }
                }
}
```

### 速度对比

速度对比 - 一层转发(自建)

```Bash
# 未开启缓存
84 requests 1.5 MB transferred 2.5 MB resources Finish: 5.79 s DOMContentLoaded: 1.14 s Load: 1.39 s

# 开启缓存第二次请求
77 requests 31.3 kB transferred 2.2 MB resources Finish: 5.89 s DOMContentLoaded: 728 ms Load: 941 ms
```

全站加速

```Bash
# 未开启缓存, 无 Gzip
33 requests 962 kB transferred 1.2 MB resources Finish: 6.46 s DOMContentLoaded: 1.17 s Load: 1.57 s

# 开启缓存, 无 gzip
34 requests 11.4 kB transferred 1.2 MB resources Finish: 769 ms DOMContentLoaded: 365 ms Load: 477 ms

# 无缓存, 开启 brotli
32 requests 505 kB transferred 1.2 MB resources Finish: 1.42 s DOMContentLoaded: 715 ms Load: 1.21 s

# 缓存 + broti
31 requests 9.1 kB transferred 1.2 MB resources Finish: 952 ms DOMContentLoaded: 421 ms Load: 546 ms
```

### 可能问题

由于存在 oss 缓存, 如果 oss 文件变化之后是否会触发内容的变更