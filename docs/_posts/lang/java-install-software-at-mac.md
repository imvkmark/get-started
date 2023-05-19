---
title: "MacOS 上使用 brew 安装管理Java环境或组件"
date: 2022-04-14 22:27:04
toc: true
categories:
- ["Lang","Java","安装"]
---

Java 安装参考 [macOS 所有版本 JDK 安装指南 (https://wulicode.com/lang/8286d34034746907dcee568cbb07917b.html)


## Maven - 包管理工具
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

## Tomcat - Java 服务器工具
```
$ brew install tomcat
```

## jenv - 管理当前的 Java 环境
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
添加当前可用的 SDK
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
设置 `JAVA_HOME`<br />在安装 jenv 之后很有可能没有 `$JAVA_HOME` 变量, 可以通过如下命令来设置
```
$ jenv enable-plugin export
```

