# 「转」使用 husky 让代码提交优雅规范

::: info 原文
[手摸手教你使用最新版husky(v7.0.1)让代码更优雅规范](https://juejin.cn/post/6982192362583752741)
:::

## 写在前面

日常工作中，几乎每个项目都是由多个人进行维护，每个人的代码书写习惯和风格又不尽相同，在这种情况下，如果没有统一的规范，你就会发现提交到代码仓库的代码格式五花八门，并且`commit log`
也是乱七八糟，更严重点可能有的小伙伴在提交代码的时候为了省事`commit message`
直接就是两个点点，总之，可能就是怎么省事怎么来。最终导致的结果就是，当你某一天需要 `cherry-pick`某个`commit`
到另外的分支的时，看着`commmit log`
一脸懵逼。所以，规范和约束在多人协作下，就显得尤为重要。

## githooks

类似于前端框架中的生命周期钩子，git在某些特定事件发生前或后也会有某些执行特定功能的钩子，githooks就是在git执行特定事件（如commit、push、receive等）时触发运行的脚本。

githooks 保存在 .git 文件夹中

具体钩子如下表所示：

| Git Hook              | 执行时机                                                                                                     | 说明                                                        |
|-----------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| applypatch-msg        | git am 执行前                                                                                               | 默认情况下，如果commit-msg启用的话，applpatch-msg钩子在启用时会运行commit-msg钩子 |
| pre-applypatc         | git am 执行前                                                                                               | 默认的pre-applypatch钩子在启用时运行pre-commit钩子（如果后者已启用）            |
| post-applypatch       | git am 执行后                                                                                               | 这个钩子主要用于通知，不能影响git-am的结果                                  |
| pre-commit            | git commit 执行前                                                                                           | 可以使用 git commit --no verify 命令绕过该钩子                       |
| pre-merge-commit      | git merge 执行前                                                                                            | 可以使用 git merge --no verify 命令绕过该钩子                        |
| prepare-commit-msg    | git commit执行之后，编辑器打开之前                                                                                   |                                                           |
| commit-msg            | git commit 执行前                                                                                           | 可以使用 git commit --no verify 命令绕过该钩子                       |
| post-commit           | git commit 执行后                                                                                           | 不影响git commit的结果                                          |
| pre-rebase            | git rebase执行前                                                                                            |                                                           |
| post-checkout         | git checkout 或 git switch执行后                                                                             | 如果不使用 --no-checkout 参数，则在 git clone 之后也会执行                |
| post-merge            | git merge 执行后                                                                                            | 在执行git pull 时也会被调用                                        |
| pre-push              |                                                                                                          | git push 执行前                                              |
| pre-receive           | git receive pack 执行前                                                                                     |                                                           |
| update                |                                                                                                          |                                                           |
| proc-receive          |                                                                                                          |                                                           |
| post-receive          | git receive pack 执行前                                                                                     | 不影响 git receive pack 的执行结果                                |
| post-update           | 当git receive pack对 git push 作出反应并更新仓库中的引用时                                                               |                                                           |
| reference-transaction |                                                                                                          |                                                           |
| push-to-checkout      | 当git receive pack对 git push 作出反应并更新仓库中的引用时，以及当推送试图更新当前被签出的分支且 receive.denyCurrentBranch配置被updateInstead时 |                                                           |
| pre-auto-gc           | git gc --auto 执行前                                                                                        |                                                           |
| post-rewrite          | 执行 git commit --amend 或 git rebase 时                                                                     |                                                           |
| sendemail-validate    | git send-email 执行前                                                                                       |                                                           |
| fsmonitor-watchman    | 配置core.fsmonitor被设置为.git/hooks/fsmonitor-watchman 或.git/hooks/fsmonitor-watchmanv2时                      |                                                           |
| p4-changelist         | git-p4 submit 执行并编辑完changelist message 之后                                                                | 可以使用 git-p4 submit --no-verify绕过该钩子                       |
| p4-prepare-changelist | git-p4 submit 执行后，编辑器启动前                                                                                 | 可以使用 git-p4 submit --no-verify绕过该钩子                       |
| p4-post-changelist    | git-p4 submit 执行后                                                                                        |                                                           |
| p4-pre-submit         | git-p4 submit 执行前                                                                                        | 可以使用 git-p4 submit --no-verify绕过该钩子                       |
| post-index-change     | 索引被写入 read-cache.c do_write_locked_index后                                                                |                                                           |

## husky

husky 是一个让配置 git 钩子变得更简单的工具。支持所有的git钩子。

### 使用husky

安装

```
# npm
$ npm install husky --save-dev

# yarn
$ yarn add husky -D
```

在 `prepare` 生命周期中保障 husky 的自动安装, 保障安装之后自动启用钩子

```
# npm
$ npm set-script prepare "husky install"
```

执行完上一步的命令之后可以在 `package.json` 文件的scripts配置项中看到如下代码, 当然代码也可以手动添加

```
"scripts": {
    "prepare": "husky install"
}
```

运行 `yarn prepare` 执行 husky 安装

创建钩子，比如我们创建一个commit-msg 钩子, 这里的意思是在 git commit-msg 的时候运行 `commitlint` 校验工具

```
$ yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

## lint-staged(v11.0.0)

**lint-staged 是一个在git暂存区上运行linters的工具。**（Run linters against staged git files and don't let 💩 slip into
your code base!）

它将根据 package.json 依赖项中的代码质量工具来安装和配置 husky 和 lint-staged ，因此请确保在此之前安装（npm install
--save-dev）并配置所有代码质量工具，比如Prettier和ESlint。

- 安装：执行 `yarn add lint-staged -D` 命令

```
执行 npx lint-staged --help 命令可以看到相关的所有参数如下：
用法: lint-staged [options]

Options:
  -V, --version                      输出版本号
  --allow-empty                      当任务撤消所有分阶段的更改时允许空提交（默认值：false）
  -c, --config [path]                配置文件的路径
  -d, --debug                        打印其他调试信息（默认值：false）
  -p, --concurrent <parallel tasks>  要同时运行的任务数，或者为false则要连续运行任务（默认值：true）
  -q, --quiet                        自己的控制台输出（默认值：false）
  -r, --relative                     将相对文件路径传递给任务（默认值：false）
  -x, --shell                        跳过任务解析以更好地支持shell（默认值：false）
  -h, --help                         输出用法信息
```

- **-allow-empty**：使用此参数允许创建空的git提交。默认情况下，当LITER任务撤消所有阶段性的更改时，LITET阶段将抛出一个错误，并中止提交。

## git commit提交规范

通常使用 Google AnguarJS 规范的要求。 格式要求：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- `<type>`代表某次提交的类型，比如是修复一个 bug 或是增加一个 feature，具体类型如下：
  | 类型 | 说明 |
  | --- | --- |
  | feat | 新增feature |
  | fix | 修复bug |
  | docs | 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等; |
  | style | 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑; |
  | refactor | 代码重构，没有加新功能或者修复bug |
  | perf | 优化相关，比如提升性能、体验 |
  | test | 测试用例，包括单元测试、集成测试等 |
  | chore | 改变构建流程、或者增加依赖库、工具等 |
  | revert | 回滚到上一个版本 |


- `scope`：说明commit影响的范围。scope依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。
- `subject`:是commit的简短描述；
- `body`:提交代码的详细描述；
- `footer`:如果代码的提交是不兼容变更或关闭缺陷，则 footer 必需，否则可以省略。

## 实现

husky 准备好之后，我们接着来安装其他的用于规范，检查代码的依赖。

执行`yarn add lint-staged -D`

执行`yarn add eslint prettier -D`

在package.json文件下添加如下代码：

```
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json}": [
      "prettier --write",
      "eslint",
      "git add"
    ]
}
```

执行`yarn add @commitlint/cli @commitlint/config-conventional -D`安装commitlint相关依赖，用来帮助我们在多人开发时，遵守
git 提交约定。

执行`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`
在根目录创建 `commitlint.config.js` 文件（当然也可以手动创建此文件），其内容如下所示：

```jsx
module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    // 以下时我们自定义的规则
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'feat', // 新功能（feature）
                'fix', // 修补bug
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
                'merge' // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
            ]
        ]
    }
};
```

如果还需要别的代码优化依赖包，可以接着进行安装

至此，准备好我们需要的依赖包之后，我们开始添加钩子

执行`yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'`之后，会看到在根目录的`.husky`
文件夹下多了一个 `commit-msg` 文件，其内容如下：

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn commitlint --edit "$1"
```

紧接着，我们需要将上一步添加的钩子添加到git中去，执行`git add .husky/commit-msg`

执行`yarn husky add .husky/pre-commit 'yarn lint-staged --allow-empty "$1"'`之后，会看到在根目录的`.husky`
文件夹下多了一个 `pre-commit` 文件，其内容如下：

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged --allow-empty "$1"
```

