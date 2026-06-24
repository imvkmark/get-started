---
description: 'MySQL出现1040 too many connections错误，因连接数过多。解决方法：重启MySQL服务（如service mysqld restart），登录后查询当前最大连接数（select VARIABLE_VALUE from information_schema.GLOBAL_VARIABLES where VARIABLE_NAME=''MAX_CONNECTIONS''），执行set global max_connections=3600;修改。'
lastUpdated: '2026-06-17 17:51:46'
head:
  - - meta
    - name: 'og:title'
      content: 'MySQL - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'MySQL出现1040 too many connections错误，因连接数过多。解决方法：重启MySQL服务（如service mysqld restart），登录后查询当前最大连接数（select VARIABLE_VALUE from information_schema.GLOBAL_VARIABLES where VARIABLE_NAME=''MAX_CONNECTIONS''），执行set global max_connections=3600;修改。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/mysql/faq.html'
---
# MySQL - FAQ

## 清单

MySQL 数据存储目录迁移

## FAQ

### mysql Error 1040 too many connection解决办法

最近在用SpringMVC开发的时候，突然出现1040 too many connection的错误，看错误的意思是连接的人数太多了。

当最大连接数比较小时，可能会出现以下错误 > 1040 too many connection

首先需要重启`mysql`服务，执行命令

```Plaintext
# centos
service mysqld restart
# ubuntu
service mysql restart
# mac
brew services restart mysql
```

登录mysql

```Plaintext
$ mysql -uroot -p
```

登录成功后执行以下语句查询当前的最大连接数：

```Plaintext
select VARIABLE_VALUE from information_schema.GLOBAL_VARIABLES where VARIABLE_NAME='MAX_CONNECTIONS
```

执行以下语句修改最大连接数：

```Plaintext
set global max_connections = 3600;
```

### [1071] Specified key was too long; max key length is 767 bytes

对业务数据进行重建, 需要从自建库更改到 RDS 库在执行一条 sql 的时候出现

> [42000][1071] Specified key was too long; max key length is 767 bytes

```SQL
alter table contract   add constraint k_contract_id unique (contract_id) comment '合同编号'
```

不是版本问题，不是字符集问题，是数仓MySQL的某些参数限定了这个建表的唯一索引，通过各种查看数据库的参数发现，数仓的MySQL有一个参数配置：innodb_large_prefix

这个参数的解释是：表的字段索引长度限制，他有两个值：（ON、OFF），可以控制是否允许单列的索引长度超过767字节。

分析一下这个限制跟我有啥关系？`username` varchar（255），众所周知在utf8mb4的情况下存储会多耗用空间，mb4就是most bytes 4，这个字符格式是可以用来支持4字节的unicode的，varchar最大存放65535 bytes，对于username这种一段一看就是存用户名的，用户名存在较长的可能，假如这个开关是OFF，那么它最大能支持存的字节数是767，而varchar(255)最大可以存65535缺的一位表示的是符号，那么明显已经超了，所以需要打开这个开关。

解决 :

Mysql只是去SET GLOBAL innodb_large_prefix = ON 是可以的，不过阿里云RDS需要在运维后台手动修改这个参数，然后提交并重启，找OPS同事开启这个参数为ON，重启，发现是可以建表了，说明使用上是没啥问题了

不过继续刚才的问题，打开ON，就可以支持存65535字节的索引了吗，并不是，这个参数深一点的含义是扩展单列索引的长度，在Mysql 5.7版本中ON的话可以支持3072长度的单列索引，复合索引长度不变（复合索引最大长度也是3072）。

所以，以后在使用过程中如果发现建表就报Specified key was too long; max key length is 767 bytes，需要想到会不会是限定了字段索引长度导致的，这在做数据同步和迁移时可能还会再遇到