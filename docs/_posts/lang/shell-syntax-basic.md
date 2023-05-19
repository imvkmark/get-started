---
title: "基本语法"
date: 2022-08-24 22:08:13
toc: true
categories:
- ["Lang","Shell","Shell 入门","语法"]
---

## 解释器
前面虽然两次提到了 `#!` ，但是本着重要的事情说三遍的精神，这里再强调一遍：<br />在 shell 脚本， `#!` 告诉系统其后路径所指定的程序即是解释此脚本文件的  Shell 解释器。 `#!` 被称作 [shebang（也称为 Hashbang）](https://zh.wikipedia.org/wiki/Shebang) 。<br />`#!` 决定了脚本可以像一个独立的可执行文件一样执行，而不用在终端之前输入<br />`sh` , `bash` , `python` , `php` 等。

```shell
# 以下两种方式都可以指定 shell 解释器为 bash，第二种方式更好
#!/bin/bash
#!/usr/bin/env bash
```

## 注释
注释可以说明你的代码是什么作用，以及为什么这样写。<br />shell 语法中，注释是特殊的语句，会被 shell 解释器忽略。

- 单行注释 - 以 `#` 开头，到行尾结束。
- 多行注释 - 以 `:<<EOF` 开头，到 `EOF` 结束。
```shell
#!/usr/bin/env bash

# shell 注释示例

# echo '这是单行注释'

# 这是分割线 ..... .. .

: << EOF
echo '这是多行注释'
echo '这是多行注释'
echo '这是多行注释'
EOF

# Output: null
```

## echo
用于字符串的输出。
```shell
#!/usr/bin/env bash

# 输出普通字符串
#--------------------------------------------
echo "hello, world"

# 输出含变量的字符串
#--------------------------------------------
name="duoli"
echo "hello, \"${name}\""
# Output: hello, "duoli"

# 输出含换行符的字符串
#--------------------------------------------
echo -e "YES\nNO" # -e 开启转义
#  Output:
#  YES
#  NO

echo "YES"
echo "NO"
#  Output:
#  YES
#  NO

echo -e "YES\c" # -e 开启转义 \c 不换行
echo "NO"
#  Output:
#  YESNO
```
输出到重定向文件
```shell
#!/usr/bin/env bash

# 输出重定向到文件
# 输出到 ./output.txt 文件中
#--------------------------------------------
work_path=$(cd "$(dirname "$0")" && pwd)
echo "test" >"${work_path}/_output.tmp"
```

## printf
printf 用于格式化输出字符串。<br />默认，printf 不会像 echo 一样自动添加换行符，如果需要换行可以手动添加 `\n` 。
```shell
#!/usr/bin/env bash

# 单引号
#--------------------------------------------
printf '%d %s\n' 1 "abc"
#  Output:1 abc

# 双引号
#--------------------------------------------
printf "%d %s\n" 1 "abc"
#  Output:1 abc

# 无引号
#--------------------------------------------
printf %s abcdef
printf '\n'
#  Output: abcdef(并不会换行)

# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出
# 但是不建议传递多个参数, 这样会让大家认为你没有控制力
#--------------------------------------------
printf "%s\n" abc def
#  Output:
#  abc
#  def

printf "%s %s %s\n" a b c d e f g h i j
#  Output:
#  a b c
#  d e f
#  g h i
#  j

# 如果没有参数，那么 %s 用 NULL 代替，%d 用 0 代替
printf "%s and %d \n"
#  Output:
#   and 0

# 格式化输出
#--------------------------------------------
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg
printf "%-10s %-8s %-4.2f\n" 巧笑 女 47.5210
printf "%-10s %-8s %-4.2f\n" 乾槑 男 66.5432
#  Output:
# 姓名     性别   体重kg
# 巧笑     女      47.52
# 乾槑     男      66.54
```

### printf 的转义符
| 序列 | 说明 |
| --- | --- |
| `\\a` | 警告字符，通常为 ASCII 的 BEL 字符 |
| `\\b` | 后退 |
| `\\c` | 抑制（不显示）输出结果中任何结尾的换行字符 |
| `\\f` | 换页（formfeed） |
| `\\n` | 换行 |
| `\\r` | 回车（Carriage return） |
| `\\t` | 水平制表符 |
| `\\v` | 垂直制表符 |
| `\\\\` | 一个字面上的反斜杠字符 |
| `\\ddd` | 表示 1 到 3 位数八进制值的字符。仅在格式字符串中有效 |
| `\\0ddd` | 表示 1 到 3 位的八进制值字符 |


`\c` : （只在%b 格式指示符控制下的参数字符串中有效），而且，任何留在参数里的字符、任何接下来的参数以及任何留在格式字符串中的字符，都被忽略

