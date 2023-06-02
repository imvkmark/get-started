# 设置 SSH 安全通过密钥,免密码登录服务器或拉取代码

我们一般使用 PuTTY 等 SSH 客户端来远程管理 Linux 服务器。但是，一般的密码方式登录，容易有密码被暴力破解的问题。所以，一般我们会将 SSH 的端口设置为默认的 22
以外的端口，或者禁用 root 账户登录。其实，有一个更好的办法来保证安全，而且让你可以放心地用 root 账户从远程登录——那就是通过密钥方式登录。

密钥形式登录的原理是：利用密钥生成器制作一对密钥——一只公钥和一只私钥。将公钥添加到服务器的某个账户上，然后在客户端利用私钥即可完成认证并登录。这样一来，没有私钥，任何人都无法通过
SSH 暴力破解你的密码来远程登录到系统。此外，如果将公钥复制到其他账户甚至主机，利用私钥也可以登录。
> 这个方式同样可以拉取 git 代码, 后续会附上如何在 coding 中配置公钥

## 1. 制作密钥

下面来讲解如何在 Linux 服务器上制作密钥对，将公钥添加给账户，设置 SSH，最后通过客户端登录。

### 1) 制作密钥对

首先在服务器上制作密钥对。首先用密码登录到你打算使用密钥登录的账户，然后执行以下命令：
> 对于 Centos 版本比较高的系统, 需要使用长度较长的密钥, 可能比较弱的密钥在高版本系统中根本无法通过授权 userauth-request for user liexiang service ssh-connection
> method none [preauth] 可能是无法找到匹配的方法,不安全的密钥已经不支持了

```
# 使用给定的 email 注释 public/private rsa 密钥
# 需要配置 .ssh/config
cd ~/
ssh-keygen
# or
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

密钥锁码在使用私钥时必须输入，这样就可以保护私钥不被盗用。当然，也可以留空，实现无密码登录。

现在，在指定的目录中生成了一个有两个密钥文件。id_rsa 为私钥，id_rsa.pub 为公钥。

### 2) 在服务器上安装公钥

**方法一 : 使用 `ssh-copy-id` 命令安装**

> 公钥复制到远程机器, 并自动配置好权限密钥

```
$ ssh-copy-id -i {dir-of-keys}/rsa2.pub user@host
```

**方法二 : 进入服务器手动设定文件和目录的权限**

键入以下命令，在服务器上安装公钥：

```
$ cd .ssh
$ cat id_rsa.pub >> authorized_keys
```

如此便完成了公钥的安装。为了确保连接成功，请保证以下文件权限正确：

```
$ chmod 600 authorized_keys
$ chmod 700 ~/.ssh
```

### 3) 设置 SSH，打开密钥登录功能

编辑 `/etc/ssh/sshd_config` 文件，进行如下设置：

> RSAAuthentication yes 这个选项在 centos 7.4 以后已经废弃, 无需配置此选项

```
PubkeyAuthentication yes
```

另外，请留意 root 用户能否通过 SSH 登录：

```
PermitRootLogin yes
```

当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：

```
PasswordAuthentication no
```

最后，重启 SSH 服务：

```
$ systemctl restart sshd
```

## 2. 客户端配置私钥 config 配置

很多时候，我们开发可能需要连接多台远程服务器，并且需要配置 git 服务器的私钥。那么这么多的服务器不能共用一套私钥，不同的服务器应该使用不同的私钥。但是我们从上面的连接流程可以看到，ssh
默认是去读取 `$HOME/.ssh/id_rsa` 文件作为私钥登录的。如果想要不同的服务器使用不同的私钥进行登录，那么需要在 `.ssh` 目录下编写 `config` 文件来进行配置。

`config` 的配置很简单，只要指明哪个用户登录哪台远程服务器需要使用哪个私钥即可。下面给出一个配置示例。

```
Host github.com
    User duoli
    IdentityFile ~/.ssh/id_rsa.github
Host 192.168.1.1
    User ubuntu
    IdentityFile ~/.ssh/id_rsa.xxx
```

**另一种方式** 支持名字的映射

```
Host test
    HostName 192.168.1.21
    User liexiang
    IdentityFile ~/.ssh/liexiang
