---
title: "Git 使用 subtree 管理多个项目代码"
date: 2021-05-20 16:02:30
toc: true
categories:
- ["开发","Git"]
---

![](https://file.wulicode.com/yuque/202208/04/15/3448OMZadLMj.jpeg?x-oss-process=image/resize,h_278)

对于多项目来说, 使用一个项目来管理多个包是最为方便的, 但是每个包单独弄一个 git 地址去做代码的提交是非常累人的

在一个项目中管理所有包, 为每个不同的文件夹设定不同的地址并共享主项目的提交记录, 然后进行包的提交无疑是最方便的.

例如上面 poppy project 为一个项目, 其他几个为不同的包, 每个包有唯一的 git 仓库地址

一开始使用子树的方式去进行提交


```
$ git subtree push --prefix=poppy/system system 3.0
```

但是如果在多个不同的机器上去做提交经常会出现

_以下仅仅是例子, 和上边仓库以及文件夹不匹配_

```
git push using:  demo temp/from-main
fatal: ambiguous argument 'cb0580bb6ee76fa96f5bc3c7095303f9a33f5834^0': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
could not rev-parse split hash cb0580bb6ee76fa96f5bc3c7095303f9a33f5834 from commit 691c5a1531ff38d02cb62fa34c99231dbde050b3
To gitlab.gz.cvte.cn:iip-win/cvte-paint.git
 ! [rejected]              1d3913a2e0ec6e4c507dbe2baabae18ef4b8fab9 -> temp/from-main (non-fast-forward)
error: failed to push some refs to 'git@gitlab.gz.cvte.cn:iip-win/cvte-paint.git'
hint: Updates were rejected because a pushed branch tip is behind its remote
hint: counterpart. Check out this branch and integrate the remote changes
hint: (e.g. 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

所以使用 split 命令找到唯一的提交号, 进行提交

```
$ git subtree split --prefix=poppy/system feature/3.0
```

推送的时候使用 `--force` 来推送

```
$ git push system `git subtree split --prefix=poppy/system feature/3.0`:3.0 --force
```

但是如果远程没有分支, 默认是无法推送的, 会报

会报

> error: unable to push to unqualified destination: 3.0<br />The destination refspec neither matches an existing ref on the remote nor<br />begins with refs/, and we are unable to guess a prefix based on the source ref.<br />error: failed to push some refs to '[https://github.com/imvkmark/poppy-system.git](https://github.com/imvkmark/poppy-system.git)'<br />Script git push system-github `git subtree split --prefix=poppy/system feature/3.0`:3.0 --force handling the py-system event returned with error code 1


解决方法

```
$ git push system-github 5187723bd023a009363fdba2b224ca0fefd0ed7b:refs/heads/3.0 --force
```


## 参考文章

- [Why can't I push this up-to-date Git subtree?](https://stackoverflow.com/questions/13756055/why-cant-i-push-this-up-to-date-git-subtree)
- [git subtree 不断增加的推送时间，解不玩的冲突！这篇文章应该能救你](https://blog.walterlv.com/post/performance-of-git-subtree.html)

