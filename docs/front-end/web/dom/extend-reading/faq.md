---
description: 'QQ浏览器中，当`options.headers`是`Headers`实例时，使用展开运算符`...`可能将内部`map`属性复制到对象中，导致出现非预期的`map`字段。触发场景：调用方传入`new Headers({''X-Custom'': ''value''})`。'
lastUpdated: '2026-07-01 08:18:11'
head:
  - - meta
    - name: 'og:title'
      content: 'Web Dom API - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'QQ浏览器中，当`options.headers`是`Headers`实例时，使用展开运算符`...`可能将内部`map`属性复制到对象中，导致出现非预期的`map`字段。触发场景：调用方传入`new Headers({''X-Custom'': ''value''})`。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/web/dom/extend-reading/faq.html'
---
# Web Dom API - FAQ

## Headers

### headers 出现 map 场景

> 环境 : QQ 浏览器

headers.map 出现的情况是：当 `options.headers` 是一个 Headers 实例（Web API）而不是普通对象时。

**原因分析**

Headers 是浏览器的 Web API 类，内部使用类似 Map 的结构存储键值对。当你对 Headers 实例使用展开运算符 ... 时：

```JavaScript
options.headers = {
        ...options.headers,  // 如果这是 Headers 实例
        ...headers,
}
```

某些环境下（特别是 polyfill 或特定浏览器实现），展开操作可能会将 Headers 内部的 map 属性也复制出来，导致最终对象包含一个非预期的 map 字段。

**触发场景**

当调用方这样传入 headers 时：

```JavaScript
useAppFetch('/api/xxx', {
    headers: new Headers({ 'X-Custom': 'value' })  // 传入 Headers 实例
})
```