---
description: 'Ubuntu可通过官方安装包、系统命令等方式安装Node.js，并推荐设置npm淘宝镜像或使用cnpm替代npm以加速下载。'
lastUpdated: '2026-07-02 21:16:41'
head:
  - - meta
    - name: 'og:title'
      content: 'Ubuntu 安装 Nodejs 并配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Ubuntu可通过官方安装包、系统命令等方式安装Node.js，并推荐设置npm淘宝镜像或使用cnpm替代npm以加速下载。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/front-end/javascript/primer/install-node-at-ubuntu.html'
---
# Ubuntu 安装 Nodejs 并配置

## 安装 node

### 官方安装包管理方式进行安装

Node 官方网站有详细的安装教程 , [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/), 这里摘要出 ubuntu 上的安装办法这种方法仅仅适用于

- 设置源**nodejs 4.x.**

```Plaintext
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

**nodejs 6.x**

```Plaintext
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

- 安装构建工具编译和安装本地插件, 需要安装构建工具

```Plaintext
$ sudo apt-get install -y build-essential
```

### 直接使用系统命令进行安装

```Plaintext
$ sudo apt-get install nodejs node npm node-leagcy
```

## 设置 npm 的淘宝镜像

淘宝 npm 镜像地址: [https://npm.taobao.org/](https://npm.taobao.org/)

### 使用 cnpm 代替 npm

```Plaintext
$ sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
```

以后安装包的时候则可以使用 cnpm 替代 npm 来安装包