---
title: "在 CentOS7 中安装和切换 Java"
date: 2022-09-22 21:22:24
toc: true
categories:
- ["Lang","Java","安装"]
---

## 安装
搜寻可用的 Java SDK

```
# yum search openjdk 
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
...
```
安装指定的版本
```
# yum install java-11-openjdk
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
切换不同的 Java 版本
```
# alternatives --config java

共有 2 个提供“java”的程序。

  选项    命令
-----------------------------------------------
*  1           java-1.8.0-openjdk.x86_64 (/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.312.b07-1.el7_9.x86_64/jre/bin/java)
 + 2           java-11-openjdk.x86_64 (/usr/lib/jvm/java-11-openjdk-11.0.16.0.8-1.el7_9.x86_64/bin/java)

按 Enter 保留当前选项[+]，或者键入选项编号：
```

## 卸载
找到安装的 java 以及相关的包, 仅仅使用 `yum remove java-11-openjdk`是删除不掉执行包的, 执行包的位置在 `/usr/lib/jvm/`目录, 所以我们匹配出来安装的包, 然后进行移除<br />找到已经安装的包
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
```
# yum remove java-11-openjdk
# yum remove java-11-openjdk-headless
```

