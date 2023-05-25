---
title : "Web 常见问题"
date : 2022-04-20 19:01:12
toc : true
categories :
  - [ "前端","Web 开发" ]
---

## Error: ResizeObserver loop limit exceeded 问题

> 发现一个报错 ResizeObserver loop limit exceeded，这个报错是在公司平台项目监听系统中提示的，而浏览器的 console 中却没有提示

![](https://file.wulicode.com/note/2021/10-22/11-57-04280.png)

![](https://file.wulicode.com/note/2021/10-22/11-57-30934.png)

如果要在本地开发中调试定位这个问题，可以在项目代码里加入一个方法，在控制台中输出这个错误：

```
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, error) {
    console.log('错误', errorMessage);
};
```

对于一些说法是这个错误可以给予忽略

![](https://file.wulicode.com/note/2021/10-22/11-57-49526.png)

参考地址 : [https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded](https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded)

