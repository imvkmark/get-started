---
description: 'JSON（JavaScript Object Notation）扩展是PHP中处理JSON数据的核心模块，通常默认编译安装。通过php.ini可配置其序列化精度等选项。核心函数包括json_encode（将PHP变量转换为JSON字符串）和json_decode（将JSON字符串解码为PHP变量），同时支持错误处理常量如JSON_ERROR_NONE。'
lastUpdated: '2026-06-17 19:00:37'
head:
  - - meta
    - name: 'og:title'
      content: '其它基本扩展 - JSON'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JSON（JavaScript Object Notation）扩展是PHP中处理JSON数据的核心模块，通常默认编译安装。通过php.ini可配置其序列化精度等选项。核心函数包括json_encode（将PHP变量转换为JSON字符串）和json_decode（将JSON字符串解码为PHP变量），同时支持错误处理常量如JSON_ERROR_NONE。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/other/json.html'
---
# 其它基本扩展 - JSON

这个接口基于 json数据交换格式 [www.json.org], 解码编辑器基于 JSON_checker, php5.2集成.

## 安装

## 配置

## 函数

`mixed json_decode ( string $json [, bool $assoc ] )`

解码json字串 - \$assoc 是否返回数组,指定则返回数组

`string json_encode ( mixed $value )`

对变量进行json编码, 除了resource外,都可以被编码, 且仅仅支持 utf-8 类型的数据

`int json_last_error ( void )`

[5.3.0]返回上一个发生的错误, 在解码/编码 过程中.