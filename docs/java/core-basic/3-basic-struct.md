---
outline: 'deep'
---

# 3. Java 基本结构

## 3.1 一个简单的程序

**模板**

```
[package 包名] 
impoort 包名.类名 
[public] class 类名 { 
    int val = '123'; 
    public static void main(String args[]) {
        // 变量定义和语句 
    } 
}
```

<<< @/java/core-basic/src/WelcomeSimple.java

- Java 区分大小写
- 文件名和类名相同
- 必须包含 `main` 方法
- main 方法必须是 public 修饰符

## 3.2 注释

```java
// single line comment

/*
 more 
 line 
 comment
 */
 
 
/** 
 * document 
 * more 
 * line 
 * comment
 */
```

## 3.3 数据类型

### 3.3.1 整形

![](https://file.wulicode.com/doc/20230510/1683672976200.png)

```
long intLong = 400000000l;
int intHex = 0x1654AC;
short intOct = 010;
int intBin = 0b10001;
int intRead = 1_000_123_111;
```

### 3.3.2 浮点类型

![](https://file.wulicode.com/doc/20230510/1683673344905.png)

双精度为什么是双精度, 因为双精度是单精度的两倍

```
float floatFloat = 3.14f;
double floatDouble = 3.14d;
```

对于浮点数中有三个特殊的浮点数值

```
Double.POSTTIVE_INFINITY  // 正无穷
Double.NEGATIVE_INFTNIIY  // 负无穷
Double.NaN                // 不是数值
```

### 3.3.3 Char

从 `\u0000 - \uFFFF` 的 16 进制的数据, 这里的特殊情况需要注意

字符串的转义

```
"\u0022+\u0022" 并不是一个由引号包围加号构成的字符串, 因为 \u0022 会转换为引号会得到 ""+"" 也就是空字符串
```

注释中的转义

```
// \u000A is a newline    :  \u000A 会转换为换行, 这里就会产生语法错误
// look inside c:\users   :  \users 不是一个有效的 16 进制数, 会报语法错误
```

### 3.3.4 unicode 和 char 类型

unicode 官方网站 : https://home.unicode.org/

utf-8 是 unicode 编码的一种实现方式

https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

### 3.3.5 boolean

true/false

## 3.4 变量与常量

### 3.4.1 声明变量

```
int score;
```

### 3.4.2 变量初始化

变量的声明尽可能靠近第一次使用的地方

```
int days;
days = 12;

int days = 12;
```

在 java10 开始可以从变量的初始值推断出类型

```
var days = 28;
```

### 3.4.2 常量

使用 `final` 表示常量, 建议常量使用大写

```java
public class Constants
{
    public static final double CMPERINCH = 2.54;   // 类常量

    public static void main(String[] args)
        final double MC_PER_INCH = 2.54;           // 常量
        double paperwidth = 8.5;
    } 
}
```

### 3.4.3 枚举

```
enum Size { SMALL, MEDIUM, LARGE, EXTRA_LARGE }
```

## 3.5 运算符

### 3.5.1 算术运算符

| 操作符 | 描述                | 例子         |
|-----|-------------------|------------|
| +   | 加法 - 相加运算符两侧的值    | A + B等于30  |
| -   | 减法 - 左操作数减去右操作数   | A – B等于-10 |
| *   | 乘法 - 相乘操作符两侧的值    | A * B等于200 |
| /   | 除法 - 左操作数除以右操作数   | B / A等于2   |
| ％   | 取模 - 左操作数除右操作数的余数 | B%A等于0     |
| ++  | 自增: 操作数的值增加1      | B++ 等于21   |
| –   | 自减: 操作数的值减少1      | B– 等于19    |

### 3.5.2 数学函数与常量

```
double y = Math.sqrt(x);
```

### 3.5.3 数值之间的转换

![](https://file.wulicode.com/doc/20230510/1683685827188.png)

实线表示无损, 虚线表示有损

### 3.5.4 强类型转换

```
double x = 9.97;
int nx = (int) x;   // 9
```

### 3.5.5 结合赋值和运算符

```
× += 4 ;
x = x + 4;
```

### 3.5.6 自增与自减运算符

> 建议不要使用, 因为不太容易理解

```
n++;
n--;
```

### 3.5.7 关系和 boolean 运算符

| 运算符  | 描述                               | 例子              |
|------|----------------------------------|-----------------|
| `==` | 检查如果两个操作数的值是否相等，如果相等则条件为真。       | （A == B）为假(非真)。 |
| `!=` | 检查如果两个操作数的值是否相等，如果值不相等则条件为真。     | (A != B) 为真。    |
| `>`  | 检查左操作数的值是否大于右操作数的值，如果是那么条件为真。    | （A> B）非真。       |
| `=`  | 检查左操作数的值是否大于或等于右操作数的值，如果是那么条件为真。 | （A> = B）为假。     |
| `<=` | 检查左操作数的值是否小于或等于右操作数的值，如果是那么条件为真。 | （A <= B）为真。     |

### 3.5.8 位运算符

| 操作符   | 描述                                        | 例子                      |
|-------|-------------------------------------------|-------------------------|
| `＆`   | 如果相对应位都是1，则结果为1，否则为0                      | （A＆B），得到12，即0000 1100   |
| `^`   | 如果相对应位值相同，则结果为0，否则为1                      | （A ^ B）得到49，即 0011 0001 |
| `〜`   | 按位补运算符翻转操作数的每一位，即0变成1，1变成0。               | （〜A）得到-61，即1100 0011    |
| `>`   | 按位右移运算符。左操作数按位右移右操作数指定的位数。                | A >> 2得到15即 1111        |
| `>>>` | 按位右移补零操作符。左操作数的值按右操作数指定的位数右移，移动得到的空位以零填充。 | A>>>2得到15即0000 1111     |

### 3.5.9 括号与运算符级别

使用括号会比记忆级别要实用的多

![](https://file.wulicode.com/doc/20230510/1683686294277.png)

## 3.6 字符串

### 3.6.1 子串

```
String greeting = "Hello";
String s = greeting.substring(0，3);
```

### 3.6.2 拼接

```
String greeting = "Hello";
String guide = greeting + "World."
```

### 3.6.3 不可变字符串

宇符串 `Hello` 永远包含字符 h, e, l, l, o 的代码单元序列。你不能修改这些值，不过，可以修改宇符串变量greeting，让它引用另外一个字符串，这就如同可以让原本存放了
3
的数值变量改成存放 4 一样

### 3.6.4 字符串对比

永远不要使用 `==` 运算符来检测是否相等, 需要使用 `s.equals(t)` 方法来检测

### 3.6.5 空和 null 串

判定为空

```
str.length() == 0

str.equals(""))
```

判定为 null

```
str == null
```

不是 null 也不是空

```
str != null && str.length() != 0
```

### 3.6.6 获取码点和代码单元

相当于获取字符串的某个位置

### 3.6.7 String API

有 50 多个方法, 版本越高, 方法越多

### 3.6.8 查看文档

使用 dash

![](https://file.wulicode.com/doc/20230510/1683687712051.png)

或者 在线文档 https://docs.oracle.com/en/java/javase/17/docs/api/index.html

### 3.6.9 构建字符串

使用 StringBuilder 构建字符串会比较快

```java
StringBuilder builder = newStringBuilder();
builder.append(ch);  // appends a single character
builder.append(str); // appends a string
StringcompletedString = builder.toString() ;
```

### 3.6.10 字串的转义

```
\n       换行 (0x0a)
\r       回车 (0x0d)
\f       换页符(0x0c)
\b       退格 (0x08)
\s       空格 (0x20)
\t       制表符
\"       双引号
\'       单引号
\\       反斜杠
\ddd     八进制字符 (ddd)
\uxxxx   16进制Unicode字符 (xxxx)
```

## 3.7 输入和输出

### 3.7.1 读取输入

使用 scanner 来读取输入

```
Scanner in = new Scanner(System.in);

String name = in.nextLine(); // 读取一行
String name = in.next();     // 读取一个单词
String name = in.nextInt();  // 读取一个整数
```

如果遇到搜集密码的输入可以使用 `java.io.Console`

### 3.7.2 格式化输出

```
System.out.printf("%8.2f", x);
```

![](https://file.wulicode.com/doc/20230510/1683688622233.png)

标志

![](https://file.wulicode.com/doc/20230510/1683688892450.png)

日期和时间的转换

![](https://file.wulicode.com/doc/20230510/1683688944701.png)
![](https://file.wulicode.com/doc/20230510/1683688958203.png)

语法图

![](https://file.wulicode.com/doc/20230510/1683689013475.png)

### 3.7.3 文件的输入与输出

文件的读取

```java
Scanner in = newScanner(Path.of("myfile.txt"), StandardCharsets.UTF_8);
```

文件的写入

```java
Printuriter out = new PrintWriter("myfile.txt", StandardCharsets.UTF_8):
```

## 3.8 控制流程

### 3.8.1 块作用域

- 大括号内的是块
- 不能在嵌套的块中声明同名的变量

### 3.8.2 条件语句

```java
if (condition) {
    statement;
}


if (condition) {
    statement;
} else {
    statement2;
}
```

### 3.8.3 循环

```java
while( condition ) {
    statement
}

// 至少执行一次
do {
    statement;
} while (condition)
```

### 3.8.4 确定循环

```java
for(int i = 0;i <= 10; i++) {
    statement;
}
```

### 3.8.5 多重选择(switch)

```java
switch(expression){
    case value :
       //statement
       break;
    case value2 :
       //statement
       break; 
    default :
       //statement
}
```

### 3.8.6

使用 break 跳出循环

```java
while (years =< 100) {
    balance =+ payment;
    double interest =balance * interestRate / 100; 
    balance += interest;
    if (balance >= goal) break;
}
```

跳出指定的循环, 带有跳出的标签

```
topWhile:
while (years =< 100) {
    ...
    for(...) {
        if (condition)
            break topWhile;
    }
}

if (condition) {
    // deal with
}
```

`continue` : 当前循环停止, 继续执行下一个开始循环, 和 php 一致

## 3.9 大数

如果整数和浮点数不能满足要求, 可以使用 `java.math` 包中两个类 `BigInteger` 和 `BigDecimal`, 这个类似于 php 中的 `bcmath`

### 3.9.1 范围

数值类型的基本类型的取值范围，无需强制去记忆，它们的值以常量的形式定义在对应的包装类中

```
# java.lang.Byte
Byte.SIZE
Byte.MIN_VALUE
Byte.MAX_VALUE
# java.lang.Short
Short.SIZE
Short.MIN_VALUE
Short.MAX_VALUE
# java.lang.Integer
Integer.SIZE
Integer.MIN_VALUE
Integer.MAX_VALUE
# java.lang.Long
Long.SIZE
Long.MIN_VALUE
Long.MAX_VALUE
# java.lang.Float
Float.SIZE
Float.MIN_VALUE
Float.MAX_VALUE
# java.lang.Double
Double.SIZE
Double.MIN_VALUE
Double.MAX_VALUE
# java.lang.Character
Character.SIZE
Character.MIN_VALUE
Character.MAX_VALUE
```

## 3.10 数组

### 3.10.1 声明数组

用来存储同一类型的数值的集合, 通过一个整形下标来访问数组中的每一个值

- 数组一旦创建就不应该更改长度
- 如果需要扩展数组的大小应该使用另一种数据结构 : 数组列表

```java
int[] small;
int[] small = new int(10)
int[] small = {2, 3, 5, 7, 11, 13}

String[] = users = {
    "duoli", 
    "someone", 
    // 最后一个值可以有 `,` 号 
}

// 匿名数组
new int[] {17, 19, 23, 29, 31, 37}

small = new int[] {17, 19, 23, 29, 31, 37}}
```

### 3.10.2 访问数组元素

```java
String[] names = new String[10];
for(int i = 0; i < 10; i++) names[i]="";
```

快速打印数组数据

```java
System.out.println(Arrays.toString(names))
```

### 3.10.3 for each 循环(增强 for 循环)

也叫增强的 for 循环

```
for (variable : collection ) statement
```

### 3.10.4 数组拷贝

数组的赋值在 java 中是引用, 所以要得到一个不同的数组, 需要使用数组的 `copyOf` 功能

```
int[] luckyNumbers  = {1, 3, 5, 7, 9}
int[] copiedLuckyNumbers = Arrays.copyof(luckyNumbers, luckyNumbers.length);
```

### 3.10.5 命令行参数

<<< @/java/core-basic/src/Welcome.java

对于这个代码的 `args` 便是一个数组

```
// 如果使用下面这种形式调用这个程序
java Welcome -g cruel world

// args 数组将包含以下内容:
args[0]: "-g" 
args[1]: "cruel" 
args[2]: "world"
```

### 3.10.6 数组排序

可以快速的使用静态方法进行排序

<<< @/java/core-basic/src/Lottery.java{36}

### 3.10.7 多维数组

```
int[][] magicSquare = {
    {1, 3, 5},
    {2, 4, 6}, 
    {9, 4, 7}
}
```

使用增强 for 来处理二维数组的每一个值

```java
for (double[] row : a)
    for (double value : row)
        // do something with value
```

快速打印多维数组可以使用

```java
System.out.println(Arrays.deepToString(names))
```

### 3.10.8 不规则数组

多维数组解释为数组的数组, 所以数组可以是不规则的
































