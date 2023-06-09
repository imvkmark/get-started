# Php 获取的 Http 服务器变量

这里数据来自于 PHP 服务器获取到的数据, 并在这个数据基础上对 Header 进行说明并进行实地验证, 更多的 Header
的信息查看 [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

## 环境变量

服务器信息以及服务器接收到的响应数据

- `USER` : 'duoli'

当前程序的运行用户

- `HOME` : '/Users/duoli'

当前程序的用户主目录

- `REDIRECT_STATUS` : 200

PHP CGI 模式下的重定向状态, 使用 `--enable-cgi-redirect` 开启, 默认不能进行重定向

- `SERVER_PORT` : 80

服务器端口号

- `SERVER_ADDR` : 127.0.0.1

服务器地址, 默认是当前服务器的内网IP

- `REMOTE_PORT` : 59888

当前连接到 Web 服务器所使用的端口号

- `REMOTE_ADDR` : 127.0.0.1

当前用户的服务器地址, 如果服务器之间的数据传输启用了代理, 这里的地址会是最后一个代理的地址(如果需要对此地址进行覆盖改写, 需要从服务器中配置此变量)

- `SERVER_SIGNATURE` : ''

包含了服务器版本和虚拟主机名的字符串

- `SERVER_SOFTWARE` : nginx/1.21.5

当前服务器的版本号

- `GATEWAY_INTERFACE` : CGI/1.1

当前网关接口

- `REQUEST_SCHEME` : http

当前地址的请求协议

- `SERVER_PROTOCOL`: HTTP/1.1

当前请求的传输协议

- `SERVER_NAME` : '127.0.0.1'

当前运行脚本所在的服务器的主机名。如果脚本运行于虚拟主机中，该名称是由那个虚拟主机所设置的值决定

- `DOCUMENT_ROOT` : '..../start/public'

当前请求文件的真实目录

- `DOCUMENT_URI` : 'index.php'


- `SCRIPT_NAME` : 'index.php' 当前请求的文件名称


- `REQUEST_URI` : '/misc/http/server'

当前请求的URI路径

- `CONTENT_LENGTH` : ''

发送给接收方的消息主题的大小

- `CONTENT_TYPE` : ''

用于指示资源的MIME类型

- `REQUEST_METHOD` : 'GET'

当前的请求方法

- `QUERY_STRING` : ''

当前的查询字符串数据

- `SCRIPT_FILENAME` : '.../public/index.php'

当前脚本的文件路径

- `FCGI_ROLE` : ''

当前 FastCGI 的角色, 可以使用的角色为 [RESPONDER|AUTHORIZER|FILTER] [FastCGI](https://github.com/BlueBrain/FastCGI/blob/master/libfcgi/fcgiapp.c#L2215)

- `PHP_SELF` : 'index.php'

当前执行脚本的文件名，与 document root 有关。例如，在地址为 ` http://example.com/test.php/foo.bar `
的脚本中使用 `$_SERVER['PHP_SELF']` 将得到 /test.php/foo.bar。`__FILE__` 常量包含当前(例如包含)

文件的完整路径和文件名。

- `REQUEST_TIME_FLOAT`: '1648284041.8815'
- `REQUEST_TIME` : '1648284041'

当前请求时间

- `HTTPS`

如果脚本是通过 HTTPS 协议被访问，则被设为一个非空的值。Note: 注意当使用 IIS 上的 ISAPI 方式时，如果不是通过 HTTPS 协议被访问，这个值将为 off。

- `REMOTE_HOST`

浏览当前页面的用户的主机名。DNS 反向解析不依赖于用户的 REMOTE_ADDR。 Note: 你的服务器必须被配置以便产生这个变量。例如在 Apache 中，你需要在 httpd.conf 中设置
HostnameLookups On 来产生它。参见 gethostbyaddr()。

- `PATH_TRANSLATED`

当前脚本所在文件系统（非文档根目录）的基本路径。这是在服务器进行虚拟到真实路径的映像后的结果。 Note: 自 PHP 4.3.2 起，PATH_TRANSLATED 在 Apache 2 SAPI 模式下不再和
Apache 1 一样隐含赋值，而是若 Apache 不生成此值，PHP 便自己生成并将其值放入

SCRIPT_FILENAME 服务器常量中。这个修改遵守了 CGI 规范，PATH_TRANSLATED 仅在 PATH_INFO 被定义的条件下才存在。 Apache 2 用户可以在 httpd.conf 中设置 AcceptPathInfo =
On 来定义 PATH_INFO。

- `SCRIPT_FILENAME`

当前执行脚本的绝对路径。 Note: 如果在命令行界面（Command Line Interface, CLI）使用相对路径执行脚本，例如 file.php 或 ../file.php，那么 `$_SERVER['SCRIPT_FILENAME']`
将包含用户指定的相对路径。

- `PHP_AUTH_DIGEST`

当作为 Apache 模块运行时，进行 HTTP Digest 认证的过程中，此变量被设置成客户端发送的“Authorization” HTTP 头内容（以便作进一步的认证操作）。

- `PHP_AUTH_USER`

当 PHP 运行在 Apache 或 IIS（PHP 5 是 ISAPI）模块方式下，并且正在使用 HTTP 认证功能，这个变量便是用户输入的用户名。

- `PHP_AUTH_PW`

当 PHP 运行在 Apache 或 IIS（PHP 5 是 ISAPI）模块方式下，并且正在使用 HTTP 认证功能，这个变量便是用户输入的密码。

- `AUTH_TYPE`

当 PHP 运行在 Apache 模块方式下，并且正在使用 HTTP 认证功能，这个变量便是认证的类型。

- `PATH_INFO`

包含由客户端提供的、跟在真实脚本名称之后并且在查询语句（query string）之前的路径信息，如果存在的话。例如，如果当前脚本是通过
URL ` http://www.example.com/php/path_info.php/some/stuff?foo=bar `

被访问，那么 `$_SERVER['PATH_INFO']` 将包含 /some/stuff。

## Http 请求(浏览器相关)

这里的变量和 header 数据是一一对应的
> 1. All elements of the $_SERVER array whose keys begin with 'HTTP_' come from HTTP request headers and are not to be trusted.
> 2. All HTTP headers sent to the script are made available through the $_SERVER array, with names prefixed by 'HTTP_'.

这里定义的是请求头, 即从浏览器发出的请求数据, 如果使用代理服务器并且代理服务器中间做了相应的转发配置, 这里也会存在相关数据, 为了方便查看, 这里将代理移出

- `HTTP_ACCEPT_ENCODING` : 'gzip, deflate'

当前请求头中 Accept-Encoding: 项的内容,
该项目代表客户端能够理解的内容编码方式, [Accept-Encoding(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Encoding)

- `HTTP_USER_AGENT` : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36

Edg/99.0.1150.52'

当前请求头中 User-Agent: 项的内容，如果存在的话。该字符串表明了访问该页面的用户代理的内容

- `HTTP_PROXY_CONNECTION`: 'keep-alive'

当前请求头中 Connection: 项的内容,
决定当前的事务完成后，是否会关闭网络连接 [Connection(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection)

- `HTTP_COOKIE`: ''

客户端请求 Cookie 的内容 [Cookie(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie)

- `HTTP_ACCEPT_LANGUAGE`: 'en'

客户端请求 Accept-Language 的内容,
允许客户端声明它可以理解的自然语言 [Accept-Language(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)

- `HTTP_UPGRADE_INSECURE_REQUESTS`: '1'

客户端 Upgrade-Insecure-Requests 的内容,

表示客户端优先选择加密及带有身份验证的响应 [Upgrade-Insecure-Requests(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Upgrade-Insecure-Requests)

- `HTTP_CACHE_CONTROL`: 'max-age=0'

客户端 Cache-Control 的内容, 用来说明当前客户端的缓存处理机制 [Cache-Control(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

- `HTTP_ACCEPT` : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3;q=0.9'

客户端 Accept 请求的内容, 告知客户端可以处理的内容类型 [Accept(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)

- `HTTP_ACCEPT_CHARSET`: UTF-8,*;q=0.5

当前请求头中 Accept-Charset: 项的内容, 代表当前请求文档的字符集

- `HTTP_HOST` : 'start.duoli.com'

当前主机名称

- `HTTP_PRAGMA` : 'no-cache'

在 HTTP/1.0 中规定的通用首部, 用来做向后兼容 [Pragma(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Pragma)

- `HTTP_REFERER` : ''

引导用户代理到当前页的前一页的地址（如果存在）。由 user agent 设置决定。并不是所有的用户代理都会设置该项，有的还提供了修改 `HTTP_REFERER` 的功能。简言之，该值并不可信。

这里是对应的 Header 数据示例, 来自于 Laravel dump

```
"cookie" => array:1 [▶]
  "accept-encoding" => array:1 [▶]
  "user-agent" => array:1 [▶]
  "accept" => array:1 [▶]
  "upgrade-insecure-requests" => array:1 [▶]
  "cache-control" => array:1 [▶]
  "proxy-connection" => array:1 [▶]
  "accept-language" => array:1 [▶]
  "host" => array:1 [▶]
  "content-length" => array:1 [▶]
  "content-type" => array:1 [▶]
```

### Sec 相关

禁止修改的HTTP消息头

```
# Ua 相关的架构, 型号, 平台
[Draft] Sec-CH-UA-Arch      : 架构
[Draft] Sec-CH-UA-Bitness   : 系统架构 64bit/32bit
[Draft] Sec-CH-UA-Full-Version-List 
[Draft] Sec-CH-UA-Full-Version
[Draft] Sec-CH-UA-Mobile
[Draft] Sec-CH-UA-Model
[Draft] Sec-CH-UA-Platform-Version
[Draft] Sec-CH-UA-Platform
[Draft] Sec-CH-UA
# 
Sec-Fetch-Dest   : 目的地
Sec-Fetch-Mode   : 请求模式
Sec-Fetch-Site   : 表明了一个请求发起者的来源与目标资源来源之间的关系
Sec-Fetch-User   : 表明了一个导航请求是否由用户激活触发
Sec-WebSocket-Accept : 用以告知服务器愿发起一个websocket连接
```

## 和代理相关的 Http 参数

为了方便理解, 做以下说明

```
58.--.--.42 : 用户真实IP
47.--.--.139(中国浙江杭州) : 阿里云的防护IP, 代理转发过来的, 并非真实的主转发准入IP
```

- `HTTP_EAGLEEYE_RPCID` : '0.1'
- `HTTP_EAGLEEYE_TRACEID` : '2f63148b16482864809693026e0f94'

这两个数据是对应的 aliyun 的链路追踪(可能), 因为我们的服务层加入了 阿里云 的防护机制,
参考 [2017双11技术揭秘—双十一海量数据下EagleEye的使命和挑战](https://juejin.cn/post/6844903543049027592)

- `HTTP_X_FORWARDED_CLUSTER` : 'gf,'

可能是 aliyun 内部防护的约定变量, 找到的资料可能有以下标识 [gf|高防, waf|应用防火墙]

- `HTTP_WL_PROXY_CLIENT_IP` : '58.--.--.42'

经过 apache weblogic 层加上的数据, 这里代表的是用户的真实IP

- `HTTP_WEB_SERVER_TYPE` : 'nginx'

web 服务器类型(不确定是那一层添加)

- `HTTP_X_TRUE_IP` : '58.--.--.42'
- `HTTP_X_REAL_IP` : '47.--.--.139''

这两个查到的说明是用户的真实IP, 但是 TRUE_IP 此变量不太常见,资料太少, REAL_IP 比较常见, 但是获取的IP并非是准确的

- `HTTP_X_FORWARDED_PROTO` : 'http'

代理转发的协议

- `HTTP_X_FORWARDED_FOR` : '58.--.--.42, 47.--.--.139'

代理转发的IP, 是多个IP的集合体 [X-Forwarded-For(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Forwarded-For), 对于配置的时候,

还有一个变量 `$proxy_add_x_forwarded_for`, 这里面包含所有的转发的IP信息, 在 nginx 中可以配置

```
server {
    ...
    location / {
      # 使用单变量
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      # 使用追加的方式
      proxy_set_header X-Forwarded-For "$http_x_forwarded_for, $remote_addr";
    }
    ...
}
```

这里是Header 中可以获取到的数据 , 来自于 Laravel dump

```
"eagleeye-rpcid" => array:1 [▶]
  "pragma" => array:1 [▶]
  "eagleeye-traceid" => array:1 [▶]
  "x-forwarded-cluster" => array:1 [▶]
  "wl-proxy-client-ip" => array:1 [▶]
  "web-server-type" => array:1 [▶]
  "x-true-ip" => array:1 [▶]
  "x-forwarded-proto" => array:1 [▶]
  "x-forwarded-for" => array:1 [▶]
  "x-real-ip" => array:1 [▶]
```

其他和代理相关的可能值

```
HTTP_VIA
HTTP_PROXY_CONNECTION
HTTP_USER_AGENT_VIA
HTTP_CACHE_INFO
```

## 其他

很老的数据, Win 上运行获取的数据

```
[PATH] => G:\\Windows\\system32;G:\\Windows;E:\\Program Files_7\\Python32\\;;
[SystemRoot] => G:\\Windows
[COMSPEC] => G:\\Windows\\system32\\cmd.exe
[PATHEXT] => .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC
[WINDIR] => G:\\Windows
```

**参考**

- [Using the Forwarded header](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)

