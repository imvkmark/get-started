---
description: 'Redis ZCOUNT命令用于返回有序集中score值在指定范围内（默认包含边界）的成员数量。时间复杂度为O(logN)，N为有序集基数。参数min和max的详细用法参考ZRANGEBYSCORE文档。示例中，ZCOUNT salary 2000 5000返回3，表示2000到5000间的成员数。'
lastUpdated: '2026-06-21 21:35:38'
head:
  - - meta
    - name: 'og:title'
      content: 'ZCOUNT key min max'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis ZCOUNT命令用于返回有序集中score值在指定范围内（默认包含边界）的成员数量。时间复杂度为O(logN)，N为有序集基数。参数min和max的详细用法参考ZRANGEBYSCORE文档。示例中，ZCOUNT salary 2000 5000返回3，表示2000到5000间的成员数。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zcount.html'
---
# ZCOUNT key min max

> 可用版本： >= 2.0.0

> 时间复杂度: O(log(N))， `N` 为有序集的基数。

返回有序集 `key` 中， `score` 值在 `min` 和 `max` 之间(默认包括 `score` 值等于 `min` 或 `max` )的成员的数量。

关于参数 `min` 和 `max` 的详细使用方法，请参考 [ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]](https://zrangebyscore.md#zrangebyscore) 命令。

## 返回值

`score` 值在 `min` 和 `max` 之间的成员的数量。

## 代码示例

```Plaintext
redis> ZRANGE salary 0 -1 WITHSCORES    # 测试数据
1) "jack"
2) "2000"
3) "peter"
4) "3500"
5) "tom"
6) "5000"

redis> ZCOUNT salary 2000 5000          # 计算薪水在 2000-5000 之间的人数
(integer) 3

redis> ZCOUNT salary 3000 5000          # 计算薪水在 3000-5000 之间的人数
(integer) 2
```