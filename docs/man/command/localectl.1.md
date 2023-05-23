# localectl(1) - 控制系统的本地化与键盘布局

```
localectl [OPTIONS...] {COMMAND}


```

## 描述
localectl 可用于查询与修改系统的本地化(locale)与键盘布局的设置。 它通过与 [systemd-localed.service(8)](https://man.archlinux.org/man/systemd-localed.service.8.zh_CN) 通信来修改例如 /etc/locale.conf 与 /etc/vconsole.conf 之类的配置文件。

本地化设置控制着 用户界面的语言、字符类型与字符编码、 日期时间与货币符号的表达方式 等许多细节。

键盘布局控制着 键盘上每个按键及组合键的含义。

注意，为了使此工具所做的修改在系统启动的早期就能生效， 可能需要重新制作 initramfs ， 因为 localectl 并不会自动更新 initramfs 。

可以使用 [systemd-firstboot(1)](https://man.archlinux.org/man/systemd-firstboot.1.zh_CN) 初始化已挂载(但未启动)的系统镜像的本地化(locale)设置。

## 命令
`status`

  显示当前的本地化设置与键盘映射。 这是默认命令。

`set-locale LOCALE, set-locale VARIABLE=LOCALE...`

  设置系统的本地化环境变量(可以一次设置多个)， 例如 "LANG=zh_CN.utf8", "LC_MESSAGES=en_US.utf8" 等等。参见 locale(7) 以了解可用的环境变量及其含义。使用 list-locales 命令列出所有可用的 locale (见下文)。

`list-locales`

列出所有可用的 locale ， 以帮助正确使用 set-locale 命令。

`set-keymap MAP [TOGGLEMAP]`

设置控制台的键盘映射(中国人应设为 "us")。 可选的[TOGGLEMAP]用于设置第二切换键盘映射。 除非明确设置了 --no-convert 选项， 否则此命令也会同时设置默认的X11键盘布局(将"MAP"自动转化为最接近的X11键盘布局)。 使用 list-keymaps 命令列出所有可用的 键盘映射 (见下文)。

`list-keymaps`

列出所有可用的控制台键盘映射， 以帮助正确使用 set-keymap 命令。

`set-x11-keymap LAYOUT [MODEL [VARIANT [OPTIONS]]]`

设置默认的X11键盘布局(中国人应设为 "us")。 可选的，还可以设置 Model, Variant, Options 三项(无默认值)。 "MODEL"一般设为"pc104"，"VARIANT"与"OPTIONS"一般直接忽略，详见 kbd(4) 手册。除非明确设置了 --no-convert 选项， 否则此命令也会同时设置控制台的键盘映射， 也就是将"LAYOUT"自动转化为最接近的控制台键盘映射。

`list-x11-keymap-models, list-x11-keymap-layouts, list-x11-keymap-variants [LAYOUT], list-x11-keymap-options`

分别列出所有可用的X11键盘的 Layout, Model, Variant, Options 以帮助正确使用 set-x11-keymap 命令。 list-x11-keymap-variants 命令有个可选的"LAYOUT"参数用于过滤出仅适合于特定键盘布局的变种。

## 选项
以下的选项可以被知晓

`--no-ask-password`

在执行特权操作时不向用户索要密码。

`--no-convert`

与 set-keymap 或 set-x11-keymap 命令连用， 表示不同时设置X11与控制台的键盘映射， 也就是不强迫保持两者一致。

`-H, --host=`

操作指定的远程主机。可以仅指定一个主机名(hostname)， 也可以使用 "username@hostname" 格式。 hostname 后面还可以加上容器名(以冒号分隔)， 也就是形如 "hostname:container" 的格式， 以表示直接连接到指定主机的指定容器内。 操作将通过SSH协议进行，以确保安全。 可以通过 machinectl -H HOST 命令列出远程主机上的所有容器名称。

`-M, --machine=`

在本地容器内执行操作。 必须明确指定容器的名称。

`-h, --help`

显示简短的帮助信息并退出。

`--version`

显示简短的版本信息并退出。

`--no-pager`

不将程序的输出内容管道(pipe)给分页程序。

## 环境变量
`$SYSTEMD_LOG_LEVEL`

The maximum log level of emitted messages (messages with a higher log level, i.e. less important ones, will be suppressed). Either one of (in order of decreasing importance) emerg, alert, crit, err, warning, notice, info, debug, or an integer in the range 0...7. See syslog(3) for more information.

`$SYSTEMD_LOG_COLOR`

A boolean. If true, messages written to the tty will be colored according to priority.

This setting is only useful when messages are written directly to the terminal, because journalctl(1) and other tools that display logs will color messages based on the log level on their own.

`$SYSTEMD_LOG_TIME`

A boolean. If true, console log messages will be prefixed with a timestamp.

This setting is only useful when messages are written directly to the terminal or a file, because journalctl(1) and other tools that display logs will attach timestamps based on the entry metadata on their own.

`$SYSTEMD_LOG_LOCATION`

A boolean. If true, messages will be prefixed with a filename and line number in the source code where the message originates.

Note that the log location is often attached as metadata to journal entries anyway. Including it directly in the message text can nevertheless be convenient when debugging programs.

`$SYSTEMD_LOG_TID`

A boolean. If true, messages will be prefixed with the  current numerical thread ID (TID).

Note that the this information is attached as metadata to journal entries anyway. Including it directly in the message text can nevertheless be convenient when debugging programs.

`$SYSTEMD_LOG_TARGET`

The destination for log messages. One of console (log to the attached tty), console-prefixed (log to the attached tty but with prefixes encoding the log level and "facility", see syslog(3), kmsg (log to the kernel circular log buffer),  journal (log to the journal), journal-or-kmsg (log to the journal if available, and to kmsg otherwise), auto (determine the appropriate log target automatically, the default), null (disable log output).

`$SYSTEMD_PAGER`

指定分页程序。仅在未指定 --no-pager 选项时有意义。 此变量会覆盖 $PAGER 的值。如果 $SYSTEMD_PAGER 与 $PAGER 都未设置， 那么将会依次尝试如下常见的分页程序： less(1), more(1), 如果最终仍未找到分页程序，那么将不使用分页。 将此变量设为空字符串或 "cat" 等价于使用 --no-pager 选项。

`$SYSTEMD_LESS`

用于覆盖默认传递给 less 程序的命令行选项("FRSXMK"), 

如果 $SYSTEMD_LESS 的值不含 "K" ， 并且使用 less 作为分页程序，那么 Ctrl+C 信号将会被忽略。 这将允许 less 自己处理 Ctrl+C 信号

用户可能想更改两个选项

- K

This option instructs the pager to exit immediately when Ctrl+C is pressed. To allow less to handle Ctrl+C itself to switch back to the pager command prompt, unset this option.

If the value of $SYSTEMD_LESS does not include "K", and the pager that is invoked is less, Ctrl+C will be ignored by the executable, and needs to be handled by the pager.

- X

This option instructs the pager to not send termcap initialization and deinitialization strings to the terminal. It is set by default to allow command output to  remain visible in the terminal even after the pager exits. Nevertheless, this prevents some pager functionality from working, in particular paged output  cannot be scrolled with the mouse.

See less(1) for more discussion.

`$SYSTEMD_LESSCHARSET`

用于覆盖默认传递给 less 程序的字符集。 (如果终端兼容 UTF-8 ，那么默认值是 "utf-8" )

`$SYSTEMD_PAGERSECURE`

Takes a boolean argument. When true, the "secure" mode of the  pager is enabled; if false, disabled. If $SYSTEMD_PAGERSECURE is not set at all, secure mode is enabled if the effective

 UID is not the same as the owner of the login session, see geteuid(2) and sd_pid_get_owner_uid(3). In secure mode,  LESSSECURE=1 will be set when invoking the pager, and the pager shall disable commands that open or create new files or start new subprocesses. When $SYSTEMD_PAGERSECURE is not set at all, pagers which are not known to implement secure mode will not be used. (Currently only less(1) implements secure  mode.)

Note: when commands are invoked with elevated privileges, for example under sudo(8) or pkexec(1), care must be taken to ensure that unintended interactive features are not enabled. "Secure" mode for the pager may be enabled automatically as  describe above. Setting SYSTEMD_PAGERSECURE=0 or not removing it from the inherited environment allows the user to invoke arbitrary commands. Note that if the $SYSTEMD_PAGER or $PAGER  variables are to be honoured, $SYSTEMD_PAGERSECURE must be set too. It might be reasonable to completely disable the pager using --no-pager instead.

`$SYSTEMD_COLORS`

Takes a boolean argument. When true, systemd and related utilities will use colors in their output, otherwise the output will be monochrome. Additionally, the variable can take one of the following special values: "16", "256" to restrict the use of colors to the base 16 or 256 ANSI colors, respectively. This can be specified to override the automatic decision based on $TERM and what the console is connected to.

`$SYSTEMD_URLIFY`

The value must be a boolean. Controls whether clickable links should be generated in the output for terminal emulators supporting this. This can be specified to override the decision that systemd makes based on $TERM and other conditions.

> 参考 : 
> - [localectl 中文手册](http://www.jinbuguo.com/systemd/localectl.html)
> - [localectl(1) — Linux manual page](https://man7.org/linux/man-pages/man1/localectl.1.html)

