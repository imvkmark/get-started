# Git Log

## 需求

参考资料 :  http://www.cnblogs.com/BeginMan/p/3577553.html 

说明 :  http://www.douban.com/group/topic/10553266/ 

- 获取指定文件的版本信息、修改者、修改时间、提交说明（git log --pretty=format:"%H|%an|%ar|%cd %s "）
- 输入指定的文件版本信息号，版本回退
- 两个不同内容的对比（git log --follow -p list.htm"）

## 实现

获取指定文件的所有版本信息

```
git log   --pretty=format:"%H|%an|%ad|%cn|%cd|%s"  list.htm
# 格式化输出：
选项     说明
%H    提交对象（commit）的完整哈希字串
%h    提交对象的简短哈希字串
%T    树对象（tree）的完整哈希字串
%t    树对象的简短哈希字串
%P    父对象（parent）的完整哈希字串
%p    父对象的简短哈希字串
%an    作者（author）的名字
%ae    作者的电子邮件地址
%ad    作者修订日期（可以用 -date= 选项定制格式）
%ar    作者修订日期，按多久以前的方式显示
%cn    提交者(committer)的名字
%ce    提交者的电子邮件地址
%cd    提交日期
%cr    提交日期，按多久以前的方式显示
%s    提交说明
```

这里输出：

提交对象的完整哈希字符串|作者|作者修改时间|提交者|提交者提交日期 |提交说明 目录

版本回退

```
git reset 9845220955c6f8eb7635ae9e5e50ea52ee66bc6e #就会回退到指定的版本信息。硬回退可以加--hard
git reset –mixed：此为默认方式，不带任何参数的git reset，即时这种方式，它回退到某个版本，只保留源码，回退commit和index信息
git reset –soft：回退到某个版本，只回退了commit的信息，不会恢复到index file一级。如果还要提交，直接commit即可
git reset –hard：彻底回退到某个版本，本地的源码也会变为上一个版本的内容
```

选定指定2个版本内容，对比实现 （多选 ）

使用git diff 输入两个版本号 就可以对比实现了

## git 强制更新

更新地址:  http://192.168.1.21:8000/ 

自动更新执行的代码为

```
git pull origin dev
```

如果更新失败运行

```
git reset --hard origin/dev
git fetch -f
```

## git 查找版本之间差异

```
# 一行输出
git log 2.6.99..feature/2.6.199 --oneline
# 显示完整
git log 2.6.99..feature/2.6.199
```

