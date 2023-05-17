# 与具体数据库系统相关的扩展 - mysqli

MySQL增强版扩展, 基于过程和面向对象的接口 支持多种连接方式 tcp/ip, 域名sockets, win命名管不到 localhost 是特殊的命名管道, 你不能使用localhost来打开tcp/ip连接,你必须使用 127.0.0.1来替代

## 安装/配置

`mysqli.allow_persistent` 默认 : “1”

PHP_INI_SYSTEM [5.3.0] 开启使用持久化连接 `mysqli.max_persistent` 默认 : “-1”

PHP_INI_SYSTEM 可以创建的持久化连接的最大数量 `mysqli.max_links` 默认 : “-1”

PHP_INI_SYSTEM 最大连接数量

`mysqli.default_port` 默认 : “3306”

PHP_INI_ALL 默认端口

`mysqli.default_socket` 默认 : Null

PHP_INI_ALL 当连接到本地数据库服务器时如果没有指定其他socket名称，使用的默认socket名称

`mysqli.default_host` 默认 : Null

PHP_INI_ALL 默认host

`mysqli.default_user` 默认 : Null

PHP_INI_ALL 用户

`mysqli.default_pw` 默认 : Null

PHP_INI_ALL 密码 `mysqli.reconnect` 默认 : “0”

PHP_INI_SYSTEM 连接丢失时是否自动重新连接 `mysqli.allow_local_infile` 默认 : “1”

PHP_INI_SYSTEM 允许Mysql的Load Data语句访问PHP角度看的本地文件

`mysqli.cache_size` 默认 : “2000”

PHP_INI_SYSTEM 缓存的大小,仅仅用户 mysqlnd

## MySQLi — MySQLi类

### 属性

`int $mysqli->affected_rows`; `int mysqli_affected_rows ( mysqli $link )`

获取之前mysql操作时候影响的行数 insert, update, replace, delete >0 表明有相应影响的行数 =0 没有相关行 <0 查询错误

`string $mysqli->client_info`; `string mysqli_get_client_info ( mysqli $link )`

返回mysql客户端的库版本. `int $mysqli->client_version`; `int mysqli_get_client_version ( mysqli $link )`

获取mysql客户端信息, 返回现实当前mysql客户端的版本. main_version*10000 + minor_version* 100 + sub_version

string $mysqli->connect_errno; `int mysqli_connect_errno ( void )`

返回上个连接错误调用的错误码

string $mysqli->connect_error; `string mysqli_connect_error ( void )`

返回上一个连接的错误信息

int $errno; `int mysqli_errno ( mysqli $link )`

返回最近的mysql函数调用产生的错误代码 array $mysqli->error_list; `array mysqli_error_list ( mysqli $link )`

返回最近mysql调用的错误的数组 string $mysqli->error; `string mysqli_error ( mysqli $link )`

以字串形式返回上个错误的字串形式 int $mysqli->field_count; `int mysqli_field_count ( mysqli $link )`

返回最近的查询中字段的数量

string $mysqli->host_info; `string mysqli_get_host_info ( mysqli $link )`

返回描述当前连接的信息

string $mysqli->protocol_version; `int mysqli_get_proto_info ( mysqli $link )`

返回mysql协议版本号

string $mysqli->server_info; `string mysqli_get_server_info ( mysqli $link )`

服务器信息

int $mysqli->server_version; `int mysqli_get_server_version ( mysqli $link )`

服务器版本号

string $mysqli->info; `string mysqli_info ( mysqli $link )`

获取当前执行的查询操作的信息

mixed $mysqli->insert_id; `mixed mysqli_insert_id ( mysqli $link )`

返回带有自增长的字段的值.如果没有 ai属性, 或者上个操作没有进行insert/update操作,这个函数返回0,

string $mysqli->sqlstate; `string mysqli_sqlstate ( mysqli $link )`

从之前的Mysql操作中返回 SQLSTATE 错误, 返回上个错误中的包含 sqlstate 错误码的五位字串.

