---
description: '建议使用Maven或Gradle构建Spring Boot项目，以便利用其依赖管理、自动版本控制及MavenCentral仓库构件。Spring Boot提供精选依赖列表（spring-boot-dependencies），升级时依赖一致升级，也可手动覆盖版本。'
lastUpdated: '2026-06-20 12:15:19'
head:
  - - meta
    - name: 'og:title'
      content: '构建系统'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '建议使用Maven或Gradle构建Spring Boot项目，以便利用其依赖管理、自动版本控制及MavenCentral仓库构件。Spring Boot提供精选依赖列表（spring-boot-dependencies），升级时依赖一致升级，也可手动覆盖版本。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/build-system.html'
---
# 构建系统

强烈建议您选择支持[依赖管理](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.dependency-management)并能够使用 Maven Central 仓库中发布的构件的构建系统。我们推荐选择 Maven 或 Gradle。虽然可以让 Spring Boot 与其他构建系统（例如 Ant）一起工作，但这些系统的支持不够完善。

## 依赖管理

每个 Spring Boot 版本都会提供一个精心挑选的依赖项列表。在实践中，您不需要在构建配置中为这些依赖项指定版本，因为 Spring Boot 会自动管理。当您升级 Spring Boot 时，这些依赖项也会以一致的方式升级。

::: info ℹ️
如果需要，您仍然可以指定版本并覆盖 Spring Boot 的推荐设置。
:::

精选列表包含了所有可以与 Spring Boot 配合使用的 Spring 模块，以及一部分经过筛选的第三方库。该列表作为标准的材料清单（`spring-boot-dependencies`）提供，可用于 [Maven](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.maven) 和 [Gradle](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.gradle)

::: warning ⚠️
每个 Spring Boot 版本都与一个基础 Spring Framework 版本相关联。我们强烈建议您不要手动指定该版本
:::

## Maven

要了解如何在 Maven 中使用 Spring Boot，请参阅 Spring Boot 的 Maven 插件文档：