同样的，我们需要将上一步添加的钩子添加到git中去，执行`git add .husky/pre-commit`

接下来，就是检验我么配置的时候了：当我们按照 commit规范正确提交时，可以在控制台看到如下输出

当我们不按照配置的规范来提交commit时，就会发现如下报错，并阻止你提交代码

至此，我们的钩子配置已经完美收官！

## 使用

### 安装 Husky

安装

```
$ yarn add husky -D
```

加入 Prepare, 这里将 .husky 安装到 config 目录

```
$ npm set-script prepare "husky install config/.husky"
```

或者手动加入 prepare

```json
{
  "scripts": {
    ...
    "prepare": "husky install config/.husky"
    ...
  }
}
```

运行 prepare

```
yarn prepare
```

如果在未初始化 git 的目录中运行则会出现如下错误, 这里是将 husky 自动加入 git 钩子

![image.png](https://file.wulicode.com/yuque/202208/04/23/0010KjOpmHGp.png?x-oss-process=image/resize,h_95)

### 加入 commitlint

加入 commit msg

```
yarn husky add config/.husky/commit-msg 'yarn commitlint --edit "$1"'
```

安装 commitlint 工具

```
yarn add @commitlint/cli @commitlint/config-conventional -D
```

写入文件

```jsx
module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    // 以下时我们自定义的规则
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'feat', // 新功能（feature）
                'fix', // 修补bug
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
                'merge' // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
            ]
        ]
    }
};
```

写在 `package.json` 中

```
"commitlint": {
    "extends": [
        "@commitlint/config-conventional"
    ],
    "rules": {
        "type-enum": [
            2,
            "always",
            [
                "bug",
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "test",
                "chore",
                "revert",
                "merge"
            ]
        ]
    }
}
```

