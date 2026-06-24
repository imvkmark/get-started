---
description: '下表列出了常用的算术运算符，假定变量 x 为 10，变量 y 为 20：注意： 条件表达式要放在方括号之间，并且要有空格，例如: [$x==$y]是错误的，必须写成 [ $x == $y ]关系运算符只支持数字，不支持字符串，除非字符串的值是数字。下表列出了常用的关系运算符，假定变量 x 为 10，变量 y 为 20：下表列出了常用的布尔运算符，假定变量 x 为 10，变量 y 为 20：以下介绍 Shell 的逻辑运算符，假定变量 x 为 10，变量 y 为 20:下表列出了常用的字符串运算符，假定变量 a 为 “abc”，变量 b 为 “efg”：文件测试运算符'
lastUpdated: '2023-12-05 14:14:00'
head: 
  - - meta
    - name: 'og:title'
      content: '7. 运算符'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '下表列出了常用的算术运算符，假定变量 x 为 10，变量 y 为 20：注意： 条件表达式要放在方括号之间，并且要有空格，例如: [$x==$y]是错误的，必须写成 [ $x == $y ]关系运算符只支持数字，不支持字符串，除非字符串的值是数字。下表列出了常用的关系运算符，假定变量 x 为 10，变量 y 为 20：下表列出了常用的布尔运算符，假定变量 x 为 10，变量 y 为 20：以下介绍 Shell 的逻辑运算符，假定变量 x 为 10，变量 y 为 20:下表列出了常用的字符串运算符，假定变量 a 为 “abc”，变量 b 为 “efg”：文件测试运算符'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/bash/manual/7-arithmetic.html'
---
# 7. 运算符



## 算术运算符

下表列出了常用的算术运算符，假定变量 x 为 10，变量 y 为 20：

<table><tbody>
  <tr>
    <td>运算符</td>
    <td>说明</td>
    <td>举例</td>
  </tr>
  <tr>
    <td> <code>+</code> </td>
    <td>加法</td>
    <td> <code>expr $x + $y</code> </td>
  </tr>
  <tr>
    <td> <code>-</code> </td>
    <td>减法</td>
    <td> <code>expr $x - $y</code> </td>
  </tr>
  <tr>
    <td> <code>*</code> </td>
    <td>乘法</td>
    <td> <code>expr $x * $y</code> </td>
  </tr>
  <tr>
    <td> <code>/</code> </td>
    <td>除法</td>
    <td> <code>expr $y / $x</code> </td>
  </tr>
  <tr>
    <td> <code>%</code> </td>
    <td>取余</td>
    <td> <code>expr $y % $x</code> </td>
  </tr>
  <tr>
    <td> <code>=</code> </td>
    <td>赋值</td>
    <td> <code>x=$y</code> </td>
  </tr>
  <tr>
    <td> <code>==</code> </td>
    <td>相等。用于比较两个数字，相同则返回 true。</td>
    <td> <code>[ $x == $y ]</code> </td>
  </tr>
  <tr>
    <td> <code>!=</code> </td>
    <td>不相等。用于比较两个数字，不相同则返回 true。</td>
    <td> <code>[ $x != $y ]</code> </td>
  </tr>
</tbody></table>

**注意：**  条件表达式要放在方括号之间，并且要有空格，例如:  `[$x==$y]` 是错误的，必须写成  `[ $x == $y ]`

```
#!/usr/bin/env bash

x=10
if [[ -n $1 ]]; then
    x=$1
fi

y=20
if [[ -n $2 ]]; then
    y=$2
fi

echo "x=${x}, y=${y}"

val=$(("${x}" + "${y}"))
echo "${x} + ${y} = $val"

val=$(("${x}" - "${y}"))
echo "${x} - ${y} = $val"

val=$(("${x}" * "${y}"))
echo "${x} * ${y} = $val"

val=$(("${y}" / "${x}"))
echo "${y} / ${x} = $val"

val=$(("${y}" % "${x}"))
echo "${y} % ${x} = $val"

if [[ ${x} == "${y}" ]]; then
    echo "${x} = ${y}"
fi
if [[ ${x} != "${y}" ]]; then
    echo "${x} != ${y}"
fi

#  Execute: ./算术运算符.sh
#  Output:
# x=10, y=20
# 10 + 20 = 30
# 10 - 20 = -10
# 10 * 20 = 200
# 20 / 10 = 2
# 20 % 10 = 0
# 10 != 20
```

## 关系运算符

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。下表列出了常用的关系运算符，假定变量 x 为 10，变量 y 为 20：

