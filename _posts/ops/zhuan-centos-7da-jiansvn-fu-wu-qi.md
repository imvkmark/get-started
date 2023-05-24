---
title: "[转+] CentOS 7搭建SVN服务器"
date: 2021-06-26 10:31:02
toc: true
categories:
- ["Ops","CentOS"]
---

原文地址:[CentOS 7搭建SVN服务器](http://www.centoscn.com/CentosServer/ftp/2015/0622/5708.html)

安装步骤如下：





### 安装 subversion

```
# 安装 subversion
$ yum install subversion

# 测试当前版本
$ svnserve --version
svnserve, version 1.7.14 (r1542130)
   compiled Nov 20 2015, 19:25:09

Copyright (C) 2013 The Apache Software Foundation.
This software consists of contributions made by many people; see the NOTICE
file for more information.
Subversion is open source software, see http://subversion.apache.org/

The following repository back-end (FS) modules are available:

* fs_base : Module for working with a Berkeley DB repository.
* fs_fs : Module for working with a plain file (FSFS) repository.

Cyrus SASL authentication is available.
```


### 创建版本库

```
# 创建文件夹
$ mkdir -p /data/svn/tech

# 创建版本库
$ svnadmin create /data/svn/tech
```

执行以上命令之后会生成如下文件,每个文件介绍如下

```
├── conf
│   ├── authz           # 权限控制文件
│   ├── passwd          # 密码文件
│   └── svnserve.conf   # SVN服务配置文件
├── db
│   ├── current
│   ├── format
│   ├── fsfs.conf
│   ├── fs-type
│   ├── min-unpacked-rev
│   ├── revprops
│   │   └── 0
│   │       └── 0
│   ├── revs
│   │   └── 0
│   │       └── 0
│   ├── transactions
│   ├── txn-current
│   ├── txn-current-lock
│   ├── txn-protorevs
│   ├── uuid
│   └── write-lock
├── format
├── hooks
│   ├── post-commit.tmpl
│   ├── post-lock.tmpl
│   ├── post-revprop-change.tmpl
│   ├── post-unlock.tmpl
│   ├── pre-commit.tmpl
│   ├── pre-lock.tmpl
│   ├── pre-revprop-change.tmpl
│   ├── pre-unlock.tmpl
│   └── start-commit.tmpl
├── locks
│   ├── db.lock
│   └── db-logs.lock
└── README.txt
```


### 配置账号密码

设置帐号密码

```
# 在[users]块中添加用户和密码，格式：帐号=密码
$ vim conf/passwd
[users]
user01=123456
```

设置权限

```
$ vim conf/authz
```

在末尾添加如下代码：

```
[/]  
user01=rw
```

这里的意思是根目录对 `user01` 用户可写,


添加完成之后代码如下所示

```
...
# [repository:/baz/fuz]
# @harry_and_sally = rw
# * = r
[/]  
user01=rw
```


### 配置服务器信息

修改svnserve.conf文件

```
$ vim conf/svnserve.conf
```

打开下面几个注释

```
auth-access = write   # 授权用户可i读写
password-db = passwd  # 使用哪个文件作为账号文件
authz-db = authz      # 使用哪个文件作为权限文件
realm = My Svn Repo   # 认证空间名
```


### 启动svn版本库

```
# 启动版本库
$ svnserve -d -r /data/svn/svnrepos

# 停止 svn 服务
$ killall svnserve
```

**（停止SVN命令  **killall svnserve**）


### 修改启动的端口号

基于svnserve的，默认端口为3690，有时候，我们会因为防火墙或其它原因，需要修改这些默认端口。

下面根据不同的配置讲讲如何改变这些默认端口。

通过 `svnserve -d -r /data/svn/repos` 来提供服务

为 `svnserve` 加上 `--listen-port` 参数，比如 `svnserve -d -r /data/svn/repos --listen-port 81`(注：--listen-port中间无隔)

到此，在CentOS 7上搭建SVN服务器已经完成


## 安装 apache / dav 模块支持 apache 访问

```
yum install httpd mod_dav_svn
```

修改 apache 端口号, 并不对外访问, 监听本地的 9278 端口

**/etc/httpd/conf/httpd.conf**

```
port 127.0.0.1:9278
```

svn 配置

```
<Location /svn>
    DAV svn
    SVNPath /svn/root/path
    AuthType Basic
    AuthName "Authorization Realm"
    AuthUserFile /svn/root/path/conf/passwdfile
    AuthzSVNAccessFile /svn/root/path/conf/authz
    Require valid-user
</Location>
```


### 附录

`conf/svnserve.conf` 文件

```conf
### This file controls the configuration of the svnserve daemon, if you
### use it to allow access to this repository.  (If you only allow
### access through http: and/or file: URLs, then this file is
### irrelevant.)

### Visit http://subversion.apache.org/ for more information.

[general]
### The anon-access and auth-access options control access to the
### repository for unauthenticated (a.k.a. anonymous) users and
### authenticated users, respectively.
### Valid values are "write", "read", and "none".
### Setting the value to "none" prohibits both reading and writing;
### "read" allows read-only access, and "write" allows complete 
### read/write access to the repository.
### The sample settings below are the defaults and specify that anonymous
### users have read-only access to the repository, while authenticated
### users have read and write access to the repository.
anon-access = none
auth-access = write
### The password-db option controls the location of the password
### database file.  Unless you specify a path starting with a /,
### the file's location is relative to the directory containing
### this configuration file.
### If SASL is enabled (see below), this file will NOT be used.
### Uncomment the line below to use the default password file.
password-db = passwd
### The authz-db option controls the location of the authorization
### rules for path-based access control.  Unless you specify a path
### starting with a /, the file's location is relative to the the
### directory containing this file.  If you don't specify an
### authz-db, no path-based access control is done.
### Uncomment the line below to use the default authorization file.
authz-db = authz
### This option specifies the authentication realm of the repository.
### If two repositories have the same authentication realm, they should
### have the same password database, and vice versa.  The default realm
### is repository's uuid.
realm = Liexiang  Repository
### The force-username-case option causes svnserve to case-normalize
### usernames before comparing them against the authorization rules in the
### authz-db file configured above.  Valid values are "upper" (to upper-
### case the usernames), "lower" (to lowercase the usernames), and
### "none" (to compare usernames as-is without case conversion, which
### is the default behavior).
# force-username-case = none

[sasl]
### This option specifies whether you want to use the Cyrus SASL
### library for authentication. Default is false.
### This section will be ignored if svnserve is not built with Cyrus
### SASL support; to check, run 'svnserve --version' and look for a line
### reading 'Cyrus SASL authentication is available.'
# use-sasl = true
### These options specify the desired strength of the security layer
### that you want SASL to provide. 0 means no encryption, 1 means
### integrity-checking only, values larger than 1 are correlated
### to the effective key length for encryption (e.g. 128 means 128-bit
### encryption). The values below are the defaults.
# min-encryption = 0
# max-encryption = 256
```

