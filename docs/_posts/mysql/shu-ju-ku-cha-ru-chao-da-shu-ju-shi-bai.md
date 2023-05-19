---
title: "数据库插入超大数据失败"
date: 2021-06-26 10:36:17
toc: true
categories:
- ["Mysql"]
---

数据插入时候数据库连接中断


```sql
/* SQL错误（2013）：Lost connection to MySQL server during query */
/* Affected rows: 0  已找到记录: 0  警告: 0  持续时间 0 of 1 query: 0.000 sec. */
/* 到 127.0.0.1 的连接于 2014-09-03 08:24:07 关闭 */
/* 连接到 127.0.0.1 （经由 MySQL (TCP/IP)），用户名 root，密码：No ... */
/* 已连接。线程ID：12 */
```

经查询是由于以上这条数据出现导致的<br />
这样单条的数据文件有 1.2 M<br />
而服务器中的配置文件之后 1M， 更改为16M， 问题解决

```ini
[mysqld]
max_allowed_packet = 1M
```

![](https://file.wulicode.com/yuque/202208/04/23/3954UgwUznco.jpeg)

原文：

> 缘由: 在查询Mysql中的数据库，或者修改比较大的表的时候就会出现这种情况；<br />
google之：<br />
方案1.在mysql配置文件[myslqd]下面添加一行设置skip-name-resolve.需要重启mysql服务.<br />
方案2.在hosts文件内添加:　ip与主机名的映射关系,如: 127.0.0.1      localhost.　这种方式不用重启mysql服务.


三个层面上解决这个问题：

1. 代码层面，你需要在自己的PHP数据库连接处增加大致如下代码。

```
if(in_array(mysql_errno(), array(2006, 2013))){
    mysql_close();
    mysql_connect(...);
    mysql_query(...);
}
```

也就是说遇到2006,2013错误就重新连接一下MySQL。<br />
2) MySQL层面，需要配置一些参数 my.cnf （但是这里是linux下，我的windows配置怎么办？）

```
#超时时间  如600秒
wait_timeout = x  
#最大允许数据量
max_allowed_packet = y
```

适当增加x,y的值。<br />
3) 一般出现这种情况不是所有例句而是单个表，请你先修复表一般都能解决这类问题。<br />
MySQL Error 2013: Lost connection to MySQL server during query<br />
错误代码: 1153 - Got a packet bigger than 'max_allowed_packet' bytes<br />
解决方法：<br />
修改mysql.ini（网上都说是这个文件，找了N久终于知道在哪里了，我的目录是在 D:\MySQL_Data\MySQL Server 5.5 在MySQL_Data文件夹下）文件添加如下代码即可

```
max_allowed_packet=500M
```

如果不可以的话就修改D:\MySQL\MySQL Server 5.5\my-huge.ini<br />
里的max_allowed_packet=16M 把16改为500<br />
我是根据此方法做的，试试<br />
4) 可以直接在mysql中设置：

```
#show variables like '%timeout%';
#show variables like 'max_allowed_packet'
set global wait_timeout=60000;
#set global max_allowed_packet = 2*1024*1024
```

