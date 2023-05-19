---
title: "ezSQL的介绍和学习"
date: 2022-04-14 22:09:39
toc: true
categories:
- ["Php","扩展"]
---

**介绍**<br />ezSQL 是一个非常快和易用的,并且可以兼容很多数据库的PHP脚本(mysql, oracle8/9, InterBase,FireBird/PostgreSQL/ms-sql/SQlite/SQLite c++)

当与数据库操作的时候,大多数时候你需要以下四种操作<br />      1. 执行一个插入或者更新 <br />      2. 获得一个变量 <br />      3. 获得一行数据 <br />      4. 获得一组数据 


**函数**<br />db(string username, string password, string database name, string database host)<br />      初始化数据库, 连接到数据库服务器, 选择数据库 

array $db->get_results(string query / null [, OBJECT / ARRAY_A / ARRAY_N ] )<br />      获取所有结果 <br />      $type   :   ARRAY_A      关联数组 <br />                ARRAY_N      数字数组 

object $db->get_ row(string query / null [, OBJECT / ARRAY_A / ARRAY_N [, int row offset]])<br />      获取一行 

var $db->get_var(string query / null [,int column offset[, int row offset])<br />      获取一个变量 

bool $db->query(string query)<br />      执行一个语句 

$db->debug(void)<br />      显示最后一个查询和所有获取到的结果 

$db->vardump(void)<br />      显示 get_results 获取到的结果 

$db->get_col( string query / null [, int column offset] )<br />      获取一列, 基于列的索引 

$db->get_col_info(string info-type[, int column offset])<br />      获取一列的信息 

bool $db->select(string database name)<br />      选择数据库 

$db->hide_errors( void )<br />      关闭错误显示 <br />$db->show_errors( void )<br />      开启错误显示 

$db->escape( string )<br />      转义sql 


**变量**


$db->num_rows<br />      最后一次查询返回的条目数 

$db->insert_id<br />      返回自增长id的大小 

$db->rows_affected<br />      返回被影响的行数, INSRET,    UPDATE or DELETE 

$db->num_queries<br />      执行数目的统计 

$db->debug_all<br />      如果开启,将会打印所有查询和查询结果 

$db->cache_dir<br />      mysql 缓存的目录 

$db->cache_queries<br />      缓存查询 

$db->cache_inserts  <br />      缓存,插入 

$db->use_disk_cache<br />      是否启用磁盘缓存 <br />      <br />$db->cache_timeout<br />      缓存的时间 




**使用**

// 加载核心文件<br />include_once "ez_sql_core.php";<br />  <br />// 加载核心的mysql库<br />include_once "ez_sql_mysql.php";<br />  <br />// 初始数据库对象并且, 返回他<br />// at the same time - db_user / db_password / db_name / db_host<br />$db = new ezSQL_mysql('db_user','db_password','db_name','db_host');

**---------------------------**<br />列出数据库结构的语法

$db->select("my_database");<br />foreach ( $db->get_col("SHOW TABLES",0) as $table_name )<br />{<br />     $db->debug(); <br />     $db->get_results("DESC $table_name"); <br />}<br />$db->debug();


------------------------------<br />开启缓存<br />$db->use_disk_cache = true;<br />$db->cache_queries = true;<br />$db->cache_timeout = 24;

