---
description: 'pnpm 是一款高效的包管理工具，支持通过安装命令或设置环境变量 `pnpm end` 来配置使用。'
lastUpdated: '2026-06-21 20:26:20'
head:
  - - meta
    - name: 'og:title'
      content: 'pnpm 包管理工具'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'pnpm 是一款高效的包管理工具，支持通过安装命令或设置环境变量 `pnpm end` 来配置使用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//front-end/javascript/npm/pnpm-introduction.html'
---
# pnpm 包管理工具

## pnpm

pnpm 的优势 : 磁盘空间占用少, 安装速度快

> 更多查看 : [项目初衷 | pnpm](https://pnpm.io/zh/motivation)

### 安装

使用如下命令安装, 如果有 npm, 我一般用 npm 安装

```Shell
$ curl -fsSL https://get.pnpm.io/install.sh | sh -
# 或者
$ wget -qO- https://get.pnpm.io/install.sh | sh -
# 或者
$ npm -g install pnpm
```

```Plaintext
$ curl -fsSL https://get.pnpm.io/install.sh | sh -
==> Downloading pnpm binaries 10.32.1
 WARN  using --force I sure hope you know what you are doing
Copying pnpm CLI from /private/var/folders/vk/jlqx_2l90kv5n1fkkg0_sqn40000gn/T/tmp.Fo72Re1nyB/pnpm to /Users/duoli/Library/pnpm/.tools/pnpm-exe/10.32.1/pnpm
Appended new lines to /Users/duoli/.zshrc

Next configuration changes were made:
export PNPM_HOME="/Users/duoli/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

To start using pnpm, run:
source /Users/duoli/.zshrc
```

这里安装之后已经设置上了pnpm 的存储位置以及变量, 运行 `source ~/.zshrc` 即可使用

我这里安装了 oh-my-zsh , 所以我这里会自动在 `.zshrc` 中增加如下代码

```Bash
# pnpm
export PNPM_HOME="/Users/duoli/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
```

`PNPM_HOME` 是 PNPM 包管理器的核心环境变量，本质是**PNPM 全局可执行文件的专属存放目录**，核心作用是让你在终端能直接运行通过 PNPM 全局安装的工具（如 `vue-cli`、`tsc`、`eslint` 等）, 如果不需要可以移除这个内容

### 设置环境变量

自动设置会添加默认的路径到 `rc`文件中, 如果你需要修改 pnpm 的 path 目录, 可以在 rc 文件中自定义

```Plaintext
$ pnpm setup
```

会自动生成以下的内容到 `.zshrc`文件中

```Plaintext
export PNPM_HOME="/Users/duoli/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
```

```Plaintext
$ source ~/.zshrc
```