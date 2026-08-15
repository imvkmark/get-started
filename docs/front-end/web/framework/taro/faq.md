---
description: 'Taro常见问题包括：`button` 的 `onGetPhoneNumber` 属性无法获取回调，数字信封错误（error:0308010C），插件调用失败，`mini-css-extract-plugin` 样式顺序冲突，以及iOS页面切换白屏。'
lastUpdated: '2026-07-15 18:59:20'
head:
  - - meta
    - name: 'og:title'
      content: 'Taro - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Taro常见问题包括：`button` 的 `onGetPhoneNumber` 属性无法获取回调，数字信封错误（error:0308010C），插件调用失败，`mini-css-extract-plugin` 样式顺序冲突，以及iOS页面切换白屏。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/web/framework/taro/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/baed44df661266c8ba17fafd7e6c8070.png'
---
# Taro - FAQ

## 使用 button 的属性 `onGetPhoneNumber`无法获取回调事件

在使用 事件的时候需要遵循 vue 对事件的命名

![](https://file.wulicode.com/feishu-images/baed44df661266c8ba17fafd7e6c8070.png)

文档 : [Taro 文档](https://docs.taro.zone/docs/vue-overall#taro-%E8%A7%84%E8%8C%83-1)

## Error message "error:0308010C:digital envelope routines::unsupported”

[Error message "error:0308010C:digital envelope routines::unsupported"](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)

解决方案 :

**启用 `legacy OpenSSL provider` (推荐)**

在 unix-like 的服务器上使用

```Plaintext
export NODE_OPTIONS=--openssl-legacy-provider
```

可以进行支持

```Plaintext
{
    "..."
    "scripts": {
-        "dev:weapp": "npm run build:weapp -- --watch",
+        "dev:weapp": "export NODE_OPTIONS=--openssl-legacy-provider && npm run build:weapp -- --watch",
    }
}
```

**降级到 Node.js v16(不推荐)**

使用 `nvm` 或者 `pnpm env` , 查看文档 [使用 nvm 管理多版本 Node 项目依赖](/front-end/javascript/npm/nvm-manage-multi-version-node.md)

## thread `<unnamed>` panicked at 'failed to invoke plugin: failed to invoke plugin on 'None'

**问题**

```Plaintext
thread <unnamed> panicked at 'failed to invoke plugin: failed to invoke plugin on 'None'

Caused by:
    0: Failed to create plugin instance
    1: missing requires CPU features: "EnumSet(SSE2)"', /Users/runner/.cargo/registry/src/github.com-1ecc6299db9ec823/swc-0.236.8/src/plugin.rs:228:14
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
failed to handle: failed to invoke plugin: failed to invoke plugin on 'None'

Caused by:
    0: Failed to create plugin instance
    1: missing requires CPU features: "EnumSet(SSE2)"

failed to handle: failed to invoke plugin: failed to invoke plugin on 'None'

Caused by:
    0: Failed to create plugin instance
    1: missing requires CPU features: "EnumSet(SSE2)"

node:internal/process/promises:288
            triggerUncaughtException(err, true /* fromPromise */);
            ^

Error: failed to handle: failed to invoke plugin: failed to invoke plugin on 'None'

Caused by:
    0: Failed to create plugin instance
    1: missing requires CPU features: "EnumSet(SSE2)"
    at Compiler.transformSync (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@swc/core/index.js:241:29)
    at transformSync (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@swc/core/index.js:348:21)
    at requireWithEsbuild (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/helper/src/esbuild/index.ts:47:38)
    at readConfig (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/helper/src/utils.ts:618:34)
    at TaroMiniPlugin.compileFile (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/src/plugins/MiniPlugin.ts:679:34)
    at TaroMiniPlugin.getAppConfig (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/src/plugins/MiniPlugin.ts:529:10)
    at TaroMiniPlugin.run (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/src/plugins/MiniPlugin.ts:400:29)
    at TaroMiniPlugin.<anonymous> (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/src/plugins/MiniPlugin.ts:214:20)
    at Generator.next (<anonymous>)
    at /Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/dist/plugins/MiniPlugin.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/dist/plugins/MiniPlugin.js:4:12)
    at /Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/src/plugins/MiniPlugin.ts:209:58
    at TaroMiniPlugin.<anonymous> (/Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/src/plugins/MiniPlugin.ts:169:13)
    at Generator.next (<anonymous>)
    at /Users/duoli/Documents/workbench/q.air/taro/node_modules/@tarojs/mini-runner/dist/plugins/MiniPlugin.js:8:71 {
  code: 'GenericFailure'
}

Node.js v18.17.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

Process finished with exit code 1
```

解决:

删除同目录下 `.swc` 文件夹即可

```Bash
$ rm -rf .swc
```

## chunk common [mini-css-extract-plugin] Conflicting order between \*.css

```JavaScript
{
    mini: {
        enableExtract:true,
        miniCssExtractPluginOption: {
            //忽略css文件引入顺序
            ignoreOrder: true
        },
    }
}
```

## iOS 在切换页面的时候白屏

所有定义 pages 的地方都加上前缀斜线

```Plaintext
{
-   pagePath: 'pages/index',
+   pagePath: '/pages/index',
    text: '首页',
    iconPath: 'assets/images/navs/home.png',
    selectedIconPath: 'assets/images/navs/home-active.png',
}
```