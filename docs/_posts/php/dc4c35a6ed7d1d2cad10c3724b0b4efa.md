---
title: "iwebshop 的form.js文件的使用"
date: 2022-04-14 22:12:58
toc: true
categories:
- ["Php","源码阅读","iwebshop"]
---

**引入**<br />      {js:form} <br />       ![](https://file.wulicode.com/yuque/202208/04/15/0014GckNZCVf.png?x-oss-process=image/resize,h_278)<br />**初始化**
> var form = new Form('test'); form.init({'email':'a@a.com','sex':'1','live':'a;b','code':'php'});
> ![](https://file.wulicode.com/yuque/202208/04/15/0015cpkv2w8z.png?x-oss-process=image/resize,h_99)

**其他方法**<br />      用getItems取得表单里所有数据的对象  <br />          用setValue(name,value)的方式只给一个设置对应的值<br />          通过getValue(name)得到对应项的值

