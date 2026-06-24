---
description: 'HSTRLEN命令返回哈希表中指定字段值的字符串长度。若键或字段不存在，返回0。该命令时间复杂度O(1)，可用版本3.2.0。示例：对"HelloWorld"返回10，"99"返回2。'
lastUpdated: '2026-06-21 21:31:52'
head:
  - - meta
    - name: 'og:title'
      content: 'HSTRLEN'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'HSTRLEN命令返回哈希表中指定字段值的字符串长度。若键或字段不存在，返回0。该命令时间复杂度O(1)，可用版本3.2.0。示例：对"HelloWorld"返回10，"99"返回2。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hstrlen.html'
---
# HSTRLEN

**HSTRLEN key field**

返回哈希表 `key` 中，  
与给定域 `field` 相关联的值的字符串长度（string length）。

如果给定的键或者域不存在，  
那么命令返回 `0` 。

**可用版本：**  
: >= 3.2.0

**时间复杂度：**  
: O(1)

**返回值：**  
: 一个整数。

```Plaintext
redis> HMSET myhash f1 "HelloWorld" f2 "99" f3 "-256"
OK

redis> HSTRLEN myhash f1
(integer) 10

redis> HSTRLEN myhash f2
(integer) 2

redis> HSTRLEN myhash f3
(integer) 4
```