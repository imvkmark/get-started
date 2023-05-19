---
title: "什么是repo文件？"
date: 2018-05-25 13:29:34
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

repo文件是Fedora中yum源（软件仓库）的配置文件，通常一个repo文件定义了一个或者多个软件仓库的细节内容，例如我们将从哪里下载需要安装或者升级的软件包，repo文件中的设置内容将被yum读取和应用！

YUM的工作原理并不复杂，每一个 RPM软件的头（header）里面都会纪录该软件的依赖关系，那么如果可以将该头的内容纪录下来并且进行分析，可以知道每个软件在安装之前需要额外安装哪些基础软件。也就是说，在服务器上面先以分析工具将所有的RPM档案进行分析，然后将该分析纪录下来，只要在进行安装或升级时先查询该纪录的文件，就可以知道所有相关联的软件。

所以YUM的基本工作流程如下：

- 服务器端：<br />在服务器上面存放了所有的RPM软件包，然后以相关的功能去分析每个RPM文件的依赖性关系，将这些数据记录成文件存放在服务器的某特定目录内。

- 客户端：<br />如果需要安装某个软件时，先下载服务器上面记录的依赖性关系文件(可通过WWW或FTP方式)，通过对服务器端下载的纪录数据进行分析，然后取得所有相关的软件，一次全部下载下来进行安装。




## Part 1 - `/etc/yum.conf`

- `[main]`

- `cachedir=/var/cache/yum`

cachedir：yum缓存的目录，yum在此存储下载的rpm包和数据库，一般是/var/cache/yum。

- `debuglevel=2`<br />debuglevel：除错级别，0──10,默认是2 貌似只记录安装和删除记录

- `logfile=/var/log/yum.log`

- `pkgpolicy=newest`<br />pkgpolicy： 包的策略。一共有两个选项，newest和last，这个作用是如果你设置了多个repository，而同一软件在不同的repository中同时存 在，yum应该安装哪一个，如果是newest，则yum会安装最新的那个版本。如果是last，则yum会将服务器id以字母表排序，并选择最后的那个 服务器上的软件安装。一般都是选newest。

- `distroverpkg=centos-release`<br />指定一个软件包，yum会根据这个包判断你的发行版本，默认是redhat-release，也可以是安装的任何针对自己发行版的rpm包。

- `tolerant=1`<br />tolerent，也有1和0两个选项，表示yum是否容忍命令行发生与软件包有关的错误，比如你要安装1,2,3三个包，而其中3此前已经安装了，如果你设为1,则yum不会出现错误信息。默认是0。

- `exactarch=1`<br />exactarch，有两个选项1和0,代表是否只升级和你安装软件包cpu体系一致的包，如果设为1，则如你安装了一个i386的rpm，则yum不会用1686的包来升级。

- `retries=20`<br />retries，网络连接发生错误后的重试次数，如果设为0，则会无限重试。

- `obsoletes=1`

- `gpgcheck=1`<br />gpgchkeck= 有1和0两个选择，分别代表是否是否进行gpg校验，如果没有这一项，默认是检查的。

- `reposdir=/etc/yy.rm` #默认是 /etc/yum.repos.d/ 低下的 xx.repo后缀文件<br />默认都会被include 进来 也就是说 /etc/yum.repos.d/xx.repo 无论配置文件有多少个 每个里面有多少个[name] 最后其实都被整合到 一个里面看就是了 重复的[name]后面的覆盖前面的

- `exclude=xxx`<br />exclude 排除某些软件在升级名单之外，可以用通配符，列表中各个项目要用空格隔开，这个对于安装了诸如美化包，中文补丁的朋友特别有用。

- `keepcache=[1 or 0]`<br />设置 keepcache=1，yum 在成功安装软件包之后保留缓存的头文件 (headers) 和软件包。默认值为 keepcache=0 不保存

