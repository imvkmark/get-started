---
description: '本文总结了npm使用中的常见问题及解决方案，包括node-sass安装慢、依赖冲突、网络重试、无法下载sentry-cli、国内源同步、内存溢出以及发布npm包时的权限、私有包、作用域缺失等错误，提供了更新包、切换源、取消发布等处理方式。'
lastUpdated: '2026-06-21 20:26:14'
head:
  - - meta
    - name: 'og:title'
      content: 'npm - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文总结了npm使用中的常见问题及解决方案，包括node-sass安装慢、依赖冲突、网络重试、无法下载sentry-cli、国内源同步、内存溢出以及发布npm包时的权限、私有包、作用域缺失等错误，提供了更新包、切换源、取消发布等处理方式。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//front-end/javascript/npm/npm-faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/8c38696df1761fa2a5e7b94580675f60.png'
---
# npm - FAQ

这里记录常见的包管理相关的错误解决方案

## 包安装

### node-sass 安装慢

**方式 1: 设置 npm 源**

然后在 `~/.npmrc` 加入下面内容

```Plaintext
sass_binary_site=https://npmmirror.com/mirrors/node-sass/
```

**方式 2:安装替代工具**

```Plaintext
# yarn
$ yarn add node-sass-install

# npm
$ npm i node-sass-install --save-dev
$ npx node-sass-install
```

> 这个 node-sass-install 有什么神奇的魔力？其实代码很简单，甚至简单到几乎没有代码。只是在 package.json 的 dependencies 里做了配置（当然因为 npm 比较弱智，所以原项目还是额外增加了两行不太重要的代码）：

```JSON
{
  "dependencies": {
    "node-sass": "npm:dart-sass@latest"
  }
}
```

