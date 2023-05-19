---
title: "chmod(1) - 改变文件或目录的权限"
date: 2022-04-20 14:22:52
toc: true
categories:
- ["Man","commands(1)"]
---

> 通过符号组合的方式更改目标文件或目录的权限
> 通过八进制数的方式更改目标文件或目录的权限
> 通过参考文件的权限来更改目标文件或目录的权限



```
chmod [OPTION]... MODE[,MODE]... FILE...
chmod [OPTION]... OCTAL-MODE FILE...
chmod [OPTION]... --reference=RFILE FILE...
```

本手册页记录了 `chmod` 的 GNU 版本. `chmod` 根据 `MODE` 更改每个给定文件的文件权限，`MODE` 可以是所做更改的符号表示，也可以是表示新权限的八进制数值

符号模式的格式是 `[ugoa...][[-+=][perms...]...]`，其中 `perms` 要么是 `rwxXst` 中的零个或多个字母，要么是 `ugo` 中的一个字母。可以给出多种符号模式，使用逗号分隔。

字母 `ugoa` 的组合控制了会对哪些用户对文件的访问权限进行更改

- `u`: 拥有该文件的用户
- `g`: 文件组中的其他用户
- `o`: 文件组中不属于该文件组的其他用户(o)
- `a`: 或者所有用户

如果都没有给出，效果就像给出了 `a`，但在 umask 中设置的数值位不受影响

操作符 `+` 导致所选文件模式位被添加到每个文件的现有文件模式位中;`-`会移除; `=` 将添加它们并删除未提及的 `MODE` ，然而目录的未提及的固定的用户和用户组ID不受影响<br />操作符`+` 使得用户选择的权限被追加到每个指定文件（操作给指定文件添加所选权限）;操作符 `-` 使得这些权限被撤消; `=` 使得 指定文件只具有这些权限。

字符串`rwxXst` 给用户设置新的属性:

- (`r`)读权限
- (`w`)写权限
- (`x`)执行权(或对目录的访问权)
- (`X`)只有目标文件对某些用户是可执行的或该目标文件是目录时才追加`x`属性，
- (`s`) 同时设定用户或组ID
- (`t`)粘滞位（保存程序的文本到交换设备上)

除了这些标识之外, 你可以更加详细的和 `ugo` 组合设定更多权限

- (`u`)目标文件所属用户
- (`g`)目标文件用户所在的组
- (`o`)其他用户

如果设置了目录的粘滞位,  那么只有文件和目录的所有者可以删除该目录下的文件。 (一般使用于类似于/tmp这样有基本写权限的目录)

数字模式是一到4个八进制数,每个数由位权为4,2,1的3位叠加而得.    被省略掉的数字缺省设置为零. 第一位为4时为suid,2时为sgid,1时为粘滞位,第二位设置文件所有者的权限:可读(4),可写(2),可执行(1); 第三位设置了文件所在组其他用户的权限,值如上;第四位设置了其 他组的用户的权限,值同上.

由于 `chmod`的系统调用不支持,`chomd`命令不能改变符号链接的权限.   由于符号链接的权限从不使用, 所以这也不成问题. 无论如何, 由于每个符号连接都可在命令行中列出, `chmod`改变了所指文件的属性.  相反,`chmod` 在递归目录遍历时忽略所碰到的符号连接.


## SETUID 位 和 SETGID 位
如果文件的组ID不匹配用户的有效组ID或用户的一个补充组ID，除非用户有适当的权限, 否则的话 `chmod` 会清除 set-group-id 位, 额外的限制可能会导致MODE 或 RFILE 的 set-user-id 和 set-group-id 位被忽略。这种行为取决于底层 `chmod` 系统调用的策略和功能。如果有疑问，请检查底层系统行为

对于目录，chmod 保留 set-user-id 和 set-group-id 位，除非另有明确指定。你可以设置或清除位的符号模式，如 u+s 和 g-s。要清除具有数值模式的目录的这些位，需要一个额外的前导零 (`00755`) ，或前导 = (`=755`)

## 限制删除或粘滞位
The restricted deletion flag or sticky bit is a single bit, whose  interpretation depends on the file type.   For directories, it  prevents unprivileged users from removing or renaming a file in  the directory unless they own the file or the directory;  this is called the restricted deletion flag for the directory, and is commonly found on world-writable directories like /tmp.   For regular files on some older systems, the bit saves the program's     text image on the swap device so it will load more quickly when run;  this is called the sticky bit.

## 选项
更改文件的所有者或组未 `OWNER` 或 `GROUP`, 使用 `--reference`，将目标文件的的组/所有者关系更改为引用文件的组/所有者

`-c, --changes`<br />效果类似于 `-v`, 仅仅当修改发生时候才汇报

`-f, --silent, --quiet`<br />不显示错误信息

`-v, --verbose`<br />为处理的每个文件输出完整信息

`--no-preserve-root`<br />不对根目录 `/` 进行特殊处理(默认)

`--preserve-root`<br />当执行目录为根目录时候, 则会失败

