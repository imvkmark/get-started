# 使用 Sphinx 来撰写技术文档

> 以下所有的操作都基于 python3, 也就是 pip3

## 认识 Sphinx

[Sphinx](http://sphinx-doc.org/) 是一个基于 Python 的文档生成项目。最早只是用来生成 [Python](https://docs.python.org/3/)
的项目文档，使用 _reStructuredText_ 格式。但随着项目的逐渐完善，很多非 Python 的项目也采用 Sphinx 作为文档写作工具，甚至完全可以用
Sphinx 来写书。

使用 [Sphinx 生成文档的优点](http://sphinx-doc-zh.readthedocs.org/en/latest/)包括：

- _丰富的输出格式_: 支持输出为 HTML（包括 Windows 帮助文档），LaTeX（可以打印PDF版本）, manual pages（man 文档）, 纯文本等若干种格式；
- _完备的交叉引用_: 语义化的标签，并可以自动化链接函数、类、引文、术语等；
- _明晰的分层结构_: 轻松定义文档树，并自动化链接同级/父级/下级文章；
- _美观的自动索引_: 可自动生成美观的模块索引；
- _精确的语法高亮_: 基于 Pygments 自动生成语法高亮；
- _开放的扩展_: 支持代码块的自动测试，自动包含 Python 的模块自述文档，等等。

## 初始化

### 1) 安装 Sphinx

Sphinx 依赖于 Python，并提供了 Python 包，所以使用 pip3 安装既可。这里我只安装了 `sphinx` 这个包。

```
# Sphinx
$ brew install python3
$ pip3 install -U Sphinx
```

这时，通过 bash 自动补全（连续两下 `tab`），可以看到有几个命令，Sphinx 推荐使用 `sphinx-quickstart`，这是一个设置向导。

```
$ sphinx-
sphinx-apidoc      sphinx-autogen     sphinx-build       sphinx-quickstart
```

### 2) 快速设置并创建 html

运行 `sphinx-quickstart`，以下主要设置项目名称，作者名称以及语言（`zh_CN`）即可，其他默认。

```
$ sphinx-quickstart
```

接下来会让你选择一些配置： 1). 设置文档的根路径（回车，使用默认设置）

```
欢迎使用 Sphinx 2.4.4 快速配置工具。
请输入接下来各项设置的值（如果方括号中指定了默认值，直接
按回车即可使用默认值）。
已选择根路径：.
```

2). 是否分离source和build目录（输入y,选择分离，n:不分离(默认)）

```
布置用于保存 Sphinx 输出的构建目录，有两种选择。
一是在根路径下创建“_build”目录，二是在根路径下创建“source”
和“build”两个独立的目录。
> 独立的源文件和构建目录（y/n） [n]:
```

3). 输入项目名称和作者

```
项目名称会出现在文档的许多地方。
> 项目名称: Demo Sphinx Doc
> 作者名称: Duoli
> 项目发行版本 []: 1.0.0
```

4). 文档语言（回车，默认即可）

```
If the documents are to be written in a language other than English,
you can select a language here by its language code. Sphinx will then
translate text that it generates into that language.
For a list of supported codes, see
https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-language.
> 项目语种 [en]: zh_CN
```

5). 完成设定

```
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

```
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

```
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

```
$ make html
# alt way
$ sphinx-build -b html source build
```

生成后的文档位于build/html文件夹内，用浏览器打开index.html即可看到生成后的文档。

然后直接在浏览器中打开 `build/html/index.html` 这个文件。

![image.png](https://file.wulicode.com/yuque/202208/04/23/001428rRrLnr.png?x-oss-process=image/resize,h_222)

## 其他配置项

### 1) 更换主题并设置

安装扩展

```
# theme
$ pip3 install sphinx_rtd_theme
```

默认风格为 `alabaster`，可以改成 ReadTheDocs 的风格： `sphinx_rtd_theme`。

文件 : _conf.py_

```
#
# html_theme = 'alabaster'
# readthedoc 风格的主题
html_theme = 'sphinx_rtd_theme'
```

这样重新运行下 `make html` 便可以生成新主题

更多的主题可以在 [sphinx-themes.org](https://sphinx-themes.org/) 这个网站上查找

![image.png](https://file.wulicode.com/yuque/202208/04/23/0015ArJksFED.png?x-oss-process=image/resize,h_321)

### 2) 支持 MarkDown 解析

安装 recommonmark 插件

```
# support markdown
$ pip3 install --upgrade recommonmark
```

配置加入 `recommonmark` 解析

文件 : _conf.py_

```
# 扩展, 解析markdown
extensions = [
    ...
    'recommonmark',
    ...
]
```

### 3) 新加入 RST 文档以及使用

我们以以下文档为例：

文件 : _demo.rst_

```
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

