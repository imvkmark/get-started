# 压缩与归档扩展-rar

读取rar文件的扩展

## 安装

linux

```
pecl -v install rar
```

win : http://downloads.php.net/pierre/

## 配置

无

## 函数

这个类扩展了一个rar 压缩文件. 可能被分配到多个卷中.包含了一系列的文件.

### class RarArchive

`bool close ( void )` `bool rar_close ( RarArchive $rarfile )`

关闭 Rar archive并且清空资源

`string getComment ( void )` `string rar_comment_get ( RarArchive $rarfile )`

获取注释的信息

`array getEntries ( void )` `array rar_list ( RarArchive $rarfile )`

获取完整的文件的列表

`RarEntry getEntry ( string $entryname )` `RarEntry rar_entry_get ( RarArchive $rarfile , string $entryname )`

根据文件和名称获取 RarEntry 对象

`bool isBroken ( void )` `bool rar_broken_is ( RarArchive $rarfile )`

检测文件是否完成

`bool isSolid ( void )` `bool rar_solid_is ( RarArchive $rarfile )`

检测文件是否 solid

`static RarArchive open ( string $filename [, string $password = NULL [, callable $volume_callback = NULL ]] )` `RarArchive rar_open ( string $filename [, string $password = NULL [, callable $volume_callback = NULL ]] )`

打开rar文件.并且返回一个 rarArchive 对象

`bool setAllowBroken ( bool $allow_broken )` `bool rar_allow_broken_set ( RarArchive $rarfile , bool $allow_broken )`

是否允许破损文件

`string __toString ( void )`

---

### class RarEntry

`bool extract ( string $dir [, string $filepath = '' [, string $password = NULL [, bool $extended_data = false ]]] )`

从 rar 中 释放文件到指定目录 - $dir 需要释放的目录 - $filepath 这个参数覆盖了 $dir参数和原始的文件名称 - $pasword 密码 - $extended_data

`int getAttr ( void )`

获取基于系统的条目的属性

`string getCrc ( void )`

获取crc

`string getFileTime ( void )`

获取文件名称

`int getHostOs ( void )`

Host系统

`int getMethod ( void )`

打包的方法

`string getName ( void )`

文件名称

`int getPackedSize ( void )`

文件大小,压缩的大小

`resource getStream ([ string $password ] )`

返回文件的操作流, file可操作的

`int getUnpackedSize ( void )`

解压缩之后的大小

`int getVersion ( void )`

版本号

`bool isDirectory ( void )`

是否目录

`bool isEncrypted ( void )`

是否加密过

`string __toString ( void )`

### class RarException

`public static bool isUsingExceptions ( void )`

检测是否错误处理异常使用.

`public static void setUsingExceptions ( bool $using_exceptions )`

激活或者禁用错误异常处理