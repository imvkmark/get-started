---
description: 'Nginx支持Brotli压缩算法，与Gzip相比压缩率更高。现代浏览器（如Chrome、Firefox）已原生支持Brotli。不同压缩算法（Brotli、Gzip、Zstd）在各级别下对压缩比和速度有差异。配置Nginx需开启ngx_brotli模块，设置压缩级别、类型及反向代理参数（如proxy_set_header）。验证可通过检查响应头Content-Encoding是否为br。'
lastUpdated: '2026-06-17 12:36:29'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx brotli 压缩算法 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx支持Brotli压缩算法，与Gzip相比压缩率更高。现代浏览器（如Chrome、Firefox）已原生支持Brotli。不同压缩算法（Brotli、Gzip、Zstd）在各级别下对压缩比和速度有差异。配置Nginx需开启ngx_brotli模块，设置压缩级别、类型及反向代理参数（如proxy_set_header）。验证可通过检查响应头Content-Encoding是否为br。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/compress-brotli.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/5167660e621f34e518e76cf5458960b4.png'
---
# Nginx brotli 压缩算法

> 这里仅仅是对 Brotli 算法进行简要的对比和描述, 不涉及到实际使用

在web应用中，为了节省流量，降低传输数据大小，提高传输效率，常用的压缩方式一般都是gzip，今天我们来介绍另外一种更高效的压缩方式brotli。Brotli 是基于LZ77算法的一个现代变体、霍夫曼编码和二阶上下文建模。Google软件工程师在2015年9月发布了包含通用无损数据压缩的Brotli增强版本，特别侧重于HTTP压缩。

注意：使用算法的前提是启用了 https，因为 http 请求中 request header 里的 Accept-Encoding: gzip, deflate 是没有 br 的。

关于Brotli 算法详细请查看：[https://zh.wikipedia.org/wiki/Brotli](https://zh.wikipedia.org/wiki/Brotli)

## 浏览器对brotli协议的支持

![](https://file.wulicode.com/feishu-images/5167660e621f34e518e76cf5458960b4.png)

## 各种压缩算法的在不同level下的比较

![](https://file.wulicode.com/feishu-images/03aefbcaa9df7fc473898831ba51aa6f.png)

从图中可以看出brotli vs gzip 的压缩算法 总体来说brotli的总体性能更好，尤其是解压速度。我们在选择brotli算法或gzip时，需要根据实际场景进行调优

## Nginx 配置

Brotli 和 gzip 是可以并存的，无需关闭 gzip

```Plaintext
http {
  # brotli
  brotli on;
  brotli_comp_level 6;
  brotli_buffers 16 8k;
  brotli_min_length 20;
  brotli_types
    text/plain
    text/css
    application/json
    application/x-javascript
    text/xml
    application/xml
    application/xml+rss
    text/javascript
    application/javascript
    image/svg+xml;
}
```

### 反向代理

在反向代理配置文件代码中添加

```Plaintext
server {
    ...
    location / {
        ...
        proxy_set_header Accept-Encoding "";
        ...
    }
    ...
}
```

### 参数说明

Google 认为互联网用户的时间是宝贵的，他们的时间不应该消耗在漫长的网页加载中，因此在 2015 年 9 月 Google 推出了无损压缩算法 Brotli。Brotli 通过变种的 LZ77 算法、Huffman 编码以及二阶文本建模等方式进行数据压缩，与其他压缩算法相比，它有着更高的压缩效率。

`brotli on`

开启brotli压缩功能。

`brotli_comp_level 6`

压缩比例，用来指定brotli压缩比，1 压缩比最小，处理速度最快，11 压缩比最大，传输速度快，但是处理慢，也比较消耗CPU资源。默认值为 6 ,使用默认值即可。

`brotli_buffers 16 8k`

设置用于压缩响应的缓冲区number和size。默认情况下，缓冲区大小等于一个内存页面。 默认值：32 4k|16 8k。

`brotli_min_length 20`

设置length要压缩的响应的最小值，长度仅由Content-Length响应头字段确定。默认为 20 。

`brotli_types`

用来指定压缩的类型，text/html类型总是会被压缩

## 验证

```Plaintext
$ curl -H 'Accept-encoding:br' -I https://m.edailian.net/

HTTP/2 200
server: Tengine
content-type: text/html
vary: Accept-Encoding
date: Tue, 30 Aug 2022 02:59:34 GMT
last-modified: Sat, 06 Aug 2022 02:57:09 GMT
cache-control: public, max-age=0, must-revalidate
via: cache30.l2et2-2[15,0], cache7.cn873[28,0]
content-encoding: br
timing-allow-origin: *
eagleid: 3da4939b16618283741506021e
```