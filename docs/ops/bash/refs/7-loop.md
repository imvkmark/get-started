---
description: '该内容介绍了Shell脚本中的循环语句，包括for、while、until、select循环，以及break和continue控制语句。示例展示了for循环遍历文件、while循环输出平方数、嵌套循环等用法，并说明了如何使用break跳出多重循环。'
lastUpdated: '2026-07-02 09:30:00'
head:
  - - meta
    - name: 'og:title'
      content: '7. 循环语句'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容介绍了Shell脚本中的循环语句，包括for、while、until、select循环，以及break和continue控制语句。示例展示了for循环遍历文件、while循环输出平方数、嵌套循环等用法，并说明了如何使用break跳出多重循环。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/bash/refs/7-loop.html'
---
# 7. 循环语句

循环其实不足为奇。跟其它程序设计语言一样，bash 中的循环也是只要控制条件为真就一直迭代执行的代码块。

Bash 中有四种循环： `for` ， `while` ， `until` 和 `select` 。

## `for` 循环

`for` 与它在 C 语言中的姊妹非常像。看起来是这样：

```Plaintext
for arg in elem1 elem2 ... elemN
do
  ### 语句
done
```

在每次循环的过程中， `arg` 依次被赋值为从 `elem1` 到 `elemN` 。这些值还可以是通配符或者 [大括号扩展](https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#%E5%A4%A7%E6%8B%AC%E5%8F%B7%E6%89%A9%E5%B1%95) 。当然，我们还可以把 `for` 循环写在一行，但这要求 `do` 之前要有一个分号，就像下面这样：

```Plaintext
for i in {1..5}; do echo $i; done
```

还有，如果你觉得 `for..in..do` 对你来说有点奇怪，那么你也可以像 C 语言那样使用 `for` ，比如：

```Plaintext
for (( i = 0; i < 10; i++ )); do
  echo $i
done
```

当我们想对一个目录下的所有文件做同样的操作时， `for` 就很方便了。举个例子，如果我们想把所有的 `.bash` 文件移动到 `script` 文件夹中，并给它们可执行权限，我们的脚本可以这样写：

```Plaintext
DIR=/home/zp
for FILE in ${DIR}/*.sh; do
  mv "$FILE" "${DIR}/scripts"
done
# 将 /home/zp 目录下所有 sh 文件拷贝到 /home/zp/scripts
```

```Plaintext
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

## `while` 循环

`while` 循环检测一个条件，只要这个条件为 *真* ，就执行一段命令。被检测的条件跟 `if..then` 中使用的 [基元](https://github.com/denysdovhan/bash-handbook/blob/master/translations/zh-CN/README.md#%E5%9F%BA%E5%85%83%E5%92%8C%E7%BB%84%E5%90%88%E8%A1%A8%E8%BE%BE%E5%BC%8F) 并无二异。因此一个 `while` 循环看起来会是这样：

```Plaintext
while [[ condition ]]
do
  ### 语句
done
```

跟 `for` 循环一样，如果我们把 `do` 和被检测的条件写到一行，那么必须要在 `do` 之前加一个分号。

比如下面这个例子：Code

```Plaintext
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
#   Output:
#   0
#   1
#   2
#   3
#   4
#   5
#   6
#   7
#   8
#   9

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

## `until` 循环

`until` 循环跟 `while` 循环正好相反。它跟 `while` 一样也需要检测一个测试条件，但不同的是，只要该条件为 *假* 就一直执行循环：[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/until.sh)

```Plaintext
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
#   Output:
#   0
#   1
#   2
#   3
#   4
#   5
```

## `select` 循环

`select` 循环帮助我们组织一个用户菜单。它的语法几乎跟 `for` 循环一致：

```Plaintext
select answer in elem1 elem2 ... elemN
do
  ### 语句
done
```

`select` 会打印 `elem1..elemN` 以及它们的序列号到屏幕上，之后会提示用户输入。通常看到的是 `$?` （ `PS3` 变量）。用户的选择结果会被保存到 `answer` 中。如果 `answer` 是一个在 `1..N` 之间的数字，那么 `语句` 会被执行，紧接着会进行下一次迭代 如果不想这样的话我们可以使用 `break` 语句。一个可能的实例可能会是这样：[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/select.sh)

```Plaintext
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

```Plaintext
$ ./my_script
1) bower
2) npm
3) gem
4) pip
Choose the package manager: 2
Enter the package name: gitbook-cli
```

## `break` 和 `continue`

如果想提前结束一个循环或跳过某次循环执行，可以使用 shell 的 `break` 和 `continue` 语句来实现。它们可以在任何循环中使用。 > `break` 语句用来提前结束当前循环。 > `continue` 语句用来跳过某次迭代。

[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/break.sh)

```Plaintext
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

```Plaintext
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

- [shell 编程——if 语句 if -z -n -f -eq -ne -lt](https://www.cnblogs.com/myitm/archive/2012/07/05/2577416.html)