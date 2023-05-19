---
title: "Laravel 曲谱 - 1.2 安装 - c) 创建 Vagrant Box"
date: 2022-04-14 22:14:32
toc: true
categories:
- ["Php","Laravel","Laravel Recipes (Laravel 曲谱)"]
---

原文地址: [Creating a Vagrant Box](http://laravel-recipes.com/recipes/17)


## 问题
> 你需要在Vagrant 中建立一个沙箱
> 尽管你安装了 VirtualBox  和 Vagrant , 你也不能在沙箱中运行任何工作


## 解决方案
> 建立一个 Vagrant Box
> 这个例子将建立一个  Ubuntu 14.04 64bit vanilla box, _vanilla_ 的意思就是没有额外的工具被安装. 就像是一个全新的安装完成的机器.


### Step 1 - 建立一个沙箱的目录
在终端, 创建目录结构
```
$ mkdir vagrant
$ mkdir vagrant/laravel
$ mkdir vagrant/laravel/projects
```

### Step 2 - 创建 Vagrantfile 文件
切换到最新创建的 `vagrant/laravel` 目录, 并创建一个名字为 `Vagrantfile` 的文件, 在这个文件中写入
```
VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.network :private_network, ip: "192.168.100.100"
end
```
> [译注]: 由于网站访问速度很慢, 这里可以先去 [http://www.vagrantbox.es/](http://www.vagrantbox.es/) 下载你需要的镜像 然后把http那行直接换成你本地镜像的路径比较方便和快捷, 我的 box 目录为 `vagrant/box/trusty-server-cloudimg-amd64-vagrant-disk1.box` , 配置的路径是 `../box/trusty-server-cloudimg-amd64-vagrant-disk1.box`
> 为了挂载机器上的目录, 在 end 前加了如下代码, 挂载同步目录
> `config.vm.synced_folder "G:/wamp/www", "/home/www"`
> ![](https://file.wulicode.com/yuque/202208/04/14/5939mRyZua4U.jpg?x-oss-process=image/resize,h_63)


### Step 3 - 创建虚拟机
这个将基于 `Vagrantfile` 的内容下载, 创建和配置虚拟机
```
$ cd vagrant/laravel
$ vagrant up
```
这个将持续一段时间, 特别是你第一次运行安装 `precise64` 的时候<br />![](https://file.wulicode.com/yuque/202208/04/14/5940jBl7AJjI.jpg?x-oss-process=image/resize,h_653)

### Step 4 - 配置运行环境
接下来我们将连接到虚拟机, 做一些小改动
```
$ cd vagrant/laravel
$ vagrant ssh
```
> [译注]: 由于没有ssh 客户端会提示这个错误

![](https://file.wulicode.com/yuque/202208/04/14/5940y8WrQmrc.jpg?x-oss-process=image/resize,h_169)<br />这里将 Cygwin, MinGW, Git 的含有 `ssh.exe` 的文件目录加入环境变量然后重新运行下就OK<br />![](https://file.wulicode.com/yuque/202208/04/14/5940FXej65JV.jpg?x-oss-process=image/resize,h_202)<br />在你连接成功之后, 你的提示将变成 `vagrant@precise64-vanilla` , 这表示你成功的登陆了虚拟机.
```
vagrant@precise64-vanilla:~$ echo "export PS1='laravel:\w\$ '" >> .bashrc
vagrant@precise64-vanilla:~$ ln -s /vagrant/projects
vagrant@precise64-vanilla:~$ cat << EOF | sudo tee -a /etc/motd.tail
***************************************
Welcome to precise64-vanilla Vagrant Box
For Laravel development
***************************************
EOF
vagrant@precise64-vanilla:~$ exit
```

### Step 5 - 安装基本项目
现在当你连接时你会收到我们的最后一步中创建的新欢迎消息, 现在的提示将是 'laravel' 而不是 'vagrant@precise64-vanilla'。
```
$ cd vagrant/laravel
$ vagrant ssh
laravel:~$ sudo apt-get update
laravel:~$ sudo apt-get install -y python-software-properties build-essential
laravel:~$ sudo add-apt-repository -y ppa:ondrej/php5
laravel:~$ sudo apt-get update
laravel:~$ sudo apt-get install git-core subversion curl php5-cli php5-curl \
laravel:~$ exit
```

## 讨论
以下是每个步骤的详细步骤<br />**Step 1**<br />创建一个名字为 `vagrant` 的子目录, 所有的 `Vagrant` 文件都保存在这个文件夹里, `laravel` 目录保存我们创建的虚机, 如果你设置另外一个虚机, 在 `vagrant` 下创建另外一个目录就OK<br />**Step 2**<br />这个 `Vagrantfile` 文件指定了虚机的名称 (precise64), 并告知怎样找到这个url, 第一次安装虚机, Vagrant 将会下载这个镜像, 但是随后的安装将会快很多<br />`config.vm.network` 折行代码指定了这个虚拟机拥有一个 `192.168.100.100` 的IP, 你可以使用任何一个和你内网不冲突的IP地址就可以, 只要保持 `192.168.*.*` 这种格式就OK<br />当虚机运行的时候, 你可以用浏览器访问 `192.168.100.100` 来查看虚拟机上的页面[译注:前提是你安装了web服务器]<br />**Step 3**<br />`vagrant up` 命令将初始虚机并启动它.这一步可能执行一段时间. 特别是你第一次运行 _precise64_ 的时候你需要下载操作系统. 一旦机器配置好了, 只需要一两秒的时候就能够启动.<br />**Step 4**<br />`echo "export PS1..."` 这一行将在下次登录虚机的时候创建, 这个将使用 `vagrant:~$` 来替代 `vagrant@precise64-vanilla:~$`. 如果你使用多个 Vagrant 虚拟, 你需要通过这个标识符来识别你运行的是哪个虚机.<br />`ln -s /vagrant/projects` 将在项目的根目录创建一个到第一步创建目录软连接(?). 所有新的 Laravel 项目都将创建在这里并且都能够在主操作系统进行编辑. Vagrant 和主机来共享这个目录. 如果你从主机上编辑 `~/vagrant/laravel/projects/test.txt` , 你也能够冲 Vagrant 的 `~/projects/test.txt` 来看到这个文件.<br />**Step 5**<br />这步骤安装了基础了系统组件. 他包含了 git, subversion, 和最新版的 PHP
> 这些设置步骤是大家熟知的规则. Vagrant 提供了很多种方式来安装一个虚机. 查看 `Provisioning Vagrant with a Shell Script`

