---
description: 'Exif是一种用于读取数码相机拍摄照片元数据的技术，包括拍摄参数、设备信息等。使用时需安装相应库或工具，配置环境后调用函数即可解析图像文件中的Exif数据。'
lastUpdated: '2026-06-17 19:01:28'
head:
  - - meta
    - name: 'og:title'
      content: 'Exif - 读取数码相机的信息'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Exif是一种用于读取数码相机拍摄照片元数据的技术，包括拍摄参数、设备信息等。使用时需安装相应库或工具，配置环境后调用函数即可解析图像文件中的Exif数据。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/image/exif.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/cf3ea81b0128d97768b74c670079fad2.png'
---
# Exif - 读取数码相机的信息

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

![](https://file.wulicode.com/feishu-images/cf3ea81b0128d97768b74c670079fad2.png)

`array exif_read_data ( string $filename [, string $sections = NULL [, bool $arrays = false [, bool $thumbnail = false ]]] )`

[alias] read_exif_data() 不建议使用 exif_read_data() 函数从 JPEG 或 TIFF 图像文件中读取 EXIF 头信息。这样就可以读取数码相机产生的元数据。

`string exif_tagname ( int $index )`

获取索引的标签名称

`string exif_thumbnail ( string $filename [, int &$width [, int &$height [, int &$imagetype ]]] )`

读取 TIFF 或 JPEG 图像中的嵌入缩略图。如果图像不包含缩略图则返回 FALSE。

![](https://file.wulicode.com/feishu-images/ed6da83531fa1b1a7e81b65606a707bd.png)

![](https://file.wulicode.com/feishu-images/7b86a4924e39cb142d7d6dcd9515ef4b.png)