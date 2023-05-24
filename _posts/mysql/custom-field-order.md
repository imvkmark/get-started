---
title: "mysql 自定义排序（field，INSTR，locate）的一点心得，希望对大家有所帮助"
date: 2022-04-14 22:13:11
toc: true
categories:
- ["Mysql","FAQ"]
---

原文地址 : [MYSQL自定义排序_mb5fdcad8719a20的技术博客_51CTO博客](https://blog.51cto.com/u_15061934/3869453)

下面是本人关于mysql 自定义排序（field，INSTR，locate）的一点心得，希望对大家有所帮助

首先说明这里有三个函数（`order by field`，`ORDER BY INSTR`，`ORDER BY locate`）

原表：



```
id user pass
 1 aaa aaa
 2 bbb bbb
 3 ccc ccc
 4 ddd ddd
 5 eee eee
 6 fff fff
```
下面是我执行后的结果：
```
mysql> SELECT * FROM `user` order by field(2,3,5,4,id) asc
id user pass
 1 aaa aaa
 3 ccc ccc
 4 ddd ddd
 5 eee eee
 6 fff fff
 2 bbb bbb
```
根据结果分析：order by field(2,3,5,4,1,6) 结果显示顺序为：1 3 4 5 6 2
```
mysql> SELECT * FROM `user` order by field(2,3,5,4,id) desc
id user pass
 2 bbb bbb
 1 aaa aaa
 3 ccc ccc
 4 ddd ddd
 5 eee eee
 6 fff fff
```
根据结果分析：order by field(2,3,5,4,1,6) 结果显示顺序为：2 1 3 4 5 6
```
mysql> SELECT * FROM `user` ORDER BY INSTR( '2,3,5,4', id ) ASC 
id user pass
 1 aaa aaa
 6 fff fff
 2 bbb bbb
 3 ccc ccc
 5 eee eee
 4 ddd ddd
```
根据结果分析：order by INSTR(2,3,5,4,1,6) 结果显示顺序为：1 6 2 3 5 4
```
mysql> SELECT * FROM `user` ORDER BY INSTR( '2,3,5,4', id ) DESC
id user pass
 4 ddd ddd
 5 eee eee
 3 ccc ccc
 2 bbb bbb
 1 aaa aaa
 6 fff fff
```
根据结果分析：order by INSTR(2,3,5,4,1,6) 结果显示顺序为：4 5 3 2 1 6

```
mysql> SELECT * FROM `user` ORDER BY locate( id, '2,3,5,4' ) ASC 
id user pass
 1 aaa aaa
 6 fff fff
 2 bbb bbb
 3 ccc ccc
 5 eee eee
 4 ddd ddd
```
根据结果分析：order by locate(2,3,5,4,1,6) 结果显示顺序为：1 6 2 3 5 4

```
mysql> SELECT * FROM `user` ORDER BY locate( id, '2,3,5,4' ) DESC 
id user pass
4 ddd ddd
5 eee eee
3 ccc ccc
2 bbb bbb
1 aaa aaa
6 fff fff
```
根据结果分析：order by locate(2,3,5,4,1,6) 结果显示顺序为：4 5 3 2 1 6

如我想要查找的数据库中的ID顺序首先是（2,3,5,4）然后在是其它的ID顺序，你首先要把他降序排即（4 5 3 2），然后在 SELECT * FROM `user` ORDER BY INSTR( '4,5,3,2', id ) DESC limit 0,10 或用 SELECT * FROM `user` ORDER BY locate( id, '4,5,3,2' ) DESC 就得到你想要的结果了。
```
mysql>  SELECT * FROM `user` ORDER BY locate( id, '4,5,3,2' ) DESC
id user pass
 2 bbb bbb
 3 ccc ccc
 5 eee eee
 4 ddd ddd
 1 aaa aaa
 6 fff fff
```