int $mysqli->thread_id; `int mysqli_thread_id ( mysqli $link )`

返回当前连接的线程ID

int $mysqli->warning_count; `int mysqli_warning_count ( mysqli $link )`

返回上个查询中的警告的数量, 你也可以使用sql命令 “SHOW WARNINGS [limit row_count]”

## 方法

`bool mysqli::autocommit ( bool $mode )` `bool mysqli_autocommit ( mysqli $link , bool $mode )`

`开启或者关闭数据库的自动提交功能, 这个函数不支持非事务表(myisam/isam)`

`bool mysqli::change_user ( string $user , string $password , string $database )` `bool mysqli_change_user ( mysqli $link , string $user , string $password , string $database )`

更换指定数据库连接的用户并且设置数据库, 为了能够正确的连接数据库, 这里的用户名和密码都必须有权限访问指定的数据库, 如果权限问题导致失败的话,当前用户认证将继续保存

`string mysqli::character_set_name ( void )` `string mysqli_character_set_name ( mysqli $link )`

返回当前数据库连接的字符集的名字

`bool mysqli::close ( void )` `bool mysqli_close ( mysqli $link )`

关闭上一个数据库连接

`bool mysqli::commit ( void )` `bool mysqli_commit ( mysqli $link )`

提交一个事务

`mysqli mysqli_connect ([ string $host = ini_get("mysqli.default_host") [, string $username = ini_get("mysqli.default_user") [, string $passwd = ini_get("mysqli.default_pw") [, string $dbname = "" [, int $port = ini_get("mysqli.default_port") [, string $socket = ini_get("mysqli.default_socket") ]]]]]] )` `mysqli mysqli_connect(...)`

打开一个新的数据库连接 - $host 可以使主机名/ ip地址 p: 开启持续连接 - $username - $passwd - $dbname - $port - $socket

`bool mysqli::debug ( string $message )` `bool mysqli_debug ( string $message )`

运行debug操作

`void mysqli::disable_reads_from_master ( void )`

[5.3.0]

`bool mysqli::dump_debug_info ( void )` `bool mysqli_dump_debug_info ( mysqli $link )`

设计用于超级权限用户执行将调试信息输出到连接相关的mysql服务端日志.

`object mysqli::get_charset ( void )` `object mysqli_get_charset ( mysqli $link )`

返回当前设置字符集对象

`string mysqli::get_client_info ( void )` `string mysqli_get_client_info ( mysqli $link )`

以字串形式返回mysql客户端版本 `array mysqli_get_client_stats ( void )`

[php5.3+] 返回客户端当前进行的状态信息, 仅仅适用于mysqlnd

`bool mysqli::get_connection_stats ( void )` `array mysqli_get_connection_stats ( mysqli $link )`

[php5.3]获取当前客户端连接的统计信息, 仅仅适用于mysqlnd

`mysqli_warning mysqli::get_warnings ( void )` `mysqli_warning mysqli_get_warnings ( mysqli $link )`

获取 show warnings 的结果

`mysqli mysqli::init ( void )` `mysqli mysqli_init ( void )`

初始化 mysqli, 返回mysqli_real_connect()资源

`bool mysqli::kill ( int $processid )` `bool mysqli_kill ( mysqli $link , int $processid )`

告诉服务器kill掉这个线程

`bool mysqli::more_results ( void )` `bool mysqli_more_results ( mysqli $link )`

检测多重查询中是否有多重结果

`bool mysqli::multi_query ( string $query )` `bool mysqli_multi_query ( mysqli $link , string $query )`

子数据库中执行一个或这个多个查询,使用分号分隔.取回第一个查询的结果, 你可以使用 mysqli_use_result() / mysqli_store_result(), 更多子查询的结果可以使用 mysqli_more_results() / mysqli_next_result() 来获取

`bool mysqli::next_result ( void )` `bool mysqli_next_result ( mysqli $link )`

取回多重查询的下一个结果集合

