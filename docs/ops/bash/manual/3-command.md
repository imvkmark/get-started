---
description: '一个简单的shell命令，例如， echo a b c由命令本身后跟参数（由空格分隔）组成。更复杂的 Shell 命令由以各种方式排列在一起的简单命令组成：在管道中(一个命令的输出成为第二个命令的输入)，在循环或条件构造中，或在其他一些分组中。保留字是对shell有特殊意义的单词。它们用于开始和结束shell的复合命令。以下单词在未加引号且作为命令的第一个单词时被视为保留字（有例外情况，参见下文）：如果in是case或select命令的第三个单词，则它被识别为保留字。如果in和do是for命令的第三个单词，则它们被识别为保留字。简单命令是(可选的)一系列变量赋值, 紧接'
lastUpdated: '2023-12-05 14:14:00'
head: 
  - - meta
    - name: 'og:title'
      content: '3 Shell 命令'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '一个简单的shell命令，例如， echo a b c由命令本身后跟参数（由空格分隔）组成。更复杂的 Shell 命令由以各种方式排列在一起的简单命令组成：在管道中(一个命令的输出成为第二个命令的输入)，在循环或条件构造中，或在其他一些分组中。保留字是对shell有特殊意义的单词。它们用于开始和结束shell的复合命令。以下单词在未加引号且作为命令的第一个单词时被视为保留字（有例外情况，参见下文）：如果in是case或select命令的第三个单词，则它被识别为保留字。如果in和do是for命令的第三个单词，则它们被识别为保留字。简单命令是(可选的)一系列变量赋值, 紧接'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/bash/manual/3-command.html'
---
# 3 Shell 命令





一个简单的shell命令，例如，  `echo a b c` 由命令本身后跟参数（由空格分隔）组成。更复杂的 Shell 命令由以各种方式排列在一起的简单命令组成：在管道中(一个命令的输出成为第二个命令的输入)，在循环或条件构造中，或在其他一些分组中。

## 保留词

保留字是对shell有特殊意义的单词。它们用于开始和结束shell的复合命令。

以下单词在未加引号且作为命令的第一个单词时被视为保留字（有例外情况，参见下文）：

<table><tbody>
  <tr>
    <td> <code>if</code> </td>
    <td> <code>then</code> </td>
    <td> <code>elif</code> </td>
    <td> <code>else</code> </td>
    <td> <code>fi</code> </td>
    <td> <code>time</code> </td>
  </tr>
  <tr>
    <td> <code>for</code> </td>
    <td> <code>in</code> </td>
    <td> <code>until</code> </td>
    <td> <code>while</code> </td>
    <td> <code>do</code> </td>
    <td> <code>done</code> </td>
  </tr>
  <tr>
    <td> <code>case</code> </td>
    <td> <code>esac</code> </td>
    <td> <code>coproc</code> </td>
    <td> <code>select</code> </td>
    <td> <code>function</code> </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td> <code>{</code> </td>
    <td> <code>}</code> </td>
    <td> <code>[[</code> </td>
    <td> <code>]]</code> </td>
    <td> <code>!</code> </td>
    <td>&nbsp;</td>
  </tr>
</tbody></table>

如果 `in` 是 `case` 或 `select` 命令的第三个单词，则它被识别为保留字。如果 `in` 和 `do` 是 `for` 命令的第三个单词，则它们被识别为保留字。

## 简单命令

简单命令是(可选的)一系列变量赋值, 紧接着是空白字符分隔的词和重定向符号, 最后以一个控制操作符结束. 第一个词指明了要执行的命令, 它被作为第 0 个参数. 其余词被作为这个命令的参数.这个定义可以这样来理解：1、 可以有变量赋值，例如

```
#!/usr/bin/env bash

a=10 b=10 export a b
```

2、 “词”是以空白字符分隔开的，空白字符包括制表符（tab）和空格，例如：

```
ls /tmp
```

就是两个词，一个  `ls`  ，一个  `/tmp` 3、可以出现重定向符号，重定向符号是  `>`  和  `<`  ，例如：

