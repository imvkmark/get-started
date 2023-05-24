---
title: "控制语句"
date: 2022-08-24 22:21:09
toc: true
categories:
- ["Lang","Shell","Shell 入门","语法"]
---

## 条件语句
跟其它程序设计语言一样，Bash  中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在 `[[ ]]` 里的表达式。

由 `[[ ]]` （ `sh` 中是 `[ ]` ）包起来的表达式被称作 **检测命令** 或 **基元** 。这些表达式帮助我们检测一个条件的结果。这里可以找到有关 [bash 中单双中括号区别](http://serverfault.com/a/52050) 的答案。

共有两个不同的条件表达式： `if` 和 `case` 。




### `if`
`if` 在使用上跟其它语言相同。如果中括号里的表达式为真，那么 `then` 和

`fi` 之间的代码会被执行。 `fi` 标志着条件代码块的结束。

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/if.sh)
```shell
#!/usr/bin/env bash

# if 语句
# ----------------------------------------
# 一行的表达式
# 表达式结果为真，则返回 0，if 把 0 值引向then
if [ 1 -eq 1 ]; then
    echo "1 -eq 1 result is: true"
fi

# Test 方法
# 表达式结果为假，则返回非 0，if把非 0值引向then
if test 1 -eq 1; then
    echo "1 -eq 1 result is: true"
fi

# 换行写法
# 命令执行成功，等于返回 0, 这里实际上是命令的执行xie'fa
if
    1 -eq 1
then
    echo "1 -eq 1 result is: true"
fi
# Output: 1 -eq 1 result is: true

# if 快捷写法
# ----------------------------------------
[ 1 -eq 1 ] && echo '1 = 1'

# 条件是 0 也会输出数据, 因为 shell 返回 0 则认为是 shell 正常执行
# if [ i –ne 0 ] 可以替代为 0 的情况
# ----------------------------------------
i=0
if [ $i ]; then
    echo "即使是 0 , 这里也会输出"
fi

# 字符串, 这里字符串变量 非 0 为 True
var='abc'
if [ "${var}" ]; then
    echo "abc result is: true"
fi
# Output: abc -eq abc result is: true
```

同样，可以使用 `if..else` 语句 或者 `if..elif..else` ，使用起来也很方便。

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/if-el.sh)
```shell
#!/usr/bin/env bash

# if else 语句
# ----------------------------------------
if [[ 2 -ne 1 ]]; then
    echo "true"
else
    echo "false"
fi
# Output: true

# if elif else 语句
# ----------------------------------------
x=10
y=20
if [[ ${x} > ${y} ]]; then
    echo "${x} > ${y}"
elif [[ ${x} < ${y} ]]; then
    echo "${x} < ${y}"
else
    echo "${x} = ${y}"
fi
# Output: 10 < 20
```

拆解 if command

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/if-cmd.sh)
```shell
#!/usr/bin/env bash

# if command 语句
# ----------------------------------------
if
    grep <"$(dirname "$0")"/_tmp.txt 'duoli'
then
    echo 'found duoli'
else
    echo 'not found duoli'
fi
```

`[]` 和 `[[]]` 的区别

`[]` 单中括号

a.  `[]` 两个符号左右都要有空格分隔

b.  内部操作符与操作变量之间要有空格：如 `[ "a" = "b" ]`

c.  字符串比较中，`>` `<` 需要写成`>` `\<` 进行转义

d.  `[]` 中字符串或者 `${}` 变量尽量使用 `"` 双引号扩住，以避免值未定义引用而出错

e.  `[]` 中可以使用 --a --o 进行逻辑运算

f.  `[]` 是bash 内置命令：`[` is a shell builtin

`[[]]` 双中括号

双方括号提供了字符串比较的高级特性, 可以定义一些正则表达式来匹配字符串, 但是并非所有的 shell 都支持双方括号

a.  `[[]]` 两个符号左右都要有空格分隔

b.  内部操作符与操作变量之间要有空格：如 `[[ "a" = "b" ]]`

c.  字符串比较中，可以直接使用 `>` `<` 无需转义

d.  `[[]]` 中字符串或者 `${}` 变量尽量使用 `""` 双引号扩住，如未使用`""` 会进行模式和元字符匹配

e.  `[[]]` 内部可以使用 `&&` `||` 进行逻辑运算

f.  `[[]]` 是bash keyword：`[[` is a shell keyword

### `case`
如果你需要面对很多情况，分别要采取不同的措施，那么使用 `case` 会比嵌套的

