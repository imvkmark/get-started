---
description: '该内容展示了MongoDB Shell版本v4.2.2的基本操作，包括显示数据库列表（admin、config、local）并切换到local数据库。'
lastUpdated: '2026-06-20 11:40:00'
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
      content: 'https://www.wulicode.com//database/mongo/get-started.html'
---
# Mongo

小试牛刀

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