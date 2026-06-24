---
description: 'GETBIT命令用于获取指定key中字符串值在给定offset处的位值。若key不存在或offset超出字符串长度，返回0；否则返回该位的值（0或1）。'
lastUpdated: '2026-06-21 21:28:56'
head:
  - - meta
    - name: 'og:title'
      content: 'GETBIT key offset'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'GETBIT命令用于获取指定key中字符串值在给定offset处的位值。若key不存在或offset超出字符串长度，返回0；否则返回该位的值（0或1）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/bitmap/getbit.html'
---
# GETBIT key offset

> 可用版本： >= 2.2.0

> 时间复杂度： O(1)

对 `key` 所储存的字符串值，获取指定偏移量上的位(bit)。

当 `offset` 比字符串值的长度大，或者 `key` 不存在时，返回 `0` 。

## 返回值

字符串值指定偏移量上的位(bit)。

## 代码示例

```Plaintext
# 对不存在的 key 或者不存在的 offset 进行 GETBIT， 返回 0

redis> EXISTS bit
(integer) 0

redis> GETBIT bit 10086
(integer) 0

# 对已存在的 offset 进行 GETBIT

redis> SETBIT bit 10086 1
(integer) 0

redis> GETBIT bit 10086
(integer) 1
```