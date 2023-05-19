---
title: "PHP - FAQ"
date: 2022-04-20 19:01:00
toc: true
categories:
- ["Php","语言参考"]
---

## 1. composer 下载的时候报错 Protocol "https" not supported or disabled in libcurl
查看下是否 php 版本支持 ssl, 如果不支持考虑重新安装并打开 ssl<br />![](https://file.wulicode.com/note/2021/10-23/11-24-47607.png#id=lQJyC&originHeight=1084&originWidth=1064&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)


## 2. Malformed UTF-8 characters, possibly incorrectly encoded
一般都是截取 utf-8 数据的时候出现的错误, 把中文截取为无法识别的内容

## 7.2 升级为 7.4 问题

### EscapeShellArg 解码问题
在 php-fpm @ 7.4 版本中@ centos 系统, mac 系统无此问题
```php
<?php
// 返回值为空
echo escapeshellarg('中文');
// string(2) "''"
```
解决方案
```php
<?php
// 此行需要加入到文档前
setlocale(LC_CTYPE, "UTF8", "en_US.UTF-8");
```

