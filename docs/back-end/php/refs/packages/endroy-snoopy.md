---
description: 'Snoopy是一个PHP网络客户端，用于模拟浏览器行为，获取网页数据。它支持HTTP/HTTPS请求、Cookie处理、表单提交、文件上传等功能，方便开发者抓取网页内容或进行自动化测试。'
lastUpdated: '2026-06-17 19:00:02'
head:
  - - meta
    - name: 'og:title'
      content: 'Snoopy - php 网络客户端, 获取网页数据'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Snoopy是一个PHP网络客户端，用于模拟浏览器行为，获取网页数据。它支持HTTP/HTTPS请求、Cookie处理、表单提交、文件上传等功能，方便开发者抓取网页内容或进行自动化测试。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/packages/endroy-snoopy.html'
---
# Snoopy - php 网络客户端, 获取网页数据

## 简介

```PHP
include "Snoopy.class.php";
$snoopy = new Snoopy;
$snoopy->fetchtext("http://www.php.net/");
print $snoopy->results;

$snoopy->fetchlinks("http://www.phpbuilder.com/");
print $snoopy->results;

$submit_url = "http://lnk.ispi.net/texis/scripts/msearch/netsearch.html";
$submit_vars["q"] = "amiga";
$submit_vars["submit"] = "Search!";
$submit_vars["searchhost"] = "Altavista";
$snoopy->submit($submit_url,$submit_vars);
print $snoopy->results;

$snoopy->maxframes=5;
$snoopy->fetch("http://www.ispi.net/");
echo "<PRE>\n";
echo htmlentities($snoopy->results[0]);
echo htmlentities($snoopy->results[1]);
echo htmlentities($snoopy->results[2]);
echo "</PRE>\n";

$snoopy->fetchform("http://www.altavista.com");
print $snoopy->results;
```

什么是 Snoopy

Snoopy 是一个PHP类,用来模拟web浏览器的工具,用来获取浏览地址文本或者发送表单

一些 snoopy 的特点:

- 取回页面内容
- 取回没有html标记的文本
- 获取链接
- 支持代理
- 支持基本的用户/密码验证
- 支持设置的用户agent,来源地址,cookies,头信息
- 支持浏览器重定向,并且控制定向的深度
- 能把网页中的链接扩展成高质量的url(默认)
- 简单的提交数据和取回结果
- 支持跟踪HTML框架(v0.92增加)
- 支持再转向的时候传递cookies (v0.92增加)

REQUIREMENTS:

Snoopy requires PHP with PCRE (Perl Compatible Regular Expressions),

which should be PHP 3.0.9 and up. For read timeout support, it requires

PHP 4 Beta 4 or later. Snoopy was developed and tested with PHP 3.0.12.

CLASS METHODS:

fetch(\$URI)

---

This is the method used for fetching the contents of a web page.

\$URI is the fully qualified URL of the page to fetch.

The results of the fetch are stored in \$this->results.

If you are fetching frames, then \$this->results

contains each frame fetched in an array.

取回页面,内容放在 \$this->results 中

fetchtext(\$URI)

---

This behaves exactly like fetch() except that it only returns

the text from the page, stripping out html tags and other

irrelevant data.

取回无标签页面

fetchform(\$URI)

---

This behaves exactly like fetch() except that it only returns

the form elements from the page, stripping out html tags and other

irrelevant data.

取回页面中的表单元素的信息

fetchlinks(\$URI)

---

This behaves exactly like fetch() except that it only returns

the links from the page. By default, relative links are

converted to their fully qualified URL form.

返回页面中的连接

submit($URI,$formvars)

---

This submits a form to the specified $URI. $formvars is an

array of the form variables to pass.

向指定的链接提交表单

submittext($URI,$formvars)

---

This behaves exactly like submit() except that it only returns

the text from the page, stripping out html tags and other

irrelevant data.

提交表单后,返回的是无html的数据

submitlinks(\$URI)

---

This behaves exactly like submit() except that it only returns

the links from the page. By default, relative links are

converted to their fully qualified URL form.

同提交,只是返回页面中的链接

CLASS VARIABLES:        (default value in parenthesis)

\$host                   the host to connect to

主机

\$port                   the port to connect to

端口号

\$proxy_host             the proxy host to use, if any

代理主机地址

\$proxy_port             the proxy port to use, if any

代理端口号

\$agent                  the user agent to masqerade as (Snoopy v0.1)

用户代理

