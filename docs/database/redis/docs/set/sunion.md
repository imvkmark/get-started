---
description: 'Redis的SUNION命令返回所有给定集合的并集成员，不存在的键视为空集。时间复杂度为O(N)，N为所有集合成员总数。示例：SUNION songs mysongs1 返回 "Billie Jean" 和 "Believe Me"。'
lastUpdated: '2026-06-21 21:35:23'
head:
  - - meta
    - name: 'og:title'
      content: 'SUNION key [key …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的SUNION命令返回所有给定集合的并集成员，不存在的键视为空集。时间复杂度为O(N)，N为所有集合成员总数。示例：SUNION songs mysongs1 返回 "Billie Jean" 和 "Believe Me"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sunion.html'
---
# SUNION key [key …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N)， `N` 是所有给定集合的成员数量之和。

返回一个集合的全部成员，该集合是所有给定集合的并集。

不存在的 `key` 被视为空集。

## 返回值

并集成员的列表。

## 代码示例

```Plaintext
redis> SMEMBERS songs
1) "Billie Jean"

redis> SMEMBERS my_songs
1) "Believe Me"

redis> SUNION songs my_songs
1) "Billie Jean"
2) "Believe Me"
```