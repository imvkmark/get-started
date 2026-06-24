---
description: 'GEORADIUSBYMEMBER命令（可用版本3.2.0）时间复杂度O(logN+M)，与GEORADIUS功能相同，但中心点由指定位置元素决定，而非输入经纬度。示例：用GEOADD添加位置，再用GEORADIUSBYMEMBER查询以某点为中心100km内的元素，返回结果列表。'
lastUpdated: '2026-06-21 21:31:25'
head:
  - - meta
    - name: 'og:title'
      content: 'GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [ASC|DESC] [COUNT count]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'GEORADIUSBYMEMBER命令（可用版本3.2.0）时间复杂度O(logN+M)，与GEORADIUS功能相同，但中心点由指定位置元素决定，而非输入经纬度。示例：用GEOADD添加位置，再用GEORADIUSBYMEMBER查询以某点为中心100km内的元素，返回结果列表。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/geo/georadiusbymember.html'
---
# GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [ASC|DESC] [COUNT count]

> 可用版本： >= 3.2.0

> 时间复杂度： O(log(N)+M)， 其中 N 为指定范围之内的元素数量， 而 M 则是被返回的元素数量。

这个命令和 `GEORADIUS` 命令一样，  
都可以找出位于指定范围内的元素，  
但是 `GEORADIUSBYMEMBER` 的中心点是由给定的位置元素决定的，  
而不是像 `GEORADIUS` 那样，  
使用输入的经度和纬度来决定中心点。

关于 `GEORADIUSBYMEMBER` 命令的更多信息，  
请参考 `GEORADIUS` 命令的文档。

## 返回值

一个数组，  
数组中的每个项表示一个范围之内的位置元素。

## 代码示例

```Plaintext
redis> GEOADD Sicily 13.583333 37.316667 "Agrigento"
(integer) 1

redis> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2

redis> GEORADIUSBYMEMBER Sicily Agrigento 100 km
1) "Agrigento"
2) "Palermo"
```