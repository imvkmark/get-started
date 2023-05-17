# 错误处理

php提供了错误处理和日志记录的功能,这些函数允许你自己定义自己的错误处理规则,以及修改错误记录的方式, 这样可以根据自己的需要来设定相关功能

## 配置

`error_reporting     integer` PHP_INI_ALL 可以是二进制位的整数, 或者常数名称, 错误级别和常数是在预定义级别定义的 运行时候可以通过 `error_reporting()` 函数进行设置

```
 Do NOT call session_start() before you call error_reporting();
 // does work
 error_reporting(NULL);
 session_start();
```

`display_errors     stderr | stdout`

PHP_INI_ALL 是否将错误信息显示到屏幕上, [5.2.4]之前设置为布尔值, > 这是一个辅助开发的功能, 建议永远不要在对外服务时候使用

`display_startup_errors     0 | 1`

PHP_INI_ALL 即使 display_errors 设置为开启,PHP 启动过程中的错误信息也不会被显示 > 强烈建议除了调试目的以外，将 display_startup_errors 设置为关闭

`log_errors     0 | 1` PHP_INI_ALL 是否将脚本运行时候的错误信息记录到服务器错误日志或者 error_log 中

`log_errors_max_len   integer` PHP_INI_ALL 设置 log_errors 的最大字节数, 这里的长度,对记录的错误,显示的错误, $php_errormsg都会有限制作用

`ignore_repeated_errors    0 | 1` PHP_INI_ALL 不记录重复的信息,

`ignore_repeated_source     0 | 1` PHP_INI_ALL 忽略重复消息的来源

`report_memleaks         0 | 1` [ 默认 : 1 ] PHP_INI_ALL 是否报道内存泄露

`track_errors      0 | 1` “0” PHP_INI_ALL 如果开启, 最后一个错误将永远存在在 $php_errormsg 中

`html_errors      0 | 1` “1” PHP_INI_ALL 在错误信息中关闭连接, 这些连接页面的地址和 docref_root 和 docref_ext 设置相关

`xmlrpc_errors        0 | 1` “0”
PHP_INI_SYSTEM 关闭正常的错误报告, 并将错误的格式设置为 XML-RPC错误信息的格式

`xmlrpc_error_number         0 | 1` “0” PHP_INI_ALL 用作 XML-RPC faultCode 元素的值

`docref_root     string` ""
PHP_INI_ALL 参考文档的根目录

`docref_ext     string` "" PHP_INI_ALL 参考文档的扩展名 docref_ext的值必须以 “.” 开头

`error_prepend_string     string` NULL
PHP_INI_ALL 错误信息之前输出的内容

`error_append_stringstring` NULL
PHP_INI_ALL 错误信息之后输出的内容

`error_log     string` NULL PHP_INI_ALL 设置脚本错误将被记录到的文件 如果特殊值 syslog 被设置，则将错误信息发送到系统日志记录器

## 函数

`array debug_backtrace ([ int $options = DEBUG_BACKTRACE_PROVIDE_OBJECT [, int $limit = 0 ]] )` 生成当前位置的追踪, 返回数组 生成一个关联数组, 包含当前位置的函数的调用信息
function __FUNCTION__ 函数名称 line __LINE__ 行号 file __FILE__ 文件名称 class __CLASS__ 类的名称 object 当前对象 type 类型 -> 对象方法调用 :: 静态方法调用 args
如果是函数,返回一系列的参数 如果是包含的文件,显示一系列包含的文件 `void debug_print_backtrace ([ int $options = 0 [, int $limit = 0 ]] )`
同上,将数组打印出来 `array error_get_last ( void )` 以数组形式返回上一个发生的错误 type 错误的类型常数 [error_reporting 设置php运行时错误报警] message 错误的信息
file 所在文件 line 行号

`bool error_log ( string $message [, int $message_type = 0 [, string $destination [, string $extra_headers ]]] )` 发送一个错误到某个地方 $message 错误的信息
$message_type 告知错误需要存储的地方 0 发送到PHP的系统日志 1 发送到 *destination指定的邮件地址*,*只有这个选项*extra_header才能用到 2 不在是一个选项 3 信息附加到
$destination 指定的文件位置, 换行符不会自动添加 4 信息发送到SAPI日志处理器 $destination 目标, 文件或者邮件地址 $extra_header 指定 $destination
参数之后指定的可选参数 `int error_reporting ([ int $level ] )` 设置PHP错误的报道级别, 设置运行时的错误报道级别, 如果没哟设置,则返回当前的错误级别 这里接收一个位运算,
或者命名的常量 0 关闭 `mixed set_error_handler ( callable $error_handler [, int $error_types = E_ALL | E_STRICT ] )` 设置用户自定义的错误处理函数,
可以设置运行时候的错误处理, 或者使用trigger_error来触发一个错误, 返回的是预先定义的错误处理函数 $error_handler 错误处理函数 handler ( int $errno , string
$errstr [, string $errfile [, int $errline [, array $errcontext ]]] ) $errno 错误发生的级别常数 $errstr 错误信息 $errfile 错误文件 $errline 错误行号 $errcontext
指出错误的上下文文本 $error_types 错误的类型,如果这个不指定,则默认是error_reporting 中指定的类型 这里的类型不能是 核心错误–> E_ERROR, E_PARSE, E_CORE_ERROR,
E_CORE_WARNING, E_COMPILE_ERROR, E_COMPILE_WARNING 只能是用户自定义的错误 E_USER_ERROR, E_USER_WARNING, E_USER_NOTICE `bool restore_error_handler ( void )`
返回之前设置的错误处理函数, 使用set_error_handler设置了错误处理函数之后, 这个函数恢复上一个错误处理函数. callable set_exception_handler ( callable
$exception_handler ) 设置默认的异常处理函数, 这个异常处理函数必须在调用本函数之前设置, 如果异常没有被捕捉到的时候执行这个定义的函数, 异常在调用定义的函数后停止执行脚本
$exception_handler 指定异常出现的时候的异常处理函数的名称, 这个函数只接受一个函数,就是异常出现的时候抛出的异常处理对象 `bool restore_exception_handler ( void )`
恢复到上一个定义的异常处理函数的状态

`bool trigger_error ( string $error_msg [, int $error_type = E_USER_NOTICE ] )` 触发一个用户级别的错误 $error_msg 错误信息 $error_type 触发的用户错误的级别