---
description: '打开模拟器, 在模拟器的 safari 中属于一个地址打开 safari, 启动开发者模式 > 勾选在菜单栏中显示 “开发” 菜单在开发中选择这样既可测试不同系统下的 safari 显示我们打开android AVDManager安装完成之后我们运行起来一个手机模拟器我们需要在模拟器开启开发者模式, 并且开启远程网络调试我们打开 google 浏览器输入 chrome://inspect/#devices自此可以调试 webview 内的页面Chrome 的页面如果遇到打不开, 白屏的情况需要做如下处理'
lastUpdated: '2023-12-05 18:13:00'
head: 
  - - meta
    - name: 'og:title'
      content: '使用模拟器调试手机浏览器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '打开模拟器, 在模拟器的 safari 中属于一个地址打开 safari, 启动开发者模式 > 勾选在菜单栏中显示 “开发” 菜单在开发中选择这样既可测试不同系统下的 safari 显示我们打开android AVDManager安装完成之后我们运行起来一个手机模拟器我们需要在模拟器开启开发者模式, 并且开启远程网络调试我们打开 google 浏览器输入 chrome://inspect/#devices自此可以调试 webview 内的页面Chrome 的页面如果遇到打不开, 白屏的情况需要做如下处理'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/mobile/h5/debug-with-browser-at-mac.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/2c/2c2aca077a648525cdd25635881e29fb.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 使用模拟器调试手机浏览器



## 在 iOS 中调试 Safari 浏览器

打开模拟器, 在模拟器的 safari 中属于一个地址

打开 safari, 启动开发者模式 > 勾选在菜单栏中显示 “开发” 菜单

![](https://file.wulicode.com/notion/2c/2c2aca077a648525cdd25635881e29fb.png)

在开发中选择

![](https://file.wulicode.com/notion/73/7318b1238c5c4d95a19181cbe9a75e5e.png)

这样既可测试不同系统下的 safari 显示

![](https://file.wulicode.com/notion/15/15d299206136bc9891bf962828ca02a2.png)

## 在 android 中调试 webview, 各种型号手机浏览器, 不限于 Chrome

我们打开android AVDManager

[MAC OS下使用 Homebrew 安装和配置 android-sdk](../android/install-sdk-at-mac.md)

安装完成之后我们运行起来一个手机模拟器

我们需要在模拟器开启开发者模式, 并且开启远程网络调试

![](https://file.wulicode.com/notion/fe/fec46823632e438e3c332554a41ff857.png)

我们打开 google 浏览器

输入  `chrome://inspect/#devices`

自此可以调试 webview 内的页面

![](https://file.wulicode.com/notion/f7/f7649b882d07db8880d96e9f5ee46c8b.png)

Chrome 的页面

![](https://file.wulicode.com/notion/30/302b3a4049856fd0c95aeb72fb368c50.png)

如果遇到打不开, 白屏的情况需要做如下处理

- 打开开发者模式, 并且允许 USB 调试
- 使用科学上网, 并且将以下域名加入清单

```
*.appspot.com
```

