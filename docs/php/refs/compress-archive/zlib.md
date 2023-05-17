# 压缩与归档扩展-zlib

这个模块允许你读写gzip(.gz)格式的文件.通过更多的文件系统函数结合gzip

## 安装

PHP已经内建了对该扩展的支持,不需要加载任何东西

## 配置

`zlib.output_compression` 默认: “0”

PHP_INI_ALL 是否启用页面的透明压缩.如果开启, 如果浏览器发送 Accept-Encoding: gzip" or “deflate” Content-Encoding: “gzip” OR “deflate”) 将在输出时候添加到头部.如果设置为数值,这是缓冲区的大小. 如果设置了 On, output_handler 必须设置为空

`zlib.output_compression_level` 默认 : “-1”

PHP_INI_ALL 压缩级别 0-9, 9为最大压缩,让系统自动决定

`zlib.output_handler` 默认 : ""

PHP_INI_ALL 如果启用了 zlib.output_compression , 这个值必须设置为空

## 资源类型

这个扩展指定一个文件指针. 使用gzopen()返回的文件指针

## 函数

`bool gzclose ( resource $zp )`

关闭 gz 文件指针. - $zp gzopen打开的文件指针

`string gzcompress ( string $data [, int $level = -1 ] )`

使用 zlib 数据格式 压缩压缩给定的字串, 这个不同于 gzip compression, 这个包含一些头数据 - $level 默认值为 -1, 即 6, [0-9]

`string gzdecode ( string $data [, int $length ] )`

解码一个gzip 压缩过的数据 - $data 使用 gzencode 压缩过的数据, - $length 解码的最大长度数据.

`string gzdeflate ( string $data [, int $level = -1 ] )`

只用 deflate 数据压缩给定的数据

`string gzencode ( string $data [, int $level = -1 [, int $encoding_mode = FORCE_GZIP ]] )`

这个函数返回一个压缩过的数据, 这个数据和gzip程序兼容. - $encoding_mode FORCE_GZIP 默认 FORCE_DEFLATE 使用这个参数将得到一个zlib数据(包含头部)

`int gzeof ( resource $zp )`

检测是否到了末尾

`array gzfile ( string $filename [, int $use_include_path = 0 ] )`

将整个 gz 文件读入数组.这个函数和 readgzfile() 相同,

`ing gzgetc ( resource $zp )`

返回文件包中尚未压缩的一个字串.这里gz资源必须是可用的

`string gzgets ( resource $zp , int $length )`

从文件指针中读取一行, 获取未被压缩的字串.读取的长度为 $length-1, 或者换汉服,或者 eof.

`string gzgetss ( resource $zp , int $length [, string $allowable_tags ] )`

从文件中读取一行,并且取出 标签. - $allowable_tags 允许的参数.

`string gzinflate ( string $data [, int $length = 0 ] )`

使用gz的inflate方法解压缩一个 使用deflate方法压缩过的数据

`resource gzopen ( string $filename , string $mode [, int $use_include_path = 0 ] )`

打开一个gz 文件,用来读写 - $mode rb/wb 包含一个压缩级别 wb9 f filtered 数据 h Huffan数据 - $use_include_path 是否使用包含的路径作为搜索

`int gzpassthru ( resource $zp )`

从当前位置读取到文件末尾,并且将未压缩的数据写出到标准输出.

`string gzread ( resource $zp , int $length )`

二进制安全的 gz-file 读取机制.

`bool gzrewind ( resource $zp )`

重置 gz 文件指针的位置

`int gzseek ( resource $zp , int $offset [, int $whence = SEEK_SET ] )`

设置偏移位置. - $offset 偏移的字节数

`int gztell ( resource $zp )`

返回当前给定文件指针的偏移位置.

`string gzuncompress ( string $data [, int $length = 0 ] )`

通过gz方法解压缩一个压缩过的字串.

`int gzwrite ( resource $zp , string $string [, int $length ] )`

二进制安全的文件写入方式.

`int readgzfile ( string $filename [, int $use_include_path = 0 ] )`

读取,解压缩,并且输出.

`string zlib_decode ( string $data [, string $max_decoded_len ] )`

[php5.4]解压缩 raw/gzip/zlib 格式的字串

`string zlib_encode ( string $data , string $encoding [, string $level = -1 ] )`

[php5.4]压缩指定的字串使用指定的编码

`string zlib_get_coding_type ( void )`

获取输出雅俗的代码的类型.