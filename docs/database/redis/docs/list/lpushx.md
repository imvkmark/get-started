---
description: 'LPUSHX用于将值插入到列表的头部，仅当列表存在且非空时操作成功。返回插入后列表的长度。对空列表执行LPUSHX返回0，不添加元素；对非空列表执行则添加元素并返回新长度。示例代码演示了两种情形。'
lastUpdated: '2026-06-21 21:32:32'
head:
  - - meta
    - name: 'og:title'
      content: 'LPUSHX key value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'LPUSHX用于将值插入到列表的头部，仅当列表存在且非空时操作成功。返回插入后列表的长度。对空列表执行LPUSHX返回0，不添加元素；对非空列表执行则添加元素并返回新长度。示例代码演示了两种情形。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/lpushx.html'
---
# LPUSHX key value

> 可用版本： >= 2.2.0

> 时间复杂度： O(1)

将值 `value` 插入到列表 `key` 的表头，当且仅当 `key` 存在并且是一个列表。

和 [LPUSH key value [value …]](https://lpush.md#lpush) 命令相反，当 `key` 不存在时， LPUSHX 命令什么也不做。

## 返回值

LPUSHX 命令执行之后，表的长度。

## 代码示例

```Plaintext
# 对空列表执行 LPUSHX

redis> LLEN greet                       # greet 是一个空列表
(integer) 0

redis> LPUSHX greet "hello"             # 尝试 LPUSHX，失败，因为列表为空
(integer) 0

# 对非空列表执行 LPUSHX

redis> LPUSH greet "hello"              # 先用 LPUSH 创建一个有一个元素的列表
(integer) 1

redis> LPUSHX greet "good morning"      # 这次 LPUSHX 执行成功
(integer) 2

redis> LRANGE greet 0 -1
1) "good morning"
2) "hello"
```