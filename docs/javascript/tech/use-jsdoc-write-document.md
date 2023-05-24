# [转+] 用 JSDOC 编写 JavaScript 文档

JSDOC 是一个 API 文档生成器，你只需要在代码中添加特定格式的注释，它就可以从注释中为你生成 HTML 文档。


## 安装
全局安装：
```
$ npm install -g jsdoc
```
如果你更倾向项目内使用，你也可以选择：
```
$ npm install jsdoc --save-dev
```

## 基本使用
使用 JSDOC 非常简单，先为 JavaScript 文件写好注释，然后用 JSDOC 去解析即可：
```
/path/to/jsdoc file1.js file2.js ...
```
但这种方式只适合少量文件时使用，当文件数量多了，再加上其他参数，维护起来就会非常麻烦。 所以更好的做法是编写一份配置文件 `jsdoc.json`，然后通过 `-c` 参数来指定：
```
/path/to/jsdoc -c jsdoc.json
```
无论 JSDOC 是通过全局安装，还是局部安装，都建议使用 npm scripts 来调用它，即在 `package.json` 的 `scripts` 中添加命令(这里命名成 `build:doc`，可以根据自己爱好定义其他名字)：
```
{
  "scripts": {
    "doc": "jsdoc -c jsdoc.json"
  }
}
```
这样我们就可以通过 `npm run doc` 来生成文档了。

如果实现修改文件后自动生成文档，只需要用类似 `nodemon` 之类的工具，监听指定文件的变化，然后再自动执行 `npm run doc` 就好了！

## 配置文件
JSDOC 的配置项非常多，最常用的是下面这些：
```
{
  "source": {
    "include": [ "src/" ],
    "exclude": [ "src/libs" ]
  },
  "opts": {
    "template": "node_modules/docdash",
    "encoding": "utf8",
    "destination": "./docs/",
    "recurse": true,
    "verbose": true
  }
}
```

- `source` 表示传递给 JSDOC 的文件
- `source.include` 表示 JSDOC 需要扫描哪些文件
- `source.exclude` 表示 JSDOC 需要排除哪些文件
- `opts` 表示传递给 JSDOC 的选项
- `opts.template` 生成文档的模板，默认是 `templates/default`
- `opts.encoding` 读取文件的编码，默认是 `utf8`
- `opts.destination` 生成文档的路径，默认是 `./out/`
- `opts.recurse` 运行时是否递归子目录
- `opts.verbose` 运行时是否输出详细信息，默认是 `false`

## 注释
我们知道，JSDOC 的工作原理是通过分析 JavaScript 文件中的注释来生成 HTML 文档的。 但是，如果想 JSDOC 生成正确的结果，我们需要编写正确格式的注释才行。它接受如下格式的注释：
```
/**
 * @author Scarlex
 * @class
 * @name Application
 * @description Base Class of Application.
 * @param {Element} canvas The canvas dom element.
 * @param {Object} options The options of Application. See {@link Option} for detail.
 * @return {Application}
 *
 * @example
 * // create your application
 * new Application(canvas, options);
 */
export default class Aplication {
  /**
   * @private
   * @function
   * @name Application#intialize
   * @description Initialize the application.
   */
  initialize() {
  }
}
```
这是我们在 JavaScript 中常见的级块注释。 需要注意的是，JSDOC 的解析器要求注释必须以 `/**` 开头，如果是以 `/*` 、 `/***` 或多于三个星号的注释都会被忽略。

### 标签 (Tags)
有了这种级块注释，我们就可以在里面根据需要编写文档了。JSDOC 为我们提供了非常丰富的标签，它的解析器会对这些标签进行额外处理。这些标签大概可以分成两类：级块标签和行内标签。

- **级块标签**：位于注释的最顶层。JSDOC 中绝大部分标签都是级块标签。
- **行内标签**：位于级块标签内的标签，如 `@link`、`@tutorial`。

下面介绍一些常见的级块标签：

- `@author` 该类/方法的作者。
- `@class` 表示这是一个类。
- `@function/@method` 表示这是一个函数/方法(这是同义词)。
- `@private` 表示该类/方法是私有的，JSDOC 不会为其生成文档。
- `@name` 该类/方法的名字。
- `@description` 该类/方法的描述。
- `@param` 该类/方法的参数，可重复定义。
- `@return` 该类/方法的返回类型。
- `@link` 创建超链接，生成文档时可以为其链接到其他部分。
- `@example` 创建例子。

