---
title: "useradd(8) - 创建新用户或者更新默认的新用户信息"
date: 2022-04-20 14:22:59
toc: true
categories:
- ["Man","system(8)"]
---

当不加-D 参数,useradd 指令使用命令列来指定新帐号的设定值并且使用系统上的预设值.新使用者帐号将产生一些系统档案，使用者目录建立，拷备起始档案等，这些均可以利用命令列选项指定。[**此版本为 RedHatLinux 提供，可帮每个新加入的使用者建立个别的 group,毋须添加-n 选项**]<br />**useradd 命令** 用于 Linux 中创建的新的系统用户。useradd 可用来建立用户帐号。帐号建好之后，再用 passwd 设定帐号的密码．而可用 userdel 删除帐号。使用 useradd 指令所建立的帐号，实际上是保存在`/etc/passwd`文本文件中。<br />在 Slackware 中，adduser 指令是个 script 程序，利用交谈的方式取得输入的用户帐号资料，然后再交由真正建立帐号的 useradd 命令建立新用户，如此可方便管理员建立用户帐号。在 Red Hat Linux 中， **adduser 命令** 则是 useradd 命令的符号连接，两者实际上是同一个指令。

```
useradd [options] LOGIN
useradd -D
useradd -D [options]
```

## 选项 & 参数
`-c, --comment COMMENT`<br />新帐号 password 档的说明栏, 任意字符串, 生成一个登陆的简短描述并且被当做用户的全名字段来使用<br />`-b, --base-dir BASE_DIR`<br />如果 `-d` 没有指定, 这个默认文件夹将是系统默认的基准文件夹, `BASE_DIR` 是定义用户 home 目录的文件目录, 如果此目录不存在, 否则用户的 home 目录不会被创建<br />`-d, --home HOME_DIR`<br />新帐号每次登入时所使用的 `HOME_DIR`。预设值为`BASE_DIR`内 login 名称，并当成登入时目录名称, HOME_DIR 的父级必须存在, 否则目录不会给创建<br />`-e, --expiredate EXPIRE_DATE`<br />帐号终止日期。日期的指定格式为 YYYY-MM-DD<br />`-f, --inactive INACTIVE`<br />用户密码过期之后几日内禁用, 当值为 0 时帐号则立即过期。而当值为-1 时则关闭此功能，预设值为-1<br />`-g, --gid GROUP`<br />用户初始登陆时候的组名或者组 id, 组必须存在, 群组数字也须为现有存在的群组<br />`-G, --groups GROUP1[,GROUP2,...[,GROUPN]]]`<br />定义此使用者为此一堆 groups 的成员。每个群组使用`,`区格开来，不可以夹杂空白字符。群组名同-g 选项的限制。定义值为使用者的起始群组。<br />`-h, --help`<br />显示帮助信息<br />`-M`<br />用户的 Home 目录将不会被创建, 只有在`/etc/login.defs`系统设定中的才会创建目录<br />`-m, --create-home`<br />使用者目录如不存在则自动建立。如使用-k 选项 `SKEL_DIR` 内的档案将复制至使用者目录下。否则的话 `/etc/skel` 目录下的档案会复制过去取代。任何在 `SKEL_DIR`, `/etc/skel` 的目录也相同会在使用者目录下一一建立。`-k`选项必须和`-m` 选项同时使用, 不建立目录以及不复制任何档案为预设值。<br />`-l`<br />不向用户登陆的日志文件中填写信息, **仅仅[Red Hat]**<br />`-n`<br />默认创建用户的时候将创建一个和用户相同名称的组, 这个选项关闭这个行为, 当这个选项使用的时候, 用户必须指定一个组<br />When this option is used, users by default will be placed in whatever group is specified in `/etc/default/useradd`. If no default group is defined, group 1 will be used.<br />`-K, --key KEY=VALUE`<br />覆盖 `/etc/login.defs` 默认值 (UID_MIN, UID_MAX, UMASK, PASS_MAX_DAYS and others).<br />例如: `-K PASS_MAX_DAYS=-1` 在创建系统账户时候关闭密码过期. 及时系统账号没有密码.<br />支持多值设定<br />`-K UID_MIN=100 -K UID_MAX=499`<br />Note: `-K UID_MIN=10,UID_MAX=499` 将不合法<br />`-o, --non-unique`<br />允许使用重复的 （非唯一） UID 创建用户<br />`-p, --password PASSWORD`<br />加密的密码, 使用 `crypt(3)` 返回, 默认是禁用账户<br />`-r`<br />This flag is used to create a system account. That is, a user with a UID lower than the value of UID_MIN defined in /etc/login.defs and whose password does not expire. Note that useradd will not create a home directory for such an user, regardless of the default setting in /etc/login.defs. You have to specify -m option if you want a home directory for a system account to be created. **This is an option added by Red Hat**<br />`-s, --shell SHELL`<br />使用者登入后使用的 shell 名称, 默认留空, 让系统选择默认的 shell, 例如 `-s /sbin/nologin` 是不允许登陆<br />`-u, --uid UID`<br />用户的 ID 值。必须为唯一的 ID 值，除非用`-o`选项。数字不可为负值。预设为最小不得小于 `UID_MIN` 而逐次增加。0~`UID_MIN`传统上是保留给系统帐号使用。<br />`-Z, --selinux-user SEUSER`<br />The SELinux user for the user's login. The default is to leave this<br />field blank, which causes the system to select the default SELinux<br />user.<br />**改变默认值**<br />当使用 `-D` 选项, `useradd` 将显示默认的当前值, 或者使用命令行更新当前值, 可用选项如下<br />`-b HOME_DIR`<br />定义使用者所属目录的`父目录`。使用者名称会附加在 `HOME_DIR` 后面用来建立新使用者的目录。使用-d 后则此选项无效。<br />`-e EXPIRE_DATE`<br />使用者帐号过期日期<br />`-f INACTIVE`<br />帐号过期几日后停权<br />`-g, --gid GROUP`<br />新帐号起始群组名或 ID。群组名须为现有存在的名称。群组 ID 也须为现有存在的群组。<br />`-s, --shell SHELL`<br />使用者登入后使用的 shell 名称。往后新加入的帐号都将使用此 shell.<br />如不指定任何参数，useradd 显示目前预设的值<br />**备注**<br />`/etc/skel/` 目录下的文件将会覆盖默认的用户文件<br />The system administrator is responsible for placing the default user files in the /etc/skel/ directory.<br />This version of useradd was modified by Red Hat to suit Red Hat user/group conventions.<br />**涉及到的文件**
```
/etc/passwd             #User account information.
/etc/shadow             #Secure user account information.
/etc/group              #Group account information.
/etc/gshadow            #Secure group account information.
/etc/default/useradd    #Default values for account creation.
/etc/skel/              #Directory containing default files.
/etc/login.defs         #Shadow password suite configuration.
```
**退出值**<br />The useradd command exits with the following values:
```
0  success
1  can't update password file
2  invalid command syntax
3  invalid argument to option
4  UID already in use (and no -o)
6  specified group doesn't exist
9  username already in use
10 can't update group file
12 can't create home directory
13 can't create mail spool
```

## 实例
新建用户加入组：
```
useradd –g sales jack –G company,employees    //-g：加入主要组、-G：加入次要组
```
建立一个新用户账户，并设置 ID：
```
useradd duoli -u 544
```
需要说明的是，设定 ID 值时尽量要大于 500，以免冲突。因为 Linux 安装后会建立一些特殊用户，一般 0 到 499 之间的值留给 bin、mail 这样的系统账号。

