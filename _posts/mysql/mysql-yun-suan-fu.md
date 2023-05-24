---
title: "mysql 运算符"
date: 2021-06-26 10:36:27
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

### 运算符
| 运算符 | 上下文 | 描述 |
| --- | --- | --- |
| + | 算术 | 加法 |
| - | 算术 | 减法 |
| * | 算术 | 乘法 |
| / | 算术 | 除法 |
| = | 比较 | 相等 |
| <>, != | 比较 | 不相等 |
| < | 比较 | 小于 |
| > | 比较 | 大于 |
| <= | 比较 | 小于或等于 |
| >= | 比较 | 大于或等于 |
| AND | 逻辑 | 与 |
| OR | 逻辑 | 或 |
| NOT | 逻辑 | 非 |






### 运算符优先级

1. BINARY
2. NOT, !
3. 

   - (负号)
4. *, /, %
5. +, -
6. <<, >>
7. &
8. |
9. <, <=, >, >=, =, <=>, <>, IN, IS, LIKE, REGEXP, RLIKE
10. BETWEEN
11. AND, &&
12. OR, ||


### null 运算符

```
SELECT title FROM books WHERE author IS NOT NULL
```

