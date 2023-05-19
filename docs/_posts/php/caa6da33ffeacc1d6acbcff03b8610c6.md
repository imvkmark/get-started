---
title: "ECShop模板问题"
date: 2022-04-14 22:09:02
toc: true
categories:
- ["Php","源码阅读","ecshop"]
---

1.库文件调用方式<br /><!-- #BeginLibraryItem "/library/page_header.lbi" --><!-- #EndLibraryItem --><br />          ecshop使用的是dreamweaver的库管理方式，这种库的管理方式和ecshop自主的模板编译器是相关联的，因为他会分析dw的库的包含方式，这种方式使用程序来解释的话好像就是类似于smarty的{include file=“ab.htm”}使用dreamweaver编写可重用的库文件是一种便捷的方式。故而dreamweaver仅仅作为一种方便的编辑工具来使用的，dreamweaver不能作为ecshop的文件编译的更新方式。或者php的内嵌的处理方式

2.标签调用<br />      if * if语句 <br />                    {if}{else}{/if}<br />      foreach <br />           {foreach from=$categories item=cat name=categories}<br />                from:来源变量 <br />                item:内部循环调用变量 <br />                name:smarty标识 <br />                     $smarty.foreach.categories.first      : 第一个 <br />                      $smarty.foreach.categories.last       : 最后一个 <br />          comment * 信息注释<br />                    {* 信息注释 *}<br />      insert * 插入模块 <br />                    {insert name='member_info'}<br />           调用includes/lib_insert.php中相关的函数模块,一般都是调用相关的库文件来显示相关模块 <br />      insert_scripts <br />           A:调用 /js 目录下的js文件 <br />                    {insert_scripts files='transport.js'}<br />                编译结果<br />           B:调用根目录下文件 <br />                    {insert_scripts files='./static/jquery.min.js'}<br />                编译结果

3.后台文件调用<br />          ecshop后台调用的ajax请求和前台调用的文件，如果是前台调用的文件耽误了后台的使用后台会ajax失效，如果前台文件得到篡改的话，如果是前台使用，前台复制一个相同的以供前台使用，后台还是使用原来的，问题解决

提醒：
> 1. 更改模板文件里面库文件的内容是无效的，页面刷新时，程序自动重新载入库文件内容到模板文件里(以库文件内容为准)。
> 2. 模板内所有id值为 ECS_ 开头的都必须保留(和ajax相关)。
> 3. 非库文件内容不可放置到可编辑区域内，否则设置模板时，非库文件内容将被覆盖删除。
> 提醒：文件名尽量保存默认，否则在后台管理将无法管理库文件或不可预见错误。

