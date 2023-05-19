# 5. 继承

## 5.1 类, 超类和子类

继承是 `is-a` 的明显特征

### 5.1.1 定义子类

超类和子类的名称来源于计算机科学中的集合术语: 超集和子集

- 超类(super class), 基类(base class), 父类 (parent class)
- 子类(sub class), 派生类(derived class), 孩子类(child class)

### 5.1.2 覆盖方法

使用 `super.getSalary()` 调用父类方法, 使用 `super()` 调用父类的构造函数

### 5.1.3 子类构造器

由于子类不能访问父类的私有字段, 所以必须通过构造器来初始化这些私有字段

如果没有显示调用超类的构造器, 将自动调用超类的无参数构造器, 如果超类中没有无参数构造器, 将报一个编译错误

```java
public Manager (String name, double salary, int year, int month, int day) 
{
    super(name, salary, year, month, day); 
    bonus = 0;
}
```

一个对象变量可以只是出多种类型的现象叫做多态, 在运行时候能够选择适当的方法, 成为动态绑定.

### 5.1.4 继承层次

继承不限于一个层次

### 5.1.5 多态

`is-a` 规则的定义中表述是替换原则(substitution principle), 超类出现的地方都可以用子类对象替换

子类引用的数组可以转换成超类已禁用的数组, 而不需要使用强制类型转换

### 5.1.6 理解方法调用

覆盖方法的时候, 子类方法不能低于超类方法的可见性

### 5.1.7 阻止继承: final 类和方法

final 不允许类继承和方法重写和字段数据改写

### 5.1.8 强制类型转换

基本类型转换

```
// 基本类型
double x = 3.14;
int nx = (int) x;

// 对象类型
Manager boss = (Manager) staff[0];
```

如果遇到强制类型转换的时候可以使用 instanceof 操作符, 来确定下类型

```
if (staff[1] instanceof Manager) 
{
   boss= (Manager) staff[1];
}
```

- 所以强制转换只能在继承中设置强制转换
- 在强制转换前应当使用 instanceof 操作符去做检测

### 5.1.9 抽象类

为了更清晰的表现程序设计, 所以抽象类会比较有价值

- 包含抽象方法的类必须是抽象类
- 抽象类不能被实例化

```
public abstract class Person 
{
    public abstract String getDescription();
} 
```

### 5.1.10 受保护访问

- 仅对本类可见 - private。
- 对外部完全可见 - public。
- 对本包和所有子类可见 - protected.
- 对本包可见 - 默认(很遗憾)，不需要修饰符

## 5.2 Object 所有类的超类

### 5.2.1 Object 类型的变量

- 基本类型不是对象(数值, 字符, bool)

### 5.2.2 equals 方法

对象的相等采用引用的方式来进行对比

### 5.2.3 相等测试与继承

Java 语言规范要求 equals 有以下特性

- 自反性
- 对称性
- 传递性
- 一致性
- 任意对象 `x.equals(null)` 应该返回 false

数组对比可以是用 `Array.equals()`

### 5.2.4 hashCode 方法

散列码是有对象导出的一个整形值, 用来方便插入散列值

```
Object.hashCode() // 每个对象都有自己的实现

Objects.hash(name, sallary, hireDay);

Objects.hashCode(employee)
```

### 5.2.5 toString 方法

返回对象值的一个字符串, 建议每个自定义类都添加一个 toString 方法

## 5.3 泛型数组列表

ArrayList 是一个有类型参数(type parameter) 和泛型类 (generic class), 为了指定数组列表保存的元素对象的类型, 需要用尖括号将类名括起来追加到 `ArrayList` 后边,
例如 `ArrayList<Employee>`

### 5.3.1 声明数组列表

这种尖括号的语法称之为菱形语法

```java
// 声明和构造一个保存 `Employee` 对象的数组列表 : 
ArrayList<Employee> staff = new ArrayList<Employee> ();

// 在Java 10 中，最好使用 var 关键字以避免重复写类名: 
var staff = new ArrayList<Employee>();

// 如果没有使用 var 关键字，可以省去右边的类型参数: 
ArrayList <Employee> staff = new ArrayList();

// 可以指定容量, 指定容量的前 xx 此开销不会带来开销很大的重新分配空间
ArrayList <Employee> staff = new ArrayList(100);
```

添加数据

```java
ArrayList <Employee> staff = new ArrayList(100);
staff.add(new Employee());
```

### 5.3.2 访问数组列表元素

不能使用我们喜爱的 `[]` 语法格式访问或政变数组的元素，而要使用 get 和 set 方法

```java
// 仅当 i 有值的时候才能够设置
staff.set(i , harry);

// 获取
Employee e = (Employee) staff.get(i) ;

// 添加
staff.add(new Employee());
staff.add(i, new Employee());
staff.remove(i);
```

同样数组也会遇到性能的问题, 在较小的数组上操作添加和删除不需要考虑性能, 如果是特别大的数组则需要使用链表来进行操作

### 5.3.3 类型化与原始数组的兼容性

原始数组转为类型化的时候会不可避免的出现警告信息

```
// 原始数组转换为类型化列表
ArrayList<Employee> result = employeeDB.find(query); // yields warning

// 使用强制类型转换并不能避免出现警告信息
ArrayList<Employee> result = (ArrayList<Employee>)employeeDB.find(query); // yields another warning
```

```
// 使用注解来表姐接受强制类型转换的变量
@SuppressWarnings("unchecked") ArrayList<Employee> result 
    = (ArrayList<Employee>)employeeDB.find(query);
```

## 5.4 对象包装器和自动装箱

将基本类型转换为对象, 这里使用到的类便可以成为包装器, 包装器一旦构造, 就不允许更改包装器在其中的值

Number(Integer、Long、Float、Double、Short、Byte)、Character和 Boolean

很容易地向 `Arraylist<Integer>` 中添加 int 类型的元素。下面这个调用

```
list.add(3);
```

将自动地变换成

```
list.add(Integer.value0f(3));
```

这种变换称为自动装箱 (autoboxing)

## 5.5 参数数量可变的方法

```
public class PrintStream
{
    public Printstream printf(String fnt, Object... args){
        return format(fnt,args);
    }
}
```

这里的 args 表示可以接收任意数量的对象, 这里的 `Object...` 和 `Object[]` 完全一样

我们可以通过类似的方式设置变参

## 5.6 枚举类

```java
public enum Size
{
    SMALL("S"), MEDIUM("M"), LARGE("L"), EXTRA_LARGE("XL");
    private String abbreviation;
    
    // 枚举的构造器总是私有的
    private Size(String abbreviation) { this.abbreviation = abbreviation; }
    public String getAbbreviation() { return abbreviation; } 
}
```

```java
Size.SMALL.toString()                // 返回字符串
Enum.valueof(Size.class, "SMALL")    // 静态方法返回数据

// 获取所有的值
Size.values();
```

## 5.7 反射[WIP]

能够分析类能力的程序称为反射, 这个和 php 的 reflection 有关系

## 5.8 继承的设计技巧

- 将公共操作和字段放在超类中
- 不要使用受保护的字段(包访问和子级访问会破坏封装)
- 使用继承使用 `is-a` 关系
- 除非所有的继承的方法都有意义, 否则不要使用继承
- 在覆盖方法时, 不要改变预期的行为
- 使用多态, 而不要使用类型信息
- 不要滥用反射

































