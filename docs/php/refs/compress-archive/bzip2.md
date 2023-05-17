# 压缩与归档扩展-Bzip2

## 介绍

用来读写bzip2(.bz2)压缩文件.

## 安装

开启bz2扩展

## 配置

本函数定义了 bzip2资源

## 函数

`int bzclose ( resource $bz )`

关闭bzip2 文件指针 - $bz 使用 bzopen打开的资源类型

`mixed bzcompress ( string $source [, int $blocksize = 4 [, int $workfactor = 0 ]] )`

压缩字串到 bzip2 格式 - $source 等待压缩的字串 - $blocksize 压缩的级别, 1-9, 9为最高压缩 - $workfactor

`mixed bzdecompress ( string $source [, int $small = 0 ] )`

解压编码过的数据

`int bzerrno ( resource $bz )`

返回给定文件指针的错误号

`array bzerror ( resource $bz )`

返回指定文件指针的错误号和错误字串

```
[errno]     错误号
[errstr]    错误字串
```

`string bzerrstr ( resource $bz )`

返回指定指针的错误字串

`int bzflush ( resource $bz )`

将缓存的bzip2数据写入到 文件指针

`resource bzopen ( string $filename , string $mode )`

打开一个压缩的 bz2 文件

`string bzread ( resource $bz [, int $length = 1024 ] )`

二进制安全的 bzip2 文件读取, 这里读取的时候, 可以根据指定的长度或者是EOF文件底部. - $length, 最高值是 8192bytes

`int bzwrite ( resource $bz , string $data [, int $length ] )`

二进制安全的写入 - $data, 写入的数据 - $length

## 扩展

自己封装的类(Bzip2): https://gist.github.com/imvkmark/d51595bdbea9bf2bf920