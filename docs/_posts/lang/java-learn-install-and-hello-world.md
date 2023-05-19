---
title: "Java 学习 01 - 安装和 Hello world"
date: 2022-04-14 22:14:29
toc: true
categories:
- ["Lang","Java"]
---

## 配置运行环境
因为我是 mac 电脑. 系统中自己自带了 java, javac, 所以不必去安装, 本身就有. 另外运行环境有两个. 一个是 `CodeRunner`, `Intelli Idea`, 暂时对集成环境不熟悉, 所以开始使用 `Code Runner` 来运行, 避免在环境上出现太多纠缠不清的问题.


## 成功配置之后的测试
成功之后运行命令则出现
```
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
> 当我设置的时候出现 The selected directory is not a valid home for JDK
> 当我设置 jdk 的时候 目录是:  `/usr/lib/jvm/java-8-openjdk-amd64`, 弹出如下的界面:
> ![](https://file.wulicode.com/yuque/202208/04/15/3655Fd1ggnph.jpg?x-oss-process=image/resize,h_154)

解决方案有以下两种<br />**自定义下载方式**<br />我们在官方网站下载的时候, 如果是需要安装的, 则需要下载 `.rpm` 包格式, 如果不需要安装的, 则需要下载 `.tar.gz`, 否则官方提供的两个包就没有什么卵用了.<br />![](https://file.wulicode.com/yuque/202208/04/15/3655J73a2BCb.jpg?x-oss-process=image/resize,h_308)<br />**ubuntu 官方方式**
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

## 应用程序的基本结构
```
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
> JavaSE （Java Platform Standard Edition，java平台标准版）
> JavaEE (Java Platform,Enterprise Edition，java平台企业版)
> JavaME (Java Platform Micro Edition，java平台微型版)


### Java 特性
是简单的<br />是面向对象的<br />是分布式的<br />是健壮的<br />是安全的<br />是体系结构中立的<br />是可移植的(跨平台)<br />是解释型的<br />高性能的(接近于C++)<br />是多线程<br />是动态的

## Hello World 试运行
```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
// 运行结果  Hello World
```

