# 压缩与归档扩展-phar

phar扩展提供了一个方法:吧完整的PHP程序放到一个文件中phar(php archive)用来便于安装和部署, 为了提供这个服务,phar扩展提供了一个抽象方法来建立和维护tar和zip文件通过pharData 类, 就像是PDO提供了一个统一的接口来访问不同的数据库一样,但是不停的是, PDO不能再多种数据库之间转换, par通常可以通过一行代码转换tar,zip, phar文件格式.

什么是phar, phar压缩是很好的字符级别和便利的方法来把很多文件集合到一个文件中, a phar 文件包提供了一个方法在一个文件中来部署PHP程序并且运行它但是不需要把他释放到磁盘上. phar通常也能够很简单的通过命令行或者服务器运行.phar是一个内置的PHP程序

phar 通过 流包装, 通常的方法是用 include 来包含php脚本, 这里的包含的文件是通过文件流来访问的, 如果可能的话,可以通过 phar 方法来访问 phar 文件

include ‘phar:///path/to/myphar.phar/file.php’;

事实上,你也可以作为一个外置磁盘来使用它, 可以使用fopen打开函数, opendir,mkdir来读,写,改变文件和目录函数,这允许完整的php程序建立在一个文件中并且在文件中运行.

最通常的应用是在一个文件中建立一个项目.比如说 pear 就是和PHP的一绑定的一个phar包.可以通过webserver建立或者通过命令行运行.

phar压缩包可以通过tar建立, zip建立,会哦这自定义的phar文件格式设计或者指定作为扩展,每一个文件格式都是有有点和缺点的,tar和zip文件格式能够通过第三方的工具和来读写, 但是phar需要在PHP下运行. phar文件是自定义的phar格式,只能够使用PHP_archive建立.有点就是phar扩展不加载的时候这个文件依旧能够正常运行.

phar 目的是做成 类似于java 的包装 jar文件一样.这样就很好的呀

## 需求

phar 需要 PHP5.2+版本, 并且需要 SPL 扩展.

## 安装

用户需要启用 php_phar.dll 文件来启用, PHP5.3+集成了这个包.

使用

// 包含文件 include ‘coollibrary.phar’;

组成

stub 根文件 内容维护介绍 文档内容 签名,phar格式需要

## 配置

`phar.readonly` 默认 : “1”

PHP_INI_ALL     这个选项禁用了在phar 文件内部修改和建立文件.这个选项在产品模式的都是启用的.

`phar.require_hash` 默认 : “1”

PHP_INI_ALL     这个选项强制所有的Phar文件包含签名.并且拒绝不包含签名的文件的运行.

`phar.extract_list` 默认 : ""

PHP_INI_ALL     允许映射简短文件 Available from phar 1.1.0 to 1.2.3, removed in 2.0.0.

`phar.cache_list` 默认 : "" PHP_INI_SYSTEM  在服务器启动的时候自定加载phar文件 Available from phar 2.0.0.

## 函数

### class Phar

`void addEmptyDir ( string $dirname )`

添加一个空目录到phar压缩文件, 这个方法二类似于 ZipArchive::addEmptyDir().

- $dirname 这里使用的话使用绝对目录?项目目录测试时候容易产生异常.

`void addFile ( string $file [, string $localname ] )`

添加一个文件到phar压缩文件, 这个方法类似于 ZipArchive::addFile().

- $file 完整的或者相对路径
- $localname 存储到目录中的名称.

`void addFromString ( string $localname , string $contents )`

添加字串到 $localname

- $localname 存储到目录中的名称
- $contents 需存储的字串

`string apiVersion ( void )`

用来建立 phar 文件的版本.

- 读 1.0.0+
- sha-256, sha-512 1.1.0+
- 存储空目录 1.1.1+

`array buildFromDirectory ( string $base_dir [, string $regex ] )`

从一个目录中的文件内部添加文件到一个phar文件, 支持子目录的文件包含

- $base_dir 根目录
- $regex 符合文件规则的正则表达式

`array buildFromIterator ( Iterator $iter [, string $base_directory ] )`

从迭代器建立一个phar文件

- $iter
    1. iterators that map the filename within the phar to the name of a file on disk
    2. 返回 splFileInfo 的 DirectoryIterator
- $base_directory splFileInfo Objects 移除的目录

`bool canCompress ([ int $type = 0 ] )` `Phar::canCompress()` 返回是否支持 zlib / bzip2 压缩

- $type Phar::GZ Phar::BZ2

`bool canWrite ( void )` `Phar::canWrite()` 返回phar扩展是否支持写入和建立phar

`object compress ( int $compression [, string $extension ] )`

使用 gzip 或者 bzip2 来压缩phar文件. 压缩的文件可以使用gunzip/ bunzip 命令.或者直接访问或者使用phar扩展透明的访问. 基于zip的phar文件,这个方法掏出一个exception, zlib扩展在gzip压缩的时候必须启用, bzip2扩展在bzip2压缩时候必须启用.如果修改内部的文件小phar.readonly必须关闭 这个方法将会重命名压缩文件. .gz, .bz2扩展名.传递 Phar::NONE将会移除扩展和压缩.,同样的扩展名也可以被第二个函数指定.

