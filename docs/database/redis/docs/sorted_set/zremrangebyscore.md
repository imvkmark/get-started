---
description: 'ZREMRANGEBYSCORE命令用于移除有序集key中所有score值介于min和max之间（包括等于）的成员。时间复杂度为O(logN+M)，N为基数，M为被移除数量。从2.1.6起，可排除边界值。示例中移除1500到3500的score，成功移除2个成员。'
lastUpdated: '2026-06-21 21:36:22'
head:
  - - meta
    - name: 'og:title'
      content: 'ZREMRANGEBYSCORE key min max'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZREMRANGEBYSCORE命令用于移除有序集key中所有score值介于min和max之间（包括等于）的成员。时间复杂度为O(logN+M)，N为基数，M为被移除数量。从2.1.6起，可排除边界值。示例中移除1500到3500的score，成功移除2个成员。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zremrangebyscore.html'
---
# ZREMRANGEBYSCORE key min max

> 可用版本： >= 1.2.0

> 时间复杂度： O(log(N)+M)， `N` 为有序集的基数，而 `M` 为被移除成员的数量。

移除有序集 `key` 中，所有 `score` 值介于 `min` 和 `max` 之间(包括等于 `min` 或 `max` )的成员。

自版本2.1.6开始， `score` 值等于 `min` 或 `max` 的成员也可以不包括在内，详情请参见 [ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]](https://zrangebyscore.md#zrangebyscore) 命令。

## 返回值

被移除成员的数量。

## 代码示例

```Plaintext
redis> ZRANGE salary 0 -1 WITHSCORES          # 显示有序集内所有成员及其 score 值
1) "tom"
2) "2000"
3) "peter"
4) "3500"
5) "jack"
6) "5000"

redis> ZREMRANGEBYSCORE salary 1500 3500      # 移除所有薪水在 1500 到 3500 内的员工
(integer) 2

redis> ZRANGE salary 0 -1 WITHSCORES          # 剩下的有序集成员
1) "jack"
2) "5000"
```