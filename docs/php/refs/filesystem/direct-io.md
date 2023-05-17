# 文件系统相关扩展 - Direct IO

PHP支持直接的 文件 读存函数在 POSIX 标准上, 但是比C的流读取要低一个档次, 这些函数应该被认为是直接操作设备需要的, 标准的Filesystem函数是比较充分的 , 这个不建议使用的 底层的文件访问函数,用该函数访问的信息使用标准的文件系统函数完全可以胜任.

## 安装

这个扩展 在 PHP5.1 之后 移动到 pecl 资源库, 这个扩展仅仅在win平台并且是PHP5.0支持

## 函数

`void dio_close ( resource $fd )`

`mixed dio_fcntl ( resource $fd , int $cmd [, mixed $args ] )`

`resource dio_open ( string $filename , int $flags [, int $mode = 0 ] )`

`string dio_read ( resource $fd [, int $len = 1024 ] )`

`int dio_seek ( resource $fd , int $pos [, int $whence = SEEK_SET ] )`

`array dio_stat ( resource $fd )`

`bool dio_tcsetattr ( resource $fd , array $options )`

`bool dio_truncate ( resource $fd , int $offset )`

`int dio_write ( resource $fd , string $data [, int $len = 0 ] )`