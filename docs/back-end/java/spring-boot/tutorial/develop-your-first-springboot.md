---
description: '本指南介绍如何开发第一个SpringBoot应用。包括使用Maven或Gradle设置项目、添加类路径依赖、编写含@RestController和@SpringBootApplication注解的代码、运行示例以及创建可执行Jar文件。'
lastUpdated: '2026-06-20 12:15:07'
head:
  - - meta
    - name: 'og:title'
      content: '开发你的第一个 SpringBoot 应用'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本指南介绍如何开发第一个SpringBoot应用。包括使用Maven或Gradle设置项目、添加类路径依赖、编写含@RestController和@SpringBootApplication注解的代码、运行示例以及创建可执行Jar文件。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/tutorial/develop-your-first-springboot.html'
---
# 开发你的第一个 SpringBoot 应用

本节描述了如何开发一个简单的 “Hello World!” Web 应用程序，以突出 Spring Boot 的一些关键功能。您可以选择使用 Maven 或 Gradle 作为构建系统

::: tip 💡
[Spring.io 网站](https://spring.io/)包含许多使用 Spring Boot 的 “快速入门” [指南](https://spring.io/guides)。如果您需要解决特定问题，请首先查看这些指南。
您可以通过访问 [start.spring.io](https://start.spring.io/) 并从依赖项搜索中选择 “Web” starter 来简化以下步骤。这样可以生成一个新的项目结构，使您可以[立即开始编写代码](https://docs.spring.io/spring-boot/tutorial/first-application/index.html#getting-started.first-application.code)。有关更多详细信息，请参阅 [start.spring.io 用户指南](https://start.spring.io/user-guide)
:::

## **前提条件**

在开始之前，打开终端并运行以下命令，确保已安装有效版本的 Java：

```Bash
$ java -version
openjdk version "17.0.4.1" 2022-08-12 LTS
OpenJDK Runtime Environment (build 17.0.4.1+1-LTS)
OpenJDK 64-Bit Server VM (build 17.0.4.1+1-LTS, mixed mode, sharing)
```

::: info ℹ️
该示例需要在单独的目录中创建。以下说明假定您已经创建了一个合适的目录，并且它是当前目录
:::

### **使用 Maven 设置项目**

如果您想使用 Maven，请确保已安装 Maven：

```Bash
$ mvn -v
Apache Maven 3.8.5 (3599d3414f046de2324203b78ddcf9b5e4388aa0)
Maven home: usr/Users/developer/tools/maven/3.8.5
Java version: 17.0.4.1, vendor: BellSoft, runtime: /Users/developer/sdkman/candidates/java/17.0.4.1-librca
```

### **使用 Gradle 设置项目**

如果您想使用 Gradle，请确保已安装 Gradle：

```Bash
$ gradle --version

------------------------------------------------------------
Gradle 8.1.1
------------------------------------------------------------

Build time:   2023-04-21 12:31:26 UTC
Revision:     1cf537a851c635c364a4214885f8b9798051175b

Kotlin:       1.8.10
Groovy:       3.0.15
Ant:          Apache Ant(TM) version 1.10.11 compiled on July 10 2021
JVM:          17.0.7 (BellSoft 17.0.7+7-LTS)
OS:           Linux 6.2.12-200.fc37.aarch64 aarch64
```

## **使用 Maven 创建项目**

开始时需要创建一个 Maven `pom.xml` 文件。此文件是用于构建项目的 “配方”。在您喜欢的文本编辑器中添加以下内容：

```XML
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>com.example</groupId>
        <artifactId>myproject</artifactId>
        <version>0.0.1-SNAPSHOT</version>

        <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>3.3.5</version>
        </parent>

        <!-- Additional lines to be added here... -->

</project>
```

前面的清单应该能给你一个可用的构建版本。

你可以通过运行 `mvn package` 来测试（目前，你可以忽略 “jar will be empty - no content was marked for inclusion!” 的警告）

::: info ℹ️
此时，你可以将项目导入到 IDE 中（大多数现代 Java IDE 都内置了对 Maven 的支持）。为了简便起见，我们在这个示例中继续使用纯文本编辑器
:::

## **使用 Gradle 创建项目**

开始时需要创建一个 Gradle build.gradle 文件。此文件是用于构建项目的脚本。在您喜欢的文本编辑器中添加以下内容：

```Groovy
plugins {
        id 'java'
        id 'org.springframework.boot' version '3.3.5'
}

apply plugin: 'io.spring.dependency-management'

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
        mavenCentral()
}

dependencies {
}
```

前面的清单应该能给你一个可用的构建版本。你可以通过运行 `gradle classes` 来测试

::: info ℹ️
此时，你可以将项目导入到 IDE 中（大多数现代 Java IDE 都内置了对 Gradle 的支持）。为了简便起见，我们在这个示例中继续使用纯文本编辑器。
:::

## **添加类路径依赖**

Spring Boot 提供了多个 starter，允许你将 jar 包添加到类路径中。Starters 提供了在开发特定类型应用程序时可能需要的依赖项。

### **Maven**

大多数 Spring Boot 应用程序在 POM 文件的 `parent` 部分使用 `spring-boot-starter-parent`。`spring-boot-starter-parent` 是一个特殊的 starter，它提供了有用的 Maven 默认设置。它还提供了一个 [`dependency-management`](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.dependency-management) 部分，允许你省略“受信任”依赖项的 `version` 标签。

由于我们正在开发一个 Web 应用程序，我们添加一个 `spring-boot-starter-web` 依赖项。在此之前，我们可以通过运行以下命令来查看当前的依赖：

```Bash
$ mvn dependency:tree

[INFO] com.example:myproject:jar:0.0.1-SNAPSHOT
```

`mvn dependency:tree` 命令会打印出项目依赖的树形结构。你可以看到，`spring-boot-starter-parent` 本身没有提供任何依赖项。为了添加必要的依赖项，编辑你的 `pom.xml` 文件，并在 `parent` 部分下面立即添加 `spring-boot-starter-web` 依赖项：

```XML
<dependencies>
        <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
</dependencies>
```

再次运行 `mvn dependency:tree` 后，你会看到有许多附加的依赖项，包括 Tomcat Web 服务器和 Spring Boot 本身。

### **Gradle**

大多数 Spring Boot 应用程序使用 `org.springframework.boot` Gradle 插件。这个插件提供了有用的默认设置和 Gradle 任务。`io.spring.dependency-management` Gradle 插件提供依赖管理，允许你省略“受信任”依赖项的版本标签

由于我们正在开发一个 Web 应用程序，我们添加一个 `spring-boot-starter-web` 依赖项。在此之前，我们可以通过运行以下命令来查看当前的依赖：

```XML
$ gradle dependencies

> Task :dependencies

------------------------------------------------------------
Root project 'myproject'
------------------------------------------------------------
```

`gradle dependencies` 命令会打印出项目依赖的树形结构。目前，项目没有任何依赖项。为了添加必要的依赖项，编辑你的 `build.gradle` 文件，并在 `dependencies` 部分添加 `spring-boot-starter-web` 依赖项：

```Groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}
```

再次运行 `gradle dependencies` 后，你会看到有许多附加的依赖项，包括 Tomcat Web 服务器和 Spring Boot 本身。

## **编写代码**

要完成我们的应用程序，我们需要创建一个单一的 Java 文件。默认情况下，Maven 和 Gradle 会从 `src/main/java` 目录编译源代码，所以你需要创建该目录结构，并添加一个名为 `src/main/java/MyApplication.java` 的文件，文件内容如下：

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class MyApplication {

        @RequestMapping("/")
        String home() {
                return "Hello World!";
        }

        public static void main(String[] args) {
                SpringApplication.run(MyApplication.class, args);
        }

}
```

虽然这里的代码不多，但实际上发生了很多事情。我们将在接下来的几个部分中逐步讲解其中的重要部分

### **@RestController 和 @RequestMapping 注解**

我们 `MyApplication` 类上的第一个注解是 `@RestController`。这被称为 **构造型注解 (*stereotype*)**。它为阅读代码的人和 Spring 提供了提示，表明该类扮演着特定的角色。在这种情况下，我们的类是一个 web `@Controller`，因此 Spring 在处理传入的 web 请求时会考虑到它。

`@RequestMapping` 注解提供了 **“路由”** 信息。它告诉 Spring，任何带有 `/` 路径的 HTTP 请求都应该映射到 `home` 方法。`@RestController` 注解告诉 Spring 将结果字符串直接返回给调用者，而不是返回视图（像传统的 MVC 控制器那样）

::: info ℹ️
`@RestController` 和 `@RequestMapping` 注解是 **Spring MVC** 注解，它们并非 Spring Boot 特有。有关更多详细信息，请参阅 Spring 参考文档中的 [**MVC**](https://docs.spring.io/spring-framework/reference/6.1/web/webmvc.html)[ 部分](https://docs.spring.io/spring-framework/reference/6.1/web/webmvc.html)
:::

### **@SpringBootApplication 注解**

第二个类级别的注解是 `@SpringBootApplication`。这个注解被称为 **元注解**，它结合了 `@SpringBootConfiguration`、`@EnableAutoConfiguration` 和 `@ComponentScan`。

其中，我们在这里最感兴趣的是 `@EnableAutoConfiguration`。`@EnableAutoConfiguration` 告诉 Spring Boot 根据你添加的 jar 依赖项来“猜测”你希望如何配置 Spring。由于 `spring-boot-starter-web` 添加了 Tomcat 和 Spring MVC，自动配置假定你正在开发一个 web 应用程序，并相应地设置 Spring

**启动器和自动配置**

自动配置旨在与启动器（Starters）很好地配合工作，但这两个概念并不是直接相关的。你可以自由选择在启动器之外的 jar 依赖项，Spring Boot 仍会尽最大努力自动配置你的应用程序。

### **main 方法**

我们应用程序的最后一部分是 `main` 方法。这是一个遵循 Java 应用程序入口点约定的标准方法。我们的 `main` 方法通过调用 `run` 委托给 Spring Boot 的 `SpringApplication` 类。`SpringApplication` 启动我们的应用程序，启动 Spring，进而启动自动配置的 Tomcat web 服务器。我们需要将 `MyApplication.class` 作为参数传递给 run 方法，以告诉 SpringApplication 哪个是主要的 Spring 组件。`args` 数组也会被传递，以暴露任何命令行参数

## **运行示例**

### Maven

此时，您的应用程序应该已经可以正常运行。由于您使用了 `spring-boot-starter-parent` POM，您可以利用其中提供的有用的运行目标来启动应用程序。只需在项目根目录中输入以下命令即可启动应用程序：

```Bash
$ mvn spring-boot:run

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::  (v3.3.5)
....... . . .
....... . . . (log output here)
....... . . .
........ Started MyApplication in 0.906 seconds (process running for 6.514)
```

如果您在 web 浏览器中打开 localhost:8080，您应该会看到以下输出：

```Bash
Hello World!
```

要优雅地退出应用程序，请按 `Ctrl + C`。

### Gradle

此时，应用程序应该可以正常运行。由于使用了 `org.springframework.boot` Gradle 插件，您可以利用其中提供的有用的 `bootRun` 目标来启动应用程序。在项目根目录中输入以下命令即可启动应用程序：

```Bash
$ gradle bootRun

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::  (v3.3.5)
....... . . .
....... . . . (log output here)
....... . . .
........ Started MyApplication in 0.906 seconds (process running for 6.514)
```

打开浏览器访问 localhost:8080，您应能看到输出：

```Bash
Hello World!
```

要优雅地退出应用程序，请按 `Ctrl + C`。

## **创建可执行 Jar**

我们通过创建一个完全自包含的可执行 jar 文件来完成示例，该文件可以在生产环境中运行。**可执行 jar**（有时称为 “uber jar” 或 “fat jar”）是包含已编译的类以及代码运行所需的所有 jar 依赖项的归档文件

::: tip 💡
**可执行 jar 与 Java**
Java 并不提供一种标准方式来加载嵌套的 jar 文件（即包含在另一个 jar 内的 jar 文件）。如果您希望分发一个自包含的应用程序，这可能会成为一个问题。
为了解决这个问题，许多开发者会使用 **uber jar**。一个 uber jar 会将应用程序所有依赖项中的所有类打包进一个单一的归档文件中。然而，这种方法的问题在于，应用程序中包含的库可能不易识别。此外，如果不同的 jar 中存在相同文件名（但内容不同），也可能会导致冲突。
Spring Boot 采用了一种[不同的方法](https://docs.spring.io/spring-boot/specification/executable-jar/index.html)，它允许您直接嵌套 jar 文件。
:::

### **Maven**

要创建可执行的 jar 文件，我们需要将 `spring-boot-maven-plugin` 添加到 `pom.xml` 文件中。在 `<dependencies>` 部分的下面插入以下代码：

```XML
<build>
        <plugins>
                <plugin>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-maven-plugin</artifactId>
                </plugin>
        </plugins>
</build>
```

::: info ℹ️
`spring-boot-starter-parent` POM 包含了 `<executions>` 配置，以绑定 `repackage` 目标。如果您没有使用父 POM，需要自行声明此配置。更多详细信息请参见[插件文档](https://docs.spring.io/spring-boot/maven-plugin/getting-started.html)。
:::

保存 `pom.xml` 并在命令行中运行 `mvn package`：

```Bash
$ mvn package

[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building myproject 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] .... ..
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ myproject ---
[INFO] Building jar: /Users/developer/example/spring-boot-example/target/myproject-0.0.1-SNAPSHOT.jar
[INFO]
[INFO] --- spring-boot-maven-plugin:3.3.5:repackage (default) @ myproject ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

运行完成后，查看 `target` 目录，您应该能看到名为 `myproject-0.0.1-SNAPSHOT.jar` 的文件，大小约为 18 MB。您可以使用以下命令查看 jar 文件内容：

```Bash
$ jar tvf target/myproject-0.0.1-SNAPSHOT.jar
```

在 target 目录中还会有一个较小的文件 `myproject-0.0.1-SNAPSHOT.jar.original`，这是 Maven 创建的原始 jar 文件，在被 Spring Boot 重新打包之前生成的。

要运行该应用程序，请使用 `java -jar` 命令：

```Bash
$ java -jar target/myproject-0.0.1-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::  (v3.3.5)
....... . . .
....... . . . (log output here)
....... . . .
........ Started MyApplication in 0.999 seconds (process running for 1.253)
```

与之前一样，按 Ctrl + C 可退出应用程序

### **Gradle**

要创建可执行的 jar 文件，我们需要在命令行中运行 `gradle bootJar`：

```Bash
$ gradle bootJar

BUILD SUCCESSFUL in 639ms
3 actionable tasks: 3 executed
```

构建成功后，查看 `build/libs` 目录，您应该能看到名为 `myproject-0.0.1-SNAPSHOT.jar` 的文件，大小约为 18 MB。要查看该 jar 文件的内容，可以使用以下命令：

```Bash
$ jar tvf build/libs/myproject-0.0.1-SNAPSHOT.jar
```

要运行该应用程序，请使用 `java -jar` 命令：

```Bash
$ java -jar build/libs/myproject-0.0.1-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::  (v{version-spring-boot})
....... . . .
....... . . . (log output here)
....... . . .
........ Started MyApplication in 0.999 seconds (process running for 1.253)
```

同样，按 Ctrl + C 可退出应用程序