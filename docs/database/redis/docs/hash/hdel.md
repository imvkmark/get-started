---
description: 'HDEL命令测试涵盖三种场景：删除单个存在的域、删除不存在的域（返回0）、以及删除多个域。测试验证了命令的准确性与容错性。'
lastUpdated: '2026-06-21 21:31:30'
head:
  - - meta
    - name: 'og:title'
      content: 'HDEL'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'HDEL命令测试涵盖三种场景：删除单个存在的域、删除不存在的域（返回0）、以及删除多个域。测试验证了命令的准确性与容错性。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hdel.html'
---
# HDEL

**HDEL key field [field …]**

删除哈希表 `key` 中的一个或多个指定域，不存在的域将被忽略。

Note

在Redis2.4以下的版本里， HDEL 每次只能删除单个域，如果你需要在一个原子时间内删除多个域，请将命令包含在 MULTI / EXEC 块内。

**可用版本：**  
: >= 2.0.0

**时间复杂度:**  
: O(N)， `N` 为要删除的域的数量。

**返回值:**  
: 被成功移除的域的数量，不包括被忽略的域。

```Plaintext
# 测试数据

redis> HGETALL abbr
1) "a"
2) "apple"
3) "b"
4) "banana"
5) "c"
6) "cat"
7) "d"
8) "dog"

# 删除单个域

redis> HDEL abbr a
(integer) 1

# 删除不存在的域

redis> HDEL abbr not-exists-field
(integer) 0

# 删除多个域

redis> HDEL abbr b c
(integer) 2

redis> HGETALL abbr
1) "d"
2) "dog"
```