---
description: '该开发工具提供自动重启、LiveReload功能、条件评估日志、资源排除及额外路径监控等特性，支持自定义重启类加载器、触发文件及远程应用更新，并涵盖类加载诊断、属性默认值、全局设置与文件系统监视器配置，同时列出已知限制。'
lastUpdated: '2026-06-20 12:15:40'
head:
  - - meta
    - name: 'og:title'
      content: '开发工具'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该开发工具提供自动重启、LiveReload功能、条件评估日志、资源排除及额外路径监控等特性，支持自定义重启类加载器、触发文件及远程应用更新，并涵盖类加载诊断、属性默认值、全局设置与文件系统监视器配置，同时列出已知限制。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/devtools.html'
---
# 开发工具

Spring Boot 提供了一些额外的工具来改善应用程序开发体验。通过引入 `spring-boot-devtools` 模块，可以为项目添加开发时功能。可以通过在构建文件中添加以下依赖项来引入 devtools：

```XML
<dependencies>
        <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-devtools</artifactId>
                <optional>true</optional>
        </dependency>
</dependencies>
```

```Groovy
dependencies {
  developmentOnly("org.springframework.boot:spring-boot-devtools")
}
```

::: info 🔥
devtools 可能在多模块项目中引发类加载问题。在 Diagnosing Classloading Issues 部分可以查看如何诊断和解决这些问题
:::

::: info ℹ️
开发者工具在运行完整打包的应用程序时会自动禁用。如果应用程序是通过 `java -jar` 启动，或者是从特殊的类加载器启动，则被认为是“生产应用程序”。你可以通过使用 `spring.devtools.restart.enabled` 系统属性来控制此行为。要在无论什么类加载器的情况下启用开发者工具，可以设置 `-Dspring.devtools.restart.enabled=true` 系统属性。但在生产环境中不应这样做，因为运行开发者工具存在安全风险。要禁用开发者工具，可以排除该依赖或设置 `-Dspring.devtools.restart.enabled=false` 系统属性。
:::

::: tip 💡
在 Maven 中将依赖标记为可选（optional），或在 Gradle 中使用 `developmentOnly` 配置（如上所示）可以防止开发者工具被传递性地应用于使用你的项目的其他模块
:::

