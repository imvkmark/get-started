---
description: 'Redis的MULTI命令标记事务块开始，后续命令按序入队，由EXEC原子执行，时间复杂度O(1)，始终返回OK。'
lastUpdated: '2026-06-21 21:38:48'
head:
  - - meta
    - name: 'og:title'
      content: 'MULTI'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的MULTI命令标记事务块开始，后续命令按序入队，由EXEC原子执行，时间复杂度O(1)，始终返回OK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/transaction/multi.html'
---
# MULTI

**MULTI**

标记一个事务块的开始。

事务块内的多条命令会按照先后顺序被放进一个队列当中，最后由 [EXEC](https://exec.md#exec) 命令原子性(atomic)地执行。

**可用版本：**  
: >= 1.2.0

**时间复杂度：**  
: O(1)。

**返回值：**  
: 总是返回 `OK` 。

```Plaintext
redis> MULTI            # 标记事务开始
OK

redis> INCR user_id     # 多条命令按顺序入队
QUEUED

redis> INCR user_id
QUEUED

redis> INCR user_id
QUEUED

redis> PING
QUEUED

redis> EXEC             # 执行
1) (integer) 1
2) (integer) 2
3) (integer) 3
4) PONG
```