---
title: "H5 中使用浏览器唤醒 app"
date: 2021-06-26 10:41:45
toc: true
categories:
- ["前端","React"]
---

![](https://file.wulicode.com/yuque/202208/04/15/3553pchBjbow.jpeg)

首次唤醒使用 iframe 方式, 这种方式的好处是不要求用户必须跳转链接, 还可以在当前页面使用

再次唤醒使用强制跳转方式, 如果未跳转则进入引导下载页面

以下代码为 react 实现方式, 仅作流程参考




```javascript
let url = {
    guide: 'http://www.1dailian.com/app/app.html',
    android : 'ydl://home?id=' + ( new Date() ).toLocaleTimeString(),
    ios : 'https://apps.apple.com/cn/app/%E6%98%93%E7%8E%A9%E7%94%B5%E7%AB%9E/id1476031432'
};
let iframe;
let hasElement;

// 存在
if (document.getElementById("open-ydl")) {
    hasElement = true;
} else {
    iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'open-ydl');
    iframe.style.display = 'none';
    hasElement = false;
}

if (isAndroid()) {
    let that = this;
    iframe.src = url.android;
    if (hasElement) {
        // 尝试唤醒[二次]
        window.location.href = url.android;
        setTimeout(function() {
            // 跳转引导
            window.location.href = url.guide;
        }, 2000);
    } else {
        // 尝试唤醒[首次]
        document.body.appendChild(iframe);
        setTimeout(() => {
            // 显示浮窗
            that.setState({
                callAppVisible : true
            })
    }, 2000);
}
if (isIOS()) {
    // 可选协议方式或者浏览器跳转 store url 方式
    ...
}
```

