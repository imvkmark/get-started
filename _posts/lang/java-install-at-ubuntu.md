---
title: "ubuntu 安装 oracle java"
date: 2022-04-14 22:15:12
toc: true
categories:
- ["Lang","Java","安装"]
---

## 使用系统默认安装(推荐)
速度快, 官方维护问题



```
$ apt install default-jre
```

## 使用 ppa 安装(速度慢, 好断网)
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

