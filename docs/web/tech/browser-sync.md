# 使用 BrowserSync 来实现内容变动之后的实时刷新

[ps]这个工具支持不同的开发环境, 支持不同的开发语种, 不限于前端, 也不限于后端, 实现原理是监听内容文件夹, 实现改动, 自动刷新, 例如 php, html, css 等等..

Browsersync
能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。

## 安装

### 1. 安装 Node.js

BrowserSync是基于Node.js的, 是一个Node模块， 如果您想要快速使用它，也许您需要先安装一下Node.js

### 2. 安装 BrowserSync

> [ps] 如果npm在国内非常慢, 你可以考虑淘宝镜像来加速 : [淘宝 NPM 镜像](http://npm.taobao.org/)

您可以选择从Node.js的包管理（NPM）[库中](https://npmjs.org/package/browser-sync)  安装BrowserSync。打开一个终端窗口，运行以下命令：

```
$ npm install -g browser-sync
```

您告诉包管理器下载BrowserSync文件，并在全局下安装它们，您可以在所有项目(任何目录)中使用。

当然您也可以结合`gulpjs`或`gruntjs`构建工具来使用，在您需要构建的项目里运行下面的命令:

```
$ npm install --save-dev browser-sync
```

## 启动 BrowserSync

一个基本用途是，如果您只希望在对某个`css`文件进行修改后会同步到浏览器里。那么您只需要运行命令行工具，进入到该项目（目录）下，并运行相应的命令：

### 静态网站

如果您想要监听`.css`文件, 您需要使用_服务器模式_。 BrowserSync 将启动一个小型服务器，并提供一个URL来查看您的网站。

```
# --files 路径是相对于运行该命令的项目（目录） 
$ browser-sync start --server --files "css/*.css"
```

如果您需要监听多个类型的文件，您只需要用逗号隔开。例如我们再加入一个`.html`文件

```
# --files 路径是相对于运行该命令的项目（目录） 
$ browser-sync start --server --files "css/*.css, *.html"
# 如果你的文件层级比较深，您可以考虑使用 **（表示任意目录）匹配，任意目录下任意.css 或 .html文件。 
$ browser-sync start --server --files "**/*.css, **/*.html"
```

我们做了一个静态例子的示范，您可以下载[示例包](http://www.browsersync.cn/example/packages/BrowsersyncExample.zip)
，文件您可以解压任何盘符的任何目录下，不能是中文路径。打开您的命令行工具，进入到BrowsersyncExample目录下，运行以下其中一条命令。Browsersync将创建一个本地服务器并自动打开你的浏览器后访问http:
//localhost:3000地址，这一切都会在命令行工具里显示。你也可以查看[Browsersync静态示例视频](http://www.browsersync.cn/example/video/browsersync1.mp4)

```
# 监听css文件 
$ browser-sync start --server --files "css/*.css"
# 监听css和html文件 
$ browser-sync start --server --files "css/*.css, *.html"
```

### 动态网站

如果您已经有其他本地服务器环境PHP或类似的，您需要使用_代理模式_。 BrowserSync将通过代理URL(localhost:3000)来查看您的网站。

```
# 主机名可以是ip或域名
$ browser-sync start --proxy "主机名" "css/*.css"
```

在本地创建了一个PHP服务器环境，并通过绑定Browsersync.cn来访问本地服务器，使用以下命令方式，Browsersync将提供一个新的地址localhost:
3000来访问Browsersync.cn，并监听其css目录下的所有css文件。

```
$ browser-sync start --proxy "Browsersync.cn" "css/*.css"
```

## UI 管理配置界面

地址: `http://localhost:3001`

这个就是 browser-sync 控制台的入口

![](https://file.wulicode.com/doc/20230602/1685671697777.png)


## 常用配置

```
$ browser-sync start --help
Usage: /usr/local/bin/browser-sync start [options]
选项：
  --version               显示版本号
  --server, -s            运行本地服务器 (使用 cwd 作为web根目录)
  --serveStatic, --ss     需要监听静态文件的目录
  --port                  指定端口
  --proxy, -p             代理已经存在的网址
  --ws                    代理模式 - 启用 websocket 代理     [布尔]
  --browser, -b           选择自动打开的浏览器
  --files, -f             需要监听的文件路径
  --index                 指定首页
  --plugins               加载插件
  --extensions            Specify file extension fallbacks
  --startPath             指定开始路径
  --https                 启用ssl
  --directory             显示服务端文件夹列表
  --xip                   Use xip.io domain routing                       [布尔]
  --tunnel                Use a public URL
  --open                  Choose which URL is auto-opened (local, external or
                          tunnel), or provide a url
  --cors                  Add Access Control headers to every request 
  --config, -c            Specify a path to a configuration file
  --host                  Specify a hostname to use
  --logLevel              日志输出级别 (silent, info or debug)
  --reload-delay          变更刷新延迟
  --reload-debounce       限制请求频率
  --ui-port               指定UI界面端口
  --watchEvents           Specify which file events to respond to         [数组]
  --no-notify             禁用浏览器右上角通知
  --no-open               不打开新浏览器窗口
  --no-online             强制线下使用
  --no-ui                 不启用UI
  --no-ghost-mode         禁用镜像模式
  --no-inject-changes     文件变化都需要加载
  --no-reload-on-restart  重启时候不自动刷新已经打开的浏览器
  --help                  显示帮助信息
示例：
$ browser-sync start -s app  - Use the App directory to serve
                                            files
$ browser-sync start -p      - Proxy an existing website
  www.bbc.co.uk
```

## 参考资料

- [Browsersync 官网](https://www.browsersync.io/)
- [Browsersync 中文站](http://www.browsersync.cn/)
- [我的Browsersync笔记](http://yanhaijing.com/tool/2015/12/26/my-browsersync/)
- [修改文件后浏览器自动刷新解决方案](https://segmentfault.com/a/1190000003709651)

