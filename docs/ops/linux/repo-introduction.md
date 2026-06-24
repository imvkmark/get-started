---
description: 'repo文件：Fedora系统中yum源（软件仓库）的配置文件，可定义1个或多个软件仓库细节，包含软件包下载来源等信息，供yum读取并应用。YUM核心逻辑：基于RPM软件包的“头（header）”信息，该信息记录软件依赖关系，通过分析此信息可明确软件安装/升级前需额外安装的基础软件。YUM工作流程：Part : [main]cachedir=/var/cache/yumcachedir：yum缓存的目录，yum在此存储下载的rpm包和数据库，一般是/var/cache/yum。debuglevel=2debuglevel：除错级别，0──10,默认是2 貌似只记'
lastUpdated: '2025-12-06 08:22:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'repo 文件说明使用和常用源'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'repo文件：Fedora系统中yum源（软件仓库）的配置文件，可定义1个或多个软件仓库细节，包含软件包下载来源等信息，供yum读取并应用。YUM核心逻辑：基于RPM软件包的“头（header）”信息，该信息记录软件依赖关系，通过分析此信息可明确软件安装/升级前需额外安装的基础软件。YUM工作流程：Part : [main]cachedir=/var/cache/yumcachedir：yum缓存的目录，yum在此存储下载的rpm包和数据库，一般是/var/cache/yum。debuglevel=2debuglevel：除错级别，0──10,默认是2 貌似只记'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/os/linux/repo-introduction.html'
---
# repo 文件说明使用和常用源



## 介绍

**repo文件** ：Fedora系统中yum源（软件仓库）的配置文件，可定义1个或多个软件仓库细节，包含软件包下载来源等信息，供yum读取并应用。

**YUM核心逻辑** ：基于RPM软件包的“头（header）”信息，该信息记录软件依赖关系，通过分析此信息可明确软件安装/升级前需额外安装的基础软件。

**YUM工作流程** ：

-  **服务器端** ：存放所有RPM软件包，用工具分析各RPM的依赖关系，将分析结果记录为文件，存于服务器特定目录。
-  **客户端** ：安装软件时，先通过WWW或FTP下载服务器端的依赖关系记录文件，分析后获取所有相关软件，一次性下载并安装。

### Part 1 -  `/etc/yum.conf` 

Part :  `[main]`

`cachedir=/var/cache/yum`

cachedir：yum缓存的目录，yum在此存储下载的rpm包和数据库，一般是/var/cache/yum。

`debuglevel=2`

debuglevel：除错级别，0──10,默认是2 貌似只记录安装和删除记录

`logfile=/var/log/yum.log`

`pkgpolicy=newest`

pkgpolicy： 包的策略。一共有两个选项，newest和last，这个作用是如果你设置了多个repository，而同一软件在不同的repository中同时存 在，yum应该安装哪一个，如果是newest，则yum会安装最新的那个版本。如果是last，则yum会将服务器id以字母表排序，并选择最后的那个 服务器上的软件安装。一般都是选newest。

`distroverpkg=centos-release`

指定一个软件包，yum会根据这个包判断你的发行版本，默认是redhat-release，也可以是安装的任何针对自己发行版的rpm包。

`tolerant=1`

tolerent，也有1和0两个选项，表示yum是否容忍命令行发生与软件包有关的错误，比如你要安装1,2,3三个包，而其中3此前已经安装了，如果你设为1,则yum不会出现错误信息。默认是0。

`exactarch=1`

exactarch，有两个选项1和0,代表是否只升级和你安装软件包cpu体系一致的包，如果设为1，则如你安装了一个i386的rpm，则yum不会用1686的包来升级。

`retries=20`

retries，网络连接发生错误后的重试次数，如果设为0，则会无限重试。

`obsoletes=1`

`gpgcheck=1`

gpgchkeck= 有1和0两个选择，分别代表是否是否进行gpg校验，如果没有这一项，默认是检查的。

`reposdir=/etc/yy.rm`

默认是 /etc/yum.repos.d/ 文件夹下的 xx.repo后缀文件默认都会被include 进来 也就是说 /etc/yum.repos.d/xx.repo 无论配置文件有多少个 每个里面有多少个[name] 最后其实都被整合到 一个里面看就是了 重复的[name]后面的覆盖前面的

`exclude=xxx`

exclude 排除某些软件在升级名单之外，可以用通配符，列表中各个项目要用空格隔开，这个对于安装了诸如美化包，中文补丁的朋友特别有用。

`keepcache=[1 or 0]`

设置 keepcache=1，yum 在成功安装软件包之后保留缓存的头文件 (headers) 和软件包。默认值为 keepcache=0 不保存