`bool mysqli::options ( int $option , mixed $value )` `bool mysqli_options ( mysqli $link , int $option , mixed $value )`

设置连接的额外属性, 这个函数可以设置和调用多次, 这个函数在 mysqli_init()后调用,并且在mysqli_real_connect()之前. `MYSQLI_OPT_CONNECT_TIMEOUT          [5.3.1+] 连接超时时间 (秒)` MYSQLI_OPT_LOCAL_INFILE 启用/禁用 LOAD LOCAL INFILE MYSQLI_INIT_COMMAND 初始化之后执行的命令 MYSQLI_READ_DEFAULT_FILE 从指定的配置文件中读取配置,替代my.cnf MYSQLI_READ_DEFAULT_GROUP 从命名的组中读取指定的配置 `bool mysqli::ping ( void )` `bool mysqli_ping ( mysqli $link )`

检测连接是否还在工作, 如果不工作, 并且全局选项 mysqli.reconnect 启用则尝试重连.这个寒素在客户端使用并且可以长时间的保留空闲.来检测服务器是否关闭如果关闭则尝试重连

`public int mysqli::poll ( array &$read , array &$error , array &$reject , int $sec [, int $usec ] )` `mysqli_poll(...)`

[5.3.0+]检测列表 仅仅适用于mysqlnd `mysqli_stmt mysqli::prepare ( string $query )`

为单sql语句预处理.并且返回一个 语句处理器.并且在执行查询前绑定参数, 和取回结果之前绑定结果变量

`mixed mysqli::query ( string $query [, int $resultmode = MYSQLI_STORE_RESULT ] )` `mixed mysqli_query ( mysqli $link , string $query [, int $resultmode = MYSQLI_STORE_RESULT ] )`

在数据库中执行查询 这里的 select, show, describe, explain 返回一个 Mysqli_result 的对象其他的将返回 true 这个函数等同于 mysqli_store_result/mysqli_use_result + mysqli_real_query

`bool mysqli::real_connect ([ string $host [, string $username [, string $passwd [, string $dbname [, int $port [, string $socket [, int $flags ]]]]]]] )`

建立一个数据库引擎连接 这个函数和 mysqli_connect() 函数不同, 这个函数 需要从 mysqli_init()建立, 可以使用mysqli_options()函数来建立多种选项的链接 $flags MYSQLI_CLIENT_COMPRESS 使用压缩协议 MYSQLI_CLIENT_FOUND_ROWS 返回匹配的行数,而不是影响的行数 MYSQLI_CLIENT_IGNORE_SPACE 允许函数中间保留空白 MYSQLI_CLIENT_INTERACTIVE 超时秒数 MYSQLI_CLIENT_SSL 使用ssl加密

`string mysqli::escape_string ( string $escapestr )` `string mysqli::real_escape_string ( string $escapestr )` `string mysqli_real_escape_string ( mysqli $link , string $escapestr )`

基于当前字符集来转义sql字串.

`bool mysqli::real_query ( string $query )`

执行一个单调数据库查询, 结果可以使用mysqli_store_result, mysqli_use_result检索或存储.为了确定给定的查询是否真的返回一个结果集, 可以查看 mysqli_field_count

`public mysqli_result mysqli::reap_async_query ( void )` `mysqli_result mysqli_reap_async_query ( mysql $link )`

异步查询结果.

`public bool mysqli::refresh ( int $options )` `int mysqli_refresh ( resource $link , int $options )`

[<=5.3.0]刷新表格或者缓存,或者重置服务器信息.

`bool mysqli::rollback ( void )` `bool mysqli_rollback ( mysqli $link )`

回滚当前的事务

`int mysqli::rpl_query_type ( string $query )`

返回RPL查询类型

`bool mysqli::select_db ( string $dbname )` `bool mysqli_select_db ( mysqli $link , string $dbname )`

选择默认的使用的数据库当执行查询的时候.

`bool mysqli::send_query ( string $query )`

