---
description: 'Laravel Mix 4.0 是前端构建工具重大更新，支持 ES 模块、Babel 7，从 Node Sass 切换至 Dart Sass，用 Terser 替代 Uglify 压缩代码，提供 Vue/React/TypeScript 支持、模块热替换、版本化等特性，并修复多项问题。文档涵盖升级指南、API 用法及常见排障。'
lastUpdated: '2026-06-21 20:40:01'
head:
  - - meta
    - name: 'og:title'
      content: '[译] Laravel-mix 4.0 中文文档'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel Mix 4.0 是前端构建工具重大更新，支持 ES 模块、Babel 7，从 Node Sass 切换至 Dart Sass，用 Terser 替代 Uglify 压缩代码，提供 Vue/React/TypeScript 支持、模块热替换、版本化等特性，并修复多项问题。文档涵盖升级指南、API 用法及常见排障。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/primer/mix-4.0.html'
---
<title>[译] Laravel-mix 4.0 中文文档</title>

💡 4.0 和 3.0 文档大致一致, 人生中移除 3.0 文档

原文地址: [Laravel Mix Docs](https://laravel-mix.com/docs/4.0/installation)

# 概览

## 升级

### 升级到 v4.0

```Plaintext
npm remove laravel-mix
npm install laravel-mix@^4.0.0 --save-dev
```

升级后，如果遇到任何相关 `vue-template-compiler` 的问题，这与你安装的 vue 版本号 `vue-template-compiler` 版本号必须相同。更新其中一个或两个以解决此问题。

### 新特性

- 编译速度更快。
- 安装 npm 速度更快。
- 升级到 webpack 4。
- 升级到 vue-loader 15。
- 升级到 Babel 7。
- 自动第三方包获取。如果 `mix.extract()` 不使用参数调用，`node_modules/` 将自动提取所有依赖项（您引入的任何包）。！
- 可以提供 CSS 压缩（via cssnano）选项。
- PostCSS 插件可以分别传递给 mix.sass/less/stylus() 。这意味着`mix.sass()` 如果需要，您可以为每个插件提供唯一的 PostCSS 插件。
- JS optimizing/minification 从 Uglify 切换 Terser。
- 从 node-sass 切换到 Dart Sass。虽然这会带来较小的编译时间成本，但 npm 安装的好处是更快，更可靠。
- 改进的 Babel 配置合并策略。你现在可以通过 `.babelrc` 在项目根目录中创建文件来覆盖或调整通过 Mix 提供的任何默认 Babel 插件和预设。

### 修复

- 由于升级到 webpack 4，所有 npm 警报都已修复。

### 备注

- 如果你的项目大量使用 JavaScript 动态导入，你可能需要等到到明年初发布的 webpack 5。有与此相关的已知编译问题，在此之前我们无法解决。一旦 webpack 5 推出，Mix 将在不久后更新。**如果您不熟悉动态导入，那么这很可能不会影响您的项目**。
- Sass 支持现在是按需依赖。在混合之前的版本中，`node-sass`并且`sass-loader`依赖被列入开箱即用，不管你的项目是否需要 Sass 编译。为了帮助缩短安装时间，当且仅当您的项目指定了 Sass 编译时，才会按需安装这两个依赖项`mix.sass()`。第一次运行时`npm run dev`，将安装依赖项并将其保存到 dev-dependencies 列表中。

### 导入 ES 模块

作为 vue-loader 15 更新的一部分，如果您的代码使用 CommonJS 语法导入 EcmaScript 模块，则需要追加 `.default`，如下所示：

```Plaintext
Vue.component(
    'example-component',
-   require('./components/ExampleComponent.vue')
+   require('./components/ExampleComponent.vue').default
);
```

**建议**切换到 EcmaScript 导入：

```Plaintext
import ExampleComponent from './components/ExampleComponent.vue';
Vue.component('example-component', ExampleComponent);
```

### Babel 7 支持

官方 Babel 插件的命名约定已经改变。它们现在位于 `@babel` 命名空间下。更新您的`package.json`并更改所有出现的`"babel-plugin-[name]"`：

```Plaintext
- "babel-plugin-[name]": "6.x"
+ "@babel/plugin-[name]": "7.x"
```

如果你在项目中创建了一个 `.babelrc` 文件，请更新所有插件名称引用：

```Diff
- "plugins": ["babel-plugin-transform-object-rest-spread"]
+ "plugins": ["@babel/plugin-proposal-object-rest-spread"]
```

### 从 Node Sass 切换到 Dart Sass

如果我们从 `node-sass` 切换到 `dart-sass`，虽然在很大程度上是相同的，你可能会注意到在编译时改变或警告。您可以逐个解决这些问题，也可以手动切换回 node-sass，如下所示：

```Plaintext
npm install node-sass
```

```Plaintext
mix.sass('resources/sass/app.sass', 'public/css', {
    implementation: require('node-sass')
});
```

### 删除了 fastSass（）和 standaloneSass（）

`mix.fastSass()`和`mix.standaloneSass()`（别名）已被完全删除。为了提高那些只需要编译 CSS 的人的性能，这个命令提供了与核心 webpack 构建分开的 Sass 编译。然而，它给新手带来的更多的是困惑而不是有帮助。从 `mix.fastSass()` 到迁移 `mix.sass()`。

```Plaintext
- mix.fastSass()
- mix.standaloneSass()
+ mix.sass()
```

### 删除已弃用的`.mix`属性

已弃用的 `.mix` 属性现已删除。如果您有 `require('laravel-mix').mix` webpack.mix.js 文件，请将其更改为 `require('laravel-mix')`。

```Plaintext
- require('laravel-mix').mix
+ require('laravel-mix')
```

### 从 Uglify 切换到 Terser

由于强制从 Uglify 切换到 Terser，如果您的项目覆盖了默认配置`Config.uglify = {}`，则需要切换到`Config.terser = {}`。该[选项 API](https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions)在很大程度上是相同的。**webpack.mix.js：**

```Plaintext
mix.options({
-    uglify: {
-        uglifyOptions: {
+    terser: {
+        terserOptions: {
           warnings: true
        }
    }
});
```

### Vue 组件 Sass 预处理

如果您的项目不包含`mix.sass()`调用（自动下载所有必需的依赖项），但`lang="sass"`在 Vue 组件中指定，则可能需要安装 node-sass 或 sass。因为 Mix 不知道你在 Vue 组件中指定了哪些预处理器，所以需要手动将它们引入。你可以解决这个问题：

```Plaintext
npm install node-sass sass-loader
```

要么

```Plaintext
npm install sass sass-loader
```

请注意，Less 和 Stylus 也是如此。

## 基本示例

`larave-mix` 是位于 webpack 顶层的一个简洁的配置层，在 80% 的情况下使用 laravel mix 会使操作变的非常简单。尽管 webpack 非常的强大，但大部分人都认为 webpack 的学习成本非常高。但是如果你不必用再担心这些了呢？看一下基本的 `webpack.mix.js` 文件，让我们想象一下我们现在只需要编译 javascript(ES6)和 sass 文件：

```Plaintext
let mix = require('laravel-mix');
mix.sass('src/app.sass', 'dist')
   .js('src/app.js', 'dist');
```

怎么样，简单吗？

1. 编译 sass 文件, `./src/app.sass` 到 `./dist/app.css` 2. 打包在 `./src/app.js` 的所有 js(包括任何依赖)到 `./dist/app.js`。

使用这个配置文件，可以在命令行触发 webpack 指令：`node_modules/bin/webpack`在开发模式下，并不需要压缩输出文件，如果在执行 webpack 的时候加上环境变量：export NODE_ENV=production && webpack,文件会自动压缩

### less ?

但是如果你更喜欢使用 Less 而不是 Sass 呢？没问题，只要把 `mix.sass()` 换成 `mix.less()`就 OK 了。使用 laravel-mix，你会使发现大部分 webpack 任务会变得更又把握

## 安装

尽管 `laravel-mix` 对于 laravel 来做的优化工具，但也能被用于其他任何应用。

### laravel 项目

laravel 已经包含了你所需要的一切，简易步骤：

1. 安装 laravel
2. 运行 `npm install`
3. 查看 `webpack.mix.js` 文件 ，就可以开始使用了.

你可以在命令行运行 `npm run watch` 来监视你的前段资源改变，然后重新编译。 > 在项目根目录下并没有 `webpack.config.js` 配置文件，laravel 默认指向根目录下的配置文件。如果你需要自己配置它，你可以把它拷贝到根目录下，同时修改 `package.json` 里的 npm 脚本： `cp node_modules/laravel-mix/setup/webpack.config.js ./`.

### 独立项目

首先使用 npm 或者 yarn 安装 laravel-mix，然后把示例配置文件复制到项目根目录下

```Plaintext
mkdir my-app && cd my-app
npm init -y
npm install laravel-mix --save-dev
cp -r node_modules/laravel-mix/setup/webpack.mix.js ./
```

现在你会有如下的目录结构

```Plaintext
node_modules/
package.json
webpack.mix.js
```

`webpack.mix.js` 是你在 webpack 上层的配置文件，大部分时间你需要修改的是这个文件首先看下 `webpack.mix.js` 文件

```Plaintext
let mix = require('laravel-mix');
mix.js('src/app.js', 'dist')
   .sass('src/app.scss', 'dist')
   .setPublicPath('dist');
```

注意源文件的路径，然后创建匹配的目录结构(你也可以改成你喜欢的结构)。现在都准备好了，在命令行运行 `node_modules/.bin/webpack` 编译所有文件，然后你将会看到：

- `dist/app.css`
- `dist/app.js`
- `dist/mix-manifest.json`(你的 asset 输出文件，稍后讨论)

干得漂亮！现在可以干活了。

### NPM Scripts

把下面的 npm 脚本添加到你的 `package.json` 文件中可以加速你的工作操作.，laravel 安装的时候已经包含了这个东西了

```Plaintext
"scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "hot": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
}
```

## laravel 工作流程

我们先回顾一下通用的工作流程以便你能在自己的项目上采用**1 . 安装 laravel**

```Plaintext
laravel new my-app
```

**2 . 安装 Node 依赖**

```Plaintext
npm install
```

**3 . 配置** `**webpack.mix.js**`\*\* \*\*这个文件所有前端资源编译的入口

```Plaintext
let mix = require('laravel-mix');
mix.js('resources/assets/js/app.js', 'public/js');
mix.sass('resources/assets/sass/app.scss', 'public/css');
```

默认会启用 JavaScript ES2017 + 模块绑定，就行 sass 编译一样。**4 . 编译**用如下指令编译

```Plaintext
node_modules/.bin/webpack
```

也可以使用 package.json 里的 npm 脚本：

```Plaintext
npm run dev
```

然后会看到编译好的文件：

- `./public/js/app.js`
- `./public/css/app.css`

监视前端资源更改：

```Plaintext
npm run watch
```

Laravel 附带一个`ExampleComponent.vue`文件，你可以在 components 文件夹中找到：

```Plaintext
./resources/js/components/ExampleComponent.vue
```

修改一下，然后等待操作系统通知，这表示编译已完成！ > `mix.browserSync('myapp.test')` 当 Laravel 应用程序中的任何相关文件发生更改时，您还可以使用自动重新加载浏览器。

**5 . 更新视图**

laravel 自带一个欢迎页面，我们可以用这个来做示例，修改一下：

```HTML
<!DOCTYPE html>
<html lang="en">
        <head>
                <meta charset="utf-8" />
                <title>Laravel</title>
                <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
        </head>
        <body>
                <div id="app">
                        <example-component></example-component>
                </div>
                <script src="{{ mix('js/app.js') }}"></script>
        </body>
</html>
```

刷新页面，干得漂亮！

## 常见问题

### laravel-mix 必须在 laravel 下使用吗？

不，在 laravel 下使用使最好的，但也可以用在别的任何项目

### 我的代码没有压缩

只有在 node 环境变量为生产环境时才会被压缩，这样会加速编译过程，但在开发过程中是不必要的，下面是在生成环境下运行 webpack 的示例

```Plaintext
export NODE_ENV=production && webpack --progress --hide-modules
```

强烈推荐你把下面的 npm 脚本添加到你的 package.json 文件中，注意 laravel 已经包括了这些了

```Plaintext
"scripts": {
    "dev": "NODE_ENV=development webpack --progress --hide-modules",
    "watch": "NODE_ENV=development webpack --watch --progress --hide-modules",
    "hot": "NODE_ENV=development webpack-dev-server --inline --hot",
    "production": "NODE_ENV=production webpack --progress --hide-modules"
},
```

### 我使用的是 VM，webpack 不能检测到我的文件变化

如果你在 VM 下执行 `npm run dev`，你会发现 webpack 并不能监视到你的文件改变。如果这样的话，有两种方式来解决这个

1. 配置 webpack 检测文件系统的变化, 注意:检测文件系统是资源密集型操作并且很耗费电池的使用时长.
2. 转发文件通过使用类似于 `vagrant-fsnotify` 之类的东西将通知发送给 VM。注意，这是一个 只有 Vagrant 才有的插件。

检测 VM 文件系统变化, 修改一下你的 npm 脚本，使用 `--watch-poll` 和 `--watch` 标签，像这样：

```Plaintext
"scripts": {
    "watch": "NODE_ENV=development webpack --watch --watch-poll",
}
```

推送文件改动到 VM, 在主机安装 vagrant-fsnotify

```Plaintext
vagrant plugin install vagrant-fsnotify
```

现在你可以配置 vargrant 来使用这个插件, 在 Homestead 中, 在你的 `Homestead.yaml` 文件类似于这样

```YAML
folders:
    - map: /Users/jeffrey/Code/laravel
      to: /home/vagrant/Code/laravel
      options:
          fsnotify: true
          exclude:
              - node_modules
              - vendor
```

一旦你的 vagrant 机器启动, 只需要在主机上运行 `vagrant fsnotify` 把文件的改动推送到 vm 上, 然后在 vm 内部运行 `npm run watch` 就能够检测到文件的改动了.如果你还是有问题，[去这儿溜达溜达吧](https://webpack.github.io/docs/troubleshooting.html#webpack-doesn-t-recompile-on-change-while-watching)。

### 为什么在我的 css 文件里显示图片在 node_modules 里找不到

你可能用的是相对路径，但是在你的 `resources/assets/sass/app.css` 里并不存在：

```Plaintext
body {
    background: url('../img/example.jpg');
}
```

当引用相对路径的时候，会根据当前文件的路径来搜索，同样的，webpack 会首先搜索 ````resources/assets/img/example.jpg ，如果找不到，会继续搜索文件位置，包括 node_modules,如果还找不到，就报错： ``` ERROR Failed to compile with 1 errors This dependency was not found in node_modules: ``` 有两个解决办法：<br />1 . 让````resources/assets/img/example.jpg\` 存在这个文件.2 . 编译 css 的时候添加下面的选项，禁用 css 的 url 处理：

```JavaScript
mix.sass("resources/assets/sass/app.scss", "public/css")
    .options({    processCssUrls: false,});
```

他对老项目特别有用，因为你的文件夹结构已经完全创建好了。

### 我不想把 mix-manifest.json 文件放在项目根目录下

如果你没有使用 `laravel`，你的 `mix-manifest.json` 文件会被放到项目根目录下，如果你不喜欢的话，可以调用 `mix.setPublicPath('dist/')`，然后 manifest 文件就会被放到 dist 目录下。

### 怎样使用 webpack 自动加载模块

webpack 使用 `ProvidePlugin` 插件加载一些需要的模块，常用的一个例子就是加载 jQuery：

```Plaintext
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});
// in a module
$('#item'); // <= just works
jQuery('#item'); // <= just works
// $ is automatically set to the exports of module "jquery"
```

当 laravel-mix 自动加载模块的时候(像上面说的那样)，你如果想禁用(传一个空对象)或者用你自己的模块覆盖它，可以调用 `mix.autoload()` 方法：

```Plaintext
mix.autoload({
  jquery: ['$', 'window.jQuery', 'jQuery'], // more than one
  moment: 'moment' // only one
});
```

### 为什么我看到一个 “Vue packages version mismatch”错误

如果, 更新你的依赖, 你有以下编译失败的信息

```Plaintext
Module build failed: Error:
Vue packages version mismatch:
* vue@2.5.13
* vue-template-compiler@2.5.15
```

这意味着你的 `vue` 和 `vue-template-compiler` 依赖不同步, 每一个 Vue 的更新, 版本号必须是相同的. 更新来修复这个错误

```Plaintext
npm update vue
// or
npm install vue@2.5.15
```

## 排障

### 我在更新/安装 mix 时候出现错误

不幸的是，你的依赖项可能没有正确安装的原因有无数个。一个常见的根本原因是安装了老版本的 Node(`node -v`) 和 npm (`npm -v`)。第一步，访问 [http://nodejs.org](http://nodejs.org/) 并更新它们。否则，它通常与需要删除的错误锁文件有关。让这一系列命令尝试从头开始安装一切

```Plaintext
rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install
```

### 为什么 webpack 不能找到我的 app.js 条目文件?

如果你遇到这样的失败信息……

```Plaintext
These dependencies were not found:
* /Users/you/Sites/folder/resources/assets/js/app.js
```

… 你可能使用 npm 5.2 (`npm -v`) 这个版本。这个版本引入了一个导致安装错误的错误。该问题已被在 npm 5.3 修复。请升级，然后重新安装

```Plaintext
rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install
```

# API

## Javascript

```Plaintext
mix.js(src|[src], output)
```

简单的一行代码，larave mix 可以执行很多重要的操作

- ES2017+ 模块编译
- 创建并且编译 vue 组件(通过 `vue-loader`)
- 模块热替换(HMR)
- Tree-shaking 打包技术，webpack2 里新增的(移除无用的库)
- 提取和拆分 vendor 库(通过`mix.extract()`方法), 使长期缓存变的容易
- 自动版本化(文件哈希)，通过 `mix.version()`

### 用法

```Plaintext
let mix = require('laravel-mix');
// 1. A single src and output path.
mix.js('src/app.js', 'dist/app.js');
// 2. For additional src files that should be
// bundled together:
mix.js([
    'src/app.js',
    'src/another.js'
], 'dist/app.js');
// 3. For multiple entry/output points:
mix.js('src/app.js', 'dist/')
   .js('src/forum.js', 'dist/');
