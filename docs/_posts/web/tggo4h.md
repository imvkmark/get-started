---
title: "Css 中的变量设定"
date: 2022-04-20 22:47:25
toc: true
categories:
- ["前端","Css"]
---

Css 设定变量


```less
:root[theme="dark"] {
    --wc-text-color: var(--wc-color-dark-blue);
    --wc-link-active-color: var(--wc-color-primary);
    --wc-bg-color: @textLightColor;
}
```

动态添加样式

```jsx
document.documentElement.setAttribute('theme', 'dark');
```

参考


[点击查看【codepen】](https://codepen.io/SitePoint/embed/eLBzxJ)

