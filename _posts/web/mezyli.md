---
title: "元素 client*, offset*, scroll* 介绍"
date: 2022-05-31 19:38:38
toc: true
categories:
- ["前端","Html"]
---

## Client *
clientHeight : 元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距

clientWidth: 表示元素的内部宽度，以像素计。该属性包括内边距 padding，但不包括边框 border、外边距 margin 和垂直滚动条

![image.png](https://file.wulicode.com/yuque/202208/04/23/1022LVjNi2SY.png?x-oss-process=image/resize,h_247)




## Offset*
offsetWidth :  包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值

offsetHeight: 包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度

![image.png](https://file.wulicode.com/yuque/202208/04/23/1022e1KEPyi7.png?x-oss-process=image/resize,h_247)

## Scroll*
**scrollHeight : **一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容, 在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度

![image.png](https://file.wulicode.com/yuque/202208/04/23/1023gW4vYe5y.png?x-oss-process=image/resize,h_413)

## clientHeight, clientWidth, offSetHeight, offsetWidth, scrollHeight, scrollWidth, scrollTop, scrollLeft
![image.png](https://file.wulicode.com/yuque/202208/04/23/1024momX0rqM.png?x-oss-process=image/resize,h_625)

