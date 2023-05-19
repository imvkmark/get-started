---
title: "[转] 利用 nginx 来屏蔽指定的 user_agent 的访问"
date: 2022-04-20 19:00:47
toc: true
categories:
- ["Ops","Nginx","示例"]
---

原文地址 : [利用 nginx 来屏蔽指定的 user_agent 的访问](https://blog.csdn.net/qq_22929803/article/details/50724662)<br />对于做国内站的我来说，我不希望国外蜘蛛来访问我的网站，特别是个别垃圾蜘蛛，它们访问特别频繁。这些垃圾流量多了之后，严重浪费服务器的带宽和资源。通过判断 user agent，在 nginx 中禁用这些蜘蛛可以节省一些流量，也可以防止一些恶意的访问。<br />1、进入 nginx 的配置目录，例如 `cd /usr/local/nginx/conf`<br />2、添加 `agent_deny.conf` 配置文件 `vim agent_deny.conf`<br />加入以下

```
# 禁止Scrapy等工具的抓取
if ($http_user_agent ~* (Scrapy|Curl|HttpClient)) {
  return 403;
}
# 禁止指定UA及UA为空的访问
if ($http_user_agent ~ "FeedDemon|JikeSpider|Indy Library|Alexa Toolbar|AskTbFXTV|AhrefsBot|CrawlDaddy|CoolpadWebkit|Java|Feedly|UniversalFeedParser|ApacheBench|Microsoft URL Control|Swiftbot|ZmEu|oBot|jaunty|Python-urllib|lightDeckReports Bot|YYSpider|DigExt|YisouSpider|HttpClient|MJ12bot|heritrix|EasouSpider|LinkpadBot|Ezooms|^$" )
{
  return 403;
}
#禁止非GET|HEAD|POST方式的抓取
if ($request_method !~ ^(GET|HEAD|POST)$) {
  return 403;
}
```
还有加一些针对特殊的 user_agent 的访问
```
if ($http_user_agent ~ "Mozilla/4.0\ \(compatible;\ MSIE\ 6.0;\ Windows\ NT\ 5.1;\ SV1;\ .NET\ CLR\ 1.1.4322;\ .NET\ CLR\ 2.0.50727\)") {
    return 404;
}
```
这个是如何得出是频繁访问的 user_agent 呢，通过分析 nginx 的日志可以得出
```
tail -n 1000 /usr/local/nginx/logs/access.log | awk -F\" '{A[$(NF-1)]++}END{for(k in A)print A[k],k}' | sort -n | tail 分析访问次数
```
执行以上命令可以得出访问最多的 user_agent，通过人为判断是否正常来屏蔽<br />然后在 nginx.conf 的 location 中加入 include agent_deny.conf;<br />平滑重启 nginx
```
/usr/local/nginx/sbin/nginx –s reload
```
然后测试一下 设置是否成功
```
curl -I -A "BaiduSpider" www.test.com
```
```
HTTP/1.1 200 OK
Server: nginx
Date: Mon, 09 Feb 2015 03:37:20 GMT
Content-Type: text/html; charset=UTF-8 Connection: keep-alive
Vary: Accept-Encoding
X-Powered-By: PHP/5.5.19 Vary: Accept-Encoding, Cookie
Cache-Control: max-age=3, must-revalidate
WP-Super-Cache: Served supercache file from PHP
```
```
curl -I -A "JikeSpider" www.test.com
```
```
HTTP/1.1 403 Forbidden
Server: nginx Date: Mon, 09 Feb 2015 03:37:44 GMT
Content-Type: text/html
Content-Length: 162 Connection: keep-alive
```
到这里，nginx 通过判断 User-Agent 屏蔽蜘蛛访问网站就已经完成，可以根据实际情况对 `agent_deny.conf` 中的蜘蛛进行增加、删除或者修改。

