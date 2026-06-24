---
description: 'ZSCORE命令用于获取有序集中指定成员的分数，时间复杂度O(1)，返回字符串形式的分数值；若成员或键不存在则返回nil。示例：ZSCORE salary peter返回"3500"。'
lastUpdated: '2026-06-21 21:36:40'
head:
  - - meta
    - name: 'og:title'
      content: 'ZSCORE key member'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ZSCORE命令用于获取有序集中指定成员的分数，时间复杂度O(1)，返回字符串形式的分数值；若成员或键不存在则返回nil。示例：ZSCORE salary peter返回"3500"。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/sorted_set/zscore.html'
---
# ZSCORE key member

> 可用版本： >= 1.2.0

> 时间复杂度: O(1)

返回有序集 `key` 中，成员 `member` 的 `score` 值。

如果 `member` 元素不是有序集 `key` 的成员，或 `key` 不存在，返回 `nil` 。

## 返回值

`member` 成员的 `score` 值，以字符串形式表示。

## 代码示例

```Plaintext
redis> ZRANGE salary 0 -1 WITHSCORES    # 测试数据
1) "tom"
2) "2000"
3) "peter"
4) "3500"
5) "jack"
6) "5000"

redis> ZSCORE salary peter              # 注意返回值是字符串
"3500"
```