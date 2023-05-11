---
outline: 'deep'
---

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
- 类路径中必须要包含当前目录 `.` , 如果没有编译不会报错但无法运行

### 4.7.7 设置类路径

最好使用 `-class-path` 来指定类路径, 或者通过设置 `CLASSPATH` 环境变量来指定, 在 Java 9 中, 还可以从模块路径加载类.

## 4.8 Jar 文件

对文件打 jar 包用来给用户提供功能

### 4.8.1 创建 jar 文件

```
jar -cvf jarFileName file1, file2

// 例如

jar cvf CalculatorClasses.jar *.class icon.gif
```

![](https://file.wulicode.com/doc/20230510/1683729875381.png)
![](https://file.wulicode.com/doc/20230510/1683729896379.png)

### 4.8.2 清单文件

jar 包包含的文件 ` MANIFEST.MF`, 用来描述归档文件的特殊特性, 位于 `META-INF` 子目录中

https://docs.oracle.com/en/java/javase/17/docs/specs/jar/jar.html

```
Manifest-Version: 1.0
lines describing this archive
Name: Woozle.class
lines describing this file 
Name: com/mycompany/mypkq/
iines describing this package
```

要想编辑清单文件，需要将希望添加到清单文件中的行放到文本文件中，然后运行:

```
jar cfm jarFileName manifestFileName . .
```

例如，要创建 一个包含清单文件的JAR文件，应该运行:

```
jar cfm MyArchive.jar manifest.mf com/mycompany/mypkg/*.class
```

要想更新一个已有的JAR文件的清单，则需要将增加的部分放置到一个文本文件中，然后执行以下命令:

```
jar ufm MyArchive.jar manifest-additions.mf
```

### 4.8.3 可执行的 jar 文件

使用 e 选项指定入口点

```
jar cvfe MyProgram.jar com.mycompany.mypkg.MainAppClass files to add
```

或者在清单文件中指定程序的主类

```
Main-Class : com.mycompany.mypkg.MainAppClass
```

不要为主类名增加扩展名 `.class`

启动

```
java -jar MyProgram.jar
```

对于可执行的文件在 windows 上可以使用 [launch4J](https://launch4j.sourceforge.net/) 和 [IzPack](http://izpack.org/) 来对 windows 进行打包

### 4.8.4 多版本的 Jar 文件

对于不同版本之间的 API 不同, Java 9 引入了多版本 Jar(multi-release JAR), 因为 Java 8 不知道这个新增功能, 所以只会加载默认类, 9 则会加载新版本类. 文件结构如下

```

Application.class 
BuildingBlocks.class 
Util.class
META-INF
├── MANFIESTM.MF
├── versions
├── 9
│  └─ Application.class
└── 10
```

要增加不同的版本使用 --release 标志

```
jar uf MyProgram.jar --release 9 Application.class
```

要从头构建一个多版本的 jar 文件, 可以使用 -C 选项, 对应不同版本切换到不同的目录

```
jar cf MyProgram.jar -C bin/8. --release 9 -C bin/9 Aplication.class
```

面向不同版本编译时, 要使用 --release 标志和 -d 标志来指定输出目录

```
javac -d bin/8 --release 8 ...
```

`--release` 是 java 9 新增, 较早的版本中需要使用 `-source`, `-target`, `-boot-classpath`

多版本的库仅仅对 java 自带的 api 适用, 如果涉及到三方的 api, 不会支持

### 4.8.5 命令行选项的说明

对于命令行选项, Java 9 之后支持长命令 例如 `--class-path` 而不是 `-classpath`

为了简短可以使用短命令

```
jar -c -v -f ...
jar -cvf     # 此项目可能会容易混淆, 例如 -c, -p, -cp(短线是 java 经典表示方法, 不同于 shell)
jar --create--verbose --file jarFileName file1 file2
```

## 4.9 文档注释

使用 javadoc 来生成文档

### 4.9.1 注释的插入

javadoc 从一下几项中抽取信息

- 模块
- 包
- 公共类/接口
- 公共的或者受保护的字段
- 公共的和受保护的构造器以及方法

一般的写法和 php 一致

- 对于代码可以使用 `{@code Code}` 来生成, 一般来讲 IDE 都会自动生成
- 对于链接可以使用 `{@link package.class#feature label}` 可以放到注释中, 用来链接到指定的类/参数

对于注释来讲, 比 php 优秀的点是, 因为代码是强类型, 就没必要再文档中再标识类型了

### 4.9.2 类注释

import 之后, 类之前

### 4.9.3 方法注释

### 4.9.4 字段注释

### 4.9.5 通用注释

- `@author name` : 作者条目
- `@since 1.7.1` : 开始于
- `@version name` : 版本条目
- `@see name` : 推荐
- `@link name` : 文档

### 4.9.6 包注释

**方法 1(推荐)**
提供一个 `package-info.java` 文件,这个文件必须包含一个初始的以`/**` 和 `*/` 界定的Javadoc 注释，后面是一个 package 语句。它不能包含更多的代码或注释

**方法 2**
提供一个 `package.html` 文件, 内容放到 body 中

### 4.9.7 生成文档

```shell
# 单个包
javadoc - d docDirectory nameOPackage

# 多个包
javadoc - d docDirector nameOpPackage1 nameOpPackage2.

# 没有包
javadoc -d docDirectory *.java
```

其他选项

- `-link`

标准类库链接到 oracle 网站

- `-linksource`

源文件转换为 html

- `-overview filename`

提供预览入口

更多查看 : https://docs.oracle.com/en/java/javase/11/tools/javadoc.html

## 4.10 类设计技巧

- 一定要保证数据私有
- 一定要对数据进行初始化
- 不要在类中使用过多的基本类型
- 不是所有的字段都需要单独的访问器和字段更改器
- 分解有过多指责的类
- 类名和方法名要能够体现他们的职责
- 有限使用不可变的类










































































