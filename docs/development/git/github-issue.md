---
title: "[转] github issue是做什么的？"
date: 2021-05-20 16:02:37
toc: true
categories:
- ["开发","Git"]
---

GitHub 的 issue 功能，对个人而言，就如同 TODO list 。

你可以把所有想要在下一步完成的工作，如 feature 添加、bug 修复等，都写成一个个的 issue ，放在上面。既可以作为提醒，也可以统一管理。

另外，每一次 commit 都可以选择性的与某个 issue **关联**。比如在 message 中添加 #n，就可以与第 n 个 issue 进行**关联**。




```
commit message title, #1
```

这个提交会作为一个 comment ，出现在编号为1的 issue 记录中。

如果添加：

- close #n
- closes #n
- closed #n
- fix #n
- fixes #n
- fixed #n
- resolve #n
- resolves #n
- resolved #n

比如

```
commit message title, fix #n
```

则可以**自动关闭**第 n 个 issue 。

issue 可以有额外的属性：

-  Labels，标签。包括 enhancement、bug、invalid 等，表示 issue 的类型，解决的方式。除了自带的以外，也可以去自定义。 
-  Milestone，里程碑。几经修改后，它现在已经与git tag和Github release区分开来，仅仅作为issue的一个集合。通常用来表示项目的一个阶段，比如demo、release等，保护达成这些阶段需要解决的问题。有时候，也会与版本计划重合，比如v1.0、v2.0等。issue不能设置截止时间，但是milestone可以。 
-  Assignee，责任人。指定这个 issue 由谁负责来解决。 

充分利用这些功能，让每一个 commit 的意义更加明确，可以起到了良好的**过程管理**作用，使得这个 Git 库的项目进度更加显然。而且，这也是项目后期，写文档的绝佳素材。

对团队而言，这就是一个**协作系统**。

现在，很多大公司的软件研发团队协作，都是通过 JIRA 来实现的。

目前也流行很多非代码的团队协作，比如 teambition、tower.im、Worktile、trello 等。

其实，GitHub 的 issue ，就是一个轻量级**协作系统**。它的 comment 支持 GitHub Flavored Markdown，可以进行内容丰富的交流。Git 本身就是分布式的代码版本控制软件，是为了程序员的协作而设计的。而 issue 的 Assignee 功能，就是这个在线协作系统的核心，足以让一群线上的开发者，一起完成一个软件项目。

最后，作为一个路人，你可以通过 issue 给别人的项目提 bug 。

参考：[Closing issues via commit messages](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues)

其它Github帮助，可以在此搜索：[GitHub Help](https://support.github.com/)

参考 [Mastering Issues](https://guides.github.com/features/issues/)

