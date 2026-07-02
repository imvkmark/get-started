---
description: '本章介绍数值类型的基础知识，包括数值字面量、运算符及程序、运算符优先级、数字的实际应用和基础表达式，为理解数值计算打下基础。'
lastUpdated: '2026-06-17 19:06:36'
head:
  - - meta
    - name: 'og:title'
      content: '第五章 数值类型'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本章介绍数值类型的基础知识，包括数值字面量、运算符及程序、运算符优先级、数字的实际应用和基础表达式，为理解数值计算打下基础。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/python/python-manual/5-int.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/8a128d435067e98cf631dc09a1fbecac.png'
---
# 第五章 数值类型

## 基础知识

数值并不是真的只是一种对象类型, 而是一组相似类型的分类, 完整的数值类型工具包括

```Plaintext
整数和浮点对象
复数对象  : 实数 + 虚数
小数 : 固定精度对象
分数 : 有理数对象
集合 : 带有数值运算的集合体
布尔 : True | False
内置函数和模块 : round, math, random
表达式; 无限整数精度, 位运算, 十六进制, 八进制, 二进制
三方扩展 : 向量, 库, 可视化, 作图
```

无理数 : 1. 不能写成两个数的比例 2. 小数部分无线延续而不重复

## 数值字面量

![](https://file.wulicode.com/feishu-images/8a128d435067e98cf631dc09a1fbecac.png)

## 运算符及程序

![](https://file.wulicode.com/feishu-images/b501ae0db5def9815450a474dd43c5e9.jpg)

### 运算符优先级

1. 遵循自然语言 高于 `+`
2. 使用括号来标明优先级
3. 混合类型向上转换 `30+12.8=42.8`

## 数字的实际应用

### 基础表达式