# Hash类型

[高可用Redis(三)：Hash类型](https://www.cnblogs.com/renpingsheng/p/9774526.html)





## 1.哈希类型键值结构

哈希类型也是key-value结构，key是字符串类型，其value分为两个部分:field和value


其中field部分代表属性，value代表属性对应的值

![](https://file.wulicode.com/yuque/202208/04/15/0054av3KMGWP.png)

上面的图里，`user:1:info`为key,`name,age,Date`为user这个key的一些属性，value是属性对应的值

在hash中，可以为key添加一个新的属性和新的值

比如使用下面的命令向user:1:info这个key添加一个新属性viewCounter,属性对应的值为100

```
hset user:1:info viewCounter 100
```


## 2.特点

```
key-value结构
key(field)不能相同，value可以相同
```


## 3.Redis哈希类型对应的命令


### 3.1 hget命令，hset命令和hdel命令

```
hget key field          获取hash key对应的field的value
hset key field value    设置hash key对应的field的value
hdel key field          删除hash key对应的field的value
```

例子：

```
127.0.0.1:6379> hset user:1:info age 23
(integer) 1
127.0.0.1:6379> hget user:1:info age
"23"
127.0.0.1:6379> hset user:1:info name python
(integer) 1
127.0.0.1:6379> hgetall user:1:info
1) "age"
2) "23"
3) "name"
4) "python"
127.0.0.1:6379> hdel user:1:info age
(integer) 1
127.0.0.1:6379> hgetall user:1:info
1) "name"
2) "python"
127.0.0.1:6379>
```

注意事项：

```
hget命令，hset命令和hdel命令的时间复杂度为O(1)
```


### 3.2 hexists命令和hlen命令

```
hexists key field   判断hash key是否有field
hlen key            获取hash key field的数量
```

例子：

```
127.0.0.1:6379> hgetall user:1:info
1) "name"
2) "python"
3) "age"
4) "23"
127.0.0.1:6379> hexists user:1:info name
(integer) 1
127.0.0.1:6379> hlen user:1:info
(integer) 2
```

注意事项：

```
hexists命令和hlen命令的时间复杂度为O(1)
```


### 3.3 hmget命令和hmset命令

```
hmget key field1 field2 ... fieldN                          批量获取hash key的一批field对应的值
hmset key field1 value1 field2 value2 ... fieldN valueN     批量设置hash key的一批field value
```

例子：

```
127.0.0.1:6379> hmset user:2:info age 30 name mysql page 50
OK
127.0.0.1:6379> hlen user:2:info
(integer) 3
127.0.0.1:6379> hmget user:2:info age name
1) "30"
2) "mysql"
127.0.0.1:6379>
```

注意事项：

```
hmget命令和hmset命令的时间复杂度为O(1)
```


### 3.4 hgetall命令，hvals命令和hkeys命令

```
hgetall key         返回hash key对应所有的field和value
hvals key           返回hash key对应所有field的value
hkeys key           返回hash key对应所有field
```

例子：

```
127.0.0.1:6379> hgetall user:2:info
1) "age"
2) "30"
3) "name"
4) "mysql"
5) "page"
6) "50"
127.0.0.1:6379> hvals user:2:info
1) "30"
2) "mysql"
3) "50"
127.0.0.1:6379> hkeys user:2:info
1) "age"
2) "name"
3) "page"
```

注意事项：

```
hgetall命令，hvals命令和hkeys命令的时间复杂度为O(1)
由于Redis的单线程的特点以及hgetall会返回所有的key和value,所以如果hash中存储的数据过多时，hgetall命令的执行速度会比较慢
```


### 3.5 hsetnx命令,hincrby命令和hincrbyfloat命令

```
hsetnx key field value                  设置hash key对应field的value(如field已经存在，则失败)
hincrby key field intCounter            hash key对应的field的value自增intCounter
hincrbyfloat key field floatCounter     hincrby浮点数版
```

注意事项：

```
hsetnx命令,hincrby命令和hincrbyfloat命令的时间复杂度为O(1)
```


## 4.实战

记录网站每个用户个人主页的访问量，也可以使用哈希类型


这样可以保证每个用户的相关数据是一个整体，而使用字符串类型保存的话，则每个用户个人主面的访问量与每个用户的其他数据都是一个分离的状态。

记录网站每个用户个人主页的访问量需要根据实际情况来进行设计使用

```
hincrby user:1:info pageview count
```


## 5.使用Redis保存每个用户相关的数据，可以使用三种方式


### 5.1 方式一

使用用户的id为key,把用户的相关数据进行序列化后并做为value

![](https://file.wulicode.com/yuque/202208/04/15/0055sc42Z4m7.png)

使用时，根据用户id获取对应的数据的字符串格式，进行反序列化后就可以得到用户相关的数据进行查询和更新操作


### 5.2 方式二

使用用户的id与用户对应的属性名进行拼接得到新的字符串，并做为key，用户对应属性的值做为value

![](https://file.wulicode.com/yuque/202208/04/15/00556B05LQvg.png)

这样，用户的所有信息都是分离开的，可以很方便的对用户的数据进行查询和更新，并且可以很方便的为用户添加新的属性，而不用对原来的属性有影响


### 5.3 方式三

使用用户id做为key,用户的其他数据都保存为hash格式，

![](https://file.wulicode.com/yuque/202208/04/15/0056K6LLLwSy.png)

对用户的属性进行查询，更新和添加都比较方便

保存用户相关数据的方式比较

![](https://file.wulicode.com/yuque/202208/04/15/0056C2GtmfmP.png)

