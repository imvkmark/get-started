---
description: '移除多页的Tab和面包屑，通过前缀生成侧边导航类名，并处理固定状态。批量获取样式配置对象，遍历检查自定义属性并赋值。调整副作用函数，优化全局字体和样式。'
lastUpdated: '2026-06-21 20:30:30'
head:
  - - meta
    - name: 'og:title'
      content: 'TDesign Snippets'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '移除多页的Tab和面包屑，通过前缀生成侧边导航类名，并处理固定状态。批量获取样式配置对象，遍历检查自定义属性并赋值。调整副作用函数，优化全局字体和样式。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//front-end/web/framework/tdesign/tdesign-snippets.html'
---
# TDesign Snippets

## Header

## LayoutContent

- [ ] 移除多页的Tab, Source

- [ ] 移除面包屑, Source

类名称生成的片段

```TypeScript
[
  `${prefix}-side-nav`,
  {
    [`${prefix}-side-nav-no-fixed`]: !isFixed,
    [`${prefix}-side-nav-mix-fixed`]: layout === 'mix' && isFixed,
  },
];
```

批量获取值并赋值

```TypeScript
const initStyleConfig = () => {
    const styleConfig = STYLE_CONFIG;
    for (const key in styleConfig) {
        // 检测一个对象中是否含有自定义属性
        if (Object.prototype.hasOwnProperty.call(styleConfig, key)) {
            // 设置 KEY 的数据
            (styleConfig[key as keyof typeof STYLE_CONFIG] as any) = settingStore[key as keyof typeof STYLE_CONFIG];
        }
    }
    return styleConfig;
};
```

- [ ] 副作用函数以及作用

- [ ] 调整全局的字体和样式

- [ ] 对模块的注册进行拆离