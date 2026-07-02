---
description: 'MySQL索引优化关注性能指标，常见瓶颈包括CPU、IO、锁及服务器硬件。Explain用于分析查询执行计划，输出列包含id、select_type、table、type、key、key_len、ref、rows和Extra等，帮助识别索引使用情况及优化方向。'
lastUpdated: '2026-07-02 18:44:09'
head:
  - - meta
    - name: 'og:title'
      content: 'MySQL 索引优化性能指标'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'MySQL索引优化关注性能指标，常见瓶颈包括CPU、IO、锁及服务器硬件。Explain用于分析查询执行计划，输出列包含id、select_type、table、type、key、key_len、ref、rows和Extra等，帮助识别索引使用情况及优化方向。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/database/mysql/extend-reading/optimize-explain.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/54ac0cc118a03883e45462564cade515.png'
---
# MySQL 索引优化性能指标

💡 数据库优化的主要目的是为了优化性能, 各种不同指标的顺序决定了性能的高低, 所以需要学习性能指标顺序

## MySQL常见瓶颈

### 1. CPU

CPU在饱和的时候一般发生在数据装入内存或从磁盘上读取数据时候。SQL中对大量数据进行比较、关联、排序、分组。最大的压力在于比较。

### 2. IO

磁盘I/O瓶颈放生在装入数据远大于内存容量的时候。实例内存满足不了缓存数据或排序等需要，导致产生大量物理 IO。查询执行效率低，扫描过多数据行。

### 3. 锁

不适宜的锁的设置，导致线程阻塞，性能下降。死锁，线程之间交叉调用资源，导致死锁，程序卡住。

### 4. 服务器硬件

top，free，iostat 和 vmstat 来查看系统的状态。

## Explain

### 1.Explain 简介

使用EXPLAIN关键字可以模拟优化器执行SQL查询语句，从而知道MySQL是如何处理你的SQL语句的。分析你的查询语句或是表结构的性能瓶颈。

### 2.Explain 用途

1. 表的读取顺序通过id查阅；
2. 哪些索引可以使用
3. 数据读取操作的操作类型
4. 哪些索引被实际使用
5. 表之间的引用
6. 每张表有多少行被优化器查询

## Explain 输出列说明

Explain + SQL语句

