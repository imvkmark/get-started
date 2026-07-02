---
description: '本文介绍了使用Sphinx撰写技术文档的流程：安装Sphinx、快速初始化并生成HTML，以及配置主题、Markdown支持、中文搜索、代码高亮等。同时提及了常见问题（如Mac搜索显示异常）及在线托管于ReadTheDocs。'
lastUpdated: '2026-07-02 18:40:20'
head:
  - - meta
    - name: 'og:title'
      content: '使用 Sphinx 来撰写技术文档'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了使用Sphinx撰写技术文档的流程：安装Sphinx、快速初始化并生成HTML，以及配置主题、Markdown支持、中文搜索、代码高亮等。同时提及了常见问题（如Mac搜索显示异常）及在线托管于ReadTheDocs。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/python/extend-reading/sphinx-write-document.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/f3e55ec8844695f28f7ac072f2084c53.png'
---
# 使用 Sphinx 来撰写技术文档

> 以下所有的操作都基于 python3, 也就是 pip3

## 认识 Sphinx

[Sphinx](http://sphinx-doc.org/) 是一个基于 Python 的文档生成项目。最早只是用来生成 [Python](https://docs.python.org/3/) 的项目文档，使用 *reStructuredText* 格式。但随着项目的逐渐完善，很多非 Python 的项目也采用 Sphinx 作为文档写作工具，甚至完全可以用 Sphinx 来写书。使用 [Sphinx 生成文档的优点](http://sphinx-doc-zh.readthedocs.org/en/latest/)包括：

- *丰富的输出格式*: 支持输出为 HTML（包括 Windows 帮助文档），LaTeX（可以打印PDF版本）, manual pages（man 文档）, 纯文本等若干种格式；
- *完备的交叉引用*: 语义化的标签，并可以自动化链接函数、类、引文、术语等；
- *明晰的分层结构*: 轻松定义文档树，并自动化链接同级/父级/下级文章；
- *美观的自动索引*: 可自动生成美观的模块索引；
- *精确的语法高亮*: 基于 Pygments 自动生成语法高亮；
- *开放的扩展*: 支持代码块的自动测试，自动包含 Python 的模块自述文档，等等。

## 初始化

### 1) 安装 Sphinx

Sphinx 依赖于 Python，并提供了 Python 包，所以使用 pip3 安装既可。这里我只安装了 `sphinx` 这个包。

```Plaintext
# Sphinx
$ brew install python3
$ pip3 install -U Sphinx
```

这时，通过 bash 自动补全（连续两下 `tab`），可以看到有几个命令，Sphinx 推荐使用 `sphinx-quickstart`，这是一个设置向导。

```Plaintext
$ sphinx-
sphinx-apidoc      sphinx-autogen     sphinx-build       sphinx-quickstart
```

### 2) 快速设置并创建

html 运行 `sphinx-quickstart`，以下主要设置项目名称，作者名称以及语言（`zh_CN`）即可，其他默认。

```Plaintext
$ sphinx-quickstart
```

接下来会让你选择一些配置：

1). 设置文档的根路径（回车，使用默认设置）

```Plaintext
欢迎使用 Sphinx 2.4.4 快速配置工具。
请输入接下来各项设置的值（如果方括号中指定了默认值，直接
按回车即可使用默认值）。
已选择根路径：.
```

2). 是否分离source和build目录（输入y,选择分离，n:不分离(默认)）

```Plaintext
布置用于保存 Sphinx 输出的构建目录，有两种选择。
一是在根路径下创建“_build”目录，二是在根路径下创建“source”
和“build”两个独立的目录。
> 独立的源文件和构建目录（y/n） [n]:
```

3). 输入项目名称和作者

```Plaintext
项目名称会出现在文档的许多地方。
> 项目名称: Demo Sphinx Doc
> 作者名称: Duoli
> 项目发行版本 []: 1.0.0
```

4). 文档语言（回车，默认即可）

```Plaintext
If the documents are to be written in a language other than English,
you can select a language here by its language code. Sphinx will then
translate text that it generates into that language.
For a list of supported codes, see
https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-language.
> 项目语种 [en]: zh_CN
```

5). 完成设定

```Plaintext
创建文件 ./conf.py。
创建文件 ./index.rst。
创建文件 ./Makefile。
创建文件 ./make.bat。
完成：已创建初始目录结构。
你现在可以填写主文档文件 ./index.rst 并创建其他文档源文件了。 用 Makefile 构建文档，像这样：
 make builder
此处的“builder”是支持的构建器名，比如 html、latex 或 linkcheck。
```

**解释1: ，整个设置过程包括**

1. 是否分离源文件目录 `source` 和生成文件目录 `build`，默认否；
2. 项目名称, 项目作者, 项目版本，默认为空；
3. 项目语言，默认为 `en`, 可以设置为 `zh`；