```
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

![image.png](https://file.wulicode.com/yuque/202208/04/23/0015UYJvndNp.png?x-oss-process=image/resize,h_539)

### 4) 加入 Markdown 文档

我们编辑一下文件并将文件加入 _index.rst_ _demo-md.md_

```
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

![image.png](https://file.wulicode.com/yuque/202208/04/23/0016tFIxBa27.png?x-oss-process=image/resize,h_529)

### 5) 加入 markdown 表格的支持

在文件中 _demo-md.md_ 中加入表格

```
...
| column1 | column2 | column3 |
|---------|---------|---------|
| row1    | row2    | row3    |
...
```

编译生成之后出现的表格是错乱的

![image.png](https://file.wulicode.com/yuque/202208/04/23/0017yBYBANgo.png?x-oss-process=image/resize,h_286)

这里我们需要安装扩展 [sphinx-markdown-tables](https://pypi.org/project/sphinx-markdown-tables/)

**安装扩展**

```
$ pip3 install sphinx-markdown-tables
```

添加 `sphinx_markdown_tables` 到 `conf.py` 的 `extensions` 部分, 如下:

```
extensions = [
    ...
    'sphinx_markdown_tables',
    ...
]
```

重新编译即可显示正确的表格样式

![image.png](https://file.wulicode.com/yuque/202208/04/23/0017ATHX36Pi.png?x-oss-process=image/resize,h_271)

### 6) 支持中文搜索(jieba)

默认下不支持中文搜索, 这里我们需要安装另外一个扩展 `jieba` 来支持中文搜索

安装 `jieba` 库

```
$ pip3 install jieba
```

修改 _conf.py_, 使其支持 中文搜索, 在 html 部分加入

```
# Language to be used for generating the HTML full-text search index.
# Sphinx supports the following languages:
#   'da', 'de', 'en', 'es', 'fi', 'fr', 'hu', 'it', 'ja'
#   'nl', 'no', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'
html_search_language = 'zh'
```

这样便可以支持中文搜索

![image.png](https://file.wulicode.com/yuque/202208/04/23/00196Wx4HGGm.png?x-oss-process=image/resize,h_163)

### 7). 支持 jsx 代码高亮

```
$ pip install jsx-lexer
```

这种支持 sphinx 样式的代码高亮

## 存在问题(QA)

### 1) [未解决]Mac 时候的搜索问题

在 Mac 搜索的时候无法在描述区域显示搜索结果

![image.png](https://file.wulicode.com/yuque/202208/04/23/0019JV94zxZT.png?x-oss-process=image/resize,h_384)

### 2) [未解决]搜索的时候无法显示所有匹配结果并跳转

![image.png](https://file.wulicode.com/yuque/202208/04/23/0020f0xYa9Kq.png?x-oss-process=image/resize,h_218)

### 3) 字体设置

使用  `fc-list`  来获取字体信息，修改相应字体设置即可。

```
$ brew install fontconfig
$ fc-list :lang=zh
```

### 4) 在线托管 ReadTheDocs

[ReadTheDocs](https://readthedocs.org/)  可是直接用于托管 sphinx 生成的网页文档。 将之前的文档用 Git 管理，并推送到
Github，然后在 ReadTheDocs 中  `Import a Project`  即可。

另外，可以设置自定义域名：

1. 在域名管理中添加 DNS 的 CNAME 记录到 `readthedocs.io` ，比如 `onebook.qiwihui.com`
2. 在项目的 `Admin` -> `Domains` 中设置上一步添加的域名，开启 HTTPS，保存即可。

## 参考

简单过了一下整个文档的流程，总体来说，Sphinx非常适合用来编写项目文档，reStructuredText 比起 Markdown 也有太多的优势，值得推荐。

- [使用 Sphinx 撰写技术文档并生成 PDF 总结](https://juejin.im/post/5c7253c2e51d4512543327b4)

