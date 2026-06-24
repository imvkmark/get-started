---
description: 'SMEMBERS 命令返回集合 key 中的所有元素。若 key 不存在或集合为空，返回空数组；否则返回非空集合的所有成员。'
lastUpdated: '2026-06-21 21:35:00'
head:
  - - meta
    - name: 'og:title'
      content: 'SMEMBERS key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SMEMBERS 命令返回集合 key 中的所有元素。若 key 不存在或集合为空，返回空数组；否则返回非空集合的所有成员。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/smembers.html'
---
# SMEMBERS key

> 可用版本： >= 1.0.0

> 时间复杂度: O(N)， `N` 为集合的基数。

返回集合 `key` 中的所有成员。

不存在的 `key` 被视为空集合。

## 返回值

集合中的所有成员。

## 代码示例

```Plaintext
# key 不存在或集合为空

redis> EXISTS not_exists_key
(integer) 0

redis> SMEMBERS not_exists_key
(empty list or set)

# 非空集合

redis> SADD language Ruby Python Clojure
(integer) 3

redis> SMEMBERS language
1) "Python"
2) "Ruby"
3) "Clojure"
```