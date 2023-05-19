---
title: "模版语法 [ base_component_ui ]"
date: 2022-04-14 22:33:08
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

pager

---

- current
- total
- link
- token

<{pager current=1 total=30 link='index.php/shopadmin/#app=ecbook&ctl=admin_dbeav&act=index' }>



img

---

说明: 图片显示调用<br /><{img src="bundle/handle-show.gif" alt=$___b2c="收起子分类"|t:'b2c' title=$___b2c="展开子分类"|t:'b2c' class="handle-show" app='desktop'}>

