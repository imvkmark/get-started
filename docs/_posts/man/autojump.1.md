---
title: "autojump(1) - 文件系统快速导航工具"
date: 2022-04-20 14:22:49
toc: true
categories:
- ["Man","commands(1)"]
---

autojump - 文件系统快速导航工具


### 描述
`autojump` 是文件系统导航一种更快的方法。它通过你命令行访问的最多的目录来维护数据库。必须先访问过这些目录，然后才能跳转到这些目录。

### 使用方式
`j` 是 `autojump` 的一个替代函数。选项和 `autojump` 通用

- 跳转到包含 `foo` 的目录:
```
j foo
```

- 跳转到子目录<br />跳转到当前目录的子目录.
```
jc bar
```

- 打开文件管理器
```
jo music
```

- 在文件管理器中打开子目录
```
jco images
```

- 使用多参数

让我们安排下数据库的排序
```
30   /home/user/mail/inbox
10   /home/user/work/inbox
```
`j in` 将跳转到权重较高的 `/home/user/mail/inbox` 。不过，可以将多个参数传递给 `autojump` 以选择不同的条目。在上面的例子中，`j w in` 将把目录更改为 `/home/user/work/inbox`。<br />更多选项查看帮助文件:
```
autojump --help
```

