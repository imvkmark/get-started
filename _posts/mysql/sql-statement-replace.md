---
title: "REPLACE 语句"
date: 2022-04-14 22:12:02
toc: true
categories:
- ["Mysql","SQL 语句","数据操作语句"]
---

> 本文档基于 mysql 5.7 
> 





## Replace Into
`REPLACE` 的运行与 `INSERT` 很相像。只有一点除外，如果表中的一个旧记录与一个用于 `PRIMARY KEY` 或一个 `UNIQUE` 索引的新记录具有相同的值，则在新记录被插入之前，旧记录被删除。

除非表有一个 `PRIMARY KEY` 或 `UNIQUE` 索引，否则，使用一个REPLACE语句没有意义。该语句会与INSERT相同，因为没有索引被用于确定是否新行复制了其它的行。

所有列的值均取自在 `REPLACE` 语句中被指定的值。所有缺失的列被设置为各自的默认值，这和 `INSERT` 一样。你不能从当前行中引用值，也不能在新行中使用值。为了能够使用REPLACE，必须同时拥有表的 `INSERT` 和 `DELETE` 权限

`REPLACE` 语句会返回一个数，来指示受影响的行的数目。该数是被删除和被插入的行数的和。如果对于一个单行 `REPLACE` 该数为1，则一行被插入，同时没有行被删除。如果该数大于1，则在新行被插入前，有一个或多个旧行被删除。如果表包含多个唯一索引，并且新行复制了在不同的唯一索引中的不同旧行的值，则有可能是一个单一行替换了多个旧行。

受影响的行数可以容易地确定是否 `REPLACE` 只添加了一行，或者是否 `REPLACE` 也替换了其它行：检查该数是否为1（添加）或更大（替换）
```sql
drop table if exists demo_replace;
create table demo_replace
(
    id       int unsigned auto_increment comment 'ID' primary key,
    realname varchar(255) default '' comment '姓名',
    title    varchar(50)  default '' comment '标题',
    score    int unsigned default 0 comment '分值',
    unique index u_realname (realname)
) collate utf8mb4_general_ci;


-- 首次执行影响行数是 1, 再次执行, 影响行数是 2
replace demo_replace (title, realname) value ('title', 'REALNAME');
```

## Replace Set
这里进行设定值未指定的值为默认值, 并不能依据相关行的 score 的值来追加, 仅能根据默认值来设定值
```
mysql> replace set demo_replace score = score + 2;
+--+--------+-----+-----+
|id|realname|title|score|
+--+--------+-----+-----+
|8 |        |     |2    |
+--+--------+-----+-----+
```

