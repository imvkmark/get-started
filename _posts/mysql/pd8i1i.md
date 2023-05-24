---
title: "MySQL 命令"
date: 2022-08-30 11:56:14
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

显示字符集



```
// 显示字符集
mysql> show collation;

// 显示匹配的字符集
mysql> show collation where Collation like 'utf8mb4%';
+--------------------+-------+---+-------+--------+-------+
|Collation           |Charset|Id |Default|Compiled|Sortlen|
+--------------------+-------+---+-------+--------+-------+
|utf8mb4_general_ci  |utf8mb4|45 |Yes    |Yes     |1      |
|utf8mb4_bin         |utf8mb4|46 |       |Yes     |1      |
|utf8mb4_unicode_ci  |utf8mb4|224|       |Yes     |8      |
|utf8mb4_icelandic_ci|utf8mb4|225|       |Yes     |8      |
+--------------------+-------+---+-------+--------+-------+
```

