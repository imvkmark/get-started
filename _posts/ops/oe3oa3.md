---
title: "repo文件说明使用和常用源 aliyun,remi,webtatic"
date: 2018-05-25 11:32:26
toc: true
categories:
- ["Ops","CentOS","Dnf \/ Yum \/ Repo 仓库"]
---

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

## 常用 repo 源

### 阿里云
 http://mirrors.aliyun.com/repo/ 

**地址列表**

- 5  http://mirrors.aliyun.com/repo/Centos-5.repo 
- 6  http://mirrors.aliyun.com/repo/Centos-6.repo 
- 7  http://mirrors.aliyun.com/repo/Centos-7.repo 

```
cd /etc/yum.repos.d
wget http://mirrors.aliyun.com/repo/Centos-7.repo
```


### 163
centos 帮助文件  http://mirrors.163.com/.help/centos.html 

镜像列表  http://mirrors.163.com/ 

**地址列表**

-  http://mirrors.163.com/.help/CentOS5-Base-163.repo 
-  http://mirrors.163.com/.help/CentOS6-Base-163.repo 
-  http://mirrors.163.com/.help/CentOS7-Base-163.repo 


### remi 源

#### 说明
 https://rpms.remirepo.net/  是包含最新版本 PHP 和 MySQL 包的 Linux 源，由 Remi 提供维护。有个这个源之后，使用 YUM 安装或更新 PHP、MySQL、phpMyAdmin 等服务器相关程序的时候就非常方便了。地址可以在页面上复制找到


#### 安装 Remi 源
```
# yum install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
```

```
# dnf install https://mirrors.tuna.tsinghua.edu.cn/remi/enterprise/remi-release-8.rpm
```


#### 更新
```shell
# 安裝好之後 , 可以用 yum 指令檢查更新
yum --enablerepo=remi check-update
# 這樣應該可以找到 php 與 mysql 有更新的套件 , 然後就可以進行更新指令如下
yum --enablerepo=remi upgrade php
```


### rpmforge
rpmforge 有我們常常用的 rsync 最新版

地址 :  http://pkgs.repoforge.org/rpmforge-release/ 

**更新**

```
cd /etc/yum.repos.d
wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm
rpm -Uvh rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm
yum --enablerepo=rpmforge check-update
```


### webtatic
[webtatic](https://www.webtatic.com) 主要供应最新LAMP等软件源, 最新的 repo 地址 [Webtatic Yum Repository](https://webtatic.com/projects/yum-repository/)

安装：

```shell
# Webtatic EL7 for CentOS/RHEL 7:
rpm -Uvh https://mirror.webtatic.com/yum/el7/epel-release.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

# Webtatic EL6 for CentOS/RHEL 6:
rpm -Uvh https://mirror.webtatic.com/yum/el6/latest.rpm
```

## 报错

### 版本不正确
> YumRepo Error: All mirror URLs are not using ftp, http[s] or file.

Eg. 5.10 is not a valid and current release or hasnt been released yet/

removing mirrorlist with no valid mirrors: /var/cache/yum/base/mirrorlist.txt

- 原因

版本不对, centos 是 5.10 的版本,但是发行url里没有这个repo

**解决方法**

- 下载 aliyun 5 的 repo 文件
- 更改本地的 repo 文件并备份
- 测试运行


## 参考文章

- [兩個我常用的 CentOS Yum Repo](http://www.pigo.idv.tw/archives/242)


## 安装PHP扩展

安装 bcmath

```
yum --disablerepo="*" --enablerepo="remi" install php56-*-bcmath
```

