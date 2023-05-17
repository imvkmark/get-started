# 压缩与归档扩展-zip

zip提供了一个读写zip压缩文件的方法

## 安装

5.2之后办需要 zip 扩展

## 资源类型

本函数定义了两个资源类型, 第一个就是zip directory, 另一个是 zip Entry

使用

1. 建立
2. 读取
3. 作为一个zip流使用.

## 函数

### 类方法

`bool addEmptyDir ( string $dirname )`

添加一个空目录

`bool addFile ( string $filename [, string $localname = NULL [, int $start = 0 [, int $length = 0 ]]] )`

向zip中添加一个文件 - $filename 需要添加的文件名称 - $localname 如果提供,则替换原始的文件名 - $start , $length 尚未使用.

`bool addFromString ( string $localname , string $contents )`

添加一个字串到一个文件

`bool close ( void )`

关闭zipArchive对象, 关闭打开的或者创建的zip

`bool deleteIndex ( int $index )`

根据数字索引删除文件

`bool deleteName ( string $name )`

根据文件名称删除文件, 可以使用目录来删除目录

`bool extractTo ( string $destination [, mixed $entries ] )`

解压指定的文件或者全部的文件到目标路径

`string getArchiveComment ([ int $flags ] )`

获取zip的注释

`string getCommentIndex ( int $index [, int $flags ] )`

根据索引获取文件的注释 - $index 文件在 zip Archive中的索引 - $flags 如果设置为: ZIPARCHIVE::FL_UNCHANGED 原始未改变的注释返回

`string getCommentName ( string $name [, int $flags ] )`

根据文件名称返回条目的索引 - $flags 同上

`mixed getFromIndex ( int $index [, int $length = 0 [, int $flags ]] )`

根据索引返回文件的内容 - $index 索引 - $length 如果是 0 ,读取全部,如果是长度则返回指定的长度部分 - $flags
ZIPARCHIVE::FL_UNCHANGED ZIPARCHIVE::FL_COMPRESSED

`mixed getFromName ( string $name [, int $length = 0 [, int $flags ]] )`

根据名称返回文件的内容

`string getNameIndex ( int $index [, int $flags ] )`

根据索引返回名称

`string getStatusString ( void )`

返回状态信息

`resource getStream ( string $name )`

根据名称返回一个文件处理的 zip文件流

`mixed locateName ( string $name [, int $flags ] )`

根据名称返回在 zip Archive 中的index. - $flags ZIPARCHIVE::FL_NOCASE ZIPARCHIVE::FL_NODIR

`mixed open ( string $filename [, int $flags ] )`

打开一个zip来读写或者修改. - $filename 文件位置 - $flags 用来打开压缩文件的格式 ZIPARCHIVE::OVERWRITE ZIPARCHIVE::CREATE ZIPARCHIVE::EXCL ZIPARCHIVE::CHECKCONS

`bool renameIndex ( int $index , string $newname )`

根据索引来重命名

`bool renameName ( string $name , string $newname )`

根据名称重命名

`mixed setArchiveComment ( string $comment )`

设置注释

`mixed setCommentIndex ( int $index , string $comment )`

设置单个文件的注释,根据索引

`mixed setCommentName ( string $name , string $comment )`

根据名称设置注释

`mixed statIndex ( int $index [, int $flags ] )`

根据索引来获取文件的详细信息

`mixed statName ( name $name [, int $flags ] )`

根据名称来获得文件的详细信息

`mixed unchangeAll ( void )`

取消所有操作

`mixed unchangeArchive ( void )`

取消所有全局操作, 现在这个只是取消注释操作

`mixed unchangeIndex ( int $index )`

取消所有在给定 索引上做的修改

`mixed unchangeName ( string $name )`

取消所有在给定名称上做的修改

### 函数方法

`void zip_close ( resource $zip )`

关闭zip资源, 关闭使用zip open打开的操作

`bool zip_entry_close ( resource $zip_entry )`

关闭目录资源,使用zip_entry_open()打开的

`int zip_entry_compressedsize ( resource $zip_entry )`

取回目录压缩之后的大小, 条目信息

`string zip_entry_compressionmethod ( resource $zip_entry )`

返回压缩目录的方法

`int zip_entry_filesize ( resource $zip_entry )`

返回指定目录的实际文件的大小

`string zip_entry_name ( resource $zip_entry )`

返回指定目录 的名称

`bool zip_entry_open ( resource $zip , resource $zip_entry [, string $mode ] )`

返回一个读取的文件条目 不像是fopen或者其他资源函数,这里的返回值只是指定了操作的结果,不需要读和关闭这个目录项 - $zip 使用zip_open 打开的资源处理器 - $zip_entry 使用 zip_read 打开的目录 - $mode fopen指定的 模式, 如果不指定,默认是 ‘rb’

`string zip_entry_read ( resource $zip_entry [, int $length ] )`

从zip_entry读取数据 - $length 如果不指定,默认是 1024

`resource zip_open ( string $filename )`

打开一个zip文件

`resource zip_read ( resource $zip )`

读取下一个zip文件中的条目, 返回一个zip_entry 资源