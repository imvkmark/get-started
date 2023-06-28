# Man 手册

> 初衷是建立一个完善的man 命令文库, 经过时间洗礼之后, 还是做一个安静的学习者, 补充他人的不足即可


## Linux man 命令后面的数字含义及作用

Linux 的 man 很强大，该手册分成很多 section，使用 man 时可以指定不同的 section 来浏览，各个 section 意义如下：

[1 - commands](./command/ab.1.md)

普通的命令

2 - system calls

系统调用,如 open,write 之类的(通过这个，至少可以很方便的查到调用这个函数，需要加什么头文件)

3 - library calls

库函数,如 printf,fread

4 - special files

特殊文件,也就是/dev 下的各种设备文件

[5 - file formats and convertions](./conf/nscd.conf.5.md)

指文件的格式,比如 passwd, 就会说明这个文件中各个字段的含义

6 - games for linux

给游戏留的,由各个游戏自己定义

7 - macro packages and conventions

附件还有一些变量,比如向 environ 这种全局变量在这里就有说明

[8 - system management commands](./system/useradd.8.md)

系统管理用的命令,这些命令只能由 root 使用,如 ifconfig

[9 - 其他](./other/wrk.9.md)

其他命令

这里根据  https://www.die.net/  进行 man 命令的区分

有些文档也需要根据  https://man7.org/index.html  来进行补充, 比如 die.net 不存在的命令

## 资料 :

- Web 版本 :  https://qq.wdev.cn/ 
- Dash :  https://github.com/jaywcjlove/linux-command/releases 
- Github :  https://github.com/jaywcjlove/linux-command 
- Die :  https://www.die.net/ 

