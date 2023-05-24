---
title: "Mysql 字段操作认知"
date: 2021-07-05 06:11:55
toc: true
categories:
- ["Mysql","运维"]
---

## 删除字段可以批量删除
> 删除字段, 重建所有字段数据, 覆盖当前的数据

所以删除字段可以批量删除, 减少数据库运维的时间

5.4G 的数据表删除一个字段的执行时间大概是 15 分钟

![image.png](https://file.wulicode.com/yuque/202208/04/15/0003hgy1rgPL.png?x-oss-process=image/resize,h_186)

![image.png](https://file.wulicode.com/yuque/202208/04/15/0003YPUJaMxz.png?x-oss-process=image/resize,h_191)

数据库负载在这段时候的变化

![image.png](https://file.wulicode.com/yuque/202208/04/15/0003ACeqvW9R.png?x-oss-process=image/resize,h_349)

