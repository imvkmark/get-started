---
description: 'Maven POM快速预览涵盖项目标识、打包方式、依赖、继承与多模块聚合，以及属性、构建设置（BaseBuild与Build元素）、报告、项目信息（许可证、组织、开发者等）、环境配置（Issue管理、CI、SCM、仓库、插件仓库）、分发管理与状态资料等核心元素。'
lastUpdated: '2026-06-18 08:26:53'
head:
  - - meta
    - name: 'og:title'
      content: 'Pom 参考'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Maven POM快速预览涵盖项目标识、打包方式、依赖、继承与多模块聚合，以及属性、构建设置（BaseBuild与Build元素）、报告、项目信息（许可证、组织、开发者等）、环境配置（Issue管理、CI、SCM、仓库、插件仓库）、分发管理与状态资料等核心元素。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/refs/pom.html'
---
<title>Pom 参考</title>

::: info 🔗
原文地址 : [Maven – POM Reference](https://maven.apache.org/pom.html#Final)
:::

# 介绍

[The POM 4.0.0 XSD](https://maven.apache.org/xsd/maven-4.0.0.xsd) 和 [描述引用文档](https://maven.apache.org/ref/current/maven-model/maven.html)

## 什么是 pom

POM 标准是 Project Object Model, 这个 xml 保存在名为 `pom. xml` 的文件中, 保存了 Maven 项目的配置信息。在 Maven 社区中，提到 **项目** 不仅指代码文件的集合，而是更具哲学意义的概念。一个项目包括配置文件、开发人员及其角色、缺陷跟踪系统、组织结构和许可证、项目的URL、依赖关系等。这些元素共同赋予代码生命。实际上，在 Maven 中，一个项目甚至可以不包含任何代码，只需一个 pom.xml 文件即可。这使得项目成为与该项目相关的一切事物的 **一站式商店**

## 快速预览

这是一个直接位于 POM 的项目元素下的元素列表。注意，modelVersion 包含 4.0.0。这是目前唯一支持的 POM 版本，并且始终是必需的

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
 
  <!-- The Basics -->
  <groupId>...</groupId>
  <artifactId>...</artifactId>
  <version>...</version>
  <packaging>...</packaging>
  <dependencies>...</dependencies>
  <parent>...</parent>
  <dependencyManagement>...</dependencyManagement>
  <modules>...</modules>
  <properties>...</properties>
 
  <!-- Build Settings -->
  <build>...</build>
  <reporting>...</reporting>
 
  <!-- More Project Information -->
  <name>...</name>
  <description>...</description>
  <url>...</url>
  <inceptionYear>...</inceptionYear>
  <licenses>...</licenses>
  <organization>...</organization>
  <developers>...</developers>
  <contributors>...</contributors>
 
  <!-- Environment Settings -->
  <issueManagement>...</issueManagement>
  <ciManagement>...</ciManagement>
  <mailingLists>...</mailingLists>
  <scm>...</scm>
  <prerequisites>...</prerequisites>
  <repositories>...</repositories>
  <pluginRepositories>...</pluginRepositories>
  <distributionManagement>...</distributionManagement>
  <profiles>...</profiles>
</project>
```

# 基础

POM 包含了一个项目的所有必要信息，以及在构建过程中使用的插件配置。它是"谁"、"什么"和"在哪里"的声明性体现，而构建生命周期则是"何时"和"如何"。这并不是说 POM 不能影响生命周期的流程——它是可以的。例如，通过配置 `maven-antrun-plugin`，可以将 Apache Ant 任务嵌入到 POM 中。然而，最终它还是一种声明。与 `build.xml` 文件明确告诉 Ant 在运行时该做什么（过程式）不同，POM 只是声明其配置（声明式）。如果某些外部因素导致生命周期跳过了 Ant 插件的执行，这并不会影响其他被执行的插件发挥其作用。这与 build.xml 文件不同，后者的任务几乎总是依赖于之前执行的代码行

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
 
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>my-project</artifactId>
  <version>1.0</version>
</project>
```

## Maven 标识

上述 POM 是 Maven 允许的最简化配置。`groupId:artifactId:version` 是所有必需字段（虽然，如果从父级继承，则 groupId 和 version 不需要显式定义——关于继承的内容稍后再谈）。这三个字段的作用类似于地址和时间戳，标记了在存储库中的特定位置，像是 Maven 项目的标识系统：

- **groupId**：在一个组织或项目中通常是唯一的。例如，所有核心 Maven 工件都（或者说应该）位于 groupId 为 `org.apache.maven` 的下方。Group ID 不一定使用点号表示法，例如 JUnit 项目。请注意，使用点号表示的 groupId 并不需要与项目包含的包结构相对应，但遵循这一做法是一个好的习惯。当存储在存储库中时，group 结构类似于操作系统中的 Java 打包结构。点号会被操作系统特定的目录分隔符（例如，Unix 中的 `/`）替换，从而形成从基础存储库的相对目录结构。在给出的示例中，`org.codehaus.mojo` 组位于目录 `$M2_REPO/org/codehaus/mojo` 中。
- **artifactId**：artifactId 通常是项目的名称。尽管 groupId 重要，但在讨论中，该组的人们很少提到 groupId（它们通常都是相同的 ID，例如 [MojoHaus](http://www.mojohaus.org/) 项目的 groupId: `org.codehaus.mojo`）。它与 groupId 一起创建了一个唯一的键，将该项目与世界上其他项目区分开来（至少应该是这样 :)）。结合 groupId，artifactId 完全定义了该工件在存储库中的位置。在上述项目中，`my-project` 位于 `$M2_REPO/org/codehaus/mojo/my-project` 中。
- **version**：这是命名谜题的最后一部分。`groupId:artifactId` 标识一个单独的项目，但不能指明我们所谈论的是该项目的哪个版本。我们想要的是 2018 年的 `junit:junit`（版本 4.12），还是 2007 年的（版本 3.8.2）？简而言之：代码会变更，这些变更应进行版本控制，而这个元素保持版本的一致性。它还用于在工件的存储库中区分不同的版本。`my-project` 的版本 1.0 文件位于目录结构 `$M2_REPO/org/codehaus/mojo/my-project/1.0` 中。

上述三个元素指向项目的特定版本，让 Maven 知道我们正在处理谁，以及我们希望在其软件生命周期的哪个阶段使用它们。

## 打包方式

现在我们有了 `groupId:artifactId:version` 的地址结构，还有一个标准标签可以让我们更加完整地理解项目：那就是项目的打包方式。在我们的例子中，上面定义的 `org.codehaus.mojo:my-project:1.0` 的示例 POM 将被打包为 `jar`。我们可以通过声明不同的打包方式将其变为 `war`

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <packaging>war</packaging>
  ...
</project>
```

当未声明打包方式时，Maven 会假定打包方式为默认的 `jar`。有效的类型是组件角色 `org.apache.maven.lifecycle.mapping.LifecycleMapping` 的 Plexus 角色提示（可以在 Plexus 中了解更多关于角色和角色提示的解释）。当前的核心打包值包括：`pom`、`jar`、`maven-plugin`、`ejb`、`war`、`ear`、`rar`。这些值定义了针对特定包结构在每个对应的构建生命周期阶段执行的默认目标列表。详情请参阅 [Plugin Bindings for default Lifecycle Reference](https://maven.apache.org/ref/current/maven-core/default-bindings.html)

## POM 关系

Maven 的一个强大之处在于它处理项目关系的方式：包括依赖（及传递性依赖）、继承和聚合（多模块项目）。

依赖管理在长期以来一直是个复杂的难题，除非是最简单的项目。随着依赖树变得庞大而复杂，"*Jarmageddon*"（Jar 大灾难）很快就会发生。接下来是 "*Jar Hell*"（Jar 地狱），其中一个系统上的依赖版本与开发时使用的版本不一致，可能是由于使用了错误的版本，或者类似名称的 jar 之间存在版本冲突

Maven 通过一个通用的本地仓库解决了这两个问题，该仓库可以正确地链接项目及其所有版本

### **依赖**

POM 的核心是它的依赖列表。大多数项目都依赖于其他项目才能正确构建和运行。如果 Maven 为你做的事情仅仅是管理这个列表，你已经获得了很大的帮助。Maven 在编译时以及其他需要依赖的目标中，会自动下载并链接这些依赖。作为额外的好处，Maven 还会引入这些依赖的依赖（传递性依赖），这样你的列表可以只关注项目所需的依赖

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <type>jar</type>
      <scope>test</scope>
      <optional>true</optional>
    </dependency>
    ...
  </dependencies>
  ...
</project>
```

- **groupId**, **artifactId**, **version**

你会经常看到这些元素。这三者组合用于计算某个项目在某个时间点的 Maven 标识，标记它为该项目的依赖。计算的目的是选择一个与所有依赖声明相匹配的版本（由于传递性依赖，同一个工件可能有多个依赖声明）。这些值应为：

- **groupId, artifactId**：直接对应依赖的标识，
- **version**：一个依赖版本的需求规范，用于计算依赖的实际版本

由于依赖是通过 Maven 标识描述的，你可能会想："这意味着我的项目只能依赖于 Maven 工件！"答案是，"当然了，但这是件好事。" 这迫使你只依赖于 Maven 可以管理的依赖。

不幸的是，有时某些项目无法从中央 Maven 仓库下载。例如，一个项目可能依赖于一个有闭源许可证的 jar 文件，阻止它出现在中央仓库中。对于这种情况，有三种处理方法：

1. **使用 install 插件本地安装依赖**。这是最简单且推荐的方法。例如：

```Bash
mvn install:install-file -Dfile=non-maven-proj.jar -DgroupId=some.group -DartifactId=non-maven-proj -Dversion=1 -Dpackaging=jar
```

注意，地址依然是必须的，只不过这次是通过命令行输入，install 插件会根据给定的地址为你创建一个 POM。

1. **创建你自己的仓库并将其部署到那里**。这是公司内部网络中的一种常用方法，确保所有人能够同步。Maven 有一个目标叫做 `deploy:deploy-file`，与 `install:install-file` 目标类似（请阅读插件的目标页面获取更多信息）。
2. **将依赖范围设置为 system 并定义 systemPath**。这种方法不推荐使用，但它引出了我们对以下元素的解释：

- **classifier**

分类器用于区分由相同 POM 构建但内容不同的工件。它是一个可选的、任意的字符串——如果存在，会附加在版本号之后的工件名称上。

举个例子，考虑一个项目同时提供面向 Java 11 的工件和仍然支持 Java 1.8 的工件。第一个工件可以使用分类器 `jdk11`，第二个工件使用 `jdk8`，这样用户可以选择使用哪个版本

另一个常见的分类器使用场景是将次要工件附加到项目的主要工件上。如果你浏览 Maven 中央仓库，你会注意到分类器 `sources` 和 `javadoc` 被用来部署项目的源代码和 API 文档，作为打包类文件的附加内容

- **type**（类型）

对应于所选依赖的类型，默认值为 jar。虽然它通常代表依赖文件名的扩展名，但情况并不总是如此：类型可以映射到不同的扩展名和分类器。类型通常与所使用的打包方式对应，但这也并不总是如此。一些示例包括 `jar`、`ejb-client` 和 `test-jar`：请参阅 [默认工件处理器](https://maven.apache.org/ref/current/maven-core/artifact-handlers.html) 列表了解更多信息。插件可以通过将 `extensions` 设置为 true 来定义新类型，因此这不是一个完整的列表。

**scope**（范围）：

该元素涉及任务的类路径（如编译、运行时、测试等）以及如何限制依赖的传递性。可用的五种范围是：

- **compile**：这是默认范围，如果没有指定，将使用此范围。编译时依赖在所有类路径中可用，且这些依赖会传播到依赖它的项目中。
- **provided**：类似于 compile，但表示你期望 JDK 或容器在运行时提供该依赖。它仅在编译和测试类路径中可用，且不具有传递性。
- **runtime**：表示该依赖在编译时不需要，但在运行时需要。它在运行时和测试类路径中可用，但不在编译类路径中。
- **test**：表示该依赖在应用程序的正常使用中不需要，仅在测试编译和执行阶段可用。它不具有传递性。
- **system**：与 provided 类似，但你必须显式提供包含依赖的 JAR 文件。该工件始终可用，且不会从仓库中查找。
- **systemPath (系统路径)**：

仅当依赖 `scope` 为 `system` 时使用，否则如果设置了此元素，构建将失败。路径必须是绝对路径，因此推荐使用属性来指定与机器相关的路径（更多关于 `properties` 的内容在后面），如 `${java.home}/lib`。由于假设系统范围的依赖是预先安装的，Maven 不会检查项目的仓库，而是检查文件是否存在。如果不存在，Maven 将构建失败并建议手动下载并安装。

::: warning ⚠️
**用 runtime 的典型场景**：代码只依赖接口（SPI），实现由运行时提供——比如 JDBC 驱动（代码里只用 `java.sql.*` 接口，MySQL Driver 在运行时才加载）、SLF4J 的具体实现（logback-classic）。你的源码里没有直接 import 它的类，因此编译时不需要。
**用 compile 的典型场景**：你的源码里直接 import 了这个依赖的类或注解——Spring、MyBatis、Lombok、commons-lang3 等。去掉它编译就会报错。
:::

- **optional（可选）**：

当项目本身作为其他项目的依赖时，用于标记依赖为可选的。例如，假设项目 `A` 依赖于项目 `B` 来编译一部分代码，但该部分代码在运行时可能不会使用，那么我们可能不需要项目 `B`。在这种情况下，如果项目 `X` 将项目 `A` 添加为依赖，Maven 就不需要安装项目 `B`。符号表示中，`=>` 表示强制依赖，`-->` 表示可选依赖。尽管在构建 `A` 时 `A=>B`，但在构建 `X` 时则为 `X=>A-->B`。

简而言之，`optional` 告诉其他项目，在使用此项目时，不需要该依赖来保证正确工作

**依赖管理**

依赖项可以在 `dependencyManagement` 部分进行管理，用于影响未完全限定的依赖项的解析，或者强制使用特定的传递依赖版本。有关更多信息，请参阅 [依赖机制简介](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)

**依赖版本需求规范**

依赖的 `version` 元素定义了版本需求，用于计算依赖版本。软需求可以被依赖树中其他地方找到的同一工件的不同版本替代。硬需求则要求特定的版本或版本范围，并覆盖软需求。如果没有任何依赖版本满足该工件的所有硬需求，构建将失败。

版本需求具有以下语法：

- `1.0`：对 1.0 的软需求。如果依赖树中没有出现其他版本，则使用 1.0。
- `[1.0]`：对 1.0 的硬需求。使用 1.0，且仅使用 1.0。
- `(,1.0]`：对任何版本 <= 1.0 的硬需求。
- `[1.2,1.3]`：对 1.2 和 1.3 之间的任何版本（包括边界值）的硬需求。
- `[1.0,2.0)`：1.0 <= x < 2.0；对 1.0（包含）和 2.0（不含）之间任何版本的硬需求。
- `[1.5,)`：对 >= 1.5 的任何版本的硬需求。
- `(,1.0],[1.2,)`：对 <= 1.0 或 >= 1.2 的任何版本的硬需求，但不包括 1.1。多个需求通过逗号分隔。
- `(,1.1),(1.1,`)：对任何版本的硬需求，但不包括 1.1；例如，1.1 可能有一个严重漏洞。

Maven 选择满足所有依赖硬需求的每个项目的最高版本。如果没有版本满足所有硬需求，构建将失败。

**版本顺序规范**

如果版本字符串是语法正确的 [Semantic Versioning 1.0.0](https://semver.org/spec/v1.0.0.html) 版本号，那么几乎在所有情况下，版本比较都会遵循该规范中的优先级规则。这些版本通常是常见的字母数字 ASCII 字符串，如 2.15.2-alpha。更准确地说，这在两个要比较的版本号都符合语义化版本控制规范中的 BNF 语法时是正确的。然而，Maven 不考虑该规范中暗示的任何语义

::: warning ⚠️
**重要提示**：这仅适用于 Semantic Versioning 1.0.0。Maven 的版本顺序算法不兼容 Semantic Versioning 2.0.0。特别是，Maven 不会对加号作特殊处理，也不考虑构建标识符。
:::

当版本字符串不遵循语义化版本控制时，Maven 需要使用一套更复杂的规则。Maven 会在点（`.`）、连字符（`-`）、下划线（`_`）和数字与字母之间的转换处对 Maven 标识进行拆分。拆分后的分隔符会被记录并影响顺序。数字与字母之间的转换等同于连字符。空的标记会替换为"`0`"。这会生成一系列带有"`.`"或"`-`"前缀的版本号（数字标记）和版本限定符（非数字标记）。版本通常以数字开头。

**拆分和替换示例:**

`1-1.foo-bar1baz-.1` -> `1-1.foo-bar-1-baz-0.1`

然后，从版本号的末尾开始，去除尾随的 "null" 值（`0`、`""`、`final`、`ga`）。这个过程会从末尾开始逐个连字符重复。

**去除示例**：

- `1.0.0` -> `1`
- `1.ga` -> `1`
- `1.final` -> `1`
- `1.0` -> `1`
- `1.` -> `1`
- `1-` -> `1`
- `1.0.0-foo.0.0` -> `1-foo`
- `1.0.0-0.0.0` -> `1`

版本顺序是这些前缀标记的 `lexicographical order(字典顺序)`，较短的版本会填充足够的带有匹配前缀的"null"值，使其长度与较长的版本相同。填充的"null"值取决于另一个版本的前缀：如果是 `.` 则为 `0`，如果是 `-` 则为空字符串。前缀标记的顺序是：

- 如果前缀相同，则比较标记：
- 数字标记按自然顺序比较。
- 非数字标记（"限定符"）按字母顺序比较，除了以下标记，它们在此顺序中优先：
- "`alpha`" < "`beta`" < "`milestone`" < "`rc`" = "`cr`" < "`snapshot`" < `""` = "`final`" = "`ga`" < "`sp`"

  - "`alpha`"、"`beta`" 和 "`milestone`" 限定符可以分别缩写为 "`a`"、"`b`" 和 "`m`"，当它们后面直接跟随数字时。
- 否则，`.qualifier` = `-qualifier` < `-number` < `.number`
- `alpha` = `a` *<<<beta*>> = `b` *<<<milestone*>> = `m` *<<<rc*>> = `cr` *<<<snapshot*>> *'<<<*>>' = `final` = `ga` = `release` < `sp`

::: info ℹ️
PS: 在 Maven 的版本号中，SP 通常表示 **Service Pack**，即服务包。它用来表示对软件的一个维护更新，通常用于修复错误、改进安全性或提供性能优化，而不会添加新的功能。
然而，Maven 官方建议不要使用 SP 限定符。相反，推荐通过增加补丁版本号来标记这些更新。例如，如果原来的版本是 1.0.0，而你想发布一个修复补丁，推荐将版本号改为 1.0.1，而不是使用 1.0.0-SP1。
:::

遵循语义化版本控制规则是推荐的做法，同时某些限定符不推荐使用：

- 推荐使用 `alpha`、`beta` 和 `milestone` 限定符，而不是 `ea` 和 `preview`。
- 推荐使用 `1.0.0-RC1` 而不是 `1.0.0.RC1`
- 不推荐使用 `CR` 限定符，建议使用 `RC`。
- 不推荐使用 `final`、`ga` 和 `release` 限定符，建议不使用任何限定符。
- 不推荐使用 `SP` 限定符，建议递增补丁版本。

**最终结果示例**：

- "`1`" < "`1.1`"（数字填充）
- "`1-snapshot`" < "`1`" < "`1-sp`"（限定符填充）
- "`1-foo2`" < "`1-foo10`"（正确地自动"切换"到数字顺序）
- "`1.foo`" = "`1-foo`" < "`1-1`" = "`1.1`"
- "`1.ga`" = "`1-ga`" = "`1-0`" = "`1.0`" = "`1`"（去除尾随的"null"值）
- "`1-sp`" > "`1-ga`"
- "`1-sp.1`" > "`1-ga.1`"
- "`1-sp-1`" > "`1-ga-1`"
- "`1-a1`" = "`1-alpha-1`"

注意：与某些设计文档中所述相反，快照版本在版本顺序中并没有与发布版本或其他限定符区别对待。

注意：由于 `2.0-rc1` < `2.0`，版本需求 `[1.0,2.0)` 排除了 `2.0`，但包含 `2.0-rc1`，这与大多数人的期望相反。此外，Gradle 的解释不同，导致同一个 POM 产生不同的依赖树。如果想将范围限制在 `1.*` 版本，推荐的版本需求是 `[1,1.999999)`

**版本测试**

Maven 分发包中包含一个用于检查版本顺序的工具。前面段落中的示例就是使用该工具生成的。如果有疑问，你可以自己运行它。你可以这样运行：

```Plaintext
java -jar ${MAVEN_HOME}/lib/maven-artifact-3.9.9.jar [versions...]
```

示例

```Plaintext
$ java -jar ./lib/maven-artifact-3.9.9.jar  1 2 1.1
Display parameters as parsed by Maven (in canonical form and as a list of tokens) and comparison result:
1. 1 -> 1; tokens: [1]
   1 < 2
2. 2 -> 2; tokens: [2]
   2 > 1.1
3. 1.1 -> 1.1; tokens: [1, 1]
```

**排除项**

有时限制依赖的传递性依赖是有用的。一些依赖可能错误地指定了范围，或者与项目中的其他依赖发生冲突。通过排除项，你可以告诉 Maven 即使某个工件是这个项目某个依赖的传递性依赖，也不要将其包含在类路径中。例如，`maven-embedder` 依赖于 `maven-core`。假设你想依赖 `maven-embedder`，但不希望将 `maven-core` 或其依赖项包含在类路径中，那么可以在声明对 `maven-embedder` 的依赖元素中，将 `maven-core` 作为 `exclusion` 添加进去:

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <dependencies>
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-embedder</artifactId>
      <version>3.9.9</version>
      <exclusions>
        <exclusion>
          <groupId>org.apache.maven</groupId>
          <artifactId>maven-core</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
    ...
  </dependencies>
  ...
</project>
```

这只会从该依赖中移除 maven-core 的路径。如果 maven-core 作为直接或传递性依赖出现在 POM 的其他地方，它仍然可以被添加到类路径中

通配符排除可以轻松地排除某个依赖的所有传递性依赖。在下面的例子中，你可能正在使用 maven-embedder，并希望手动管理所使用的依赖，因此你可以排除所有的传递性依赖：

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <dependencies>
    <dependency>
      <groupId>org.apache.maven</groupId>
      <artifactId>maven-embedder</artifactId>
      <version>3.8.6</version>
      <exclusions>
        <exclusion>
          <groupId>*</groupId>
          <artifactId>*</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
    ...
  </dependencies>
  ...
</project>
```

**排除项**：排除项包含一个或多个 `exclusion` 元素，每个 `exclusion` 元素包含 `groupId` 和 `artifactId`，用于指定要排除的依赖项。与 `optional` 不同的是，`optional` 表示依赖项可能被安装和使用，也可能不会；而 `exclusions` 是主动从依赖树中移除指定的工件。

### 继承

Maven 对构建管理带来的一个强大补充是项目继承的概念。虽然在像 Ant 这样的构建系统中可以模拟继承，但 Maven 在项目对象模型（POM）中明确引入了项目继承的机制

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
 
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>my-parent</artifactId>
  <version>2.0</version>
  <packaging>pom</packaging>
</project>
```

`packaging` 类型对于父项目和聚合（多模块）项目要求为 pom。这些类型定义了绑定到一组生命周期阶段的目标。例如，如果打包类型为 `jar`，那么在 `package` 阶段将执行 `jar:jar` 目标。现在我们可以向父 POM 添加一些值，这些值将被其子项目继承。父 POM 的大多数元素都可以被子项目继承，包括：

- groupId
- version
- description
- url
- inceptionYear
- organization
- licenses
- developers
- contributors
- mailingLists
- scm
- issueManagement
- ciManagement
- properties
- dependencyManagement
- dependencies
- repositories
- pluginRepositories
- build

  - 插件执行（具有匹配的 ids）
  - 插件配置
  - 等等
- reporting

**不继承的显著元素** 包括：

- artifactId
- name
- prerequisites
- profiles（但是来自父 POM 的活动 profiles 的效果会继承）

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
 
  <parent>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>my-parent</artifactId>
    <version>2.0</version>
    <relativePath>../my-parent</relativePath>
  </parent>
 
  <artifactId>my-project</artifactId>
</project>
```

请注意 `relativePath` 元素。它不是必需的，但可以作为一个标志，指示 Maven 先在给定的路径中搜索该项目的父项目，然后再搜索本地和远程仓库。

要查看继承的实际效果，可以查看 [ASF](https://github.com/apache/maven-apache-parent/blob/master/pom.xml) 或 [Maven](https://github.com/apache/maven-parent/blob/master/pom.xml) 的父 POM。

详细的继承规则在 [**Maven 模型构建器**](https://maven.apache.org/ref/3-LATEST/maven-model-builder/index.html#Inheritance_Assembly) 中有说明。默认情况下，所有的 URL 在继承时都会被转换。其他元素则原样继承。对于插件配置，你可以通过 `combine.children` 或 `combine.self` 属性来覆盖继承行为，详细说明请参见 [插件](https://maven.apache.org/pom.html#plugins)

**超级POM**

类似于面向对象编程中的对象继承，继承父 POM 的 POM 将继承父 POM 的某些值。此外，就像 Java 对象最终继承自 `java.lang.Object` 一样，所有项目对象模型（POM）都继承自一个基础的 **Super POM**。以下代码片段是 Maven 3.5.4 的 Super POM。

```XML
<project>
  <modelVersion>4.0.0</modelVersion>
 
  <repositories>
    <repository>
      <id>central</id>
      <name>Central Repository</name>
      <url>https://repo.maven.apache.org/maven2</url>
      <layout>default</layout>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </repository>
  </repositories>
 
  <pluginRepositories>
    <pluginRepository>
      <id>central</id>
      <name>Central Repository</name>
      <url>https://repo.maven.apache.org/maven2</url>
      <layout>default</layout>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
      <releases>
        <updatePolicy>never</updatePolicy>
      </releases>
    </pluginRepository>
  </pluginRepositories>
 
  <build>
    <directory>${project.basedir}/target</directory>
    <outputDirectory>${project.build.directory}/classes</outputDirectory>
    <finalName>${project.artifactId}-${project.version}</finalName>
    <testOutputDirectory>${project.build.directory}/test-classes</testOutputDirectory>
    <sourceDirectory>${project.basedir}/src/main/java</sourceDirectory>
    <scriptSourceDirectory>${project.basedir}/src/main/scripts</scriptSourceDirectory>
    <testSourceDirectory>${project.basedir}/src/test/java</testSourceDirectory>
    <resources>
      <resource>
        <directory>${project.basedir}/src/main/resources</directory>
      </resource>
    </resources>
    <testResources>
      <testResource>
        <directory>${project.basedir}/src/test/resources</directory>
      </testResource>
    </testResources>
    <pluginManagement>
      <!-- NOTE: These plugins will be removed from future versions of the super POM -->
      <!-- They are kept for the moment as they are very unlikely to conflict with lifecycle mappings (MNG-4453) -->
      <plugins>
        <plugin>
          <artifactId>maven-antrun-plugin</artifactId>
          <version>1.3</version>
        </plugin>
        <plugin>
          <artifactId>maven-assembly-plugin</artifactId>
          <version>2.2-beta-5</version>
        </plugin>
        <plugin>
          <artifactId>maven-dependency-plugin</artifactId>
          <version>2.8</version>
        </plugin>
        <plugin>
          <artifactId>maven-release-plugin</artifactId>
          <version>2.5.3</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
 
  <reporting>
    <outputDirectory>${project.build.directory}/site</outputDirectory>
  </reporting>
 
  <profiles>
    <!-- NOTE: The release profile will be removed from future versions of the super POM -->
    <profile>
      <id>release-profile</id>
 
      <activation>
        <property>
          <name>performRelease</name>
          <value>true</value>
        </property>
      </activation>
 
      <build>
        <plugins>
          <plugin>
            <inherited>true</inherited>
            <artifactId>maven-source-plugin</artifactId>
            <executions>
              <execution>
                <id>attach-sources</id>
                <goals>
                  <goal>jar-no-fork</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <inherited>true</inherited>
            <artifactId>maven-javadoc-plugin</artifactId>
            <executions>
              <execution>
                <id>attach-javadocs</id>
                <goals>
                  <goal>jar</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <inherited>true</inherited>
            <artifactId>maven-deploy-plugin</artifactId>
            <configuration>
              <updateReleaseInfo>true</updateReleaseInfo>
            </configuration>
          </plugin>
        </plugins>
      </build>
    </profile>
  </profiles>
 
</project>
```

你可以通过创建一个最小化的 `pom.xml` 文件并在命令行执行以下命令来查看 **Super POM** 如何影响你的项目对象模型 `mvn help:effective-pom`

**Dependency Management**

除了继承某些顶级元素之外，父 POM 还具有用于配置子 POM 和传递依赖项的元素。其中一个元素是 `dependencyManagement`。

- `dependencyManagement`: 由 POM 用于帮助管理其所有子项目的依赖信息。如果 `my-parent` 项目使用 `dependencyManagement` 定义了对 `junit:junit:4.12` 的依赖，那么继承自该项目的 POM 只需设置 `groupId=junit` 和 `artifactId=junit`，Maven 就会自动填写由父项目设置的 `vesion`。这种方法的好处是显而易见的。依赖详细信息可以在一个中心位置设置，并传播到所有继承的 POM。
- 请注意，传递依赖中引入的工件的版本和范围也由 `dependencyManagement` 部分中的版本规范控制。这可能会导致意想不到的后果。假设你的项目使用了两个依赖项 `dep1` 和 `dep2`，而 `dep2` 同时也依赖 `dep1`，并需要某个特定的最低版本才能正常工作。如果你使用 `dependencyManagement` 指定了一个较旧的版本，那么 `dep2` 将被迫使用较旧的版本，并可能因此无法正常运行。因此，你必须仔细检查整个依赖树以避免此问题；`mvn dependency:tree` 是一个有用的工具。

### 聚合(或者多模块)

一个包含模块的项目被称为多模块或聚合项目。模块是此 POM 列出的项目，并作为一个整体执行。一个打包为 POM 的项目可以通过将一组项目列为模块来聚合这些项目的构建，这些模块是指向这些项目的目录或 POM 文件的相对路径。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
 
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>my-parent</artifactId>
  <version>2.0</version>
  <packaging>pom</packaging>
 
  <modules>
    <module>my-project</module>
    <module>another-project</module>
    <module>third-project/pom-example.xml</module>
  </modules>
</project>
```

在列出模块时，您无需自己考虑模块之间的依赖关系；即 POM 中给出的模块顺序并不重要。Maven 会对模块进行拓扑排序，以确保依赖模块在构建之前始终构建。

要查看聚合的实际效果，请查看 Maven 基础 POM

::: info ℹ️
关于继承与聚合的最后说明：
继承和聚合为通过单个高层次的 POM 控制构建创造了良好的动态。您经常会看到既是父项目又是聚合项目的项目。例如，整个 Maven 核心通过一个单一的基础 POM `org.apache.maven:maven` 运行，因此可以通过单个命令 `mvn compile` 执行 Maven 项目的构建。然而，尽管聚合项目和父项目都是 POM 项目，但它们并不相同，不应混淆。一个 POM 项目可能继承自某个项目，但不一定有它所聚合的任何模块。相反，一个 POM 项目也可能聚合那些不继承自它的项目
:::

## 属性

属性是理解 POM 基础知识的最后一块必需内容。Maven 属性是值占位符，类似于 Ant 中的属性。通过使用 `${X}` 的语法，其中 `X` 是属性，可以在 POM 的任何地方访问它们的值。或者，它们可以被插件用作默认值，例如：

```XML
<project>
  ...
  <properties>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
    <!-- Following project.-properties are reserved for Maven in will become elements in a future POM definition. -->
    <!-- Don't start your own properties properties with project. -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding> 
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
  </properties>
  ...
</project>
```

翻译如下：

它们有五种不同的样式：

1. **`env.X`**：在变量前加上 "env." 将返回 shell 的环境变量。例如，`${env.PATH}` 包含 PATH 环境变量。
2. 注意：虽然在 Windows 上环境变量本身不区分大小写，但属性的查找是区分大小写的。换句话说，虽然 Windows shell 对 `%PATH%` 和 `%Path%` 返回相同的值，Maven 却区分 `${env.PATH}` 和 `${env.Path}`。为了可靠性，环境变量的名称被规范化为全大写。
3. **`project.x`**：POM 中的点（.）表示路径将包含相应元素的值。例如：`<project><version>1.0</version></project>` 可以通过 `${project.version}` 访问。
4. **`settings.x`**：在 `settings.xml` 中的点（.）表示路径将包含相应元素的值。例如：`<settings><offline>false</offline></settings>` 可以通过 `${settings.offline}` 访问。
5. **Java System Properties**：所有可通过 `java.lang.System.getProperties()` 访问的属性都可作为 POM 属性使用，例如 `${java.home}`。
6. **`x`**：在 POM 的 `<properties />` 元素中设置的值。例如，`<properties><someVar>value</someVar></properties>` 可以用 `${someVar}` 访问。

# 构建设置

在掌握 POM 的基础知识后，还有两个关键元素需要理解，才能宣称具备 POM 的基本能力。它们分别是：

在前面介绍的 POM 基础知识之外，还有两个元素需要理解，才能算是对 POM 有基本的掌握。它们是：

- **`build` 元素**，负责声明项目的目录结构和管理插件等事项；
- **`reporting` 元素**，在报告功能方面很大程度上与 build 元素相似。

这两个元素对于全面掌握 POM 的功能至关重要。

## 构建

根据 POM 4.0.0 的 XSD，`build` 元素在概念上被分为两部分：

- **`BaseBuild` 类型**：包含项目顶层 `build` 元素和位于 `profiles` 下的 `build` 元素所共有的一组元素（后文将介绍 profiles 下的 build 元素）
- **`Build` 类型**：它包含 `BaseBuild` 中的元素集，并且还包含更多用于顶层定义的元素。

我们先从分析这两者之间的共同元素开始

注意：这些不同的 `build` 元素可以分别称为 "项目构建"（project build）和"配置构建"（profile build）

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <!-- "Project Build" contains more elements than just the BaseBuild set -->
  <build>...</build>
 
  <profiles>
    <profile>
      <!-- "Profile Build" contains a subset of "Project Build"s elements -->
      <build>...</build>
    </profile>
  </profiles>
</project>
```

### BaseBuild 元素设置

`BaseBuild` 就像它的名字一样：是 POM 中两个 `build` 元素之间的基础元素集

```XML
<build>
  <defaultGoal>install</defaultGoal>
  <directory>${project.basedir}/target</directory>
  <finalName>${artifactId}-${version}</finalName>
  <filters>
    <filter>filters/filter1.properties</filter>
  </filters>
  ...
</build>
```

- `defaultGoal`：指的是当未指定目标时要执行的默认目标或阶段。如果给定了目标，应该像在命令行中一样定义它（例如 `jar:jar`）。同样，如果定义了阶段，也应像 install 这样的方式。
- `directory`：这是构建过程中生成文件存放的目录，或用 Maven 的术语来说，这是构建的目标目录。默认值是 `${project.basedir}/target`。
- `finalName`：这是项目最终构建时打包的名称（不包括文件扩展名，例如：`my-project-1.0.jar`）。默认值是 `${artifactId}-${version}`。虽然称为 “finalName”，但这个术语有些误导，因为构建项目的插件有权修改此名称（但通常不会）。例如，如果 `maven-jar-plugin` 被配置为给 jar 文件加上 “test” 的 `classifier`，那么上述定义的 jar 文件将会被打包为 `my-project-1.0-test.jar`。
- `filter`：定义了包含应用于资源的属性列表的 `*.properties` 文件，这些资源在构建时接受这些设置。换句话说，filter 文件中定义的 “`name=value`” 对将会替换资源中的 `${name}` 字符串。上面示例中，`filters/` 目录下定义了 `filter1.properties` 文件。Maven 的默认过滤器目录是 `${project.basedir}/src/main/filters/`。

如果想了解更详细的关于过滤器及其功能，可以参考 [快速入门指南](https://maven.apache.org/guides/getting-started)

**资源**

`build` 元素的另一个功能是指定项目中资源的位置。资源通常不是代码，它们不会被编译，但会被打包到项目中，或者用于其他各种用途，例如代码生成。

例如，一个 Plexus 项目需要一个 `configuration.xml` 文件（用于向容器指定组件配置）放在 `META-INF/plexus` 目录中。虽然我们可以简单地将这个文件放在 `src/main/resources/META-INF/plexus` 中，但我们希望为 Plexus 单独创建一个目录 `src/main/plexus`。为了让 JAR 插件正确地打包资源，你可以像下面这样指定资源：

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <build>
    ...
    <resources>
      <resource>
        <targetPath>META-INF/plexus</targetPath>
        <filtering>false</filtering>
        <directory>${project.basedir}/src/main/plexus</directory>
        <includes>
          <include>configuration.xml</include>
        </includes>
        <excludes>
          <exclude>**/*.properties</exclude>
        </excludes>
      </resource>
    </resources>
    <testResources>
      ...
    </testResources>
    ...
  </build>
</project>
```

- `resources`: 是一个资源元素的列表，每个元素描述与项目相关的文件包含的内容及其位置。
- `targetPath`: 指定从构建中资源的放置目录结构。目标路径默认为基础目录。对于将被打包进 JAR 的资源，常用的目标路径是 META-INF。
- `filtering`: 设为 `true` 或 `false`，用于指示是否启用该资源的过滤。注意，过滤 `*.properties` 文件不一定要被定义，资源也可以使用默认在 POM 中定义的属性（例如 `${project.version}`），通过命令行 `-D` 标志传入的属性（例如 `-Dname=value`），或者显式通过 properties 元素定义的属性。过滤文件的内容在上面已经介绍
- `directory`: 该元素的值定义了资源的存放位置。默认的构建目录是 `${project.basedir}/src/main/resources`
- `includes`: 一组文件模式，用于指定在该目录下包含哪些文件作为资源，使用 `*` 作为通配符。
- `excludes`: 与 `includes` 结构相同，但指定要忽略的文件。在 `include` 和 `exclude` 之间冲突时，`exclude` 优先。
- `testResources`: `testResources` 元素块包含 `testResource` 元素。它们的定义与 resource 元素类似，但自然用于测试阶段。一个区别是项目的默认（由 Super POM 定义的）测试资源目录是 `${project.basedir}/src/test/resources`。测试资源不会被部署

**插件**

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <build>
    ...
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
        <version>2.6</version>
        <extensions>false</extensions>
        <inherited>true</inherited>
        <configuration>
          <classifier>test</classifier>
        </configuration>
        <dependencies>...</dependencies>
        <executions>...</executions>
      </plugin>
    </plugins>
  </build>
</project>
```

除了标准的 `groupId:artifactId:version` 标识之外，还有一些元素可以配置插件或构建过程与它的交互

- `extensions`：`true` 或 `false`，指示是否加载该插件的扩展。默认值是 `false`。扩展的详细内容稍后会在文档中介绍。
- `inherited`：`true` 或 `false`，表示该插件配置是否应用于继承此 POM 的 POMs。默认值是 `true`。
- `configuration`：这是特定于单个插件的配置。无需深入了解插件的工作机制，简单来说，插件 Mojo（这些是 Java Mojo bean 中的 getters 和 setters）可能期望的任何属性都可以在这里指定。例如，在上述示例中，我们将 classifier 属性设置为 test，这是在 `maven-jar-plugin` 的 Mojo 中进行的配置。需要注意的是，POM 中的所有配置元素都是为了传递值到其他底层系统（如插件）。换句话说：配置元素中的值并非 POM 模式明确要求的，但插件目标有权要求配置值。
- 如果你的 POM 声明了一个父 POM，它会从父 POM 的 **build/plugins** 或 **pluginManagement** 部分继承插件配置

  - **默认配置继承：**
  - 为了说明这一点，考虑以下来自父 POM 的片段：

  ```XML
  <plugin>
    <groupId>my.group</groupId>
    <artifactId>my-plugin</artifactId>
    <configuration>
      <items>
        <item>parent-1</item>
        <item>parent-2</item>
      </items>
      <properties>
        <parentKey>parent</parentKey>
      </properties>
    </configuration>
  </plugin>
  ```

  - 并考虑以下来自使用该父 POM 的项目的插件配置：

  ```XML
  <plugin>
    <groupId>my.group</groupId>
    <artifactId>my-plugin</artifactId>
    <configuration>
      <items>
        <item>child-1</item>
      </items>
      <properties>
        <childKey>child</childKey>
      </properties>
    </configuration>
  </plugin>
  ```

  - 默认行为是根据元素名称合并 `configuration` 元素的内容。如果子 POM 有某个特定元素，该值将成为有效值。如果子 POM 没有某个元素，但父 POM 有，则父值将成为有效值。请注意，这仅仅是对 XML 的操作；不涉及插件本身的代码或配置。仅涉及元素，而不涉及它们的值。
  - 将这些规则应用于示例，Maven 得出：

  ```XML
  <plugin>
    <groupId>my.group</groupId>
    <artifactId>my-plugin</artifactId>
    <configuration>
      <items>
        <item>child-1</item>
      </items>
      <properties>
        <childKey>child</childKey>
        <parentKey>parent</parentKey>
      </properties>
    </configuration>
  </plugin>
  ```

  - **高级配置继承：**`combine.children` 和 `combine.self`
  - 可以通过向配置元素的子元素添加属性来控制子 POM 如何继承父 POM 的配置。属性包括 `combine.children` 和 `combine.self`。在子 POM 中使用这些属性以控制 Maven 如何将父配置与子配置中的显式配置结合起来。
  - 以下是包含这两个属性的子配置示例：

  ```XML
  <configuration>
    <items combine.children="append">
      <!-- combine.children="merge" is the default -->
      <item>child-1</item>
    </items>
    <properties combine.self="override">
      <!-- combine.self="merge" is the default -->
      <childKey>child</childKey>
    </properties>
  </configuration>
  ```

  - 结果如下

  ```XML
  <configuration>
    <items combine.children="append">
      <item>parent-1</item>
      <item>parent-2</item>
      <item>child-1</item>
    </items>
    <properties combine.self="override">
      <childKey>child</childKey>
    </properties>
  </configuration>
  ```

  - **combine.children="append"** 会导致父元素和子元素的内容按顺序连接在一起。另一方面，**combine.self="override"** 则完全覆盖父配置。不能在同一个元素上同时使用 **combine.self="override"** 和 **combine.children="append"**；如果尝试这样做，override 将优先
  - 请注意，这些属性仅适用于声明它们的配置元素，不会传播到嵌套元素。也就是说，如果子 POM 的某个元素的内容是复杂结构而不是文本，那么其子元素仍会遵循默认的合并策略，除非它们本身被标记为具有这些属性。
  - `combine.*` 属性可以从父 POM 继承到子 POM。向父 POM 添加这些属性时需谨慎，因为这可能会影响子 POM 或孙子 POM
  - **`dependencies` :** 依赖项在 POM 中非常常见，并且是所有插件元素块下的一个元素。这些依赖项与基础构建中的依赖项具有相同的结构和功能。主要区别在于，它们不是作为项目的依赖项，而是作为它们所处插件的依赖项。这样做的好处在于可以更改插件的依赖项列表，例如通过排除未使用的运行时依赖项，或者更改所需依赖项的版本。有关更多信息，请参见上文的依赖项部分
  - **`executions` :** 请记住，插件可能具有多个目标。每个目标可能有单独的配置，甚至可能将插件的目标绑定到完全不同的阶段。executions 用于配置插件目标的执行。
  - 例如，假设您希望将 `antrun:run` 目标绑定到 `verify` 阶段。我们希望任务回显构建目录，并通过将 `inherited` 设置为 `false` 来避免将此配置传递给其子项（假设它是一个父项）。您可以得到如下的 `execution` 配置：

  ```XML
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    ...
    <build>
      <plugins>
        <plugin>
          <artifactId>maven-antrun-plugin</artifactId>
          <version>1.1</version>
          <executions>
            <execution>
              <id>echodir</id>
              <goals>
                <goal>run</goal>
              </goals>
              <phase>verify</phase>
              <inherited>false</inherited>
              <configuration>
                <tasks>
                  <echo>Build Dir: ${project.build.directory}</echo>
                </tasks>
              </configuration>
            </execution>
          </executions>
  
        </plugin>
      </plugins>
    </build>
  </project>
  ```

  - **`id`**: 顾名思义，它用于在所有执行块之间标识当前执行块。当运行阶段时，它会显示为 `[plugin:goal execution: id]` 的形式。以该示例为例：`[antrun:run execution: echodir]`
  - **`goals`**: 像所有复数形式的 POM 元素一样，它包含单个元素的列表。在这里，`goals` 列出了由该 `execution` 块指定的插件目标列表。
  - **`phase`**: 指定该目标列表将在构建生命周期的哪个阶段执行。这个选项非常强大，可以将任何目标绑定到任何阶段，改变 Maven 的默认行为
  - **`inherited`**: 类似于前面的 `inherited` 元素，将其设置为 false 时，将阻止 Maven 将此执行块传递给子 POM。此元素仅对父 POM 有意义。
  - **`configuration`**: 同上面的 configuration，但只限于该特定的目标列表，而不是插件下的所有目标配置

**插件管理**

- **`pluginManagement`**：是一个与插件并列的元素。插件管理包含插件元素，其结构与插件类似，但不同的是，它不是为当前项目的构建配置插件信息，而是为了配置从该项目继承的项目构建。然而，它只配置在子项目或当前 POM 的插件元素中实际引用的插件。子项目可以完全覆盖 `pluginManagement` 的定义。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <build>
    ...
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-jar-plugin</artifactId>
          <version>2.6</version>
          <executions>
            <execution>
              <id>pre-process-classes</id>
              <phase>compile</phase>
              <goals>
                <goal>jar</goal>
              </goals>
              <configuration>
                <classifier>pre-process</classifier>
              </configuration>
            </execution>
          </executions>
        </plugin>
      </plugins>
    </pluginManagement>
    ...
  </build>
</project>
```

如果我们将这些规范添加到 plugins 元素中，它们只会应用于单个 POM。然而，如果我们将它们应用于 `pluginManagement` 元素下，那么该 POM 和所有继承该 POM 的子 POMs 中只要添加了 `maven-jar-plugin`，就会自动获得 `pre-process-classes` 执行阶段。因此，与其在每个子项目的 `pom.xml` 文件中包含一大堆配置，实际上只需要如下配置：

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <build>
    ...
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
      </plugin>
    </plugins>
    ...
  </build>
</project>
```

### Build 元素设置

XSD 中的 `Build` 类型表示那些仅适用于 “项目构建” 的元素。尽管有额外的六个元素，但实际上，项目构建中包含的元素可以分为两个主要类别：目录和扩展，这些在配置构建中是缺失的。

**目录**

目录元素集位于父构建元素中，用于为整个 POM 设置各种目录结构。由于这些目录元素不存在于配置文件构建中，因此它们无法被配置文件修改。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <build>
    <sourceDirectory>${project.basedir}/src/main/java</sourceDirectory>
    <scriptSourceDirectory>${project.basedir}/src/main/scripts</scriptSourceDirectory>
    <testSourceDirectory>${project.basedir}/src/test/java</testSourceDirectory>
    <outputDirectory>${project.basedir}/target/classes</outputDirectory>
    <testOutputDirectory>${project.basedir}/target/test-classes</testOutputDirectory>
    ...
  </build>
</project>
```

如果上面的 `*Directory` 元素的值被设置为绝对路径（当它们的属性被展开时），则会使用该目录。否则，它是相对于基本构建目录 `${project.basedir}` 的路径。请注意，`scriptSourceDirectory` 在 Maven 中没有使用，已经过时

**扩展**

扩展（extensions）是要在此构建中使用的工件列表。它们将被包含在运行中的构建的类路径中。扩展可以启用对构建过程的扩展（例如，为 Wagon 传输机制添加 FTP 提供程序），并使某些插件生效，这些插件会对构建生命周期进行更改。简而言之，扩展是构建期间激活的工件。这些扩展不一定需要执行任何操作或包含 Mojo。因此，扩展非常适合用于指定多个公共插件接口实现中的一个。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <build>
    ...
    <extensions>
      <extension>
        <groupId>org.apache.maven.wagon</groupId>
        <artifactId>wagon-ftp</artifactId>
        <version>1.0-alpha-3</version>
      </extension>
    </extensions>
    ...
  </build>
</project>
```

## 报告

Reporting 包含特定于 `site` 生成阶段的元素。某些 Maven 插件可以生成在 reporting 元素下定义和配置的报告，例如生成 Javadoc 报告。与 build 元素能够配置插件类似，reporting 也具备相同的能力。显著的区别在于，reporting 配置的是 `reportSet` 元素中的目标，而不是在 executions 块中精细地控制插件目标。更微妙的区别是，在 `reporting` 元素下的 `configuration` 配置与 `build` 插件 `configuration` 的工作方式相同，但反之则不然（ `build` 插件 `configuration` 不会影响 `reporting` 插件）。

可能是唯一与理解 `build` 元素不同的 item 是布尔类型的 `excludeDefaults` 元素。该元素指示站点生成器排除默认情况下生成的报告。当通过 `site` 构建周期生成站点时，项目信息部分会放置在左侧菜单中，包含许多报告，如项目团队报告或依赖项列表报告。这些报告目标是由 `maven-project-info-reports-plugin` 生成的。作为与其他插件相同的插件，它也可以通过以下更详细的方式进行抑制，这种方式有效地关闭了项目信息报告

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <reporting>
    <outputDirectory>/home/jenkins/82467a7c/workspace/aven_maven-box_maven-site_master/target/site</outputDirectory>
    <plugins>
      <plugin>
        <artifactId>maven-project-info-reports-plugin</artifactId>
        <version>2.0.1</version>
        <reportSets>
          <reportSet></reportSet>
        </reportSets>
      </plugin>
    </plugins>
  </reporting>
  ...
</project>
```

另一个区别是 `plugin` 下的 `outputDirectory` 元素。在 reporting 的情况下，输出目录默认是 `${project.basedir}/target/site`

### 报告集合

请记住，一个独立的插件可能有多个目标。每个目标可以有单独的配置。Report sets 用于配置报告插件目标的执行。这是否听起来很熟悉——似曾相识？之前在讨论 build 的 execution 元素时也说过同样的话，唯一的不同是：你不能将一个报告绑定到另一个阶段，抱歉。

例如，假设你想配置 `javadoc:javadoc` 目标链接到 “`http://java.sun.com/j2se/1.5.0/docs/api/`”，但只针对 `javadoc` 目标（而不是 `maven-javadoc-plugin:jar` 目标）。我们还希望这个配置能传递给它的子项目，并将 `inherited` 设置为 `true`。`reportSet` 会类似于如下内容:

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <reporting>
    <plugins>
      <plugin>
        ...
        <reportSets>
          <reportSet>
            <id>sunlink</id>
            <reports>
              <report>javadoc</report>
            </reports>
            <inherited>true</inherited>
            <configuration>
              <links>
                <link>http://java.sun.com/j2se/1.5.0/docs/api/</link>
              </links>
            </configuration>
          </reportSet>
        </reportSets>
      </plugin>
    </plugins>
  </reporting>
  ...
</project>
```

在构建执行和报告 reportSets 之间，现在应该清楚它们存在的原因。从最简单的角度来看，它们提供了配置的深入细化。POM 需要一种方法，不仅可以配置插件，还必须配置这些插件的目标。这就是这些元素的作用，使得 POM 在控制构建命运方面具备了最终的细粒度。

# 更多项目信息

有几个元素并不会影响构建，而是为了方便开发人员记录项目。许多这些元素在生成项目网站时会用来填写项目详细信息。然而，像所有 POM 声明一样，插件可以将它们用于任何用途。以下是最简单的几个元素：

- **name（名称）**：项目往往有一个更通俗易懂的名称，超越 artifactId（工件ID）。Sun 的工程师并没有将他们的项目称为 “java-1.5”，而是称其为 “Tiger”。这里就是设置该值的地方。
- **description（描述）**：简短的、易于阅读的项目描述。虽然这不应替代正式文档，但对 POM 阅读者来说，一个简短的注释总是有帮助的。
- **url（网址）**：项目主页的 URL。
- **inceptionYear（创始年份）**：项目首次创建的年份。

## 许可证

```XML
<licenses>
  <license>
    <name>Apache-2.0</name>
    <url>https://www.apache.org/licenses/LICENSE-2.0.txt</url>
    <distribution>repo</distribution>
    <comments>A business-friendly OSS license</comments>
  </license>
</licenses>
```

许可证是定义项目（或项目的部分）如何以及何时使用的法律文件。项目应列出直接适用于该项目的许可证，而不应列出适用于项目依赖项的许可证。

- **name（名称）**、**url（网址）** 和 **comments（注释）**：这些是自解释性的，并且在其他上下文中也遇到过。建议使用 [SPDX 标识符](https://spdx.org/licenses/) 作为许可证名称
- **distribution（分发）**：这描述了项目可以如何合法分发。有两种方法：repo（可以从 Maven 仓库下载）或 manual（必须手动安装）

## 组织

大多数项目由某种组织（企业、私人团体等）运行。这里是设置最基本信息的地方。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <organization>
    <name>Codehaus Mojo</name>
    <url>http://mojo.codehaus.org</url>
  </organization>
</project>
```

## 开发者

所有项目都由某个人在某个时间创建的文件组成。就像项目周围的其他系统一样，参与项目的人也与项目有直接关系。开发人员通常是项目核心开发团队的成员。需要注意的是，虽然一个组织可能有很多开发人员（程序员），但最好不要把他们全部列为开发人员，而只列出那些直接负责代码的人。一个简单的经验法则是，如果某个人不需要被联系以讨论项目相关事宜，那么他们就不需要被列在这里。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <developers>
    <developer>
      <id>jdoe</id>
      <name>John Doe</name>
      <email>jdoe@example.com</email>
      <url>http://www.example.com/jdoe</url>
      <organization>ACME</organization>
      <organizationUrl>http://www.example.com</organizationUrl>
      <roles>
        <role>architect</role>
        <role>developer</role>
      </roles>
      <timezone>America/New_York</timezone>
      <properties>
        <picUrl>http://www.example.com/jdoe/pic</picUrl>
      </properties>
    </developer>
  </developers>
  ...
</project>
```

- **id**、**name**、**email**：这些对应于开发者的 ID（通常是组织内的唯一 ID）、开发者的姓名和电子邮件地址。
- **organization（组织）**、**organizationUrl（组织网址）**：顾名思义，分别是开发者所属组织的名称和其网址。
- **roles（角色）**：角色应明确该人员负责的标准工作。就像一个人可以身兼多职一样，单个人也可以承担多个角色。
- **timezone（时区）**：一个有效的时区 ID，例如 `America/New_York` 或 `Europe/Berlin`，或者是开发者所在位置相对于 UTC 的时差（可以带小数），例如 `-5` 或 `+1`。强烈建议使用时区 ID，因为它们不受夏令时和时区变化的影响。IANA 提供了官方时区数据库，Wikipedia 上也有相关列表。
- **properties（属性）**：此元素用于记录与该人员相关的其他属性。例如，个人图片链接或即时通讯工具的账号。不同的插件可能会使用这些属性，或者它们仅供阅读 POM 文件的其他开发者使用。

## 贡献者

贡献者与开发人员类似，但在项目生命周期中扮演辅助角色。可能贡献者提交了一个错误修复，或添加了一些重要的文档。一个健康的开源项目通常会有比开发人员更多的贡献者。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <contributors>
    <contributor>
      <name>Noelle</name>
      <email>some.name@gmail.com</email>
      <url>http://noellemarie.com</url>
      <organization>Noelle Marie</organization>
      <organizationUrl>http://noellemarie.com</organizationUrl>
      <roles>
        <role>tester</role>
      </roles>
      <timezone>America/Vancouver</timezone>
      <properties>
        <gtalk>some.name@gmail.com</gtalk>
      </properties>
    </contributor>
  </contributors>
  ...
</project>
```

贡献者包含与开发人员相同的元素集，**但不包括 id 元素**。

# 环境设置

## Issue 管理

这定义了使用的缺陷跟踪系统（如 Bugzilla、TestTrack、ClearQuest 等）。虽然插件可以使用此信息做其他事情，但它主要用于生成项目文档。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <issueManagement>
    <system>Bugzilla</system>
    <url>http://127.0.0.1/bugzilla/</url>
  </issueManagement>
  ...
</project>
```

## CI 管理

基于触发器或定时（例如，每小时或每天）的持续集成构建系统在过去几年中比手动构建更受欢迎。随着构建系统的标准化，触发这些构建的系统也变得更加规范。尽管大部分配置取决于所使用的具体程序（如 Continuum、Cruise Control 等），但在 POM 中仍然可以进行一些配置。Maven 已通过 notifier 元素集合捕捉到了一些常见的设置。

**notifier** 是指在某些构建状态下通知相关人员的方式。在下面的示例中，POM 设置了一个类型为 `mail` 的 notifier（表示通过电子邮件），并根据指定的触发器进行配置，如 `sendOnError`、`sendOnFailure`，而不会在 `sendOnSuccess` 或 `sendOnWarning` 时发送通知。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <ciManagement>
    <system>continuum</system>
    <url>http://127.0.0.1:8080/continuum</url>
    <notifiers>
      <notifier>
        <type>mail</type>
        <sendOnError>true</sendOnError>
        <sendOnFailure>true</sendOnFailure>
        <sendOnSuccess>false</sendOnSuccess>
        <sendOnWarning>false</sendOnWarning>
        <configuration><address>continuum@127.0.0.1</address></configuration>
      </notifier>
    </notifiers>
  </ciManagement>
  ...
</project>
```

## 邮件列表

邮件列表是与项目相关人员保持联系的极佳工具。大多数邮件列表是为开发者和用户而设的。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <mailingLists>
    <mailingList>
      <name>User List</name>
      <subscribe>user-subscribe@127.0.0.1</subscribe>
      <unsubscribe>user-unsubscribe@127.0.0.1</unsubscribe>
      <post>user@127.0.0.1</post>
      <archive>http://127.0.0.1/user/</archive>
      <otherArchives>
        <otherArchive>http://base.google.com/base/1/127.0.0.1</otherArchive>
      </otherArchives>
    </mailingList>
  </mailingLists>
  ...
</project>
```

- **subscribe（订阅）**、**unsubscribe（退订）**：这些元素指定用于执行相关操作的电子邮件地址。例如，要订阅上面的用户列表，用户会发送电子邮件到 user-subscribe@127.0.0.1。
- **archive（存档）**：此元素指定旧邮件列表邮件的存档网址（如果存在）。如果有镜像存档，可以在 otherArchives 中指定。
- **post（发布）**：用于向邮件列表发布消息的电子邮件地址。请注意，并非所有邮件列表都支持发布消息（例如，构建失败通知列表）。

## SCM

SCM（软件配置管理[Software Configuration Management]，也称为源代码/控制管理，或简洁地称为版本控制）是任何健康项目的重要组成部分。如果你的 Maven 项目使用了 SCM 系统（它确实应该使用，对吧？），那么这里就是你将相关信息放入 POM 的地方。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <scm>
    <connection>scm:svn:http://127.0.0.1/svn/my-project</connection>
    <developerConnection>scm:svn:https://127.0.0.1/svn/my-project</developerConnection>
    <tag>HEAD</tag>
    <url>http://127.0.0.1/websvn/my-project</url>
  </scm>
  ...
</project>
```

- **connection**、**developerConnection**：这两个连接元素用于指定如何通过 Maven 连接到版本控制系统。connection 需要读取权限，Maven 通过它来获取源代码（例如更新代码），而 developerConnection 则需要写权限，用于开发人员提交代码。Maven 项目还催生了另一个名为 Maven SCM 的项目，它为任何希望实现的 SCM 系统创建了一个通用 API。最流行的 SCM 系统是 CVS 和 Subversion，但其他受支持的 SCM 系统列表也在不断增长。所有 SCM 连接都通过一个通用的 URL 结构进行：

```XML
scm:[provider]:[provider_specific]
```

- 其中，provider 是 SCM 系统的类型。例如，连接到 CVS 仓库可能看起来像这样：

```XML
scm:cvs:pserver:127.0.0.1:/cvs/root:my-project
```

- **tag**：指定项目所在的标签。默认值是 HEAD，表示 SCM 的根目录。
- **url**：一个公开可浏览的仓库 URL。例如，通过 ViewCVS 查看仓库。

## 先决条件

POM 可能需要某些前提条件才能正确执行。在 POM 4.0.0 中，唯一存在的前提条件元素是 `maven` 元素，它接受一个最低版本号。

为了设置构建时的前提条件，可以使用 [**Maven Enforcer Plugin**](https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html)[ 的 ](https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html)[`requireMavenVersion`](https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html)[ 规则](https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html) 或其他规则。对于打包类型为 `maven-plugin` 的项目，这个元素仍然在运行时使用，以确保插件满足最低 Maven 版本要求（但仅在引用的插件的 pom.xml 中使用）。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <prerequisites>
    <maven>2.0.6</maven>
  </prerequisites>
  ...
</project>
```

## 仓库

仓库是符合 Maven 仓库目录布局的工件集合。要成为 Maven 仓库的工件，POM 文件必须位于结构 `$BASE_REPO/groupId/artifactId/version/artifactId-version.pom` 中。`$BASE_REPO` 可以是本地（文件结构）或远程（基本 URL）；剩余的布局将相同。仓库是用于收集和存储工件的地方。当项目依赖某个工件时，Maven 会首先尝试使用该工件的本地副本。如果该工件不存在于本地仓库中，Maven 会尝试从远程仓库下载。

仓库是 Maven 社区最强大的功能之一。默认情况下，Maven 会搜索位于 [https://repo.maven.apache.org/maven2/](https://repo.maven.apache.org/maven2/) 的中央仓库。可以在 pom.xml 的 repositories 元素中配置其他仓库

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <repositories>
    <repository>
      <releases>
        <enabled>false</enabled>
      </releases>
      <snapshots>
        <enabled>true</enabled>
        <updatePolicy>always</updatePolicy>
        <checksumPolicy>fail</checksumPolicy>
      </snapshots>
      <name>Nexus Snapshots</name>
      <id>snapshots-repo</id>
      <url>https://oss.sonatype.org/content/repositories/snapshots</url>
      <layout>default</layout>
    </repository>
  </repositories>
  <pluginRepositories>
    ...
  </pluginRepositories>
  ...
</project>
```

- **releases**、**snapshots**：这些是每种工件类型（Release 或 snapshot）的策略。通过这两组设置，POM 可以在同一个仓库中为每种类型分别更改策略。例如，可以选择只启用 snapshot 下载，可能用于开发目的。
- **enabled**：设置为 `true` 或 `false`，用于确定该仓库是否为相应的类型（`releases` 或 `snapshots`）启用。默认值为 true。
- **updatePolicy**：此元素指定 Maven 尝试从远程仓库更新本地仓库的频率。Maven 会将本地 POM 的时间戳（存储在仓库的 maven-metadata 文件中）与远程的进行比较。选项包括：`always`、`daily`（默认）、`interval:X`（其中 X 是以分钟为单位的整数）或 `never`（仅在本地仓库中不存在时下载）。此策略同时影响工件和元数据（在 Maven 4 中将有所更改），因此对 never 选项要谨慎，因为元数据会随着时间变化（即使对于发布仓库也是如此）。
- **checksumPolicy**：当 Maven 部署文件到仓库时，它还会部署相应的校验和文件。选项包括 `ignore`（忽略）、`fail`（失败）或 `warn`（警告）在校验和缺失或不正确的情况下。默认值为 `warn`。
- **id**：仓库 ID 是必需的，并将仓库与 `settings.xml` 中的服务器连接起来。其默认值是 `default`。id 还用于本地仓库元数据中，用于存储来源。
- **name**：仓库的可选名称。用于在与此仓库相关的日志消息中作为标签。
- **layout**：在上面的仓库描述中提到，所有仓库都遵循通用的布局。这大体是正确的。Maven 2 引入的布局是 Maven 2 和 3 使用的默认布局。然而，Maven 1.x 使用了不同的布局。使用此元素来指定是 `default` 还是 `legacy` 布局。默认值为 `default`。

## 插件仓库

仓库主要存储两大类工件。第一类是作为其他工件依赖项的工件，它们是中央仓库中大多数工件。另一类是插件，Maven 插件本身是一种特殊类型的工件。因此，插件仓库可以与其他仓库分开（尽管我还没有听到一个令人信服的理由来这样做）。无论如何，`pluginRepositories` 元素块的结构与 `repositories` 元素类似。每个 `pluginRepository` 元素指定 Maven 可以找到新插件的远程位置。

## 分发管理

分发管理（**Distribution Management**）顾名思义，它管理构建过程中生成的工件及其支持文件的分发。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <distributionManagement>
    <repository>...</repository>
    <snapshotRepository>...<snapshotRepository>
    <site>...</site>
    <relocation>...</relocation>
    <downloadUrl>...</downloadUrl>
    <status>...</status>
  </distributionManagement>
  ...
</project>
```

### 仓库

repositories 元素在 POM 中指定 Maven 下载远程工件的位置和方式，以供当前项目使用，而 distributionManagement 则指定在项目部署时如何到达远程仓库（及其位置）。如果未定义 snapshotRepository，则将使用 repository 元素进行快照分发。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <distributionManagement>
    <repository>
      <uniqueVersion>false</uniqueVersion>
      <id>corp1</id>
      <name>Corporate Repository</name>
      <url>scp://repo/maven2</url>
      <layout>default</layout>
    </repository>
    <snapshotRepository>
      <uniqueVersion>true</uniqueVersion>
      <id>propSnap</id>
      <name>Propellors Snapshots</name>
      <url>sftp://propellers.net/maven</url>
      <layout>legacy</layout>
    </snapshotRepository>
    ...
  </distributionManagement>
  ...
</project>
```

- **id**、**name**：`id` 用于在众多仓库中唯一标识该仓库，而 `name` 则是人类可读的名称。
- **uniqueVersion**：此元素接受布尔值 `true` 或 `false`，用于指示部署到该仓库的工件是否应该获得唯一生成的版本号，或使用作为地址一部分定义的版本号。
- **url**：这是 `repository` 元素的核心。它指定了将构建的工件（包括 POM 文件和校验和数据）传输到仓库的位置和传输协议
- **layout**：这些类型和目的与 repository 元素中定义的 layout 元素相同，包括 `default` 和 `legacy`。

### 网站分发

除了将工件分发到仓库外，**distributionManagement** 还负责定义如何部署项目的网站和文档。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <distributionManagement>
    ...
    <site>
      <id>mojo.website</id>
      <name>Mojo Website</name>
      <url>scp://beaver.codehaus.org/home/projects/mojo/public_html/</url>
    </site>
    ...
  </distributionManagement>
  ...
</project>
```

- **id**、**name**、**url**：这些元素与上面 `distributionManagement` 中的 `repository` 元素中的对应元素类似。

### 重定向

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0"1 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <distributionManagement>
    ...
    <relocation>
      <groupId>org.apache</groupId>
      <artifactId>my-project</artifactId>
      <version>1.0</version>
      <message>We have moved the Project under Apache</message>
    </relocation>
    ...
  </distributionManagement>
  ...
</project>
```

项目并非静态的；它们是活的事物（或者在某些情况下是正在衰退的事物）。随着项目的发展，常见的情况是它们被迫迁移到更合适的地方。例如，当你下一个成功的开源项目迁入 Apache 旗下时，通知用户项目被重命名为 `org.apache:my-project:1.0` 是非常重要的。除了指定新地址外，提供一条说明原因的消息也是一种良好的做法

### 下载 Url

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <distributionManagement>
    ...
    <downloadUrl>http://mojo.codehaus.org/my-project/download.html</downloadUrl>
  </distributionManagement>
  ...
</project>
```

**downloadUrl**：这是项目下载页面的 URL。如果未提供该 URL，用户将被引导至由 **url** 指定的主页。这个元素的目的是帮助用户定位因许可证限制而未包含在仓库中的工件。例如，典型工作流程可以参考 [MNG-2083](https://issues.apache.org/jira/browse/MNG-2083)

### 状态

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <distributionManagement>
    ...
    <status>deployed</status>
  </distributionManagement>
  ...
</project>
```

**警告！** 就像巢中的小鸟一样，status 不应被人工触碰！原因在于，Maven 会在将项目传输到仓库时设置项目的状态。这里描述它仅为理解，但绝不应在你的 `pom.xml` 中进行配置

status 的有效值如下：

- **none**：没有特殊状态。这是 POM 的默认值。
- **converted**：仓库的管理者将此 POM 从早期版本转换为 Maven 2。
- **partner**：此工件已与合作伙伴仓库同步。
- **deployed**：最常见的状态，表示该工件是从 Maven 2 或 3 实例中部署的。这是你在手动使用命令行部署阶段时获得的状态。
- **verified**：该项目已被验证，应该被视为最终版本。

## 资料

POM 4.0 的一个新特性是项目能够根据构建时的环境来更改设置。`profile` 元素包含一个可选的 **activation**（配置文件触发器）和一组在该配置文件激活后对 POM 进行的更改。例如，为测试环境构建的项目可能指向与最终部署不同的数据库，或者依赖项可能根据使用的 JDK 版本从不同的仓库中提取。**profiles** 的元素包括以下内容：

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <profiles>
    <profile>
      <id>test</id>
      <activation>...</activation>
      <build>...</build>
      <modules>...</modules>
      <repositories>...</repositories>
      <pluginRepositories>...</pluginRepositories>
      <dependencies>...</dependencies>
      <reporting>...</reporting>
      <dependencyManagement>...</dependencyManagement>
      <distributionManagement>...</distributionManagement>
    </profile>
  </profiles>
</project>
```

### **Activations**

**Activations** 是配置文件的核心。配置文件的强大功能来自于其在特定情况下修改基本 POM 的能力。那些特定情况通过 **activation** 元素进行指定。

```XML
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <profiles>
    <profile>
      <id>test</id>
      <activation>
        <activeByDefault>false</activeByDefault>
        <jdk>1.5</jdk>
        <os>
          <name>Windows XP</name>
          <family>Windows</family>
          <arch>x86</arch>
          <version>5.1.2600</version>
        </os>
        <property>
          <name>sparrow-type</name>
          <value>African</value>
        </property>
        <file>
          <exists>${basedir}/file2.properties</exists>
          <missing>${basedir}/file1.properties</missing>
        </file>
      </activation>
      ...
    </profile>
  </profiles>
</project>
```

在 Maven 3.2.2 之前，**activation** 发生在满足一个或多个指定条件时。当遇到第一个符合条件的结果时，处理停止并将配置文件标记为激活。自 Maven 3.2.2 起，**activation** 发生在所有指定条件都满足时。

以下是 **activation** 的关键元素：

- **activeByDefault**：默认值为 `false`。这是一个布尔标志，决定配置文件是否默认激活。仅当没有通过命令行、`settings.xml` 显式激活其他配置文件或通过其他激活器隐式激活配置文件时才会评估此标志，否则它不起作用。
- **jdk**：`activation` 的 `jdk` 元素内置了一个 Java 中心化的检查。该值可以是以下三种类型之一

  - 如果值以 [ 或 ( 开头，则为 maven-enforcer-plugin 定义的版本范围。
  - 如果值以 ! 开头，则为否定前缀。
  - 在所有其他情况下，为非否定前缀。
- 前缀值与运行 Maven 的 JDK 版本匹配（包括或不包括前导 `!`），版本范围值在 JDK 版本处于指定范围内时匹配。
- **os**：`os` 元素可要求某些特定操作系统属性具有特定值。每个值都可以以 `!` 开头，表示如果该值与实际系统属性不相等，则条件满足。检查是大小写不敏感的。

  - **name** 与系统属性 `os.name` 匹配。
  - **family** 根据其他 `os.*` 系统属性派生的 family 进行匹配。
  - **arch** 与系统属性 `os.arch` 匹配。
  - **version** 与系统属性 `os.version` 匹配。自 [Maven 3.9.7](https://issues.apache.org/jira/browse/MNG-5726) 起，version 的值可以以 `regex:` 开头，使用正则表达式进行匹配。
- **property**：该 `profile` 文件会在 Maven 检测到系统属性或命令行用户属性时激活，这些属性对应于 `name=value` 对，并且它们的值与给定值相匹配（如果有给定值）。系统属性或命令行属性可以在 POM 文件中通过 `${name}` 的形式进行引用
- **file**：最后，`profile` 文件可通过文件的 `existence` 或 `missing` 来激活。注意：该元素的插值仅限于 `${basedir}`、系统属性和请求属性。

**activation** 元素并不是激活配置文件的唯一方式。`settings.xml` 文件中的 **`activeProfile`** 元素可以包含配置文件的 `id`，从而通过 `settings.xml` 进行激活。此外，还可以通过命令行显式激活配置文件，在 `-P` 标志后面提供一个以逗号分隔的配置文件 ID 列表。(例如：`-P codecoverage`)

要查看某个构建中将激活哪些配置文件，可以使用 maven-help-plugin 执行：

```XML
mvn help:active-profiles
```

更多关于 **profiles** 的信息，请参阅 [Introduction to Build Profiles](https://maven.apache.org/guides/introduction/introduction-to-profiles.html)。

### BaseBuild 元素设置(回顾)

正如上面提到的，构建元素的两种类型存在的原因在于，配置构建目录或扩展在 POM 的顶层是有意义的，而在 profile 中并不合适。无论项目在哪个环境中构建，有些值总是保持不变的，比如源代码的目录结构。如果你的项目需要为不同的环境保留两套代码，可能需要考虑将项目重构为两个或更多的独立项目。这样可以更好地管理不同环境下的依赖和配置，从而提高项目的可维护性和灵活性。

# 写在最后

Maven 的 POM 文件非常庞大。然而，它的规模也证明了其多功能性。将一个项目的各个方面抽象为单个工件的能力无疑是强大的。过去那些分散的构建脚本和每个项目的零散文档不复存在。加上 Maven 生态系统中的其他核心要素——明确的构建生命周期、易于编写和维护的插件、集中的仓库、系统范围和用户基础的配置，以及越来越多的工具，帮助开发者维护复杂项目——POM 成为这个庞大但明亮的中心。