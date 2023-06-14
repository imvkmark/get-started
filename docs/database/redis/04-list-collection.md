# 列表，集合与有序集合

[高可用Redis(四)：列表，集合与有序集合](https://www.cnblogs.com/renpingsheng/p/9778433.html)





## 1.列表类型


### 1.1 列表数据结构

![](https://file.wulicode.com/yuque/202208/04/22/5619dwMwIROU.png)

```
左边为key,是字符串类型
右边为value,是一个有序的队列，与python的列表结构相同
可以在Redis中对列表的value进行如下操作
    从左边添加元素
    从右边添加元素
    从左边删除元素
    从右边删除元素
    计算列表长度
    删除列表中指定元素
    从列表中获取子列表元素
    可以按照索引来获取指定元素
```


### 1.2 列表类型的特点

```
有序
可以重复
左右两边插入弹出
```


### 1.3 列表类型常用的方法

```
rpush key value1 value2 ... valueN          从列表右端插入值(1-N个)
lpush key value1 value2 ... valueN          从列表左端插入值(1-N个)
linsert key before value newValue           在list指定的值前插入newValue
linsert key after value newValue            在list指定的值后插入newValue
lpop key                                    从列表左侧弹出一个item
rpop key                                    从列表右侧弹出一个item
lrem key count value                        根据count值，从列表中删除所有value相等的项
    count > 0,从左到右，删除最多count个value相等的项
    count < 0,从右到左，删除最多Math.abs(count)个value相等的项
    count = 0,删除所有value相等的项
ltrim key start end                         按照索引范围修剪列表
lrange key start end(包含end)               获取列表指定索引范围所有item
lindex key index                            获取列表指定索引的item
llen key                                    获取列表长度
lset key index newValue                     设置列表指定索引值为newValue
blpop key timeout                           lpop阻塞版本，timeout是阻塞超时时间，timeout＝0为永不超时
brpop key timeout                           rpop阻塞版本，timeout是阻塞超时时间，timeout＝0为永不超时
```

例子：

```
127.0.0.1:6379> rpush mylist a b c d
(integer) 4
127.0.0.1:6379> lrange mylist 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
127.0.0.1:6379> lpush mylist 0
(integer) 5
127.0.0.1:6379> lrange mylist 0 -1
1) "0"
2) "a"
3) "b"
4) "c"
5) "d"
127.0.0.1:6379> rpop mylist
"d"
127.0.0.1:6379> lrange mylist 0 -1
1) "0"
2) "a"
3) "b"
4) "c"
127.0.0.1:6379>
```

说明：

```
lpush加lpop的操作相当于Stack
lpush加rpop的操作相当于Queue
lpush加ltrim的操作相当于Capped Collection
lpush加brpop的操作相当于Message Queue
```

列表类型API的时间复杂度说明

```
rpush,lpush命令的时间复杂度为O(1)到O(N),由从列表中获取元素的个数来决定
linsert after/before,lrem,ltrim,lrange,lindex,lset命令的时间复杂度为O(N)
lpop,rpop,llen,blpop,brpop命令的时间复杂度都是O(1)
```


## 2.集合类型


### 2.1 集合类型数据结构

![](https://file.wulicode.com/yuque/202208/04/22/56203dA3PbO8.png)

```
左边为key,是字符串类型
右边为value,可以将一些字符串进行一些组合，是集合类型
可以向value中添加或者删除一个元素
Redis中的集合类型还支持集合之间的操作，这与Redis中的其他数据结构是不同的
Redis可以对两个集合进行操作，取两个集合的交集，并集，差集以及对称差集等等
```


### 2.2 集合类型的特点

```
无序
无重复
支持集合间操作
```


### 2.3 集合类型常用的方法

```
sadd key element                向集合key添加element(如果element已经存在，添加失败)
srem key element                将集合key中的element移除掉
scard user:1:follow             计算集合大小
sismember user:1:follow it      判断it是否在集合中
srandmember user:1:follow count 从集合中随机挑count个元素，不破坏集合的结构
spop user:1:follow              从集合中随机弹出一个元素，弹出后集合中没有这个元素了          
smembers user:1:follow          获取集合所有元素，无序，小心使用
```

时间复杂度说明：

```
sadd,srem,scard,sismember,srandmember,spop,smember命令的时间复杂度都是O(1)
```

例子：

```
127.0.0.1:6379> sadd user:1:follow it news his sports
(integer) 4
127.0.0.1:6379> smembers user:1:follow
1) "news"
2) "sports"
3) "his"
4) "it"
127.0.0.1:6379> spop user:1:follow
"sports"
127.0.0.1:6379> smembers user:1:follow
1) "news"
2) "his"
3) "it"
127.0.0.1:6379> scard user:1:follow
(integer) 3
127.0.0.1:6379> sismember user:1:follow entertainment
(integer) 0
```


### 2.4 集合间API

```
sdiff                                   差集
sinter                                  交集
sunion                                  并集
sdiff|sinter|sunion + store destkey     将差集，交集，并集结果保存在destkey中
```


### 2.5 实战

```
在一些抽奖活动中，就可以用Redis的集合来实现，使用spop把已经中奖的用户弹出
在社交网络中，常用的如点赞，踩等功能也可以用集合来实现
社交网络中，共同关注的好友可以用集合的交集实现
```


## 3.有序集合类型


### 3.1 有序集合的数据结构

![](https://file.wulicode.com/yuque/202208/04/22/5620q0IDLGSh.png)

```
key-value结构
左边为key,是字符串类型,右边为value,由两部分组成：score和value
score表示分值，表示value在有序集合中的位置
```


### 3.2 有序集合类型常用的方法

```
zadd key score element(可以是多对)           添加score和element
zrem key element(可以是多个)                 删除元素                        
zscore key element                          返回元素的分数         
zincrby key increScore element              增加或减少元素的分数       
zcard key                                   返回元素的总个数
zrange key start end [withscores]           返回指定索引范围内的升序元素[分值]
zrangebyscore key minScore maxScore         返回指定分数范围内的长序元素[分值]
zcount len minScore maxScore                返回有序集合内在指定分数范围内的个数
zremrangebyrank key start end               删除指定排名内的升序元素        
zremrangebyscore key minScore maxScore      删除指定分数内的升序元素
zrevrank                获取有序集合中从高到低的排名 
zrevrange               从高到低排名后获取一定范围的值
zrevrangebyscore        按score从高到低排名的结果
zinterstore             对两个有序集合的交集进行运算，并保存
zunionstore             对两个有序集合的并集进行运算，并保存
```


### 3.3 有序集合常用方法的时间复杂度

```
zadd命令的时间复杂度为log(N),n是有序集合中元素的个数
zrem,zscore,zincrby,zcard命令的时间复杂度为O(1)
zrange,zremrangebyrank,zrangebyscore,zcount,zremrangebyscore命令的时间复杂度为log(N) + m,n为有序集合元素的个数，m为有序集合中被操作元素的个数
```

例子：

```
127.0.0.1:6379> zadd player:rank 1000 python 900 java 800 php 600 sql
(integer) 4
127.0.0.1:6379> zscore player:rank php
"800"
127.0.0.1:6379> zcard player:rank
(integer) 4
127.0.0.1:6379> zrank player:rank python
(integer) 3
127.0.0.1:6379> zrem player:rank java
(integer) 1
127.0.0.1:6379> zrange player:rank 0 -1 withscores
1) "sql"
2) "600"
3) "php"
4) "800"
5) "python"
6) "1000"

127.0.0.1:6379> zadd player:rank 1000 python 900 java 800 php 600 sql
(integer) 1
127.0.0.1:6379> zrange player:rank 0 -1
1) "sql"
2) "php"
3) "java"
4) "python"
127.0.0.1:6379> zcount player:rank 700 901
(integer) 2
127.0.0.1:6379> zrangebyscore player:rank 700 901
1) "php"
2) "java"
127.0.0.1:6379> zremrangebyrank player:rank 0 1
(integer) 2
127.0.0.1:6379> zrange player:rank 0 -1
1) "java"
2) "python"
127.0.0.1:6379> zrange player:rank 0 -1 withscores
1) "java"
2) "900"
3) "python"
4) "1000"
```


### 3.4 有序集合实战

```
排行榜
```


## 4. 集合与有序集合的区别

```
都没有重复元素
集合无序，有序集合是有序的
集合中只有element，有序集合中有element+score
```


### 5. 列表与有序集合的区别

```
列表可以有重复元素，有序集合没有重复元素
列表有序，有序集合有序
列表中只有element,有序集合中有element+score
```

