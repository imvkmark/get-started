---
description: '将多个HyperLogLog合并为一个，合并后的基数接近各输入集合的并集。结果存入目标键，若不存在则创建。时间复杂度O(N)，常数较高。命令返回OK。示例：合并nosql和RDBMS后，databases的基数估算为6。'
lastUpdated: '2026-06-21 21:31:57'
head:
  - - meta
    - name: 'og:title'
      content: 'PFMERGE destkey sourcekey [sourcekey …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '将多个HyperLogLog合并为一个，合并后的基数接近各输入集合的并集。结果存入目标键，若不存在则创建。时间复杂度O(N)，常数较高。命令返回OK。示例：合并nosql和RDBMS后，databases的基数估算为6。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/hyperloglog/pfmerge.html'
---
# PFMERGE destkey sourcekey [sourcekey …]

> 可用版本： >= 2.8.9

> 时间复杂度： O(N) ， 其中 N 为被合并的 HyperLogLog 数量， 不过这个命令的常数复杂度比较高。

将多个 HyperLogLog 合并（merge）为一个 HyperLogLog ，  
合并后的 HyperLogLog 的基数接近于所有输入 HyperLogLog 的可见集合（observed set）的并集。

合并得出的 HyperLogLog 会被储存在 `destkey` 键里面，  
如果该键并不存在，  
那么命令在执行之前，  
会先为该键创建一个空的 HyperLogLog 。

## 返回值

字符串回复：返回 `OK` 。

## 代码示例

```Plaintext
redis> PFADD  nosql  "Redis"  "MongoDB"  "Memcached"
(integer) 1

redis> PFADD  RDBMS  "MySQL" "MSSQL" "PostgreSQL"
(integer) 1

redis> PFMERGE  databases  nosql  RDBMS
OK

redis> PFCOUNT  databases
(integer) 6
```