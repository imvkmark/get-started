---
title: "Git Commit 使用规范流程"
date: 2021-05-20 16:01:40
toc: true
categories:
- ["开发","Git"]
---

原文地址 : [Git 使用规范流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)

团队开发中，遵循一个合理、清晰的 Git使用流程，是非常重要的。

否则，每个人都提交一堆杂乱无章的commit，项目很快就会变得难以协调和维护。

下面是[ThoughtBot](https://github.com/thoughtbot/guides/tree/master/protocol/git) 的Git使用规范流程。我从中学到了很多，推荐你也这样使用Git。

![](https://file.wulicode.com/yuque/202208/04/22/42496XLOPKZ2.png)





## 第一步：新建分支

首先，每次开发新功能，都应该新建一个单独的分支（这方面可以参考[《Git分支管理策略》](http://www.ruanyifeng.com/blog/2012/07/git.html)）。

```
# 获取主干最新代码
$ git checkout develop
$ git pull

# 新建一个开发分支myfeature
$ git checkout -b feature/my
```


## 第二步：提交分支commit

分支修改后，就可以提交commit了。

```
$ git add --all
$ git status
$ git commit --verbose
```

`git add` 命令的 `--all` 参数，表示保存所有变化（包括新建、修改和删除）。从Git 2.0开始，all是 git add 的默认参数，所以也可以用 git add . 代替。

`git status` 命令，用来查看发生变动的文件。

`git commit` 命令的 verbose 参数，会列出 [diff](http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html) 的结果。

**git 提交示例**

```
$ git status
位于分支 feature/my
尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
        修改：     feature.txt

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）

$ git commit --verbose
位于分支 feature/my
尚未暂存以备提交的变更：
        修改：     feature.txt

修改尚未加入提交
```


## 第三步：撰写提交信息

提交commit时，必须给出完整扼要的提交信息，下面是一个范本。

```
Present-tense summary under 50 characters

* More information about commit (under 72 characters).
* More information about commit (under 72 characters).

http://project.management-system.com/ticket/123
```

第一行是不超过50个字的提要，然后空一行，罗列出改动原因、主要变动、以及需要注意的问题。最后，提供对应的网址（比如Bug ticket）。


## 第四步：与主干同步

分支的开发过程中，要经常与主干保持同步。其目的是保障最新代码协同

```
$ git fetch origin
$ git rebase origin/develop
```


## 第五步：合并commit

分支开发完成后，很可能有一堆commit，但是合并到主干的时候，往往希望只有一个（或最多两三个）commit，这样不仅清晰，也容易管理。

那么，怎样才能将多个commit合并呢？这就要用到 `git rebase` 命令。

```
$ git rebase -i origin/develop
```

`git rebase` 命令的 `-i` 参数表示互动（interactive），这时 git会打开一个互动界面，进行下一步操作。

下面采用[Tute Costa](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history)的例子，来解释怎么合并commit。

```
pick 90f28d9 介绍 OpenPGP 并且添加基础使用规范
pick 8163082 修复 url 参数错误
pick 6665b96 修复 url 参数错误, 多地址模式
pick f9adae8 增加注释

# 变基 a296be5..f9adae8 到 f9adae8（4 个提交）
#
# 命令:
# p, pick <提交> = 使用提交
# r, reword <提交> = 使用提交，但修改提交说明
# e, edit <提交> = 使用提交，进入 shell 以便进行提交修补
# s, squash <提交> = 使用提交，但融合到前一个提交
# f, fixup <提交> = 类似于 "squash"，但丢弃提交说明日志
# x, exec <命令> = 使用 shell 运行命令（此行剩余部分）
# b, break = 在此处停止（使用 'git rebase --continue' 继续变基）
# d, drop <提交> = 删除提交
# l, label <label> = 为当前 HEAD 打上标记
# t, reset <label> = 重置 HEAD 到该标记
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       创建一个合并提交，并使用原始的合并提交说明（如果没有指定
# .       原始提交，使用注释部分的 oneline 作为提交说明）。使用
# .       -c <提交> 可以编辑提交说明。
#
# 可以对这些行重新排序，将从上至下执行。
#
# 如果您在这里删除一行，对应的提交将会丢失。
#
# 然而，如果您删除全部内容，变基操作将会终止。
#
# 注意空提交已被注释掉
```

上面的互动界面，先列出当前分支最新的4个commit（越下面越新）。每个commit前面有一个操作命令，默认是pick，表示该行commit被选中，要进行rebase操作。

4个commit的下面是一大堆注释，列出可以使用的命令。

上面这6个命令当中，squash 和 fixup 可以用来合并commit。先把需要合并的 commit 前面的动词，改成 squash（或者s）。

```
pick 90f28d9 介绍 OpenPGP 并且添加基础使用规范
s 8163082 修复 url 参数错误
s 6665b96 修复 url 参数错误, 多地址模式
pick f9adae8 增加注释
```

这样一改，执行后，当前分支只会剩下两个commit。第二行和第三行的commit，都会合并到第一行的commit。提交信息会同时包含这三个 commit 的提交信息。

```
# 这是一个 3 个提交的组合。
# 这是第一个提交说明：

介绍 OpenPGP 并且添加基础使用规范

# 这是提交说明 #2：
修复 url 参数错误

# 这是提交说明 #3：
修复 url 参数错误, 多地址模式

...
```

如果将第三行的 squash 命令改成 fixup 命令。

```
pick 90f28d9 介绍 OpenPGP 并且添加基础使用规范
s 8163082 修复 url 参数错误
f 6665b96 修复 url 参数错误, 多地址模式
pick f9adae8 增加注释
```

运行结果相同，还是会生成两个commit，第二行和第三行的commit，都合并到第一行的commit。但是，新的提交信息里面，第三行commit的提交信息，会被注释掉。

```
# 这是一个 3 个提交的组合。
# 这是第一个提交说明：

介绍 OpenPGP 并且添加基础使用规范

# 这是提交说明 #2：

修复 url 参数错误

# 提交说明 #3 将被跳过：

修复 url 参数错误, 多地址模式

# 请为您的变更输入提交说明。以 '#' 开始的行将被忽略，而一个空的提交
# 说明将会终止提交。
#
# 日期：  Fri Feb 7 03:01:14 2020 +0800
#
# 交互式变基操作正在进行中；至 a296be5
# 最后的命令已完成（3 条命令被执行）：
#    s 8163082 介绍 OpenPGP 并且添加基础使用规范
#    f 6665b96 修复 url 参数错误
# 接下来要执行的命令（剩余 1 条命令）：
#    pick f9adae8 增加注释
# 您在执行将分支 'feature/my' 变基到 'a296be5' 的操作。
#
# 要提交的变更：
#       修改：     feature.txt
```

这样在提交之后则会看到合并的信息

```
增加注释
多厘 提交于 1 分钟前

介绍 OpenPGP 并且添加基础使用规范 
修复 url 参数错误
多厘 提交于 1 分钟前
```

(不推荐:会丢失掉已经填写的 commit 信息)[Pony Foo](http://ponyfoo.com/articles/git-github-hacks)提出另外一种合并commit的简便方法，就是先撤销过去5个commit，然后再建一个新的。

```
$ git reset HEAD~5
$ git add .
$ git commit -am "Here's the bug fix that closes #28"
$ git push --force
```

squash 和 fixup 命令，还可以当作命令行参数使用，自动合并commit。

```
$ git commit --fixup  
$ git rebase -i --autosquash
```

这个用法请参考[这篇文章](http://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html)，这里就不解释了。


## 第六步：推送到远程仓库

合并commit后，就可以推送当前分支到远程仓库了。

```
$ git push --force origin feature/my
```

`git push` 命令要加上 `--force` 参数，因为 `rebase` 以后，分支历史改变了，跟远程分支不一定兼容，有可能要强行推送（参见[这里](http://willi.am/blog/2014/08/12/the-dark-side-of-the-force-push/)）。


## 第七步：发出Pull Request

提交到远程仓库以后，就可以发出 Pull Request 到 develop 分支，然后请求别人进行代码 review，确认可以合并到 develop。

[End]

