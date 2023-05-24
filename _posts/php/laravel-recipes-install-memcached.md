---
title: "Laravel 曲谱 - 1.2 安装 - k) 安装 Memcached"
date: 2022-04-14 22:14:35
toc: true
categories:
- ["Php","Laravel","Laravel Recipes (Laravel 曲谱)"]
---

## 问题
> 你想使用缓存加速你的应用





## 解决方案
> 安装 Memcached

仅仅在控制台中两行就可以安装.
```
$ sudo apt-get install -y memcached php5-memcached
$ sudo service apache2 restart
```
第一行安装 apc 包, 第二行重启 Apache.

## 讨论
现在, 你可以使用 memcached 来配置你的缓存.

`Setting up the Memcached Cache Driver` 的说明.

