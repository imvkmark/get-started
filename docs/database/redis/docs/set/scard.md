---
description: 'SCARD命令返回集合key的基数（元素数量），时间复杂度O(1)。当key不存在时返回0。示例中，集合有3个元素则返回3，删除后返回0。'
lastUpdated: '2026-06-21 21:34:49'
head:
  - - meta
    - name: 'og:title'
      content: 'SCARD key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SCARD命令返回集合key的基数（元素数量），时间复杂度O(1)。当key不存在时返回0。示例中，集合有3个元素则返回3，删除后返回0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/scard.html'
---
# SCARD key

> 可用版本： >= 1.0.0

> 时间复杂度: O(1)

返回集合 `key` 的基数(集合中元素的数量)。

## 返回值

集合的基数。  
当 `key` 不存在时，返回 `0` 。

## 代码示例

```Plaintext
redis> SADD tool pc printer phone
(integer) 3

redis> SCARD tool   # 非空集合
(integer) 3

redis> DEL tool
(integer) 1

redis> SCARD tool   # 空集合
(integer) 0
```