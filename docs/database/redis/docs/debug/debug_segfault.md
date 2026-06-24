---
description: 'Redis DEBUG SEGFAULT命令为开发调试工具，时间复杂度O(1)。它通过执行非法内存访问强制Redis崩溃，用于模拟程序BUG。当Redis未运行时，执行该命令会返回“Could not connect to Redis at: Connection refused”错误。'
lastUpdated: '2026-06-21 21:30:28'
head:
  - - meta
    - name: 'og:title'
      content: 'DEBUG SEGFAULT'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis DEBUG SEGFAULT命令为开发调试工具，时间复杂度O(1)。它通过执行非法内存访问强制Redis崩溃，用于模拟程序BUG。当Redis未运行时，执行该命令会返回“Could not connect to Redis at: Connection refused”错误。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/debug/debug_segfault.html'
---
# DEBUG SEGFAULT

> 可用版本： >= 1.0.0

> 时间复杂度： O(1)

执行一个不合法的内存访问从而让 Redis 崩溃，仅在开发时用于 BUG 模拟。

## 返回值

无

## 代码示例

```Plaintext
redis> DEBUG SEGFAULT
Could not connect to Redis at: Connection refused

not connected>
```