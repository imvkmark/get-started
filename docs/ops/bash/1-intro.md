# 简介

## 什么是 shell

- Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。
- Shell 既是一种命令语言，又是一种程序设计语言。
- Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问 Linux 内核的服务。

Ken Thompson 的 sh 是第一种 Unix Shell，Windows Explorer 是一个典型的图形界面 Shell。

## 什么是 shell 脚本

Shell 脚本（shell script），是一种为 shell 编写的脚本程序，一般文件后缀为 `.sh` 。

业界所说的 shell 通常都是指 shell 脚本，但 shell 和 shell script 是两个不同的概念。

## Shell 环境

Shell 编程跟 java、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

Shell 的解释器种类众多，常见的有：

- [sh](https://www.gnu.org/software/bash/) - 即 Bourne Shell。sh 是 Unix 标准默认的 shell。
- [bash](https://www.gnu.org/software/bash/) - 即 Bourne Again Shell。bash 是 Linux 标准默认的 shell。
- [fish](https://fishshell.com/) - 智能和用户友好的命令行 shell。
- [xiki](http://xiki.org/) - 使 shell 控制台更友好，更强大。
- [zsh](http://www.zsh.org/) - 功能强大的 shell 与脚本语言。

### 指定脚本解释器

在 shell 脚本， `#!` 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 解释器。 `#!`
被称作 [shebang（也称为 Hashbang）](https://zh.wikipedia.org/wiki/Shebang)
。所以，你应该会在 shell 中，见到诸如以下的注释：

- 指定 sh 解释器

```shell
#!/bin/sh
```

- 指定 bash 解释器

```latex
#!/bin/bash
```

上面的指定解释器的方式是比较常见的，但有时候，你可能也会看到下面的方式：

```latex
#!/usr/bin/env bash
```

这样做的好处是，系统会自动在 `PATH` 环境变量中查找你指定的程序（本例中的 `bash`
）。相比第一种写法，你应该尽量用这种写法，因为程序的路径是不确定的。这样写还有一个好处，操作系统的`PATH`
变量有可能被配置为指向程序的另一个版本。比如，安装完新版本的`bash` ，我们可能将其路径添加到 `PATH` 中，来"隐藏"
老版本。如果直接用`#!/bin/bash`
，那么系统会选择老版本的 `bash` 来执行脚本，如果用`#!/usr/bin/env bash` ，则会使用新版本。

## 模式

shell 有交互和非交互两种模式。

### 交互模式

简单来说，你可以将 shell 的交互模式理解为执行命令行。

看到形如下面的东西，说明 shell 处于交互模式下：

```latex
user@host:~$
```

接着，便可以输入一系列 Linux 命令，比如 `ls` ， `grep` ， `cd` ，`mkdir` ， `rm` 等等。

### 非交互模式

简单来说，你可以将 shell 的非交互模式理解为执行 shell 脚本。

在非交互模式下，shell 从文件或者管道中读取命令并执行。

当 shell 解释器执行完文件中的最后一个命令，shell 进程终止，并回到父进程。

可以使用下面的命令让 shell 以非交互模式运行：

```latex
sh /path/to/script.sh
bash /path/to/script.sh
source /path/to/script.sh
./path/to/script.sh
```

上面的例子中， `script.sh` 是一个包含 shell 解释器可以识别并执行的命令的普通文本文件， `sh` 和 `bash` 是 shell
解释器程序。你可以使用任何喜欢的编辑器创建 `script.sh`（vim，nano，Sublime Text, Atom 等等）。

其中， `source /path/to/script.sh` 和 `./path/to/script.sh` 是等价的。

除此之外，你还可以通过 `chmod`命令给文件添加可执行的权限，来直接执行脚本文件：

```shell
chmod +x /path/to/script.sh #使脚本具有执行权限
/path/to/test.sh
```

这种方式要求脚本文件的第一行必须指明运行该脚本的程序，比如：

<<< @/ops/bash/src/1-intro/hello-world.sh

上面的例子中，我们使用了一个很有用的命令 `echo` 来输出字符串到屏幕上。

## 管道

管道是一个或多个简单命令的序列，两个简单命令之间通过管道符号 `|` 来分隔

例如

```shell
echo "hello world" | wc –l
```

就是一个管道，它由两个简单命令组成，两个简单命令之间用管道符号分隔开。

我们可以看到，管道符号 `|` 也是属于上面提到的控制操作符。

根据这个定义，一个简单命令也同时是一个管道。

管道的作用是把它前面的那个简单命令的输出作为后面那个简单命令的输入，就上面这个例子来说：

`echo "helloworld"` 本来是要在标准输出（屏幕）上打印 "helloworld"  的，但是管道现在不让结果输出到屏幕上，而是"流" 到 `wc –l`
这个简单命令，`wc –l` 就把"流"
过来的数据作为它的标准输入进行计算，从而统计出结果是 1 行。

关于管道更详细的内容，我们在后面具体实现管道的时候再说明。

在输出的时候可以输出多种颜色的数据, 详情文档查看

## 列表

列表是一个或多个管道组成的序列，两个管道之间用操作符 `;` , `&` , `&&` , 或 `||` 分隔。我们看到，这几个操作符都属于控制操作符。

例如

```shell
echo "hello world" | wc –l ; echo “nice to meet you”
```

就是一个列表，它由两个管道组成，管道之间用分号（;）隔开分号这种控制操作符仅仅表示一种执行上的先后顺序。

## 其他

复合命令, 协同处理, 并行处理

## 扩展阅读

- [「转+」shell 脚本中 echo 显示内容带颜色](./tech/echo-color.md)