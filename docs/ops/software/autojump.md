# 「转」Linux 使用 autojump 直达目录

介绍这款神器之前，先来确认一个问题。在 Linux 的使用过程中，如何快速地到达指定目录？

很多人肯定会说，使用 tab 补全大法啊，笨！

嗯，没错，在没认识到 autojump 之前，我也是这么想的，但熟悉使用过这款神器后，才明白什么叫所达即所想。也就是无需考虑中间还有多少层目录，你只需要记住最终目录的名称，就可以快速进入该目录……

## 安装 autojump

要安装 autojump，得先安装 epel 源：

```
sudo yum isntall epel-release;
sudo yum install autojump;
```

初次安装完成后，执行命令可能会报以下错误：

```
[u@host ~]$ autojump
Please source the correct autojump file in your shell's
startup file. For more information, please reinstall autojump
and read the post installation instructions.
```

退出用户重新登录就可以了。

配置完成后，执行  `autojump`  或者  `j`  没有报错就说明安装成功：

```
[u@host ~]$ autojump
.
[u@host ~]$ j
.
```

在 Mac 中，由于不能使用 root 权限执行安装，autojump 的环境信息没有加入到环境变量。导致即使退出重登也无法生效。刚开始我也百思不得其解，以为是程序有问题，直到在
reinstall 的过程中，我看到了以下提示：

```
Add the following line to your ~/.bash_profile or ~/.zshrc file (and remember
to source the file to update your current session):
 [ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
If you use the Fish shell then add the following line to your ~/.config/fish/config.fish:
 [ -f /usr/local/share/autojump/autojump.fish ]; and source /usr/local/share/autojump/autojump.fish
zsh completions have been installed to:
 /usr/local/share/zsh/site-functions
```

原来需要手动添加 autojump 的环境信息到用户的环境变量，autojump 才会生效。So，那就加起来：

```
# 当前用户下生效
echo "[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh" >> ~/.bash_profile
# 所有用户下生效
sudo sh -c 'echo "[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh" >> /etc/profile'
```

## autojump 使用

安装完成后，就可以使用  `autojump`  或者  `j`  命令快速调到指定目录，**前提是这个目录在安装完 autojump 后进去过。**

```
[hzz@magedu ~]$ cd /var/www/html/
[hzz@magedu html]$ cd
[hzz@magedu ~]$ pwd
/home/hzz
[hzz@magedu ~]$ j html
/var/www/html
[hzz@magedu html]$ pwd
/var/www/html
[hzz@magedu html]$
```

甚至于只输入部分字符，就可以进入指定目录，比如：

```
[hzz@magedu ~]$ pwd
/home/hzz
[hzz@magedu ~]$ j htm
/var/www/html
[hzz@magedu html]$ pwd
/var/www/html
[hzz@magedu html]$
```

输入部分字符后，如果不确定目录是否被收录或识别，按一次  `tab`，就会出现补全提示，也就是能否从 autojump
中找到记录，字符后面出现  `__`  则表示找到记录；如果没有反应，则说明未找到记录，需要手动进入该目录以便收录。（若未找到记录，而按回车的话，默认会进入当前目录。）

```
[hzz@magedu ~]$ j h__
/var/www/html
[hzz@magedu html]$ j x
.
[hzz@magedu html]$
```

如果默认进入的目录不是你想要的目录，可以在出现  `__`  后再连按两次  `tab`，这样就会出现候选项，选择需要进入的目录编号进入即可：

```
[hzz@magedu ~]$ j h__
h__1__/var/www/html   h__3__/home/hzz/htm   h__5__/home/hzz/html  h__7__/home/hzz/htm
h__2__/home/hzz/html  h__4__/var/www/html   h__6__/home/hzz/wwww
[hzz@magedu ~]$ j h__3
/home/hzz/htm
[hzz@magedu htm]$ pwd
/home/hzz/htm
[hzz@magedu htm]$
```

类似输入法，哪个目录最常进入，说明权重越高（权重可手动调节），就越靠前，直至默认。

## autojump 进阶

若是没有特殊要求，上面所说的应该能满足日常使用了，但是通过  `j --help`，我们可以看到 autojump 还提供了几个参数方便我们使用。

```
[hzz@magedu html]$ j --help
usage: autojump [-h] [-a DIRECTORY] [-i [WEIGHT]] [-d [WEIGHT]] [--complete]
 [--purge] [-s] [-v]
 [DIRECTORY [DIRECTORY ...]]
Automatically jump to directory passed as an argument.
positional arguments:
 DIRECTORY             directory to jump to
optional arguments:
 -h, --help            show this help message and exit
 -a DIRECTORY, --add DIRECTORY
 add path
 -i [WEIGHT], --increase [WEIGHT]
 increase current directory weight
 -d [WEIGHT], --decrease [WEIGHT]
 decrease current directory weight
 --complete            used for tab completion
 --purge               remove non-existent paths from database
 -s, --stat            show database entries and their key weights
 -v, --version         show version information
Please see autojump(1) man pages for full documentation.
```

下面我们就来说说各参数的用法。

`j -a DIRECTORY`  添加目录，即不用进入目录，即可将目录添加进 autojump 记录。

```
[hzz@magedu html]$ j et
.
[hzz@magedu html]$ j -a /etc/
[hzz@magedu html]$ j et
/etc
[hzz@magedu etc]$ pwd
/etc
```

`j -s`  查看各目录权重，并查看数据信息。

`j -i [WEIGHT]`  添加权重，权重越高，该目录的优先级就越高。

`j -d [WEIGHT]`  减少权重，权重越低，该目录的优先级越低。

`j --complete`  查看关键字的候选项，常用双击  `tab`  代替。

`j --purge`  清理 autojump 记录里面那些已不存在的目录数据。

```
[u@host ~]$ pwd
/home/hzz
[u@host ~]$ rm -rf wwww
[u@host ~]$ j ww__
ww__1__/home/hzz/wwww  ww__3__/home/hzz/wwww  ww__5__/var/www/html   ww__7__/var/www
ww__2__/var/www        ww__4__/var/www        ww__6__/home/hzz/wwww
[u@host ~]$ j ww__
# 可以看到，即使 wwww 目录已经被删除，但是候选项里面还是会出现 /home/hzz/wwww 目录，这时就可以使用 j --purge 进行清理。建议设定 crontab 定期自动清理。
[u@host ~]$ j --purge
Purged 1 entries.
[u@host ~]$ j ww__
ww__1__/var/www       ww__2__/var/www       ww__3__/var/www/html  ww__4__/var/www
[u@host ~]$ j ww__
```

好了，这款神器就介绍到这。总之，有了这款神器后，效率提高了不少，比如，当我需要发布博客时，只需要很少的步骤即可进入发布目录，比建软连接还快。

```
Hzzs-MacBook-Pro:~ hzz$ j h
/Users/hzz/MyBlog/Hexo
Hzzs-MacBook-Pro:Hexo hzz$ hexo d -g
INFO  Start processing
INFO  Files loaded in 2.64 s
...
```

Have fun!