`if` 更有用。使用 `case` 来解决复杂的条件判断，看起来像下面这样：

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/case.sh)
```shell
#!/usr/bin/env bash

echo "input param: " $1 $2 $3

x=0
if [[ -n $1 ]]; then
    x=$1
fi

oper=""
if [[ -n $2 ]]; then
    oper=$2
fi

y=0
if [[ -n $3 ]]; then
    y=$3
fi

exec
case ${oper} in
+ | add)
    val=$(expr ${x} + ${y})
    echo "${x} + ${y} = ${val}"
    ;;
- | sub)
    val=$(expr ${x} - ${y})
    echo "${x} - ${y} = ${val}"
    ;;
\* | mul)
    val=$(expr ${x} \* ${y})
    echo "${x} * ${y} = ${val}"
    ;;
/ | div)
    val=$(expr ${x} / ${y})
    echo "${x} / ${y} = ${val}"
    ;;
*)
    echo "Unknown oper!"
    ;;
esac
```

每种情况都是匹配了某个模式的表达式。 `|` 用来分割多个模式， `)` 用来结束一个模式序列。第一个匹配上的模式对应的命令将会被执行。 `*` 代表任何不匹配以上给定模式的模式。命令块儿之间要用 `;;` 分隔。

## 循环语句
循环其实不足为奇。跟其它程序设计语言一样，bash 中的循环也是只要控制条件为真就一直迭代执行的代码块。

Bash 中有四种循环： `for` ， `while` ， `until` 和 `select` 。


### `for` 循环

`for` 与它在 C 语言中的姊妹非常像。看起来是这样：
```shell
for arg in elem1 elem2 ... elemN
do
  ### 语句
done
```

