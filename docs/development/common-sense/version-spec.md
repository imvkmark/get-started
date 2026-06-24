---
description: '在定义版本号时，为了查看 git tag 方便，设置了 1.0.9 版本之后的版本号为这样的好处是，tag展示顺序该版本号是在最下面的此种方式会造成认知负担，让同事不知所云，从0-9，但在9突然来了个91……好吧，我想不会只有我会犯这样的问题。更好的做法是简单易懂至于如何按顺序查看tag，如下（Windows系统不支持，Mac和Linux可以尝试）'
lastUpdated: '2025-12-06 11:24:00'
head: 
  - - meta
    - name: 'og:title'
      content: '软件版本号规范 : 该如何顺理成章的进位'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在定义版本号时，为了查看 git tag 方便，设置了 1.0.9 版本之后的版本号为这样的好处是，tag展示顺序该版本号是在最下面的此种方式会造成认知负担，让同事不知所云，从0-9，但在9突然来了个91……好吧，我想不会只有我会犯这样的问题。更好的做法是简单易懂至于如何按顺序查看tag，如下（Windows系统不支持，Mac和Linux可以尝试）'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/common-sense/version-spec.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/b7/b768e611b204314ee7b3409404cabcfc.jpeg?x-oss-process=image/resize,m_mfit,w_400'
---
# 软件版本号规范 : 该如何顺理成章的进位



在定义版本号时，为了查看  `git tag`  方便，设置了  `1.0.9`  版本之后的版本号为

```
1.0.91
```

这样的好处是，tag展示顺序该版本号是在 **最下面** 的

```
>git tag
1.0.1
1.0.2
...
1.0.9
1.0.91
```

此种方式会造成 **认知负担** ，让同事不知所云，从0-9，但在 **9突然来了个91** ……好吧，我想不会只有我会犯这样的问题。更好的做法是

```
1.0.10
```

简单易懂

至于如何按顺序查看tag，如下（Windows系统不支持，Mac和Linux可以尝试）

```
>git tag | sort -V
1.0.1
...
1.0.9
1.0.10
```

## 关于版本号规范 推荐参考Github起草的

![](https://file.wulicode.com/notion/b7/b768e611b204314ee7b3409404cabcfc.jpeg)

🔗 https://semver.org/lang/zh-CN/



