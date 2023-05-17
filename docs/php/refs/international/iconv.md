# 国际化与字符编码支持 - iconv

这个模块包含了一个熟练展缓字串的接口, 使用这个模块,你能转换一个字串从一个本地的字串设置成ing一个字串集.这个也可能是Unicode字串.支持的字串设置, 基于系统上的iconv接口,注意,这个iconv哈数在有些系统上可能不像你期待的那样期待.作为一个更好的方法是安装gun libiconv 库, 这个节骨很可能是相同的.在 PHP 5.0.0 开始,这个扩展和更多函数帮助写脚本.下边让我引导你看到更多的特性

## 安装

如果你的系统使用 POSIX 继承的系统,你不需要安装东西, 因为标准 C 库已经支持了. 否则的话你需要安装 libiconv 库.

## 配置

`iconv.input_encoding` “ISO-8859-1”

PHP_INI_ALL 输入的值

`iconv.output_encoding` “ISO-8859-1”

PHP_INI_ALL 输出的编码

`iconv.internal_encoding` “ISO-8859-1”

PHP_INI_ALL

## 函数

`mixed iconv_get_encoding ([ string $type = "all" ] )`

获取 iconv 扩展变量的内部配置

`array iconv_mime_decode_headers ( string $encoded_headers [, int $mode = 0 [, string $charset = ini_get("iconv.internal_encoding") ]] )`

解码 MINIE 头部 - $encoded_headers 已经编码过的headers - $mod
ICONV_MIME_DECODE_STRICT 严格模式 ICONV_MIME_DECODE_CONTINUE_ON_ERROR 忽略错误 - $charset 设置结果字符集

`string iconv_mime_decode ( string $encoded_header [, int $mode = 0 [, string $charset = ini_get("iconv.internal_encoding") ]] )`

编码 MIME 头部

`string iconv_mime_encode ( string $field_name , string $field_value [, array $preferences = NULL ] )`

建立 MIME 头部

`bool iconv_set_encoding ( string $type , string $charset )`

设置配置的值. - $type
input_encoding output_encoding internal_encoding - $character 设置的字符

`int iconv_strlen ( string $str [, string $charset = ini_get("iconv.internal_encoding") ] )`

根据字符集返回字串

`int iconv_strpos ( string $haystack , string $needle [, int $offset = 0 [, string $charset = ini_get("iconv.internal_encoding") ]] )`

查找字串第一次出现的位置

`int iconv_strrpos ( string $haystack , string $needle [, string $charset = ini_get("iconv.internal_encoding") ] )`

查找字串最后一次出现的位置

`string iconv_substr ( string $str , int $offset [, int $length = iconv_strlen($str, $charset) [, string $charset = ini_get("iconv.internal_encoding") ]] )`

根据偏移量截取字串.

`string iconv ( string $in_charset , string $out_charset , string $str )`

从一个字符集转换到另一个字符集

`string ob_iconv_handler ( string $contents , int $status )`

将字符转换作为一个缓冲处理函数来使用. 将字符从输入字串转换为输出字串. 这个可以在 php.ini 中设置或者使用iconv_set_encoding()设置