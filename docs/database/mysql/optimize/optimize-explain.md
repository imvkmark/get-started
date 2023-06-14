# 索引优化分析：性能分析

## 一、MySQL常见瓶颈

### 1.CPU

CPU在饱和的时候一般发生在数据装入内存或从磁盘上读取数据时候。

SQL中对大量数据进行比较、关联、排序、分组。最大的压力在于比较。

### 2.IO

磁盘I/O瓶颈放生在装入数据远大于内存容量的时候。

实例内存满足不了缓存数据或排序等需要，导致产生大量物理 IO。查询执行效率低，扫描过多数据行。

### 3.锁

不适宜的锁的设置，导致线程阻塞，性能下降。

死锁，线程之间交叉调用资源，导致死锁，程序卡住。

### 4.服务器硬件

top，free，iostat和vmstat来查看系统的状态。

## 二、Explain

### 1.Explain简介

使用EXPLAIN关键字可以模拟优化器执行SQL查询语句，从而知道MySQL是如何处理你的SQL语句的。分析你的查询语句或是表结构的性能瓶颈。

### 2.Explain用途

①表的读取顺序

通过id查阅；

②哪些索引可以使用

③数据读取操作的操作类型

④哪些索引被实际使用

⑤表之间的引用

⑥每张表有多少行被优化器查询

### 3.Explain用法

Explain + SQL语句

![image.png](https://file.wulicode.com/yuque/202301/03/23/4009gjvSHpUW.png?x-oss-process=image/resize,h_40)

| 列名            | 说明                                                                                        |
|---------------|-------------------------------------------------------------------------------------------|
| id            | 执行编号，标识select所属的行。如果在语句中没子查询或关联查询，只有唯一的select，每行都将显示1。否则，内层的select语句一般会顺序编号，对应于其在原始语句中的位置 |
| select_type   | 显示本行是简单或复杂select。如果查询有任何复杂的子查询，则最外层标记为PRIMARY（DERIVED、UNION、UNION RESUlT）                 |
| table         | 访问引用哪个表（引用某个查询，如“derived3”）                                                               |
| type          | 数据访问/读取操作类型（ALL、index、range、ref、eq_ref、const/system、NULL）                                 |
| possible_keys | 揭示哪一些索引可能有利于高效的查找                                                                         |
| key           | 显示mysql决定采用哪个索引来优化查询                                                                      |
| key_len       | 显示mysql在索引里使用的字节数                                                                         |
| ref           | 显示了之前的表在key列记录的索引中查找值所用的列或常量                                                              |
| rows          | 为了找到所需的行而需要读取的行数，估算值，不精确。通过把所有rows列值相乘，可粗略估算整个查询会检查的行数                                    |
| Extra         | 额外信息，如using index、filesort等                                                               |

#### (1)id

select查询的序列号,包含一组数字，表示查询中执行select子句或操作表的顺序。

三种情况

① id相同，执行顺序由上至下。

此例中 先执行where 后的第一条语句 t1.id = t2.id 通过 t1.id 关联 t2.id 。 而 t2.id 的结果建立在 t2.id=t3.id 的基础之上。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4010IhI8ELd2.png)

②id不同，如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4010SQGFaVa5.png)

③id相同不同，同时存在

id如果相同，可以认为是一组，从上往下顺序执行；

在所有组中，id值越大，优先级越高，越先执行

衍生表 = derived2 --> derived + 2 （2 表示由 id =2 的查询衍生出来的表。type 肯定是 all ，因为衍生的表没有建立索引）

