---
title: "Git Flow 开发流程落地版"
date: 2021-05-22 21:18:16
toc: true
categories:
- ["开发","Git","Git Flow"]
---

From : 张新

部署流程.pos

![image.png](https://file.wulicode.com/yuque/202208/04/23/06288EXijjju.png?x-oss-process=image/resize,h_445)




## 1. 版本号约定 
feature版本号用3位，如 `feature/1.0.0` ，下一个feature版本为 `feature/1.0.1` 

hotfix版本号用4位，如 1.0.0 版本的第一个hotfix版本应为 `hotfix/1.0.0.1`  

## 2. 什么时候用feature，什么时候用hotfix 
大版本更新，功能比较多，耗时比较长，用feature；比如pc改版、加新的聊天室类型 

修复线上bug，小活动，小功能，耗时比较短，用hotfix；比如各种节日活动 

## 3. feature版本流程 

1. 更新master和develop分支到最新
2. git flow feature start 1.0.0
3. 代码完成后，将整个feature分支推到远端，部署feature到测试服务器，测试中出现的bug也在该feature分支进行修复并复测
4. 测试无误后，再次更新master和develop分支到最新，执行git flow feature finish 1.0.0
5. 新建release分支， `git flow release start 1.0.0` 
6. 结束release分支， `git flow release finish 1.0.0` 
7. 推送 master 和 develop 分支

## 4. hotfix版本流程 

1、更新 master 和 develop 分支到最新

2、 `git flow hotfix start 1.0.0.1` 

3、代码完成后，将整个hotfix分支推到远端，部署hotfix到测试服务器，测试中出现的bug也在该hotfix分支进行修复并复测

4、测试无误后，执行 `git flow hotfix finish 1.0.0.1` 

5、推送 master 和 develop 分支

## 5. 常用功能及常见问题 


### 1. 查看所有版本号
```json
git tag|sort -V
```

### 2. hotfix 分支创建
已经有一个hotfix分支了，此时还需要创建一个hotfix分支，使用命令无法创建

使用 phpstorm / webstorm，切换到 master 分支，更新代码，点击新建分支

![](https://file.wulicode.com/yuque/202208/04/23/06292aNg1OIY.png?x-oss-process=image/resize,h_434)

输入 `hotfix/1.0.0.2` （注意格式，一定要带hotfix/） 

![](https://file.wulicode.com/yuque/202208/04/23/06295GAfApUW.png?x-oss-process=image/resize,h_192)

结束时可直接使用 `git flow hotfix finish 1.0.0.2` 

### 3. 推送代码时记得勾选推送标记 
![](https://file.wulicode.com/yuque/202208/04/23/06294MzODJJE.png?x-oss-process=image/resize,h_365)

