---
description: '软件版本号规范应遵循语义化版本（SemVer）原则，通常采用主版本号.次版本号.修订号格式。当发生不兼容API更改时进位主版本号，新增功能向后兼容时进位次版本号，进行bug修复时进位修订号。参考GitHub起草的规范可确保版本演进逻辑清晰。'
lastUpdated: '2026-06-18 06:40:01'
head:
  - - meta
    - name: 'og:title'
      content: '软件版本号规范 该如何顺理成章的进位'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '软件版本号规范应遵循语义化版本（SemVer）原则，通常采用主版本号.次版本号.修订号格式。当发生不兼容API更改时进位主版本号，新增功能向后兼容时进位次版本号，进行bug修复时进位修订号。参考GitHub起草的规范可确保版本演进逻辑清晰。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//development/software/spec/semver.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/6ce91929c4e11a6140a019a50d7aeaed.jpg'
---
# 软件版本号规范 该如何顺理成章的进位

在定义版本号时，为了查看 `git tag` 方便，设置了 `1.0.9` 版本之后的版本号为

```Plaintext
1.0.91
```

这样的好处是，tag展示顺序该版本号是在**最下面**的

```Plaintext
>git tag
1.0.1
1.0.2
...
1.0.9
1.0.91
```

此种方式会造成**认知负担**，让同事不知所云，从0-9，但在**9突然来了个91**……好吧，我想不会只有我会犯这样的问题。更好的做法是

```Plaintext
1.0.10
```

简单易懂

至于如何按顺序查看tag，如下（Windows系统不支持，Mac和Linux可以尝试）

```Plaintext
>git tag | sort -V
1.0.1
...
1.0.9
1.0.10
```

## 关于版本号规范 推荐参考Github起草的

![](https://file.wulicode.com/feishu-images/6ce91929c4e11a6140a019a50d7aeaed.jpg)

[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)