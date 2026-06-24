---
description: 'RPUSH命令用于向列表（List）的尾部添加一个或多个元素。用户可指定key，后跟一个或多个value。支持添加单个、重复或多个元素。命令返回添加后列表的长度。'
lastUpdated: '2026-06-21 21:32:54'
head:
  - - meta
    - name: 'og:title'
      content: 'RPUSH key value [value …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RPUSH命令用于向列表（List）的尾部添加一个或多个元素。用户可指定key，后跟一个或多个value。支持添加单个、重复或多个元素。命令返回添加后列表的长度。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/rpush.html'
---
# RPUSH key value [value …]

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

将一个或多个值 `value` 插入到列表 `key` 的表尾(最右边)。

如果有多个 `value` 值，那么各个 `value` 值按从左到右的顺序依次插入到表尾：比如对一个空列表 `mylist` 执行 `RPUSH mylist a b c` ，得出的结果列表为 `a b c` ，等同于执行命令 `RPUSH mylist a` 、 `RPUSH mylist b` 、 `RPUSH mylist c` 。

如果 `key` 不存在，一个空列表会被创建并执行 RPUSH 操作。

当 `key` 存在但不是列表类型时，返回一个错误。

Note

在 Redis 2.4 版本以前的 RPUSH 命令，都只接受单个 `value` 值。

## 返回值

执行 RPUSH 操作后，表的长度。

## 代码示例

```Plaintext
# 添加单个元素

redis> RPUSH languages c
(integer) 1

# 添加重复元素

redis> RPUSH languages c
(integer) 2

redis> LRANGE languages 0 -1 # 列表允许重复元素
1) "c"
2) "c"

# 添加多个元素

redis> RPUSH mylist a b c
(integer) 3

redis> LRANGE mylist 0 -1
1) "a"
2) "b"
3) "c"
```