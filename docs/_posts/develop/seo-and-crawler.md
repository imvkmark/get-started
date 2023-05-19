---
title: "SEO 和 蜘蛛"
date: 2022-09-19 09:37:15
toc: true
categories:
- ["开发","SEO"]
---

## 简单的SEO图
![image.png](https://file.wulicode.com/yuque/202211/08/14/0012NaEAOqhL.png?x-oss-process=image/resize,h_211)


## 请求的 Curl 示例
模拟 agent 来访问某个页面, 用来判定结果是否符合预期
```
$ curl -H "user-agent: Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" \
https://baidu.com/ -o index.html

$ curl -H "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
https://baidu.com/ -o index.html
```

## 常用的蜘蛛头

### 百度
来源地址 : [https://ziyuan.baidu.com/crawltools/index](https://ziyuan.baidu.com/crawltools/index)
```
Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)
```

### Google
来源地址 : [https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers](https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers)
```
Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36
Googlebot/2.1 (+http://www.google.com/bot.html)
```

## 全球完整的 agent 头信息

- [WhatIsMyBrowser.com](https://developers.whatismybrowser.com/useragents/explore/software_type_specific/crawler/) - 收录了全球 219M 的蜘蛛头信息
- [GitHub - monperrus/crawler-user-agents](https://github.com/monperrus/crawler-user-agents) - Json 格式常用的蜘蛛信息

