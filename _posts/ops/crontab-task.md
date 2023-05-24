---
title: "crontab 定时任务"
date: 2021-06-11 09:13:01
toc: true
categories:
- ["Ops","Linux","crontab"]
---

Linux中，周期执行的任务一般由cron这个守护进程来处理  `ps -ef | grep cron`

cron读取一个或多个配置文件，这些配置文件中包含了命令行及其调用时间。

cron的配置文件称为 `crontab`，是 `cron table`的简写。





## 一、 cron在3个地方查找配置文件（设置shell脚本）：

- `/var/spool/cron/` 这个目录下存放的是每个用户（包括root）的crontab任务，每个任务以创建者的名字命名，比如用户tom建的crontab任务对应的文件就是 `/var/spool/cron/tom`

```
sudo ls -l /var/spool/cron/（或有时是 /var/spool/cron/crontabs/）
-rw------- 1 root     crontab 1071 2011-09-19 17:20 root
-rw------- 1 yanggang crontab 1176 2011-09-24 11:07 yanggang
```

一般一个用户最多只有一个crontab文件（如：root, yanggang等），其对应日志在 `/var/spool/mail/root`（或 `/var/spool/mail/yanggang`）文件里

- `/etc/crontab` 这个文件负责安排由系统管理员制定的维护系统以及其他任务的crontab。

```
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
HOME=/
# .---------------- minute (0 - 59) 
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ... 
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7)  OR sun,mon,tue,wed,thu,fri,sat 
# |  |  |  |  |
# *  *  *  *  *  command to be executed
```

说明
> 可以进行快捷记忆 : 分时天月周

```
*/5 * * * * root /usr/libexec/atrun
minute：代表一小时内的第几分，范围 0-59。 
hour：代表一天中的第几小时，范围 0-23。 
mday：代表一个月中的第几天，范围 1-31。 
month：代表一年中第几个月，范围 1-12。 
wday：代表星期几，范围 0-7 (0及7都是星期天)。 
who：要使用什么身份执行该指令，当您使用 crontab -e 时，不必加此字段。 
command：所要执行的指令。
```

- `/etc/cron.d/` 这个目录用来存放任何要执行的crontab文件或脚本。


## 二、 权限

crontab 权限问题到 /var/adm/cron/ 下一看，文件 cron.allow 和 cron.deny 是否存在

用法如下：

1. 如果两个文件都不存在，则只有root用户才能使用crontab命令。
2. 如果cron.allow存在但cron.deny不存在，则只有列在cron.allow文件里的用户才能使用crontab命令，如果root用户也不在里面，则root用户也不能使用crontab。
3. 如果cron.allow不存在, cron.deny存在，则只有列在cron.deny文件里面的用户不能使用crontab命令，其它用户都能使用。
4. 如果两个文件都存在，则列在cron.allow文件中而且没有列在cron.deny中的用户可以使用crontab，如果两个文件中都有同一个用户，

以cron.allow文件里面是否有该用户为准，如果cron.allow中有该用户，则可以使用crontab命令。

AIX 中 普通用户默认都有 crontab 权限，如果要限制用户使用 crontab ,就需要编辑/var/adm/cron/cron.deny

HP-UNIX 中默认普通用户没得crontab 权限 ，要想放开普通用户的crontab 权限可以编


## 三、 创建cron脚本

第一步：写cron脚本文件,命名为crontest.cron

```
15,30,45,59 * * * * echo "xgmtest....." >> xgmtest.txt
```

表示，每隔15分钟，执行打印一次命令

第二步：添加定时任务。执行命令  `crontab crontest.cron`。搞定

第三步：`crontab -l` 查看定时任务是否成功或者检测 `/var/spool/cron`下是否生成对应cron脚本


## 四、 cron 服务和日志

cron是一个linux下 的定时执行工具，可以在无需人工干预的情况下运行作业。

```
/sbin/service crond start    //启动服务
/sbin/service crond stop     //关闭服务
/sbin/service crond restart  //重启服务
/sbin/service crond reload   //重新载入配置
/sbin/service crond status   //查看服务状态
```

例如： 使用sudo停止与启动服务

```
sudo service cron stop
sudo service cron start
```

