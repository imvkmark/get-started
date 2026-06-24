---
description: '该内容主要讲解数据库统计函数（如Count、Min、Max等）及分组函数（忽略Null值，Having用于分组后筛选），With RollUp实现汇总统计；同时介绍元数据的使用方法（检查数据库、表、列信息），显示表结构，获取服务器元数据及支持的存储引擎。'
lastUpdated: '2026-06-17 17:51:20'
head:
  - - meta
    - name: 'og:title'
      content: '6.函数'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容主要讲解数据库统计函数（如Count、Min、Max等）及分组函数（忽略Null值，Having用于分组后筛选），With RollUp实现汇总统计；同时介绍元数据的使用方法（检查数据库、表、列信息），显示表结构，获取服务器元数据及支持的存储引擎。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/mysql/cookbook/function.html'
---
# 6.函数

### 8.1 各种统计函数

```Plaintext
# 总数
Count(*)
# Count + If 组合
Count(If(DayOfWeek(trav_date) In (1, 7), 1, Null))
# 最小
Min()
# 最大
Max()
# 总数
Sum()
# 平均
Avg()
# 唯一值
Distinct()
# 子群/分组/聚类函数
# 聚类函数会忽略 Null 值
... Group By trav_date
# 子群/分组/聚类函数选择
# Having 的操作是在已经做好分组的基础上进行的筛选
... Group By trav_date Having Count(*) > 3
```

### 8.2 With RollUp 进行汇总统计

在分组统计数据的基础上再进行统计汇总，即用来得到 group by 的汇总信息数据表操作对应信息

| Information_Schema 表 | Show |
|-|-|
| Schemata | Show Database |
| Tables | Show Tables |
| Columns | Show Columns |

### 9.1 如何正确的使用元数据

```Plaintext
# 确定数据库是否存在
Select Schema_Name
    From Information_Schema.Schemata
    Where Schema_Name = ?
# 确定数据表是否存在
Select Table_Name
    From Information_Schema.Tables
    Where Schema_Name = ? and Table_Name = ?
# 列信息
Select *
    From Information_Schema.Columns
    Where Table_Schema = ? and Table_Name = ?
        And Column_Name = ?
```

### 9.2 显示创建数据表结构

```Plaintext
# 显示创建数据表结构
Show Create Table tbl_name;
# 显示列
Show Columns From tbl_name;
```

### 9.3 获取服务器元数据

| 语句 | 语句生成的信息 |
|-|-|
| `Select Version()` | 服务器版本 |
| `Select Database()` | 默认的数据库名称 |
| `Select User()` | 客户端连接时候给出的当前用户 |
| `Select Current_User()` | 用来检查客户端权限 |
| `Show [Global] Status` | 服务器的全局状态指示器, 没有 Global 显示当前 |
| `Show Variables` | 服务器配置变量 |

### 9.4 确定服务器支持的存储引擎

```Plaintext
Show Engines;
```

| version() | 5.2.24-log |  |
|-|-|-|
| current_datecurdate() | 2014-01-31 |  |
| now() | 2014-01-31 22:16:18 |  |
| user() | odbc@localhost |  |
| year(current_date)year(curdate()) | 2014 |  |
| right(curdate(),5) | 02-01 |  |
| month(curdate()) | 2 |  |
| dayofmonth(curdate()) | 1 | 一个月中的第几天 |
| MONTH(DATE_ADD(CURDATE(),INTERVAL 1 MONTH))MOD(MONTH(CURDATE()), 12) + 1 | 3 | 下个月 |
| datebase() | test | 数据库 |