`bool mysqli::set_charset ( string $charset )` `bool mysqli_set_charset ( mysqli $link , string $charset )`

设置从服务器发送数据的默认的字符集, 这是首要的设置字符集的方法.而不是使用 “SET NAMES ..”

`void mysqli_set_local_infile_default ( mysqli $link )`

禁用 LOAD DATA INFILE LOCAL

`bool mysqli::set_local_infile_handler ( mysqli $link , callable $read_func )` `bool mysqli_set_local_infile_handler ( mysqli $link , callable $read_func )`

设置调用加载文件处理函数的句柄

`bool mysqli::ssl_set ( string $key , string $cert , string $ca , string $capath , string $cipher )` `bool mysqli_ssl_set ( mysqli $link , string $key , string $cert , string $ca , string $capath , string $cipher )`

用来使用ssl来这只 安全连接, 在调用mysqli_real_connect前调用.这个看书只有在启用了openssl支持之后才可用. 在PHP5.3.3之前. mysqlnd不支持ssl

`string mysqli::stat ( void )` `string mysqli_stat ( mysqli $link )`

获取当前的系统状态

`mysqli_stmt mysqli::stmt_init ( void )`

初始化一条语句并用于mysqli_stmt_prepare(), 在使用 mysqli_stmt_prepare()之前调用任何mysqli_stmt函数都会失败

`mysqli_result mysqli::store_result ( void )` `mysqli_result mysqli_store_result ( mysqli $link )`

从最后一个查询中传递一个结果集, 这个结果集可以用于 mysqli_data_seek()函数

`bool mysqli_thread_safe ( void )`

返回是否 ts 模式

`mysqli_result mysqli::use_result ( void )` `mysqli_result mysqli_use_result ( mysqli $link )`

用来初始化取回一个结果集, 使用mysqli_real_query()函数来执行数据库查询.这个函数和 mysqli_store_result()函数在调用查询的时候被取回.

### MySQLi_STMT — MySQLi_STMT类

/* 属性 */

`int $mysqli_stmt->affected_rows`; `int mysqli_stmt_affected_rows ( mysqli_stmt $stmt )`

`返回影响的行号(insert,udate, delete), 这个函数仅仅在更新表格时候是使用, 为了获取select的行数,使用 mysqli_stmt_num_rows()`

`int $mysqli_stmt->errno`; `int mysqli_stmt_errno ( mysqli_stmt $stmt )`

返回错误代码

`array $mysqli_stmt->error_list`; `array mysqli_stmt_error_list ( mysqli_stmt $stmt )`

[>=5.4.0]返回一系列的错误

`string $mysqli_stmt->error`; `string mysqli_stmt_error ( mysqli_stmt $stmt )`

返回上个错误的 字串描述

`int $mysqli_stmt->field_count`; `int mysqli_stmt_field_count ( mysqli_stmt $stmt )`

返回结果中的字段的数量

`int $mysqli_stmt->insert_id`; `mixed mysqli_stmt_insert_id ( mysqli_stmt $stmt )`

获取上一个自增sql的id

`int $mysqli_stmt->num_rows`; `int mysqli_stmt_num_rows ( mysqli_stmt $stmt )`

获取结果集中的结果数量

`int $mysqli_stmt->param_count`; `int mysqli_stmt_param_count ( mysqli_stmt $stmt )`

返回参数的数量

`string $mysqli_stmt->sqlstate`; `string mysqli_stmt_sqlstate ( mysqli_stmt $stmt )`

获取sqlstate 错误码 /* 方法 */

`int mysqli_stmt::attr_get ( int $attr )` `int mysqli_stmt_attr_get ( mysqli_stmt $stmt , int $attr )`

返回一个设置的属性的值.错误时候返回false

`bool mysqli_stmt::attr_set ( int $attr , int $mode )` `bool mysqli_stmt_attr_set ( mysqli_stmt $stmt , int $attr , int $mode )`

设置或则修改一个预备语句的属性.

