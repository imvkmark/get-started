---
title: "ab(1) - Apache 服务器的性能测试工具"
date: 2022-04-20 14:21:29
toc: true
categories:
- ["Man","commands(1)"]
---

Apache 服务器的性能测试工具, 测试你 Apache http 服务器的工具，你可以通过这个工具，指定一个单位时间内向 apache 发出的请求数量来看看你的 Apache 和机器配合的性能如何。

```
ab
    [ -A auth-username:password ] [ -c concurrency ] [ -C cookie-name=value] [ -d ]
    [ -e csv-file ] [ -g gnuplot-file ] [ -h ] [ -H custom-header ] [ -i  ]  [  -k  ]
    [  -n  requests  ] [ -p POST-file ] [ -P proxy-auth-user‐name:password ] [ -q ]
    [ -s ] [ -S ] [ -t timelimit ] [ -T content-type  ][  -v verbosity] [ -V ] [ -w ]
    [ -x <table>-attributes ] [ -X proxy[:port]]  [  -y  <tr>-attributes  ]
    [  -z   <td>-attributes   ]  [http://]host‐name[:port]/path
```

## 选项
`-A auth-username:password`<br />支持基本的验证证书,用户名和密码之间使用"冒号" : 分隔开,ab 将以明文方式传送过去.不管服务器是不是需要 ,也就是说你的服务器需要支持 401 认证.<br />`-b windowsize`<br />Size of TCP 发送/接收 缓存大小(单位: bytes)<br />`-B local-address`<br />在进行输出连接时要绑定到的地址。<br />`-c concurrency`<br />同时向服务器端发送的请求数目，默认状态下是一次只执行一个 http 请求.<br />`-C cookie-name=value`<br />添加一个 Cookie 请求行, 这个参数以 `name=value` 的形式, 这个字段可重复.<br />`-d`<br />不显示 "XX [ms]表中提供的百分比"。(遗留支持)。<br />`-e csv-file`<br />将结果写入到 csv 文件, 这个文件包含了 1% - 100% 的请求时间(单位:毫秒), 这个文件比 `gnuplot` 文件会更有用, 因为这个结果已经统计好了.<br />`-f protocol`<br />指定 SSL/TLS 协议 (SSL2, SSL3, TLS1, or ALL).<br />`-g gnuplot-file`<br />将所有测量结果输出到 `gnuplot` 或者 `TSV(Tab separate values)` 文件.<br />这个文件能够很简单的导入到 Gnuplot, IDL,Mathematica, Igor 或者 Excel 中, 文件的第一行为所有的标签.<br />`-h`<br />显示使用信息<br />`-H custom-header`<br />向请求包追加附加的标题字串.此参数应该是有效的标题行(header line)形式,通常使用冒号 `:` 来分隔有效配对 (valid pair)例如 'Accept-Encoding: zip/zop;8 bit';<br />`-i`<br />使用一个 http 头(HEAD) 来替换 GET 方法.不可以掺入 POST 方法<br />`-k`<br />允许 http KeepAlive ；也就是说在一个 http 会话当中执行多个请求，默认是不允许的也就是 no KeepAlive<br />`-n requests`<br />执行一次测试会话的时候所发出的请求数目,默认是执行一个单一的请求 当然了这样的测试结果也就没什么意义<br />`-p POST-file`<br />测试程序也就是 ab,将向 Apache server 发送带有 HTTP POST 的请求.<br />`-P proxy-auth-username:password`<br />当需要通过代理测试一台 HTTP 服务器的时候而你的代理又需要用户名密码验证,这时你可以使用这个选项,同样用户名与密码之间使用冒号":"分隔开,ab 将之以明文的方式发送出去,当然,前提是你的代理是处于 407 认证状态的<br />`-q`<br />当处理超过 150 个请求时，ab 输出一个进程计数 10% 或 100 个 左右的请求。`-q`选项将禁止显示这些消息。<br />`-r`<br />在 socket 收到错误的时候不要退出<br />`-s timeout`<br />在 socket 超时之前等待的最大秒数。默认为 30 秒。<br />`-S`<br />不显示中间值和标准差，也不显示警告/错误消息时，平均和中间值是标准偏差。默认值为 min/avg/max。(遗留支持)。<br />`-t timelimit`<br />设置测试的时间的长短，使用这个选项 将自动设置测试请求会话数目为 50000，然后以你设置的时间为固定周期.默认状态下是没有时限的，也就是直到完成 你所设置的请求数目为止.<br />`-T content-type`<br />内容类型标头,使用在 POST 数据的时候.<br />`-u PUT-file`<br />文件包含 PUT 的数据, 记住要设置 `-T` 选项<br />`-v verbosity`<br />设置冗余级别,4 级打印出每个请求标头的详细信息, 3 级打印出回应代码(例如,404,200),2 级打印出警告 信息和指示消息<br />`-V`<br />显示版本号并且退出<br />`-w`<br />打印输出结果到 HTML 表中. 默认的表是两列 n 行白底黑框<br />`-x <table>-attributes`<br />使用字串来描述表的属性,该属性字串应该插入到 <table {这里} ><br />`-X proxy[:port]`<br />Use a proxy server for the requests.<br />`-y <tr>-attributes`<br />用于生成 html 表格每行的属性名 (`<tr>`)<br />`-z <td>-attributes`<br />用于生成 html 表格每列的属性名 (`<td>`)

## 参数
主机：被测试主机。

