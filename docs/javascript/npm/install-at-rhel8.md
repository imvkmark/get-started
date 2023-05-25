# RHEL8 安装 nodejs

> 首先确保机器上安装了 epel(多了一个源选项)

## 安装 node

列出源

```
$ dnf module list nodejs
Last metadata expiration check: 0:00:17 ago on Thu 26 May 2022 06:55:55 AM CST.
Rocky Linux 8 - AppStream
Name                Stream               Profiles                             
nodejs              10 [d]               common [d], development, minimal, s2i
nodejs              12                   common [d], development, minimal, s2i
nodejs              14                   common [d], development, minimal, s2i
nodejs              16                   common [d], development, minimal, s2i

Extra Packages for Enterprise Linux Modular 8 - x86_64
Name                Stream               Profiles                             
nodejs              13                   default, development, minimal        
nodejs              16-epel              default, development, minimal        
```

启用源

```
# dnf module enable nodejs:16
```

安装

```
# dnf module install nodejs
```

## 配置 node 环境

安装 `nrm`, 方便切换镜像源

```
# npm install -g nrm --registry=https://registry.npmmirror.com
```

切换镜像源

```
$ nrm use taobao
```

