---
title: "robots文档"
date: 2023-04-28 16:29:40
toc: true
categories:
- ["开发","SEO"]
---

## robots含义
Robots 协议也称作爬虫协议、机器人协议，它的全名叫作网络爬虫排除标准（ Robots ExclusionProtocol ），用来告诉爬虫和搜索引擎哪些页面可以抓取，哪些不可以抓取。它通常是一个叫作 robots .txt 文本文件，一般放在网站的根目录下。

当搜索’爬虫访问一个站点时，它首先会检查这个站点根目录下是否存在robots.txt 文件，如果存在，搜索爬虫会根据其中定义的爬取范围来爬取。如果没有找到这个文件，搜索爬虫便会访问所有可直接访问的页面。




## 文件写法
User-agent ： 描述spider爬虫的名字，就是描述用户是用什么工具来访问的，可以是爬虫，也可以是浏览器

Disallow : 指定了不允许抓取的目录，如果设置为／则代表不允许抓取所有页面 ，如果为空就表示都可以进行访问

Allow：描述可以被访问的一组URL

Sitemap：就是词面意思站点地图，告诉爬虫网站上有哪些网页可以抓取
```
User-agent: * 这里的*代表的所有的搜索引擎种类，*是一个通配符
Disallow: /admin/ 这里定义是禁止爬寻admin目录下面的目录
Disallow: /require/ 这里定义是禁止爬寻require目录下面的目录
Disallow: /ABC/ 这里定义是禁止爬寻ABC目录下面的目录
Disallow: /cgi-bin/*.htm 禁止访问/cgi-bin/目录下的所有以".htm"为后缀的URL(包含子目录)。
Disallow: /*?* 禁止访问网站中所有包含问号 (?) 的网址
Disallow: /.jpg$ 禁止抓取网页所有的.jpg格式的图片
Disallow:/ab/adc.html 禁止爬取ab文件夹下面的adc.html文件。
Allow: /cgi-bin/　这里定义是允许爬寻cgi-bin目录下面的目录
Allow: /tmp 这里定义是允许爬寻tmp的整个目录
Allow: .htm$ 仅允许访问以".htm"为后缀的URL。
Allow: .gif$ 允许抓取网页和gif格式图片
Sitemap: 网站地图 告诉爬虫这个页面是网站地图
```

## 文件用法
```
例1. 禁止所有搜索引擎访问网站的任何部分
User-agent: *
Disallow: /
实例分析：淘宝网的 Robots.txt文件
```

