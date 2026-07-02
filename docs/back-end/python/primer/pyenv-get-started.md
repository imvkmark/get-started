---
description: 'pyenv用于管理Python版本，支持安装、切换及卸载。通过官方bash github installer安装，常用命令包括查看已安装/可安装版本、切换版本。配合pyenv-virtualenv可创建、列出和删除虚拟环境。常见问题有安装缓慢、SSL模块缺失、模块未找到、patch命令缺失等。'
lastUpdated: '2026-07-02 21:46:59'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ 使用 pyenv 管理 Python 版本 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'pyenv用于管理Python版本，支持安装、切换及卸载。通过官方bash github installer安装，常用命令包括查看已安装/可安装版本、切换版本。配合pyenv-virtualenv可创建、列出和删除虚拟环境。常见问题有安装缓慢、SSL模块缺失、模块未找到、patch命令缺失等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/python/primer/pyenv-get-started.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ab25a7121eaaadf54f2cff0009bc77f1.png'
---
# ⚠️ 使用 pyenv 管理 Python 版本

::: warning ⚠️
<p>Deprecated, 推荐使用 <a href="https://www.wulicode.com/back-end/python/primer/uv-get-started.html">uv 的使用</a> 来进行环境管理</p>
:::

> 如果使用多环境推荐使用 pipenv, pyenv 使用方法较为复杂  
> 如果遇到 pip 下载比较慢可以查看 更换镜像源 , 加速 python 安装

目的 :

1. 使用 pyenv 管理多版本 python
2. 使用 virtualenv 管理多版本下的多环境