```

### laravel 示例

考虑到典型的 laravel 默认安装的时候会把入口定位在 `./resources/assets/js/app.js`，所以我们先准备一个 `webpack.mix.js` 把 `app.js` 编译到 `./public/js/app.js`。

```Plaintext
let mix = require('laravel-mix');
mix.js('resources/assets/js/app.js', 'public/js');
```

现在上面所有的项你都可以用了，只需要调用一个方法。在命令行调用 `npm run dev` 执行编译。

### Vue 组件

laravel mix 包罗万象，支持 vue 组件编译，如果你不使用 vue 的话，可以忽略这块。单文件组件是 vue 最重要的特征。在一个文件里为一个组件定义模板，脚本，样式表。

*./resources/assets/js/app.js*

```JavaScript
import Vue from "vue";
import Notification from "./components/Notification.vue";
new Vue({
        el: "#app",
        components: { Notification },
});
```

在上面，我们导入了 vue(首先你需要执行`npm install vue --save-dev`安装 vue)，然后引入了一个叫 `Notification` 的 vue 组件并且注册了 `root vue` 实例。./resources/asset/js/components/Notification.vue

```Plaintext
<template>
    <div class="notification">
        {{ body }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                body: 'I am a notification.'
            }
        }
    }
</script>
<style>
    .notification {
        background: grey;
    }
