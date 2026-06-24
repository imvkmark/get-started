---
description: 'UNWATCH 命令用于取消对所有 key 的监视。若在 WATCH 后执行了 EXEC 或 DISCARD，则无需再执行 UNWATCH，因为 EXEC 已执行事务，DISCARD 同时取消事务和监视。该命令从 2.2.0 版本可用，时间复杂度 O(1)，返回值总是 OK。'
lastUpdated: '2026-06-21 21:38:51'
head:
  - - meta
    - name: 'og:title'
      content: 'UNWATCH'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'UNWATCH 命令用于取消对所有 key 的监视。若在 WATCH 后执行了 EXEC 或 DISCARD，则无需再执行 UNWATCH，因为 EXEC 已执行事务，DISCARD 同时取消事务和监视。该命令从 2.2.0 版本可用，时间复杂度 O(1)，返回值总是 OK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/transaction/unwatch.html'
---
# UNWATCH

**UNWATCH**

取消 [WATCH](https://watch.md#watch) 命令对所有 key 的监视。

如果在执行 [WATCH](https://watch.md#watch) 命令之后， [EXEC](https://exec.md#exec) 命令或 [DISCARD](https://discard.md#discard) 命令先被执行了的话，那么就不需要再执行 UNWATCH 了。

因为 [EXEC](https://exec.md#exec) 命令会执行事务，因此 [WATCH](https://watch.md#watch) 命令的效果已经产生了；而 [DISCARD](https://discard.md#discard) 命令在取消事务的同时也会取消所有对 key 的监视，因此这两个命令执行之后，就没有必要执行 UNWATCH 了。

**可用版本：**  
: >= 2.2.0

**时间复杂度：**  
: O(1)

**返回值：**  
: 总是 `OK` 。

```Plaintext
redis> WATCH lock lock_times
OK

redis> UNWATCH
OK
```