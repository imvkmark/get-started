---
title: "MySQL 5.5版本下my.ini内[mysqld]项中不能再写default-character-set=utf8"
date: 2022-04-14 22:11:59
toc: true
categories:
- ["Mysql","FAQ"]
---

  <br />原来在5.1版本时，为了解决中文乱码问题设置默认字符集为utf8时，在my.ini内的 [mysql] 和 [mysqld] 项中都是写：

```
default-character-set=utf8    
```
 到了5.5版本， [mysql] 项内可以这么写， [mysqld] 项内不能再这么写了，而是必须写：
```
character-set-server=utf8
```
否则在启动MySQL服务时会有1067错误。<br />  <br />目前已知5.1和5.5有这么一个不同之处，且是从5.5的安装版本自动生成的my.ini文件中看出的。配置免安装的5.5版本还需要进一步的实验。

