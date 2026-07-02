---
description: 'curl是支持URL规则的文件传输工具，可处理错误显示、带宽限制、数据发送、Cookie管理、自定义HTTP标头、文件上传及SSL证书忽略等操作，并支持调试输出。'
lastUpdated: '2026-07-02 12:27:58'
head:
  - - meta
    - name: 'og:title'
      content: 'curl(1) - 支持 url 规则的命令行文件传输工具'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'curl是支持URL规则的文件传输工具，可处理错误显示、带宽限制、数据发送、Cookie管理、自定义HTTP标头、文件上传及SSL证书忽略等操作，并支持调试输出。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/man/command/curl-1.html'
---
# curl(1) - 支持 url 规则的命令行文件传输工具

**curl** 是一个利用 URL 规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称 curl 为下载工具。作为一款强力工具，curl 支持包括 HTTP、HTTPS、ftp 等众多协议，还支持 POST、cookies、认证、从指定偏移处下载部分文件、用户代理字符串、限速、文件大小、进度条等特征。做网页处理流程和数据检索自动化，curl 可以助一臂之力。

## 语法

```Plaintext
curl(选项)(参数)
```

## 选项

| -a/--append | 上传文件时，附加到目标文件 |
|-|-|
| -A/--user-agent | 设置用户代理发送给服务器 |
| -anyauth | 可以使用“任何”身份验证方法 |
| -b/--cookie <name=string/file> | cookie字符串或文件读取位置 |
| --basic | 使用HTTP基本验证 |
| -B/--use-ascii | 使用ASCII /文本传输 |
| -c/--cookie-jar | 操作结束后把cookie写入到这个文件中 |
| -C/--continue-at | 断点续传 |
| -d/--data | HTTP POST方式传送数据 |
| --data-ascii | 以ascii的方式post数据 |
| --data-binary | 以二进制的方式post数据 |
| --negotiate | 使用HTTP身份验证 |
| --digest | 使用数字身份验证 |
| --disable-eprt | 禁止使用EPRT或LPRT |
| --disable-epsv | 禁止使用EPSV |
| -D/--dump-header | 把header信息写入到该文件中 |
| --egd-file | 为随机数据(SSL)设置EGD socket路径 |
| --tcp-nodelay | 使用TCP_NODELAY选项 |
| -e/--referer | 来源网址 |
| -E/--cert cert:[passwd] | 客户端证书文件和密码 (SSL) |
| --cert-type | 证书文件类型 (DER/PEM/ENG) (SSL) |
| --key | 私钥文件名 (SSL) |
| --key-type | 私钥文件类型 (DER/PEM/ENG) (SSL) |
| --pass | 私钥密码 (SSL) |
| --engine | 加密引擎使用 (SSL). "--engine list" for list |
| --cacert | CA证书 (SSL) |
| --capath | CA目录 (made using c_rehash) to verify peer against (SSL) |
| --ciphers | SSL密码 |
| --compressed | 要求返回是压缩的形势 (using deflate or gzip) |
| --connect-timeout | 设置最大请求时间 |
| --create-dirs | 建立本地目录的目录层次结构 |
| --crlf | 上传是把LF转变成CRLF |
| -f/--fail | 连接失败时不显示http错误 |
| --ftp-create-dirs | 如果远程目录不存在，创建远程目录 |
| --ftp-method [multicwd/nocwd/singlecwd] | 控制CWD的使用 |
| --ftp-pasv | 使用 PASV/EPSV 代替端口 |
| --ftp-skip-pasv-ip | 使用PASV的时候,忽略该IP地址 |
| --ftp-ssl | 尝试用 SSL/TLS 来进行ftp数据传输 |
| --ftp-ssl-reqd | 要求用 SSL/TLS 来进行ftp数据传输 |
| -F/--form <name=content> | 模拟http表单提交数据 |
| --form-string <name=string> | 模拟http表单提交数据 |
| -g/--globoff | 禁用网址序列和范围使用{}和[] |
| -G/--get | 以get的方式来发送数据 |
| -H/--header | 自定义头信息传递给服务器 |
| --ignore-content-length | 忽略的HTTP头信息的长度 |
| -i/--include | 输出时包括protocol头信息 |
| -I/--head | 只显示请求头信息 |
| -j/--junk-session-cookies | 读取文件进忽略session cookie |
| --interface | 使用指定网络接口/地址 |
| --krb4 | 使用指定安全级别的krb4 |
| -k/--insecure | 允许不使用证书到SSL站点 |
| -K/--config | 指定的配置文件读取 |
| -l/--list-only | 列出ftp目录下的文件名称 |
| --limit-rate | 设置传输速度 |
| --local-port | 强制使用本地端口号 |
| -m/--max-time | 设置最大传输时间 |
| --max-redirs | 设置最大读取的目录数 |
| --max-filesize | 设置最大下载的文件总量 |
| -M/--manual | 显示全手动 |
| -n/--netrc | 从netrc文件中读取用户名和密码 |
| --netrc-optional | 使用 .netrc 或者 URL来覆盖-n |
| --ntlm | 使用 HTTP NTLM 身份验证 |
| -N/--no-buffer | 禁用缓冲输出 |
| -o/--output | 把输出写到该文件中 |
| -O/--remote-name | 把输出写到该文件中，保留远程文件的文件名 |
| -p/--proxytunnel | 使用HTTP代理 |
| --proxy-anyauth | 选择任一代理身份验证方法 |
| --proxy-basic | 在代理上使用基本身份验证 |
| --proxy-digest | 在代理上使用数字身份验证 |
| --proxy-ntlm | 在代理上使用ntlm身份验证 |
| -P/--ftp-port | 使用端口地址，而不是使用PASV |
| -q | 作为第一个参数，关闭 .curlrc |
| -Q/--quote | 文件传输前，发送命令到服务器 |
| -r/--range | 检索来自HTTP/1.1或FTP服务器字节范围 |
| --range-file | 读取（SSL）的随机文件 |
| -R/--remote-time | 在本地生成文件时，保留远程文件时间 |
| --retry | 传输出现问题时，重试的次数 |
| --retry-delay | 传输出现问题时，设置重试间隔时间 |
| --retry-max-time | 传输出现问题时，设置最大重试时间 |
| -s/--silent | 静默模式。不输出任何东西 |
| -S/--show-error | 显示错误 |
| --socks4 <host[:port]> | 用socks4代理给定主机和端口 |
| --socks5 <host[:port]> | 用socks5代理给定主机和端口 |
| --stderr |  |
| -t/--telnet-option <OPT=val> | Telnet选项设置 |
| --trace | 对指定文件进行debug |
| --trace-ascii | Like --跟踪但没有hex输出 |
| --trace-time | 跟踪/详细输出时，添加时间戳 |
| -T/--upload-file | 上传文件 |
| --url | Spet URL to work with |
| -u/--user <user[:password]> | 设置服务器的用户和密码 |
| -U/--proxy-user <user[:password]> | 设置代理用户名和密码 |
| -w/--write-out [format] | 什么输出完成后 |
| -x/--proxy <host[:port]> | 在给定的端口上使用HTTP代理 |
| -X/--request | 指定什么命令 |
| -y/--speed-time | 放弃限速所要的时间，默认为30 |
| -Y/--speed-limit | 停止传输速度的限制，速度时间 |

