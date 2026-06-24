---
description: 'autojump是一个文件系统快速导航工具，可用于Intel M''s Chip，支持多种选项和用法，帮助用户在文件系统中快速跳转。'
lastUpdated: '2026-06-22 03:30:01'
head:
  - - meta
    - name: 'og:title'
      content: 'autojump(1) 文件系统快速导航工具'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'autojump是一个文件系统快速导航工具，可用于Intel M''s Chip，支持多种选项和用法，帮助用户在文件系统中快速跳转。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/man/command/autojump-1.html'
---
# autojump(1) 文件系统快速导航工具

- [wting/autojump](https://github.com/wting/autojump) - 快速跳转目录

`autojump` 是文件系统导航一种更快的方法。它通过你命令行访问的最多的目录来维护数据库。必须先访问过这些目录，然后才能跳转到这些目录

## 安装

**mac 安装**

```Plaintext
$ brew install autojump
```

安装完毕需要手动加入如下行到 `~/.bash_profile` 或者 `~/.zshrc` 文件

```Plaintext
# intel
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

# M's Chip
[ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh
```

如果使用 `zsh` , 可以使用插件的方式来激活 autojump, 详细查看 [Mac-zsh 安装和使用](/ops/mac/omz.md)

vim `~/.zshrc` , 找到 plugins , 按如下格式添加 autojump

```Plain Text
plugins=(git autojump osx)
```

**rocky linux**

```Plaintext
$ dnf install autojump
```

**centos**

```Plaintext
sudo yum install epel-release;
sudo yum install autojump;
```

## 选项

`j -a DIRECTORY` 

添加目录，即不用进入目录，即可将目录添加进 autojump 记录

```Plaintext
[hzz@magedu html]$ j et
.
[hzz@magedu html]$ j -a /etc/
[hzz@magedu html]$ j et
/etc
[hzz@magedu etc]$ pwd
/etc
```

`j -s` 

查看各目录权重，并查看数据信息

`j -i [WEIGHT]` 

添加权重，权重越高，该目录的优先级就越高。

`j -d [WEIGHT]` 

减少权重，权重越低，该目录的优先级越低。

`j --complete` 

查看关键字的候选项，常用双击  `tab`  代替。

`j --purge` 

清理 autojump 记录里面那些已不存在的目录数据

`autojump --help`

查看帮助文件

```Plaintext
$ j --help
usage: autojump [-h] [-a DIRECTORY] [-i [WEIGHT]] [-d [WEIGHT]] [--complete]
                [--purge] [-s] [-v]
                [DIRECTORY [DIRECTORY ...]]

Automatically jump to directory passed as an argument.

positional arguments:
  DIRECTORY             directory to jump to

optional arguments:
  -h, --help            show this help message and exit
  -a DIRECTORY, --add DIRECTORY
                        add path
  -i [WEIGHT], --increase [WEIGHT]
                        increase current directory weight
  -d [WEIGHT], --decrease [WEIGHT]
                        decrease current directory weight
  --complete            used for tab completion
  --purge               remove non-existent paths from database
  -s, --stat            show database entries and their key weights
  -v, --version         show version information

Please see autojump(1) man pages for full documentation.
```

## 使用

`j` 是 `autojump` 的一个替代函数。选项和 `autojump` 通用

- 跳转到包含 `foo` 的目录:

```Plaintext
j foo
```

- 跳转到子目录, 跳转到当前目录的子目录

```Plaintext
jc bar
```

- 打开文件管理器

```Plaintext
jo music
```

- 在文件管理器中打开子目录

```Plaintext
jco images
```

- 使用多参数

让我们安排下数据库的排序

```Plaintext
30   /home/user/mail/inbox
10   /home/user/work/inbox
```

`j in` 将跳转到权重较高的 `/home/user/mail/inbox` 。不过，可以将多个参数传递给 `autojump` 以选择不同的条目。在上面的例子中，`j w in` 将把目录更改为 `/home/user/work/inbox`