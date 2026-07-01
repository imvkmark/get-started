---
description: 'Node.js 更换国内镜像源的方法包括：直接修改配置文件、使用 nrm 管理源并切换、临时指定源、用 cnpm 替代 npm、设置环境变量以及使用阿里云私有仓库（如 Codeup）。这些方式可加速 npm 包的下载与安装。'
lastUpdated: '2026-07-01 08:21:31'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ Node 更换源使用国内镜像'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Node.js 更换国内镜像源的方法包括：直接修改配置文件、使用 nrm 管理源并切换、临时指定源、用 cnpm 替代 npm、设置环境变量以及使用阿里云私有仓库（如 Codeup）。这些方式可加速 npm 包的下载与安装。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/javascript/npm/use-npm-mirror.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/791349799bb6718163b218d5bad6175a.png'
---
# ⚠️ Node 更换源使用国内镜像

::: warning ⚠️
<p>此文档已经整合, 新文档地址 : [npm 包管理快速入门](/front-end/javascript/npm/npm-introduction.md)</p>
:::

npm mirror 的更新流程示意图:

![](https://file.wulicode.com/feishu-images/791349799bb6718163b218d5bad6175a.png)

npm 官方站点 [http://www.npmjs.org/](http://www.npmjs.org/) 并没有被拦截,但是下载三方依赖包的速度由于和外网限制, 不能满足实际需求. 为了加速访问, 我们可以使用镜像

国内有镜像站点可以供我们使用

- [https://npmmirror.com](https://npmmirror.com)

快捷的命令:

```Bash
$ npm config set registry https://registry.npmmirror.com
```

这会在配置文件 `~/.npmrc` 文件写入源地址, 如果你不想使用国内镜像,只需要将配置内容删除即可

```Plain Text
# 打开配置文件
$ vim ~/.npmrc

# 写入配置文件
registry=https://registry.npmmirror.com/
```

## 使用 nrm 管理源

### **使用 `nrm` 来更换访问源**

nrm 是 NPM Registry Manager 的缩写, 通过他可以快速切换源, 文档地址 : [https://www.npmjs.com/package/nrm](https://www.npmjs.com/package/nrm), nrm 同样也可以适用于 yarn 和 pnpm 等工具

```Plain Text
$ npm install -g nrm
$ yarn global add nrm
```

```Plain Text
# list all
$ nrm ls
* npm ---------- <https://registry.npmjs.org/>
  yarn --------- <https://registry.yarnpkg.com/>
  tencent ------ <https://mirrors.cloud.tencent.com/npm/>
  cnpm --------- <https://r.cnpmjs.org/>
  taobao ------- <https://registry.npmmirror.com/>
  npmMirror ---- <https://skimdb.npmjs.com/registry/>
# 替换使用
$ nrm use taobao
```

**[linux]在配置文件 `~/.npmrc` 文件写入源地址**

```Plain Text
# 打开配置文件
$ vim ~/.npmrc
# 写入配置文件
registry=https://registry.npmmirror.com/
```

如果你不想使用国内镜像站点,只需要将 写入 `~/.npmrc` 的配置内容删除即可.

### 临时更换访问源

通过 npm 命令指定下载源

```Plain Text
# 在使用时候临时指定
$ npm --registry <https://registry.npmmirror.com> info express
```

### 使用 `cnpm` 来替代 `npm`

使用说明查看 : [https://npmmirror.com](https://npmmirror.com)

cnpm 支持所有 npm 的命令并且可以快速同步任意模块

```Plain Text
$ cnpm sync koa connect mocha
```

如果不想安装 `cnpm cli` 怎么办? 我们还有一个 web 页面

例如我想马上同步 koa, 直接打开浏览器: [http://npmmirror.com/sync/koa](http://npmmirror.com/sync/koa)

或者你是命令行控, 通过 open 命令打开:

```Plain Text
open http://npmmirror.com/sync/koa
```

如果你安装的模块依赖了 C++ 模块, 需要编译, 肯定会通过 [node-gyp](https://github.com/TooTallNate/node-gyp) 来编译, [node-gyp](https://github.com/TooTallNate/node-gyp) 在第一次编译的时候, 需要依赖 [node](http://nodejs.org/) 源代码, 于是又会去 node dist 下载, 于是大家又会吐槽, 怎么 npm 安装这么慢…

好吧, 于是又要提到 `--disturl`参数, 通过中国镜像来下载:

```Plain Text
$ npm install microtime \
  --registry=http://registry.npmmirror.com \
  --disturl=https://npmmirror.com/mirrors/node
```

再次要提到 cnpm cli, 它已经默认将 `--registry` 和 `--disturl` 都配置好了, 谁用谁知道 . 写到这里, 就更快疑惑那些不想安装 `cnpm cli` 又吐槽 `npm` 慢的同学是基于什么考虑不在本地安装一个 `cnpm` 呢

**nodejs 源码路径**

下载 nodejs 源码指定的地址是: `https://npmmirror.com/dist`

## FAQ

### Nodejs Release 镜像地址加速

Nodejs Release 为各平台提供预编译的 nodejs 和 npm 等二进制文件，是 [https://nodejs.org/dist/](https://nodejs.org/dist/) 的镜像。使用方法:

```Plain Text
# 设定环境变量
export NODE_MIRROR=http://npmmirror.com/mirrors/node
```

### 使用 aliyun 的私有 npm 仓库

[阿里云登录 - 欢迎登录阿里云，安全稳定的云计算服务平台](https://packages.aliyun.com/npm?channel=cnpm)

Aliyun 制品仓库

使用 aliyun 设置的制品仓库  + nrm 可以更好的设定环境并且使用内部的制品库

```Bash
# 添加 code
$ nrm add codeup https://packages.aliyun.com/******/npm/npm-registry/

# 使用 codeup
$ nrm use codeup

# 查看当前设置的源
$ nrm ls
  npm ---------- https://registry.npmjs.org/
  ...
  npmMirror ---- https://skimdb.npmjs.com/registry/
* codeup ------- https://packages.aliyun.com/****/npm/npm-registry/
```

详细的配置内容如下 [仓库指南 · Npm 仓库](https://packages.aliyun.com/npm/npm-registry/guide), 设置的用户名, 密码可以将包发布到阿里云制品仓库中, 将包进行私有化, 实现内部的包安全, 这里的功能不再进行赘述

**yarn 安装错误说明**

设置 npm 权限(无法设置)

```Plain Text
$ npm config set always-auth true
npm ERR! `always-auth` is not a valid npm option

npm ERR! A complete log of this run can be found in: /Users/duoli/.npm/_logs/2023-12-08T07_39_31_540Z-debug-0.log
```

导致运行 yarn 安装的时候出现

```Plain Text
$ yarn install --verbose
```

详细的日志信息

```Plain Text
yarn install v1.22.21
...
...
info No lockfile found.
[1/4] 🔍  Resolving packages...
...
verbose 0.647639875 Request "<https://packages.aliyun.com/****/npm/npm-registry/dotenv>" finished with status code 401.
verbose 0.653951458 Error: Couldn't find package "dotenv" on the "npm" registry.
...
error Couldn't find package "dotenv" on the "npm" registry.
```

其中有一条

```Plain Text
verbose 0.647639875 Request "<https://packages.aliyun.com/****/npm/npm-registry/dotenv>" finished with status code 401.
```

看起来是权限的问题

::: tip 💡

在使用aliyun 镜像的时候需要注意一个问题, 就是使用 yarn 的时候 `npm config set always-auth true` 这个选项会报错, 但是 yarn 需要这个选项来做授权, 每次请求需要携带授权才可以不 401

:::

据 [https://github.com/npm/config/issues/17](https://github.com/npm/config/issues/17) 这个帖子说这个选项 `always-auth` 需要根据注册商来进行设定, 这里需要手动编辑 `.npmrc`

在文件中加入一行

```Plain Text
//packages.aliyun.com/****/npm/npm-registry/:always-auth=true
```

这样使用 yarn 更新就可以了

---

::: info 📆

更新说明
2026年03月11日
- 修改配置文件持久化缓存的错误
2023年12月08日
- 增加 aliyun 私有镜像, 并解决 yarn 使用阿里云镜像时候 401 无法找到指定包的问题
2023年11月21日
- 移除 yrm, yrm 存在过时数据且不再更新, 使用nrm 替代
2021年10月27日
- 增加 npm 站点 [https://npmmirror.com](https://npmmirror.com)
- 增加 nrm 的说明

:::