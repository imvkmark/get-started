# 数学扩展 - BCMath 任意精度数学函数

对于任意精度的数学算法,PHP提供了二进制计算方法,支持任意数量的,大小的数值,字串, 这里函数的运行是以字串作为基础,如果是在数字的承受范围内传递不会出错,否则的话则产生错误.

## 安装

不需要安装任何插件

## 配置

`bcmath.scale` “0”

PHP_INI_ALL 所有bcmath 函数中十进制数字的数目

## 函数

`string bcadd ( string $left_operand , string $right_operand [, int $scale ] )`

返回两个任意精度的数值的和,返回为字符串 - $scale 用于设置结果中小数点后的小数位数

`int bccomp ( string $left_operand , string $right_operand [, int $scale ] )`

比较两个操作数的大小. - $scale 设置小数位数

`string bcdiv ( string $left_operand , string $right_operand [, int $scale ] )`

除法, *leftoperand*/right_operand

`string bcmod ( string $left_operand , string $modulus )`

取余

`string bcmul ( string $left_operand , string $right_operand [, int $scale ] )`

乘法

`string bcpow ( string $left_operand , string $right_operand [, int $scale ] )`

乘方运算

`string bcpowmod ( string $left_operand , string $right_operand , string $modulus [, int $scale ] )`

乘方之后取余数 bcpowmod($x, $y, *mod*) =  = *bcmod*(*bcpow*(x, $y), $mod);

`bool bcscale ( int $scale )`

设置默认的小数位数.

`string bcsqrt ( string $operand [, int $scale ] )`

开方操作

`string bcsub ( string $left_operand , string $right_operand [, int $scale ] )`

减法操作