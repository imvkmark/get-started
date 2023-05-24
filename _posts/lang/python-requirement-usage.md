---
title: "[转]Python 中的 requirement txt"
date: 2022-04-20 22:52:50
toc: true
categories:
- ["Lang","Python"]
---

[https://zhuanlan.zhihu.com/p/69058584](https://zhuanlan.zhihu.com/p/69058584)

![image.png](https://file.wulicode.com/yuque/202208/04/15/0149Xpg08rEr.png?x-oss-process=image/resize,h_540)
<a name="a6a8759c-4229-4521-86e9-7815313ffeaa"></a>



## Python 中的依赖
正如 PHP 中使用 Composer 维护依赖一样，Python 也需要维护项目相关的依赖包。通常我们会在项目的根目录下放置一个 requirement.txt 文件，用于记录所有依赖包和它的确切版本号。

requirement.txt 的内容长这样：
```
alembic==1.0.10
appnope==0.1.0
astroid==2.2.5
attrs==19.1.0
backcall==0.1.0
bcrypt==3.1.6
bleach==3.1.0
cffi==1.12.3
Click==7.0
decorator==4.4.0
defusedxml==0.6.0
entrypoints==0.3
...
```
<a name="358cac99-bde5-49f3-ae50-7284323548da"></a>
## 如何使用？
那么 requirement.txt 究竟如何使用呢？

当我们拿到一个项目时，首先要在项目运行环境安装 requirement.txt 所包含的依赖：
```
pip install -r requirement.txt
```
当我们要把环境中的依赖写入 requirement.txt 中时，可以借助 `freeze` 命令：
```
pip freeze >requirements.txt
```
<a name="33aed391-f20c-4895-be21-ddde6d5de4bc"></a>
## 环境混用怎么办？
在导出依赖到 requirement.txt 文件时会有一种尴尬的情况。

你的本地环境不仅包含项目 A 所需要的依赖，也包含着项目 B 所需要的依赖。此时我们要如何做到只把项目 A 的依赖导出呢？

[pipreqs](https://link.zhihu.com/?target=https%3A//github.com/bndr/pipreqs) 可以通过扫描项目目录，帮助我们仅生成当前项目的依赖清单。

通过以下命令安装：
```
pip install pipreqs
```
运行：
```
pipreqs ./
```