- $compression Phar::GZ Phar::BZ2 Phar::NONE
- $extension 默认的扩展名是 .phar.gz, .phar.bz2 , tar的默认的扩展名是 .phar.tar.gz, .phar.tar.bz2 解压默认的是 .phar, .phar.tar

`~~bool compressAllFilesBZIP2 ( void )~~`

[2.0.0 已经删除] 压缩phar文档使用bzip2压缩

`bool compressAllFilesGZ ( void )`

[2.0.0已经删除] 压缩phar文档使用gzip压缩

`void compressFiles ( int $compression )`

压缩当前的phar文件, 基于 tar格式的文件不支持, 对于zip和phar的格式,这个会压缩.

- $compression Phar::GZ Phar::BZ2 Phar::NONE

`__construct ( string $fname [, int $flags [, string $alias ]] )`

建立一个对象.

- $fname 已经存在的或者将要建立的archive名称
- $flags 传递给父类迭代器的
- $alias 函数中调用的 alias 名称

`PharData convertToData ([ int $format = 9021976 [, int $compression = 9021976 [, string $extension ]]] )`

转换一个可执行的 phar包到tar包或者zip文件. 为了文件不能执行. stub和phar alias 文件将被删除.如果成功,方法将建立一个新压缩包.并且返回一个pharData对象.

- $format 如果不设置,当前的格式将被保留 Phar::TAR Phar::ZIP
- $compression 需要压缩的格式 Phar::NONE Phar::GZ Phar::BZ2
- $extension 扩展名称

`Phar convertToExecutable ([ int $format = 9021976 [, int $compression = 9021976 [, string $extension ]]] )`

转换一个phar文件到灵位的文件格式.用来建立一个基于tar的可执行phar文件.

- $format Phar::PHAR, Phar::TAR, or Phar::ZIP
- $compression Phar::GZ Phar::BZ2 Phar::NONE
- $extension 扩展. `bool copy ( string $oldfile , string $newfile )`

复制一个文件到另外一个地方

`int count ( void )`

返回所有的文件数目

`string createDefaultStub ([ string $indexfile [, string $webindexfile ]] )`

建立phar格式的stubs, 好像暂时不能使用tar-,zip-base的格式文件, 当默认加载的时候默认的 stub文件就是调用.

`object decompress ([ string $extension ] )`

对于 tar, 和phar的压缩包,这个方法解压缩archive文件.

`bool decompressFiles ( void )`

解压缩当前的phar 包., 不适用于tar archive文件

`bool delMetadata ( void )`

删除phar的全局metadata

`bool delete ( string $entry )`

删除phar文件中的某文件

`bool extractTo ( string $pathto [, string|array $files [, bool $overwrite = false ]] )`

释放phar文件到一个目录

- $pathto
- $files 文件的目录或者文件列表?
- $overwrite 覆盖

`mixed getMetadata ( void )`

返回archive的metadata

`bool getModified ( void )`

返回phar文件是否被修改过

`array getSignature ( void )`

获取签名

`string getStub ( void )`

获取stub

`array getSupportedCompression ( void )`

获取支持的压缩算法

`array getSupportedSignatures ( void )`

获取支持的签名类型

`string getVersion ( void )`

获取版本号

`bool hasMetadata ( void )`

检测是否拥有全局的metadata

`void interceptFileFuncs ( void )`

拦截文件函数

`bool isBuffering ( void )`

用来检测是否一个phar立即改变磁盘内容

`mixed isCompressed ( void )`

返回是否被压缩

`bool isFileFormat ( int $format )`

文件是否基于这个格式

`bool isValidPharFilename ( string $filename [, bool $executable = true ] )`

返回给定的文件名是是否是可用的phar文件名

- $filename 尚未建立的文件名
- $executable 决定文件名是否被作为可执行包对待.

`bool isWritable ( void )`

检测phar包是否可以修改

`bool loadPhar ( string $filename [, string $alias ] )`

读取外部的phar文件包.

- $filename 完整路径或者相对路径
- $alias alias

`bool mapPhar ([ string $alias [, int $dataoffset = 0 ]] )` `Phar::mapPhar()` 这个函数在phar的loader stub 中被调用,目的是初始化 phar,当执行或者被包含的时候

`void mount ( string $pharpath , string $externalpath )`

就像是其他linux系统加载外部设备一样.这个函数允许引用外部文件或者目录.

- $pharpath 加载到本地的尚未存在的路径
- $externalpaht 外部的phar文件

`void mungServer ( array $munglist )`

定义 4个$_SERVER变量

- $munglist REQUEST_URI SCRIPT_NAME PHP_SELF SCRIPT_FILENAME

`bool offsetExists ( string $offset )`

检测文件是否存在

- $offset, 相对路径

`int offsetGet ( string $offset )`

从指定文件获取 PharFileInfo

- $offset, 相对路径

`void offsetSet ( string $offset , string $value )`

设置文件的值

`bool offsetUnset ( string $offset )`

从phar中删除一个文件.

