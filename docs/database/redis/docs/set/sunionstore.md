---
description: 'SUNIONSTORE命令将多个集合的并集存储到目标集合，时间复杂度O(N)。若目标已存在则覆盖，支持目标为原集合。示例中，合并NoSQL和SQL集合到db，结果包含4个元素。'
lastUpdated: '2026-06-21 21:35:26'
head:
  - - meta
    - name: 'og:title'
      content: 'SUNIONSTORE destination key [key …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SUNIONSTORE命令将多个集合的并集存储到目标集合，时间复杂度O(N)。若目标已存在则覆盖，支持目标为原集合。示例中，合并NoSQL和SQL集合到db，结果包含4个元素。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sunionstore.html'
---
# SUNIONSTORE destination key [key …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N)， `N` 是所有给定集合的成员数量之和。

这个命令类似于 [SUNION key [key …]](https://sunion.md#sunion) 命令，但它将结果保存到 `destination` 集合，而不是简单地返回结果集。

如果 `destination` 已经存在，则将其覆盖。

`destination` 可以是 `key` 本身。

## 返回值

结果集中的元素数量。

## 代码示例

```Plaintext
redis> SMEMBERS NoSQL
1) "MongoDB"
2) "Redis"

redis> SMEMBERS SQL
1) "sqlite"
2) "MySQL"

redis> SUNIONSTORE db NoSQL SQL
(integer) 4

redis> SMEMBERS db
1) "MySQL"
2) "sqlite"
3) "MongoDB"
4) "Redis"
```