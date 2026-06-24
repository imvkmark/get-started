---
description: '新建 jsconfig.json放到 根目录下即可颜色值可以在 hsl, rgb, hwb 之间更换下载 node 语法库(使用最常用的工具来安装即可)'
lastUpdated: '2025-12-07 09:28:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Webstorm Tips'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '新建 jsconfig.json放到 根目录下即可颜色值可以在 hsl, rgb, hwb 之间更换下载 node 语法库(使用最常用的工具来安装即可)'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/web/ide/webstorm-tips.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/c5/c577c9d3b6373f40cac9a3ea6b6a7a4f.gif?x-oss-process=image/resize,m_mfit,w_400'
---
# Webstorm Tips



## webstorm 识别 UMI 以 @ 开头别名的相对路径

新建  `jsconfig.json`

```shell
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

## 切换颜色值

颜色值可以在 hsl, rgb, hwb 之间更换

![](https://file.wulicode.com/notion/c5/c577c9d3b6373f40cac9a3ea6b6a7a4f.gif)

## 不支持 nodejs 等语法提示和补全

下载 node 语法库(使用最常用的工具来安装即可)

```shell
$ yarn add @types/node -D
```



