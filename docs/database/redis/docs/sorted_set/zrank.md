---
description: 'ZRANK命令用于返回有序集中指定成员按score值递增排序的排名（从0开始）。若成员不存在则返回nil。示例中，tom的排名为1。'
lastUpdated: '2026-06-21 21:36:08'
head:
  - - meta
    - name: 'og:title'
      content: 'ZRANK key member'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZRANK命令用于返回有序集中指定成员按score值递增排序的排名（从0开始）。若成员不存在则返回nil。示例中，tom的排名为1。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zrank.html'
---
# ZRANK key member

> 可用版本： >= 2.0.0

> 时间复杂度: O(log(N))

返回有序集 `key` 中成员 `member` 的排名。其中有序集成员按 `score` 值递增(从小到大)顺序排列。

排名以 `0` 为底，也就是说， `score` 值最小的成员排名为 `0` 。

使用 [ZREVRANK key member](https://zrevrank.md#zrevrank) 命令可以获得成员按 `score` 值递减(从大到小)排列的排名。

## 返回值

如果 `member` 是有序集 `key` 的成员，返回 `member` 的排名。  
如果 `member` 不是有序集 `key` 的成员，返回 `nil` 。

## 代码示例

```Plaintext
redis> ZRANGE salary 0 -1 WITHSCORES        # 显示所有成员及其 score 值
1) "peter"
2) "3500"
3) "tom"
4) "4000"
5) "jack"
6) "5000"

redis> ZRANK salary tom                     # 显示 tom 的薪水排名，第二
(integer) 1
```