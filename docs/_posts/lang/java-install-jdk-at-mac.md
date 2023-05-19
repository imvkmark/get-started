---
title: "macOS 所有版本 JDK 安装指南 (with Homebrew)"
date: 2022-04-14 22:13:09
toc: true
categories:
- ["Lang","Java","安装"]
---

相关链接 : [https://adoptium.net/temurin/](https://adoptium.net/temurin/)<br />原文地址 : [macOS 所有版本 JDK 安装指南 (with Homebrew) ](https://www.cnblogs.com/imzhizi/p/macos-jdk-installation-homebrew.html)


## **关于 Homebrew**
鉴于 Homebrew 的易用性, 本文提供的均为 Homebrew 安装 JDK 的方法.<br />已了解 Homebrew 可以跳过这节直接看正文, 如果不了解的可能要先了解一下, 在电脑上安装 Homebrew 之后再进行后续的 JDK 的安装.<br />Homebrew 是 macOS 下的一个非常好用的包管理工具, 可以用于类似于 MySQL 的服务程序的管理, Homebrew Caskroom 则可用于应用程序 (GUI 软件) 的安装与管理.<br />    具体使用可以参考 [像 Mac 高手一样管理应用，从 Homebrew 开始 - 少数派](https://sspai.com/post/42924)<br />    通过 Homebrew 可以安装许多软件, 点击 [我在 Mac 上都用什么 - 难以想象的晴朗](https://www.cnblogs.com/imzhizi/p/my-apps-on-mac.html) 可以看看我装了哪些软件.

## **懒人版**
```bash
# 最新版 Oracle JDK
brew install --cask oracle-jdk

# Oracle JDK11、Oracle JDK8 需要手动下载
# https://www.oracle.com/hk/java/technologies/javase-downloads.html

# 最新版 Oracle OpenJDK
brew install --cask java

# Oracle OpenJDK11
brew install --cask java11

# 使用该命令则安装由 Oracle 提供的最新版的 OpenJDK
brew install --cask java

# 使用该命令则安装由 Oracle 提供的 OpenJDK11
brew install --cask java11

# OpenJDK 在 Oracle 不再维护后会转交给 RedHat 维护
brew install --cask openjdk@11

# Temurin 
brew install --cask temurin
brew install --cask temurin17
brew install --cask temurin11
brew install --cask temurin8

# Azul Zulu 提供了 JDK 7
# Azul Zulu 也提供其他版本的 JDK 像 zulu8、zulu11 等
brew install --cask homebrew/cask-versions/zulu7
brew install --cask homebrew/cask-versions/zulu8
brew install --cask homebrew/cask-versions/zulu11
brew install --cask homebrew/cask-versions/zulu

# Apple 提供的 JDK6
brew install --cask homebrew/cask-versions/java6
```

## **JDK 的版本选用**
2019 年之后, Oracle 对 Java 的商业模式进行了一系列改革, 多种版本的 JDK 开始出现在开发者的视野中.<br />整体来看, 存在三个版本的 JDK, 分别是 Oracle JDK、Oracle 编译的 OpenJDK 和第三方厂商编译的 OpenJDK. 其实三者在功能上并没有明显的差异, 主要在一些版权相关的 API 上有一些差别(如 OpenJDK 就无法使用 Oracle 版本中所使用的字体渲染 API).

### Temurin
AdoptOpenJDK从长远考虑，加入到ADOPTIUM，成为Eclipse Temurin。它被设定为用于苛刻的生产环境，换句话说AdoptOpenJDK改名了，叫做Eclipse Temurin, 意思是 “AdoptOpenJDK” 和拉丁后缀 “-ium” 的复合词
```
$ brew tap homebrew/cask-versions

$ brew search --desc --eval-all temurin
==> Formulae

==> Casks
temurin11: (Eclipse Temurin 11) JDK from the Eclipse Foundation (Adoptium)
temurin17: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin8: (Eclipse Temurin 8) JDK from the Eclipse Foundation (Adoptium)
```

### **Oracle JDK**
关于 Oracle JDK 有一个基本的概念: Oracle 规定在一个 Oracle JDK 的生命周期内 (指的是下一个版本的 JDK 推出之前) 可以免费商用, 而生命周期之外继续在生产环境中使用, 想要继续商用 Oracle 对该版本的后续更新就需要付费.<br />但并不是说下载这些版本 JDK 的后续更新就需要付费, 开发者可以从 [Java SE - Downloads | Oracle Technology Network](https://www.oracle.com/hk/java/technologies/javase-downloads.html) 免费下载并使用, 但是在生产环境中使用它们就需要付费了. 另外可以看到这个页面里只有最新版、JDK11 和 JDK8 的下载, 这是为了维护方便, Oracle 仅提供 LTS(长期支持) 版本的维护. 据称 JDK11 的维护将持续到 2024 年.<br />所以说如果想要使用Oracle JDK 又不想付费, 只要一直使用最新版本的JDK就可以了.
```bash
# 运行以下命令会安装最新版本的 Oracle JDK
brew install --cask oracle-jdk
```
另外两个 LTS 版本的 Oracle JDK 无法通过 Homebrew 安装, 需要手动从 [Java SE - Downloads | Oracle Technology Network](https://www.oracle.com/hk/java/technologies/javase-downloads.html) 获取.

### **Oracle OpenJDK**
Oracle 还提供其编译的 OpenJDK, 事实上这个 OpenJDK 与其他 OpenJDK 几乎没有区别.
```bash
# 使用该命令则安装由 Oracle 提供的最新版的 OpenJDK
brew install --cask java

# 使用该命令则安装由 Oracle 提供的 OpenJDK11
brew install --cask java11

# OpenJDK 在 Oracle 不再维护后会转交给 RedHat 维护
brew install --cask openjdk@11
```
jdk 的位置 `/usr/local/Cellar/openjdk/`


### **AdoptOpenJDK(废弃)**
> 该项目已经于 2021-08-01 起不再维护, 项目加入到 Eclipse 中, 新名称为 Temurin
> Old : [https://adoptopenjdk.net/](https://adoptopenjdk.net/)
> New : [https://adoptium.net/temurin/](https://adoptium.net/temurin/)

卸载方式
```
$ brew remove --cask adoptopenjdk8

# 移除指定版本的
$ brew remove --cask adoptopenjdk{version}

# 和 AdoptOpenJDK 说再见
$ brew untap AdoptOpenJDK/openjdk
```
~~可以看到 Oracle 提供的 JDK 版本非常有限, 想要使用更多版本的 JDK, 就必须要寻求开源世界的帮助, 一个不错的选择就是 ~~[~~AdoptOpenJDK~~](https://adoptopenjdk.net/?variant=openjdk8&jvmVariant=hotspot)~~.~~<br />~~AdoptOpenJDK 是完全免费的、无品牌的 OpenJDK 版本，基于 GPL 开源协议(+Classpath Extension), 以免费软件的形式提供社区版的 OpenJDK 二进制包, 公司也可安全且放心使用~~<br />与 Oracle 提供的 OpenJDK 不同，AdoptOpenJDK 会持续为 OpenJDK 提供类似于 Oracle JDK 的维护, 而且通过 AdoptOpenJDK 可以安装最多版本的 JDK.
```bash
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk8
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk9
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk10
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk11
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk12

# 安装最新版本 OpenJDK
brew cask install AdoptOpenJDK/openjdk/adoptopenjdk
```

### **JDK7 与 Zulu**
JDK7 甚至 AdoptOpenJDK 都不提供了, 这时就要求助于一些商业公司, Azul Zulu 提供了自编译的 zulu, 在提供付费支持的商业版本外, Azul 也为 zulu 提供免费的社区技术支持.
```bash
# 通过安装 zulu7 我们可以安装 OpenJDK7. 
brew install --cask homebrew/cask-versions/zulu7

# Azul Zulu 也提供其他版本的 JDK 像 zulu8、zulu11 等
brew install --cask homebrew/cask-versions/zulu8
brew install --cask homebrew/cask-versions/zulu11
brew install --cask homebrew/cask-versions/zulu
```

### **JDK6**
年久的 JDK6 主要由 Apple 提供, 按照以下命令即可安装
```bash
brew install --cask homebrew/cask-versions/java6
```

