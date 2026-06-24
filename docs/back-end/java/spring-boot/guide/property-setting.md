---
description: '本文介绍了Spring Boot中属性和配置的多种方法，包括构建时自动展开、使用Maven/Gradle、外部化配置、更改属性文件位置、简短命令行参数、YAML定义、设置激活及默认Profile，以及根据环境更改配置和发现内置选项。'
lastUpdated: '2026-06-20 12:16:42'
head:
  - - meta
    - name: 'og:title'
      content: '属性和配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文介绍了Spring Boot中属性和配置的多种方法，包括构建时自动展开、使用Maven/Gradle、外部化配置、更改属性文件位置、简短命令行参数、YAML定义、设置激活及默认Profile，以及根据环境更改配置和发现内置选项。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/guide/property-setting.html'
---
# 属性和配置

本节包含有关设置和读取属性以及配置设置的主题，并介绍它们与 Spring Boot 应用程序的交互方式。

## **在构建时自动展开属性**

与其硬编码项目构建配置中已指定的一些属性，不如使用现有的构建配置来自动扩展这些属性。这在 Maven 和 Gradle 中都是可行的

### **使用 Maven 自动展开属性**

您可以通过使用资源过滤功能在 Maven 项目中自动扩展属性。如果您使用了 `spring-boot-starter-parent`，则可以使用 `@..@` 占位符引用 Maven 的“项目属性”。以下示例展示了这种用法：

```Plaintext
app.encoding=@project.build.sourceEncoding@
app.java.version=@java.version@
```

::: info ℹ️
只有生产配置会以这种方式进行过滤（换句话说，`src/test/resources` 不会应用过滤）。
:::

