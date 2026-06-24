---
description: 'Redis支持多种数据类型：字符串（string）支持set、setnx、get、incr、mset等；哈希（hash）支持hset、hget、hdel、hlen等；集合（set）支持sadd、srem、sismember等；有序集合（zset）支持zadd、zscore、zrank、zrem等；列表（list）支持lpush、rpush、lpop、rpop等。'
lastUpdated: '2026-06-21 22:43:31'
head:
  - - meta
    - name: 'og:title'
      content: 'redis常用操作'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Redis支持多种数据类型：字符串（string）支持set、setnx、get、incr、mset等；哈希（hash）支持hset、hget、hdel、hlen等；集合（set）支持sadd、srem、sismember等；有序集合（zset）支持zadd、zscore、zrank、zrem等；列表（list）支持lpush、rpush、lpop、rpop等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//database/redis/primer/common-usage.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/c0dd1c7d5f27729b12be293f259b987d.jpg'
---
# redis常用操作

## 数据类型

redis支持五种数据类型: string(字符串), hash(哈希), set(集合), zset(有序集合), list(列表).

### string

保存格式为一个key对应一个value, 最大存储512M

### set(覆盖写)

### setNx (set if not exists)

如果key存在则不进行设置

![](https://file.wulicode.com/feishu-images/c0dd1c7d5f27729b12be293f259b987d.jpg)

- setEx 保存值并设置有效期

![](https://file.wulicode.com/feishu-images/479a423c718ef8381988efba34cd3c7e.jpg)

![](https://file.wulicode.com/feishu-images/61fbfd24db08d286858be89f963ba42b.jpg)

### psetEx 以毫秒为单位设置有效期

### get 获取数值

### getSet 设置值并返回旧的值

![](https://file.wulicode.com/feishu-images/8a054e8e5f62d8e6a937de3625d0b319.jpg)

### strlen 获取数据长度

![](https://file.wulicode.com/feishu-images/8f235e8f204091a4f1a4a75e9aa95924.jpg)

### incr 数值累加1

如果key不存在, 会先设置为0,然后执行累加操作

![](https://file.wulicode.com/feishu-images/b7611b4854da9544ed5f3410c389d031.jpg)

### incrby 增加xx

![](https://file.wulicode.com/feishu-images/ded1fa3b1bce02eb5ba8c06882520e30.jpg)

### decr 减少1

### decrby 减少指定数值

### mset, msetnx, mget 对多个key进行设置

![](https://file.wulicode.com/feishu-images/5f569db449c3a2b5511a4825eaf9517a.jpg)

mset和msetnx是一个原子性操作, 当所有key设置成功,才算成功

### hash哈希

保存的是键值对集合, 适用于存储对象

### hset, hget, hgetall

![](https://file.wulicode.com/feishu-images/a2adf31d10d7f5829701b89c8af29066.jpg)

### hexists 检测指定key的field是否存在

![](https://file.wulicode.com/feishu-images/ab724dd6f3103e4f6d2f750f47760b7c.jpg)

### hsetnx 如果指定key的field不存在则进行设置

![](https://file.wulicode.com/feishu-images/f477019f179b828ce8a3d970c0f29bd6.jpg)

![](https://file.wulicode.com/feishu-images/bcc54e42b6edce3057143aec2e48a2ce.jpg)

### hdel 删除指定key的field

![](https://file.wulicode.com/feishu-images/1e7a9fd6aaced39ec544996c2522bf33.jpg)

### hlen 获取指定key的field字段个数

![](https://file.wulicode.com/feishu-images/3ddeab03333d718998f758ca63a11baa.jpg)

### hmset 给指定key设置多个field信息

![](https://file.wulicode.com/feishu-images/eebed4f37949501973f6929b56dc29a1.jpg)

### hmget 获取指定key的多个field

![](https://file.wulicode.com/feishu-images/fb735ad6ecae60a4398f6a1b147fdecb.jpg)

### set集合

字符串类型的无序集合

### sadd 添加元素

![](https://file.wulicode.com/feishu-images/296d7a23e74f0e46ac28ccfe9e5474cc.jpg)

### srem 移除指定元素

![](https://file.wulicode.com/feishu-images/6160f283ed4dc66f68ccd974b8eb4d23.jpg)

### sismember 是否是集合的元素

![](https://file.wulicode.com/feishu-images/b7b425e5f3c097bdcbaa95f93d8470e6.jpg)

### scard 获取集合元素个数

### zset有序集合

根据每个元素对应的score来进行排序

### zadd 将一个或多个元素和score值保存到集合中

![](https://file.wulicode.com/feishu-images/cd8a73bbb3b18904a7ee8d2e3a299b7a.jpg)

### zscore 获取指定元素的score

### zrank 获取元素按score从小到大的排名

### zrevrank 获取元素按score从大到小的排名

### zcard 获取集合数量

![](https://file.wulicode.com/feishu-images/9f9486dbe7b6dab92f3a2553847ef91c.jpg)

### zrem 移除指定元素

![](https://file.wulicode.com/feishu-images/52815b35c43fdc2d377b9086802788c3.jpg)

### list列表

字符串列表, 按照插入顺序排序.

### lpush 从左边插入

### rpush 从右边插入

### lpop 从左边弹出Ω

### rpop 从右边弹出

### llen 返回数据长度

### lrange 获取指定范围内的元素

start, end 默认为0, -1表示最后一个元素, -2标书倒数第二个元素

![](https://file.wulicode.com/feishu-images/1b5f02f01893744bafcb2925ce249a26.jpg)