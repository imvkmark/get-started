---
title: "mysql 的 float 和 decimal 的区别"
date: 2022-04-14 22:13:11
toc: true
categories:
- ["Mysql","FAQ"]
---

1. 表结构

![](https://file.wulicode.com/yuque/202208/24/23/1234LX46XhYm.png?x-oss-process=image/resize,h_114)

2. 测试insert 数据

![](https://file.wulicode.com/yuque/202208/24/23/1234SSBb0qUG.png?x-oss-process=image/resize,h_354)

3. 原因

< [http://www.dewen.io/q/1211](http://www.dewen.io/q/1211) >

float,double容易产生误差，对精确度要求比较高时，建议使用decimal来存，decimal在mysql内存是以字符串存储的，用于定义货币要求精确度高的数据。在数据迁移中，float(M,D)是非标准定义，最好不要这样使用。M为精度，D为标度。

mysql> create table t1(c1 float(10,2), c3 decimal(10,2));  

Query OK, 0 rows affected (0.02 sec)

mysql> insert into t1 values(1234567.23, 1234567.23);

Query OK, 1 row affected (0.01 sec)

mysql> select * from t1;

+------------+------------+

| c1 | c3 |

+------------+------------+

| 1234567.25 | 1234567.23 |  

+------------+------------+

1 row in set (0.02 sec)

mysql> insert into t1 values(9876543.21, 9876543.12);

Query OK, 1 row affected (0.00 sec)

mysql>  

mysql> select * from t1;

+------------+------------+

| c1 | c3 |

+------------+------------+

| 1234567.25 | 1234567.23 |  

| 9876543.00 | 9876543.12 |  

+------------+------------+

2 rows in set (0.00 sec)

不定义fload, double的精度和标度时，存储按给出的数值存储，这于OS和当前的硬件有关。

decimal默认为decimal(10,0)

因为误差问题，在程序中，少用浮点数做=比较，可以做range比较。如果数值比较，最好使用decimal类型。

精度中，符号不算在内：

mysql> insert into t1 values(-98765430.21, -98765430.12);

Query OK, 1 row affected (0.01 sec)

mysql> select * from t1;

+--------------+--------------+

| c1 | c3 |

+--------------+--------------+

| 1234567.25 | 1234567.23 |  

| 9876543.00 | 9876543.12 |  

| -98765432.00 | -98765430.12 |  

+--------------+--------------+

3 rows in set (0.00 sec)

float占4个字节，double占8个字节，decimail(M,D)占M+2个字节。