# 实例

**文件下载**

curl命令可以用来执行下载、发送各种HTTP请求，指定HTTP头部等操作。如果系统没有curl可以使用`yum install curl`安装，也可以下载安装。curl是将下载文件输出到stdout，将进度信息输出到stderr，不显示进度信息使用`--silent`选项。

```Plaintext
curl URL --silent
```

这条命令是将下载文件输出到终端，所有下载的数据都被写入到stdout。

使用选项`-O`将下载的数据写入到文件，必须使用文件的绝对地址：

```Plaintext
curl http://example.com/text.iso --silent -O
```

选项`-o`将下载数据写入到指定名称的文件中，并使用`--progress`显示进度条：

```Plaintext
curl http://example.com/test.iso -o filename.iso --progress
######################################### 100.0%
```

**不输出错误和进度信息**

- `s` 参数将不输出错误和进度信息。

```Plaintext
curl -s https://www.example.com
# 上面命令一旦发生错误，不会显示错误信息。不发生错误的话，会正常显示运行结果。
```

如果想让 curl 不产生任何输出，可以使用下面的命令。

```Plaintext
curl -s -o /dev/null https://google.com
```

**断点续传**

curl能够从特定的文件偏移处继续下载，它可以通过指定一个便宜量来下载部分文件：

```Plaintext
curl URL/File -C 偏移量
#偏移量是以字节为单位的整数，如果让curl自动推断出正确的续传位置使用-C -：
curl -C -URL
```

