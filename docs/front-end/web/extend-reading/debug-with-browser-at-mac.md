---
description: '使用模拟器调试手机浏览器，包括iOS中调试Safari、Android中调试WebView及各类型号浏览器（不限于Chrome），可跨平台测试网页兼容性与性能。'
lastUpdated: '2026-07-01 08:14:46'
head:
  - - meta
    - name: 'og:title'
      content: '使用模拟器调试手机浏览器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用模拟器调试手机浏览器，包括iOS中调试Safari、Android中调试WebView及各类型号浏览器（不限于Chrome），可跨平台测试网页兼容性与性能。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/web/extend-reading/debug-with-browser-at-mac.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/8496e0a287413df392e68a4e95f95475.png'
---
# 使用模拟器调试手机浏览器

## 在 iOS 中调试 Safari 浏览器

打开模拟器, 在模拟器的 safari 中属于一个地址

打开 safari, 启动开发者模式 > 勾选在菜单栏中显示 “开发” 菜单

![](https://file.wulicode.com/feishu-images/8496e0a287413df392e68a4e95f95475.png)

在开发中选择

![](https://file.wulicode.com/feishu-images/f5bffe6239767dbab9ed849f01afc24b.png)

这样既可测试不同系统下的 safari 显示

![](https://file.wulicode.com/feishu-images/a05bbf381842ad12937d95dcf73040e1.png)

## 在 android 中调试 webview, 各种型号手机浏览器, 不限于 Chrome

我们打开android AVDManager

[MAC OS下使用 Homebrew 安装和配置 android-sdk](https://app.notion.com/p/MAC-OS-Homebrew-android-sdk-9b9b35ae342a4c9c9f5e6e88c43538d7?pvs=21)

安装完成之后我们运行起来一个手机模拟器

我们需要在模拟器开启开发者模式, 并且开启远程网络调试

![](https://file.wulicode.com/feishu-images/34d81476fc2df981abfce15a77dccc59.png)

我们打开 google 浏览器

输入 `chrome://inspect/#devices`

自此可以调试 webview 内的页面

![](https://file.wulicode.com/feishu-images/ca72d67174c4ac892be125a33b435963.png)

Chrome 的页面

![](https://file.wulicode.com/feishu-images/b7a377060c7cc14ec8fafef817f5185a.png)

如果遇到打不开, 白屏的情况需要做如下处理

1. 打开开发者模式, 并且允许 USB 调试
2. 使用科学上网, 并且将以下域名加入清单

```Plain Text
*.appspot.com
```