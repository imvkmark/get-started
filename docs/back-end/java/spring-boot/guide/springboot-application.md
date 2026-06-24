---
description: 'Spring Boot应用可通过自定义FailureAnalyzer排查自动配置问题，在启动前调整环境或ApplicationContext，构建层次结构（如添加父上下文），并支持创建非Web应用。'
lastUpdated: '2026-06-20 12:16:38'
head:
  - - meta
    - name: 'og:title'
      content: 'Spring Boot 应用 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Spring Boot应用可通过自定义FailureAnalyzer排查自动配置问题，在启动前调整环境或ApplicationContext，构建层次结构（如添加父上下文），并支持创建非Web应用。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/guide/springboot-application.html'
---
# Spring Boot 应用

本节包含与 Spring Boot 应用直接相关的主题。

## 创建你的 **FailureAnalyzer**

[`FailureAnalyzer`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/diagnostics/FailureAnalyzer.html) 是一种有效工具，可以拦截应用启动时的异常并将其转换为可读的消息，封装在 [`FailureAnalysis`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/diagnostics/FailureAnalysis.html) 中。Spring Boot 为与应用上下文相关的异常、JSR-303 验证等提供了内置的分析器。同时，你也可以创建自己的 **FailureAnalyzer**

`AbstractFailureAnalyzer` 是 `FailureAnalyzer` 的一个便捷扩展，它会检查要处理的异常中是否存在指定的异常类型。你可以继承它，让你的实现仅在异常实际存在时有机会处理。如果因某种原因无法处理异常，可以返回 `null`，以便让其他实现有机会处理该异常。

所有的 `FailureAnalyzer` 实现都必须注册到 `META-INF/spring.factories` 中。以下示例展示了如何注册一个名为 `ProjectConstraintViolationFailureAnalyzer` 的分析器

```Plaintext
org.springframework.boot.diagnostics.FailureAnalyzer=\
com.example.ProjectConstraintViolationFailureAnalyzer
```

::: info ℹ️
如果你需要访问 `BeanFactory` 或 `Environment`，可以在 `FailureAnalyzer` 实现中将它们声明为构造函数参数
:::

## 排查自动配置问题

Spring Boot 的自动配置会尽力“做正确的事情”，但有时可能会失败，而且可能难以找出原因。

在任何 Spring Boot 的 `ApplicationContext` 中，都可以找到一个非常有用的 `ConditionEvaluationReport`。如果启用了 `DEBUG` 日志输出，就能看到它。如果使用了 `spring-boot-actuator`（参见 Actuator 章节），还可以通过 `conditions` 端点以 JSON 格式查看报告。可以通过该端点调试应用程序，并查看 Spring Boot 在运行时添加了哪些功能（以及未添加哪些功能）。

许多问题还可以通过查看源码和 API 文档找到答案。在阅读代码时，请记住以下经验法则：

- 查找名称以 `*AutoConfiguration` 结尾的类，并阅读它们的源码。特别关注它们的 `@Conditional*` 注解，以了解启用了哪些功能以及何时启用。在命令行中添加 `--debug` 参数或设置系统属性 `-Ddebug`，可以在控制台上查看应用程序中的所有自动配置决策。如果运行的应用程序启用了 Actuator，可以查看 `conditions` 端点（如 `/actuator/conditions` 或对应的 JMX 信息）获取相同的信息。
- 查找带有 `@ConfigurationProperties` 注解的类（例如 [`ServerProperties`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/autoconfigure/web/ServerProperties.html)），并从中了解可用的外部配置选项。`@ConfigurationProperties` 注解的 `name` 属性用作外部属性的前缀。例如，`ServerProperties` 的 `prefix="server"`，因此其配置属性包括 `server.port`、`server.address` 等。如果运行的应用程序启用了 Actuator，可以查看 `configprops` 端点。
- 查找使用 **`Binder`** 的 **`bind`** 方法的地方，这种方法以宽松的方式从 **`Environment`** 中显式提取配置值。它通常与前缀一起使用
- 查找使用 `@Value` 注解直接绑定到 `Environment` 的地方。
- 查找使用 `@ConditionalOnExpression` 注解的地方，它们会根据 SpEL(Spring Expression Language) 表达式开启或关闭功能，这些表达式通常通过从 `Environment` 中解析的占位符来计算

