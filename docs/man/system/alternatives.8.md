# alternatives(8) - 维护默认命令的符号链接

```
alternatives [options] --install link name path priority [--slave link name path]... [--initscript service]
alternatives [options] --remove name path
alternatives [options] --set name path
alternatives [options] --auto name
alternatives [options] --display name
alternatives [options] --config name
```

## 描述

`alternatives` 创建、删除、维护和显示关于组成备选项系统的符号链接的信息。替代系统是 Debian
替代系统的重新实现。重写它主要是为了消除对perl的依赖;它的目的是取代Debian的更新依赖脚本。此手册页是Debian项目手册页的一个轻微修改版本。它旨在替代 Debian
的 `update-dependencies` 脚本。这个手册页是Debian项目手册页的一个稍微修改的版本

在一个系统上，可以同时安装多个实现相同或类似功能的程序。例如，许多系统同时安装多个文本编辑器。这为系统的用户提供了选择，允许每个用户在需要时使用不同的编辑器，但如果用户没有指定特定的首选项，则程序很难选择要调用的编辑器。

alternatives 旨在解决这个问题。文件系统中的通用名称由提供可互换功能的所有文件共享。alternatives 和系统管理员共同决定这个通用名称引用的实际文件。例如，如果系统上同时安装了文本编辑器
**ed(1)** 和 **nvi(1)**，那么替代的系统将使通用名 `/usr/bin/editor` 默认指向 `/usr/bin/nvi`。系统管理员可以覆盖此设置，并使其指向`/usr/bin/ed`
，而 alternatives 将不会更改此设置，直到明确要求这样做。

通用名不是指向所选备选项的直接符号链接。相反，它是指向 alternative 目录中某个名称的符号链接，而该名称又是指向所引用的实际文件的符号链接。

当安装、更改或删除提供具有特定功能的文件的每个包时，将调用替代来更新alternatives中关于该文件的信息。alternative通常从RPM包中的 `%post` 或 `%pre` 脚本调用。

将多个alternatives同步是很有用的，这样它们就可以作为一个组进行更改;例如，当安装了多个版本的 vi(1) 编辑器时，`/usr/share/man/man1/vi.1` 应该对应于 `/usr/bin/vi`
引用的可执行文件。alternatives 通过主和从链接来处理这个问题;当主服务器被更改时，任何关联的从服务器也会被更改。一个主链路和它关联的从链路组成一个链路组。

在任何给定的时间，每个链接组处于两种模式之一:自动或手动。当一个组处于自动模式时，当包被安装和删除时，alternatives将自动决定是否以及如何更新链接。在手动模式下，alternatives不会改变链接;它将把所有决策留给系统管理员。

当链路组第一次被引入系统时，它们处于自动模式。如果系统管理员更改了系统的自动设置，下一次在已更改链接的组上运行alternatives时将会注意到这一点，并且该组将自动切换到手动模式。

每个选项都有一个与之相关联的优先级。当链接组处于自动模式时，该组成员所指向的选项将是优先级最高的选项。

当使用 `--config` 选项时，其他选项将列出名称为主链接的链接组的所有选项。然后将提示为链接组使用哪个选项。一旦你做了改变，链接组将不再处于自动模式。需要使用`--auto`
选项以返回自动状态

## 通用术语

由于 `alternatives` 的动作相当复杂，一些具体的术语将有助于解释其运作。

- `通用名称 <generic name>`

一个名称，如 `/usr/bin/editor`，它通过替代系统指向具有类似功能的许多文件中的一个

- `符号链接 <symlink>`

在没有任何进一步限定的情况下，这意味着替代目录中的一个符号链接:一个系统管理员需要调整的链接。

- `替代 <alternative>`

文件系统中特定文件的名称，可以通过使用替代系统的通用名称进行访问。

- `选择目录 <alternatives directory>`

一个目录，默认情况下/etc/alternatives，包含符号链接。

- `管理目录 <administrative directory>`

一个目录，默认情况下为/var/lib/alternatives，包含备选项的状态信息。

- `联系组 <link group>`

