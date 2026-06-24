---
description: '本内容介绍了Java学习入门：在Ubuntu下配置运行环境，包括默认JDK、JDK文档、JRE等；概述Java体系（Java EE、SE、ME）及特性；最后演示了Hello World程序的编写与试运行。'
lastUpdated: '2026-06-22 12:03:36'
head:
  - - meta
    - name: 'og:title'
      content: 'Java 学习 01 - 安装和 Hello world'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本内容介绍了Java学习入门：在Ubuntu下配置运行环境，包括默认JDK、JDK文档、JRE等；概述Java体系（Java EE、SE、ME）及特性；最后演示了Hello World程序的编写与试运行。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/primer/1-install-get-started.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/cdce7fca8d8c5c0e98c9833c6029cb19.png'
---
# Java 学习 01 - 安装和 Hello world

## 配置运行环境

因为我是 mac 电脑. 系统中自己自带了 java, javac, 所以不必去安装, 本身就有. 另外运行环境有两个. 一个是 `CodeRunner`, `Intelli Idea`, 暂时对集成环境不熟悉, 所以开始使用 `Code Runner` 来运行, 避免在环境上出现太多纠缠不清的问题.

## 成功配置之后的测试

成功之后运行命令则出现

```Plaintext
$ javac
用法: javac <options> <source files> ...
$ java
用法: java [-options] class [args...] ...
$ java -version
openjdk version "1.8.0_91"
OpenJDK Runtime Environment (build 1.8.0_91-8u91-b14-0ubuntu4~16.04.1-b14)
OpenJDK 64-Bit Server VM (build 25.91-b14, mixed mode)
```

## ubuntu 下设置运行环境

> 当我设置的时候出现 The selected directory is not a valid home for JDK 当我设置 jdk 的时候 目录是:

```Plaintext
/usr/lib/jvm/java-8-openjdk-amd64
```

![](https://file.wulicode.com/feishu-images/cdce7fca8d8c5c0e98c9833c6029cb19.png)

解决方案有以下两种

**自定义下载方式**

我们在官方网站下载的时候, 如果是需要安装的, 则需要下载 `.rpm` 包格式, 如果不需要安装的, 则需要下载 `.tar.gz` , 否则官方提供的两个包就没有什么卵用了.

![](https://file.wulicode.com/feishu-images/5fdef2f26aa72253c7bff2653698e94c.jpg)

**ubuntu 官方方式**

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

## 应用程序的基本结构

```Plaintext
[package 包名]
impoort 包名.类名
[public] class 类名 {
    int val = '123';
    public static void main(String args[]) {
        // 变量定义和语句
    }
}
```

## Java 基本介绍

### java体系 java EE , java SE, Java ME

> JavaSE （Java Platform Standard Edition，java平台标准版） JavaEE (Java Platform,Enterprise Edition，java平台企业版) JavaME (Java Platform Micro Edition，java平台微型版)

### Java 特性

是简单的是面向对象的是分布式的是健壮的是安全的是体系结构中立的是可移植的(跨平台)是解释型的高性能的(接近于C++)是多线程是动态的

## Hello World 试运行

```Plaintext
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
// 运行结果  Hello World
```