`reposdir=[包含 .repo 文件的目录的绝对路径]`

该选项用户指定 .repo 文件的绝对路径。.repo 文件包含软件仓库的信息 (作用与 /etc/yum.conf 文件中的 [repository] 片段相同)。

### Part 2 -  `/etc/yum.repos.d/xx.repo` 

下面以一份系统自带的repo文件做为实例来探讨：Part :  `[Fedora]`

方括号里面的是软件源的名称，将被yum取得并识别

`name=Fedora $releasever - $basearch`

这里也定义了软件仓库的名称，通常是为了方便阅读配置文件，一般没什么作用 `$releasever`  变量定义了发行版本，通常是8，9，10等数字 `$basearch`  变量定义了系统的架构，可以是i386、x86_64、ppc等值这两个变量根据当前系统的版本架构不同而有不同的取值，这可以方便yum升级的时候选择适合当前系统的软件包

`failovermethod=priority`

failovermethod 有两个值可以选择priority是默认值，表示从列出的baseurl中顺序选择镜像服务器地址roundrobin表示在列出的服务器中随机选择

`exclude=compiz* *compiz* fusion-icon*`

exclude这个选项是后来我自己加上去的，用来禁止这个软件仓库中的某些软件包的安装和更新，可以使用通配符，并以空格分隔，可以视情况需要自行添加

`baseurl=http://download.fedoraproject.org/pub/fedora/linux/releases/$releasever/Everything/$basearch/os/`

指定一个baseurl（源的镜像服务器地址）

`mirrorlist=http://mirrors.fedoraproject.org/mirrorlist?repo=fedora-$releasever&arch=$basearch`

这一行是指定一个镜像服务器的地址列表，通常是开启的，我们可以试试，将  `$releasever`  和  `$basearch`  替换成自己对应的版本和架构，例如10和i386，在浏览器中打开，我们就能看到一长串镜可用的镜像服务器地址列表。选择自己访问速度较快的镜像服务器地址复制并粘贴到repo文件中，我们就能获得较快的更新速度了，格式如下baseurl所示：

```
baseurl=
ftp://ftp.sfc.wide.ad.jp/pub/Linux/Fedora/releases/10/Everything/i386/os
http://ftp.chg.ru/pub/Linux/fedora/linux/releases/10/Everything/i386/os
http://ftp.yz.yamagata-u.ac.jp/pub/linux/fedora/linux/releases/10/Everything/i386/os
http://mirror.nus.edu.sg/fedora/releases/10/Everything/i386/os
http://mirror.yandex.ru/fedora/linux/releases/10/Everything/i386/os
http://ftp.twaren.net/Linux/Fedora/linux/releases/10/Everything/i386/os
http://ftp.itu.edu.tr/Mirror/Fedora/linux/releases/10/Everything/i386/os
```

`enabled=1`

这个选项表示这个repo中定义的源是启用的，0为禁用

`gpgcheck=1` 这个选项表示这个repo中下载的rpm将进行gpg的校验，已确定rpm包的来源是有效和安全的

`gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$basearch`

定义用于校验的gpg密钥

通过这个实例的说明，相信大家都会觉得，其实fedora的repo文件真是很简单，有了一个初步的认识了之后，我们就可以修改我们自己的repo文件以达到加速的目的了，一些与repo相关的yum故障，我们也可以排查了！本文只是简单的抛砖引玉，不足之处颇多，如果需要了解更多关于yum配置文件的资料，运行命令： `man yum.conf`  获得更多资料

## 使用

```
# 检查更新
yum --enablerepo=$repo check-update

# 升级
yum --enablerepo=$repo upgrade # may not work
yum --enablerepo=$repo update

# 升级指定项目
yum --enablerepo=$repo upgrade php # may not work
yum --enablerepo=$repo update php
```

### 列出配置

怎样才能在  `CentOS / Fedora / Red Hat Enterprise / Scientific`  Linux 操作系统中列出配置的 Repo 源

你需要传递一个  `repolist`  给  `yum`  命令, 这个选项将给你列出一个已经在  `RHEL / Fedora / SL / CentOS`  Linux 系统中配置过的 Repo 源, 默认是列出所有的可用 Repo 源, 传递  `-v` (verbose mode[详细信息]) 将列出更多信息

```
yum repolist
yum [options] repolist [option]
yum -v repolist
yum makecache fast  # 缓存repo并且加快速度
```

**示例**

输入以下命令

```
yum -v repolist
yum -v repolist | less
yum repolist
```

输出:

