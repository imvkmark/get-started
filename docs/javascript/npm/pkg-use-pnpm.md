# 使用 pnpm 替代 yarn, npm

pnpm 的优势不用多说, 懂得自然了解了, 不懂的去官网看下他们的介绍 [项目初衷 | pnpm](https://pnpm.io/zh/motivation) 这里主要的目的是使用 pnpm 替换掉 yarn 和 npm

- npm 是 node 的包管理工具, 所以我的理解是 node 是基础, 需要 npm 必须要有 node
- yarn 作为 npm 的一个包, 必须要有 npm , 才能够使用 yarn
- 然而 node 的版本也可以支持切换, 这样再切换 node 的时候则需要使用到 nvm , 而 nvm 是依赖于 npm 和 yarn 的.

这样造成的依赖循环逃脱不了轮回, 就会导致东西关联较多

在我了解了 pnpm 之后他可以很好的解决以上问题并且还有它自己独到的优势

- 纯净安装, 依托于 brew
- 可以管理全局 node , 并支持自动安装
- 包管理使用软链接方式, 不必在多项目之间重复下载占用磁盘空间

所以就打算用他替换掉 nvm, yarn, npm 这些工具, 仅仅使用一个即可




## 备份
```
# nvm 版本以及安装位置
$ nvm ls
       ...
       v16.13.2
       v16.14.1
->     v16.14.2
$ which node
/Users/duoli/.nvm/versions/node/v16.14.2/bin/node
# yarn 位置以及 global 命令
$ which yarn
/Users/duoli/.yarn/bin/yarn
$ which browser-sync
/Users/duoli/.config/yarn/global/node_modules/.bin/browser-sync
# npm 的位置
$ which npm
/Users/duoli/.nvm/versions/node/v16.14.2/bin/npm
```
为了满足好奇心我统计了下使用的空间
```
$ du -h -d 1 /Users/duoli/.nvm
...
1.3G	/Users/duoli/.nvm
$ du -h -d 1 /Users/duoli/.config/yarn
...
598M	/Users/duoli/.config/yarn
$ du -h -d 1  ~/.yarn
...
5.1M	/Users/duoli/.yarn
```
备份当前安装的全局命令, 我使用的是 yarn
```
$ cat ~/.config/yarn/global/package.json
{
  "dependencies": {
    "@js-lib/cli": "^1.6.0",
    "@tarojs/cli": "^3.4.3",
    "apidoc": "^0.50.5",
    "bower": "^1.8.14",
    "browser-sync": "^2.27.9",
    "conventional-changelog": "^3.1.25",
    "conventional-changelog-cli": "^2.2.2",
    "cross-env": "^7.0.2",
    "jsdoc": "^3.6.10",
    "nrm": "^1.2.1",
    "pnpm": "^6.32.3",
    "typescript": "^4.6.2"
  }
}
```
以上备份完成, 空间大概 1.9G, 当然包含很多不使用的 node 版本, 是从版本 14 开始的.

## 清理
清理已经安装的命令
```
$ yarn global remove @js-lib/cli .....
```
这里不清理则会使用到 `nvm` , `.zshrc` 文件中的配置移除
```
# nvm & node
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# yarn
# export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
```
清理命令后需要重新打开下命令行, 否则路径还是在终端中.

## 安装和配置
安装之后会移除掉上述提到的命令以及空间

## 安装

#### Posix 系统安装
```
$ wget -qO- https://get.pnpm.io/install.sh | sh -
==> Extracting pnpm binaries 7.9.0
Copying pnpm CLI from /tmp/tmp.6KHxbajrOb/pnpm to /home/user/.local/share/pnpm/pnpm
Appended new lines to /home/user/.bashrc

Next configuration changes were made:
export PNPM_HOME="/home/user/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

To start using pnpm, run:
source /home/user/.bashrc
```
这里安装之后已经设置上了pnpm 的存储位置以及变量, 不需要再进行设置, 直接运行 `source ~/.bashrc` 即可使用

#### 安装并配置环境
全局安装 pnpm
```
# mac
$ brew install pnpm

# posix nodejs
# 独立的脚本来安装
$ curl -fsSL https://get.pnpm.io/install.sh | sh -
$ wget -qO- https://get.pnpm.io/install.sh | sh -
```

### 设置环境变量

#### 手动设置
设置全局 bin 位置, 并加入环境变量
```
$ pnpm config set global-bin-dir ~/.pnpm-store/bin
```
加入环境变量并启用
```
$ vim ~/.zshrc
```
添加以下行
```
export PATH="$HOME/.pnpm-store/bin:$PATH"
```
启用
```
$ source ~/.zshrc
```

#### 自动设置(pnpm 7+)
自动设置会添加默认的路径到 `rc`文件中
```
$ pnpm setup
```
会自动生成以下的内容到 `.zshrc`文件中
```
export PNPM_HOME="/Users/duoli/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
```
```
$ source ~/.zshrc
```

### 启用 lts node
使用 `lts` 版本的 node
```
$ pnpm env use --global lts
```

### 安装 nrm
这里首先安装 `nrm` , 后续的安装启用淘宝镜像后安装的速度会快一些
```
$ pnpm install -g nrm
$ which nrm
/Users/duoli/.pnpm-store/bin/nrm
```
这里 nrm 命令会安装到我们设定的目录下, 后续安装全局命令, 主要目的是为了比较包大小
```
pnpm install -g @js-lib/cli
pnpm install -g @tarojs/cli
pnpm install -g apidoc
pnpm install -g bower
pnpm install -g browser-sync
pnpm install -g conventional-changelog
pnpm install -g conventional-changelog-cli
pnpm install -g cross-env
pnpm install -g jsdoc
pnpm install -g nrm
pnpm install -g pnpm
pnpm install -g typescript
```

### 查看大小
```
$ du -d 1 -h /Users/duoli/.pnpm-store
 68K	/Users/duoli/.pnpm-store/bin
697M	/Users/duoli/.pnpm-store/v3
697M	/Users/duoli/.pnpm-store/
```
再查看下 node 的大小
```
$ du -d 1 -h /Users/duoli/Library/pnpm
592M	/Users/duoli/Library/pnpm/nodejs
592M	/Users/duoli/Library/pnpm
```
整体大小 1.3G , 当然上边有多版本, 对于公共文件来讲, 影响也不是特别大, 但是他的优点在于多项目的时候的文件软链接, 我们使用项目再对比下

![](https://file.wulicode.com/note/2022/03-24/00-04-55568.png#id=SpWsq&originHeight=443&originWidth=588&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 清理
清理掉 yarn, nvm, 以及软链接
```
# 清理yarn
$ yarn global remove ...
$ rm -rf ~/.nvm
```
至此, 折腾完毕, 看以后遇到什么问题再补充吧

