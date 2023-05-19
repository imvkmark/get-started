---
title: "phpcms2008搜索不能重新生成缓存问题"
date: 2022-04-14 22:13:18
toc: true
categories:
- ["Php","源码阅读","phpcms2008"]
---

**phpcms搜索不能重新生成缓存问题**<br />第一步：删除已经生成缓存文件  <br />路径：/search/data/news  <br />提示：在/search/data/下有许多文件夹的情况，将其全部删除。<br />第二步：清空phpcms_search数据表  <br />执行SQL语句：truncate phpcms_search;  <br />第三步：更新searchid为0  <br />执行SQL语句：update phpcms_content set searchid='0';<br />最后一步：更新URL<br />后台内容管理=》生成HTML=》更新URL

