---
description: 'SpringApplication启动时可处理失败与延迟初始化，支持自定义启动横幅及流式构建器API。管理应用可用性状态（存活性与就绪性），并通过事件监听器响应生命周期。支持Web环境定制、访问应用参数，使用ApplicationRunner或CommandLineRunner执行启动逻辑。提供应用退出管理、启动跟踪及虚拟线程支持。'
lastUpdated: '2026-06-20 12:15:52'
head:
  - - meta
    - name: 'og:title'
      content: 'SpringApplication'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SpringApplication启动时可处理失败与延迟初始化，支持自定义启动横幅及流式构建器API。管理应用可用性状态（存活性与就绪性），并通过事件监听器响应生命周期。支持Web环境定制、访问应用参数，使用ApplicationRunner或CommandLineRunner执行启动逻辑。提供应用退出管理、启动跟踪及虚拟线程支持。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/spring-application.html'
---
# SpringApplication

`SpringApplication` 类提供了一种便捷的方式来引导从 `main()` 方法启动的 Spring 应用程序。在许多情况下，可以委托给静态方法 `SpringApplication.run`，如下示例所示：

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {

        public static void main(String[] args) {
                SpringApplication.run(MyApplication.class, args);
        }

}
```

当您的应用程序启动时，您应该会看到类似于以下的输出内容：

```Plaintext
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.3.5)

2024-10-24T12:03:05.386Z  INFO 112801 --- [           main] o.s.b.d.f.logexample.MyApplication       : Starting MyApplication using Java 17.0.13 with PID 112801 (/opt/apps/myapp.jar started by myuser in /opt/apps/)
2024-10-24T12:03:05.406Z  INFO 112801 --- [           main] o.s.b.d.f.logexample.MyApplication       : No active profile set, falling back to 1 default profile: "default"
2024-10-24T12:03:08.644Z  INFO 112801 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2024-10-24T12:03:08.685Z  INFO 112801 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2024-10-24T12:03:08.690Z  INFO 112801 --- [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.31]
2024-10-24T12:03:08.898Z  INFO 112801 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2024-10-24T12:03:08.900Z  INFO 112801 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 3244 ms
2024-10-24T12:03:10.275Z  INFO 112801 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2024-10-24T12:03:10.290Z  INFO 112801 --- [           main] o.s.b.d.f.logexample.MyApplication       : Started MyApplication in 5.964 seconds (process running for 7.025)
```

默认情况下，会显示 `INFO` 级别的日志消息，包括一些相关的启动细节，例如启动应用程序的用户。如果您需要不同于 `INFO` 的日志级别，可以按 [日志级别](https://docs.spring.io/spring-boot/reference/features/logging.html#features.logging.log-levels) 中所述进行设置。应用程序的版本是通过主应用程序类包的实现版本来确定的。可以通过将 `spring.main.log-startup-info` 设置为 `false` 来关闭启动信息日志记录，这也会关闭应用程序活动配置文件的日志记录

::: tip 💡
要在启动期间添加额外的日志记录，您可以在 `SpringApplication` 的子类中重写 `logStartupInfo(boolean)` 方法。
:::

## 启动失败

如果您的应用程序启动失败，已注册的 `FailureAnalyzers` 将有机会提供专门的错误消息和具体的解决方法。例如，如果您在端口 `8080` 上启动一个 Web 应用程序，而该端口已被占用，您应该会看到类似于以下的消息：

```Plaintext
***************************
APPLICATION FAILED TO START
***************************

Description:

Embedded servlet container failed to start. Port 8080 was already in use.

Action:

