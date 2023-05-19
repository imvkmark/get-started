---
title: "mysql - 数据类型"
date: 2021-06-26 10:36:22
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

[@(Mysql) ](/Mysql) 



#### INT 整数


#### REAL 浮点数


#### CHAR(length) 定长字符串


#### VARCHAR(length) 变长字符值


#### TEXT(length) 变长字符值


#### DATE  标准日期值, 存储[0000-00-00] - [9999-12-31] 的日期至


#### TIME  标准时间值, 存储于日期无关的一天的时间


#### 二进制数据

> 字符类型和对应的二进制类型之间的区别在于编码的原理不同, 二进制数据主要是一大块数据, mysql对此不进行解释. 相反字符乐行的数据则假定为人类字符的文本数据, 因此他会被编码, 并基于所使用的字符集进行排序


```
CHAR BINARY
VARCHAR BINARY
TINYBLOB
BLOB
MEDIUMBLOB
LONGBLOB
```


#### 枚举和集合

**枚举**

> 必须是指定值中的一个<br />
ENUM('male','female');


**集合**

> SET



#### 扩展阅读

**数据类型比较**

> 表中tinytext-longtext所存储的存储空间多一个字节, 是因为需要多用额外的字节来存储字符的长

| 数据类型 | 存储 144 个字符的字符串 | 存储30个字符的字符串 | 最大字符串长度 |
| --- | --- | --- | --- |
| CHAR(150) | 150 | 150 | 255 |
| VARCHAR(150) | 145 | 31 | 255 |
| TINYTEXT(150) | 145 | 31 | 255 |
| TEXT(150) | 146 | 32 | 65535 |
| MEDIUMTEXT(150) | 147 | 33 | 16777215 |
| LONGTEXT(150) | 148 | 34 | 4294967295 |