::: tip 💡
如果您启用了 `addResources` 标志，`spring-boot:run` 目标可以将 `src/main/resources` 直接添加到 classpath 中（用于热加载）。这样做会绕过资源过滤和此功能。相反，您可以使用 `exec:java` 目标或自定义插件的配置。有关更多详细信息，请参阅[插件使用页面](https://docs.spring.io/spring-boot/maven-plugin/using.html)
:::

如果你未使用 starter 父工程（starter parent），则需要在 `pom.xml` 文件的 `<build/>` 元素内包含以下内容：

```XML
<resources>
        <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
        </resource>
</resources>
```

你还需要在 `<plugins/>` 元素内包含以下内容

```XML
<plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-resources-plugin</artifactId>
        <version>2.7</version>
        <configuration>
                <delimiters>
                        <delimiter>@</delimiter>
                </delimiters>
                <useDefaultDelimiters>false</useDefaultDelimiters>
        </configuration>
</plugin>
```

::: info ℹ️
`useDefaultDelimiters` 属性在你在配置中使用标准 Spring 占位符（如 `${placeholder}`）时非常重要。如果该属性没有设置为 `false`，这些占位符可能会被构建过程被展开
:::

### **使用 Gradle 自动展开属性**

你可以通过配置 Gradle 项目的 Java 插件中的 `processResources` 任务来自动展开属性，如下例所示：

```Groovy
tasks.named('processResources') {
        expand(project.properties)
}
```

你可以通过使用占位符来引用 Gradle 项目的属性，如下例所示：

```Plaintext
app.name=${name}
app.description=${description}
```

::: info ℹ️
Gradle 的 expand 方法使用 Groovy 的 `SimpleTemplateEngine`，它会转换 `${..}` 这样的标记。`${..}` 样式与 Spring 自身的属性占位符机制冲突。为了同时使用 Spring 属性占位符和自动扩展，应该像下面这样转义 Spring 属性占位符：`\${..}`
:::

## **外部化 SpringApplication 的配置**

`SpringApplication` 有 bean 属性设置器，因此在创建应用程序时，你可以使用其 Java API 来修改其行为。或者，你也可以通过在 `spring.main.*` 中设置属性来外部化配置。例如，在 `application.properties` 中，你可能会有以下设置：

```Plaintext
spring.main.web-application-type=none
spring.main.banner-mode=off
```

这样，Spring Boot 的启动横幅将不会打印出来，且应用程序不会启动嵌入式 web 服务器。

在外部配置中定义的属性将覆盖并替代使用 Java API 指定的值，唯一的例外是主源（primary sources）。主源是指提供给 `SpringApplication` 构造函数的那些源

```Java
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {

        public static void main(String[] args) {
                SpringApplication application = new SpringApplication(MyApplication.class);
                application.setBannerMode(Banner.Mode.OFF);
                application.run(args);
        }

}
```

或者，也可以使用 `SpringApplicationBuilder` 的 `sources(...)` 方法：

```Java
import org.springframework.boot.Banner;
import org.springframework.boot.builder.SpringApplicationBuilder;

public class MyApplication {

        public static void main(String[] args) {
                new SpringApplicationBuilder()
                        .bannerMode(Banner.Mode.OFF)
                        .sources(MyApplication.class)
                        .run(args);
        }

}
```

根据上述示例，如果我们有以下配置：

```Plaintext
spring.main.sources=com.example.MyDatabaseConfig,com.example.MyJmsConfig
spring.main.banner-mode=console
```

实际应用将显示横幅（如配置所覆盖的）并使用三个应用上下文源。应用源为：

- `MyApplication`（来自代码）
- `MyDatabaseConfig`（来自外部配置）
- `MyJmsConfig`（来自外部配置）

## **更改应用的外部属性文件位置**

默认情况下，来自不同源的属性会按定义的顺序添加到 Spring 环境中（有关确切顺序，请参见 “Spring Boot 特性” 部分中的配置外部化 ）。

你还可以提供以下系统属性（或环境变量）来改变行为：

- `spring.config.name`（`SPRING_CONFIG_NAME`）：默认值为 `application`，作为文件名的根
- `spring.config.location`（`SPRING_CONFIG_LOCATION`）：要加载的文件（例如 classpath 资源或 URL）。为此文档设置了一个单独的 `Environment` 属性源，可以通过系统属性、环境变量或命令行进行覆盖

无论你在环境中设置什么，Spring Boot 始终会加载 `application.properties`，如上所述。默认情况下，如果使用 YAML，则带有 `.yaml` 和 `.yml` 扩展名的文件也会被添加到列表中

::: tip 💡
如果你想了解正在加载的文件的详细信息，可以将 `org.springframework.boot.context.config` 的日志级别设置为 `trace`
:::

## **使用“简短”的命令行参数**

有些人喜欢使用（例如）`--port=9000`，而不是`--server.port=9000`，来在命令行中设置配置属性。你可以通过在 `application.properties` 中使用占位符来启用这种行为，如下例所示：

```Plaintext
server.port=${port:8080}
```

::: tip 💡
如果你继承了 `spring-boot-starter-parent` POM，`maven-resources-plugin` 的默认过滤令牌已从 `${*}` 更改为 `@`（即，使用 `@maven.token@` 而不是 `${maven.token}`），以防止与 Spring 风格的占位符发生冲突。如果你已经为 `application.properties` 启用了 Maven 过滤，你可能还需要更改默认的过滤令牌，以使用其他分隔符
:::

::: info ℹ️
在这种特定情况下，端口绑定可以在 PaaS 环境（如 Heroku 或 Cloud Foundry）中工作。在这两个平台上，`PORT` 环境变量会自动设置，Spring 可以绑定到大写的同义词，以匹配 Spring `Environment` 中的属性
:::

## **使用 YAML 定义外部属性**

YAML 是 JSON 的超集，因此它是以层次结构格式存储外部属性的便捷语法，如下例所示：

```YAML
spring:
  application:
    name: "cruncher"
  datasource:
    driver-class-name: "com.mysql.jdbc.Driver"
    url: "jdbc:mysql://localhost/test"
server:
  port: 9000
```

创建一个名为 `application.yaml` 的文件并将其放置在类路径的根目录下。然后将 `snakeyaml` 添加到你的依赖项中（如果使用 `spring-boot-starter`，已自动包含）。YAML 文件会被解析为一个 `Map<String, Object>`（类似于 JSON 对象），Spring Boot 会将该 map 扁平化，使其成为一个一级深的结构，并使用点分隔的键，正如许多人习惯于在 Java 的 Properties 文件中看到的那样。

上述 YAML 示例对应于以下 `application.properties` 文件：

```Plaintext
spring.application.name=cruncher
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost/test
server.port=9000
```

请查看“Spring Boot Features”部分的 Working With YAML章节，了解有关 YAML 的更多信息。

## **设置激活的 Spring Profiles**

Spring `Environment` 提供了一个 API 来处理这个问题，但通常你会设置一个系统属性（`spring.profiles.active`）或操作系统环境变量（`SPRING_PROFILES_ACTIVE`）。此外，你也可以通过 `-D` 参数启动应用程序（记得将其放在主类或 jar 文件之前），如下所示：

```Bash
$ java -jar -Dspring.profiles.active=production demo-0.0.1-SNAPSHOT.jar
```

在 Spring Boot 中，你也可以在 `application.properties` 中设置活动配置文件，如下所示

```Plaintext
spring.profiles.active=production
```

这种方式设置的值会被系统属性或环境变量的设置替代，但不会被 `SpringApplicationBuilder.profiles()` 方法替代。因此，可以使用后者的 Java API 来增强配置文件，而不改变默认设置。

更多信息请参见“Spring Boot Features”部分的 配置文件 章节

## **设置默认的 Profile 名称**

默认配置文件是在没有激活任何配置文件时启用的配置文件。默认情况下，默认配置文件的名称是 `default`，但可以通过系统属性 (`spring.profiles.default`) 或操作系统环境变量 (`SPRING_PROFILES_DEFAULT`) 来更改

在 Spring Boot 中，你还可以在 `application.properties` 中设置默认配置文件名称，如下所示：

```Plaintext
spring.profiles.default=dev
```

更多信息请参见“Spring Boot Features”部分的 配置文件 章节

## **根据环境更改配置**

Spring Boot 支持多文档 YAML 和 Properties 文件（有关详细信息，请参见 Working With Multi-Document Files ）。这些文件可以根据活动的配置文件条件进行激活

如果一个文档包含 `spring.config.activate.on-profile` 键，则配置文件的值（一个以逗号分隔的配置文件列表或配置文件表达式）会传入 Spring `Environment.acceptsProfiles()` 方法。如果配置文件表达式匹配，则该文档会被包含在最终合并中（否则不会），如下所示：

```Plaintext
server.port=9000
#---
spring.config.activate.on-profile=development
server.port=9001
#---
spring.config.activate.on-profile=production
server.port=0
```

在前面的示例中，默认端口是 `9000`。然而，如果活动的 Spring 配置文件是 `development`，则端口是 `9001`。如果是 `production` 配置文件，则端口为 `0`

::: info ℹ️
文档会按照它们被遇到的顺序进行合并。后面的值会覆盖前面的值。
:::

## **发现外部属性的内置选项**

Spring Boot 在运行时将外部属性绑定到应用程序中，这些属性来自 `application.properties`（或 YAML 文件及其他位置）。由于贡献可以来自 classpath 上的额外 JAR 文件，因此无法提供一个涵盖所有支持属性的完整列表。

启用了 Actuator 功能的运行应用程序具有一个 `configprops` 端点，可以显示所有通过 `@ConfigurationProperties` 绑定和可绑定的属性。

附录中包括了一个 `application.properties` 示例，其中列出了 Spring Boot 支持的最常见属性。权威的列表可以通过搜索源代码中的 `@ConfigurationProperties` 和 `@Value` 注解，以及偶尔使用的 Binder 来获得。有关加载属性的精确顺序，请参阅 配置外部化 部分