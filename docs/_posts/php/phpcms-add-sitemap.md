---
title: "phpcms 添加 sitemap功能"
date: 2022-04-14 22:15:07
toc: true
categories:
- ["Php","源码阅读","phpcms"]
---

**添加菜单**

```
INSERT INTO `mk_menu` 
(`id`, `name`, `parentid`, `m`, `c`, `a`, `data`, `listorder`, `display`, `project1`, `project2`, `project3`, `project4`, `project5`) 
    VALUES ('null', '更新Sitemap', '873', 'admin', 'sitemap', 'init', '', '0', '1', '1', '1', '1', '1', '1');
```
**添加文件到相应的目录**
```
复制文件
/phpcms/modules/admin/sitemap.php
/phpcms/templates/default/sitemap.html
```

