# 加密扩展 - hash

信息摘要引擎, 允许直接或增量处理任意长度的消息，使用不同的散列算法。

## 安装

这个函数不需要额外的扩展库,默认在 PHP5.1.2中启用.

## 配置

无配置

## 资源类型

这个扩展定义了一个 Hashing 资源, 通过hash_init()返回.

## 函数

`array hash_algos ( void )`

返回一系列注册的 hashing 算法

`resource hash_copy ( resource $context )`

[php5.3]复制一个Hasing context

`string hash_file ( string $algo , string $filename [, bool $raw_output = false ] )`

文件hash生成器 - $algo 支持的hash 算法 - $filename 文件的位置 - $raw_output
true 输出二进制数据 false 输出小写.hexits

`string hash_final ( resource $context [, bool $raw_output = false ] )`

完成增量 hash 并返回结果摘要

`string hash_hmac_file ( string $algo , string $filename , string $key [, bool $raw_output = false ] )`

hmac 方法计算 文本hash - $algo 算法 - $filename 文件名称 - $key 共享的加密key

`string hash_hmac ( string $algo , string $data , string $key [, bool $raw_output = false ] )`

hmac 的数据算法

`resource hash_init ( string $algo [, int $options = 0 [, string $key = NULL ]] )`

初始化增量hash - $options 如果指定 HASH_HMAC - $key 如果指定 $options, $key必须存在

`bool hash_update_file ( resource $context , string $filename [, resource $context = NULL ] )`

抽取数据,然后激活hash - $context - $filename - $context

`int hash_update_stream ( resource $context , resource $handle [, int $length = -1 ] )`

从 打开的文件流中获取然后更新.

`bool hash_update ( resource $context , string $data )` - $data 将要包含进去的hash算法

`string hash ( string $algo , string $data [, bool $raw_output = false ] )`

生成一个hash值