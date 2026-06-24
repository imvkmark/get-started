---
description: '应用可通过多种方式运行：在IDE中直接启动，或打包成独立应用执行；借助Maven或Gradle插件构建并运行；支持热替换功能，无需重启即可更新代码，提升开发效率。'
lastUpdated: '2026-06-20 12:15:36'
head:
  - - meta
    - name: 'og:title'
      content: '运行应用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '应用可通过多种方式运行：在IDE中直接启动，或打包成独立应用执行；借助Maven或Gradle插件构建并运行；支持热替换功能，无需重启即可更新代码，提升开发效率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/run-application.html'
---
# 运行应用

将应用程序打包为 jar 并使用嵌入式 HTTP 服务器的最大优势之一是可以像运行其他任何应用一样运行你的应用。这个优势也适用于调试 Spring Boot 应用程序，你不需要任何特殊的 IDE 插件或扩展。

::: info ℹ️
下面的选项最适合在本地运行应用进行开发。若用于生产环境，请参阅生产环境的应用打包部分。
:::

::: info ℹ️
本节只涉及基于 jar 的打包。如果选择将应用程序打包为 war 文件，请参考你的服务器和 IDE 文档。
:::

## **从 IDE 运行**

你可以在 IDE 中将 Spring Boot 应用作为 Java 应用程序运行。不过，首先需要导入项目。导入步骤因 IDE 和构建系统而异。大多数 IDE 可以直接导入 Maven 项目。例如，Eclipse 用户可以在 `File` 菜单中选择 `Import…` → `Existing Maven Projects` 。

如果无法将项目直接导入 IDE，可以使用构建插件生成 IDE 元数据。Maven 提供 [Eclipse](https://maven.apache.org/plugins/maven-eclipse-plugin/) 和 [IDEA](https://maven.apache.org/plugins/maven-idea-plugin/) 插件，Gradle 提供针对[各种 IDE](https://docs.gradle.org/current/userguide/userguide.html) 的插件

::: tip 💡
如果意外地运行了两次 Web 应用，则会出现“端口已被占用”错误。使用 Spring Tools 的用户可以点击“重新启动”按钮而不是“运行”按钮，以确保现有的实例被关闭
:::

## **作为打包的应用运行**

如果使用 Spring Boot Maven 或 Gradle 插件创建可执行 jar，可以使用 `java -jar` 命令来运行应用，如以下示例所示：

```Bash
$ java -jar target/myapplication-0.0.1-SNAPSHOT.jar
```

也可以在启用远程调试支持的情况下运行打包的应用，以便附加调试器到应用上，如下所示：

```Bash
$ java -agentlib:jdwp=server=y,transport=dt_socket,address=8000,suspend=n \
       -jar target/myapplication-0.0.1-SNAPSHOT.jar
```

## **使用 Maven 插件**

Spring Boot Maven 插件包含一个 `run` 目标，用于快速编译和运行应用。应用在 IDE 中以解压的形式运行。以下示例展示了运行 Spring Boot 应用的典型 Maven 命令：

```Bash
$ mvn spring-boot:run
```

你可能还想使用操作系统环境变量 MAVEN_OPTS，如下所示：

```Bash
$ export MAVEN_OPTS=-Xmx1024m
```

## **使用 Gradle 插件**

Spring Boot Gradle 插件也包含一个 `bootRun` 任务，用于以解压形式运行应用。当应用了 `org.springframework.boot` 和 `java` 插件时会添加 `bootRun` 任务，示例如下：

```Bash
$ gradle bootRun
```

你也可以使用操作系统环境变量 `JAVA_OPTS`，如下所示：

```Bash
$ export JAVA_OPTS=-Xmx1024m
```

## **热替换**

由于 Spring Boot 应用是纯 Java 应用，JVM 热替换功能可以直接使用。不过 JVM 热替换对可以替换的字节码有所限制。若需要更完整的解决方案，可以使用 [JRebel](https://www.jrebel.com/products/jrebel)。

`spring-boot-devtools` 模块还支持快速应用重启。有关详细信息，请参阅 “如何指南” 中的 [热替换](https://docs.spring.io/spring-boot/how-to/hotswapping.html) 部分