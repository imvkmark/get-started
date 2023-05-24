---
title: "git 代码自动化部署 shell 脚本"
date: 2022-04-14 22:14:58
toc: true
categories:
- ["开发","Git"]
---

```



#!/bin/bash
_FILES=/data/web/ixdcw_dev/
_times=`date +%Y%m%d`
log=/data/web/log.log
string=`cat $log |awk {'print $1'}`
#echo $PWD
cd $_FILES
#chown -R daemon:daemon $_FILES
#chmod 744 -R $_FILES
#echo 'chown the own of ixdcw_ixdcw files !'
#echo $PWD
#cd $_FILES
/usr/bin/git checkout 1.3.0
echo "git branch  to dev and git pulling now ..."
/usr/bin/git pull origin 1.3.0 >$log
if [ "$string" == "Already" ];then
        echo $string
else
        /usr/bin/git fetch -f
        /usr/bin/git reset --hard
        /usr/bin/git pull origin 1.3.0
        echo "GIT RESET ORIGIN DEV HEAD"
fi
#Already up-to-date.
echo $_times >pull_branch_dev.log
```

