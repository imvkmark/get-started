# Homebrew 的安装和使用

![](https://file.wulicode.com/doc/20230521/1684678257035.png)

## 说明

Homebrew 是一款 Mac OS 平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。简单的一条指令，就可以实现包管理，而不用你关心各种依赖和文件路径的情况，十分方便快捷。对于熟悉
Linux 的同学来讲，Homebrew 有点像 RedHat 的 yum 或者 Ubuntu 的 apt-get。

## 安装

### 官方安装

使用 Homebrew 第一步就是安装它，这个在它的主页 [https://brew.sh](https://brew.sh/) 上有明确的文档，最简单的方式只需要一行命令：

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

这是一个 Ruby 脚本，执行这个安装脚本就可以完成 Homebrew 所有安装操作。

### 加速安装(使用国内镜像)

对于加速安装, 这里使用国内 [清华源](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/), 这里是安装命令的搬运工, 详细文档查看链接地址

> 首先，需要确保系统中安装了 bash、git 和 curl，对于 macOS 用户需额外要求安装 Command Line Tools (CLT) for Xcode。
> 对于 macOS 用户，系统自带 bash、git 和 curl，在命令行输入 xcode-select –install 安装 CLT for Xcode 即可。
> 对于 Linux 用户，系统自带 bash，仅需额外安装 git 和 curl。
> 接着，在终端输入以下几行命令设置环境变量：
>

```bash
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
```

> 最后，在终端运行以下命令以安装 Homebrew / Linuxbrew：
>

```shell
# 从本镜像下载安装脚本并安装 Homebrew / Linuxbrew
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install
```

验证是否安装成功：

```
$ brew
Example usage:
  brew search TEXT|/REGEX/
  brew info [FORMULA|CASK...]
  brew install FORMULA|CASK...
  brew update
  brew upgrade [FORMULA|CASK...]
  brew uninstall FORMULA|CASK...
  brew list [FORMULA|CASK...]

Troubleshooting:
  brew config
  brew doctor
  brew install --verbose --debug FORMULA|CASK

Contributing:
  brew create URL [--no-fetch]
  brew edit [FORMULA|CASK...]

Further help:
  brew commands
  brew help [COMMAND]
  man brew
  https://docs.brew.sh
```

## brew 使用

### 安装

当前cask 已经和 brew 合并, 所以也支持搜索应用程序

```
$ brew install <packageName>
```

安装好了 brew 之后，我们就可以用这个命令安装各种源码了。比如安装一下`wget`工具。这个工具能在命令行中帮我们下载各种数据

```
$ brew install wget
```

这样一个简单的命令就可以了。它会帮我们下载好 `wget`，并且编译执行安装，还会下载各种依赖包，设置好各种配置和参数。安装好的 wget 会被安装到`/usr/local/Cellar/wget/`
下。并且将wget命令软链接至 `/usr/local/bin` 目录下。这样全局就都可以使用`wget`命令了。安装好的这些软件都会统一安装到`/usr/local/Cellar/`
目录下，统一管理。而且安装目录代码会被同步到`/usr/local/opt/`下，任何的增删改都会保持这 2 个目录的同步。并且已经软链好各种命令到`/usr/local/bin`下我们去看看

```
$ ls -l /usr/local/bin |grep wget
lrwxr-xr-x   1 duoli  admin        30  5 22 19:41 wget -> ../Cellar/wget/1.21.3/bin/wget

$ ls -l /usr/local/opt/ |grep wget
lrwxr-xr-x  1 duoli  admin  21  5 22 19:41 wget -> ../Cellar/wget/1.21.3
```

### 搜索

```
$ brew search <packageName>
```

糊搜索brew 支持的软件。如果不加软件名，就会列出所有它支持的软件, 这里的名称支持正则模式, 如果是存在多个搜索结果(Formulae 和 casks). 则会分为两个部分展示

```
$ brew search clash
==> Formulae
clash                             crash                             flash                             clac

==> Casks
clashx-pro
```

### 卸载

```
$ brew uninstall <packageName>
```

示例：卸载 git

```
$ brew uninstall git
```

### 查看已安装包列表

```
$ brew list
```

### 查看包信息

```
$ brew info <packageName>
```

### 更新 Homebrew

更新安装过的软件,如果不加软件名，就更新所有可以更新的软件

```
$ brew update [<packageName>]
```

### 查看 Homebrew 版本

```
$ brew -v
```

### Homebrew 帮助信息

```
$ brew -h
```

## Tap(Third-pArty-rePositories)

可以为 brew 安装添加更多的的仓库.

### brew tap

自动更新已经存在的tap并列出当前已经 tapped 的仓库, 已经 Tap 的文件目录为 `/usr/local/Homebrew/Library/Taps/`

```bash
$ brew tap
dart-lang/dart
getsentry/tools
homebrew/cask
homebrew/cask-drivers
homebrew/cask-fonts
homebrew/cask-versions
homebrew/command-not-found
homebrew/core
homebrew/services
openresty/brew
shivammathur/php
sunnyyoung/repo
symfony-cli/tap
```

### brew tap

`brew tap <user>/<repo>`

```bash
$ brew tap shivammathur/php
HOMEBREW_BREW_GIT_REMOTE set: using https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git for Homebrew/brew Git remote.
HOMEBREW_CORE_GIT_REMOTE set: using https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git for Homebrew/core Git remote.
Running `brew update --auto-update`...
==> Tapping shivammathur/php
Cloning into '/usr/local/Homebrew/Library/Taps/shivammathur/homebrew-php'...
remote: Enumerating objects: 15003, done.
remote: Counting objects: 100% (199/199), done.
remote: Compressing objects: 100% (81/81), done.
remote: Total 15003 (delta 147), reused 159 (delta 117), pack-reused 14804
Receiving objects: 100% (15003/15003), 2.06 MiB | 3.44 MiB/s, done.
Resolving deltas: 100% (11788/11788), done.
Tapped 20 formulae (62 files, 2.8MB).
```

在本地对这个 https://github.com/user/repo 仓库上做了一个浅度的克隆，完成之后 brew 就可以在这个仓库包含的 formulae 上搜索, 安装, 好比就在 Homebrew
规范的仓库外扩展了另外一个三方源, 安装Tap 后便可使用 `brew install` 或者`brew uninstall` 安装或者卸载这个仓库上的软件。当你执行`brew update`这个命令时，tap 和
formulae 就会自定更新

### brew untap

`brew untap <user>/<repo>`移除已经安装的 tap.删除这个仓库, brew 就不在可用在这个仓库的 formulae.可以同时删除几个仓库

```bash
$ brew untap garethlawson/homebrew-php
Untapping garethlawson/php...
Untapped 2 formulae (53 files, 89.9KB).
```

### Taps 链接

- [shivammathur/php](https://github.com/shivammathur/homebrew-php) - 一个从 php5.6-8.x 都完整的版本库

## FAQ

### ffi 问题

问题说明 :

> Ignoring ffi-1.12.2 because its extensions are not built. Try: gem pristine ffi –version 1.12.2
>

解决方案 :

```
$ gem install cocoapods-core
Successfully installed cocoapods-core-1.10.1
Parsing documentation for cocoapods-core-1.10.1
```

### brew update 出错 homebrew-core is a shallow clone

最好的方式是 保持 翻墙brew 执行 update 出现以下错误

```
Error:
  homebrew-core is a shallow clone.
To `brew update`, first run:
  git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
This command may take a few minutes to run due to the large size of the repository.
This restriction has been made on GitHub's request because updating shallow
clones is an extremely expensive operation due to the tree layout and traffic of
Homebrew/homebrew-core and Homebrew/homebrew-cask. We don't do this for you
automatically to avoid repeatedly performing an expensive unshallow operation in
CI systems (which should instead be fixed to not use shallow clones). Sorry for
the inconvenience!
```

解决方法

```
$ cd /usr/local/Homebrew/Library/Taps/homebrew
$ rm -rf homebrew-core
$ brew upgrade -vvv
```

随后我们将源在更换为清华源(Core)源地址 :  https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/ 

```
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
```

### Permission denied @ apply2files - /usr/local/lib/docker/cli-plugins

解决方法

```
mkdir -p /Applications/Docker.app/Contents/Resources/cli-plugins
brew cleanup
```

### 参考

2022-11-12

- 更新 cask 说明, cask 并入 brew
- 加入加速安装(更新为清华源)
- 和其他的文档合并, 加入 FAQ