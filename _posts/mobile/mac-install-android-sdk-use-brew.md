---
title: "MAC OS下使用 Homebrew 安装和配置 android-sdk"
date: 2022-08-06 17:30:29
toc: true
categories:
- ["手机端","Android"]
---

之前的方式是使用 brew 进行安装, 但是之后官方好像不进行维护了
> android-sdk has been officially discontinued upstream. It may stop working correctly (or at all) in recent versions of macOS.

<a name="22d3b1d8-6c08-40ef-aa72-485768a4856d"></a>



## 安装 Android Studio
下载 Android Studio

打开之后要求设置 sdk 的位置, 我们根据他的要求进行设定

[![](https://file.wulicode.com/yuque/202208/24/23/1947o9vWdBA4.png?x-oss-process=image/resize,h_155)](https://cdn.nlark.com/yuque/0/2022/png/87644/1659778228592-db085051-3bf2-4b5f-9cb2-0375e2e7fb9c.png)
<a name="c7d77a32-9e14-4243-bece-47e3f9974170"></a>
## 配置 bash/zshrc
1、配置 `.bash_profile`，如果使用的是Oh-My-Zsh，则配置 `.zshrc` ，在文件的结尾加上下面这句：
```
export ANDROID_HOME="/usr/local/share/android-sdk"
export PATH="${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools"
```
然后 `source ~/.zshrc` 使其生效

这里的目的是把 tools 和 platform-tools 文件夹下的工具加入到可执行目录下去

2、安装辅助包

在 Android Studio 中打开进行更新或者是用 `sdkmanager` 进行更新

