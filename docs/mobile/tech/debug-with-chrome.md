---
title : ""
date : 2023-01-09 23:42:27
toc : true
categories :
  - [ "前端","其他" ]
---

# 使用模拟器调试手机浏览器

## 在 iOS 中调试 Safari 浏览器

打开模拟器, 在模拟器的 safari 中属于一个地址

打开 safari, 启动开发者模式 > 勾选在菜单栏中显示 "开发" 菜单

![image.png](https://file.wulicode.com/yuque/202301/09/23/4509JM8eQQPi.png)

在开发中选择

![image.png](https://file.wulicode.com/yuque/202301/09/23/5010cohf8dQv.png)

这样既可测试不同系统下的 safari 显示

![image.png](https://file.wulicode.com/yuque/202301/09/23/5010PLsmV7Of.png)

## 在 android 中调试 webview, 各种型号手机浏览器, 不限于 Chrome

我们打开android AVDManager, ([如何安装](./../android/install-sdk-at-mac.md)), 安装完成之后我们运行起来一个手机模拟器

我们需要在模拟器开启开发者模式, 并且开启远程网络调试

![image.png](https://file.wulicode.com/yuque/202301/10/00/2008SJ8jcEMo.png)

我们打开 google 浏览器

输入 `chrome://inspect/#devices`

自此可以调试 webview 内的页面

![image.png](https://file.wulicode.com/yuque/202301/10/00/2509PNbliCxz.png)

Chrome 的页面

![image.png](https://file.wulicode.com/yuque/202301/10/00/2509zxSEpzsK.png)

如果遇到打不开, 白屏的情况需要做如下处理

1. 打开开发者模式, 并且允许 USB 调试
2. 使用科学上网, 并且将以下域名加入清单

```
*.appspot.com
```

