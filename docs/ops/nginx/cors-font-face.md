---
description: '在 Nginx 中为字体文件（如 .woff、.ttf）添加 `Access-Control-Allow-Origin` 头部，可解决跨域加载问题；同域加载无需额外配置。'
lastUpdated: '2026-06-18 09:38:24'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 配置字体 font-face 跨域'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在 Nginx 中为字体文件（如 .woff、.ttf）添加 `Access-Control-Allow-Origin` 头部，可解决跨域加载问题；同域加载无需额外配置。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/cors-font-face.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/5a312b887af6a988d016479cac80bbc9.png'
---
# Nginx 配置字体 font-face 跨域

::: info ℹ️
本文系转载并补充, 原文地址:[font-face跨域办法](http://www.cnblogs.com/zzbo/p/3546737.html)
:::

font-face 是现在比较常用的技术，可以矢量化你的图标，更改颜色方便等等。如果你想更进一步了解他，请[点击这里](https://developers.google.com/fonts/docs/material_icons?hl=zh-cn#icon_font_for_the_web), 这里主要对于  `font-face` 跨域在 `nginx` 下如何配置进行介绍

浏览器(不仅仅是Firefox)对字体文件有加载限制，也就是说不允许你随便加载别人的字体，防止他人盗用字体,只有在服务器端允许访问的情况下才能够加载指定的字体文件

## 解决办法

### 同域加载

将字体文件下载下来放在同域名下

### 跨域加载

给字体文件的http头里面添加 `Access-Control-Allow-Origin` 属性，以控制指定域引用你的字体文件。

不限制访问

```Plain Text
server {
    ... # Fix @font-face cross-domain restriction
    location ~* \.(ttf|ttc|otf|eot|woff|font.css) {
        add_header Access-Control-Allow-Origin "<http://yoursite.com>";
    }
    ...
}
```

限制域名访问

```Plain Text
server {
    ...
    # Fix @font-face multi cross-domain restriction
    location ~* \.(ttf|ttc|otf|eot|woff|font.css) {
        if ($http_origin ~* "^(https|http)?:\/\/.*\.yourdomain\.com" ) {
            add_header Access-Control-Allow-Origin $http_origin;
        }
    }
    ...
}
```

补充

在 **mac/nginx 下支持 add_header 选项**

```Plain Text
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Headers X-Requested-With,Content-Type;
add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
```

安装 \*\*\*\*`nginx-extra` 版本时候的参数

```Plain Text
more_add_headers 'Access-Control-Allow-Origin *';
more_add_headers 'Access-Control-Allow-Headers X-Requested-With,Content-Type';
more_add_headers 'Access-Control-Allow-Methods GET,POST,OPTIONS';
```

![](https://file.wulicode.com/feishu-images/5a312b887af6a988d016479cac80bbc9.png)