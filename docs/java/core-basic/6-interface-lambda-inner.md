# 6. 接口, lambda 表达式与内部类

## 6.1 接口

### 6.1.1 接口的概念

- 接口是一组需求
- 接口的方法都自动是 public 方法
- 接口没有实例字段
- Java8 以后, 接口可以提供简单方法
- 使用 implements 实现接口

### 6.1.2 接口的属性

- 不能被实例化
- 可以声明变量
- 可以使用 instanceof
- 可以扩展接口
- 可以定义常量(必须是 public 类型)
- 可以同时实现两个接口(使用 , 分隔)

### 6.1.3 接口与抽象类

组合使用接口和抽象类可以得到灵活, 优秀的设计

### 6.1.4 接口和私有方法

允许在接口中增加静态方法

### 6.1.5 默认方法

可以使用 default 关键字为接口提供一个默认实现

```java
public interface Comparable<T> 
{
    // by default, all elements are the same
    default int compareTo(T other) {return 0; } 
}
```

默认方法可以调用其他方法

```java
public interface Collection
{
    int size(); // an abstract method 
    efault boolean isEmpty(){return size() == 0;}
}
```

### 6.1.6 解决默认方法冲突

1. 超类优先
2. 接口冲突, 由程序员解决这个`二义性`
3. 类优先

### 6.1.7 接口与回调

使用接口定义回调, 调用回调则填入回调对象.

### 6.1.8 Comparator 接口

自己定义一个比较方法, 通过回调的方式

### 6.1.9 对象克隆

Cloneable 是 Java 提供的少数标记接口之一(tagging/marker interface)

## 6.2 lambda 表达式

### 6.2.1 为什么引入 lambda 表达式

可传递的代码块, 类似于闭包函数, 带参数变量的表达式就被称为 lambda 表达式

### 6.2.2 语法

如果 `->` 无法直接返回值, 可以使用代码块 `{}` 来返回数据

```java
(String first , String second)
  -> first.length() - second.length()
```

无参数的表达式, 如果只有一个参数也可以忽略括号

```
()->{ for(int i = 100; i >=0 ; i--) System.out.println(i);}
```

使用类型推导的 lambda 表达式的参数类型

```java
Comparator<String> comp
    = (first, second) // same as (String first, String second)
        ->first.length()- second.length();
```

### 6.2.3 函数式接口

对于只有一个抽象方法的接口, 需要这种接口对象的时候就可以提供一个 lambda 表达式. 这种接口叫函数式接口

当是一个方法的接口的时候, 可以使用函数式改写.

使用函数式写法可以减少对部分数据的调用

```
// 每次都会初始化
LocalDate hireDay = Objects.requireNonNullorElse(day, new LocalDate (1970, 1, 1));

// 当 day 为空的时候才返回数据
LocalDate hireDay = Dbjects.requireNonNullorElseGet(day，() -> new LocalDate(1970,1,1));
```

### 6.2.4 方法引用

使用方法引用来减少传参

![](https://file.wulicode.com/doc/20230511/1683791818580.png)

### 6.2.5 构造器引用

构造器引用的方法名称为 new, 例如 `Person::new` 是 Person 构造器的一个引用

```
ArrayList<string> names = ...;
Stream<Person> stream = names.stream().map(Person::new); 
List<Person> people = stream.collect(Collectors.tolist());
```

```
// 希望得到的是 Person[] 
Object[] people =strean.toArray[];
// 流库利用构造器引用解决了这个问题。可以把 Person[]::new 传人toArray 方法
Person[] people = stream.toArray(Person[]::new) ;
```

### 6.2.6 变量作用域

lambda 表达式可以捕获外围作用域中变量的值, java 中, 确保所捕获的值是明确定义的, 这里有一个重要的限制, 只能引用值不会改变的变量,
也就是捕获的变量必须实际上是事实最终变量(effectively final)

- this 当前类
- 值必须是不可变的

### 6.2.7 处理 lambda 表达式

可以实现的场景有

- 在独立的线程中运行
- 多次运行
- 在适当的位置运行(比如: 排序)
- 发送某种情况下运行
- 必要时候才运行

![](https://file.wulicode.com/doc/20230511/1683796721616.png)

![](https://file.wulicode.com/doc/20230511/1683796867741.png)

在自己设计接口的时候可以使用 @FunctionalInterface 注解来标记这个接口, 这样可以

- 如果有改变会报编译错误
- 另外可以在 javadoc 中指出哪个是函数式接口

### 6.2.8 再谈 Comparator

内容太多, 灵活运用吧

## 6.3 内部类

内部类是定义在类中的类, 原因

- 内部类对同一个包内的其他类隐藏
- 内部类方法可以访问定义这个类的作用域中的数据, 包括私有数据

### 6.3.1 使用内部类访问对象状态

内部类可以访问对象的数据

### 6.3.2 内部类的特殊语法规则

```java
// 外部访问内部
public void actionPerformed (ActionEvent event)
{
    if(TalkingClock.this.beep) Toolkit.getDefaultToolkit().beep();
}

// 内部访问外部
ActionListener listener = this.new TimePrinter();

// 在外围类的作用域之外, 可以这样引用内部类
var jabberer = new TalkingClock(1000, true);
TalkingClock.TimePrinter listener = jabberer.new TimePrinter();
```

### 6.3.3 内部类是否有用, 必要, 安全

有用, 必要, 除非刻意, 否则还是比较安全的

### 6.3.4 局部内部类

如题, 因为只在某方法中使用了一次,所以可以放到方法内去定义类, 称之为内部类, 这个优点是对外部完全隐藏

### 6.3.5 由外部方法访问变量

局部内部类可以访问外部类的字段, 还可以访问局部变量, 不过局部变量必须是事实最终变量

### 6.3.6 匿名内部类

创建一个类的新对象，这个类实现了 SuperType 接口，需要实现的方法在括号内定义

```
new SuperType(construction parameters)
{
    inner class methods and data    
}
```

这里 SuperType 可以是接口也可以是一个类, 接口则需要实现方法, 类则需要扩展这个类

### 6.3.7 静态内部类

内部类设定为 static, 则不会生成那个引用, 也只有内部类才可以设定为 static

## 6.4 服务加载器

看了, 但是没怎么看懂

## 6.5 代理[WIP]






























































