---
description: 'CSS通过阶梯灰度实现深色与浅色模式切换，适用于代练通活动背景，提供灵活、高适配的视觉效果。'
lastUpdated: '2026-07-01 08:19:08'
head:
  - - meta
    - name: 'og:title'
      content: 'Css - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'CSS通过阶梯灰度实现深色与浅色模式切换，适用于代练通活动背景，提供灵活、高适配的视觉效果。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/web/css/extend-reading/faq.html'
---
# Css - FAQ

## Css 支持深色模式和浅色模式的切换(支持阶梯灰度)

Css 设定变量

```Plaintext
:root[theme="dark"] {
    --wc-text-color: var(--wc-color-dark-blue);
    --wc-link-active-color: var(--wc-color-primary);
    --wc-bg-color: @textLightColor;
}
```

动态添加样式

```JavaScript
document.documentElement.setAttribute('theme', 'dark');
```

参考

[https://codepen.io/SitePoint/embed/eLBzxJ](https://codepen.io/SitePoint/embed/eLBzxJ)

## 代练通的一个活动背景画背景方案

[http://www.dailiantong.com/activity/halloween.aspx](http://www.dailiantong.com/activity/halloween.aspx)