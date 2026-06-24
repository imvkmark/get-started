---
description: 'PHP7.4后WeakRef成为内置弱引用类，允许无打扰访问短暂对象，不阻止GC回收。对象消失后弱引用仍存在但可用。另需启用pecl inclued.enabled配置项（默认关闭）方可生效。'
lastUpdated: '2026-06-17 18:49:19'
head:
  - - meta
    - name: 'og:title'
      content: 'WeakRef 弱引用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHP7.4后WeakRef成为内置弱引用类，允许无打扰访问短暂对象，不阻止GC回收。对象消失后弱引用仍存在但可用。另需启用pecl inclued.enabled配置项（默认关闭）方可生效。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/basic/weakref.html'
---
# WeakRef 弱引用

在 php 7.4 之后变成了Php 内置的引用类

## 介绍

弱引用, 提供了一个对于短暂存在的对象的一个无打扰的访问方法, 不像是强引用, 若引用不会拒绝 gc 对它的清理, 所以 一个对象已经不存在了,但是这个若引用对象还是存在的, 这样看来若引用是可用的.同样提供了一个方法将若引用转化为强引用

## 安装

pecl

## 配置

inclued.enabled int  
Off PHP_INI_SYSTEM 是否开启本扩展, 由于默认的关闭,必须开启之后才起作用