---
description: 'PERSIST命令用于移除指定key的生存时间，将其从带过期时间的易失性key转换为永不过期的持久性key。操作成功返回1，若key不存在或未设生存时间则返回0。'
lastUpdated: '2026-06-21 21:31:01'
head:
  - - meta
    - name: 'og:title'
      content: 'PERSIST key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PERSIST命令用于移除指定key的生存时间，将其从带过期时间的易失性key转换为永不过期的持久性key。操作成功返回1，若key不存在或未设生存时间则返回0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/expire/persist.html'
---
# PERSIST key

> 可用版本： >= 2.2.0

> 时间复杂度： O(1)

移除给定 `key` 的生存时间，将这个 `key` 从“易失的”(带生存时间 `key` )转换成“持久的”(一个不带生存时间、永不过期的 `key` )。

## 返回值

当生存时间移除成功时，返回 `1` .  
如果 `key` 不存在或 `key` 没有设置生存时间，返回 `0` 。

## 代码示例

```Plaintext
redis> SET mykey "Hello"
OK

redis> EXPIRE mykey 10  # 为 key 设置生存时间
(integer) 1

redis> TTL mykey
(integer) 10

redis> PERSIST mykey    # 移除 key 的生存时间
(integer) 1

redis> TTL mykey
(integer) -1
```