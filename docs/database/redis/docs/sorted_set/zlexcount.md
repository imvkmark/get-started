---
description: 'Redis 命令 ZLEXCOUNT 用于计算有序集合中指定字典序范围内的成员数量（版本2.8.9，时间复杂度O(logN)）。示例中，集合所有成员分数相同，ZLEXCOUNT myzset - + 返回总元素数7，而 ZLEXCOUNT myzset b f 返回5。'
lastUpdated: '2026-06-21 21:35:55'
head:
  - - meta
    - name: 'og:title'
      content: 'ZLEXCOUNT key min max'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 命令 ZLEXCOUNT 用于计算有序集合中指定字典序范围内的成员数量（版本2.8.9，时间复杂度O(logN)）。示例中，集合所有成员分数相同，ZLEXCOUNT myzset - + 返回总元素数7，而 ZLEXCOUNT myzset b f 返回5。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zlexcount.html'
---
# ZLEXCOUNT key min max

> 可用版本： >= 2.8.9

> 时间复杂度： O(log(N))，其中 N 为有序集合包含的元素数量。

对于一个所有成员的分值都相同的有序集合键 `key` 来说，  
这个命令会返回该集合中，  
成员介于 `min` 和 `max` 范围内的元素数量。

这个命令的 `min` 参数和 `max` 参数的意义和 [ZRANGEBYLEX key min max [LIMIT offset count]](https://zrangebylex.md#zrangebylex) 命令的 `min` 参数和 `max` 参数的意义一样。

## 返回值

整数回复：指定范围内的元素数量。

## 代码示例

```Plaintext
redis> ZADD myzset 0 a 0 b 0 c 0 d 0 e
(integer) 5

redis> ZADD myzset 0 f 0 g
(integer) 2

redis> ZLEXCOUNT myzset - +
(integer) 7

redis> ZLEXCOUNT myzset [b [f
(integer) 5
```