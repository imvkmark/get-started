---
description: 'DEBUG OBJECT是Redis调试命令（版本1.0.0，时间复杂度O(1)），用于返回指定键的底层信息（如内存地址、引用计数、编码等），键不存在时返回错误。该命令不应由客户端使用，推荐使用OBJECT命令替代。'
lastUpdated: '2026-06-21 21:30:25'
head:
  - - meta
    - name: 'og:title'
      content: 'DEBUG OBJECT key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'DEBUG OBJECT是Redis调试命令（版本1.0.0，时间复杂度O(1)），用于返回指定键的底层信息（如内存地址、引用计数、编码等），键不存在时返回错误。该命令不应由客户端使用，推荐使用OBJECT命令替代。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/debug/debug_object.html'
---
# DEBUG OBJECT key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

`DEBUG OBJECT` 是一个调试命令，它不应被客户端所使用。

查看 `OBJECT` 命令获取更多信息。

## 返回值

当 `key` 存在时，返回有关信息。  
当 `key` 不存在时，返回一个错误。

## 代码示例

```Plaintext
redis> DEBUG OBJECT my_pc
Value at:0xb6838d20 refcount:1 encoding:raw serializedlength:9 lru:283790 lru_seconds_idle:150

redis> DEBUG OBJECT your_mac
(error) ERR no such key
```