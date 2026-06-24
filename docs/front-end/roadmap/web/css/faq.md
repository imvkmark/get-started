---
description: 'Css 设定变量动态添加样式参考http://www.dailiantong.com/activity/halloween.aspx'
lastUpdated: '2025-12-18 18:38:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Css - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Css 设定变量动态添加样式参考http://www.dailiantong.com/activity/halloween.aspx'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/web/css/faq.html'
---
# Css - FAQ



## Css 支持深色模式和浅色模式的切换(支持阶梯灰度)

Css 设定变量

```less
:root[theme="dark"] {
    --wc-text-color: var(--wc-color-dark-blue);
    --wc-link-active-color: var(--wc-color-primary);
    --wc-bg-color: @textLightColor;
}
```

动态添加样式

```javascript
document.documentElement.setAttribute('theme', 'dark');
```

参考

<iframe style="height:400px;width:100%;border:none;" src="https://codepen.io/SitePoint/embed/eLBzxJ"></iframe>

## 代练通的一个活动背景画背景方案

[http://www.dailiantong.com/activity/halloween.aspx](http://www.dailiantong.com/activity/halloween.aspx)

