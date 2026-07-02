---
description: '使用 Husky 结合 lint-staged 及 ESLint、Stylelint、Prettier 等工具，在 Git 提交前自动检查并修复代码。通过 pnpm 安装依赖，配置提交规范，确保代码风格统一和提交流程优雅。'
lastUpdated: '2026-07-02 20:23:22'
head:
  - - meta
    - name: 'og:title'
      content: '使用 husky 让代码提交优雅规范'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用 Husky 结合 lint-staged 及 ESLint、Stylelint、Prettier 等工具，在 Git 提交前自动检查并修复代码。通过 pnpm 安装依赖，配置提交规范，确保代码风格统一和提交流程优雅。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/git/commit-grace-use-husky.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/77a9b389317168735e184ca525018e22.png'
---
# 使用 husky 让代码提交优雅规范

日常工作中，几乎每个项目都是由多个人进行维护，每个人的代码书写习惯和风格又不尽相同，在这种情况下，如果没有统一的规范，你就会发现提交到代码仓库的代码格式五花八门，并且 `commit log` 也是乱七八糟，更严重点可能有的小伙伴在提交代码的时候为了省事 `commit message` 直接就是两个点点，总之，可能就是怎么省事怎么来。最终导致的结果就是，当你某一天需要 `cherry-pick` 某个 `commit` 到另外的分支的时，看着 `commmit log` 一脸懵逼。所以，规范和约束在多人协作下，就显得尤为重要

## githooks

类似于前端框架中的生命周期钩子，git在某些特定事件发生前或后也会有某些执行特定功能的钩子，githooks 就是在 git 执行特定事件(如commit、push、receive等)时触发运行的脚本。

githooks 保存在 `.git` 文件夹中

具体钩子如下表所示：

| Git Hook | 执行时机 | 说明 |
|-|-|-|
| applypatch-msg | git am 执行前 | 默认情况下，如果 commit-msg 启用的话，applpatch-msg 钩子在启用时会运行commit-msg 钩子 |
| pre-applypatc | git am 执行前 | 默认的 pre-applypatch 钩子在启用时运行pre-commit 钩子（如果后者已启用） |
| post-applypatch | git am 执行后 | 这个钩子主要用于通知，不能影响git-am的结果 |
| pre-commit | git commit 执行前 | 可以使用 git commit –no verify 命令绕过该钩子 |
| pre-merge-commit | git merge 执行前 | 可以使用 git merge –no verify 命令绕过该钩子 |
| prepare-commit-msg | git commit执行之后，编辑器打开之前 |  |
| commit-msg | git commit 执行前 | 可以使用 git commit –no verify 命令绕过该钩子 |
| post-commit | git commit 执行后 | 不影响git commit的结果 |
| pre-rebase | git rebase执行前 |  |
| post-checkout | git checkout 或 git switch执行后 | 如果不使用 –no-checkout 参数，则在 git clone 之后也会执行 |
| post-merge | git merge 执行后 | 在执行git pull 时也会被调用 |
| pre-push |  | git push 执行前 |
| pre-receive | git receive pack 执行前 |  |
| update |  |  |
| proc-receive |  |  |
| post-receive | git receive pack 执行前 | 不影响 git receive pack 的执行结果 |
| post-update | 当git receive pack对 git push 作出反应并更新仓库中的引用时 |  |
| reference-transaction |  |  |
| push-to-checkout | 当git receive pack对 git push 作出反应并更新仓库中的引用时，以及当推送试图更新当前被签出的分支且 receive.denyCurrentBranch配置被updateInstead时 |  |
| pre-auto-gc | git gc –auto 执行前 |  |
| post-rewrite | 执行 git commit –amend 或 git rebase 时 |  |
| sendemail-validate | git send-email 执行前 |  |
| fsmonitor-watchman | 配置 core.fsmonitor 被设置为 `.git/hooks/fsmonitor-watchman` 或 `.git/hooks/fsmonitor-watchmanv2` 时 |  |
| p4-changelist | git-p4 submit 执行并编辑完changelist message 之后 | 可以使用 git-p4 submit –no-verify绕过该钩子 |
| p4-prepare-changelist | git-p4 submit 执行后，编辑器启动前 | 可以使用 git-p4 submit –no-verify绕过该钩子 |
| p4-post-changelist | git-p4 submit 执行后 |  |
| p4-pre-submit | git-p4 submit 执行前 | 可以使用 git-p4 submit –no-verify绕过该钩子 |
| post-index-change | 索引被写入 read-cache.c do_write_locked_index后 |  |

