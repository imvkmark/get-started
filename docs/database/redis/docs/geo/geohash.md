---
description: 'Redis 3.2.0 的 GEOHASH 命令以 O(logN) 复杂度返回指定位置元素的 Geohash 编码。返回的数组与输入位置元素一一对应，如 Sicily 的 Palermo 和 Catania 分别对应 "sqc8b49rny0" 和 "sqdtr74hyu0"。'
lastUpdated: '2026-06-21 21:31:20'
head:
  - - meta
    - name: 'og:title'
      content: 'GEOHASH key member [member …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis 3.2.0 的 GEOHASH 命令以 O(logN) 复杂度返回指定位置元素的 Geohash 编码。返回的数组与输入位置元素一一对应，如 Sicily 的 Palermo 和 Catania 分别对应 "sqc8b49rny0" 和 "sqdtr74hyu0"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/geo/geohash.html'
---
# GEOHASH key member [member …]

> 可用版本： >= 3.2.0

> 时间复杂度： 寻找每个位置元素的复杂度为 O(log(N)) ， 其中 N 为给定键包含的位置元素数量。

返回一个或多个位置元素的 [Geohash](https://en.wikipedia.org/wiki/Geohash) 表示。

## 返回值

一个数组，  
数组的每个项都是一个 geohash 。  
命令返回的 geohash 的位置与用户给定的位置元素的位置一一对应。

## 代码示例

```Plaintext
redis> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2

redis> GEOHASH Sicily Palermo Catania
1) "sqc8b49rny0"
2) "sqdtr74hyu0"
```