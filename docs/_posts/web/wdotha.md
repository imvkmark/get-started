---
title: "[转] 图解scrollHeight, clientHeight, offsetHeight, scrollTop以及获取方法"
date: 2021-06-14 15:06:00
toc: true
categories:
- ["前端","其他"]
---

原文地址 : [图解scrollHeight, clientHeight, offsetHeight, scrollTop以及获取方法](https://www.jianshu.com/p/d267456ebc0d)

**引用的图片**

![](https://file.wulicode.com/yuque/202208/04/23/3122yLqVFBCa.jpeg?x-oss-process=image/resize,h_262)

![](https://file.wulicode.com/yuque/202208/04/23/3122qPCsg7FK.jpeg?x-oss-process=image/resize,h_262)



## 高度定义以及获取

<a name="scrollHeight"></a>
### scrollHeight

所有的内容（指图一图中有文字的红色框框内）和内边距，这个 **内容** 包括肉眼看不见、溢出、被窗口遮挡的部分；

<a name="clientHeight"></a>
### clientHeight

1. 图二中视野内可见的内容和内边距，不包括x轴的滚动条高度、边框、外边距；
2. 同一种型号的手机上是不变的，比如iPhone 6上就是667px；

<a name="offsetHeight"></a>
### offsetHeight

图二中，在`clientHeight`的基础上， 加上边框和滚动条的高度；


### scrollTop

见图三，滚动条滚动了多少距离（包括之前已滚动过的隐藏内容）就是`scrollTop`；


## 获取方法

在《JavaScript高级程序设计(第3版)》第198页，`document.body`是为了兼容IE浏览器，但在我实践过程中，发现chrome也需要`document.body`来获取这些数据，而不是`document.ducumentElement`。需要特意说明的是：这里的chrome是在device情况下，而且我的项目是运行在微信端。

为了兼容浏览器，用以下方法（举例）：

```
const scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); 
const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
```

**原因**：<br />用`Math.max()`方法是因为获取方法不兼容时，`scrollTop`始终为0，其他属性同理；