```
$ yum repolist
Loaded plugins: fastestmirror
Repodata is over 2 weeks old. Install yum-cron? Or run: yum makecache fast
Loading mirror speeds from cached hostfile
 * base: mirrors.cloud.aliyuncs.com
 * extras: mirrors.cloud.aliyuncs.com
 * remi: mirrors.tuna.tsinghua.edu.cn
 * remi-safe: mirrors.tuna.tsinghua.edu.cn
 * rpmfusion-free-updates: mirrors.ustc.edu.cn
 * updates: mirrors.cloud.aliyuncs.com
repo id                                       repo name                                                                 status
!base/7/x86_64                                CentOS-7 - Base - mirrors.aliyun.com                                      10,072
!extras/7/x86_64                              CentOS-7 - Extras - mirrors.aliyun.com                                       515
!remi                                         Remi's RPM repository for Enterprise Linux 7 - x86_64                      7,921
!remi-safe                                    Safe Remi's RPM repository for Enterprise Linux 7 - x86_64                 5,097
!rpmfusion-free-updates/x86_64                RPM Fusion for EL 7 - Free - Updates                                         248
!updates/7/x86_64                             CentOS-7 - Updates - mirrors.aliyun.com                                    4,538
repolist: 28,391
```

查询所有源并且显示源ID

列出可用:  `yum repolist enabled`

列出禁用:  `yum repolist disabled`

列出所有(默认):  `yum repolist all`

列出一个 repo 源(remi) 中可用的包 :  `yum --disablerepo="*" --enablerepo="ksplice-uptrack" list available`

```
Loaded plugins: product-id, rhnplugin, security, subscription-manager
Updating certificate-based repositories.
Unable to read consumer identity
Available Packages
ksplice-uptrack-release.noarch                           1-2                       ksplice-uptrack
python-ksplice-uptrack.noarch                            0.2.2-1.el6               ksplice-uptrack
uptrack-PyYAML-debuginfo.x86_64                          3.08-4.el6                ksplice-uptrack
uptrack-libyaml-debuginfo.x86_64                         0.1.3-1.el6               ksplice-uptrack
uptrack-libyaml-devel.x86_64                             0.1.3-1.el6               ksplice-uptrack
uptrack-python-cjson.x86_64                              1.0.5-5.el6               ksplice-uptrack
uptrack-python-cjson-debuginfo.x86_64                    1.0.5-5.el6               ksplice-uptrack
```

这里:

`--disablerepo="*"`

根据id 或者 glob 模式来禁用指定的包

`--enablerepo="ksplice-uptrack"`

根据 id 或者 glob 启用指定的源. 在这个例子中, 启用名字为  `ksplice-uptrack`  的源

列出一个 repo 源(remi) 中可用的包 :

```shell
yum --disablerepo="*" --enablerepo="remi" list available
```

## 常用 repo 源

### Remi

- Remi - [https://rpms.remirepo.net/](https://rpms.remirepo.net/)

[https://rpms.remirepo.net/](https://rpms.remirepo.net/) 是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护。有个这个源之后，使用 YUM 安装或更新 PHP、MySQL、phpMyAdmin 等服务器相关程序的时候就非常方便了。地址可以在页面上复制找到

**安装 Remi 源**

```
# yum install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```

```
# dnf install https://mirrors.tuna.tsinghua.edu.cn/remi/enterprise/remi-release-8.rpm
```

**更新**

```
# 安裝好之後 , 可以用 yum 指令檢查更新
$ yum --enablerepo=remi check-update

# 這樣應該可以找到 php 與 mysql 有更新的套件 , 然後就可以進行更新指令如下
$ yum --enablerepo=remi upgrade php
```

### ⚠️ 镜像 (已过期)

- 阿里云 - [https://developer.aliyun.com/mirror/centos/](https://developer.aliyun.com/mirror/centos/)
- 网易 - [https://mirrors.163.com/.help/centos.html](https://mirrors.163.com/.help/centos.html)
- webtatic  - 供应 LAMP等软件源 repo 地址 [Webtatic Yum Repository](https://webtatic.com/projects/yum-repository/)

## FAQ

### ⚠️ 版本不正确

> YumRepo Error: All mirror URLs are not using ftp, http[s] or file.Eg. 5.10 is not a valid and current release or hasnt been released yet/removing mirrorlist with no valid mirrors: /var/cache/yum/base/mirrorlist.txt

- 原因版本不对, centos 是 5.10 的版本,但是发行 url 里没有这个repo

**解决方法**

- 下载 aliyun 5 的 repo 文件
- 更改本地的 repo 文件并备份
- 测试运行

