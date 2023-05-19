---
outline : 'deep'
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

### 2.1.2 设置 SDK

::: info 扩展阅读

- [jenv - 管理当前的 Java 环境](./../../development/tools/jenv.md)
- [Homebrew 支持的 SDK 说明](./../faq.md#homebrew-支持的-jdk)
- [SDKMAN!支持的 SDK 说明](../../development/tools/sdkman.md#可用的-jdk)

:::

这里我们使用 `jenv` 和 `temurin` 来设置 sdk 和管理版本

安装 temurin

> 本次尝试使用 java 17 作为本次学习的版本

```
$ brew install temurin17
```

添加当前可用的 SDK

```
$ jenv add /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/
temurin64-17.0.7 added
17.0.7 added
17.0 added

$ jenv global 17

$ jenv enable-plugin export
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
