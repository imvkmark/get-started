
# ESLint 使用入门

::: info 原文地址
~~[ESLint 使用入门](http://csspod.com/getting-started-with-eslint/)~~
:::

ESLint 是一个开源的JavaScript验证工具，相比[JSLint](http://www.oschina.net/p/jslint)，ESLint具有可配置性。其他跟JSLint 的不同之处：

- ESLint 使用 Esprima 来进行 javascript 解析
- ESLint 使用 AST 来修改代码模式
- ESLint 是完全可插的，每个单个的规则都是一个插件，用户可以在运行时增加更多的插件

在团队协作中，为避免低级 Bug、产出风格统一的代码，会预先制定编码规范。使用 Lint 工具和代码风格检测工具，则可以辅助编码规范执行，有效控制代码质量。

在以前的项目中，我们选择 JSHint 和 JSCS 结合使用，WebStorm 等开发环境已经支持这些工具，使用起来很顺手。然而，最近使用 React JSX 语法时，却遇到了问题：JSHint 不支持 JSX
语法。虽然有 [JSXHint](https://github.com/STRML/JSXHint) 这样的 JSHint
衍生工具，但个人并不喜欢这样的实现方式：不是以插件的形式实现，而是重新重新包装了一个工具。[Nicholas C. Zakas](http://www.nczonline.net/)
也不喜欢，所以有了 [ESLint](http://eslint.org/)。

原来选择 JSHint 的时候，也对比过 ESLint，基于 ESLint 在速度上比 JSHint 要[慢一些](https://github.com/eslint/eslint#how-does-eslint-performance-compare-to-jshint)
，最终使用了 JSHint。现在需要 JSX 支持了，才发现 ESLint 的设计理念更符合实际需求。

## ESLint 简介

ESLint 由 [JavaScript 红宝书](http://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691/ref=sr_1_13?tag=nczonline-20) 作者 Nicholas
C. Zakas 编写， 2013 年发布第一个版本。 NCZ
的初衷不是重复造一个轮子，而是在实际需求得不到 [JSHint 团队响应](https://github.com/eslint/eslint#why-dont-you-like-jshint) 的情况下做出的选择：以可扩展、每条规则独立、不内置编码风格为理念编写一个
lint 工具。

ESLint 主要有以下特点：

- 默认规则包含所有 JSLint、JSHint 中存在的规则，易迁移；
- 规则可配置性高：可设置「警告」、「错误」两个 error 等级，或者直接禁用；
- 包含代码风格检测的规则（可以丢掉 JSCS 了）；
- 支持插件扩展、自定义规则。

ESLint 已经[宣布支持 JSX](http://eslint.org/blog/2014/11/es6-jsx-support/)，不过目前为 alpha
版本，正式版发布之前可以先使用 [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) 替代。

## 使用 ESLint

ESLint 详尽使用参见[官方文档](http://eslint.org/docs/user-guide/configuring)，下面罗列的是由 JSHint 迁移到 ESLint 的一些要点。

### 配置

可以通过以下三种方式配置 ESLint:

- 使用 `.eslintrc` 文件（支持 JSON 和 YAML 两种语法）；
- 在 `package.json` 中添加 `eslintConfig` 配置块；
- 直接在代码文件中定义。

`**.eslintrc**`** 文件示例**：

```
{
  "env": {
    "browser": true,
  },
  "globals": {
    "angular": true,
  },
  "rules": {
    "camelcase": 2,
    "curly": 2,
    "brace-style": [2, "1tbs"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "space-in-brackets": [2, "never"],
    "space-infix-ops": 2,
  }
}
```

`.eslintrc` 放在项目根目录，则会应用到整个项目；如果子目录中也包含 `.eslintrc` 文件，则子目录会忽略根目录的配置文件，应用该目录中的配置文件。这样可以方便地对不同环境的代码应用不同的规则。

`**package.json**`** 示例：**

```
{
  "name": "mypackage",
  "version": "0.0.1",
  "eslintConfig": {
    "env": {
      "browser": true,
      "node": true
    }
  }
}
```

**文件内配置**

代码文件内配置的规则会覆盖配置文件里的规则。

**禁用 ESLint：**

```
/* eslint-disable */
var obj = { key: 'value', }; // I don't care about IE8  
/* eslint-enable */
```

**禁用一条规则：**

```
/*eslint-disable no-alert */
alert('doing awful things');  
/* eslint-enable no-alert */
```

**调整规则：**

```
/* eslint no-comma-dangle:1 */
// Make this just a warning, not an error
var obj = { key: 'value', }
```

### 工作流集成

ESLint 可以[集成](http://eslint.org/docs/user-guide/integrations)到主流的编辑器和构建工具中，以便我们在编写的代码的同时进行 lint。

**编辑器集成**

以 WebStorm 为例，只要全局安装 ESLint 或者在项目中依赖中添加 ESLint ，然后在设置里开启 ESLint
即可。其他编辑可以从[官方文档](http://eslint.org/docs/user-guide/integrations)中获得获得具体信息。

**构建系统集成**

在 Gulp 中使用：

```
var gulp = require('gulp');  
var eslint = require('gulp-eslint');
gulp.task('lint', function() {  
  return gulp.src('client/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});
```

其他构建工具参考官方文档。

### 代码风格检测

在团队协作中，统一的代码风格更具可读性、可维护性。ESLint 内置了一系列有关代码风格的[规则](http://eslint.org/docs/rules/#stylistic-issues)，可以根据团队的编码规范设置。

### 自定义规则

显然，ESLint 内置的规则不可能包罗所有需求。可以通过插件实现自定义规则，这是 ESLint 最有卖点的功能。在 NPM
上以 [eslintplugin](https://www.npmjs.com/browse/keyword/eslintplugin)
为关键词，可以搜索到很多插件，包括 [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
。如果有自行开发插件的需求，可以阅读 [ESLint 插件开发文档](http://eslint.org/docs/developer-guide/working-with-plugins)。

以 eslint-plugin-react 为例，安装以后，需要在 ESLint 配置中开启插件，其中 `eslint-plugin-` 前缀可以省略：

```
{
  "plugins": [
      "react"
  ]
}
```

接下来开启 ESLint JSX 支持（ESLint 内置选项）：

```
{
  "ecmaFeatures": {
    "jsx": true
  }
}
```

然后就可以配置插件提供的规则了：

```
{
  "rules": {
    "react/display-name": 1,
    "react/jsx-boolean-value": 1
  }
}
```

自定义规则都是以插件名称为命名空间的。

## 结语

至此，ESLint 使用入门就介绍完了。但是，我们不应该仅仅是使用 ESLint 这个工具，更应该学习 ESLint 背后的设计理念：不求大而全，但求**搭好扎实的基础架构，提供良好的、可扩展的
API**。小到插件，大到应用程序开发，这一原则都适用。

由此，很容易让我联想到 WordPress —— 不用修变源代码，通过 hook、filter 机制实现前台、后台所有功能的定制、扩展，其成功离不开这一特性。

Coding 之外，《罗辑思维》所倡导的「[U 盘化生存](http://v.youku.com/v_show/id_XNTA2NDQ4MzIw.html)
」（自带信息，不装系统，随时插拔，自由协作）不也是这样一种理念吗？不是我不明白，这世界变化快。经验固然有用，但在日新月异的技术潮流中，学习、适应能力更为重要。

参考文章:[插件式Javascript验证工具 ESLint](http://www.kankanews.com/ICkengine/archives/136395.shtml)

