# APC - 可选的 PHP 缓存 <Badge type="danger" text="deprecated" />

## 介绍

高级php缓存扩展, windows 下没有编译出此扩展

APC -> 开放自由的 opcode 缓存, 目标是提供一个自由开放健全的框架用于缓存和优化的中间件

Opcode是一种PHP脚本编译后的中间语言，就像Java的ByteCode,或者.NET的MSL

## 安装

在 Linux上安装 PHP的缓存 APC

Installing APC in Windows

APC Windows downloads

PHP APC for Windows

## 配置(php.ini)

WIN : 在Windows上，APC需要一个临时目录，并且Web服务器对这个目录可写，APC会检测TMP,TEMP,USERPROFILE这些Windows的环境变量，如果这些都没有，会检查系统文件夹下的WINDOWS目录

`apc.enabled   0|1`

PHP_INI_SYSTEM 是否启用apc

`apc.shm_segments  integer`

PHP_INI_SYSTEM 编译器要分配的的共享内存块的数目

`apc.shm_size     integer`

PHP_INI_SYSTEM 以 MB 为单位的每个共享内存块的大小

`apc.optimization   integer`

PHP_INI_ALL 优化级别, 设为 0 则禁用优化器，更高的值则使用更主动的优化

`apc.num_files_hint  integer`

PHP_INI_SYSTEM 服务器上被包含或被请求的不同源文件数目的大概估计

`apc.user_entries_hint     integer`

PHP_INI_SYSTEM 根据唯一用户数来存储缓存变量

`apc.ttl     integer`

PHP_INI_SYSTEM 缓存条目在缓冲区中允许逗留的秒数, 缓冲区被填满则不能存储新的条目, 0代表永不过期, 大于0, apc将尝试删除旧的条目

`apc.user_ttl     integer`

PHP_INI_SYSTEM 对于每个用户而言的

`apc.gc_ttl     integer`

PHP_INI_SYSTEM 缓存条目在垃圾回收表中能够存在的秒数, 0为禁用

`apc.cache_by_default    0|1`

PHP_INI_ALL 默认为 1, 表示全部缓存,如果关闭,则 apc.filters会使用.

`apc.filters`

PHP_INI_SYSTEM 一个以 " , " 分割的 POSIX 扩展正则表达式列表, 默认的是匹配的文件不缓存,因为默认的是“-”, 如果正则表达式的第一个字符是+
t则意味着任何匹配表达式的文件会被缓存，如果第一个字符是 - 则任何匹配项都不会被缓存

`apc.mmap_file_mask     string`

PHP_INI_SYSTEM 真心看不懂

`apc.slam_defense     integer`

PHP_INI_SYSTEM 百分比的跳过比率设置

`apc.file_update_protection     integer`

PHP_INI_SYSTEM 文件更新保护, 如果一个文件最后访问的时间和更新时间小于这个数值则不作缓存.

`apc.enable_cli     integer`

PHP_INI_SYSTEM 是否为CLI版本启用APC功能

`apc.max_file_size     integer`

PHP_INI_SYSTEM 文件大于这个大小的不缓存

`apc.use_request_time`

PHP_INI_ALL 使用SAPI的请求开始时间

`apc.stat     integer`

PHP_INI_SYSTEM 是否启用脚本更新检查

`apc.write_lock     0 | 1`

PHP_INI_SYSTEM 写锁保证只有一个进程将尝试编译并缓存未缓存的脚本

`apc.report_autofilter     0 | 1`

PHP_INI_SYSTEM 是否记录所有由于early/late binding原因而自动未被缓存的脚本

`apc.include_once_override      0 | 1`

PHP_INI_SYSTEM 优化include_once()和require_once()函数以避免执行额外的系统调用

`apc.rfc1867 0|1`

PHP_INI_SYSTEM 开启文件上传的APC控制 当开启的时候 ,指定 APC_UPLOAD_PROGRESS 这个选项将会开启apc的功能的调用

`apc.rfc1867_prefix      string`

PHP_INI_SYSTEM 用于上传文件的缓冲项条目名称前缀

`apc.rfc1867_name     string`

PHP_INI_SYSTEM 需要由APC处理的上传文件的隐藏表单项名称

`apc.rfc1867_freq     integer` PHP_INI_SYSTEM 用户上传文件缓存项的更新频率, 也可以说是进度.

`apc.rfc1867_ttl     integer` PHP_INI_SYSTEM 延迟

`apc.localcache     integer` PHP_INI_SYSTEM 使用本地缓存

`apc.localcache.size     integer` PHP_INI_SYSTEM 本地缓存的大小

`apc.coredump_unmap  integer` PHP_INI_SYSTEM

`apc.stat_ctime  integer` PHP_INI_SYSTEM 验证创建时间

`apc.preload_path string` PHP_INI_SYSTEM 上传的文件路径

`apc.file_md5  0|1` PHP_INI_SYSTEM 记录文件的MD5值

`apc.canonicalize  0|1` PHP_INI_SYSTEM 如果设置为口开启,则在no-state模式将相对路径更改为绝对路径

`apc.lazy_functions  0|1` PHP_INI_SYSTEM 用函数延迟加载

