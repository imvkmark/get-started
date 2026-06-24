---
description: 'PhpStorm常用插件包括Php Inspections（静态代码分析）、PHP Annotations（注解支持）及PhpStorm Tips和Tricks。FAQ涵盖变量命名建议、取消首列注释及字符串内变量使用不推荐的原因。'
lastUpdated: '2026-06-17 18:25:25'
head:
  - - meta
    - name: 'og:title'
      content: 'PhpStorm - 插件和FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PhpStorm常用插件包括Php Inspections（静态代码分析）、PHP Annotations（注解支持）及PhpStorm Tips和Tricks。FAQ涵盖变量命名建议、取消首列注释及字符串内变量使用不推荐的原因。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/primer/phpstorm-plugin-faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/e4dce157aedcc98af65ff081a6408208.png'
---
# PhpStorm - 插件和FAQ

## 插件

::: info 🔗
更多资料 : [phpStorm 的常用插件收集](http://yzone.net/blog/140)
:::

### 1. Php Inspections - PHP 静态代码分析工具

> Php 静态代码分析工具, 可以快速纠正不正确的写法以及可能潜在的性能问题, 兼容性问题, 错误的正则, 优化的 if, 安全, 架构等等问题  
> —- [Php Inspections (EA Extended) - IntelliJ IDEs Plugin | Marketplace](https://plugins.jetbrains.com/plugin/7622?pr=phpStorm)  
> —- [github](https://github.com/kalessil/phpinspectionsea)

![](https://file.wulicode.com/feishu-images/e4dce157aedcc98af65ff081a6408208.png)

### 2. **PHP Annotations - Php 注解**

> 让 phpstorm 支持注解  
> —— [PHP Annotations - IntelliJ IDEA & PhpStorm Plugin | Marketplace](https://plugins.jetbrains.com/plugin/7320-php-annotations)

![](https://file.wulicode.com/feishu-images/113b36023b70de4a2f1c26c013fd187b.png)

### 3. PhpStorm Tips 和 Tricks

[🧪 PhpStorm Tips & Tricks](https://masteringphpstorm.com/tips-and-tricks)

## FAQ

### 变量命名建议

在编写 foreach 循环时，PhpStorm 将根据数组的名称为数组项建议合适的变量名。因此，如果您的数组被称为 `$items` , phpstorm 会转换成 `$item` 单项形式的条目。

PhpStorm 足够聪明，能够找出像 *people*, *ponies* 和 *leaves* 这样的单词形式

**拓展**

可以通过 `phpSuggestVariableName` 表达式在实时模板变量使用，在自定义实时模板中使用此功能以便 PhpStorm 给你建议的单词写法

**参考**

- [🧪 PhpStorm Tips & Tricks (masteringphpstorm.com)](https://masteringphpstorm.com/tips-and-tricks)
- [Live template variables | PhpStorm Documentation (jetbrains.com)](https://www.jetbrains.com/help/phpstorm/2023.3/template-variables.html#predefined_functions)

### 取消在第一列注释

> 取消 Comment At First Line

在 v8 版本的时候可以设置 `File > Settings > Editor > Code Style > PHP (or whatever) > Other` , 取消勾选 `Line comment at first column`

![](https://file.wulicode.com/feishu-images/e4c9768772733f335c6e4c8e6dc46c91.png)

在 `v2020` 版本之后需要在 `PHP (or whatever) > Code Generation > Comment Code` 部分

![](https://file.wulicode.com/feishu-images/72b8dbbca47348a037bbb5c53d5f7e62.png)

**参考**

- [php - How can I get PhpStorm to comment a line at the beginning of the text and not line? - Stack Overflow](https://stackoverflow.com/questions/27433509/how-can-i-get-phpstorm-to-comment-a-line-at-the-beginning-of-the-text-and-not-li)

### 为什么PhpStorm不建议在一个字符串中使用变量

为了不分散的实际字符串编辑，你必须按Ctrl + Space来调用代码完成：

![](https://file.wulicode.com/feishu-images/4389dd13a0b191d584676b4ad4c17bb1.png)

## 拓展阅读

- [PHPUnit 简介以及在 PhpStorm 中使用](/back-end/php/testing/phpunit-introduction.md)