---
description: 'PHP的SPL扩展提供一组标准接口，如Countable（实现count方法）、OuterIterator、RecursiveIterator、SeekableIterator等，方便迭代器与数组操作。'
lastUpdated: '2026-06-17 18:01:50'
head:
  - - meta
    - name: 'og:title'
      content: 'SPL - 接口'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHP的SPL扩展提供一组标准接口，如Countable（实现count方法）、OuterIterator、RecursiveIterator、SeekableIterator等，方便迭代器与数组操作。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/refs/other/interface.html'
---
# SPL - 接口

1. Countable

继承了Countable 的类可以使用count函数来调用 类中的count 方法

```PHP
Countable {
    /* 方法 */
    abstract public int count ( void )
}
```

示例:

[http://php.net/manual/en/class.countable.php](http://php.net/manual/en/class.countable.php)

1. OuterIterator
2. RecursiveIterator
3. SeekableIterator