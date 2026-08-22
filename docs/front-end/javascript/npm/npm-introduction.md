---
description: '本文介绍了npm包管理器的快速入门指南，涵盖npm的安装与更新、package.json文件创建与依赖指定、语义化版本规则、本地与全局包的安装、更新与卸载、常用命令（如npm run、npm install、npm uninstall等），以及国内镜像配置（如使用nrm、cnpm、aliyun私有仓库）和常见问题解答。'
lastUpdated: '2026-08-22 12:25:10'
head:
  - - meta
    - name: 'og:title'
      content: 'npm 包管理快速入门'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了npm包管理器的快速入门指南，涵盖npm的安装与更新、package.json文件创建与依赖指定、语义化版本规则、本地与全局包的安装、更新与卸载、常用命令（如npm run、npm install、npm uninstall等），以及国内镜像配置（如使用nrm、cnpm、aliyun私有仓库）和常见问题解答。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/javascript/npm/npm-introduction.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/5721d111a97af9309a329f82171d8ef4.png'
---
# npm 包管理快速入门

npm 是前端开发广泛使用的包管理工具，当前基于 ai 的工具大多是使用 npm 作为构建工具来发布, 这里重新再总结梳理下

## 介绍

### 什么是 npm？

![图片展示了几个卡通风格的棕色小狗，它们戴着红色项圈，有的戴着带有“wdm”字样的纸箱帽子，有的戴着带有“npm”字样的纸箱帽子。背景是白色的。这张图片位于介绍npm包管理的文档中，与上下文紧密相关，直观地体现了npm作为包管理器的概念，npm可视为“npm模块”的缩写，它让JavaScript开发者分享、复用代码更方便，图片中的小狗和纸箱帽子形象地传达了npm与包相关的主题。](https://file.wulicode.com/feishu-images/5721d111a97af9309a329f82171d8ef4.png)

官方文档的介绍是：npm 是一个包管理器，它让 JavaScript 开发者分享、复用代码更方便

在程序开发中我们常常需要依赖别人提供的框架，写 JS 也不例外。这些可以重复的框架代码被称作包（package）或者模块（module），同时有一个叫做 `package.json` 的文件来定义包内容,  npm 的作用就是让我们发布、下载一些轮子时候更加方便。

我们可以去官方网站 [https://www.npmjs.com/](https://www.npmjs.com/) 浏览、搜索想要的包，也可以直接在命令行中搜索

![这张图片展示的是npm官方网站的页面，页面顶部设有Pro、Teams、Pricing、Documentation的导航选项，还有搜索框用于搜索JS相关包。页面分为三个主要板块，左侧是“Popular libraries”板块，列出了react、lodash、axios等热门JS库名称；中间是“Discover packages”板块，提供了前端、后端、CLI、文档、CSS、测试、物联网、覆盖情况、移动端、框架等不同类别的包分类选项；右侧“By the numbers”板块显示了npm相关统计数据，包括包总数、上周下载量、上月下载量。页面上方还有提示用户启用双重认证的信息。](https://file.wulicode.com/feishu-images/c3732b30dba6c98c7cd630367033583a.png)

使用 npm 后我们可以非常方便地查看依赖的包是否有更新、是否需要下载新版本。

当人们说起 “npm” 时，可能在说三个东西：

1. 一个网站，就是前面提到用于搜索 JS 模块的网站：[https://www.npmjs.com/](https://www.npmjs.com/)
2. 一个仓库，保存着人们分享的 JS 模块的大数据库
3. 命令行里的客户端，开发者使用它来管理、安装、发布模块

只要开发者发布某个模块到仓库中，其他人就可以从 npm 网站或者命令行中下载、使用

### 安装 npm

npm 是依附于 node.js 的，我们可以去它的官网 [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 下载安装 node.js, 在 mac 上可以使用 brew 安装, 如果是多环境可以使用 nvm 安装和管理 : 

下载好 node, npm 也就有了，使用 `npm -v` 查看安装的 npm 版本：

```Plaintext
node -v
v24.14.0

npm -v
11.11.1
```

### 更新 npm

npm 更新比 node 更频繁，因此你下载的 node 附带的 npm 版本可能不是最新的，你可以使用如下命令下载最新 npm:

```Bash
$ npm install npm@latest  -g
```

其中 install 不用介绍了，就是安装，后面的 `npm@latest` 就是 `<packageName>@<version>` 的格式，我们在下载其他模块时也是这个格式。`-g` 代表全局安装

## package.json 文件

**管理本地安装 npm 包的最好方式就是创建** `package.json` 文件

一个 `package.json` 文件可以有以下几点作用：

1. 作为一个描述文件，描述了你的项目依赖哪些包
2. 允许我们使用 “语义化版本规则”（后面介绍）指明你项目依赖包的版本
3. 让你的构建更好地与其他开发者分享，便于重复使用

### package.json 如何创建

使用 `npm init` 即可在当前目录创建一个 `package.json` 文件：

![这张图片展示了在终端中执行`npm init`命令后的界面内容，界面包含了一系列用于创建`package.json`文件的交互配置项，具体包含项目名称`name`、版本`version`、项目描述`description`、入口文件`main`等多个配置字段，各字段对应有默认值。界面还展示了即将生成的`package.json`文件的部分JSON内容，完整呈现了创建`package.json`文件过程中的配置与预览环节，与上下文介绍的通过`npm init`创建`package.json`文件的操作内容相呼应。](https://file.wulicode.com/feishu-images/2318b3a8a1f8763d8ef788c38e71c42b.jpg)

如图所示，输入 `npm init` 后会弹出一堆问题，我们可以输入对应内容，也可以使用默认值。在回答一堆问题后输入 `yes` 就会生成图中所示内容的 `package.json` 文件。

如果嫌回答这一大堆问题麻烦，可以直接输入 `npm init --yes` 跳过回答问题步骤，直接生成默认值的 `package.json` 文件：

![图片展示了在Mac终端中使用`npm init --yes`命令生成默认值的`package.json`文件过程及结果。终端显示执行命令后，`package.json`文件被写入指定路径，内容包含`name`、`version`、`description`等字段，如`name`为`npm-init-test2`，`version`为`1.0.0`，`main`为`index.js`，`scripts`包含`test`脚本，`author`为`shixinzhang <shixinzhang2016@gmail.com>`等信息，还显示了`license`为`MIT`。该图片直观呈现了`npm init --yes`命令的执行效果。](https://file.wulicode.com/feishu-images/4aaea685224615e60d18e96af7db038b.jpg)

### package.json 的内容

`package.json` 文件至少要有两部分内容：

1. “name”

   - 全部小写，没有空格，可以使用下划线或者横线
2. “version”

   - x.x.x 的格式
   - 符合“语义化版本规则”

比如：

```JSON
{    "name": "shixinzhang-demo-package",    "version": "1.0.0"}
```

其他内容：

- `description`：描述信息，有助于搜索
- `main`: 入口文件，一般都是 `index.js`
- `scripts`：支持的脚本，默认是一个空的 test
- `keywords`：关键字，有助于在人们使用 `npm search` 搜索时发现你的项目
- `author`：作者信息
- `license`：默认是 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89)
- `bugs`：当前项目的一些错误信息，如果有的话

我们可以为 `init` 命令设置一些默认值，比如：

> npm set init.author.email “shixinzhang2016@gmail.com” npm set init.author.name “shixinzhang” npm set init.license “MIT”

> 注意： 如果 package.json 中没有 description 信息，npm 使用项目中的 README.md 的第一行作为描述信息。这个描述信息有助于别人搜索你的项目，因此建议好好写 description 信息。

### 指定依赖的包

我们需要在 `package.json` 文件中指定项目依赖的包，这样别人在拿到这个项目时才可以使用 `npm install` 下载。

包有两种依赖方式：

1. `dependencies`：在生产环境中需要用到的依赖
2. `devDependencies`：在开发、测试环境中用到的依赖

举个例子：

```JSON
{
    "name": "my-weex-demo",
    "version": "1.0.0",
    "description": "a weex project",
    "main": "index.js",
    "scripts": {
        "build": "weex-builder src dist",
        "build_plugin": "webpack --config ./tools/webpack.config.plugin.js --color",
        "dev": "weex-builder src dist -w",
        "serve": "serve -p 8080"
    },
    "keywords": [
        "weex"
    ],
    "author": "fkysly@gmail.com",
    "license": "MIT",
    "devDependencies": {
        "babel-core": "^6.14.0",
        "babel-loader": "^6.2.5",
        "babel-preset-es2015": "^6.18.0",
        "vue-loader": "^10.0.2",
        "eslint": "^3.5.0",
        "serve": "^1.4.0",
        "webpack": "^1.13.2",
        "weex-loader": "^0.3.3",
        "weex-builder": "^0.2.6"
    },
    "dependencies": {
        "weex-html5": "^0.3.2",
        "weex-components": "*"
    }
}
```

### Semantic versioning（语义化版本规则）

[https://docs.npmjs.com/getting-started/semantic-versioning](https://docs.npmjs.com/getting-started/semantic-versioning)

`dependencies` 的内容，以 `"weex-html5": "^0.3.2"` 为例，我们知道 key 是依赖的包名称，value 是这个包的版本。那版本前面的 ^ 或者版本直接是一个 \* 是什么意思呢？

这就是 npm 的 “Semantic versioning”，简称”Semver”，中文含义即“语义化版本规则”。

在安卓开发中我们有过这样的经验：有时候依赖的包升级后大改版，之前提供的接口不见了，这对使用者的项目可能造成极大的影响。

因此我们在声明对某个包的依赖时需要指明是否允许 update 到新版本，什么情况下允许更新。

**这就需要先了解 npm 包提供者应该注意的版本号规范。**

如果一个项目打算与别人分享，应该从 1.0.0 版本开始。以后要升级版本应该遵循以下标准：

- 补丁版本：解决了 Bug 或者一些较小的更改，增加最后一位数字，比如 1.0.1
- 小版本：增加了新特性，同时不会影响之前的版本，增加中间一位数字，比如 1.1.0
- 大版本：大改版，无法兼容之前的，增加第一位数字，比如 2.0.0

**了解了提供者的版本规范后， npm 包使用者就可以针对自己的需要填写依赖包的版本规则。**

作为使用者，我们可以在 `package.json` 文件中写明我们可以接受这个包的更新程度（假设当前依赖的是 1.0.4 版本）：

- 如果只打算接受补丁版本的更新（也就是最后一位的改变），就可以这么写：

  - `1.0`
  - `1.0.x`
  - `~1.0.4`
- 如果接受小版本的更新（第二位的改变），就可以这么写：

  - `1`
  - `1.x`
  - `^1.0.4`
- 如果可以接受大版本的更新（自然接受小版本和补丁版本的改变），就可以这么写：

  - `*`
  - `x`

小结一下：**总共三种版本变化类型，接受依赖包哪种类型的更新，就把版本号准确写到前一位。**

##  npm install - 安装

使用 npm 安装 package 有两种方式：本地（当前项目路径）安装 或者 全局安装。

你选择哪种安装方式取决于你将如何使用这个包：

- 如果你只是想在当前项目里用 `require()` 加载使用，那你可以安装到本地

  - `npm install` 默认就是安装到本地的
- 如果你想要在命令行里直接使用，比如 `grunt` CLI，就需要安装到全局了

如果在你的项目里有 `package.json` 文件，运行 `npm install` 后它会查找文件中列出的依赖包，然后下载符合语义化版本规则的版本。

`npm install` 默认会安装 `package.json` 中 `dependencies` 和 `devDependencies` 里的所有模块。

如果想只安装 `dependencies` 中的内容，可以使用 `--production` 字段：

```Plaintext
npm install --production
```

### 本地安装 package

npm 使用下面的命令下载一个包：

```Bash
$ npm install <package_name>
```

后面就是要安装包的名称。这个命令会在当前目录创建一个 `node_modules` 目录，然后下载我们指定的包到这个目录中。

举个例子：

```Plaintext
zhangshixindeMacBook-Pro:publish-pkg zhangshixin$ npm install lodash
zhangshixindeMacBook-Pro:publish-pkg zhangshixin$ ls
index.js        package-lock.json
node_modules        package.json
zhangshixindeMacBook-Pro:publish-pkg zhangshixin$ ls node_modules/
lodash
```

下载后的项目文件夹：

![图片展示了下载后的项目文件夹内容。左侧显示了.DS_Store、demo-app、publish-pkg三个文件夹。右侧是publish-pkg文件夹的内部结构，包含index.js、node_modules、lodash三个文件夹及package-lock.json、package.json两个文件。其中，node_modules文件夹被蓝色高亮显示。该图片与上文“下载后的项目文件夹”内容对应，直观呈现了下载npm包后项目文件夹的实际结构。](https://file.wulicode.com/feishu-images/1e3f26c9901ef75dd46800bc8679532f.jpg)

**安装指定版本：**

`npm install` 默认安装最新版本，如果想要安装指定版本，可以在库名称后加 `@版本号`：

```Bash
$ npm install sax@latest
$ npm install sax@0.1.1
$ npm install sax@">=0.1.0"
```

如果当前项目有 `package.json` 文件，下载包时会下载这个文件中指定的版本； 如果当前项目中没有 `package.json` 文件，就会下载指定包的最新版本。

> 有时下载会报错：npm install error saveError ENOENT: no such file or directory, open '/Users/zhangshixin/package.json'

解决办法：

- 在目录下执行 npm init 创建 package.json，输入初始化信息
- 然后再执行下载命令

### 安装参数 `-save` 和 `-save -dev`

添加依赖时我们可以手动修改 `package.json` 文件，添加或者修改 `dependencies` `devDependencies` 中的内容即可。

另一种更酷的方式是用命令行，在使用 `npm install` 时增加 `--save` 或者 `--save -dev` 后缀：

- `npm install <package_name> --save` 表示将这个包名及对应的版本添加到 `package.json`的 `dependencies`
- `npm install <package_name> --save-dev` 表示将这个包名及对应的版本添加到 `package.json`的 `devDependencies`

### `--legacy-peer-deps` 不校验 peerDependencies 冲突

npm v7 开始引入了严格的 peer dependency 校验。当 A 包声明它的 peerDependencies 需要 `react@^16`,而 B 包声明需要 `react@^18`,npm 会直接报错拒绝安装(`ERESOLVE` 错误),要求你手动解决版本冲突。而在 npm v6 及更早版本,这种冲突只是打印一条 warning,依然会把依赖装上去,不会中断安装。

`--legacy-peer-deps` 就是让 npm v7+ 恢复到 v6 那种"警告但不阻塞"的宽松模式

```PHP
npm install --legacy-peer-deps
```

### 使用下载好的包

下载后 `node_modules` 文件夹中有要使用的包，我们就可以使用其中的代码了。

比如在 Node.js 项目中，我们可以用 `require(XXX)` 引入它。

举个例子： 创建一个 index.js 文件，写入如下代码：

![图片展示的是在终端中运行代码的界面。代码中引入了lodash库，使用`lodash.without()`方法去除数组\[1,2,3\]中与1重复的数据，输出结果为\[2,3\]。界面显示代码文件为index.js，行数为41，字数为94C。下方有“\[zhangshixin@MacBook-Pro:demo-app zhangshixin\]$”提示符，表明当前目录为demo-app，用户为zhangshixin。该图片与上文介绍使用下载好的包并举例子的内容相关，展示了运行代码后的结果。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDgyOWQ4NzNlYmEyYTI0NDJhYzUwZDhmOGEwODVjMDZfYmIyOWE3ZDI1YjYyZGJmYTRkZmRkYmQxMjI3NWIzOTNfSUQ6NzYxODA5ODM2ODA0ODY0NzM0OV8xNzg3MzczOTU4OjE3ODczNzc1NThfVjM)

在使用 `require('lodash')` 后引入了 lodash 库，然后调用了它的 `without()` 方法，这个方法可以去除第一个数组参数中与第二个参数重复的数据。

保存这个文件后，使用 `node index.js` 运行这个文件，成功的话就可以得到运行结果；如果之前安装失败，可能就会遇到这个错误：

```Plaintext
module.js:340
throw err;
^
Error: Cannot find module 'lodash'
```

这时你需要在这个目录下重新运行 `npm install lodash` 安装。

### 更新本地 package

有时候我们想知道依赖的包是否有新版本，可以使用 `npm outdated` 查看，如果发现有的包有新版本，就可以使用 `npm update <package-name>` 更新它，或者直接 `npm update` 更新所有：

![图片展示了在Mac终端中使用npm进行包管理的操作过程。首先执行`npm install lodash@3.1.0`安装lodash@3.1.0版本，接着使用`npm ls`查看依赖包，再通过`npm outdated`查看是否有可更新的包，发现lodash有新版本。最后执行`npm update`更新lodash，显示更新了1个包。整个操作体现了npm在更新本地package版本时的工作流程，与上下文介绍的npm update工作过程相呼应。](https://file.wulicode.com/feishu-images/75fdce29cb03012b95afd1872d8aaf9f.jpg)

上图中，我们在输入 `npm update` 后发现本地的 `lodash` 模块还不是最新的，这是为什么呢？

原来，npm update 的工作过程是这样的：

1. 先到远程仓库查询最新版本
2. 然后对比本地版本，如果本地版本不存在，或者远程版本较新
3. 查看 `package.json` 中对应的语义版本规则
4. 如果当前新版本符合语义规则，就更新，否则不更新

一开始我本地的 package.json 的依赖是这样的：

```Plaintext
"dependencies": {
    "lodash": "^3.1.0"
}
```

根据前面的介绍我们可以知道，这表示只接受小版本或者补丁版本的更新，因此在执行了一次 `npm update` 后它变成了这样：

```Plaintext
"dependencies": {
    "lodash": "^3.10.1"
}
```

第二位升到了最高，但是无法更新第一位，因此无法更新到最新的 4.17.4。

所以我需要把它修改成：

```Plaintext
"dependencies": {
    "lodash": "*"
}
```

这表示任何版本的更新都接受，然后再执行 `npm update`，就发现更新成功了：

![图片展示了在终端执行npm操作的界面。先是执行`npm outdated`命令，显示lodash当前版本3.10.1，想要版本4.17.4，最新版本4.17.4，位于demo项目中；接着执行`npm update`，提示无仓库字段；最后再次执行`npm outdated`，显示无更新。该图片与上下文紧密相关，直观呈现了文档中介绍的npm update操作过程，即先查询最新版本，对比本地版本，查看语义版本规则，再更新等步骤。](https://file.wulicode.com/feishu-images/e22cbc4bd9d93990f25d6474d27e4b45.jpg)

**小结一下：**

执行 `npm outdated` 后可以看到有三个版本号：

![这张图片展示了在终端执行`npm outdated`命令后的结果，该结果对应npm包管理更新本地package的相关操作。表格中明确列出了依赖包lodash的相关信息，包括三列版本数据：第一列是当前node_modules中该模块的版本3.10.1，第二列是package.json文件中声明的版本4.17.4，第三列是远程仓库的最新版本4.17.4，此外还标注了该依赖的存储位置相关信息。](https://file.wulicode.com/feishu-images/fb1162f9d904b3560986fefd5ec39e96.jpg)

第一个是当前 node_modules 中该模块的版本，第二个是 `package.json` 文件中声明的版本，第三个是远程仓库最新的版本。

**只有当前模块版本低于远程，package.json 中的版本语义规则满足情况，才能更新成功。**

### 卸载本地 package

卸载一个本地 package 很简单，`npm uninstall <package-name>` 即可：

![这张图片展示的是终端界面执行npm包卸载操作的过程，对应文档中本地包卸载的内容。界面中执行的命令是`npm uninstall lodash`，该命令用于卸载lodash包，执行后返回结果显示`removed 1 package in 0.333s`，表明卸载成功，同时还有npm警告提示项目缺少repository字段，最后还展示了查看node_modules目录的命令操作，和文档里卸载后验证是否删除成功的内容对应。](https://file.wulicode.com/feishu-images/a118898caf4ac6efb4cace5225cee95e.jpg)

> 官方文档说输入 npm uninstall --save lodash 才能在删除项目的同时移除 package.json 中对它的依赖。但我没加 --save 也达到了一样的效果，一脸懵逼。

卸载后再 `ls node_modules/` 查看目录下，发现没有东西，删除成功。

### 全局安装 package

如果你想要直接在命令行中使用某个包，比如 `jshint` ，你可以全局安装它。

全局安装比本地安装多了个 `-g`:

```Plaintext
npm install -g <package-name>
```

以 `jshint` 为例，全局安装命令是：

```Plaintext
npm install -g jshint
```

![图片展示了在Mac终端中使用npm全局安装`jshint`的命令及结果。先是执行`npm install -g jshint`命令，显示`jshint`安装成功，版本为0.29.5，还添加了31个包。接着执行`npm ls -g --depth=0`命令，列出全局安装的包，如`npm@5.0.0`等。最后出现`npm ERR! peer dep missing`错误提示，指出`vue@^2.1.5`依赖未找到，被`weex-vue-render@0.2.0`所需。该图片与文档中介绍npm全局安装`jshint`的内容相关，直观呈现了操作及结果。](https://file.wulicode.com/feishu-images/b1fcc481571301b86fd0890773ad8eec.jpg)

安装后可以使用 `npm ls -g --depth=0` 查看安装在全局第一层的包。

### 全局安装的权限问题

在全局安装时可能会遇到 `EACCES` 权限问题，解决办法办法有如下 3 种：

**1.**`**sudo npm install -g jshint**`**，使用** `**sudo**`\*\* 简单粗暴，但是治标不治本\*\*

**2.修改 npm 全局默认目录的权限**

先获取 npm 全局目录：`npm config get prefix`，一般都是 `/usr/local`； 然后修改这个目录权限为当前用户：

```Plaintext
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

**3.使用其他包管理器帮你解决这个问题**

实在懒得弄可以直接卸载 node，然后使用 Homebrew 重装 node:

```Plaintext
brew install node
```

Homebrew 会帮我们处理好权限的问题。

### 更新全局的 package

想知道哪些包需要更新，可以使用 `npm outdated -g --depth=0`，然后使用 `npm update -g <package>`更新指定的包：

![图片展示了在终端中使用`npm outdated -g --depth=0`命令查看全局包更新情况的界面。终端显示了cnpm、flow-bin等全局包的当前版本、所需版本、最新版本及位置信息，如cnpm当前版本4.5.0，所需版本5.1.6等。下方还显示了`npm update -g vue-template-compiler`命令执行结果，更新了3个包，耗时1.782秒。该图片与文档中介绍更新全局包的内容相关，直观呈现了操作及结果。](https://file.wulicode.com/feishu-images/84741bed026cad89883001e5a35ca5a0.jpg)

要更新所有全局包，可以使用 `npm update -g`，可以发现对比本地的，只是多了个 `-g`。

不过官方说在 2.6.1 以下的 npm ，直接使用 `npm update -g` 并不安全，因为它会递归地更新所有全局依赖。

这种情况下可以使用 `npm-check` ，贴一张它的截图：

![图片展示的是npm-check的运行结果。在终端中执行`npm-check`命令后，显示了多个npm包的状态及更新信息。如angular、angular-animate、angular-aria等包的本地安装已过时，需更新至1.4.5版本；lodash包在package.json中有但未安装；ng-input包有新版本可用，可更新至0.8.0等。图片直观呈现了npm包的更新情况，与文档中介绍的`npm-check`用于检查全局安装的npm包是否过时的内容相契合。](https://file.wulicode.com/feishu-images/077759ea291ec00cf3ebc3ab431abcff.png)

Github 地址：[https://github.com/dylang/npm-check](https://github.com/dylang/npm-check)

### 卸载全局 package

一句搞定：`npm uninstall -g <package>`

## 其他命令

### npm run

> 部分摘自 阮一峰的 NPM 教程

脚本部分的文档 :

npm 还可以直接运行 `package.json` 中 `scripts` 指定的脚本：

```Plaintext
{
    "name":"demo",
    "scripts":{
        "lint":"jshint **.js",
        "test":"mocha test/"
    }
}
```

**npm run 是 npm run-script 的缩写。**

命令行输入 `npm run lint` 或者 `npm run-script lint` 就会执行 `jshint **.js` 。

> npm run 会创建一个Shell，执行指定的命令，并临时将node_modules/.bin加入PATH 变量，这意味着本地模块可以直接运行。

`package.json` 中的 `scripts` 执行的脚本是本地项目内 `node_modules` -> `.bin` 内的脚本。

```Plaintext
"scripts": {
    "build": "weex-builder src dist",
    "build_plugin": "webpack --config ./tools/webpack.config.plugin.js --color",
    "dev": "weex-builder src dist -w",
    "serve": "serve -p 8080"
}
```

![图片展示了在终端中执行`npm install`命令后，项目文件夹下的`node_modules`目录及其中部分依赖包。左侧为项目文件夹结构，右侧是`node_modules`目录下的文件和目录。其中，`acorn`、`browser-pack`等依赖包被红色框突出显示。该图片与文档中介绍`npm install`命令的内容相关，直观呈现了安装依赖包后的项目结构情况。](https://file.wulicode.com/feishu-images/13ea8d2502906dd0a7aa95c020d01334.png)

**直接运行** `npm run`会列出当前项目的 **`package.json`** 中 **`scripts`** 属性下的所有脚本命令

### npm install

全局安装包

```Plaintext
npm install -g package_name
```

npm install 也可以直接从 github 下载:

```Plaintext
$ npm install git://github.com/package/path.git
$ npm install git://github.com/package/path.git#0.1.0
```

### npm uninstall

```Plaintext
# 安装全局包
npm uninstall <package-name>

# 卸载全局包
npm uninstall -g <package-name>
```

### npm info

`npm info <package-name>` 可以查看指定包的信息：

![图片展示了在终端中使用`npm info`命令查看`flow`包信息的界面。终端显示了`flow`包的名称、版本、描述、URL、作者邮箱、依赖项等信息，如版本为`0.2.3`，描述为“Flow-JS使在Node或浏览器中表达多步骤异步逻辑变得简单”，还列出了其在GitHub的仓库地址等。该图片与文档中介绍`npm info`命令查看指定包信息的内容相关，直观呈现了命令执行结果。](https://file.wulicode.com/feishu-images/6ac5652784d6cab0e68cfde7a70871a0.jpg)

### npm adduser

`npm adduser` 用于在npmjs.com注册一个用户:

```Plaintext
$ npm adduser
Username: YOUR_USER_NAME
Password: YOUR_PASSWORD
Email: YOUR_EMAIL@domain.com
```

### npm home/repo

`npm home <package-name>`命令可以打开指定模块的主页； `npm repo <package-name>`命令则是打开指定模块的代码仓库。

### npm prune

prune 即“修剪”的意思。

`npm prune` 可以检查出当前项目的 `node_modules`目录中，没有在 `package.json`里提到的模块。

### npm publish

现在水平还不够，等写出可以复用的 JS 代码后，我们就可以将它发布到 npm 仓库上，类似 Github 的提交。

> 这部分主要摘自阮一峰的 NPM 教程

要想发布，首先需要使用 `npm adduser`向 `npmjs.com`申请用户名（当然去官网也可以）。

接着使用 `npm login` 在命令行中登录。

登录以后，就可以使用 `npm publish`命令发布。

```Plaintext
$ npm publish
```

如果当前模块是一个beta版，比如1.3.1-beta.3，那么发布的时候需要使用tag参数，将其发布到指定标签，默认的发布标签是latest。

```Plaintext
$ npm publish –tag beta
```

如果发布私有模块，模块初始化的时候，需要加上scope参数。只有npm的付费用户才能发布私有模块。

```Plaintext
$ npm init –scope=<yourscope>
```

如果你的模块是用ES6写的，那么发布的时候，最好转成ES5。首先，需要安装Babel。

```Plaintext
$ npm install --save-dev babel-cli@6 babel-preset-es2015@6
```

然后，在`package.json`里面写入`build`脚本。

```Plaintext
"scripts": {
    "build": "babel source --presets babel-preset-es2015 --out-dir distribution",
    "prepublish": "npm run build"
}
```

运行上面的脚本，会将source目录里面的ES6源码文件，转为 distribution 目录里面的ES5源码文件

### npm fund

查询 [所有/指定包] 筹款信息

```Bash
$ npm fund [<pkg>]
```

```Plaintext
liexiang
├─┬ https://github.com/chalk/chalk?sponsor=1
│ │ └── chalk@4.1.2
│ └── https://github.com/chalk/ansi-styles?sponsor=1
│     └── ansi-styles@4.3.0
└── https://github.com/sponsors/sindresorhus
    └── open@8.4.2, is-docker@2.2.1
```

### npx

`npx` 本质上是一个「找命令 + 必要时临时装」的执行器，直接敲命令则完全依赖 PATH。

**查找顺序的差别**

|  | **直接运行 `xxx`** | **`npx xxx`** |
|-|-|-|
| 找哪里 | 只找 shell 的 PATH（全局安装的 bin） | ① 当前项目 `node_modules/.bin` → ② 全局 → ③ 都没有就从 registry 下载到 `~/.npm/_npx` 临时执行 |
| 版本 | 全局那一份，容易和项目 `package.json` 里的版本不一致 | 优先用项目锁定的版本 |
| 是否污染全局 | 需要先 `npm i -g` | 不需要，用完留在缓存里 |

**实际影响**

- **项目内一致性**：团队里 A 全局装了 `vite@4`、B 装了 `vite@6`，直接敲 `vite` 结果不同；`npx vite` 都会命中项目里锁定的那份。
- **`package.json` 的 scripts 里不需要 npx**：npm/pnpm 执行 script 时会自动把 `node_modules/.bin` 加进 PATH，写 `"dev": "vite"` 就够了，加 `npx` 只是多一层解析开销。
- **一次性脚手架**：`npx create-vite@latest`、`npx sass-migrator` 这种跑一次就不再用的，用 npx 最合适。
- **风险点**：npx 把「本地执行」和「远程下载执行」混在一个命令里。名字打错（typosquatting）时它可能默默下载一个同名恶意包。npm 7+ 会弹确认提示，但 `-y` 会跳过

## 国内镜像

不翻的话有时候 npm 比较卡，可以使用国内的淘宝镜像 cnpm：[https://npmmirror.com](https://npmmirror.com)

`cnpm` 支持 `npm` 除了 `publish` 之外的所有命令

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

### 使用 nrm 

nrm 是 NPM Registry Manager 的缩写, 通过他可以快速切换源, 文档地址 : [https://www.npmjs.com/package/nrm](https://www.npmjs.com/package/nrm), nrm 同样也可以适用于 yarn 和 pnpm 等工具

```Plain Text
$ npm install -g nrm
$ yarn global add nrm
```

```Plain Text
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

### 临时更换访问源

通过 npm 命令指定下载源

```Plain Text
# 在使用时候临时指定
$ npm --registry https://registry.npmmirror.com info express
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
$ npm install microtime \\
  --registry=http://registry.npmmirror.com \\
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

- https://packages.aliyun.com/ - Aliyun 制品仓库

使用 aliyun 设置的制品仓库  + nrm 可以更好的设定环境并且使用内部的制品库

```Bash
# 添加 code
$ nrm add codeup https://packages.aliyun.com/******/npm/npm-registry/

# 使用 codeup
$ nrm use codeup

# 查看当前设置的源
$ nrm ls
  npm ---------- <https://registry.npmjs.org/>
  ...
  npmMirror ---- <https://skimdb.npmjs.com/registry/>
* codeup ------- <https://packages.aliyun.com/****/npm/npm-registry/>
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

## Thanks

::: info 🔗

参考资料: 
- <a href="https://cloud.tencent.com/developer/article/1438055">npm 与 package.json 快速入门教程</a>
- <a href="https://docs.npmjs.com/">https://docs.npmjs.com/</a>

:::