重新打包的归档文件默认不包含开发者工具。如果你想使用[某些远程开发者工具功能](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.remote-applications)，需手动包含它。在使用 Maven 插件时，设置 `excludeDevtools` 属性为 `false`；在使用 Gradle 插件时，[配置任务的类路径以包含 ](https://docs.spring.io/spring-boot/gradle-plugin/packaging.html#packaging-executable.configuring.including-development-only-dependencies)[`developmentOnly`](https://docs.spring.io/spring-boot/gradle-plugin/packaging.html#packaging-executable.configuring.including-development-only-dependencies)[ 配置](https://docs.spring.io/spring-boot/gradle-plugin/packaging.html#packaging-executable.configuring.including-development-only-dependencies)

## 诊断类加载问题

如“重启与重新加载”部分所述，重启功能是通过使用两个类加载器来实现的。对于大多数应用程序，这种方法运行良好。然而，在多模块项目中，它有时可能会引发类加载问题。

要诊断类加载问题是否确实是由开发者工具及其两个类加载器引起的，[可以尝试禁用重启功能](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.restart.disable)。如果这解决了你的问题，则可以[自定义重启类加载器](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.restart.customizing-the-classload)以包含整个项目。

## 属性默认值

Spring Boot 支持的多个库使用缓存来提高性能。例如，[模板引擎](https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.spring-mvc.template-engines)缓存已编译的模板，以避免反复解析模板文件。同时，Spring MVC 在提供静态资源时，可以在响应中添加 HTTP 缓存头。

虽然缓存在生产环境中非常有用，但在开发过程中可能适得其反，因为它会阻止你在应用程序中立即看到所做的更改。因此，`spring-boot-devtools` 默认禁用缓存选项。

缓存选项通常在 `application.properties` 文件中进行配置。例如，Thymeleaf 提供了 `spring.thymeleaf.cache` 属性。无需手动设置这些属性，`spring-boot-devtools` 模块会自动应用合理的开发时配置。

下表列出了所有自动应用的属性：

| Name | Default Value |
|-|-|
| `server.error.include-binding-errors` | `always` |
| `server.error.include-message` | `always` |
| `server.error.include-stacktrace` | `always` |
| `server.servlet.jsp.init-parameters.development` | `true` |
| `server.servlet.session.persistent` | `true` |
| `spring.docker.compose.readiness.wait` | `only-if-started` |
| `spring.freemarker.cache` | `false` |
| `spring.graphql.graphiql.enabled` | `true` |
| `spring.groovy.template.cache` | `false` |
| `spring.h2.console.enabled` | `true` |
| `spring.mustache.servlet.cache` | `false` |
| `spring.mvc.log-resolved-exception` | `true` |
| `spring.reactor.netty.shutdown-quiet-period` | `0s` |
| `spring.template.provider.cache` | `false` |
| `spring.thymeleaf.cache` | `false` |
| `spring.web.resources.cache.period` | `0` |
| `spring.web.resources.chain.cache` | `false` |

::: info ℹ️
如果你不希望应用属性默认值，可以在 `application.properties` 文件中将 `spring.devtools.add-properties` 设置为 `false`
:::

由于在开发 Spring MVC 和 Spring WebFlux 应用程序时需要更多关于 Web 请求的信息，开发工具建议启用 `Web` 日志组的 `DEBUG` 级别日志记录。这样可以提供有关传入请求、处理它的处理程序、响应结果及其他详细信息的日志信息。如果你希望记录所有请求的详细信息（包括潜在的敏感信息），可以启用 `spring.mvc.log-request-details` 或 `spring.codec.log-request-details` 配置属性。

## **自动重启**

使用 `spring-boot-devtools` 的应用程序会在类路径上的文件发生更改时自动重启。这对于在 IDE 中工作时非常有用，因为它可以为代码更改提供非常快速的反馈循环。默认情况下，类路径上的任何指向目录的条目都会被监视，以检测更改。然而，某些资源（如静态资源和视图模板）并不需要触发应用程序的重启

::: info 💭
**触发重启**
由于 DevTools 监视类路径资源，因此触发重启的唯一方法是更新类路径。无论你使用 IDE 还是构建插件，修改后的文件都必须重新编译以触发重启。具体触发方式因所使用的工具而异：
- **Eclipse**：保存已修改的文件会更新类路径并触发重启。
- **IntelliJ IDEA**：构建项目（`Build -> Build Project`）具有相同效果。
- **构建插件**：运行 `mvn compile`（用于 Maven）或 `gradle build`（用于 Gradle）会触发重启。
:::

::: info ℹ️
如果使用 Maven 或 Gradle 的构建插件进行重启，必须保持 forking 设置为启用状态。如果禁用 forking，devtools 使用的隔离应用程序类加载器将不会创建，重启将无法正常工作。
:::

::: tip 💡
自动重启与 LiveReload 配合使用效果很好。详细信息见 [LiveReload](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.livereload) 部分。如果你使用 JRebel，自动重启将被禁用以支持动态类重新加载。其他 devtools 功能（如 LiveReload 和属性覆盖）仍然可用
:::

::: info ℹ️
DevTools 依赖于应用程序上下文的关闭钩子（shutdown hook）来在重启期间关闭它。如果你已禁用关闭钩子（`SpringApplication.setRegisterShutdownHook(false)`），则不会正确工作
:::

::: info ℹ️
DevTools 需要自定义 `ApplicationContext` 使用的 `ResourceLoader`。如果你的应用程序已提供一个，它将被包装。直接覆盖 `ApplicationContext` 的 `getResource` 方法是不支持的
:::

::: info 🔥
使用 AspectJ 织入时不支持自动重启
:::

::: info 💭
**重启与重新加载**
Spring Boot 提供的重启技术通过使用两个类加载器来实现。不变的类（例如第三方 JAR 中的类）被加载到基类加载器中，而你正在开发的类则加载到重启类加载器中。当应用程序重启时，重启类加载器会被丢弃并重新创建。这种方式通常比“冷启动”更快，因为基类加载器已存在且已填充。
如果重启速度不够快或遇到类加载问题，可以考虑使用诸如 ZeroTurnaround 的 [JRebel](https://jrebel.com/software/jrebel/) 之类的重新加载技术。这些工具通过在类加载时重写类，使其更适合于重新加载。
:::

### 条件评估更改的日志记录

在默认情况下，每次应用程序重启时，都会记录一个显示条件评估增量的报告。该报告会展示应用程序自动配置的更改情况，例如添加或删除 bean 以及设置配置属性时的变化。

如果不希望记录此报告，可以通过设置以下属性来禁用它：

```Plaintext
spring.devtools.restart.log-condition-evaluation-delta=false
```

### **资源排除**

在开发过程中，某些资源（如 Thymeleaf 模板）更改时不必触发应用程序重启。默认情况下，对 `/META-INF/maven`、`/META-INF/resources`、`/resources`、`/static`、`/public` 或 `/templates` 中的资源进行更改不会触发重启，但会触发[实时重载](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.livereload)。

如果希望自定义这些排除项，可以使用 `spring.devtools.restart.exclude` 属性。例如，仅排除 `/static` 和 `/public`，可以在 `application.properties` 文件中进行如下设置：

```Plaintext
spring.devtools.restart.exclude=static/**,public/**
```

::: tip 💡
如果您希望保留默认的排除项并添加额外的排除项，可以使用 `spring.devtools.restart.additional-exclude` 属性
:::

### 监视额外的文件路径

在某些情况下，您可能希望应用程序在对非 classpath 路径下的文件进行更改时也能自动重启或重新加载。要实现此功能，可以使用 `spring.devtools.restart.additional-paths` 属性配置需要监视的额外路径。例如：

```Plaintext
spring.devtools.restart.additional-paths=src/main/custom
```

您可以结合 `spring.devtools.restart.exclude` 属性来控制额外路径下的更改是否触发完全重启或仅触发 Live Reload

### 禁用自动重启

如果您不想使用自动重启功能，可以通过设置 `spring.devtools.restart.enabled` 属性来禁用它。在大多数情况下，可以在 `application.properties` 中设置此属性（这样虽然仍会初始化重启 classloader，但不会监视文件更改）。例如：

如果需要完全禁用重启支持（例如，该功能与某些特定库不兼容），则需要在调用 `SpringApplication.run(...)` 之前，通过系统属性设置 `spring.devtools.restart.enabled` 为 `false`，如下示例所示：

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {

        public static void main(String[] args) {
                System.setProperty("spring.devtools.restart.enabled", "false");
                SpringApplication.run(MyApplication.class, args);
        }

}
```

这样可以彻底禁用重启功能，以避免与特定库或框架的兼容性问题

### 使用触发文件

如果您使用的 IDE 会持续编译更改的文件，您可能更希望在特定时间触发重启。为此，可以使用“触发文件”，即一个特殊文件，只有在您实际希望触发重启检查时才需修改该文件。

对触发文件的任何更新都会触发检查，但只有当 DevTools 检测到有内容更新时，才会真正重启。要使用触发文件，请将 `spring.devtools.restart.trigger-file` 属性设置为触发文件的名称（不包括路径）。该触发文件必须出现在类路径中。

例如，假设项目结构如下：

```Plaintext
src
+- main
   +- resources
      +- .reloadtrigger
```

则您的 `trigger-file` 属性应如下设置：

```Plaintext
spring.devtools.restart.trigger-file=.reloadtrigger
```

```YAML
spring:
  devtools:
    restart:
      trigger-file: ".reloadtrigger"
```

现在，只有当 `src/main/resources/.reloadtrigger` 文件被更新时，才会触发重启

::: tip 💡
您可能希望将 `spring.devtools.restart.trigger-file` 设置为[全局配置](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.globalsettings)，以便所有项目都以相同方式工作
:::

一些 IDE 支持此功能，省去了手动更新触发文件的需求。[Spring Tools for Eclipse](https://spring.io/tools) 和 [IntelliJ IDEA (Ultimate Edition)](https://www.jetbrains.com/idea/) 都提供了这种支持。使用 Spring Tools 时，只需在控制台视图中使用“reload”按钮（只要您的 `trigger-file` 命名为 `.reloadtrigger`）。对于 IntelliJ IDEA，可以参考[其文档](https://www.jetbrains.com/help/idea/spring-boot.html#application-update-policies)中的相关说明

### **自定义重启类加载器**

正如之前在 重启与重新加载 部分所述，Spring Boot 的重启功能通过使用两个类加载器实现。如果该机制导致问题，您可以通过使用 `spring.devtools.restart.enabled` 系统属性来诊断问题。如果应用在禁用重启功能时能正常工作，可能需要自定义哪些内容由哪个类加载器加载。

默认情况下，IDE 中任何打开的项目都会使用“重启”类加载器加载，任何常规的 `.jar` 文件则使用“基础”类加载器加载。如果使用 `mvn spring-boot:run` 或 `gradle bootRun`，包含 `@SpringBootApplication` 注解的项目将由“重启”类加载器加载，而其他内容则由“基础”类加载器加载。应用启动时会在控制台上打印类路径，帮助识别可能的问题条目。特别是通过反射使用的类（例如注解），可能在启动时被父类加载器加载（固定的），导致它们在应用程序类加载之前被检测到，影响 Spring 对这些类的识别。

您可以通过创建一个 `META-INF/spring-devtools.properties` 文件来指示 Spring Boot 以不同的类加载器加载项目的部分内容。`spring-devtools.properties` 文件中可以包含以 `restart.exclude` 和 `restart.include` 为前缀的属性。`include` 元素是应加载到“重启”类加载器中的项，而 `exclude` 元素是应加载到“基础”类加载器中的项。属性的值是一个正则表达式模式，应用于启动 JVM 时传递的类路径

```YAML
restart:
  exclude:
    companycommonlibs: "/mycorp-common-[\\w\\d-\\.]/(build|bin|out|target)/"
  include:
    projectcommon: "/mycorp-myproj-[\\w\\d-\\.]+\\.jar"
```

::: info ℹ️
在 `spring-devtools.properties` 文件中，所有属性键必须唯一。只要属性键以 `restart.include.` 或 `restart.exclude.` 开头，就会被 Spring Boot 视为有效配置
:::

::: tip 💡
Spring Boot DevTools 会加载类路径中所有的 `META-INF/spring-devtools.properties` 文件。您可以将这些文件打包在项目内部，或包含在项目使用的库中，从而统一管理和自定义类加载行为
:::

### **已知限制**

在 Spring Boot DevTools 中，重启功能与通过标准 `ObjectInputStream` 反序列化的对象兼容性较差。若需要反序列化数据，建议使用 Spring 的 `ConfigurableObjectInputStream`，并结合 `Thread.currentThread().getContextClassLoader()`，以确保类加载器的正确性。

然而，一些第三方库在反序列化时不会考虑上下文类加载器，可能导致类加载冲突。如果遇到类似问题，建议向相关库的作者请求修复

## **LiveReload 功能**

`spring-boot-devtools` 模块包含一个嵌入式的 LiveReload 服务器，可以在资源发生更改时触发浏览器刷新。Chrome、Firefox 和 Safari 浏览器都有可用的 LiveReload 扩展，您可以在各个浏览器的插件市场中搜索“LiveReload”找到这些扩展

如果不希望在应用启动时启动 LiveReload 服务器，可通过在 `application.properties` 文件中将 `spring.devtools.livereload.enabled` 属性设置为 `false` 来禁用该功能

::: info ℹ️
一次只能运行一个 LiveReload 服务器。启动应用前，请确保没有其他 LiveReload 服务器在运行, 如果从 IDE 启动多个应用，只有第一个应用会启用 LiveReload 支持
:::

::: warning ⚠️
若要在文件更改时触发 LiveReload，需要启用[自动重启](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.restart)功能
:::

## 全局设置

您可以通过在 `$HOME/.config/spring-boot` 目录中添加以下任一文件来配置全局 devtools 设置：

- `spring-boot-devtools.properties`
- `spring-boot-devtools.yaml`
- `spring-boot-devtools.yml`

添加到这些文件的任何属性将应用于您计算机上所有使用 devtools 的 Spring Boot 应用。例如，要配置重新启动功能始终使用触发文件，可以在您的 `spring-boot-devtools` 文件中添加以下属性：

```Plaintext
spring.devtools.restart.trigger-file=.reloadtrigger
```

默认情况下，`$HOME` 是用户的主目录。要自定义此位置，请设置 `SPRING_DEVTOOLS_HOME` 环境变量或 `spring.devtools.home` 系统属性

::: info ℹ️
如果在 `$HOME/.config/spring-boot` 中未找到 devtools 配置文件，则会在 `$HOME` 目录的根目录中查找 `.spring-boot-devtools.properties` 文件。这使您可以将 devtools 的全局配置与旧版本的 Spring Boot 应用程序共享，这些应用程序不支持 `$HOME/.config/spring-boot` 位置
:::

::: info ℹ️
在 devtools 的 properties/yaml 文件中不支持 profiles（配置文件）
在 `.spring-boot-devtools.properties` 文件中激活的任何配置文件都不会影响[特定于配置文件的配置文件](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.files.profile-specific)的加载。不支持特定于配置文件的文件名（例如 `spring-boot-devtools-<profile>.properties`）以及 `spring.config.activate.on-profile` 文档
:::

### 配置文件系统监视器

[`FileSystemWatcher`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/devtools/filewatch/FileSystemWatcher.html) 通过以一定时间间隔轮询类的更改，然后等待预定义的静默期，以确保没有更多更改发生。由于 Spring Boot 完全依赖 IDE 将文件编译并复制到 Spring Boot 可以读取的位置，因此您可能会发现有时某些更改在 devtools 重启应用时未被反映。如果您经常遇到此类问题，建议增加 `spring.devtools.restart.poll-interval` 和 `spring.devtools.restart.quiet-period` 参数的值，以适应您的开发环境：

```Plaintext
spring.devtools.restart.poll-interval=2s
spring.devtools.restart.quiet-period=1s
```

现在，受监视的类路径目录每隔 2 秒轮询一次更改，并维持 1 秒的静默期，以确保没有额外的类更改。

## 远程应用

Spring Boot 的开发者工具不仅限于本地开发，还可以在远程运行应用程序时使用多个功能。远程支持是选择性启用的，因为启用它可能带来安全风险。只有在受信任的网络上运行或通过 SSL 进行安全保护时，才应启用该功能。如果无法满足这些条件，则不应使用 DevTools 的远程支持功能，且绝不应在生产环境中启用。

要启用远程支持，首先需要确保 devtools 被包含在重新打包的存档中，如下所示：

```XML
<build>
        <plugins>
                <plugin>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-maven-plugin</artifactId>
                        <configuration>
                                <excludeDevtools>false</excludeDevtools>
                        </configuration>
                </plugin>
        </plugins>
</build>
```

然后需要设置 `spring.devtools.remote.secret` 属性。与任何重要密码或密钥一样，该值应独特且强大，以防止被猜测或暴力破解。

远程 devtools 支持由两部分组成：接受连接的服务器端端点，以及在 IDE 中运行的客户端应用。当 `spring.devtools.remote.secret` 属性被设置时，服务器端组件会自动启用。客户端组件则需要手动启动。

::: info ℹ️
远程 devtools 不支持 Spring WebFlux 应用
:::

### 运行远程客户端应用

远程客户端应用设计用于在您的 IDE 中运行。您需要使用与远程项目相同的类路径来运行 `org.springframework.boot.devtools.RemoteSpringApplication`，该应用的唯一必需参数是它连接到的远程 URL。

例如，如果您使用的是 Eclipse 或 Spring Tools，并且有一个名为 my-app 的项目部署在 Cloud Foundry 上，可以按以下步骤操作：

1. 从 **`Run`** 菜单中选择 **`Run Configurations`…**。
2. 创建一个新的 Java Application“启动配置”。
3. 浏览选择 `my-app` 项目。
4. 使用 `org.springframework.boot.devtools.RemoteSpringApplication` 作为主类。
5. 在 `Program arguments` 中添加 `https://myapp.cfapps.io`（或您的远程 URL）。

运行中的远程客户端可能如下所示：

```Plaintext
  .   ____          _                                              __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _          ___               _      \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` |        | _ \___ _ __  ___| |_ ___ \ \ \ \
 \\/  ___)| |_)| | | | | || (_| []::::::[]   / -_) '  \/ _ \  _/ -_) ) ) ) )
  '  |____| .__|_| |_|_| |_\__, |        |_|_\___|_|_|_\___/\__\___|/ / / /
 =========|_|==============|___/===================================/_/_/_/
 :: Spring Boot Remote ::  (v3.3.5)

