---
description: '该内容涵盖了Spring Boot外部化配置的核心机制，包括从命令行、JSON、YAML、属性文件及环境变量等多来源加载配置，支持可选位置、通配符、多文档文件及加密属性。还涉及类型安全的@ConfigurationProperties绑定、构造器绑定、宽松绑定、复杂类型合并及属性转换，并提及校验与@Value的区别。'
lastUpdated: '2026-06-20 12:15:55'
head:
  - - meta
    - name: 'og:title'
      content: '配置外部化'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容涵盖了Spring Boot外部化配置的核心机制，包括从命令行、JSON、YAML、属性文件及环境变量等多来源加载配置，支持可选位置、通配符、多文档文件及加密属性。还涉及类型安全的@ConfigurationProperties绑定、构造器绑定、宽松绑定、复杂类型合并及属性转换，并提及校验与@Value的区别。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/setting-externalization.html'
---
# 配置外部化

Spring Boot 允许外部化配置，使同一份应用代码可在不同环境下运行。你可以使用多种外部配置源，包括 Java 属性文件、YAML 文件、环境变量和命令行参数。

属性值可以通过以下方式注入到 Bean 中：

•        使用 `@Value` 注解直接注入。

•        通过 Spring 的 `Environment` 抽象访问。

•        使用 `@ConfigurationProperties` [绑定到结构化对象](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties)。

Spring Boot 使用特定的 `PropertySource` 顺序，设计为允许合理地覆盖值。后加载的属性源会覆盖之前定义的值。以下是属性源的考虑顺序：