\$referer                referer information to pass, if any

回调地址

\$cookies                cookies to pass if any

cookie

\$rawheaders             other header info to pass, if any

原生头部

\$maxredirs              maximum redirects to allow. 0=none allowed. (5)

最大层级

\$offsiteok              whether or not to allow redirects off-site. (true)

是否抓取重定向的网站

\$expandlinks            whether or not to expand links to fully qualified URLs (true)

是否扩展高质量的url

\$user                   authentication username, if any

可取的user

\$pass                   authentication password, if any

可取的pwd

\$accept                 http accept types (image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, */*)

http可接受的头部设置

\$error                  where errors are sent, if any

是否发送错误

\$response_code          responde code returned from server

服务器的返回代码

\$headers                headers returned from server

服务器的返回头部

\$maxlength              max return data length

返回数据的最大长度

\$read_timeout           timeout on read operations (requires PHP 4 Beta 4+)

set to 0 to disallow timeouts

读取超时值

\$timed_out              true if a read operation timed out (requires PHP 4 Beta 4+)

读取是否超时

\$maxframes              number of frames we will follow

最大的框架层级

\$status                 http status of fetch

http状态

\$temp_dir               temp directory that the webserver can write to. (/tmp)

临时文件目录

\$curl_path              system path to cURL binary, set to false if none

重写url

EXAMPLES:

fetch a web page and display the return headers and the contents of the page (html-escaped)

```PHP
include "Snoopy.class.php";
$snoopy = new Snoopy;

$snoopy->user = "joe";
$snoopy->pass = "bloe";

if($snoopy->fetch("http://www.slashdot.org/"))
{
    echo "response code: ".$snoopy->response_code."<br>\n";
    while(list($key,$val) = each($snoopy->headers))
            echo $key.": ".$val."<br>\n";
    echo "<p>\n";
    
    echo "<PRE>".htmlspecialchars($snoopy->results)."</PRE>\n";
}
else
    echo "error fetching document: ".$snoopy->error."\n";
```

submit a form and print out the result headers and html-escaped page:

```PHP
include "Snoopy.class.php";
$snoopy = new Snoopy;

$submit_url = "http://lnk.ispi.net/texis/scripts/msearch/netsearch.html";

$submit_vars["q"] = "amiga";
$submit_vars["submit"] = "Search!";
$submit_vars["searchhost"] = "Altavista";

        
if($snoopy->submit($submit_url,$submit_vars))
{
        while(list($key,$val) = each($snoopy->headers))
                echo $key.": ".$val."<br>\n";
        echo "<p>\n";
        
        echo "<PRE>".htmlspecialchars($snoopy->results)."</PRE>\n";
}
else
        echo "error fetching document: ".$snoopy->error."\n";
```

showing functionality of all the variables

```PHP
include "Snoopy.class.php";
$snoopy = new Snoopy;

$snoopy->proxy_host = "my.proxy.host";
$snoopy->proxy_port = "8080";

$snoopy->agent = "(compatible; MSIE 4.01; MSN 2.5; AOL 4.0; Windows 98)";
$snoopy->referer = "http://www.microsnot.com/";

$snoopy->cookies["SessionID"] = 238472834723489l;
$snoopy->cookies["favoriteColor"] = "RED";

$snoopy->rawheaders["Pragma"] = "no-cache";

$snoopy->maxredirs = 2;
$snoopy->offsiteok = false;
$snoopy->expandlinks = false;

$snoopy->user = "joe";
$snoopy->pass = "bloe";

if($snoopy->fetchtext("http://www.phpbuilder.com"))
{
        while(list($key,$val) = each($snoopy->headers))
                echo $key.": ".$val."<br>\n";
        echo "<p>\n";
        
        echo "<PRE>".htmlspecialchars($snoopy->results)."</PRE>\n";
}
else
        echo "error fetching document: ".$snoopy->error."\n";
```

fetched framed content and display the results

```PHP
include "Snoopy.class.php";
$snoopy = new Snoopy;

$snoopy->maxframes = 5;

if($snoopy->fetch("http://www.ispi.net/"))
{
    echo "<PRE>".htmlspecialchars($snoopy->results[0])."</PRE>\n";
    echo "<PRE>".htmlspecialchars($snoopy->results[1])."</PRE>\n";
    echo "<PRE>".htmlspecialchars($snoopy->results[2])."</PRE>\n";
}
else
    echo "error fetching document: ".$snoopy->error."\n";
```