# 安装 JDK 和相关软件

了解更多关于 [JDK 发行版的介绍](../../development/tools/sdkman.md#可用的-jdk)

## CentOS 7 / RockyLinux8/9

### 安装

搜寻可用的 Java SDK

::: code-group

```shell [Rocky Linux8/9]
dnf search openjdk
# or
dnf search openjdk 17
```

```shell [CentOS 7 ]
yum search openjdk 
```

:::


```
...
======================================= N/S matched: openjdk =======================================
java-1.6.0-openjdk.x86_64 : OpenJDK Runtime Environment
...
java-1.7.0-openjdk.x86_64 : OpenJDK Runtime Environment
...
java-1.8.0-openjdk.x86_64 : OpenJDK 8 Runtime Environment
...
java-11-openjdk.x86_64 : OpenJDK 11 Runtime Environment
...
java-latest-openjdk.x86_64 : OpenJDK 18 Runtime Environment
```

安装指定的版本

::: code-group

```shell [Rocky Linux8/9]
dnf install java-17-openjdk
```

```shell [CentOS 7 ]
yum install java-17-openjdk
```

:::


```
...
...
已安装:
  java-11-openjdk.x86_64 1:11.0.16.0.8-1.el7_9

作为依赖被安装:
  java-11-openjdk-headless.x86_64 1:11.0.16.0.8-1.el7_9

作为依赖被升级:
  tzdata-java.noarch 0:2022c-1.el7

完毕！
```

切换不同的 Java 版本 [alternative.8](../../man/system/alternatives.8.md)

```shell
alternatives --config java
```

```
共有 2 个提供“java”的程序。

  选项    命令
-----------------------------------------------
*  1           java-1.8.0-openjdk.x86_64 (/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.312.b07-1.el7_9.x86_64/jre/bin/java)
 + 2           java-11-openjdk.x86_64 (/usr/lib/jvm/java-11-openjdk-11.0.16.0.8-1.el7_9.x86_64/bin/java)

按 Enter 保留当前选项[+]，或者键入选项编号：
```

### 卸载

找到安装的 java 以及相关的包, 仅仅使用 `yum remove java-11-openjdk`是删除不掉执行包的, 执行包的位置在 `/usr/lib/jvm/`目录, 所以我们匹配出来安装的包, 然后进行移除

找到已经安装的包

```
# rpm -qa | grep java
javapackages-tools-3.4.1-11.el7.noarch
java-1.8.0-openjdk-headless-1.8.0.345.b01-1.el7_9.x86_64
java-1.8.0-openjdk-1.8.0.345.b01-1.el7_9.x86_64
java-11-openjdk-11.0.16.1.1-1.el7_9.x86_64
python-javapackages-3.4.1-11.el7.noarch
tzdata-java-2022c-1.el7.noarch
java-11-openjdk-headless-11.0.16.1.1-1.el7_9.x86_64
```

移除相关的包

::: code-group

```shell [Rocky Linux8/9]
dnf remove java-17-openjdk
```

```shell [CentOS 7 ]
yum remove java-17-openjdk
```

:::



## Ubuntu 安装 oracle java

### 使用系统默认安装(推荐)

速度快, 官方维护问题

```shell
apt install default-jre
```

### 使用 ppa 安装(速度慢, 好断网)

**1) 添加 ppa**

```
$ sudo add-apt-repository ppa:webupd8team/java
```

**2) 更新 系统**

```
$ sudo apt-get update
```

**3) 安装**

```
$ sudo apt-get install oracle-java8-installer
$ java -version
```

> java version "1.8.0_05"
> Java(TM) SE Runtime Environment (build 1.8.0_05-b13)
> Java HotSpot(TM) Server VM (build 25.5-b02, mixed mode)

**4) java版本切换**

```
$ sudo update-java-alternatives -s java-8-oracle
```

## Mac 使用 Homebrew 安装

