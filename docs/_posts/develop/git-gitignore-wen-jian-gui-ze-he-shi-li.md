---
title: "Git .gitignore 文件规则和示例"
date: 2021-05-20 16:01:15
toc: true
categories:
- ["开发","Git"]
---

## 一、文件规则

gitignore其实就是在glob匹配的基础上添加了路径匹配和`!`、`#`语法。

基本规范：

- 所有空行或者以注释符号`#`开头的行都会被 Git 忽略。
- 匹配模式最后跟反斜杠`/`说明要忽略的是`目录`
- 要`忽略`指定模式以外的文件或目录，可以在模式前加上惊叹号`!`取反
- 可以使用标准的 glob 模式匹配

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式：

- 星号`*`匹配`零个或多个`任意字符
- 问号`?`只匹配`一个`任意字符
- 方括号`[]`匹配`任何一个`列在方括号中的字符
- 如果在方括号中使用短划线`-`分隔两个字符，表示所有在这两个字符范围内的都可以匹配，如`[0-9]`表示匹配所有 0 到 9 的数字

**! 取消忽略说明**<br />
`!*-ui`就是重新匹配当前目录下的以‘-ui’结尾的文件夹。这里需要注意，如果父级目录被忽略了，子集目录是无法取消忽略的。例：


```
*-ui
!jquery-ui/jquery.js
复制代码
```

是无法重新匹配jquery.js文件的。正确写法：

```
*-ui
!jquery-ui
jquery-ui/*
!!jquery-ui/jquery.js
```

****表示匹配零到多级目录**

`**/foo`同 `foo`。

`abc/**`匹配abc本身以及其所有子文件夹、子文件夹的子文件夹（无限深度）和其中文件。

`abc/**/d`匹配 'abc/d'、'abc/e/d'、'abc/e/f/d'、'e/abc/f/d' 等。

**使用 .gitignore 忽略文件**

```
tmp.txt             # 不加入tmp.txt
*.log               # 不加入所有的log
tmp/*               # 不加入tmp下所有文件
log/**/*.log        # 忽略log目录下包含子目录的所有.log文件
log/**/*            # 特定目录下的所有文件(log本身扔被跟踪)
```

**空目录**

> 由于git不会加入空目录，所以下面做法会导致tmp不存在


```
tmp/*                    #不加入tmp下所有文件
```

> 在tmp下也加个`.gitignore`，其內容为


```
*
!.gitignore
```


## 二、添加忽略规则的方式

[添加忽略规则](https://help.github.com/en/github/using-git/ignoring-files)<br />
[GitHub .gitignore 集合](https://github.com/github/gitignore)

有时候，有一些文件你不希望 Git 检入 仓库。有几种方法可以告诉 Git 忽略哪些文件。


### 1. 局部方式(项目中)

在存储库中创建一个名为 `.gitignore` 的文件，Git会在进行提交之前使用它来确定忽略哪些文件和目录。

一个 `.gitignore` 文件应该提交到仓库中，以便与任何其他克隆仓库的用户共享这个忽略规则。

GitHub在 [.gitignore](https://github.com/github/gitignore) 公共仓库中维护了一个官方的列表，(列表里面包含了在使用)许多流行的操作系统、环境和语言时的推荐的 `.gitignore` 文件。

如果你想忽略一个已经出于检入状态的文件，即使你稍后添加了一个(忽略)规则，Git也将不会忽略这个文件。在这种情况下，您必须先在终端中运行以下命令，以解除文件：

```
# 停止追踪指定文件，但该文件会保留在工作区
git rm --cached FILENAME
```


### 2. 全局文件(用户配置)

您也可以创建一个全局的.gitignore文件，这是一个忽略计算机上每个Git仓库中文件的规则列表。例如，您可以在 `~/.gitignore_global` 中创建一个文件，并为其添加一些规则。

打开命令行, 输入一下命令

```
git config --global core.excludesfile ~/.gitignore_global
```


### 3. 个人方式(项目 git-exclude)

如果您不想创建一个与其他人共享的 `.gitignore` 文件，那么你可以创建一些不与仓库一起提交的规则。您可以将此技术用于不希望其他用户生成的本地生成的文件，例如编辑器创建的文件。

使用文本编辑器打开Git仓库根目录下名为 `.git/info/exclude` 的文件。您在此处添加的任何规则都不会被检入，并且只会忽略本地仓库的文件。


## 三、示例的 `.gitignore` 文件

[Some common .gitignore configurations](https://gist.github.com/octocat/9257657)

```
# Compiled source #
###################
*.com
*.class
*.dll
*.exe
*.o
*.so

# Packages #
############
# it's better to unpack these files and commit the raw source
# git has its own built in compression methods
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip

# Logs and databases #
######################
*.log
*.sql
*.sqlite

# OS generated files #
######################
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Project #
###########
```


## 四、参考

- [Git 忽略规则 .gitignore文件](https://www.cnblogs.com/baiqiantao/p/7798132.html)

