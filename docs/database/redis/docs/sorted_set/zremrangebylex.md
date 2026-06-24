---
description: 'ZREMRANGEBYLEX命令用于移除有序集合中所有分值相同且成员字符串在字典区间内的元素。时间复杂度O(logN+M)，返回被移除元素数量。参数min和max指定区间，与ZRANGEBYLEX一致。示例：移除myzset中成员在"alpha"到"omega"之间的元素。'
lastUpdated: '2026-06-21 21:36:13'
head:
  - - meta
    - name: 'og:title'
      content: 'ZREMRANGEBYLEX key min max'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZREMRANGEBYLEX命令用于移除有序集合中所有分值相同且成员字符串在字典区间内的元素。时间复杂度O(logN+M)，返回被移除元素数量。参数min和max指定区间，与ZRANGEBYLEX一致。示例：移除myzset中成员在"alpha"到"omega"之间的元素。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zremrangebylex.html'
---
# ZREMRANGEBYLEX key min max

> 可用版本： >= 2.8.9

> 时间复杂度： O(log(N)+M)， 其中 N 为有序集合的元素数量， 而 M 则为被移除的元素数量。

对于一个所有成员的分值都相同的有序集合键 `key` 来说，  
这个命令会移除该集合中，  
成员介于 `min` 和 `max` 范围内的所有元素。

这个命令的 `min` 参数和 `max` 参数的意义和 [ZRANGEBYLEX key min max [LIMIT offset count]](https://zrangebylex.md#zrangebylex) 命令的 `min` 参数和 `max` 参数的意义一样。

## 返回值

整数回复：被移除的元素数量。

## 代码示例

```Plaintext
redis> ZADD myzset 0 aaaa 0 b 0 c 0 d 0 e
(integer) 5

redis> ZADD myzset 0 foo 0 zap 0 zip 0 ALPHA 0 alpha
(integer) 5

redis> ZRANGE myzset 0 -1
1) "ALPHA"
2) "aaaa"
3) "alpha"
4) "b"
5) "c"
6) "d"
7) "e"
8) "foo"
9) "zap"
10) "zip"

redis> ZREMRANGEBYLEX myzset [alpha [omega
(integer) 6

redis> ZRANGE myzset 0 -1
1) "ALPHA"
2) "aaaa"
3) "zap"
4) "zip"
```