## 在启动前自定义环境或者 **ApplicationContext**

`SpringApplication` 拥有 `ApplicationListeners` 和 `ApplicationContextInitializers`，用于对上下文或环境进行自定义。Spring Boot 会从 `META-INF/spring.factories` 加载一些内置的自定义组件。这些组件可以通过以下方式注册：

- **编程方式,** 在运行应用之前，通过调用 `SpringApplication` 的 `addListeners` 和 `addInitializers` 方法，为单个应用程序添加自定义组件。
- **声明方式,** 为所有应用添加自定义组件，在 `META-INF/spring.factories` 文件中注册相关类，并将其打包成 jar 文件，作为所有应用的依赖

`SpringApplication` 会向监听器发送一些特殊的 `ApplicationEvents`（有些事件在上下文创建之前就触发）。随后，它还会为由 `ApplicationContext` 发布的事件注册监听器。有关完整事件列表，请参阅 **Spring Boot Features** 部分的 [Application Events and Listeners](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.application-events-and-listeners)

可以通过实现 `EnvironmentPostProcessor` 接口，在应用上下文刷新之前自定义 `Environment`。每个实现需要在 `META-INF/spring.factories` 文件中注册，例如

```Plaintext
org.springframework.boot.env.EnvironmentPostProcessor=com.example.YourEnvironmentPostProcessor
```

实现可以加载任意文件并将其添加到 `Environment` 中。例如，以下示例从类路径中加载一个 YAML 配置文件

```Java
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.Assert;

public class MyEnvironmentPostProcessor implements EnvironmentPostProcessor {

        private final YamlPropertySourceLoader loader = new YamlPropertySourceLoader();

        @Override
        public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
                Resource path = new ClassPathResource("com/example/myapp/config.yml");
                PropertySource<?> propertySource = loadYaml(path);
                environment.getPropertySources().addLast(propertySource);
        }

        private PropertySource<?> loadYaml(Resource path) {
                Assert.isTrue(path.exists(), () -> "Resource " + path + " does not exist");
                try {
                        return this.loader.load("custom-resource", path).get(0);
                }
                catch (IOException ex) {
                        throw new IllegalStateException("Failed to load yaml configuration from " + path, ex);
                }
        }

}
```

::: tip 💡
`Environment` 已经通过 Spring Boot 默认加载的所有常见属性源进行了初始化。因此，可以从 Environment 中获取文件的位置。前述示例将 `custom-resource` 属性源添加到列表的末尾，这样在其他常见位置中定义的键会优先生效。自定义实现可以定义其他顺序
:::

::: info 🔥
虽然在 `@SpringBootApplication` 上使用 `@PropertySource` 似乎是将自定义资源加载到 `Environment` 中的一种便捷方式，但我们不推荐这样做。因为这种属性源在应用上下文刷新时才会被添加到 `Environment` 中，而这对某些在刷新开始之前读取的属性（如 `logging.*` 和 `spring.main.*`）来说，已经太晚了
:::

## **构建 ApplicationContext 层次结构（添加父上下文或根上下文）**

您可以使用 `ApplicationBuilder` 类创建父/子 `ApplicationContext` 层次结构。有关更多信息，请参阅“Spring Boot 特性”部分中的 [Fluent Builder API](https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.fluent-builder-api)

## 创建一个非 Web 应用

并非所有 Spring 应用都必须是 Web 应用（或 Web 服务）。如果您希望在 `main` 方法中执行一些代码，同时启动一个 Spring 应用以设置所需的基础设施，您可以使用 Spring Boot 提供的 `SpringApplication` 功能。

`SpringApplication` 会根据是否需要 Web 应用来更改其 `ApplicationContext` 类。以下是帮助它确定的方式：

- **避免引入与服务器相关的依赖**（如 Servlet API）到类路径中。
- 如果无法避免（例如，在同一代码库中运行两个不同的应用），可以显式地在 `SpringApplication` 实例上调用 `setWebApplicationType(WebApplicationType.NONE)`，或者通过 Java API 或外部属性设置 `applicationContextClass` 属性。

作为业务逻辑的应用代码可以实现为一个 `CommandLineRunner`，并以 `@Bean` 定义的形式放入上下文中运行。