一组相关的符号链接，打算作为一个组进行更新。

- `主链接 <master link>`

链路组中的链路，它决定了组内其他链路的配置方式。

- `辅助链接 <slave link>`

链路组中的链路，由主链路的设置控制。

- `自动模式 <automatic mode>`

当链路组处于自动模式时，备选方案系统确保该组中的链路指向适合该组的最高优先级备选方案。

- `手动模式 <manual mode>`

当链路组处于手动模式时，备用系统不会对系统管理员的设置进行任何更改

## 选项

- `--verbose`

生成更多关于替代方案正在做什么的记录

- `--quiet`

除非发生错误，否则不要生成任何注释。此选项尚未实现。

- `--test`

不要做任何事情，只是说要做什么。此选项尚未实现。

- `--help`

给出一些用法信息(并说明这是哪个版本的替代品)。

- `--version`

说明这是哪个版本的替代品(并给出一些使用信息)

- `--altdir directory`

指定与默认值不同的备选目录

- `--admindir directory`

当管理目录与默认目录不同时，指定该目录。

## 动作

- `--install link name path pri [--slave slink sname spath] [--initscript service]...`

向系统添加一组alternatives。name是主链接的通用名称，link 是它的符号链接的名称, path是为主链接引入的替代方法。 sname、slink和spath是通用名、符号链接名和从链接的替代名，
service 是替代名的任何相关初始化脚本的名称。

注意：--initscript 是Red Hat Linux特有的选项。 可以指定零个或多个 --slave 选项，每个选项后面跟着三个参数。

如果指定的主符号链接已经存在于alternatives的记录中， 则提供的信息将作为组的一组新的alternatives添加。

否则，将使用此信息添加一个设置为自动模式的新组。 如果该组处于自动模式， 并且新添加的alternatives的优先级高于该组中任何已安装的alternatives，
则符号链接将被更新以指向新添加的alternatives。 如果使用 --initscript， alternatives将通过 chkconfig 管理与alternatives相关联的初始化脚本，
根据哪个alternatives是活动的注册和注销初始化脚本。

注意:--initscript是Red Hat Linux特有的选项。

- `--remove name path`

删除一个alternatives及其所有关联的从链接。 name是alternative目录中的名称， path是名称可以链接到的绝对文件名。 如果name确实链接到path，
则name将被更新为指向另一个合适的alternatives， 如果没有这样的alternatives，则删除。相应的， 相关的从链接将被更新或删除。如果链接当前没有指向路径，
则不会更改链接;只有关于alternatives的信息被删除。

- `--set name path`

link group name的符号link和slave设置为path的符号， link和slave, link group设置为manual模式。 这个选项在最初的Debian实现中没有。

- `--config name`

为用户提供一个配置菜单， 用于选择链接组名的主链接和从链接。 一旦选择，链接组被设置为手动模式。

- `--auto name`

将主符号链接名称切换到自动模式。 在这个过程中，这个符号链接和它的slaves被更新到指向最高优先级的已安装的 alternatives。

- `--display name`

显示名称为主链路的链路组信息。 显示的信息包括组的模式(自动或手动)、 符号链接当前指向的 alternatives、 可用的其他 alternatives(及其相应的从alternatives)
以及当前安装的最高优先级alternatives

## 相关文档

`/etc/alternatives/` : 默认的 alternatives 目录。可以被 `--altdir` 选项覆盖
`/var/lib/alternatives/` : 默认的管理目录。可以由 `--admindir` 选项覆盖

## 示例

**安装java, 设定优先级为 3**

```shell
alternatives --install /usr/bin/java java /tools/jdk/bin/java 3
```

**配置 java**

```shell
alternatives --config java
```

```
There are 3 programs which provide 'java'.

  Selection    Command
-----------------------------------------------
*+ 1           /usr/lib/jvm/jre-1.7.0-icedtea/bin/java
   2           /usr/lib/jvm/jre-1.5.0-gcj/bin/java
   3           /tools/jdk/bin/java

Enter to keep the current selection[+], or type selection number: 3
```
