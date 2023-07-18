# 包管理工具更换源使用国内镜像

## Npm

TaoNpm 的更新流程示意图:

![](https://file.wulicode.com/note/2021/10-22/09-22-32302.png)

为什么要换源? npm 官方站点  http://www.npmjs.org/  并没有被拦截,但是下载第三方依赖包的速度由于和外网联通的限制,
速度不能满足实际的使用需求.为了加速访问,
我们可以使用镜像来进行访问

国内有几个镜像站点可以供我们使用

- https://npmmirror.com
- http://www.cnpmjs.org/

速度非常快,镜像站会实时更新,为我们节省了好多时间.

### 临时更换访问源

**通过 config 配置指向国内镜像源**

```
$ npm config set registry https://registry.npmmirror.com
$ npm info express
```

**通过 npm 命令指定下载源**

```shell
# 在安装时候临时指定
$ npm --registry https://registry.npmmirror.com info express
```

### 永久更换访问源

**使用 `nrm` 来更换访问源**

nrm 是 NPM Registry Manager 的缩写, 通过他可以快速切换源,
文档地址 :  https://www.npmjs.com/package/nrm

```
$ npm install -g nrm
$ yarn global add nrm
```

```
# list all
$ nrm ls
* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
# 替换使用
$ nrm use taobao
```

**[linux]在配置文件 `~/.npmrc` 文件写入源地址**

```shell
# 打开配置文件
$ vim ~/.npmrc
# 写入配置文件
registry=https://registry.npmmirror.com/
```

如果你不想使用国内镜像站点,只需要将 写入 ~/.npmrc 的配置内容删除即可.

下面是我本地下载 ejs 包的截图,可以看到默认源地址指向了 cnpm

![](https://file.wulicode.com/note/2021/10-22/09-23-58447.png)

### 使用 `cnpm` 来替代 `npm`

使用说明查看 :  https://npmmirror.com

cnpm 支持所有 npm 的命令并且可以快速同步任意模块

```shell
$ cnpm sync koa connect mocha
```

如果不想安装 `cnpm cli` 怎么办? 我们还有一个 web 页面:

例如我想马上同步 koa, 直接打开浏览器:  http://npmmirror.com/sync/koa

或者你是命令行控, 通过 open 命令打开:

```
open http://npmmirror.com/sync/koa
```

如果你安装的模块依赖了 C++ 模块, 需要编译, 肯定会通过 [node-gyp](https://github.com/TooTallNate/node-gyp)
来编译, [node-gyp](https://github.com/TooTallNate/node-gyp) 在第一次编译的时候, 需要依赖 [node](http://nodejs.org/) 源代码,
于是又会去 node dist 下载, 于是大家又会吐槽,
怎么 npm 安装这么慢...

好吧, 于是又要提到 `--disturl`参数, 通过中国镜像来下载:

```shell
$ npm install microtime \
  --registry=http://registry.npmmirror.com \
  --disturl=https://npmmirror.com/mirrors/node
```

再次要提到 cnpm cli, 它已经默认将 `--registry` 和 `--disturl` 都配置好了, 谁用谁知道 . 写到这里,
就更快疑惑那些不想安装 `cnpm cli` 又吐槽 `npm`
慢的同学是基于什么考虑不在本地安装一个 `cnpm` 呢?

**nodejs 源码路径**

对于在淘宝上下载 nodejs 源码指定的地址是: ` https://npmmirror.com/dist `

**直接更改源文件中的配置文件地址来更改加载路径**

`~/node_modules/npm/lib/config/defaults.js`

Line : 181

`registry : "https://registry.npmjs.org/"`

将这个注册地址 更改为: ` https://registry.npmmirror.com/ `

## Yarn

执行 yarn 各种命令的时候，默认是去 npm/yarn 官方镜像源获取需要安装的具体软件信息

以下命令查看当前使用的镜像源

```
yarn config get registry
```

> 默认源地址在国外，从国内访问的速度肯定比较慢

阿里旗下维护着一个完整的 npm 镜像源   https://npmmirror.com/  同样适用于 yarn

### 临时修改

```
yarn save 软件名 --registry https://npmmirror.com/
```

### 全局修改

```
yarn config set registry https://npmmirror.com/
```

## Nodejs Release 镜像使用帮助

Nodejs Release 为各平台提供预编译的 nodejs 和 npm 等二进制文件，是  https://nodejs.org/dist/
的镜像。

使用方法:

```
# 设定环境变量
export NODE_MIRROR=https://npmmirror.com/mirrors/node
```

参考网站:

- 快速搭建 Node.js / io.js 开发环境以及加速 npm
- 给电脑换源 npm 国内镜像 cnpm

## 更新说明

**2023年07月18日**

- 移除 yrm, yrm 存在过时数据且不再更新, 使用 nrm 替代

**2021 年 10 月 27 日**

- 增加 npm 站点  https://npmmirror.com
- 增加 nrm 的说明

