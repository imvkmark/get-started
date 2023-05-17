# 面向服务器的扩展 - Apache

这些函数仅在 PHP 以 Apache 模块运行时有效

## 安装

## 配置

`engine` “1”

PHP_INI_ALL 打开或关闭 PHP 解析。本指令仅在使用 PHP 的 Apache 模块版本时才有用。可以基于目录或者虚拟主机来打开或者关闭 PHP。将 engine off 放到 httpd.conf 文件中适当的位置就可以激活或禁用 PHP

`child_terminate` “0”

PHP_INI_ALL 指定 PHP 脚本在请求结束后是否可以要求终止子进程

`last_modified` “0”

PHP_INI_ALL 在本次请求中发送一个头信息 Last-Modified:，显示 PHP 脚本最后被修改的日期

`xbithack` “0”

PHP_INI_ALL 不管文件结尾是什么，将文件作为 PHP 以可执行位组来解析

## 函数

`bool apache_child_terminate ( void )`

在本次请求结束后终止 apache 子进程 本函数未再windows平台下实现

`array apache_get_modules ( void )`

列出 apache 加载的模块, 以数组形式返回

`string apache_get_version ( void )`

返回apache当前版本号和php版本号,本函数依据http.conf文件中的 ServerTokens 配置

`string apache_getenv ( string $variable [, bool $walk_to_top = false ] )`

获取apache的环境变量, 根据传递进去的参数来获取,Apache 2以上版本可行

`object apache_lookup_uri ( string $filename )`

本函数对一个 URL 执行部分请求。取得所有有关给定资源的重要信息后就停手 > 返回对象的属性: 1.status 2.the_request 3.status_line 4.method 5.content_type 6.handler 7.uri 8.filename 9.path_info 10.args 11.boundary 12.no_cache 13.no_local_copy 14.allowed 15.send_bodyct 16.bytes_sent 17.byterange 18.clength 19.unparsed_uri 20.mtime 21.request_time

`string apache_note ( string $note_name [, string $note_value = "" ] )`

取得或设置 apache 请求记录

`array apache_request_headers ( void )`

取回所有的http请求头部

`bool apache_reset_timeout ( void )`

重置 apache 的写入计时器, 默认是300(S), 一下这三个函数理论上可以使 apache 持续运行 set_time_limit(0); ignore_user_abort(true); apache_reset_timeout()

`array apache_response_headers ( void )`

获取apache的响应头部 [5.4.0] 开始支持fast CGI 模式, 之前只是支持 模块化运行

`bool apache_setenv ( string $variable , string $value [, bool $walk_to_top = false ] )`

设置apache 子进程的环境变量

`array getallheaders ( void )`

获取所有的请求头部信息

`bool virtual ( string $filename )`

执行一个apache 子请求 virtual 是 apache指定的函数, 和 `<!--#include virtual...-->`类似, 这个执行apache子请求, 这个是在cgi模式或者 .shtml 文件下可用的