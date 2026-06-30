---
description: 'java.lang.StrictMath严格遵循IEEE 754标准，提供算术运算、指数与对数、三角函数、舍入取整、随机数及单位增量等数学计算方法，确保跨平台结果一致。'
lastUpdated: '2026-06-30 09:45:06'
head:
  - - meta
    - name: 'og:title'
      content: 'java.lang.StrictMath - 遵循 IEEE 754 标准的数学计算方法'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.lang.StrictMath严格遵循IEEE 754标准，提供算术运算、指数与对数、三角函数、舍入取整、随机数及单位增量等数学计算方法，确保跨平台结果一致。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/base/lang-strict-math.html'
---
# java.lang.StrictMath - 遵循 IEEE 754 标准的数学计算方法

`java.lang.StrictMath` 提供了一组严格遵循 IEEE 754 标准的数学计算方法，确保跨平台结果一致性。以下是按功能分组的方法列表。

::: info ℹ️

跨平台一致性：StrictMath 使用严格定义的算法实现所有方法，因此性能可能略低于 Math
与 Math 的区别：Math 在某些平台上可能会使用硬件优化，而 StrictMath 的结果在所有平台上都一致, `StrictMath` 适合对结果一致性要求较高的场景，例如科学计算或需要跨平台精确一致性的应用

:::

## **算术运算**

`int abs(int a)`

返回整数的绝对值。

`long abs(long a)`

返回长整数的绝对值。

`float abs(float a)`

返回浮点数的绝对值。

`double abs(double a)`

返回双精度浮点数的绝对值。

`int min(int a, int b)`

返回两个整数中的较小值。

`long min(long a, long b)`

返回两个长整数中的较小值。

`float min(float a, float b)`

返回两个浮点数中的较小值。

`double min(double a, double b)`

返回两个双精度浮点数中的较小值。

`int max(int a, int b)`

返回两个整数中的较大值。

`long max(long a, long b)`

返回两个长整数中的较大值。

`float max(float a, float b)`

返回两个浮点数中的较大值。

`double max(double a, double b)`

返回两个双精度浮点数中的较大值。

`float signum(float f)`

返回浮点数的符号。

`double signum(double d)`

返回双精度浮点数的符号。

`float copySign(float magnitude, float sign)`

返回具有指定符号的浮点数。

`double copySign(double magnitude, double sign)`

返回具有指定符号的双精度浮点数。

---

## **指数与对数运算**

`double exp(double a)`

返回 e 的指定指数幂。

`double log(double a)`

返回数值的自然对数。

`double log10(double a)`

返回数值的以 10 为底的对数。

`double pow(double a, double b)`

返回第一个参数的第二个参数次幂。

`double sqrt(double a)`

返回数值的平方根。

`double cbrt(double a)`

返回数值的立方根。

`double hypot(double x, double y)`

返回 sqrt(x² + y²), 计算斜边长度

```Java
double hypotenuse = StrictMath.hypot(3, 4); // sqrt(3^2 + 4^2)
System.out.println(hypotenuse); // 输出 5.0
```

---

## **三角函数**

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

返回点 (x, y) 的极坐标角度值。

---

## **舍入与取整**

`double ceil(double a)`

返回大于或等于指定数值的最小整数值。

`double floor(double a)`

返回小于或等于指定数值的最大整数值。

`double rint(double a)`

返回最接近的整数值（如两个整数等距，取偶数）。

`int round(float a)`

返回单精度浮点数的四舍五入整数值。

`long round(double a)`

返回双精度浮点数的四舍五入长整数值。

---

## **随机与单位增量**

`double random()`

返回 `[0.0, 1.0)` 区间的伪随机数

```Java
double randomValue = StrictMath.random();
System.out.println(randomValue); // 输出一个 [0.0, 1.0) 的随机数
```

`double nextUp(double a)`

返回比指定数值略大的最小浮点值。

`double nextDown(double a)`

返回比指定数值略小的最小浮点值。

`double nextAfter(double start, double direction)`

返回从 start 开始，朝指定方向移动的下一个浮点值。

`double ulp(double d)`

返回指定双精度浮点数的最小单位增量