---
description: 'Fiddler是一个蛮好用的抓包工具，可以将网络传输发送与接受的数据包进行截获、重发、编辑、转存等操作。也可以用来检测网络安全。反正好处多多，举之不尽呀！当年学习的时候也蛮费劲，一些蛮实用隐藏的小功能用了之后就忘记了，每次去网站上找也很麻烦，所以搜集各大网络的资料，总结了一些常用的功能。Fiddler 下载地址 ：https://www.telerik.com/download/fiddlerwin8之后用“Fiddler for .NET4”而win8之前用 “Fiddle for .NET2”比较好Fiddler是通过改写HTTP代理，让数据从它那通过，来监控并且截取到'
lastUpdated: '2025-12-06 11:22:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Fiddler抓包工具总结'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Fiddler是一个蛮好用的抓包工具，可以将网络传输发送与接受的数据包进行截获、重发、编辑、转存等操作。也可以用来检测网络安全。反正好处多多，举之不尽呀！当年学习的时候也蛮费劲，一些蛮实用隐藏的小功能用了之后就忘记了，每次去网站上找也很麻烦，所以搜集各大网络的资料，总结了一些常用的功能。Fiddler 下载地址 ：https://www.telerik.com/download/fiddlerwin8之后用“Fiddler for .NET4”而win8之前用 “Fiddle for .NET2”比较好Fiddler是通过改写HTTP代理，让数据从它那通过，来监控并且截取到'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/tools/fiddle-usage.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/cb/cb71793e4e7709cb279f8861fa46f1f5.png?x-oss-process=image/resize,m_mfit,w_400'
---
# Fiddler抓包工具总结



::: info  <img src="https://file.wulicode.com/notion/df/df74788751515ae874871d8aa75864b6.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  本文是转载文章, 原文地址: 


