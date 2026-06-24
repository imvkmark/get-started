---
description: '使用SSH密钥实现服务器无密码登录和Git代码推送：先生成密钥对，将公钥安装到服务器并开启密钥登录，客户端配置私钥；在Coding平台添加公钥，配置SSH config实现免密拉取代码。常见问题可通过-v调试、清理日志、修改端口、处理签名算法错误、保持连接等方式解决。'
lastUpdated: '2026-06-21 17:34:05'
head:
  - - meta
    - name: 'og:title'
      content: '使用 SSH 密钥登录服务器或拉取代码'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用SSH密钥实现服务器无密码登录和Git代码推送：先生成密钥对，将公钥安装到服务器并开启密钥登录，客户端配置私钥；在Coding平台添加公钥，配置SSH config实现免密拉取代码。常见问题可通过-v调试、清理日志、修改端口、处理签名算法错误、保持连接等方式解决。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/ssh/login-and-deploy.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/545f135f26637db8f7453f3b0f9619ef.png'
---
# 使用 SSH 密钥登录服务器或拉取代码

[[Linux][转+] 设置 SSH 安全通过密钥/免密码登录服务器或拉取 git 代码](https://juejin.cn/post/6996293274013007879)

@掘金

我们一般使用 PuTTY 等 SSH 客户端来远程管理 Linux 服务器。但是，一般的密码方式登录，容易有被暴力破解的问题。所以，一般我们会将 SSH 的端口设置为默认的 22 以外的端口，或者禁用 root 账户登录。

除此之外，还有一个更好的办法来保证账号安全，并且可以让你放心地用 root 账户远程登录——那就是通过密钥

密钥登录的原理是：利用密钥生成器制作一对密钥——一只公钥和一只私钥。将公钥添加到服务器的某个账户上，然后在客户端利用私钥即可完成认证并登录。这样一来，没有私钥，任何人都无法通过简单的 SSH 暴力破解你的密码来远程登录到系统。此外，如果将公钥复制到其他账户甚至主机，利用私钥也可以登录。

这个方式同样可以拉取代码

## 1. 制作密钥

在制作密钥之前我们先说明下密钥存放的目录以及权限问题, 如果遇到配置了公私钥但是无法登入的情况首先检查下服务器的权限

> SSH 用户的主目录或 `~/.ssh` 目录具有组写入权限。主目录应该只能由用户或所有者写入  
> `~/.ssh` 权限应设置为 700  
> `authorized_keys` 文件权限应设置为 600

下面来讲解如何制作密钥对

> 对于 Centos 版本比较高的系统, 需要使用长度较长的密钥, 比较弱的密钥在高版本系统中根本无法通过授权  
> `userauth-request for user duoli service ssh-connection method none [preauth]`  
> 可能是无法找到匹配的方法,不安全的密钥已经不支持了

ed25519

```Plaintext
$ ssh-keygen -m PEM -t ed25519 -C "your.email@example.com"
```

rsa

```Plaintext
# 使用给定的 email 注释 public/private rsa 密钥
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

密钥锁码在使用私钥时必须输入，这样就可以保护私钥不被盗用。当然，也可以留空，实现无密码登录。现在，在指定的目录中生成了一个有两个密钥文件。id_rsa 为私钥，id_rsa.pub 为公钥

## 2. 服务器使用密钥登录

### 1) 在服务器上安装公钥

**方法一 : 使用** `ssh-copy-id`命令安装

> 公钥复制到远程机器, 并自动配置好权限密钥

```Plaintext
$ ssh-copy-id -i {dir-of-keys}/rsa2.pub user@host
```

**方法二 : 进入服务器手动设定文件和目录的权限**

键入以下命令，在服务器上安装公钥：

```Plaintext
$ cd .ssh
$ cat id_rsa.pub >> authorized_keys
```

如此便完成了公钥的安装。为了确保连接成功，请保证以下文件权限正确：

```Plaintext
$ chmod 600 authorized_keys
$ chmod 700 ~/.ssh
```

### 2) 设置 SSH，打开密钥登录功能

编辑 `/etc/ssh/sshd_config` 文件，进行如下设置：

> RSAAuthentication yes  这个选项在 centos 7.4 以后已经废弃, 无需配置此选项

```Plaintext
PubkeyAuthentication yes
```

另外，请留意 root 用户能否通过 SSH 登录：

```Plaintext
PermitRootLogin yes
```

当你完成全部设置，并以密钥方式登录成功后，再禁用密码登录：

```Plaintext
PasswordAuthentication no
```

最后，重启 SSH 服务：

```Plaintext
$ systemctl restart sshd
```

### 3) 客户端配置私钥 config 配置

很多时候，我们开发可能需要连接多台远程服务器，并且需要配置 git 服务器的私钥。那么这么多的服务器不能共用一套私钥，不同的服务器应该使用不同的私钥。但是我们从上面的连接流程可以看到，ssh 默认是去读取 `$HOME/.ssh/id_rsa` 文件作为私钥登录的。如果想要不同的服务器使用不同的私钥进行登录，那么需要在 `.ssh` 目录下编写 `config` 文件来进行配置。

`config` 的配置很简单，只要指明哪个用户登录哪台远程服务器需要使用哪个私钥即可。下面给出一个配置示例。

```Plaintext
Host github.com
    User duoli
    IdentityFile ~/.ssh/id_rsa.github
Host 192.168.1.1
    User ubuntu
    IdentityFile ~/.ssh/id_rsa.xxx
```

**另一种方式** 支持名字的映射

```Plaintext
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

## 3. Git 无密码进行拉取或者代码推送

所谓部署， 我的理解就是在用户保证代码质量的前提下, 将代码能够快速的自动部署到目标服务器上的一种手段.具体步骤参照 [配置 SSH 公钥](https://help.coding.net/docs/project-settings/ssh.html) > 主机配置同上

### 1). 在 coding 中添加公钥

输出部署公玥

```Plaintext
$ cat coding.pub
```

在 git 管理端部分部署公钥

![](https://file.wulicode.com/feishu-images/545f135f26637db8f7453f3b0f9619ef.png)

### 2) 配置 config 文件

编辑 `~/.ssh/config` 文件

```Plaintext
Host coding
    HostName git.coding.net
    User duoli
    IdentityFile ~/.ssh/coding_rsa
```

> Host : 主机的简称  
> HostName : 主机真实名称  
> User : 用户名  
> IdentityFile : 私钥位置

### 3). 测试是否可以链接到 git@e.coding.net 服务器

> 注意 e.coding.net 接入到 CDN 上所以会解析多个不同的 host ip

```Plaintext
$ ssh -T git@e.coding.net
CODING 提示: Hello ***, You've connected to coding.net via SSH. This is a Deploy Key.
III，你好，你已经通过 SSH 协议认证 coding.net 服务，这是一个部署公钥.
公钥指纹：75:0a:63:d4:6a:6b:16:aa:22:35:80:d4:36:dc:60:c5
```

这样便算是连接成功

### 4). 克隆代码

在 coding 网站找到 ssh 对应地址

```Plaintext
$ git clone git@e.coding.com:user/project.git
```

这样便可以进行代码的无密码更新了

## 4. QA:

在配置登录的时候如果遇到了登录问题可以以下几个方式跟踪下

### 1) 使用 ssh 登录服务器的时候可以使用 verbose 模式调试

```Plaintext
ssh server_name -vvv
```

对于无法使用客户端纠错的场景, 只能使用服务端日志, 在开启日志之前我们需要设置 Log 级别为 DEBUG, 方便查找问题

**开启 sshd_config 的 debug 模式**

```Bash
vim /etc/ssh/sshd_config
```

启动 Debug

```Plaintext
- # LogLevel INFO
+ LogLevel DEBUG
```

重启服务

```Bash
systemctl restart sshd
```

可以查看服务器的详细的错误信息, 这里需要通过查日志的手法来查看下登录的问题, CentOS 的SSH登录信息记录在 `/var/log/secure`文件中，找到下面的信息：

**查看服务器的登录日志**

```Plaintext
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

服务器端的错误： `bad ownership or modes for directory…`

对于这个存放公钥的目录的权限要求是只有本人才可以读写的，应该是700！否则，缺省的情况下会拒绝进行authentication.

::: warning ⚠️
需要注意：
1. 仔细看 log 是发现问题原因的很重要的手段
2. SSH公钥认证必须设置合适的权限 : `.ssh`目录的权限为 700， `authorized_keys`的权限为 600
:::

### 2) 客户端使用 -v 参数来进行纠错

通过下面的debug方式得到信息如下：

```Plaintext
$ ssh -v username@ip
```

```Plaintext
OpenSSH_7.4p1, OpenSSL 1.0.2k-fips  26 Jan 2017
# 读取配置
debug1: Reading configuration data /root/.ssh/config
...

# 建立连接
debug1: Connecting to 10.25.80.75 [10.25.80.75] port 22.
debug1: Connection established.

# 校验
debug1: kex: algorithm: curve25519-sha256
debug1: Trying private key: /root/.ssh/8x
debug1: Authentications that can continue: publickey,gssapi-keyex,gssapi-with-mic,password

# 校验失败, 走密码验证
debug1: Next authentication method: password
```

通过上述的 `ssh -v` 命令可以看到，客户机已经把私钥发送到服务器端，但在服务器端没有验证成功，所以问题应该位于服务器端。

### 3) ssh 登录慢，卡顿在 pledge: network 之后

当 ssh 登录缓慢的时候我们需要 使用

```Plaintext
$ ssh -v user@host
```

来查看问题出现的原因, 根据出现的问题来进行处理我这里出现的问题是在 `pledge: network` 之后出现卡顿处理结果

```Plaintext
# echo "" > /var/log/btmp
```

主要原因是 22 端口对外暴露，导致大量的爆破扫描，因此导致 btmp 这个文件巨大

参考地址 : [ssh connection takes forever to initiate, stuck at “pledge: network”](https://serverfault.com/questions/792486/ssh-connection-takes-forever-to-initiate-stuck-at-pledge-network)

![](https://file.wulicode.com/feishu-images/8e51ff3cffaf2e816e595611f7c15a0c.png)

我们可以通过如下命令查看恶意 ip 试图登录次数：

```Plaintext
lastb | awk ‘{ print $3}’ | sort | uniq -c | sort -n
```

### 3) 修改 ssh 默认登录的端口

用编辑器打开 SSH 配置文件，修改端口：

```Plaintext
# vi /etc/ssh/sshd_config
```

找到行 `#Port 22` （默认端口为 22），修改端口为其他端口, 不要出现端口冲突

```Plaintext
Port 5022
```

重启 SSH 服务：

```Plaintext
# systemctl restart sshd
```

修改防火墙，允许访问 5022 的端口，并且重启防火墙服务：

```Plaintext
# 配置 5022
$ firewall-cmd --permanent --zone=public --add-port=5022/tcp
# 重启
$ firewall-cmd --reload
```

如果是 Aliyun 主机, 则需要在对应的安全组打开端口访问权限, 否则一样无法访问主机

### 4) Jenkins 的纠错过程记录

错误信息

```Plaintext
[05/06/22 20:08:14] [SSH] Opening SSH connection to {ip}:{port}.
[05/06/22 20:08:14] [SSH] SSH host key matches key seen previously for this host. Connection will be allowed.
ERROR: Server rejected the 1 private key(s) for project (credentialId:app-project/method:publickey)
[05/06/22 20:08:14] [SSH] Authentication failed.
Authentication failed.
[05/06/22 20:08:14] Launch failed - cleaning up connection
[05/06/22 20:08:14] [SSH] Connection closed.
```

日志中

```Plaintext
...
sshd[837537]: Authentication refused: bad ownership or modes for directory /home/project/.ssh
...

...
May  6 20:21:17 iZbp1fj2qclam9f3xd1clmZ sshd[838775]: debug1: trying public key file /home/project/.ssh/authorized_keys
May  6 20:21:17 iZbp1fj2qclam9f3xd1clmZ sshd[838775]: debug1: Could not open authorized keys '/home/project/.ssh/authorized_keys': Permission denied
...
```

### 5) SSH-RSA key rejected with message “no mutual signature algorithm”

出现的场景是 ubuntu 20.04 升级到 22.04 之后出现的部署密码无法更新代码以下是详细的报错信息

```Plaintext
debug3: authmethod_is_enabled publickey
debug1: Next authentication method: publickey
debug1: Offering public key: /home/user/.ssh/id_rsa RSA ... agent
debug1: send_pubkey_test: no mutual signature algorithm <-- ssh-rsa is not enabled
debug1: No more authentication methods to try.
user@hostname: Permission denied (publickey).
```

原因:

> The RSA SHA-1 hash algorithm is being quickly deprecated across operating systems and SSH clients because of various security vulnerabilities, with many of these technologies now outright denying the use of this algorithm.  
> —— [SSH-RSA key rejected with message “no mutual signature algorithm” | Bitbucket Data Center and Server KB | Atlassian Documentation](https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html)  
> 由于各种安全漏洞，RSA SHA-1哈希算法正在跨操作系统和SSH客户端迅速被弃用，许多这些技术现在完全拒绝使用这种算法。

解决方案使用 `ED25519`算法替代, 更换密钥

### 6) kex_exchange_identification: Connection closed by remote host

考虑下是否开启了代理工具, 代理工具的数据交换导致了密钥传输失败导致, 如果出现此问题, 可以考虑禁用掉三方工具, 或者把 github 的域名加入白名单

### 7) 保持 ssh 链接不断开

> 通过ssh连接后，客户端和服务端长时间没响应时，在两方机器设置中均没任何限制，但在各自的防火墙，或是中转网络连接路由的防火墙中，出现了「闲置超时断开」的缺省机制！

> — [Linux使用ssh超时断开连接的真正原因](http://bluebiu.com/blog/linux-ssh-session-alive.html)

```Plaintext
vim ~/.ssh/config
```

```Plaintext
Host *
    ServerAliveInterval 60
```

- `Host *`

表示需要启用该规则的服务端（域名或ip）

- `ServerAliveInterval 60`

表示没60秒去给服务端发起一次请求消息（这个设置好就行了）

- `ServerAliveCountMax 3`

表示最大连续尝试连接次数（这个基本不用设置）

### 8) Too many authentication failures

**场景**

我们登录的时候 ssh 会使用密钥进行匹配连接, 但是会报 Too many authentication failures

**原因**

ECS实例内SSH远程登录配置文件 `/etc/ssh/sshd_config` 中配置了密码重试策略，多次连续输入错误密码后，提示该错误, 解决方案

找到这个配置, 更改重试次数, 然后重启 sshd

```Plaintext
MaxAuthTries 6
```

## 参考

- [设置 SSH 通过密钥登录](https://hyjk2000.github.io/2012/03/16/how-to-set-up-ssh-keys/)
- [SSH 密钥登录流程分析](https://juejin.im/post/5a2941ad6fb9a045030ffc95)
- [Github ssh key 生成，免密登录服务器方法](https://deepzz.com/post/github-generate-ssh-key.html)