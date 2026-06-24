---
description: '本文介绍了在PhpStorm中使用Xdebug进行PHP远程调试的完整流程，包括配置调试环境、设置断点、启动调试会话及内部调用方式；同时涵盖Profiler生成与分析，帮助提升PHP开发调试效率。'
lastUpdated: '2026-06-17 18:25:36'
head:
  - - meta
    - name: 'og:title'
      content: '在 PhpStorm 中使用 Xdebug 远程调试 PHP 程序'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了在PhpStorm中使用Xdebug进行PHP远程调试的完整流程，包括配置调试环境、设置断点、启动调试会话及内部调用方式；同时涵盖Profiler生成与分析，帮助提升PHP开发调试效率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/primer/phpstorm-xdebug.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ceb9c0992d2ae8e73ebe0068f095b046.jpg'
---
# 在 PhpStorm 中使用 Xdebug 远程调试 PHP 程序

## 序言

Xdebug 作为 PHP 调试工具，提供了丰富的调试函数和配置，可以直观的看到 PHP 源代码的步进和性能数据，以便优化PHP代码。

使用 phpstorm + xdebug 来调试 php 程序是借助强大的IDE监听功能, 更方便的调试程序. 提高我们的编码效率, 固然 var_dump, print_r 等函数也能提供相应的功能, 但是自动化的工具更能够事半功倍. 下面我根据自己的使用介绍下如何进行调试和配置.

一种方式是用外部设置的 session, 另外一种是在 phpstorm 中配置页面入口然后使用内置的监听来访问, 原理相同, 下面我们从原理开始讲解

## 调试原理

![](https://file.wulicode.com/feishu-images/ceb9c0992d2ae8e73ebe0068f095b046.jpg)

## 配置调试环境

### 1) 配置 xdebug

这里使用了最小化配置, 对于 profile 等功能没有配置

```Plaintext
[xdebug]
zend_extension="/usr/local/opt/php70-xdebug/xdebug.so"
xdebug.remote_enable=1          # 启用远程调试
xdebug.remote_connect_back=1    # 忽略 remote_host 配置, 不关注主机配置, 开发者使用最舒服
xdebug.remote_port=9050         # 监听端口
```

**注意** 这里监听端口默认是 9000 , 和 php 默认监听重复, 注意尽量不用使用 9000, 以免出现不生效的情况.

### 2) 设置 phpstorm 配置并开启监听

这里是让 phpstorm 通过监听端口的方式获取到xdebug 断点传送过来的数据

**2.1) 配置端口**

我们这里监听的是 9500 端口, 和 xdebug 配置监听数据端口一致

![](https://file.wulicode.com/feishu-images/4ef12c809ee7e9e1395271844a1759c4.jpg)

**2.2) 开启phpstorm 数据监听**

切换 “开始监听PHP调试连接” 按钮。

