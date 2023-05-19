---
title: "mysql - 全文检索"
date: 2021-06-26 10:37:08
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

全文检索在 MySQL 中就是一个 FULLTEXT 类型索引。FULLTEXT 索引用于   MyISAM 表(mysql 5.6+ 可以用于 innodb)，可以在 CREATE TABLE 时或之后使用 ALTER TABLE 或 CREATE INDEX 在 CHAR、 VARCHAR 或 TEXT 列上创建。对于大的数据库，将数据装载到一个没有 FULLTEXT 索引的表中，然后再使用 ALTER TABLE   (或 CREATE INDEX) 创建索引，这将是非常快的。将数据装载到一个已经有 FULLTEXT 索引的表中，将是非常慢的。

1.使用Mysql全文检索fulltext的先决条件

表的类型必须是MyISAM 或者 `mysql 5.6+` 使用 innodb<br />
建立全文检索的字段类型必须是`char`,`varchar`,`text`

2.建立全文检索先期配置

由于Mysql的默认配置是索引的词的长度是4,所以要支持中文单字的话,首先更改这个.<br />
`*Unix` 用户要修改 `my.cnf`,一般此文件在 `/etc/my.cnf`,如果没有找到,先查找一下`find / -name 'my.cnf'`

在[mysqld] 位置内加入:


```
[mysqld]
ft_min_word_len     = 2
```

3.建立全文检索

在建表中用FullText关键字标识字段,已存在的表用 ALTER TABLE (或 CREATE INDEX) 创建索引

```
CREATE fulltext INDEX index_name ON table_name(colum_name);
```

4.使用全文检索

在SELECT的WHERE字句中用MATCH函数,索引的关键词用AGAINST标识,IN BOOLEAN MODE是只有含有关键字就行,不用在乎位置,是不是起启位置.

```
SELECT * FROM pre_answer WHERE MATCH (keyword) AGAINST ('+福美来 +轮胎' IN BOOLEAN MODE);
select * from pre_answer WHERE match(`title`, `content`) AGAINST ( 'K5' IN BOOLEAN MODE)
```

