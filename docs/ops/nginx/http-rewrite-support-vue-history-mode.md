---
description: '转发目录转发根目录'
lastUpdated: '2026-01-11 19:31:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Nginx 转发请求支持 vue3 history 模式'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '转发目录转发根目录'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/nginx/http-rewrite-support-vue-history-mode.html'
---
# Nginx 转发请求支持 vue3 history 模式



转发目录

```
location ~ ^/m/ {
    proxy_set_header Host $host;
    rewrite ^/m/(.*) /$1 break;
    proxy_pass http://127.0.0.1:9200;
    access_log off;
}
```

转发根目录

```
location / {
    proxy_set_header Host $host;
    rewrite ^/(.*) /$1 break;
    proxy_pass http://127.0.0.1:9200;
    access_log off;
}
```