![](https://file.wulicode.com/feishu-images/161647eb737d1f01666ba0b913e7c990.jpg)

![](https://file.wulicode.com/feishu-images/af561144ea26acb83bb57e60087163e7.jpg)

### 3) 在 phpstorm 中设置断点

点击行号右侧空白, 设置断点

![](https://file.wulicode.com/feishu-images/73d0530628983b20f3cb108c2ec4c5b9.jpg)

### 4) 设置 debug session

debug session 的工具的目的是设置一个cookie, 让每次发送数据的时候都会携带这个 cookie, 从而识别监听.

**4.1) 安装工具**

安装 chrome 扩展

[Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc)

![](https://file.wulicode.com/feishu-images/63db1288bc19db22c29ed1e1e7b45596.jpg)

**4.2) 点击 图标设置session**

![](https://file.wulicode.com/feishu-images/00d32b1ce1f00c1d773b5132f3ef127c.jpg)

已经设置了cookie, Key 是 `XDEBUG_SESSION`, 值是 `PHPSTORM`, 我认为这里的值无关紧要, 对于 phpstorm 来说, 是能够监控到的.

![](https://file.wulicode.com/feishu-images/1affe08437706f6ed69a42679d9beb20.png)

### 5) 运行页面

这里我们在断点位置可以看到输出的内容项目

![](https://file.wulicode.com/feishu-images/35b95fce1b1eaf7be6ded84f9f26953d.jpg)

## 另一种方式: 内部调用

这里的另外一种方式的服务器配置方式和流程完全一致, 就是第四步和第五步有所不同, 实现的原理是在phpstorm中设置运行的服务器, 然后通过 debug 模式自动设置 `XDEBUG_SESSION`, 并且自动开启监听.

### 内部调用: 4) 设置 debug session [接上一个步骤 3]

**4.1) 设置 web 访问的服务器**

例如我这里的本地域名是 `l.dailian.sour-lemon.com` , 我们需要配置一个本地服务器来打开这个页面, 我们首先配置一台服务器.

![](https://file.wulicode.com/feishu-images/42d46b8fb37810ac79cf984546e5988c.jpg)

**注意**

这里的配置的域名是你本地已经配置好开发环境的域名, 端口号是 本地开发所使用的端口, 我这里是 `l.dailian.sour-lemon.com` 和 80

**4.2) 配置调试页面**

我们这里创建的调试页面的类型是

```Plaintext
PHP Web Application
```

, 服务器选择的是刚才已经建立好的服务器

![](https://file.wulicode.com/feishu-images/4fa1203d7457b2e6fcd1f46f3dbe2610.jpg)

### 内部调用: 5) 运行测试页面

这样运行的情况下上面的 `2.2) 开启phpstorm 数据监听` 步骤可以忽略掉, 这里不需要开启这个监听.

**5.1) 开始 debug**

点击 debug 按钮, 这里会自动打开一个页面并且传递一个唯一的ID(可能是进程 ID)作为 debug 值

![](https://file.wulicode.com/feishu-images/aef103a987bdded6e270453f7ff0fba4.jpg)

打开的url地址是: http://l.dailian.sour-lemon.com/?XDEBUG_SESSION_START=13608 这里的数值是会变动的.

**5.2) 查看 debug 面板**

打开 debug 面板, 会看到相对应的监听 idekey, 这里和上一步设置的key是一致的, 同样也和 cookie 中的设置的 `XDEBUG_SESSION` 值一致

![](https://file.wulicode.com/feishu-images/6878f77cea5f90bdd571d91e214b408f.jpg)

![](https://file.wulicode.com/feishu-images/e77c8c4ea94699c4af25be128d4e5710.png)

## 其他帮助

### 1. 查看兼容性

第一次运行的时候可以通过 phpstorm 自带的工具来检查配置的兼容性.

```Plaintext
Run > Web Server Debug Validation
```

![](https://file.wulicode.com/feishu-images/337ca8b54667ac8b7d684b5febe1f8e6.jpg)

### 2. debug 帮助面板说明

![](https://file.wulicode.com/feishu-images/e01a7c3224a92c143b4a1764b176b446.jpg)

**左侧**

绿色三角形 ： `Resume Program`，表示將继续执行，直到下一个中断点停止。

红色方形 ：`Stop`，表示中断当前程序调试。

**上方**

第一个图形示 ：`Step Over`，跳过当前函数。

第二个图形示 ：`Step Into`，进入当前函数內部的程序（相当于观察程序一步一步执行）。

第三个图形示 ：`Force Step Into`，強制进入当前函数內部的程序。

第四个图形示 ：`Step Out`，跳出当前函数內部的程式。

第五个图形示 ：`Run to Cursor`，定位到当前光标。

**框架说明**

Frames : 加载的文件列表

Variables ： 可以观察到所有全局变量、当前局部变量的数值

Watches ： 可以新增变量，观察变量随着程序执行的变化。

## 生成 Profiler

以下内容摘抄自 [profiling PHP 脚本](http://xdebug.org.cn/docs/profiler)

> xdebug 的 profiler 是一个强大的工具，它能分析 PHP 代码，探测瓶颈，或者通常意义上来说查看哪部分代码运行缓慢以及可以使用速度提升。Xdebug 2 分析器输出一种兼容 cachegrind 文件格式的分析信息。这允许你能使用出色的  [KCacheGrind](https://kcachegrind.github.io/)  工具（Linux，KDE）来分析你的 profiling 数据。在 Linux 可以使用你最喜欢的包管理器安装 KCacheGrind  
> 在 windows 系统上，有预编译的  [QCacheGrind](http://sourceforge.net/projects/qcachegrindwin/)  二进制程序（QCacheGrind 是没有 KDE 绑定的 KCacheGrind）。 > 在 Mac OSX 系统上，这里也有怎样安装 QCacheGrind 的[说明](http://www.tekkie.ro/computer-setup/how-to-install-kcachegrind-qcachegrind-on-mac-osx/)  
> Windows 用户可以选择性的使用  [WinCacheGrind](http://ceefour.github.io/wincachegrind/)。它的功能不同于 KCacheGrind，所以 这个页面的 KCacheGrind 使用文档章节不适用于这个程序。WinCacheGrind 目前不支持 Xdebug 2.3 引入的 cachegrind 文件格式的的文件和函数压缩。  
> 这也有一种可替代 profile 信息演示的工具叫做  [xdebugtoolkit](https://github.com/alexeykupershtokh/xdebugtoolkit)。一款基于 web 前端叫做  [Webgrind](https://github.com/jokkedk/webgrind)，和一款基于 java 的工具叫做  [XCallGraph](http://sourceforge.net/projects/xcallgraph/)  
> 如果你不能使用 KDE（或者不想使用 KDE）的 kcachegrind 包，可以用 perl 脚本 “ct_annotate”，它能从分析器跟踪文件生成 ASCII 输出

### 1) Xdebug 配置

这里依旧使用最小化配置

```Plaintext
; profiler
xdebug.profiler_enable = 0;            ; 关闭永久生成profiler
xdebug.profiler_enable_trigger = 1;    ; 启用 session 触发 profiler
xdebug.profiler_output_dir = "/data/profiler_dir"   ; 输出的目录
zend_extension = "/usr/local/opt/php70-xdebug/xdebug.so"
```

配置完成之后重启 `php-fpm` 或者 `apache`

### 2) 安装 xdebug 工具

安装 chrome 扩展

[Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc)

![](https://file.wulicode.com/feishu-images/63db1288bc19db22c29ed1e1e7b45596.jpg)

### 3) 启用 Xdebug helper 的 profiler 工具

![](https://file.wulicode.com/feishu-images/7dbd2ecb6928577d3c340d8e7e39e4db.jpg)

### 4) 刷新页面, 查看设定的文件夹

在上边设定的文件夹中会生成 profiler 文件

![](https://file.wulicode.com/feishu-images/60d8e990f98a9105115a38d33e5344c4.jpg)

Xdebug 生成的结果是 **CacheGrind** 格式

### 5) 使用工具来分析 profiler 文件

这里我使用 phpstorm 的分析工具来查看 `Tools > Analyze Xdebug Profiler Snapshot`

选择生成的 输出文件, 可以看到文件的解析信息, 这个对于分析自己写的php代码会有很大益处

![](https://file.wulicode.com/feishu-images/ad78226f7f733cb5886b41036de0eb28.jpg)

参考资料

- [Zero-configuration Web Application Debugging with Xdebug and PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/Zero-configuration+Web+Application+Debugging+with+Xdebug+and+PhpStorm#Zero-configurationWebApplicationDebuggingwithXdebugandPhpStorm-2.PreparePhpStorm)
- [使用 PHPStorm 与 Xdebug 调试 Laravel (一)](https://segmentfault.com/a/1190000005878593)
- [profiling PHP 脚本](http://xdebug.org.cn/docs/profiler)

---

::: info 📆
更新记录
**2025年12月14日**
- 合并 Profiler
:::