**解释2，项目目录文件结构如下**

```Plaintext
sphinx-doc
├── Makefile
├── build
├── make.bat
├── _static
├── _templates
├── conf.py
└── index.rst
```

其中：

- `Makefile`：可以看作是一个包含指令的文件，在使用 make 命令时，可以使用这些指令来构建文档输出。
- `build`：生成的文件的输出目录。
- `make.bat`：Windows 用命令行。
- `_static`：静态文件目录，比如图片等。
- `_templates`：模板目录。
- `conf.py`：存放 Sphinx 的配置，包括在 `sphinx-quickstart` 时选中的那些值，可以自行定义其他的值。
- `index.rst`：文档项目起始文件。

接下来看看默认生成的内容：

```Plaintext
$ make html
正在运行 Sphinx v2.3.1
正在加载翻译 [zh]... 完成
制作输出目录... 完成
构建 [mo]： 0 个 po 文件的目标文件已过期
构建 [html]： 1 个源文件的目标文件已过期
更新环境: [新配置] 已添加 1，0 已更改，0 已移除
阅读源... [100%] index
查找当前已过期的文件... 没有找到
pickling环境... 完成
检查一致性... 完成
准备文件... 完成
写入输出... [100%] index
generating indices...  genindex完成
writing additional pages...  search完成
复制静态文件... ... 完成
copying extra files... 完成
dumping search index in Chinese (code: zh)... 完成
dumping object inventory... 完成
构建 成功.
HTML 页面保存在 _build/html 目录。
```

### 3) 生成 Html 文档

这里有两种方法来生成 html 文档

```Plaintext
$ make html
# alt way
$ sphinx-build -b html source build
```

生成后的文档位于build/html文件夹内，用浏览器打开index.html即可看到生成后的文档。

然后直接在浏览器中打开

```Plaintext
build/html/index.html
```

这个文件。

