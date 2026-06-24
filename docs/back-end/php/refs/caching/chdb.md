---
description: 'chdb是一个基于完美哈希函数的键值数据库，利用cmph模块实现高效查找。它支持通过chdb类创建实例并按键获取值，也可使用chdb_create函数将数组持久化存储为chdb文件。'
lastUpdated: '2026-06-17 18:49:38'
head:
  - - meta
    - name: 'og:title'
      content: '[Pecl] chdb'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'chdb是一个基于完美哈希函数的键值数据库，利用cmph模块实现高效查找。它支持通过chdb类创建实例并按键获取值，也可使用chdb_create函数将数组持久化存储为chdb文件。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/caching/chdb.html'
---
# [Pecl] chdb

关联网址: http://cr.yp.to/cdb.html chdb (constant hash database)是一个键值对应的数据库

## 安装

这个模块使用 cmph 模块的 perfect hashing 函数

http://pecl.php.net/package/chdb

## 配置

## 定义常量

## 函数

```Plaintext
chdb {
    /* Methods */
    // 创建, 路径为 chdb 文件的路径, 创建一个 chdb 实例
    public __construct ( string $pathname )

    // 根据 键名返回值
    public string get ( string $key )
}
```

`bool chdb_create ( string $pathname , array $data )`

建立一个 chdb 文件, 将指定的数组存入到文件中