![](https://file.wulicode.com/feishu-images/54ac0cc118a03883e45462564cade515.png)

| 列名 | 说明 |
|-|-|
| id | 执行编号，标识select所属的行。如果在语句中没子查询或关联查询，只有唯一的select，每行都将显示1。否则，内层的select语句一般会顺序编号，对应于其在原始语句中的位置 |
| select_type | 显示本行是简单或复杂select。如果查询有任何复杂的子查询，则最外层标记为PRIMARY（DERIVED、UNION、UNION RESUlT） |
| table | 访问引用哪个表（引用某个查询，如“derived3”） |
| type | 数据访问/读取操作类型（ALL、index、range、ref、eq_ref、const/system、NULL） |
| possible_keys | 揭示哪一些索引可能有利于高效的查找 |
| key | 显示mysql决定采用哪个索引来优化查询 |
| key_len | 显示mysql在索引里使用的字节数 |
| ref | 显示了之前的表在key列记录的索引中查找值所用的列或常量 |
| rows | 为了找到所需的行而需要读取的行数，估算值，不精确。通过把所有rows列值相乘，可粗略估算整个查询会检查的行数 |
| Extra | 额外信息，如 using index、filesort 等 |

### (1) id

select查询的序列号,包含一组数字，表示查询中执行select子句或操作表的顺序。

三种情况

1. id相同，执行顺序由上至下。

此例中 先执行where 后的第一条语句 t1.id = t2.id 通过 t1.id 关联 t2.id 。 而 t2.id 的结果建立在 t2.id=t3.id 的基础之上。

![](https://file.wulicode.com/feishu-images/915831c804e0fce96c207c8343b5f796.png)

1. id不同，如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行。

![](https://file.wulicode.com/feishu-images/7ba09d782ab6e41abdf6ae2cd09f311f.png)

1. id相同不同，同时存在id如果相同，可以认为是一组，从上往下顺序执行；在所有组中，id值越大，优先级越高，越先执行

衍生表 = derived2 –> derived + 2 （2 表示由 id =2 的查询衍生出来的表。type 肯定是 all ，因为衍生的表没有建立索引）

![](https://file.wulicode.com/feishu-images/beb9ed533620a60b93ac9b487c7d798d.png)

该值可能为 null, 如果这一行用来说明是其他行的联合结果

### (2) select_type

表示查询的类型, 有的地方解释为 sql 级别

![](https://file.wulicode.com/feishu-images/ea2f64ff399e036af8ea70b455424a06.png)

| 类型 | 说明 |
|-|-|
| simple | 简单子查询，不包含子查询和 union |
| primary | 包含 union 或者子查询，最外层的部分标记为 primary [或包含任何复杂的子部分] |
| subquery | 一般子查询中的子查询被标记为 subquery，也就是位于select列表中的查询 |
| derived | 派生表——该临时表是从子查询派生出来的，位于form中的子查询 |
| union | 位于union中第二个及其以后的子查询被标记为union，第一个就被标记为primary如果是union位于from中则标记为derived |
| union result | 用来从匿名临时表里检索结果的select被标记为union result |
| dependent union | 顾名思义，首先需要满足UNION的条件，及UNION中第二个以及后面的SELECT语句，同时该语句依赖外部的查询 |
| subquery | 子查询中第一个SELECT语句 |
| dependent subquery | 和DEPENDENT UNION相对UNION一样 |

① `SIMPLE` 简单的 select 查询,查询中不包含子查询或者UNION。

② `PRIMARY` 查询中若包含任何复杂的子部分，最外层查询则被标记为Primary。

③ `DERIVED` 在 FROM 列表中包含的子查询被标记为 DERIVED (衍生)，MySQL会递归执行这些子查询, 把结果放在临时表里。

④ `SUBQUERY` 在SELECT或WHERE列表中包含了子查询。

⑤ `DEPENDENT SUBQUERY` 在SELECT或WHERE列表中包含了子查询,子查询基于外层。

⑥ `UNCACHEABLE SUBQUREY` 无法被缓存的子查询。

⑦ `UNION` 若第二个SELECT出现在UNION之后，则被标记为UNION；若UNION包含在FROM子句的子查询中,外层SELECT将被标记为：DERIVED。

⑧ `UNION RESULT` 从 UNION 表获取结果的SELECT。

### (3) table

显示这一行的数据是关于哪张表的名称或者别名

- 关联优化器会为查询选择关联顺序，左侧深度优先
- 当from中有子查询的时候，表名是derivedN的形式，N指向子查询，也就是explain结果中的下一列
- 当有union result的时候，表名是union 1,2等的形式，1,2表示参与union的query id

注意：MySQL对待这些表和普通表一样，但是这些“临时表”是没有任何索引的。

### (4) type

![](https://file.wulicode.com/feishu-images/4270e899dbfea8aef1024d3474c37a19.png)

访问类型排列 type 显示的是访问类型/查询类别 ，是较为重要的一个指标，结果值从最好到最坏依次是：

`system` > `const` > `eq_ref` > `ref` (优秀指标)> `fulltext` > `ref_or_null` > `index_merge` > `unique_subquery` > `index_subquery` > `range` (尽量保证) > `index` > `ALL`

一般来说，得保证查询至少达到range级别，最好能达到ref

`system`

表只有一行记录（等于系统表），这是const类型的特列，平时不会出现，这个也可以忽略不计。

`const`

表示通过索引一次就找到了,const 用于比较 primary key 或者 unique 索引。因为只匹配一行数据，所以很快，如将主键置于where列表中，MySQL就能将该查询转换为一个常量

`eq_ref`

唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描。

![](https://file.wulicode.com/feishu-images/d1becaf36c42f094cf518f42498d683f.png)

`ref`

非唯一性索引扫描，返回匹配某个单独值的所有行…本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以他应该属于查找和扫描的混合体

![](https://file.wulicode.com/feishu-images/78122bdd5272ae1258ca3ede5b071529.png)

`range`

只检索给定范围的行,使用一个索引来选择行。key 列显示使用了哪个索引，一般就是在你的where语句中出现了between、<、>、in等的查询；

这种范围扫描索引扫描比全表扫描要好，因为它只需要开始于索引的某一点，而结束语另一点，不用扫描全部索引。

![](https://file.wulicode.com/feishu-images/ec6359bc956b01e60a6d4e7c7f73b9f7.png)

![](https://file.wulicode.com/feishu-images/603daa9e59eafcefb80f2235fd948ab5.png)

`index`

Full Index Scan，index 与 ALL 区别为 index 类型只遍历索引树。这通常比ALL快，因为索引文件通常比数据文件小。（也就是说虽然all和Index都是读全表，但index是从索引中读取的，而all是从硬盘中读的）

![](https://file.wulicode.com/feishu-images/96b6ae35721b0af12e51f2124094a4ad.png)

`all`

Full Table Scan，将遍历全表以找到匹配的行。

![](https://file.wulicode.com/feishu-images/2238c6bbaa5f8a4dec1c54afbff52d8a.png)

![](https://file.wulicode.com/feishu-images/edd794e01521e00ef4a6c5e5d76ee832.png)

### (5) possible_keys

显示可能应用在这张表中的索引，一个或多个。查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询实际使用, 列出来的索引对于后续优化过程可能是没有用的

### (6) key

实际使用的索引。如果为NULL，则没有使用索引, 要想强制 MySQL 使用或忽视 possible_keys 列中的索引，在查询中使用 `FORCE INDEX`、`USE INDEX`或者`IGNORE INDEX`

![](https://file.wulicode.com/feishu-images/96b6ae35721b0af12e51f2124094a4ad.png)

查询中若使用了覆盖索引，则该索引和查询的select字段重叠。

![](https://file.wulicode.com/feishu-images/524af1ccd59745beb1681041ac7e7a44.png)

### (7) key_len

表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度

key_len 字段显示的值为索引字段的最大可能长度，并非实际使用长度，能够帮你检查是否充分的利用上了索引, 在不损失精确性的情况下, 长度越短越好

![](https://file.wulicode.com/feishu-images/70a2621de08fe8c30574cb0758ee3f52.png)

如何计算

![](https://file.wulicode.com/feishu-images/359ab24f3a1597e127b712aab1c601e9.png)

总结一下：char(30) utf8 –> key_len = 30

*3 +1 表示 utf8 格式需要*

3 (跟数据类型有关)

允许为 NULL +1 ，不允许 +0

动态类型 +2 (动态类型包括 : varchar , detail text() 截取字符窜)

![](https://file.wulicode.com/feishu-images/a67a0641ad6a9406a405a07ed7e7e5d4.png)

第一组：key_len=deptno(int)+null + ename(varchar(20)3+动态 =4+1+203+2= 67

第二组：key_len=deptno(int)+null=4+1=5

### (8) ref

显示索引的哪一列被使用了，如果可能的话，是一个常数。哪些列或常量被用于查找索引列上的值。

![](https://file.wulicode.com/feishu-images/e60f8ebd6e7c1b63b62592d2f615db02.png)

### (9) rows

rows列显示MySQL认为它执行查询时必须检查的行数，越少越好, 这是一个预估值, 并非很准确

![](https://file.wulicode.com/feishu-images/014726832db67743e459296a7078f905.png)

### (10) Extra

包含不适合在其他列中显示但十分重要的额外信息, 该列显示 MySQL 在查询过程中的一些详细信息, MySQL 查询优化器执行查询的过程中对查询计划的重要补充信息.

`Using filesort`

说明 mysql 会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取, 可能是 cpu 密集型的工作 ,也可能在内存中进行的, 所以 MySQL中无法利用索引完成的排序操作称为 “文件排序”

出现filesort的情况：

![](https://file.wulicode.com/feishu-images/6a0bcc8590c25f87924d127b90c1cd05.png)

优化后，不再出现filesort的情况：

![](https://file.wulicode.com/feishu-images/ba024826e51a4062afcab4eba8283279.png)

`Using temporary`

使了用临时表保存中间结果,MySQL在对查询结果排序时使用临时表。常见于排序 order by 和分组查询 group by, 一般看到这个值就说明需要优化了, 如果避免不了临时表也尽量避免硬盘临时表的使用.

![](https://file.wulicode.com/feishu-images/c4bd51f742d19850e1b105b501583786.png)

`USING index`

表示相应的 select 操作中使用了覆盖索引(Covering Index)，避免访问了表的数据行，效率不错！

如果同时出现 using where，表明索引被用来执行索引键值的查找;

![](https://file.wulicode.com/feishu-images/6f9143240120b3938ab887412befb94b.png)

如果没有同时出现 using where，表明索引只是用来读取数据而非利用索引执行查找。

![](https://file.wulicode.com/feishu-images/3756530c027960dacf6d48d01f8d186d.png)

**覆盖索引**

理解1：就是select的数据列只用从索引中就能够取得，不必读取数据行，MySQL可以利用索引返回select 列表中的字段，而不必根据索引再次读取数据文件，换句话说查询列要被所建的索引覆盖。

理解2：索引是高效找到行的一个方法，但是一般数据库也能使用索引找到一个列的数据，因此它不必读取整个行。毕竟索引叶子节点存储了它们索引的数据;当能通过读取索引就可以得到想要的数据，那就不需要读取行了。①一个索引 ② 包含了(或覆盖了)[select子句]与查询条件[Where子句]中 ③ 所有需要的字段就叫做覆盖索引

注意：如果要使用覆盖索引，一定要注意select列表中只取出需要的列，不可select \*，因为如果将所有字段一起做索引会导致索引文件过大，查询性能下降。

`Using where`

表明使用了使用了 WHERE 从句来限制哪些行将与下一张表匹配或者是返回给用户。注意：Extra列出现 Using where 表示MySQL服务器将存储引擎返回服务层以后再应用 WHERE 条件过滤

`using join buffer`

使用了连接缓存

Block Nested Loop，连接算法是块嵌套循环连接;

Batched Key Access，连接算法是批量索引连接

`impossible where`

where子句的值总是false，不能用来获取任何元组。

![](https://file.wulicode.com/feishu-images/a8cd21f036adf834823faf49a8dfb76b.png)

`select tables optimized away`

在没有GROUPBY子句的情况下，基于索引优化MIN/MAX操作或者对于MyISAM存储引擎优化COUNT(\*)操作，不必等到执行阶段再进行计算，查询执行计划生成的阶段即完成优化。

`distinct`

优化 distinct 操作，在找到第一匹配的元组后即停止找同样值的动作

`Not exists`

MYSQL 优化了 LEFT JOIN，一旦它找到了匹配 LEFT JOIN 标准的行， 就不再搜索了