```
echo “hello world”> /tmp/log
```

4、 简单命令结束于控制操作符，控制操作符包括：

```
||
&
&&
;
;;
( )
|
<newline>
```

例如，用户输入：

```
ls /tmp
```

用户最后敲的回车键就是控制操作符  `newline`  ，表示要结束这个简单命令。如果用户输入：

```
echo "100" ; echo "200"
```

那么这是两个简单命令，第一个结束于“;”，第二个结束于newline。5、 简单命令的第一个词是要执行的命令，其余的词都是这个命令的参数，例如：

```
echo “hello world” echo
```

第一个  `echo`  是命令，第二个词 “hello world” 是参数1，第三个词 echo 是参数2，而不再作为一个命令了。简单命令是 shell 语法中最小的命令，通过简单命令的组合，又可以得到管道命令和列表命令。

## 管道

管道是一个或多个简单命令的序列，两个简单命令之间通过管道符号  `|`  来分隔例如

```
echo "hello world" | wc –l
```

就是一个管道，它由两个简单命令组成，两个简单命令之间用管道符号分隔开。我们可以看到，管道符号  `|`  也是属于上面提到的控制操作符。根据这个定义，一个简单命令也同时是一个管道。管道的作用是把它前面的那个简单命令的输出作为后面那个简单命令的输入，就上面这个例子来说： `echo "helloworld"`  本来是要在标准输出（屏幕）上打印 “helloworld” 的，但是管道现在不让结果输出到屏幕上，而是“流” 到  `wc –l`  这个简单命令， `wc –l`  就把“流”过来的数据作为它的标准输入进行计算，从而统计出结果是 1 行。关于管道更详细的内容，我们在后面具体实现管道的时候再说明。

## 列表

列表是一个或多个管道组成的序列，两个管道之间用操作符  `;`  ,  `&`  ,  `&&`  , 或  `||`  分隔。我们看到，这几个操作符都属于控制操作符。例如

```
echo "hello world" | wc –l ; echo “nice to meet you”
```

就是一个列表，它由两个管道组成，管道之间用分号（;）隔开分号这种控制操作符仅仅表示一种执行上的先后顺序。

## 组合命令

复合命令是 shell 程序语言结构。每个结构以保留字或控制运算符开头，并以相应的保留字或运算符结束。与复合命令相关联的任何重定向（请参见 [重定向](https://www.gnu.org/software/bash/manual/html_node/Redirections.html)）都适用于该复合命令中的所有命令，除非明确覆盖。

在大多数情况下，复合命令描述中的命令列表可以与命令的其余部分分开，中间可以有一个或多个换行符，并且可以在分号的位置后跟一个换行符。

Bash 提供了循环结构、条件命令和机制来对命令进行分组并将它们作为一个单元执行。

### 循环结构

### 条件结构

### 命令分组

Bash 提供了两种将命令列表分组为单元执行的方法。当命令被分组时，重定向可以应用于整个命令列表。例如，所有列表中的命令的输出可以重定向到单个流。

**`()`**

```shell
( list )
```

将命令列表放在括号中会强制 shell 创建一个子 shell（参见 [命令执行环境](https://www.gnu.org/software/bash/manual/html_node/Command-Execution-Environment.html)），并且  _list_  中的每个命令都在该子 shell 环境中执行。由于  _list_  在子 shell 中执行，因此变量赋值在子 shell 完成后不会保持有效。

**`{}`**

```shell
{ list; }
```

将命令列表放在花括号之间会导致列表在当前 shell 上下文中执行。不会创建子 shell。需要分号（或换行符）来结束  _list_ 。

除了创建子 shell 之外，由于历史原因，这两个结构之间存在微妙的差别。花括号是保留字，因此必须使用空格或其他 shell 元字符将其与  _list_  分开。括号是运算符，即使它们与  _list_  没有用空格分开，shell 也会将它们识别为单独的标记

这两种结构的退出状态是  _list_  的退出状态

## Coprocesses 协同处理

## GNU Parallel 并行处理 



