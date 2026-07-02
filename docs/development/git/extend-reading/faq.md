---
description: '该文档整理了Git使用中的常见问题及解决方案，包括设置/取消代理、保留最新提交、保存凭证（临时或长期）、解决推送超时（443错误）、删除本地标签、处理pull冲突及SSL证书错误等，适合日常参考。'
lastUpdated: '2026-07-02 18:11:24'
head:
  - - meta
    - name: 'og:title'
      content: 'Git - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档整理了Git使用中的常见问题及解决方案，包括设置/取消代理、保留最新提交、保存凭证（临时或长期）、解决推送超时（443错误）、删除本地标签、处理pull冲突及SSL证书错误等，适合日常参考。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/git/extend-reading/faq.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/60d3b4c3040459792fae30b0cb0b5de3.png'
---
# Git - FAQ

## Git 设置代理来访问服务器

**全局代理**

```Plaintext
# 设置代理
$ git config --global http.proxy http://127.0.0.1:1087
$ git config --global https.proxy https://127.0.0.1:1087
# 取消代理
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy
```

**设置项目代理**

```Plaintext
# 设置代理
$ git config --local http.proxy 127.0.0.1:1086
$ git config --local https.proxy 127.0.0.1:1086
# 取消代理
$ git config --local --unset http.proxy
$ git config --local --unset https.proxy
```

**给指定的 URL 设置代理**

```Plaintext
[http "https://github.com/"]
    proxy = http://127.0.0.1:1086
[https "https://github.com/"]
    proxy = http://127.0.0.1:1086
[http "https://my.comapnyserver.com/"]
    proxy = ""
```

## Git 保留最新提交记录

```Bash
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

```Plaintext
$ git config --global user.email "your email"
$ git config --global user.name  "your username"
```

根据自己的需求执行下面的任意一条命令第二步：

```Bash
# 设置记住密码（默认15分钟）：
$ git config --global credential.helper cache

# 如果想自己设置时间，可以这样做, 这样就设置一个小时之后失效
$ git config credential.helper 'cache --timeout=3600'

# 长期存储密码：
$ git config --global credential.helper store

# 增加远程地址的时候带上密码也是可以的。(推荐)
$ http://yourname:password@git.oschina.net/name/project.git
```

运行相关命令, 输入账号密码, 如果正确则下次不必重新输入, 在 git 目录中存在两个文件 `.gitconfig`, `.git-credentials`, 里边放置的是凭证的信息

## Git 推送 github 代码出现 443: Operation timed out 问题

> 推送到 https://github.com/{username}/{project}.git fatal: 无法访问 ‘https://github.com/…’：Failed to connect to github.com port 443: Operation timed out Completed with errors, see above 如果出现 raw.githubusercontent.com 之类的问题都可以采用此类方法解决

解决: hosts 中加入 ip 映射查询真实 IP通过 [IPAddress.com](https://www.ipaddress.com/), 输入 github.com 查询到真实 IP 地址, 然后修改 hosts 映射, 这里需要在本地 ping 下指定的查询出来的 ip , 否则也无法访问

## 删除本地所有的 Tag 并获取服务端所有

```Plaintext
# 删除本地所有tag 并获取服务端所有
$ git tag -l | xargs git tag -d && git fetch --tags
```

## git pull 冲突终极解决方案

服务端 git pull 或 git checkout 报以下错误

> Your local changes to the following files would be overwritten by merge  
> error: Your local changes to the following files would be overwritten by merge:

解决方案：

```Bash
$ git reset --hard HEAD
$ git clean -f -d
```

## LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443

⚠️ 这种情况下 ssh 方式无法访问, 仅仅支持 https 方式, 需要注意

```Plaintext
fatal: unable to access "......" :  LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

用网页访问则没有出现问题, 这个是在自动化翻墙的状态下, 即使设置了系统代理也不行. 突然看到一篇文章 [设置git代理：转：解决Unknown SSL protocol error in connection to code.google.com:443](http://blog.csdn.net/atupal/article/details/8115190) , 完美解决了我的问题.

需要设置 git 代理访问 url

```Plaintext
# 设置 git 的 http.proxy
git config --global http.proxy "127.0.0.1:1087"
```

于是便可以访问了, 完美

![](https://file.wulicode.com/feishu-images/60d3b4c3040459792fae30b0cb0b5de3.png)

## 清理 SourceTree 已经保存的 git 推送密码

**Mac 端**

找到

```Plaintext
$ cd ~/Library/Application\ Support/SourceTree
```

找到符合条件的, 然后进行删除处理

```Plaintext
drwxr-xr-x  3 duoli  staff    96B  7  6 23:58 ImageCache
-rw-r--r--  1 duoli  staff   9.9K  7  8 08:57 browser.plist
-rw-r--r--  1 duoli  staff    82B  7  7 11:47 username@STAuth-code.aliyun.com
-rw-r--r--@ 1 duoli  staff   1.1K  7  7 11:46 hgrc_sourcetree
-rw-r--r--  1 duoli  staff   1.2K  6 25 22:38 hostingservices_new.plist
```

**Windows 端**

```Plaintext
~\AppData\Local\Atlassian\SourceTree\userhost
~\AppData\Local\Atlassian\SourceTree\passwd
```

在 `偏好设置` -> `账户` -> `高级` 中删除指定用户以及用户名即可

![](https://file.wulicode.com/feishu-images/38979cf8814c53fc6ce91baad1803264.png)

![](https://file.wulicode.com/feishu-images/154c69512d93e2a991bb08ac821f2f1c.png)

## Git 使用 ssl 方式导致证书错误

我用这个初始化过 `pod`, 更新过 `brew` , 推送过代码都会出现这个问题.

```Plaintext
fatal: unable to access "......" :  LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

用网页访问则没有出现问题, 这个是在自动化翻墙的状态下, 即使设置了系统代理也不行. 突然看到一篇文章 [设置git代理：转：解决Unknown SSL protocol error in connection to code.google.com:443](http://blog.csdn.net/atupal/article/details/8115190) , 完美解决了我的问题.需要设置 git 代理访问 url

```Plaintext
# 设置 git 的 http.proxy
git config --global http.proxy "127.0.0.1:1087"
```

我本地的地址是 :

![](https://file.wulicode.com/feishu-images/701b2fe18ff68f23c95d465119189ae9.jpg)

于是便可以访问了, 完美

![](https://file.wulicode.com/feishu-images/e83288c7849c4b7c76290356ffa2abd1.jpg)

## Git 保存请求的账号密码的方式

https方式每次都要输入密码，按照如下设置即可输入一次就可以很长时间不用再手输入密码。

第一步：设置邮箱和密码

```Bash
$ git config --global user.email "your email"
$ git config --global user.name  "your username"
```

根据自己的需求执行下面的任意一条命令第二步：

```Bash
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

![](https://file.wulicode.com/feishu-images/5bb8f01ebb086876aaad916a05f440a6.png)

该文件夹会有如下两个文件，这两个文件夹就记录着账号密码相关的信息

![](https://file.wulicode.com/feishu-images/4872d34db8b80f894830135589f7d3d9.png)

## 参考

[git保存用户名密码的方式](https://www.jianshu.com/p/3948a96cec54)