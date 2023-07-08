---
outline: 'deep'
---

# 2. Java 程序设计环境

## 2.1 安装 Java 工具包

### 2.1.1 下载 JDK

首先弄清楚一些专业术语

> JavaSE （Java Platform Standard Edition，java平台标准版）
>
> JavaEE (Java Platform,Enterprise Edition，java平台企业版)
>
> JavaME (Java Platform Micro Edition，java平台微型版)

![](https://file.wulicode.com/doc/20230509/1683642004051.png)

> **对这个东西比较感兴趣: 为什么 Java 8 又成为 1.8.0 ?**
>
> Java 2这种提法始于1998年。当时Sun公司的销售人员感觉以增加小数点后面数值的方式改变版本号并没有反映出JDK 1.2
> 的重大改进。但是，由于在发布之后才意识到这个问题，
>
> 所以他们决定开发工具包的版本号仍然沿用1.2，接下来是 1.3. 1.4, 和 5.0 但是 Java 平台被重新命名为Java 2。因此，就有了Java 2
> Standard Edition Software Development
> Kit
> 5.0 版，即 J2SE SDK 5.0
>
> 幸运的是，2006年版本号得到简化。Java标准版的下一个版本取名为 JavaSE6 ，后来又有 了Java SE 7和 Java SE 8 不过，“内部”
> 版本号却分别是1.6.0、1.7.0 和 1.8.0

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

**ubuntu 下设置运行环境**

```
# 默认jdk ,jdk 文档, jdk 无图形和解析界面
$ sudo apt-get install default-jdk default-jdk-doc  default-jdk-headless
# jre java runtime
$ sudo apt-get install default-jre default-jre-headless
```

如果需要更多的帮助可以搜索

```
$ apt-cache search default-jdk
$ apt-cache search openjdk
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

## 2.5 Java Web 环境搭建

### 2.5.1. 创建一个 Java Web 项目

打开Idea，点击 new project

选择Java，配置一下sdk，就是jdk的安装目录

然后将下图所示的给勾选上

![](https://file.wulicode.com/yuque/202208/04/14/5718VFwjjOTO.jpg?x-oss-process=image/resize,h_582)

点击next，输入项目名称和项目路径后finish即可。

项目创建完成后如图下图所示：

![](https://file.wulicode.com/yuque/202208/04/14/5718JYKBrNJK.jpg?x-oss-process=image/resize,h_1416)

一个简单的Java Web项目就创建完成了

我们来看一下目录都是干嘛的

**文件目录**

```
src   ：主要用来存放我们的Java代码
web   ：主要用来存放需要发布的应用文件，包括页面，配置文件等
   WEB-INF   ：存放一些管理类，配置文件等
      web.xml    : 项目的配置文件
   index.jsp : 默认的首页面
```

### 2.5.2. 配置 Java Web 服务器

项目创建完成之后想要运行还需要配置一下Tomcat服务器，才能运行。

我们看一下配置步骤

如下图所示，点击三角符号，选择Edit Configurations

![](https://file.wulicode.com/yuque/202208/04/14/5719g0Yznhpj.png?x-oss-process=image/resize,h_271)

点击+号，找到Tomcat Server

![](https://file.wulicode.com/yuque/202208/04/14/572045pqKnAY.png?x-oss-process=image/resize,h_651)

然后点击Server，配置一下服务器，选择你的Tomcat的安装目录即可

![](https://file.wulicode.com/yuque/202208/04/14/5721TffLivO2.png?x-oss-process=image/resize,h_431)

我们给项目起个名字，这个名字就是后面部署到Tomcat的项目名称

选择 Deployment，点+号，选择 Artifacts

![](https://file.wulicode.com/yuque/202208/04/14/5722aqxodxnq.png?x-oss-process=image/resize,h_675)

把Name改一下，这里我们直接跟标识名一样

![](https://file.wulicode.com/yuque/202208/04/14/5723OVmioZkx.png?x-oss-process=image/resize,h_1578)

然后点击ok，至此，服务器配置完毕了

### 2.5.3 运行项目

服务器配置完毕以后，我们就可以启动项目了

先随便修改点东西

**index.jsp**

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Hello Java</title>
  </head>
  <body>
  Hello World
  </body>
</html>
```

然后点击绿色的三角符号，将项目部署到本地服务器并开始运行，启动期间会有Tomcat的启动信息

![](https://file.wulicode.com/yuque/202208/04/14/5724pE7TzM4e.png?x-oss-process=image/resize,h_754)

部署成功后会自动弹出页面

![](https://file.wulicode.com/yuque/202208/04/14/5725Y3OMCzv1.png?x-oss-process=image/resize,h_455)