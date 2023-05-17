# 数据库抽象层 - DBA

这些函数建立的基础上是访问 Berkeley DB 样式数据库, 这是一个基于文件的抽象层. 许多方面的特性基于基本的数据库接口,例如函数 dba_optimize, dba_dba_sync 将在特定的数据库上执行,但是在某些上不执行.你需要安装dba-handler.

本函数使系统在更新数据库时，能同时写入实体的数据库储存装置 (如硬碟) 之中

```
dbm
     原始的berkeley DB 样式数据库, 柏克莱发展的最早期 DBA 数据库。
ndbm
     新类型,比dbm有弹性.
gdbm
     GNU database Manger
     GNU 发展的 DBA，ftp://ftp.gnu.org/pub/gnu/gdbm/
db2
     Berkeley DB2
     由 Sleepycat 软件开发的 DB2 (非 IBM 的 DB2)，http://www.sleepycat.com
     好像这个数据库已经不存在了,oracle官网没找到相关的支持
db3
     Berkeley DB3
db4
     Berkeley DB4/5
cdb
     CDB
     这是 qmail 作者开发快速可靠的 DBA，http://pobox.com/~djb/cdb.html
cdb_make
     建立cdb文件
flatfile
     不建议使用.php4.3
inifile
     ini文件处理
qdbm
     php5.0启用.
```

## 安装

## 配置

## 函数

`void dba_close ( resource $handle )`

关闭数据库连接,并且释放指定的数据库资源

`bool dba_delete ( string $key , resource $handle )`

删除数据库指定的键输入

`bool dba_exists ( string $key , resource $handle )`

检测指定的键是否在数据库中存在

`string dba_fetch ( string $key , [int $skip ,]resource $handle )`

在指定的数据库句柄中根据指定的键来获取指定的值 - $key - $skip 跳过的

`string dba_firstkey ( resource $handle )`

取回第一个键, 并且重置指针

`array dba_handlers ([ bool $full_info = false ] )`

列出所有的支持的handlers

`bool dba_insert ( string $key , string $value , resource $handle )`

插入键/值

`mixed dba_key_split ( mixed $key )`

将键值的字符串表现形式转换为数组的表现形式 返回的形式 : array(0 => group, 1 => value_name)

`array dba_list ( void )`

列出所有打开的数据库文件

`string dba_nextkey ( resource $handle )`

本函数取得数据库的下一笔键值 (key)。参数 handle 为打开数据库时所返回来的代号 ID。返回值即为键值，若取出失败则返回 false

`resource dba_open ( string $path , string $mode [, string $handler [, mixed $... ]] )`

本函数用来打开指定的数据库，并保持与数据库连接的状态。参数 path 为数据库的路径及数据库名称 - $path 打开 - $mode 模式 r 读取 w 读取写入 c 读写 , 不存在并且键入 n 建立, 清空和读写. d lock

`bool dba_optimize ( resource $handle )`

本函数将优化数据库。参数 handle 为打开数据库时所返回来的代号 ID。最佳化成功则返回 true 值，反之则返回 false。

`resource dba_popen ( string $path , string $mode [, string $handler [, mixed $... ]] )`

本函数用来打开指定的数据库，并保持与数据库连接的状态

`bool dba_replace ( string $key , string $value , resource $handle )`

本函数改动数据库中的资料，若资料不存在则加入。参数 key 为键值 (key) 字符串。参数 value 为欲改动的资料内容

`bool dba_sync ( resource $handle )`

本函数使系统在更新数据库时，能同时写入实体的数据库储存装置 (如硬碟) 之中