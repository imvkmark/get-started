---
description: 'SDIFFSTORE命令计算多个集合的差集并将结果存储到指定集合，时间复杂度 O(N)。如果目标集合已存在则覆盖。示例中，计算`joe''smovies`与`peter''smovies`的差集，结果包含"hi, lady"和"Fast Five"。'
lastUpdated: '2026-06-21 21:34:52'
head:
  - - meta
    - name: 'og:title'
      content: 'SDIFFSTORE destination key [key …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SDIFFSTORE命令计算多个集合的差集并将结果存储到指定集合，时间复杂度 O(N)。如果目标集合已存在则覆盖。示例中，计算`joe''smovies`与`peter''smovies`的差集，结果包含"hi, lady"和"Fast Five"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sdiffstore.html'
---
# SDIFFSTORE destination key [key …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N)， `N` 是所有给定集合的成员数量之和。

这个命令的作用和 [SDIFF key [key …]](https://sdiff.md#sdiff) 类似，但它将结果保存到 `destination` 集合，而不是简单地返回结果集。

如果 `destination` 集合已经存在，则将其覆盖。

`destination` 可以是 `key` 本身。

## 返回值

结果集中的元素数量。

## 代码示例

```Plaintext
redis> SMEMBERS joe's_movies
1) "hi, lady"
2) "Fast Five"
3) "2012"

redis> SMEMBERS peter's_movies
1) "bet man"
2) "start war"
3) "2012"

redis> SDIFFSTORE joe_diff_peter joe's_movies peter's_movies
(integer) 2

redis> SMEMBERS joe_diff_peter
1) "hi, lady"
2) "Fast Five"
```