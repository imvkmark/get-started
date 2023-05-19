---
title: "chown(1) - 变更文件或目录的所属用户或群组"
date: 2022-04-20 14:22:52
toc: true
categories:
- ["Man","commands(1)"]
---

`chown` 改变某个文件或目录的所有者和所属的组，该命令可以向某个用户授权，使该用户变成指定文件的所有者或者改变文件所属的组。用户可以是用户或者是用户 id，用户组可以是组名或组id. 文件名可以使由空格分开的文件列表，也可以在文件名中可以包含通配符。<br />只有文件所属用户和 root 用户才可以使用该命令

```
chown [OPTION]... [OWNER][:[GROUP]] FILE...
chown [OPTION]... --reference=RFILE FILE...
```
本手册页记录了 `chown` 的GNU版本。`chown` 更改每个给定文件的用户和/或组所有权。如果只给出了所有者(用户名或数字用户ID)，则该用户将成为每个给定文件的所有者，而文件的组不会更改。如果所有者后面跟着冒号和组名(或数字组ID)，且两者之间没有空格，则文件的组所有权也会更改。如果用户名后面有冒号但没有组名，则该用户将成为文件的所有者，文件的组将更改为该用户的登录组。如果给出了冒号和组，但省略了所有者，则只更改文件的组; 在本例中，`chown` 执行与 `chgrp` 相同的功能。如果只给出了冒号，或者整个操作数为空，则既不更改所有者也不更改组。


## 选项
更改文件的所有者或组未 `OWNER` 或 `GROUP`, 使用 `--reference`，将目标文件的的组/所有者关系更改为引用文件的组/所有者<br />`-c, --changes`<br />效果类似于 `-v`, 仅仅当修改发生时候才汇报

`-f, --silent, --quiet`<br />不显示错误信息

`-v, --verbose`<br />为处理的每个文件输出完整信息

`--dereference`<br />影响每个符号链接的引用文件(这是默认值)，而不是影响符号链接本身

`-h, --no-dereference`<br />影响符号链接而不是任何引用文件(只在可以更改符号链接所有权的系统上有用)

`--from=CURRENT_OWNER:CURRENT_GROUP`<br />只有当每个文件的当前所有者和/或组与此处指定的匹配时，才更改其所有者和/或组。两者都可以省略，在这种情况下，省略的属性不需要匹配

`--no-preserve-root`<br />不对根目录 `/` 进行特殊处理(默认)

`--preserve-root`<br />当执行目录为根目录时候, 则会失败

`--reference=RFILE`<br />使用 `RFILE` 的所有者和组, 而不是指定的 `OWNER:GROUP` 的值

`-R, --recursive`<br />递归执行文件和目录

当还指定了`-R`选项时，以下选项将修改如何遍历层次结构。如果指定了多个，则只指定最后一个生效。

`-H` : 如果命令行参数是指向目录的符号链接，则遍历它<br />`-L` : 遍历遇到的目录的每一个符号链接<br />`-P` : 不遍历任何符号链接(默认)

`--help`<br />输出帮助信息并退出

`--version`<br />输出版本信息并退出

如果不设置 OWNER, 则不改变用户, 如果不设置 GROUP 则不改变组
> 求助 : 以下内容的翻译 , 原文地址 : [chown(1) - Linux manual page](https://man7.org/linux/man-pages/man1/chown.1.html)
> but changed to login group if implied by a ':' following a symbolic OWNER.  OWNER and GROUP may be numeric as well as  symbolic.


## 实例
将目录`/usr/meng`及其下面的所有文件、子目录的文件主改成 `liu`
```
chown -R liu /usr/meng
```

