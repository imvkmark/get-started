# 4. 对象和类

## 4.1 概述

### 4.1.1 类

- 类
- 封装

### 4.1.2 对象

- 行为/状态/标识

### 4.1.3 识别类

在分析问题的过程中寻找名词, 方法对应动词

### 4.1.4 类之间的关系

- 依赖('uses-a')
- 聚合('has-a')
- 继承('is-a')

![](https://file.wulicode.com/doc/20230510/1683705537555.png)

## 4.2 预定义类

### 4.2.1 对象与对象变量

```
Date date = new Date()
```

### 4.2.2 Java 类库中的 LocalDate

将时间度量和日历分开是一种很好的面向对象设计

> JDK提供了`jdeprscan` 工具来检查你的代码中是否使用了Java API 已经废弃的特性

### 4.2.3 更改器方法与访问器方法

`localDate`

- 更改器方法可以修改内容
- 访问器方法仅仅返回数据

## 4.3 用户自定义类

### 4.3.1 Employee 类

介绍了简易的单元测试

### 4.3.2 多个源文件的使用

可以通过 javac 对文件进行动态的更新, 不必手动编译

### 4.3.3 剖析 Employee 类

- 构造器和类名相同
- 尽量保持私有

### 4.3.4 从构造器开始

- 构造器和类同名 * ( Php 废弃了这种写法, 改用了 `__construct()`)
- 可以有多个构造器 * (此处和 php 不同)
- 构造器可以不限参数
- 构造器无返回
- 构造器和 new 操作符一起使用

### 4.3.5 用 var 声明局部变量

在局部代码中不用使用类型声明(Java 10)

```
var duoli = new Employee('duoli');
```

### 4.3.6 使用 null 引用

- 慎重的使用 null

使用 objects 的方法来对值进行默认或者非空判定

```java
// 提供默认值
name= Objects.requireNonNullElse(n, "unknown");

// 输入值不能为 null
Objects.requireNonNull(n, "The name cannot be null");
```

### 4.3.7 隐式参数和显式参数

- 隐式参数可以成为对象
- 显式参数为传入参数

### 4.3.8 封装的优点

- 对数据进行小范围控制
- 公开越多, 出现的位置越复杂, 越难以跟进
- 封装注意对可变数据进行 clone

### 4.3.9 基于类的访问权限

一个类的可以访问相同类的所有对象的私有数据 * (Java 的一大特点)

### 4.3.10 私有方法

私有方法用来隔离访问

### 4.3.11 final 实例字段

实例字段只能在构造函数中初始化

## 4.4 静态字段和静态方法

### 4.4.1 静态字段

将字段定义为 static, 则每个类只有这一个字段, 也称为类字段, 对于非静态的字段, 每个实例中都有自己的一个副本

### 4.4.2 静态常量

如题的名称

### 4.4.3 静态方法

- 没有隐式参数

### 4.4.4 工厂方法

根据不同的场景获得不同的实例, 调用实例方法来完成不同的操作结果

### 4.4.5 main 方法

- 静态方法
- 不对任何对象进行操作

## 4.5 方法参数

- 值调用(不能修改基本数据类型的参数)
- 引用调用(可以改变对象参数的状态)
- 对象引用是按值传递

## 4.6 对象构造

### 4.6.1 重载

- 如果多个方法有相同的名字, 不同的参数则造成了重载, 这个是 java 的特性, 有多个构造函数或者多个方法, 不同的参数

### 4.6.2 默认字段的初始化

如果构造器中没有显示的为字段设置初始值, 就会默认的赋值, 数值为 0, 布尔 false, 对象 null

### 4.6.3 无参数的构造器

一般用来初始化数据, 仅仅当类中没有其他构造器的时候才会得到一个默认的无参数构造器

### 4.6.4 显式字段的初始化

在类中设置并赋值, 初始值可以调用函数

```java
class Employee 
{
    private String name = ''
    private static int nextId; 
    private int id = assignId();  // 和 php 不同, 这里很神奇

    private static int assignId()
    {
        int r = nextId;
        nextId++;
        return r;
    }
}
```

### 4.6.5 参数名

参数名会遮蔽同名的实例字段, 这样可以使用 this 来显示的调用变量名称

```java
class Employee 
{
    private String name = ''

    public Employee(String name) 
    {
        this.name = name;
    }
}
```

### 4.6.6 调用另一个构造器

```java
public Employee(String name) 
{
    this("Employee #" + nextId, name);
    nextId++;
}
```

### 4.6.7 初始化块

无论使用哪个构造器构造对象, id 字段都会在对象初始化块中初始化.

首先运行初始化块, 才运行构造器的主体部分, 不允许读取在后面初始化的字段

```
public Employee(String name) 
{

    private static int nextId = 1 ;

    // object initialization block
    {
        id = nextId;
        nextId++; 
    }


    // object initialization block
    static
    {
        var generator = new Random(); 
        nextId = generator.nextInt(10000);
    }
    this("Employee #" + nextId, name);
    nextId++;
}
```

### 4.6.8 对象析构和 finalize 方法

- 因为有垃圾回收, 所以不支持析构器

## 4.7 包

组织代码的一种方式

### 4.7.1 包名

域名的逆序

### 4.7.2 类导入

完全限定名称

```
// 完全限定
java.time.LocalDate today = java.time.LocalDate.now();

// 导入包中的所有类
import java.time.*;

// 导入指定类(推荐)
import java.time.LocalDate;
```

类名冲突, 在每个类名前面加上完成的包名

### 4.7.3 静态导入

```
import static java.lang.System.*

out.println("Hello world");
```

静态导入指定的包

```
import static java.lang.System.out

out.println("Hello world");
```

### 4.7.4 在包中增加类

需要在代码的头部放置 package 语句, 文件目录的位置也应该按照包名去组织 `tech/weiran/blog/Welcome.java`

```
package tech.weiran.blog;
```

这样运行 javac 和 java 的不同在于

```shell
javac tech/weiran/blog/Welcome.java    // 目录

java tech.weiran.blog.Welcome          // 类名
```

### 4.7.5 包访问

**包**

- 标记为 public 的可以任意类使用
- 标记为 private 的在本类使用
- 没有指定 public/private 可以在本包内所有方法访问

**变量**
和包一样, 建议加上修饰符, 因为默认情况下会破坏封装


### 4.7.6 类路径

- 存在目录中和路径和包名匹配
- 放在 jar 包中

多程序共享
- 如果类可以被共享, 需要把类文件放到同一个目录中
- 如果是 jar 包, 把包放在另一个目录并设置类路径 (class path), 支持通配符

// page 161







































































































