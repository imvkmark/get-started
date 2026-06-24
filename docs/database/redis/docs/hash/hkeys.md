---
description: 'HKEYS命令用于获取哈希表中所有字段名，若哈希表非空则返回字段列表，若为空或key不存在则返回空列表。'
lastUpdated: '2026-06-21 21:31:38'
head:
  - - meta
    - name: 'og:title'
      content: 'HKEYS'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'HKEYS命令用于获取哈希表中所有字段名，若哈希表非空则返回字段列表，若为空或key不存在则返回空列表。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hkeys.html'
---
# HKEYS

**HKEYS key**

返回哈希表 `key` 中的所有域。

**可用版本：**  
: >= 2.0.0

**时间复杂度：**  
: O(N)， `N` 为哈希表的大小。

**返回值：**  
: 一个包含哈希表中所有域的表。

```Plaintext
当 `key` 不存在时，返回一个空表。
```

```Plaintext
# 哈希表非空

redis> HMSET website google www.google.com yahoo www.yahoo.com
OK

redis> HKEYS website
1) "google"
2) "yahoo"

# 空哈希表/key不存在

redis> EXISTS fake_key
(integer) 0

redis> HKEYS fake_key
(empty list or set)
```