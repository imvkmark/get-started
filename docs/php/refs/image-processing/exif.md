# 图像生成和处理-Exif

使用image元数据进行工作, 可以读取数码相机的信息.

## 安装

编译时候必须开启 –enable-exif, PHP不需要任何附加库, win 用户需要加载 mbsting 扩展, 和php_exif.dll 扩展, 并且 mbstring 扩展先于 exif 扩展前加载

## 配置

`exif.encode_unicode` “ISO-8859-15”

PHP_INI_ALL 定义了 UNICODE 用户注释被处理的字符集

`exif.decode_unicode_motorola` “UCS-2BE” PHP_INI_ALL

`exif.decode_unicode_intel` “UCS-2LE” PHP_INI_ALL

`exif.encode_jis` "" PHP_INI_ALL

`exif.decode_jis_motorola` “JIS” PHP_INI_ALL

`exif.decode_jis_intel` “JIS” PHP_INI_ALL

## 函数

`int exif_imagetype ( string $filename )`

exif_imagetype() 读取一个图像的第一个字节并检查其签名。 返回值和 getimagesize() 返回的数组中的索引 2 的值是一样的，但本函数快得多。

![https://file.wulicode.com/note/2021/11-11/16-01-56352.png](https://file.wulicode.com/note/2021/11-11/16-01-56352.png)

`array exif_read_data ( string $filename [, string $sections = NULL [, bool $arrays = false [, bool $thumbnail = false ]]] )`

[alias] read_exif_data() 不建议使用 exif_read_data() 函数从 JPEG 或 TIFF 图像文件中读取 EXIF 头信息。这样就可以读取数码相机产生的元数据。

`string exif_tagname ( int $index )`

获取索引的标签名称

`string exif_thumbnail ( string $filename [, int &$width [, int &$height [, int &$imagetype ]]] )`

读取 TIFF 或 JPEG 图像中的嵌入缩略图。如果图像不包含缩略图则返回 FALSE。

![https://file.wulicode.com/note/2021/11-11/16-02-09221.png](https://file.wulicode.com/note/2021/11-11/16-02-09221.png)

![https://file.wulicode.com/note/2021/11-11/16-02-23599.png](https://file.wulicode.com/note/2021/11-11/16-02-23599.png)