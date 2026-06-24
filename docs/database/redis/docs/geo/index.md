---
description: '该文档介绍了Redis的地理空间（GEO）操作命令，包括GEOADD添加坐标、GEODIST计算距离、GEOHASH获取哈希值等，用于存储和查询地理位置数据。'
lastUpdated: '2026-06-21 21:40:07'
head:
  - - meta
    - name: 'og:title'
      content: 'Geo / 地理位置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档介绍了Redis的地理空间（GEO）操作命令，包括GEOADD添加坐标、GEODIST计算距离、GEOHASH获取哈希值等，用于存储和查询地理位置数据。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/geo/index.html'
---
# Geo / 地理位置

- [GEOADD key longitude latitude member [longitude latitude member …]](/database/redis/docs/geo/geoadd.md)
- [GEODIST key member1 member2 [unit]](/database/redis/docs/geo/geodist.md)
- [GEOHASH key member [member …]](/database/redis/docs/geo/geohash.md)
- [GEOPOS key member [member …]](/database/redis/docs/geo/geopos.md)
- [GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [ASC|DESC] [COUNT count]](/database/redis/docs/geo/georadius.md)
- [GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [ASC|DESC] [COUNT count]](/database/redis/docs/geo/georadiusbymember.md)