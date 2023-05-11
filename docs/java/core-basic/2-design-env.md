---
outline: 'deep'
---

# 2. Java 程序设计环境

## 2.1 安装 Java 工具包

### 2.1.1 下载 JDK

首先弄清楚一些专业术语

![](https://file.wulicode.com/doc/20230509/1683642004051.png)

> **对这个东西比较感兴趣: 为什么 Java 8 又成为 1.8.0 ?**
>
> Java 2这种提法始于1998年。当时Sun公司的销售人员感觉以增加小数点后面数值的方式改变版本号并没有反映出JDK 1.2 的重大改进。但是，由于在发布之后才意识到这个问题，
>
> 所以他们决定开发工具包的版本号仍然沿用1.2，接下来是 1.3. 1.4, 和 5.0 但是 Java 平台被重新命名为Java 2。因此，就有了Java 2 Standard Edition Software Development
> Kit
> 5.0 版，即 J2SE SDK 5.0
>
> 幸运的是，2006年版本号得到简化。Java标准版的下一个版本取名为 JavaSE6 ，后来又有 了Java SE 7和 Java SE 8 不过，“内部” 版本号却分别是1.6.0、1.7.0 和 1.8.0

- 使用 JDK, 不是 JRE

**JDK 版本的说明**

- Temurin, 前身 AdoptOpenJDK

https://adoptium.net/

AdoptOpenJDK从长远考虑，加入到ADOPTIUM，成为Eclipse Temurin。它被设定为用于苛刻的生产环境，换句话说AdoptOpenJDK改名了，叫做Eclipse Temurin, 包含 LTS, 以及最近的多个版本

```
brew search --desc --eval-all temurin
==> Formulae

==> Casks
temurin11: (Eclipse Temurin 11) JDK from the Eclipse Foundation (Adoptium)
temurin17: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin18: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin19: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin8: (Eclipse Temurin 8) JDK from the Eclipse Foundation (Adoptium)
```

- Semeru(IBM 免费运行环境)

https://developer.ibm.com/languages/java/semeru-runtimes

IBM Smeru Runtime是使用OpenJDK类库和Eclipse OpenJ9 JVM构建的免费生产二进制文件，它提供了在最需要的时候运行Java应用程序的功能和性能。

```
brew search semeru
==> Formulae
semgrep

==> Casks
semeru-jdk-open                semeru-jdk11-open              semeru-jdk17-open              semeru-jdk8-open
```

- Oracle JDK(官方, 最新)

https://www.oracle.com/java/technologies/downloads/

在一个 Oracle JDK 的生命周期内 (指的是下一个版本的 JDK 推出之前) 可以免费商用

- Oracle OpenJDK

https://openjdk.org/

和其他家的 OPENJDK 没什么差别

```
$ brew search openjdk
==> Formulae
openjdk ✔          openjdk@11         openjdk@17         openjdk@8
```

- Microsoft OpenJDK

https://www.microsoft.com/openjdk

```
$ brew search microsoft-openjdk
```

- Zulu(JDK7)

```
$ brew search zulu

==> Casks
zulu          zulu11        zulu13        zulu15        zulu17        zulu7         zulu8         zulufx
```

- Java6 (苹果维护)

```
$ brew info java6
==> java6: 1.6.0_65-b14-468,2019,041-88384-20191011-3d8da658-dca4-4a5b-b67c-26e686876403
https://support.apple.com/kb/DL1572
Not installed
From: https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-versions.git
==> Name
Apple Java 6 Standard Edition Development Kit
==> Description
Legacy runtime for the Java programming language
==> Artifacts
JavaForOSX/JavaForOSX.pkg/Payload/Library/Java/JavaVirtualMachines/1.6.0.jdk -> /Library/Java/JavaVirtualMachines/1.6.0.jdk (Generic Artifact)
==> Caveats
java6 has been officially discontinued upstream.
It may stop working correctly (or at all) in recent versions of macOS.
```

### 2.1.2 设置 SDK

这里我们使用 `jenv` 和 `temurin` 来设置 sdk 和管理版本

**安装 temurin**

> 本次尝试使用 java 17 作为本次学习的版本

```
$ brew install temurin17
```

**jenv - 管理当前的 Java 环境**

> 命令行工具, 用来设定 JAVA_HOME 环境变量 jEnv - Manage your Java environment
>

安装

```
$ brew install jenv
```

添加到 `.zshrc`

```
# 添加到 .zshrc
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc

# 手动方式添加到 .zshrc
$ vim .zshrc
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

添加当前可用的 SDK

```
$ jenv add /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/
temurin64-17.0.7 added
17.0.7 added
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

设置 `JAVA_HOME`在安装 jenv 之后很有可能没有 `$JAVA_HOME` 变量, 可以通过如下命令来设置

```
$ jenv enable-plugin export
```

查看当前的 java 目录

```
$ echo $JAVA_HOME
/Users/duoli/.jenv/versions/17.0
```

查看下当前的 JDK 文件清单

```
$ cd /Users/duoli/.jenv/versions/17.0
$ ll
-rw-r--r--   1 root  wheel   2.3K Apr 19 11:41 NOTICE
drwxr-xr-x  30 root  wheel   960B Apr 19 11:41 bin
drwxr-xr-x   7 root  wheel   224B Apr 19 11:41 conf
drwxr-xr-x   9 root  wheel   288B Apr 19 11:41 include
drwxr-xr-x  72 root  wheel   2.3K Apr 19 11:41 jmods
drwxr-xr-x  72 root  wheel   2.3K Apr 19 11:41 legal
drwxr-xr-x  57 root  wheel   1.8K Apr 19 11:41 lib
drwxr-xr-x   3 root  wheel    96B Apr 19 11:41 man
-rw-r--r--   1 root  wheel   1.6K Apr 19 11:41 release
```

设置好了之后可以验证下 java 的版本

```
$ java -version
openjdk version "17.0.7" 2023-04-18
OpenJDK Runtime Environment Temurin-17.0.7+7 (build 17.0.7+7)
OpenJDK 64-Bit Server VM Temurin-17.0.7+7 (build 17.0.7+7, mixed mode, sharing)

$ javac -version
javac 17.0.7
```

## 2.2 Welcome.java

经典的 Hello World

在JDKI1中，单个源文件不再需要 javac 命令。这个特性是为了支特以 `shebang` (#)行(#/path/to/java)开头的shell脚本

<<< @/java/core-basic/src/Welcome.java

```
$ java Welcome.java
Hello world
===========
```

## 2.3 使用 IDE

新建项目

![](https://file.wulicode.com/doc/20230509/1683646304058.png)

## 2.4 JShell

向 python 一样的 shell 命令行工具

```
$ jshell
|  欢迎使用 JShell -- 版本 17.0.7
|  要大致了解该版本, 请键入: /help intro

jshell> /help intro
|  
|                                   intro
|                                   =====
|  
|  使用 jshell 工具可以执行 Java 代码，从而立即获取结果。
|  您可以输入 Java 定义（变量、方法、类等等），例如：int x = 8
|  或 Java 表达式，例如：x + x
|  或 Java 语句或导入。
|  这些小块的 Java 代码称为“片段”。
|  
|  这些 jshell 工具命令还可以让您了解和
|  控制您正在执行的操作，例如：/list
|  
|  有关命令的列表，请执行：/help

jshell> "多厘".length()
$1 ==> 2

jshell> $1 * 4 + 28
$2 ==> 36
```
