---
description: 'Pipenv是新一代Python项目环境与依赖管理工具，整合pip和virtualenv，通过Pipfile和Pipfile.lock自动管理虚拟环境与依赖，确保项目可复现构建，简化开发流程。'
lastUpdated: '2026-07-02 21:46:52'
head:
  - - meta
    - name: 'og:title'
      content: 'pipenv：新一代Python项目环境与依赖管理工具'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Pipenv是新一代Python项目环境与依赖管理工具，整合pip和virtualenv，通过Pipfile和Pipfile.lock自动管理虚拟环境与依赖，确保项目可复现构建，简化开发流程。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/python/primer/pipenv-get-started.html'
---
# pipenv：新一代Python项目环境与依赖管理工具

::: info ℹ️

原作者 : <a href="https://www.zhihu.com/people/im-greyli">李辉</a>

:::

## **什么是Pipenv**

[Pipenv](https://link.zhihu.com/?target=https%3A//docs.pipenv.org/) 是 Kenneth Reitz 在2017年1月发布的 Python 依赖管理工具，现在由 PyPA 维护。你可以把它看做是 pip 和 virtualenv 的组合体，而它基于的 [Pipfile](https://github.com/pypa/pipfile) 则用来替代旧的依赖记录方式`requirements.txt`。

在这篇文章里，我将会以旧的依赖管理工作流程作为对比来介绍Pipenv的基本用法，更详细的用法可以参考[Pipenv文档](https://link.zhihu.com/?target=https%3A//docs.pipenv.org/)，或是Kenneth Reitz在PyCon 2018的演讲[《Pipenv: The Future of Python Dependency Management》](https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3DGBQAKldqgZs)。

顺便说一句，[《Flask Web开发实战》](https://zhuanlan.zhihu.com/p/29907260)中所有示例程序都使用了Pipenv进行依赖管理。

提示 如果你对 virtualenv 的用法以及虚拟环境的概念不熟悉的话，可以通过专栏的旧文[《Flask出发之旅》](https://zhuanlan.zhihu.com/p/23299058)进行简单的认识。

## **为什么使用Pipenv**

Pipenv会自动帮你管理虚拟环境和依赖文件，并且提供了一系列命令和选项来帮助你实现各种依赖和环境管理相关的操作。简而言之，它更方便、完善和安全。你可以通过 [Pipenv文档](https://link.zhihu.com/?target=https%3A//docs.pipenv.org/) 开头的介绍来了解它的详细特性。Pipenv的slogan是“Python Dev Workflow for Humans”，作为人类，当然应该尝试一下……

## **如何使用Pipenv**

假设我们要编写一个博客程序，项目的依赖是Flask和Flask-WTF。顺便说一句，可以使用下面的命令安装 Pipenv：

```Plaintext
$ pip install pipenv
```

**创建虚拟环境**

```Plaintext
$ pipenv install
```

Pipenv会自动为你创建虚拟环境，自动生成一个随机的虚拟环境目录名。

**激活虚拟环境**

```Plaintext
$ pipenv shell
```

此外，Pipenv还提供了一个 `pipenv run` 命令，在该命令后附加的参数会直接作为命令在虚拟环境中执行，这允许你不必显式的激活虚拟环境即可在虚拟环境中执行命令。比如，`pipenv run python`会启动虚拟环境中的Python解释器。

**安装依赖到虚拟环境**

使用Pipenv，不管你是否激活了虚拟环境，都可以通过pipenv install命令安装：

```Plaintext
$ pipenv install flask flask-wtf
```

事实上，对一个新项目来说，你不必手动使用 `pipenv install` 来创建虚拟环境。当使用 `pipenv install xxx` 直接安装依赖包时，如果当前目录不包含虚拟环境，Pipenv会自动创建一个。

**记录依赖**

使用 Pipenv 时，什么都不必做，Pipenv 会自动帮你管理依赖。Pipenv 会在你创建虚拟环境时自动创建 Pipfile 和 Pipfile.lock 文件（如果不存在），并且会在你使用 `pipenv install` 和 `pipenv uninstall` 命令安装和卸载包时自动更新 `Pipfile` 和 `Pipfile.lock`。附注 Pipfile用来记录项目依赖包列表，而 `Pipfile.lock` 记录了固定版本的详细依赖包列表。

**在部署环境安装依赖**

使用 Pipenv 则只需要执行 pipenv install，它会自动安装 Pipfile 中记录的依赖：

```Plaintext
$ pipenv install
```

**区分开发依赖**

使用 Pipenv 时，你只需要在安装 pytest 时添加一个 `–-dev` 选项，它会自动被分类为开发依赖（写入Pipfile的`dev-packages`一节中）：

```Plaintext
$ pipenv install pytest --dev
```

在新的开发环境安装依赖时，也只需要在pipenv install命令后添加–dev选项即可一并安装开发依赖：

```Plaintext
$ pipenv install --dev
```

## **总结**

为了让你更轻松的过渡，`Pipenv` 甚至提供了读取和生成 `requirements.txt` 文件的功能（在使用pipenv install命令时它会自动读取 `requirements.txt` 文件安装依赖并生成 `Pipfile` 文件）。希望这篇文章可以让你更快的上手`Pipenv`。

## **评论区Q&A**

### Q：安装Python包太慢？

A：Pipenv本身就是基于Pip，所以也可以更换PyPI源。只需要在Pipfile中更换对应的url即可。比如，下面的Pipfile使用阿里云提供的镜像源：

```Plaintext
[[source]]
url = "https://mirrors.aliyun.com/pypi/simple"
verify_ssl = true
name = "pypi"
```

除了修改Pipfile，你也可以在执行安装命令时通过–pypi-mirror选项指定PyPI源，比如：

```Plaintext
$ pipenv install --pypi-mirror https://mirrors.aliyun.com/pypi/simple
```

设置环境变量 `PIPENV_PYPI_MIRROR` 效果相同。

### Q：生成 Pipfile.lock 太慢？

A：通常来说，更换PyPI源已经可以大幅提升速度。在开发过程中已经不推荐使用 `--skip-lock` 所以耐心等待一会是很有必要的

> The flag `--skip-lock` has been deprecated for removal. Without running the lock resolver it is not possible to manage multiple package indexes. Additionally it bypasses the build consistency guarantees provided by maintaining a lock file.

### Q：自定义虚拟环境文件夹路径

A：默认情况下，Pipenv会自动为你选择虚拟环境的存储位置，在Windows下通常为`C:\Users\Administrator\.virtualenvs\`，而Linux或macOS则为`~/.local/share/virtualenvs/`。如果你想将虚拟环境文件夹在项目目录内创建，可以设置环境变量 `PIPENV_VENV_IN_PROJECT` ，这时名为`.venv`的虚拟环境文件夹将在项目根目录被创建。另外你也可以通过 `WORKON_HOME` 环境变量来自定义存储路径