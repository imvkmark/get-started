---
description: 'Nginx Gzip压缩通过配置参数（如gzip on、gzip_buffers、gzip_comp_level等）启用和优化，可提升传输效率。测试时利用`--resolve`指定域名解析访问，并通过转发服务器验证源服务器设置，确保压缩生效。'
lastUpdated: '2026-06-17 12:36:56'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx Gzip 压缩使用和详解'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx Gzip压缩通过配置参数（如gzip on、gzip_buffers、gzip_comp_level等）启用和优化，可提升传输效率。测试时利用`--resolve`指定域名解析访问，并通过转发服务器验证源服务器设置，确保压缩生效。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/compress-gzip.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/390ab77b232db731fe7109afa27600e2.png'
---
# Nginx Gzip 压缩使用和详解

网站的性能部分取决于用户浏览器下载的所有文件的大小。减小这些传输文件的大小可以使网站更快。对于那些在按流量计费的连接上支付带宽使用费的人来说，它还可以使网站成本更低。

`gzip` 是一种流行的数据压缩程序。可以配置 Nginx 用于动态压缩它提供的文件。然后，这些文件在使用时由支持它的浏览器解压缩，没有任何损失，但可以在Web服务器和浏览器之间传输更少的数据量。好消息是，所有主流浏览器都支持

由于压缩的一般工作方式，某些文件压缩得比其他文件更好。例如，文本文件压缩得很好，通常最终会缩小两倍以上。另一方面，JPEG或PNG文件等图像已经按其性质进行了压缩，并且使用二次压缩很少或根本没有结果。另外压缩文件会耗费服务器资源，所以只压缩可以压缩的文件

Nginx实现资源压缩的原理是通过 `ngx_http_gzip_module` 模块拦截请求，并对需要做 gzip 的类型做 gzip，ngx_http_gzip_module 是Nginx默认集成的，不需要重新编译，直接开启

## Gzip 参数

### gzip on

这个没的说，打开或关闭gzip

```Plaintext
Syntax: gzip on | off;
Default:
gzip off;
Context:    http, server, location, if in location
```

### **gzip_buffers**

设置用于处理请求压缩的缓冲区数量和大小。比如32 4K表示按照内存页（one memory page）大小以4K为单位（即一个系统中内存页为4K），申请32倍的内存空间。建议此项不设置，使用默认值。

```Plaintext
Syntax: gzip_buffers number size;
Default:
gzip_buffers 32 4k|16 8k;
Context:    http, server, location
```

### **gzip_comp_level**

设置gzip压缩级别，级别越底压缩速度越快文件压缩比越小，反之速度越慢文件压缩比越大

```Plaintext
Syntax: gzip_comp_level level;
Default:
gzip_comp_level 1;
Context:    http, server, location
```

我们以一个大小为92.6K的脚本文件为例，如下所示。其中最后三个数值分别表示压缩比、包大小、平均处理时间（使用ab压测，100用户并发下 ）以及CPU消耗。

```Plaintext
$ ab -n 10000 -c 100 -H 'Accept-Encoding: gzip' https://example.com/assets/js/web/app.js
```

从这我们可以得出结论：

- 随着压缩级别的升高，压缩比有所提高，但到了级别6后，很难再提高；
- 随着压缩级别的升高，处理时间明显变慢;
- gzip很消耗cpu的性能，高并发情况下cpu达到100%;

因此，建议：

- 不是压缩级别越高越好，其实gzip_comp_level 1的压缩能力已经够用了，后面级别越高，压缩的比例其实增长不大，反而很吃处理性能。
- 压缩一定要和静态资源缓存相结合，缓存压缩后的版本，否则每次都压缩高负载下服务器肯定吃不住。

### **gzip_disable**

通过表达式，表明哪些UA头不使用gzip压缩

```Plaintext
Syntax: gzip_disable regex ...;
Default:    —
Context:    http, server, location
This directive appeared in version 0.6.23.
```

### **gzip_min_length**

当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩。

```Plaintext
Syntax: gzip_min_length length;
Default:
gzip_min_length 20;
Context:    http, server, location
```

### **gzip_http_version**

用于识别 http 协议的版本，早期的浏览器不支持 gzip 压缩，用户会看到乱码，所以为了支持前期版本加了此选项。默认在 http/1.0 的协议下不开启 gzip 压缩。

```Plaintext
Syntax: gzip_http_version 1.0 | 1.1;
Default:
gzip_http_version 1.1;
Context:    http, server, location
```

因为浏览器基本上都支持HTTP/1.1。然而这里面却存在着一个很容易掉入的坑，也是笔者从生产环境中一个诡异问题中发现的：

**明明开启gzip功能，但是未生效。**

**原因定位：**

为什么这样呢？在应用服务器前，公司还有一层Nginx的集群作为七层负载均衡，在这一层上，是没有开启gzip的。

如果我们使用了proxy_pass进行反向代理，那么 nginx 和后端的 `upstream server` 之间默认是用HTTP/1.0协议通信的。如果我们的 Cache Server 也是 nginx ，而前端的 nginx 没有开启gzip。

