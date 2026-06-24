---
description: '把 useSSL 更改为 false , 如果不可以再改成 no 就可以正确连接Mysql 5.7这里的默认值是 0对于 8.0 这里的默认值是 0'
lastUpdated: '2025-12-06 11:22:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'DataGrip - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '把 useSSL 更改为 false , 如果不可以再改成 no 就可以正确连接Mysql 5.7这里的默认值是 0对于 8.0 这里的默认值是 0'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/mysql/ide/datagrip-faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/8c/8cf12e9ca853ceb63a3fec482ca62151.png?x-oss-process=image/resize,m_mfit,w_400'
---
# DataGrip - FAQ



## 1. DataGrip [08S01] Communications link failure, 连接数据库问题

> [08S01] Communications link failure

把  `useSSL`  更改为  `false`  , 如果不可以再改成  `no`  就可以正确连接

![](https://file.wulicode.com/notion/8c/8cf12e9ca853ceb63a3fec482ca62151.png)

## 2. 不同的版本数据库的默认 DDL 的猜想

> 这里是仅仅猜想两个不同版本数据库对于默认 ddl 的默认值, 不作为最后的确定知识点

Mysql 5.7

![](https://file.wulicode.com/notion/92/92cc5e8323d2291c89552964ba92a02b.png)

这里的默认值是  `0`

```sql
create table pam_ban
(
    ...
    ip_start     bigint unsigned default 0      not null comment '起始IP',
    ...
);
```

对于 8.0 这里的默认值是  `'0'`

![](https://file.wulicode.com/notion/c4/c4b0d578b2b6b91e49d2d31333c57bc6.png)

```sql
create table pam_ban
(
    ...
    ip_start     bigint unsigned default '0'    not null comment '起始IP',
    ...
)
```

