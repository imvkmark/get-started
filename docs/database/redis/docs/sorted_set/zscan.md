---
description: 'SCAN命令用于增量迭代数据库键，需传入游标（cursor）参数，可选MATCH pattern按模式匹配键，COUNT count指定每次迭代返回的键数。返回包含新游标和键列表，游标为0时表示迭代完成。'
lastUpdated: '2026-06-21 21:36:37'
head:
  - - meta
    - name: 'og:title'
      content: 'ZSCAN key cursor [MATCH pattern] [COUNT count]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SCAN命令用于增量迭代数据库键，需传入游标（cursor）参数，可选MATCH pattern按模式匹配键，COUNT count指定每次迭代返回的键数。返回包含新游标和键列表，游标为0时表示迭代完成。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zscan.html'
---
# ZSCAN key cursor [MATCH pattern] [COUNT count]

详细信息请参考 SCAN cursor [MATCH pattern] [COUNT count] 命令。