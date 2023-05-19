---
title: "Web 常见问题"
date: 2022-04-20 19:01:12
toc: true
categories:
- ["前端","Web 开发"]
---

## Error: ResizeObserver loop limit exceeded 问题
> 发现一个报错 ResizeObserver loop limit exceeded，这个报错是在公司平台项目监听系统中提示的，而浏览器的 console 中却没有提示

![](https://file.wulicode.com/note/2021/10-22/11-57-04280.png#height=181&id=jRuS3&originHeight=248&originWidth=904&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=660)<br />![](https://file.wulicode.com/note/2021/10-22/11-57-30934.png#height=478&id=E8Ni9&originHeight=1090&originWidth=1846&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=810)<br />如果要在本地开发中调试定位这个问题，可以在项目代码里加入一个方法，在控制台中输出这个错误：

```
window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, error) {
    console.log('错误', errorMessage);
};
```
对于一些说法是这个错误可以给予忽略<br />![](https://file.wulicode.com/note/2021/10-22/11-57-49526.png#height=232&id=r98zU&originHeight=284&originWidth=731&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=597)<br />参考地址 : [https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded](https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded)

