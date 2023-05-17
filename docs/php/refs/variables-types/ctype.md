# 与变量和类型有关的扩展 - Ctype

Php的Ctype扩展函数提供了一组函数用于校验字符串中的字符是否是正确的格式，这篇文章我们主要介绍一下这些字符串验证函数的语法、有什么特殊的函数，如何去验证。

## 安装

Ctype扩展在php 4.2以上的版本中是默认开启的，如果你不想你的PHP运行这个扩展你可以在编译的时候使用: –disable-ctype 来禁用这个扩展。

如果你有C语言的背景，你会发现PHP的Ctype与C语言的字符串处理很相似（PHP是C语言写的），如果你是Python程序员你会发现PHP的Ctype与Python的ctype库是不同的。

配置

定义常量

## 函数

函数说明: http://sjolzy.cn/PHP-Ctype-function.html http://ifanybug.com/article/00137.html

`bool ctype_alnum ( string $text )`

检测是否是只包含[A-Za-z0-9]

`bool ctype_alpha ( string $text )`

检测是否是只包含[A-Za-z]

`bool ctype_cntrl ( string $text )`

检查是否是只包含类是“之类的字 符控制字符

`bool ctype_digit ( string $text )`

检查时候是只包含数字字符的字符串（0-9）

`bool ctype_graph ( string $text )`

检查是否是只包含有可以打印出来的字符（除了空格）的字符串

`bool ctype_lower ( string $text )`

检查是否所有的字符都是英文字母，并且都是小写的

`bool ctype_print ( string $text )`

检查是否是只包含有可以打印出来的字符的字符串

`bool ctype_punct ( string $text )`

检查是否是只包含非数字/字符/空格的可打印出来的字符

`bool ctype_space ( string $text )`

检查是否是只包含类是“ ”之类的字符和空格

`bool ctype_upper ( string $text )`

检查是否所有的字符都是英文字母，并且都是大写的

`bool ctype_xdigit ( string $text )`

检查是否是16进制的字符串，只能包括 “0123456789abcdef”