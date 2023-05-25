# CentOS 安装 Python

## 安装 pyenv

安装

```shell
$ curl https://pyenv.run | bash
```

添加到环境变量到 `.bashrc`

```
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv virtualenv-init -)"
```

启用

```
$ source ~/.bashrc
```

更新

```
$ pyenv update
```

## 安装编译支持

**开发工具**

```
$ yum groupinstall -y "Development Tools"
```

**openssl**
> 如果没有安装可能会报如下错误
> ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?
> 原因是 python3.7 的 ssl 模块依赖 openssl 1.0.2 或者 1.1 以上版本，如果 openssl 版本低于以上版本，将无法正常安装 python3.7 的 ssl 模块

这里我们安装最新版的 openssl 模块, 下载地址 : [https://www.openssl.org/source/](https://www.openssl.org/source/)

```shell
$ sudo wget https://www.openssl.org/source/openssl-1.1.1l.tar.gz
$ sudo tar -xzvf openssl-1.1.1l.tar.gz
$ cd openssl-1.1.1l
$ sudo ./config --prefix=/usr --openssldir=/usr/openssl shared
$ sudo make
$ sudo make install
```

**开发包**

用于编译的时候对这些功能进行支持

```
$ yum install readline-devel zlib-devel sqlite-devel libffi-devel
```

## 使用 pyenv 安装 最新版

```shell
$ pyenv install --list
...
  3.9.7
  3.9.8
  3.10.0
  3.10-dev
  3.11.0a2
...
$ pyenv install 3.10.0 -vvv
$ pyenv global 3.10.0
$ python3
Python 3.10.0 (default, Nov  8 2021, 08:25:47) [GCC 4.8.5 20150623 (Red Hat 4.8.5-44)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

安装成功

## FAQ

### ModuleNotFoundError: No module named '_ctypes'

> Python3 中有个内置模块叫 ctypes，它是 Python3 的外部函数库模块，它提供兼容 C 语言的数据类型，并通过它调用 Linux 系统下的共享库(Shared library)，此模块需要使用
> CentOS7 系统中外部函数库(Foreign function library)的开发链接库(头文件和链接库)。
> 由于在 CentOS7 系统中没有安装外部函数库(libffi)的开发链接库软件包，所以在安装 pip 的时候就报了"ModuleNotFoundError: No module named '_ctypes'"的错误

```
$  yum install libffi-devel -y
```

然后再重新安装 python3

## 参考

- [pyenv installer](https://github.com/pyenv/pyenv-installer)
- [Centos6.8 ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?](https://blog.csdn.net/wst07261144/article/details/88928487)


