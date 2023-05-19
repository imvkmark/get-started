---
title: "Apache alias 实现目录别名访问 和目录索引"
date: 2022-04-14 22:08:40
toc: true
categories:
- ["Ops","软件","apache"]
---

**目录别名访问**

Alias /phpmyadmin "d:/wamp/apps/phpmyadmin3.3.9/"  


```
# to give access to phpmyadmin from outside  
# replace the lines
#
#         Order Deny,Allow 
# Deny from all
# Allow from 127.0.0.1
#
# by
#
#         Order Allow,Deny   
#    Allow from all

<Directory "d:/wamp/apps/phpmyadmin3.3.9/">
  Options Indexes FollowSymLinks MultiViews
  AllowOverride all
  Order Deny,Allow
  Deny from all
  Allow from 127.0.0.1
</Directory>
```



**如何开启Apache的目录索引功能**

模块加载
```
LoadModule dir_module modules/mod_dir.so
LoadModule autoindex_module modules/mod_autoindex.so
```
配置alias和目录权限

Alias /photo e:/photo
```
<Directory "e:/photo">
  AllowOverride None
  Options Indexes FollowSymLinks MultiViews
  indexOptions FancyIndexing ScanHTMLTitles NameWidth=128 DescriptionWidth=256 HTMLTable VersionSort FoldersFirst
  Order allow,deny  
  Allow from all  
</Directory>
```

