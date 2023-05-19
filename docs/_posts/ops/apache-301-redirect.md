---
title: "apache做301重定向的方法"
date: 2021-06-26 11:20:13
toc: true
categories:
- ["Ops","软件","apache"]
---

## 重写方式

使用mod_rewrite重写URL的方式来做，做之前朋友记得检查一下你的apache是否已经加载了rewrite模块。如图所示的那个模块，在apahce的httpd.conf文件里面查看

![](https://file.wulicode.com/yuque/202211/02/09/0013tYtWDcDZ.jpeg)

如果已经支持了rewrite，直接在你要做的站点配置文件里面添加以下代码，注意修改域名为你要做的域名。


```
Options +FollowSymLinks 
RewriteEngine on 
RewriteCond %{HTTP_HOST} ^wctx123.com 
RewriteRule ^(.*)$ http://www.wctx123.com/$1 [R=permanent,L]
```

在这里判断当前服务器变量HTTP_HOST是否等于php100.com，为真就进行重写，按照R=permanent进行永久重定向，L表示并立即停止重写操作，并不再应用其他重写规则。


## url跳转方式

在apache中用这个域名建立了两个虚拟主机，一个带www，一个不带。

然后我将不带www的正确解析到对应的网站上面，然后我将带www的域名解析i到不带www的主机目录下面的一个二级目录里面，然后我在这个二级目录里面放了一个index.php，我利用php代码来做这个301。

```
<?php         
Header("HTTP/1.1 301 Moved Permanently");
// 你要定向的域名
Header("Location:http://XXX.com")
```

这样当用户访问带www的域名的时候，就会访问这个二级目录下面的index.php，php就会执行301，将域名跳转会不带www的域名，这个跳转的时间非常短，用户感觉不出来的。

