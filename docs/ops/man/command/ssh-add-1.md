---
description: 'ssh-add - 添加 RSA 或 DSA 身份验证到认证代理ssh-add 添加 RSA 或 DSA 身份到认证代理 ssh-agent(1)。如果没有参数运行，则添加文件~/.ssh/id_rsa, ~/.ssh/id_dsa 和 ~/.ssh/identity . 可以在命令行上给出替代的文件名。如果有文件需要密码，ssh-add 会向用户请求密码输入。密码从用户的 tty终端 读取。如果给出多个身份文件，ssh-add 将重试上次的密码认证代理必须正在运行并且 SSH_AUTH_SOCK 环境变量必须包含 sock 名称才能让 ssh-add 正常工作。-c表'
lastUpdated: '2025-12-05 23:30:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'ssh-add(1) - 添加RSA或DSA身份验证到认证代理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ssh-add - 添加 RSA 或 DSA 身份验证到认证代理ssh-add 添加 RSA 或 DSA 身份到认证代理 ssh-agent(1)。如果没有参数运行，则添加文件~/.ssh/id_rsa, ~/.ssh/id_dsa 和 ~/.ssh/identity . 可以在命令行上给出替代的文件名。如果有文件需要密码，ssh-add 会向用户请求密码输入。密码从用户的 tty终端 读取。如果给出多个身份文件，ssh-add 将重试上次的密码认证代理必须正在运行并且 SSH_AUTH_SOCK 环境变量必须包含 sock 名称才能让 ssh-add 正常工作。-c表'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/man/command/ssh-add-1.html'
---
# ssh-add(1) - 添加RSA或DSA身份验证到认证代理



**ssh-add**  - 添加 RSA 或 DSA 身份验证到认证代理



```shell
ssh-add [-cDdLlXx] [-t life] [file ...]
ssh-add -s reader
ssh-add -e reader
ssh-add -n [-T token]
```

## 描述

**ssh-add**  添加 RSA 或 DSA 身份到认证代理 [ssh-agent](https://linux.die.net/man/1/ssh-agent)(1)。如果没有参数运行，则添加文件 `~/.ssh/id_rsa` ,  `~/.ssh/id_dsa`  和  `~/.ssh/identity`  . 可以在命令行上给出替代的文件名。如果有文件需要密码， **ssh-add** 会向用户请求密码输入。密码从用户的 tty终端 读取。如果给出多个身份文件， **ssh-add** 将重试上次的密码

认证代理必须正在运行并且  `SSH_AUTH_SOCK`  环境变量必须包含 sock 名称才能让  **ssh-add** 正常工作。

## 选项

`-c`

表示在用于身份验证之前，应该对添加的身份进行确认。确认由下面提到的  `SSH_ASKPASS`  程序执行。成功的确认通过  `SSH_ASKPASS`  程序的零退出状态来表示，而不是输入到请求者中的文本

`-D`

从代理中删除所有身份验证

`-d`

从代理中删除身份，而不是添加身份。如果运行了  **ssh-add**  而没有参数，则默认身份的密钥将被删除。否则，参数列表将被解释为公钥文件的路径列表，并且匹配的密钥将从代理中删除。如果在给定路径中找不到公钥，则  **ssh-add**  将附加  _`.pub`_  并重试

`-e `  _`reader`_

在智能卡 reader 中删除密钥

`-L`

列出代理当前表示的所有身份验证的公共密钥参数

`-l`

列出代理当前表示的所有身份验证的指纹

`-s `  _`reader`_

在智能卡 reader 中添加密钥

`-t life`

在添加身份验证到代理时设置最大生存时间。生存时间可以以秒为单位或指定的时间格式

`-T token`

明确设置令牌名称

`-X`

解锁 agent

`-x`

使用密码锁定 agent

### mac

`--apple-use-keychain` <br />
添加身份时，密码短语也将存储在用户的钥匙串中。 使用  `-d`  删除密钥密码时，密码也将从中删除



## 环境变量

`DISPLAY 和 SSH_ASKPASS`

如果  **ssh-add**  需要密码，如果它是从终端运行的, 它将从当前终端读取密码短语。 如果  **ssh-add**  没有终端关联，但 DISPLAY 和 SSH_ASKPASS 已设置，则它将执行由SSH_ASKPASS指定的程序并打开X11窗口以读取密码短语。 在从  _.xsession_  或相关脚本调用  **ssh-add**  时，这特别有用。（请注意，在某些机器上，可能需要将输入从  _/dev/null_  重定向以使其正常工作。）

`SSH_AUTH_SOCK`

标识与代理进行通信的 unix sock的路径

`SSH_USE_STRONG_RNG`

OpenSSL 随机生成器的种子通常来自  `/dev/urandom` 。如果设置了 `SSH_USE_STRONG_RNG`  环境变量的值并且是除  **0** 以外的其他值，则 OpenSSL 随机生成器将从  `/dev/random`  重新生成种子。读取的字节数由  `SSH_USE_STRONG_RNG`  值定义。最小值为6个字节。不建议在没有硬件随机发生器的计算机上使用此设置，因为不充分的熵会导致连接被阻塞，直到有足够的熵可用为止。

## 文件

`~/.ssh/identity`

包含用户的协议版本1 的 RSA身份验证标识

`~/.ssh/id_dsa`

包含用户的协议版本2 的 DSA身份验证身份

`~/.ssh/id_rsa`

包含用户的协议版本2 RSA身份验证身份<br />
身份文件不应该被任何人读取。请注意， **ssh-add** 会忽略可被其他人访问的身份文件

## 返回

成功时退出状态为  `0` ，如果指定的命令失败则为  `1` ，如果  **ssh-add** 无法联系认证代理则为  `2`

## 参考

[ssh](https://linux.die.net/man/1/ssh)(1)、[ssh-agent](https://linux.die.net/man/1/ssh-agent)(1)、[ssh-keygen](https://linux.die.net/man/1/ssh-keygen)(1)、[sshd](https://linux.die.net/man/8/sshd)(8)

## 作者

OpenSSH是Tatu Ylonen发布的最初和免费的ssh 1.2.12版本的衍生版本。Aaron Campbell、Bob Beck、Markus Friedl、Niels Provos、Theo de Raadt和Dug Song消除了许多错误，重新添加了较新的功能，并创建了OpenSSH。Markus Friedl 贡献了对SSH协议版本1.5和2.0的支持。

BSD 2013年4月14日BSD

[https://linux.die.net/man/1/ssh-add](https://linux.die.net/man/1/ssh-add)

[https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=mac](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=mac)