Identify and stop the process that is listening on port 8080 or configure this application to listen on another port.
```

::: info ℹ️
Spring Boot 提供了众多 FailureAnalyzer 实现，您也可以添加自己的实现
:::

如果没有任何 FailureAnalyzer 能够处理异常，您仍然可以显示完整的条件报告，以更好地了解问题所在。为此，您需要[启用 ](https://docs.spring.io/spring-boot/reference/features/external-config.html)[`debug`](https://docs.spring.io/spring-boot/reference/features/external-config.html)[ 属性](https://docs.spring.io/spring-boot/reference/features/external-config.html)或为 `org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener` [启用 DEBUG 日志记录](https://docs.spring.io/spring-boot/reference/features/logging.html#features.logging.log-levels)

例如，如果您通过使用 `java -jar` 运行应用程序，可以如下启用 `debug` 属性：

```Bash
java -jar your-application.jar --debug
```

## **延迟初始化**

`SpringApplication` 允许应用程序以延迟初始化的方式进行设置。当启用延迟初始化时，Bean 会在需要时才创建，而不是在应用程序启动期间创建。因此，启用延迟初始化可以减少应用程序的启动时间。在 Web 应用程序中，启用延迟初始化会导致许多与 Web 相关的 Bean 只有在收到 HTTP 请求时才会初始化。

延迟初始化的一个缺点是，它可能会延迟发现应用程序中的问题。如果一个配置错误的 Bean 是以延迟方式初始化的，错误将不会在启动时出现，而是在该 Bean 被初始化时才会显现。此外，还需要确保 JVM 有足够的内存容纳应用程序中的所有 Bean，而不仅仅是启动期间初始化的那些 Bean。

基于这些原因，延迟初始化默认未启用，并建议在启用延迟初始化之前，先对 JVM 的堆内存大小进行精细调整

可以通过以下方式启用延迟初始化：

**编程方式**

- 使用 `SpringApplicationBuilder` 的 `lazyInitialization` 方法：

```Java
new SpringApplicationBuilder(MyApplication.class)
        .lazyInitialization(true)
        .run(args);
```

- 使用 `SpringApplication` 的 `setLazyInitialization` 方法

```Java
SpringApplication app = new SpringApplication(MyApplication.class);
app.setLazyInitialization(true);
app.run(args);
```

**配置文件方式**

- 使用 `spring.main.lazy-initialization` 属性启用，以下是示例：

```Plaintext
spring.main.lazy-initialization=true
```

::: tip 💡
如果您希望在应用程序中对其他 Bean 启用延迟初始化，但对某些特定的 Bean 禁用延迟初始化，可以使用 `@Lazy(false)` 注解显式设置它们的懒加载属性为 `false`。
:::

## **自定义启动横幅**

启动时打印的横幅可以通过将 `banner.txt` 文件添加到类路径中，或通过设置 `spring.banner.location` 属性来指定该文件的位置来更改。如果文件的编码不是 UTF-8，可以设置 `spring.banner.charset` 属性

在 `banner.txt` 文件中，您可以使用 `Environment` 中可用的任何键以及以下占位符

| 变量 | 描述 |
|-|-|
| `${application.version}` | 应用程序的版本号，声明在 `MANIFEST.MF` 中。例如，`Implementation-Version: 1.0` 会打印为 `1.0` |
| `${application.formatted-version}` | 应用程序的版本号，声明在 `MANIFEST.MF` 中，并格式化显示（用括号括起来并以 `v` 为前缀）。例如 `(v1.0)` |
| `${spring-boot.version}` | 当前使用的 Spring Boot 版本。例如，`3.3.5` |
| `${spring-boot.formatted-version}` | 当前使用的 Spring Boot 版本，格式化显示（用括号括起来并以 `v` 为前缀）。例如 `(v3.3.5)` |
| `${Ansi.NAME}` (or `${AnsiColor.NAME}`, `${AnsiBackground.NAME}`, `${AnsiStyle.NAME}`) | ANSI 转义代码的名称。可以是 `${AnsiColor.NAME}`，`${AnsiBackground.NAME}`，`${AnsiStyle.NAME}`。有关详细信息，请参见 [`AnsiPropertySource`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/ansi/AnsiPropertySource.html) |
| `${application.title}` | 应用程序的标题，声明在 `MANIFEST.MF` 中。例如，`Implementation-Title: MyApp` 会打印为 `MyApp` |

::: tip 💡
如果想通过程序生成横幅，可以使用 `SpringApplication.setBanner(...)` 方法。通过实现 `org.springframework.boot.Banner` 接口，并重写 `printBanner()` 方法，可以自定义横幅的输出
:::

还可以使用 `spring.main.banner-mode` 属性来决定横幅的显示方式：

- console：打印到控制台（默认值）
- log：发送到配置的日志记录器
- off：不显示横幅

打印的横幅作为单例 Bean 注册，名称为 `springBootBanner`。

::: info ℹ️
`application.title`、`application.version` 和 `application.formatted-version` 属性仅在使用 `java -jar` 或 `java -cp` 通过 Spring Boot 启动器运行时可用。如果您使用 `java -cp <classpath> <mainclass>` 或将应用程序作为原生镜像运行，这些值将不会被解析
要使用这些属性，必须以 `java -jar` 启动已打包的 JAR 文件，或使用 `java org.springframework.boot.loader.launch.JarLauncher` 启动未打包的 JAR 文件。这样可以在构建类路径并启动应用程序之前初始化 `application.banner` 属性
:::

## 自定义 **SpringApplication**

如果 SpringApplication 的默认设置不符合您的需求，您可以创建一个本地实例并进行自定义。例如，要关闭横幅，您可以这样写

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

::: info ℹ️
传递给 `SpringApplication` 构造函数的参数是 Spring Bean 的配置源。在大多数情况下，这些参数是对 `@Configuration` 类的引用，但它们也可以是直接引用的 `@Component` 类
:::

也可以通过使用 `application.properties` 文件来配置 `SpringApplication`。有关详细信息，请参阅 [外部化配置](https://docs.spring.io/spring-boot/reference/features/external-config.html) 部分。

要查看完整的配置选项，请参阅 [SpringApplication API 文档](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/SpringApplication.html)

## **流式构建器 API**

如果您需要构建 `ApplicationContext` 层次结构（具有父/子关系的多个上下文），或者更喜欢使用流式构建器 API，可以使用 `SpringApplicationBuilder`。

`SpringApplicationBuilder` 允许您将多个方法调用链接在一起，并提供了 `parent` 和 `child` 方法，以便创建上下文层次结构，如以下示例所示：

```Java
                new SpringApplicationBuilder().sources(Parent.class)
                        .child(Application.class)
                        .bannerMode(Banner.Mode.OFF)
                        .run(args);
