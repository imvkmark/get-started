---
description: 'Redis 2.6.0 中，`SCRIPT FLUSH` 命令清除所有 Lua 脚本缓存，复杂度 O(N)（N 为缓存脚本数量）。使用 EVAL 对 Lua 脚本求值。执行后返回 OK。'
lastUpdated: '2026-06-21 21:34:09'
head:
  - - meta
    - name: 'og:title'
      content: 'SCRIPT FLUSH'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 2.6.0 中，`SCRIPT FLUSH` 命令清除所有 Lua 脚本缓存，复杂度 O(N)（N 为缓存脚本数量）。使用 EVAL 对 Lua 脚本求值。执行后返回 OK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/script/script_flush.html'
---
# SCRIPT FLUSH

> 可用版本： >= 2.6.0

> 复杂度： O(N) ， `N` 为缓存中脚本的数量。

清除所有 Lua 脚本缓存。

关于使用 Redis 对 Lua 脚本进行求值的更多信息，请参见 [EVAL script numkeys key [key …] arg [arg …]](https://eval.md#eval) 命令。

## 返回值

总是返回 `OK`

## 代码示例

```Plaintext
redis> SCRIPT FLUSH
OK
```