# 「转」Pipenv：新一代Python项目环境与依赖管理工具

::: info 原作者

[李辉](https://www.zhihu.com/people/im-greyli)

:::

![image.png](https://file.wulicode.com/yuque/202210/11/15/2012TuU5AA8p.png?x-oss-process=image/resize,h_232)

## 什么是Pipenv

[Pipenv](https://docs.pipenv.org/)是Kenneth
Reitz在2017年1月发布的Python依赖管理工具，现在由PyPA维护。你可以把它看做是pip和virtualenv的组合体，而它基于的[Pipfile](target=https://github.com/pypa/pipfile)
则用来替代旧的依赖记录方式（requirements.txt）。

在这篇文章里，我将会以旧的依赖管理工作流程作为对比来介绍Pipenv的基本用法，更详细的用法可以参考[Pipenv文档](https://docs.pipenv.org/)
，或是Kenneth Reitz在PyCon
2018的演讲[《Pipenv: The Future of Python Dependency Management》](https://www.youtube.com/watch%3Fv%3DGBQAKldqgZs)。

顺便说一句，[《Flask Web开发实战》](https://zhuanlan.zhihu.com/p/29907260)中所有示例程序都使用了Pipenv进行依赖管理。

提示 如果你对virtualenv的用法以及虚拟环境的概念不熟悉的话，可以通过专栏的旧文[《Flask出发之旅》](https://zhuanlan.zhihu.com/p/23299058)进行简单的认识。

## 为什么使用Pipenv

Pipenv会自动帮你管理虚拟环境和依赖文件，并且提供了一系列命令和选项来帮助你实现各种依赖和环境管理相关的操作。简而言之，它更方便、完善和安全。你可以通过[Pipenv文档](https://docs.pipenv.org/)
开头的介绍来了解它的详细特性。Pipenv的slogan是“Python Dev Workflow for Humans”，作为人类，当然应该尝试一下……

## 如何使用Pipenv

假设我们要编写一个博客程序，项目的依赖是Flask和Flask-WTF。顺便说一句，可以使用下面的命令安装Pipenv：

```
$ pip install pipenv
```

下面我会通过不同操作来给出所需命令的对比，OLD（旧）表示使用pip和virtualenv，NEW（新）表示使用Pipenv。

**创建虚拟环境**

- OLD

```
$ virtualenv venv 
```

提示 这里的venv是虚拟环境目录的名称，你可以自由更改，这会在你的项目根目录创建一个venv文件夹，其中包含独立的Python解释器环境。

- NEW

```
$ pipenv install
```

Pipenv会自动为你创建虚拟环境，自动生成一个随机的虚拟环境目录名。

**激活虚拟环境**

- OLD

在Linux或macOS系统中：

```
$ . venv/bin/activate
```

Windows：

```
> venv\Scripts\activate
```

- NEW

```
$ pipenv shell
```

此外，Pipenv还提供了一个`pipenv run`
命令，在该命令后附加的参数会直接作为命令在虚拟环境中执行，这允许你不必显式的激活虚拟环境即可在虚拟环境中执行命令。比如，`pipenv run python`会启动虚拟环境中的Python解释器。

**安装依赖到虚拟环境**

- OLD

```
$ . venv/bin/activate  
# 需要先激活虚拟环境 (venv)
$ pip install flask flask-wtf  
```

- NEW

使用Pipenv，不管你是否激活了虚拟环境，都可以通过pipenv install命令安装：

```
$ pipenv install flask flask-wtf  
```

事实上，对一个新项目来说，你不必手动使用`pipenv install`来创建虚拟环境。当使用`pipenv install xxx`直接安装依赖包时，如果当前目录不包含虚拟环境，Pipenv会自动创建一个。

**记录依赖**

- OLD

```
(venv)$ pip freeze > requirements.txt
```

这个命令会把依赖列表写入requirements.txt文件。每当你安装或卸载了依赖包时，都需要手动更新这个文件。你必须保持谨慎，否则非常容易把依赖列表弄乱。

- NEW

使用Pipenv时，什么都不必做，Pipenv会自动帮你管理依赖。Pipenv会在你创建虚拟环境时自动创建Pipfile和Pipfile.lock文件（如果不存在），并且会在你使用`pipenv install`
和`pipenv uninstall`命令安装和卸载包时自动更新`Pipfile`和`Pipfile.lock`。

附注 Pipfile用来记录项目依赖包列表，而Pipfile.lock记录了固定版本的详细依赖包列表。

**在部署环境安装依赖**

- OLD

当我们需要在一个新的环境，比如部署上线环境安装所有依赖时，我们需要重复上面的多条命令：

```
$ virtualenv venv  # 创建虚拟环境 
$ . venv/bin/activate  # 激活虚拟环境 (venv)
$ pip install -r requirements.txt  # 安装requirement.txt中记录的依赖
```

- NEW

使用Pipenv则只需要执行pipenv install，它会自动安装Pipfile中记录的依赖：

```
$ pipenv install
```

**区分开发依赖**

- OLD

使用requirements.txt时，我们通过会单独创建一个`requirements-dev.txt`文件来手动加入开发依赖。比如项目开发时才会用到pytest，那么你需要手动创建这个文件，然后写入：

-r requirements.txt pytest==1.2.3

在新的开发环境安装依赖时，你需要安装这个文件中的依赖：

```
(venv)$ pip install -r requirements-dev.txt
```

- NEW

使用Pipenv时，你只需要在安装pytest时添加一个--dev选项，它会自动被分类为开发依赖（写入Pipfile的`dev-packages`一节中）：

```
$ pipenv install pytest --dev
```

在新的开发环境安装依赖时，也只需要在pipenv install命令后添加--dev选项即可一并安装开发依赖：

```
$ pipenv install --dev
```

## 总结

为了让你更轻松的过渡，`Pipenv`甚至提供了读取和生成`requirements.txt`文件的功能（在使用pipenv install命令时它会自动读取`requirements.txt`
文件安装依赖并生成`Pipfile`文件）。希望这篇文章可以让你更快的上手`Pipenv`。

## 评论区Q&A

### Q：安装Python包太慢？

A：Pipenv本身就是基于Pip，所以也可以更换PyPI源。只需要在Pipfile中更换对应的url即可。比如，下面的Pipfile使用阿里云提供的镜像源：

```
[[source]] 
url = "https://mirrors.aliyun.com/pypi/simple" 
verify_ssl = true 
name = "pypi"
```

除了修改Pipfile，你也可以在执行安装命令时通过--pypi-mirror选项指定PyPI源，比如：

```
$ pipenv install --pypi-mirror https://mirrors.aliyun.com/pypi/simple
```

设置环境变量`PIPENV_PYPI_MIRROR`效果相同。

### Q：生成Pipfile.lock太慢？

A：不像`npm`等依赖管理工具（依赖通过纯文本定义），对于Python包，如果你要获取详细的依赖情况，需要下载安装包并执行`setup.py`
文件，所以会耗费一定时间。通常来说，更换PyPI源已经可以大幅提升速度。如果你仍然不想等待生成Pipfile.lock的时间，那么可以在执行`pipenv install`命令时添加`--skip-lock`
选项来跳过lock步骤，最后使用`pipenv lock`命令来统一执行lock操作。

### Q：自定义虚拟环境文件夹路径

A：默认情况下，Pipenv会自动为你选择虚拟环境的存储位置，在Windows下通常为`C:\Users\Administrator\.virtualenvs\`，而Linux或macOS则为`~/.local/share/virtualenvs/`
。如果你想将虚拟环境文件夹在项目目录内创建，可以设置环境变量`PIPENV_VENV_IN_PROJECT`，这时名为`.venv`
的虚拟环境文件夹将在项目根目录被创建。另外你也可以通过`WORKON_HOME`环境变量来自定义存储路径。

