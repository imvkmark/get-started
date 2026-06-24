---
description: '全局代理设置项目代理给指定的 URL 设置代理https 方式每次都要输入密码，按照如下设置即可输入一次就可以很长时间不用再手输入密码。第一步：设置邮箱和密码根据自己的需求执行下面的任意一条命令第二步：运行相关命令, 输入账号密码, 如果正确则下次不必重新输入, 在 git 目录中存在两个文件 .gitconfig, .git-credentials, 里边放置的是凭证的信息解决: hosts 中加入 ip 映射查询真实 IP通过 IPAddress.com, 输入 github.com 查询到真实 IP 地址, 然后修改 hosts 映射, 这里需要在本地 pin'
lastUpdated: '2025-12-06 10:45:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Git - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '全局代理设置项目代理给指定的 URL 设置代理https 方式每次都要输入密码，按照如下设置即可输入一次就可以很长时间不用再手输入密码。第一步：设置邮箱和密码根据自己的需求执行下面的任意一条命令第二步：运行相关命令, 输入账号密码, 如果正确则下次不必重新输入, 在 git 目录中存在两个文件 .gitconfig, .git-credentials, 里边放置的是凭证的信息解决: hosts 中加入 ip 映射查询真实 IP通过 IPAddress.com, 输入 github.com 查询到真实 IP 地址, 然后修改 hosts 映射, 这里需要在本地 pin'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/git/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/8f/8fbded3cf13aed1cf25a420a923b7134.png?x-oss-process=image/resize,m_mfit,w_400'
---
# Git - FAQ



## Git 设置代理来访问服务器

**全局代理**

```
# 设置代理
$ git config --global http.proxy http://127.0.0.1:1087
$ git config --global https.proxy https://127.0.0.1:1087
# 取消代理
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy
```

**设置项目代理**

```
# 设置代理
$ git config --local http.proxy 127.0.0.1:1086
$ git config --local https.proxy 127.0.0.1:1086
# 取消代理
$ git config --local --unset http.proxy
$ git config --local --unset https.proxy
```

**给指定的 URL 设置代理**

```
[http "https://github.com/"]
    proxy = http://127.0.0.1:1086
[https "https://github.com/"]
    proxy = http://127.0.0.1:1086
[http "https://my.comapnyserver.com/"]
    proxy = ""
```

## Git 保留最新提交记录

```shell
# Checkout
git checkout --orphan latest_branch
# Add all the files
git add -A
# Commit the changes
git commit -am "commit message"
# Delete the branch
git branch -D master
# Rename the current branch to master
git branch -m master
# Finally, force update your repository
git push -f origin master
```

## Git 保存请求的账号密码

https 方式每次都要输入密码，按照如下设置即可输入一次就可以很长时间不用再手输入密码。第一步：设置邮箱和密码

```
$ git config --global user.email "your email"
$ git config --global user.name  "your username"
```

根据自己的需求执行下面的任意一条命令第二步：

```shell
# 设置记住密码（默认15分钟）：
$ git config --global credential.helper cache

# 如果想自己设置时间，可以这样做, 这样就设置一个小时之后失效
$ git config credential.helper 'cache --timeout=3600'

# 长期存储密码：
$ git config --global credential.helper store

# 增加远程地址的时候带上密码也是可以的。(推荐)
$ http://yourname:password@git.oschina.net/name/project.git
```

运行相关命令, 输入账号密码, 如果正确则下次不必重新输入, 在 git 目录中存在两个文件  `.gitconfig` ,  `.git-credentials` , 里边放置的是凭证的信息

## Git 推送 github 代码出现 443: Operation timed out 问题

> 推送到 https://github.com/{username}/{project}.git fatal: 无法访问 ‘https://github.com/…’：Failed to connect to github.com port 443: Operation timed out Completed with errors, see above 如果出现 raw.githubusercontent.com 之类的问题都可以采用此类方法解决

