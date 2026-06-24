---
description: '配置文件允许添加激活配置文件，通过配置文件组进行管理，支持程序化设置配置文件，并可指定配置文件的配置文件。'
lastUpdated: '2026-06-20 12:15:58'
head:
  - - meta
    - name: 'og:title'
      content: '配置文件'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '配置文件允许添加激活配置文件，通过配置文件组进行管理，支持程序化设置配置文件，并可指定配置文件的配置文件。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/profiles.html'
---
# 配置文件

**Spring Profiles** 提供了一种方法，用于将应用程序配置的某些部分分隔开，仅在特定环境中可用。任何 `@Component`、`@Configuration` 或 `@ConfigurationProperties` 都可以通过 `@Profile` 注解标记，以限制其加载的时机，如以下示例所示：

```Java
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration(proxyBeanMethods = false)
@Profile("production")
public class ProductionConfiguration {

        // ...

}
```

::: info ℹ️
如果通过 `@EnableConfigurationProperties` 注册 `@ConfigurationProperties` Bean，而不是通过自动扫描注册，则需要在包含 `@EnableConfigurationProperties` 注解的 `@Configuration` 类上指定 `@Profile` 注解。对于通过扫描方式注册的 `@ConfigurationProperties`，可以直接在 `@ConfigurationProperties` 类上指定 `@Profile` 注解
:::

你可以使用 `spring.profiles.active` 环境属性来指定哪些配置文件处于激活状态。可以通过本章前面描述的任何方式指定该属性。例如，可以在 `application.properties` 文件中包含此属性，如以下示例所示：

```Plaintext
spring.profiles.active=dev,hsqldb
```

你还可以通过以下命令行参数指定它：`--spring.profiles.active=dev,hsqldb`。

如果没有激活任何配置文件，则会启用默认配置文件。默认配置文件的名称是 `default`，可以通过 `spring.profiles.default` `Environment` 属性进行调整，如以下示例所示：

```Plaintext
spring.profiles.default=none
```

`spring.profiles.active` 和 `spring.profiles.default` 只能在非特定配置文件的文档中使用。这意味着它们不能包含在特定配置文件的文件或通过 `spring.config.activate.on-profile` 激活的文档中。

例如，以下第二个文档配置是无效的：

```Plaintext
spring.profiles.active=prod
#---
spring.config.activate.on-profile=prod
spring.profiles.active=metrics
```

## 添加激活配置文件

`spring.profiles.active` 属性遵循与其他属性相同的排序规则：**最高优先级的 `PropertySource` 生效**。这意味着您可以在 `application.properties` 中指定活动的配置文件，并通过命令行参数替换它们。

有时，将属性添加到活动配置文件而不是替换它们非常有用。可以使用 `spring.profiles.include` 属性，在由 `spring.profiles.active` 属性激活的基础上添加更多的活动配置文件。此外，`SpringApplication` 的入口点还提供了一个 Java API 用于设置额外的配置文件。请参阅 `SpringApplication` 类中的 `setAdditionalProfiles()` 方法。

例如，当运行包含以下属性的应用程序时，即使通过 `--spring.profiles.active` 参数运行，**`common`** 和 **`local`** 配置文件也会被激活：

```Plaintext
spring.profiles.include[0]=common
spring.profiles.include[1]=local
```

::: warning ⚠️
与 `spring.profiles.active` 类似，`spring.profiles.include` **只能用于非特定配置文件的文档中**。这意味着它不能包含在特定配置文件的文档中，或者由 `spring.config.activate.on-profile` 激活的文档中
:::

在下一节中描述的**配置文件组**也可以用于在某个特定配置文件被激活时添加其他活动的配置文件

## 配置文件组

有时，您在应用程序中定义和使用的配置文件过于细化，从而变得难以管理。例如，您可能有 `proddb` 和 `prodmq` 两个配置文件，分别用于独立启用数据库和消息功能

为了解决这个问题，Spring Boot 提供了**配置文件组**功能。配置文件组允许您为相关的配置文件定义一个逻辑名称。

例如，我们可以创建一个名为 `production` 的组，它包含 `proddb` 和 `prodmq` 配置文件。

```Plaintext
spring.profiles.group.production[0]=proddb
spring.profiles.group.production[1]=prodmq
```

现在，我们的应用程序可以通过使用 `--spring.profiles.active=production` 启动，一次性激活 `production`、`proddb` 和 `prodmq` 配置文件

::: warning ⚠️
与 `spring.profiles.active` 和 `spring.profiles.include` 类似，`spring.profiles.group` 只能用于非配置文件特定的文档中。这意味着它不能包含在特定配置文件的文件中，也不能用于通过 `spring.config.activate.on-profile` 激活的文档中
:::

## 程序化设置配置文件

可以通过在应用程序运行之前调用 `SpringApplication.setAdditionalProfiles(…)` 来以编程方式设置激活的配置文件。此外，也可以使用 Spring 的 `ConfigurableEnvironment` 接口来激活配置文件

## 指定配置文件的配置文件

与 `@ConfigurationProperties` 引用的文件类似，具有特定配置文件的 `application.properties`（或 `application.yaml`）文件也被视为文件并加载。有关详细信息，请参阅 配置文件特定于配置文件的文件 部分