---
title: "Git : AutoCRLF与SafeCRLF换行符问题"
date: 2021-05-20 16:01:49
toc: true
categories:
- ["开发","Git"]
---

> Windows在换行的时候，同时使用了回车符(carriage-return character)和换行符(linefeed character)；而Mac和Linux系统(很老的mac系统才是CR，可以参见wiki)，此时，仅仅使用了换行符(linefeed character)。同时呢，Windows的许多编辑器还悄悄滴将LF修改成了CRLF格式的行结束符，或者在你敲回车的时候，CRLF格式的行结束符就产生了。


> Git有一个针对性的功能：当添加到暂存区时，自动将CRLF转换成LF；反之，当检出时，自动将LF转换成CRLF。<br />
可以通过设置core.autocrlf来开启这个功能。




## 一、AutoCRLF

**true**<br />
如果是在 Windows 系统上，把它设置成 true，这样在检出代码时，换行(LF)会被转换成回车和换行(CRLF)

```
$ git config --global core.autocrlf true
```

**input**<br />
如果使用以换行作为行结束符的 Linux 或 Mac，你不需要 Git 在检出文件时进行自动的转换；然而当一个以回车加换行作为行结束符的文件不小心被引入时，你肯定想让 Git 修正。 你可以把 core.autocrlf 设置成 input 来告诉 Git 在提交时把回车和换行转(CRLF)换成换行(LF)，检出时不转换

```
$ git config --global core.autocrlf input
```

**false**<br />
如果你是 Windows 程序员，且正在开发仅运行在 Windows 上的项目，可以设置 false 取消此功能，把回车(CR)保留在版本库中

```
$ git config --global core.autocrlf false
```


## 二、SafeCRLF

当`core.autocrlf`为`true`或者`input`时，算激活了`eol`，此时如果`core.safecrlf`为`true`，Git检查`crlf`转换是否正常，比如**Windows** 平台，`core.autocrlf`设置为`true`，如果工作区的文件中含有`LF`，Git就会拒绝，因为`true`的情况下，Git认为工作区应该都是`CRLF`才对。

```
# 拒绝提交包含混合换行符的文件 
$ git config --global core.safecrlf true  

# 允许提交包含混合换行符的文件 
$ git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告 
$ git config --global core.safecrlf warn
```


## 参考

- [通过阅读git-config文档理解Git如何使用autocrlf、safecrlf、eol和.gitattributes处理line-ending](https://www.jianshu.com/p/2a46dfd3705a)

