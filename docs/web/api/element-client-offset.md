# 「转」 图解scrollHeight, clientHeight, offsetHeight, scrollTop 以及获取方法

原文地址 : ~~[图解scrollHeight, clientHeight, offsetHeight, scrollTop以及获取方法](https://www.jianshu.com/p/d267456ebc0d)~~

**引用的图片**

![](https://file.wulicode.com/yuque/202208/04/23/3122yLqVFBCa.jpeg?x-oss-process=image/resize,h_262)

![](https://file.wulicode.com/yuque/202208/04/23/3122qPCsg7FK.jpeg?x-oss-process=image/resize,h_262)

## 高度定义以及获取

### scrollHeight

所有的内容（指图一图中有文字的红色框框内）和内边距，这个 **内容** 包括肉眼看不见、溢出、被窗口遮挡的部分；

### clientHeight

1. 图二中视野内可见的内容和内边距，不包括x轴的滚动条高度、边框、外边距；
2. 同一种型号的手机上是不变的，比如iPhone 6上就是667px；

<a name="offsetHeight"></a>

### offsetHeight

图二中，在`clientHeight`的基础上， 加上边框和滚动条的高度；

### scrollTop

见图三，滚动条滚动了多少距离（包括之前已滚动过的隐藏内容）就是`scrollTop`；

## 获取方法

在《JavaScript高级程序设计(第3版)》第198页，`document.body`是为了兼容IE浏览器，但在我实践过程中，发现chrome也需要`document.body`
来获取这些数据，而不是`document.ducumentElement`。需要特意说明的是：这里的chrome是在device情况下，而且我的项目是运行在微信端。

为了兼容浏览器，用以下方法（举例）：

```
const scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); 
const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
```

**原因**：

用`Math.max()`方法是因为获取方法不兼容时，`scrollTop`始终为0，其他属性同理；

## 补充说明

### Client*

clientHeight : 元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距

clientWidth: 表示元素的内部宽度，以像素计。该属性包括内边距 padding，但不包括边框 border、外边距 margin 和垂直滚动条

![image.png](https://file.wulicode.com/yuque/202208/04/23/1022LVjNi2SY.png?x-oss-process=image/resize,h_247)

### Offset*

offsetWidth :  包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值

offsetHeight: 包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度

![image.png](https://file.wulicode.com/yuque/202208/04/23/1022e1KEPyi7.png?x-oss-process=image/resize,h_247)

### Scroll*

**scrollHeight : **一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容, 在不使用滚动条的情况下为了适应视口中所用内容所需的最小高度

![image.png](https://file.wulicode.com/yuque/202208/04/23/1023gW4vYe5y.png?x-oss-process=image/resize,h_413)

### clientHeight, clientWidth, offSetHeight, offsetWidth, scrollHeight, scrollWidth, scrollTop, scrollLeft

![image.png](https://file.wulicode.com/yuque/202208/04/23/1024momX0rqM.png?x-oss-process=image/resize,h_625)