</style>
```

如果你了解 vue，这些你都会很熟悉，继续。./webpack.mix.js

```Plaintext
let mix = require('laravel-mix');
mix.js('resources/assets/js/app.js', 'public/js');
```

执行 `npm run dev` 编译文件，这样就简单的创建了一个 HTML 文件，引入 `./js/app.js` 文件，然后在浏览器里查看吧！

### React 支持

laravel mix 也装载了基本的 react 支持，只要把 mix.js()改成 mix.react()并且使用相同的参数。在底层，mix 会引用 react 需要的任何 babel 插件。

```Plaintext
mix.react('resources/assets/js/app.jsx', 'public/js/app.js');
```

当然，你仍然需要使用 npm 安装 react 和 reactDOM，不过要注意小心行事。

## Typescript 支持

Laravel Mix 还附带基本的 Typescript 支持。只需更新您的 `mix.js()` 调用 `mix.ts()`，然后使用完全相同的参数集。

```Plaintext
mix.ts('resources/assets/js/app.ts', 'public/js/app.js');
```

当然，你仍然希望做必要的调整，如创建`tsconfig.json`文件和安装[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)，但其他一切都应该在开发郭晨他提供中考虑到了。

## 库代码分离

```Plaintext
mix.js(src, output).extract();
```

把所有的 js 都打包成一个文件会伴随着潜在的风险：每次更新项目中就算很小的一部分都需要破坏所有用户的缓存，这意味着你的第三方库需要重新被下载和缓存。这样很不好。一个解决的办法是分离或者提取你的库文件。

- **应用代码：** `app.js`
- **vendor 库：** `vendor.js`
- **Manifest(webpack runtime):** `manifest.js`

```Plaintext
mix.extract();
```

or

```Plaintext
mix.extract(['vue', 'jquery']);
```

extract 方法接受一个你想要从打包文件里提取出的库的数组，使用这个方法，Vue 和 jQuery 的源代码都会被放在 vendor.js 里。如果在未来你需要对应用代码做一些微小的变动，并不会对大的 vendor 库产生影响，它们依然会留在长期缓存。一旦执行 webpack 打包文件，你会发现三个新的文件，你可以在 HTML 页面引用它们。

```Plaintext
<script src="/js/manifest.js"></script>
<script src="/js/vendor.js"></script>
<script src="/js/app.js"></script>
```

实际上，我们付出了一些 HTTP 请求的代价（就是会多请求几次）来换取长期缓存的提升。**Manifest 文件是什么**webpack 编译的时候会有一些 run-time 代码协助其工作。如果没有使用 `mix.extract()`，这些代码你是看不到的，它会在打包文件里，然而，如果我们分离了代码并且允许长期缓存，在某些地方就需要这些 run-time 代码，所以，mix 会把它提取出来，这样一来，vendor 库和 manifest 文件都会被缓存很长时间。

## 浏览器自动刷新

```Plaintext
mix.browserSync('my-site.test');
```

BrowserSync 能自动监控文件变动并且把你的变化通知浏览器, – 完全不需要手动刷新。你可以调用 `mix.browserSync()` 方法来开启这个功能：

```Plaintext
mix.browserSync('my-domain.test');
// Or:
// https://browsersync.io/docs/options/
mix.browserSync({
    proxy: 'my-domain.test'
})
```

参数可以传字符串(proxy)，也可以传对象(BrowserSync 设置)。你声明的域名作为 proxy 是非常重要的，Browsersync 将通过代理网址来输出到你的虚拟主机(webpack dev server).其他选项可以从 [Browsersync Documentation](https://browsersync.io/docs/options/)现在, 启动 dev server (`npm run watch`), 并进行下一步操作吧.

## 模块热替换

laravel mix 对模块热替换提供了无缝的支持。 > 模块热替换(或者叫热加载)，意思就是当 javascript 改变刷新页面的时候可以维持组件的状态，例如现在有一个计数器，按一下按钮，计数器会加 1，想象一下你点了很多次然后修改一下组件的相关文件，浏览器会实时的反映出你所做出的更改而保持计数器不变，计数器不会被重置，这就是热加载的意义最在。

**在 laravel 里的用法**Laravel 和 Laravel 一起工作, 来抽象出热加载的复杂性.看一下 laravel 里的 package.json 文件，在 scripts 模块，你可以看到：

```Plaintext
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack --progress --hide-modules",
    "watch": "cross-env NODE_ENV=development webpack --watch --progress --hide-modules",
    "hot": "cross-env NODE_ENV=development webpack-dev-server --inline --hot",
    "production": "cross-env NODE_ENV=production webpack --progress --hide-modules"
}
```

注意一下 `hot` 选项，这个地方就是你所需要的，在命令行执行 npm run hot 会启动一个 node 服务器并且监视你的 bundle 文件，接下来，在浏览器打开你的 laravel 应用，一般应该是 `[http://my-app.test](http://my-app.test)`。在 laravel 应用里使用热加载很重要的一点是要保证所有的脚本资源引用的是前面启动的 node 服务器的 url：`http://localhost:8080`，现在你可以手动更新你的 HTML文件了:

```HTML
<body>
        <div id="app">...</div>
        <script src="http://localhost:8080/js/bundle.js"></script>
</body>
```

假设你有一些组件，尝试在浏览器里更改他们的状态，然后更新他们的模板文件，你可以看到浏览器会立刻反应出你的更新，但是状态并没有被改变。但是，在开发部署环境下手动更新 url 会是一个负担，所以，laravel 提供了一个 mix()方法，他会动态的构建 js 或者样式表的引用，然后输出。上面的代码因此可以修改成：

```HTML
<body>
        <div id="app"></div>
        <script src="{{ mix('js/bundle.js') }}"></script>
</body>
```

调整之后，Laravel 将为你做这项工作。如果运行 `npm run hot` 以启用热重加载，则该函数将设置必要的 `http://localhost:8080` 作为 URL。相反，如果您使用 `npm run dev` 或 `npm run pro`，它将使用域名作为基准 url。**在 Https 中使用**如果你在 HTTPS 连接上开发你的应用，你的热重加载脚本和样式也必须通过 HTTPS 服务。要实现这一点，可以将 `-—https` 标志添加到 `package.json` 中的热选项命令中。

```Plaintext
"scripts": {
    "hot": "NODE_ENV=development webpack-dev-server --inline --hot --https",
}
```

通过上面的设置，webpack-dev-server 将会生成一个自签名证书。如果你希望使用自己的证书，可以使用以下设置:

```Plaintext
"hot": "NODE_ENV=development webpack-dev-server --inline --hot --https --key /path/to/server.key --cert /path/to/server.crt --cacert /path/to/ca.pem",
```

现在在你的 Html/Blade 文件中可以使用

```Plaintext
<script src="https://localhost:8080/js/bundle.js"></script>
```

或者

```Plaintext
<script src="{{ mix('js/bundle.js') }}"></script>
```

**在 spa 里的用法**laravel mix 包含了流行的 `vue-loader` 包，这意味着，如果是单页应用，你什么都不需要做，它是开箱即用的。

## 版本化

```Plaintext
mix.js('src', 'output')
   .version([]);
```

为了帮助长期缓存，Laravel Mix 提供了 `mix.version()` 方法，它支持文件散列。比如`app.js?id=8e5c48eadbfdd5458ec6`。这对清除缓存很有用。假设你的服务器自动缓存了一年的脚本，以提高性能。这很好，但是，每当您对应用程序代码进行更改时，需要一些方法来告诉用户更新缓存, 这通常是通过使用查询字符串或文件哈希来完成的。启用了版本控制之后，每次代码更改时，都会生成一个新的散列查询字符串文件。看以下`webpack.mix.js` 文件编译后，你会在 `mix-manifest.json` 文件看到 `/css/app.css?id=5ee7141a759a5fb7377a` 和 `/js/app.js?id=0441ad4f65d54589aea5`。当然，你的特定散列将是唯一的。每当你调整 JavaScript 时，编译后的文件将会收到一个新的散列名称，这将有效地破坏缓存，一旦被推到生产环境中。举个例子，试试 `webpack --watch`，然后修改一下你的 JavaScript。你将立即看到一个新生成的打包文件和样式表。

### 导入版本文件

这就引出了一个问题:如果名称不断变化，我们如何将这些版本化的脚本和样式表包含到 HTML 中呢?是的，这很棘手。答案将取决于你构建的应用程序的类型。对于 SPA，你可以动态地读取 Laravel Mix 生成的 `manifest.json` 文件，提取资料文件名(这些名称将被更新，以反映新的版本文件)，然后生成 HTML。**Laravel 用户**对于 Laravel 项目，一个解决方案是开箱即用的。只需调用全局 `mix()` 函数，就完成了!我们将计算出导入的适当文件名。这里有一个例子:

```HTML
<!DOCTYPE html>
<html lang="en">
        <head>
                <meta charset="utf-8" />
                <title>Laravel</title>
                <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
        </head>
        <body>
                <div id="app">
                        <example-component></example-component>
                </div>
                <script src="{{ mix('js/app.js') }}"></script>
        </body>
</html>
```

将未散列的文件路径传递给 `mix()` 函数，然后在后端，我们将弄清楚应该导入哪个脚本或样式表。请注意，你可能/应该使用这个函数，即使没有对文件进行版本控制。

### 版本化附加文件

`mix.version()` 将自动生成编译后的 JavaScript、Sass/Less 或合并文件。但是，如果你还希望将额外的文件作为构建的一部分，简单地传递路径或路径数组，就像这样:

```Plaintext
mix.version(['public/js/random.js']);
```

现在，我们会版本化任何相关的编译文件，但是我们还会附加一个查询字符串，`public/js/random.js?{hash}`，并更新 `mix-manifest.json` 文件。

## Css 预处理器

```Plaintext
mix.sass('src', 'output', pluginOptions);
mix.standaloneSass('src', 'output', pluginOptions); // Isolated from Webpack build.
mix.less('src', 'output', pluginOptions);
mix.stylus('src', 'output', pluginOptions);
mix.postCss('src', 'output', [ require('precss')() ])
```

一个单一的方法调用允许你编译你的 Sass，Less，或 Stylus 文件，同时自动应用 CSS3 前缀。虽然 webpack 可以将所有 CSS 直接插入到绑定的 JavaScript 中，但 Laravel Mix 会自动执行必要的步骤，将其提取到你想要的输出路径中。

### 多构建

如果你需要编译多个顶级文件，你可以根据需要调用 `mix.sass()`(或任何一个预处理器变体). 对于每个调用，webpack 将输出一个包含相关内容的新文件。

```Plaintext
mix.sass('src/app.scss', 'dist/') // creates 'dist/app.css'
   .sass('src/forum.scss', 'dist/'); // creates 'dist/forum.css'
```

### 例子

让我们看一个例子webpack.mix.js

```Plaintext
let mix = require('laravel-mix');
mix.sass('resources/assets/sass/app.sass', 'public/css');
```

./resources/assets/sass/app.sass

```Plaintext
$primary: grey
.app
    background: $primary
```

> Tip : 对于 Sass 编译, 你可以使用 .sass 和 .scss 语法

像往常一样运行 `npm run webpack` 进行编译. 你会发现 `./public/css/app.css` 文件包含

```Plaintext
.app {
  background: grey;
}
```

### 插件选项

编译的时候, Laravel Mix 的首先是去分别的调用 Node-Sass, Less，和 Slylus 来编译你的 Sass, Less 文件。有时，你可能需要重写我们传递给它们的默认选项。可以将它们作为第三个参数提供给 `mix.sass()`, `mix.less()` 和 `mix.stylus()`。

- **Node-Sass 选项:** [https://github.com/sass/node-sass#options](https://github.com/sass/node-sass#options)
- **Less 选项:** [https://github.com/webpack-contrib/less-loader#options](https://github.com/webpack-contrib/less-loader#options)

**Stylus 插件**如果使用 Stylus, 你可能希望安装额外的插件，比如 [Rupture](https://github.com/jescalan/rupture) 。运行 `npm install rupture` 来安装这个插件，然后在你的 `mix.stylus()` 中调用, 例如:

```Plaintext
mix.stylus('resources/assets/stylus/app.styl', 'public/css', {
    use: [
        require('rupture')()
    ]
});
```

如果希望更深一步，并且在全局中自动导入插件，您可以使用 import 选项。这里有一个例子:

```Plaintext
mix.stylus('resources/assets/stylus/app.styl', 'public/css', {
    use: [
        require('rupture')(),
        require('nib')(),
        require('jeet')()
    ],
    import: [
        '~nib/index.styl',
        '~jeet/jeet.styl'
    ]
});
```

就是这个样子滴!

### CSS url() 重写

一个关键的 webpack 概念是，它将重写你的样式表中的任何 `url()`。虽然这可能最初听起来很奇怪，但它是一项非常强大的功能。**一个例子**假设我们想要编译一些 Sass，其中包含一个图像的相对 url。

```CSS
.example {    background: url("../images/thing.png");}
```

> 提示:url()的绝对路径将被排除在 url 重写之外。因此，url('/images/thing.png')或url('http://example.com/images/thing.png') 将不会被更改。

注意,这里说的是相对 URL? 默认情况下，Laravel Mix 和 webpack 将会找到 `thing.png` ，将其复制到 `public/images` 文件夹中，然后在生成的样式表中重写 `url()`。因此，编译的 CSS 将是:

```Plaintext
.example {
  background: url(/images/thing.png?d41d8cd98f00b204e9800998ecf8427e);
}
```

这也是 webpack 的一个很酷的特性。然而，它确实有一种倾向，让那些不理解 webpack 和 css-loader 插件如何工作的人感到困惑。你的文件夹结构可能已经是您想要的了，而且你希望不要修改那些`url()`。如果是这样的话，我们确实提供了一个覆盖方式:

```Plaintext
mix.sass('src/app.scss', 'dist/')
   .options({
      processCssUrls: false
   });
```

把这个加上你的 `webpack.mix.js` 文件中，我们将不再匹配 `url()` 或复制资源到你的公共目录。因此，编译后的 CSS 将与你输入时一样:

```Plaintext
.example {
  background: url("../images/thing.png");
}
```

这样的好处是，当禁用 url 处理时，您的 Webpack, Sass 编译和提取可以更快地编译。

### PostCSS 插件

默认情况下，Mix 将通过流行的 [Autoprefixer PostCSS plugin](https://github.com/postcss/autoprefixer) 将所有的 CSS 文件连接起来。因此，你可以自由使用最新的 CSS 3 语法，并理解我们将自动应用任何必要的浏览器前缀。在大多数情况下，默认设置应该就可以，但是，如果你需要调整底层的自动修复程序配置，那么如下所示:

```Plaintext
mix.sass('resources/assets/sass/app.scss', 'public/css')
   .options({
        autoprefixer: {
            options: {
                browsers: [
                    'last 6 versions',
                ]
            }
        }
   });
```

另外，如果你想完全禁用它——或者依赖一个已经包含 自动前缀的 PostCSS 插件:

```Plaintext
mix.sass('resources/assets/sass/app.scss', 'public/css')
   .options({ autoprefixer: false });
```

但是，你可能想要在构建中应用额外的 PostCSS 插件。木问题, 只需在 NPM 中安装所需的插件，然后在 `webpack.mix.js` 文件中引用,如下所示:

```Plaintext
mix.sass('resources/assets/sass/app.scss', 'public/css')
   .options({
       postCss: [
            require("postcss-custom-properties")
       ]
   });
```

完成了!现在可以使用和编译自定义 CSS 属性(如果这是您的东西)。例如,如果 `resources/assets/sass/app.scss` 包含…

```Plaintext
:root {
    --some-color: red;
}
.example {
    color: var(--some-color);
}
```

编译完成将会是

```Plaintext
.example {
  color: red;
}
```

### PostCss 不适用 Sass/Less

或者，如果你更喜欢跳过 Sass/Less/Stylus 编译步骤，而是使用 PostCSS，你可以通过`mix.postCss()` 方法来完成。

```Plaintext
mix.postCss('resources/assets/css/main.css', 'public/css', [
   require('precss')()
]);
```

请注意，第三个参数是应该应用于你构建的 postcss 插件的数组。

### 独立 Sass 构建

如果你不希望 Mix 和 Webpack 以任何方式处理你的 Sass 文件，你可以使用`mix.standaloneSass()`，这将大大改善你应用程序的构建时间。请记住:如果你选择了这条路线，Webpack 不会触及你的 CSS。它不会重写 url，复制资源(通过 file-loader)，或者应用自动图像优化或 CSS 清理。如果这些特性对于你的应用程序来说是没有必要的，那么一定要使用这个选项而不是`mix.sass()`。

```Plaintext
mix.standaloneSass('resources/assets/sass/app.scss', 'public/css');
```

> 注意:如果你正在使用 standaloneSass，在使用 npm run watch 进行文件更改时，你将需要使用下划线来前缀导入的文件，以将它们标记为依赖文件(例如，\_header.scss \_alert.scss)。如果不这样做，将导致 Sass 编译错误和/或额外的 CSS 文件。

## 文件复制

```Plaintext
mix.copy(from, to);
mix.copy('from/regex/**/*.txt', to);
mix.copy([path1, path2], to);
mix.copyDirectory(fromDir, toDir);
```

有时, 你需要复制一个或者多个文件作为构建过程的一部分。没有问题, 这是小事一桩。使用`mix.copy()` 方法指定源文件或文件夹，然后指定您想要的目标文件夹/文件

```Plaintext
mix.copy('node_modules/vendor/acme.txt', 'public/js/acme.txt');
```

在编译时，‘acme’ 文件将被复制到 ‘public/js/acme.txt’。这是一个常见的用例，当你希望将一组字体通过 NPM 安装到 public 目录时。

## 系统通知

默认情况下，Laravel Mix 将显示每个编译的系统通知。这样，你就可以快速查看是否有需要查询的错误。但是，在某些情况下，这是不可取的(例如在生产服务器上编译)。如果发生这种情况，它们可以从你的 `webpack.mix.js` 文件中禁用。

```Plaintext
mix.js(src, output)
   .disableNotifications();
```

## 文件组合和最小化

```Plaintext
mix.combine(['src', 'files'], 'destination');
mix.babel(['src', 'files'], destination);
mix.minify('src');
mix.minify(['src']);
```

如果使用得当，Laravel Mix 和 webpack 应该负责所有必要的模块捆绑和最小化。但是，你可能有一些遗留代码或第三方库需要连接和最小化, 这并不是一个问题。

### 组合文件

考虑下面的代码片段:

```Plaintext
mix.combine(['one.js', 'two.js'], 'merged.js');
```

这自然会合并 `one.js` 和 `two.js` 到一个单独的文件，叫做 `merged.js`。与往常一样，在开发期间，合并文件将保持未压缩状态。但是，对于生产(export NODE_ENV=production)，这个命令将会最小化 `merged.js`。组合文件与 Babel 编译。如果需要组合 使用 ES2015 方法编写的 JavaScript 文件，你可以更新的 `mix.combine()` 调用 `mix.babel()`。方法签名相同。唯一的区别是，在将文件组合起来之后，Laravel Mix 将对结果进行 Babel 编译，从而将代码转换成所有浏览器都能理解的 JavaScript 代码。

```Plaintext
mix.babel(['one.js', 'two.js'], 'merged.js');
```

### 最小化文件

同样，你也可以使用 `mix.minify()` 命令缩小一个或多个文件。

```Plaintext
mix.minify('path/to/file.js');
mix.minify(['this/one.js', 'and/this/one.js']);
```

这里有一些值得注意的事情:

- 该方法将创建一个额外的 `.min.ext` 文件。因此，压缩 `app.js` 将生成 `app.min.js`。
- 再一次声明，压缩只会在生产过程中发生。(`export NODE_ENV=production`)。
- 不需要调用 `mix.combine(['one.js', 'two.js'], 'merged.js').minify('merged.js');` ，只使用单一的 `mix.combine()` 调用。它会兼顾两者。 > 重要:请注意，压缩只适用于 CSS 和 JavaScript 文件。minifier 不理解任何其他提供的文件类型。

## 自动加载

```Plaintext
mix.autoload({
   jquery: ['$', 'window.jQuery']
});
```

Webpack 提供了必要的功能，可以在 Webpack 所要求的每个模块中把一个模块作为变量。如果你使用的是一个特定的插件或库，它依赖于一个全局变量，例如 jQuery, `mix.autoload()` 可能会对你有用。考虑下面的例子:

```Plaintext
mix.autoload({
   jquery: ['$', 'window.jQuery']
});
```

该代码片段指定 webpack 应该将 `var $ = require('jquery')` 添加到它所遇到的全局`$`标识符或 `window.jQuery` 中。漂亮!

## 事件钩子

```Plaintext
mix.then(function () {});
```

你可能需要监听每次 webpack 完成编译的事件。也许你需要手动应用一些适合你的应用程序的逻辑。如果是这样，您可以使用 `mix.then()` 方法来注册任何回调函数。这里有一个例子:

```Plaintext
mix.js('resources/assets/js/app.js', 'public/js')
   .then(() => {
        console.log('webpack has finished building!');
   });
```

回调函数将通过 webpack `Stats` 对象，允许对所执行的编译进行检查:

```Plaintext
mix.js('resources/assets/js/app.js', 'public/js')
   .then((stats) => {
        // array of all asset paths output by webpack
        console.log(Object.keys(stats.compilation.assets));
   });
```

可以在这里找到 Stats 对象的官方文档 : [https://github.com/webpack/docs/wiki/node.js-api#stats](https://github.com/webpack/docs/wiki/node.js-api#stats)

## 快速 webpack 配置

```Plaintext
mix.webpackConfig({} || cb);
```

当然，你可以自由编辑提供的 `webpack.config.js` 文件，在某些设置中，更容易直接从你的 `webpack.mix.js` 修改或覆盖默认设置。对于 Laravel 应用来说尤其如此，默认情况下是在项目根文件夹中没有 `webpack.config.js`。例如，你可能希望添加一个由 webpack 自动加载的模块的自定义数组。在这个场景中，您有两个选项:

- 根据需要编辑你的 `webpack.config.js` 文件
- 在你的 `webpack.mix.js` 中调用 `mix.webpackConfig()` 文件，并传递重写参数。然后混合将进行一个深度合并。下面，作为一个示例，我们将为 Laravel Spark 添加一个自定义模块路径。

```Plaintext
mix.webpackConfig({
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'vendor/laravel/spark/resources/assets/js')
        ]
    }
});
```

### 使用回调函数

当传递回调函数时，你可以访问 webpack 及其所有属性。

```Plaintext
mix.webpackConfig(webpack => {
    return {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            })
        ]
    };
});
```

## 扩展 Mix

基于组件的系统 Mix 使用场景构建它的 API，你也可以访问—是否为你的项目扩展 Mix，或者作为一个可重用的包分发到世界。 > 可以在[扩展页面](https://laravel-mix.com/extensions)找到已有的扩展列表。

### 例子

```Plaintext
// webpack.mix.js;
let mix = require('laravel-mix');
mix.extend('foo', function(webpackConfig, ...args) {
    console.log(webpackConfig); // the compiled webpack configuration object.
    console.log(args); // the values passed to mix.foo(); - ['some-value']
});
mix.js('src', 'output').foo('some-value');
```

在上面的示例中，我们可以看到 `mix.extend()` 接受两个参数:在定义组件时应该使用的名称，以及一个回调函数或类，这些函数注册并组织必要的 webpack 逻辑。在后台，一旦构建了底层 webpack 配置对象，Mix 将触发这个回调函数。这将给你一个机会来插入或覆盖任何必要的设置。虽然简单的回调函数可能对快速扩展很有用，但在大多数情况下，您可能希望构建一个完整的组件类，比如:

```Plaintext
mix.extend(
    'foo',
    new class {
        register(val) {
            console.log('mix.foo() was called with ' + val);
        }
        dependencies() {}
        webpackRules() {}
        webpackPlugins() {}
        // ...
    }()
);
```

在扩展 Mix 时，通常需要触发一些指令:

- 安装这些依赖关系。
- 将此规则/加载程序添加到 webpack 中。
- 包含这个 webpack 插件。
- 完全覆盖 webpack 配置的这一部分。
- 将此配置添加到 Babel。
- 等。

这些操作中的任何一个都是带有 Mix 组件系统有联系。组件的接口

- name:当调用组件时，应该使用什么作为方法名。(默认为类名。)
- dependencies:列出应该由 Mix 安装的所有 npm 依赖项。
- register:当您的组件被调用时，所有的用户参数将立即被传递给这个方法。
- boot:启动组件。这个方法是在用户的 webpack.mix 之后触发的。js 文件已经加载完毕。
- webpackEntry:附加到主混合 webpack 入口对象。
- webpackRules:与主 webpack 加载器合并的规则。
- webpackplugin:与主 webpack 配置合并的插件。
- webpackConfig:覆盖生成的 webpack 配置。
- babelConfig:额外的 Babel 配置应该与 Mix 的默认值合并。

这里有一个示例/虚拟组件，它可以让你更好地了解如何构建自己的组件。更多的例子，请参考在[后台 Mix 使用的组件](https://github.com/JeffreyWay/laravel-mix/tree/master/src/components)。

```Plaintext
class Example {
    /**
     * The optional name to be used when called by Mix.
     * Defaults to the class name, lowercased.
     *
     * Ex: mix.example();
     *
     * @return {String|Array}
     */
    name() {
        // Example:
        // return 'example';
        // return ['example', 'alias'];
    }
    /**
     * All dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        // Example:
        // return ['typeScript', 'ts'];
    }
    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * Ex: register(src, output) {}
     * Ex: mix.yourPlugin('src/path', 'output/path');
     *
     * @param  {*} ...params
     * @return {void}
     *
     */
    register() {
        // Example:
        // this.config = { proxy: arg };
    }
    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has executed.
     */
    boot() {
        // Example:
        // if (Config.options.foo) {}
    }
    /**
     * Append to the master Mix webpack entry object.
     *
     * @param  {Entry} entry
     * @return {void}
     */
    webpackEntry(entry) {
        // Example:
        // entry.add('foo', 'bar');
    }
    /**
     * Rules to be merged with the master webpack loaders.
     *
     * @return {Array|Object}
     */
    webpackRules() {
        // Example:
        // return {
        //     test: /\.less$/,
        //     loaders: ['...']
        // });
    }
    /*
     * Plugins to be merged with the master webpack config.
     *
     * @return {Array|Object}
     */
    webpackPlugins() {
        // Example:
        // return new webpack.ProvidePlugin(this.aliases);
    }
    /**
     * Override the generated webpack configuration.
     *
     * @param  {Object} webpackConfig
     * @return {void}
     */
    webpackConfig(webpackConfig) {
        // Example:
        // webpackConfig.resolve.extensions.push('.ts', '.tsx');
    }
    /**
     * Babel config to be merged with Mix's defaults.
     *
     * @return {Object}
     */
    babelConfig() {
        // Example:
        // return { presets: ['@babel/preset-react'] };
    }
}
```

请注意，上面示例中的每个方法都是可选的。在某些情况下，您的组件可能只需要添加一个 webpack 加载程序和/或调整混合使用的 Babel 配置。没有问题的话省略其余的接口。

```Plaintext
class Example {
    webpackRules() {
        return {
            test: /\.test$/,
            loaders: []
        };
    }
}
```

现在，当 Mix 构造底层 webpack 配置时，你的规则将包含在生成的`webpackConfig.module.rules` 数组中。

### 使用

一旦你构建或安装了想要的组件，只需从 `webpack.mix.js` 中获取它即可，你都准备好了。

```Plaintext
// foo-component.js
let mix = require('laravel-mix');
class Example {
    webpackRules() {
        return {
            test: /\.test$/,
            loaders: []
        };
    }
}
mix.extend('foo', new Example());
```

```Plaintext
// webpack.mix.js
let mix = require('laravel-mix');
require('./foo-component');
mix
    .js('src', 'output')
    .sass('src', 'output')
    .foo();
```

# 自定义方法

## LiveReload

现在 Laravel Mix 与 Browsersync 已经支持了开箱即用，但是你可能更喜欢使用 LiveReload, 当检测到修改时，LiveReload 可以自动监视您的文件并刷新页面。

### 安装 webpack-livereload-plugin

```Plaintext
npm install webpack-livereload-plugin@1 --save-dev
```

### 配置 webpack.mix.js

将以下几行添加到 `webpack.mix.js` 底部。

```Plaintext
var LiveReloadPlugin = require('webpack-livereload-plugin');
mix.webpackConfig({
    plugins: [
        new LiveReloadPlugin()
    ]
});
```

虽然 LiveReload 有她很好用的默认值，但是这里可以查看一个可用的插件选项列表。

### 安装 LiveReload.js

最后，我们需要安装 LiveReload.js。您可以通过 LiveReload Chrome 插件，或者在你的主要站点模板的关闭`</body>`标记之前添加以下代码:

```Plaintext
@if(config('app.env') == 'local')
    <script src="http://localhost:35729/livereload.js"></script>
@endif
```

### 运行 dev server

```Plaintext
npm run watch
```

现在，LiveReload 将自动监控您的文件并在必要时刷新页面。享受吧!

## Jquery UI

jQuery UI 是一个用于呈现公共组件的工具包，比如 datepickers、draggables 等。不需要做任何调整，以使其与 Laravel Mix 一起工作。**构建 webpack.mix.js 配置**

```Plaintext
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
```

**安装 jquery-ui**

```Plaintext
npm install jquery-ui --save-dev
```

**加载必要插件**

```Plaintext
// resources/assets/js/app.js
import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery-ui/ui/widgets/datepicker.js';
```

**加载 CSS**

```Plaintext
// resources/assets/sass/app.scss
@import '~jquery-ui/themes/base/all.css';
```

**触发 UI 组件**

```Plaintext
// resources/assets/js/app.js
$('#datepicker').datepicker();
```

# 高级配置

## Laravel Mix 配置项

```Plaintext
mix.options({
    extractVueStyles: false,
    processCssUrls: true,
    terser: {},
    purifyCss: false,
    //purifyCss: {},
    postCss: [require('autoprefixer')],
    clearConsole: false,
    cssNano: {
        // discardComments: {removeAll: true},
    }
});
```

如果需要的话可以使用一些混合选项和覆盖选项。请注意上面的选项，以及它们的默认值。这里有一个快速概述:

- **extractVueStyles:** 提取 `.vue` 组件样式(CSS 在 `<style>` 标签内)到一个专用文件，而不是将其嵌入到 HTML 中。
- **globalVueStyles:** 表示一个文件包含在每个组件样式中。这个文件应该只包含变量、函数或 mixin，以便在最终的编译文件中防止重复的 css。这个选项只有在启用了提取工具时才有效。
- **processCssUrls:** 进程/优化相对样式表`url()`。默认情况下，Webpack 会自动更新这些 url。但是，如果您的文件夹结构已经按照您想要的方式进行组织，那么将此选项设置为 false 以禁用处理。
- **terser：** 使用此选项合并项目所需的任何[自定义 Terser 选项](https://github.com/webpack-contrib/terser-webpack-plugin#options)。
- **purifyCss:** 如果你想要混合自动读取你的 HTML/Blade 文件，并删除你的 CSS 包，你可以将这个选项设置为 true。您还可以传递包含 purifycss-webpack 选项的对象。
- **postCss:** 合并任何自定义的 postCss 插件。
- **clearConsole:** 设置为 false，如果您不想在每次构建后清除终端/控制台。
- **cssNano：** 使用此选项设置项目所需的 [cssnano 选项](https://cssnano.co/optimisations/)。

# 开发协议

## MIT

Copyright (c) 2018 Jeffrey Way [jeffrey@jeffrey-way.com](mailto:jeffrey@jeffrey-way.com)Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.