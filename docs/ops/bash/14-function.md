# 函数

bash 函数定义语法如下：

```shell
[ function ] funname [()] {
    action;
    [return int;]
}
```

1. 函数定义时，`function` 关键字可有可无。
2. 函数返回值 - return 返回函数返回值，返回值类型只能为整数（0-255）。如果不加 return 语句，shell 默认将以最后一条命令的运行结果，作为函数返回值。
3. 函数返回值在调用该函数后通过 `$?` 来获得。
4. 所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。

<<< @/ops/bash/src/14-function/operation.sh

## 位置参数

**位置参数**是在调用一个函数并传给它参数时创建的变量。

位置参数变量表：

| 变量             | 描述                |
|----------------|-------------------|
| `$0`           | 脚本名称              |
| `$1 … $9`      | 第 1 个到第 9 个参数列表   |
| `${10} … ${N}` | 第 10 个到 N 个参数列表   |
| `$*` or `$@`   | 除了`$0`外的所有位置参数    |
| `$#`           | 不包括`$0`在内的位置参数的个数 |
| `$FUNCNAME`    | 函数名称（仅在函数内部有值）    |

<<< @/ops/bash/src/14-function/run.sh

执行 `./run.sh hello world` ，然后在脚本中通过 `$1` 、 `$2` ... 读取第

1 个参数、第 2 个参数。。。

## 函数处理参数

另外，还有几个特殊字符用来处理参数：

| 参数处理 | 说明     |
|------|--------|
| `$#` | 返回参数个数 |
| `$*` | 返回所有参数 |

- [awesome-shell](https://github.com/alebcay/awesome-shell) ，shell 资源列表
- [awesome-bash](https://github.com/awesome-lists/awesome-bash) ，bash 资源列表
- [bash-handbook](https://github.com/denysdovhan/bash-handbook)
- [bash-guide](https://github.com/vuuihc/bash-guide) ，bash 基本用法指南
- [bash-it](https://github.com/Bash-it/bash-it) ，为你日常使用，开发以及维护 shell 脚本和自定义命令提供了一个可靠的框架
- [dotfiles.github.io](http://dotfiles.github.io/) ，上面有 bash 和其它 shell 的各种 dotfiles 集合以及 shell 框架的链接
- [Runoob Shell 教程](http://www.runoob.com/linux/linux-shell.html)
- [shellcheck](https://github.com/koalaman/shellcheck) 一个静态 shell 脚本分析工具，本质上是 bash／sh／zsh 的 lint。

最后，Stack Overflow 上 [bash 标签下](https://stackoverflow.com/questions/tagged/bash) 有很多你可以学习的问题，当你遇到问题时，也是一个提问的好地方。

## 运行结果

<<< @/ops/bash/src/14-function/result.sh


