---
title: "[转]getopts 解析bash 命令行参数"
date: 2021-07-29 23:54:18
toc: true
categories:
- ["Ops","Linux"]
---

原文地址 : [getopts 解析bash 命令行参数](http://events.jianshu.io/p/7ebe1dbdc316)<br />Shell脚本中的一项常见任务是解析命令行参数。 Bash提供了内置函数getopts来完成此任务。本教程说明了如何使用内置的getopts函数来解析bash脚本的参数和选项。


## getopts 语法
```sql
getopts optstring name [args]
```
总共有三个参数：

- optstring<br />需要识别选项列表。说明哪些选项有效，以字母顺序列出。例如，字符串 `ht` 表示选项 `-h` 和 `-t` 有效。<br />如果字符后面跟一个 `:` , 表示该选项期望有一个参数，与选项以空白字符分割。<br />`?` 和 `:` 不能作为选项字符使用

- name<br />是一个变量，用来填充要处理的选项。

- args<br />是要处理的参数和选项的列表。如果未提供，则默认为提供给应用程序($@)的参数和选项。您可以提供第三个参数，以使用getopts解析您提供的参数和选项的任何列表。


## 运行
每次调用的时候，getopts都会将选项【h，t等】放置在变量name中，如果不存在则将其初始化。并且将选项的索引，放置在变量OPTIND中，每次调用脚本时， OPTIND 都会初始化为1。当选项options要求参数时，getopts将参数放置在变量OPTARG。OPTIND保留最后一次调用getopts的选项的索引值，shell不会重置OPTIND的值，通常的做法是在处理循环结束时调用shift命令，从$@处删除已处理的选项。
```sql
shift $((OPTIND -1))
```
当处理到最后一个选项时，getopts 会返回一个大于0的值，并退出。OPTIND 会被设置为第一个无选项实参的索引值， name 会被设置为 ？。

getopts 以两种方式处理错误。如果 optsting 的第一个参数是 :, 或者 OPTERR 设置为 0， 静默错误处理，不返回信息。 OPTERR 处理优先级更高。

如果选项【option】无效，则getopts把name设置为 ?，如果错误静默处理：则找到的选项字符将放置在OPTARG中，并且不会打印错误消息；否则则会显示错误消息并 unset OPTARG。

如果要求的实参【argument】未找到， 静默处理是把: 设置为名称，把选项放在 OPTARG中，非静默处理则set name = ？，unset OPTARG， 打印错误。

如果getopts 找到 options， 不管是未定义，还是已定义的，都返回true； 如遇到错误，或到结尾，返回false。【方便循环处理options】


## example
在以下循环中，opt将保存由getopts解析的当前选项的值。
```sql
while getopts ":ht" opt; do
  case ${opt} in
    h ) # process option h
      ;;
    t ) # process option t
      ;;
    \? ) echo "Usage: cmd [-h] [-t]"
      ;;
  esac
done
```
带参选项解析<br />本身具有参数的选项以:表示。选项的参数放置在变量OPTARG中。在下面的示例中，选项t带有一个参数。提供参数后，我们会将其值复制到变量target。如果未提供任何参数，则getopts将opt设置为:我们可以通过捕获:case并打印适当的错误消息来识别此错误情况。

```sql
while getopts ":t:" opt; do
  case ${opt} in
    t )
      target=$OPTARG
      ;;
    \? )
      echo "Invalid option: $OPTARG" 1>&2
      ;;
    : )
      echo "Invalid option: $OPTARG requires an argument" 1>&2
      ;;
  esac
done
shift $((OPTIND -1))
```
<br />解析嵌套的参数和选项<br />我们以pip 为例， 实现一个带有子命令，子选项的shell脚本。
```sql
> pip -h

Usage:
      pip <command> [options]

Commands
      install     Install a Python package.

General Options:
      -h          Show help.
```
<br />首先使用getopts通过以下while循环来解析-h选项。在其中，我们使用?捕获无效的选项,并用移位$((OPTIND -1))移位所有已处理的参数。

```sql
while getopts ":h" opt; do
    case ${opt} in
        h )
            echo "Usage:"
            echo "      pip <command> [options]"
            echo ""
            echo "Commands"
            echo "      install     Install a Python package."
            echo ""
            echo "General Options:"
            echo "      -h          Show help."
            exit 0
        ;;
        \? )
            echo "Invalid Option: -$OPTARG" 1>&2
            exit 1
        ;;
    esac
done
shift $((OPTIND -1))
```
<br />现在为我们的scirpt添加一个子命令install, install 把将要安装的python包作为参数
```sql
> pip install urllib3
```
同时 install还有一个选项t，t值作为软件安装位置
```sql
pip install urllib3 -t ./src/lib
```
我们必须要找到要执行的自命令。这是我们script的第一个实参。

```sql
subcommand=$1
shift # Remove `pip` from the argument list
```
<br />现在我们可以处理子命令安装。在我们的示例中，选项-t实际上是在软件包参数后面的选项，因此我们首先从参数列表中删除install并处理该行的其余部分。

```sql
case "$subcommand" in
  install)
    package=$1
    shift # Remove `install` from the argument list
    ;;
esac
```
<br />在执行shfit后，剩余的参数以 package -t src/lib形式被处理。-t选项带有一个自己的实参。这个参数被存储在 OPTARG中，我们把它保存在 targe中，以待将来使用。

```bash
case "$subcommand" in
  install)
    package=$1
    shift # Remove `install` from the argument list

  while getopts ":t:" opt; do
    case ${opt} in
      t )
        target=$OPTARG
        ;;
      \? )
        echo "Invalid Option: -$OPTARG" 1>&2
        exit 1
        ;;
      : )
        echo "Invalid Option: -$OPTARG requires an argument" 1>&2
        exit 1
        ;;
    esac
  done
  shift $((OPTIND -1))
  ;;
esac
```
<br />把所有的代码放在一起， 我们实现了自己的pip和 install
```bash
package=""  # Default to empty package
target=""  # Default to empty target

while getopts ":h" opt; do
    case ${opt} in
        h )
            echo "Usage:"
            echo "      pip <command> [options]"
            echo ""
            echo "Commands"
            echo "      install     Install a Python package."
            echo ""
            echo "General Options:"
            echo "      -h          Show help."
            echo "      -t          Location where the package to install"
            exit 0
        ;;
        \? )
            echo "Invalid Option: -$OPTARG" 1>&2
            exit 1
        ;;
    esac
done
shift $((OPTIND -1))  # remove options

subcommand=$1; shift  # Remove 'pip' from the argument list

echo "## $@"
echo "## $subcommand"

case "$subcommand" in
# Parse options to the install sub command
    "install")
        package=$1; shift  # Remove 'install' from the argument list

    echo "## $package"
    echo "## $@"
        # Process package options
        while getopts ":t:" opt; do
            case ${opt} in
                "t" )
                    target=$OPTARG
                    echo "install $package at $target"
                ;;
                \? )
                    echo "Invalid Option: -$OPTARG" 1>&2
                    exit 1
                ;;
                : )
                    echo "Invalid Option: -$OPTARG requires an argument" 1>&2
                    exit 1
                ;;
            esac
        done
        shift $((OPTIND -1))
    ;;
esac
```
<br />名词<br />OPTIND 当前处理选项的索引值<br />OPTARG 当前处理选项的实参值<br />OPTERR 当前getopts 的错误设置<br />options 选项<br />parameters 形参 【预定的参数】<br />argument 实参【传入的参数】

## 参考

- [Parsing bash script options with getopts](https://sookocheff.com/post/bash/parsing-bash-script-arguments-with-shopts/)
- bash manpage #search getopts#

