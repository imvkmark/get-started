---
description: 'Redis的BIT命令系列包括：BITCOUNT统计二进制位中1的个数；BITFIELD支持对字符串进行位操作（GET、SET、INCRBY），并可设置溢出策略；BITOP对多个键执行位运算（AND、OR、NOT、XOR）并存储结果。这些命令适用于高效处理二进制数据。'
lastUpdated: '2026-06-21 21:36:41'
head:
  - - meta
    - name: 'og:title'
      content: 'Bitmap / 位图'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis的BIT命令系列包括：BITCOUNT统计二进制位中1的个数；BITFIELD支持对字符串进行位操作（GET、SET、INCRBY），并可设置溢出策略；BITOP对多个键执行位运算（AND、OR、NOT、XOR）并存储结果。这些命令适用于高效处理二进制数据。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/bitmap/index.html'
---
# Bitmap / 位图

- [BITCOUNT key [start] [end]](/database/redis/docs/bitmap/bitcount.md)
- [BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]](/database/redis/docs/bitmap/bitfield.md)
- [BITOP operation destkey key [key …]](/database/redis/docs/bitmap/bitop.md)
- [BITPOS key bit [start] [end]](/database/redis/docs/bitmap/bitpos.md)
- [GETBIT key offset](/database/redis/docs/bitmap/getbit.md)
- [SETBIT key offset value](/database/redis/docs/bitmap/setbit.md)