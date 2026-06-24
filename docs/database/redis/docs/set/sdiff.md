---
description: 'SDIFF命令用于返回所有给定集合的差集，即存在于第一个集合但不在其他集合中的成员。不存在的key视为空集。时间复杂度为O(N)，N为所有集合成员总数。示例中，`peter''smovies`有"bet man"、"start war"、"2012"，`joe''smovies`有"hi, lady"、"Fast Five"、"2012"，差集结果为"bet man"和"start war"。'
lastUpdated: '2026-06-21 21:34:51'
head:
  - - meta
    - name: 'og:title'
      content: 'SDIFF key [key …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SDIFF命令用于返回所有给定集合的差集，即存在于第一个集合但不在其他集合中的成员。不存在的key视为空集。时间复杂度为O(N)，N为所有集合成员总数。示例中，`peter''smovies`有"bet man"、"start war"、"2012"，`joe''smovies`有"hi, lady"、"Fast Five"、"2012"，差集结果为"bet man"和"start war"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sdiff.html'
---
# SDIFF key [key …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N)， `N` 是所有给定集合的成员数量之和。

返回一个集合的全部成员，该集合是所有给定集合之间的差集。

不存在的 `key` 被视为空集。

## 返回值

一个包含差集成员的列表。

## 代码示例

```Plaintext
redis> SMEMBERS peter's_movies
1) "bet man"
2) "start war"
3) "2012"

redis> SMEMBERS joe's_movies
1) "hi, lady"
2) "Fast Five"
3) "2012"

redis> SDIFF peter's_movies joe's_movies
1) "bet man"
2) "start war"
```