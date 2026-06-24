---
description: '根据提供的Java教程内容，涵盖了Integer、Character、String、StringBuffer、数组以及Date等数据类型的定义和初始化示例，展示了基本类型与对象的创建方式。'
lastUpdated: '2026-06-22 12:04:29'
head:
  - - meta
    - name: 'og:title'
      content: 'Java 学习 05 - 常用类'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '根据提供的Java教程内容，涵盖了Integer、Character、String、StringBuffer、数组以及Date等数据类型的定义和初始化示例，展示了基本类型与对象的创建方式。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/primer/5-defined-class.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/acd26a47bf811e08072076ef1876142d.png'
---
# Java 学习 05 - 常用类

根据教程里边的东西, 我统计了以下几个类或者分支

![](https://file.wulicode.com/feishu-images/acd26a47bf811e08072076ef1876142d.png)

### Number

```Plaintext
Integer x = 5;
```

### Character

```Plaintext
Character ch = new Character('a');
```

### String

```Plaintext
String greeting = "菜鸟教程";
char[] helloArray = {'r', 'u', 'n', 'o', 'o', 'b'};
String helloString = new String(helloArray);
```

### StringBuffer / StringBuilder

```Plaintext
StringBuffer sBuffer = new StringBuffer("菜鸟教程官网：");
```

### Array

数组的类型和数组的大小都是确定的.

```Plaintext
# way 1
dataType[] arrayRefVar = new dataType[arraySize];
# way2
dataType[] arrayRefVar = {value0, value1, ..., valuek};
```

### 日期

```Plaintext
Date(some ms)
```