---
description: 'POSIX正则表达式函数包括匹配（ereg）、替换（ereg_replace）、不区分大小写的匹配（eregi）和替换（eregi_replace），以及分割（split）。建议优先使用效率更高的Perl正则表达式（preg系列）作为替代。'
lastUpdated: '2026-06-17 19:03:25'
head:
  - - meta
    - name: 'og:title'
      content: '文本处理 - POSIX Regex'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'POSIX正则表达式函数包括匹配（ereg）、替换（ereg_replace）、不区分大小写的匹配（eregi）和替换（eregi_replace），以及分割（split）。建议优先使用效率更高的Perl正则表达式（preg系列）作为替代。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/text/posix.html'
---
# 文本处理 - POSIX Regex

## 介绍

基于posix 的正则表达式 正则表达式匹配,建议使用Perl的正则表达式是最快的替代方案

## 函数

`string ereg_replace ( string $pattern , string $replacement , string $string )` 正则表达式替换

`int ereg ( string $pattern , string $string [, array &$regs ] )` 正则表达式匹配

`string eregi_replace ( string $pattern , string $replacement , string $string )` 不区分大小写的 正则表达式替换

`int eregi ( string $pattern , string $string [, array &$regs ] )` 不区分大小写的 正则表大会匹配

`array split ( string $pattern , string $string [, int $limit ] )` 使用 preg_split 更快

`array spliti ( string $pattern , string $string [, int $limit = -1 ] )` [5.3.0] 废弃

`string sql_regcase ( string $string )` [5.3.0] 废弃