如果要管理多个版本的 Java , 使用 [jenv](#jenv-管理当前的-java-环境)

```bash
# 最新版 Oracle JDK
brew install oracle-jdk

# Oracle JDK11、Oracle JDK8 需要手动下载
# https://www.oracle.com/hk/java/technologies/javase-downloads.html

# 最新版 Oracle OpenJDK
brew install java

# Oracle OpenJDK11
brew install java11

# 使用该命令则安装由 Oracle 提供的最新版的 OpenJDK
brew install java

# 使用该命令则安装由 Oracle 提供的 OpenJDK11
brew install java11

# OpenJDK 在 Oracle 不再维护后会转交给 RedHat 维护
brew install openjdk@11

# Temurin 
brew install temurin
brew install temurin17
brew install temurin11
brew install temurin8

# Azul Zulu 提供了 JDK 7
# Azul Zulu 也提供其他版本的 JDK 像 zulu8、zulu11 等
brew install zulu7
brew install zulu8
brew install zulu11
brew install zulu

# Apple 提供的 JDK6
brew install java6
```

### 安装不同源的 JDK

2019 年之后, Oracle 对 Java 的商业模式进行了一系列改革, 多种版本的 JDK 开始出现在开发者的视野中.

#### Temurin

AdoptOpenJDK从长远考虑，加入到ADOPTIUM，成为Eclipse Temurin。它被设定为用于苛刻的生产环境，换句话说AdoptOpenJDK改名了，叫做Eclipse Temurin, 意思是 “AdoptOpenJDK”
和拉丁后缀 “-ium” 的复合词

```
$ brew tap homebrew/cask-versions

$ brew search --desc --eval-all temurin
==> Formulae

==> Casks
temurin11: (Eclipse Temurin 11) JDK from the Eclipse Foundation (Adoptium)
temurin17: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin8: (Eclipse Temurin 8) JDK from the Eclipse Foundation (Adoptium)

$ brew install temurin8
```

#### Oracle JDK

关于 Oracle JDK 有一个基本的概念: Oracle 规定在一个 Oracle JDK 的生命周期内 (指的是下一个版本的 JDK 推出之前) 可以免费商用, 而生命周期之外继续在生产环境中使用,
想要继续商用 Oracle 对该版本的后续更新就需要付费.

```bash
# 运行以下命令会安装最新版本的 Oracle JDK
brew install oracle-jdk
```

另外两个 LTS 版本的 Oracle JDK 无法通过 Homebrew 安装

#### Oracle OpenJDK

Oracle 还提供其编译的 OpenJDK, 事实上这个 OpenJDK 与其他 OpenJDK 几乎没有区别.

```bash
# 使用该命令则安装由 Oracle 提供的最新版的 OpenJDK
brew install java

# 使用该命令则安装由 Oracle 提供的 OpenJDK11
brew install java11

# OpenJDK 在 Oracle 不再维护后会转交给 RedHat 维护
brew install  openjdk@11
```

jdk 的位置 `/usr/local/Cellar/openjdk/`

#### AdoptOpenJDK(废弃)

> 该项目已经于 2021-08-01 起不再维护, 项目加入到 Eclipse 中, 新名称为 [Temurin](#temurin)
> Old : [https://adoptopenjdk.net/](https://adoptopenjdk.net/)
> New : [https://adoptium.net/temurin/](https://adoptium.net/temurin/)

卸载方式

```
$ brew remove adoptopenjdk8

# 移除指定版本的
$ brew remove adoptopenjdk{version}

# 和 AdoptOpenJDK 说再见
$ brew untap AdoptOpenJDK/openjdk
```

#### JDK7 与 Zulu

Azul Zulu 提供了自编译的 zulu, 在提供付费支持的商业版本外, Azul 也为 zulu 提供免费的社区技术支持.

```
$ brew search --desc --eval-all zulu

==> Casks
zulu11: (Azul Zulu Java Standard Edition Development Kit) OpenJDK distribution from Azul
zulu13: (Azul Zulu Java Standard Edition Development Kit) OpenJDK distribution from Azul
zulu15: (Azul Zulu Java Standard Edition Development Kit) Zulu OpenJDK 15
zulu17: (Azul Zulu Java Standard Edition Development Kit) OpenJDK distribution from Azul
zulu7: (Azul Zulu Java Standard Edition Development Kit) OpenJDK distribution from Azul
zulu8: (Azul Zulu Java 8 Standard Edition Development Kit) OpenJDK distribution from Azul
```

安装

```
$ brew install zulu
```

#### JDK6

年久的 JDK6 主要由 Apple 提供, 按照以下命令即可安装

```bash
brew install java6
```

### Maven - 包管理工具

```
# 搜索
$ brew search maven
# 获取信息
$ brew info maven
# 安装 maven
$ brew install maven
# 查看是否安装成功
$ mvn -version
```

### Tomcat - Java 服务器工具

```
$ brew install tomcat
```

### jenv-管理当前的 Java 环境

> 命令行工具, 用来设定 JAVA_HOME 环境变量  [jEnv - Manage your Java environment](https://www.jenv.be/)

安装

```
$ brew install jenv
```

添加到 .zshrc

```
# 添加到 .zshrc
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc

# 手动方式添加到 .zshrc
$ vim .zshrc
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

添加当前可用的 JDK

```
$ jenv add /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/
temurin64-17.0.4.1 added
17.0.4.1 added
17.0 added
```

如何使用

```
# 列出管理的版本
$ jenv versions

# 全局版本
$ jenv global 1.8

# 当前版本
$ jenv local 1.8

# 当前shell
$ jenv shell 1.8
```

检测当前的环境设置情况

```
$ jenv doctor
```

设置 `JAVA_HOME`

在安装 jenv 之后很有可能没有 `$JAVA_HOME` 变量, 可以通过如下命令来设置

```
$ jenv enable-plugin export
```