```

::: info ℹ️
创建 `ApplicationContext` 层次结构时有一些限制。例如，Web 组件必须包含在子上下文中，且父上下文和子上下文使用相同的 `Environment`。有关详细信息，请参阅 [`SpringApplicationBuilder`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/builder/SpringApplicationBuilder.html) API 文档
:::

## **应用程序可用性**

在部署到平台时，应用程序可以通过 [Kubernetes 探针](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)等基础设施向平台提供其可用性信息。Spring Boot 原生支持常用的“存活性”（Liveness）和“就绪性”（Readiness）状态。如果您使用 Spring Boot 的“Actuator”支持，则这些状态会作为健康检查端点组公开。

此外，还可以通过将 `ApplicationAvailability` 接口注入到您的 Bean 中来获取应用程序的可用性状态

### **存活性状态（Liveness State）**

应用程序的“存活性”状态表示其内部状态是否允许其正常工作，或者在当前出现故障时是否能够自我恢复。若“存活性”状态失效，意味着应用程序处于无法自我恢复的状态，此时基础设施应该重启该应用程序

::: info ℹ️
一般而言，“存活性”状态不应基于外部检查（如[健康检查](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.health)）。否则，外部系统（如数据库、Web API、外部缓存）故障会触发大量重启，并在平台上引发级联故障
:::

Spring Boot 应用程序的内部状态主要由 Spring `ApplicationContext` 表示。如果应用上下文成功启动，Spring Boot 假定应用程序处于有效状态。应用上下文刷新后，应用程序被认为是存活的。更多内容参见 [Spring Boot 应用程序生命周期和相关的应用事件](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.application-events-and-listeners)

### **就绪性状态（Readiness State）**

应用程序的“就绪性”状态表示是否已准备好处理流量。若“就绪性”状态失效，表示平台不应将流量路由到该应用程序。这种情况通常在启动期间发生，例如在 `CommandLineRunner` 和 `ApplicationRunner` 组件被处理时，或者应用程序认为自身过载时。

在应用程序和命令行运行器被调用后，应用程序被认为是就绪的。详细信息参见 [Spring Boot 应用程序生命周期和相关的应用事件](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.application-events-and-listeners)

::: tip 💡
启动期间应执行的任务应由 `CommandLineRunner` 和 `ApplicationRunner` 组件负责，而非使用 Spring 组件生命周期回调（例如 `@PostConstruct`）
:::

### 管理应用程序可用性状态

应用程序组件可以随时通过注入 `ApplicationAvailability` 接口并调用其方法来检索当前的可用性状态。通常，应用程序会监听状态更新，或者更新应用程序的状态

以下示例展示了如何将应用程序的“就绪性”（Readiness）状态导出到文件，以便 Kubernetes 的 “exec Probe” 可以检查该文件

```Java
import org.springframework.boot.availability.AvailabilityChangeEvent;
import org.springframework.boot.availability.ReadinessState;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MyReadinessStateExporter {

        @EventListener
        public void onStateChange(AvailabilityChangeEvent<ReadinessState> event) {
                switch (event.getState()) {
                        case ACCEPTING_TRAFFIC -> {
                                // create file /tmp/healthy
                        }
                        case REFUSING_TRAFFIC -> {
                                // remove file /tmp/healthy
                        }
                }
        }

}
```

应用程序发生故障且无法恢复时，我们也可以手动更新应用程序的状态

```Java
import org.springframework.boot.availability.AvailabilityChangeEvent;
import org.springframework.boot.availability.LivenessState;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class MyLocalCacheVerifier {

        private final ApplicationEventPublisher eventPublisher;

        public MyLocalCacheVerifier(ApplicationEventPublisher eventPublisher) {
                this.eventPublisher = eventPublisher;
        }

        public void checkLocalCache() {
                try {
                        // ...
                }
                catch (CacheCompletelyBrokenException ex) {
                        AvailabilityChangeEvent.publish(this.eventPublisher, ex, LivenessState.BROKEN);
                }
        }

}
```

Spring Boot [通过 Actuator 健康检查端点为“存活性”（Liveness）和“就绪性”（Readiness）提供了 Kubernetes HTTP 探针](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints.kubernetes-probes)。您可以在专门的部分找到有关[在 Kubernetes 上部署 Spring Boot 应用程序的更多指南](https://docs.spring.io/spring-boot/how-to/deployment/cloud.html#howto.deployment.cloud.kubernetes)

## **应用程序事件和监听器**

除了 Spring Framework 中的常规事件（例如 `ContextRefreshedEvent`），`SpringApplication` 还会发送一些额外的应用程序事件

::: info ℹ️
某些事件会在 `ApplicationContext` 创建之前触发，因此无法通过 `@Bean` 的方式注册监听器。可以使用 `SpringApplication.addListeners(...)` 方法或 `SpringApplicationBuilder.listeners(...)` 方法注册这些监听器
:::

如果希望监听器自动注册，无论应用程序的创建方式如何，都可以在项目中添加 `META-INF/spring.factories` 文件，并使用 `org.springframework.context.ApplicationListener` 键来引用监听器，如以下示例所示：

```Plaintext
org.springframework.context.ApplicationListener=com.example.project.MyListener
```

在应用程序运行过程中，事件的触发顺序如下：

1. `ApplicationStartingEvent`：在运行开始时发送，仅注册监听器和初始化器之后会触发。
2. `ApplicationEnvironmentPreparedEvent`：在上下文的 `Environment` 确定后但在创建上下文之前发送。
3. `ApplicationContextInitializedEvent`：在 `ApplicationContext` 准备好且 `ApplicationContextInitializers` 被调用后发送，但在加载任何 Bean 定义之前
4. `ApplicationPreparedEvent`：在刷新开始之前发送，但在加载 Bean 定义之后
5. `ApplicationStartedEvent`：在上下文刷新完成后、应用程序和命令行运行器调用之前发送。
6. `AvailabilityChangeEvent`：在应用程序被视为“存活” （`LivenessState.CORRECT`） 时发送。
7. `ApplicationReadyEvent`：在[应用程序和命令行运行器](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.command-line-runner)调用之后发送。
8. `AvailabilityChangeEvent`：在应用程序准备好接收请求时(`ReadinessState.ACCEPTING_TRAFFIC`)发送
9. `ApplicationFailedEvent`：在启动出现异常时发送。

以上列表仅包括与 `SpringApplication` 相关的事件。此外，在 `ApplicationPreparedEvent` 之后和 `ApplicationStartedEvent` 之前，还会发布以下事件：

- `WebServerInitializedEvent`：在 Web 服务器准备就绪后发送，包括 `ServletWebServerInitializedEvent` 和 `ReactiveWebServerInitializedEvent`。
- `ContextRefreshedEvent`：当 `ApplicationContext` 刷新时发送。

::: tip 💡
通常无需直接使用应用程序事件，但了解其存在可能会有所帮助。Spring Boot 内部通过事件处理多种任务
:::

::: info ℹ️
默认情况下，事件监听器会在同一线程中执行，因此不应执行可能耗时的任务。建议使用[应用程序运行器和命令行运行器](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.command-line-runner)来处理这些任务
:::

应用程序事件通过 Spring Framework 的事件发布机制发送。此机制的一部分确保了在子上下文中发布的事件也会发布到任何祖先上下文中的监听器。因此，如果应用程序使用了多个 `SpringApplication` 实例组成的层次结构，同类型的应用程序事件可能会多次触发

为了区分事件是针对当前上下文还是子上下文，监听器可以请求注入其 `ApplicationContext`，然后将其与事件的上下文进行比较。可以通过实现 `ApplicationContextAware` 或使用 `@Autowired` 注入上下文

## **Web 环境**

`SpringApplication` 会根据具体情况为你创建适合的 `ApplicationContext` 类型。用于确定 `WebApplicationType` 的算法如下

- **如果存在 Spring MVC,** 使用 `AnnotationConfigServletWebServerApplicationContext`
- **如果不存在 Spring MVC 且存在 Spring WebFlux,** 使用 `AnnotationConfigReactiveWebServerApplicationContext`
- **如果都不存在,** 使用 `AnnotationConfigApplicationContext`

如果一个应用程序同时使用了 Spring MVC 和 Spring WebFlux 的新 `WebClient`，默认会选择 Spring MVC。如果你希望改变默认行为，可以通过调用 `setWebApplicationType(WebApplicationType)` 来覆盖

你还可以通过调用 `setApplicationContextFactory(…)` 来完全控制所使用的 `ApplicationContext` 类型。

::: tip 💡
在使用 `SpringApplication` 进行单元测试时，通常希望禁用 Web 环境。此时可以调用 `setWebApplicationType(WebApplicationType.NONE)`
:::

```Java
SpringApplication app = new SpringApplication(MyApplication.class);
app.setWebApplicationType(WebApplicationType.NONE);
app.run(args);
```

这样可以避免加载不必要的 Web 相关 Bean，从而加快测试的执行速度

## 访问应用参数

如果需要访问传递给 `SpringApplication.run(...)` 的应用程序参数，可以注入一个 `org.springframework.boot.ApplicationArguments` bean。`ApplicationArguments` 接口允许访问原始的 `String[]` 参数，以及解析后的 `option` 参数和 `non-option` 参数，如以下示例所示

```Java
import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

        public MyBean(ApplicationArguments args) {
                boolean debug = args.containsOption("debug");
                List<String> files = args.getNonOptionArgs();
                if (debug) {
                        System.out.println(files);
                }
                // if run with "--debug logfile.txt" prints ["logfile.txt"]
        }

}
```

此外，Spring Boot 还会将 `CommandLinePropertySource` 注册到 Spring `Environment` 中。这样一来，也可以通过 `@Value` 注解来单独注入应用程序参数

## 使用 **ApplicationRunner 或 CommandLineRunner**

如果需要在 `SpringApplication` 启动完成后运行一些特定代码，可以实现 `ApplicationRunner` 或 `CommandLineRunner` 接口。这两个接口的工作方式相同，都提供了一个 run 方法，该方法会在 `SpringApplication.run(...)` 完成之前被调用

::: info ℹ️
这个约定非常适合需要在应用程序启动后运行但在开始接受流量之前完成的任务
:::

`CommandLineRunner` 接口提供了以字符串数组形式访问应用程序参数的能力，而 `ApplicationRunner` 使用的是之前讨论过的 `ApplicationArguments` 接口。以下示例展示了一个带有 run 方法的 `CommandLineRunner`

```Java
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

        @Override
        public void run(String... args) {
                // Do something...
        }

}
```

如果定义了多个 `CommandLineRunner` 或 `ApplicationRunner` bean 并需要按特定顺序调用，可以通过实现 `org.springframework.core.Ordered` 接口或使用 `org.springframework.core.annotation.Order` 注解来指定执行顺序

## 应用退出

每个 `SpringApplication` 都会在 JVM 中注册一个关闭钩子，以确保在退出时 `ApplicationContext` 能够正常关闭。所有标准的 Spring 生命周期回调（例如 `DisposableBean` 接口或 `@PreDestroy` 注解）都可以使用

此外，如果 bean 希望在调用 `SpringApplication.exit()` 时返回特定的退出码，则可以实现 `org.springframework.boot.ExitCodeGenerator` 接口。然后该退出码可以通过 `System.exit()` 作为状态码返回，如以下示例所示：

```Java
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MyApplication {

        @Bean
        public ExitCodeGenerator exitCodeGenerator() {
                return () -> 42;
        }

        public static void main(String[] args) {
                System.exit(SpringApplication.exit(SpringApplication.run(MyApplication.class, args)));
        }

}
```

此外，`ExitCodeGenerator` 接口也可以由异常来实现。当遇到这样的异常时，Spring Boot 会返回由实现的 `getExitCode()` 方法提供的退出码。

如果有多个 `ExitCodeGenerator`，则使用第一个生成的非零退出码。要控制生成器的调用顺序，可以额外实现 `org.springframework.core.Ordered` 接口或使用 `org.springframework.core.annotation.Order` 注解

## 管理功能

可以通过设置 `spring.application.admin.enabled` 属性来为应用程序启用管理相关功能。这会在平台的 `MBeanServer` 上公开 [`SpringApplicationAdminMXBean`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/admin/SpringApplicationAdminMXBean.html)。您可以使用此功能远程管理 Spring Boot 应用程序，同时该功能也适用于任何服务包装器的实现。

::: tip 💡
如果您想知道应用程序运行的 HTTP 端口，可以获取键为 `local.server.port` 的属性
:::

## **应用启动跟踪**

在应用启动过程中，`SpringApplication` 和 `ApplicationContext` 会执行许多与应用生命周期、Bean 生命周期以及应用事件处理相关的任务。通过 [`ApplicationStartup`](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/core/metrics/ApplicationStartup.html)，Spring 框架[允许使用 ](https://docs.spring.io/spring-framework/reference/6.1/core/beans/context-introduction.html#context-functionality-startup)[`StartupStep`](https://docs.spring.io/spring-framework/reference/6.1/core/beans/context-introduction.html#context-functionality-startup)[ 对象跟踪应用启动的顺序](https://docs.spring.io/spring-framework/reference/6.1/core/beans/context-introduction.html#context-functionality-startup)。这些数据可以用于性能分析，或帮助更好地理解应用启动过程。

可以在配置 `SpringApplication` 实例时选择一个 `ApplicationStartup` 实现。例如，使用 `BufferingApplicationStartup` 的代码如下：

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.metrics.buffering.BufferingApplicationStartup;

@SpringBootApplication
public class MyApplication {

        public static void main(String[] args) {
                SpringApplication application = new SpringApplication(MyApplication.class);
                application.setApplicationStartup(new BufferingApplicationStartup(2048));
                application.run(args);
        }

}
```

