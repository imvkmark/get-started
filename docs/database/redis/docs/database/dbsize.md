---
description: 'DBSIZE命令用于返回当前Redis数据库中键的数量，时间复杂度为O(1)。示例中初始为5个键，新增一个键后变为6个。'
lastUpdated: '2026-06-21 21:29:54'
head:
  - - meta
    - name: 'og:title'
      content: 'DBSIZE'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'DBSIZE命令用于返回当前Redis数据库中键的数量，时间复杂度为O(1)。示例中初始为5个键，新增一个键后变为6个。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/dbsize.html'
---
# DBSIZE

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

返回当前数据库的 key 的数量。

## 返回值

当前数据库的 key 的数量。

## 代码示例

```Plaintext
redis> DBSIZE
(integer) 5

redis> SET new_key "hello_moto"     # 增加一个 key 试试
OK

redis> DBSIZE
(integer) 6
```