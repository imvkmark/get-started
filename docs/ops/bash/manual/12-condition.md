---
description: '跟其它程序设计语言一样，Bash 中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在 [[ ]] 里的表达式。由 [[ ]] （ sh 中是 [ ] ）包起来的表达式被称作 检测命令 或 基元 。这些表达式帮助我们检测一个条件的结果。这里可以找到有关 bash 中单双中括号区别 的答案。共有两个不同的条件表达式： if 和 case 。if 在使用上跟其它语言相同。如果中括号里的表达式为真，那么 then 和fi 之间的代码会被执行。 fi 标志着条件代码块的结束。Code同样，可以使用 if..else 语句 或者 if..elif..else ，使用起来也很方便。'
lastUpdated: '2023-12-05 14:14:00'
head: 
  - - meta
    - name: 'og:title'
      content: '12. 条件判断'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '跟其它程序设计语言一样，Bash 中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在 [[ ]] 里的表达式。由 [[ ]] （ sh 中是 [ ] ）包起来的表达式被称作 检测命令 或 基元 。这些表达式帮助我们检测一个条件的结果。这里可以找到有关 bash 中单双中括号区别 的答案。共有两个不同的条件表达式： if 和 case 。if 在使用上跟其它语言相同。如果中括号里的表达式为真，那么 then 和fi 之间的代码会被执行。 fi 标志着条件代码块的结束。Code同样，可以使用 if..else 语句 或者 if..elif..else ，使用起来也很方便。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/bash/manual/12-condition.html'
---
# 12. 条件判断



跟其它程序设计语言一样，Bash 中的条件语句让我们可以决定一个操作是否被执行。结果取决于一个包在  `[[ ]]`  里的表达式。由  `[[ ]]`  （  `sh`  中是  `[ ]`  ）包起来的表达式被称作  **检测命令**  或  **基元**  。这些表达式帮助我们检测一个条件的结果。这里可以找到有关 [bash 中单双中括号区别](http://serverfault.com/a/52050) 的答案。共有两个不同的条件表达式：  `if`  和  `case`  。

##  `if` 

`if`  在使用上跟其它语言相同。如果中括号里的表达式为真，那么  `then`  和 `fi`  之间的代码会被执行。  `fi`  标志着条件代码块的结束。[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/if.sh)

```
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

同样，可以使用  `if..else`  语句 或者  `if..elif..else`  ，使用起来也很方便。[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/if-el.sh)

```
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

拆解 if command[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/if-cmd.sh)

```
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

`[]`  和  `[[]]`  的区别

`[]`  单中括号a.   `[]`  两个符号左右都要有空格分隔b.  内部操作符与操作变量之间要有空格：如  `[ "a" = "b" ]` c.  字符串比较中， `>`   `<`  需要写成 `>`   `\<`  进行转义d.   `[]`  中字符串或者  `${}`  变量尽量使用  `"`  双引号扩住，以避免值未定义引用而出错e.   `[]`  中可以使用 –a –o 进行逻辑运算f.   `[]`  是bash 内置命令： `[`  is a shell builtin

`[[]]`  双中括号双方括号提供了字符串比较的高级特性, 可以定义一些正则表达式来匹配字符串, 但是并非所有的 shell 都支持双方括号a.   `[[]]`  两个符号左右都要有空格分隔b.  内部操作符与操作变量之间要有空格：如  `[[ "a" = "b" ]]` c.  字符串比较中，可以直接使用  `>`   `<`  无需转义d.   `[[]]`  中字符串或者  `${}`  变量尽量使用  `""`  双引号扩住，如未使用 `""`  会进行模式和元字符匹配e.   `[[]]`  内部可以使用  `&&`   `||`  进行逻辑运算f.   `[[]]`  是bash keyword： `[[`  is a shell keyword

##  `case` 

如果你需要面对很多情况，分别要采取不同的措施，那么使用  `case`  会比嵌套的 `if`  更有用。使用  `case`  来解决复杂的条件判断，看起来像下面这样：[Code](https://github.com/imvkmark/shell-get-started/blob/5c513c88f36bf6b9c474e12333d0d6776fa93b70/3_lang_ref/5_control/case.sh)

```
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

每种情况都是匹配了某个模式的表达式。  `|`  用来分割多个模式，  `)`  用来结束一个模式序列。第一个匹配上的模式对应的命令将会被执行。  `*`  代表任何不匹配以上给定模式的模式。命令块儿之间要用  `;;`  分隔。