- [参考文档](https://docs.spring.io/spring-boot/maven-plugin/index.html)
- [API 文档](https://docs.spring.io/spring-boot/maven-plugin/api/java/index.html)

## Gradle

要了解如何在 Gradle 中使用 Spring Boot，请参阅 Spring Boot 的 Gradle 插件文档：

- [参考文档](https://docs.spring.io/spring-boot/gradle-plugin/index.html)
- [API 文档](https://docs.spring.io/spring-boot/gradle-plugin/api/java/index.html)

## Ant

可以使用 Apache Ant + Ivy 构建 Spring Boot 项目。`spring-boot-antlib` 的 “AntLib”模块也可用于帮助 Ant 创建可执行的 jar 文件。

要声明依赖项，一个典型的 `ivy.xml` 文件示例如下：

```XML
<ivy-module version="2.0">
        <info organisation="org.springframework.boot" module="spring-boot-sample-ant" />
        <configurations>
                <conf name="compile" description="everything needed to compile this module" />
                <conf name="runtime" extends="compile" description="everything needed to run this module" />
        </configurations>
        <dependencies>
                <dependency org="org.springframework.boot" name="spring-boot-starter"
                        rev="${spring-boot.version}" conf="compile" />
        </dependencies>
</ivy-module>
```

一个典型的 `build.xml` 文件示例如下

```XML
<project
        xmlns:ivy="antlib:org.apache.ivy.ant"
        xmlns:spring-boot="antlib:org.springframework.boot.ant"
        name="myapp" default="build">

        <property name="spring-boot.version" value="3.3.5" />

        <target name="resolve" description="--> retrieve dependencies with ivy">
                <ivy:retrieve pattern="lib/[conf]/[artifact]-[type]-[revision].[ext]" />
        </target>

        <target name="classpaths" depends="resolve">
                <path id="compile.classpath">
                        <fileset dir="lib/compile" includes="*.jar" />
                </path>
        </target>

        <target name="init" depends="classpaths">
                <mkdir dir="build/classes" />
        </target>

        <target name="compile" depends="init" description="compile">
                <javac srcdir="src/main/java" destdir="build/classes" classpathref="compile.classpath" />
        </target>

        <target name="build" depends="compile">
                <spring-boot:exejar destfile="build/myapp.jar" classes="build/classes">
                        <spring-boot:lib>
                                <fileset dir="lib/runtime" />
                        </spring-boot:lib>
                </spring-boot:exejar>
        </target>
</project>
```

::: tip 💡
如果您不想使用 `spring-boot-antlib` 模块，请参阅 [从 Ant 构建可执行存档](https://docs.spring.io/spring-boot/how-to/build.html#howto.build.build-an-executable-archive-with-ant-without-using-spring-boot-antlib)（不使用 spring-boot-antlib）”部分
:::

## Starters

**Starters** 是一组方便的依赖描述符，您可以将其包含到您的应用程序中。这些 Starters 为您提供了一个一站式的解决方案，涵盖了所有 Spring 及相关技术所需的依赖，而无需去查找示例代码和复制粘贴大量的依赖描述符。例如，如果您想开始使用 Spring 和 JPA 进行数据库访问，可以在项目中包含 `spring-boot-starter-data-jpa` 依赖。

Starters 包含了启动项目所需的大部分依赖，使您能够快速启动并且拥有一组一致且受支持的管理传递依赖项

::: info 💭
**名字的含义**
所有官方的 Starter 遵循类似的命名规则：`spring-boot-starter-*`，其中 `*` 是应用程序的特定类型。这个命名结构旨在帮助您在需要时查找 Starter。在许多 IDE 中的 Maven 集成允许您通过名称搜索依赖。例如，安装了适当的 Eclipse 或 Spring Tools 插件后，您可以在 POM 编辑器中按 `ctrl+space`，然后输入 “spring-boot-starter” 来获取完整列表。
如“[**创建自己的 Starter**](https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html#features.developing-auto-configuration.custom-starter)”部分所述，第三方 Starter 不应以 spring-boot 开头，因为该前缀是为官方 Spring Boot 构件保留的。相反，第三方 Starter 通常以项目的名称开头。例如，一个名为 `thirdpartyproject` 的第三方 Starter 项目通常会命名为 `thirdpartyproject-spring-boot-starter`
:::

以下是 Spring Boot 提供的应用程序 Starter，位于 `org.springframework.boot` 组下：

Spring Boot Application Starters

| **名称** | **描述** |
|-|-|
| **spring-boot-starter** | 核心启动器，包括自动配置支持、日志记录和 YAML 支持 |
| **spring-boot-starter-activemq** | 用于 Apache ActiveMQ 的 JMS 消息传递启动器 |
| **spring-boot-starter-amqp** | 使用 Spring AMQP 和 Rabbit MQ 的启动器 |
| **spring-boot-starter-aop** | 使用 Spring AOP 和 AspectJ 的面向切面编程启动器 |
| **spring-boot-starter-artemis** | 用于 Apache Artemis 的 JMS 消息传递启动器 |
| **spring-boot-starter-batch** | 使用 Spring Batch 的启动器 |
| **spring-boot-starter-cache** | 使用 Spring Framework 缓存支持的启动器 |
| **spring-boot-starter-data-cassandra** | 使用 Cassandra 分布式数据库和 Spring Data Cassandra 的启动器 |
| **spring-boot-starter-data-cassandra-reactive** | 使用 Cassandra 分布式数据库和 Spring Data Cassandra Reactive 的启动器 |
| **spring-boot-starter-data-couchbase** | 使用 Couchbase 文档数据库和 Spring Data Couchbase 的启动器 |
| **spring-boot-starter-data-couchbase-reactive** | 使用 Couchbase 文档数据库和 Spring Data Couchbase Reactive 的启动器 |
| **spring-boot-starter-data-elasticsearch** | 使用 Elasticsearch 搜索和分析引擎以及 Spring Data Elasticsearch 的启动器 |
| **spring-boot-starter-data-jdbc** | 使用 Spring Data JDBC 的启动器 |
| **spring-boot-starter-data-jpa** | 使用 Spring Data JPA 和 Hibernate 的启动器 |
| **spring-boot-starter-data-ldap** | 使用 Spring Data LDAP 的启动器 |
| **spring-boot-starter-data-mongodb** | 使用 MongoDB 文档数据库和 Spring Data MongoDB 的启动器 |
| **spring-boot-starter-data-mongodb-reactive** | 使用 MongoDB 文档数据库和 Spring Data MongoDB Reactive 的启动器 |
| **spring-boot-starter-data-neo4j** | 使用 Neo4j 图形数据库和 Spring Data Neo4j 的启动器 |
| **spring-boot-starter-data-r2dbc** | 使用 Spring Data R2DBC 的启动器 |
| **spring-boot-starter-data-redis** | 使用 Redis 键值数据存储、Spring Data Redis 和 Lettuce 客户端的启动器 |
| **spring-boot-starter-data-redis-reactive** | 使用 Redis 键值数据存储、Spring Data Redis Reactive 和 Lettuce 客户端的启动器 |
| **spring-boot-starter-data-rest** | 使用 Spring Data REST 和 Spring MVC 将 Spring Data 存储库暴露为 REST 的启动器 |
| **spring-boot-starter-freemarker** | 使用 FreeMarker 视图构建 MVC Web 应用程序的启动器 |
| **spring-boot-starter-graphql** | 使用 Spring GraphQL 构建 GraphQL 应用程序的启动器 |
| **spring-boot-starter-groovy-templates** | 使用 Groovy Templates 视图构建 MVC Web 应用程序的启动器 |
| **spring-boot-starter-hateoas** | 使用 Spring MVC 和 Spring HATEOAS 构建基于超媒体的 RESTful Web 应用程序的启动器 |
| **spring-boot-starter-integration** | 使用 Spring Integration 的启动器 |
| **spring-boot-starter-jdbc** | 使用 HikariCP 连接池的 JDBC 启动器 |
| **spring-boot-starter-jersey** | 使用 JAX-RS 和 Jersey 构建 RESTful Web 应用程序的启动器（spring-boot-starter-web 的替代方案） |
| **spring-boot-starter-jooq** | 使用 jOOQ 通过 JDBC 访问 SQL 数据库的启动器（spring-boot-starter-data-jpa 或 spring-boot-starter-jdbc 的替代方案） |
| **spring-boot-starter-json** | 用于读取和写入 JSON 的启动器 |
| **spring-boot-starter-mail** | 使用 Java Mail 和 Spring Framework 邮件发送支持的启动器 |
| **spring-boot-starter-mustache** | 使用 Mustache 视图构建 Web 应用程序的启动器 |
| **spring-boot-starter-oauth2-authorization-server** | 使用 Spring Authorization Server 功能的启动器 |
| **spring-boot-starter-oauth2-client** | 使用 Spring Security 的 OAuth2/OpenID Connect 客户端功能的启动器 |
| **spring-boot-starter-oauth2-resource-server** | 使用 Spring Security 的 OAuth2 资源服务器功能的启动器 |
| **spring-boot-starter-pulsar** | 使用 Spring for Apache Pulsar 的启动器 |
| **spring-boot-starter-pulsar-reactive** | 使用 Spring for Apache Pulsar Reactive 的启动器 |
| **spring-boot-starter-quartz** | 使用 Quartz 调度器的启动器 |
| **spring-boot-starter-rsocket** | 构建 RSocket 客户端和服务器的启动器 |
| **spring-boot-starter-security** | 使用 Spring Security 的启动器 |
| **spring-boot-starter-test** | 使用 JUnit Jupiter、Hamcrest 和 Mockito 等库测试 Spring Boot 应用程序的启动器 |
| **spring-boot-starter-thymeleaf** | 使用 Thymeleaf 视图构建 MVC Web 应用程序的启动器 |
| **spring-boot-starter-validation** | 使用 Java Bean Validation 和 Hibernate Validator 的启动器 |
| **spring-boot-starter-web** | 使用 Spring MVC 构建 Web 应用程序，包括 RESTful 应用程序，默认使用 Tomcat 作为嵌入式容器 |
| **spring-boot-starter-web-services** | 使用 Spring Web Services 的启动器 |
| **spring-boot-starter-webflux** | 使用 Spring Framework 的 Reactive Web 支持构建 WebFlux 应用程序的启动器 |
| **spring-boot-starter-websocket** | 使用 Spring Framework 的 MVC WebSocket 支持构建 WebSocket 应用程序的启动器 |

以下是可以用来添加[生产就绪](https://docs.spring.io/spring-boot/how-to/actuator.html)功能的启动器

*Spring Boot production starters*

| **名称** | **描述** |
|-|-|
| **spring-boot-starter-actuator** | 使用 Spring Boot 的 Actuator 启动器，提供生产就绪功能，帮助您监控和管理应用程序 |

以下是如果您希望排除或替换特定技术方面，可以使用的 Spring Boot 启动器：

*Spring Boot technical starters*

| **名称** | **描述** |
|-|-|
| **spring-boot-starter-jetty** | 用于将 Jetty 作为嵌入式 Servlet 容器。是 [`spring-boot-starter-tomcat`](https://docs.spring.io/spring-boot/reference/using/build-systems.html#spring-boot-starter-tomcat) 的替代方案 |
| **spring-boot-starter-log4j2** | 用于使用 Log4j2 进行日志记录。是 [`spring-boot-starter-logging`](https://docs.spring.io/spring-boot/reference/using/build-systems.html#spring-boot-starter-logging) 的替代方案 |
| **spring-boot-starter-logging** | 使用 Logback 进行日志记录。默认的日志启动器 |
| **spring-boot-starter-reactor-netty** | 用于将 Reactor Netty 作为嵌入式反应式 HTTP 服务器 |
| **spring-boot-starter-tomcat** | 用于将 Tomcat 作为嵌入式 Servlet 容器。默认的 Servlet 容器启动器，由 [`spring-boot-starter-web`](https://docs.spring.io/spring-boot/reference/using/build-systems.html#spring-boot-starter-web) 使用 |
| **spring-boot-starter-undertow** | 用于将 Undertow 作为嵌入式 Servlet 容器。是 [`spring-boot-starter-tomcat`](https://docs.spring.io/spring-boot/reference/using/build-systems.html#spring-boot-starter-tomcat) 的替代方案 |

要了解如何替换技术方面，请参阅有关[替换 Web 服务器](https://docs.spring.io/spring-boot/how-to/webserver.html#howto.webserver.use-another)和[日志系统](https://docs.spring.io/spring-boot/how-to/logging.html#howto.logging.log4j)的操作文档。

::: tip 💡
有关更多社区贡献的启动器列表，请参阅 GitHub 上 spring-boot-starters 模块中的 [README 文件](https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-starters/README.adoc)。
:::