![](https://file.wulicode.com/feishu-images/f3e55ec8844695f28f7ac072f2084c53.png)

## 其他配置项

### 1) 更换主题并设置 安装扩展

```Plaintext
# theme
$ pip3 install sphinx_rtd_theme
```

默认风格为 `alabaster`，可以改成 ReadTheDocs 的风格： `sphinx_rtd_theme`。文件 : *conf.py*

```Plaintext
#
# html_theme = 'alabaster'
# readthedoc 风格的主题
html_theme = 'sphinx_rtd_theme'
```

这样重新运行下

```Plaintext
make html
```

便可以生成新主题

更多的主题可以在 [sphinx-themes.org](https://sphinx-themes.org/) 这个网站上查找

![](https://file.wulicode.com/feishu-images/32dc109ec97a50427466a7ddbfb82d72.png)

### 2) 支持 MarkDown 解析 安装 recommonmark 插件

```Plaintext
# support markdown
$ pip3 install --upgrade recommonmark
```

配置加入 `recommonmark` 解析文件 : *conf.py*

```Plaintext
# 扩展, 解析markdown
extensions = [
    ...
    'recommonmark',
    ...
]
```

### 3) 新加入 RST 文档以及使用

我们以以下文档为例：文件 : *demo.rst*

```Plaintext
This is a Title
===============
That has a paragraph about a main subject and is set when the '='
is at least the same length of the title itself.
Subject Subtitle
----------------
Subtitles are set with '-' and are required to have the same length
of the subtitle itself, just like titles.
Lists can be unnumbered like:
 * Item Foo
 * Item Bar
Or automatically numbered:
 #. Item 1
 #. Item 2
Inline Markup
-------------
Words can have *emphasis in italics* or be **bold** and you can define
code samples with back quotes, like when you talk about a command: ``sudo``
gives you super user powers!
```

修改 `index.rst` 为:

```Plaintext
Welcome to Demo Sphinx Doc's documentation!
==================================
.. toctree::
   :maxdepth: 2
   :caption: 目录:
   demo.rst
Indices and tables
==================
* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
```

重新编译，这时文档已经改变。

![](https://file.wulicode.com/feishu-images/6068ec0b821fc7683ce53f68e7f6e8e9.png)

### 4) 加入 Markdown 文档

我们编辑一下文件并将文件加入 *index.rst* *demo-md.md*

```Plaintext
# This is a Md Title
That has a paragraph about a main subject and is set when the '='
is at least the same length of the title itself.
## Subject Subtitle
Subtitles are set with '-' and are required to have the same length
of the subtitle itself, just like titles.
Lists can be unnumbered like:
 * Item Foo
 * Item Bar
## Inline Markup
Words can have *emphasis in italics* or be **bold** and you can define
code samples with back quotes, like when you talk about a command: ``sudo``
gives you super user powers!
```

查看Mardown 文件的预览

![](https://file.wulicode.com/feishu-images/79cf1fab31b5519264f4a62cb658eb77.png)

### 5) 加入 markdown 表格的支持

在文件中 *demo-md.md* 中加入表格

```Plaintext
...
| column1 | column2 | column3 |
|---------|---------|---------|
| row1    | row2    | row3    |
...
```

编译生成之后出现的表格是错乱的

![](https://file.wulicode.com/feishu-images/408b9ff1852d9d3894aa14038c44b3d9.png)

这里我们需要安装扩展 [sphinx-markdown-tables](https://pypi.org/project/sphinx-markdown-tables/)**安装扩展**

```Plaintext
$ pip3 install sphinx-markdown-tables
```

添加 `sphinx_markdown_tables` 到 `conf.py` 的 `extensions` 部分, 如下:

```Plaintext
extensions = [
    ...
    'sphinx_markdown_tables',
    ...
]
```

重新编译即可显示正确的表格样式

![](https://file.wulicode.com/feishu-images/71bd61a9626694cace5d8d9c96bca5ec.png)

### 6) 支持中文搜索(jieba)

默认下不支持中文搜索, 这里我们需要安装另外一个扩展 `jieba` 来支持中文搜索安装 `jieba` 库

```Plaintext
$ pip3 install jieba
```

修改 *conf.py*, 使其支持 中文搜索, 在 html 部分加入

```Plaintext
# Language to be used for generating the HTML full-text search index.
# Sphinx supports the following languages:
#   'da', 'de', 'en', 'es', 'fi', 'fr', 'hu', 'it', 'ja'
#   'nl', 'no', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'
html_search_language = 'zh'
```

这样便可以支持中文搜索

![](https://file.wulicode.com/feishu-images/3886f5ab52241401bb6d716e0603fc7b.png)

### 7). 支持 jsx 代码高亮

```Plaintext
$ pip install jsx-lexer
```

这种支持 sphinx 样式的代码高亮

## 存在问题(QA)

### 1) [未解决]Mac 时候的搜索问题 在 Mac 搜索的时候无法在描述区域显示搜索结果

![](https://file.wulicode.com/feishu-images/b33703c9a5c2e9cd3feaa427f9efe05d.png)

### 2) [未解决]搜索的时候无法显示所有匹配结果并跳转

![](https://file.wulicode.com/feishu-images/44897299525a9b8a37b10531b3cdf842.png)

### 3) 字体设置 使用

```Plaintext
fc-list
```

来获取字体信息，修改相应字体设置即可。

```Plaintext
$ brew install fontconfig
$ fc-list :lang=zh
```

### 4) 在线托管 ReadTheDocs

[ReadTheDocs](https://readthedocs.org/)  可是直接用于托管 sphinx 生成的网页文档。 将之前的文档用 Git 管理，并推送到 Github，然后在 ReadTheDocs 中  `Import a Project`  即可。另外，可以设置自定义域名：

1. 在域名管理中添加 DNS 的 CNAME 记录到 `readthedocs.io` ，比如 `onebook.qiwihui.com`
2. 在项目的 `Admin` -> `Domains` 中设置上一步添加的域名，开启 HTTPS，保存即可。 ## 参考 简单过了一下整个文档的流程，总体来说，Sphinx非常适合用来编写项目文档，reStructuredText 比起 Markdown 也有太多的优势，值得推荐。

## 将 Vscode 配置为 sphinx-doc 的趁手编辑器

### rst 语言支持

安装插件 [reStructuredText](https://marketplace.visualstudio.com/items?itemName=lextudio.restructuredtext)

#### 1) QA: doc8 warns “D001 Line Too Long”

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

#### 2) 支持的语法脚本

如果出现 `...filename.md: WARNING: 未知的 Pygments 词法分析器 'jsx'`, 我们可以安装 jsx 语法的提示器

```Plaintext
$ pip install jsx-lexer
```

### RST 预览

> rst 预览的流程是, 配置解析器, 编译生成 html, 渲染 html 展示

安装插件 [Preview](https://marketplace.visualstudio.com/items?itemName=searKing.preview-vscode)

配置 Python 的解析器 `查看 - 命令面板`, 输入 `python:`

![](https://file.wulicode.com/feishu-images/7fe4845f9adc8d03f7f3909bef167a4e.jpg)

选择合适的解析器

![](https://file.wulicode.com/feishu-images/8709c8bcf8523e06a8d69ea1caa1d0d8.jpg)

这里根据自己 python 版本来选择使用哪个来作为解析器, 然后点击右上角预览便可以进行演示

![](https://file.wulicode.com/feishu-images/bae4399ac182286c42457886c993bfaf.jpg)

### 图片粘贴

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

## 参考

- [使用 Sphinx 撰写技术文档并生成 PDF 总结](https://juejin.im/post/5c7253c2e51d4512543327b4)