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

```jsx
document.documentElement.setAttribute('theme', 'dark');
```

参考

[点击查看【codepen】](https://codepen.io/SitePoint/embed/eLBzxJ)
