# 更换镜像, 加速 python 安装

## 镜像列表

pipy 国内镜像目前有：

```
https://pypi.doubanio.com/simple               豆瓣
https://mirrors.bfsu.edu.cn/pypi/web/simple    中国科学技术大学
https://pypi.tuna.tsinghua.edu.cn/simple       教育网
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
https://mirrors.aliyun.com/pypi/simple         阿里云
```

对于 pip 这种在线安装的方式来说，很方便，但网络不稳定的话很要命。使用国内镜像相对好一些，使用 `easy_install` 和 `pip` 会让 Python
的模块安装和管理变得非常简单，但是，如果你身在国内的话，从官方的镜像下载的速度是很令人抓狂的事情，如同修改 `apt-get` 或 `yum` 的镜像地址一样，`easy_install` 和 `pip`
也需要修改镜像地址。修改`easy_install` 和 `pip` 的镜像地址通常可以有以下两种方法，可以分别使用命令和配置方式实现。

## 手动指定

如果想手动指定源，可以在 pip 后面跟-i 来指定源，比如用豆瓣的源来安装 `web.py` 框架：

```
# pip
$ pip install web.py -i https://pypi.douban.com/simple
# easy_install:
$ easy_install fabric -i https://e.pypi.python.org/simple
```

注意后面要有 `/simple` 目录

## 通过配置文件修改

**pip** 要配制成默认的话，需要创建或修改配置文件（linux 的文件在 `~/.pip/pip.conf`，windows 在`%HOMEPATH%\pip\pip.ini`），修改内容为：

```
[global]
index-url = https://pypi.douban.com/simple
[install]
trusted-host=mirrors.aliyun.com
```

这样在使用 pip 来安装时，会默认调用该镜像

- 方法 2: 配置方式修改

**easy_install:** 打开 pydistutils.cfg

```
vi ~/.pydistutils.cfg
```

写入以下内容

```
[easy_install]
index_url = https://e.pypi.python.org/simple
```

## 常见问题

### 更新 pip / 升级 pip3

```
$ pip3 install --upgrade pip
```

## 参考

- [更多配置参数见](https://pip.pypa.io/en/latest/user_guide/#configuration)
- [使用国内镜像源来加速 python pypi 包的安装](http://topmanopensource.iteye.com/blog/2004853)