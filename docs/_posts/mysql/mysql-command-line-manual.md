---
title: "mysql - 自带的命令行工具说明及用法"
date: 2021-02-24 15:48:11
toc: true
categories:
- ["Mysql","mysql-cli"]
---

## MYSQL服务器和服务器启动脚本

- 
mysqld<br />
MySQL服务器

- 
mysqld_safe, mysql.server<br />
服务器启动脚本<br />
直接运行mysqld程序来启动MySQL服务的方法很少见，mysqld_safe脚本会在启动MySQL服务器后继续监控其运行情况，并在其死机时重新启动它。用mysqld_safe脚本来启动MySQL服务器的做法在BSD风格的unix系统上很常见，非BSD风格的UNIX系统中的mysql.server脚本其实也是调用mysqld_safe脚本去启动MySQL服务器的

- 
mysqld-max<br />
扩展

- 
mysqld_multi<br />
可以启动或停止系统上安装的多个服务器

- 
mysql_install_db<br />
初始化数据目录和初始数据库




## 访问服务器的客户程序

- 
mysql<br />
命令行客户程序，用于交互式或以批处理模式执行SQL语句

- 
mysqladmin<br />
用于管理功能的客户程序, 管理数据库服务器, 包括数据库的创建和删除

- 
mysqlcheck<br />
执行表维护操作

- 
mysqldump<br />
负责数据库备份, 将数据库或表的定义和内容转储到文件

- 
mysqlhotcopy<br />
负责数据库热备份

- 
mysqlimport<br />
导入数据文件

- 
mysqlshow<br />
显示信息数据库和表的相关信息



## 独立于服务器操作的工具程序

- 
myisamchk<br />
描述、检查、优化和维护MyISAM表的实用工具

- 
myisampack<br />
产生压缩、只读的表

- 
mysqlbinlog<br />
是处理二进制日志文件的实用工具

- 
perror<br />
显示错误代码的含义

