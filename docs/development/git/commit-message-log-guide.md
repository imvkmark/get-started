---
description: '本文介绍了Git Commit message的作用、标准格式（Header/Body/Footer/Revert），以及Commitizen和validate-commit-msg工具的使用，最后说明如何基于规范生成Change log。'
lastUpdated: '2026-06-17 16:42:04'
head:
  - - meta
    - name: 'og:title'
      content: 'Git Commit message 和 Change log 编写指南'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了Git Commit message的作用、标准格式（Header/Body/Footer/Revert），以及Commitizen和validate-commit-msg工具的使用，最后说明如何基于规范生成Change log。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//development/git/commit-message-log-guide.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/722d7f116df43ff34938ed8a26a6264a.png'
---
# Git Commit message 和 Change log 编写指南

::: info ℹ️
原文地址 : [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
:::

Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交

```Plaintext
$ git commit -m "hello world"
```

上面代码的 `-m` 参数，就是用来指定 commit mesage 的。

如果一行不够，可以只执行`git commit`，就会跳出文本编辑器，让你写多行

```Plaintext
$ git commit
```

基本上，你写什么都行（[这里](https://blog.no-panic.at/2014/10/20/funny-initial-git-commit-messages/)）

![](https://file.wulicode.com/feishu-images/722d7f116df43ff34938ed8a26a6264a.png)

但是，一般来说，commit message 应该清晰明了，说明本次提交的目的

![](https://file.wulicode.com/feishu-images/98522d76215c85e03fa3da5306ca78cb.png)

目前，社区有多种 Commit message 的[写法规范](https://github.com/ajoslin/conventional-changelog/blob/master/conventions)。本文介绍[Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)（见上图），这是目前使用最广的写法，比较合理和系统化，并且有配套的工具。

## 一、Commit message 的作用

格式化的Commit message，有几个好处。

**（1）提供更多的历史信息，方便快速浏览。**

比如，下面的命令显示上次发布后的变动，每个commit占据一行。你只看行首，就知道某次 commit 的目的。

```Plaintext
$ git log <last tag> HEAD --pretty=format:%s
```

![](https://file.wulicode.com/feishu-images/bfbac1af5c8a88ec7af35ed352f1cb9f.png)

**（2）可以过滤某些commit（比如文档改动），便于快速查找信息。**

比如，下面的命令仅仅显示本次发布新增加的功能。

```Plaintext
$ git log <last release> HEAD --grep feature
```

**（3）可以直接从commit生成Change log。**

Change Log 是发布新版本时，用来说明与上一个版本差异的文档，详见后文。

![](https://file.wulicode.com/feishu-images/3c20aa36c8d599397b31e9c69021c551.png)

## 二、Commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```Plaintext
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

### 2.1 Header

Header部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和`subject`（必需）。

**（1）type**

`type`用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

如果 `type` 为 `feat` 和 `fix` ，则该 commit 将肯定出现在 Change log 之中。其他情况（ `docs`、`chore`、`style`、`refactor`、`test`）由你决定，要不要放入 Change log，建议是不要。

**（2）scope**

`scope` 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

**（3）subject**

`subject` 是 commit 目的的简短描述，不超过50个字符。

- 以动词开头，使用第一人称现在时，比如 `change` ，而不是 `changed` 或 `changes`
- 第一个字母小写
- 结尾不加句号（`.`）

### 2.2 Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

```Plaintext
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

有两个注意点。

（1）使用第一人称现在时，比如使用 `change` 而不是 `changed` 或 `changes`

（2）应该说明代码变动的动机，以及与以前行为的对比

### 2.3 Footer

Footer 部分只用于两种情况。

**（1）不兼容变动**

如果当前代码与上一个版本不兼容，则 Footer 部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。

```Plaintext
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

**（2）关闭 Issue**

如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。

```Plaintext
Closes #234
```

也可以一次关闭多个 issue 。

```Plaintext
Closes #123, #245, #992
```

### 2.4 Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以`revert:`开头，后面跟着被撤销 Commit 的 Header。

```Plaintext
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body部分的格式是固定的，必须写成`This reverts commit &lt;hash>.`，其中的`hash`是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的`Reverts`小标题下面。

## 三、Commitizen

[Commitizen](https://github.com/commitizen/cz-cli) 是一个撰写合格 Commit message 的工具。

安装命令如下

```Plaintext
$ npm install -g commitizen
```

然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式

cz 的工具这里并没有选择 https://github.com/commitizen/cz-conventional-changelog 而是选择了 https://github.com/Zhengqbbb/cz-git

[cz-git - commitizen adapter and CLI](https://cz-git.qbb.sh/zh/)

cz-git - 工程性更强，轻量级，高度自定义，输出标准格式的 Commitizen 适配器和 CLI

```Plaintext
$ pnpm install -D cz-git
```

以后，凡是用到 `git commit` 命令，一律改为使用 `git cz`。这时，就会出现选项，用来生成符合格式的 Commit message

![](https://file.wulicode.com/feishu-images/77a6ca256aeff2aec69d7b746c6a3b0a.png)

## 四、validate-commit-msg

⚠️ 使用 Husky 替换本插件

使用 husky 让代码提交优雅规范

## 五、生成 Change log

如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成。

生成的文档包括以下三个部分。

- New features
- Bug fixes
- Breaking changes.

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

[conventional-changelog](https://github.com/ajoslin/conventional-changelog) 就是生成 Change log 的工具，运行下面的命令即可。

```Plaintext
$ npm install -g conventional-changelog-cli
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -o CHANGELOG.md
```

上面命令不会覆盖以前的 Change log，只会在 `CHANGELOG.md` 的头部加上自从上次发布以来的变动。

如果你想生成所有发布的 Change log，要改为运行下面的命令。

```Bash
$ conventional-changelog -p angular -i CHANGELOG.md -o CHANGELOG.md -r 0
```

为了方便使用，设置 `package.json` 的`scripts`字段

```Bash
$ npm pkg set scripts.changelog="conventional-changelog -p angular -i CHANGELOG.md -o CHANGELOG.md"
```

或者手动填入命令

```JSON
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -o CHANGELOG.md"
  }
}
```

以后，直接运行下面的命令即可。

```Bash
$ npm run changelog
```

::: info 📆
更新记录
**2023年11月25日**
- validate-commit-msg 插件推荐使用 husky 替代
- changelog 包拆离并且更新 shell 命令
- 移除错误链接
:::