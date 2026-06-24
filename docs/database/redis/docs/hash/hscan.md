---
description: 'HSCAN命令用于增量迭代哈希表中的键值对。它接受一个键、游标以及可选的MATCH模式匹配和COUNT数量提示，返回一批匹配的字段值对及新游标，使用方法参照SCAN命令。'
lastUpdated: '2026-06-21 21:31:46'
head:
  - - meta
    - name: 'og:title'
      content: 'HSCAN'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'HSCAN命令用于增量迭代哈希表中的键值对。它接受一个键、游标以及可选的MATCH模式匹配和COUNT数量提示，返回一批匹配的字段值对及新游标，使用方法参照SCAN命令。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hash/hscan.html'
---
# HSCAN

**HSCAN key cursor [MATCH pattern] [COUNT count]**

具体信息请参考 SCAN cursor [MATCH pattern] [COUNT count] 命令。