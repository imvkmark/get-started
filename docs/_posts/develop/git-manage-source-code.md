---
title: "管理 - 使用 git 来管理源代码"
date: 2022-04-14 22:27:16
toc: true
categories:
- ["开发","Git"]
---

## 目的
为了能够通过版本库来更好的管理代码, 所以有利于版本库文件查找的工作都是有效的


## 注意事项

### 设置自己的账号和邮箱
设置自己的账号和邮箱便于其他人看到某个错误代码的时候通知相关人员修复<br />![](https://file.wulicode.com/yuque/202208/04/23/0611oyIM67Gc.png?x-oss-process=image/resize,h_372)

### 使用中文注释
使用中文注释便于更明确的识别代码的功能便于查找代码的修改<br />![](https://file.wulicode.com/yuque/202208/04/23/0612i33WEqPc.png?x-oss-process=image/resize,h_152)

### 使用前缀
由于项目中有大量的修改bug, 任务型的代码进行修改, 所以使用前缀是区分代码的比较快速的标识

- `Bug#123`  bug前缀
- `Mark# 增加IDE-helper框架` 新增框架标识

![image.png](https://file.wulicode.com/yuque/202208/04/23/0612fCEJD21C.png?x-oss-process=image/resize,h_126)

### 调试文件配置文件不要迁至代码库
源码库中是一些工具性的代码, 属于工具需求的可以在里边存放, 如果是个人为了测试而添加的代码文件不要放在代码库中.

### 禁止在源代码中暴露服务器的任何信息
不要在服务器中写任何的可能的暴露服务器的信息, 自己的测试代码不要和公共的源码库进行混淆, 包含自己的学习代码, 功能测试等代码

