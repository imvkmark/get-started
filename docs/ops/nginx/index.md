---
title: "Nginx 简介"
date: 2022-04-20 19:00:45
toc: true
categories:
- ["Ops","Nginx"]
---

![image.png](https://file.wulicode.com/yuque/202208/04/23/3821qxHD7Ou5.png?x-oss-process=image/resize,h_36)

Nginx（发音同 engine x）是一个异步框架的 Web 服务器，也可以用作反向代理，负载平衡器 和 HTTP 缓存。该软件由 [Igor Sysoev](https://zh.wikipedia.org/wiki/%E4%BC%8A%E6%88%88%E7%88%BE%C2%B7%E8%B3%BD%E7%B4%A2%E8%80%B6%E5%A4%AB) 创建，并于 2004 年首次公开发布。同名公司成立于 2011 年，以提供支持。Nginx 是一款免费的开源软件，根据类 BSD 许可证的条款发布。一大部分 Web 服务器使用 Nginx ，通常作为负载均衡器。




## 简介

### Nginx 的特点

- 更快：
   - 单次请求会得到更快的响应。
   - 在高并发环境下，Nginx 比其他 WEB 服务器有更快的响应。
- 高扩展性：
   - Nginx 是基于模块化设计，由多个耦合度极低的模块组成，因此具有很高的扩展性。许多高流量的网站都倾向于开发符合自己业务特性的定制模块。
- 高可靠性：
   - Nginx 的可靠性来自于其核心框架代码的优秀设计，模块设计的简单性。另外，官方提供的常用模块都非常稳定，每个 worker 进程相对独立，master 进程在一个 worker 进程出错时可以快速拉起新的 worker 子进程提供服务。
- 低内存消耗：
   - 一般情况下，10000 个非活跃的 `HTTP Keep-Alive` 连接在 Nginx 中仅消耗 `2.5MB` 的内存，这是 Nginx 支持高并发连接的基础。
   - 单机支持 10 万以上的并发连接：**理论上，Nginx 支持的并发连接上限取决于内存，10 万远未封顶。**
- 热部署:
   - master 进程与 worker 进程的分离设计，使得 Nginx 能够提供热部署功能，即在 7x24 小时不间断服务的前提下，升级 Nginx 的可执行文件。当然，它也支持不停止服务就更新配置项，更换日志文件等功能。
- 最自由的 BSD 许可协议:
   - 这是 Nginx 可以快速发展的强大动力。BSD 许可协议不只是允许用户免费使用 Nginx ，它还允许用户在自己的项目中直接使用或修改 Nginx 源码，然后发布。

### 你可能需要掌握的

- Linux 服务器和一些常用的操作命令
- 域名，当然如果是本地玩玩也可以是 Hosts
- 基本的正则表达式

### 图谱
![](https://file.wulicode.com/yuque/202208/04/23/38229Y3vOVic.png?x-oss-process=image/resize,h_1595)

## 常用工具

- [Nginx location match tester](https://nginx.viraptor.info/)
- [NGINXConfig | DigitalOcean](https://www.digitalocean.com/community/tools/nginx)
- [nginx news](http://nginx.org/)

## 常见变量
这里列出常用的 Nginx 全局变量，也可以点击 [实时查看](https://echo.xuexb.com/api/dump/path?a=1&%E4%B8%AD%E6%96%87=%E5%A5%BD%E7%9A%84#123) 浏览。这里是官方的变量详单 [Alphabetical index of variables](https://nginx.org/en/docs/varindex.html)

### 服务器相关

- `nginx_version`:`1.11.2`

当前运行的 Nginx 版本号

- `server_port`:`8080`

服务器端口

- `server_addr`:`127.0.0.1`

服务器端地址

- `server_name`:`127.0.0.1`

服务器名称

- `server_protocol`:`HTTP/1.0`

服务器的 HTTP 版本

- `status`:`200`

HTTP 响应代码

- `time_iso8601`:`2018-09-02T15:14:27+08:00`

服务器时间的 ISO 8610 格式

- `time_local`:`02/Sep/2018:15:14:27 +0800`

服务器时间（LOG Format 格式）

- `document_root`:`/home/xiaowu/github/echo.xuexb.com`

当前请求的文档根目录或别名

- `request_filename`:`/home/xiaowu/github/echo.xuexb.com/api/dump/path`

当前连接请求的文件路径，由 `root` 或 `alias` 指令与 URI 请求生成

- `request_completion:`:`""` 

如果请求成功，值为”OK”，如果请求未完成或者请求不是一个范围请求的最后一部分，则为空

- `pid`:`1234`

工作进程的 PID

- `msec`:`1535872750.954`

当前的 Unix 时间戳

- `limit_rate`:`0`

用于设置响应的速度限制

- `pipe`:`.`

如果请求来自管道通信，值为“p”，否则为“.”

- `connection_requests`:`1`

TCP 连接当前的请求数量

- `connection`:`363861`

TCP 连接的序列号

- `realpath_root`:`/home/xiaowu/github/echo.xuexb.com`

当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径

- `hostname`:`bj01`

主机名

### 链接相关

- `scheme`:`http`

请求使用的 WEB 协议

- `uri`:`/api/dump/path`

请求中的当前 URI(不带请求参数)，可以不同于浏览器传递的 `$request_uri` 的值，它可以通过内部重定向，或者使用 `index` 指令进行修改

- `document_uri`:`/api/dump/path`

同 `$uri`

- `request_uri`:`/api/dump/path?a=1&%E4%B8%AD%E6%96%87=%E5%A5%BD%E7%9A%84`

这个变量等于包含一些客户端请求参数的原始 URI ，它无法修改

- `request_method`:`GET`

HTTP 请求方法

- `request_time`:`0.000`

处理客户端请求使用的时间，从读取客户端的第一个字节开始计时

- `request_length`:`678`

请求的长度（包括请求地址、请求头和请求主体）

- `args`:`a=1&%E4%B8%AD%E6%96%87=%E5%A5%BD%E7%9A%84`

请求参数

- `query_string`: `''`

同 `$args`

- `is_args`:`?`

请求中是否有参数，有则为 `?` 否则为空

- `arg_参数名`:`$arg_a` => `1`

请求中具体的参数

- `https`:`on`

如果开启了 SSL 安全模式，则为 `on` 否则为空

### 客户端相关

- `remote_user` : `''`

使用 Basic 授权时候访问的用户名

- `http_accept`:`text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8`

浏览器支持的 MIME 类型

- `http_accept_encoding`:`gzip, deflate, br`

浏览器支持的压缩编码

- `http_accept_language`:`zh-CN,zh;q=0.9,en;q=0.8`

浏览器支持的语言

- `http_cache_control`:`max-age=0`

浏览器缓存

- `http_connection`:``

客户端与服务连接类型

- `http_cookie`:`a=1; b=2`

浏览器请求 cookie

- `http_host`:`echo.xuexb.com`

浏览器请求 host

- `http_referer`:`[https://echo.xuexb.com](https://echo.xuexb.com)`

浏览器来源

- `http_upgrade_insecure_requests`:`1`

是一个请求首部，用来向服务器端发送信号，表示客户端优先选择加密及带有身份验证的响应，并且它可以成功处理 upgrade-insecure-requests CSP 指令

- `http_user_agent` : `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36`

用户设备标识

- `http_x_requested_with`:`true`

异步请求标识

- `http_x_forwarded_for`:`198.13.61.105`

反向代理 IP 组标识

