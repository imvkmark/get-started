---
description: 'WebStorm插件与FAQ：支持识别以@开头的UMI别名相对路径，可切换颜色值显示，但不提供Node.js等语法提示和代码补全功能。'
lastUpdated: '2026-07-01 13:28:02'
head:
  - - meta
    - name: 'og:title'
      content: 'Webstorm - 插件和 FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'WebStorm插件与FAQ：支持识别以@开头的UMI别名相对路径，可切换颜色值显示，但不提供Node.js等语法提示和代码补全功能。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/javascript/primer/webstorm-faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/c77fd969e144d41e9c6086def2534218.gif'
---
# Webstorm - 插件和 FAQ

## FAQ

### 识别 UMI 以 @ 开头别名的相对路径

新建 `jsconfig.json`

```Bash
{
    "compilerOptions": {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist",
        ".umi"
    ]
}
```

放到 根目录下即可

### 切换颜色值

颜色值可以在 hsl, rgb, hwb 之间更换

![](https://file.wulicode.com/feishu-images/c77fd969e144d41e9c6086def2534218.gif)

### 不支持 nodejs 等语法提示和补全

下载 node 语法库(使用最常用的工具来安装即可)

```Bash
$ yarn add @types/node -D
```