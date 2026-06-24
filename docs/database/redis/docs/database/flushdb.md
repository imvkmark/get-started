---
description: 'FLUSHDB命令用于清空当前数据库中的所有键，时间复杂度为O(1)，始终返回OK且不会失败。示例中，清空前后键数分别为4和0。'
lastUpdated: '2026-06-21 21:30:01'
head:
  - - meta
    - name: 'og:title'
      content: 'FLUSHDB'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'FLUSHDB命令用于清空当前数据库中的所有键，时间复杂度为O(1)，始终返回OK且不会失败。示例中，清空前后键数分别为4和0。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/flushdb.html'
---
# FLUSHDB

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

清空当前数据库中的所有 key。

此命令从不失败。

## 返回值

总是返回 `OK` 。

## 代码示例

```Plaintext
redis> DBSIZE    # 清空前的 key 数量
(integer) 4

redis> FLUSHDB
OK

redis> DBSIZE    # 清空后的 key 数量
(integer) 0
```