---
description: 'BBCode（公告板代码）是一种轻量级标记语言，用于论坛等平台。安装配置过程包括定义常量、编写解析函数，实现文本样式、链接、图片等格式化处理，增强用户交互体验。'
lastUpdated: '2026-06-17 19:03:18'
head:
  - - meta
    - name: 'og:title'
      content: '文本处理 - BBCode[Bulletin Board Code]'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'BBCode（公告板代码）是一种轻量级标记语言，用于论坛等平台。安装配置过程包括定义常量、编写解析函数，实现文本样式、链接、图片等格式化处理，增强用户交互体验。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/text/bbcode.html'
---
# 文本处理 - BBCode[Bulletin Board Code]

这个扩展目的是帮助解析 BBCode 文本, 目的是转换 到 html代码或者其他标记语言, 这个是用正则提供了高性能的处理方式, 并且对未关闭标签进行了较好的处理

此模块在windows下尚没有lib扩展,不过可以使用pear包代替

## 安装

## 配置

## 定义常量

## 函数

`bool bbcode_add_element ( resource $bbcode_container , string $tag_name , array $tag_rules )`

添加一个 bbcode元素

`bool bbcode_add_smiley ( resource $bbcode_container , string $smiley , string $replace_by )`

添加表情

`resource bbcode_create ([ array $bbcode_initial_tags ] )`

建立一个bbcode资源

`bool bbcode_destroy ( resource $bbcode_container )`

清空BBS资源

`string bbcode_parse ( resource $bbcode_container , string $to_parse )`

根据给定的规则解析字串

`bool bbcode_set_arg_parser ( resource $bbcode_container , resource $bbcode_arg_parser )`

给资源设定解析器

`bool bbcode_set_arg_parser ( resource $bbcode_container , resource $bbcode_arg_parser )`

设置或者修改解析选项