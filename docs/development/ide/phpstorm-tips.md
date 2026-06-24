---
description: '在编写 foreach 循环时，PhpStorm 将根据数组的名称为数组项建议合适的变量名。因此，如果您的数组被称为 $items , phpstorm 会转换成 $item 单项形式的条目。PhpStorm 足够聪明，能够找出像 people, ponies 和 leaves 这样的单词形式拓展可以通过 phpSuggestVariableName 表达式在实时模板变量使用，在自定义实时模板中使用此功能以便 PhpStorm 给你建议的单词写法参考在 v8 版本的时候可以设置  File > Settings > Editor > Code Style > PHP ('
lastUpdated: '2025-12-14 16:31:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'PhpStorm Tips'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在编写 foreach 循环时，PhpStorm 将根据数组的名称为数组项建议合适的变量名。因此，如果您的数组被称为 $items , phpstorm 会转换成 $item 单项形式的条目。PhpStorm 足够聪明，能够找出像 people, ponies 和 leaves 这样的单词形式拓展可以通过 phpSuggestVariableName 表达式在实时模板变量使用，在自定义实时模板中使用此功能以便 PhpStorm 给你建议的单词写法参考在 v8 版本的时候可以设置  File > Settings > Editor > Code Style > PHP ('
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/ide/phpstorm-tips.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/3e/3efc510342b8b2263939ec2af523c889.png?x-oss-process=image/resize,m_mfit,w_400'
---
# PhpStorm Tips



### 1. 变量命名建议

在编写 foreach 循环时，PhpStorm 将根据数组的名称为数组项建议合适的变量名。因此，如果您的数组被称为  `$items`  , phpstorm 会转换成  `$item`  单项形式的条目。

PhpStorm 足够聪明，能够找出像  _people_ ,  _ponies_ 和  _leaves_ 这样的单词形式

**拓展**

可以通过  `phpSuggestVariableName`  表达式在实时模板变量使用，在自定义实时模板中使用此功能以便 PhpStorm 给你建议的单词写法

**参考**

- [🧪 PhpStorm Tips & Tricks (masteringphpstorm.com)](https://masteringphpstorm.com/tips-and-tricks)
- [Live template variables | PhpStorm Documentation (jetbrains.com)](https://www.jetbrains.com/help/phpstorm/2023.3/template-variables.html#predefined_functions)

### 2. 取消在第一列注释

> 取消 Comment At First Line 

在 v8 版本的时候可以设置   `File > Settings > Editor > Code Style > PHP (or whatever) > Other`  , 取消勾选  `Line comment at first column`

![](https://file.wulicode.com/notion/3e/3efc510342b8b2263939ec2af523c889.png)

在  `v2020`  版本之后需要在  `PHP (or whatever) > Code Generation > Comment Code`  部分

![](https://file.wulicode.com/notion/ff/ff5161529be1293c6fc0ec6e0823b9ab.png)

**参考**

- [php - How can I get PhpStorm to comment a line at the beginning of the text and not line? - Stack Overflow](https://stackoverflow.com/questions/27433509/how-can-i-get-phpstorm-to-comment-a-line-at-the-beginning-of-the-text-and-not-li)