`apc.lazy_classes 0|1` PHP_INI_SYSTEM 启用类延迟加载

## 函数

`bool apc_add ( string $key , mixed $var [, int $ttl = 0 ] )`

缓存一个变量到缓存中, 如果指定时间,则在多少s之后被移除, 否则缓存系统使用clear，或者restart等 , 变量一直存在在缓存中 这个仅仅适用于缓存不存在的时候去添加,
如果已经存在且没有到延迟时间, 将不会对缓存变量做任何操作

`bool apc_store ( string $key , mixed $var [, int $ttl = 0 ] )`

缓存变量到缓存中,如果存在,则给你覆盖

`mixed apc_fetch ( mixed $key [, bool &$success ] )`

从服务器取出一个变量, 成功 *success为true*,*失败为false*;*同样返回也是false或者变量*,*为了区别false和存储的变量*,*尽量使用*success 可以使用数组的值进行一连串的调用

`mixed apc_exists ( mixed $keys )`

检测变量是否存在,如果是一个数组,则返回一个key存在的数组

`mixed apc_delete ( string $key )`

移除缓存, 成功返回true, 失败返回false

`bool apc_cas ( string $key , int $old , int $new )`

变量替换,如果变量等于$old, 则替换成 $new

`int apc_dec ( string $key [, int $step = 1 [, bool &$success ]] )`

递减一个存储的integer值,如果成功返回当前值的数值, 失败返回false

`int apc_inc ( string $key [, int $step = 1 [, bool &$success ]] )`

递增一个存储的integer值

`string apc_bin_dump ([ array $files [, array $user_vars ]] )`

根据文件或用户变量,获取编译之后的opcode

`bool apc_bin_load ( string $data [, int $flags = 0 ] )`

加载编译之后的opcode

`int apc_bin_dumpfile ( array $files , array $user_vars , string $filename [, int $flags = 0 [, resource $context ]] )`

将文件和变量, 缓存到一个二进制文件

`bool apc_bin_loadfile ( string $filename [, resource $context [, int $flags ]] )`

加载缓存的二进制文件

`array apc_cache_info ([ string $cache_type [, bool $limited = false ]] )`

apc 缓存的信息[数组形式返回]

```
Array
(
    [num_slots] => 1031 区块
    [ttl] => 0                     存储的时间
    [num_hits] => 4                点击次数
    [num_misses] => 2
    [num_inserts] => 2
    [expunges] => 0                摘掉
    [start_time] => 1347822191
    [mem_size] => 4168             内存占用
    [num_entries] => 1
    [file_upload_progress] => 1
    [memory_type] => mmap          内存类型
    [locking_type] => pthread mutex Locks
    [cache_list] => Array          缓存的类型
    (
        [0] => Array
        (
            [type] => file               文件缓存
            [device] => 2050
            [inode] => 134911
            [filename] => /home/vsftpd/phpuser/apc/show.php
            [num_hits] => 4
            [mtime] => 1347822690
            [creation_time] => 1347822692
            [deletion_time] => 0
            [access_time] => 1347822701
            [ref_count] => 1
            [mem_size] => 4168
        )
    )
    [deleted_list] => Array()
    [slot_distribution] => Array()
)
```

`bool apc_clear_cache ([ string $cache_type ] )`

清空缓存

`mixed apc_compile_file ( string $filename [, bool $atomic = true ] )`

根据传递的过滤器来过滤文件并且返回opcode缓存

`bool apc_define_constants ( string $key , array $constants [, bool $case_sensitive = true ] )`

定义一系列常量, 由于define函数是臭名昭著的慢,所以这个是一个很快速的函数

`mixed apc_delete_file ( mixed $keys )`

删除编译完成的缓存的opcode文件

`bool apc_load_constants ( string $key [, bool $case_sensitive = true ] )`

加载定义的常量

`array apc_sma_info ([ bool $limited = false ] )`

获取 apc 的共享内存分配信息 shared memory allocation 信息

```
Array
(
    [num_seg] => 1
    [seg_size] => 33554352
    [avail_mem] => 33529392
    [block_lists] => Array
        (
            [0] => Array
                (
                    [0] => Array
                        (
                            [size] => 33529368
                            [offset] => 25016
                        )

                )

        )

)
```

`public APCIterator::__construct ( string $cache [, mixed $search = null [, int $format [, int $chunk_size = 100 [, int $list ]]]] )`

创建迭代器

```
$cache      :     user / file
$search     :     用来匹配缓存键值的正则表达式, 或者数组键值表达式,
$format     :     常量定义的格式
$chunk_size :     截断的大小
$list       :     列表中的类型
```

`public mixed APCIterator::current ( void )`

获取当前的条目

`public int APCIterator::getTotalCount ( void )`

获取当前的总大小

`public int APCIterator::getTotalHits ( void )`

获取总的缓存点击数

`public int APCIterator::getTotalSize ( void )`

获取总的缓存大小

`public string APCIterator::key ( void )`

获取键值

`public void APCIterator::next ( void )`

向下移动

`public void APCIterator::rewind ( void )`

重置迭代器到第一个元素

`public void APCIterator::valid ( void )`

检测当前的迭代器位置是否可用