# 其它基本扩展- Misc.杂项函数

这里真的是乱七八糟的函数,这里的函数确实没地方放了

## 安装

内置的,乱七八糟的函数

## 配置

`ignore_user_abort` “0”

PHP_INI_ALL 是否在用户关闭网页后断开连接

`highlight.string` “#DD0000”

PHP_INI_ALL 字串颜色

`highlight.comment` “#FF8000”

PHP_INI_ALL 评论颜色

`highlight.keyword` “#007700”

PHP_INI_ALL 关键词

`highlight.bg` “#FFFFFF”

PHP_INI_ALL 背景色 在 PHP 5.4.0.中已移除

`highlight.default` “#0000BB”

PHP_INI_ALL 默认颜色

`highlight.html` “#000000”

PHP_INI_ALL html 的颜色

`browscap` NULL PHP_INI_SYSTEM 浏览器功能文件的位置和文件名 参见 get_browser()

## 函数

`int connection_aborted ( void )`

检查客户端是否已经断开

- 断开返回 1
- 连接返回 0

`int connection_status ( void )`

返回当前连接的状态位

`int connection_timeout ( void )`

[4.0.5] 废弃 检查脚本是否已超时

`mixed constant ( string $name )`

返回一个常量的值(如果定义), 否则的话返回 null

`bool define ( string $name , mixed $value [, bool $case_insensitive = false ] )`

定义一个常量,

- $case_insensitive 指定为 true 则大小写不敏感

`bool defined ( string $name )`

检测常量是否存在

`void exit ( int $status )`

输出一个消息并且退出当前脚本 [alias] die();

`mixed get_browser ([ string $user_agent [, bool $return_array = false ]] )`

通过查找 browscap.ini 文件中的浏览器信息，尝试检测用户的浏览器所具有的功能。

`void __halt_compiler ( void )`

中断本文件中的编译器的执行. 可以通过常量 **COMPILER_HALT_OFFSET** 获取数据开始字节所在的位置，且该常量仅被定义于使用了**halt_compiler 的文件。 定义了再** halt_compiler();函数之后第一个字节的位置.

本函数中断 包含 本函数的文件的编译, 而不是 所有文件的编译

`mixed highlight_file ( string $filename [, bool $return = false ] )`

语法高亮一个文件.可以使用以下配置设置 phps 文件自动高亮

```
AddType application/x-httpd-php-source .phps
```

`mixed highlight_string ( string $str [, bool $return = false ] )`

高亮一个字串.

`int ignore_user_abort ([ string $value ] )`

设置客户端断开连接的时候是否中段脚本的执行

`string pack ( string $format [, mixed $args [, mixed $... ]] )`

函数把数据装入一个二进制字符串

- $format 规定在包装数据时所使用的格式 a 重复的 NUL 字串
A SPACE h 十六进制 low nibble first H 十六进制 High nibble first c 带符号的字串 C 无符号的字串 s 16 位机器码(带符号的) S 16 位无符号机器码 n unsigned short (always 16 bit, big endian byte order) v unsigned short (always 16 bit, little endian byte order) i signed integer (machine dependent size and byte order) I unsigned integer (machine dependent size and byte order) l signed long (always 32 bit, machine byte order) L unsigned long (always 32 bit, machine byte order) N unsigned long (always 32 bit, big endian byte order) V unsigned long (always 32 bit, little endian byte order) f float (machine dependent size and representation) d double (machine dependent size and representation) x NUL byte X Back up one byte
- $args 规定被包装的一个或多个参数

`string php_strip_whitespace ( string $filename )`

返回删除注释和空格后的 PHP 源码

`int sleep ( int $seconds )`

延缓执行

`array sys_getloadavg ( void )`

获取系统的负载（load average） [unix] 返回三个系统负载（系统运行队列中的进程数）的样本数据，分别是 1 分钟、5 分钟和 15 分钟之前。

`mixed time_nanosleep ( int $seconds , int $nanoseconds )`

[5.3.0]程序延缓执行指定数量的秒数和纳秒数

`bool time_sleep_until ( float $timestamp )`

[5.3.0]使脚本睡眠到指定的 timestamp

`string uniqid ([ string $prefix = "" [, bool $more_entropy = false ]] )`

获取一个带前缀的,基于当前时间微秒数的唯一 ID.

`array unpack ( string $format , string $data )`

从二进制字串中分离出来数据

`void usleep ( int $micro_seconds )`

以指定的微秒数延迟执行