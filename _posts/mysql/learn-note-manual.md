---
title: "Mysql学习笔记- 手册篇"
date: 2022-04-14 22:12:07
toc: true
categories:
- ["Mysql","FAQ"]
---

3.教程

要想找出正好包含5个字符的名字，使用“_”模式字符：

SELECT * FROM pet WHERE name LIKE '_____';

正则匹配

     .        任意单字符

     [abc]    一个单字符

     [0-9]    数字

     *        0个或者多个

     +        1或多个

     ?        0或者1

     ab|bc    或匹配

     ^        字符开头

     $        字符结尾

     {n}      重复N次

     {n,m}    n-m次

     [=character_class=]

     [:character_class:] 


| alnum | 文字数字字符 |
| --- | --- |
| alpha | 文字字符 |
| blank | 空白字符 |
| cntrl | 控制字符 |
| digit | 数字字符 |
| graph | 图形字符 |
| lower | 小写文字字符 |
| print | 图形或空格字符 |
| punct | 标点字符 |
| space | 空格、制表符、新行、和回车 |
| upper | 大写文字字符 |
| xdigit | 十六进制数字字符 |


     [[:<:]], [[:>:]]

          word边界

     \          转义

BINARY 关键字强制区分大小写

SELECT * FROM pet WHERE name REGEXP BINARY '^b'

采用如下方式装载记录

LOAD DATA LOCAL INFILE 'event.txt' INTO TABLE event;

source filename;  # 这里是sql语句

数据表的操作

SHOW DATABASES;   # 显示所有数据库

SHOW DATABASE();  # 显示当前数据库

SHOW TABLES;      # 显示所有表

DESCRIBE pet;     # 显示一个表结构

变量

SELECT @min_price:=MIN(price),@max_price:=MAX(price) FROM shop;

SELECT * FROM shop WHERE price=@min_price OR price=@max_price;

select @mid:=max(id) from mk_app_data;

INSERT INTO `mk_app_data` VALUES (@mid+1,'xxxxx');

3.6.8 根据天计算访问量

SELECT year,month,BIT_COUNT(BIT_OR(1<<day)) AS days FROM t1 GROUP BY year,month;

4. 程序介绍

make_binary_distribution                  #可以生成编译过的MySQL的二进制版本

mysqlbug                                  #MySQL 缺陷报告脚本

mysql_fix_ privilege_tables               #更改授权表

5.0 mysql 服务器和服务器启动脚本




#服务器支持哪个存储引擎

SHOW ENGINES;

#检查你感兴趣的存储引擎的变量值

SHOW VARIABLES LIKE 'have%';

=5.0=










插件

安装包控制(Sublime Package Control)

$ npminstallspm**-**g



