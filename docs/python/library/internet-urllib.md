# urllib - URL 处理模块

## python urllib 的使用说明

[urllib --- URL 处理模块](https://docs.python.org/zh-cn/3/library/urllib.html#module-urllib)

 https://www.runoob.com/python3/python-urllib.html 

urllib 库用于操作网页 URL，并对网页的内容进行抓取处理

urllib包下包含以下模块

**urllib.request** - 打开和读取 URL。

**urllib.error** - 包含 urllib.request 抛出的异常。

**urllib.parse** - 解析 URL。

**urllib.robotparser** - 解析 robots.txt 文件。

### urllib.robotparser

robotparser 用于解析robots.txt 文件

urllib.robotparser 提供了 RobotFileParser 类，语法如下

```
class urllib.robotparser.RobotFileParser(url='')
```

**读取、解析 robots.txt 文件的方法**

`set_url(url)`

设置 robots.txt 文件的 URL。

`read()`

读取robots .txt 文件并进行分析。

> 这个方法执行一个读取和分析操作，如果不调用这个方法， 接下来的判断都会为False ，所以一定记得调用这个方法。这个方法不会返回任何内容，但是执行了读取操作。

`parse(lines)`

解析行参数。

`can_fetch(useragent, url)`

如果允许 useragent 按照被解析 robots.txt 文件中的规则来获取 url 则返回 True

`mtime()`

返回最近一次获取 robots.txt 文件的时间。 这适用于需要定期检查 robots.txt 文件更新情况的长时间运行的网页爬虫。

`modified()`

将最近一次获取 robots.txt 文件的时间设置为当前时间。

`crawl_delay(useragent)`

为指定的 useragent 从 robots.txt 返回 Crawl-delay 形参。 如果此形参不存在或不适用于指定的 useragent 或者此形参的 robots.txt 条目存在语法错误，则返回 None。

`request_rate(useragent)`

以 named tuple RequestRate(requests, seconds) 的形式从 robots.txt 返回 Request-rate 形参的内容。 如果此形参不存在或不适用于指定的 useragent 或者此形参的
robots.txt 条目存在语法错误，则返回 None。

`site_maps() `

以 list() 的形式从 robots.txt 返回 Sitemap 形参的内容。 如果此形参不存在或者此形参的 robots.txt 条目存在语法错误，则返回 None。