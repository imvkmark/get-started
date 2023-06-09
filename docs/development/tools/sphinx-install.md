# 安装 Sphinx(Python Documentation Generator)

## 概述

Sphinx是用 [Python](https://docs.python-guide.org/) 编写的，支持Python 3.5+。

## Linux

### Debian / Ubuntu

使用**apt-get**安装`python3-sphinx`（Python 3）或`python-sphinx`（Python 2）：

```
$ apt-get install python3-sphinx
```

如果没有正确安装，这将为你安装 Python。

### RHEL, CentOS

使用**yum**安装 `python-sphinx`

```
$ yum install python-sphinx
```

如果没有正确安装，这将为您安装Python。

### 其他发行版

大多数Linux发行版都在其软件包存储库中安装了Sphinx。通常包名称会是`python3-sphinx`，`python-sphinx`或者`sphinx`。请注意，`sphinx`其名称中至少还有两个其他软件包：语音识别工具包（
_CMU Sphinx_）和全文搜索数据库（_Sphinx搜索_）。

## MAC OS

可以使用[Homebrew](https://brew.sh/)，[MacPorts](https://www.macports.org/)
或作为Python发行版的一部分安装Sphinx,（如[Anaconda](https://www.anaconda.com/download/#macos)） 。

### Homebrew

```
$ brew install sphinx-doc
```

有关更多信息，请参阅[包概述](https://formulae.brew.sh/formula/sphinx-doc)。

### MacPorts

使用**port**安装`python36-sphinx`（Python 3）或`python27-sphinx`（Python 2）：

```
$ sudo port install py36-sphinx
```

要设置可执行路径，请使用以下命令：`port select`

```
$ sudo port select --set python python36
$ sudo port select --set sphinx py36-sphinx
```

有关更多信息，请参阅[包概述](https://www.macports.org/ports.php?by=library&substr=py36-sphinx)。

### Anaconda

```
$ conda install sphinx
```

## Windows

> ToDo 我们可以开始打包吗？

大多数Windows用户默认没有安装Python，因此我们首先安装Python本身。如果您不确定，请打开_命令提示符_（⊞Win-r并键入**cmd**）。打开命令提示符后，键入**python –version**
并按Enter键。如果Python可用，您将看到在屏幕上打印的Python版本。如果您没有安装Python，请参阅[Python 安装指南](https://docs.python-guide.org/)
。您需要安装[Python 3](https://docs.python-guide.org/starting/install3/win/)。

安装Python后，您可以使用**pip**安装Sphinx 。有关更多信息，请参阅下面的[pip安装说明](http://www.sphinx-doc.org/en/master/usage/installation.html#install-pypi)。

## 从PyPI安装

Sphinx包发布在[Python Package Index](https://pypi.org/project/Sphinx/)。从_PyPI_安装软件包的首选工具是**pip**。此工具随Python的所有现代版本一起提供。

在Linux或MacOS上，可以打开终端并运行以下命令。

```
$ pip install -U sphinx
```

在Windows上，您应该打开_命令提示符_（⊞Win-r并键入 **cmd**）并运行相同的命令。

```
C:\> pip install -U sphinx
```

安装后，在命令提示符下键入**sphinx-build –version**。如果一切正常，您将看到刚安装的Sphinx软件包的版本号。

从_PyPI_安装还允许你安装最新的开发版本。您通常不需要（或想要）这样做，但如果你在最新的稳定版本中看到可能的错误提示，这个便会很有用。如果安装最新版，请使用`--pre`标志。

```
$ pip install -U --pre sphinx
```

## 从源码安装

您可以直接从[Git存储库](https://github.com/sphinx-doc/sphinx)的克隆安装Sphinx 。这可以通过克隆repo并从本地克隆安装，只需通过**git**直接安装即可完成。

```
$ git clone https://github.com/sphinx-doc/sphinx
$ cd sphinx
$ pip install .
```

```
$ pip install git+https://github.com/sphinx-doc/sphinx
```

您还可以下载[tar.gz](https://github.com/sphinx-doc/sphinx/archive/master.tar.gz)或 [zip](https://github.com/sphinx-doc/sphinx/archive/master.zip)
格式的Git仓库快照。下载并解压缩后，可以像上面一样使用**pip**进行安装 。

