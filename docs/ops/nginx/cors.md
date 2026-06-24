---
description: '配置CORS跨域时，允许所有来源的请求，但仅允许GET方法。同时设置请求白名单，例如允许特定域名访问。对于iconfont字体跨域，需在服务器响应头中添加Access-Control-Allow-Origin以支持字体文件加载。'
lastUpdated: '2026-06-17 22:15:19'
head:
  - - meta
    - name: 'og:title'
      content: '配置 CORS 跨域'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '配置CORS跨域时，允许所有来源的请求，但仅允许GET方法。同时设置请求白名单，例如允许特定域名访问。对于iconfont字体跨域，需在服务器响应头中添加Access-Control-Allow-Origin以支持字体文件加载。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/cors.html'
---
# 配置 CORS 跨域

::: info 📖<p>扩展阅读</p><ul><li>[Nginx 配置字体 font-face 跨域](/ops/nginx/cors-font-face.md)</li></ul>:::

## 设置允许所有的请求

```Plaintext
server {
    location / {
        add_header 'Access-Control-Allow-Origin' '*';
    }
}
```

## 只允许GET请求

```Plaintext
server {
    location / {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Request-Method' 'GET';
    }
}
```

## 请求白名单

```Plaintext
server {
    location / {
        # 白名单
        if ($http_origin ~* (baidu\.com|github.xuexb.com)$) {
            add_header 'Access-Control-Allow-Origin' '$http_origin';
            # 允许cookie
            add_header 'Access-Control-Allow-Credentials' true;
            # 只允许某些方法
            add_header 'Access-Control-Request-Method' 'GET, POST, OPTIONS';
            # 支持获取其她字段, 需要前端设置 `xhr.withCredentials = true`
            add_header 'Access-Control-Allow-Headers' 'User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }
    }
}
```

## iconfont 字体跨域配置

```Plaintext
server {
    root xxx;
    # 使用location来匹配以字体文件
    location ~* \.(eot|otf|ttf|woff|svg)$ {
        add_header Access-Control-Allow-Origin *;
    }
}
```

但如果你的 `location` 已经配置了, 可以使用 `if` 判断添加, 如:

```Plaintext
server {
    location / {
        # 使用判断请求文件来添加
        if ($document_uri ~ \.(eot|otf|ttf|woff|svg)$) {
            add_header Access-Control-Allow-Origin *;
        }
    }
}
```