`string running ([ bool $retphar = true ] )`

返回当前执行的完整的路径或完整的pharurl

- $retphar false fullpath true url

`bool setAlias ( string $alias )`

设置phar文件的alias

`bool setDefaultStub ([ string $index [, string $webindex ]] )`

设置默认的stub

`void setMetadata ( mixed $metadata )`

设置MetaData

`void setSignatureAlgorithm ( int $sigtype [, string $privatekey ] )`

设置签名算法

- $sigtype Phar::MD5, Phar::SHA1, Phar::SHA256, Phar::SHA512, or Phar::OPENSSL
- $privatekey key

`bool setStub ( string $stub )`

设置启动文件

`void startBuffering ( void )`

开始缓存操作,不修改磁盘上的phar文件

`void stopBuffering ( void )`

停止缓存.

`bool uncompressAllFiles ( void )`

取消压缩文件. [2.0.0]此方法已经从 phar扩展 2.0.0以上版本中删除

`bool unlinkArchive ( string $archive )`

在内存或者磁盘中删除phar文件

- $archive 磁盘路径

`void webPhar ([ string $alias [, string $index = "index.php" [, string $f404 [, array $mimetypes [, array $rewrites ]]]]] )`

基于web的phars, webapplication的前端控制 phar的前端控制.

### class PharData

pharData 类提供了一个高层的接口来访问和建立非执行的tar文件和zip文件.因为这些文件不包含stub文件并且也不能够被phar执行.这是在phar.readonly启用的时候建立zip文件和tar文件的方法和可能 `bool addEmptyDir ( string $dirname )`

添加一个空目录到tar/zip文件夹

`void Phar::addFile ( string $file [, string $localname ] )`

添加一个文件到 tar/zip 包

`bool addFromString ( string $localname , string $contents )`

添加一个文件,并且提供字串

`array Phar::buildFromDirectory ( string $base_dir [, string $regex ] )`

从目录建立

`array buildFromIterator ( Iterator $iter [, string $base_directory ] )`

从迭代器建立

`object compress ( int $compression [, string $extension ] )`

使用压缩方法来压缩本包, 这并不会修改本包内容,而是根据扩展重新生成一个包

`bool compressFiles ( int $compression )`

根据提供的压缩方法压缩本包的内容

`__construct ( string $fname [, int $flags [, string $alias [, int $format = Phar::TAR ]]] )`

建立一个pharData数据对象

`PharData convertToData ([ int $format [, int $compression [, string $extension ]]] )`

转化一个phar压缩包到一个不能执行的tar/zip文件

`Phar convertToExecutable ([ int $format [, int $compression [, string $extension ]]] )`

转化一个不可执行的文件到 可执行的文件包

`bool copy ( string $oldfile , string $newfile )`

在 phar内部复制文件

`object decompress ([ string $extension ] )`

解压缩

`bool decompressFiles ( void )`

解压缩全部的文件

`bool delMetadata ( void )`

删除元信息

`bool delete ( string $entry )`

删除文件

`bool extractTo ( string $pathto [, string|array $files [, bool $overwrite = false ]] )`

解压文件到指定目录

`bool isWritable ( void )`

检测文件包是否可以修改

`void offsetSet ( string $offset , string $value )`

这只路径的值

`bool offsetUnset ( string $offset )`

删除文件

`bool setAlias ( string $alias )`

`bool setDefaultStub ([ string $index [, string $webindex ]] )`

`void Phar::setMetadata ( mixed $metadata )`

设置元数据

`void Phar::setSignatureAlgorithm ( int $sigtype )`

设置签名算法

`bool setStub ( string $stub )`

设置stub

### class PharFileInfo

`void chmod ( int $permissions )`

设置指定的文件权限

`bool compress ( int $compression )`

压缩phar内部的文件.

`__construct ( string $entry )`

根据入口建立文件信息对象

`bool decompress ( void )`

解压当前的phar对象

`bool delMetadata ( void )`

删除元信息

`int getCRC32 ( void )`

获取crc32码

`int getCompressedSize ( void )`

获取压缩过的大小

`mixed getMetadata ( void )`

获取元信息

`int getPharFlags ( void )`

获取phar文件flag

`bool hasMetadata ( void )`

是否拥有 metadata

`bool isCRCChecked ( void )`

是否经历过校验

`bool isCompressed ([ int $compression_type = 9021976 ] )`

是否压缩过

`bool isCompressedBZIP2 ( void )`

[2.0.0] 此方法已经从 phar扩展 2.0.0以上版本中删除

`bool isCompressedGZ ( void )`

[2.0.0] 此方法已经从 phar扩展 2.0.0以上版本中删除

`bool setCompressedBZIP2 ( void )`

使用bzip2压缩 [2.0.0] 此方法已经从 phar扩展 2.0.0以上版本中删除

`bool setCompressedGZ ( void )`

[2.0.0] 此方法已经从 phar扩展 2.0.0以上版本中删除

`void setMetadata ( mixed $metadata )`

`bool setUncompressed ( void )`

[2.0.0] 此方法已经从 phar扩展 2.0.0以上版本中删除