```

上面 `config` 文件字段含义如下：

- Host 指明了远程主机的 ip，除了使用 ip 地址，也可以直接使用网址。
- HostName 主机真实名称, ip 或者网址
- User 指的是登录远程主机的用户。
- IdentityFile 指明使用哪个私钥文件。

编写好 `config` 文件之后，需要把 `config` 文件的权限改为 `rw-r--r--` 。如果权限过大，ssh 会禁止登录。

参考文章:

- [SSH 密钥登录流程分析](https://juejin.im/post/5a2941ad6fb9a045030ffc95)
- [Github ssh key 生成，免密登录服务器方法](https://deepzz.com/post/github-generate-ssh-key.html)

## 3. Git 无密码进行拉取或者代码推送

所谓部署， 我的理解就是在用户保证代码质量的前提下, 将代码能够快速的自动部署到目标服务器上的一种手段.

具体步骤参照 [配置 SSH 公钥](https://help.coding.net/docs/project-settings/ssh.html)
> 主机配置同上

### 1). 在 coding 中添加公钥

输出部署公玥

```
$ cat coding.pub
```

在 git 管理端部分部署公钥

![](https://file.wulicode.com/note/2021/10-23/11-14-35507.png#id=omXj0&originHeight=500&originWidth=1600&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2). 测试是否可以链接到 [git@e.coding.net](mailto:git@e.coding.net) 服务器

> 注意 e.coding.net 接入到 CDN 上所以会解析多个不同的 host ip

```
$ ssh -T git@e.coding.net
CODING 提示: Hello ***, You've connected to coding.net via SSH. This is a Deploy Key.
III，你好，你已经通过 SSH 协议认证 coding.net 服务，这是一个部署公钥.
公钥指纹：75:0a:63:d4:6a:6b:16:aa:22:35:80:d4:36:dc:60:c5
```

这样便算是连接成功

### 3). 克隆代码

在 coding 网站找到 ssh 对应地址

```
$ git clone git@e.coding.com:user/project.git
```

这样便可以进行代码的无密码更新了

## 4. QA:

在配置登录的时候如果遇到了登录问题可以以下几个方式跟踪下

### 1) 使用 ssh 登录服务器的时候可以使用 verbose 模式调试

```
ssh server_name -vvv
```

**开启 sshd_config 的 debug 模式**

可以查看服务器的详细的错误信息

```
$ vim /etc/ssh/sshd_config
# 之前
# LogLevel INFO

# 更改为LogLevel DEBUG

$ tail -20f /var/log/secure
Jun  9 12:05:11 23 sshd[26890]: debug1: PAM: setting PAM_RHOST to "192.168.1.101"
Jun  9 12:05:11 23 sshd[26890]: debug1: PAM: setting PAM_TTY to "ssh"...
```

**查看服务器的登录日志**

```
$ tail -20f /var/log/secure
Jun  9 12:05:11 23 sshd[26890]: debug1: PAM: setting PAM_RHOST to "192.168.1.101"
Jun  9 12:05:11 23 sshd[26890]: debug1: PAM: setting PAM_TTY to "ssh"
Jun  9 12:05:11 23 sshd[26890]: debug1: userauth-request for user duoli service ssh-connection method publickey [preauth]
Jun  9 12:05:11 23 sshd[26890]: debug1: attempt 1 failures 0 [preauth]
Jun  9 12:05:11 23 sshd[26890]: debug1: temporarily_use_uid: 1000/1000 (e=0/0)
Jun  9 12:05:11 23 sshd[26890]: debug1: trying public key file /home/user/.ssh/authorized_keys
Jun  9 12:05:11 23 sshd[26890]: debug1: Could not open authorized keys '/home/user/.ssh/authorized_keys': Permission denied
Jun  9 12:05:11 23 sshd[26890]: debug1: restore_uid: 0/0
```

### 2) ssh 登录慢，卡顿在 pledge: network 之后

当 ssh 登录缓慢的时候我们需要 使用

```
$ ssh -v user@host
```

来查看问题出现的原因, 根据出现的问题来进行处理

我这里出现的问题是在 `pledge: network` 之后出现卡顿

处理结果

```
# echo "" > /var/log/btmp
```

主要原因是 22 端口对外暴露，导致大量的爆破扫描，因此导致 btmp 这个文件巨大

参考地址 : [ssh connection takes forever to initiate, stuck at “pledge: network”](https://serverfault.com/questions/792486/ssh-connection-takes-forever-to-initiate-stuck-at-pledge-network)

![](https://file.wulicode.com/note/2021/10-23/11-14-13819.png#height=192&id=UhHBF&originHeight=440&originWidth=1332&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=581)

我们可以通过如下命令查看恶意 ip 试图登录次数：

```
lastb | awk ‘{ print $3}’ | sort | uniq -c | sort -n
```

### 3) 修改 ssh 默认登录的端口

用编辑器打开 SSH 配置文件，修改端口：

```
# vi /etc/ssh/sshd_config
```

找到行 `#Port 22` （默认端口为 22），修改端口为其他端口, 不要出现端口冲突

```
Port 5022
```

重启 SSH 服务：

```
# systemctl restart sshd
```

修改防火墙，允许访问 5022 的端口，并且重启防火墙服务：

```
# 配置 5022
$ firewall-cmd --permanent --zone=public --add-port=5022/tcp
# 重启
$ firewall-cmd --reload
```

如果是 Aliyun 主机, 则需要在对应的安全组打开端口访问权限, 否则一样无法访问主机

## 参考

- [设置 SSH 通过密钥登录](https://hyjk2000.github.io/2012/03/16/how-to-set-up-ssh-keys/)
- [SSH 密钥登录流程分析](https://juejin.im/post/5a2941ad6fb9a045030ffc95)
- [Github ssh key 生成，免密登录服务器方法](https://deepzz.com/post/github-generate-ssh-key.html)

