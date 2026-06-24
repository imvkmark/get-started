---
description: '该文档提出Nginx目录规范：项目代码置于/webdata/www/{project}；配置主目录/etc/nginx，含nginx.conf、证书、分流域名配置、通用模块（日志、变量、IP封禁等）；日志存放于/webdata/logs/ng。强调按项目分割，统一管理。'
lastUpdated: '2026-06-17 12:52:58'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 目录建议'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档提出Nginx目录规范：项目代码置于/webdata/www/{project}；配置主目录/etc/nginx，含nginx.conf、证书、分流域名配置、通用模块（日志、变量、IP封禁等）；日志存放于/webdata/logs/ng。强调按项目分割，统一管理。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/directory-suggest.html'
---
# Nginx 目录建议

文件目录以及命名约定

项目目录

```Plaintext
/webdata/www
└── {project}/
```

配置目录

```Plaintext
/etc/nginx
├── nginx.conf
├── cert.d                    # 证书存放位置
└── conf.d
    ├── stream.conf           # 分发服务器定义 stream 主机
    ├── {project}.conf
    ├── {project}/
    │   ├── web.conf
    │   ├── domain.pem        # https 证书
    │   ├── domain.key
    │   └── assets            # 资源文件配置
    └── opts/
        ├── log-main          # 通用日志
        ├── vars              # 通用变量
        ├── block-ips         # IP 封禁
        └── ...               # 其他公用配置
```

日志目录

```Plaintext
/webdata/logs
└── nginx/
│   └── web.[access|error].log  # nginx 请求日志
└── {project}/
    ├── web.[access|error].log  # web 日志
    ├── job.[queue].log         # 队列日志
    └── ...                     # 其他日志
```