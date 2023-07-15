# Apache - FAQ

## apache 读取图片显示 403 Forbidden

首先查看截图:

![](https://file.wulicode.com/yuque/202211/06/10/2512jkHrgQA3.jpeg)

查看日志:

> [core:crit] [pid 24208] Permission denied: [client 58.56.92.131:37345] AH00529: /webdata/www/.../mail/.htaccess
> pcfg_openfile: unable to check htaccess file, ensure it is readable and that '/webdata/www/.../mail/' is executable


其实这里的日志已经说的很清楚了. 目录文件不可读

## apache做301重定向的方法

### 重写方式

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

### url跳转方式

在apache中用这个域名建立了两个虚拟主机，一个带www，一个不带。

然后我将不带www的正确解析到对应的网站上面，然后我将带www的域名解析i到不带www的主机目录下面的一个二级目录里面，然后我在这个二级目录里面放了一个index.php，我利用php代码来做这个301。

```
<?php         
Header("HTTP/1.1 301 Moved Permanently");
// 你要定向的域名
Header("Location:http://XXX.com")
```

这样当用户访问带www的域名的时候，就会访问这个二级目录下面的index.php，php就会执行301，将域名跳转会不带www的域名，这个跳转的时间非常短，用户感觉不出来的。

## Apache alias 实现目录别名访问 和目录索引

**目录别名访问**

Alias /phpmyadmin "d:/wamp/apps/phpmyadmin3.3.9/"

```
# to give access to phpmyadmin from outside  
# replace the lines
#
#         Order Deny,Allow 
# Deny from all
# Allow from 127.0.0.1
#
# by
#
#         Order Allow,Deny   
#    Allow from all

<Directory "d:/wamp/apps/phpmyadmin3.3.9/">
  Options Indexes FollowSymLinks MultiViews
  AllowOverride all
  Order Deny,Allow
  Deny from all
  Allow from 127.0.0.1
</Directory>
```

**如何开启Apache的目录索引功能**

模块加载

```
LoadModule dir_module modules/mod_dir.so
LoadModule autoindex_module modules/mod_autoindex.so
```

配置alias和目录权限

Alias /photo e:/photo

```
<Directory "e:/photo">
  AllowOverride None
  Options Indexes FollowSymLinks MultiViews
  indexOptions FancyIndexing ScanHTMLTitles NameWidth=128 DescriptionWidth=256 HTMLTable VersionSort FoldersFirst
  Order allow,deny  
  Allow from all  
</Directory>
```

