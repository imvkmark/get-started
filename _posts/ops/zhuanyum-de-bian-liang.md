---
title: " 「转+」Yum 的变量"
date: 2021-06-26 10:31:24
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

原文地址 : [Yum的变量](http://www.opstool.com/article/294)

新机器使用yum出现了报错,发现本来应该替换的`$releasever`变量变成了`%24releasever`

>  http://mirrors.aliyun.com/centos/%24releasever/addons/x86_64/repodata/repomd.xml:  [Errno 14] HTTP Error 404: Not Found  Trying other mirror.  Error:  Cannot retrieve repository metadata (repomd.xml)  for repository: addons.  Please verify its path and  try again


下面我们来看看这个是怎么回事，最好的参考文档当然是man，通过`man yum.conf` 查看这个`$releasever`




```
$releasever This will be replaced with the value of the version of the package listed in distroverpkg.  This defaults to the ver- sion of ‘redhat-release’  package. 
$arch This will be replaced with your architecture as listed by os.uname()[4]  in  Python. 
$basearch This will be replaced with your base architecture in yum.  For example,  if your $arch is i686 your  $basearch  will  be
i386. 
$YUM0-$YUM9 These will be replaced with the value of the shell environment variable of the same name.  If the shell environment
variable does not exist then the configuration file variable will not be replaced.
```

可以看到 yum中有这几个变量: `$releaserver`、`$arch`、`$basearch` 和用户自定义的 `$YUM0-$YUM9`。


有一个简单的python命令可以看到yum的 releaserver、arch、basearch的值

```
/usr/bin/python -c 'import yum, pprint; yb = yum.YumBase(); pprint.pprint(yb.conf.yumvar, width=1)'
```

对于Yum正常的机器，releaserver变量都有定义

```
{'arch':  'ia32e',  'basearch':  'x86_64',  'releasever':  '5'}
```

而对于今天Yum有问题的机器，releasever没有定义

```
{'arch':  'ia32e',  'basearch':  'x86_64',  'releasever':  '$releasever'}
```

变量$releasever 的值来自 `distroverpkg` ，下面我们找一下 `distroverpkg`是怎么来的，还是在`man yum.conf`手册中。

```
distroverpkg The  package used by yum to determine the "version" of the distribution.  This can be any installed package.  Default  is  ‘redhat-release’.  You can see what provides this manually by  using:  "yum whatprovides redhat-release".
```

`distroverpkg` 定义了一个包名，通过这个包命，执行`yum whatprovides $distroverpkg` yum就知道了系统的发行版本。


这里默认的值是redhat-release。

对于正常的CentOS系统。执行`yum whatprovides redhat-release` 可以看到结果

```
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
 * remi-safe: mirrors.tuna.tsinghua.edu.cn
centos-release-7-7.1908.0.el7.centos.x86_64 : CentOS Linux release file
源    ：base
匹配来源：
提供    ：redhat-release = 7.7-10



centos-release-7-7.1908.0.el7.centos.x86_64 : CentOS Linux release file
源    ：@base
匹配来源：
提供    ：redhat-release = 7.7-10
```

而对于今天遇到的yum有问题的机器，执行这个命令则没有结果。