解决: hosts 中加入 ip 映射查询真实 IP通过 [IPAddress.com](https://www.ipaddress.com/), 输入 github.com 查询到真实 IP 地址, 然后修改 hosts 映射, 这里需要在本地 ping 下指定的查询出来的 ip , 否则也无法访问

## 删除本地所有的 Tag 并获取服务端所有

```
# 删除本地所有tag 并获取服务端所有
$ git tag -l | xargs git tag -d && git fetch --tags
```

## git pull 冲突终极解决方案

服务端 git pull 或 git checkout 报以下错误

> Your local changes to the following files would be overwritten by merge <br>
> error: Your local changes to the following files would be overwritten by merge:

解决方案：

```shell
$ git reset --hard HEAD
$ git clean -f -d
```

## LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443

::: danger  ⚠️ 
这种情况下 ssh 方式无法访问, 仅仅支持 https 方式, 需要注意

:::

```
fatal: unable to access "......" :  LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

用网页访问则没有出现问题, 这个是在自动化翻墙的状态下, 即使设置了系统代理也不行. 突然看到一篇文章 [设置git代理：转：解决Unknown SSL protocol error in connection to code.google.com:443](http://blog.csdn.net/atupal/article/details/8115190) , 完美解决了我的问题.

需要设置 git 代理访问 url

```
# 设置 git 的 http.proxy
git config --global http.proxy "127.0.0.1:1087"
```

于是便可以访问了, 完美

![](https://file.wulicode.com/notion/8f/8fbded3cf13aed1cf25a420a923b7134.png)

## 清理 SourceTree 已经保存的 git 推送密码

**Mac 端**

找到

```
$ cd ~/Library/Application\ Support/SourceTree
```

找到符合条件的, 然后进行删除处理

```
drwxr-xr-x  3 duoli  staff    96B  7  6 23:58 ImageCache
-rw-r--r--  1 duoli  staff   9.9K  7  8 08:57 browser.plist
-rw-r--r--  1 duoli  staff    82B  7  7 11:47 username@STAuth-code.aliyun.com
-rw-r--r--@ 1 duoli  staff   1.1K  7  7 11:46 hgrc_sourcetree
-rw-r--r--  1 duoli  staff   1.2K  6 25 22:38 hostingservices_new.plist
```

**Windows 端**

```
~\AppData\Local\Atlassian\SourceTree\userhost
~\AppData\Local\Atlassian\SourceTree\passwd
```

在  `偏好设置`  ->  `账户`  ->  `高级`  中删除指定用户以及用户名即可

![](https://file.wulicode.com/notion/0c/0cccba848902cb6f594bfb93ceeb5a0f.png)

![](https://file.wulicode.com/notion/d4/d4d706dd0f4f59fcae5e20d90bf6e644.png)

## Git 使用 ssl 方式导致证书错误

我用这个初始化过  `pod` , 更新过  `brew`  , 推送过代码都会出现这个问题.

```
fatal: unable to access "......" :  LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

用网页访问则没有出现问题, 这个是在自动化翻墙的状态下, 即使设置了系统代理也不行. 突然看到一篇文章 [设置git代理：转：解决Unknown SSL protocol error in connection to code.google.com:443](http://blog.csdn.net/atupal/article/details/8115190) , 完美解决了我的问题.需要设置 git 代理访问 url

```
# 设置 git 的 http.proxy
git config --global http.proxy "127.0.0.1:1087"
```

我本地的地址是 :

![](https://file.wulicode.com/notion/4d/4d777872c230552296832533ac6d1361.jpg)

于是便可以访问了, 完美

![](https://file.wulicode.com/notion/16/162fc1e6280081eeb1e4e9e3c87425ce.jpg)

## Git 保存请求的账号密码的方式

https方式每次都要输入密码，按照如下设置即可输入一次就可以很长时间不用再手输入密码。

第一步：设置邮箱和密码

```shell
$ git config --global user.email "your email"
$ git config --global user.name  "your username"
```

根据自己的需求执行下面的任意一条命令第二步：

```shell
# 设置记住密码（默认15分钟）：
$ git config --global credential.helper cache

# 如果想自己设置时间，可以这样做, 这样就设置一个小时之后失效
$ git config credential.helper 'cache --timeout=3600'

# 长期存储密码：
$ git config --global credential.helper store

# 增加远程地址的时候带上密码也是可以的。(推荐)
$ http://yourname:password@git.oschina.net/name/project.git
```

第三步：

运行相关命令, 输入账号密码, 如果正确则下次不必重新输入

当完成上面的操作之后，我们可以发现项目目录中会出现如下图的文件夹

![](https://file.wulicode.com/notion/05/056faeecf535dc98827e65552f33057a.png)

该文件夹会有如下两个文件，这两个文件夹就记录着账号密码相关的信息

![](https://file.wulicode.com/notion/b4/b4f50f8ff42dde29294c74bbcec93d6e.png)

## 参考

🔗 https://www.jianshu.com/p/3948a96cec54

