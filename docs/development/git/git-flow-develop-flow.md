---
description: 'feature 版本号用 2 位，如 feature/1.0 ，下一个 feature 版本为 feature/1.1  hotfix版本号用 3位，如 1.0.0 版本的第一个 hotfix 版本应为 hotfix/1.0.1更新 develop 代码, 保证 develop 代码最新, 特性分支命名建议为版本号 x.x 不携带小版本号代码完成后，将整个feature分支推到远端，部署feature到测试服务器，测试中出现的bug也在该feature分支进行修复并复测feature 分支已经开发并测试完毕, 需要合并到 develop, 并检查远程 feature 分支是否删'
lastUpdated: '2025-12-06 10:55:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Git Flow 开发流程落地版'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'feature 版本号用 2 位，如 feature/1.0 ，下一个 feature 版本为 feature/1.1  hotfix版本号用 3位，如 1.0.0 版本的第一个 hotfix 版本应为 hotfix/1.0.1更新 develop 代码, 保证 develop 代码最新, 特性分支命名建议为版本号 x.x 不携带小版本号代码完成后，将整个feature分支推到远端，部署feature到测试服务器，测试中出现的bug也在该feature分支进行修复并复测feature 分支已经开发并测试完毕, 需要合并到 develop, 并检查远程 feature 分支是否删'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/git/git-flow-develop-flow.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/91/91b0852c893abc205d5658c02d9b3173.png?x-oss-process=image/resize,m_mfit,w_400'
---
# Git Flow 开发流程落地版



::: info  💡 
本文主要描述 gitflow 流程在开发过程中的执行以及注意事项

:::

![](https://file.wulicode.com/notion/91/91b0852c893abc205d5658c02d9b3173.png)

## 版本约定

feature 版本号用 2 位，如  `feature/1.0`  ，下一个 feature 版本为  `feature/1.1`   hotfix版本号用 3位，如  `1.0.0`  版本的第一个 hotfix 版本应为  `hotfix/1.0.1`

## 功能开发

::: info  💡 
功能分支使用 feature, 用于比较大版本的功能更新

:::

更新 develop 代码, 保证 develop 代码最新, 特性分支命名建议为版本号 x.x 不携带小版本号

```
# 开始开发
$ git checkout develop && git pull
$ git flow feature start 1.5
```

代码完成后，将整个feature分支推到远端，部署feature到测试服务器，测试中出现的bug也在该feature分支进行修复并复测

feature 分支已经开发并测试完毕, 需要合并到 develop, 并检查远程 feature 分支是否删除, 如果没有, 则需要删除, 保证分支纯洁性

```
$ git flow feature finish 2.1
```

## 发布

::: info  💡 
发布分支使用 release, 用以备注并合并 master 和 develop 分支

:::

在发布中需要做的是

- 修改包版本号, 对于 php 项目是 composer 版本, 对于 js 项目是  `package.json`  文件中的版本
- 更新版本的 changelog

```
$ git flow release start 2.1.0
# 结束 release, 合并代码
$ git flow release finish 2.1.0
```

将分支推送给 master 和 develop

##  **Hotfix 开发** 

::: info  💡 
主要用于 bug 修复, 小功能更新, 优化更新

:::

查看最新版本, 创建 hotfix, 版本号在 patch 版本号后递增.

```
# 查看版本
$ git tag|sort -V
# 开启修复分支
$ git flow hotfix start 2.28.1
# 完成分支
$ git flow hotfix finish 2.28.1
```

代码完成后，将整个 hotfix 分支推到远端，部署 hotfix 到测试服务器，测试中出现的 bug 也在该hotfix 分支进行修复并复测

完成之后推送分支到 master & develop 分支, 发布之后将修改的内容发送给测试, 由测试统一汇总发送通知

## 上线

::: info  💡 
对代码进行线上更新操作

:::

## 常用功能及常见问题

### 1. 查看所有版本号

```json
git tag|sort -V
```

### 2. hotfix 分支创建

已经有一个 hotfix 分支了，此时还需要创建一个 hotfix 分支，使用命令无法创建使用 phpstorm / webstorm，切换到 master 分支，更新代码，点击新建分支来创建即可

### 3. 推送代码时记得勾选推送 tag

![](https://file.wulicode.com/notion/f4/f4610b32bd2bc41e49f156ccaa9e6b85.png)

