---
title: "[原] 在 PhpStorm 中使用 Xdebug 远程调试 PHP 程序(框架原生均适用)"
date: 2022-04-20 18:58:27
toc: true
categories:
- ["Php","环境搭建"]
---

## 序言
Xdebug 作为 PHP 调试工具，提供了丰富的调试函数和配置，可以直观的看到 PHP 源代码的步进和性能数据，以便优化 PHP 代码。<br />使用 phpstorm + xdebug 来调试 php 程序是借助强大的 IDE 监听功能, 更方便的调试程序. 提高我们的编码效率, 固然 var_dump, print_r 等函数也能提供相应的功能, 但是自动化的工具更能够事半功倍. 下面我根据自己的使用介绍下如何进行调试和配置.<br />一种方式是用外部设置的 session, 另外一种是在 phpstorm 中配置页面入口然后使用内置的监听来访问, 原理相同, 下面我们从原理开始讲解


## 调试原理
![](https://file.wulicode.com/note/2021/11-11/16-09-22734.png#id=u0Ecd&originHeight=509&originWidth=965&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 配置调试环境

### 1) 配置 xdebug
这里使用了最小化配置, 对于 profile 等功能没有配置
```
[xdebug]
zend_extension="/usr/local/opt/php70-xdebug/xdebug.so"
xdebug.remote_enable=1          # 启用远程调试
xdebug.remote_connect_back=1    # 忽略 remote_host 配置, 不关注主机配置, 开发者使用最舒服
xdebug.remote_port=9050         # 监听端口
```
**注意** 这里监听端口默认是 9000 , 和 php 默认监听重复, 注意尽量不用使用 9000, 以免出现不生效的情况.

### 2) 设置 phpstorm 配置并开启监听
这里是让 phpstorm 通过监听端口的方式获取到 xdebug 断点传送过来的数据

#### 2.1) 配置端口
我们这里监听的是 9500 端口, 和 xdebug 配置监听数据端口一致<br />![](https://file.wulicode.com/note/2021/11-11/16-08-48143.png#id=Qut5a&originHeight=509&originWidth=965&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 2.2) 开启 phpstorm 数据监听
切换 “开始监听 PHP 调试连接” 按钮。<br />![](https://file.wulicode.com/note/2021/11-11/16-06-38964.png#id=NcA78&originHeight=92&originWidth=1234&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://file.wulicode.com/note/2021/11-11/16-06-47513.png#id=Y7Wns&originHeight=92&originWidth=1234&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 3) 在 phpstorm 中设置断点
点击行号右侧空白, 设置断点<br />![](https://file.wulicode.com/note/2021/11-11/16-06-56101.png#id=MMxk7&originHeight=438&originWidth=1524&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 4) 设置 debug session
debug session 的工具的目的是设置一个 cookie, 让每次发送数据的时候都会携带这个 cookie, 从而识别监听.

#### 4.1) 安装工具
安装 chrome 扩展 [Xdebug helper](https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc)<br />![](https://file.wulicode.com/note/2021/11-11/16-07-04260.png#id=jTjYF&originHeight=160&originWidth=489&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 4.2) 点击 图标设置 session
![](https://file.wulicode.com/note/2021/11-11/16-07-20379.png#id=v5erM&originHeight=231&originWidth=184&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />已经设置了 cookie, Key 是 `XDEBUG_SESSION`, 值是 `PHPSTORM`, 我认为这里的值无关紧要, 对于 phpstorm 来说, 是能够监控到的.<br />![](https://file.wulicode.com/note/2021/11-11/16-07-33965.png#id=AXdDs&originHeight=140&originWidth=456&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 5) 运行页面
这里我们在断点位置可以看到输出的内容项目<br />![](https://file.wulicode.com/note/2021/11-11/16-07-48490.png#id=V3Cq7&originHeight=1234&originWidth=1764&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 另一种方式: 内部调用
这里的另外一种方式的服务器配置方式和流程完全一致, 就是第四步和第五步有所不同, 实现的原理是在 phpstorm 中设置运行的服务器, 然后通过 debug 模式自动设置 `XDEBUG_SESSION`, 并且自动开启监听.

### 内部调用: 4) 设置 debug session

#### 4.1) 设置 web 访问的服务器
例如我这里的本地域名是 `l.dailian.sour-lemon.com`, 我们需要配置一个本地服务器来打开这个页面, 我们首先配置一台服务器.<br />![](https://file.wulicode.com/note/2021/11-11/16-08-10450.png#id=MgLM3&originHeight=834&originWidth=1620&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**注意** 这里的配置的域名是你本地已经配置好开发环境的域名, 端口号是 本地开发所使用的端口, 我这里是 `l.dailian.sour-lemon.com` 和 80

#### 4.2) 配置调试页面
我们这里创建的调试页面的类型是 `PHP Web Application`, 服务器选择的是刚才已经建立好的服务器<br />![](https://file.wulicode.com/note/2021/11-11/16-09-40021.png#id=Q4rgl&originHeight=790&originWidth=1356&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 内部调用: 5) 运行测试页面
这样运行的情况下上面的 `2.2) 开启phpstorm 数据监听` 步骤可以忽略掉, 这里不需要开启这个监听.

#### 5.1) 开始 debug
点击 debug 按钮, 这里会自动打开一个页面并且传递一个唯一的 ID(可能是进程 ID)作为 debug 值<br />![](https://file.wulicode.com/note/2021/11-11/16-09-50753.png#id=NBIbW&originHeight=148&originWidth=680&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />打开的 url 地址是: `[http://l.dailian.sour-lemon.com/?XDEBUG_SESSION_START=13608](http://l.dailian.sour-lemon.com/?XDEBUG_SESSION_START=13608)`, 这里的数值是会变动的.

#### 5.2) 查看 debug 面板
打开 debug 面板, 会看到相对应的监听 idekey, 这里和上一步设置的 key 是一致的, 同样也和 cookie 中的设置的 `XDEBUG_SESSION` 值一致<br />![](https://file.wulicode.com/note/2021/11-11/16-10-02109.png#id=BTKgX&originHeight=524&originWidth=1618&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://file.wulicode.com/note/2021/11-11/16-10-12354.png#id=o4jcT&originHeight=218&originWidth=424&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 其他帮助

### 1. 查看兼容性
第一次运行的时候可以通过 phpstorm 自带的工具来检查配置的兼容性.<br />`Run > Web Server Debug Validation`<br />![](https://file.wulicode.com/note/2021/11-11/16-10-22834.png#id=tasE8&originHeight=630&originWidth=1084&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2. debug 帮助面板说明
![](https://file.wulicode.com/note/2021/11-11/16-10-32179.png#id=YrjhY&originHeight=622&originWidth=2564&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**左侧**<br />绿色三角形 ： `Resume Program`，表示將继续执行，直到下一个中断点停止。<br />红色方形   ： `Stop`，表示中断当前程序调试。<br />**上方**<br />第一个图形示 ： `Step Over`，跳过当前函数。<br />第二个图形示 ： `Step Into`，进入当前函数內部的程序（相当于观察程序一步一步执行）。<br />第三个图形示 ： `Force Step Into`，強制进入当前函数內部的程序。<br />第四个图形示 ： `Step Out`，跳出当前函数內部的程式。<br />第五个图形示 ： `Run to Cursor`，定位到当前光标。<br />**框架说明**<br />Frames : 加载的文件列表<br />Variables ： 可以观察到所有全局变量、当前局部变量的数值<br />Watches ： 可以新增变量，观察变量随着程序执行的变化。

## 参考文章

- [Zero-configuration Web Application Debugging with Xdebug and PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/Zero-configuration+Web+Application+Debugging+with+Xdebug+and+PhpStorm#Zero-configurationWebApplicationDebuggingwithXdebugandPhpStorm-2.PreparePhpStorm)
- [使用 PHPStorm 与 Xdebug 调试 Laravel (一)](https://segmentfault.com/a/1190000005878593)

