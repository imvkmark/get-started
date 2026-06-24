---
description: '监视一个或多个 key，若在事务执行前这些 key 被其他命令修改，则事务中断。版本 2.2.0，时间复杂度 O(1)，总是返回 OK。'
lastUpdated: '2026-06-21 21:38:53'
head:
  - - meta
    - name: 'og:title'
      content: 'WATCH'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '监视一个或多个 key，若在事务执行前这些 key 被其他命令修改，则事务中断。版本 2.2.0，时间复杂度 O(1)，总是返回 OK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/transaction/watch.html'
---
# WATCH

**WATCH key [key …]**

监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。

**可用版本：**  
: >= 2.2.0

**时间复杂度：**  
: O(1)。

**返回值：**  
: 总是返回 `OK` 。

```Plaintext
redis> WATCH lock lock_times
OK
```