## husky

husky 是一个让配置 git 钩子变得更简单的工具。支持所有的 git 钩子, 本版本测试 `9.x`

安装

```Bash
# pnpm
$ pnpm add -D husky
```

`init` 命令简化了项目中的 husky 设置。它会在 `.husky/` 中创建 `pre-commit` 脚本，并更新 `package.json` 中的 `prepare` 脚本

```Bash
$ pnpm exec husky init
```

这样已经成功地用一个命令设置了你的第一个 Git 钩子 `.husky/pre-commit`

这里也会在 `package.json` 自动加入, 用于项目初始化时候自动初始化 husky 环境

```JSON
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### 添加 hook

使用 `echo` 脚本添加 `pre-commit` 脚本

```Bash
echo "npm test" > .husky/pre-commit
```

创建钩子，比如我们创建一个 `commit-msg` 钩子, 这里的意思是在 `git commit-msg` 的时候运行 `commitlint` 校验工具

```Bash
$ echo "npx --no -- commitlint --edit $1" > .husky/commit-msg
```

## lint-staged

https://github.com/lint-staged/lint-staged **是一个在git暂存区上运行 linters 的工具**

> Run linters against staged git files and don’t let 💩 slip into your code base

它将根据 `package.json` 依赖项中的代码质量工具来安装和配置 husky 和 lint-staged ，因此请确保在此之前安装并配置所有代码质量工具，比如 prettier 和 eslint

安装

```Bash
$ pnpm add lint-staged -D
```

执行 `npx lint-staged --help` 命令可以看到相关的所有参数如下：

```Plaintext
$ npx lint-staged --help
Usage: lint-staged [options]

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

`--allow-empty`：使用此参数允许创建空的git提交。默认情况下，当 LITER 任务撤消所有阶段性的更改时，LITET 阶段将抛出一个错误，并中止提交。

## git commit 提交规范

::: info 📖
<p>扩展阅读 <a href="https://www.wulicode.com/development/git/commit-message-log-guide.html">Git Commit message 和 Change log 编写指南</a></p>
:::

通常使用 Google AnguarJS 规范的要求。 格式要求：

```Plaintext
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- `<type>` 代表某次提交的类型，比如是修复一个 bug 或是增加一个 feature，具体类型如下：

| **类型** | **说明** |
|-|-|
| feat | 新增feature |
| fix | 修复bug |
| docs | 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等; |
| style | 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑; |
| refactor | 代码重构，没有加新功能或者修复bug |
| perf | 优化相关，比如提升性能、体验 |
| test | 测试用例，包括单元测试、集成测试等 |
| chore | 改变构建流程、或者增加依赖库、工具等 |
| revert | 回滚到上一个版本 |

- `scope`：说明 commit 影响的范围。scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分
- `subject`: 是 commit 的简短描述
- `body`: 提交代码的详细描述
- `footer`: 如果代码的提交是不兼容变更或关闭缺陷，则 footer 必需，否则可以省略

### 安装提交约定

安装 `commitlint` 相关依赖, 用来帮助我们在多人开发时，遵守 git 提交约定

```Bash
$ pnpm add @commitlint/cli @commitlint/config-conventional -D
```

在根目录创建 `commitlint.config.js` 文件，其内容如下所示：

```JavaScript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 以下是我们自定义的规则
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build", // 构建相关
        "chore", // 辅助工具的变动
        "ci", // 自动化构建
        "docs", // 文档（documentation）
        "bug", // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
        "feat", // 新功能（feature）
        "fix", // 修补bug
        "style", // 格式（不影响代码运行的变动）
        "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "test", // 增加测试
        "revert", // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
        "types", // 定义规则
      ],
    ],
  },
  prompt: {
    useEmoji: true,
  },
};
```

至此，准备好我们需要的依赖包之后，我们使用上面 husky 章节添加的钩子

待提交区代码 lint 添加到 `pre-commit` 组件, 如果之前有 `pnpm test` 相关的代码注意不要出现运行异常, 这里采用追加的方式添加

```Bash
$ echo 'npx lint-staged --allow-empty "$1"' >> .husky/pre-commit
```

接下来，就是检验配置的时候了：当我们按照 commit 规范正确提交时，可以在控制台看到如下输出

![](https://file.wulicode.com/feishu-images/77a9b389317168735e184ca525018e22.png)

当我们不按照配置的规范来提交commit时，就会发现如下报错，并阻止你提交代码

![](https://file.wulicode.com/feishu-images/42be4ffec522613507896d5d0af8b728.png)

至此，配置完成

## eslint & stylistic

以下是基于你提供的 ESLint 配置文件的**安装与初始化说明**，确保所有依赖和工具正确配置：

### 依赖安装命令

根据配置文件中使用的插件，执行以下命令安装所有必需依赖：

```Bash
# 基础依赖（ESLint 核心及扁平化配置支持）
npm install eslint eslint-flat-config-airbnb --save-dev

