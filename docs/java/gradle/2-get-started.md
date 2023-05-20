# 快速开始

## 开始

### 开始之前

需要首先阅读 [Gradle 介绍](./1-intro.md#什么是-gradle)

### 安装

如果运行已经存在一个构建, 使用 gradle wrapper 则不必安装 gradle, 直接运行根目录下的 gradlew 文件即可, 只需要让你的系统满足 gradle 的基本要求即可

Android Studio 附带了 Gradle 的安装，所以在这种情况下，你不需要单独安装 Gradle。

为了创建新的构建或向现有构建添加 Wrapper，您需要根据这些说明安装 Gradle。注意，除了该页面上描述的那些方法之外，可能还有其他方法来安装 Gradle，因为几乎不可能跟踪所有的包管理器。

### 尝试 Gradle

运行已经存在项目是使用 Gradle 了解它的一个很好的方法，所以一旦您安装了Gradle，请尝试以下入门实践教程之一：

* [Building Android apps](https://docs.gradle.org/current/samples/sample_building_android_apps.html)
* [Building Java applications](https://docs.gradle.org/current/samples/sample_building_java_applications.html)
* [Building Java libraries](https://docs.gradle.org/current/samples/sample_building_java_libraries.html)
* [Building Groovy applications](https://docs.gradle.org/current/samples/sample_building_groovy_applications.html)
* [Building Groovy libraries](https://docs.gradle.org/current/samples/sample_building_groovy_libraries.html)
* [Building Scala applications](https://docs.gradle.org/current/samples/sample_building_scala_applications.html)
* [Building Scala libraries](https://docs.gradle.org/current/samples/sample_building_scala_libraries.html)
* [Building Kotlin JVM applications](https://docs.gradle.org/current/samples/sample_building_kotlin_applications.html)
* [Building Kotlin JVM libraries](https://docs.gradle.org/current/samples/sample_building_kotlin_libraries.html)
* [Building C++ applications](https://docs.gradle.org/current/samples/sample_building_cpp_applications.html)
* [Building C++ libraries](https://docs.gradle.org/current/samples/sample_building_cpp_libraries.html)
* [Building Swift applications](https://docs.gradle.org/current/samples/sample_building_swift_applications.html)
* [Building Swift libraries](https://docs.gradle.org/current/samples/sample_building_swift_libraries.html)
* [Creating build scans](https://scans.gradle.com/)

### 命令行

有些人是命令行的铁杆用户，而另一些人则喜欢永远不离开他们的IDE。许多人乐于同时使用两者，Gradle努力做到不歧视。Gradle 受到几个主要IDE的支持，可以从命令行完成的所有操作都可以通过工具API用于IDE。

Android Studio 和 IntelliJ Idea 的用户在编辑它们时，应该考虑使用 Kotlin DSL 构建脚本，以获得卓越的IDE支持

### 执行 gradle 构建

如果您遵循上面链接的任何教程，您将执行 Gradle 构建。但是，如果你得到的Gradle版本没有任何说明，你会怎么做呢？

以下是一些可以遵循的有用步骤：

1.确定项目是否有 Gradle Wrapper，如果有就使用, --主流的 IDE 默认在包装器可用时使用它

2.发现项目结构

使用 IDE 导入构建或从命令行运行 `gradle projects`。如果只列出了根项目则是单项目构建。否则是一个多项目构建

3.找出可以运行的任务

如果已将构建导入到 IDE 中，则应该可以访问显示所有可用任务的视图。从命令行运行 `gradle tasks`

4.通过 `gradle help --task <taskname>` 了解有关任务的更多信息

`help` 可以显示有关任务额外信息，包括哪些项目包含该信息, 任务以及该任务支持哪些选项

5.运行你感兴趣的任务

许多基于约定的构建与Gradle的生命周期任务集成在一起，所以当没有更具体的东西想要使用构建时使用它们。例如，大多数生成都有 `clean`, `check`, `assemble` 和 `build` 任务

在命令行中，只需运行 `gradle <taskname>` 即可执行特定任务。您可以在相应的用户手册章节中了解有关命令行执行的更多信息。如果您使用的是IDE，请查看其文档以了解如何运行任务。

Gradle构建通常遵循项目结构和任务的标准约定，所以如果您熟悉对于相同类型的其他构建: 例如Java、Android或 原生构建 -- 构建的文件和目录结构以及许多任务和项目属性都应该很相似

对于更专业的构建或具有重要定制的构建，理想情况下，您应该能够访问有关如何运行构建以及可以配置哪些构建属性的文档

### 创建 Gradle 构建

学习创建和维护 Gradle 构建 是一个过程，而且需要一些时间。我们建议您从适合您的项目的核心插件及其约定开始，然后随着您对该工具了解的更多，逐步合并定制。
以下是你在 Gradle之旅 的一些有用的步骤：

1.尝试一两个基本教程，看看Gradle版本是什么样子，特别是那些与您所使用的项目类型(Java、Native、Android等)相匹配的版本。

2.确保你已经读过什么是Gradle？

3.了解Gradle构建的基本元素：项目、任务和文件API。

4.如果您正在为 JVM 构建软件，请务必阅读在构建 Java 和 JVM项目 以及在 Java 和 JVM项目 中测试中有关这些类型项目的详细信息

5.熟悉Gradle附带的核心插件，因为它们提供了许多开箱即用的有用功能

6.了解如何编写可维护的构建脚本并最好地组织您的Gradle项目

用户手册包含许多其他有用的信息，你可以在其中找到示例和演示样例页面上的各种Gradle功能

### 将第三方工具与Gradle集成

Gradle的灵活性意味着它可以很容易地与其他工具配合使用，比如我们的 Gradle 和第三方工具页面上列出的工具。
有两种主要的集成模式：

- 工具驱动Gradle, 使用它来提取关于构建的信息并通过工具运行应用编程接口
- Gradle 通过第三方工具的 API 为工具调用或生成信息, 这通常通过插件和自定义任务类型来完成

具有现有的基于 Java 的 API 的工具通常很容易集成。你可以在 Gradle的插件门户上找到很多这样的集成

## 安装

### 必要条件

- 需要 java
- java version 在 8 以上
- 设定 `JAVA_HOME` 环境变量

### 安装

这里推荐使用 [SDKMAN!](../../development/tools/sdkman.md#安装) 安装

```shell
$ sdk install gradle
```

### 验证安装

```
$ gradle -v

------------------------------------------------------------
Gradle 8.1.1
------------------------------------------------------------

Build time:   2023-04-21 12:31:26 UTC
Revision:     1cf537a851c635c364a4214885f8b9798051175b

Kotlin:       1.8.10
Groovy:       3.0.15
Ant:          Apache Ant(TM) version 1.10.11 compiled on July 10 2021
JVM:          17.0.7 (Eclipse Adoptium 17.0.7+7)
OS:           Mac OS X 13.3.1 x86_64

```

### 尝试搭建

**下载示例代码**

https://docs.gradle.org/current/samples/zips/sample_building_android_apps-groovy-dsl.zip

**使用 Android Studio 导入**

`File > New > Import Project` , 打开之后下载并编制索引

**运行**

![](https://file.wulicode.com/doc/20230519/1684511415892.png)

**源码地址**
> 之前的内容运行时候有部分需调整, 以下是调整之后的
> 源码地址 : https://github.com/imvkmark/gradle-get-started-android-app

## 故障排除

## 兼容性