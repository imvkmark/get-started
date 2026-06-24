---
description: 'Spring Boot 是一个用于简化 Spring 应用开发的框架，提供快速入门、版本升级指南、开发与功能详解，涵盖 Web、数据、消息、IO 及容器镜像等模块。同时支持生产环境优化、高级主题，以及多种安装方式（如 Maven、Gradle、CLI、Homebrew 等），并包含从 1.x 到新功能版本的升级说明。'
lastUpdated: '2026-06-20 12:14:56'
head:
  - - meta
    - name: 'og:title'
      content: 'Spring Boot 概览'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Spring Boot 是一个用于简化 Spring 应用开发的框架，提供快速入门、版本升级指南、开发与功能详解，涵盖 Web、数据、消息、IO 及容器镜像等模块。同时支持生产环境优化、高级主题，以及多种安装方式（如 Maven、Gradle、CLI、Homebrew 等），并包含从 1.x 到新功能版本的升级说明。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/overview.html'
---
# Spring Boot 概览

## 概览

Spring Boot 帮助您创建独立的、可用于生产环境的基于 Spring 的应用程序，您可以直接运行它们。我们对 Spring 平台和第三方库采取了“意见式”的配置方式，使您可以以最少的麻烦快速入门。大多数 Spring Boot 应用程序几乎不需要 Spring 配置。

您可以使用 Spring Boot 创建 Java 应用程序，并通过 java -jar 启动，也可以使用更传统的 war 部署方式。

我们的主要目标包括：

- 提供一个极大加速且广泛可用的 Spring 开发入门体验
- 开箱即用地提供“意见式”配置，但随着需求与默认设置的分歧，快速让出配置控制
- 提供大量项目中常见的非功能特性（如嵌入式服务器、安全性、指标、健康检查和外部配置）
- 绝不进行代码生成（在非原生镜像的情况下）且无需 XML 配置

## 文档概览

### **入门**

如果您刚开始接触 Spring Boot 或 Spring，可以从以下主题开始：

