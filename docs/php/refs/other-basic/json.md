# 其它基本扩展 - JSON

这个接口基于 json数据交换格式 [www.json.org], 解码编辑器基于 JSON_checker, php5.2集成.

## 安装

## 配置

## 函数

`mixed json_decode ( string $json [, bool $assoc ] )`

解码json字串 - $assoc 是否返回数组,指定则返回数组

`string json_encode ( mixed $value )`

对变量进行json编码, 除了resource外,都可以被编码, 且仅仅支持 utf-8 类型的数据

`int json_last_error ( void )`

[5.3.0]返回上一个发生的错误, 在解码/编码 过程中.