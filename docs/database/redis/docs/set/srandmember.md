---
description: 'SRANDMEMBER命令用于从集合中随机返回一个或多个元素。不指定count时返回一个随机元素；指定正数count返回不重复的随机元素，若count大于等于集合基数则返回整个集合；指定负数count返回可重复的随机元素，返回数组长度为count的绝对值。命令不修改集合，空集返回nil或空数组。'
lastUpdated: '2026-06-21 21:35:11'
head:
  - - meta
    - name: 'og:title'
      content: 'SRANDMEMBER key [count]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SRANDMEMBER命令用于从集合中随机返回一个或多个元素。不指定count时返回一个随机元素；指定正数count返回不重复的随机元素，若count大于等于集合基数则返回整个集合；指定负数count返回可重复的随机元素，返回数组长度为count的绝对值。命令不修改集合，空集返回nil或空数组。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/srandmember.html'
---
# SRANDMEMBER key [count]

> 可用版本： >= 1.0.0

> 时间复杂度: 只提供 `key` 参数时为 O(1) 。如果提供了 `count` 参数，那么为 O(N) ，N 为返回数组的元素个数。

如果命令执行时，只提供了 `key` 参数，那么返回集合中的一个随机元素。

从 Redis 2.6 版本开始， SRANDMEMBER 命令接受可选的 `count` 参数：

- 如果 `count` 为正数，且小于集合基数，那么命令返回一个包含 `count` 个元素的数组，数组中的元素**各不相同**。如果 `count` 大于等于集合基数，那么返回整个集合。
- 如果 `count` 为负数，那么命令返回一个数组，数组中的元素**可能会重复出现多次**，而数组的长度为 `count` 的绝对值。

该操作和 [SPOP key](https://spop.md#spop) 相似，但 [SPOP key](https://spop.md#spop) 将随机元素从集合中移除并返回，而 SRANDMEMBER 则仅仅返回随机元素，而不对集合进行任何改动。

## 返回值

只提供 `key` 参数时，返回一个元素；如果集合为空，返回 `nil` 。  
如果提供了 `count` 参数，那么返回一个数组；如果集合为空，返回空数组。

## 代码示例

```Plaintext
# 添加元素

redis> SADD fruit apple banana cherry
(integer) 3

# 只给定 key 参数，返回一个随机元素

redis> SRANDMEMBER fruit
"cherry"

redis> SRANDMEMBER fruit
"apple"

# 给定 3 为 count 参数，返回 3 个随机元素
# 每个随机元素都不相同

redis> SRANDMEMBER fruit 3
1) "apple"
2) "banana"
3) "cherry"

# 给定 -3 为 count 参数，返回 3 个随机元素
# 元素可能会重复出现多次

redis> SRANDMEMBER fruit -3
1) "banana"
2) "cherry"
3) "apple"

redis> SRANDMEMBER fruit -3
1) "apple"
2) "apple"
3) "cherry"

# 如果 count 是整数，且大于等于集合基数，那么返回整个集合

redis> SRANDMEMBER fruit 10
1) "apple"
2) "banana"
3) "cherry"

# 如果 count 是负数，且 count 的绝对值大于集合的基数
# 那么返回的数组的长度为 count 的绝对值

redis> SRANDMEMBER fruit -10
1) "banana"
2) "apple"
3) "banana"
4) "cherry"
5) "apple"
6) "apple"
7) "cherry"
8) "apple"
9) "apple"
10) "banana"

# SRANDMEMBER 并不会修改集合内容

redis> SMEMBERS fruit
1) "apple"
2) "cherry"
3) "banana"

# 集合为空时返回 nil 或者空数组

redis> SRANDMEMBER not-exists
(nil)

redis> SRANDMEMBER not-eixsts 10
(empty list or set)
```