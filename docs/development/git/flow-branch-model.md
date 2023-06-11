---
title : ""
date : 2022-04-20 18:58:26
toc : true
categories :
  - [ "开发","Git","Git Flow" ]
---

# 「译」一个成功的 Git 分支模型

::: info 原文和译文

原文地址: [介绍一个成功的 Git 分支模型](https://www.oschina.net/translate/a-successful-git-branching-model)

英文原文地址: [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

:::

在这篇文章中，我提出一个开发模型。我已经将这个开发模型引入到我所有的项目里（无论在工作还是私人）已经一年有余，并且它被证明是非常成功的。我打算写这些已经很久了，但我一直找不到时间来做，现在终于有时间了。我不会讲任何项目的具体细节，仅是关于分支策略和释放管理相关内容。

![](https://file.wulicode.com/note/2021/10-23/11-20-20181.png)

它主要体现了 Git 对我们源代码版本的管理。

**为何是 Git？**

对于 Git 与其他集中式代码管理工具相比的优缺点的全面讨论，请参见[这里](https://git.wiki.kernel.org/index.php/GitSvnComparsion)
。这样的争论总是喋喋不休。作为一个开发者，与现今的其他开发工具相比较，我更喜欢 Git。Git 真得改变了开发者对于合并和分支的思考。我曾经使用经典的
CVS/Subversion，然而每次的合并/分支和其他行为总让人担惊受怕（“小心合并里的冲突，简直要命！”）。

但是对于 Git 来说，这些行为非常简单和搞笑，它们被认为是_日常_工作中的核心部分。例如，在很多 CVS/Subversion[书](http://svnbook.red-bean.com/)
里，分支与合并总是在后面的章节中被讨论（对于高级用户使用），然而在每个 Git[书](http://pragprog.com/book/tsgit/pragmatic-version-control-using-git)中，在第 3
章就已经完全涵盖了（作为基础）。

简单和重复的特性带来的结果是：分支与合并不再是什么可以害怕的东西。分支/合并被认为对于版本管理工具比其他功能更重要。

关于工具，不再多说，让我们直接看开发模型吧。这个模型并不是如下模型：在管理软件开发进度方面，面对每个开发过程，每个队员必须按一定次序开发。

**分布式而非集中式**

对于这种分支模型，我们设置了一个版本库，它运转良好，这是一个"事实上" 版本库。不过请注意，这个版本库只是被_认为_是中心版本库（因为 Git
是一个分布式版本管理系统，从技术上来讲，并没有一个中心版本库）。我们将把这个版本库称为原始库，这个名字对所有的 Git 用户来说都很容易理解。

![](https://file.wulicode.com/note/2021/10-23/11-20-32472.png)

每个开发者都对 origin 库拉代码和提交代码。但是除了集中式的存取代码关系，每个开发者也可以从子团队的其他队友那里获得代码版本变更。例如，对于 2
个或多个开发者一起完成的大版本变更，为了防止过早地向 origin 库提交工作内容，这种机制就变得非常有用。在上述途中，有如下子团队：Alice 和 Bob，Alice 和 David，Clair 和
David。

从技术上将，这意味着，Alice 创建了一个 Git 的远程节点，而对于 Bob，该节点指向了 Bob 的版本库，反之亦然。

## 主分支

![](https://file.wulicode.com/note/2021/10-23/11-20-46278.png)

在核心部分，研发模型很大程度上靠其他现有模型支撑的。中心库有 2 个可一直延续的分支：

- master 分支
- develop 分支

每个 Git 用户都要熟悉原始的 master 分支。与 master 分支并行的另一个分支，我们称之为 develop 分支。

我们把原始库/master 库认作为主分支，HEAD 的源代码存在于此版本中，并且随时都是一个 _预备_ _生产_ 状态。

我们把 origin/develop 库认为是主分支，该分支 HEAD 源码始终体现下个发布版的最新软件变更。有人称这个为“集成分支”，而这是每晚自动构建得来的。

当 develop 分支的源码到达了一个稳定状态待发布，所有的代码变更需要以某种方式合并到 master 分支，然后标记一个版本号。如何操作将在稍后详细介绍。

所以，每次变更都合并到了 master，这就是新产品的_定义_。在这一点，我们倾向于严格执行这一点，从而，理论上，每当对 master 有一个提交操作，我们就可以使用 Git
钩子脚本来自动构建并且发布软件到生产服务器。

## 辅助性分支

我们的开发模型使用了各种辅助性分支，这些分支与关键分支（master 和 develop）一起，用来支持团队成员们并行开发，使得易于追踪功能，协助生产发布环境准备，以及快速修复实时在线问题。与关键分支不同，这些分支总是有一个有限的生命期，因为他们最终会被移除。

我们用到的分支类型包括：

- 功能分支
- 发布分支
- bug 修复(`hotfix`)分支

每一种分支有一个特定目的，并且受限于严格到规则，比如：可以用哪些分支作为源分支，哪些分支能作为合并目标。我们马上将进行演练。

从技术角度来看，这些分支绝不是特殊分支。分支的类型基于我们使用的方法来进行分类。它们理所当然是普通的 Git 分支。

## 功能分支

![](https://file.wulicode.com/note/2021/10-23/11-20-57952.png)

可能是 develop 分支的分支版本，最终必须合并到 develop 分支中。

分支命名规则：除了`master`、`develop`、`release-*`、 `hotfix-*`之外，其他命名均可。

功能分支（有时被称为 topic 分支）通常为即将发布或者未来发布版开发新的功能。当新功能开始研发，包含该功能的发布版本在这个还是无法确定发布时间的。功能版本的实质是只要这个功能处于开发状态它就会存在，但是最终会或合并到
develop 分支（确定将新功能添加到不久的发布版中）或取消（譬如一次令人失望的测试）。

功能分支通常存在于开发者的软件库，而不是在源代码库中。

### 创建一个功能分支

开始一项功能的开发工作时，基于 develop 创建分支。

```
$ git checkout -b myfeature develop
Switched to a new branch` `"myfeature"
```

### 合并一个功能到 develop 分支

完成的功能可以合并进 develop 分支，以明确加入到未来的发布：

```
$ git checkout develop
Switched to branch` `'develop'
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin develop
```

--no-ff 标志导致合并操作创建一个新 commit 对象，即使该合并操作可以 fast-forward。这避免了丢失这个功能分支存在的历史信息，将该功能的所有提交组合在一起。 比较:

![](https://file.wulicode.com/note/2021/10-23/11-21-08752.png)

后一种情况，不可能从 Git 历史中看到哪些提交一起实现了一个功能——你必须手工阅读全部的日志信息。如果对整个功能进行回退  (比如一组提交)
，后一种方式会是一种真正头痛的问题，而使用--no-ffflag 的情况则很容易.

是的，它会创建一个新的（空）提交对象，但是收益远大于开销。

不幸的是，我还没找到一种方法，让--no-ff 时作为合并操作的默认选项，但它应该是可行的。

## Release 分支

Release 分支可能从 develop 分支分离而来，但是一定要合并到 develop 和 master 分支上，它的习惯命名方式为：release-*。

Release 分支是为新产品的发布做准备的。它允许我们在最后时刻做一些细小的修改。他们允许小 bugs 的修改和准备发布元数据（版本号，开发时间等等）。当在 Release
分支完成这些所有工作以后，对于下一次打的发布，develop 分支接收 features 会更加明确。

从 develop 分支创建新的 Release 分支的关键时刻是 develop 分支达到了发布的理想状态。至少所有这次要发布的 features 必须在这个点及时合并到 develop 分支。对于所有未来准备发布的
features 必须等到 Release 分支创建以后再合并。

在 Release 分支创建的时候要为即将发行版本分配一个版本号，一点都不早。直到那时，develop 分支反映的变化都是为了下一个发行版，但是在 Release 分支创建之前，下一个发行版到底叫
0.3 还是 1.0 是不明确的。这个决定是在 Release 分支创建时根据项目在版本号上的规则制定的。

### 创建一个 release 分支

Release 分支是从 develop 分支创建的。例如，当前产品的发行版本号为 1.1.5，同时我们有一个大的版本即将发行。develop 分支已经为下次发行做好了准备，我们得决定下一个版本是
1.2（而不是 1.1.6 或者 2.0）。所以我们将 Release 分支分离出来，给一个能够反映新版本号的分支名。

```
$ git checkout -b release-1.2 develop
Switched to a new branch` `"release-1.2"
$ .``/bump-version``.sh 1.2
Files modified successfully, version bumped to 1.2.
$ git commit -a -m` `"Bumped version number to 1.2"
[release-1.2 74d9424] Bumped version number to 1.2
1 files changed, 1 insertions(+), 1 deletions(-)
```

创建新分支以后，切换到该分支，添加版本号。这里，bump-version.sh 是一个虚构的 shell 脚本，它可以复制一些文件来反映新的版本（这当然可以手动改变--目的就是修改一些文件）。然后版本号被提交。

这个新分支可能会存在一段时间，直到该发行版到达它的预定目标。在此期间，bug 的修复可能被提交到该分支上（而不是提交到 develop 分支上）。在这里严格禁止增加大的新
features。他们必须合并到 develop 分支上，然后等待下一次大的发行版。

### 完成一个 release 分支

当一个 release 分支准备好成为一个真正的发行版的时候，有一些工作必须完成。首先，release 分支要合并到 master 上（因为每一次提交到 master 上的都是一个新定义的发行版，记住）。然后，提交到
master 上必须打一个标签，以便以后更加方便的引用这个历史版本。最后，在 release 分支上的修改必须合并到 develop 分支上，以便未来发行版也包含这些 bugs 的修复。

在 Git 中的前两步是：

```
$ git checkout master
Switched to branch` `'master'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2
```

发行版现在已经完成，为以后引用打上标签。

**编辑：**你可能也想使用 the-sor-u flags 来标记你的标签。

为了是修改保持在 release 分支上，我们需要合并这些到 develop 分支上去，在 Git 上：

```
$ git checkout develop
Switched to branch` `'develop'
$ git merge --no-ff release-1.2
Merge made by recursive.
(Summary of changes)
```

这个步骤可能会导致合并冲突（可能由于改变版本号更是如此）。如果是这样，修复它然后提交。

现在我们真正的完成了，这个 release 分支将被删除，因为我们不再需要它了。

```
$ git branch -d release-1.2
Deleted branch release-1.2 (was ff452fe).
```

## bug 修复分支

![](https://file.wulicode.com/note/2021/10-23/11-21-21986.png)

可以基于 master 分支，必须合并回 develop 和 master 分支。

分支名约定：hotfix-*

热修复分支与发布分支很相似，他们都为新的生成环境发布做准备，尽管这是未经计划的。他们来自生产环境的处于异常状态压力。当生成环境验证缺陷必须马上修复是，热修复分支可以基于
master 分支上对应与线上版本的 tag 创建。

其本质是团队成员（在 develop 分支上）的工作可以继续，而另一个人准备生产环境的快速修复。

### 创建修补 bug 分支

hotfix branch(修补 bug 分支)是从 Master 分支上面分出来的。例如，1.2 版本是当前生产环境的版本并且有 bug。但是开发分支（develop）变化还不稳定。我们需要分出来一个修补
bug 分支（hotfix branch）来解决这种情况。

```
$ git checkout -b hotfix-1.2.1 master
Switched to a new branch` `"hotfix-1.2.1"
$ .``/bump-version``.sh 1.2.1
Files modified successfully, version bumped to 1.2.1.
$ git commit -a -m` `"Bumped version number to 1.2.1"
[hotfix-1.2.1 41e61bb] Bumped version number to 1.2.1
1 files changed, 1 insertions(+), 1 deletions(-)
```

分支关闭的时侯不要忘了更新版本号(bump the version)

然后，修复 bug，一次提交或者多次分开提交。

```
$ git commit -m` `"Fixed severe production problem"
[hotfix-1.2.1 abbe5d6] Fixed severe production problem
5 files changed, 32 insertions(+), 17 deletions(-)
```

### 完成一个 hotfix 分支

完成一个 bugfix 之后，需要把 butfix 合并到 master 和 develop 分支去，这样就可以保证修复的这个 bug 也包含到下一个发行版中。这一点和完成 release 分支很相似。

首先，更新 master 并对 release 打上 tag：

```
$ git checkout master
Switched to branch 'master'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
$ git tag -a 1.2.1
```

编辑：你可能也会想使用 -sor-u 参数来对你的 tag 进行加密

下一步，把 bugfix 添加到 develop 分支中：

```
$ git checkout develop
Switched to branch 'develop'
$ git merge --no-ff hotfix-1.2.1
Merge made by recursive.
(Summary of changes)
```

规则的一个例外是： **如果一个 release 分支已经存在，那么应该把 hotfix 合并到这个 release 分支，而不是合并到 develop 分支。**当 release 分支完成后， 将 bugfix 分支合并回
release 分支也会使得 bugfix 被合并到 develop 分支。（如果在 develop 分支的工作急需这个 bugfix，等不到 release 分支的完成，那你也可以把 bugfix 合并到 develop 分支）

最后，删除临时分支：

```
$ git branch -d hotfix-1.2.1
Deleted branch hotfix-1.2.1 (was abbe5d6).
```

## 摘要

尽管这个分支模型没有任何震撼的新东西, 文章开头的图表在我们的项目中表现出惊人的实用性。它形成了一个优雅的思维模型，易于领悟并使团队成员发展出对分支和发布过程的共同理解。

这里提供一份高质量 PDF 格式图表。去吧，把它挂载墙上以便能随时快速参考。