1. 默认属性（通过调用 `SpringApplication.setDefaultProperties` 指定）。
2. [`@PropertySource`](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/context/annotation/PropertySource.html) 注解（位于 `@Configuration` 类中）。注意，这些属性源直到应用上下文刷新时才添加到环境中，因此无法用于配置刷新前读取的属性（如 `logging.*` 和 `spring.main.*`）。
3. 配置数据（如 `application.properties` 文件）。
4. `RandomValuePropertySource`（仅包含 `random.*` 属性）。
5. 操作系统环境变量。
6. Java 系统属性（`System.getProperties()`）
7. JNDI 属性（`java:comp/env`）
8. `ServletContext` 初始化参数
9. `ServletConfig` 初始化参数
10. 来自 `SPRING_APPLICATION_JSON` 的属性（嵌入在环境变量或系统属性中的内联 JSON）。
11. 命令行参数
12. 测试中通过 `properties` 属性指定的值（适用于 [`@SpringBootTest`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/test/context/SpringBootTest.html) 和[特定应用切片的测试注解](https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html#testing.spring-boot-applications.autoconfigured-tests)）
13. 测试中的 [`@DynamicPropertySource`](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/test/context/DynamicPropertySource.html) 注解
14. 测试中的 [`@TestPropertySource`](https://docs.spring.io/spring-framework/docs/6.1.x/javadoc-api/org/springframework/test/context/TestPropertySource.html) 注解
15. 当 Devtools 激活时，位于 `$HOME/.config/spring-boot` 中的 [Devtools 全局设置属性](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.globalsettings)

配置数据文件按以下顺序考虑：

1. 包含在 JAR 文件内的[应用程序属性](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files)（`application.properties` 和 YAML 变体）
2. 包含在 JAR 文件内的针对[特定环境的应用程序属性](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.profile-specific)（如 `application-{profile}.properties` 和 YAML 变体）。
3. JAR 文件外部的[应用程序属性](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files)（`application.properties` 和 YAML 变体）
4. JAR 文件外部的针对[特定环境的应用程序属性](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.profile-specific)（如 `application-{profile}.properties` 和 YAML 变体）

::: info ℹ️
**统一格式**：建议为整个应用程序选择一种配置文件格式（`.properties` 或 YAML）。如果同一位置存在 `.properties` 和 YAML 文件，`.properties` 文件优先
:::

::: info ℹ️
**环境变量与系统属性**：操作系统通常不支持用点分隔的键名，但可以使用下划线替代（例如 `SPRING_CONFIG_NAME` 代替 `spring.config.name`）。详情参见[从环境变量绑定](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables)
:::

::: info ℹ️
**Servlet 容器中的配置**：如果应用程序运行在 Servlet 容器或应用服务器中，可以使用 JNDI 属性（`java:comp/env`）或 Servlet 上下文初始化参数，替代或补充环境变量或系统属性
:::

假设开发了一个 `@Component`，并使用了名为 `name` 的属性，示例如下：

```Java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

        @Value("${name}")
        private String name;

        // ...

}
```

在你的应用程序类路径中（例如，在 JAR 文件内），可以包含一个 `application.properties` 文件，为属性 `name` 提供一个合理的默认值

当在新环境中运行时，可以在 JAR 文件外部提供一个 `application.properties` 文件，用于覆盖默认的 `name` 值

对于一次性测试，你可以使用特定的命令行参数启动应用程序，例如：`java -jar app.jar --name="Spring"`

::: tip 💡
`env` 和 `configprops` 端点对于确定某个属性为什么具有特定的值非常有用。你可以使用这两个端点来诊断意外的属性值。详细信息请参阅 [生产就绪功能](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html) 章节
:::

## **访问命令行属性**

默认情况下，`SpringApplication` 会将所有命令行选项参数（即以 `--` 开头的参数，如 `--server.port=9000`）转换为 `property` 并将其添加到 Spring `Environment` 中。如前所述，命令行属性始终优先于基于文件的属性源

如果你不希望命令行属性被添加到环境中，可以通过使用 `SpringApplication.setAddCommandLineProperties(false)` 来禁用它们

## Json 应用属性

环境变量和系统属性通常有一些限制，意味着某些属性名称无法使用。为了帮助解决这个问题，Spring Boot 允许你将一组属性编码成一个单一的 JSON 结构

当应用程序启动时，任何 `spring.application.json` 或 `SPRING_APPLICATION_JSON` 属性将会被解析并添加到环境中

例如，`SPRING_APPLICATION_JSON` 属性可以在 UN\*X shell 中作为环境变量提供：

```Bash
$ SPRING_APPLICATION_JSON='{"my":{"name":"test"}}' java -jar myapp.jar
```

在上述例子中，最终你会得到 `my.name=test` 这个属性值被添加到 Spring `Environment` 中

相同的 JSON 也可以作为系统属性提供：

```Bash
$ java -Dspring.application.json='{"my":{"name":"test"}}' -jar myapp.jar
```

或者你也可以通过命令行参数提供 JSON：

```Bash
$ java -jar myapp.jar --spring.application.json='{"my":{"name":"test"}}'
```

如果你在传统的应用服务器中部署应用程序，还可以使用名为 `java:comp/env/spring.application.json` 的 JNDI 变量。

::: info ℹ️
尽管来自 JSON 的 `null` 值会被添加到结果属性源中，`PropertySourcesPropertyResolver` 会将 `null` 属性视为缺失的值。这意味着 JSON 不能用 `null` 值覆盖较低顺序的属性源中的属性
:::

## **外部应用配置文件**

Spring Boot 会在应用启动时自动查找并加载以下位置的 `application.properties` 和 `application.yaml` 文件：

1. **从 classpath**

```Plaintext
1. classpath 根目录
2. classpath 的 `/config` 包
```

1. **从当前目录**

```Plaintext
1. 当前目录
2. 当前目录下的 `config/` 子目录
3. `config/` 子目录下的直接子目录
```

这些位置按优先级排序（后面的文件会覆盖前面的配置）。从这些文件加载的内容会作为 `PropertySources` 添加到 Spring `Environment` 中

如果不想使用默认的 `application` 作为配置文件名，可以通过 `spring.config.name` 环境属性切换到其他文件名。例如，要查找 `myproject.properties` 和 `myproject.yaml`，可以这样运行应用：

```Bash
$ java -jar myproject.jar --spring.config.name=myproject
```

可以通过 `spring.config.location` 环境属性显式指定配置文件的位置。该属性接受一个用逗号分隔的文件或目录列表。以下示例指定了两个文件：

```Bash
$ java -jar myproject.jar --spring.config.location=\
        optional:classpath:/default.properties,\
        optional:classpath:/override.properties
```

::: tip 💡
使用 `optional:` 前缀可以表示这些位置是可选的，如果不存在也不会报错
:::

::: warning ⚠️
`spring.config.name`、`spring.config.location` 和 `spring.config.additional-location` 会在应用启动的非常早期阶段使用，以确定需要加载的文件。因此，必须以环境属性的形式定义（例如操作系统环境变量、系统属性或命令行参数）。
:::

如果 `spring.config.location` 包含目录，必须以 `/` 结尾。运行时，Spring Boot 会将其与 `spring.config.name` 生成的文件名结合后加载

::: info ℹ️
目录和文件位置的值也会扩展用以检查与[配置文件（Profile）相关的文件](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.profile-specific)。例如，如果设置了以下 `spring.config.location` 值：`classpath:myconfig.properties`, 那么 Spring Boot 也会加载相应的配置文件，例如：`classpath:myconfig-<profile>.properties`
:::

在大多数情况下，每个 `spring.config.location` 项通常会引用一个单独的文件或目录。配置位置按照定义的顺序进行处理，后面的位置可以覆盖前面的值

如果您的位置设置较为复杂，并且使用了与配置文件（Profile）相关的配置文件，则可能需要提供更多的提示，让 Spring Boot 知道这些位置应该如何分组。**位置组（Location Group）** 是将多个位置视为同一级别的一种方式。例如，您可能希望将所有 classpath 位置分组在一起，然后再分组所有外部位置。同一位置组内的条目应使用分号 `;` 分隔。有关更多详细信息，请参阅 [Profile Specific Files](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config.files.profile-specific) 部分中的示例。

通过 `spring.config.location` 配置的路径将替换默认位置。例如，如果使用以下值配置 `spring.config.location`：`optional:classpath:/custom-config/,optional:file:./custom-config/`

则考虑的完整位置集为：

- `optional:classpath:custom-config/`
- `optional:file:./custom-config/`

如果您更倾向于在默认位置之外添加额外的位置，而不是替换默认位置，则可以使用 `spring.config.additional-location`。从额外位置加载的属性可以覆盖默认位置中的值。例如，如果使用以下值配置 `spring.config.additional-location`：`optional:classpath:/custom-config/,optional:file:./custom-config/`

则考虑的完整位置集为：

- `optional:classpath:/;optional:classpath:/config/`
- `optional:file:./;optional:file:./config/;optional:file:./config*/*/*`
- `optional:classpath:custom-config/`
- `optional:file:./custom-config/`

这种搜索顺序允许您在一个配置文件中指定默认值，然后在另一个配置文件中有选择性地覆盖这些值。例如，您可以在默认位置的 `application.properties` 文件（或通过 `spring.config.name` 指定的其他 basename 文件）中提供应用的默认值，然后在运行时通过位于自定义位置的不同文件覆盖这些默认值

### **可选位置 (Optional Locations)**

默认情况下，如果指定的配置数据位置不存在，Spring Boot 会抛出 `ConfigDataLocationNotFoundException`，并阻止您的应用启动。

如果您希望指定一个位置，但不介意该位置是否始终存在，可以使用 `optional:` 前缀。该前缀可以与以下属性结合使用：

- `spring.config.location`
- `spring.config.additional-location`
- [`spring.config.import`](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.importing)

例如，设置 `spring.config.import` 的值为 `optional:file:./myconfig.properties`，即使 `myconfig.properties` 文件缺失，您的应用也可以正常启动。

如果您希望忽略所有 `ConfigDataLocationNotFoundException` 并始终启动应用，可以使用 `spring.config.on-not-found` 属性。将其值设置为 `ignore`，可以通过以下方式配置：

- 使用 `SpringApplication.setDefaultProperties(...)`
- 通过系统或环境变量进行设置

这样可以确保无论任何配置位置是否存在，应用都会正常启动

### **通配符位置 (Wildcard Locations)**

如果配置文件位置的最后一个路径段包含 `*` 字符，则被视为通配符位置。当加载配置时，通配符会展开，以检查该路径的直接子目录。通配符位置在某些环境（例如 Kubernetes）中特别有用，当存在多个配置属性来源时，可以有效管理这些配置。

假设有一些 Redis 和 MySQL 的配置文件，希望将这些配置分开管理，但同时要求它们都存在于 `application.properties` 文件中。可能的文件路径如下：

- `/config/redis/application.properties`
- `/config/mysql/application.properties`

在这种情况下，可以使用通配符位置 `config/*/`，这样两者的配置文件都会被处理

Spring Boot 默认包含 `config/*/` 在其搜索路径中。这意味着，`/config` 目录的所有子目录（在 jar 包外）都会被自动搜索

您可以使用以下属性自定义通配符位置：`spring.config.location` 和 `spring.config.additional-location`

::: info ℹ️
通配符位置必须仅包含一个 `*`，如果是目录路径，则必须以 `*/` 结尾, 如果是文件路径，则必须以 `*/<filename>` 的形式结尾
:::

::: tip 💡
使用通配符查找的位置会按照文件名的绝对路径字母顺序进行排序
:::

通配符位置仅适用于外部目录。您不能在 `classpath:` 位置中使用通配符

### **特定配置文件的文件**

除了常规的 `application` 属性文件，Spring Boot 还会尝试加载特定于配置文件的文件，命名约定为 `application-{profile}` 例如，如果您的应用程序激活了名为 `prod` 的配置文件并使用 YAML 文件，那么会加载 `application.yaml` 和 `application-prod.yaml`。

特定配置文件的属性从与标准 `application.properties` 相同的位置加载，且特定配置文件的文件始终会覆盖非特定的文件。如果指定了多个配置文件，则采用“后者优先”的策略。例如，如果通过 `spring.profiles.active` 属性指定了 `prod`,`live` 配置文件，那么 `application-prod.properties` 中的值可能会被 `application-live.properties` 中的值覆盖

::: info ℹ️
在[位置组级别](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.location-groups)，“后者优先”的策略适用。如果 `spring.config.location` 被设置为 `classpath:/cfg/,classpath:/ext/`，其覆盖规则将不同于 `classpath:/cfg/;classpath:/ext/`。
:::

例如，基于前面提到的 `prod`,`live` 配置文件，我们可能有以下文件：

```Bash
/cfg
  application-live.properties
/ext
  application-live.properties
  application-prod.properties
```

::: info ℹ️
当 `spring.config.location` 被设置为 `classpath:/cfg/,classpath:/ext/` 时，Spring Boot 会先处理所有 `/cfg` 文件，然后再处理所有 `/ext` 文件：
1. `/cfg/application-live.properties`
2. `/ext/application-prod.properties`
3. `/ext/application-live.properties`
当使用 `classpath:/cfg/;classpath:/ext/`（使用分号 ; 作为分隔符）时，Spring Boot 会将 `/cfg` 和 `/ext` 视为同一级别进行处理：
1. `/ext/application-prod.properties`
2. `/cfg/application-live.properties`
3. `/ext/application-live.properties`
:::

`Environment` 提供了一组默认的配置文件（默认是 `[default]`），当没有设置活动配置文件时将会使用这些默认配置文件。换句话说，如果没有显式激活任何配置文件，那么会使用 `application-default` 中的属性值

::: info ℹ️
属性文件只会被加载一次。如果您已经直接[导入](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.importing)了一个特定配置文件的属性文件，那么它不会被再次导入
:::

### **导入额外数据**

应用程序属性文件可以通过 `spring.config.import` 属性从其他位置导入更多的配置数据。导入会在被发现时立即处理，并作为额外的文档插入到声明导入的文档之下

例如，您的 classpath 下的 `application.properties` 文件可能包含以下内容：

```Plaintext
spring.application.name=myapp
spring.config.import=optional:file:./dev.properties
```

上述例子会触发当前目录下的 `dev.properties` 文件的导入（如果该文件存在）。从 `dev.properties` 导入的值将优先于触发导入的文件中的值。例如，在上述情况下，`dev.properties` 可以将 `spring.application.name` 重定义为一个不同的值。

无论某个导入被声明多少次，它只会被导入一次。此外，导入在单个属性文件或 YAML 文件中的声明顺序并不重要。例如，以下两个例子产生的结果相同：

```Plaintext
spring.config.import=my.properties
my.property=value
```

```Plaintext
my.property=value
spring.config.import=my.properties
```

在上述两个例子中，从 `my.properties` 文件导入的值将优先于触发其导入的文件中的值。

可以在单个 `spring.config.import` 键下指定多个位置。位置会按照定义的顺序依次处理，后面的导入会覆盖前面的值。

::: info ℹ️
在适当情况下，也会考虑[配置文件（Profile）特定的变体](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.profile-specific)。例如，上述例子会导入 `my.properties` 和任何 `my-<profile>.properties` 变体（例如 `my-dev.properties`、`my-prod.properties`）。
:::

spring.config.import=classpath:base.properties,classpath:my.properties

此时，my.properties 中的值会覆盖 base.properties 中的值。

**支持按配置文件的变体**

**扩展支持的导入位置**

**自定义导入位置**

这些类允许你定义自己的导入位置逻辑和加载方式，从而满足特定需求。

::: tip 💡
Spring Boot 提供了可插拔的 API，用于支持各种导入地址。默认情况下，你可以导入 **Java Properties**、**YAML** 和 [**配置树**](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.configtree)。
此外，第三方 JAR 文件可以提供对其他技术的支持（导入的文件不需要是本地的）。例如，配置数据可以来自以下外部存储：
- **Consul**
- **Apache ZooKeeper**
- **Netflix Archaius**
如果需要支持自定义位置，可以查看 `org.springframework.boot.context.config` 包中的以下类：`ConfigDataLocationResolver` 和 `ConfigDataLoader`
:::

### **导入无扩展名文件**

某些云平台无法为挂载的卷文件添加文件扩展名。要导入这些无扩展名的文件，需要向 Spring Boot 提供提示，使其知道如何加载这些文件。可以通过在文件名后添加方括号中的扩展名提示来实现。

假设有一个无扩展名的文件 `/etc/config/myconfig`，希望将其作为 YAML 文件导入，可以在 `application.properties` 文件中使用以下配置：

```Plaintext
spring.config.import=file:/etc/config/myconfig[.yaml]
```

### **使用配置树**

在云平台（如 Kubernetes）上运行应用程序时，通常需要读取平台提供的配置值。尽管环境变量经常用于此目的，但如果值需要保密，使用环境变量可能会存在一些缺点。

作为环境变量的替代方案，许多云平台现在允许将配置映射到挂载的数据卷中。例如，Kubernetes 可以将 [**ConfigMaps**](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#populate-a-volume-with-data-stored-in-a-configmap) 和 [**Secrets**](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-files-from-a-pod) 挂载为数据卷。

**两种常见的挂载模式**

1. \*\*单个文件包含完整的属性集 (\*\*通常以 YAML 格式编写)
2. \*\*多个文件写入目录树 (\*\*文件名作为 ‘key’，文件内容作为 ‘value’)。

**对于单文件模式,** 可以直接使用 `spring.config.import` 导入 YAML 或 Properties 文件（如前文所述）。**对于目录树模式,** 需要使用 `configtree:` 前缀，这样 Spring Boot 就能识别目录树并将所有文件的内容作为属性公开。

作为示例，我们假设 Kubernetes 已挂载了以下卷：

```Plaintext
etc/
  config/
    myapp/
      username
      password
```

`username` 文件的内容将是一个配置值，而 `password` 文件的内容将是一个密钥。

要导入这些属性，您可以将以下内容添加到您的 `application.properties` 或 `application.yaml` 文件中：

```Plaintext
spring.config.import=optional:configtree:/etc/config/
```

然后，您可以以通常的方式从 Environment 中访问或注入 `myapp.username` 和 `myapp.password` 属性

::: tip 💡
在配置树下，文件夹和文件的名称将构成属性名。在上述示例中，为了以 `username` 和 `password` 的形式访问属性，您可以将 `spring.config.import` 设置为 `optional:configtree:/etc/config/myapp`
:::

::: info ℹ️
使用点号表示法的文件名也会被正确映射。例如，在上述示例中，`/etc/config` 中名为 `myapp.username` 的文件会在 `Environment` 中对应为 `myapp.username` 属性。
:::

::: tip 💡
配置树的值可以根据预期内容绑定为 `String` 或 `byte[]` 类型。
:::

如果您需要从同一父文件夹导入多个配置树，可以使用通配符简化操作。任何以 `/*/` 结尾的 `configtree:` 位置都会将所有直接子目录作为配置树导入。与非通配符导入一样，每个配置树下文件夹和文件的名称将构成属性名

例如, 如下的目录结构

```Plaintext
etc/
  config/
    dbconfig/
      db/
        username
        password
    mqconfig/
      mq/
        username
        password
```

你可以使用 `configtree:/etc/config/*/` 作为导入路径

```Plaintext
spring.config.import=optional:configtree:/etc/config/*/
```

这将添加 `db.username`、`db.password`、`mq.username` 和 `mq.password` 属性。

::: info ℹ️
使用通配符加载的目录会按字母顺序排序。如果需要不同的加载顺序，您应该将每个位置作为单独的导入进行配置
:::

配置树也可以用于 Docker 密钥。当 Docker Swarm 服务被授予访问密钥的权限时，该密钥会被挂载到容器中。例如，如果一个名为 `db.password` 的密钥被挂载到 `/run/secrets/` 目录下，您可以通过以下配置将 `db.password` 提供给 Spring 环境：

```Plaintext
spring.config.import=optional:configtree:/run/secrets/
```

### **属性占位符**

在使用 `application.properties` 和 `application.yaml` 中的值时，这些值会通过现有的 `Environment` 进行过滤，因此您可以引用之前定义的值（例如，来自系统属性或环境变量的值）。

可以在值的任何地方使用标准的 `${name}` 属性占位符语法。

属性占位符还可以通过使用冒号 `:` 来指定默认值，用于在属性名称之后分隔默认值。例如：`${name:default}`

以下示例展示了带默认值和不带默认值的占位符使用方式

```Plaintext
app.name=MyApp
app.description=${app.name} is a Spring Boot application written by ${username:Unknown}
```

假设 `username` 属性未在其他地方设置，那么 `app.description` 的值将会是：`MyApp is a Spring Boot application written by Unknown`

::: info ℹ️
您应该始终使用属性名称的规范形式（即使用小写字母并以连字符分隔的 `kebab-case`）在占位符中引用属性。这将使 Spring Boot 能够与其在松散绑定 `@ConfigurationProperties` 时使用的逻辑保持一致。
例如，`${demo.item-price}` 将从 `application.properties` 文件中获取 `demo.item-price` 和 `demo.itemPrice` 的值，同时也会从系统环境中获取 `DEMO_ITEMPRICE` 的值。
但如果使用 `${demo.itemPrice}`，则不会考虑 `demo.item-price` 和 `DEMO_ITEMPRICE`。
:::

::: tip 💡
您还可以使用这种技术为现有的 Spring Boot 属性创建“简短”形式的变量。有关详细信息，请参阅“操作指南”中的[使用“简短”命令行参数](https://docs.spring.io/spring-boot/how-to/properties-and-configuration.html#howto.properties-and-configuration.short-command-line-arguments)部分。
:::

### **处理多文档文件**

Spring Boot 允许您将一个物理文件拆分为多个逻辑文档，每个文档都会被独立添加。这些文档会按从上到下的顺序依次处理。后面的文档可以覆盖前面文档中定义的属性。

对于 `application.yaml` 文件，可以使用标准的 YAML 多文档语法。三个连续的连字符 --- 表示一个文档的结束和下一个文档的开始。

例如, 以下文件有两个逻辑文档

```YAML
spring:
  application:
    name: "MyApp"
---
spring:
  application:
    name: "MyCloudApp"
  config:
    activate:
      on-cloud-platform: "kubernetes"
```

**对于** `application.properties` **文件**，可以使用特殊的注释标记 `#---` 或 `!---` 来分隔文档。

```YAML
spring.application.name=MyApp
#---
spring.application.name=MyCloudApp
spring.config.activate.on-cloud-platform=kubernetes
```

::: info ℹ️
属性文件的分隔符前不能有任何空格，且必须正好包含三个连字符 ---。分隔符前后紧邻的行不能使用相同的注释前缀
:::

::: tip 💡
多文档属性文件通常与激活属性（如 `spring.config.activate.on-profile`）一起使用。有关详细信息，请参阅下一部分。
:::

::: warning ⚠️
多文档属性文件不能通过 `@PropertySource` 或 `@TestPropertySource` 注解加载。
:::

### 激活属性

在某些情况下，仅在满足特定条件时激活一组属性是很有用的。例如，您可能有一些属性仅在某个特定的配置文件（profile）处于活动状态时才相关。

您可以使用 `spring.config.activate.*` 条件性地激活某个属性文档。

以下是可用的激活属性：

| Property | Note |
|-|-|
| `on-profile` | 一个必须匹配的 **profile 表达式**，只有在匹配时该文档才会被激活 |
| `on-cloud-platform` | 必须检测到的 **CloudPlatform**，只有在满足该条件时该文档才会被激活 |

```Plaintext
myprop=always-set
#---
spring.config.activate.on-cloud-platform=kubernetes
spring.config.activate.on-profile=prod | staging
myotherprop=sometimes-set
```

## **加密属性**

Spring Boot 本身不提供内置支持来加密属性值，但它提供了必要的挂钩点，可以用来修改 Spring `Environment` 中的值。您可以使用 `EnvironmentPostProcessor` 接口在应用启动之前操作 `Environment`。详细信息请参阅 [在启动前自定义 Environment 或 ApplicationContext](https://docs.spring.io/spring-boot/how-to/application.html#howto.application.customize-the-environment-or-application-context)。

如果需要一种安全的方式来存储凭据和密码，可以使用 [**Spring Cloud Vault**](https://cloud.spring.io/spring-cloud-vault/) 项目，它支持将外部化配置存储在 [**HashiCorp Vault**](https://www.vaultproject.io/) 中。

## 处理 Yaml 文件

[YAML](https://yaml.org/) 是 JSON 的超集，因此是指定层次化配置数据的便利格式。只要您的类路径中包含 [**SnakeYAML**](https://github.com/snakeyaml/snakeyaml) 库，`SpringApplication` 类就会自动支持 YAML 作为属性文件的替代格式。

::: info ℹ️
如果使用 Spring Boot 的 starters，`spring-boot-starter` 会自动引入 **SnakeYAML** 库
:::

### **将 YAML 映射为属性**

YAML 文档需要从其层次结构转换为平面结构，以便与 Spring Environment 配合使用。例如，以下是一个 YAML 文档：

```YAML
environments:
  dev:
    url: "https://dev.example.com"
    name: "Developer Setup"
  prod:
    url: "https://another.example.com"
    name: "My Cool App"
```

为了从 `Environment` 中访问这些属性，它们会被扁平化为以下形式：

```Plaintext
environments.dev.url=https://dev.example.com
environments.dev.name=Developer Setup
environments.prod.url=https://another.example.com
environments.prod.name=My Cool App
```

同样，YAML 列表也需要被扁平化。它们表示为带有 `[索引]` 的属性键。例如，以下是一个 YAML 示例：

```YAML
 my:
  servers:
  - "dev.example.com"
  - "another.example.com"
```

上述示例将被转换为以下属性形式

```Plaintext
my.servers[0]=dev.example.com
my.servers[1]=another.example.com
```

::: tip 💡
使用 `[索引]` 表示法的属性可以通过 Spring Boot 的 `Binder` 类绑定到 Java 的 List 或 Set 对象。有关更多信息，请参阅下文的[**类型安全的配置属性**](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties)部分。
:::

::: warning ⚠️
YAML 文件不能通过 `@PropertySource` 或 `@TestPropertySource` 注解加载。因此，如果需要以这种方式加载值，则需要使用属性文件（properties file）。
:::

### 直接加载 YAML

Spring 框架提供了两个便捷的类，用于加载 YAML 文档。`YamlPropertiesFactoryBean`：将 YAML 加载为 `Properties`。`YamlMapFactoryBean`：将 YAML 加载为 `Map`。

如果您想将 YAML 加载为 Spring 的 `PropertySource`，还可以使用 `YamlPropertySourceLoader` 类

## 配置随机值

`RandomValuePropertySource` 对于注入随机值（例如，用于密钥或测试用例）非常有用。它可以生成整数、长整型、UUID 或字符串，以下是一个示例:

```Plaintext
my.secret=${random.value}
my.number=${random.int}
my.bignumber=${random.long}
my.uuid=${random.uuid}
my.number-less-than-ten=${random.int(10)}
my.number-in-range=${random.int[1024,65536]}
```

`random.int*` 语法格式为 `OPEN value (,max) CLOSE`，其中 `OPEN` 和 `CLOSE` 可以是任何字符，`value` 和 `max` 是整数。如果提供了 `max`，则 `value` 是最小值，`max` 是最大值（不包括 max）

## 配置系统环境属性

Spring Boot 支持为环境属性设置前缀。当多个 Spring Boot 应用共享相同的系统环境且有不同的配置需求时，这非常有用。系统环境属性的前缀可以直接在 `SpringApplication` 上设置。

例如，如果您将前缀设置为 `input`，则像 `remote.timeout` 这样的属性将被解析为系统环境中的 `input.remote.timeout`

## 类型安全配置属性

使用 `@Value("${property}")` 注解来注入配置属性有时会很繁琐，尤其是在处理多个属性或数据是层次结构时。Spring Boot 提供了另一种处理属性的方法，它允许强类型的 bean 来管理和验证应用程序的配置

::: tip 💡
查看 [@Value 和 ](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.vs-value-annotation)[**类型安全的配置属性**](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.vs-value-annotation)[ 之间的区别](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.vs-value-annotation)
:::

### JavaBean 属性绑定

确实可以通过声明标准的 JavaBean 属性来绑定一个 bean，如下例所示

```Java
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("my.service")
public class MyProperties {

        private boolean enabled;

        private InetAddress remoteAddress;

        private final Security security = new Security();

        public boolean isEnabled() {
                return this.enabled;
        }

        public void setEnabled(boolean enabled) {
                this.enabled = enabled;
        }

        public InetAddress getRemoteAddress() {
                return this.remoteAddress;
        }

        public void setRemoteAddress(InetAddress remoteAddress) {
                this.remoteAddress = remoteAddress;
        }

        public Security getSecurity() {
                return this.security;
        }

        public static class Security {

                private String username;

                private String password;

                private List<String> roles = new ArrayList<>(Collections.singleton("USER"));

                public String getUsername() {
                        return this.username;
                }

                public void setUsername(String username) {
                        this.username = username;
                }

                public String getPassword() {
                        return this.password;
                }

                public void setPassword(String password) {
                        this.password = password;
                }

                public List<String> getRoles() {
                        return this.roles;
                }

                public void setRoles(List<String> roles) {
                        this.roles = roles;
                }

        }

}
```

这个 POJO (Plain Old Java Object) 定义了以下属性：

- `my.service.enabled`：默认值为 `false`。
- `my.service.remote-address`：类型强制为 `String`。
- `my.service.security.username`：带有嵌套的 “security” 对象，其名称由属性的名称决定。特别地，这里的类型完全没有使用，可以是 `SecurityProperties` 类
- `my.service.security.password`
- `my.service.security.roles`：一个 `List<String>`，默认值为 `USER`。

::: info ℹ️
映射到 Spring Boot 中 `@ConfigurationProperties` 类的属性通过属性文件、YAML 文件、环境变量以及其他机制进行配置，这些属性是公共 API，但类本身的访问器（getter/setter）并不建议直接使用。
:::

::: info ℹ️
这种设计依赖于默认的无参构造函数，并且通常需要 getter 和 setter 方法，因为绑定是通过标准的 Java Beans 属性描述符完成的，与 Spring MVC 类似。以下情况可以省略 setter 方法：
- **Map 类型**：只要已初始化，通常只需要 getter 方法，而不需要 setter 方法，因为绑定器可以直接修改它们。
- **集合和数组**：可以通过索引（通常用于 YAML）访问，或者通过单个逗号分隔的值（用于属性文件）访问。在后一种情况下，setter 方法是必需的。建议始终为此类类型添加 setter 方法。如果初始化了集合，请确保它不是不可变的（如前例中所示）。
- **嵌套的 POJO 属性**：如果已初始化（例如前例中的 `Security` 字段），则不需要 setter 方法。如果希望绑定器在需要时通过默认构造函数创建实例，则需要提供 setter 方法。
一些开发者使用 **Project Lombok** 自动生成 getter 和 setter 方法。请确保 Lombok 不为此类生成特定的构造函数，因为容器会自动使用默认构造函数来实例化对象。
最后，仅支持标准的 Java Bean 属性，绑定不支持静态属性。
:::

### 构造器绑定

上一节中的示例可以用不可变的方式重写，如下所示：

```Java
import java.net.InetAddress;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties("my.service")
public class MyProperties {

        private final boolean enabled;

        private final InetAddress remoteAddress;

        private final Security security;

        public MyProperties(boolean enabled, InetAddress remoteAddress, Security security) {
                this.enabled = enabled;
                this.remoteAddress = remoteAddress;
                this.security = security;
        }

        public boolean isEnabled() {
                return this.enabled;
        }

        public InetAddress getRemoteAddress() {
                return this.remoteAddress;
        }

        public Security getSecurity() {
                return this.security;
        }

        public static class Security {

                private final String username;

                private final String password;

                private final List<String> roles;

                public Security(String username, String password, @DefaultValue("USER") List<String> roles) {
                        this.username = username;
                        this.password = password;
                        this.roles = roles;
                }

                public String getUsername() {
                        return this.username;
                }

                public String getPassword() {
                        return this.password;
                }

                public List<String> getRoles() {
                        return this.roles;
                }

        }

}
```

在此设置中，单个带参数的构造函数的存在意味着应使用**构造函数绑定**。这表示绑定器将找到一个具有所需绑定参数的构造函数。如果您的类有多个构造函数，可以使用 `@ConstructorBinding` 注解来指定用于构造函数绑定的构造函数。若要为带参数的单个构造函数类禁用构造函数绑定，则必须将该构造函数标注为 `@Autowired` 或将其设置为 `private`。构造函数绑定也可以用于 **record**。如果 record 没有多个构造函数，则无需使用 `@ConstructorBinding`。

通过构造函数绑定的类中的嵌套成员（例如上例中的 `Security`）也将通过它们的构造函数进行绑定。

可以使用 `@DefaultValue` 注解为构造函数参数和 record 组件指定默认值。转换服务会将注解中的`String` 值强制转换为缺失属性的目标类型。

参考前面的示例，如果没有属性绑定到 `Security`，则 `MyProperties` 实例中的 `security` 将包含一个 `null` 值。为了在没有任何属性绑定时（使用 Kotlin 时，由于 `Security` 的 `username` 和 `password` 参数没有默认值，它们需要声明为可空类型）让 `security` 包含一个非空实例，可以在构造函数参数上使用空的 `@DefaultValue` 注解：

```Java
        public MyProperties(boolean enabled, InetAddress remoteAddress, @DefaultValue Security security) {
                this.enabled = enabled;
                this.remoteAddress = remoteAddress;
                this.security = security;
        }
```

::: info ℹ️
要使用构造函数绑定，必须通过 `@EnableConfigurationProperties` 或配置属性扫描启用该类。无法对通过常规 Spring 机制创建的 Bean（例如，`@Component` Bean、通过 `@Bean` 方法创建的 Bean 或通过 `@Import` 加载的 Bean）使用构造函数绑定。
:::

::: info ℹ️
要启用构造函数绑定，类必须使用 `-parameters` 选项进行编译。如果使用 Spring Boot 的 Gradle 插件或 Maven 且依赖于 `spring-boot-starter-parent`，这将自动完成。
:::

::: info ℹ️
**不建议**在 `@ConfigurationProperties` 中使用 `java.util.Optional`，因为它主要用于返回类型。在属性注入中，`Optional` 并不适用。为了与其他类型的属性保持一致，如果声明了一个 `Optional` 属性且其没有值，绑定结果将是 `null`，而不是一个空的 `Optional`。
:::

::: tip 💡
如果属性名中使用了保留关键字（例如 `my.service.import`），可以在构造函数参数上使用 `@Name` 注解指定名称
:::

### 启用 @ConfigurationProperties 注解类型

Spring Boot 提供了绑定 `@ConfigurationProperties` 类型并将其注册为 Bean 的基础设施。您可以按类启用配置属性，也可以启用类似于组件扫描的配置属性扫描。

有时，使用 `@ConfigurationProperties` 注解的类可能不适合扫描，例如，当您正在开发自己的自动配置或希望有条件地启用这些类时。在这些情况下，可以通过 `@EnableConfigurationProperties` 注解指定要处理的类型列表。这可以在任意 `@Configuration` 类中完成，如以下示例所示：

```Java
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(SomeProperties.class)
public class MyConfiguration {

}
```

```Java
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("some.properties")
public class SomeProperties {

}
```

要使用配置属性扫描，可以在应用程序中添加 `@ConfigurationPropertiesScan` 注解。通常，这个注解会添加到使用 `@SpringBootApplication` 标注的主应用程序类中，但它也可以添加到任何 `@Configuration` 类中。默认情况下，扫描会从声明该注解的类所在的包开始。如果需要指定特定的包进行扫描，可以按如下示例进行设置：

```Java
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan({ "com.example.app", "com.example.another" })
public class MyApplication {

}
```

::: info ℹ️
当使用配置属性扫描或通过 `@EnableConfigurationProperties` 注册 `@ConfigurationProperties` Bean 时，Bean 会拥有一个约定的名称：`<prefix>-<fqn>`，其中 `<prefix>` 是 `@ConfigurationProperties` 注解中指定的环境键前缀，`<fqn>` 是 Bean 的完全限定名。如果注解未指定任何前缀，则仅使用 Bean 的完全限定名。
假设 `SomeProperties` 类位于 `com.example.app` 包中，那么上述示例中该 Bean 的名称为：`some.properties-com.example.app.SomeProperties`
:::

我们建议 `@ConfigurationProperties` 仅用于处理环境变量，尤其不要从上下文中注入其他 Bean。在特殊情况下，可以使用 **setter 注入** 或框架提供的 **`*Aware`** 接口（例如，如果需要访问 `Environment`，可以使用 `EnvironmentAware`）。

如果仍希望通过构造函数注入其他 Bean，则配置属性类必须使用 `@Component` 注解，并采用基于 JavaBean 的属性绑定。

### 使用 @ConfigurationProperties 注解类型

这种配置方式特别适用于 `SpringApplication` 的外部 YAML 配置，如以下示例所示

```YAML
my:
  service:
    remote-address: 192.168.1.1
    security:
      username: "admin"
      roles:
      - "USER"
      - "ADMIN"
```

要使用 `@ConfigurationProperties` Bean，可以像其他 Bean 一样将其注入，示例如下：

```Java
import org.springframework.stereotype.Service;

@Service
public class MyService {

        private final MyProperties properties;

        public MyService(MyProperties properties) {
                this.properties = properties;
        }

        public void openConnection() {
                Server server = new Server(this.properties.getRemoteAddress());
                server.start();
                // ...
        }

        // ...

}
```

::: tip 💡
使用 `@ConfigurationProperties` 还可以生成元数据文件，这些文件可以被 IDE 用于为自定义键提供自动补全功能。有关详细信息，请参阅[附录](https://docs.spring.io/spring-boot/specification/configuration-metadata/index.html)。
:::

### 三方配置

除了使用 `@ConfigurationProperties` 注解类之外，还可以将其用于公共的 `@Bean` 方法。当需要将属性绑定到您无法控制的第三方组件时，这种方式尤其有用。

要从 `Environment` 属性配置一个 Bean，可以在其 Bean 注册中添加 `@ConfigurationProperties`，如下示例所示：

```Java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class ThirdPartyConfiguration {

        @Bean
        @ConfigurationProperties(prefix = "another")
        public AnotherComponent anotherComponent() {
                return new AnotherComponent();
        }

}
```

使用 `another` 前缀定义的任何 JavaBean 属性都会以类似于前面 `SomeProperties` 示例的方式映射到该 `AnotherComponent` Bean 上。

### **宽松绑定**

Spring Boot 对将 `Environment` 属性绑定到 `@ConfigurationProperties` Bean 使用了一些宽松的规则，因此环境属性名称和 Bean 属性名称之间不需要完全匹配。这在以下常见情况下非常有用：

- 使用短横线分隔的环境属性（例如，context-path 会绑定到 contextPath）。
- 大写形式的环境属性（例如，PORT 会绑定到 port）。

例如，考虑以下 `@ConfigurationProperties` 类：

```Java
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "my.main-project.person")
public class MyPersonProperties {

        private String firstName;

        public String getFirstName() {
                return this.firstName;
        }

        public void setFirstName(String firstName) {
                this.firstName = firstName;
        }

}
```

使用上述代码，以下属性名称都可以使用

| `my.main-project.person.first-name` | **Kebab case**（短横线命名法）, 推荐用于 .properties 和 YAML 文件 |
|-|-|
| `my.main-project.person.firstName` | **Camel case**（驼峰命名法）, 标准的驼峰语法格式 |
| `my.main-project.person.first_name` | **Underscore notation**（下划线命名法）, `.properties` 和 YAML 文件的另一种替代格式 |
| `MY_MAINPROJECT_PERSON_FIRSTNAME` | **Upper case format**（全大写格式）, 推荐用于系统环境变量 |

::: info ℹ️
注解的前缀值必须采用 kebab case 格式（即小写字母并用 `-` 分隔，例如 `my.main-project.person`）
:::

| Property Source | Simple | List |
|-|-|-|
| **Properties 文件** | Camel case、Kebab case 或 Underscore notation | 标准列表语法（使用 `[ ]`）或逗号分隔的值 |
| **YAML 文件** | Camel case、Kebab case 或 Underscore notation | 标准 YAML 列表语法或逗号分隔的值 |
| **环境变量** | 全大写格式，使用下划线作为分隔符（参见[环境变量绑定](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables)） | 数值可用下划线包裹（参见[环境变量绑定](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables)） |
| **系统属性** | Camel case、Kebab case 或 Underscore notation | 标准列表语法（使用 `[ ]`）或逗号分隔的值 |

我们建议尽可能以 **小写 kebab 格式** 存储属性，例如：`my.person.first-name=Rod`

**绑定到 Map 的属性**

在将属性绑定到 `Map` 时，可能需要使用特殊的括号表示法 `[]` 以保留原始 `key`。如果键未被 `[]` 包围，任何非字母数字字符、`-` 或 `.` 的字符都会被移除。

例如，考虑将以下属性绑定到 `Map<String, String>`：

```Plaintext
my.map[/key1]=value1
my.map[/key2]=value2
my.map./key3=value3
```

::: info ℹ️
在 YAML 文件中，键的括号 `[]` 需要用引号包围，以确保键能够被正确解析
:::

```YAML
my:
  map:
    "[/key1]": "value1"
    "[/key2]": "value2"
    "/key3": "value3"
```

上述属性会绑定到一个 `Map` 中，键分别为 `/key1`、`/key2` 和 `key3`。由于 `key3` 没有用方括号 `[]` 包围，键中的斜杠 `/` 被移除。

当绑定标量值时，带有 `.` 的键不需要用 `[]` 包围。**标量值**包括枚举以及 `java.lang` 包中除 `Object` 以外的所有类型。例如，将 `a.b=c` 绑定到 `Map<String, String>` 时，键中的 `.` 会被保留，结果为 `{"a.b"="c"}`。

对于其他类型，如果键包含 `.`，则需要使用方括号表示法。例如：

•        绑定 `a.b=c` 到 `Map<String, Object>` 时，结果为 `{"a"={"b"="c"}}`。

•        绑定 `[a.b]=c` 时，结果为 `{"a.b"="c"}`。

**从环境变量绑定**

大多数操作系统对环境变量的名称有严格限制。例如，Linux Shell 变量只能包含字母（`a`-`z` 或 `A`-`Z`）、数字（`0`-`9`）或下划线字符（`_`）。按照惯例，Unix Shell 变量的名称通常为全大写形式。

Spring Boot 的宽松绑定规则尽可能设计为与这些命名限制兼容。

要将规范形式的属性名转换为环境变量名，可遵循以下规则：

- 将点号 (`.`) 替换为下划线 (`_`)
- 移除任何短横线 (`-`)
- 转换为大写字母

例如，配置属性 `spring.main.log-startup-info` 对应的环境变量名为 `SPRING_MAIN_LOGSTARTUPINFO`

环境变量也支持绑定到对象列表。要绑定到 List 类型，元素编号应使用下划线包裹在变量名中。例如，配置属性 `my.service[0].other` 对应的环境变量名为 `MY_SERVICE_0_OTHER`。

支持从环境变量绑定的范围包括 `systemEnvironment` 属性源以及名称以 `-systemEnvironment` 结尾的任何额外属性源

**从环境变量绑定到 Map**

当 Spring Boot 将环境变量绑定到属性类时，会在绑定之前将环境变量名称转换为小写。大多数情况下，这一细节并不重要，但在绑定到 `Map` 类型属性时需要注意。

在绑定过程中，Map 中的键始终会被转换为小写，如以下示例所示：

```Java
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "my.props")
public class MyMapsProperties {

        private final Map<String, String> values = new HashMap<>();

        public Map<String, String> getValues() {
                return this.values;
        }

}
```

当设置环境变量 `MY_PROPS_VALUES_KEY=value` 时，`values` 的 `Map` 中包含一个 `{"key"="value"}` 的条目。

只有环境变量的名称会被转换为小写，值不会被改变。例如，当设置 `MY_PROPS_VALUES_KEY=VALUE` 时，`values` 的 `Map` 中包含一个 `{"key"="VALUE"}` 的条目。

**缓存**

松散绑定（Relaxed Binding）使用缓存来提升性能。默认情况下，此缓存仅适用于不可变的属性源（immutable property sources）。若要自定义此行为，例如为可变的属性源（mutable property sources）启用缓存，可以使用 `ConfigurationPropertyCaching`

### **合并复杂类型**

当列表在多个地方配置时，覆盖操作会替换整个列表。

例如，假设有一个 `MyPojo` 对象，其 `name` 和 `description` 属性默认都为 `null`。以下示例通过 `MyProperties` 暴露了一个包含 `MyPojo` 对象的列表：

```Java
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("my")
public class MyProperties {

        private final List<MyPojo> list = new ArrayList<>();

        public List<MyPojo> getList() {
                return this.list;
        }

}
```

思考如下配置

```Plaintext
my.list[0].name=my name
my.list[0].description=my description
#---
spring.config.activate.on-profile=dev
my.list[0].name=my another name
```

如果 `dev` 配置文件未激活，`MyProperties.list` 包含一个先前定义的 `MyPojo` 条目。但如果启用了 `dev` 配置文件，列表仍然只包含一个条目（`name` 为 `my another name`，`description` 为 `null`）。此配置不会向列表中添加第二个 `MyPojo` 实例，也不会合并条目

当一个 `List` 在多个配置文件中被指定时，仅使用优先级最高的配置文件（且仅使用该配置文件）。以下是一个示例：

```Plaintext
my.list[0].name=my name
my.list[0].description=my description
my.list[1].name=another name
my.list[1].description=another description
#---
spring.config.activate.on-profile=dev
my.list[0].name=my another name
```

在前面的示例中，如果 `dev` 配置文件被激活，`MyProperties.list` 包含一个 `MyPojo` 条目（`name` 为 `my another name`，`description` 为 `null`）。对于 YAML，既可以使用逗号分隔的列表，也可以使用 YAML 列表来完全覆盖列表的内容。

对于 Map 属性，您可以将来自多个来源的属性值绑定在一起。然而，对于多个来源中的同一属性，将使用优先级最高的一个。以下示例暴露了来自 `MyProperties` 的 `Map<String, MyPojo>`：

```Java
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("my")
public class MyProperties {

        private final Map<String, MyPojo> map = new LinkedHashMap<>();

        public Map<String, MyPojo> getMap() {
                return this.map;
        }

}
```

思考如下配置

```Plaintext
my.map.key1.name=my name 1
my.map.key1.description=my description 1
#---
spring.config.activate.on-profile=dev
my.map.key1.name=dev name 1
my.map.key2.name=dev name 2
my.map.key2.description=dev description 2
```

如果 dev 配置文件未激活，则 `MyProperties.map` 包含一个条目，键为 `key1`（`name` 为 `my name 1`，`description` 为 `my description 1`）。但是，如果启用 `dev` 配置文件，则 `map` 包含两个条目，键为 `key1`（`name` 为 `dev name 1`，`description` 为 `my description 1`）和 `key2`（`name` 为 `dev name 2`，`description` 为 `dev description 2`）。

::: info ℹ️
上述合并规则适用于所有属性源的属性，而不仅仅是文件
:::

### 属性转换

Spring Boot 在将外部应用程序属性绑定到 `@ConfigurationProperties` beans 时，会尝试将属性转换为正确的类型。如果你需要自定义类型转换，可以提供一个 `ConversionService` bean（命名为 `conversionService`），或者使用自定义属性编辑器（通过 `CustomEditorConfigurer` bean），或自定义转换器（通过带有 `@ConfigurationPropertiesBinding` 注解的 bean 定义）。

::: info ℹ️
由于这个 bean 在应用程序生命周期的非常早期就被请求，因此需要确保限制 `ConversionService` 所使用的依赖。通常，任何你所依赖的组件在创建时可能尚未完全初始化。如果你的 `ConversionService` 仅用于配置键的强制转换（`coercion`），而不需要其他功能，你可能想要重新命名你的自定义 `ConversionService`，并仅依赖带有 `@ConfigurationPropertiesBinding` 注解的自定义转换器。
:::

**转换持续时间**

Spring Boot 对持续时间（Duration）有专门的支持。如果你在 `@ConfigurationProperties` 中暴露了一个 `java.time.Duration` 类型的属性，以下格式在应用程序属性中是可用的：

- **常规的 `long` 表示法**：默认使用毫秒作为单位，除非通过 `@DurationUnit` 指定了其他单位。
- **标准的 ISO-8601 格式**：这是 [`java.time.Duration`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence))[ 使用的标准格式](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence))
- **更可读的格式**：值和单位结合在一起表示，例如 `10s` 表示 10 秒

看下例子:

```Java
import java.time.Duration;
import java.time.temporal.ChronoUnit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;

@ConfigurationProperties("my")
public class MyProperties {

        @DurationUnit(ChronoUnit.SECONDS)
        private Duration sessionTimeout = Duration.ofSeconds(30);

        private Duration readTimeout = Duration.ofMillis(1000);

        public Duration getSessionTimeout() {
                return this.sessionTimeout;
        }

        public void setSessionTimeout(Duration sessionTimeout) {
                this.sessionTimeout = sessionTimeout;
        }

        public Duration getReadTimeout() {
                return this.readTimeout;
        }

        public void setReadTimeout(Duration readTimeout) {
                this.readTimeout = readTimeout;
        }

}
```

要指定 30 秒的会话超时，可以使用 `30`、`PT30S` 和 `30s`，三者是等效的。读取超时为 500 毫秒可以使用以下任何一种形式指定：`500`、`PT0.5S` 和 `500ms`

你还可以使用以下任何支持的单位：

- `ns` 表示纳秒
- `us` 表示微秒
- `ms` 表示毫秒
- `s` 表示秒
- `m` 表示分钟
- `h` 表示小时
- `d` 表示天

默认单位是毫秒，可以使用 `@DurationUnit` 来覆盖默认单位，正如上面示例中所示。

如果你更倾向于使用构造函数绑定，可以像下面的示例一样暴露相同的属性。

```Java
import java.time.Duration;
import java.time.temporal.ChronoUnit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.boot.convert.DurationUnit;

@ConfigurationProperties("my")
public class MyProperties {

        private final Duration sessionTimeout;

        private final Duration readTimeout;

        public MyProperties(@DurationUnit(ChronoUnit.SECONDS) @DefaultValue("30s") Duration sessionTimeout,
                        @DefaultValue("1000ms") Duration readTimeout) {
                this.sessionTimeout = sessionTimeout;
                this.readTimeout = readTimeout;
        }

        public Duration getSessionTimeout() {
                return this.sessionTimeout;
        }

        public Duration getReadTimeout() {
                return this.readTimeout;
        }

}
```

::: tip 💡
如果你正在升级一个 `Long` 类型的属性，确保定义单位（使用 `@DurationUnit`），如果单位不是毫秒的话。这样做可以提供一个透明的升级路径，同时支持更丰富的格式
:::

**转换周期**

除了持续时间（Duration）外，Spring Boot 还支持处理 `java.time.Period` 类型。在应用程序属性中，可以使用以下格式：

- 一个常规的整数表示（默认单位为天，除非使用 `@PeriodUnit` 指定了其他单位
- [`java.time.Period`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Period.html#parse(java.lang.CharSequence))[ 使用的](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/Period.html#parse(java.lang.CharSequence))标准 ISO-8601 格式
- 一种更简单的格式，其中值和单位成对表示（例如 `1y3d` 表示 1 年 3 天）。

简单格式支持以下单位：

- `y` 表示年
- `m` 表示月
- `w` 表示周
- `d` 表示天

::: info ℹ️
需要注意的是，`java.time.Period` 类型实际上并不会存储周的数量，`w` 只是一个快捷方式，表示 “7 天”
:::

**转换数据大小**

Spring Framework 提供了一个 `DataSize` 值类型，用于以字节为单位表示大小。如果你公开了一个 `DataSize` 属性，在应用程序属性中可以使用以下格式：

- 一个常规的长整型表示（默认单位为字节，除非使用 `@DataSizeUnit` 指定了其他单位）。
- 更可读的格式，其中值与单位成对表示（例如，`10MB` 表示 10 兆字节）

以下是一个示例：

```Java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DataSizeUnit;
import org.springframework.util.unit.DataSize;
import org.springframework.util.unit.DataUnit;

@ConfigurationProperties("my")
public class MyProperties {

        @DataSizeUnit(DataUnit.MEGABYTES)
        private DataSize bufferSize = DataSize.ofMegabytes(2);

        private DataSize sizeThreshold = DataSize.ofBytes(512);

        public DataSize getBufferSize() {
                return this.bufferSize;
        }

        public void setBufferSize(DataSize bufferSize) {
                this.bufferSize = bufferSize;
        }

        public DataSize getSizeThreshold() {
                return this.sizeThreshold;
        }

        public void setSizeThreshold(DataSize sizeThreshold) {
                this.sizeThreshold = sizeThreshold;
        }

}
```

要指定 10 兆字节的缓冲区大小，可以使用 `10` 或 `10MB`，它们是等效的。256 字节的大小阈值可以表示为 `256` 或 `256B`。

你还可以使用以下支持的单位：

- `B` 表示字节（Bytes）
- `KB` 表示千字节（Kilobytes）
- `MB` 表示兆字节（Megabytes）
- `GB` 表示千兆字节（Gigabytes）
- `TB` 表示太字节（Terabytes）

默认单位是字节（Bytes），可以使用 `@DataSizeUnit` 来覆盖默认单位，如上例所示

如果你更倾向于使用构造函数绑定，也可以以相同方式公开这些属性，如以下示例所示：

```Java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.boot.convert.DataSizeUnit;
import org.springframework.util.unit.DataSize;
import org.springframework.util.unit.DataUnit;

@ConfigurationProperties("my")
public class MyProperties {

        private final DataSize bufferSize;

        private final DataSize sizeThreshold;

        public MyProperties(@DataSizeUnit(DataUnit.MEGABYTES) @DefaultValue("2MB") DataSize bufferSize,
                        @DefaultValue("512B") DataSize sizeThreshold) {
                this.bufferSize = bufferSize;
                this.sizeThreshold = sizeThreshold;
        }

        public DataSize getBufferSize() {
                return this.bufferSize;
        }

        public DataSize getSizeThreshold() {
                return this.sizeThreshold;
        }

}
```

::: tip 💡
如果你正在升级一个 `Long` 类型的属性，并且其单位不是字节（`bytes`），请确保使用 `@DataSizeUnit` 来定义单位。这样可以提供一个无缝的升级路径，同时支持更丰富的格式。
:::

### **@ConfigurationProperties 校验**

Spring Boot 会在带有 Spring 的 `@Validated` 注解时尝试验证 `@ConfigurationProperties` 类。你可以直接在配置类上使用 JSR-303 的 `jakarta.validation` 约束注解。为此，请确保你的类路径中有符合 JSR-303 的实现，然后将约束注解添加到字段上，如以下示例所示：

```Java
import java.net.InetAddress;

import jakarta.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties("my.service")
@Validated
public class MyProperties {

        @NotNull
        private InetAddress remoteAddress;

        public InetAddress getRemoteAddress() {
                return this.remoteAddress;
        }

        public void setRemoteAddress(InetAddress remoteAddress) {
                this.remoteAddress = remoteAddress;
        }

}
```

::: tip 💡
你还可以通过在创建配置属性的 `@Bean` 方法上添加 `@Validated` 注解来触发验证
:::

为了确保嵌套属性的验证始终触发，即使没有找到对应的属性，也必须在相关字段上添加 `@Valid` 注解。以下示例基于前面的 `MyProperties` 示例：

```Java
import java.net.InetAddress;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties("my.service")
@Validated
public class MyProperties {

        @NotNull
        private InetAddress remoteAddress;

        @Valid
        private final Security security = new Security();

        public InetAddress getRemoteAddress() {
                return this.remoteAddress;
        }

        public void setRemoteAddress(InetAddress remoteAddress) {
                this.remoteAddress = remoteAddress;
        }

        public Security getSecurity() {
                return this.security;
        }

        public static class Security {

                @NotEmpty
                private String username;

                public String getUsername() {
                        return this.username;
                }

                public void setUsername(String username) {
                        this.username = username;
                }

        }

}
```

您还可以通过创建名为 `configurationPropertiesValidator` 的 Bean 定义来添加自定义的 Spring 验证器。`@Bean` 方法应声明为静态方法。配置属性验证器在应用程序生命周期的早期被创建，将 `@Bean` 方法声明为静态方法可以在不实例化 `@Configuration` 类的情况下创建该 Bean。这样可以避免由于早期实例化可能导致的问题。

`spring-boot-actuator` 模块包含一个端点，用于暴露所有 `@ConfigurationProperties` Bean。您可以通过浏览器访问 `/actuator/configprops`，或者使用等效的 JMX 端点查看。有关详细信息，请参阅[**生产就绪特性**](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html)部分

### **@ConfigurationProperties 和 @Value**

`@Value` 注解是核心容器功能的一部分，它不提供与类型安全配置属性相同的特性。下表总结了 `@ConfigurationProperties` 和 `@Value` 支持的功能：

| Feature | `@ConfigurationProperties` | `@Value` |
|-|-|-|
| 松散绑定 | Yes | Limited (see [note below](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.vs-value-annotation.note)) |
| 元数据支持 | Yes | No |
| `SpEL` 解析 | No | Yes |

::: info ℹ️
如果你确实希望使用 `@Value`，我们建议使用其规范形式（全小写并用连字符分隔的 kebab-case 格式）来引用属性名称。这样可以让 Spring Boot 在对 `@ConfigurationProperties` 进行[宽松绑定](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding)时使用相同的逻辑
例如，`@Value("${demo.item-price}")` 将会匹配来自 `application.properties` 文件中的 `demo.item-price` 和 `demo.itemPrice`，以及系统环境中的 `DEMO_ITEMPRICE`。如果使用的是 `@Value("${demo.itemPrice}")`，则 `demo.item-price` 和 `DEMO_ITEMPRICE` 不会被考虑
:::

如果你为自己的组件定义了一组配置键，我们建议将它们分组到一个用 `@ConfigurationProperties` 注解的 POJO 中。这样可以提供结构化的、类型安全的对象，你可以将其注入到自己的 Bean 中。

从[应用属性文件](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files)中获取的 `SpEL` 表达式在解析这些文件并填充环境时不会被处理。然而，可以在 `@Value` 中编写 `SpEL` 表达式。如果应用属性文件中的属性值是一个 `SpEL` 表达式，当通过 `@Value` 使用时，该表达式会被解析并求值