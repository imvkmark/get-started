---
description: '使用Git管理源代码时，需设置个人账号和邮箱，注释使用中文并添加前缀，调试文件和配置文件不得纳入代码库，严禁在源代码中泄露服务器信息。'
lastUpdated: '2026-07-02 18:08:42'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ 使用 git 来管理源代码'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用Git管理源代码时，需设置个人账号和邮箱，注释使用中文并添加前缀，调试文件和配置文件不得纳入代码库，严禁在源代码中泄露服务器信息。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/git/use-git-manage-code.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/25311a059879f2a80369ed4996d2397a.png'
---
# ⚠️ 使用 git 来管理源代码

::: warning ⚠️

此文章较为久远, 目前使用 AI 生成相关内容, 这里已过时

:::

## 目的

为了能够通过版本库来更好的管理代码, 所以有利于版本库文件查找的工作都是有效的

## 注意事项

### 设置自己的账号和邮箱

设置自己的账号和邮箱便于其他人看到某个错误代码的时候通知相关人员修复

![](https://file.wulicode.com/feishu-images/25311a059879f2a80369ed4996d2397a.png)

### 使用中文注释

使用中文注释便于更明确的识别代码的功能便于查找代码的修改

![](https://file.wulicode.com/feishu-images/fc0d772636221ed02f5be8ef9557b01e.png)

### 使用前缀

由于项目中有大量的修改bug, 任务型的代码进行修改, 所以使用前缀是区分代码的比较快速的标识

- `Bug#123` bug前缀
- `Mark# 增加IDE-helper框架` 新增框架标识

![](https://file.wulicode.com/feishu-images/f4ed86ee924ec26717f0f2477835dcce.png)

### 调试文件配置文件不要迁至代码库

源码库中是一些工具性的代码, 属于工具需求的可以在里边存放, 如果是个人为了测试而添加的代码文件不要放在代码库中.

### 禁止在源代码中暴露服务器的任何信息

不要在服务器中写任何的可能的暴露服务器的信息, 自己的测试代码不要和公共的源码库进行混淆, 包含自己的学习代码, 功能测试等代码