同时，我们后端的 nginx 上没有设置 gzip_http_version 为1.0，那么 Cache 的 url 将不会进行 gzip 压缩。我相信，以后还有人会入坑，比如你用 Apache ab 做压测，如果不是设置 gzip_http_version为 1.0，你也压不出gzip的效果（同样的道理）。希望写在这里对大家有帮助

![](https://file.wulicode.com/feishu-images/390ab77b232db731fe7109afa27600e2.png)

### **gzip_proxied**

Nginx做为反向代理的时候启用：

`off`

关闭所有的代理结果数据压缩

`expired`

如果header中包含”Expires”头信息，启用压缩

`no-cache`

如果header中包含”Cache-Control:no-cache”头信息，启用压缩

`no-store`

如果header中包含”Cache-Control:no-store”头信息，启用压缩

`private`

如果header中包含”Cache-Control:private”头信息，启用压缩

`no_last_modified`

启用压缩，如果header中包含”Last_Modified”头信息，启用压缩

`no_etag`

启用压缩，如果header中包含“ETag”头信息，启用压缩

`auth`

启用压缩，如果header中包含“Authorization”头信息，启用压缩

`any`

无条件压缩所有结果数据

```Plaintext
Syntax: gzip_proxied off | expired | no-cache | no-store | private | no_last_modified | no_etag | auth | any ...;
Default:
gzip_proxied off;
Context:    http, server, location
```

### **gzip_vary**

增加响应头”Vary: Accept-Encoding”

```Plaintext
Syntax: gzip_vary on | off;
Default:
gzip_vary off;
Context:    http, server, location
```

### **gzip_types**

设置需要压缩的MIME类型,如果不在设置类型范围内的请求不进行压缩

```Plaintext
Syntax: gzip_types mime-type ...;
Default:
gzip_types text/html;
Context:    http, server, location
```

所以MIME-TYPE中应该新增字体类型：

| 字体类型扩展名 | Content-type |
|-|-|
| .eot | application/vnd.ms-fontobject |
| .ttf | font/ttf |
| .otf | font/opentype |
| .woff | font/x-woff |
| .svg | image/svg+xml |

## 配置

### 测试是否参与压缩

支持 gzip header 的测试

```Plaintext
$ curl -H "Accept-Encoding: gzip" -I https://wulicode.com/demo/html/link/favicon.html

HTTP/1.1 200 OK
Server: nginx/1.22.0
Date: Tue, 30 Aug 2022 02:22:45 GMT
Content-Type: text/html
Connection: keep-alive
Last-Modified: Wed, 23 Mar 2022 16:24:34 GMT
ETag: W/"623b49c2-18b"
Content-Encoding: gzip
```

这样可以看到内容已经被 gzip 过了对于图片类型的是无法进行压缩的

```Plaintext
$ curl -H "Accept-Encoding: gzip" -I https://wulicode.com/demo/html/link/assets/icon/favicon.png
```

### 转发服务器验证源服务器的设置

如果我们在转发服务器上验证源服务器上的配置, 需要 curl 额外的参数来进行验证

### 指定域名解析的访问, 这里使用 `--resolve`

```Plaintext
$ curl -v --resolve example.com:443:121.4.4.4 -I https://example.com/jquery.js

* Added example.com:443:121.4.4.4 to DNS cache
* About to connect() to example.com port 443 (#0)
*   Trying 121.4.4.4...
* Connected to example.com (121.4.4.4) port 443 (#0)
* Initializing NSS with certpath: sql:/etc/pki/nssdb
*   CAfile: /etc/pki/tls/certs/ca-bundle.crt
  CApath: none
* SSL connection using TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
* Server certificate:
*   subject: CN=example.com
*   start date: 2月 07 00:00:00 2022 GMT
*   expire date: 2月 08 23:59:59 2023 GMT
*   common name: kejinshou.com
*   issuer: CN=Encryption Everywhere DV TLS CA - G1,OU=www.digicert.com,O=DigiCert Inc,C=US
> HEAD /jquery.js HTTP/1.1
> User-Agent: curl/7.29.0
> Host: kejinshou.com
> Accept: */*
```

这里将IP 临时加入域名的 dns 缓存, 从而在对下一步访问进行解析

### 指定主机头+ IP 的访问

```Plaintext
$ curl -H 'Accept-encoding:gzip' \
  -H 'Host:example.com' \
  -I http://121.4.4.4/jquery.js
```

### Nginx 配置

对于 gzip 我们可以在服务器进行如下配置, 最简约的配置

```Plaintext
http {
    # ...
    gzip on;
    gzip_types
        application/atom+xml
        application/geo+json
        application/javascript
        application/x-javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rdf+xml
        application/rss+xml
        application/xhtml+xml
        application/xml
        font/eot
        font/otf
        font/ttf
        image/svg+xml
        text/css
        text/javascript
        text/plain
        text/xml;
    # ...
}
```

## 参考文章

- [Nginx gzip参数详解及常见问题（已解决） - 大胖猴](https://www.cnblogs.com/xzkzzz/p/9224358.html)