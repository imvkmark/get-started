---
description: '该命令用于移除并返回列表的尾元素，时间复杂度为O(1)。若key不存在，返回nil。示例演示了先用RPUSH插入三个元素，再RPOP弹出最后一个元素“three”，剩余列表为“one”、“two”。'
lastUpdated: '2026-06-21 21:32:45'
head:
  - - meta
    - name: 'og:title'
      content: 'RPOP key'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该命令用于移除并返回列表的尾元素，时间复杂度为O(1)。若key不存在，返回nil。示例演示了先用RPUSH插入三个元素，再RPOP弹出最后一个元素“three”，剩余列表为“one”、“two”。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/rpop.html'
---
# RPOP key

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

移除并返回列表 `key` 的尾元素。

## 返回值

列表的尾元素。  
当 `key` 不存在时，返回 `nil` 。

## 代码示例

```Plaintext
redis> RPUSH mylist "one"
(integer) 1

redis> RPUSH mylist "two"
(integer) 2

redis> RPUSH mylist "three"
(integer) 3

redis> RPOP mylist           # 返回被弹出的元素
"three"

redis> LRANGE mylist 0 -1    # 列表剩下的元素
1) "one"
2) "two"
```