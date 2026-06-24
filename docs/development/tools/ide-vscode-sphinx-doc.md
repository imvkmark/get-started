---
description: '将VSCode配置为Sphinx-doc编辑器时，需处理rst语言支持：解决doc8的“D001 Line Too Long”警告；实现语法脚本支持、RST实时预览及图片粘贴功能。'
lastUpdated: '2026-06-22 17:47:38'
head:
  - - meta
    - name: 'og:title'
      content: '将 Vscode 配置为 sphinx-doc 的趁手编辑器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '将VSCode配置为Sphinx-doc编辑器时，需处理rst语言支持：解决doc8的“D001 Line Too Long”警告；实现语法脚本支持、RST实时预览及图片粘贴功能。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//development/tools/ide-vscode-sphinx-doc.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/7fe4845f9adc8d03f7f3909bef167a4e.jpg'
---
# 将 Vscode 配置为 sphinx-doc 的趁手编辑器

## rst 语言支持

安装插件 [reStructuredText](https://marketplace.visualstudio.com/items?itemName=lextudio.restructuredtext)

### 1) QA: doc8 warns “D001 Line Too Long”

doc8 检测行的长度, 并且推荐最大的长度为 79 字符.

有几种方法可以改变这个设定

```Plaintext
--max-line-length int
```

你可以指定一个整数值，而不是79, 这样来关闭这个提示

```Plaintext
--ignore D001
```

取消对于 `D001` 错误的提示, 这个参数设定可以传递给 doc8 的命令行,可以如下配置

```JSON
{
    "restructuredtext.linter.extraArgs": [
        "--ignore D001"
    ]
}
```

### 2) 支持的语法脚本

如果出现 `...filename.md: WARNING: 未知的 Pygments 词法分析器 'jsx'`, 我们可以安装 jsx 语法的提示器

```Plaintext
$ pip install jsx-lexer
```

## RST 预览

> rst 预览的流程是, 配置解析器, 编译生成 html, 渲染 html 展示

安装插件 [Preview](https://marketplace.visualstudio.com/items?itemName=searKing.preview-vscode)

配置 Python 的解析器 `查看 - 命令面板`, 输入 `python:`

![](https://file.wulicode.com/feishu-images/7fe4845f9adc8d03f7f3909bef167a4e.jpg)

选择合适的解析器

![](https://file.wulicode.com/feishu-images/8709c8bcf8523e06a8d69ea1caa1d0d8.jpg)

这里根据自己 python 版本来选择使用哪个来作为解析器, 然后点击右上角预览便可以进行演示

![](https://file.wulicode.com/feishu-images/bae4399ac182286c42457886c993bfaf.jpg)

## 图片粘贴

安装插件 [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)

安装之后可以使用 `alt + cmd + v` 来将图片直接粘贴到编辑器中,直接粘贴的图片默认位置和命名并不符合我们的要求, 所以需要重新进行配置

配置日期的参考文档: [Moment 格式](https://momentjs.com/docs/#/displaying/format/)

```JSON
{
    "settings": {
        "pasteImage.basePath": "${projectRoot}",
        "pasteImage.defaultName": "Y/MMDD/HHmmss",
        "pasteImage.prefix": ".. image:: /",
        "pasteImage.path": "${projectRoot}/_static/images/",
        "pasteImage.encodePath": "none"
    }
}
```

这样我们粘贴图片的之后就可以直接将文件粘贴到 `/_static/images/2020/0131/191053.png` 类似目录下