---
title: "INSERT 语句"
date: 2022-08-30 21:24:19
toc: true
categories:
- ["Mysql","SQL 语句","数据操作语句"]
---

## INSERT ... ON DUPLICATE KEY UPDATE
在 `MySQL` 数据库中，如果在insert语句后面带上`ON DUPLICATE KEY UPDATE` 子句，而要插入的行与表中现有记录的唯一索引或主键中产生重复值，那么就会发生旧行的更新；如果插入的行数据与现有表中记录的唯一索引或者主键不重复，则执行新纪录插入操作。
> 如果一个表中既有 primary key 又有unique 索引, 仅仅是 pk 生效

影响

- 如果是插入操作，受到影响行的值为1；
- 如果更新操作，受到影响行的值为2；
- 如果更新的数据和已有的数据一样（就相当于没变，所有值保持不变），受到影响的行的值为0

```sql
drop table if exists demo_replace;
create table demo_replace
(
    id       int unsigned auto_increment comment 'ID' primary key,
    realname varchar(255) default '' comment '姓名',
    score    int unsigned default 0 comment '分值',
    unique index u_realname (realname)
) collate utf8mb4_general_ci;

-- 执行数据
insert demo_replace (realname, score) value ('real-1', 20) on duplicate key update score = score + 1;
-- 第一次, 插入数据
-- 第二次, 更新数据 score + 1, 同时更新 auto_increment 的值

insert demo_replace (realname, score) value ('real-2', 20) on duplicate key update score = score + 1;
-- 插入第二条数据, id 的值为 3

-- 执行结果
-- +--+--------+-----+
-- |id|realname|score|
-- +--+--------+-----+
-- |1 |real-1  |21   |
-- |3 |real-2  |20   |
-- +--+--------+-----+
```