<table><tbody>
  <tr>
    <td>运算符</td>
    <td>说明</td>
    <td>举例</td>
  </tr>
  <tr>
    <td> <code>-eq</code> </td>
    <td>检测两个数是否相等，相等返回 true。</td>
    <td> <code>[ $a -eq $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>-ne</code> </td>
    <td>检测两个数是否相等，不相等返回 true。</td>
    <td> <code>[ $a -ne $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>-gt</code> </td>
    <td>检测左边的数是否大于右边的，如果是，则返回 true。</td>
    <td> <code>[ $a -gt $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>-lt</code> </td>
    <td>检测左边的数是否小于右边的，如果是，则返回 true。</td>
    <td> <code>[ $a -lt $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>-ge</code> </td>
    <td>检测左边的数是否大于等于右边的，如果是，则返回 true。</td>
    <td> <code>[ $a -ge $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>-le</code> </td>
    <td>检测左边的数是否小于等于右边的，如果是，则返回 true。</td>
    <td> <code>[ $a -le $b ]</code> </td>
  </tr>
</tbody></table>

```
#!/usr/bin/env bash

# 这里的关系操作符 ( -eq  -ne  -lt  -nt) 仅仅适用于整数
# 不适用于字符串，字符串等于用赋值号 =
# = 放在别的地方是赋值,放在 if [ ] 里就是字符串等于
# ----------------------------------------

x=10
if [[ -n $1 ]]; then
    x=$1
fi

y=20
if [[ -n $2 ]]; then
    y=$2
fi

echo "x=${x}, y=${y}"

if [[ ${x} -eq ${y} ]]; then
    echo "${x} -eq ${y} : x 等于 y"
else
    echo "${x} -eq ${y}: x 不等于 y"
fi

if [[ ${x} -ne ${y} ]]; then
    echo "${x} -ne ${y}: x 不等于 y"
else
    echo "${x} -ne ${y}: x 等于 y"
fi

if [[ ${x} -gt ${y} ]]; then
    echo "${x} -gt ${y}: x 大于 y"
else
    echo "${x} -gt ${y}: x 不大于 y"
fi

if [[ ${x} -lt ${y} ]]; then
    echo "${x} -lt ${y}: x 小于 y"
else
    echo "${x} -lt ${y}: x 不小于 y"
fi

if [[ ${x} -ge ${y} ]]; then
    echo "${x} -ge ${y}: x 大于或等于 y"
else
    echo "${x} -ge ${y}: x 小于 y"
fi

if [[ ${x} -le ${y} ]]; then
    echo "${x} -le ${y}: x 小于或等于 y"
else
    echo "${x} -le ${y}: x 大于 y"
fi

#  Output:
#  x=10, y=20
#  10 -eq 20: x 不等于 y
#  10 -ne 20: x 不等于 y
#  10 -gt 20: x 不大于 y
#  10 -lt 20: x 小于 y
#  10 -ge 20: x 小于 y
#  10 -le 20: x 小于或等于 y
```

## 布尔运算符

下表列出了常用的布尔运算符，假定变量 x 为 10，变量 y 为 20：

<table><tbody>
  <tr>
    <td>运算符</td>
    <td>说明</td>
    <td>举例</td>
  </tr>
  <tr>
    <td> <code>!</code> </td>
    <td>非运算，表达式为 true 则返回 false，否则返回 true。</td>
    <td> <code>[ ! false ]</code> </td>
  </tr>
  <tr>
    <td> <code>-o</code> </td>
    <td>或运算，有一个表达式为 true 则返回 true。</td>
    <td> <code>[ $a -lt 20 -o $b -gt 100 ]</code> </td>
  </tr>
  <tr>
    <td> <code>-a</code> </td>
    <td>与运算，两个表达式都为 true 才返回 true。</td>
    <td> <code>[ $a -lt 20 -a $b -gt 100 ]</code> </td>
  </tr>
</tbody></table>

```
#!/usr/bin/env bash

x=10
if [[ -n $1 ]]; then
    x=$1
fi

y=20
if [[ -n $2 ]]; then
    y=$2
fi

echo "x=${x}, y=${y}"

if [[ ${x} != "${y}" ]]; then
    echo "${x} != ${y} : x 不等于 y"
else
    echo "${x} != ${y}: x 等于 y"
fi

if [[ ${x} -lt 100 && ${y} -gt 15 ]]; then
    echo "${x} 小于 100 且 ${y} 大于 15 : 返回 true"
else
    echo "${x} 小于 100 且 ${y} 大于 15 : 返回 false"
fi

if [[ ${x} -lt 100 || ${y} -gt 100 ]]; then
    echo "${x} 小于 100 或 ${y} 大于 100 : 返回 true"
else
    echo "${x} 小于 100 或 ${y} 大于 100 : 返回 false"
fi

if [[ ${x} -lt 5 || ${y} -gt 100 ]]; then
    echo "${x} 小于 5 或 ${y} 大于 100 : 返回 true"
else
    echo "${x} 小于 5 或 ${y} 大于 100 : 返回 false"
fi

#  Output:
# x=10, y=20
# 10 != 20 : x 不等于 y
# 10 小于 100 且 20 大于 15 : 返回 true
# 10 小于 100 或 20 大于 100 : 返回 true
# 10 小于 5 或 20 大于 100 : 返回 false
```

## 逻辑运算符

以下介绍 Shell 的逻辑运算符，假定变量 x 为 10，变量 y 为 20:

<table><tbody>
  <tr>
    <td>运算符</td>
    <td>说明</td>
    <td>举例</td>
  </tr>
  <tr>
    <td> <code>&amp;&amp;</code> </td>
    <td>逻辑的 AND</td>
    <td> <code>[[ ${x} -lt 100 &amp;&amp; ${y} -gt 100 ]]</code> </td>
  </tr>
  <tr>
    <td> <code>\\&amp;#124;\\&amp;#124;</code> </td>
    <td>逻辑的 OR</td>
    <td> <code>[[ $a -lt 100 \\&amp;#124;\\&amp;#124; $b -gt 100 ]]</code> </td>
  </tr>
</tbody></table>

```
#!/usr/bin/env bash

x=10
if [[ -n $1 ]]; then
    x=$1
fi

y=20
if [[ -n $2 ]]; then
    y=$2
fi

echo "x=${x}, y=${y}"

if [[ ${x} -lt 100 && ${y} -gt 100 ]]; then
    echo "${x} -lt 100 && ${y} -gt 100 返回 true"
else
    echo "${x} -lt 100 && ${y} -gt 100 返回 false"
fi

if [[ ${x} -lt 100 || ${y} -gt 100 ]]; then
    echo "${x} -lt 100 || ${y} -gt 100 返回 true"
else
    echo "${x} -lt 100 || ${y} -gt 100 返回 false"
fi

# 定外一种逻辑 or 的写法
# ----------------------------------------
if [ "${x}" -lt 100 ] || [ "${y}" -gt 100 ]; then
    echo "${x} -lt 100 || ${y} -gt 100 返回 true"
else
    echo "${x} -lt 100 || ${y} -gt 100 返回 false"
fi

#  Output:
#  x=10, y=20
#  10 -lt 100 && 20 -gt 100 返回 false
#  10 -lt 100 || 20 -gt 100 返回 true

```

## 字符串运算符

下表列出了常用的字符串运算符，假定变量 a 为 “abc”，变量 b 为 “efg”：

<table><tbody>
  <tr>
    <td>运算符</td>
    <td>说明</td>
    <td>举例</td>
  </tr>
  <tr>
    <td> <code>=</code> </td>
    <td>检测两个字符串是否相等，相等返回 true。</td>
    <td> <code>[ $a = $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>!=</code> </td>
    <td>检测两个字符串是否相等，不相等返回 true。</td>
    <td> <code>[ $a != $b ]</code> </td>
  </tr>
  <tr>
    <td> <code>-z</code> </td>
    <td>检测字符串长度是否为 0，为 0 返回 true。</td>
    <td> <code>[ -z $a ]</code> </td>
  </tr>
  <tr>
    <td> <code>-n</code> </td>
    <td>检测字符串长度是否为 0，不为 0 返回 true。</td>
    <td> <code>[ -n $a ]</code> </td>
  </tr>
  <tr>
    <td> <code>str</code> </td>
    <td>检测字符串是否为空，不为空返回 true。</td>
    <td> <code>[ $a ]</code> </td>
  </tr>
</tbody></table>

```
#!/usr/bin/env bash

x="abc"
if [[ -n $1 ]]; then
    # 这里也可替换为 if [[ $1 ]]; then
    x=$1
fi

y="xyz"
if [[ -n $2 ]]; then
    y=$2
fi

echo "x=${x}, y=${y}"

# 这里比较的是 x (字符串) 和 y (字符串)
if [ x = y ]; then
    echo "x = y : x 等于 y"
else
    echo "x = y: x 不等于 y"
fi

if [[ ${x} = "${y}" ]]; then
    echo "${x} = ${y} : x 等于 y"
else
    echo "${x} = ${y}: x 不等于 y"
fi

if [[ ${x} != "${y}" ]]; then
    echo "${x} != ${y} : x 不等于 y"
else
    echo "${x} != ${y}: x 等于 y"
fi

if [[ -z ${x} ]]; then
    echo "-z ${x} : 字符串长度为 0"
else
    echo "-z ${x} : 字符串长度不为 0"
fi

# 检测字符串长度是否为 0
#--------------------------------------------
if [[ -n "${x}" ]]; then
    echo "-n ${x} : 字符串长度不为 0"
else
    echo "-n ${x} : 字符串长度为 0"
fi

if [[ ${x} ]]; then
    echo "${x} : 字符串不为空"
else
    echo "${x} : 字符串为空"
fi

#  Output:
#  x=abc, y=xyz
#  abc = xyz: x 不等于 y
#  abc != xyz : x 不等于 y
#  -z abc : 字符串长度不为 0
#  -n abc : 字符串长度不为 0
#  abc : 字符串不为空
```

## 文件测试运算符

文件测试运算符用于检测 Unix 文件的各种属性。属性检测描述如下：

<table><tbody>
  <tr>
    <td>操作符</td>
    <td>说明</td>
    <td>举例</td>
  </tr>
  <tr>
    <td>-b file</td>
    <td>检测文件是否是块设备文件，如果是，则返回 true。</td>
    <td> <code>[ -b $file ]</code> </td>
  </tr>
  <tr>
    <td>-c file</td>
    <td>检测文件是否是字符设备文件，如果是，则返回 true。</td>
    <td> <code>[ -c $file ]</code> </td>
  </tr>
  <tr>
    <td>-d file</td>
    <td>检测文件是否是目录，如果是，则返回 true。</td>
    <td> <code>[ -d $file ]</code> </td>
  </tr>
  <tr>
    <td>-f file</td>
    <td>检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。</td>
    <td> <code>[ -f $file ]</code> </td>
  </tr>
  <tr>
    <td>-g file</td>
    <td>检测文件是否设置了 SGID 位，如果是，则返回 true。</td>
    <td> <code>[ -g $file ]</code> </td>
  </tr>
  <tr>
    <td>-k file</td>
    <td>检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。</td>
    <td> <code>[ -k $file ]</code> </td>
  </tr>
  <tr>
    <td>-p file</td>
    <td>检测文件是否是有名管道，如果是，则返回 true。</td>
    <td> <code>[ -p $file ]</code> </td>
  </tr>
  <tr>
    <td>-u file</td>
    <td>检测文件是否设置了 SUID 位，如果是，则返回 true。</td>
    <td> <code>[ -u $file ]</code> </td>
  </tr>
  <tr>
    <td>-r file</td>
    <td>检测文件是否可读，如果是，则返回 true。</td>
    <td> <code>[ -r $file ]</code> </td>
  </tr>
  <tr>
    <td>-w file</td>
    <td>检测文件是否可写，如果是，则返回 true。</td>
    <td> <code>[ -w $file ]</code> </td>
  </tr>
  <tr>
    <td>-x file</td>
    <td>检测文件是否可执行，如果是，则返回 true。</td>
    <td> <code>[ -x $file ]</code> </td>
  </tr>
  <tr>
    <td>-s file</td>
    <td>检测文件是否为空（文件大小是否大于 0），不为空返回 true。</td>
    <td> <code>[ -s $file ]</code> </td>
  </tr>
  <tr>
    <td>-e file</td>
    <td>检测文件（包括目录）是否存在，如果是，则返回 true。</td>
    <td> <code>[ -e $file ]</code> </td>
  </tr>
</tbody></table>

```
#!/usr/bin/env bash

file="/etc/hosts"

if [[ -r ${file} ]]; then
    echo "${file} 文件可读"
else
    echo "${file} 文件不可读"
fi
if [[ -w ${file} ]]; then
    echo "${file} 文件可写"
else
    echo "${file} 文件不可写"
fi
if [[ -x ${file} ]]; then
    echo "${file} 文件可执行"
else
    echo "${file} 文件不可执行"
fi
if [[ -f ${file} ]]; then
    echo "${file} 文件为普通文件"
else
    echo "${file} 文件为特殊文件"
fi
if [[ -d ${file} ]]; then
    echo "${file} 文件是个目录"
else
    echo "${file} 文件不是个目录"
fi
if [[ -s ${file} ]]; then
    echo "${file} 文件不为空"
else
    echo "${file} 文件为空"
fi
if [[ -e ${file} ]]; then
    echo "${file} 文件存在"
else
    echo "${file} 文件不存在"
fi

#  Output:(根据文件的实际情况，输出结果可能不同)
#  /etc/hosts 文件可读
#  /etc/hosts 文件可写
#  /etc/hosts 文件不可执行
#  /etc/hosts 文件为普通文件
#  /etc/hosts 文件不是个目录
#  /etc/hosts 文件不为空
#  /etc/hosts 文件存在
```

##  `!`  运算符

```
#!/usr/bin/env bash

x=10

# 如果string 非空(非0），返回0(true)
# ----------------------------------------
if [ ! -n "$x" ]; then
    echo "x 是空"
else
    echo "x 不是空"
fi
```