![](https://file.wulicode.com/feishu-images/ab25a7121eaaadf54f2cff0009bc77f1.png)

[pyenv](https://github.com/yyuu/pyenv) 是 Python 版本管理工具。 pyenv 可以改变全局的 Python 版本，在系统中安装多个版本的 Python， 设置目录级别的 Python 版本，还能创建和管理 virtual python environments 。所有的设置都是用户级别的操作，不需要 sudo 命令。

pyenv 的一个典型使用场景就是，比如一个老项目需要使用 Python 2.x ，而另一个新项目需要 Python 3.x 。而 virtualenv 主要是用来管理相同版本 Python 不同项目的包的依赖不同的问题，就无法解决这个问题，这个时候就需要 pyenv

pyenv 通过修改系统环境变量来实现不同 Python 版本的切换。而 virtualenv 通过将 Python 包安装到一个目录来作为 Python 包虚拟环境，通过切换目录来实现不同包环境间的切换。

pyenv 实现的精髓之处在于，它并没有使用将不同的 `$PATH` 植入不同的 shell 这种高耦合的工作方式，而是简单地在 `$PATH` 的最前面插入了一个垫片路径（shims）：`~/.pyenv/shims:/usr/local/bin:/usr/bin:/bin`。所有对 Python 可执行文件的查找都会首先被这个 shims 路径截获，从而使后方的系统路径失效。

## 安装之前

不同系统请参考 [Common build problems](https://github.com/pyenv/pyenv/wiki/Common-build-problems)，安装必须的工具。

## pyenv 安装

根据官网的 [安装说明](https://github.com/pyenv/pyenv#installation) 或者 [自动安装](https://github.com/yyuu/pyenv-installer)

### 安装 pyenv 程序

如果使用 Mac 直接使用 Homebrew

```Bash
$ brew install pyenv
```

如果是自动安装, 则保障系统中有 git, 可以直接执行命令, 并保障服务器可以链接 github, 如果无法连接, 可以使用 [github520](https://github.com/521xueweihan/GitHub520) 来解决

```Bash
# pyenv 官方 bash
$ curl https://pyenv.run | bash

# github installer
$ curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

在安装之后需要加入自启动, 在 `~/.bash_profile` 或者 `~/.profile` (登录 shell)或者 `~/.bashrc` (活动 shell) 或者 `.zshrc` 中加入以下三行代码

```Bash
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

执行安装后提供了如下工具：`pyenv` : pyenv 工具自身

### 插件

**pyenv-update**

用来更新 pyenv 以及相关的插件

```Bash
$ git clone https://github.com/pyenv/pyenv-update.git $(pyenv root)/plugins/pyenv-update
```

```Plaintext
$ pyenv update
Updating /home/liexiang/.pyenv...
From https://github.com/pyenv/pyenv
 * branch            master     -> FETCH_HEAD
Already up-to-date.
Updating /home/liexiang/.pyenv/plugins/pyenv-update...
From https://github.com/pyenv/pyenv-update
 * branch            master     -> FETCH_HEAD
Already up-to-date.
Updating /home/liexiang/.pyenv/plugins/pyenv-virtualenv...
From https://github.com/pyenv/pyenv-virtualenv
 * branch            master     -> FETCH_HEAD
Already up-to-date.
```

**pyenv-virtualenv**

可以用来管理 virtual environments, 源码地址 : https://github.com/pyenv/pyenv-virtualenv

```Bash
$ git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
```

初始化 `virtualenv`, 在 shell 启动文件中额外添加一行

```Bash
eval "$(pyenv virtualenv-init -)"
```

**pyenv-doctor**

验证 pyenv 和依赖是否安装的插件

```Bash
$ git clone https://github.com/pyenv/pyenv-doctor.git $(pyenv root)/plugins/pyenv-doctor
```

```Bash
$ pyenv doctor
Cloning /home/liexiang/.pyenv/plugins/pyenv-doctor/bin/.....
Installing python-pyenv-doctor...
Installed python-pyenv-doctor to /tmp/pyenv-doctor.20240105173601.165690/prefix
Congratulations! You are ready to build pythons!
```

## pyenv 常用命令

使用 `pyenv commands` 显示所有可用命令

### python 安装与卸载

就如上文所说，`pyenv` 从源码安装 Python, 每一个安装的版本都会在 `pyenv` 根目录的 `versions` 目录下。

```Plaintext
pyenv install 2.7.3   # 安装 python
```

安装后可以检视：

```Plaintext
ls ~/.pyenv/versions/
```

从本机卸载对应版本的 Python 也特别简单：

```Plaintext
pyenv uninstall 2.7.3 # 卸载 python
```

或者直接删除掉 `~/.pyenv/versions/2.7.3` 对应的目录也可以。

```Plaintext
rm -rf ~/.pyenv/versions/2.7.3
```

### 查看本机安装 Python 版本

使用如下命令查看本机安装版本

```Plaintext
pyenv versions
```

星号表示当前正在使用的 Python 版本。使用 `python -V` 确认版本。

### 查看可安装 Python 版本

使用如下命令查看可安装版本

```Plaintext
pyenv install -l
```

### Python 切换

用这些命令可以切换全局或者项目中的 Python 版本：

```Plaintext
pyenv global 2.7.3  # 设置全局的 Python 版本，通过将版本号写入 ~/.pyenv/version 文件的方式。
pyenv local 2.7.3 # 设置 Python 本地版本，通过将版本号写入当前目录下的 .python-version 文件的方式。通过这种方式设置的 Python 版本优先级较 global 高。
```

需同在寻找 python 的时候优先级

```Plaintext
shell > local > global
```

pyenv 会从当前目录开始向上逐级查找 `.python-version` 文件，直到根目录为止。若找不到，就用 global 版本。

```Plaintext
pyenv shell 2.7.3 # 设置面向 shell 的 Python 版本，通过设置当前 shell 的 PYENV_VERSION 环境变量的方式。这个版本的优先级比 local 和 global 都要高。`--unset` 参数可以用于取消当前 shell 设定的版本。
pyenv shell --unset
pyenv rehash  # 创建垫片路径（为所有已安装的可执行文件创建 shims，如：~/.pyenv/versions/*/bin/*，因此，每当你增删了 Python 版本或带有可执行文件的包（如 pip）以后，都应该执行一次本命令）
```

## pyenv-virtualenv

使用**自动安装 pyenv** 后，它会自动安装部分插件，通过 pyenv-virtualenv 插件可以很好的和 virtualenv 结合：

```Plaintext
cd ~/.pyenv/plugins
ll
total 24K
drwxr-xr-x 4 einverne einverne 4.0K Apr 22 10:55 pyenv-doctor
drwxr-xr-x 5 einverne einverne 4.0K Apr 22 10:55 pyenv-installer
drwxr-xr-x 4 einverne einverne 4.0K Apr 22 10:55 pyenv-update
drwxr-xr-x 7 einverne einverne 4.0K Apr 22 10:55 pyenv-virtualenv
drwxr-xr-x 4 einverne einverne 4.0K Apr 22 10:55 pyenv-which-ext
drwxr-xr-x 5 einverne einverne 4.0K Apr 22 10:54 python-build
```

### 创建虚拟环境

```Plaintext
pyenv virtualenv 3.6 env-name
```

若不指定 python 版本，会默认使用当前环境 python 版本。如果指定 Python 版本，则一定要是已经安装过的版本，否则会出错。环境的真实目录位于 `~/.pyenv/versions` 下

### 列出当前虚拟环境

```Plaintext
pyenv virtualenvs
pyenv activate env-name  # 激活虚拟环境
pyenv deactivate #退出虚拟环境，回到系统环境
```

### 删除虚拟环境

```Plaintext
pyenv uninstall env-name
rm -rf ~/.pyenv/versions/env-name  # 或者删除其真实目录
```

使用 pyenv 来管理 python，使用 pyenv-virtualenv 插件来管理多版本 python 包。此时，还需注意，当我们将项目运行的 env 环境部署到生产环境时，由于我们的 python 包是依赖 python 的，需要注意生产环境的 python 版本问题

## 所有命令

```Plaintext
$ pyenv commands
activate
commands
completions
deactivate
doctor
exec
global
help
hooks
init
install
installer
local
offline-installer
prefix
rehash
root
shell
shims
uninstall
update                 # 更新 pyenv 及插件
version
--version
version-file
version-file-read
version-file-write
version-name
version-origin
versions
virtualenv
virtualenv-delete
virtualenv-init
virtualenv-prefix
virtualenvs
whence
which
```

PyCharm 中可以非常方便的切换 Python 环境

## FAQ

### pyenv 安装 python 缓慢

在 `pyenv install -v 3.11.4` 时候，下载安装非常慢。解决方法：创建缓存目录, 在阿里云下载源码, 然后再安装

```Bash
mkdir -p ~/.pyenv/cache
cd ~/.pyenv/cache
wget https://registry.npmmirror.com/-/binary/python/3.11.4/Python-3.11.4.tar.xz
pyenv install 3.11.4
```

### ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?

指定 ssl 的库目录再运行安装 , 这里的命令是 centos7 参考地址 : [Common build problems · pyenv/pyenv Wiki](https://github.com/pyenv/pyenv/wiki/Common-build-problems#1-openssl-is-installed-to-an-uncommon-location)

```Plaintext
CPPFLAGS=-I/usr/include/openssl11 \
LDFLAGS=-L/usr/lib64/openssl11 \
pyenv install -v 3.11.0
```

### 组件丢失, 无法运行 ModuleNotFoundError: No Module named ‘…’

如果没有安装相应的的组件, 出现的后续问题可能如下

```Plaintext
Installing Python-3.11.4...
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/liexiang/.pyenv/versions/3.11.4/lib/python3.11/bz2.py", line 17, in <module>
    from _bz2 import BZ2Compressor, BZ2Decompressor
ModuleNotFoundError: No module named '_bz2'
WARNING: The Python bz2 extension was not compiled. Missing the bzip2 lib?
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/liexiang/.pyenv/versions/3.11.4/lib/python3.11/curses/__init__.py", line 13, in <module>
    from _curses import *
ModuleNotFoundError: No module named '_curses'
WARNING: The Python curses extension was not compiled. Missing the ncurses lib?
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/liexiang/.pyenv/versions/3.11.4/lib/python3.11/ctypes/__init__.py", line 8, in <module>
    from _ctypes import Union, Structure, Array
ModuleNotFoundError: No module named '_ctypes'
WARNING: The Python ctypes extension was not compiled. Missing the libffi lib?
Traceback (most recent call last):
  File "<string>", line 1, in <module>
ModuleNotFoundError: No module named 'readline'
WARNING: The Python readline extension was not compiled. Missing the GNU readline lib?
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/liexiang/.pyenv/versions/3.11.4/lib/python3.11/sqlite3/__init__.py", line 57, in <module>
    from sqlite3.dbapi2 import *
  File "/home/liexiang/.pyenv/versions/3.11.4/lib/python3.11/sqlite3/dbapi2.py", line 27, in <module>
    from _sqlite3 import *
ModuleNotFoundError: No module named '_sqlite3'
WARNING: The Python sqlite3 extension was not compiled. Missing the SQLite3 lib?
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/home/liexiang/.pyenv/versions/3.11.4/lib/python3.11/lzma.py", line 27, in <module>
    from _lzma import *
ModuleNotFoundError: No module named '_lzma'
WARNING: The Python lzma extension was not compiled. Missing the lzma lib?
Installed Python-3.11.4 to /home/liexiang/.pyenv/versions/3.11.4
```

或者

> ModuleNotFoundError: No module named ’\_bz2’

解决方案, 按照上边的不同系统的构架工具进行安装, 不同的devel 包然后重新安装即可

```Bash
dnf install bzip2-devel \
dnf install ncurses-devel \
dnf install libffi-devel \
dnf install readline-devel \
dnf install xz-devel \
dnf install sqlite-devel 
```

### patch: command not found

```Plaintext
Downloading Python-3.6.15.tar.xz...
-> https://www.python.org/ftp/python/3.6.15/Python-3.6.15.tar.xz
Installing Python-3.6.15...
/home/liexiang/.pyenv/plugins/python-build/bin/python-build: line 1775: patch: command not found

BUILD FAILED (Rocky Linux 9.3 using python-build 20180424)
```

切换到 root 用户使用以下命令安装 patch

```Plaintext
$ dnf install patch
```

## 参考

不仅 Python 有 pyenv 可以用来管理 Python 的不同版本，Java，Ruby 也都有相对应的工具。比如说 Java 的 [jenv](https://github.com/jenv/jenv), Ruby 有 [rbenv](https://github.com/rbenv/rbenv)，它们命令的用法也都和 pyenv 相差不多，基本上用了 pyenv，其他几个命令的使用也都水到渠成了

- https://github.com/pyenv/pyenv
- virtualenv 中文文档地址 [http://virtualenv-chinese-docs.readthedocs.io/en/latest/#](http://virtualenv-chinese-docs.readthedocs.io/en/latest/)
- [http://my.oschina.net/lionets/blog/267469](http://my.oschina.net/lionets/blog/267469)
- [https://github.com/yyuu/pyenv-virtualenv](https://github.com/yyuu/pyenv-virtualenv)
- [http://seisman.info/python-pyenv.html](http://seisman.info/python-pyenv.html)