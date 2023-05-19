---
title: "mysql 数据去重"
date: 2021-06-26 10:37:14
toc: true
categories:
- ["Mysql"]
---

## 适用于重复比例较小的情况

总数据量:134W

1. 创建临时表


```
create table dupeddata as(
    Select * from content group by tit having count(id) > 1
)
```

2. 删除表中的重复数据

```
Delete from content Where tit in ( select tit from dupeddata );
```

3. 插入临时表中的数据到原数据表

```
Insert into content (Select * from dupeddata);
```

4、删除临时表

```
Drop table dupeddata;
```


## 适用于重复比例较大的情况

1、创建临时表来存储有duplicate rows的记录

```
Create table dupeddata_dis as(Select distinct tit, content from content );
```

2、删除原表中的duplicate rows的记录

```
Delete from table;
```

3、把临时表中的记录插入到原表中。

```
Insert into table Select * from dupeddata;
```

4、删除临时表

```
Drop table dupeddata;
```