`bool mysqli_stmt::bind_param ( string $types , mixed &$var1 [, mixed &$... ] )` `bool mysqli_stmt_bind_param ( mysqli_stmt $stmt , string $types , mixed &$var1 [, mixed &$... ] )`

绑定变量到prepare语句

`bool mysqli_stmt::bind_result ( mixed &$var1 [, mixed &$... ] )` `bool mysqli_stmt_bind_result ( mysqli_stmt $stmt , mixed &$var1 [, mixed &$... ] )`

为结果绑定变量, 这里所有的列必须在execute()和fetch()后调用.基于列类型的扮靓能够改变之前的PHP类型, 绑定或者重新绑定可以在任何时间进行,绑定在下次fetch()后生效.

`bool mysqli_stmt::close ( void )` `bool mysqli_stmt_close ( mysqli_stmt $stmt )`

关闭 prepare 语句

`void mysqli_stmt::data_seek ( int $offset )` `void mysqli_stmt_data_seek ( mysqli_stmt $stmt , int $offset )`

定位

`bool mysqli_stmt::execute ( void )` `bool mysqli_stmt_execute ( mysqli_stmt $stmt )`

执行一个prepare语句

`bool mysqli_stmt::fetch ( void )` `bool mysqli_stmt_fetch ( mysqli_stmt $stmt )`

从 预备语句中查询并且根据bind_result()将获取的

`void mysqli_stmt::free_result ( void )` `void mysqli_stmt_free_result ( mysqli_stmt $stmt )`

清空存储内存

`mysqli_result mysqli_stmt::get_result ( void )` `mysqli_result mysqli_stmt_get_result ( mysqli_stmt $stmt )`

获取预先查询的结果集

`object mysqli_stmt::get_warnings ( mysqli_stmt $stmt )` `object mysqli_stmt_get_warnings ( mysqli_stmt $stmt )`

获取 show warings 的结果

`public bool mysqli_stmt::more_results ( void )` `bool mysqli_stmt_more_results ( mysql_stmt $stmt )`

检测多重查询中是否有更多结果

`public bool mysqli_stmt::next_result ( void )` `bool mysqli_stmt_next_result ( mysql_stmt $stmt )`

从一个多查询中读取下一个结果

`mixed mysqli_stmt::prepare ( string $query )` `bool mysqli_stmt_prepare ( mysqli_stmt $stmt , string $query )`

预定义一个执行的sql语句

`bool mysqli_stmt::reset ( void )` `bool mysqli_stmt_reset ( mysqli_stmt $stmt )`

重置预定义的语句

`mysqli_result mysqli_stmt::result_metadata ( void )` `mysqli_result mysqli_stmt_result_metadata ( mysqli_stmt $stmt )`

获取结果集的元数据

`bool mysqli_stmt::send_long_data ( int $param_nr , string $data )` `bool mysqli_stmt_send_long_data ( mysqli_stmt $stmt , int $param_nr , string $data )`

允许多重发送服务器长数据

`bool mysqli_stmt::store_result ( void )` `bool mysqli_stmt_store_result ( mysqli_stmt $stmt )`

在每个查询之后必须调用这个函数.如果你想在客户端缓存完整的结果集

### MySQLi_Result — MySQLi_Result类

/* 属性 */

`int $mysqli_result->current_field` ; `int mysqli_field_tell ( mysqli_result $result )`

获取当前的字段的偏移量

`int $mysqli_result->field_count`; `int mysqli_num_fields ( mysqli_result $result )`

返回字段的数量

`array $mysqli_result->lengths`; `array mysqli_fetch_lengths ( mysqli_result $result )`

返回在结果集中当前行的所有列的长度

`int $mysqli_result->num_rows`; `int mysqli_num_rows ( mysqli_result $result )`

获取结果集中的行数量

/* 方法 */

`bool mysqli_result::data_seek ( int $offset )` `bool mysqli_data_seek ( mysqli_result $result , int $offset )`

调整结果指针到任意结果行

