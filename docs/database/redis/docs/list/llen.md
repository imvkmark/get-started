---
description: 'LLEN命令返回指定key的列表长度。若key不存在则返回0，表示空列表。非空列表返回元素个数。示例：`LLEN mylist` 返回整数。'
lastUpdated: '2026-06-21 21:32:19'
head:
  - - meta
    - name: 'og:title'
      content: 'LLEN key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'LLEN命令返回指定key的列表长度。若key不存在则返回0，表示空列表。非空列表返回元素个数。示例：`LLEN mylist` 返回整数。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/llen.html'
---
# LLEN key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

返回列表 `key` 的长度。

如果 `key` 不存在，则 `key` 被解释为一个空列表，返回 `0` .

如果 `key` 不是列表类型，返回一个错误。

## 返回值

列表 `key` 的长度。

## 代码示例

```Plaintext
# 空列表

redis> LLEN job
(integer) 0

# 非空列表

redis> LPUSH job "cook food"
(integer) 1

redis> LPUSH job "have lunch"
(integer) 2

redis> LLEN job
(integer) 2
```