CentOS 的 cron 日志默认位置在 `/var/log/cron` 中。这个文件仅记录命令的执行，而不记录结果或退出状态。默认情况下，已执行命令的输出进入用户的邮件。可以通过 crontab 内的 MAILTO 变量指定电子邮件地址。

你可能应该调整 `logrotate` 规则，因为它会删除 `/var/log/ secure` 日志 [:链接:](https://unix.stackexchange.com/questions/176229/where-to-find-the-crontab-logs-in-centos)。


## 五、 crontab用法

crontab 命令用于安装、删除或者列出用于驱动 cron 后台进程的表格，用户把需要执行的命令序列放到crontab文件中以获得执行。

每个用户都可以有自己的crontab文件，`/var/spool/cron`下的crontab文件不可以直接创建或者直接修改，该crontab文件是通过`crontab -e`命令创建的

在crontab文件中如何输入需要执行的命令和时间，该文件中每行都包括六个域，其中前五个域是指定命令被执行的时间，最后一个域是要被执行的命令。

每个域之间使用空格或者制表符分隔。格式如下：

```
minute hour day-of-month month-of-year day-of-week commands
```

合法值 00-59 00-23 01-31 01-12 0-6 (0 is sunday)

除了数字还有几个个特殊的符号就是"_"、"/"和"-"、","，_代表所有的取值范围内的数字

"/"代表每的意思,"/5"表示每5个单位，"-"代表从某个数字到某个数字,","分开几个离散的数字。

`-l` 在标准输出上显示当前的crontab。

`-r` 删除当前的crontab文件。

`-e` 使用VISUAL或者EDITOR环境变量所指的编辑器编辑当前的crontab文件。

当结束编辑离开时，编辑后的文件将自动安装。

**几个例子**

```
# 每天早上6点 
0 6 * * * echo "Good morning." >> /tmp/test.txt //注意单纯echo，从屏幕上看不到任何输出，因为cron把任何输出都email到root的信箱了。

# 每两个小时 
0 */2 * * * echo "Have a break now." >> /tmp/test.txt  

# 晚上11点到早上8点之间每两个小时和早上八点 
0 23-7/2，8 * * * echo "Have a good dream" >> /tmp/test.txt

# 每个月的4号和每个礼拜的礼拜一到礼拜三的早上11点 
0 11 4 * 1-3 command line

# 1月1日早上4点 
0 4 1 1 * command line SHELL=/bin/bash PATH=/sbin:/bin:/usr/sbin:/usr/bin MAILTO=root //如果出现错误，或者有数据输出，数据作为邮件发给这个帐号 HOME=/ 

# 每小时（第一分钟）执行/etc/cron.hourly内的脚本
01 * * * * root run-parts /etc/cron.hourly

# 每天（凌晨4：02）执行/etc/cron.daily内的脚本
02 4 * * * root run-parts /etc/cron.daily 

# 每星期（周日凌晨4：22）执行/etc/cron.weekly内的脚本
22 4 * * 0 root run-parts /etc/cron.weekly 

# 每月（1号凌晨4：42）去执行/etc/cron.monthly内的脚本 
42 4 1 * * root run-parts /etc/cron.monthly 

# 注意:  "run-parts"这个参数了，如果去掉这个参数的话，后面就可以写要运行的某个脚本名，而不是文件夹名。 　 

# 每天的下午4点、5点、6点的5 min、15 min、25 min、35 min、45 min、55 min时执行命令。 
5，15，25，35，45，55 16，17，18 * * * command

# 每周一，三，五的下午3：00系统进入维护状态，重新启动系统。
00 15 * *1，3，5 shutdown -r +5

# 每小时的10分，40分执行用户目录下的innd/bbslin这个指令： 
10，40 * * * * innd/bbslink 

# 每小时的1分执行用户目录下的bin/account这个指令： 
1 * * * * bin/account

# 每天早晨三点二十分执行用户目录下如下所示的两个指令（每个指令以;分隔）： 
203 * * * （/bin/rm -f expire.ls logins.bad;bin/expire$#@62;expire.1st）　　

# 每年的一月和四月，4号到9号的3点12分和3点55分执行/bin/rm -f expire.1st这个指令，并把结果添加在mm.txt这个文件之后（mm.txt文件位于用户自己的目录位置）。 
12,553 4-91,4 * /bin/rm -f expire.1st>>mm.txt
```


## 补充

### crontab 编辑
输入编辑命令： `crontab -e`

```
# m h  dom mon dow   command
SHELL=/bin/bash
30 * * * * cd /home/barry/top800/top10/top10_fruits/ && ./top10_all.sh
```

`Ctrl + O`（写入） -> `enter键`（保存文件名） -> `Ctrl + X`（退出）

输入查看命令： `crontab -l`

```
# m h  dom mon dow   command
SHELL=/bin/bash
30 * * * * cd /home/barry/top800/top10/top10_fruits/ && ./top10_all.sh（建议使用此方式）
```


### 语法错误

```
Syntax error: "(" unexpected
```

参见： LINUX - BASH Syntax Error

或者，crontab -e 时指定shell解释器（sh）：SHELL=/bin/bash（请参见上面 crontab编辑 示例）

路径错误：

在 /var/spool/crontab/yanggang 中，添加了如下命令，在日志文件 /var/spool/mail/yanggang 中提示找不到 xxx.sh 路径

```
30 * * * *  /home/barry/top800/top10/top10_fruits/top10_all.sh
# 或
30 * * * * bash /home/barry/top800/top10/top10_fruits/top10_all.sh
```

是因为你在crontab中使用了绝对路径执行脚本 top10_all.sh，因此在脚本 top10_all.sh 中引用的其它脚本也都需要使用绝对路径，才能被crontab找到并执行

如何避免绝对路径复杂的设置呢，如上文 六、几个问题  所示，采用如下格式：

```
30 * * * * cd /home/barry/top800/top10/top10_fruits/ && ./top10_all.sh
# （建议使用此方式，先进入该目录，然后在执行脚本；否则，执行脚本中的其它脚本都需要加绝对路径）
```

### 输出执行日志
在命令末尾添加 `2>&1`, ‎‎这会将 stderr 输出重定向到标准输出。然后再确认你正在记录 crontab 的日志
```
0 0,12 1 */2 * ( /sbin/ping -c 1 192.168.0.1; ls -la ) >>/var/log/cronrun 2>&1
```

### 假如命令行中包含 %
%（百分号）在 crontab 中是一个特殊字符，相当于回车，如果在命令（command）字段中包含 %，那么只有第一个百分号前的文本才会包含在实际命令中，之后的内容将作为标准输入赋值给前面的命令。如果命令行中需要 %，必须得在 %前面加一个反斜线""来转义，即“%”, 如

在 Linux 系统中执行 man 5 crontab 就可以找到如下描述
```
The  "sixth"  field  (the rest of the line) specifies the command to be
run.  The entire command portion of the line, up  to  a  newline  or  %
character, will be executed by /bin/sh or by the shell specified in the
SHELL variable of the cronfile.   Percent-signs  (%)  in  the  command,
unless escaped with backslash (\), will be changed into newline charac-
ters, and all data after the first % will be sent  to  the  command  as
standard input.

第六个域（行的剩余部分）指明了要运行的命令。一行中整个命令部分遇到一个换行符或%结束，命
令会以/bin/sh执行或以cron文件中 SHELL变量指明的shell执行。命令中的百分号（%） ，除
非以反斜线 “\” 转义，否则会被转换为换行符，第一个%后的所有数据会被发送给命令作为标准输入

```
如果你的命令行中存在  `%`, 请记得加上 `\`进行转义

### 按秒来执行计划任务
[[转] 让crond以秒为单位执行任务的方法(https://wulicode.com/ops/zhuan-rangcrond-yi-miao-wei-dan-wei-zhi-xing-ren-w?view=doc_embed.html)
```
* * * * * sleep 9 &&  /home/somedir/scripts.sh
* * * * * sleep 12 &&  /home/somedir/scripts.sh
* * * * * sleep 15 &&  /home/somedir/scripts.sh
```

## 参考文章

- [https://stackoverflow.com/questions/4883069/debugging-crontab-jobs](https://stackoverflow.com/questions/4883069/debugging-crontab-jobs)
-

