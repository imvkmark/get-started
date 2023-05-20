# 1. 概览

本文档的目标是为编写测试的程序员、扩展作者、引擎作者以及构建工具和IDE供应商提供全面的参考文档
本文档也可下载为[PDF格式](https://junit.org/junit5/docs/current/user-guide/junit-user-guide-5.9.3.pdf)

## 1.1 什么是 JUnit5

与以前版本的JUnit5不同，JUnit5由来自三个不同子项目的几个不同模块组成

**JUnit 5** = **_JUnit Platform_** + **_JUnit Jupiter_** + **_JUnit Vintage_**

**JUnit Platform** 是在 JVM
上启动测试框架的基础。它还定义了用于开发在平台上运行的测试框架的 [TestEngine](https://junit.org/junit5/docs/current/api/org.junit.platform.engine/org/junit/platform/engine/TestEngine.html)
API。此外，该平台提供了一个 [Console Launcher(命令行启动器)](https://junit.org/junit5/docs/current/user-guide/#running-tests-console-launcher)
以从命令行启动平台，并提供了 [JUnit Platform Suite Engine](https://junit.org/junit5/docs/current/user-guide/#junit-platform-suite-engine)
以使用平台上的一个或多个测试引擎运行自定义测试套件。在流行的IDE(参见IntelliJ IDEA、Eclipse、NetBeans和Visual Studio Code)
和构建工具(参见Gradle、Maven和Ant)中也存在对JUnit平台的一流支持

**JUnit Jupiter** 是用于在 JUnit5 中编写测试和扩展的编程模型和扩展模型的组合。Jupiter 子项目提供了一个 `TestEngine`
，用于在平台上运行基于 Jupiter 的测试

**JUnit Vintage** 提供了一个 `TestEngine`，用于在平台上运行基于 JUnit3 和 JUnit4 的测试。它要求类路径或模块路径上存在
JUnit4.12 或更高版本

## 1.2 支持的 Java 版本

JUnit5 在运行时需要Java 8(或更高版本)。但是，你仍然可以测试使用早期版本的JDK编译的代码

## 1.3 帮助

在 [Stack Overflow](https://stackoverflow.com/questions/tagged/junit5) 上询问 JUnit5
相关问题，或在 [Gitter](https://gitter.im/junit-team/junit5) 上与社区聊天

## 1.4 开始

### 1.4.1 下载 Junit 构件

要找出哪些构件可供下载并包含在项目中，请参阅 [依赖项元数据](https://junit.org/junit5/docs/current/user-guide/#dependency-metadata)
。要为你的构件设置依赖项管理，请参阅 [构建支持](https://junit.org/junit5/docs/current/user-guide/#running-tests-build)
和 [示例项目](https://junit.org/junit5/docs/current/user-guide/#overview-getting-started-example-projects)

### 1.4.2 JUnit5 特点

要了解 JUnit5 中提供了哪些功能以及如何使用这些功能，请阅读本用户指南中按主题组织的相应部分

- 使用 JUnit Jupiter 编写测试
- 从 JUnit4 迁移到 JUnit Jupiter
- 运行测试
- JUnit Jupiter 的扩展模型
- 高级主题
    - JUnit Platform 启动器 API
    - JUnit Platform 测试包

### 1.4.3 示例项目

要查看项目的完整运行示例可以复制和体验[junit5-samples](https://github.com/junit-team/junit5-samples)
,这个库是一个很好的入门示例。它托管了一系列基于 JUnit Jupiter、JUnit Vintage
和其他测试框架的样例项目。你将找到合适的构建脚本(
例如，build.gradle、pom.xml等)。在示例项目中。下面的链接显示了可以选择的一些组合

* Gradle 和 Java
  查看 [junit5-jupiter-starter-gradle](https://github.com/junit-team/junit5-samples/tree/r5.9.3/junit5-jupiter-starter-gradle)
  项目.
* Gradle 和 Kotlin
  查看 [junit5-jupiter-starter-gradle-kotlin](https://github.com/junit-team/junit5-samples/tree/r5.9.3/junit5-jupiter-starter-gradle-kotlin)
  项目.
* Gradle 和 Groovy
  查看 [junit5-jupiter-starter-gradle-groovy](https://github.com/junit-team/junit5-samples/tree/r5.9.3/junit5-jupiter-starter-gradle-groovy)
  项目.
* Maven
  查看 [junit5-jupiter-starter-maven](https://github.com/junit-team/junit5-samples/tree/r5.9.3/junit5-jupiter-starter-maven)
  项目.
* Ant
  查看 [junit5-jupiter-starter-ant](https://github.com/junit-team/junit5-samples/tree/r5.9.3/junit5-jupiter-starter-ant)
  项目.

## [ps]本项目说明

本项目测试示例来自于 [gradle + java](https://github.com/junit-team/junit5-samples/blob/main/junit5-jupiter-starter-gradle/build.gradle)

本项目基于 java 17

![](https://file.wulicode.com/doc/20230520/1684546786356.png)

命令行运行结果

```
$ gradle :test

> Task :test

GradleExampleTest > testAdd() PASSED

GradleExampleTest > testPrint() PASSED

BUILD SUCCESSFUL in 1s
2 actionable tasks: 2 executed
```
