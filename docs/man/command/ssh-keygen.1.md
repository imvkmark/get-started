# ssh-keygen(1) - 为 ssh 生成、管理和转换认证密钥

为 ssh 生成、管理和转换认证密钥

**ssh-keygen 命令** 用于为“ssh”生成、管理和转换认证密钥，它支持 RSA 和 DSA 两种认证密钥。

ssh-keygen 实用程序用于为[ssh(1)](https://docs.oracle.com/cd/E56344_01/html/E54075/ssh-1.html#REFMAN1ssh-1)生成、管理和转换验证密钥。ssh-keygen 可以创建供 SSH
协议版本 1 使用的 RSA 密钥，以及供 SSH 协议版本 2 使用的 RSA 或 DSA 密钥。生成的密钥类型使用 –t 选项指定。ssh-keygen 还可以生成指纹或从指定为 PKCS#11 URI 的
X.509v3 证书转换公钥。

通常，希望将 SSH 与 RSA 或 DSA 验证结合使用的每个用户应运行一次此实用程序，以便在 ` $HOME/.ssh/identity`, `$HOME/.ssh/id_dsa`或`$HOME/.ssh/id_rsa`
中创建验证密钥。系统管理员还可以使用此实用程序生成主机密钥。

通常，此程序会生成密钥并要求提供一个存储私钥的文件。公钥存储在附加了 ".pub" 扩展名的同名文件中。该程序还要求提供口令短语。口令短语可以为空，表示没有口令短语（主机密钥必须具有空口令短语），也可以为任意长度的字符串。好的口令短语长度在
10-30 个字符，不是简单的句子或其他容易猜到的句子，由大写字母、小写字母、数字和非字母数字字符组合而成。（普通英文句子中的每个字只有 1-2
位的熵，提供的口令短语非常差。）如果设置口令短语，则长度必须至少为 4 个字符。

之后可以使用 –p 选项更改口令短语。

无法恢复丢失的口令短语。如果丢失或忘记口令短语，您必须生成一个新密钥并将相应的公钥复制到其他计算机。

对于 RSA，密钥文件中还包含一个注释字段，该字段只是为了便于用户识别密钥。comment 字段可以说明密钥的用途或提供任何有用信息。创建密钥时，注释将初始化为 "user@host"
，但可以使用 –c 选项进行更改。

密钥生成后，可以使用下面的详细说明了解应将密钥放在何处，以便激活密钥。

```
ssh-keygen [-q] [-b bits ] -t type [-N new_passphrase]
     [-C comment] [-f output_keyfile]
ssh-keygen -p [-P old_passphrase] [-N new_passphrase]
     [-f keyfile]
ssh-keygen -i [-f input_keyfile | PKCS#11-URI]
ssh-keygen -e [-f input_keyfile]
ssh-keygen -y [-f input_keyfile]
ssh-keygen -c [-P passphrase] [-C comment] [-f keyfile]
ssh-keygen -l [-f input_keyfile | PKCS#11-URI]
ssh-keygen -B [-f input_keyfile]
ssh-keygen -F hostname [-f known_hosts_file]
ssh-keygen -H [-f known_hosts_file]
ssh-keygen -R hostname [-f known_hosts_file]
```

## 选项

支持以下选项：

`-b bits`

指定要创建的密钥的位数。最小位数为 512 位。通常，2048 位足以满足安全需要。密钥大小超过该值并不会提高安全性，反而会降低速度。缺省值为 2048 位。

`-B`

显示指定的私钥或公钥文件的 bubblebabble 摘要。

`-c`

请求更改私钥和公钥文件中的注释。该程序会提示您提供包含私钥的文件、口令短语（如果密钥具有一个口令短语）以及新的注释。

此选项仅适用于 rsa1(SSHv1) 密钥。

`-C comment`

提供新注释。

`-e`

此选项读取 OpenSSH 私钥或公钥文件并将密钥以 "SECSH" 公钥文件格式输出到 stdout。此选项允许导出密钥供其他一些 SSH 实现使用。

`-f`

指定密钥文件的文件名。

`-F`

在 known_hosts 文件中搜索指定的 hostname，列出找到的任何匹配项。此选项可用于查找散列格式的主机名或地址，还可以与 –H 选项一起使用，以散列格式输出找到的密钥。

`-H`

对 known_hosts 文件执行散列计算。此选项使用散列形式替换指定文件内的所有主机名和地址。原始内容将移动到后缀为 .old 的文件中。这些散列值通常由 ssh 和 sshd
使用，即使文件内容被公开，这些散列值也并不会透露可识别的信息。此选项不会修改现有的散列主机名，因此可以放心地用于同时包含散列名称和非散列名称的文件。

`-i`

此选项以 SSH2 兼容格式读取未加密的私钥（或公钥）文件并将 OpenSSH 兼容的私钥（或公钥）输出到 stdout。ssh-keygen 还可读取 “SECSH” 公钥文件格式。此选项允许从其他一些 SSH
实现中导入密钥。

`-l`

显示指定的私钥或公钥文件的指纹。

`-N new_passphrase`

提供新口令短语。

`-p`

请求更改私钥文件的口令短语，而不创建新私钥。该程序会提示您提供包含私钥的文件、旧口令短语，并两次提示您输入新口令短语。

`-P passphrase`

提供（旧）口令短语。

`-q`

退出 ssh-keygen。

`-t type`

指定用于生成密钥的算法，其中 type 是 rsa、dsa 和 rsa1 中的一种。rsa1 类型仅用于 SSHv1 协议。

`-R hostname`

从 known_hosts 文件中删除属于 hostname 的所有密钥。此选项可用于删除散列主机。请参见 –H。

`-x`

已过时。已被 –e 选项取代。

`-X`

已过时。已被 –i 选项取代。

`-y`

此选项读取 OpenSSH 私钥格式文件并将 OpenSSH 公钥输出到 stdout。

`-8`

指定 ssh-keygen 生成 PKCS#8 格式的密钥。对于要生成的密钥，支持的类型为 rsa 或 dsa。

## 状态

将返回以下退出值：

0 : 成功完成。

1 : 出现错误。

## 文件

$HOME/.ssh/identity

该文件包含用于 SSHv1 协议的 RSA 私钥。除了用户外，其他任何人均应无法读取此文件。生成密钥时可以指定密码短语；该密码短语用于使用 128 位 AES 对此文件的私有部分加密。ssh-keygen
并不自动访问此文件，此文件是作为私钥的缺省文件提供的。尝试登录时，[sshd(1M)](https://docs.oracle.com/cd/E56344_01/html/E54077/sshd-1m.html#REFMAN1Msshd-1m)将读取该文件。

```
$HOME/.ssh/identity.pub
```

该文件包含用于 SSHv1 协议的 RSA 公钥。应在登录时要使用 RSA 验证的所有计算机的 $HOME/.ssh/authorized_keys 中添加该文件的内容。不需要将该文件的内容保密。

```
$HOME/.ssh/id_dsa
$HOME/.ssh/id_rsa
```

这两个文件分别包含用于 SSHv2 协议的 DSA 私钥或 RSA 私钥。除了用户外，其他任何人均应无法读取这些文件。生成密钥时可能会指定口令短语；该口令短语用于对此文件的私钥部分加密（使用
3DES）。ssh-keygen
并不自动访问其中的任一文件，这两个文件是作为私钥的缺省文件提供的。尝试登录时，[sshd(1M)](https://docs.oracle.com/cd/E56344_01/html/E54077/sshd-1m.html#REFMAN1Msshd-1m)
将读取其中的一个文件。

```
$HOME/.ssh/id_dsa.pub
$HOME/.ssh/id_rsa.pub
```

这些文件分别包含用于 SSHv2 协议的 DSA 公钥或 RSA 公钥。应在登录时要使用 DSA 或 RSA 验证的所有计算机的 $HOME/.ssh/authorized_keys 中分别添加这两个文件的内容。不需要将这些文件的内容保密。

