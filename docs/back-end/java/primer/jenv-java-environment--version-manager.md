---
description: 'jenv 是管理 Java 环境的工具，支持安装、配置 .zshrc（手动添加）、管理 SDK 版本、列出已管理的版本、设置全局或当前 shell 的 Java 版本，并可检测环境设置及导出 JAVA_HOME 变量。'
lastUpdated: '2026-06-21 22:30:35'
head:
  - - meta
    - name: 'og:title'
      content: 'jenv - 管理当前的 Java 环境 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'jenv 是管理 Java 环境的工具，支持安装、配置 .zshrc（手动添加）、管理 SDK 版本、列出已管理的版本、设置全局或当前 shell 的 Java 版本，并可检测环境设置及导出 JAVA_HOME 变量。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/primer/jenv-java-environment--version-manager.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/fee1b0f8b6db8ab458d0807d7d9f69f1.png'
---
# jenv - 管理当前的 Java 环境

![](https://file.wulicode.com/feishu-images/fee1b0f8b6db8ab458d0807d7d9f69f1.png)

> 命令行工具, 用来设定 `JAVA_HOME` 环境变量

> jEnv - Manage your Java environment  
> https://www.jenv.be/

## 安装

```Bash
brew install jenv
```

添加到 `.zshrc`

```Plaintext
# 添加到 .zshrc
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc

# 手动方式添加到 .zshrc
$ vim .zshrc
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```

在添加之后需要手动运行 `source ~/.zshrc` 是 jenv 失效

## 使用

### 添加当前可用的 SDK

```Plaintext
$ jenv add /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/
temurin64-17.0.7 added
17.0.7 added
17.0 added
```

### 版本管理

如何使用

```Plaintext
# 列出管理的版本
$ jenv versions

# 全局版本
$ jenv global 1.8

# 当前版本
$ jenv local 1.8

# 当前shell
$ jenv shell 1.8
```

### 检测当前的环境设置情况

```Plaintext
$ jenv doctor
```

### 导出 JAVA_HOME 变量

设置 `JAVA_HOME`在安装 jenv 之后很有可能没有 `$JAVA_HOME` 变量, 可以通过如下命令来设置

```Plaintext
$ jenv enable-plugin export
```

查看当前的 java 目录

```Plaintext
$ echo $JAVA_HOME
/Users/duoli/.jenv/versions/17.0
```

查看下当前的 JDK 文件清单

```Plaintext
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

```Plaintext
$ java -version
openjdk version "17.0.7" 2023-04-18
OpenJDK Runtime Environment Temurin-17.0.7+7 (build 17.0.7+7)
OpenJDK 64-Bit Server VM Temurin-17.0.7+7 (build 17.0.7+7, mixed mode, sharing)

$ javac -version
javac 17.0.7
```