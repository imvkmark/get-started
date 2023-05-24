---
title: "extundelete 代码解析"
date: 2022-04-20 22:07:54
toc: true
categories:
- ["Lang","C"]
---

## 安装

官方地址: [extundelete](http://extundelete.sourceforge.net/)




```
./configure
make  &&  make install
```

```
extundelete  
	--help  #查看有哪些选项
	--restore-file 指定恢复文件
	--restore-all 恢复全部
```

恢复完成后,恢复的文件就在当前目录下生成的RECOVERED_FILES的目录里.


## 代码解析方式


### 核心代码说明(仅供参考)

核心代码解析, 可能不是很准确. 自己也没有学过C, 只是看文件结构组织来说的, 具体的可以看下源代码中的英文介绍或者函数跟踪来学习代码. 具体的函数解析需要你根据流程来细细的解析代码. 祝你成功.

```
src
   - block.c             # 循环节点上的区块
   - block.h             # 同名头文件
   - cli.cc              # 配置文件或者显示信息相关
   - exundelete.cc       # c++ 写的执行的主文件/应该是核心代码
   - extundelete.h       # 主文件全局变量的函数定义头文件
   - extundelete-priv.h  # 主文件私有变量的函数头文件定义
   - insertionops.cc     # 输出信息
   - jfs_compat.h        
   - kernel-jb.dh        # 看解释好像和内核有点关系
```


### 学习使用的工具

我使用的这款工具是 jetbrains 出品的 Clion, 能够实现函数代码跟踪.

![image.png](https://file.wulicode.com/yuque/202208/04/22/4117tukQN62Y.png?x-oss-process=image/resize,h_37)

代码界面

![image.png](https://file.wulicode.com/yuque/202208/04/22/4118hGVsBJiS.png?x-oss-process=image/resize,h_728)

## 问题


### 1. 没有 ext2fs 库

在ubuntu上安装之前，`./configure` 配置 `extundelete`的时候发现提示 没有找到 `ext2fs` 库

```
extundelete 0.2.x$ ./configure
Configuring extundelete 0.2.x
configure: error: Can't find ext2fs library
```

解决方法:

```
sudo apt-get install e2fslibs-dev e2fslibs-dev
```

