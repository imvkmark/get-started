---
description: 'Redis 的 SELECT 命令用于切换数据库，索引从0开始，默认使用0号数据库。通过 `SELECT 1` 切换到1号数据库后，可执行键操作且命令提示符会显示当前数据库编号。'
lastUpdated: '2026-06-21 21:30:15'
head:
  - - meta
    - name: 'og:title'
      content: 'SELECT index'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 的 SELECT 命令用于切换数据库，索引从0开始，默认使用0号数据库。通过 `SELECT 1` 切换到1号数据库后，可执行键操作且命令提示符会显示当前数据库编号。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/database/select.html'
---
# SELECT index

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

切换到指定的数据库，数据库索引号 `index` 用数字值指定，以 `0` 作为起始索引值。

默认使用 `0` 号数据库。

## 返回值

`OK`

## 代码示例

```Plaintext
redis> SET db_number 0         # 默认使用 0 号数据库
OK

redis> SELECT 1                # 使用 1 号数据库
OK

redis[1]> GET db_number        # 已经切换到 1 号数据库，注意 Redis 现在的命令提示符多了个 [1]
(nil)

redis[1]> SET db_number 1
OK

redis[1]> GET db_number
"1"

redis[1]> SELECT 3             # 再切换到 3 号数据库
OK

redis[3]>                      # 提示符从 [1] 改变成了 [3]
```