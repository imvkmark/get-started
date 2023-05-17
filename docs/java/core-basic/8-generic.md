---
outline : 'deep'
---

# 8.泛型程序设计

## 8.1 为什么要使用泛型程序设计

### 8.1.1 类型参数的好处

使用类型参数让代码有更高的可读性, 让程序更宜读也更安全

```
var files = new ArrayList<string>();
```

### 8.1.2 谁想成为泛型程序员

## 8.2 定义简单泛型

```java
public class Pair<T, U> 
{
    private T first;
    private T second;
    private U third;
    
    public Pair() { first = null; second = null }
    public Pair(T first, T second){ this.first = first;this.second= second;}
    
    public T getFirst() { return first; } 
    public T getSecond() { return second; }
    public void setfirst(T newValue) { first = newValue; }
    public void setSecond(T newValue) { second = newValue; } 
}
```

泛型是普通类的工厂

## 8.3 泛型方法

```
String middle = ArrayALg.<string> getMiddle("john", "Q.","Public");
```

## 8.4 类型变量的限定

限制 T 只能是实现了 Comparable 接口

```
// 限定类型
public static <T extends Comparable> T min(T[] a) . . .

// 多个限定
public static <T extends Comparable & Serializable> T min(T[] a) . . .
```

## 8.5 泛型代码和虚拟机

### 8.5.1 类型擦除

虚拟机在处理的时候会擦除掉类型

### 8.5.2 转换泛型表达式

转换泛型表达式的两个步骤是

- 转换为普通的类型
- 强制转换为 Employee 类型

### 8.5.3 转换泛型方法

- 虚拟机中没有泛型, 只有普通的类和方法
- 类型残水会替换为他们的限定类型
- 会合成桥方法来保持多态
- 为保持类型安全性, 必须时候会插入强制类型转换

### 8.5.4 调用遗留代码

在使用泛型的时候可能会遇到数据转换异常的情况, 这种情况可以使用 `@SuppressWarnings("unchecked")` 来进行忽略

## 8.6 [WIP]限制与局限性

### 8.6.1 不能用基本类型实例化类型参数

原因在于类型擦除, 擦除之后, Pair 类含有 Object 类型的字段, 而 Object 类

```diff
- Pair<double>
+ Pair<Double>
```

### 8.6.2 运行时类型查询只适用于原始类型

虚拟机中的对象总有一个特定的非泛型类型, 因此所有类型查询只产生原始类型

同样的道理, `getClass` 方法总是返回原始类型

### 8.6.3 不能创建参数化类型的数组

可以声明 `Pair<string>[]` 的变量, 但是不能用 `new Pair<string>[10]` 初始化这个变量

### 8.6.4 Varargs 警告

### 8.6.5 不能实例化类型变量

### 8.6.6 不能构造泛型数组

### 8.6.7 泛型类的静态上下文中的类型变量无效

不能在静态字段或方法中引用类型变量

### 8.6.8 不能抛出或捕获泛型类的实例

### 8.6.9 可以取消对检查型异常的检查

### 8.6.10 注意擦除后的冲突

## 8.7 [WIP]泛型类型的继承规则

## 8.8 [WIP]通配符类型

### 8.8.1 通配符概念

允许类型参数发生变化, 这个可能更类似于 php 中的 "更灵活" 的接口约定

```
Pair<? extends Employee>
```

### 8.8.2 通配符的超类型限定

这个限定为所有 Manager 的超类型

```
? super Manager
```

### 8.8.3 无限定通配符

### 8.8.4 通配符捕获

### 8.9 [WIP]反射和泛型











