---
title: "mysql 事务"
date: 2021-06-26 10:36:42
toc: true
categories:
- ["Mysql","Mysql 基础"]
---

> 事务处理在各种管理系统中都有着广泛的应用，比如人员管理系统，很多同步数据库操作大都需要用到事务处理。比如说，在人员管理系统中，你删除一个人员，你即需要删除人员的基本资料，也要删除和该人员相关的信息，如信箱，文章等等，这样，这些数据库操作语句就构成一个事务！<br />删除的SQL语句



```
delete from userinfo where ..
delete from mail where ..
delete from article where ...
```

> 如果没有事务处理，在你删除的过程中，假设出错了，只执行了第一句，那么其后果是难以想象的, 但用事务处理。如果删除出错，你只要rollback就可以取消删除操作（其实是只要你没有commit你就没有确实的执行该删除操作）<br />一般来说，在商务级的应用中，都必须考虑事务处理的！



#### mysql事务处理的支持检测

> MYSQL中只有INNODB和BDB类型的数据表才能支持事务处理！其他的类型是不支持的！（切记！）<br />![](https://file.wulicode.com/yuque/202208/04/15/3632g40QobG3.jpeg)



#### MYSQL的事务处理主要有两种方法

1. 用begin,rollback,commit来实现<br />`begin` 开始一个事务<br />`rollback` 事务回滚<br />`commit`  事务确认
2. 直接用set来改变mysql的自动提交模式<br />MYSQL默认是自动提交的，也就是你提交一个QUERY，它就直接执行！我们可以通过<br />`set autocommit=0`  禁止自动提交<br />`set autocommit=1` 开启自动提交<br />来实现事务的处理。<br />但注意当你用 `set autocommit=0` 的时候，你以后所有的SQL都将做为事务处理，直到你用commit确认或rollback结束，注意当你结束这个事务的同时也开启了个新的事务！按第一种方法只将当前的作为一个事务！<br />**个人推荐使用第一种方法！**


#### 语句

**开始**

```
# 开始
BEGIN;
START TRANSACTION;

# 提交
COMMIT;

# 回滚
ROLLBACK;
```

**终止mysql事务的语句**

```
ALTER TABLE
BEGIN
START TRANSACTION
CREATE INDEX
DROP DATABASE
DROP TABLE
LOCK TABLES
RENAME TABLE
TRUNCATE
UNLOCK TABLES
```


#### 查询当前是否开启

检测是否开启<br />![](https://file.wulicode.com/yuque/202208/04/15/3632IDRmtBWx.jpeg)

设置关闭<br />![](https://file.wulicode.com/yuque/202208/04/15/3633n8T7pRhO.jpeg)

