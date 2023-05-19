---
title: "DataGrip - FAQ"
date: 2022-04-21 23:10:55
toc: true
categories:
- ["Mysql","IDE"]
---

## 1. DataGrip [08S01] Communications link failure, 连接数据库问题
> [08S01]
> 	Communications link failure
> 
> 	The last packet successfully received from the server was 193 milliseconds ago.  The last packet sent successfully to the server was 172 milliseconds ago.
> No appropriate protocol (protocol is disabled or cipher suites are inappropriate).

把 `useSSL`改成 `false`，如果不可以，在改成 `no`，就可以正确连接， 我的是改成 `no`就可以<br />![image.png](https://file.wulicode.com/yuque/202208/04/14/4906BkZdtwbr.png?x-oss-process=image/resize,h_587)


## 2. 不同的版本数据库的默认 DDL 的猜想
> 这里是仅仅猜想两个不同版本数据库对于默认  ddl 的默认值, 不作为最后的确定知识点

Mysql 5.7<br />![image.png](https://file.wulicode.com/yuque/202210/02/17/2511llnIJ38w.png?x-oss-process=image/resize,h_274)<br />这里的默认值是 `0`
```sql
create table pam_ban
(
    ...
    ip_start     bigint unsigned default 0      not null comment '起始IP',
    ...
);
```
对于 8.0 这里的默认值是 `'0'`<br />![image.png](https://file.wulicode.com/yuque/202210/02/17/2511IhtICtOy.png?x-oss-process=image/resize,h_275)
```sql
create table pam_ban
(
    ...
    ip_start     bigint unsigned default '0'    not null comment '起始IP',
    ...
)
```

