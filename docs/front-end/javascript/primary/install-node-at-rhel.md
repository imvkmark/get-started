---
description: '在RHEL8/CentOS7上安装Node.js，先确保有epel源，然后通过`dnf module list nodejs`查看可用版本，启用`nodejs:18`模块，最后执行`dnf module install nodejs`或`yum install nodejs`完成安装。'
lastUpdated: '2026-06-30 22:47:35'
head:
  - - meta
    - name: 'og:title'
      content: 'RHEL8 CentOS7 安装 nodejs'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在RHEL8/CentOS7上安装Node.js，先确保有epel源，然后通过`dnf module list nodejs`查看可用版本，启用`nodejs:18`模块，最后执行`dnf module install nodejs`或`yum install nodejs`完成安装。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/javascript/primary/install-node-at-rhel.html'
---
# RHEL8 CentOS7 安装 nodejs

> 首先确保机器上安装了 epel(多了一个源选项)

## Rocky Linux 9 / RHEL 8

列出源

```Bash
dnf module list nodejs
```

```Plaintext
Last metadata expiration check: 0:00:34 ago on Tue 29 Aug 2023 12:12:02 PM CST.
Rocky Linux 9 - AppStream
Name     Stream        Profiles                                 Summary
nodejs   18 [e]        common [d], development, minimal, s2i    Javascript runtime

Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled
```

启用源

```Bash
dnf module enable nodejs:18
```

安装

```Bash
dnf module install nodejs
```

## CentOS 7 安装

```Bash
yum install nodejs
yum install npm
```

创建文件夹并给文件夹赋予权限

```Plaintext
$ sudo mkdir -p /usr/local/lib/node_modules/
$ sudo chown -R root:$(whoami) /usr/local/lib/node_modules/
$ chmod -R 775 /usr/local/lib/node_modules/
```

安装全局的命令需要使用 sudo 提权

```Plaintext
$ sudo npm install -g apidoc
```

## 配置 node 环境

安装 `nrm`, 方便切换镜像源

```Plaintext
# npm install -g nrm --registry=https://registry.npmmirror.com
```

切换镜像源

```Plaintext
$ nrm use taobao
```