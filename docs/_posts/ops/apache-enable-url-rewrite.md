---
title: "[译] Apache 使用 MOD_REWRITE 启用 url rewrite/url重写"
date: 2022-04-14 22:26:29
toc: true
categories:
- ["Ops","软件","apache"]
---

原文地址:[ENABLING MOD_REWRITE ON WINDOWS APACHE FOR URL REWRITING](http://www.webdevdoor.com/php/mod_rewrite-windows-apache-url-rewriting/)<br />以下几步将帮助你 windows 平台上的 wamp 启用 mod_rewrite 组件<br />我需要使用 `.htaccess` 文件来启用本地 Wordpress 站点上的url重写功能, 让url地址看起来更通俗易懂, 更漂亮. 如果 `mod_rewrite` 组件没有开启, 网站将不能使用任何的 url重写功能, 这个将会在 WordPress 站点报出一个 404 错误页面.<br />启用 `mod_rewrite` 将走以下步骤:

- 启用conf 文件中的 `mod_rewrite`<br />打开 Apache 目录的 配置文件 `http.conf` 对于我来说, 这个位置是 `apache~/conf/httpd.conf` , 在更改之前备份下这个文件, 如果出错可以从这个文件再恢复回来.<br />找到`#LoadModule rewrite_module modules/mod_rewrite.so`, 取消前边的`#` 注释
- 启用 AllowOverride<br />定位到 `<directory />` 所在的部分. 修改如下的内容为

```
<directory />
	Options All
	AllowOverride All
</directory>
```
找到所有的 `AllowOverride None` 的位置, 将其修改为 `AllowOverride All`<br />最后重启服务器并且刷新你的浏览器, 你会看到网站不报错了. 心情也好多了<br />**写给自己**<br />对于我配置的虚拟主机来说, 为了测试 laravel 的重写功能, 我把配置写在了 vhosts 文件的配置中.<br />`apache~/conf/extra/httpd-vhosts.conf`
```
<VirtualHost *:80>
    ServerName www.lartest.com
    DocumentRoot "G:/wamp/www/mark/laravelRun/public"
    Options FollowSymLinks Indexes
    <Directory "G:/wamp/www/mark/laravelRun/public">
        Options +Indexes
        Options All
        AllowOverride All
    </Directory>
</VirtualHost>
```

