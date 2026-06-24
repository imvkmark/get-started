---
description: 'TYPE命令用于返回指定键所存储值的类型，可能的返回值包括字符串、列表、集合、有序集合、哈希等。'
lastUpdated: '2026-06-21 21:30:22'
head:
  - - meta
    - name: 'og:title'
      content: 'TYPE key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'TYPE命令用于返回指定键所存储值的类型，可能的返回值包括字符串、列表、集合、有序集合、哈希等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/type.html'
---
# TYPE key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

返回 `key` 所储存的值的类型。

## 返回值

- `none` (key不存在)
- `string` (字符串)
- `list` (列表)
- `set` (集合)
- `zset` (有序集)
- `hash` (哈希表)
- `stream` （流）

## 代码示例

```Plaintext
# 字符串

redis> SET weather "sunny"
OK

redis> TYPE weather
string

# 列表

redis> LPUSH book_list "programming in scala"
(integer) 1

redis> TYPE book_list
list

# 集合

redis> SADD pat "dog"
(integer) 1

redis> TYPE pat
set
```