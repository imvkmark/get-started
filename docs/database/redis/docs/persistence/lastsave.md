---
description: 'Redis的LASTSAVE命令（版本1.0.0，时间复杂度O(1)）返回最近一次成功将数据保存到磁盘的时间，以UNIX时间戳格式表示。例如返回整数1324043588。'
lastUpdated: '2026-06-21 21:33:06'
head:
  - - meta
    - name: 'og:title'
      content: 'LASTSAVE'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的LASTSAVE命令（版本1.0.0，时间复杂度O(1)）返回最近一次成功将数据保存到磁盘的时间，以UNIX时间戳格式表示。例如返回整数1324043588。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/persistence/lastsave.html'
---
# LASTSAVE

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

返回最近一次 Redis 成功将数据保存到磁盘上的时间，以 UNIX 时间戳格式表示。

## 返回值

一个 UNIX 时间戳。

## 代码示例

```Plaintext
redis> LASTSAVE
(integer) 1324043588
```