# MySQL - FAQ

## mysql Error 1040 too many connection解决办法

最近在开发的时候，突然出现1040 too many connection的错误，看错误的意思是连接的人数太多了。

当最大连接数比较小时，可能会出现以下错误
> 1040 too many connection

首先需要重启`mysql`服务，执行命令

```
# centos
service mysqld restart
# ubuntu
service mysql restart
# mac
brew services restart mysql
```

登录mysql

```
$ mysql -uroot -p
```

登录成功后执行以下语句查询当前的最大连接数：

```
select VARIABLE_VALUE from information_schema.GLOBAL_VARIABLES where VARIABLE_NAME='MAX_CONNECTIONS
```

执行以下语句修改最大连接数：

```
set global max_connections = 3600;
```

## 快速复制数据库

某些时候，例如为了搭建一个测试环境，或者克隆一个网站，需要复制一个已存在的mysql数据库。使用以下方法，可以非常简单地实现

假设已经存在的数据库名字叫db1，想要复制一份，命名为`newdb`。步骤如下：

**创建新的数据库 `newdb`**

```
$ mysql -u root -ppassword
mysql> CREATE DATABASE `newdb` DEFAULT CHARACTER SET UTF8 COLLATE UTF8_GENERAL_CI;
```

**使用 mysqldump 及 mysql 的命令组合，一次性完成复制**

```
$ mysqldump db1 -u root -ppassword --add-drop-table | mysql newdb -u root -ppassword
```

> 注意`-ppassword`参数的写法：`-p`后面直接跟密码，中间没有空格


以上是在同一台MySQL服务器上复制数据库的方法。如果要复制到远程另一台MySQL服务器上，可以使用mysql的 `-h 主机名/ip`
参数。前提是mysql允许远程连接，且远程复制的传输效率和时间可以接受。

```
$ mysqldump db1 -uroot -ppassword --add-drop-table | mysql -h 192.168.1.22 newdb -uroot -ppassword
```

## 删除字段可以批量删除

> 删除字段, 重建所有字段数据, 覆盖当前的数据

所以删除字段可以批量删除, 减少数据库运维的时间

5.4G 的数据表删除一个字段的执行时间大概是 15 分钟

![image.png](https://file.wulicode.com/yuque/202208/04/15/0003hgy1rgPL.png)

![image.png](https://file.wulicode.com/yuque/202208/04/15/0003YPUJaMxz.png)

数据库负载在这段时候的变化

![image.png](https://file.wulicode.com/yuque/202208/04/15/0003ACeqvW9R.png)

## [1071] Specified key was too long; max key length is 767 bytes

对业务数据进行重建, 需要从自建库更改到 RDS 库

在执行一条 sql 的时候出现
> [42000][1071] Specified key was too long; max key length is 767 bytes

```sql
alter table contract
   add constraint k_contract_id
      unique (contract_id) comment '合同编号'
```

不是版本问题，不是字符集问题，是数仓MySQL的某些参数限定了这个建表的唯一索引，通过各种查看数据库的参数发现，数仓的MySQL有一个参数配置：innodb_large_prefix

这个参数的解释是：表的字段索引长度限制，他有两个值：（ON、OFF），可以控制是否允许单列的索引长度超过767字节。

分析一下这个限制跟我有啥关系？`username` varchar（255），众所周知在utf8mb4的情况下存储会多耗用空间，mb4就是most bytes
4，这个字符格式是可以用来支持4字节的unicode的，varchar最大存放65535
bytes，对于username这种一段一看就是存用户名的，用户名存在较长的可能，假如这个开关是OFF，那么它最大能支持存的字节数是767，而varchar(
255)最大可以存65535缺的一位表示的是符号，那么明显已经超了，所以需要打开这个开关。

**解决** :

Mysql只是去SET GLOBAL innodb_large_prefix = ON
是可以的，不过阿里云RDS需要在运维后台手动修改这个参数，然后提交并重启，找OPS同事开启这个参数为ON，重启，发现是可以建表了，说明使用上是没啥问题了

不过继续刚才的问题，打开ON，就可以支持存65535字节的索引了吗，并不是，这个参数深一点的含义是扩展单列索引的长度，在Mysql
5.7版本中ON的话可以支持3072长度的单列索引，复合索引长度不变（复合索引最大长度也是3072）。

所以，以后在使用过程中如果发现建表就报Specified key was too long; max key length is 767
bytes，需要想到会不会是限定了字段索引长度导致的，这在做数据同步和迁移时可能还会再遇到

