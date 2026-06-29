---
description: '本文介绍了Java程序环境搭建的完整流程，包括安装JDK与JRE工具包、编写首个Java程序、使用IDE开发工具、JShell交互式编程，以及Java Web环境的创建、服务器配置与项目运行。'
lastUpdated: '2026-06-29 13:28:07'
head:
  - - meta
    - name: 'og:title'
      content: '2.Java 程序环境搭建'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了Java程序环境搭建的完整流程，包括安装JDK与JRE工具包、编写首个Java程序、使用IDE开发工具、JShell交互式编程，以及Java Web环境的创建、服务器配置与项目运行。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/core/2-setup-of-the-program-environment.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/d96073db581042554ed632e4a9705240.png'
---
# 2.Java 程序环境搭建

## 2.1 安装 Java 工具包

### 2.1.1 术语介绍

**JavaSE, JavaEE, JavaME**

看下JavaSE, JavaEE, JavaME 三者之间的关系

```Plaintext
┌─────────────────────────┐
│Java EE                  │ JavaEE (Java Platform,Enterprise Edition，企业版)
│   ┌───────────────────┐ │  
│   │Java SE            │ │ JavaSE （Java Platform Standard Edition，标准版）
│   │   ┌─────────────┐ │ │
│   │   │   Java ME   │ │ │ JavaME (Java Platform Micro Edition，微型版)
│   │   └─────────────┘ │ │
│   └───────────────────┘ │
└─────────────────────────┘
```

**JDK & JRE**

```Plaintext
  ┌─    ┌──────────────────────────────────┐
  │     │     Compiler, debugger, etc.     │  JDK : Java Development Kit
  │     └──────────────────────────────────┘
 JDK ┌─ ┌──────────────────────────────────┐
  │  │  │                                  │
  │ JRE │      JVM + Runtime Library       │  JRE : Java Runtime Environment
  │  │  │                                  │
  └─ └─ └──────────────────────────────────┘
        ┌───────┐┌───────┐┌───────┐┌───────┐
        │Windows││ Linux ││ macOS ││others │
        └───────┘└───────┘└───────┘└───────┘
```

在开发的过程中使用的是 JDK 不是 JRE

