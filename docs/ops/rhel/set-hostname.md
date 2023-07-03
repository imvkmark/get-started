# 「转+」 如何在 CentOS/RockyLinux 上修改主机名

不想看介绍的直接运行命令来设定

```
# hostnamectl set-hostname hostname
```

> ps : 此工具在 rockylinux 上依然可用, centos7, centos8

在 CentOS 中，有三种定义的主机名:静态的（static），瞬态的（transient），和灵活的（pretty）。`静态`
主机名也称为内核主机名，是系统在启动时从/etc/hostname 自动初始化的主机名。`瞬态`主机名是在系统运行时临时分配的主机名，例如，通过
DHCP 或 mDNS 服务器分配。静态主机名和瞬态主机名都遵从作为互联网域名同样的字符限制规则。而另一方面，`灵活`
主机名则允许使用自由形式（包括特殊/空白字符）的主机名，以展示给终端用户（如 server-a）。

在 CentOS 7 中，有个叫 hostnamectl 的命令行工具，它允许你查看或修改与主机名相关的配置。

## 查看主机名相关的设置

```
[root@localhost ~]# hostnamectl
   Static hostname: localhost.localdomain
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 21ff9d4ebdd94e949b9fd6cbdb1926c0
           Boot ID: 2a952e91c02841e3ae10de0d16dd3f01
    Virtualization: kvm
  Operating System: CentOS Linux 7 (Core)
       CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-327.el7.x86_64
      Architecture: x86-64
```

```
[root@localhost ~]# hostnamectl status
   Static hostname: localhost.localdomain
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 21ff9d4ebdd94e949b9fd6cbdb1926c0
           Boot ID: 2a952e91c02841e3ae10de0d16dd3f01
    Virtualization: kvm
  Operating System: CentOS Linux 7 (Core)
       CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-327.el7.x86_64
      Architecture: x86-64
```

## 查看静态、瞬态或灵活主机名

只查看静态、瞬态或灵活主机名，分别使用`--static`，`--transient`或`--pretty`选项。

```
[root@localhost ~]# hostnamectl --static
localhost.localdomain
[root@localhost ~]# hostnamectl --transient
localhost.localdomain
[root@localhost ~]# hostnamectl --pretty
```

## 修改主机名

要同时修改所有三个主机名：静态、瞬态和灵活主机名：

```
[root@localhost ~]# hostnamectl set-hostname server-a
[root@localhost ~]# hostnamectl --pretty
[root@localhost ~]# hostnamectl --static
server-a
[root@localhost ~]# hostnamectl --transient
server-a
```

就像上面展示的那样，在修改静态/瞬态主机名时，任何特殊字符或空白字符会被移除，而提供的参数中的任何大写字母会自动转化为小写。

一旦修改了静态主机名，`/etc/hostname`  将被自动更新。然而，`/etc/hosts`
不会更新以保存所做的修改，所以你每次在修改主机名后一定要手动更新`/etc/hosts`，之后再重启 CentOS 7。否则系统再启动时会很慢。

手动更新`/etc/hosts`

```
vim /etc/hosts
#127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
127.0.0.1  server-a
#::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
::1        server-a
```

重启 CentOS 7 之后`（reboot -f ）`，

```
[root@server-a ~]# hostname
server-a
[root@server-a ~]# hostnamectl
   Static hostname: server-a
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 21ff9d4ebdd94e949b9fd6cbdb1926c0
           Boot ID: 2a952e91c02841e3ae10de0d16dd3f01
    Virtualization: kvm
  Operating System: CentOS Linux 7 (Core)
       CPE OS Name: cpe:/o:centos:centos:7
            Kernel: Linux 3.10.0-327.el7.x86_64
      Architecture: x86-64
```

如果你只想修改特定的主机名（静态，瞬态或灵活），你可以使用`--static`，`--transient`或`--pretty`选项。例如，要永久修改主机名，你可以修改静态主机名：

```
[root@localhost ~]# hostnamectl --static set-hostname server-a
```

重启 CentOS 7 之后（`reboot -f`），

```
[root@localhost ~]# hostnamectl --static
server-a
[root@localhost ~]# hostnamectl --transient
server-a
[root@localhost ~]# hostnamectl --pretty
server-a
[root@localhost ~]# hostname
server-a
```

其实，你不必重启机器以激活永久主机名修改。上面的命令会立即修改内核主机名。

注销并重新登入后在命令行提示来观察新的静态主机名

## 参考

- [如何在 CentOS 7 上修改主机名](https://www.jianshu.com/p/39d7000dfa47)

