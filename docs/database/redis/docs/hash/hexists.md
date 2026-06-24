---
description: 'HEXISTS命令用于检查哈希表中指定域是否存在，时间复杂度O(1)。若存在返回1，不存在返回0。示例：HEXISTS phone myphone，不存在返回0，添加后返回1。'
lastUpdated: '2026-06-21 21:31:31'
head:
  - - meta
    - name: 'og:title'
      content: 'HEXISTS hash field'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'HEXISTS命令用于检查哈希表中指定域是否存在，时间复杂度O(1)。若存在返回1，不存在返回0。示例：HEXISTS phone myphone，不存在返回0，添加后返回1。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hexists.html'
---
# HEXISTS hash field

> 可用版本： >= 2.0.0

> 时间复杂度： O(1)

检查给定域 `field` 是否存在于哈希表 `hash` 当中。

## 返回值

`HEXISTS` 命令在给定域存在时返回 `1` ，  
在给定域不存在时返回 `0` 。

## 代码示例

给定域不存在：

```Plaintext
redis> HEXISTS phone myphone
(integer) 0
```

给定域存在：

```Plaintext
redis> HSET phone myphone nokia-1110
(integer) 1

redis> HEXISTS phone myphone
(integer) 1
```