`--reference=RFILE`<br />使用 `RFILE` 的所有者和组, 而不是指定的 `OWNER:GROUP` 的值

`-R, --recursive`<br />递归执行文件和目录

`--help`<br />输出帮助信息并退出

`--version`<br />输出版本信息并退出

`MODE` 的形式如下 :<br />`[ugoa]*([-+=]([rwxXst]*|[ugo]))+|[-+=][0-7]+`

## 返回值
返回状态为成功除非给出了非法选项或非法参数。

## 例子
> 参考`man chmod`文档的`DESCRIPTION`段落得知：
> - `u`符号代表当前用户。
> - `g`符号代表和当前用户在同一个组的用户，以下简称组用户。
> - `o`符号代表其他用户。
> - `a`符号代表所有用户。
> - `r`符号代表读权限以及八进制数`4`。
> - `w`符号代表写权限以及八进制数`2`。
> - `x`符号代表执行权限以及八进制数`1`。
> - `X`符号代表如果目标文件是可执行文件或目录，可给其设置可执行权限。
> - `s`符号代表设置权限suid和sgid，使用权限组合`u+s`设定文件的用户的ID位，`g+s`设置组用户ID位。
> - `t`符号代表只有目录或文件的所有者才可以删除目录下的文件。
> - `+`符号代表添加目标用户相应的权限。
> - `-`符号代表删除目标用户相应的权限。
> - `=`符号代表添加目标用户相应的权限，删除未提到的权限。

```
linux文件的用户权限说明：
# 查看当前目录（包含隐藏文件）的长格式。
ls -la
  -rw-r--r--   1 user  staff   651 Oct 12 12:53 .gitmodules
# 第1位如果是d则代表目录，是-则代表普通文件。
# 更多详情请参阅info coreutils 'ls invocation'（ls命令的info文档）的'-l'选项部分。
# 第2到4位代表当前用户的权限。
# 第5到7位代表组用户的权限。
# 第8到10位代表其他用户的权限。
```
```
# 添加组用户的写权限。
chmod g+w ./test.log
# 删除其他用户的所有权限。
chmod o= ./test.log
# 使得所有用户都没有写权限。
chmod a-w ./test.log
# 当前用户具有所有权限，组用户有读写权限，其他用户只有读权限。
chmod u=rwx, g=rw, o=r ./test.log
# 等价的八进制数表示：
chmod 754 ./test.log
# 将目录以及目录下的文件都设置为所有用户拥有读写权限。
# 注意，使用'-R'选项一定要保留当前用户的执行和读取权限，否则会报错！
chmod -R a=rw ./testdir/
# 根据其他文件的权限设置文件权限。
chmod --reference=./1.log  ./test.log
```

## 注意

1. 该命令是`GNU coreutils`包中的命令，相关的帮助信息请查看`man chmod`或`info coreutils 'chmod invocation'`。
2. 符号连接的权限无法变更，如果用户对符号连接修改权限，其改变会作用在被连接的原始文件。
3. 使用`-R`选项一定要保留当前用户的执行和读取权限，否则会报错！


## 补充
文章的地址 : [https://blog.xuite.net/wenhao.kk/note/143723399-Permission](https://blog.xuite.net/wenhao.kk/note/143723399-Permission)<br />以数字方式更改权限	`chmod  (数字权限)  (档名)`

其它更改权限方式	`chmod  (u, g, o, a)(+, -, =)(r, w, x)  (档名)`  ＜不同括号内的值可以交替使用＞

一般建立资料夹的预设权限为 777，而档案的权限为 666，因为受到 umask 预设值为 022 的影响， 所以建立出来的资料夹和档案权限才会有所不同，而系统的 umask 预设值在 /etc/profile 这个档案内， 我们可以依需求去做设定更改。
```
SUID（4）
chmod  u+s  (档名)	＜将档案给予SUID权限，任何人执行时身分会变成档案所有人＞
chmod  u-s  (档名)	＜移除档案的SUID权限＞

SGID（2）
chmod  g+s  (资料夹)	＜将资料夹给予SGID权限，任何人在此资料夹内建立档案，均会继承该目录的群组＞
chmod  g-s  (资料夹)	＜移除资料夹的SGID权限＞

sticky bit（1）
chmod  o+t  (档案)	＜将档案或资料夹给予sticky bit权限，不管权限为何，均不可删除他人的档案＞
chmod  o-t  (档案)	＜移除档案或资料夹的sticky bit权限＞
```
权限的表示方式，若以数字完整的表示应该为四位数<br />第一位表示  特殊权限<br />第二位表示  拥有者(user)<br />第三位表示  群组(group)<br />第四位表示  其它(other)<br />![image.png](https://file.wulicode.com/yuque/202210/03/00/0511zX5QRUsh.png?x-oss-process=image/resize,h_245)<br />此例可以明显看出特殊权限存在时，原本的栏位若有 x，则 s 或 t 就会呈现小写，若原本的栏位无 x，则 S 或 T 就会呈现大写，以此加以辨别

