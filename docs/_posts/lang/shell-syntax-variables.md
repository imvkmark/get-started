---
title: "变量"
date: 2022-08-24 22:13:23
toc: true
categories:
- ["Lang","Shell","Shell 入门","语法"]
---

跟许多程序设计语言一样，你可以在 bash 中创建变量。<br />Bash 中没有数据类型，bash 中的变量可以保存一个数字、一个字符、一个字符串等等。同时无需提前声明变量，给变量赋值会直接创建变量。


## 变量命名原则

- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
- 中间不能有空格，可以使用下划线（_）。
- 不能使用标点符号。
- 不能使用 bash 里的关键字（可用 help 命令查看保留关键字）。

## 声明变量
访问变量的语法形式为： `${var}` 和 `$var` 。<br />变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，所以推荐加花括号。
```shell
word="hello"
echo ${word}
# Output: hello
```

## 只读变量
使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。<br />[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/3_variables/readonly.sh)
```shell
#!/usr/bin/env bash

# 只读变量
#--------------------------------------------
rword="hello"
echo ${rword}
# Output: hello

readonly rword
rword="bye" # 执行时会报错
# readonly.sh: line 8: rword: readonly variable
```

## 删除变量
使用 unset 命令可以删除变量。变量被删除后不能再次使用。unset 命令不能删除只读变量。<br />[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/3_variables/delete.sh)
```shell
#!/usr/bin/env bash

# 删除变量
#--------------------------------------------
dword="hello" # 声明变量
echo ${dword} # 输出变量值
# Output: hello

unset dword # 删除变量
echo ${dword}
# Output: （空）
```

## 变量类型

- **局部变量** - 局部变量是仅在某个脚本内部有效的变量。它们不能被其他的程序和脚本访问。
- **环境变量** - 环境变量是对当前 shell<br />会话内所有的程序或脚本都可见的变量。创建它们跟创建局部变量类似，但使用的是`export` 关键字，shell 脚本也可以定义环境变量。

常见的环境变量：

| 变量 | 描述 |
| --- | --- |
| `$HOME` | 当前用户的用户目录 |
| `$PATH` | 用分号分隔的目录列表，shell 会到这些目录中查找命令 |
| `$PWD` | 当前工作目录 |
| `$RANDOM` | 0 到 32767 之间的整数 |
| `$UID` | 数值类型，当前用户的用户 ID |
| `$PS1` | 主要系统输入提示符 |
| `$PS2` | 次要系统输入提示符 |

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/3_variables/env.sh)
```shell
#!/usr/bin/env bash

# 系统命令输出变量
#--------------------------------------------
echo "# 系统命令输出变量 ..... .. ."

# 输出系统命令输出变量
folder=$(pwd)
echo "current path: ${folder}"
# Output : current path: /Users/duoli/.../lang/note

# 系统变量
#--------------------------------------------
echo "# 系统变量 ..... .. ."

echo "UID:$UID"
echo "LOGNAME:$LOGNAME"
echo "User:$USER"
echo "HOME:$HOME"
echo "PATH:$PATH"
echo "HOSTNAME:$HOSTNAME"
echo "SHELL:$SHELL"
echo "LANG:$LANG"
# UID:501
# LOGNAME:duoli
# User:duoli
# HOME:/Users/duoli
# PATH:/Users/duoli/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
# HOSTNAME:Op-Zhaodianyou.local
# SHELL:/bin/zsh
# LANG:
```

[这里](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_02.html#sect_03_02_04) 有一张更全面的 Bash 环境变量列表。

## 直接在文本中使用变量
```shell
#!/usr/bin/env bash

# 直接读取系统命令
#--------------------------------------------
echo "You are running on $(uname)"
# You are running on Darwin
```

## <br />