Spring 框架提供的第一个实现 `FlightRecorderApplicationStartup`，会将 Spring 特定的启动事件添加到 Java Flight Recorder 会话中，用于分析应用并将 Spring 上下文生命周期与 JVM 事件（如内存分配、垃圾回收、类加载等）关联起来。配置完成后，可通过启用 Flight Recorder 记录数据：

```Bash
$ java -XX:StartFlightRecording:filename=recording.jfr,duration=10s -jar demo.jar
```

Spring Boot 自带的 `BufferingApplicationStartup` 用于缓存启动步骤并将其导出到外部的指标系统。应用程序可以在任意组件中请求类型为 `BufferingApplicationStartup` 的 Bean。

Spring Boot 还可以配置为暴露一个[启动端点](https://docs.spring.io/spring-boot/api/rest/actuator/startup.html)，将启动信息作为 JSON 文档提供

## **虚拟线程**

如果运行在 Java 21 或更高版本，可以通过设置属性 `spring.threads.virtual.enabled` 为 `true` 来启用虚拟线程

在启用此选项前，建议阅读[官方的 Java 虚拟线程文档](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)。在某些情况下，由于“固定虚拟线程（Pinned Virtual Threads）”，应用可能会出现较低的吞吐量。官方文档提供了如何通过 JDK Flight Recorder 或 `jcmd` CLI 检测这些情况的说明

::: info ℹ️
如果启用虚拟线程，线程池相关的配置属性将不再有效，因为虚拟线程使用 JVM 范围的全局线程池，而非专用线程池
:::

::: info 🔥
虚拟线程是守护线程，因此当 JVM 中的所有线程都是守护线程时，JVM 会退出。这种行为可能会在依赖 @Scheduled Bean（例如用来保持应用存活）时引发问题。虚拟线程下，调度线程是守护线程，因此不会阻止 JVM 退出
为确保在所有线程为虚拟线程时 JVM 仍保持运行，建议设置属性 spring.main.keep-alive 为 true。该属性确保即使所有线程都是虚拟线程，JVM 也能保持运行
:::