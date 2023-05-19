---
title: "Centos下软件的安装与卸载方法"
date: 2021-06-26 10:30:23
toc: true
categories:
- ["Ops","CentOS"]
---

原文地址 : [Linux Centos下软件的安装与卸载方法_zolalad的博客-CSDN博客](http://blog.csdn.net/zolalad/article/details/11368879)<br />注：一般的软件的默认安装目录在/usr/local或者/opt里，可以到那里去找找.

首先要确定是通过包管理器安装的还是通过源代码安装的。



## 通过rpm包管理器安装的软件：


### rpm包

```shell
# 如 rpm -ql gcc 来查看gcc的文件都安装到哪里去了
rpm –ql package_name
# 查看有没有安装这个包
rpm -qa | grep package_name
# 查看全部已经安装的包名
rpm -qa
```

###deb包

```
#查看如 dpkg -L gcc 来查看gcc的文件。
dpkg -L package_name
#来查看有没有安装某个包
dpkg -l | grep package_name
#是查看全部包的 
dpkg -l
```


## 通过源代码安装的软件


### 有 makefile 文件

如果是通过源代码安装的话 ，在源代码的configure的时候会有参数让你指定安装目录，具体体现在Makefile文件的install目标（也可能会是*install* 目标，*代表任意字符）里。例如如下Makefile文件的install目标：

```shell
install-binPROGRAMS: $(bin_PROGRAMS)
	@$(NORMAL_INSTALL)
	$(mkinstalldirs) $(DESTDIR)$(bindir)
	@list='$(bin_PROGRAMS)'; for p in $$list; do \
		if test -f $ $p; then \
		echo "  $(INSTALL_PROGRAM) $$p $(DESTDIR)$(bindir)/`echo $$p|sed 's/$(EXEEXT)$$//'|sed '$(transform)'|sed 's/$$/$(EXEEXT)/'`"; \
		$(INSTALL_PROGRAM) $$p $(DESTDIR)$(bindir)/`echo $$p|sed 's/$(EXEEXT)$$//'|sed '$(transform)'|sed 's/$$/$(EXEEXT)/'`; \
		else :; fi; \
	done
```

是一个脚本，把可执行文件复制到$bindir这个变量所代表的目录下，在Makefile前面的代码中这个变量会有定义，在我这里是定义了

```
prefix = /usr/local
exec_prefix = ${prefix}
bindir = ${exec_prefix}/bin
```

也就是 /usr/local/bin下面。


### 已经安装好的

如果已经安装好的，也可以直接调用，要看它的路径很好搞定

> 例如我用gcc这个命令，我要看gcc这个命令的目录位置，可以用如下命令查询


```
whereis gcc
gcc: /usr/bin/gcc /usr/lib/gcc /usr/libexec/gcc /usr/share/man/man1/gcc.1.gz
```

一个whereis命令就查询到位置了。

> 我分下面三个部分来讲linux中的软件管理，前二个部分是基本介绍，也是重点，让大家明白linux的不同的管理软件的方法。在实际用中，推荐大家多使用apt-get和yum.那是相当的方便。<br />Windows下安装软件时，只需运行软件的安装程序(setup、install等)或者用zip等解压缩软件解开即可安装，运行反安装程序(uninstall、unware、"卸载"等)就能将软件清除干净，完全图形化的操作界面，简单到只要用鼠标一直点击"下一步"就可以了。Linux系统好象就不一样了，很多的初学者都抱怨在Linux下安装和卸载软件非常地困难，没有像使用Windows时那么直观。其实在Linux下安装和卸载软件也非常简单，同样也有安装向导或解压安装的方式，不相同的只不过是除了二进制形式的软件分发外，还有许许多多以源代码形式分发的软件包。


下面就来详细地讲一讲这些软件的安装与卸载：


## 二进制分发软件包的安装与卸载

> Linux软件的二进制分发是指事先已经编译好二进制形式的软件包的发布形式，其优点是安装使用容易，缺点则是缺乏灵活性，如果该软件包是为特定的硬件平台编译的，那它就不能在另外的平台或环境下正确执行。



### *.rpm形式的二进制软件包

> 首先进入软件所在目录<br />安装：`rpm -ivh *.rpm`<br />卸载：`rpm -e packgename`<br />实例：
>  
> - 找到相应的软件包，比如soft.version.rpm，下载到本机某个目录；
> - 打开一个终端，在非超级管理员终端使用命令：su – 转换成root用户；
> - `cd soft.version.rpm`所在的目录；
> - 输入`rpm -ivh soft.version.rpm`<br />说明：RPM(RedHat PackgeManager)是RedHat公司出的软件包管理器，使用它可以很容易地对rpm形式的软件包进行安装、升级、卸载、验证、查询等操作，安装简单，而卸载时也可以将软件安装在多处目录中的文件删除干净，因此推荐初学者尽可能使用rpm形式的软件包。rpm的参数中-i是安装，-v是校验，-h是用散列符显示安装进度，_.rpm是软件包的文件名(这里的_.rpm特指*.src.rpm以外的以.rpm为后缀的文件);参数-e是删除软件包，packgename是软件包名，与软件包的文件名有所区别，它往往是文件名中位于版本号前面的字符串，例如apache-3.1.12-i386.rpm和apache-devel-3.1.12-i386.rpm是软件包文件名，它们的软件包名称分别是apache和apache-devel.更多的rpm参数请自行参看手册页：man rpm.<br />如果你不喜欢在字符界面下安装或卸载这些软件包，完全可以在X-Window下使用图形界面的软件包管理程序。现在这些做的非常好了。



### *.tar.gz/ *.tgz, *.bz2形式的二进制软件包

安装：`tar zxvf *.tar.gz 或 tar yxvf *.bz2`<br />卸载：手动删除<br />说明：_.tar.gz/_.bz2形式的二进制软件包是用tar工具来打包、用gzip/bzip2压缩的，安装时直接解包即可。对于解压后只有单一目录的软件，卸载时用命令"rm –rf 软件目录名";如果解压后文件分散在多处目录中，则必须一一手动删除(稍麻烦)，想知道解压时向系统中安装了哪些文件，可以用命令"tar ztvf _.tar.gz"/"tar ytvf _.bz2"获取清单。tar的参数z是调用gzip解压，x是解包，v是校验，f是显示结果，y是调用bzip2解压，t是列出包的文件清单。更多的参数请参看手册页：man tar.<br />注：如果你更喜欢图形界面的操作，可以到Ubuntu上看看他的包管理，超级方便。


### *.tgz形式的二进制软件包

解压：`tar -zxvf soft.tgz`<br />切换到当前解压后目录：`cd soft` (ps: Linux的shell下按TAB键可以直接自动补全文件名)<br />安装：`./soft-*-*-installer`<br />卸载：手动删除安装所在的文件夹<br />示例：安装myeclipse-8.0.0-linux-gtk-x86.tgz<br />解压：`tar -zxvf myeclipse-8.0.0-linux-gtk-x86.tgz`<br />解压切换到当前安装目录：`cd myeclipse-8.0.0-linux-gtk-x86`<br />安装：`./myeclipse-8-stable-installer`


### 提供安装程序的软件包

这类软件包已经提供了安装脚本或二进制的安装向导程序(setup、install、install.sh等)，只需运行它就可以完成软件的安装;而卸载时也相应地提供了反安装的脚本或程序。例如SUN公司的StarOffice办公软件套件就使用名为setup的安装程序，而且在软件安装后提供反安装的功能，目前这种类型的软件包还比较少，因其安装与卸载的方式与Windows软件一样，所以就无需多讲了。


## 源代码分发软件包的安装与卸载

Linux软件的源代码分发是指提供了该软件所有程序源代码的发布形式，需要用户自己编译成可执行的二进制代码并进行安装，其优点是配置灵活，可以随意去掉或保留某些功能/模块，适应多种硬件/操作系统平台及编译环境，缺点是难度较大，一般不适合初学者使用。


### *.src.rpm形式的源代码软件包

安装：

```
rpm -rebuild *.src.rpm
cd /usr/src/dist/RPMS`
rpm -ivh *.rpm
```

卸载：

```
rpm -e packgename
```

说明：rpm -rebuild *.src.rpm命令将源代码编译并在/usr/src/dist/RPMS下生成二进制的rpm包，然后再安装该二进制包即可。packgename如前所述。


### tar.gz源代码包安装方式：

> 1、找到相应的软件包，比如soft.tar.gz，下载到本机某个目录；<br />2、打开一个终端，使用命令：su –转换成root用户；<br />3、cd soft.tar.gz所在的目录；<br />4、tar -xzvf soft.tar.gz //一般会生成一个soft目录<br />5、cd soft<br />6、./configure --prefix=/usr/local/soft(指定安装目录)<br />7、make<br />8、make install<br />卸载：用cd 命令进入编译后的软件目录，即安装时的目录<br />执行反安装命令：make uninstall或 手动删除



### tar.bz2源代码包安装方式：

1、找到相应的软件包，比如soft.tar.bz2，下载到本机某个目录；<br />2、打开一个终端，su -成root用户；<br />3、cd soft.tar.bz2所在的目录；<br />4、tar -xjvf soft.tar.bz2 //一般会生成一个soft目录<br />5、cd soft<br />6、./configure  --prefix=/usr/local/soft（指定安装目录）<br />7、make<br />8、make install<br />卸载：用cd 命令进入编译后的软件目录，即安装时的目录<br />执行反安装命令：make uninstall或 手动删除<br />说明：建议解压后先阅读说明文件，可以了解安装有哪些需求，有必要时还需改动编译配置。有些软件包的源代码在编译安装后可以用make install命令来进行卸载，如果不提供此功能，则软件的卸载必须手动删除。由于软件可能将文件分散地安装在系统的多个目录中，往往很难把它删除干净，那你应该在编译前进行配置，指定软件将要安装到目标路径：./configure --prefix=目录名，这样可以使用"rm –rf 软件目录名"命令来进行干净彻底的卸载。与其它安装方式相比，需要用户自己编译安装是最麻烦的，其实我个人认为，以后会越来越少人用这种方法。因为现在的硬件发展到没有必要多这少量的性能，来浪费这么多时间。<br />安装目录：注意make install命令过程中的安装目录，或者阅读安装目录里面的readme文件，当然最好的办法是在安装的过程中指定安装目录，即在./configure命令后面加参数--prefix=/**，如：./configure --prefix=/usr/local/soft，即把软件装在/usr/local/路径的soft这个目录里。


### bin文档安装：

假如您下载到的软件名是soft.bin，一般情况下是个可执行文档，安装方法如下：<br />1、 打开一个终端，su -成root用户；<br />2、 用CD 命令进入源代码压缩包所在的目录<br />3、 chmod x soft.bin<br />4、./soft.bin //运行这个命令就能够安装软件了，并且此软件被安装在了：源代码压缩包所在的目录/soft中！

如何卸载：把安装时中选择的安装目录删除就OK，<br />执行安装过程中可以指定，类似于windows下安装。

示例:欲将jdk安装到指定目录/usr/java下<br />说明：<br />1.CentOS默认情况下，会安装OpenOffice之类的软件，这些软件需要Java的支持，默认会安装JDK的环境，若需要特定的Java环境，最好将默认的JDK彻底删除；<br />2.查看默认的JDK命令：java -version<br />3.但是如果先删除默认再装新的JDK，则与之相关的软件比如openoffice等也会随之删除，所以，先装新的jdk再卸系统默认自带的jdk。

卸载系统自带原JDK的方法示例：（注意，此操作应该在新jdk安装完毕后再执行）<br />查看gcj的版本号：`rpm -qa|grep jdk`<br />得到结果：

```
jdk-1.7.0_04-fcs.x86_64
java-1.6.0-openjdk-1.6.0.0-1.49.1.11.4.el6_3.x86_64
```

卸载：`yum -y remove java java-1.6.0-openjdk-1.6.0.0-1.49.1.11.4.el6_3.x86_64`<br />等待系统自动卸载，最终终端显示 Complete，卸载完成

首先，在/usr下新建java文件夹，将安装包放在/usr/java目录下<br />然后进入此目录（根据安装包的不同选择①或②两种安装方式之一）<br />**jdk-1_6_0_14-linux-i586-rpm.bin文件安装**

```
chmod 777 jdk-1_6_0_14-linux-i586-rpm.bin    ←修改为可执行
./jdk-1_6_0_14-linux-i586-rpm.bin        ←选择yes同意上面的协议
rpm -ivh jdk-1_6_0_14-linux-i586.rpm        ←选择yes直到安装完毕
```

**jdk-1_6_0_14-linux-i586.bin文件安装**

```
chmod a+x jdk-1_6_0_14-linux-i586.bin         ←使当前用户拥有执行权限
./jdk-1_6_0_14-linux-i586.bin            ←这时会显示出JDK的安装许可协议，按空格翻页，最后
```

程序会问你是不是同意上面的协议，当然同意啦，输入“yes”之后开始解压JDK到当前目录。此时屏幕上会显示解压的进度，直到安装完毕。

最后为jdk配置环境变量<br /><1>`vi /etc/profile`;<br /><2>在最后加入以下几行：注意,在linux系统中，环境变量配置的分隔符不能用;(分号)，要用:（冒号）

```
# set java environment
export JAVA_HOME=/usr/program/jdk1.6.0_13
export JRE_HOME=/usr/program/jdk1.6.0_13/jre
export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
```

<3>在vi编辑器增加以上内容后保存退出，并执行以下命令使配置生效！

```
chmod  +x  /etc/profile #增加执行权限
source  /etc/profile；  #使配置生效
```

配置完毕后，在命令行中输入：`java -version`，如出现下列信息说明java环境安装成功。

```
java version "1.6.0_13"
Java(TM) SE Runtime Environment (build 1.6.0_13-b03)
Java HotSpot(TM) Server VM (build 16.3-b01, mixed mode)
```

完成以上，我们就在CentOS系统中完成了JDK的安装以及配置。

卸载自己安装的jdk的方法：把安装时中选择的安装目录删除就OK命令：#rm –rf  jdk-1.6.0_13命令即可删除JDK，别忘了把配置文件/etc/profile的相关配置也删除！！！


## 无需安装的软件：

有些软件，比如lumaqq，是无需安装的，自带jre解压缩后可直接运行。假设下载的是lumaqq.tar.gz，使用方法如下：

- 打开一个终端， -成root用户；
- tar -xzvf lumaqq.tar.gz //这一步会生成一个叫LumaQQ的目录
- cd LumaQQ
- chmod x lumaqq //配置lumaqq这个程式文档为可运行
- 此时就能够运行lumaqq了，用命令./lumaqq即可，但每次运行要输入全路径或转换到刚才生成的LumaQQ目录里
- 为了确保不配置路径就能够用，您能够在/bin目录下建立一个lumaqq的链接， 用命令ln -s lumaqq /bin/ 即可，以后任何时候打开一个终端输入lumaqq就能够 启动QQ聊天软件了
- 假如您要想lumaqq有个菜单项，使用菜单编辑工具，比如Alacarte Menu Editor，找到上面生成的LumaQQ目录里的lumaqq配置一个菜单项就能够了，当然您 也能够直接到 /usr/share/applications目录，按照里面其他*.desktop文档的格式生成一个自己的desktop文档即可。


## 使用yum和apt-get.软件管理方法的升级。

看过上面的介绍。大家一定会感觉，太麻烦了，下面这个是先进的linux才有的功能，这个实在太方便了，比windows还要方便，要是你用过Ubuntu的apt-get你会感觉爽极了的。那个方便。


### Redhat的yum这种高级的包管理

- 用YUM安装删除软件<br />注：Yum（ Yellow dog Updater, Modified）是一个在Fedora和RedHat以及SUSE中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。<br />在系统中添加删除软件是常事，yum同样可以胜任这一任务，只要软件是rpm安装的。安装的命令是，yum install xxx，yum会查询数据库，有无这一软件包，如果有，则检查其依赖冲突关系，如果没有依赖冲突，那么最好，下载安装;如果有，则会给出提示，询问是否要同时安装依赖，或删除冲突的包，你可以自己作出判断。删除的命令是，yum remove xxx，同安装一样，yum也会查询数据库，给出解决依赖关系的提示。<br />用YUM安装软件包 `yum install xxx`<br />用YUM删除软件包 `yum remove xxx`
- 用YUM查询软件信息<br />我们常会碰到这样的情况，想要安装一个软件，只知道它和某方面有关，但又不能确切知道它的名字。这时yum的查询功能就起作用了。你可以用 yum  search keyword这样的命令来进行搜索，比如我们要则安装一个Instant Messenger,但又不知到底有哪些，这时不妨用yum search messenger这样的指令进行搜索，yum会搜索所有可用rpm的描述，列出所有描述中和messeger有关的rpm包，于是我们可能得到gaim,kopete等等，并从中选择。有时我们还会碰到安装了一个包，但又不知道其用途，我们可以用`yum info packagename`这个指令来获取信息。

```
yum search          # 使用YUM查找软件包
yum list            # 列出所有可安装的软件包
yum list updates    # 列出所有可更新的软件包
yum list installed  # 列出所有已安装的软件包
yum list extras     # 列出所有已安装但不在 Yum Repository 内的软件包
yum list            # 列出所指定的软件包
```


### Ubuntu中的高级包管理方法apt-get

除了apt的便捷以外，apt-get的一大好处是极大地减小了所谓依赖关系恶梦的发生几率(dependency hell)，即使是陷入了dependency hell,apt-get也提供了很好的援助手段，帮你逃出魔窟。通常 apt-get 都和网上的压缩包一起出没，从互联网上下载或是安装。全世界有超过200个 debian 官方镜像，还有繁多的非官方软件包提供网站。你所使用的基于Debian的发布版不同，你所使用的软件仓库可能需要手工选择或是可以自动设置。你能从Debian官方网站得到完整的镜像列表。而很多非官方网站提供各种特殊用途的非官方软件包，当然，使用非官方软件包会有更多风险了。软件包都是为某一个基本的Debian发布版所准备的(从unstable到stable)，并且划分到不同类别中(如 main contrib nonfree)，这个是依据 debian 自由软件纲领而划分的(也就是常说的dfsg)，因为美国限制加密软件出口，还有一个non-us类别。<br />apt方式安装：<br />1、打开一个终端，su -成root用户；<br />2、apt-cache search soft 注：soft是您要找的软件的名称或相关信息<br />3、假如2中找到了软件soft.version，则用apt-get install soft.version命令安<br />装软件 注：只要您能够上网，只需要用apt-cache search查找软件，用apt-get<br />install软件

常用的APT命令参数

```shell
apt-cache search package        #搜索包
apt-cache show package          #获取包的相关信息，如说明、大小、版本等
sudo apt-get install package    安装包
sudo apt-get install package - - reinstall 重新安装包
sudo apt-get -f install 修复安装"-f = --fix-missing"
sudo apt-get remove package 删除包
sudo apt-get remove package - - purge 删除包，包括删除配置文件等
sudo apt-get update 更新源sudo apt-get upgrade 更新已安装的包
sudo apt-get dist-upgrade 升级系统
sudo apt-get dselect-upgrade 使用 dselect 升级
apt-cache depends package 了解使用依赖
apt-cache rdepends package 是查看该包被哪些包依赖
sudo apt-get build-dep package 安装相关的编译环境
apt-get source package 下载该包的源代码
sudo apt-get clean && sudo apt-get autoclean 清理无用的包
sudo apt-get check 检查是否有损坏的依赖
```

参考链接：[http://soft.chinabyte.com/os/85/12332085.shtml](http://soft.chinabyte.com/os/85/12332085.shtml)


## 安装完软件后如何执行。

安装完软件后可以有好多种方法执行软件

> A、有些软件安装后会自动在应用程序列表里加上快捷键，和windows一样，到那里找就行了。


> B、 如果在应用程序列表里找不到的话，可以直接在/开始/运行命令里输入命令：启动命令一般就是软件名，如firefox，realplay，xmms等


> C、可以打开一个shell终端，输入软件名，和在“运行命令”里一样。如果不知道命令全程的话，可以输入开头的字母，然后按tab键查找，系统会自动显示以输入字母开头的所有命令/


> D、你也可以直接到安装目录下运行启动文件，Linux下的可执行图标和shell终端图标很像


> E、到/usr/bin目录里找安装的软件启动文件执行命令。Linux系统把所有可执行的文件命令在/usr/bin目录里都作了启动连接，你可以去那个目录寻找你安装的文件的启动命令，双击启动。

