---
description: 'Redis的SISMEMBER命令用于判断指定成员是否存在于集合中，时间复杂度为O(1)。若存在返回1，否则返回0。示例中检查"bet man"返回0，"Fast Five"返回1。'
lastUpdated: '2026-06-21 21:34:59'
head:
  - - meta
    - name: 'og:title'
      content: 'SISMEMBER key member'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的SISMEMBER命令用于判断指定成员是否存在于集合中，时间复杂度为O(1)。若存在返回1，否则返回0。示例中检查"bet man"返回0，"Fast Five"返回1。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sismember.html'
---
# SISMEMBER key member

> 可用版本： >= 1.0.0

> 时间复杂度: O(1)

判断 `member` 元素是否集合 `key` 的成员。

## 返回值

如果 `member` 元素是集合的成员，返回 `1` 。  
如果 `member` 元素不是集合的成员，或 `key` 不存在，返回 `0` 。

## 代码示例

```Plaintext
redis> SMEMBERS joe's_movies
1) "hi, lady"
2) "Fast Five"
3) "2012"

redis> SISMEMBER joe's_movies "bet man"
(integer) 0

redis> SISMEMBER joe's_movies "Fast Five"
(integer) 1
```