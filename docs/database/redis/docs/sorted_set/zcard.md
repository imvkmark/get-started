---
description: 'Redis ZCARD命令用于返回有序集key的成员数量（基数），时间复杂度为O(1)。若key存在且为有序集类型，返回其基数；若key不存在，返回0。示例中，添加成员后ZCAR命令返回正确计数，对不存在的key则返回0。'
lastUpdated: '2026-06-21 21:35:34'
head:
  - - meta
    - name: 'og:title'
      content: 'ZCARD key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis ZCARD命令用于返回有序集key的成员数量（基数），时间复杂度为O(1)。若key存在且为有序集类型，返回其基数；若key不存在，返回0。示例中，添加成员后ZCAR命令返回正确计数，对不存在的key则返回0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zcard.html'
---
# ZCARD key

> 可用版本： >= 1.2.0

> 时间复杂度: O(1)

返回有序集 `key` 的基数。

## 返回值

当 `key` 存在且是有序集类型时，返回有序集的基数。  
当 `key` 不存在时，返回 `0` 。

## 代码示例

```Plaintext
redis > ZADD salary 2000 tom    # 添加一个成员
(integer) 1

redis > ZCARD salary
(integer) 1

redis > ZADD salary 5000 jack   # 再添加一个成员
(integer) 1

redis > ZCARD salary
(integer) 2

redis > EXISTS non_exists_key   # 对不存在的 key 进行 ZCARD 操作
(integer) 0

redis > ZCARD non_exists_key
(integer) 0
```