---
description: '在 PhpStorm 中配置 PHPUnit 的 Test Suite，需访问 Test Frameworks 选项，设置运行配置及快捷键，从而高效运行测试。'
lastUpdated: '2026-07-02 19:24:42'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ 在 PhpStorm 中配置 phpunit 的 Test Suite '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在 PhpStorm 中配置 PHPUnit 的 Test Suite，需访问 Test Frameworks 选项，设置运行配置及快捷键，从而高效运行测试。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/primer/phpstorm-phpunit-with-testsuit.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/3ec894c3b728f5392ae2ea485bafea68.png'
---
# ⚠️ 在 PhpStorm 中配置 phpunit 的 Test Suite

::: warning ⚠️
<p>此文章内容重复, 已经合并至 <a href="https://www.wulicode.com/back-end/php/testing/phpstorm-setting-for-phpunit.html">PHPUnit 简介以及在 PhpStorm 中使用 49a12f67e44541dd9937337586049073</a></p>
:::

原文地址 : [https://www.liamnorman.com/phpstorm-testsuites/](https://www.liamnorman.com/phpstorm-testsuites/)

我是测试驱动开发(TDD)的忠实粉丝，我相信测试可以验证代码库的可靠性和稳定性, 我相信使用 TDD 可以创建稳定的系统并有效地测试软件，确保我的设计符合我想要解决的问题。我倾向于经常进行测试，因为这样就会非常清楚如果系统中的一个变化破坏了什么东西，我马上就知道那是添加的东西并定位到问题所在。Robert “Uncle Bob” Martin 以一种非常优雅的方式总结了这个测试方法

> 每小时都会写几个测试。每天都有写几十次测试。每个月都有几百次测试。在一年的时间里，你将编写数以千计的测试。你可以保留所有这些测试，并随时运行它们! 你什么时候运行它们呢? 任何时间! 任何时候你做了任何改变都可以运行!

如果你采用这种方法，那么必须经常运行你的测试套件 Test Suites，并且以快速和有效的方式运行，作为你工作流程的一部分，从长远来看将节省你的开发时间我在我的大多数时间开发中使用 PHPStorm, PHPStorm 有一个很棒的单元测试功能，你可以使用它从你的 IDE 运行测试。我们将介绍如何在项目设置并使用 PHPUnit.

## 设置 PHPStorm Test Suit

在我们的例子中，我们会使用 PHPUnit，这是一个我经常使用的测试框架，目前的测试套件特性支持 PHPSpec, Codeception 和 Behat (默认)

### 访问 Test Frameworks 选项

开始前, 打开设置菜单, 并且选择 `Languages & Frameworks > PHP > Test Frameworks` , 或者直接搜索 phpunit

![](https://file.wulicode.com/feishu-images/3ec894c3b728f5392ae2ea485bafea68.png)

在这里点击添加按钮 并且选择本地 phpunit

### PhpUnit Test Suite 配置

在我的项目中使用 composer 来管理所有依赖

- 可以选择使用 `composer` , 选择 phpunit 的可执行文件路径, 在现在这种加载模式下, phpunit 在 vendor 文件夹中
- 可以选择 `phpunit.phar` 的单独文件(可以多项目公用一个文件)

我这里选择使用 `phar` 文件

![](https://file.wulicode.com/feishu-images/3ec894c3b728f5392ae2ea485bafea68.png)

你可以选择设置一个默认配置文件，在本例中我设置为 phpunit.xml ，因为 PHPUnit 就是在这个文件中来定义测试套件(Test Suites)的, 如果你的项目中存在启动文件, 则这里可以设置这个文件,否则留空

就是这样，简短有效。您现在已经在 PHPStorm 中将 PHPUnit 配置为一个测试框架了.

## 设置运行配置快捷键

运行测试的一种非常有效的方法是使用快捷键, 进入配置中

![](https://file.wulicode.com/feishu-images/8de7f3379dd4d223160085da94f5f0c9.png)

这里有可以设置两个快捷键

**`Run Context Configuration`**

设置为 `ALT + T` : 运行完整的单元测试 \*\*\*\*

**`Run with Coverage Context Configuration`**

设置为 `ALT + C` : 运行具有覆盖率的单元测试

![](https://file.wulicode.com/feishu-images/b34c5c376cb3f92f4d1400f1b52d09a2.png)

## 运行测试

这里就可以使用快捷键来运行单元测试了.

## 配置 TestSuites

如果要执行指定的分组的单元测试,我们可以做如下设定

```XML
<testsuite name="clear">
    <directory>./modules/finance/tests/Clear</directory>
    <directory>./modules/user/tests/Clear</directory>
</testsuite>
```

在配置单元测试的选项中, 我们可以使用 `Edit Configurations` 面板

![](https://file.wulicode.com/feishu-images/3b774fe627c5ba3c03b7b920ce0741b6.png)

这样我们便可以运行整套的单元测试了

::: info 📆

更新记录
2026年04月13日
- 文档合并 / 此文章重复
2023年04月19日
- 更新配图

:::