---
description: 'PHP的mhash扩展提供哈希相关函数，包括获取可用哈希算法数量（mhash_count）、获取特定哈希的块大小（mhash_get_block_size）和名称（mhash_get_hash_name），以及使用Salted S2K算法生成密钥（mhash_keygen_s2k）。核心函数mhash可计算指定哈希算法的数据摘要，并可选择性地使用HMAC模式。'
lastUpdated: '2026-06-17 19:03:01'
head:
  - - meta
    - name: 'og:title'
      content: '加密扩展 - mhash'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHP的mhash扩展提供哈希相关函数，包括获取可用哈希算法数量（mhash_count）、获取特定哈希的块大小（mhash_get_block_size）和名称（mhash_get_hash_name），以及使用Salted S2K算法生成密钥（mhash_keygen_s2k）。核心函数mhash可计算指定哈希算法的数据摘要，并可选择性地使用HMAC模式。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/crypto/mhash.html'
---
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

计算 hash - \$hash

$data - $key 如果指定,将返回一个Hmac算法.. 并不是所有的算法都支持 HMAC模式