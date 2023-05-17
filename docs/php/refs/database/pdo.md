# 数据库抽象层 - PDO

PDO指定一个轻量级的持续的接口来在PHP中访问数据库, 每一个数据库驱动和PDO接口一致能够直接暴露数据库指定的特性.你不能使用pdo扩展操作任何数据库函数.你必须使用指定的数据库的PDO驱动来访问数据库服务器. PDO提供了一个书库访问抽象层, 这个你不用知道你在处理那种数据库.你可以使用相同的函数来查询和读取数据,PDO不提供数据库抽象访问. 这个不会重写sql或者执行不存在的特性.这样你需要使用完整的抽象层.

## 安装

这个自行安装 pdo.so pdo_mysql.so

## 配置

`pdo.dsn.* string`

定义 DSN alias

## 函数

### PDO::

__construct ( string $dsn [, string $username [, string $password [, array $driver_options ]]] ) 建立PDO实例

`bool beginTransaction ( void )`

关闭自动提交, 当自动提交模式关闭, 改动不在commit()调用之后才会提交, 调用 pdo::rollBack()将恢复到未提交之前的模式

`bool commit ( void )`

提交一个事务, 然后数据库恢复到自动提交模式,直到调用PDO::beginTransaction()开始一个新事务.

`mixed errorCode ( void )`

取回sql状态.

`array errorInfo ( void )`

取回错误信息

`int exec ( string $statement )`

执行一个sql语句并返回影响的行数.

`mixed getAttribute ( int $attribute )`

返回数据库连接的属性 - $attribute PDO::ATTR_AUTOCOMMIT PDO::ATTR_CASE PDO::ATTR_CLIENT_VERSION PDO::ATTR_CONNECTION_STATUS PDO::ATTR_DRIVER_NAME PDO::ATTR_ERRMODE PDO::ATTR_ORACLE_NULLS PDO::ATTR_PERSISTENT PDO::ATTR_PREFETCH PDO::ATTR_SERVER_INFO PDO::ATTR_SERVER_VERSION PDO::ATTR_TIMEOUT

static array getAvailableDrivers ( void ) `array pdo_drivers ( void )`

返回可用的pdo驱动

`bool inTransaction ( void )`

[php5.3.3] 检测是否在事务中

`string lastInsertId ([ string $name = NULL ] )`

返回最后插入的ID

`PDOStatement prepare ( string $statement [, array $driver_options = array() ] )`

准备查询语句

`PDOStatement query ( string $statement )` `PDOStatement PDO::query ( string $statement , int $PDO::FETCH_COLUMN , int $colno )` `PDOStatement PDO::query ( string $statement , int $PDO::FETCH_CLASS , string $classname , array $ctorargs )` `PDOStatement PDO::query ( string $statement , int $PDO::FETCH_INTO , object $object )`

查询

`string quote ( string $string [, int $parameter_type = PDO::PARAM_STR ] )`

转义

`bool rollBack ( void )`

回滚

`bool setAttribute ( int $attribute , mixed $value )`

设置属性

```
PDO::ATTR_CASE
  PDO::CASE_LOWER
  PDO::CASE_NATURAL
  PDO::CASE_UPPER
PDO::ATTR_ERRMODE
  PDO::ERRMODE_SILENT
  PDO::ERRMODE_WARNING
  PDO::ERRMODE_EXCEPTION
PDO::ATTR_ORACLE_NULLS  (oracle 不可用)
  PDO::NULL_NATURAL
  PDO::NULL_EMPTY_STRING
  PDO::NULL_TO_STRING
PDO::ATTR_STRINGIFY_FETCHES
PDO::ATTR_STATEMENT_CLASS
PDO::ATTR_TIMEOUT
PDO::ATTR_AUTOCOMMIT
PDO::MYSQL_ATTR_USE_BUFFERED_QUERY
PDO::ATTR_DEFAULT_FETCH_MODE
```

### PDOStatement::

```
 提供了一个准备的statement, 当这个执行的时候,返回一个关联数组
```

`bool bindColumn ( mixed $column , mixed &$param [, int $type [, int $maxlen [, mixed $driverdata ]]] )`

绑定一个列到PHP变量, 使用这个变量替代sql中的列

`bool bindParam ( mixed $parameter , mixed &$variable [, int $data_type = PDO::PARAM_STR [, int $length [, mixed $driver_options ]]] )`

绑定变量到一个prepared参数

`bool bindValue ( mixed $parameter , mixed $value [, int $data_type = PDO::PARAM_STR ] )`

绑定值

`bool closeCursor ( void )`

关闭指针

`int columnCount ( void )`

返回列的数量

`bool debugDumpParams ( void )`

输出准备的命令

`string errorCode ( void )`

`array errorInfo ( void )`

`bool execute ([ array $input_parameters ] )`

执行

`mixed fetch ([ int $fetch_style [, int $cursor_orientation = PDO::FETCH_ORI_NEXT [, int $cursor_offset = 0 ]]] )`

查找下一行数据

`array fetchAll ([ int $fetch_style [, mixed $fetch_argument [, array $ctor_args = array() ]]] )`

取回所有

`string fetchColumn ([ int $column_number = 0 ] )`

取回单列信息

`mixed fetchObject ([ string $class_name = "stdClass" [, array $ctor_args ]] )`

取回对象信息

`mixed getAttribute ( int $attribute )`

获取语句的属性

`array getColumnMeta ( int $column )`

获取列的信息

`bool nextRowset ( void )`

取回下一列

`int rowCount ( void )`

行数

`bool setAttribute ( int $attribute , mixed $value )`

设置属性

`bool setFetchMode ( int $mode )`

设置取回模式

## PDO Drivers

CUBRID (PDO) MS SQL Server (PDO) Firebird/Interbase (PDO) IBM (PDO) Informix (PDO) MySQL (PDO) MS SQL Server (PDO) Oracle (PDO) ODBC and DB2 (PDO) PostgreSQL (PDO) SQLite (PDO) 4D (PDO)