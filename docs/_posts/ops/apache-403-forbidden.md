---
title: "apache 读取图片显示 403 Forbidden"
date: 2021-06-26 11:19:46
toc: true
categories:
- ["Ops","软件","apache"]
---

### 错误说明

首先查看截图:<br />
![](https://file.wulicode.com/yuque/202211/06/10/2512jkHrgQA3.jpeg)

查看日志:

> [core:crit] [pid 24208] Permission denied: [client 58.56.92.131:37345] AH00529: /webdata/www/.../mail/.htaccess pcfg_openfile: unable to check htaccess file, ensure it is readable and that '/webdata/www/.../mail/' is executable


其实这里的日志已经说的很清楚了. 目录没有可执行权限, 也就是 apache 需要目录有可执行权限

