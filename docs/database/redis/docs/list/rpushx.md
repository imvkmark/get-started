---
description: 'RPUSHX命令仅当key存在且为列表时，才将值插入列表尾部，并返回操作后列表的长度。若key不存在，则不做任何操作并返回0；若key存在但不是列表，则返回错误。'
lastUpdated: '2026-06-21 21:32:57'
head:
  - - meta
    - name: 'og:title'
      content: 'RPUSHX key value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RPUSHX命令仅当key存在且为列表时，才将值插入列表尾部，并返回操作后列表的长度。若key不存在，则不做任何操作并返回0；若key存在但不是列表，则返回错误。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/rpushx.html'
---
# RPUSHX key value

> 可用版本： >= 2.2.0

> 时间复杂度： O(1)

将值 `value` 插入到列表 `key` 的表尾，当且仅当 `key` 存在并且是一个列表。

和 [RPUSH key value [value …]](https://rpush.md#rpush) 命令相反，当 `key` 不存在时， RPUSHX 命令什么也不做。

## 返回值

RPUSHX 命令执行之后，表的长度。

## 代码示例

```Plaintext
# key不存在

redis> LLEN greet
(integer) 0

redis> RPUSHX greet "hello"     # 对不存在的 key 进行 RPUSHX，PUSH 失败。
(integer) 0

# key 存在且是一个非空列表

redis> RPUSH greet "hi"         # 先用 RPUSH 插入一个元素
(integer) 1

redis> RPUSHX greet "hello"     # greet 现在是一个列表类型，RPUSHX 操作成功。
(integer) 2

redis> LRANGE greet 0 -1
1) "hi"
2) "hello"
```