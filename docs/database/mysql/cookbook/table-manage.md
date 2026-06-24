---
description: '本文介绍了表管理操作，包括克隆表结构与数据（创建表、插入数据、指定字段插入、查询新建、使用索引、修改结构及自增数据），使用临时表（创建、删除、唯一性临时表），以及检查或更改表的存储引擎（显示引擎、通过Information_Schema查看、Status、Create Table、修改引擎）。'
lastUpdated: '2026-06-17 17:51:05'
head:
  - - meta
    - name: 'og:title'
      content: '2.表管理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了表管理操作，包括克隆表结构与数据（创建表、插入数据、指定字段插入、查询新建、使用索引、修改结构及自增数据），使用临时表（创建、删除、唯一性临时表），以及检查或更改表的存储引擎（显示引擎、通过Information_Schema查看、Status、Create Table、修改引擎）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/mysql/cookbook/table-manage.html'
---
# 2.表管理

### 4.1 克隆表结构和数据

```Plaintext
# 创建表结构
Create Table new_table Like ori_table
# 表数据插入
Insert Into new_table Select * From ori_table Where ...
# 表数据指定字段插入
Insert Into new_table(col_a, col_b) Select col_c,col_d From ori_table Where ...
# 查询并且新建
Create Table new_table Select col_a, col_b From ori_table
# 新建表并使用索引
Create Table new_table(Primary Key (id), Index (state, city)) Select id, state, city From ori_table
# 创建数据表并修改结构
Create Table new_table(Primary Key (id), Index (state, city)) Select id, state, city From ori_table;
Alt Table new_table Modify id Int Unsigned Not Null Auto_Increment;
# 修改表的自增数据
alter table tb_name AUTO_INCREMENT = 100000;
```

### 4.2 使用临时表

```Plaintext
# 创建临时表
Create Temporary Table tbl_name (...col define ...)
```

不同的数据库连接可以创建同名的临时表, 这些表之间不互相影响. 临时表对数据库连接生效如果临时表没有删除则在下次使用的时候会报错, 所以使用前最好先对数据表是否存在做相应的判定.

```Plaintext
# 删除
Drop Temporary Table If Exists tbl_name
```

```Plaintext
# 唯一性临时表
Select Connection_Id();
```

### 4.3 检查或者改变某个表的搜索引擎

```Plaintext
# 显示引擎
# From Information_Schema
Select Engine From Information_Schema.tables
   Where Table_Schema = 'cookbook' And Table_Name ='cookers';
# Status
Show Table Status Like 'cookers';
# Create Table
Show Create Table cookers;
```

```Plaintext
# 修改引擎
Alt Table cookers Engine = InnoDb
```