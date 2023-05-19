---
title: "WordPress 重定向 URL Rewrite [WordPress URL重写]"
date: 2022-04-14 22:12:12
toc: true
categories:
- ["Php","源码阅读","wordpress"]
---

# WordPress URL Rewrite
![](https://file.wulicode.com/yuque/202208/04/14/48442ou1HBjv.jpg?x-oss-process=image/resize,h_64)<br />Have you ever tried to use Permalinks with WordPress running on an IIS server? What a pain. I created this ISAPI filter for IIS specifically to provide URL Rewriting for WordPress, without having to install and configure a full URL rewriting software package. This ISAPI filter allows you to create Permalinks that don't suck, and it lets you do it very easily, with almost no configuration required. I have been using WordPress URL Rewrite on this site for a while now, and I feel that it is ready to be shared with everyone. Let me ease your pain!<br />**Full installation instructions are included with the Download (below)**


# Features

- Can run with multiple WordPress installations in an IIS Web Site (for example: / and /MyBlog/)
- Has a configurable path Exceptions list (for example: defining /Forum as an exception would prevent any pages in this folder from being re-written)
- Works with IIS 5.0, 5.1 and 6.0
- Works with WordPress 2.0 or higher
- Easy to setup, easy to maintain
- Comes with x86 and x64 versions

[  ]()[![](https://file.wulicode.com/yuque/202208/04/14/4844pJT0rrfO.gif?x-oss-process=image/resize,h_1)](http://www.binaryfortress.com/Data/Download/?package=wprewrite&log=100)<br />Latest version:  **v1.1.0**  (0.15 MB)<br />**Click the 'Download Now' button to download WordPress URL Rewrite**<br />![](https://file.wulicode.com/yuque/202208/04/14/4845feKqIhNv.jpg?x-oss-process=image/resize,h_75)

# Examples
**Example Configuration File (WordPressURLRewrite.ini)**<br />_#Paths to Rewrite<br />/<br />#Path Exceptions<br />/wp-admin<br />/wp-content<br />/Forum_<br />The  **#Paths to Rewrite**  section defines all the WordPress installations you want to provide rewriting for. By default just the root is defined ("/"), but you can add more by defining them ("/Blog/" or "/MyBlog/"). Define as many as you want. The  **#Path Exceptions**  section defines all the folders you want this filter to ignore. For example, defining "/Forum" will prevent WordPress URL Rewrite from rewriting any pages under this folder. This is very helpful if you have other web applications installed (like an image gallery, a discussion forum or even the WordPress Admin area).

