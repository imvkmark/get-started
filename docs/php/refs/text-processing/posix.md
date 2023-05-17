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