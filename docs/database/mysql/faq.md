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


以上是在同一台MySQL服务器上复制数据库的方法。如果要复制到远程另一台MySQL服务器上，可以使用mysql的 `-h 主机名/ip`参数。前提是mysql允许远程连接，且远程复制的传输效率和时间可以接受。

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