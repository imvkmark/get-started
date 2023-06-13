# Ubuntu Faq

## do-release-upgrade 之后出现的无官方镜像源的提示

我们为了加速云机的软件更新速度, 常常将三方源更新为清华或者阿里云, 并同时禁用掉官方的源, 于是在升级的时候便会有这样的提示

```
Checking package manager
Reading package lists... Done
Building dependency tree
Reading state information... Done

Invalid package information

After updating your package information, the essential package
'ubuntu-minimal' could not be located. This may be because you have
no official mirrors listed in your software sources, or because of
excessive load on the mirror you are using. See /etc/apt/sources.list
for the current list of configured software sources.
In the case of an overloaded mirror, you may want to try the upgrade
again later.
```

解决:

在 `/etc/apt/sources.list`中添加一行

```
deb http://archive.ubuntu.com/ubuntu bionic universe main
```

这里的 bionic 根据系统的版本进行不同的命名替换, 然后再运行即可

```
# do-release-upgrade
```

## 在 Ubuntu 上安装 zeal

**ZEAL** 是一款离线文档浏览器，其灵感来自 OS X平台上的 Dash，目前支持 Window 和 Liunx。基于 QT5。

支持呼出热键。只要按下组合箭 ALT+Space 即可在任何地方显示面板，不用时可以用热键隐藏的系统托盘。

- 可同时搜索多个文档
- 不依赖网络
- GPL 协议开放源码
- Dash 中的文档都可以在 Zeal 中使用。

```
# 加入 库
$ add-apt-repository ppa:zeal-developers/ppa
# 更新
$ apt-get update
# 安装
$ apt-get install zeal
```

在搜索栏中搜索 `zeal`, 就可以打开,然后把快捷方式放入侧边栏. 输入关键词就可以查找相关的文档内容.

![](https://file.wulicode.com/yuque/202208/04/23/0207TYg5oSgR.png?x-oss-process=image/resize,h_499)

打开配置项, 然后在 `Docsets` 栏目中下载相关的文档.

![image.png](https://file.wulicode.com/yuque/202208/04/23/0208NCb3Inzb.png?x-oss-process=image/resize,h_587)