**使用curl设置参照页字符串**

参照页是位于HTTP头部中的一个字符串，用来表示用户是从哪个页面到达当前页面的，如果用户点击网页A中的某个连接，那么用户就会跳转到B网页，网页B头部的参照页字符串就包含网页A的URL。

使用`--referer`选项指定参照页字符串：

```Plaintext
curl --referer http://www.google.com http://wangchujiang.com
```

**用curl设置用户代理字符串**

有些网站访问会提示只能使用IE浏览器来访问，这是因为这些网站设置了检查用户代理，可以使用curl把用户代理设置为IE，这样就可以访问了。使用`--user-agent`或者`-A`选项：

```Plaintext
curl URL --user-agent "Mozilla/5.0"
curl URL -A "Mozilla/5.0"
```

其他HTTP头部信息也可以使用curl来发送，使用`-H`"头部信息" 传递多个头部信息，例如：

```Plaintext
curl -H "Host:wangchujiang.com" -H "accept-language:zh-cn" URL
```

**curl的带宽控制和下载配额**

使用`--limit-rate`限制curl的下载速度：

```Plaintext
curl URL --limit-rate 50k
```

命令中用k（千字节）和m（兆字节）指定下载速度限制。

使用`--max-filesize`指定可下载的最大文件大小：

```Plaintext
curl URL --max-filesize bytes
```

如果文件大小超出限制，命令则返回一个非0退出码，如果命令正常则返回0。

```Plaintext
curl --limit-rate 200k https://example.com
# 上面命令将带宽限制在每秒 200K 字节。
```

**用curl进行认证**

使用curl选项 -u 可以完成HTTP或者FTP的认证，可以指定密码，也可以不指定密码在后续操作中输入密码：

```Plaintext
curl -u user:pwd http://wangchujiang.com
curl -u user http://wangchujiang.com
```

**只打印响应头部信息**

通过`-I`或者`-head`可以只打印出HTTP头部信息：

```Plaintext
[root@localhost text]# curl -I http://wangchujiang.com
HTTP/1.1 200 OK
Server: nginx/1.2.5
date: Mon, 10 Dec 2012 09:24:34 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Vary: Accept-Encoding
X-Pingback: http://wangchujiang.com/xmlrpc.php
```

**get请求**

```Plaintext
curl "http://www.wangchujiang.com"    # 如果这里的URL指向的是一个文件或者一幅图都可以直接下载到本地
curl -i "http://www.wangchujiang.com" # 显示全部信息
curl -l "http://www.wangchujiang.com" # 只显示头部信息
curl -v "http://www.wangchujiang.com" # 显示get请求全过程解析
```

**post请求**

```Plaintext
$ curl -d "param1=value1&param2=value2" "http://www.wangchujiang.com/login"
curl -d'login=emma＆password=123' -X POST https://wangchujiang.com/login
# 或者
$ curl -d 'login=emma' -d 'password=123' -X POST  https://wangchujiang.com/login
```

- `-data-urlencode` 参数等同于 `d`，发送 `POST` 请求的数据体，区别在于会自动将发送的数据进行 `URL` 编码。

```Plaintext
curl --data-urlencode 'comment=hello world' https://wangchujiang.com/login
# 上面代码中，发送的数据hello world之间有一个空格，需要进行 URL 编码。
```

**读取本地文本文件的数据，向服务器发送**

```Plaintext
curl -d '@data.txt' https://wangchujiang.com/upload
# 读取data.txt文件的内容，作为数据体向服务器发送。
```

