# 加密扩展 - mhash

这个函数和 mhash 函数一块使用, Mhash 用来建立校验和,信息摘要,信息权限码.支持hash算法.

## 安装

默认有,不用安装.

## 函数

`int mhash_count ( void )`

获取最高使用的 hash id

`int mhash_get_block_size ( int $hash )`

获取hash的区块大小

`string mhash_get_hash_name ( int $hash )`

获取hash的名称

`string mhash_keygen_s2k ( int $hash , string $password , string $salt , int $bytes )`

根据给定的hash 和 pasword生成键值. 这是Salted S2K算法,在 OpenPGP 文档指定的.

`string mhash ( int $hash , string $data [, string $key ] )`

计算 hash - $hash
- $data - $key 如果指定,将返回一个Hmac算法.. 并不是所有的算法都支持 HMAC模式