[Fiddler抓包工具总结 - ﹏猴子请来的救兵](https://www.cnblogs.com/yyhh/p/5140852.html)
:::

## 序章

Fiddler是一个蛮好用的抓包工具，可以将网络传输发送与接受的数据包进行截获、重发、编辑、转存等操作。也可以用来检测网络安全。反正好处多多，举之不尽呀！当年学习的时候也蛮费劲，一些蛮实用隐藏的小功能用了之后就忘记了，每次去网站上找也很麻烦，所以搜集各大网络的资料，总结了一些常用的功能。

Fiddler 下载地址 ：

[https://www.telerik.com/download/fiddler](https://www.telerik.com/download/fiddler)

win8之后用“Fiddler for .NET4”而win8之前用 “Fiddle for .NET2”比较好

![](https://file.wulicode.com/notion/cb/cb71793e4e7709cb279f8861fa46f1f5.png)

## 1. Fiddler 抓包简介

Fiddler是通过改写HTTP代理，让数据从它那通过，来监控并且截取到数据。当然Fiddler很屌，在打开它的那一瞬间，它就已经设置好了浏览器的代理了。当你关闭的时候，它又帮你把代理还原了，是不是很贴心

![](https://file.wulicode.com/notion/1f/1f3a27dad8ef1367a747ca0b60687d8f.png)

### 1） 字段说明

Fiddler想要抓到数据包，要确保Capture Traffic是开启，在File –> Capture Traffic。开启后再左下角会有显示，当然也可以直接点击左下角的图标来关闭/开启抓包功能

![](https://file.wulicode.com/notion/20/20a344482b72c9eb33656bc247228ee7.png)

Fiddler开始工作了，抓到的数据包就会显示在列表里面，下面总结了这些都是什么意思：

![](https://file.wulicode.com/notion/9e/9e58beeef8d89d6f010ea4bcc6d7cf5a.png)



<table><tbody>
  <tr>
    <td>名称</td>
    <td>含义</td>
  </tr>
  <tr>
    <td>#</td>
    <td>抓取HTTP Request的顺序，从1开始，以此递增</td>
  </tr>
  <tr>
    <td>Result</td>
    <td>HTTP状态码</td>
  </tr>
  <tr>
    <td>Protocol</td>
    <td>请求使用的协议，如HTTP/HTTPS/FTP等</td>
  </tr>
  <tr>
    <td>Host</td>
    <td>请求地址的主机名</td>
  </tr>
  <tr>
    <td>URL</td>
    <td>请求资源的位置</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>该请求的大小</td>
  </tr>
  <tr>
    <td>Caching</td>
    <td>请求的缓存过期时间或者缓存控制值</td>
  </tr>
  <tr>
    <td>Content-Type</td>
    <td>请求响应的类型</td>
  </tr>
  <tr>
    <td>Process</td>
    <td>发送此请求的进程：进程ID</td>
  </tr>
  <tr>
    <td>Comments</td>
    <td>允许用户为此回话添加备注</td>
  </tr>
  <tr>
    <td>Custom</td>
    <td>允许用户设置自定义值</td>
  </tr>
</tbody></table>

![](https://file.wulicode.com/notion/cd/cd347918df944207ca9b393d2e2c4952.png)

### 2） Statistics 请求的性能数据分析

好了。左边看完了，现在可以看右边了

随意点击一个请求，就可以看到Statistics关于HTTP请求的性能以及数据分析了（不可能安装好了Fiddler一条请求都没有…）：

![](https://file.wulicode.com/notion/ae/ae3b9c18cb03d4f38ff60d6d6fae742e.png)

### 3）Inspectors 查看数据内容

Inspectors是用于查看会话的内容，上半部分是请求的内容，下半部分是响应的内容：

![](https://file.wulicode.com/notion/e5/e57eb51af48009a2c0a9554704839e55.png)

### 4）AutoResponder 允许拦截指定规则的请求

AutoResponder允许你拦截指定规则的求情，并返回本地资源或Fiddler资源，从而代替服务器响应。看下图5步，我将“baidu”这个关键字与我电脑“f:.jpeg”这张图片绑定了，点击Save保存后勾选Enable rules，再访问baidu，就会被劫持。 > 这个玩意有很多匹配规则，如： > 1. 字符串匹配（默认）：只要包含指定字符串（不区分大小写），全部认为是匹配

<table><tbody>
  <tr>
    <td>字符串匹配（baidu）</td>
    <td>是否匹配</td>
  </tr>
  <tr>
    <td>http://www.baidu.com</td>
    <td>匹配</td>
  </tr>
  <tr>
    <td>http://pan.baidu.com</td>
    <td>匹配</td>
  </tr>
  <tr>
    <td>http://tieba.baidu.com</td>
    <td>匹配</td>
  </tr>
</tbody></table>

> 2. 正则表达式匹配：以“regex:”开头，使用正则表达式来匹配，这个是区分大小写的

<table><tbody>
  <tr>
    <td>字符串匹配</td>
    <td>是否匹配</td>
  </tr>
  <tr>
    <td>http://bbs.fishc.com/Path1/query=foo.bmp&amp;bar</td>
    <td>不匹配</td>
  </tr>
  <tr>
    <td>http://bbs.fishc.com/Path1/query=example.gif</td>
    <td>匹配</td>
  </tr>
  <tr>
    <td>http://bbs.fishc.com/Path1/query=example.bmp</td>
    <td>匹配</td>
  </tr>
  <tr>
    <td>http://bbs.fishc.com/Path1/query=example.Gif</td>
    <td>不匹配</td>
  </tr>
</tbody></table>

![](https://file.wulicode.com/notion/b4/b4722fb755936e9280acf074d048aa59.png)

![](https://file.wulicode.com/notion/21/21f4779ca5bed94056cd2c4b1686be0c.png)

### 4） Composer 自定义请求发送服务器

Composer允许自定义请求发送到服务器，可以手动创建一个新的请求，也可以在会话表中，拖拽一个现有的请求

Parsed模式下你只需要提供简单的URLS地址即可（如下图，也可以在RequestBody定制一些属性，如模拟浏览器User-Agent）

![](https://file.wulicode.com/notion/17/17188108114fbf302e056675a7e3b2a8.png)

### 5）Filters 请求过滤规则

Fiters 是过滤请求用的，左边的窗口不断的更新，当你想看你系统的请求的时候，你刷新一下浏览器，一大片不知道哪来请求，看着碍眼，它还一直刷新你的屏幕。这个时候通过过滤规则来过滤掉那些不想看到的请求。

![](https://file.wulicode.com/notion/2a/2af4bf4e6f3253ee84bb8e9dd0a9d1e8.png)

勾选左上角的Use Filters开启过滤器，这里有两个最常用的过滤条件：Zone和Host

**1、Zone 指定只显示内网（Intranet）或互联网（Internet）的内容：**

![](https://file.wulicode.com/notion/fa/faa7cc8c18b6c40ab506b5c5645f8ccd.png)

**2、Host 指定显示某个域名下的会话：**

![](https://file.wulicode.com/notion/4b/4be4fcade849262d3c9d1b43418f03e4.png)

如果框框为黄色（如图），表示修改未生效，点击红圈里的文字即可

### 6）. Timeline 请求响应时间

在左侧会话窗口点击一个或多个（同时按下 Ctrl 键），Timeline 便会显示指定内容从服务端传输到客户端的时间：

![](https://file.wulicode.com/notion/2f/2f8f623b36e6e1962de5a26ca5f4e220.png)

## 2. Fiddler 设置解密HTTPS的网络数据

Fiddler可以通过伪造CA证书来欺骗浏览器和服务器。Fiddler是个很会装逼的好东西，大概原理就是在浏览器面前Fiddler伪装成一个HTTPS服务器，而在真正的HTTPS服务器面前Fiddler又装成浏览器，从而实现解密HTTPS数据包的目的。

解密HTTPS需要手动开启，依次点击：

1. Tools –> Fiddler Options –>  HTTPS

![](https://file.wulicode.com/notion/97/97c2ab5ee22d08151327178476c9d139.png)

2. 勾选Decrypt HTTPS Traffic

![](https://file.wulicode.com/notion/d5/d50cc99add7b41fb189dc1a0191c22a4.png)

3. 点击OK

![](https://file.wulicode.com/notion/98/980972b2c4ab54e4e50f136fdf1a5327.png)

## 3. Fiddler 抓取Iphone / Android数据包

想要Fiddler抓取移动端设备的数据包，其实很简单，先来说说移动设备怎么去访问网络，看了下面这张图，就明白了。

![](https://file.wulicode.com/notion/d3/d3d5efdcaceedee9da5436a19ff47186.png)

可以看得出，移动端的数据包，都是要走wifi出去，所以我们可以把自己的电脑开启热点，将手机连上电脑，Fiddler开启代理后，让这些数据通过Fiddler，Fiddler就可以抓到这些包，然后发给路由器（如图）：

![](https://file.wulicode.com/notion/4d/4ddd79784eddbd177a53298cf2dca4aa.png)

1. 打开Wifi热点，让手机连上（我这里用的360wifi，其实随意一个都行）

![](https://file.wulicode.com/notion/01/01f299fbcd594a173982b87d83324f62.png)

2. 打开Fidder，点击菜单栏中的 [Tools] –> [Fiddler Options]

![](https://file.wulicode.com/notion/2d/2d3b8db76716d11a565a7b021130e9cd.png)

3. 点击 [Connections] ，设置代理端口是8888， 勾选 Allow remote computers to connect， 点击OK

![](https://file.wulicode.com/notion/84/840c62d97a2849399d5eb22280bf3cda.png)

4. 这时在 Fiddler 可以看到自己本机无线网卡的IP了（要是没有的话，重启Fiddler，或者可以在cmd中ipconfig找到自己的网卡IP）

![](https://file.wulicode.com/notion/ee/ee2217c3351b901c6785bd85ad324a7d.png)

![](https://file.wulicode.com/notion/e6/e63d88206f6352640c4b05a271b8ca21.png)

5. 在手机端连接PC的wifi，并且设置代理IP与端口（代理IP就是上图的IP，端口是Fiddler的代理端口8888）

![](https://file.wulicode.com/notion/18/18b907b93433f9ead4fd34f2f3660243.png)

6. 访问网页输入代理IP和端口，下载Fiddler的证书，点击下图FiddlerRoot certificate

![](https://file.wulicode.com/notion/a1/a1f90e338bc4a27958ebb8c7918cb36d.png)

【注意】：如果打开浏览器碰到类似下面的报错，请打开Fiddler的证书解密模式（Fiddler 设置解密HTTPS的网络数据）

No root certificate was found. Have you enabled HTTPS traffic decryption in Fiddler yet?

![](https://file.wulicode.com/notion/9e/9ee0cb2328b9711410b6ce330dcee627.png)

![](https://file.wulicode.com/notion/5e/5ec8ecddfd884ab6853896c0a29b8b86.png)

![](https://file.wulicode.com/notion/12/1265604f02f4a903aac89004c3d36b58.png)

![](https://file.wulicode.com/notion/c2/c239bf5e861d0d31f5a93fb7b2b57532.png)

7. 安装完了证书，可以用手机访问应用，就可以看到截取到的数据包了。（下图选中是布卡漫画的数据包，下面还有QQ邮箱的）

![](https://file.wulicode.com/notion/38/389dea5a8741ebcfd47bc0fdf9c322e1.png)

## 4. Fiddler 内置命令与断点

Fiddler还有一个藏的很深的命令框，就是眼前，我用了几年的Fiddler都没有发现它，偶尔在别人的文章发现还有这个小功能，还蛮好用的，整理下记录在这里。

FIddler断点功能就是将请求截获下来，但是不发送，这个时候你可以干很多事情，比如说，把包改了，再发送给服务器君。还有balabala一大堆的事情可以做，就不举例子了。

![](https://file.wulicode.com/notion/f3/f31e90a6f49be32fd99530a02264f6cd.png)

<table><tbody>
  <tr>
    <td> <strong>命令</strong> </td>
    <td> <strong>对应请求项</strong> </td>
    <td> <strong>介绍</strong> </td>
    <td> <strong>示例</strong> </td>
  </tr>
  <tr>
    <td>?</td>
    <td>All</td>
    <td>问号后边跟一个字符串，可以匹配出包含这个字符串的请求</td>
    <td>?google</td>
  </tr>
  <tr>
    <td>&gt;</td>
    <td>Body</td>
    <td>大于号后面跟一个数字，可以匹配出请求大小，大于这个数字请求</td>
    <td>&gt;1000</td>
  </tr>
  <tr>
    <td>&lt;</td>
    <td>Body</td>
    <td>小于号跟大于号相反，匹配出请求大小，小于这个数字的请求</td>
    <td>&lt;100</td>
  </tr>
  <tr>
    <td>=</td>
    <td>Result</td>
    <td>等于号后面跟数字，可以匹配HTTP返回码</td>
    <td>=200</td>
  </tr>
  <tr>
    <td>@</td>
    <td>Host</td>
    <td>@后面跟Host，可以匹配域名</td>
    <td>@www.baidu.com</td>
  </tr>
  <tr>
    <td>select</td>
    <td>Content-Type</td>
    <td>select后面跟响应类型，可以匹配到相关的类型</td>
    <td>select image</td>
  </tr>
  <tr>
    <td>cls</td>
    <td>All</td>
    <td>清空当前所有请求</td>
    <td>cls</td>
  </tr>
  <tr>
    <td>dump</td>
    <td>All</td>
    <td>将所有请求打包成saz压缩包，保存到&ldquo;我的文档\Fiddler2\Captures&rdquo;目录下</td>
    <td>dump</td>
  </tr>
  <tr>
    <td>start</td>
    <td>All</td>
    <td>开始监听请求</td>
    <td>start</td>
  </tr>
  <tr>
    <td>stop</td>
    <td>All</td>
    <td>停止监听请求</td>
    <td>stop</td>
  </tr>
  <tr>
    <td> <strong>断点命令</strong> </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>bpafter</td>
    <td>All</td>
    <td>bpafter后边跟一个字符串，表示中断所有包含该字符串的请求</td>
    <td>bpafter baidu（输入bpafter解除断点）</td>
  </tr>
  <tr>
    <td>bpu</td>
    <td>All</td>
    <td>跟bpafter差不多，只不过这个是收到请求了，中断响应</td>
    <td>bpu baidu（输入bpu解除断点）</td>
  </tr>
  <tr>
    <td>bps</td>
    <td>Result</td>
    <td>后面跟状态吗，表示中断所有是这个状态码的请求</td>
    <td>bps 200（输入bps解除断点）</td>
  </tr>
  <tr>
    <td>bpv / bpm</td>
    <td>HTTP方法</td>
    <td>只中断HTTP方法的命令，HTTP方法如POST、GET</td>
    <td>bpv get（输入bpv解除断点）</td>
  </tr>
  <tr>
    <td>g / go</td>
    <td>All</td>
    <td>放行所有中断下来的请求</td>
    <td>g</td>
  </tr>
</tbody></table>

示例演示：

-  **`?`** 

![](https://file.wulicode.com/notion/48/48ab977bd181ee1e3ad60944e5f12077.png)

-  **`>`** 

![](https://file.wulicode.com/notion/e7/e77d66fbf4301a942c83102de0dc9817.png)

-  **`<`** 

![](https://file.wulicode.com/notion/9d/9dc5cd5ed41ea8ce4f4f9a8684cbc642.png)

-  **`=`** 

![](https://file.wulicode.com/notion/ec/ec20e79f7afab613d907fa61bc039da5.png)

-  `@` 

![](https://file.wulicode.com/notion/9a/9a20cdd89e968f575b844c8c196948cb.png)

-  `select` 

![](https://file.wulicode.com/notion/fa/faafcff38583280dbfc4aefa0a310d35.png)

-  **`cls`** 

![](https://file.wulicode.com/notion/26/26629d669d2104b5ffa2f12e808a81de.png)

-  **`dump`** 

![](https://file.wulicode.com/notion/5d/5d0953da8639c2cfd6997d94bdf3a6a3.png)

断点命令：

断点可以直接点击Fiddler下图的图标位置，就可以设置全部请求的断点，断点的命令可以精确设置需要截获那些请求。如下示例：

![](https://file.wulicode.com/notion/1a/1a27d2bbb5dfd7d0d17c3a6503dc2582.png)

命令：

-  **bpafter** 

![](https://file.wulicode.com/notion/b1/b1212d8a731ed096f8225a6cc81c1fe4.png)

![](https://file.wulicode.com/notion/7d/7de808436f8224a49a8633772e3cae2a.png)

-  **bps** 

![](https://file.wulicode.com/notion/93/9336bcfca54c4814f1d136fb2589bbf7.png)

![](https://file.wulicode.com/notion/cc/cccd63211ae57014aef3b9d6a981e96b.png)

-  **bpv** 

![](https://file.wulicode.com/notion/37/373cd6fb980474e87647799d1222e528.png)

![](https://file.wulicode.com/notion/2d/2d58502ef67dc05eb6d94f3056512ac9.png)

-  **g / go** 

![](https://file.wulicode.com/notion/5b/5b81a9b3293cf825e93849516f073ec8.png)

![](https://file.wulicode.com/notion/ea/ea49e4729355ed9f1662b5126b11308e.png)