在每次循环的过程中， `arg` 依次被赋值为从 `elem1` 到 `elemN` 。这些值还可以是通配符或者 [大括号扩展](https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#%E5%A4%A7%E6%8B%AC%E5%8F%B7%E6%89%A9%E5%B1%95) 。

当然，我们还可以把 `for` 循环写在一行，但这要求 `do` 之前要有一个分号，就像下面这样：

```shell
for i in {1..5}; do echo $i; done
```

还有，如果你觉得 `for..in..do` 对你来说有点奇怪，那么你也可以像 C 语言那样使用 `for` ，比如：

```shell
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

当我们想对一个目录下的所有文件做同样的操作时， `for` 就很方便了。举个例子，如果我们想把所有的 `.bash` 文件移动到 `script` 文件夹中，并给它们可执行权限，我们的脚本可以这样写：

```shell
DIR=/home/zp
for FILE in ${DIR}/*.sh; do
  mv "$FILE" "${DIR}/scripts"
done
# 将 /home/zp 目录下所有 sh 文件拷贝到 /home/zp/scripts
```

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/for.sh)
```shell
#!/usr/bin/env bash

# for 语句
# ----------------------------------------
echo "print 0 to 9"
for ((j = 0; j < 10; j++)); do
    echo ${j}
done
#  Output:
#  print 0 to 9
#  0
#  1
#  2
#  3
#  4
#  5
#  6
#  7
#  8
#  9

# for in 语句
# ----------------------------------------
echo "print 1 to 5"
for i in {1..5}; do
    echo ${i}
done
#  Output:
#  print 1 to 5
#  1
#  2
#  3
#  4
#  5

# for in 语句遍历文件
# ----------------------------------------
# DIR=/home/zp
# for FILE in ${DIR}/*.sh; do
#     mv "$FILE" "${DIR}/scripts"
# done
# 将 /home/zp 目录下所有 sh 文件拷贝到 /home/zp/scripts

# for 语句中使用多个变量
# ----------------------------------------
for ((x = 1, y = 10; x <= y; x++, y--)); do
    echo "$y - $x = $(($y - $x))"
done

# 嵌套 for 循环
# ----------------------------------------
for ((x = 1; x <= 3; x++)); do
    echo "Starting loop $x:"
    for ((y = 1; y <= 3; y++)); do
        echo "Inside loog: $y:"
    done
done
#Output
#Starting loop 1:
#Inside loog: 1:
#Inside loog: 2:
#Inside loog: 3:
#Starting loop 2:
#Inside loog: 1:
#Inside loog: 2:
#Inside loog: 3:
#Starting loop 3:
#Inside loog: 1:
#Inside loog: 2:
#Inside loog: 3:
```


### `while` 循环

`while` 循环检测一个条件，只要这个条件为 _真 _，就执行一段命令。被检测的条件跟 `if..then` 中使用的 [基元](https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#%E5%9F%BA%E5%85%83%E5%92%8C%E7%BB%84%E5%90%88%E8%A1%A8%E8%BE%BE%E5%BC%8F) 并无二异。因此一个 `while` 循环看起来会是这样：

```shell
while [[ condition ]]
do
  ### 语句
done
```

跟 `for` 循环一样，如果我们把 `do` 和被检测的条件写到一行，那么必须要在`do` 之前加一个分号。

比如下面这个例子：

Code
```shell
#!/usr/bin/env bash

# while 循环输出 0 ~ 9 的平方数
# ----------------------------------------
x=0
while [[ ${x} -lt 10 ]]; do
    echo $((x * x))
    x=$((x + 1))
done
#  Output:
#  0
#  1
#  4
#  9
#  16
#  25
#  36
#  49
#  64
#  81


# while 循环输出 0 ~ 9
# ----------------------------------------
x=0
while
    echo ${x}
    [[ ${x} -lt 9 ]]
do
    x=$((x + 1))
done
#	Output:
#	0
#	1
#	2
#	3
#	4
#	5
#	6
#	7
#	8
#	9

# while 循环嵌套 for 循环
# ----------------------------------------
x=5
while [[ $x -ge 0 ]]; do
    echo "Outer loop: $x"
    for ((y = 1; $y < 3; y++)); do
        z=$(($x * $y))
        echo "Inner loop: $x * $y = $z"
    done
    x=$(($x - 1))
done
```


### `until` 循环

`until` 循环跟 `while` 循环正好相反。它跟 `while` 一样也需要检测一个测试条件，但不同的是，只要该条件为 _假 _ 就一直执行循环：

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/until.sh)
```shell
#!/usr/bin/env bash

x=0
until [[ ${x} -ge 5 ]]; do
    echo ${x}
    x=$(expr ${x} + 1)
done
#  Output:
#  0
#  1
#  2
#  3
#  4

x=0
until
    echo $x
    [[ $x -ge 5 ]]
do
    x=$(($x + 1))
done
#	Output:
#	0
#	1
#	2
#	3
#	4
#	5
```


### `select` 循环

`select` 循环帮助我们组织一个用户菜单。它的语法几乎跟 `for` 循环一致：

```shell
select answer in elem1 elem2 ... elemN
do
  ### 语句
done
```

`select` 会打印 `elem1..elemN` 以及它们的序列号到屏幕上，之后会提示用户输入。通常看到的是 `$?` （ `PS3`变量）。用户的选择结果会被保存到 `answer` 中。如果 `answer` 是一个在`1..N` 之间的数字，那么 `语句` 会被执行，紧接着会进行下一次迭代 

如果不想这样的话我们可以使用 `break` 语句。

一个可能的实例可能会是这样：

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/select.sh)
```shell
#!/usr/bin/env bash

PS3="Choose the package manager: "
select ITEM in bower npm gem pip; do
    echo -n "Enter the package name: " && read PACKAGE
    case ${ITEM} in
    bower) bower install ${PACKAGE} ;;
    npm) npm install ${PACKAGE} ;;
    gem) gem install ${PACKAGE} ;;
    pip) pip install ${PACKAGE} ;;
    esac
    break # 避免无限循环
done
```

这个例子，先询问用户他想使用什么包管理器。接着，又询问了想安装什么包，最后执行安装操作。

运行这个脚本，会得到如下输出：

```shell
$ ./my_script
1) bower
2) npm
3) gem
4) pip
Choose the package manager: 2
Enter the package name: gitbook-cli
```


### `break` 和 `continue`

如果想提前结束一个循环或跳过某次循环执行，可以使用 shell 的 `break` 和 `continue` 语句来实现。它们可以在任何循环中使用。
> `break` 语句用来提前结束当前循环。 
> `continue` 语句用来跳过某次迭代。

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/break.sh)
```shell
#!/usr/bin/env bash

# 使用break跳出外部循环
# ----------------------------------------
# 查找 10 以内第一个能整除 2 和 3 的正整数
i=1
while [[ ${i} -lt 10 ]]; do
    if [[ $((i % 3)) -eq 0 ]] && [[ $((i % 2)) -eq 0 ]]; then
        echo ${i}
        break
    fi
    i=$(expr ${i} + 1)
done
# Output: 6
```
[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/continue.sh)
```shell
#!/usr/bin/env bash

# 打印10以内的奇数
# ----------------------------------------
for ((i = 0; i < 10; i++)); do
    if [[ $((i % 2)) -eq 0 ]]; then
        continue
    fi
    echo ${i}
done
#  Output:
#  1
#  3
#  5
#  7
#  9

# 多重循环
# ----------------------------------------
for ((a = 1; a <= 5; a++)); do
    echo "Iteration $a:"
    for ((b = 1; b < 3; b++)); do
        if [[ $a -gt 2 ]] && [[ $a -lt 4 ]]; then
            continue 2
        fi
        var3=$(($a * $b))
        echo " The result of $a * $b is $var3"
    done
done

```

## 参考

- [shell 编程------if 语句 if -z -n -f -eq -ne -lt](https://www.cnblogs.com/myitm/archive/2012/07/05/2577416.html)