![](https://file.wulicode.com/feishu-images/d96073db581042554ed632e4a9705240.png)

**JSR, JCP, RI, TCK**

- JSR规范：Java Specification Request
- JCP组织：Java Community Process
- RI：Reference Implementation
- TCK：Technology Compatibility Kit

[The Java Community Process(SM) Program](https://jcp.org/en/home/index)

JCP组织：Java Community Process

**Java 版本演变**

> 对这个东西比较感兴趣: 为什么 Java 8 又成为 1.8.0 ?

> Java 2这种提法始于1998年。当时Sun公司的销售人员感觉以增加小数点后面数值的方式改变版本号并没有反映出JDK 1.2 的重大改进。但是，由于在发布之后才意识到这个问题，

> 所以他们决定开发工具包的版本号仍然沿用1.2，接下来是 1.3. 1.4, 和 5.0 但是 Java 平台被重新命名为Java 2。因此，就有了Java 2 Standard Edition Software Development Kit 5.0 版，即 J2SE SDK 5.0

> 幸运的是，2006年版本号得到简化。Java标准版的下一个版本取名为 JavaSE6 ，后来又有 了Java SE 7和 Java SE 8 不过，“内部” 版本号却分别是1.6.0、1.7.0 和 1.8.0

### 2.1.2 下载和设置 SDK

::: info 📖
<p>扩展阅读</p><ul><li>[jenv - 管理当前的 Java 环境 ](/back-end/java/primer/jenv-java-environment--version-manager.md)</li><li>[sdkman - 管理多个 sdk 的工具](/development/tools/sdkman.md)</li></ul>
:::

这里我们使用 `jenv` 和 `temurin` 来设置 sdk 和管理版本

安装 temurin

> 本次尝试使用 java 17 作为本次学习的版本

```Plaintext
$ brew install temurin17
```

添加当前可用的 SDK

```Plaintext
$ jenv add /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/
temurin64-17.0.7 added
17.0.7 added
17.0 added

$ jenv global 17

$ jenv enable-plugin export
```

设置好了之后可以验证下 java 的版本

```Plaintext
$ java -version
openjdk version "17.0.7" 2023-04-18
OpenJDK Runtime Environment Temurin-17.0.7+7 (build 17.0.7+7)
OpenJDK 64-Bit Server VM Temurin-17.0.7+7 (build 17.0.7+7, mixed mode, sharing)

$ javac -version
javac 17.0.7
```

**ubuntu 下设置运行环境**

```Plaintext
# 默认jdk ,jdk 文档, jdk 无图形和解析界面
$ sudo apt-get install default-jdk default-jdk-doc  default-jdk-headless
# jre java runtime
$ sudo apt-get install default-jre default-jre-headless
```

如果需要更多的帮助可以搜索

```Plaintext
$ apt-cache search default-jdk
$ apt-cache search openjdk
```

JDK 的一些命令行说明

- `java`：这个可执行程序其实就是JVM，运行Java程序，就是启动JVM，然后让JVM执行指定的编译后的代码；
- `javac`：这是Java的编译器，它用于把Java源码文件（以 `.java` 后缀结尾）编译为Java字节码文件（以 `.class` 后缀结尾）, JDK 11 中不在需要 `javac` 命令
- `jar`：用于把一组 `.class` 文件打包成一个 `.jar` 文件，便于发布；
- `javadoc`：用于从Java源码中自动提取注释并生成文档；
- `jdb`：Java调试器，用于开发阶段的运行调试

## 2.2 Welcome.java

经典的 Hello World

在 JDK11 中，单个源文件不再需要 `javac` 命令。这个特性是为了支特以 `shebang` (`#`)行(`#!/path/to/java`)开头的shell脚本

```Java
public class Welcome
{
    public static void main(String[] args)
    {
        String greeting = "Hello world";
        System.out.println(greeting);
        for (int i = 0; i < greeting.length(); i++)
            System.out.print("=");
        System.out.println();
    }
}
```

图示的执行流程

```Plaintext
┌──────────────────┐
│    Hello.java    │◀── source code
└──────────────────┘
          │ compile
          ▼
┌──────────────────┐
│   Hello.class    │◀── byte code
└──────────────────┘
          │ execute
          ▼
┌──────────────────┐
│    Run on JVM    │
└──────────────────┘
```

执行结果

```Plaintext
$ java Welcome.java
Hello world
===========
```

## 2.3 使用 IDE

`IDE` : Integrated Development Environment

新建项目

![](https://file.wulicode.com/feishu-images/1e1220f91d41ae913e69d3015dade532.png)

## 2.4 JShell

向 python 一样的 shell 命令行工具

```Plaintext
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

![](https://file.wulicode.com/feishu-images/1e1220f91d41ae913e69d3015dade532.png)

点击next，输入项目名称和项目路径后finish即可。

项目创建完成后如图下图所示：

![](https://file.wulicode.com/feishu-images/c4ebfb05562084aab5596e77fd10afa4.png)

一个简单的Java Web项目就创建完成了

我们来看一下目录都是干嘛的

**文件目录**

```Plaintext
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

![](https://file.wulicode.com/feishu-images/ce068a3e6c1334f519248af894be145c.png)

点击+号，找到Tomcat Server

![](https://file.wulicode.com/feishu-images/c4d55c2da2a146dbd04ea29f566432b9.png)

然后点击Server，配置一下服务器，选择你的Tomcat的安装目录即可

![](https://file.wulicode.com/feishu-images/588deb66b29801b8ff046b8ee8ccad22.png)

我们给项目起个名字，这个名字就是后面部署到Tomcat的项目名称

选择 Deployment，点+号，选择 Artifacts

![](https://file.wulicode.com/feishu-images/247129347ed9938e3187c6ff941caa75.png)

把Name改一下，这里我们直接跟标识名一样

![](https://file.wulicode.com/feishu-images/a936f6b371746a3506bbc38ff4e24cd6.png)

然后点击ok，至此，服务器配置完毕了

### 2.5.3 运行项目

服务器配置完毕以后，我们就可以启动项目了

先随便修改点东西

**index.jsp**

```Plaintext
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

![](https://file.wulicode.com/feishu-images/3835290c927add0164b709995c8fca54.png)

部署成功后会自动弹出页面

![](https://file.wulicode.com/feishu-images/c84887f32a79b4d502b7f2b3ea2ee91c.png)