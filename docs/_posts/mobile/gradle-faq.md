---
title: "Gradle FAQ"
date: 2022-04-14 22:14:25
toc: true
categories:
- ["手机端","Android"]
---

## Gradle Sync 时候出现 Could not get resource
需要查看代理的方式


### 1. 使用代理
**1. gradle 文件夹**
```
$ vim ~/.gradle/gradle.properties
```
**2. 项目中的 gradle.properties**
```
$ vim /path/to/project/gradle.properties
```
把这几个值根据相应的要求进行处理
```
# 这个是 http 代理
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1086
systemProp.https.nonProxyHosts=192.168.*
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1086
# 这个是 socket5 方法
org.gradle.jvmargs=-DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1087
```

### 2.下载大小和存储位置
在gradle-wrapper.properties中查看gradle下载地址和版本<br />去查看所有分发的gradle版本地址:[https://services.gradle.org/distributions](https://services.gradle.org/distributions)<br />在这里可以查看到最新的gradle版本，点击可下载.<br />存储位置:<br />如果这里文件内容有变化, 便是在下载的. 不要心焦, 慢慢等待
```
$ ~/.gradle/wrapper/dists/gradle-5.1.1-all/97z1ksx6lirer3kbvdnh7jtjg/
```

### 耐心等待
等待构建<br />![](https://file.wulicode.com/yuque/202208/04/15/3520ESKoJufx.png?x-oss-process=image/resize,h_204)