![image.png](https://file.wulicode.com/yuque/202301/03/23/4010Ap4Cr0Rx.png)

#### (2)select_type

![image.png](https://file.wulicode.com/yuque/202301/03/23/4011IEpQGQLG.png)

| 类型                 | 说明                                                                     |
|--------------------|------------------------------------------------------------------------|
| simple             | 简单子查询，不包含子查询和 union                                                    |
| primary            | 包含 union 或者子查询，最外层的部分标记为 primary [或包含任何复杂的子部分]                         |
| subquery           | 一般子查询中的子查询被标记为 subquery，也就是位于select列表中的查询                              |
| derived            | 派生表——该临时表是从子查询派生出来的，位于form中的子查询                                        |
| union              | 位于union中第二个及其以后的子查询被标记为union，第一个就被标记为primary如果是union位于from中则标记为derived |
| union result       | 用来从匿名临时表里检索结果的select被标记为union result                                   |
| dependent union    | 顾名思义，首先需要满足UNION的条件，及UNION中第二个以及后面的SELECT语句，同时该语句依赖外部的查询               |
| subquery           | 子查询中第一个SELECT语句                                                        |
| dependent subquery | 和DEPENDENT UNION相对UNION一样                                              |

①simple

简单的 select 查询,查询中不包含子查询或者UNION。

②PRIMARY

查询中若包含任何复杂的子部分，最外层查询则被标记为Primary。

③DERIVED

在FROM列表中包含的子查询被标记为DERIVED(衍生)，MySQL会递归执行这些子查询, 把结果放在临时表里。

④SUBQUERY

在SELECT或WHERE列表中包含了子查询。

⑤DEPENDENT SUBQUERY

在SELECT或WHERE列表中包含了子查询,子查询基于外层。

⑥UNCACHEABLE SUBQUREY

无法被缓存的子查询。

⑦UNION

若第二个SELECT出现在UNION之后，则被标记为UNION；

若UNION包含在FROM子句的子查询中,外层SELECT将被标记为：DERIVED。

⑧UNION RESULT

从UNION表获取结果的SELECT。

#### (3)table

显示这一行的数据是关于哪张表的.

#### (4)type

![image.png](https://file.wulicode.com/yuque/202301/03/23/4011cCoSTyxq.png)

访问类型排列

type显示的是访问类型，是较为重要的一个指标，结果值从最好到最坏依次是：

system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range(尽量保证) > index > ALL

一般来说，得保证查询至少达到range级别，最好能达到ref。

system

表只有一行记录（等于系统表），这是const类型的特列，平时不会出现，这个也可以忽略不计。

const

表示通过索引一次就找到了,const用于比较primary key或者unique索引。因为只匹配一行数据，所以很快，如将主键置于where列表中，MySQL就能将该查询转换为一个常量。

eq_ref

唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4011l6iWAkCW.png)

ref

非唯一性索引扫描，返回匹配某个单独值的所有行…本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以他应该属于查找和扫描的混合体。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4011RMCIdO1L.png?x-oss-process=image/resize,h_334)

range

只检索给定范围的行,使用一个索引来选择行。key 列显示使用了哪个索引，一般就是在你的where语句中出现了between、<、>、in等的查询；

这种范围扫描索引扫描比全表扫描要好，因为它只需要开始于索引的某一点，而结束语另一点，不用扫描全部索引。

![image.png](https://file.wulicode.com/yuque/202301/03/23/45100yBSWzpe.png)

![image.png](https://file.wulicode.com/yuque/202301/03/23/4510cuBm3QqY.png)

index

Full Index Scan，index与ALL区别为index类型只遍历索引树。这通常比ALL快，因为索引文件通常比数据文件小。（也就是说虽然all和Index都是读全表，但index是从索引中读取的，而all是从硬盘中读的）

![image.png](https://file.wulicode.com/yuque/202301/03/23/4510TjuLMtJG.png)

alll

Full Table Scan，将遍历全表以找到匹配的行。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4511fOxLcZol.png)

![image.png](https://file.wulicode.com/yuque/202301/03/23/4511gfpJMqVm.png)

#### (5)possible_keys

显示可能应用在这张表中的索引，一个或多个。

查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询实际使用 。

#### (6)key

实际使用的索引。如果为NULL，则没有使用索引。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4511aJmviK88.png)

查询中若使用了覆盖索引，则该索引和查询的select字段重叠。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4511A2JhuT2H.png)

#### (7)key_len

表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度。

key_len字段显示的值为索引字段的最大可能长度，并非实际使用长度，能够帮你检查是否充分的利用上了索引。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4512hCCIxgqj.png)

如何计算

![image.png](https://file.wulicode.com/yuque/202301/03/23/4512hNRJdl7z.png)

总结一下：char(30) utf8 --> key_len = 30*3 +1 表示 utf8 格式需要 *3 (跟数据类型有关)

允许为 NULL +1 ，不允许 +0

动态类型 +2 (动态类型包括 : varchar , detail text() 截取字符窜)

![image.png](https://file.wulicode.com/yuque/202301/03/23/4512VtoXpAYM.png)

第一组：key_len=deptno(int)+null + ename(varchar(20)3+动态 =4+1+203+2= 67

第二组：key_len=deptno(int)+null=4+1=5

#### (8)ref

显示索引的哪一列被使用了，如果可能的话，是一个常数。哪些列或常量被用于查找索引列上的值。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4512VrXmkoQu.png)

#### (9)row

rows列显示MySQL认为它执行查询时必须检查的行数，越少越好。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4513RebdNWHr.png)

#### (10)Extra

包含不适合在其他列中显示但十分重要的额外信息。

Using filesort

说明mysql会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取。

MySQL中无法利用索引完成的排序操作称为“文件排序”。

出现filesort的情况：

![image.png](https://file.wulicode.com/yuque/202301/03/23/4513BTeu433a.png?x-oss-process=image/resize,h_152)

优化后，不再出现filesort的情况：

![image.png](https://file.wulicode.com/yuque/202301/03/23/4513Efd13yQJ.png?x-oss-process=image/resize,h_157)

Using temporary

使了用临时表保存中间结果,MySQL在对查询结果排序时使用临时表。常见于排序 order by 和分组查询 group by。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4514R6UyvkcY.png?x-oss-process=image/resize,h_330)

USING index

表示相应的select操作中使用了覆盖索引(Covering Index)，避免访问了表的数据行，效率不错！

如果同时出现using where，表明索引被用来执行索引键值的查找;

![image.png](https://file.wulicode.com/yuque/202301/03/23/4514VGom00qo.png?x-oss-process=image/resize,h_93)

如果没有同时出现using where，表明索引只是用来读取数据而非利用索引执行查找。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4514nkZjM1DC.png?x-oss-process=image/resize,h_92)

覆盖索引

理解1：就是select的数据列只用从索引中就能够取得，不必读取数据行，MySQL可以利用索引返回select列表中的字段，而不必根据索引再次读取数据文件，换句话说查询列要被所建的索引覆盖。

理解2：索引是高效找到行的一个方法，但是一般数据库也能使用索引找到一个列的数据，因此它不必读取整个行。毕竟索引叶子节点存储了它们索引的数据;当能通过读取索引就可以得到想要的数据，那就不需要读取行了。①一个索引
②包含了(或覆盖了)[select子句]与查询条件[Where子句]中 ③所有需要的字段就叫做覆盖索引。

注意：

如果要使用覆盖索引，一定要注意select列表中只取出需要的列，不可select *，

因为如果将所有字段一起做索引会导致索引文件过大，查询性能下降。

Using where

表明使用了where过滤。

using join buffer

使用了连接缓存。

impossible where

where子句的值总是false，不能用来获取任何元组。

![image.png](https://file.wulicode.com/yuque/202301/03/23/4515xP767XuW.png)

select tables optimized away

在没有GROUPBY子句的情况下，基于索引优化MIN/MAX操作或者对于MyISAM存储引擎优化COUNT(*)操作，不必等到执行阶段再进行计算，查询执行计划生成的阶段即完成优化。

distinct

优化distinct操作，在找到第一匹配的元组后即停止找同样值的动作。



