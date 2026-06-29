---
description: 'inclued是PHP的PECL扩展，用于追踪文件包含（include/require）和类继承关系，可输出序列化的依赖信息。需在php.ini中启用inclued.enabled并设置inclued.dumpdir目录，函数inclued_get_data()返回请求的包含文件、继承及类定义信息。'
lastUpdated: '2026-06-17 19:03:51'
head:
  - - meta
    - name: 'og:title'
      content: '[Pecl]inclued'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'inclued是PHP的PECL扩展，用于追踪文件包含（include/require）和类继承关系，可输出序列化的依赖信息。需在php.ini中启用inclued.enabled并设置inclued.dumpdir目录，函数inclued_get_data()返回请求的包含文件、继承及类定义信息。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/benchmarking/inclued.html'
---
# [Pecl]inclued

输出包含的等级关系和类在运行时候的等级关系 这些文件的包含 include, include_once, require, require_once 类之间的等级依存也会输出

## 安装

pecl 源文件:http://pecl.php.net/package/inclued

二进制版本: php pierre

## 配置

`inclued.enabled int 0`

PHP_INI_SYSTEM 是否开启本扩展, 由于默认的关闭,必须开启之后才起作用

`inclued.dumpdir string null`

PHP_INI_SYSTEM 输出包含的文件的目录, 如果设置了每一个请求将会建立一个文件, 内容是序列化过的文件 , 可以使用 unserialize来反序列化

## 函数

`array inclued_get_data ( void )` 返回请求的信息, 包含的文件, 继承关系, 类定义的信息 我在测试的时候没发现包含关系 [wamp-win32bit+php5.3.10+inclued0.2.0dev]