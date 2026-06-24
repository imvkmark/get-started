---
description: 'ZREVRANGE命令按score值递减（大-小）返回有序集指定区间内的成员，相同score按字典序逆序排列。与ZRANGE命令类似，但排序方向相反。示例：ZREVRANGE salary 0 -1 WITHSCORES 返回从高到低排列的薪资数据。'
lastUpdated: '2026-06-21 21:36:27'
head:
  - - meta
    - name: 'og:title'
      content: 'ZREVRANGE key start stop [WITHSCORES]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZREVRANGE命令按score值递减（大-小）返回有序集指定区间内的成员，相同score按字典序逆序排列。与ZRANGE命令类似，但排序方向相反。示例：ZREVRANGE salary 0 -1 WITHSCORES 返回从高到低排列的薪资数据。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zrevrange.html'
---
# ZREVRANGE key start stop [WITHSCORES]

> 可用版本： >= 1.2.0

> 时间复杂度: O(log(N)+M)， `N` 为有序集的基数，而 `M` 为结果集的基数。

返回有序集 `key` 中，指定区间内的成员。

其中成员的位置按 `score` 值递减(从大到小)来排列。  
具有相同 `score` 值的成员按字典序的逆序([reverse lexicographical order](http://en.wikipedia.org/wiki/Lexicographical_order#Reverse_lexicographic_order))排列。

除了成员按 `score` 值递减的次序排列这一点外， ZREVRANGE 命令的其他方面和 [ZRANGE key start stop [WITHSCORES]](https://zrange.md#zrange) 命令一样。

## 返回值

指定区间内，带有 `score` 值(可选)的有序集成员的列表。

## 代码示例

```Plaintext
redis> ZRANGE salary 0 -1 WITHSCORES        # 递增排列
1) "peter"
2) "3500"
3) "tom"
4) "4000"
5) "jack"
6) "5000"

redis> ZREVRANGE salary 0 -1 WITHSCORES     # 递减排列
1) "jack"
2) "5000"
3) "tom"
4) "4000"
5) "peter"
6) "3500"
```