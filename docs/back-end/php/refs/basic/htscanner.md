---
description: 'Pecl htscanner扩展允许PHP为各目录单独配置类似htaccess的选项，尤其适用于FastCGI模式。默认配置文件名为“.htscanner”，可设置文档根目录、配置缓存时间和错误停止选项。下载地址：http://pecl.php.net/package/htscanner'
lastUpdated: '2026-06-17 18:49:04'
head:
  - - meta
    - name: 'og:title'
      content: '[Pecl] htscanner - htaccess 支持'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Pecl htscanner扩展允许PHP为各目录单独配置类似htaccess的选项，尤其适用于FastCGI模式。默认配置文件名为“.htscanner”，可设置文档根目录、配置缓存时间和错误停止选项。下载地址：http://pecl.php.net/package/htscanner'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/basic/htscanner.html'
---
# [Pecl] htscanner - htaccess 支持

提供了一种 类 - htaccess 文件为PHP各个目录单独配置服务器的可能性, 这个函数提供了为PHP每个目录使用 类似于 htaccess 的配置文件的可能性, 对 fastcig模式十分有用

## 安装

下载地址:http://pecl.php.net/package/htscanner

官方下载地址:http://downloads.php.net/pierre/

## 配置

`htscanner.config_file string ".htscanner"`

PHP_INI_SYSTEM 配置文件的名称

`htscanner.default_docroot string "/"`

PHP_INI_SYSTEM 默认的文档根目录

`htscanner.default_ttl int 300`

PHP_INI_SYSTEM 配置文件的缓存时间

`htscanner.stop_on_error int 0`

PHP_INI_SYSTEM 在错误时候停止,不能在 ini 文件中设定