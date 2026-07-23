---
description: '该内容展示了MongoDB Shell版本v4.2.2的基本操作，包括显示数据库列表（admin、config、local）并切换到local数据库。'
lastUpdated: '2026-07-23 11:17:15'
head:
  - - meta
    - name: 'og:title'
      content: 'Mongo'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容展示了MongoDB Shell版本v4.2.2的基本操作，包括显示数据库列表（admin、config、local）并切换到local数据库。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/database/mongo/index.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/43cd9290fd2968d65b18d4892473d9cd.png'
---
# Mongo

![](https://file.wulicode.com/feishu-images/43cd9290fd2968d65b18d4892473d9cd.png)

```Plaintext
$ mongo
MongoDB shell version v4.2.2
```

```Plaintext
# 显示数据库
mongo > show dbs;
admin   0.000GB
config  0.000GB
local   0.000GB
# 使用数据库
mongo > use local
switched to db local
```