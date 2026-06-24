---
description: 'SINTER命令用于返回所有给定集合的交集，时间复杂度为O(N*M)，其中N为最小集合基数，M为集合个数。不存在的key视为空集，若任一集合为空则结果为空。示例中，group1包含LI LEI、TOM、JACK，group2包含HAN MEIMEI、JACK，返回交集仅JACK。'
lastUpdated: '2026-06-21 21:34:55'
head:
  - - meta
    - name: 'og:title'
      content: 'SINTER key [key …]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SINTER命令用于返回所有给定集合的交集，时间复杂度为O(N*M)，其中N为最小集合基数，M为集合个数。不存在的key视为空集，若任一集合为空则结果为空。示例中，group1包含LI LEI、TOM、JACK，group2包含HAN MEIMEI、JACK，返回交集仅JACK。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/docs/set/sinter.html'
---
# SINTER key [key …]

> 可用版本： >= 1.0.0

> 时间复杂度: O(N \* M)， `N` 为给定集合当中基数最小的集合， `M` 为给定集合的个数。

返回一个集合的全部成员，该集合是所有给定集合的交集。

不存在的 `key` 被视为空集。

当给定集合当中有一个空集时，结果也为空集(根据集合运算定律)。

## 返回值

交集成员的列表。

## 代码示例

```Plaintext
redis> SMEMBERS group_1
1) "LI LEI"
2) "TOM"
3) "JACK"

redis> SMEMBERS group_2
1) "HAN MEIMEI"
2) "JACK"

redis> SINTER group_1 group_2
1) "JACK"
```