---
description: '使用 nvm 可灵活管理多版本 Node.js 与项目依赖，支持脚本或 Homebrew 安装，在 zsh 中启用后通过 install、use、ls 等命令切换版本，还提供卸载、缓存配置及 Jenkins 集成指南。'
lastUpdated: '2026-06-24 14:29:44'
head:
  - - meta
    - name: 'og:title'
      content: '使用 nvm 管理多版本 Node 项目依赖'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用 nvm 可灵活管理多版本 Node.js 与项目依赖，支持脚本或 Homebrew 安装，在 zsh 中启用后通过 install、use、ls 等命令切换版本，还提供卸载、缓存配置及 Jenkins 集成指南。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//front-end/javascript/npm/nvm-manage-multi-version-node.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/4693c7c6b9ff103f3b6c5d24d0ffc736.png'
---
# 使用 nvm 管理多版本 Node 项目依赖

nvm 是 Node.js 的版本管理器 (version manager)，可在同一台主机上安裝多个版本的 Node.js 环境，因为不同项目可能使用不同的 Node.js 版本，那就需要通过一个版本管理器来切换不同的 Node.js 版本

- [nvm-sh/nvm](https://github.com/nvm-sh/nvm#install--update-script) - Github 仓库地址

## 安装/升级 NVM

### 脚本安装

可用 `cURL` 或 `wget` 指令使用安裝脚本安裝或更新 nvm (更新的时候重新运行下脚本即可)：

```Bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

此安装脚本会把 nvm repo clone 到 `~/.nvm`，并将 source line 新增至你的 profile 设定 ( `~/.bash_profile`、`~/.zshrc`、`~/.profile` 或 `~/.bashrc` )

### brew 安装

可以使用 brew 安装 nvm, 安装完毕后需要重启命令行

```Plaintext
brew install nvm
```

如果还是无法使用 nvm，可执行下面指令立即应用 ZSH 的设定：

```Bash
source .zshrc
```

- 手动添加

检查是否存在如下 source line, 没有可以手动添加到 `.zshrc`

```Plaintext
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

注意：

- 使用 `nvm` 时，不需要 `sudo` 即可使用 `npm -g` 全局命令
- 若你有 `~/.npmrc`，请确保里面不包含任何 `prefix` 的设定 (因为和 `nvm` 不相容)
- 你可以保留以前在 `系统` 安装的 Node.js，但 `nvm` 只对你的当前账号可用。使用目录: `~/.nvm/versions/node/vX.X.X/lib/node_modules/*`

### 在 zsh 中启用

在 `~/.zshrc` 中找到 `plugins=(***` 这一行, 在这一行中启用 nvm 插件

```Properties
sed -i '' '/^plugins=(/ { /[[:space:](]nvm[[:space:])]/! s/)/ nvm)/; }' ~/.zshrc
```

如要在进入页面时候自动切换版本号, 则需要在 zsh 中开启 `:omz:plugins:nvm` 的自动加载

```Diff
+ zstyle ':omz:plugins:nvm' autoload yes

plugins=(git autojump nvm)
```

## 命令

说明：`<version>` 指代任何 `nvm` 能够识别的、类版本格式的字符串。这包括：

- 完整或部分版本号（可选择性以 "v" 开头）：例如 0.10、v0.1.2、v1；
- 默认（内置）别名：node、stable、unstable、iojs、system；
- 可通过 `nvm alias foo` 来自定义别名

### --help 

显示帮助信息

```Plain Text
$ nvm --help

Node Version Manager (v0.40.4)

Note: <version> refers to any version-like string nvm understands. This includes:
  - full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)
  - default (built-in) aliases: node, stable, unstable, iojs, system
  - custom aliases you define with `nvm alias foo`
```

```Plain Text
--help
    显示此帮助信息

--no-colors
    禁用带颜色的输出
```

### --version

输出 NVM 已安装的版本号

```Plaintext
$ nvm --version
0.40.4
```

### install

下载并安装指定版本。如果未指定版本且存在 .nvmrc 文件，则使用该文件中的版本

```Plain Text
nvm install [<version>]
```

```Plain Text
-s
    跳过二进制文件下载，仅从源代码安装

-b
    跳过头文件下载，仅从二进制文件安装

--reinstall-packages-from=<version>
    安装时，重新安装指定版本（node/iojs/具体node版本号）中已安装的包

--lts
    安装时，仅选择长期支持（LTS）版本

--lts=<LTS name>
    安装时，仅选择指定 LTS 分支的版本

--skip-default-packages
    安装时，如果存在 default-packages 文件则跳过

--latest-npm
    安装完成后，尝试将指定 node 版本的 npm 升级到最新可用版本

--no-progress
    禁用所有下载的进度条

--alias=<name>
    安装完成后，将指定别名设置为该版本（等同于：nvm alias <name> <version>）

--default
    安装完成后，将默认别名设置为该版本（等同于：nvm alias default <version>）

--save
    安装完成后，将指定版本写入 .nvmrc 文件
```

安裝 NVM 后，其实还没安装 Node 环境：

```Plaintext
$ node
zsh: command not found: node
```

如果执行下面指令，会提醒你需要执行 `install` 指令才能安装 Node.js：

```Plaintext
$ nvm use node
N/A: version "node -> N/A" is not yet installed.
You need to run "nvm install node" to install it before using it.
```

安装最新版的 Node.js：

```Plaintext
$ nvm install node
Downloading and installing node v25.8.0...
Downloading https://nodejs.org/dist/v25.8.0/node-v25.8.0-darwin-arm64.tar.xz...
################################################################################################################################################ 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v25.8.0 (npm v11.11.0)
```

如果要指定安裝版本，可以直接指定版本号：

```Plaintext
$ nvm install 24
```

安装的第一个版本的 Node.js 会成为 nvm 的默认版本，新的 shell 就会以默认版本的 Node.js 来使用 (例如：`nvm alias default`)。查看目前 Node.js 的版本：

```Plaintext
$ node -v
v25.8.0
```

### uninstall

卸载指定的包

```Plain Text
nvm uninstall <version>
    卸载指定版本

nvm uninstall --lts
    使用自动的 LTS（长期支持）别名 `lts/*` 进行卸载（如果可用）

nvm uninstall --lts=<LTS name>
    使用指定 LTS 分支的自动别名进行卸载（如果可用）
```

### use

切换当前正在使用的 Node.js 版本, 修改 PATH 环境变量以使用指定版本。如果未指定版本且存在 `.nvmrc` 文件，则使用该文件中的版本

```Plain Text
nvm use [<version>]
```

```Plain Text
--silent
    静默模式，不输出 stdout/stderr 内容

--lts
    使用自动的 LTS（长期支持）别名 `lts/*`（如果可用）

--lts=<LTS name>
    使用指定 LTS 分支的自动别名（如果可用）

--save
    将指定版本写入 .nvmrc 文件
```

```Plaintext
$ nvm use v24.11.1
Now using node v24.11.1 (npm v11.6.2)
```

如果切换的目标版本还没安装，nvm 会提醒你要安装：

```Plaintext
$ nvm use lts/krypton
N/A: version "lts/krypton -> v24.14.0" is not yet installed.

You need to run `nvm install lts/krypton` to install and use it.
```

通过 nvm 安装 Node.js 時，nvm 会将不同的 Node.js 版本储存在 `~/.nvm/versions/node/vX.X.X`，然后再修改 `$PATH`，将指定版本的 Node.js 路径加入：在 nvm 的各个 Node.js 版本安装的全部程序都会在各自版本的目录内安装，所以在切换至新安装的 Node.js 版本后需要重新安装，也因为如此，不同版本间的程序不会有兼容问题

### exec

在指定版本环境下运行指定命令。如果未指定版本且存在 .nvmrc 文件，则使用该文件中的版本

```Plain Text
nvm exec [<version>] [<command>]
```

```Plain Text
--silent
    静默模式，不输出 stdout/stderr 内容

--lts
    使用自动的 LTS（长期支持）别名 `lts/*`（如果可用）

--lts=<LTS name>
    使用指定 LTS 分支的自动别名（如果可用）
```

```Plaintext
$ nvm exec 25.8.0 node
Running node v25.8.0 (npm v11.11.0)
Welcome to Node.js v25.8.0.
Type ".help" for more information.
>
```

### run

直接执行 Node.js, 在指定版本环境下运行 node，并传入指定参数。如果未指定版本且存在 .nvmrc 文件，则使用该文件中的版本

```Plain Text
nvm run [<version>] [<args>]
```

```Plain Text
--silent
    静默模式，不输出 stdout/stderr 内容

--lts
    使用自动的 LTS（长期支持）别名 `lts/*`（如果可用）

--lts=<LTS name>
    使用指定 LTS 分支的自动别名（如果可用）
```

如果要直接执行Node.js，可以使用下面指令：

```Plaintext
$ nvm run node
Running node v25.8.0 (npm v11.11.0)
Welcome to Node.js v25.8.0.
Type ".help" for more information.
> 
```

### ls

列出已安装的版本，如果指定了版本则仅列出匹配的版本

```Plain Text
nvm ls [<version>]
```

```Plain Text
--no-colors
    禁用带颜色的输出

--no-alias
    不显示 `nvm alias` 相关输出
```

```Plaintext
$ nvm ls
       v16.20.2
       v22.21.0
       v24.11.1
->      v25.8.0
default -> 24 (-> v24.11.1 *)
iojs -> N/A (default)
node -> stable (-> v25.8.0 *) (default)
stable -> 25.8 (-> v25.8.0 *) (default)
unstable -> N/A (default)
lts/* -> lts/krypton (-> N/A)
...
lts/jod -> v22.22.1 (-> N/A)
lts/krypton -> v24.14.0 (-> N/A)
```

### ls-remote

列出可安装的远程版本，如果指定了版本则仅列出匹配的版本

```Plain Text
nvm ls-remote [<version>]
```

```Plain Text
--lts
    列出时，仅显示长期支持（LTS）版本

--lts=<LTS name>
    列出时，仅显示指定 LTS 分支的版本

--no-colors
    禁用带颜色的输出
```

可以看目前有哪些可用版本可安装，在版本号前面的 `->` 箭头符号代表目前 nvm 正在使用的 Node.js 版本：

```Plaintext
$ nvm ls-remote
...
       v24.11.0   (LTS: Krypton)
       v24.11.1   (LTS: Krypton)
       v24.12.0   (LTS: Krypton)
       v24.13.0   (LTS: Krypton)
       v24.13.1   (LTS: Krypton)
       v24.14.0   (Latest LTS: Krypton)
...
        v25.7.0
->      v25.8.0
```

不过刚才的 `ls-remote` 指令会把所有可用的版本都列出来，但通常会选择安装 LTS（Long-term support，长期支援）版，所以只要加上 `-lts` 参数就可以只列出可用的 LTS 版：

```Plaintext
$ nvm ls-remote --lts
...
       v22.22.1   (Latest LTS: Jod)
       v24.11.0   (LTS: Krypton)
       v24.14.0   (Latest LTS: Krypton)
```

如果版本号的文字有特殊颜色（不是白色字），则代表该版本的Node.js有通过nvm安装过

![](https://file.wulicode.com/feishu-images/4693c7c6b9ff103f3b6c5d24d0ffc736.png)

### version / version-remote

```Plain Text
nvm version <version>
    将给定的版本描述解析为单个本地版本

nvm version-remote <version>
    将给定的版本描述解析为单个远程版本

--lts
    列出时，仅选择长期支持（LTS）版本

--lts=<LTS name>
    列出时，仅选择指定 LTS 分支的版本
```

### current

查看目前使用版本

```Plaintext
$ nvm current
v24.11.1
```

### which

察看 Node.js 的安装路径

```Plain Text
nvm which [current | <version>]
    显示已安装 node 版本的路径。如果未指定版本且存在 .nvmrc 文件，则使用该文件中的版本

--silent
    当省略版本时，静默模式，不输出 stdout/stderr 内容
```

执行下面指令可以查看特定版本的 Node.js 的安装路径：

```Plaintext
$ nvm which 25.8.0
/Users/duoli/.nvm/versions/node/v25.8.0/bin/node
```

### alias

查看別名、设定別名

```Plain Text
nvm alias [<pattern>]    # 显示所有以指定模式开头的别名

--no-colors
    禁用带颜色的输出
    
nvm alias <name> <version>
    设置一个名为 <name> 的别名，指向指定版本
```

如下图有些版本的文字是紅色或是显示 `N/A`，就代表该版本未在电脑安装：

![](https://file.wulicode.com/feishu-images/6deb9b0d8ea9d565b4316811ca628db0.png)

默认别名可以取代版本号：

- `node`：安装最新版的 Node.js
- `iojs`：安装最新版的 io.js
- `stable`：此 alias 已弃用
- `unstable`：此 alias 为 v0.11，最后一個 “unstable” (不穩定) Node release，在 v1.0 之后的版本都是稳定版 (in SemVer, versions communicate breakage, not stability)

可在下面这些指令使用以上预设別名：

- `nvm install`
- `nvm use`
- `nvm run`
- `nvm exec`
- `nvm which`
- … 等

察看別名

```Plaintext
$ nvm ls
->     v16.20.2
       v18.18.0
default -> 16 (-> v16.20.2)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v18.18.0) (default)
stable -> 18.18 (-> v18.18.0) (default)
lts/* -> lts/hydrogen (-> v18.18.0)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.12 (-> N/A)
lts/fermium -> v14.21.3 (-> N/A)
lts/gallium -> v16.20.2
lts/hydrogen -> v18.18.0
```

设定別名

```Plaintext
$ nvm alias titan-test v10.15.3                                                  * ?
titan-test -> v10.15.3
```

接著用 `nvm alias` 指令就會看到刚刚新增的別名所对应的 Node.js 版本：SHELL

```Plaintext
$ nvm alias                                                                    * ?
titan-test -> v10.15.3
default -> v10.16.3
node -> stable (-> v12.8.1) (default)
stable -> 12.8 (-> v12.8.1) (default)
iojs -> N/A (default)
unstable -> N/A (default)
lts/* -> lts/erbium (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.16.2 (-> N/A)
lts/dubnium -> v10.17.0 (-> N/A)
lts/erbium -> v12.13.0 (-> N/A)
```

### unalias

删除名为 `<name>` 的别名

```Plain Text
nvm unalias <name>
    删除名为 <name> 的别名
```

### deactivate

撤销 nvm 对当前 shell 的影响

```Plain Text
nvm deactivate  
    撤销 nvm 对当前 shell 的影响

--silent
    静默模式，不输出 stdout/stderr 内容
```

### install-latest-npm

尝试将当前 node 版本的 \`npm\` 升级到最新可用版本

```Plain Text
$ nvm install-latest-npm
```

### reinstall-packages

将指定版本中安装的全局 `npm` 包重新安装到当前版本

```Plain Text
nvm reinstall-packages <version>
    将指定版本中安装的全局 `npm` 包重新安装到当前版本
```

### unload

从 shell 中卸载 `nvm`

### cache

```Plain Text
nvm cache dir
    显示 nvm 缓存目录的路径

nvm cache clear
    清空 nvm 缓存目录
```

### set-colors

```Plain Text
nvm set-colors [<color codes>]
    使用 "yMeBg" 格式设置五种文本颜色。支持时可用

Initial colors are:                 Color codes:
    bygre                           r/R = red / bold red
                                    g/G = green / bold green
                                    b/B = blue / bold blue
                                    c/C = cyan / bold cyan
                                    m/M = magenta / bold magenta
                                    y/Y = yellow / bold yellow
                                    k/K = black / bold black
                                    e/W = light grey / white
```

## FAQ

### 卸载 Nvm

基本上，需要反向执行 `install.sh`中的步骤-从 `~/.bash_profile`(和/或 `~/.profile`) 中删除所有 nvm 注册，然后重新打shell 如果是 nvm 失效, 只需从 `.bash_profile` 或 `.profile` 中删除NVM命令就足够, 如果你有其他的 node 执行环境, 则也需要删除, 则需要执行如下命令

```Plaintext
$ rm -rf ~/.nvm
```

### Jenkins 中应用

在 Jenkins 中应用需要执行如下命令

```Bash
. ~/.nvm/nvm.sh
```

---

::: info 📆
更新记录
**2026年03月10日**
- 更新贴图 / 验证命令输出情况
- 增加 nvm 插件启用 zshrc
**2025年11月05日**
- 更新最新的版本号
- 更新处理结构
**2023-11-02**
- 增加国内源的访问
:::