# TypeScript 相关（解析器和插件）
npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

# Vue 相关（解析器和插件）
npm install eslint-plugin-vue vue-eslint-parser eslint-plugin-vue-scoped-css --save-dev

# 代码风格与工具插件
npm install @stylistic/eslint-plugin eslint-plugin-simple-import-sort --save-dev
```

将 ESLint 配置文件命名为 `eslint.config.js`，放置在项目根目录（与 `package.json` 同级）。

在 `package.json` 中添加 ESLint 检查和自动修复脚本，方便日常使用：

```JSON
{
  "scripts": {
    "lint": "eslint .",                     // 检查所有文件的 ESLint 问题
    "lint:fix": "eslint . --fix"            // 自动修复可修复的 ESLint 问题
  }
}
```

关键依赖说明

| 依赖包 | 作用 |
|-|-|
| `eslint` | ESLint 核心工具，用于代码检查 |
| `eslint-flat-config-airbnb` | 适配 ESLint 扁平化配置的 Airbnb 规则集 |
| `@typescript-eslint/parser` | TypeScript 代码解析器 |
| `@typescript-eslint/eslint-plugin` | TypeScript 语法规则插件 |
| `eslint-plugin-vue` | Vue 单文件组件 (SFC) 检查插件 |
| `vue-eslint-parser` | 解析 Vue SFC 的专用解析器 |
| `@stylistic/eslint-plugin` | 代码风格规则插件（替代旧版 prettier） |
| `eslint-plugin-simple-import-sort` | 自动排序 import 语句的插件 |
| `eslint-plugin-vue-scoped-css` | Vue 作用域 CSS 检查插件 |

使用说明

**检查代码**：执行 `npm run lint`，终端会输出所有不符合规则的代码位置和原因。

**自动修复**：执行 `npm run lint:fix`，ESLint 会自动修复部分问题（如格式错误），无法自动修复的需手动调整

配置文件 `eslint.config.js`

```TypeScript
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import stylistic from "@stylistic/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import vueScopedCss from "eslint-plugin-vue-scoped-css";
import airbnb from "eslint-flat-config-airbnb";

