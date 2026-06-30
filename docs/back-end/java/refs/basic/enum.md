---
description: 'Java枚举（Enum）是一种类型安全的常量定义方式，支持方法、构造器、接口实现等特性。常用方法如values()、ordinal()等。高级用法包括枚举中的抽象方法和自定义行为。EnumSet和EnumMap是针对枚举的高效集合与映射实现。枚举可完美应用于switch语句中，且序列化与反序列化由JVM自动处理，保证单例性。'
lastUpdated: '2026-06-30 09:46:23'
head:
  - - meta
    - name: 'og:title'
      content: 'Enum 解读'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Java枚举（Enum）是一种类型安全的常量定义方式，支持方法、构造器、接口实现等特性。常用方法如values()、ordinal()等。高级用法包括枚举中的抽象方法和自定义行为。EnumSet和EnumMap是针对枚举的高效集合与映射实现。枚举可完美应用于switch语句中，且序列化与反序列化由JVM自动处理，保证单例性。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/basic/enum.html'
---
# Enum 解读

在 Java 里， `Enum` （枚举）属于特殊的类，其主要用途是把一组固定的常量组织起来。从 Java 5 开始， `Enum` 成为了 Java 语言的一部分，它让代码的可读性和安全性都得到了显著提升。下面为你详细介绍 Java 的 `Enum` ：

### 基本定义与特性

- **定义枚举类型** 借助 `enum` 关键字，能够创建一个枚举类。就像下面这样定义一个表示星期的枚举：
- **特性**

### 常用方法

枚举类默认拥有一些实用的方法，这些方法是从 `java.lang.Enum` 继承而来的：

- **`values()`** ：该方法会返回一个包含所有枚举常量的数组。
- **`valueOf(String name)`** ：此方法可根据名称获取对应的枚举常量。
- **`name()`** ：它会返回枚举常量的名称，返回值类型为 `String` 。
- **`ordinal()`** ：该方法返回枚举常量在定义时的序号，序号从 0 开始。

### 高级用法

- **带属性和方法的枚举** 你可以为枚举添加属性、构造方法以及自定义方法。使用示例：
- **实现接口** 枚举类可以实现接口，从而为每个常量提供不同的行为实现。
- **枚举中的抽象方法** 你可以在枚举中定义抽象方法，然后让每个常量各自实现该方法。使用示例：

### EnumSet 和 EnumMap

- **EnumSet** `EnumSet` 是专门为枚举类型设计的高性能 `Set` 实现，它内部以位向量的形式存储元素，具有高效的性能。
- **EnumMap** `EnumMap` 是专门针对枚举键设计的高性能 `Map` 实现，它的内部使用数组来存储值，查找速度非常快。

### 与 switch 结合使用

枚举非常适合与 `switch` 语句配合使用，能让代码更加简洁明了。

```Java
Day day = Day.WEDNESDAY;
switch (day) {
    case MONDAY:
        System.out.println("周一工作");
        break;
    case FRIDAY:
        System.out.println("周五加油");
        break;
    default:
        System.out.println("其他天");
}
```

### 序列化与反序列化

枚举常量在序列化时，仅仅是将其名称进行序列化，在反序列化时则会通过 `Enum.valueOf()` 方法获取对应的常量实例，这样就保证了枚举常量的唯一性。

### 总结

- **优点** ：提高代码的可读性和安全性，实现类型安全的常量，便于维护。
- **适用场景** ：适用于表示一组固定的常量，如星期、月份、状态码、配置项等。

枚举是 Java 中一种强大且类型安全的方式来表示常量集合，它不仅简化了代码，还能避免许多常见的错误。