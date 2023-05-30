# 介绍

本章节包含基础语法输出, 短标签输出, 多语言混排以及注释

Hello World

<<< @/php/refs/language/intro/hello.php

脚本性语言, 即时编译

**版本说明**

7.\* : 稳定版

8.x : 支持即时编译

## 输出内容以及格式

```php
// 带末尾分号可以不带 php 终止符
<?php
echo "Hello World";

// 单行模式
<?php echo "Hello World";

// 可以加上 ?>
<?php
    echo 'Hello World';
?>

// 单行可以不带末尾分号
<?php echo 'Hello World' ?>
```

> 在 7.0 中已经废弃了 `<%, %>`, `<%=`, `<script language="php">` 这几种
> Asp 写法

## 短标签

<<< @/php/refs/language/intro/short.php

## Html 混排

<<< @/php/refs/language/intro/mix.php

## 注释

```php
// 单行注释

echo "Hello world";   // 单行, 末尾注释

/* 多行注释, 单行的写法 */
/*
 多行注释
*/
```

## 相关工具推荐

- [在线运行](https://tool.lu/coderunner/)
- [Php 手册](https://www.php.net/manual/zh/)