export default [
  {
    ignores: [
      "build",
      "dist",
      "snapshot*",
      "lib",
      "es",
      "esm",
      "node_modules",
      "static",
      "cypress",
      "temp*",
      "auto-imports.d.ts",
      "components.d.ts",
      "eslint.config.js",
      ".commitlintrc.js",
    ],
  },
  ...airbnb,
  {
    rules: {
      "import/no-unresolved": "off",
      "import/extensions": "off",
      "import/first": "off",
      "import/newline-after-import": "off",
      "import/no-extraneous-dependencies": "off",
      camelcase: "off",
      "object-shorthand": "off",
      "@stylistic/eol-last": "off",
      "@stylistic/space-before-blocks": "off",
      "@stylistic/comma-spacing": "off",
      "prefer-const": "off",
      "no-redeclare": "off",
      "no-underscore-dangle": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@stylistic": stylistic,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@stylistic/indent": "off",
      "@stylistic/object-curly-newline": "off",
      "@stylistic/max-len": "off",
      "logical-assignment-operators": "off",
      "no-unused-expressions": "off",
      "@stylistic/padded-blocks": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/brace-style": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/keyword-spacing": "off",
      "@stylistic/comma-dangle": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/spaced-comment": "off",
      "@stylistic/implicit-arrow-linebreak": "off",
      "no-duplicate-imports": "off",
      "vars-on-top": "off",
      "no-var": "off",
      "default-param-last": "off",
      "arrow-body-style": "off",
      "@stylistic/semi": "off",
      "@stylistic/quotes": "off",
      "@stylistic/object-curly-spacing": "off",
      "@stylistic/linebreak-style": "off",
      "no-console": "off",
      "no-continue": "off",
      "no-restricted-syntax": "off",
      "no-plusplus": "off",
      "no-param-reassign": "off",
      "no-shadow": "off",
      "guard-for-in": "off",
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "import/first": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "class-methods-use-this": "off",
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: { parser: tsParser },
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
      },
    },
    plugins: {
      vue,
      "@stylistic": stylistic,
      "simple-import-sort": simpleImportSort,
      "vue-scoped-css": vueScopedCss,
    },
    rules: {
      "@stylistic/indent": "off",
      "@stylistic/object-curly-newline": "off",
      "@stylistic/max-len": "off",
      "logical-assignment-operators": "off",
      "no-unused-expressions": "off",
      "@stylistic/padded-blocks": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/brace-style": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/keyword-spacing": "off",
      "@stylistic/comma-dangle": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/spaced-comment": "off",
      "@stylistic/implicit-arrow-linebreak": "off",
      "no-duplicate-imports": "off",
      "vars-on-top": "off",
      "no-var": "off",
      "default-param-last": "off",
      "arrow-body-style": "off",
      "@stylistic/semi": "off",
      "@stylistic/quotes": "off",
      "@stylistic/object-curly-spacing": "off",
      "@stylistic/linebreak-style": "off",
      "vue/component-name-in-template-casing": 0,
      "vue/require-default-prop": 0,
      "vue/multi-word-component-names": 0,
      "vue/no-reserved-props": 0,
      "vue/no-v-html": 0,
      "vue/html-indent": "off",
      "vue-scoped-css/enforce-style-type": "off",
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",
    },
  },
  {
    rules: {
      "no-restricted-syntax": "off",
      "@stylistic/no-tabs": "off",
      "@stylistic/key-spacing": "off",
    },
  },
];
```

## eslint & stylelint

::: warning ⚠️

这个配置组合是 eslint / stylelint, 这个配置内容较多, 不比上一个配置简单, 不推荐使用

:::

### 安装 eslint

安装 eslint 和项目需要的 eslint 配置

```Bash
# 基础的 eslint 配置
$ pnpm add -D eslint

# 项目中规则需要的 eslint 配置(按需加载)
$ pnpm add -D eslint-config-airbnb-base eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-vue eslint-plugin-vue-scoped-css

# 基础的 prettier
$ pnpm add -D prettier

# 基于项目配置文件的 prettier
$ pnpm add -D eslint-config-prettier eslint-plugin-prettier 
```

添加 linter 命令

```Bash
# eslint
$ npm pkg set scripts.eslint="eslint --ext .vue,.js,.jsx,.ts,.tsx ./ --max-warnings 0"
$ npm pkg set scripts.eslint:fix="eslint --ext .vue,.js,jsx,.ts,.tsx ./ --max-warnings 0 --fix"
```

### 安装 stylelint

```Bash
# 基础的 stylelint
$ pnpm add stylelint

# 项目中需要的 stylelint 规则
$ pnpm add -D stylelint-config-standard stylelint-order
```

添加 stylelint 命令

```Bash
# stylelint
$ npm pkg set scripts.stylelint="stylelint src/**/*.{html,vue,sass,less}"
$ npm pkg set scripts.stylelint:fix="stylelint --fix src/**/*.{html,vue,css,sass,less}"
```

### 配置 lint-staged 在项目中的验证

husky 准备好之后，我们接着来检查代码的依赖

在 `package.json` 文件下添加如下代码, 根据需要来添加 eslint 或者 stylelint 的要求

```JSON
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json}": [
                        "prettier --write", 
                        "npm run eslint:fix"
                ],
    "*.{html,vue,css,sass,less}": [
                        "npm run stylelint:fix"
                ]
  }
}
```

## 参考

- [手摸手教你使用最新版husky(v7.0.1)让代码更优雅规范 - 掘金 (juejin.cn)](https://juejin.cn/post/6982192362583752741)

::: info 📆

**更新记录**
**2025年11月18日**
- 增加 eslint / stylistic 配置, 不推荐使用 eslint / stylelint / prettier
**2025年02月26日**
- husky 的使用更新到 9.x 版本
**2023年11月24日**
- 命令更新为 `pnpm`
- 移除过时的 `npm set-script` 命令
- 加入 `stylelint` 支持 css 样式

:::