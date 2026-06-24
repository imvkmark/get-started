---
description: '提供日志格式、控制台多彩输出、文件输出与轮转、日志级别、日志组、关闭钩子、自定义配置及Logback与Log4j2扩展。支持指定配置文件、环境属性与系统属性，实现灵活高效的日志管理。'
lastUpdated: '2026-06-20 12:16:01'
head:
  - - meta
    - name: 'og:title'
      content: '日志'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供日志格式、控制台多彩输出、文件输出与轮转、日志级别、日志组、关闭钩子、自定义配置及Logback与Log4j2扩展。支持指定配置文件、环境属性与系统属性，实现灵活高效的日志管理。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/log.html'
---
# 日志

Spring Boot 使用 [Commons Logging](https://commons.apache.org/logging) 作为所有内部日志记录的实现，但将底层日志实现留给用户自行选择。默认配置支持 [Java Util Logging](https://docs.oracle.com/en/java/javase/17/docs/api/java.logging/java/util/logging/package-summary.html)、[Log4j2](https://logging.apache.org/log4j/2.x/) 和 [Logback](https://logback.qos.ch/)。在每种情况下，日志记录器都被预配置为使用控制台输出，并且可选地支持文件输出

默认情况下，如果你使用了 Spring Boot 的 starter，日志记录将使用 Logback。还包括了适当的 Logback 路由，以确保依赖的库（如使用 Java Util Logging、Commons Logging、Log4J 或 SLF4J 的库）都能正确工作。

::: tip 💡
Java 有很多日志框架可供选择。如果你觉得上面的列表有些令人困惑，不用担心。通常情况下，你无需更改日志依赖项，Spring Boot 的默认日志配置已经足够使用。
:::

::: tip 💡
当你将应用部署到 Servlet 容器或应用服务器时，使用 Java Util Logging API 进行的日志记录不会被路由到你的应用日志中。这可以防止由容器或其他已部署到容器中的应用生成的日志出现在你的应用日志中。
:::

## 日志格式

Spring Boot 的默认日志输出如下所示

```Plaintext
2024-10-24T12:02:42.179Z  INFO 112052 --- [myapp] [           main] o.s.b.d.f.logexample.MyApplication       : Starting MyApplication using Java 17.0.13 with PID 112052 (/opt/apps/myapp.jar started by myuser in /opt/apps/)
2024-10-24T12:02:42.211Z  INFO 112052 --- [myapp] [           main] o.s.b.d.f.logexample.MyApplication       : No active profile set, falling back to 1 default profile: "default"
2024-10-24T12:02:45.743Z  INFO 112052 --- [myapp] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2024-10-24T12:02:45.764Z  INFO 112052 --- [myapp] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2024-10-24T12:02:45.765Z  INFO 112052 --- [myapp] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.31]
2024-10-24T12:02:45.863Z  INFO 112052 --- [myapp] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2024-10-24T12:02:45.869Z  INFO 112052 --- [myapp] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 3429 ms
2024-10-24T12:02:47.030Z  INFO 112052 --- [myapp] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2024-10-24T12:02:47.049Z  INFO 112052 --- [myapp] [           main] o.s.b.d.f.logexample.MyApplication       : Started MyApplication in 6.238 seconds (process running for 7.345)
```

在 Spring Boot 的日志输出中，包含以下项目：

- **日期和时间**：精确到毫秒，便于排序
- **日志级别**：如 `ERROR`、`WARN`、`INFO`、`DEBUG` 或 `TRACE`
- **进程 ID**：表示当前应用程序的进程标识符
- **分隔符 (`—--`)**：用来区分实际的日志消息
- **应用程序名称**：如果设置了 `spring.application.name`，则会将应用名称输出，并且会用方括号括起来
- **线程名称**：用方括号括起来，可能会在控制台输出中被截断
- **关联 ID**：如果启用了追踪（tracing），则会输出相关的 ID（但在示例中未显示）
- **日志记录器名称**：通常是日志来源的类名（可能会缩写）
- **日志消息**：实际记录的日志信息

::: info ℹ️
Logback 不支持 `FATAL` 级别：它被映射为 `ERROR` 级别
:::

::: tip 💡
如果你已经设置了 `spring.application.name` 属性，但不希望它被日志记录，可以将 `logging.include-application-name` 设置为 `false`
:::

## 控制台输出

默认的日志配置会将日志消息实时输出到控制台。默认情况下，会记录 `ERROR` 级别、`WARN` 级别和 `INFO` 级别的消息。你还可以通过以下方式启用“调试”模式（debug mode）：启动应用时使用 `--debug` 参数：

```Bash
$ java -jar myapp.jar --debug
```

::: info ℹ️
或者在 `application.properties` 文件中指定 `debug=true`。
:::

启用调试模式后，一些核心日志记录器（如嵌入式容器、Hibernate 和 Spring Boot）的日志输出会包含更多信息。但启用调试模式并不会让应用记录所有 `DEBUG` 级别的消息

另外，你还可以通过以下方式启用“跟踪”模式（trace mode）：启动应用时使用 `--trace` 参数, 或者在 `application.properties` 文件中指定 `trace=true`

启用跟踪模式后，会为一些核心日志记录器（如嵌入式容器、Hibernate 模式生成，以及整个 Spring 生态系统）启用 TRACE 级别的日志记录

### 多彩输出

如果你的终端支持 ANSI，日志输出会使用颜色来提高可读性。你可以通过设置 `spring.output.ansi.enabled` 为支持的值来覆盖自动检测的结果

颜色编码是通过 `%clr` 转换词来配置的。最简单的情况下，转换器会根据日志级别对输出进行着色，如以下示例所示：

```Bash
%clr(%5p)
```

下面表格描定义了日志级别和颜色

| Level | Color |
|-|-|
| `FATAL` | Red |
| `ERROR` | Red |
| `WARN` | Yellow |
| `INFO` | Green |
| `DEBUG` | Green |
| `TRACE` | Green |

或者，你可以通过为转换器提供选项来指定使用的颜色或样式。例如，要将文本设置为黄色，可以使用以下配置：

```Plaintext
%clr(%d{yyyy-MM-dd'T'HH:mm:ss.SSSXXX}){yellow}
```

下边是支持的颜色格式

- `blue`
- `cyan`
- `faint`
- `green`
- `magenta`
- `red`
- `yellow`

## 文件输出

默认情况下，Spring Boot 仅将日志输出到控制台，不会写入日志文件。如果你希望在控制台输出之外还将日志写入文件，则需要设置 `logging.file.name` 或 `logging.file.path` 属性（例如，在 `application.properties` 文件中）。如果同时设置了这两个属性，`logging.file.path` 将被忽略，仅使用 `logging.file.name`

以下表格展示了 `logging.*` 属性如何一起使用：

| `logging.file.name` | `logging.file.path` | Description |
|-|-|-|
| *(none)* | *(none)* | 仅仅在控制台输出 |
| 指定文件 (例如, `my.log`) | *(none)* | 将日志写入 `logging.file.name` 指定的位置。该位置可以是绝对路径，也可以是相对于当前目录的相对路径 |
| *(none)* | 指定目录 (例如, `/var/log`) | 将日志写入 `logging.file.path` 指定的目录中的 `spring.log` 文件。该目录可以是绝对路径，也可以是相对于当前目录的相对路径 |
| 指定文件 | 指定目录 | 将日志写入 `logging.file.name` 指定的位置，并忽略 `logging.file.path`。该位置可以是绝对路径，也可以是相对于当前目录的相对路径 |

日志文件在达到 **10 MB** 时会进行轮换，并且与控制台输出一样，默认情况下会记录 **`ERROR` 级别**、**`WARN` 级别** 和 **`INFO` 级别** 的消息

::: tip 💡
日志属性独立于实际的日志基础设施。因此，特定的配置键（例如用于 Logback 的 `logback.configurationFile`）不由 Spring Boot 管理。
:::

## 文件轮转

如果使用 **Logback**，可以通过 `application.properties` 或 `application.yaml` 文件对日志轮换设置进行细化调整。对于其他日志系统，则需要直接配置轮换设置（例如，如果使用 Log4j2，可以添加 `log4j2.xml` 或 `log4j2-spring.xml` 文件）。

以下是支持的轮换策略属性：

| **名称** | **描述** |
|-|-|
| `logging.logback.rollingpolicy.file-name-pattern` | 创建日志归档文件时使用的文件名模式 |
| `logging.logback.rollingpolicy.clean-history-on-start` | 应用程序启动时是否执行日志归档文件的清理操作 |
| `logging.logback.rollingpolicy.max-file-size` | 单个日志文件在归档前的最大大小 |
| `logging.logback.rollingpolicy.total-size-cap` | 日志归档文件总占用空间的最大限制，超过该值时将删除旧的归档文件 |
| `logging.logback.rollingpolicy.max-history` | 保留的最大归档日志文件数量（默认为 7） |

## 日志级别

所有支持的日志系统都可以通过 Spring `Environment`（例如，`application.properties`）设置日志级别。使用以下格式配置日志级别：`logging.level.<logger-name>=<level>`

其中 `<level>` 可以是 TRACE、DEBUG、INFO、WARN、ERROR、FATAL 或 OFF。

`root` 日志记录器可以通过 `logging.level.root` 进行配置。

以下是 `application.properties` 中的示例日志设置：

```Plaintext
logging.level.root=warn
logging.level.org.springframework.web=debug
logging.level.org.hibernate=error
```

还可以通过环境变量设置日志级别。例如：`LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_WEB=DEBUG`

会将 `org.springframework.web` 的日志级别设置为 `DEBUG`

::: info ℹ️
以上方法仅适用于基于包的日志配置。由于松散绑定总是将环境变量转换为小写，因此无法以这种方式为单个类配置日志。如果需要为某个类单独配置日志，可以使用 `SPRING_APPLICATION_JSON` 环境变量
:::

## 日志组

通常，将相关的日志记录器分组在一起，以便同时配置它们是很有用的。例如，您可能经常需要更改所有与 Tomcat 相关的日志记录器的日志级别，但记住顶级包名可能会比较困难

为了解决这个问题，Spring Boot 允许您在 Spring 环境中定义日志记录组。例如，您可以通过将以下内容添加到 `application.properties` 文件中来定义一个名为 “tomcat” 的组：

```Plaintext
logging.group.tomcat=org.apache.catalina,org.apache.coyote,org.apache.tomcat
```

通过定义日志记录组，您可以同时配置一组相关的日志记录器，简化日志配置的管理

```Plaintext
logging.level.tomcat=trace
```

Spring Boot 包含以下预定义的日志组，可以直接使用：

| Name | Loggers |
|-|-|
| web | `org.springframework.core.codec`, `org.springframework.http`, `org.springframework.web`, `org.springframework.boot.actuate.endpoint.web`, `org.springframework.boot.web.servlet.ServletContextInitializerBeans` |
| sql | `org.springframework.jdbc.core`, `org.hibernate.SQL`, `org.jooq.tools.LoggerListener` |

## 使用日志关闭钩子

为了在应用程序终止时释放日志资源，Spring Boot 提供了一个关闭钩子，该钩子将在 JVM 退出时触发日志系统的清理。除非您的应用程序作为 war 文件部署，否则此关闭钩子会自动注册。如果您的应用程序具有复杂的上下文层次结构，关闭钩子可能无法满足您的需求。如果不能满足，您可以禁用关闭钩子，并直接调查底层日志系统提供的选项。例如，Logback 提供了[上下文选择器](https://logback.qos.ch/manual/loggingSeparation.html)，可以让每个 Logger 在其自己的上下文中创建。您可以使用 `logging.register-shutdown-hook` 属性来禁用关闭钩子。将其设置为 `false` 将禁用注册。您可以在 `application.properties` 或 `application.yaml` 文件中设置此属性：

```Plaintext
logging.register-shutdown-hook=false
```

## 自定义日志配置

各种日志系统可以通过将适当的库包含到类路径中来激活，并可以通过在类路径的根目录或由以下 Spring `Environment` 属性 `logging.config` 指定的位置提供适当的配置文件来进一步定制。

您可以通过使用 `org.springframework.boot.logging.LoggingSystem` 系统属性强制 Spring Boot 使用特定的日志系统。该属性的值应为 `LoggingSystem` 实现的完全限定类名。您还可以通过将其设置为 `none` 来完全禁用 Spring Boot 的日志配置

::: info ℹ️
由于日志在创建 `ApplicationContext` **之前**已初始化，因此无法通过 Spring `@Configuration` 文件中的 `@PropertySources` 来控制日志。更改日志系统或完全禁用它的唯一方法是通过系统属性
:::

根据您的日志系统，以下文件会被加载：

| 日志系统 | 自定义 |
|-|-|
| Logback | `logback-spring.xml`, `logback-spring.groovy`, `logback.xml`, 或 `logback.groovy` |
| Log4j2 | `log4j2-spring.xml` 或 `log4j2.xml` |
| JDK (Java Util Logging) | `logging.properties` |

::: info ℹ️
在可能的情况下，我们建议您使用带有 `-spring` 后缀的日志配置（例如，使用 `logback-spring.xml` 而不是 `logback.xml`）。如果您使用标准的配置位置，Spring 将无法完全控制日志初始化。
:::

::: warning ⚠️
Java Util Logging 存在已知的类加载问题，在从“可执行 JAR”运行时会导致问题。我们建议您尽可能避免在从“可执行 JAR”运行时使用它。
:::

为了帮助自定义，其他一些属性被从 Spring 环境传输到系统属性中。这允许日志系统配置消费这些属性。例如，在 `application.properties` 中设置 `logging.file.name` 或将环境变量 `LOGGING_FILE_NAME` 设置为某个值，将导致设置 `LOG_FILE` 系统属性。传输的属性在下表中进行了描述：

| Spring 环境 | 系统属性 | 备注 |
|-|-|-|
| `logging.exception-conversion-word` | `LOG_EXCEPTION_CONVERSION_WORD` | 用于记录异常时的转换词 |
| `logging.file.name` | `LOG_FILE` | 如果定义了，则用于默认的日志配置 |
| `logging.file.path` | `LOG_PATH` | 如果定义了，则用于默认的日志配置 |
| `logging.pattern.console` | `CONSOLE_LOG_PATTERN` | 在控制台（标准输出）上使用的日志模式 |
| `logging.pattern.dateformat` | `LOG_DATEFORMAT_PATTERN` | 日志日期格式的附加器模式 |
| `logging.charset.console` | `CONSOLE_LOG_CHARSET` | 用于控制台日志记录的字符集 |
| `logging.threshold.console` | `CONSOLE_LOG_THRESHOLD` | 用于控制台日志记录的日志级别阈值 |
| `logging.pattern.file` | `FILE_LOG_PATTERN` | 在文件中使用的日志模式（如果启用了 `LOG_FILE`） |
| `logging.charset.file` | `FILE_LOG_CHARSET` | 用于文件日志记录的字符集（如果启用了 `LOG_FILE`） |
| `logging.threshold.file` | `FILE_LOG_THRESHOLD` | 用于文件日志记录的日志级别阈值 |
| `logging.pattern.level` | `LOG_LEVEL_PATTERN` | 渲染日志级别时使用的格式（默认是 `%5p`） |
| `PID` | `PID` | 当前进程的 ID（如果可能，并且在未作为操作系统环境变量定义时，会自动发现） |

如果你使用 logback, 以下属性同样会被转换

| Spring 环境 | 系统属性 | 备注 |
|-|-|-|
| `logging.logback.rollingpolicy.file-name-pattern` | `LOGBACK_ROLLINGPOLICY_FILE_NAME_PATTERN` | 归档日志文件名称的模式（默认值：`${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz`）。 |
| `logging.logback.rollingpolicy.clean-history-on-start` | `LOGBACK_ROLLINGPOLICY_CLEAN_HISTORY_ON_START` | 启动时是否清理归档日志文件。 |
| `logging.logback.rollingpolicy.max-file-size` | `LOGBACK_ROLLINGPOLICY_MAX_FILE_SIZE` | 最大日志文件大小。 |
| `logging.logback.rollingpolicy.total-size-cap` | `LOGBACK_ROLLINGPOLICY_TOTAL_SIZE_CAP` | 要保留的日志备份的总大小。 |
| `logging.logback.rollingpolicy.max-history` | `LOGBACK_ROLLINGPOLICY_MAX_HISTORY` | 要保留的最大归档日志文件数。 |

所有支持的日志系统在解析其配置文件时都可以查阅系统属性。有关示例，请查看 `spring-boot.jar` 中的默认配置：

- [Logback](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot/src/main/resources/org/springframework/boot/logging/logback/defaults.xml)
- [Log4j 2](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot/src/main/resources/org/springframework/boot/logging/log4j2/log4j2.xml)
- [Java Util logging](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot/src/main/resources/org/springframework/boot/logging/java/logging-file.properties)

::: tip 💡
如果您想在日志属性中使用占位符，应该使用 [Spring Boot 的语法](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.property-placeholders)，而不是底层框架的语法。特别是，如果您使用 Logback，应使用 `:` 作为属性名称和默认值之间的分隔符，而不是使用 `:-`
:::

::: tip 💡
您可以通过覆盖 `LOG_LEVEL_PATTERN`（或 Logback 中的 `logging.pattern.level`）来将 MDC 和其他临时内容添加到日志行中。例如，如果使用 `logging.pattern.level=user:%X{user} %5p`，则默认日志格式会包含一个 “user” 的 MDC 条目（如果存在）
:::

如下所示：

```Plaintext
2019-08-30 12:30:04.031 user:someone INFO 22174 --- [  nio-8080-exec-0] demo.Controller
Handling authenticated request
```

## Logback 扩展

Spring Boot 包括了若干个 Logback 扩展，这些扩展可以帮助进行高级配置。您可以在 `logback-spring.xml` 配置文件中使用这些扩展

::: tip 💡
由于标准的 `logback.xml` 配置文件加载得太早，您不能在其中使用这些扩展。您需要使用 `logback-spring.xml` 或定义一个 `logging.config` 属性
:::

::: warning ⚠️
这些扩展不能与 Logback 的配置扫描一起使用。如果尝试这样做，修改配置文件时将导致类似以下的错误被记录：
:::

```Plaintext
ERROR in ch.qos.logback.core.joran.spi.Interpreter@4:71 - no applicable action for [springProperty], current ElementPath is [[configuration][springProperty]]
ERROR in ch.qos.logback.core.joran.spi.Interpreter@4:71 - no applicable action for [springProfile], current ElementPath is [[configuration][springProfile]]
```

### 指定配置文件的配置

`<springProfile>` 标签允许您根据激活的 Spring 配置文件有选择地包含或排除配置部分。配置部分可以出现在 `<configuration>` 元素中的任何位置。使用 `name` 属性指定哪个配置文件接受该配置。`<springProfile>` 标签可以包含一个配置文件名称（例如 `staging`）或一个配置文件表达式。配置文件表达式允许表达更复杂的逻辑，例如 `production & (eu-central | eu-west)`。有关更多详细信息，请查阅 [Spring 框架参考指南](https://docs.spring.io/spring-framework/reference/6.1/core/beans/environment.html#beans-definition-profiles-java)。以下是三个示例配置文件的示例：

```XML
<springProfile name="staging">
        <!-- configuration to be enabled when the "staging" profile is active -->
</springProfile>

<springProfile name="dev | staging">
        <!-- configuration to be enabled when the "dev" or "staging" profiles are active -->
</springProfile>

<springProfile name="!production">
        <!-- configuration to be enabled when the "production" profile is not active -->
</springProfile>
```

### 环境属性

`<springProperty>` 标签允许您将 Spring `Environment` 中的属性暴露给 Logback 使用。如果您希望在 Logback 配置中访问 `application.properties` 文件中的值，这种做法非常有用。该标签的工作方式与 Logback 标准的 `<property>` 标签类似。不过，您不是直接指定一个值，而是指定属性的来源（来自 Spring 环境）。如果您需要将属性存储在本地作用域以外的位置，可以使用 `scope` 属性。如果需要回退值（当环境中未设置该属性时），可以使用 `defaultValue` 属性。以下示例展示了如何暴露属性以供 Logback 使用

```XML
<springProperty scope="context" name="fluentHost" source="myapp.fluentd.host"
                defaultValue="localhost"/>
<appender name="FLUENT" class="ch.qos.logback.more.appenders.DataFluentAppender">
        <remoteHost>${fluentHost}</remoteHost>
        ...
</appender>
```

::: info ℹ️
`<springProperty>` 标签中的 `source` 必须使用 kebab-case（如 `my.property-name`）格式指定。然而，属性可以通过使用宽松规则添加到 Spring 环境中
:::

## Log4j2 扩展

Spring Boot 提供了一些 Log4j2 扩展，可以帮助进行更高级的配置。您可以在任何 `log4j2-spring.xml` 配置文件中使用这些扩展。

::: info ℹ️
由于标准的 log4j2.xml 配置文件加载得太早，您无法在其中使用扩展。您需要使用 `log4j2-spring.xml` 文件，或者定义一个 `logging.config` 属性
:::

::: info ℹ️
这些扩展会取代 [Spring Boot 提供](https://logging.apache.org/log4j/2.x/log4j-spring-boot.html)的 Log4j 支持。因此，您应该确保在构建中不包含 `org.apache.logging.log4j:log4j-spring-boot` 模块
:::

### 指定配置文件的配置

`<SpringProfile>` 标签允许您根据活动的 Spring 配置文件（profiles）可选地包含或排除配置的某些部分。配置部分可以在 `<Configuration>` 元素中的任何位置使用。使用 `name` 属性来指定哪个配置文件接受该配置。`<SpringProfile>` 标签可以包含一个配置文件名称（例如 `staging`），也可以包含配置文件表达式。配置文件表达式允许更复杂的配置逻辑，例如 `production & (eu-central | eu-west)`。有关更多详细信息，请查阅 Spring Framework 参考指南。以下列出了三个示例配置文件：

```XML
<SpringProfile name="staging">
        <!-- configuration to be enabled when the "staging" profile is active -->
</SpringProfile>

<SpringProfile name="dev | staging">
        <!-- configuration to be enabled when the "dev" or "staging" profiles are active -->
</SpringProfile>

<SpringProfile name="!production">
        <!-- configuration to be enabled when the "production" profile is not active -->
</SpringProfile>
```

### 环境属性概览

如果您想在 Log4j2 配置中引用 Spring `Environment` 中的属性，可以使用 `spring:` 前缀的[查找方式](https://logging.apache.org/log4j/2.x/manual/lookups.html)。这样做对于在 Log4j2 配置中访问 `application.properties` 文件中的值非常有用。

以下示例展示了如何设置一个名为 `applicationName` 的 Log4j2 属性，该属性读取 Spring `Environment` 中的 `spring.application.name`

```XML
<Properties>
        <Property name="applicationName">${spring:spring.application.name}</Property>
</Properties>
```

::: info ℹ️
查找键应以 kebab case 格式指定（例如 `my.property-name`）
:::

### Log4j2 系统属性

Log4j2 支持许多可以用来配置不同项目的[系统属性](https://logging.apache.org/log4j/2.x/manual/systemproperties.html)。例如，`log4j2.skipJansi` 系统属性可以用来配置 `ConsoleAppender` 是否在 Windows 上尝试使用 [Jansi](https://github.com/fusesource/jansi) 输出流。

所有在 Log4j2 初始化之后加载的系统属性都可以从 Spring `Environment` 中获取。例如，您可以将 `log4j2.skipJansi=false` 添加到 `application.properties` 文件中，以便在 Windows 上使用 Jansi 输出流。

::: info ℹ️
当系统属性和操作系统环境变量中没有加载的值时，Spring `Environment` 才会被考虑
:::

::: warning ⚠️
在 Log4j2 初始化早期加载的系统属性无法引用 Spring `Environment` 。例如，Log4j2 用于选择默认 Log4j2 实现的属性，在 Spring 环境可用之前就已经被使用
:::