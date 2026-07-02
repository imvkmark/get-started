---
description: 'DataGrip 的常见问题包括连接数据库时出现 [08S01] Communications link failure 错误，以及针对不同版本数据库的默认 DDL 设置差异的讨论与猜想。'
lastUpdated: '2026-07-02 12:58:47'
head:
  - - meta
    - name: 'og:title'
      content: 'DataGrip - 插件和FAQ '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'DataGrip 的常见问题包括连接数据库时出现 [08S01] Communications link failure 错误，以及针对不同版本数据库的默认 DDL 设置差异的讨论与猜想。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/database/primer/datagrip-faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/dcf9ff1c96fdb40aafbb7b165368d4ad.png'
---
# DataGrip - 插件和FAQ

## FAQ

### 1. DataGrip [08S01] Communications link failure, 连接数据库问题

> [08S01] Communications link failure

> The last packet successfully received from the server was 193 milliseconds ago. The last packet sent successfully to the server was 172 milliseconds ago. No appropriate protocol (protocol is disabled or cipher suites are inappropriate).

把 `useSSL` 更改为 `false` , 如果不可以再改成 `no` 就可以正确连接

![](https://file.wulicode.com/feishu-images/dcf9ff1c96fdb40aafbb7b165368d4ad.png)

### 2. 不同的版本数据库的默认 DDL 的猜想

> 这里是仅仅猜想两个不同版本数据库对于默认 ddl 的默认值, 不作为最后的确定知识点

Mysql 5.7

![](https://file.wulicode.com/feishu-images/d32b6f562273dbcde7cb60af83122f23.png)

这里的默认值是 `0`

```SQL
create table pam_ban
(
    ...
    ip_start     bigint unsigned default 0      not null comment '起始IP',
    ...
);
```

对于 8.0 这里的默认值是 `'0'`

![](https://file.wulicode.com/feishu-images/afb25c31f5d2ced15f8f7662996b2b16.png)

```SQL
create table pam_ban
(
    ...
    ip_start     bigint unsigned default '0'    not null comment '起始IP',
    ...
)
```