---
description: 'SPOP命令用于移除并返回集合中的一个随机元素，时间复杂度为O(1)。若key不存在或为空集，返回nil。如需仅获取随机元素而不移除，可使用SRANDMEMBER。'
lastUpdated: '2026-06-21 21:35:04'
head:
  - - meta
    - name: 'og:title'
      content: 'SPOP key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SPOP命令用于移除并返回集合中的一个随机元素，时间复杂度为O(1)。若key不存在或为空集，返回nil。如需仅获取随机元素而不移除，可使用SRANDMEMBER。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/spop.html'
---
# SPOP key

> 可用版本： >= 1.0.0

> 时间复杂度: O(1)

移除并返回集合中的一个随机元素。

如果只想获取一个随机元素，但不想该元素从集合中被移除的话，可以使用 [SRANDMEMBER key [count]](https://srandmember.md#srandmember) 命令。

## 返回值

被移除的随机元素。  
当 `key` 不存在或 `key` 是空集时，返回 `nil` 。

## 代码示例

```Plaintext
redis> SMEMBERS db
1) "MySQL"
2) "MongoDB"
3) "Redis"

redis> SPOP db
"Redis"

redis> SMEMBERS db
1) "MySQL"
2) "MongoDB"

redis> SPOP db
"MySQL"

redis> SMEMBERS db
1) "MongoDB"
```