---
title: "[译+] Curl 另外一台机器"
date: 2022-11-08 15:40:22
toc: true
categories:
- ["Ops","Linux"]
---

有时想对服务器进行期望的 curl 请求，但并不真的希望 curl 解析给定 URL 中的主机并使用它，而是期望它去其他地方。到某个非解析的主机上进行请求
> ps(译者) : 这里有一个应用场景, 如下, 当前有一台分发机器, 需要添加另外一台机器来做应用的负载均衡, 但是在配置未完成之前不得进行切换, 所以可以使用 curl 来进行测试

![image.png](https://file.wulicode.com/yuque/202211/08/16/00135hgedHHY.png?x-oss-process=image/resize,h_306)


## 伪造主机头
向 `New` HTTP 主机发送请求的常用且易于理解的方法是简单地发送不同的 Host: Header 头，以便服务器给指定的主机提供响应<br />如果你在 localhost 上运行`example.com`HTTP 测试站点并想验证它是否有效, 这里可以不用配置 `/etc/hosts`(本机 dns 映射)
```
$ curl --header "Host: example.com" http://127.0.0.1/
```
在这种情况下，使用 cookie 对 example.com 进行请求也是可以生效的，但是如果页面重定向到另一个主机并且启用了 redirect-following , 则会失败, `--location` 在 curl 的进一步的请求中也会发送假的主机头<br />`[--header](https://curl.haxx.se/docs/manpage.html#-H)`选项巧妙地取消了内置的主机头, 当自定义 Header 的时候, 只有用户提供的 header 头才会发送

## 伪造更好的主机头
最近我们到处都在使用 HTTPS，只是伪造 Host: 标头是不够的。HTTPS 服务器还需要获取已在 TLS 握手中提供的服务器名称，以便知道要使用哪个证书等。该名称在SNI 字段中提供。curl 还需要知道正确的主机名来验证证书（因为IP 地址很少提供来注册服务器证书）, curl 从提供的 URL 中提取需要的两个资料<br />由于不能只将 IP 地址放在 URL 中进行请求，因此我们使用相反的方式，为 curl 提供正确的 URL，但使用自定义 IP 地址用于我们设置的主机名。这里用到命令行选项: [--resolve](https://curl.haxx.se/docs/manpage.html#--resolve)
```
$ curl --resolve example.com:443:127.0.0.1 https://example.com/
```
在服务器，此选项会使用地址为 127.0.0.1 , 域名是 : example.com, 端口是 443 的自定义内容来设置 curl 的 DNS 缓存，因此当 curl 想要连接到此主机名时，会找到设计的地址并连接到该服务器，而不是返回`**真实**`名称解析的 IP 地址。<br />此方法在跟踪重定向时也同样有效，因为使用相同的主机名会解析为一样的 IP 地址，然后重定向到另一个主机名则会正确解析。甚至可以在命令行上多次使用此选项来为多个名称添加自定义地址。如果需要，还可以为每个名称添加多个 IP 地址。

## 按名称连接到另一台主机
如上所示，[--resolve](https://curl.haxx.se/docs/manpage.html#--resolve) 将 curl 指向特定的已知 IP。但有时这也可能不是你所需要的<br />想象一下，你有一个域名，可能解析为多个不同的主机名，可能是同一站点/服务的多个服务。现在假设向前端服务器中的一台特定服务器发出 curl 命令。它是一个基于 `example.com` 服务的服务器，但这个域名却是 `host-47.example.com`<br />你可以使用如上所示的方法使用 `--resolve` 来解析主机名<br />或者可以使用`--connect-to`，他基于 hostname 工作。使用它，可以让 curl 在名称解析之前将特定主机名 + 端口号对替换为另一个主机名 + 端口号对！
```
$ curl --connect-to example.com:443:host-47.example.com:443 https://example.com/
```

## 疯狂连击
curl 中的大多数选项都是单独控制的，这意味着很少有逻辑会禁止你组合使用他们<br />`--resolve`，`--connect-to`和`--header`都可以在同一个命令行中使用！

连接到在 localhost 上运行的 HTTPS 主机，使用正确的名称进行 SNI 和证书验证，但仍然在 Host: 标头中仍会要求独立host？好没问题：
```
$ curl --resolve example.com:443:127.0.0.1 https://example.com/ --header "Host: diff.example.com"
```

## 都使用 libcurl ?
当完成上述 curl 选项的操作并希望将命令行转换为 libcurl 代码时，可以使用 `--libcurl`.<br />只需添加 `--libcurl example.c` 到命令行，curl 就会以给定的文件名为您生成 C 代码模板。基于该模板，便可以了解代码是如何运行的. Bingo<br />(完)
> ps, 以上由于知识和能力所限, 翻译有晦涩难懂, 欢迎一同探讨