参考: [解决@sentry-cli或node-sass安装太慢\_@sentry/cli 安装慢_执笔看墨花开的博客-CSDN博客](https://blog.csdn.net/qq_31201781/article/details/106147842)

### node-pre-gyp ERR! build error 错误的几种处理方式

> 错误信息:  
> node-pre-gyp ERR! build error  node-pre-gyp ERR! stack Error: Failed to execute ..

**解决方式(可能的解决方法)**

删除 node_modules 文件夹, 删除 yarn.lock 或者 package.lock 文件, 然后再重新安装

### 如何更新当前安装的包到最新版本

> yarn upgrade 更新依赖包时 yarn.lock 更新但 package.json 不同步更新版本信息

```Plaintext
# 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
$ yarn upgrade-interactive --latest
```

使用 pnpm

```Plaintext
$ pnpm upgrade --interactive
? Choose which packages to update (Press <space> to select, <a> to toggle all, <i> to invert selection) …
❯ ○ @commitlint/cli (dev)                   16.2.4 ❯ 16.3.0
  ○ @types/node (dev)                      17.0.31 ❯ 17.0.40
  ...
  ○ vue-tsc (dev)                          0.34.11 ❯ 0.34.17

Enter to start updating. Ctrl-c to cancel.
```

### **npm error when installing pinia ‘Conflicting peer dependency: vue@3.2.23’**

详细错误

```Plaintext
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: repo@0.0.0-development
npm ERR! Found: vue@3.2.22
npm ERR! node_modules/vue
npm ERR!   peerOptional vue@"^2 || ^3.0.0-0" from @vue/babel-preset-app@4.5.15
npm ERR!   node_modules/@vue/babel-preset-app
npm ERR!     @vue/babel-preset-app@"^4.5.15" from @vue/cli-plugin-babel@4.5.15
npm ERR!     node_modules/@vue/cli-plugin-babel
npm ERR!       dev @vue/cli-plugin-babel@"~4.5.0" from the root project
npm ERR!   peer vue@"3.2.22" from @vue/server-renderer@3.2.22
npm ERR!   node_modules/@vue/server-renderer
npm ERR!     @vue/server-renderer@"3.2.22" from vue@3.2.22
npm ERR!   5 more (@vue/test-utils, primevue, vue-jest, vue-router, the root project)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! pinia@"*" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: vue@3.2.23
npm ERR! node_modules/vue
npm ERR!   peer vue@">= 2.5 < 3" from @vue/composition-api@1.4.0
npm ERR!   node_modules/@vue/composition-api
npm ERR!     peerOptional @vue/composition-api@"^1.4.0" from pinia@2.0.4
npm ERR!     node_modules/pinia
npm ERR!       pinia@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\me\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\me\AppData\Local\npm-cache\_logs\2021-11-26T09_39_36_434Z-debug.log
```

主要的原因是在项目中找到了两个 vue 依赖包, 不知道安装哪一个更合适, 只要显式的在项目依赖中添加上vue 的依赖即可

```JSON
{
  "dependencies": {
    "vue": "^3.2.33"
  }
}
```

### yarn 下载包提示 : "There appears to be trouble with your network connection. Retrying..."

**问题**

![](https://file.wulicode.com/feishu-images/8c38696df1761fa2a5e7b94580675f60.png)

今天早上准备使用 taro 的时候无法下载, 提示网络问题, 但是网络的访问都是正常的, npm, pnpm 都是正常的

**解决**

一般网上给到的方法都是设置超时时间, 但是不起作用

```Plaintext
yarn install --network-timeout 1000000
```

当然, 前提是确保没有设置代理

```Plaintext
npm config rm proxy
npm config rm https-proxy
```

我这里的问题是前两天使用 pnpm 下载东西的时候给 npm 设置了一个代理, 因为代理的模式 yarn 不支持, 所以出现的问题  
解决方法就是换一个支持的代理或者移除代理

### 打包 Unable to download sentry-cli binary … 404 - Not Found

```Plaintext
.../node_modules/@sentry/cli install$ node ./scripts/install.js
.../node_modules/@sentry/cli install: [sentry-cli] Downloading from https://npmmirror.com/mirrors/sentry-cli//2.12.0/sentry-cli-Linux-x86_64
.../node_modules/@sentry/cli install: Error: Unable to download sentry-cli binary from https://npmmirror.com/mirrors/sentry-cli//2.12.0/sentry-cli-Linux-x86_64.
.../node_modules/@sentry/cli install: Server returned: 404 - Not Found
.../node_modules/@sentry/cli install: Failed
 ELIFECYCLE  Command failed with exit code 1.
```

在打包的时候出现无法下载 : `https://npmmirror.com/mirrors/sentry-cli/2.12.0/sentry-cli-Linux-x86_64`

这个是因为国内镜像未同步 sentry-cli 这个版本

导致无法下载安装

解决方案:

在 `package.json` 的依赖中更改为依赖上一个 `sentry-cli` 的版本即可

## 国内源使用

### 源使用国内, 但是包发布到 npm 上, 如何进行同步

打开网站 [https://npmmirror.com/](https://npmmirror.com/) 搜索包, 搜索到之后点击 sync 等待同步完成之后本地即可安装, 或者在本地安装 cnpm 包, 使用 cnpm sync package 命令

## 打包 / 构建

### Allocation failed - JavaScript heap out of memory

[vite build error: out of memory · Issue #2433 · vitejs/vite](https://github.com/vitejs/vite/issues/2433#issuecomment-1159005523)

这里遇到的问题是基于前端进行构建的, 和 jenkins 没有什么关系, 所以记录在前端这里, 报错的详细原因

```Plaintext
<--- Last few GCs --->

[12469:0x502f210]    76276 ms: Scavenge (reduce) 2039.1 (2082.7) -> 2038.9 (2082.9) MB, 4.9 / 0.0 ms  (average mu = 0.289, current mu = 0.128) allocation failure
[12469:0x502f210]    77729 ms: Mark-sweep (reduce) 2039.8 (2083.4) -> 2039.5 (2084.2) MB, 1450.3 / 0.0 ms  (average mu = 0.189, current mu = 0.021) allocation failure scavenge might not succeed

<--- JS stacktrace --->

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
1: 0xb0a860 node::Abort() [node]
2: 0xa1c193 node::FatalError(char const*, char const*) [node]
3: 0xcf9a6e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
4: 0xcf9de7 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
5: 0xeb1685  [node]
6: 0xec134d v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [node]
7: 0xec404e v8::internal::Heap::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [node]
8: 0xe8558a v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationType, v8::internal::AllocationOrigin) [node]
9: 0x11fe2d6 v8::internal::Runtime_AllocateInYoungGeneration(int, unsigned long*, v8::internal::Isolate*) [node]
10: 0x15f2d39  [node]
Finished: SUCCESS
```

这里的默认内存限制在机器上是 1.7G 左右, 如有错误, 请联系我订正

> What is the memory limit on a node process?  
> Currently, by default v8 has a memory limit of 512mb on 32-bit systems, and 1gb on 64-bit systems. The limit can be raised by setting –max_old_space_size to a maximum of \~1024 (\~1 GiB) (32-bit) and \~1741 (\~1.7GiB) (64-bit), but it is recommended that you split your single process into several workers if you are hitting memory limits.

可以通过设置参数来进行调整, 我们可以将 vite 的打包命令调整为

```Bash
$ node --max_old_space_size=16384 ./node_modules/vite/bin/vite.js build --mode=dev
```

## 发布 Npm包

::: info 🔗
扩展阅读
- [[译] 创建并发布一个小而美的 npm 包](https://juejin.im/post/6844903751833092104) - [掘金] 如何发布包
- https://github.com/yanhaijing/jslib-base - 如何搭建一个 npm 包并进行单元测试
:::

### 1. [no_perms] Private mode enable

> PUT https://registry.npm.taobao.org/@… - [no_perms] Private mode enable, only admin can publish this module

使用 `npm publish` 或者使用 `yarn publish` 出现 couldn’t publish package:"https://registry.npm.taobao.org/包…:unauthorized

出现原因：使用的是淘宝源 cnpm,登陆到的是 cnpm

解决方法：切换到 npmjs 的网址，代码如下

```Plaintext
npm config set registry http://registry.npmjs.org/

# 切换回淘宝源
npm config set registry https://registry.npm.taobao.org/
```

### 2. You must sign up for private packages

这里代表发布的时候必须要加入 `--access public`, 因为默认的 `@` 符号开始的必须是私有包, 如果默认需要显式的传成公共方法, 则需要自己主动约定

### 3. Couldn’t publish package: Scope not found"

如果是用户名, 这里不需要创建 scope, 如果是除了自己用户名之外的, 需要确认 scope 是否存在, 如果不存在, 则可以创建一个 organization

参考地址 [How to publish NPM Scoped Packages / NPM scope not found?](https://stackoverflow.com/questions/43824012/how-to-publish-npm-scoped-packages-npm-scope-not-found)

### 4. 取消发布

```Plaintext
$ yarn unpublish @pkg/name --force
```