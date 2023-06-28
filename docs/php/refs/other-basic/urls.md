# 其它基本扩展 - URLs

处理URL字串, 编码,解码, 解析

## 安装

## 配置

## 定义常量

PHP_URL_SCHEME (integer) PHP_URL_HOST (integer) PHP_URL_PORT (integer) PHP_URL_USER (integer) PHP_URL_PASS (integer) PHP_URL_PATH (integer) PHP_URL_QUERY (integer) PHP_URL_FRAGMENT (integer) PHP_QUERY_RFC1738 (integer) PHP_QUERY_RFC3986 (integer)

## 函数

`string base64_decode ( string $data [, bool $strict = false ] )`

对使用 MIME base64 编码的数据进行解码

`string base64_encode ( string $data )`

使用 base64 对 data 进行编码。 设计此种编码是为了使二进制数据可以通过非纯 8-bit 的传输层传输，例如电子邮件的主体。 Base64-encoded 数据要比原始数据多占用 33% 左右的空间。

`array get_headers ( string $url [, int $format = 0 ] )`

返回一个数组，包含有服务器响应一个 HTTP 请求所发送的标头

`array get_meta_tags ( string $filename [, bool $use_include_path = false ] )`

打开 filename 逐行解析文件中的 `<meta>` 标签。解析工作将在 `</head>` 处停止 返回的关联数组以属性 name 的值作为键，属性 content 的值作为值，所以你可以很容易地使用标准数组函数遍历此关联数组或访问某个值。 属性 name 中的特殊字符将使用‘_’替换，而其它字符则转换成小写。如果有两个 meta 标签拥有相同的 name，则只返回最后出现的那一个。

`string http_build_query ( mixed $query_data [, string $numeric_prefix [, string $arg_separator [, int $enc_type = PHP_QUERY_RFC1738 ]]] )`

生成 URL-encode 之后的请求字符串

`mixed parse_url ( string $url [, int $component = -1 ] )`

本函数解析一个 URL 并返回一个关联数组，包含在 URL 中出现的各种组成部分。

! https://file.wulicode.com/note/2021/11-11/15-55-45998.png 

`string rawurldecode ( string $str )`

返回字符串，此字符串中百分号（%）后跟两位十六进制数的序列都将被替换成原义字符。

`string rawurlencode ( string $str )`

按照 RFC 1738 对 URL 进行编码 此字符串中除了 -_. 之外的所有非字母数字字符都将被替换成百分号（%）后跟两位十六进制数

`string urldecode ( string $str )`

解码给出的已编码字符串中的任何 %##。 加号（‘+’）被解码成一个空格字符。

`string urlencode ( string $str )`

返回字符串，此字符串中除了 -_. 之外的所有非字母数字字符都将被替换成百分号（%）后跟两位十六进制数，空格则编码为加号（+）