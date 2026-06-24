---
description: 'Redis的`LPOP`命令用于移除并返回指定列表（key）的头元素。时间复杂度O(1)。若key不存在返回nil。示例中，先通过`LLEN`查看列表长度（0），`RPUSH`添加两个元素后，`LPOP`成功返回"algorithm001"。'
lastUpdated: '2026-06-21 21:32:24'
head:
  - - meta
    - name: 'og:title'
      content: 'LPOP key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的`LPOP`命令用于移除并返回指定列表（key）的头元素。时间复杂度O(1)。若key不存在返回nil。示例中，先通过`LLEN`查看列表长度（0），`RPUSH`添加两个元素后，`LPOP`成功返回"algorithm001"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/lpop.html'
---
# LPOP key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

移除并返回列表 `key` 的头元素。

## 返回值

列表的头元素。  
当 `key` 不存在时，返回 `nil` 。

## 代码示例

```Plaintext
redis> LLEN course
(integer) 0

redis> RPUSH course algorithm001
(integer) 1

redis> RPUSH course c++101
(integer) 2

redis> LPOP course  # 移除头元素
"algorithm001"
```