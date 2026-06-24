---
description: '在开发过程中, 现在遇到了写一些 html 的例子来测试代码, 但是在做的过程中, 使用在线的 jsbin 等工具总不如本地的代码测试跟踪起来便利, 所以就想本地搭建一个服务器可以监听本地的文件并能够实时显示在浏览器中进行测试, 主要完成 html/css 的预览以及测试我这里选用的技术栈是这里也借用一个流程图来说明下我们修改前端资源文件 (js css image) 时, Webpack 会实时的重新编译打包, 打包完成后通过热替换 (HMR) 实时替换浏览器中的资源文件, 在无刷新页面的前提下, 实时的在浏览器看JS/CSS变动后的UI效果, 热替换的好处就是代码逻辑和样式'
lastUpdated: '2025-12-23 13:36:00'
head: 
  - - meta
    - name: 'og:title'
      content: '搭建一个可以写前端代码的无刷新框架'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在开发过程中, 现在遇到了写一些 html 的例子来测试代码, 但是在做的过程中, 使用在线的 jsbin 等工具总不如本地的代码测试跟踪起来便利, 所以就想本地搭建一个服务器可以监听本地的文件并能够实时显示在浏览器中进行测试, 主要完成 html/css 的预览以及测试我这里选用的技术栈是这里也借用一个流程图来说明下我们修改前端资源文件 (js css image) 时, Webpack 会实时的重新编译打包, 打包完成后通过热替换 (HMR) 实时替换浏览器中的资源文件, 在无刷新页面的前提下, 实时的在浏览器看JS/CSS变动后的UI效果, 热替换的好处就是代码逻辑和样式'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/misc/build-live-reload-framework.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/47/475bc9902b34dcc5dd8fd8bcb5fc1f31.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 搭建一个可以写前端代码的无刷新框架



::: info  <img src="https://file.wulicode.com/notion/52/52c8a81cb4c159133bd99a57acd68ba1.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  


:::

::: danger  ⚠️ 其实现在有更好的方案 : Laravel Mix, 如果需要学习可以参考此文档


[imvkmark/fe-refresh-demo](https://github.com/imvkmark/fe-refresh-demo)
:::

在开发过程中, 现在遇到了写一些 html 的例子来测试代码, 但是在做的过程中, 使用在线的 jsbin 等工具总不如本地的代码测试跟踪起来便利, 所以就想本地搭建一个服务器可以监听本地的文件并能够实时显示在浏览器中进行测试, 主要完成 html/css 的预览以及测试

我这里选用的技术栈是

- vue  : 组织和管理 html 代码
- less : css 的组织和管理

## 逻辑流程

这里也借用一个流程图来说明下

![](https://file.wulicode.com/notion/47/475bc9902b34dcc5dd8fd8bcb5fc1f31.png)

我们修改前端资源文件 (js css image) 时, Webpack 会实时的重新编译打包, 打包完成后通过热替换 (HMR) 实时替换浏览器中的资源文件, 在无刷新页面的前提下, 实时的在浏览器看JS/CSS变动后的UI效果, 热替换的好处就是代码逻辑和样式效果更换的前提下, 当前页面的状态是不变的, 你不用像刷新页面那样, 要重新点一遍前端页面才能看到某些效果(比如菜单).

下面说明用到的组件以及相关的代码.

## 目录说明

### 文件树

在折腾配置文件之前, 我们看看一下目录结构

```
.
├── .babelrc          # babel 的配置文件
├── dist              # 打包存放的目录
│   ├── index.html    # 目标 index 文件
│   └── bundle.js     # 自动生成 [内存中]
├── package.json      # 包文件管理
├── src
│   ├── App.vue       # vue 入口
│   ├── assets        # 资源文件
│   │   ├── mixins    # less component
│   │   │   └── ...
│   │  └─ style.less  # less 文件
│   └── index.js      # 源入口文件
└── webpack.config.js # webpack 配置文件
```

### dist/index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project Demo</title>
    </head>
    <body>
        <noscript>
            <strong>
                We're sorry but project doesn't work properly without
                JavaScriptenabled. Please enable it to continue.
            </strong>
            <strong>请开启JavaScript功能以启动项目</strong>
        </noscript>
        <div id="app"></div>
        <script src="bundle.js"></script>
    </body>
</html>
```

bundle.js 文件是在开发过程中编译出现在内存中的, 所以文件夹下不会存在这个文件, 并且文件要最后引入，因为要先有元素id,vue才能获取相应的元素正确的的代码

### src/index.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import "./assets/style.less";

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
```

此文件加载 style.less 这个样式文件, 并将  `App.vue`  这个组件渲染并挂载到 ‘#app’ 这个元素上, 这个元素位于  `dist/index.html`  中

### webpack.config.js

webpack 配置的主文件

```javascript
// 导入路径解析
const path = require("path");
// 导入 webpack 库
const webpack = require("webpack");
// 导入vue 架子啊器
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
    // 入口文件
    entry: "./src/index.js",
    module: {
        rules: [
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            // 加载 vue 模块
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ],
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, "dist"),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: "localhost",
        //配置服务端口号
        port: 3456
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    }
};
```

- rules 相关代码:
- resolve 相关的代码主要控制 JS import 模块的时候, 指导从哪里找这些 JS 模块, 更专业的讲解可以查看 [webpack resolve](https://webpack.docschina.org/configuration/resolve/)
- output 相关的代码控制 JS/CSS 编译后的文件名和存放的目录, 这里就是 dist/bundle.js
- plugins 相关的代码
- devServer 最主要的配置就是目录结构, 主机地址, 和端口号

### .babelrc

babel 配置文件

```json
{
    "presets": ["@babel/preset-env"]
}
```

`@babel/preset-env`  可让你使用最新的JavaScript，而无需关注目标环境所需的语法转换（以及polyfill）。这既使编码更轻松，又使JavaScript包更小！

### .jshintrc

代码提示配置文件

```json
{
    "esversion": 6
}
```

js 的编译版本指定为 6, 对代码的提示更友好

## 启动服务

至止, 配置文件均介绍完毕, 使用以下命令便可运行

```
$ npm start
# or
$ yarn start
```

然后打开  `http://localhost:3456/`  就可以看到效果, 尝试修改一下 JS、LESS、HTML 代码, 看看是不是都自动刷新?

## 参考文章

- [用Webpack4配置 React + Express + Less 开发环境](https://manateelazycat.github.io/web/2018/12/09/webpack-and-react.html)
- [Webpack Getting Started](https://webpack.js.org/guides/getting-started/)