- **从零开始**：[概览](https://docs.spring.io/spring-boot/index.html) | [需求](https://docs.spring.io/spring-boot/system-requirements.html) | [安装](https://docs.spring.io/spring-boot/installing.html)
- **教程**：[第 1 部分](https://docs.spring.io/spring-boot/tutorial/first-application/index.html) | [第 2 部分](https://docs.spring.io/spring-boot/tutorial/first-application/index.html#getting-started.first-application.code)
- **运行示例**：[第 1 部分](https://docs.spring.io/spring-boot/tutorial/first-application/index.html#getting-started.first-application.run) | [第 2 部分](https://docs.spring.io/spring-boot/tutorial/first-application/index.html#getting-started.first-application.executable-jar)

### **从早期版本升级**

请始终确保您使用[受支持的](https://github.com/spring-projects/spring-boot/wiki/Supported-Versions) Spring Boot 版本。根据升级的目标版本，可以查看以下升级指南：

- **从 1.x 升级**：[从 1.x 升级](https://docs.spring.io/spring-boot/upgrading.html#upgrading.from-1x)
- **至新功能版本**：[升级到新功能版本](https://docs.spring.io/spring-boot/upgrading.html#upgrading.to-feature)
- **Spring Boot CLI**：[升级 Spring Boot CLI](https://docs.spring.io/spring-boot/upgrading.html#upgrading.cli)

### **使用 Spring Boot 开发**

准备开始使用 Spring Boot 开发？[我们为您提供了以下内容](https://docs.spring.io/spring-boot/reference/using/index.html)：

- **构建系统**：[Maven](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.maven) | [Gradle](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.gradle) | [Ant](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.ant) | [Starters](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.starters)
- **最佳实践**：[代码结构](https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html) | [@Configuration](https://docs.spring.io/spring-boot/reference/using/configuration-classes.html) | [@EnableAutoConfiguration](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html) | [Bean 和依赖注入](https://docs.spring.io/spring-boot/reference/using/spring-beans-and-dependency-injection.html)
- **运行代码**：[IDE](https://docs.spring.io/spring-boot/reference/using/running-your-application.html#using.running-your-application.from-an-ide) | [打包](https://docs.spring.io/spring-boot/reference/using/running-your-application.html#using.running-your-application.as-a-packaged-application) | [Maven](https://docs.spring.io/spring-boot/reference/using/running-your-application.html#using.running-your-application.with-the-maven-plugin) | [Gradle](https://docs.spring.io/spring-boot/reference/using/running-your-application.html#using.running-your-application.with-the-gradle-plugin)
- **应用程序打包**：[生产环境 jars](https://docs.spring.io/spring-boot/reference/using/packaging-for-production.html)
- **Spring Boot CLI**：[使用 CLI](https://docs.spring.io/spring-boot/cli/index.html)

### **了解 Spring Boot 功能**

需要更多关于 Spring Boot 核心功能的详细信息？[以下内容适合您](https://docs.spring.io/spring-boot/reference/features/index.html)：

- **Spring 应用程序**：[SpringApplication](https://docs.spring.io/spring-boot/reference/features/spring-application.html)
- **外部配置**：[外部配置](https://docs.spring.io/spring-boot/reference/features/external-config.html)
- **配置文件**：[Profiles](https://docs.spring.io/spring-boot/reference/features/profiles.html)
- **日志记录**：[Logging](https://docs.spring.io/spring-boot/reference/features/logging.html)

### **Web**

如果您开发 Spring Boot Web 应用程序，可以查看以下内容：

- **Servlet Web 应用程序**：[Spring MVC、Jersey、嵌入式 Servlet 容器](https://docs.spring.io/spring-boot/reference/web/servlet.html)
- **响应式 Web 应用程序**：[Spring Webflux、嵌入式 Servlet 容器](https://docs.spring.io/spring-boot/reference/web/reactive.html)
- **优雅关闭**：[Graceful Shutdown](https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html)
- **Spring Security**：[默认安全配置、OAuth2 自动配置、SAML](https://docs.spring.io/spring-boot/reference/web/spring-security.html)
- **Spring Session**：[Spring Session 自动配置](https://docs.spring.io/spring-boot/reference/web/spring-session.html)
- **Spring HATEOAS**：[Spring HATEOAS 自动配置](https://docs.spring.io/spring-boot/reference/web/spring-hateoas.html)

### **数据**

如果您的应用程序涉及数据存储，可以在此处查看相关配置：

- **SQL**：[SQL 数据存储配置、嵌入式数据库支持、连接池等](https://docs.spring.io/spring-boot/reference/data/sql.html)
- **NoSQL**：[NoSQL 存储（如 Redis、MongoDB、Neo4j 等）的自动配置](https://docs.spring.io/spring-boot/reference/data/nosql.html)

### **消息传递**

如果您的应用程序使用任何消息传递协议，可查看以下内容：

- **JMS**：[ActiveMQ 和 Artemis 的自动配置，通过 JMS 发送和接收消息](https://docs.spring.io/spring-boot/reference/messaging/jms.html)
- **AMQP**：[RabbitMQ 的自动配置](https://docs.spring.io/spring-boot/reference/messaging/amqp.html)
- **Kafka**：[Spring Kafka 的自动配置](https://docs.spring.io/spring-boot/reference/messaging/kafka.html)
- **Pulsar**：[Spring for Apache Pulsar 的自动配置](https://docs.spring.io/spring-boot/reference/messaging/pulsar.html)
- **RSocket**：[Spring Framework RSocket 支持的自动配置](https://docs.spring.io/spring-boot/reference/messaging/rsocket.html)
- **Spring Integration**：[Spring Integration 的自动配置](https://docs.spring.io/spring-boot/reference/messaging/spring-integration.html)

### **IO**

如果您的应用程序需要 IO 功能，可以查看以下内容：

- **缓存**：[EhCache、Hazelcast、Infinispan 等缓存支持](https://docs.spring.io/spring-boot/reference/io/caching.html)
- **Quartz**：[Quartz 调度](https://docs.spring.io/spring-boot/reference/io/quartz.html)
- **邮件**：[发送邮件](https://docs.spring.io/spring-boot/reference/io/email.html)
- **验证**：JSR-303 验证
- **REST 客户端**：[使用 RestTemplate 和 WebClient 调用 REST 服务](https://docs.spring.io/spring-boot/reference/io/rest-client.html)
- **Web 服务**：[Spring Web Services 的自动配置](https://docs.spring.io/spring-boot/reference/io/webservices.html)
- **JTA**：[分布式事务 JTA](https://docs.spring.io/spring-boot/reference/io/jta.html)

### **容器镜像**

Spring Boot 提供了高效的容器镜像构建支持，详情如下：

- **高效容器镜像**：[优化 Docker 镜像的技巧](https://docs.spring.io/spring-boot/reference/packaging/container-images/efficient-images.html)
- **Dockerfile**：[使用 Dockerfile 构建容器镜像](https://docs.spring.io/spring-boot/reference/packaging/container-images/dockerfiles.html)
- **Cloud Native Buildpacks**：[Maven 和 Gradle 的 Cloud Native Buildpacks 支持](https://docs.spring.io/spring-boot/reference/packaging/container-images/cloud-native-buildpacks.html)

### **推向生产环境**

当您准备好将 Spring Boot 应用程序推向生产时，[以下内容](https://docs.spring.io/spring-boot/how-to/actuator.html)可能会对您有帮助：

- **管理端点**：[概述](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html)
- **连接选项**：[HTTP](https://docs.spring.io/spring-boot/reference/actuator/monitoring.html) | [JMX](https://docs.spring.io/spring-boot/reference/actuator/jmx.html)
- **监控**：[指标](https://docs.spring.io/spring-boot/reference/actuator/metrics.html) | [审计](https://docs.spring.io/spring-boot/reference/actuator/auditing.html) | [HTTP 交换](https://docs.spring.io/spring-boot/reference/actuator/http-exchanges.html) | [进程](https://docs.spring.io/spring-boot/reference/actuator/process-monitoring.html)

### **生产环境优化**

Spring Boot 应用程序可以通过以下技术进行生产优化：

- **高效部署**：[解压可执行 JAR](https://docs.spring.io/spring-boot/reference/packaging/efficient.html#packaging.efficient.unpacking)
- **GraalVM 原生镜像**：[介绍](https://docs.spring.io/spring-boot/reference/packaging/native-image/introducing-graalvm-native-images.html) | [高级主题](https://docs.spring.io/spring-boot/reference/packaging/native-image/advanced-topics.html) | [入门](https://docs.spring.io/spring-boot/how-to/native-image/developing-your-first-application.html) | [测试](https://docs.spring.io/spring-boot/how-to/native-image/testing-native-applications.html)
- **类数据共享**：[概览](https://docs.spring.io/spring-boot/reference/packaging/class-data-sharing.html)
- **检查点和恢复**：[概览](https://docs.spring.io/spring-boot/reference/packaging/checkpoint-restore.html)

### **高级主题**

最后，我们为高级用户准备了一些主题：

- **Spring Boot 应用程序部署**：[云部署](https://docs.spring.io/spring-boot/how-to/deployment/cloud.html) | [操作系统服务](https://docs.spring.io/spring-boot/how-to/deployment/installing.html)
- **构建工具插件**：[Maven](https://docs.spring.io/spring-boot/maven-plugin/index.html) | [Gradle](https://docs.spring.io/spring-boot/gradle-plugin/index.html)
- **附录**：[应用程序属性](https://docs.spring.io/spring-boot/appendix/application-properties/index.html) | [配置元数据](https://docs.spring.io/spring-boot/specification/configuration-metadata/index.html) | [自动配置类](https://docs.spring.io/spring-boot/appendix/auto-configuration-classes/index.html) | [测试自动配置注解](https://docs.spring.io/spring-boot/appendix/test-auto-configuration/index.html) | [可执行 JAR](https://docs.spring.io/spring-boot/specification/executable-jar/index.html) | [依赖版本](https://docs.spring.io/spring-boot/appendix/dependency-versions/index.html)

## 社区

如果您在使用 Spring Boot 时遇到问题，我们乐于提供帮助。

- **查看** [**HowTo 文档**](https://docs.spring.io/spring-boot/how-to/index.html)：这些文档提供了对常见问题的解决方案。
- **学习 Spring 基础知识**：Spring Boot 基于许多其他 Spring 项目构建。请访问 [spring.io](https://spring.io/) 网站查阅丰富的参考文档。如果您是 Spring 的初学者，可以先试试其中的[指南](https://spring.io/guides)
- **提问**：我们会在 [stackoverflow.com](https://stackoverflow.com/) 上关注带有 spring-boot 标签的问题。
- **报告 Bug**：如果遇到 Spring Boot 的 Bug，可以在 [GitHub](https://github.com/spring-projects/spring-boot/issues) 上提交问题。

::: info ℹ️
Spring Boot 是开源的，包括文档。如果您发现文档有问题或想要改进文档，欢迎参与贡献！
:::

## 系统要求

Spring Boot 3.3.5 需要至少 Java 17，并兼容最高至 Java 23 的版本。同时，Spring Framework 6.1.14 或更高版本也是必需的。

Spring Boot 3.3.5 明确支持以下构建工具：

| Build Tool | Version |
|-|-|
| Maven | 3.6.3 or later |
| Gradle | 7.x (7.5 or later) and 8.x |

### **Servlet 容器**

Spring Boot 支持以下嵌入式 Servlet 容器：

| Name | Servlet Version | ps.说明 |
|-|-|-|
| Tomcat 10.1 (10.1.25 or later) | 6.0 | 默认嵌入式容器，广泛使用，性能稳定 |
| Jetty 12.0 | 6.0 | 适合需要较小内存占用和快速启动的应用 |
| Undertow 2.3 | 6.0 | 轻量级、高性能的容器，适用于需要非阻塞 IO 的应用 |

另外还可以将 Spring Boot 应用程序部署到任何兼容 Servlet 5.0+ 的容器中

### **GraalVM 原生镜像**

Spring Boot 应用程序可以使用 GraalVM 22.3 或更高版本转换为原生镜像。

可以通过 GraalVM 提供的 native-image 工具或 Gradle/Maven 的原生构建插件来创建镜像。此外，还可以使用 Paketo buildpack 的 native-image 功能来生成原生镜像。

支持的 GraalVM 版本包括：

| Name | Version |
|-|-|
| GraalVM Community | 22.3 |
| Native Build Tools | 0.10.3 |

## 安装 SpringBoot

Spring Boot 可以与 ‘经典’ Java 开发工具一起使用，也可以安装为命令行工具。无论选择哪种方式，您都需要 Java SDK v17 或更高版本。开始之前，可以使用以下命令检查 Java 版本：

```Bash
$ java -version
```

如果您是 Java 开发的新手或想试用 Spring Boot，建议先尝试 [Spring Boot CLI](https://docs.spring.io/spring-boot/installing.html#getting-started.installing.cli)（命令行工具）。否则，请继续阅读“经典”安装说明。

### **Java 开发人员的安装说明**

Spring Boot 可以像其他标准 Java 库一样使用。只需将合适的 `spring-boot-*.jar` 文件添加到类路径即可。Spring Boot 不需要任何特殊工具集成，因此您可以使用任何 IDE 或文本编辑器。Spring Boot 应用程序的运行和调试方式与普通 Java 程序相同。

尽管可以手动复制 Spring Boot JAR 文件，我们通常建议使用支持依赖管理的构建工具（如 Maven 或 Gradle）。

#### **Maven 安装**

Spring Boot 兼容 Apache Maven 3.6.3 及更高版本。如果尚未安装 Maven，可按照 [maven.apache.org](https://maven.apache.org/) 的说明进行安装。

::: tip 💡
在许多操作系统中，可以使用包管理器安装 Maven。例如：
- macOS 使用 Homebrew：`brew install maven`
- Ubuntu 用户：`sudo apt-get install maven`
- Windows 用户（使用 [Chocolatey](https://chocolatey.org/)）：在管理员权限下运行 `choco install maven`
:::

Spring Boot 依赖使用 `org.springframework.boot` 组 ID。典型的 Maven POM 文件从 `spring-boot-starter-parent` 项目继承，并声明一个或多个 [starter](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.starters) 依赖项。Spring Boot 还提供了一个可选的 [Maven 插件](https://docs.spring.io/spring-boot/maven-plugin/index.html)，用于创建可执行的 JAR 文件。

更多关于 Spring Boot 和 Maven 的入门信息可以在 [Maven 插件的参考指南](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/html/) 中找到。

#### **Gradle 安装**

Spring Boot 兼容 Gradle 7.x（7.5 或更高版本）和 8.x。如果尚未安装 Gradle，可按照 [gradle.org](https://gradle.org/) 的说明进行安装。

Spring Boot 依赖项可以通过 org.springframework.boot 组声明。项目通常会声明一个或多个 starter 依赖项。Spring Boot 提供了一个实用的 Gradle 插件，用于简化依赖声明并创建可执行的 JAR 文件。

::: tip 💡
**Gradle Wrapper**
Gradle Wrapper 提供了一种“获取” Gradle 的方式，以便在构建项目时使用。Wrapper 是一个小的脚本和库，您可以将其与代码一起提交以引导构建过程。详情请参阅 [Gradle Wrapper 用户指南](https://docs.gradle.org/current/userguide/gradle_wrapper.html)。
更多关于 Spring Boot 和 Gradle 的入门信息可以在 [Gradle 插件的参考指南](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) 中找到。
:::

### **安装 Spring Boot CLI**

Spring Boot CLI 是一个命令行工具，可以快速原型开发 Spring 应用程序。虽然使用 Spring Boot 不需要 CLI，但它是快速启动 Spring 应用程序的便捷方式，无需 IDE。

#### **手动安装**

您可以从以下位置下载 Spring CLI 发行版：

- [spring-boot-cli-3.3.5-bin.zip](https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/3.3.5/spring-boot-cli-3.3.5-bin.zip)
- [spring-boot-cli-3.3.5-bin.tar.gz](https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/3.3.5/spring-boot-cli-3.3.5-bin.tar.gz)

下载后，解压文件，并按照 [INSTALL.txt](https://raw.githubusercontent.com/spring-projects/spring-boot/v3.3.5/spring-boot-project/spring-boot-tools/spring-boot-cli/src/main/content/INSTALL.txt) 中的说明操作。解压后的文件夹中 `bin/` 目录下有一个 `spring` 脚本（Windows 为 `spring.bat`），也可以使用 `java -jar` 命令运行 `.jar` 文件（脚本可帮助您正确设置类路径）。

#### **使用 SDKMAN! 安装**

SDKMAN! (The Software Development Kit Manager) 是一个软件开发工具包管理器，可用于管理多个二进制 SDK 版本，包括 Groovy 和 Spring Boot CLI。通过 [sdkman.io](https://sdkman.io/) 获取 SDKMAN!，并使用以下命令安装 Spring Boot：

```Bash
$ sdk install springboot
$ spring --version
Spring CLI v3.3.5
```

如果开发 CLI 功能并希望使用您构建的版本，可以使用以下命令：

```Bash
$ sdk install springboot dev /path/to/spring-boot/spring-boot-cli/target/spring-boot-cli-3.3.5-bin/spring-3.3.5/
$ sdk default springboot dev
$ spring --version
Spring CLI v3.3.5
```

上述指令安装了名为 `dev` 的本地 `spring` 实例，指向您的目标构建位置，因此每次重新构建 Spring Boot 时，`spring` 都会保持最新。

可以通过以下命令查看版本列表：

```Bash
$ sdk ls springboot

================================================================================
Available Springboot Versions
================================================================================
> + dev
* 3.3.5

================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
```

#### **macOS Homebrew 安装**

如果您使用 macOS 和 Homebrew，可通过以下命令安装 Spring Boot CLI：

```Bash
$ brew tap spring-io/tap
$ brew install spring-boot
```

Homebrew 会将 `spring` 安装到 `/usr/local/bin`

::: info ℹ️
如果未找到 formula(组件)，可能需要更新 Homebrew：`brew update`
:::

#### **MacPorts 安装**

如果您在 Mac 上使用 [MacPorts](https://www.macports.org/)，可通过以下命令安装 Spring Boot CLI：

```Bash
$ sudo port install spring-boot-cli
```

#### **命令行补全**

Spring Boot CLI 包括为 [BASH](https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29) 和 [zsh](https://en.wikipedia.org/wiki/Z_shell) 提供命令补全的脚本。可以手动 `source` 脚本（zsh 为 `_spring`），或将其放在您的个人或系统范围的 bash 补全初始化中。对于 Debian 系统，系统范围脚本位于 `<installation location>/shell-completion/<bash|zsh>` 中，启动新 shell 时会自动执行该目录中的所有脚本。使用 SDKMAN! 安装后，可以使用以下命令手动运行补全脚本：

```Bash
$ . ~/.sdkman/candidates/springboot/current/shell-completion/bash/spring
$ spring <HIT TAB HERE>
  encodepassword  help  init  shell  version
```

::: info ℹ️
通过 Homebrew 或 MacPorts 安装 Spring Boot CLI 时，命令行补全脚本会自动注册到 shell。
:::

#### **Windows Scoop 安装**

如果您在 Windows 上使用 [Scoop](https://scoop.sh/)，可以通过以下命令安装 Spring Boot CLI：

```Bash
$ scoop bucket add extras
$ scoop install springboot
```

Scoop 将 spring 安装到 `~/scoop/apps/springboot/current/bin`。

::: info ℹ️
如果未找到应用程序清单，可能需要更新 Scoop：`scoop update`
:::

## 升级 SpringBoot

关于如何从早期版本升级 Spring Boot 的说明，可以在项目 [Wiki](https://github.com/spring-projects/spring-boot/wiki) 上找到。请通过[发布说明](https://github.com/spring-projects/spring-boot/wiki#release-notes)中的链接，找到您希望升级到的版本。

升级说明通常是发布说明中的第一个项目。如果您的版本落后于多个版本，请确保也查看您跳过的版本的发布说明。

### **从 1.x 版本升级**

如果您是从 Spring Boot 1.x 版本升级，请查看项目 Wiki 上的[迁移指南](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide)，其中提供了详细的升级说明。同时，请查看[发布说明](https://github.com/spring-projects/spring-boot/wiki)，了解每个版本中的“新功能和亮点”。

### **升级到新功能版本**

在升级到新功能版本时，某些属性可能已被重命名或移除。Spring Boot 提供了一种方法，可以分析应用程序的环境并在启动时打印诊断信息，还可以在运行时暂时迁移属性。要启用此功能，请将以下依赖项添加到您的项目中：

```XML
<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-properties-migrator</artifactId>
        <scope>runtime</scope>
</dependency>
```

::: warning ⚠️
请注意，像 @PropertySource 这样在环境中较晚添加的属性将不会被考虑在内
:::

::: info ℹ️
完成迁移后，请确保从项目的依赖项中移除该模块
:::

### **升级 Spring Boot CLI**

要升级现有的 CLI 安装，请使用相应的包管理器命令（例如，`brew upgrade`）。如果您是手动安装 CLI，请按照[标准说明](https://docs.spring.io/spring-boot/installing.html#getting-started.installing.cli.manual-installation)进行操作，并记得更新您的 `PATH` 环境变量，删除任何旧的引用