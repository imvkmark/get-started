---
description: 'SINTERSTORE命令类似于SINTER，但将交集结果保存到目标集合中。若目标集合已存在则覆盖。时间复杂度为O(N*M)，N为最小基数，M为集合个数。返回结果集成员数量。示例中将songs与mysongs的交集保存到songinterset，结果为"good bye joe"。'
lastUpdated: '2026-06-21 21:34:57'
head:
  - - meta
    - name: 'og:title'
      content: 'SINTERSTORE destination key [key …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SINTERSTORE命令类似于SINTER，但将交集结果保存到目标集合中。若目标集合已存在则覆盖。时间复杂度为O(N*M)，N为最小基数，M为集合个数。返回结果集成员数量。示例中将songs与mysongs的交集保存到songinterset，结果为"good bye joe"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sinterstore.html'
---
# SINTERSTORE destination key [key …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N \* M)， `N` 为给定集合当中基数最小的集合， `M` 为给定集合的个数。

这个命令类似于 [SINTER key [key …]](https://sinter.md#sinter) 命令，但它将结果保存到 `destination` 集合，而不是简单地返回结果集。

如果 `destination` 集合已经存在，则将其覆盖。

`destination` 可以是 `key` 本身。

## 返回值

结果集中的成员数量。

## 代码示例

```Plaintext
redis> SMEMBERS songs
1) "good bye joe"
2) "hello,peter"

redis> SMEMBERS my_songs
1) "good bye joe"
2) "falling"

redis> SINTERSTORE song_interset songs my_songs
(integer) 1

redis> SMEMBERS song_interset
1) "good bye joe"
```