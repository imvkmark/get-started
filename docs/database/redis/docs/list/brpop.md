---
description: 'BRPOP是RPOP的阻塞版本，用于从列表尾部弹出元素。可指定多个key，按顺序检查并弹出第一个非空列表的尾部元素。若列表为空则阻塞等待，超时返回nil和等待时长；成功则返回包含key和值的两元素列表。'
lastUpdated: '2026-06-21 21:32:12'
head:
  - - meta
    - name: 'og:title'
      content: 'BRPOP key [key …] timeout'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'BRPOP是RPOP的阻塞版本，用于从列表尾部弹出元素。可指定多个key，按顺序检查并弹出第一个非空列表的尾部元素。若列表为空则阻塞等待，超时返回nil和等待时长；成功则返回包含key和值的两元素列表。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/list/brpop.html'
---
# BRPOP key [key …] timeout

> 可用版本： >= 2.0.0

> 时间复杂度： O(1)

BRPOP 是列表的阻塞式(blocking)弹出原语。

它是 [RPOP key](https://rpop.md#rpop) 命令的阻塞版本，当给定列表内没有任何元素可供弹出的时候，连接将被 BRPOP 命令阻塞，直到等待超时或发现可弹出元素为止。

当给定多个 `key` 参数时，按参数 `key` 的先后顺序依次检查各个列表，弹出第一个非空列表的尾部元素。

关于阻塞操作的更多信息，请查看 [BLPOP key [key …] timeout](https://blpop.md#blpop) 命令， BRPOP 除了弹出元素的位置和 [BLPOP key [key …] timeout](https://blpop.md#blpop) 不同之外，其他表现一致。

## 返回值

假如在指定时间内没有任何元素被弹出，则返回一个 `nil` 和等待时长。  
反之，返回一个含有两个元素的列表，第一个元素是被弹出元素所属的 `key` ，第二个元素是被弹出元素的值。

## 代码示例

```Plaintext
redis> LLEN course
(integer) 0

redis> RPUSH course algorithm001
(integer) 1

redis> RPUSH course c++101
(integer) 2

redis> BRPOP course 30
1) "course"             # 被弹出元素所属的列表键
2) "c++101"             # 被弹出的元素
```