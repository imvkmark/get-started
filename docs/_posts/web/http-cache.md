---
title: "[转+] Http 缓存简介和使用"
date: 2023-04-19 10:44:50
toc: true
categories:
- ["前端","Web 开发"]
---

# 缓存流程
浏览器向服务器请求数据，发送请求(request)报文；服务器向浏览器返回数据，返回响应(response)报文。报文信息主要分为两部分

```html
1.包含属性的Header
	cookie
	缓存信息等
2.包含数据的主体部分(body)
	HTTP请求真正想要传输的部分
```
在 Header 的交互过程中, 浏览器会根据服务端的标识来合理的进行标识的传送, 用于浏览器/服务端进行内容的, 时间的, 标识的比较和约定, 从而返回需要的数据<br />这里偷一个图, 原文地址 :[彻底弄懂HTTP缓存机制及原理 - 云中桥](https://www.cnblogs.com/chenqf/p/6386163.html)<br />![image.png](https://file.wulicode.com/yuque/202304/20/17/29469tRKnYCQ.png?x-oss-process=image/resize,h_750)


# Header

## Cache-Control
非常好用的缓存控制工具, 也就是告诉浏览器, 你如何使用我定义的缓存策略才能不失有效又能够准确的显示我的内容.

### private
仅仅在客户端进行缓存, 但是如果响应具有 Authorization请求头, 则不能将其存储在私有缓存中, 除非额外指定了 public, 也就是 public 的优先级高于 Authorization

### public
客户端和代理服务器都可以缓存

### max-age=xxx
缓存的内容将在 xxx 秒后失效, 超过这个时间缓存被认为过期(单位秒)

### no-cache
需要使用对比缓存来验证数据

### no-store
对所有内容均不进行缓存, 无论是浏览器的前进/返回都会进行内容的请求

### must-revalidate
必须经过服务器进行验证, 缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源, 前提是缓存必须过期达到 max-age 的最大时间

### immutable
显式的告诉浏览器, 你不要来请求我的缓存, 这个数据相当于破坏了缓存的机制, 也就是无论是 url 中存在版本号, 或者 hash 值均不请求服务器进行更新, 也就证明此数据永远不会过期

## Expires(不推荐)
通过时间的调整导致缓存失效, Http/1.0 中的规范<br />Expires 的值为服务端返回的到期时间，即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据。不过 Expires 是HTTP 1.0 的东西，现在默认浏览器均默认使用 HTTP 1.1，所以它的作用基本忽略。另一个问题是，到期时间是由服务端生成的，但是客户端时间可能跟服务端时间有误差，这就会导致缓存命中的误差。

# Vary
根据不同的 header 头来进行不同的缓存机制, 一般的缓存均使用 url 作为缓存的主要标识, 使用 vary 之后, 则不同的 vary 数据也会进行不同的缓存请求处理例如，对于带有 Accept-Language: en 标头并已缓存的英语内容，不希望再对具有 Accept-Language: ja 请求标头的请求重用该缓存响应。在这种情况下，您可以通过在 Vary 标头的值中添加 Accept-Language，根据语言单独缓存响应。
```html
Vary: Accept-Language
```
这会导致缓存基于响应 URL 和 Accept-Language请求标头的组合进行控制——而不是仅仅基于响应 URL。

# Etag
当浏览器发现过期的缓存响应时，它可以向服务器发送一个小令牌（通常是文件内容的哈希）来检查文件是否已更改。如果服务器返回了相同的令牌，那么说明文件没有改动，无需重新下载, 这是根据内容的对比缓存机制
```
first request =>
<=========
Etag : "ABCDE"

second request
=========>
If-None-Match: "ABCDE"
```
这个 优先级高于 Last-Modified 和 If-Modified-Since<br />图示 :<br />![image.png](https://file.wulicode.com/yuque/202304/20/17/2947AKMxq8CF.png?x-oss-process=image/resize,h_251)

浏览器从服务器请求 /file 并加入 If-None-Match 标头，命令服务器仅在服务器上文件的 ETag 与浏览器的 If-None-Match 值不匹配时才返回完整文件。在本例中，这两个值确实匹配，因此服务器返回 304 Not Modified 响应，并说明文件还要再缓存多久 Cache-Control: max-age=120

# Last-Modifed
服务器响应请求时，会告诉浏览器一个告诉浏览器资源的最后修改时间：Last-Modified，浏览器之后再请求的时候，会带上一个头：If-Modified-Since，这个值就是服务器上一次给的 Last-Modified 的时间，服务器会比对资源当前最后的修改时间，如果大于If-Modified-Since，则说明资源修改过了，浏览器不能再使用缓存，否则浏览器可以继续使用缓存，并返回304状态码
```
first request =>
<=========
Last-Modified : Sun, 28 Apr 2002 23:40:21 GMT

second request
=========>
If-Modified-Since: Sun, 28 Apr 2002 23:40:21 GMT
```
此缓存的优先级低于 ETag

# 强制缓存 / 版本化Url 的长期缓存
这个过期时间 + max-age 是 http 1.0 的产物, 因为 max-age 开启后, 在 last-modified 之前是不会对服务器有任何请求的, 我们可以把这种缓存机制理解成强制缓存, 在有强制缓存的情况下如果想要更新浏览器本地的缓存信息可以

- 通过强制刷新(ctrl+ f5) 进行更新资源
- 在 url 中附带版本参数, 例如 ?t=198888881323 来获取最新的内容, 或者是更换文件的 hash 名称, 例如 style.11xxsn.css

这种情况可以适用于静态资源一旦被创建后不会被更新, 或者更新的时候一定要有版本号或者更新的时候更改文件的名称, 例如 webpack , vite 进行打包的时候自动把文件的 hash 信息追加到资源文件的名称中, 用以解决服务器缓存的问题, 减少服务器缓存带来的对前端的影响.

# 对比缓存
需要进行比较判断是否可以使用缓存。浏览器第一次请求数据时，服务器会将缓存标识与数据一起返回给客户端，客户端将二者备份至缓存数据库中。 再次请求数据时，客户端将备份的缓存标识发送给服务器，服务器根据缓存标识进行判断，判断成功后，返回304状态码，通知客户端比较成功，可以使用缓存数据, 这里两种典型的实现方式是 ETag, Last-Modifed

# 常用的缓存手段

- Cache-Control: no-cache 适用于每次使用前应与服务器重新验证的资源。
- Cache-Control: no-store 适用于永远不要缓存的资源。
- Cache-Control: max-age=31536000 适用于版本化的资源。

ETag 或 Last-Modified 标头可以帮助您更有效地重新验证过期的缓存资源

## Cache-Control 示例
| Cache-Control 值 | 解释 |
| --- | --- |
| max-age=86400 | 响应可以被浏览器和中间缓存缓存最多 1 天（60 秒 x 60 分钟 x 24 小时）。 |
| private, max-age=600 | 响应可以被浏览器（但不是中间缓存）缓存最多 10 分钟（60 秒 x 10 分钟）。 |
| public, max-age=31536000 | 响应可以由任何缓存存储 1 年。 |
| no-store | 不允许缓存响应，必须在每次请求时完整获取。 |


## 参考文章

- [使用 HTTP 缓存避免不必要的网络请求 (web.dev)](https://web.dev/i18n/zh/http-cache/)
- [从未如此简单：5分钟搞懂 HTTP 缓存机制 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/news/588770)
- [HTTP 缓存 - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E6%A6%82%E8%A7%88)