`mixed mysqli_result::fetch_all ([ int $resulttype = MYSQLI_NUM ] )` `mixed mysqli_fetch_all ( mysqli_result $result [, int $resulttype = MYSQLI_NUM ] )`

[>=5.3.0] 以指定形式返回所有的结果行

`mixed mysqli_result::fetch_array ([ int $resulttype = MYSQLI_BOTH ] )` `mixed mysqli_fetch_array ( mysqli_result $result [, int $resulttype = MYSQLI_BOTH ] )`

返回数组

`array mysqli_result::fetch_assoc ( void )` `array mysqli_fetch_assoc ( mysqli_result $result )`

返回关联数组

`object mysqli_result::fetch_field_direct ( int $fieldnr )` `object mysqli_fetch_field_direct ( mysqli_result $result , int $fieldnr )`

在指定结果集中获取字段的定义信息 $fieldnr field number

`object mysqli_result::fetch_field ( void )` `object mysqli_fetch_field ( mysqli_result $result )`

以对象形式在结果集中返回下一个字段的定义

`array mysqli_result::fetch_fields ( void )` `array mysqli_fetch_fields ( mysqli_result $result )`

获取所有字段的定义

`object mysqli_result::fetch_object ([ string $class_name [, array $params ]] )` `object mysqli_fetch_object ( mysqli_result $result [, string $class_name [, array $params ]] )`

以对象方式返回当前行.

`mixed mysqli_result::fetch_row ( void )` `mixed mysqli_fetch_row ( mysqli_result $result )`

以数据数组返回结果.

bool mysqli_result::field_seek ( int $fieldnr ) `bool mysqli_field_seek ( mysqli_result $result , int $fieldnr )`

设置字段查询器到指定的偏移量地方

`void mysqli_result::free ( void )` `void mysqli_result::close ( void )` `void mysqli_result::free_result ( void )` `void mysqli_free_result ( mysqli_result $result )`

清空结果资源

### MySQLi_Driver — MySQLi_Driver类

```
/* 属性 */

public readonly string$client_info ;

public readonly string$client_version ;

public readonly string$driver_version ;

public readonly string$embedded ;

public bool $reconnect ;

public int $report_mode ;

/* 方法 */

`void mysqli_driver::embedded_server_end ( void )`

停止嵌入服务器

`bool mysqli_driver::embedded_server_start ( bool $start , array $arguments , array $groups )`

初始并且启动嵌入服务器
```

### MySQLi_Warning — MySQLi_Warning类

```
/* 属性 */

public $message ;

public $sqlstate ;

public $errno ;

/* 方法 */

`public__construct ( void )`

构造函数
`public void next ( void )`

下一个目的
```

### mysqli_sql_exception — The mysqli_sql_exception class

```
/* 属性 */

protected $code ;

protected $sqlstate ;
```

### 别名和过时的Mysqli 函数

- Mysqlnd — MySQL Native Driver
    - 简介 mysqlnd 是替代 mysql client library的一个工具.这个已经在PHP5.3中做为一个官方的工具,
    - Overview
    - Installation
    - 运行时配置
    - Persistent Connections
    - Statistics
    - Notes
    - MySQL Native Driver Plugin API
- mysqlnd_ms — Mysqlnd replication and load balancing plugin
    - 简介
    - Quickstart and Examples
    - Concepts
    - 安装/配置
    - 预定义常量
    - Mysqlnd_ms 函数
    - Change History
- mysqlnd_qc — Mysqlnd query result cache plugin
    - 简介
    - Quickstart and Examples
    - 安装/配置
    - 预定义常量
    - mysqlnd_qc 函数
    - Change History
- mysqlnd_uh — Mysqlnd user handler plugin
    - 简介
    - Quickstart and Examples
    - 安装/配置
    - 预定义常量
    - MysqlndUhConnection — The MysqlndUhConnection class
    - MysqlndUhPreparedStatement — The MysqlndUhPreparedStatement class
    - Mysqlnd_uh 函数
    - Change History