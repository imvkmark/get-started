---
title: "FAQ"
date: 2022-04-26 16:26:16
toc: true
categories:
- ["Mysql"]
---

## [1071] Specified key was too long; max key length is 767 bytes

对业务数据进行重建, 需要从自建库更改到 RDS 库<br />在执行一条 sql 的时候出现
> [42000][1071] Specified key was too long; max key length is 767 bytes


```sql
alter table contract
   add constraint k_contract_id
      unique (contract_id) comment '合同编号'
```

不是版本问题，不是字符集问题，是数仓MySQL的某些参数限定了这个建表的唯一索引，通过各种查看数据库的参数发现，数仓的MySQL有一个参数配置：innodb_large_prefix

这个参数的解释是：表的字段索引长度限制，他有两个值：（ON、OFF），可以控制是否允许单列的索引长度超过767字节。

分析一下这个限制跟我有啥关系？`username` varchar（255），众所周知在utf8mb4的情况下存储会多耗用空间，mb4就是most bytes 4，这个字符格式是可以用来支持4字节的unicode的，varchar最大存放65535 bytes，对于username这种一段一看就是存用户名的，用户名存在较长的可能，假如这个开关是OFF，那么它最大能支持存的字节数是767，而varchar(255)最大可以存65535缺的一位表示的是符号，那么明显已经超了，所以需要打开这个开关。

解决 : <br />Mysql只是去SET GLOBAL innodb_large_prefix = ON 是可以的，不过阿里云RDS需要在运维后台手动修改这个参数，然后提交并重启，找OPS同事开启这个参数为ON，重启，发现是可以建表了，说明使用上是没啥问题了

不过继续刚才的问题，打开ON，就可以支持存65535字节的索引了吗，并不是，这个参数深一点的含义是扩展单列索引的长度，在Mysql 5.7版本中ON的话可以支持3072长度的单列索引，复合索引长度不变（复合索引最大长度也是3072）。

所以，以后在使用过程中如果发现建表就报Specified key was too long; max key length is 767 bytes，需要想到会不会是限定了字段索引长度导致的，这在做数据同步和迁移时可能还会再遇到<br />[<br />](https://blog.csdn.net/ygyblue2/article/details/105530459)

