---
description: '该开源项目包含开发计划、版本计划、首页、文档、Demo及帮助链接等资源，仍存在需要完善和考虑的部分。'
lastUpdated: '2026-06-29 22:49:09'
head:
  - - meta
    - name: 'og:title'
      content: '开发计划'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该开源项目包含开发计划、版本计划、首页、文档、Demo及帮助链接等资源，仍存在需要完善和考虑的部分。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/3.x/framework/plan.html'
---
# 开发计划

## 版本计划

1. modules 和 poppy 不同的地方是

- manifest 交给 composer 部分
- service provider 交给

1. system 配置文件可以独立出来
2. 文件注册(publish)官方的可以使用统一的命名, 即 `poppy`

## 开源

软件著作权 部分模块内部开发, 然后付费使用 addon 可以支持 数据库[支持 js 扩展]

### 首页

主要负责功能的介绍

### 文档

介绍 Frame/Module/System 模块

### Demo

演示链接

### 帮助链接

- [https://www.nicetheme.cn/](https://www.nicetheme.cn/)
- [https://easyweb.vip/](https://easyweb.vip/)
- [https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/)

### 需要完善

- []命令行测试
- []页面注释检查
- []单元测试完善(类需要存在)

- [x] 创建静态文档/ 框架介绍(雨雀)

## 考虑

目标: 模块化开发

1. php 后端采用模块化开发, 模块化加载, 关于模块, 使用需要两个方案 . 安装 执行安装过程, 进行数据库初始化 安装权限, 功能, 页面 安装设置为 true 触发事件, 执行缓存 . 启用 注册数据库启用字段 更新缓存
2. 权限

- 项目安装, 检测是否安装
- 项目中列表