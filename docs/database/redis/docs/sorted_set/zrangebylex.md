---
description: 'ZRANGEBYLEX 按字典序返回有序集合中指定区间的成员。区间通过 min 和 max 定义：前缀 `[` 表示包含，`(` 表示不包含。可选 LIMIT offset count 限制偏移量和数量。返回值是成员列表。示例：`ZRANGEBYLEX zset [a [z` 返回 a 到 z 的所有成员。'
lastUpdated: '2026-06-21 21:36:03'
head:
  - - meta
    - name: 'og:title'
      content: 'ZRANGEBYLEX key min max [LIMIT offset count]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZRANGEBYLEX 按字典序返回有序集合中指定区间的成员。区间通过 min 和 max 定义：前缀 `[` 表示包含，`(` 表示不包含。可选 LIMIT offset count 限制偏移量和数量。返回值是成员列表。示例：`ZRANGEBYLEX zset [a [z` 返回 a 到 z 的所有成员。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zrangebylex.html'
---
# ZRANGEBYLEX key min max [LIMIT offset count]

> 可用版本： >= 2.8.9

> 时间复杂度：O(log(N)+M)， 其中 N 为有序集合的元素数量， 而 M 则是命令返回的元素数量。 如果 M 是一个常数（比如说，用户总是使用 `LIMIT` 参数来返回最先的 10 个元素）， 那么命令的复杂度也可以看作是 O(log(N)) 。

当有序集合的所有成员都具有相同的分值时，  
有序集合的元素会根据成员的字典序（lexicographical ordering）来进行排序，  
而这个命令则可以返回给定的有序集合键 `key` 中，  
值介于 `min` 和 `max` 之间的成员。

如果有序集合里面的成员带有不同的分值，  
那么命令返回的结果是未指定的（unspecified）。

命令会使用 C 语言的 `memcmp()` 函数，  
对集合中的每个成员进行逐个字节的对比（byte-by-byte compare），  
并按照从低到高的顺序，  
返回排序后的集合成员。  
如果两个字符串有一部分内容是相同的话，  
那么命令会认为较长的字符串比较短的字符串要大。

可选的 `LIMIT offset count` 参数用于获取指定范围内的匹配元素  
（就像 SQL 中的 `SELECT LIMIT offset count` 语句）。  
需要注意的一点是，  
如果 `offset` 参数的值非常大的话，  
那么命令在返回结果之前，  
需要先遍历至 `offset` 所指定的位置，  
这个操作会为命令加上最多 O(N) 复杂度。

## 如何指定范围区间

合法的 `min` 和 `max` 参数必须包含 `(` 或者 `[` ，  
其中 `(` 表示开区间（指定的值不会被包含在范围之内），  
而 `[` 则表示闭区间（指定的值会被包含在范围之内）。

特殊值 `+` 和 `-` 在 `min` 参数以及 `max` 参数中具有特殊的意义，  
其中 `+` 表示正无限，  
而 `-` 表示负无限。  
因此，  
向一个所有成员的分值都相同的有序集合发送命令 `ZRANGEBYLEX <zset> - +` ，  
命令将返回有序集合中的所有元素。

## 返回值

数组回复：一个列表，列表里面包含了有序集合在指定范围内的成员。

## 代码示例

```Plaintext
redis> ZADD myzset 0 a 0 b 0 c 0 d 0 e 0 f 0 g
(integer) 7

redis> ZRANGEBYLEX myzset - [c
1) "a"
2) "b"
3) "c"

redis> ZRANGEBYLEX myzset - (c
1) "a"
2) "b"

redis> ZRANGEBYLEX myzset [aaa (g
1) "b"
2) "c"
3) "d"
4) "e"
5) "f"
```