---
title: "[转] 让crond以秒为单位执行任务的方法(如每隔3秒)"
date: 2021-06-26 10:47:28
toc: true
categories:
- ["Ops","Linux","crontab"]
---

昨天写了一个需求的应用脚本，根据实际需求最好能使它每隔3秒钟自动执行一次，可是crond似乎只支持到分，怎么办呢？

第一种方法：

当然首先想到的是写一个触发的脚本，在触发脚本中使用死循环来解决此问题，如下：




```
$ cat kick.sh

#!/bin/bash
while : ;do
    /home/somedir/scripts.sh 2>/dev/null &
    sleep 3
done
```

注意第一次运行时请不要使用bash kick.sh & 这种后台运行的方式，它会僵死的。

可以把它放到计划任务使其运行，然后将计划任务中的此条目删除即可。最后把这个脚本放到/etc/rc.local让它每次开机都可以被运行。

第二种方法：

和第一种方法类似，只不过感觉比第一种更便捷一些。

```
cat cron-seconds.sh 

#!/bin/bash
#For excuting the scripts every 3 seconds in crond.
#20100124.WXG

for((i=1;i<=20;i++));do
    /home/somedir/scripts.sh 2>/dev/null &
    sleep 3
done
```

然后写入的crontab里每分钟执行一次，如下

```
$ crontab -e
* * * * * /bin/bash /home/somedir/cron-seconds.sh
```

第三种方法：

那么如何使用计划任务来直接实现呢？

最后解决方案如下，经验证，脚本运行非常稳定。

```
$ crontab -e
## For excuting scripts.sh every 3 seconds##on 2010-01-22
* * * * *  /home/somedir/scripts.sh
* * * * * sleep 3 &&  /home/somedir/scripts.sh
* * * * * sleep 6 &&  /home/somedir/scripts.sh
* * * * * sleep 9 &&  /home/somedir/scripts.sh
* * * * * sleep 12 &&  /home/somedir/scripts.sh
* * * * * sleep 15 &&  /home/somedir/scripts.sh
* * * * * sleep 18 &&  /home/somedir/scripts.sh
* * * * * sleep 21 &&  /home/somedir/scripts.sh
* * * * * sleep 24 &&  /home/somedir/scripts.sh
* * * * * sleep 27 &&  /home/somedir/scripts.sh
* * * * * sleep 30 &&  /home/somedir/scripts.sh
* * * * * sleep 33 &&  /home/somedir/scripts.sh
* * * * * sleep 36 &&  /home/somedir/scripts.sh
* * * * * sleep 39 &&  /home/somedir/scripts.sh
* * * * * sleep 42 &&  /home/somedir/scripts.sh
* * * * * sleep 45 &&  /home/somedir/scripts.sh
* * * * * sleep 48 &&  /home/somedir/scripts.sh
* * * * * sleep 51 &&  /home/somedir/scripts.sh
* * * * * sleep 54 &&  /home/somedir/scripts.sh
* * * * * sleep 57 &&  /home/somedir/scripts.sh
```

好好想想就可以明白其中的道理了。

我还是比较倾向于使用第三种方法的。因为第一种方法和第二种方法并不是严格的间隔3秒执行的，会大于3秒，因为执行scripts.sh也是需要一定时间的，即使已经加了&符号放到了后台执行也会存在一定的误差。如果对于精确度要求不高，推荐使用第二种方法。

