---
description: 'Nginx 通过代理时，使用 X-Forwarded-For 请求头记录客户端真实 IP。需在配置中设置 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for，并结合 realip 模块及 set_real_ip_from 指定信任代理，以获取并记录真实客户端地址。'
lastUpdated: '2026-06-17 12:52:06'
head:
  - - meta
    - name: 'og:title'
      content: 'Nginx 经过代理获取真实IP'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Nginx 通过代理时，使用 X-Forwarded-For 请求头记录客户端真实 IP。需在配置中设置 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for，并结合 realip 模块及 set_real_ip_from 指定信任代理，以获取并记录真实客户端地址。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/nginx/fetch-real-ip.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/e5eefe26565896e61fe7252dc9eea669.png'
---
# Nginx 经过代理获取真实IP

这里仅仅对获取到的header 进行解析学习, 方便我们做最少的配置和最优化的服务器配置 , 首先贴出来我们的一个拓扑结构

![](https://file.wulicode.com/feishu-images/e5eefe26565896e61fe7252dc9eea669.png)

我们仅仅在防护及设置host, 其他均不设置, 并且在服务机打印所有的 header 信息

```PHP
<?php
$headers = [
  // 真实IP, 可以透传下发
  'x-real-ip' => '58.11.11.42',
  'x-client-ip' => '58.11.11.42',
  'x-true-ip' => '58.11.11.42',

  // 阿里云的鹰眼 ddos 防护
  'eagleeye-rpcid' => '0.1',
  'eagleeye-traceid' => '2f63148c16612233768404397ec0b0',
  'web-server-type' => 'nginx',
  'x-forwarded-cluster' => 'gf,',    # 高防集群

  // forwarded 的 ip 和策略
  'x-forwarded-proto' => 'http',
  'x-forwarded-for' => '58.11.11.42',
  'wl-proxy-client-ip' => '58.11.11.42',

  
  // 普通的 header 信息
  'upgrade-insecure-requests' => '1',
  'user-agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77',
  'connection' => 'close',
  'host' => 'hidden.domain.com',
  'content-length' => '',
  'content-type' => '',
  'cache-control' => 'no-cache',
  'pragma' => 'no-cache',
  'cookie' => '...',
  'accept-language' => 'en',
  'accept-encoding' => 'gzip, deflate',
  'accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
];
```

## x-forwarded-for 说明

可以看到 x-forwarded-for 里边只有一层ip 信息, 如果我们向下透传的话, 如果没有赋值, 我们则是不可能获取到真实链路的 ip 信息的, 但同时经过了多重代理之后, 服务器的 `$remote_addr` 已经不可信, 因为获取到的是上一层代理的ip 地址, 这里我们需要用到这两个变量来保证链路稳定和获取 ip 稳定

```Plaintext
$proxy_add_x_forwarded_for
$http_x_forwarded_for
```

这两个的变量的值的区别，就在于，`$proxy_add_x_forwarded_for` 比 `$http_x_forwarded_for` 多了一个 `$remote_addr` 的值但是 `$remote_addr` 只能获取到与服务器本身直连的上层请求ip，所以设置 `$remote_addr`一般都是设置第一个代理上面

但是问题是，有时候是通过cdn访问过来的，那么后面web服务器获取到的，永远都是cdn 的ip 而非真是用户ip

那么这个时候就要用到 `x-forwarded-for`了，这个变量的意思，其实就像是链路反追踪，从客户的真实ip为起点，穿过多层级的proxy ，最终到达web 服务器，都会记录下来，所以在获取用户真实ip的时候，一般就可以设置成

```Plaintext
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

这样就能获取所有的代理ip 客户ip

```Plaintext
'x-forwarded-for' =>  '58.11.11.42, 47.111.111.119',
```

### 记录真实IP

IP 解析

```Plaintext
map $http_x_forwarded_for $clientip {
    default $remote_addr;
    "~^(\d+\.\d+\.\d+\.\d+).*$"    $1;
}
```

日志配置

```Plaintext
log_format  main  '$clientip - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  ...;
```

## 参考

- [Module ngx_http_proxy_module (nginx.org)](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)

---

::: info 📆
更新记录
2024年02月28日
- 使用通用的 `X-Forwarded-For` 来获取真实的用户IP
:::