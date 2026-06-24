---
description: '处理数学运算的核心工具类，为开发者提供了丰富的静态方法，用于高效计算数学表达式。int abs(int a)返回整数的绝对值。long abs(long a)返回长整数的绝对值。float abs(float a)返回浮点数的绝对值。double abs(double a)返回双精度浮点数的绝对值。int max(int a, int b)返回两个整数中的较大值。long max(long a, long b)返回两个长整数中的较大值。float max(float a, float b)返回两个浮点数中的较大值。double m'
lastUpdated: '2025-12-06 15:01:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'java.lang.Math - 数学运算'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '处理数学运算的核心工具类，为开发者提供了丰富的静态方法，用于高效计算数学表达式。int abs(int a)返回整数的绝对值。long abs(long a)返回长整数的绝对值。float abs(float a)返回浮点数的绝对值。double abs(double a)返回双精度浮点数的绝对值。int max(int a, int b)返回两个整数中的较大值。long max(long a, long b)返回两个长整数中的较大值。float max(float a, float b)返回两个浮点数中的较大值。double m'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/base/lang-math.html'
---
# java.lang.Math - 数学运算



处理数学运算的核心工具类，为开发者提供了丰富的静态方法，用于高效计算数学表达式。

##  **常量列表** 

<table><tbody>
  <tr>
    <td>常量名称</td>
    <td>值</td>
    <td>描述</td>
  </tr>
  <tr>
    <td> <code>Math.E</code> </td>
    <td> <code>2.718281828459045</code> </td>
    <td>自然对数的底数（e），用于指数和对数运算</td>
  </tr>
  <tr>
    <td> <code>Math.PI</code> </td>
    <td> <code>3.141592653589793</code> </td>
    <td>圆周率（&pi;），用于角度、圆的计算</td>
  </tr>
</tbody></table>

## 算术运算

`int abs(int a)`

返回整数的绝对值。

`long abs(long a)`

返回长整数的绝对值。

`float abs(float a)`

返回浮点数的绝对值。

`double abs(double a)`

返回双精度浮点数的绝对值。

`int max(int a, int b)`

返回两个整数中的较大值。

`long max(long a, long b)`

返回两个长整数中的较大值。

`float max(float a, float b)`

返回两个浮点数中的较大值。

`double max(double a, double b)`

返回两个双精度浮点数中的较大值。

`int min(int a, int b)`

返回两个整数中的较小值。

`long min(long a, long b)`

返回两个长整数中的较小值。

`float min(float a, float b)`

返回两个浮点数中的较小值。

`double min(double a, double b)`

返回两个双精度浮点数中的较小值。

_________________

## 指数与对数运算

`double pow(double a, double b)`

返回第一个参数的第二个参数次幂。

`double sqrt(double a)`

返回数值的平方根。

`double cbrt(double a)`

返回数值的立方根。

`double exp(double a)`

返回 e 的指定指数幂。

`double log(double a)`

返回数值的自然对数。

`double log10(double a)`

返回数值的以 10 为底的对数。

_________________

## 舍入与取整

`double ceil(double a)`

返回大于或等于指定数值的最小整数值。

`double floor(double a)`

返回小于或等于指定数值的最大整数值。

`long round(double a)`

返回双精度浮点数的四舍五入长整数值。

`int round(float a)`

返回单精度浮点数的四舍五入整数值。

_________________

## 三角函数

`double sin(double a)`

返回角度（弧度）的正弦值。

`double cos(double a)`

返回角度（弧度）的余弦值。

`double tan(double a)`

返回角度（弧度）的正切值。

`double asin(double a)`

返回反正弦值。

`double acos(double a)`

返回反余弦值。

`double atan(double a)`

返回反正切值。

`double atan2(double y, double x)`

返回点 (x, y) 的极坐标角度值

## 精确计算方法 / Exact Methods

`int addExact(int x, int y)`

执行两个整数的加法运算，抛出  `ArithmeticException`  以指示溢出。

`long addExact(long x, long y)`

执行两个长整数的加法运算，抛出  `ArithmeticException`  以指示溢出。

`int subtractExact(int x, int y)`

执行两个整数的减法运算，抛出  `ArithmeticException`  以指示溢出。

`long subtractExact(long x, long y)`

执行两个长整数的减法运算，抛出  `ArithmeticException`  以指示溢出。

`int multiplyExact(int x, int y)`

执行两个整数的乘法运算，抛出  `ArithmeticException`  以指示溢出。

`long multiplyExact(long x, long y)`

执行两个长整数的乘法运算，抛出  `ArithmeticException`  以指示溢出。

`int incrementExact(int x)`

执行整数的加一操作，抛出  `ArithmeticException`  以指示溢出。

`long incrementExact(long x)`

执行长整数的加一操作，抛出  `ArithmeticException`  以指示溢出。

`int decrementExact(int x)`

执行整数的减一操作，抛出  `ArithmeticException`  以指示溢出。

`long decrementExact(long x)`

执行长整数的减一操作，抛出  `ArithmeticException`  以指示溢出。

`int negateExact(int x)`

对整数取反，抛出  `ArithmeticException`  以指示溢出。

`long negateExact(long x)`

对长整数取反，抛出  `ArithmeticException`  以指示溢出。

`int toIntExact(long value)`

将一个长整数值转换为整数，抛出  `ArithmeticException`  以指示超出整数范围