### 命名路径 (Namepaths)
不知道你有没有发现，上面例子中是用 `Application#initialize` 来表示一个实例方法的。如果是静态方法，那应该怎么表示呢？JSDOC 有自己的解析规则：

- `Constructor.Method` 表示静态方法
- `Constructor#Method` 表示实例方法
- `Constructor~Method` 表示内部方法

了解了这些之后，我们就可以用 JSDOC 为 JavaScript 代码编写文档了，快去试试吧！

## 使用 Docstrap
由于 JSDoc 默认的文档模板比较单调，而 docstrap 提供了 14+种 bootstrap 风格的模板，因此建议下载 docstrap

- [github](https://github.com/docstrap/docstrap)

### 安装
```
$ npm i ink-docstrap
$ yarn add ink-docstrap -D
```
**移除 Docstrap 对 google 字体的引用**

由于引用了 google 字体，国内环境下会导致页面卡顿。

打开 `node_modules\ink-docstrap\template\static\styles` 目录，将所有引用 google 字体的内容删除：
```
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500");
```
指定模板：在 jsdoc 的配置文件 conf.json 下的 template 选项 配置为 docstrap/template 即可

如果要手动修改模板样式：修改文件
```
docstrap\template\tmpl\details.tmpl
```

### Docstrap 模板配置项说明参考
Docstrap 使用的还是 jsdoc 的配置项，同时新增了几个配置项。打开 `node_modules/ink-docstrap/template/jsdoc.conf.json` 文件，这里面 templates 那部分就是 Docstrap 新增的配置项。
```
{
    ...
    "templates": {
        "systemName"            : "{string}",
        "footer"                : "{string}",
        "copyright"             : "{string}",
        "includeDate"           : "{boolean}",
        "navType"               : "{vertical|inline}",
        "theme"                 : "{theme}",
        "linenums"              : "{boolean}",
        "collapseSymbols"       : "{boolean}",
        "inverseNav"            : "{boolean}",
        "outputSourceFiles"     : "{boolean}" ,
        "outputSourcePath"      : "{boolean}",
        "dateFormat"            : "{string}",
        "syntaxTheme"           : "{string}",
        "sort"                  : "{boolean|string}"
    }
    ...
}
```
解释下其中几个配置项的作用：

- outputSourceFiles：是否输出 js 源文件，也就是生成的 jsdoc 里是否显示源 js 文件的链接。不想让用户看到 js 源文件的话，这项改成 false，或者整个 default 项删除也行。
- systemName：js 产品的名称。也就是生成的 jsdoc 页面上方的名称。这个改成你自己的。
- copyright：版权信息。
- navType：导航方式。就是页面上方的 Classes 导航下拉菜单。支持 vertical 和 inline 两种方式。建议用 vertical。inline 我觉得不方便。
- theme：皮肤模板。默认这个就挺好。Docstrap 现在提供了 13 种效果。感兴趣的，可以自己去看看其它效果：[https://github.com/terryweiss/docstrap](https://github.com/terryweiss/docstrap)
- linenums：是否显示所在行数。比如当前方法位于 js 源文件 12 行。false 的话，就不显示这个信息。
- collapseSymbols：是否将类，方法，属性等 doc 信息以加号的方式收起。

Docstrap 提供了一个默认的配置文件可供参考：
```
node_modules\ink-docstrap\template\jsdoc.conf.json
```

### 创建和编辑 JSDoc 配置文件
JSDoc 提供的默认配置文件在这里：
```
node_modules\jsdoc\gen.json
```
结合 JSDoc 和 Docstrap 的默认配置，我们创建一个项目使用的配置文件。

在项目目录新建一个 json 文件，如：`jsdoc-conf.json`，内容参考如下：
```json
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
        "include": ["src"],                     //JavaScript 文件(目录)列表
        "exclude": ["src/core", "src/ui"],      //在 include 中需要过滤的文件(目录)
        "includePattern": ".+\\.(js|es)$"       //正则过滤符合规则的文件
    },
    "plugins": ["plugins/markdown"],            //使用markdown 插件
    "markdown": {
        "tags": ["file"],             //增加额外需要解析的标签
        "excludeTags": ["author"],  //排除不用解析的标签
        "parser": "gfm",            //gfm
        "hardwrap": true            //允许多行
    },
    "templates": {  //模板配置，包含了 DocStrap 的配置参数
        //"logoFile": "images/logo.png",        //logo 文件路径
        "cleverLinks": false,
        "monospaceLinks": false,
        "dateFormat": "ddd MMM Do YYYY",        //当需要打印日期时使用的格式
        "outputSourceFiles": true,              //是否输出文件源码
        "outputSourcePath": true,               //是否输出源码路径
        "systemName": "Common Modules",         //系统名称
        "footer": "",                           //页脚内容
        "copyright": "https://lzw.me.",         //页脚版权信息
        "navType": "vertical",                    //vertical 或 inline
        //docstrap 模板主题。可取值: cosmo, cyborg, flatly, journal, lumen, paper,
        //readable, sandstone, simplex, slate, spacelab, superhero, united, yeti
        "theme": "cosmo",
        "linenums": true,                       //是否显示行号
        "collapseSymbols": false,               //是否折叠太长的内容
        "inverseNav": true,                     //导航是否使用 bootstrap 的 inverse header
        "protocol": "html://",                  //生成文档使用的阅读协议
        "methodHeadingReturns": true            //method 方法标题上是否包含返回类型
    },
    //命令行执行参数配置。在这里配置了后
    //命令行只需要执行: jsdoc -c jsdoc-conf.json 即可
    "opts": {
        //"template": "templates/default",      //使用 JSDoc 默认模板
        "template": "./node_modules/ink-docstrap/template", //使用 docstrap 模板
        "destination": "./docs/",               //输出目录。等同于 -d ./out/
        "recurse": true,                        //是否递归查找。 -r
        "debug": true,                          //启用调试模式。--debug
        "readme": "README.md"                   //要写到文档首页的 readme 文档。-R README.md
    }
}
```
参考如上的示例说明编写你自己的配置。确认无误，在项目目录下执行如下命令，即可生成项目 API 文档：
```
jsdoc -c ./jsdoc-conf.json
```
**注意点：**

1. 只使用配置文件中的 opts 配置命令行参数。即只使用 -c 参数指定配置文件。因为命令行的参数与配置文件中可能出现重叠，那么就会存在优先级、合并等问题。在不清楚这些问题的情况下，可能会出现各种细节的问题。
2. source 部分的配置，应简洁清晰明了。这里的 include/exclude/includePattern/excludePattern 以及命令行中附带的文件路径，存在着优先级以及合并的问题。
3. 推荐配置 markdown 插件，这对详细注释很有帮助。
4. 遇到错误或奇怪的问题时，多查阅官方文档。[JSDoc 中文文档](http://www.css88.com/doc/jsdoc/)
5. 理解名称路径，有利于书写和生成更合适的文档。
6. ES6 模块化方式，某些情况下对导出模块的声明，可借助 `@alias` 标签。示例
```javascript
/**
 * @file test
 * @module test
 */
let abc = 'abc...';
/**
 * @alias module:test
 */
const test = {
    abc: abc
};
export default test;
```
**使用 IDE 编辑器插件快速生成**

通过 IDE 插件，在编辑器中可以快速的插入 JSDoc 规范的注释。大型的 IDE 则甚至在内核中已集成相关功能。

例如使用 `/** + enter` 便可以在 jetbrains 中生成文档

**sublime text 插件**

DocBlockr ([https://github.com/spadgos/sublime-jsdocs](https://github.com/spadgos/sublime-jsdocs))

**vscode 插件**

add jsdoc comments

使用命令:
```
$ jsdoc -c path/to/conf.json -t ./node_modules/ink-docstrap/template -R README.md -r .
```

## 参考

- [官方文档](http://usejsdoc.org/)
- [github - docstrap](https://github.com/docstrap/docstrap)
- [用 JSDOC 编写 JavaScript 文档](https://scarletsky.github.io/2017/12/23/write-javascript-document-by-jsdoc/)
- [HBuilder JSDoc+规范](http://ask.dcloud.net.cn/article/129)
- [JSDuck](https://github.com/senchalabs/jsduck)