2024-10-24T12:03:02.454Z  INFO 112504 --- [           main] o.s.b.devtools.RemoteSpringApplication   : Starting RemoteSpringApplication v3.3.5 using Java 17.0.13 with PID 112504 (/Users/myuser/.m2/repository/org/springframework/boot/spring-boot-devtools/3.3.5/spring-boot-devtools-3.3.5.jar started by myuser in /opt/apps/)
2024-10-24T12:03:02.487Z  INFO 112504 --- [           main] o.s.b.devtools.RemoteSpringApplication   : No active profile set, falling back to 1 default profile: "default"
2024-10-24T12:03:03.165Z  INFO 112504 --- [           main] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2024-10-24T12:03:03.204Z  INFO 112504 --- [           main] o.s.b.devtools.RemoteSpringApplication   : Started RemoteSpringApplication in 2.032 seconds (process running for 2.824)
```

::: info ℹ️
由于远程客户端使用与真实应用相同的类路径，它可以直接读取应用程序属性。因此，`spring.devtools.remote.secret` 属性会被读取并传递给服务器以进行身份验证
:::

::: tip 💡
始终使用 https:// 作为连接协议，以加密流量，防止密码被拦截
:::

::: tip 💡
如果需要使用代理来访问远程应用，请配置 `spring.devtools.remote.proxy.host` 和 `spring.devtools.remote.proxy.port` 属性
:::

### 远程更新

远程客户端与[本地重启](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.restart)方式相同，监视应用程序类路径的更改。任何更新的资源都会被推送到远程应用，并在需要时触发重启。如果您正在开发一个需要使用本地没有的云服务的功能，这会非常有用。通常，远程更新和重启比完整的重建和部署周期要快得多。

在较慢的开发环境中，可能会出现静默期不足的问题，导致类的更改被分成多个批次。服务器在上传第一批类更改后重启，后续批次无法发送到应用程序，因为服务器正在重启。

这通常会在 `RemoteSpringApplication` 日志中显示警告，提示部分类上传失败并进行重试，但也可能导致应用程序代码不一致，并在上传第一批更改后无法重启。如果您经常遇到此类问题，建议增加 `spring.devtools.restart.poll-interval` 和 `spring.devtools.restart.quiet-period` 参数的值，以适应您的开发环境。有关这些属性的配置，请参阅 [配置文件系统监视器](https://docs.spring.io/spring-boot/reference/using/devtools.html#using.devtools.globalsettings.configuring-file-system-watcher) 部分。

::: info ℹ️
文件仅在远程客户端运行时被监视。如果在启动远程客户端之前更改了文件，则更改不会被推送到远程服务器
:::