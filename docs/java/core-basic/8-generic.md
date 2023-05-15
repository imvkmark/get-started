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















