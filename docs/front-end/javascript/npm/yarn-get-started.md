---
description: 'Yarn是一个快速、可靠、安全的JavaScript包管理工具，具有离线缓存、确定性安装和网络优化等特点。安装可通过npm install -g yarn或官方安装包完成。常用命令包括yarn init、yarn add、yarn remove、yarn install等。与npm相比，yarn命令更简洁，如yarn add对应npm install，yarn install对应npm ci，且yarn自动生成yarn.lock确保依赖版本一致。'
lastUpdated: '2026-06-21 20:25:57'
head:
  - - meta
    - name: 'og:title'
      content: 'Yarn 的安装和使用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Yarn是一个快速、可靠、安全的JavaScript包管理工具，具有离线缓存、确定性安装和网络优化等特点。安装可通过npm install -g yarn或官方安装包完成。常用命令包括yarn init、yarn add、yarn remove、yarn install等。与npm相比，yarn命令更简洁，如yarn add对应npm install，yarn install对应npm ci，且yarn自动生成yarn.lock确保依赖版本一致。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//front-end/javascript/npm/yarn-get-started.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/742eb98ab679b1906bf6e3e75913b876.png'
---
# Yarn 的安装和使用

文章地址 : [yarn的安装和使用 - 掘金](https://juejin.cn/post/6844904065827241998)

## Yarn 的简介：

Yarn是 facebook 发布的一款取代 npm 的包管理工具。

## yarn 的特点：

- **速度快**—Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
- **安全**—在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。
- **可靠**—使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。

## yarn 的安装:

下载 node.js，使用 npm 安装

```Plaintext
npm install -g yarn
查看版本：yarn --version
```

Yarn 淘宝源安装，分别复制粘贴以下代码行到黑窗口运行即可

```Plaintext
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

## yarn的常用命令：

- 安装yarn

```Plaintext
npm install -g yarn
```

- 安装成功后，查看版本号：

```Plaintext
yarn --version
```

- 创建文件夹 yarn

```Plaintext
md yarn
```

- 进入yarn文件夹

```Plaintext
cd yarn
```

- 初始化项目

```Plaintext
yarn init // 同npm init，执行输入信息后，会生成package.json文件
```

- yarn的配置项：

```Plaintext
yarn config list // 显示所有配置项
yarn config get <key> //显示某配置项
yarn config delete <key> //删除某配置项
yarn config set <key> <value> [-g|--global] //设置配置项
```

- 安装包：

```Plaintext
yarn install //安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
yarn install --flat //安装一个包的单一版本
yarn install --force //强制重新下载所有包
yarn install --production //只安装dependencies里的包
yarn install --no-lockfile //不读取或生成yarn.lock
yarn install --pure-lockfile //不生成yarn.lock
```

- 添加包（会更新package.json和yarn.lock）：

```Plaintext
yarn add [package] // 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]@[version] // 安装指定版本，这里指的是主要版本，如果需要精确到小版本，使用-E参数
yarn add [package]@[tag] // 安装某个tag（比如beta,next或者latest）

//不指定依赖类型默认安装到dependencies里，你也可以指定依赖类型：
yarn add --dev/-D // 加到 devDependencies
yarn add --peer/-P // 加到 peerDependencies
yarn add --optional/-O // 加到 optionalDependencies

//默认安装包的主要版本里的最新版本，下面两个命令可以指定版本：
yarn add --exact/-E // 安装包的精确版本。例如yarn add foo@1.2.3会接受1.9.1版，但是yarn add foo@1.2.3 --exact只会接受1.2.3版
yarn add --tilde/-T // 安装包的次要版本里的最新版。例如yarn add foo@1.2.3 --tilde会接受1.2.9，但不接受1.3.0
```

- 发布包

```Plaintext
yarn publish
```

- 移除一个包

```Plaintext
yarn remove <packageName>：移除一个包，会自动更新package.json和yarn.lock
```

- 更新一个依赖

```Plaintext
yarn upgrade 用于更新包到基于规范范围的最新版本
```

- 运行脚本

```Plaintext
yarn run 用来执行在 package.json 中 scripts 属性下定义的脚本
```

- 显示某个包的信息

```Plaintext
yarn info <packageName> 可以用来查看某个模块的最新版本信息
```

- 缓存

```Plaintext
yarn cache
yarn cache list # 列出已缓存的每个包
yarn cache dir # 返回 全局缓存位置
yarn cache clean # 清除缓存
```

- 检查package.json 和 yarn.lock 内的文件版本是否相符

```Plaintext
yarn check
```

## npm 与 yarn命令比较:

![](https://file.wulicode.com/feishu-images/742eb98ab679b1906bf6e3e75913b876.png)