**json格式的post请求**

```Plaintext
curl -l -H "Content-type: application/json" -X POST -d '{"phone":"13521389587","password":"test"}' http://wangchujiang.com/apis/users.json
```

**向服务器发送 Cookie**

使用`--cookie "COKKIES"`选项来指定cookie，多个cookie使用分号分隔：

```Plaintext
curl http://wangchujiang.com --cookie "user=root;pass=123456"
```

将cookie另存为一个文件，使用`--cookie-jar`选项：

```Plaintext
curl URL --cookie-jar cookie_file
```

- `b` 参数用来向服务器发送 Cookie。

```Plaintext
curl -b 'foo=bar' https://taobao.com
# 上面命令会生成一个标头Cookie: foo=bar，向服务器发送一个名为foo、值为bar的 Cookie。
```

```Plaintext
curl -b 'foo1=bar' -b 'foo2=baz' https://taobao.com
# 上面命令发送两个 Cookie。
curl -b cookies.txt https://www.taobao.com
# 上面命令读取本地文件 cookies.txt，里面是服务器设置的 Cookie（参见-c参数），将其发送到服务器。
```

**Cookie 写入一个文件**

```Plaintext
curl -c cookies.txt https://www.taobao.com
# 上面命令将服务器的 HTTP 回应所设置 Cookie 写入文本文件cookies.txt。
```

**请求的来源**

- `e` 参数用来设置 `HTTP` 的标头 `Referer`，表示请求的来源。

```Plaintext
curl -e 'https://taobao.com?q=example' https://www.example.com
# 上面命令将Referer标头设为 https://taobao.com?q=example。
```

- `H` 参数可以通过直接添加标头 `Referer`，达到同样效果。

```Plaintext
curl -H 'Referer: https://taobao.com?q=example' https://www.example.com
```

**上传二进制文件**

- `F` 参数用来向服务器上传二进制文件。

```Plaintext
curl -F 'file=@photo.png' https://taobao.com/profile
# 上面命令会给 HTTP 请求加上标头 Content-Type: multipart/form-data ，然后将文件photo.png作为file字段上传。
```

- `F` 参数可以指定 `MIME` 类型。

```Plaintext
curl -F 'file=@photo.png;type=image/png' https://taobao.com/profile
# 上面命令指定 MIME 类型为image/png，否则 curl 会把 MIME 类型设为 application/octet-stream。
```

- `F` 参数也可以指定文件名。

```Plaintext
curl -F 'file=@photo.png;filename=me.png' https://taobao.com/profile
# 上面命令中，原始文件名为photo.png，但是服务器接收到的文件名为me.png。
```

**设置请求头**

- `H` 参数添加 `HTTP` 请求的标头。

```Plaintext
curl -H 'Accept-Language: en-US' https://google.com
# 上面命令添加 HTTP 标头 Accept-Language: en-US。
```

```Plaintext
curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com
# 上面命令添加两个 HTTP 标头。
```

```Plaintext
curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://google.com/login
# 上面命令添加 HTTP 请求的标头是 Content-Type: application/json，然后用 -d 参数发送 JSON 数据。
```

**跳过 SSL 检测**

```Plaintext
curl -k https://www.example.com
# 上面命令不会检查服务器的 SSL 证书是否正确。
```

**请求跟随服务器的重定向**

- `L` 参数会让 `HTTP` 请求跟随服务器的重定向。`curl` 默认不跟随重定向。

```Plaintext
curl -L -d 'tweet=hi' https://api.example.com/tweet
```

**调试参数**

- `v` 参数输出通信的整个过程，用于调试。

```Plaintext
curl -v https://www.example.com
# --trace参数也可以用于调试，还会输出原始的二进制数据。
```

```Plaintext
$ curl --trace - https://www.example.com
```

**获取本机外网ip**

```Plaintext
curl ipecho.net/plain
```

**Curl 模拟内网机器进行数据转发**

```Plaintext
curl -v --resolve www.domain.com:9443:10.30.109.134 https://www.domain.com/api/info
```