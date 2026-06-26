---
description: 'RockyLinux设置中文语言支持需先重新加载locale配置，再通过设置环境变量临时验证。持久化可编辑.bash_profile（登录shell）或.bashrc（非登录shell），最后生效配置。'
lastUpdated: '2026-06-26 11:25:09'
head:
  - - meta
    - name: 'og:title'
      content: 'RockyLinux 设置中文语言支持'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RockyLinux设置中文语言支持需先重新加载locale配置，再通过设置环境变量临时验证。持久化可编辑.bash_profile（登录shell）或.bashrc（非登录shell），最后生效配置。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/linux/rhel-install-zh-cn-langpack.html'
---
# RockyLinux 设置中文语言支持

在默认的 rocky linux 是没有中文语言包的, 这样在某些情况下查看中文会产生乱码, 如下是查看 git 日志时候出现的乱码

```Plaintext
commit 3cbe7c43e7ebb4a3b03dc9d003cb3310f03ebdbc
Author: duoli <duoli@example.com>
Date:   Wed Nov 5 08:45:43 2025 +0800

    feat(app): <E8><BF><87><E6><BB><A4><E6><8E><89><E7><B1><BB><E5>
<9E><8B><E4><B8><BA>tag<E7><9A><84><E5><AD><97><E6><AE><B5>...
```

可能不同的发行方对系统做了一些更新导致会缺失中文语言包, 为了解决类似问题, 我们需要检查并安装语言包同时并设置 `$LANG` 和 `$LC_ALL`

::: info 📖
<p>扩展阅读</p><ul><li>[localectl(1) - 控制系统的本地化与键盘布局]([object Object].md)</li></ul>
:::

查看是否存在中文语言

```Plain Text
[root@rocky web]# localectl list-locales |grep zh
zh_CN
zh_CN.gb18030
zh_CN.gbk
zh_CN.utf8
```

如果没有, 则安装语言包

```Shell
dnf install -y langpacks-zh_CN glibc-common
```

- `langpacks-zh_CN`：简体中文语言包核心组件
- `glibc-common`：提供字符集支持（包含 `zh_CN.UTF-8` 编码）

通过 `localectl` 工具设置当前的语言包

```Shell
localectl set-locale LANG=zh_CN.UTF-8
```

重新登录后，执行以下命令确认：

```Bash
echo $LANG
```

若输出 `zh_CN.UTF-8` 则表示设置成功

`localectl` 设置未生效，大概率是配置未同步到用户会话或存在优先级更高的局部配置，按以下步骤排查修复：

**1. 先确认系统级配置是否已写入**

执行命令查看系统语言配置，确认 `localectl` 已正确修改系统级设置：

```Plain Text
localectl status
```

若输出中 `LANG=zh_CN.UTF-8`，说明系统级配置已生效，问题出在用户会话或局部配置覆盖。

**2. 手动强制同步配置到当前会话**

```Bash
# 重新加载系统 locale 配置
source /etc/locale.conf

# 手动设置环境变量（临时生效，用于验证）
export LANG=zh_CN.UTF-8
export LC_ALL=zh_CN.UTF-8
```

执行后立即用 `echo $LANG` 验证，若输出 `zh_CN.UTF-8`，说明配置本身没问题，只需永久同步到用户会话。

**3. 永久写入用户会话配置**

编辑用户环境变量配置文件，确保每次登录自动加载中文 locale：

```Bash
# 编辑 .bash_profile（适用于登录shell）
echo 'export LANG=zh_CN.UTF-8' >> ~/.bash_profile
echo 'export LC_ALL=zh_CN.UTF-8' >> ~/.bash_profile

# 编辑 .bashrc（适用于非登录shell，如终端）
echo 'export LANG=zh_CN.UTF-8' >> ~/.bashrc
echo 'export LC_ALL=zh_CN.UTF-8' >> ~/.bashrc

# 生效配置
source ~/.bash_profile && source ~/.bashrc
```

**4. 验证与收尾**

1. 重启终端或重新登录系统（关键步骤，确保所有配置加载）。
2. 执行 `echo $LANG` 和 `locale` 命令，若所有输出均为 `zh_CN.UTF-8`，则设置成功

这样, 我们就可以看到语言是正确的了, bingo

```Plaintext
[root@duoli web]# git log
commit 3cbe7c43e7ebb4a3b03dc9d003cb3310f03ebdbc
Author: duoli <duoli@example.com>
Date:   Wed Nov 5 08:45:43 2025 +0800

    feat(app): 过滤掉类型为tag的字段...
```

## 参考文章

- [Rocky Linux 8安装中文支持 - Best Yii | PHP Yii 开发框架最佳实践](https://www.bestyii.com/topic/250)
- [树莓派玩RockyLinux之设置语言](https://www.bilibili.com/read/cv14668480/)