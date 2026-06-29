---
description: 'fileinfo 是 PHP 文件系统扩展，用于获取文件的 MIME 类型和编码信息。安装可通过编译时启用或安装 PECL 包。资源类型为 fileinfo 资源。常用函数包括 finfo_open（创建资源）、finfo_file（返回文件信息）、finfo_close（关闭资源）等。'
lastUpdated: '2026-06-17 18:05:46'
head:
  - - meta
    - name: 'og:title'
      content: 'fileinfo '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'fileinfo 是 PHP 文件系统扩展，用于获取文件的 MIME 类型和编码信息。安装可通过编译时启用或安装 PECL 包。资源类型为 fileinfo 资源。常用函数包括 finfo_open（创建资源）、finfo_file（返回文件信息）、finfo_close（关闭资源）等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/file-process/fileinfo.html'
---
# fileinfo

这个模块中的函数试着去查找指定的字节来确定文件类型和编码.虽然这个不是万无一失的做法,但是也做的很好了

## 安装

在PHP5.3之前, magic_open 库需要, 5.3中则集成了这个功能, 测试中,需要加载 php_finfo函数才可以使用这个工具

## 资源类型

使用finfo_open 返回的数据库描述符.

## 函数

`string finfo_buffer ( resource $finfo , string $string = NULL [, int $options = FILEINFO_NONE [, resource $context = NULL ]] )` `string finfo::buffer ( string $string = NULL [, int $options = FILEINFO_NONE [, resource $context = NULL ]] )`

从字串缓冲中获取信息

`bool finfo_close ( resource $finfo )`

关闭finfo_open资源

`string finfo_file ( resource $finfo , string $file_name = NULL [, int $options = FILEINFO_NONE [, resource $context = NULL ]] )` `string finfo::file ( string $file_name = NULL [, int $options = FILEINFO_NONE [, resource $context = NULL ]] )`

从文件中获取信息

`resource finfo_open ([ int $options = FILEINFO_NONE [, string $magic_file = NULL ]] )` `finfo::__construct() ([ int $options = FILEINFO_NONE [, string $magic_file = NULL ]] )`

建立一个finfo资源符

`bool finfo_set_flags ( resource $finfo , int $options )` `bool finfo::set_flags ( int $options )`

这个函数设置Fileinfo的选项函数,选项能够直接使用finfo_open设置或者其他的Fileinfo函数