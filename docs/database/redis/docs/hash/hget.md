---
description: 'HGET命令用于返回哈希表中指定域的值，时间复杂度为O(1)。域存在则返回值，否则返回nil。'
lastUpdated: '2026-06-21 21:31:34'
head:
  - - meta
    - name: 'og:title'
      content: 'HGET hash field'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'HGET命令用于返回哈希表中指定域的值，时间复杂度为O(1)。域存在则返回值，否则返回nil。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hget.html'
---
# HGET hash field

> 可用版本： >= 2.0.0

> 时间复杂度： O(1)

返回哈希表中给定域的值。

## 返回值

`HGET` 命令在默认情况下返回给定域的值。

如果给定域不存在于哈希表中，  
又或者给定的哈希表并不存在，  
那么命令返回 `nil` 。

## 代码示例

域存在的情况：

```Plaintext
redis> HSET homepage redis redis.com
(integer) 1

redis> HGET homepage redis
"redis.com"
```

域不存在的情况：

```Plaintext
redis> HGET site mysql
(nil)
```