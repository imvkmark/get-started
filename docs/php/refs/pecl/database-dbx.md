# 数据库抽象层 - dbx


模块是一个数据库抽象层, dbx函数允许你访问所有支持的数据库,使用单个的调用约定, dbx函数,不直接和数据打交道,但是和这个数据库支持的模块打交道

## 安装

为了dbx模块支持相应的数据库, 这个模块PHP必须加载, 当前支持以下数据库 FrontBase (available from PHP 4.1.0). Microsoft SQL Server MySQL ODBC PostgreSQL Sybase-CT (available from PHP 4.2.0). Oracle (oci8) (available from PHP 4.3.0). SQLite (PHP 5).

## 配置

`dbx.colnames_case` 默认 : “unchanged”

PHP_INI_SYSTEM 列名称能够返回 ‘unchanged’ 或者转换成 ‘uppercase’ / ‘lowercase’

## 资源类型

这里定义了两种资源类型, 第一种就是数据库连接类资源,第二个是存储query结果数组的对象

## 函数

`int dbx_close ( object $link_identifier )`

关闭连接

`int dbx_compare ( array $row_a , array $row_b , string $column_key [, int $flags = DBX_CMP_ASC | DBX_CMP_NATIVE ] )`

对比两行, 这是一个在dbx_sort() 中一个排序的函数

`object dbx_connect ( mixed $module , string $host , string $database , string $username , string $password [, int $persistent ] )`

打开一个数据库连接

`string dbx_error ( object $link_identifier )`

返回最后一个错误

`string dbx_escape_string ( object $link_identifier , string $text )`

转义字串

`mixed dbx_fetch_row ( object $result_identifier )`

取回一行或者是取回所有,如果在查询中使用了 DBX_RESULT_UNBUFFERED 标志,这里取回一行,如果没有,则取回所有行数

`mixed dbx_query ( object $link_identifier , string $sql_statement [, int $flags ] )`

查询并且取回所有的结果

`bool dbx_sort ( object $result , string $user_compare_function )`

排序结果, 根据用户自定义函数或者自带的函数