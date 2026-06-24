---
description: 'SWAPDB命令用于对换两个数据库，例如SWAPDB 0 1交换数据库0和1的内容。操作后，原本在数据库0的键值对会移到数据库1，反之亦然。该命令返回OK表示成功。'
lastUpdated: '2026-06-21 21:30:20'
head:
  - - meta
    - name: 'og:title'
      content: 'SWAPDB db1 db2'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SWAPDB命令用于对换两个数据库，例如SWAPDB 0 1交换数据库0和1的内容。操作后，原本在数据库0的键值对会移到数据库1，反之亦然。该命令返回OK表示成功。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/swapdb.html'
---
# SWAPDB db1 db2

> 版本要求： >= 4.0.0

> 时间复杂度： O(1)

对换指定的两个数据库，  
使得两个数据库的数据立即互换。

## 返回值

`OK`

## 代码示例

```Plaintext
# 对换数据库 0 和数据库 1
redis> SWAPDB 0 1
OK
```