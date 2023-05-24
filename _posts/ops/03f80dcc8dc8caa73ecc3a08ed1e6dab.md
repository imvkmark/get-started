---
title: "在 Ubuntu 上安装 zeal"
date: 2022-04-14 22:27:04
toc: true
categories:
- ["Ops","Ubuntu"]
---

## Zeal 是什么
**ZEAL** 是一款离线文档浏览器，其灵感来自 OS X平台上的 Dash，目前支持 Window 和 Liunx。基于 QT5。

支持呼出热键。只要按下组合箭 ALT+Space 即可在任何地方显示面板，不用时可以用热键隐藏的系统托盘。

- 可同时搜索多个文档
- 不依赖网络
- GPL 协议开放源码
- Dash 中的文档都可以在 Zeal 中使用。




## 在 Ubuntu 中安装
```
# 加入 库
$ add-apt-repository ppa:zeal-developers/ppa
# 更新
$ apt-get update
# 安装
$ apt-get install zeal
```
在搜索栏中搜索 `zeal`, 就可以打开,然后把快捷方式放入侧边栏. 输入关键词就可以查找相关的文档内容.

![](https://file.wulicode.com/yuque/202208/04/23/0207TYg5oSgR.png?x-oss-process=image/resize,h_499)

打开配置项, 然后在 `Docsets` 栏目中下载相关的文档.

![image.png](https://file.wulicode.com/yuque/202208/04/23/0208NCb3Inzb.png?x-oss-process=image/resize,h_587)

