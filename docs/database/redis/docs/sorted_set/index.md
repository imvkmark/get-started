---
description: '该文档列出了Redis有序集合的常用命令，包括添加元素(ZADD)、获取基数(ZCARD)、按分数范围计数(ZCOUNT)以及增加分数(ZINCRBY)等操作。'
lastUpdated: '2026-06-21 21:45:34'
head:
  - - meta
    - name: 'og:title'
      content: 'Sorted Set / 有序集合'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档列出了Redis有序集合的常用命令，包括添加元素(ZADD)、获取基数(ZCARD)、按分数范围计数(ZCOUNT)以及增加分数(ZINCRBY)等操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/index.html'
---
# Sorted Set / 有序集合

- [ZADD key score member [[score member] [score member] …]](/database/redis/docs/sorted_set/zadd.md)
- [ZCARD key](/database/redis/docs/sorted_set/zcard.md)
- [ZCOUNT key min max](/database/redis/docs/sorted_set/zcount.md)
- [ZINCRBY key increment member](/database/redis/docs/sorted_set/zincrby.md)
- [ZINTERSTORE destination numkeys key [key …] [WEIGHTS weight [weight …]] [AGGREGATE SUM|MIN|MAX]](/database/redis/docs/sorted_set/zinterstore.md)
- [ZLEXCOUNT key min max](/database/redis/docs/sorted_set/zlexcount.md)
- [ZRANGE key start stop [WITHSCORES]](/database/redis/docs/sorted_set/zrange.md)
- [ZRANGEBYLEX key min max [LIMIT offset count]](/database/redis/docs/sorted_set/zrangebylex.md)
- [ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]](/database/redis/docs/sorted_set/zrangebyscore.md)
- [ZRANK key member](/database/redis/docs/sorted_set/zrank.md)
- [ZREM key member [member …]](/database/redis/docs/sorted_set/zrem.md)
- [ZREMRANGEBYLEX key min max](/database/redis/docs/sorted_set/zremrangebylex.md)
- [ZREMRANGEBYRANK key start stop](/database/redis/docs/sorted_set/zremrangebyrank.md)
- [ZREMRANGEBYSCORE key min max](/database/redis/docs/sorted_set/zremrangebyscore.md)
- [ZREVRANGE key start stop [WITHSCORES]](/database/redis/docs/sorted_set/zrevrange.md)
- [ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]](/database/redis/docs/sorted_set/zrevrangebyscore.md)
- [ZREVRANK key member](/database/redis/docs/sorted_set/zrevrank.md)
- [ZSCAN key cursor [MATCH pattern] [COUNT count]](/database/redis/docs/sorted_set/zscan.md)
- [ZSCORE key member](/database/redis/docs/sorted_set/zscore.md)
- [ZUNIONSTORE destination numkeys key [key …] [WEIGHTS weight [weight …]] [AGGREGATE SUM|MIN|MAX]](/database/redis/docs/sorted_set/zunionstore.md)