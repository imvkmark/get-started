---
description: 'SETBIT命令用于设置或清除字符串键在指定偏移量上的位（0或1），时间复杂度O(1)。键不存在时自动创建并伸展字符串，空白位用0填充。offset需在0到2^32之间，注意大偏移量可能阻塞服务器。返回偏移量原来的位值。'
lastUpdated: '2026-06-21 21:28:58'
head:
  - - meta
    - name: 'og:title'
      content: 'SETBIT key offset value'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SETBIT命令用于设置或清除字符串键在指定偏移量上的位（0或1），时间复杂度O(1)。键不存在时自动创建并伸展字符串，空白位用0填充。offset需在0到2^32之间，注意大偏移量可能阻塞服务器。返回偏移量原来的位值。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/bitmap/setbit.html'
---
# SETBIT key offset value

> 可用版本： >= 2.2.0

> 时间复杂度: O(1)

对 `key` 所储存的字符串值，设置或清除指定偏移量上的位(bit)。

位的设置或清除取决于 `value` 参数，可以是 `0` 也可以是 `1` 。

当 `key` 不存在时，自动生成一个新的字符串值。

字符串会进行伸展(grown)以确保它可以将 `value` 保存在指定的偏移量上。当字符串值进行伸展时，空白位置以 `0` 填充。

`offset` 参数必须大于或等于 `0` ，小于 2^32 (bit 映射被限制在 512 MB 之内)。

Warning

对使用大的 `offset` 的 SETBIT 操作来说，内存分配可能造成 Redis 服务器被阻塞。具体参考 SETRANGE key offset value 命令，warning(警告)部分。

## 返回值

指定偏移量原来储存的位。

## 代码示例

```Plaintext
redis> SETBIT bit 10086 1
(integer) 0

redis> GETBIT bit 10086
(integer) 1

redis> GETBIT bit 100   # bit 默认被初始化为 0
(integer) 0
```