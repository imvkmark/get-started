---
title: "Mysql学习笔记- 手册篇"
date: 2022-04-14 22:12:07
toc: true
categories:
- ["Mysql","FAQ"]
---

3.教程

要想找出正好包含5个字符的名字，使用“_”模式字符：<br />SELECT * FROM pet WHERE name LIKE '_____';<br />正则匹配<br />     .        任意单字符<br />     [abc]    一个单字符<br />     [0-9]    数字<br />     *        0个或者多个<br />     +        1或多个<br />     ?        0或者1<br />     ab|bc    或匹配<br />     ^        字符开头<br />     $        字符结尾<br />     {n}      重复N次<br />     {n,m}    n-m次<br />     [=character_class=]<br />     [:character_class:] 


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


     [[:<:]], [[:>:]]<br />          word边界<br />     \          转义

BINARY 关键字强制区分大小写<br />SELECT * FROM pet WHERE name REGEXP BINARY '^b'<br />采用如下方式装载记录<br />LOAD DATA LOCAL INFILE 'event.txt' INTO TABLE event;<br />source filename;  # 这里是sql语句<br />数据表的操作<br />SHOW DATABASES;   # 显示所有数据库<br />SHOW DATABASE();  # 显示当前数据库<br />SHOW TABLES;      # 显示所有表<br />DESCRIBE pet;     # 显示一个表结构<br />变量<br />SELECT @min_price:=MIN(price),@max_price:=MAX(price) FROM shop;<br />SELECT * FROM shop WHERE price=@min_price OR price=@max_price;

select @mid:=max(id) from mk_app_data;<br />INSERT INTO `mk_app_data` VALUES (@mid+1,'xxxxx');<br />3.6.8 根据天计算访问量<br />SELECT year,month,BIT_COUNT(BIT_OR(1<<day)) AS days FROM t1 GROUP BY year,month;<br />4. 程序介绍<br />make_binary_distribution                  #可以生成编译过的MySQL的二进制版本<br />mysqlbug                                  #MySQL 缺陷报告脚本<br />mysql_fix_ privilege_tables               #更改授权表<br />5.0 mysql 服务器和服务器启动脚本


#服务器支持哪个存储引擎<br />SHOW ENGINES;<br />#检查你感兴趣的存储引擎的变量值<br />SHOW VARIABLES LIKE 'have%';

=5.0=










插件

安装包控制(Sublime Package Control)<br />$ npminstallspm**-**g<br />

