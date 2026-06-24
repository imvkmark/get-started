---
description: 'Redis的HLEN命令用于返回哈希表key中域的数量，时间复杂度为O(1)。若key不存在则返回0。示例显示，添加两个域后HLEN返回2，再添加一个后返回3。'
lastUpdated: '2026-06-21 21:31:43'
head:
  - - meta
    - name: 'og:title'
      content: 'HLEN'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的HLEN命令用于返回哈希表key中域的数量，时间复杂度为O(1)。若key不存在则返回0。示例显示，添加两个域后HLEN返回2，再添加一个后返回3。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hlen.html'
---
# HLEN

**HLEN key**

返回哈希表 `key` 中域的数量。

**时间复杂度：**  
: O(1)

**返回值：**  
: 哈希表中域的数量。

```Plaintext
当 `key` 不存在时，返回 `0` 。
```

```Plaintext
redis> HSET db redis redis.com
(integer) 1

redis> HSET db mysql mysql.com
(integer) 1

redis> HLEN db
(integer) 2

redis> HSET db mongodb mongodb.org
(integer) 1

redis> HLEN db
(integer) 3
```