- `reposdir=[包含 .repo 文件的目录的绝对路径]`<br />该选项用户指定 .repo 文件的绝对路径。.repo 文件包含软件仓库的信息 (作用与 /etc/yum.conf 文件中的 [repository] 片段相同)。



## Part 2 - `/etc/yum.repos.d/xx.repo`
下面以一份系统自带的repo文件做为实例来探讨：

- `[fedora]`<br />方括号里面的是软件源的名称，将被yum取得并识别

- `name=Fedora $releasever - $basearch`<br />这里也定义了软件仓库的名称，通常是为了方便阅读配置文件，一般没什么作用<br />`$releasever` 变量定义了发行版本，通常是8，9，10等数字<br />`$basearch` 变量定义了系统的架构，可以是i386、x86_64、ppc等值<br />这两个变量根据当前系统的版本架构不同而有不同的取值，这可以方便yum升级的时候选择适合当前系统的软件包

- `failovermethod=priority`<br />failovermethod 有两个值可以选择<br />priority是默认值，表示从列出的baseurl中顺序选择镜像服务器地址<br />roundrobin表示在列出的服务器中随机选择

- `exclude=compiz* *compiz* fusion-icon*`<br />exclude这个选项是后来我自己加上去的，用来禁止这个软件仓库中的某些软件包的安装和更新，可以使用通配符，并以空格分隔，可以视情况需要自行添加

- `baseurl=http://download.fedoraproject.org/pub/fedora/linux/releases/$releasever/Everything/$basearch/os/`<br />指定一个baseurl（源的镜像服务器地址）

- `mirrorlist=http://mirrors.fedoraproject.org/mirrorlist?repo=fedora-$releasever&arch=$basearch`<br />这一行是指定一个镜像服务器的地址列表，通常是开启的，我们可以试试，将 `$releasever` 和 `$basearch` 替换成自己对应的版本和架构，例如10和i386，在浏览器中打开，我们就能看到一长串镜可用的镜像服务器地址列表。<br />选择自己访问速度较快的镜像服务器地址复制并粘贴到repo文件中，我们就能获得较快的更新速度了，格式如下baseurl所示：


```ini
baseurl=
ftp://ftp.sfc.wide.ad.jp/pub/Linux/Fedora/releases/10/Everything/i386/os
http://ftp.chg.ru/pub/Linux/fedora/linux/releases/10/Everything/i386/os
http://ftp.yz.yamagata-u.ac.jp/pub/linux/fedora/linux/releases/10/Everything/i386/os
http://mirror.nus.edu.sg/fedora/releases/10/Everything/i386/os
http://mirror.yandex.ru/fedora/linux/releases/10/Everything/i386/os
http://ftp.twaren.net/Linux/Fedora/linux/releases/10/Everything/i386/os
http://ftp.itu.edu.tr/Mirror/Fedora/linux/releases/10/Everything/i386/os
```

- `enabled=1`<br />这个选项表示这个repo中定义的源是启用的，0为禁用

- `gpgcheck=1`<br />这个选项表示这个repo中下载的rpm将进行gpg的校验，已确定rpm包的来源是有效和安全的

- `gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$basearch`<br />定义用于校验的gpg密钥


通过这个实例的说明，相信大家都会觉得，其实fedora的repo文件真是很简单，有了一个初步的认识了之后，我们就可以修改我们自己的repo文件以达到加速的目的了，一些与repo相关的yum故障，我们也可以排查了！<br />本文只是简单的抛砖引玉，不足之处颇多，如果需要了解更多关于yum配置文件的资料，运行命令：`man yum.conf` 获得更多资料，如果与本文有冲突之处以man为准！


## 附录


### 参考文章

- [认识repo文件](http://bbs.fedora-zh.org/showthread.php?1376-%E5%B8%A6%E4%BD%A0%E8%AE%A4%E8%AF%86repo%E6%96%87%E4%BB%B6)

- [linux yum的配置文件 repo文件详解](http://tiancong.blog.51cto.com/783138/666734)

