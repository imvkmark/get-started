---
description: 'SETNX是Redis命令，仅在键不存在时设置值，存在则不做任何操作。成功返回1，失败返回0。适用于防止覆盖已有键的场景。'
lastUpdated: '2026-06-21 21:37:48'
head:
  - - meta
    - name: 'og:title'
      content: 'SETNX key value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SETNX是Redis命令，仅在键不存在时设置值，存在则不做任何操作。成功返回1，失败返回0。适用于防止覆盖已有键的场景。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/string/setnx.html'
---
# SETNX key value

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

只在键 `key` 不存在的情况下，  
将键 `key` 的值设置为 `value` 。

若键 `key` 已经存在，  
则 `SETNX` 命令不做任何动作。

`SETNX` 是『SET if Not eXists』(如果不存在，则 SET)的简写。

## 返回值

命令在设置成功时返回 `1` ，  
设置失败时返回 `0` 。

## 代码示例

```Plaintext
redis> EXISTS job                # job 不存在
(integer) 0

redis> SETNX job "programmer"    # job 设置成功
(integer) 1

redis> SETNX job "code-farmer"   # 尝试覆盖 job ，失败
(integer) 0

redis> GET job                   # 没有被覆盖
"programmer"
```