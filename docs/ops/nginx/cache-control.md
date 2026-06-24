---
description: 'Nginx缓存说明涵盖缓存策略、启用与禁用缓存的方法、常见问题（如重复MIME类型“text/html”）及参考资料。'
lastUpdated: '2026-06-17 12:47:49'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 缓存说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx缓存说明涵盖缓存策略、启用与禁用缓存的方法、常见问题（如重复MIME类型“text/html”）及参考资料。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/cache-control.html'
---
# Nginx 缓存说明

💡 阅读此部分需要首先了解 Http 缓存的概念

Http 缓存简介和使用

## 缓存说明

### 进行缓存

> 向浏览器发送缓存指令，这些指令将用于在客户端缓存静态资源。将对网站页面加载的感知速度产生明显影响，因为这些静态资产在浏览器缓存中存在时不会向 Web服务器 发送新请求

让浏览器缓存 30 天资源, 可以使用以下代码块

```Plaintext
server {
    # ...
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|txt|woff|woff2|ttf)$ {
        # max-age 单位 s
        add_header Cache-Control "public, max-age=2592000, must-revalidate";
    }
    # ...
}
```

在对位于上面 `|` 分隔的列表的静态资产发出第一个请求后，浏览器将在本地缓存该文件。对 `logo.png` 文件的请求将从浏览器的本地缓存中获取，而不是从服务器重新请求 `logo.png` （直到缓存过期(30天后)，或者直到用户清除其浏览器缓存或以其他方式从浏览器缓存中清除）

如果希望对特定类型的静态资产的缓存时间长度进行更细粒度的控制，只需将它们分解为更具体的组

```Plaintext
server {

    # ...
    location ~* \.(jpg|jpeg|png|gif|ico|txt|woff|woff2|ttf)$ {
        # 30 days
        add_header Cache-Control "public, max-age=2592000, must-revalidate";
    }

    location ~* \.(css|js)$ {
        # 7 days
        add_header Cache-Control "public, max-age=604800, must-revalidate";
    }
    # ...
}
```

上面的两条规则将缓存图像和字体 30 天，css 和 javascript 文件缓存 7 天

值得注意的是，使用静态资产缓存的一个缺点是，更新的 `logo.png` 会失去控制;

如果浏览器缓存了旧 `logo.png` ，则将使用缓存的文件而不是更新的文件

- 重命名文件将导致提供新文件
- 或缓存破坏技术（例如将query_string附加到静态资产的 url，如 `logo.png?v=1.2.3`）也可以解决此问题

这是对于客户端缓存的一个小小的考虑权衡的项目

### 不进行缓存

```Plaintext
location ~ .*\.(js|css|png|svg)?$ {
    # 取消缓存
    # 告知浏览器处理缓存的方式
    add_header Cache-Control "public, no-cache";
}
```

当文件没有变更时会返回 304 ，有变更时会是 200 ，如果强制命中 200 可以再添加: `if_modified_since off;` 忽略 Request Headers 里的 `If-Modified-Since` 字段, 但是此时不应开通 `Etag`, `Etag` 优先级高于 `if_modified_since`

## FAQ

### duplicate MIME type “text/html”

在添加 gzip 压缩的时候 mime-type `text/html` 是默认都会加载并压缩的, 所以不需要明确指定

Ref: [https://stackoverflow.com/questions/6475472/duplicate-mime-type-text-html](https://stackoverflow.com/questions/6475472/duplicate-mime-type-text-html)

## 参考

- [NGINX: Add Client-side Caching for Static Assets- RewriteGuide](https://www.rewriteguide.com/nginx-add-caching-directives-static-assets/)