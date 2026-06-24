---
description: '嵌入式Web服务器配置涵盖HTTP端口管理、SSL与HTTP/2支持、Servlet/Filter/Listener添加、访问日志及代理设置等，支持Tomcat、Jetty、Reactor Netty和Undertow等容器，并提供多种定制与发现机制。'
lastUpdated: '2026-06-20 12:16:45'
head:
  - - meta
    - name: 'og:title'
      content: '嵌入式 Web 服务器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '嵌入式Web服务器配置涵盖HTTP端口管理、SSL与HTTP/2支持、Servlet/Filter/Listener添加、访问日志及代理设置等，支持Tomcat、Jetty、Reactor Netty和Undertow等容器，并提供多种定制与发现机制。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/guide/build-in-web-server.html'
---
# 嵌入式 Web 服务器

每个 Spring Boot Web 应用程序都包含一个嵌入式 Web 服务器。此功能引发了一些常见问题，例如如何更换嵌入式服务器以及如何配置嵌入式服务器。本节将回答这些问题

## **使用其他 Web 服务器**

许多 Spring Boot 起步依赖包含默认的嵌入式容器。

- 对于基于 Servlet 栈的应用程序，`spring-boot-starter-web` 通过包含 `spring-boot-starter-tomcat` 来默认使用 Tomcat，但你也可以选择使用 `spring-boot-starter-jetty` 或 `spring-boot-starter-undertow`
- 对于基于响应式栈的应用程序，`spring-boot-starter-webflux` 通过包含 `spring-boot-starter-reactor-netty` 来默认使用 Reactor Netty，但你也可以选择使用 `spring-boot-starter-tomcat`、`spring-boot-starter-jetty` 或 `spring-boot-starter-undertow`。

在切换到其他 HTTP 服务器时，你需要替换默认的依赖为你需要的依赖。为简化此过程，Spring Boot 为每个支持的 HTTP 服务器提供了单独的起步依赖

以下 Maven 示例展示了如何排除 Tomcat 并为 Spring MVC 包含 Jetty:

```XML
<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
                <!-- Exclude the Tomcat dependency -->
                <exclusion>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
        </exclusions>
</dependency>
<!-- Use Jetty instead -->
<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

以下 Gradle 示例配置了必要的依赖，并通过[模块替换](https://docs.gradle.org/current/userguide/resolution_rules.html#sec:module_replacement)将 Spring WebFlux 中的 Reactor Netty 替换为 Undertow:

```Groovy
dependencies {
        implementation "org.springframework.boot:spring-boot-starter-undertow"
        implementation "org.springframework.boot:spring-boot-starter-webflux"
        modules {
                module("org.springframework.boot:spring-boot-starter-reactor-netty") {
                        replacedBy("org.springframework.boot:spring-boot-starter-undertow", "Use Undertow instead of Reactor Netty")
                }
        }
}
```

::: info ℹ️
`spring-boot-starter-reactor-netty` 是使用 `WebClient` 类所必需的，因此即使需要包含不同的 HTTP 服务器，你可能仍需保留对 Netty 的依赖
:::

## **禁用 Web 服务器**

如果 classpath 中包含启动 Web 服务器所需的组件，Spring Boot 将自动启动它。要禁用此行为，可以在 `application.properties` 中配置 `WebApplicationType`，如下示例所示：

```Plaintext
spring.main.web-application-type=none
```

## **更改 HTTP 端口**

在独立应用中，默认的主 HTTP 端口是 `8080`，但可以通过 `server.port` 设置（例如在 `application.properties` 中或作为系统属性）。由于 Spring `Environment` 的宽松绑定，你也可以使用 `SERVER_PORT`（例如作为操作系统环境变量）。

如果你想完全关闭 HTTP 端点，但仍然创建一个 `WebApplicationContext`，可以使用 `server.port=-1`（这种做法有时在测试中很有用）。

更多详情请参阅 “Spring Boot Features” 章节中的 [Customizing Embedded Servlet Containers](https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.embedded-container.customizing) 或查看 [`ServerProperties`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/autoconfigure/web/ServerProperties.html) 类

## **使用随机未分配的 HTTP 端口**

要扫描一个空闲端口（使用操作系统本地功能以防止冲突），可以设置 `server.port=0`

## **在运行时发现 HTTP 端口**

你可以从日志输出中或通过 `WebServerApplicationContext` 的 `WebServer` 访问服务器正在运行的端口。为了确保它已经被初始化，最好的方法是添加一个 `@Bean`，类型为 `ApplicationListener<WebServerInitializedEvent>`，并在事件发布时从事件中获取容器

使用 `@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)` 的测试还可以通过 `@LocalServerPort` 注解将实际端口注入到字段中，如以下示例所示:

```Java
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class MyWebIntegrationTests {

        @LocalServerPort
        int port;

        // ...

}
```

::: info ℹ️
`@LocalServerPort` 是 `@Value("${local.server.port}")` 的元注解。不要尝试在常规应用程序中注入端口。正如我们刚刚所看到的，该值仅在容器初始化之后才会被设置。与测试不同，应用程序代码的回调会在值实际可用之前（较早阶段）处理
:::

## **启用 HTTP 响应压缩**

HTTP 响应压缩由 Jetty、Tomcat、Reactor Netty 和 Undertow 支持。可以在 `application.properties` 中启用，如下所示：

```Plaintext
server.compression.enabled=true
```

默认情况下，只有响应长度至少为 2048 字节时才会进行压缩。你可以通过设置 `server.compression.min-response-size` 属性来配置此行为。

默认情况下，只有当响应的内容类型是以下之一时，才会进行压缩：

- `text/html`
- `text/xml`
- `text/plain`
- `text/css`
- `text/javascript`
- `application/javascript`
- `application/json`
- `application/xml`

你可以通过设置 `server.compression.mime-types` 属性来配置此行为。

## **配置 SSL**

SSL 可以通过设置各种 `server.ssl.*` 属性来声明式配置，通常在 `application.properties` 或 `application.yaml` 中进行配置。有关所有支持的属性，请参阅 Ssl。

以下示例展示了如何使用 Java KeyStore 文件来设置 SSL 属性：

```Plaintext
server.port=8443
server.ssl.key-store=classpath:keystore.jks
server.ssl.key-store-password=secret
server.ssl.key-password=another-secret
```

使用如上所示的配置意味着应用程序不再支持在端口 8080 上的普通 HTTP 连接器。Spring Boot 不支持通过 `application.properties` 配置同时使用 HTTP 和 HTTPS 连接器。如果你需要同时配置这两个连接器，你需要通过编程方式配置其中一个。我们推荐使用 `application.properties` 配置 HTTPS，因为 HTTP 连接器更容易通过编程方式进行配置

### **使用 PEM 编码文件**

你可以使用 PEM 编码的文件代替 Java KeyStore 文件。建议尽可能使用 PKCS#8 密钥文件。PEM 编码的 PKCS#8 密钥文件以 `-----BEGIN PRIVATE KEY-----` 或 `-----BEGIN ENCRYPTED PRIVATE KEY-----` 头部开始

如果你有其他格式的文件，例如 PKCS#1 (`-----BEGIN RSA PRIVATE KEY-----`) 或 SEC 1 (`-----BEGIN EC PRIVATE KEY-----`)，你可以使用 OpenSSL 将它们转换为 PKCS#8 格式：

```Bash
openssl pkcs8 -topk8 -nocrypt -in <input file> -out <output file>
```

以下示例展示了如何使用 PEM 编码的证书和私钥文件设置 SSL 属性：

```Plaintext
server.port=8443
server.ssl.certificate=classpath:my-cert.crt
server.ssl.certificate-private-key=classpath:my-cert.key
server.ssl.trust-certificate=classpath:ca-cert.crt
```

### **使用 SSL Bundles**

另外，SSL 授信材料可以配置在 SSL 捆绑包中，并应用到 Web 服务器，示例如下：

```Plaintext
server.port=8443
server.ssl.bundle=example
```

::: info ℹ️
`server.ssl.bundle` 属性不能与 `server.ssl` 下的独立 Java KeyStore 或 PEM 属性选项一起使用
:::

### **配置服务器名称指示 (SNI)**

Tomcat、Netty 和 Undertow 可以配置使用独特的 SSL 信任材料来支持服务器名称指示 (SNI)。Jetty 不支持 SNI 配置，但如果提供多个证书，Jetty 可以[自动设置 SNI](https://eclipse.dev/jetty/documentation/jetty-12/operations-guide/index.html#og-protocols-ssl-sni)。

假设已经配置了名为 web、web-alt1 和 web-alt2 的 [SSL 包](https://docs.spring.io/spring-boot/reference/features/ssl.html)，以下配置可以用于将每个包分配给由嵌入式 Web 服务器提供的主机名：

```Plaintext
server.port=8443
server.ssl.bundle=web
server.ssl.server-name-bundles[0].server-name=alt1.example.com
server.ssl.server-name-bundles[0].bundle=web-alt1
server.ssl.server-name-bundles[1].server-name=alt2.example.com
server.ssl.server-name-bundles[1].bundle=web-alt2
```

通过 `server.ssl.bundle` 指定的 SSL 包将用于默认主机，并且适用于任何支持 SNI 的客户端。如果配置了 `server.ssl.server-name-bundles`，则必须配置此默认包。

## **配置 HTTP/2**

你可以通过配置 `server.http2.enabled` 属性启用 Spring Boot 应用程序的 HTTP/2 支持。支持 `h2`（通过 TLS 的 HTTP/2）和 `h2c`（通过 TCP 的 HTTP/2）。要使用 `h2`，必须启用 SSL。如果未启用 SSL，则将使用 `h2c`。例如，当应用程序运行在执行 TLS 终止的[代理服务器](https://docs.spring.io/spring-boot/how-to/webserver.html#howto.webserver.use-behind-a-proxy-server)后面时，你可能想要使用 `h2c`

::: info ℹ️
- **h2** 需要 SSL/TLS 加密，是 HTTP/2 的标准实现，适用于安全通信。
- **h2c** 不需要加密，适用于没有加密的 HTTP 通信，通常用于内部通信或在代理服务器进行 TLS 终止时
:::

### **HTTP/2 与 Tomcat**

Spring Boot 默认使用 Tomcat 10.1.x，支持开箱即用的 `h2c` 和 `h2`。或者，如果在主机操作系统上安装了 `libtcnative` 库及其依赖项，你也可以使用该库来支持 `h2`。

必须确保库目录可用于 JVM 库路径。如果尚未可用，可以通过 JVM 参数（如 `-Djava.library.path=/usr/local/opt/tomcat-native/lib`）来配置。有关更多信息，请参阅[官方 Tomcat 文档](https://tomcat.apache.org/tomcat-10.1-doc/apr.html)

### **HTTP/2 与 Jetty**

要支持 HTTP/2，Jetty 需要额外的 `org.eclipse.jetty.http2:jetty-http2-server` 依赖项。要使用 `h2c`，不需要其他依赖项。如果使用 `h2`，还需要选择以下依赖项之一，具体取决于你的部署：

- `org.eclipse.jetty:jetty-alpn-java-server`（使用 JDK 内置支持）
- `org.eclipse.jetty:jetty-alpn-conscrypt-server` 和 [Conscrypt 库](https://www.conscrypt.org/)

### **HTTP/2 与 Reactor Netty**

`spring-boot-webflux-starter` 默认使用 Reactor Netty 作为服务器，Reactor Netty 支持开箱即用的 `h2c` 和 `h2`。为了获得最佳运行时性能，该服务器还支持带有本地库的 `h2`。要启用这一功能，应用程序需要添加一个额外的依赖项

Spring Boot 管理 `io.netty:netty-tcnative-boringssl-static` 的版本，该库包含所有平台的本地库。开发者可以选择仅导入所需的依赖项，使用分类符（参见 Netty 官方文档）。

### **HTTP/2 与 Undertow**

Undertow 开箱即用支持 `h2c` 和 `h2`

## **配置 Web 服务器**

通常，你应该首先考虑使用众多可用的配置键，通过在 `application.properties` 或 `application.yaml` 文件中添加新的条目来定制你的 Web 服务器。可以参考 [发现内置选项的外部属性](https://docs.spring.io/spring-boot/how-to/properties-and-configuration.html#howto.properties-and-configuration.discover-build-in-options-for-external-properties) 。`server.*` 命名空间在这里非常有用，它包括像 `server.tomcat.*`*、*`server.jetty.*` 等子命名空间，用于配置特定服务器的功能。详情请参见常见[应用程序属性的列表](https://docs.spring.io/spring-boot/appendix/application-properties/index.html)

前面几节已经覆盖了许多常见的用例，如压缩、SSL 或 HTTP/2。但是，如果没有现成的配置键来满足你的需求，你应该考虑使用 [`WebServerFactoryCustomizer`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/web/server/WebServerFactoryCustomizer.html)。你可以声明这样的组件，并获取与你选择的服务器工厂相关的访问权限：你应该根据选择的服务器（Tomcat、Jetty、Reactor Netty、Undertow）和 Web 堆栈（Servlet 或 Reactive）选择对应的变体

下面的示例是针对使用 `spring-boot-starter-web`（Servlet 堆栈）的 Tomcat 配置：

```Java
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.stereotype.Component;

@Component
public class MyTomcatWebServerCustomizer implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

        @Override
        public void customize(TomcatServletWebServerFactory factory) {
                // customize the factory here
        }

}
```

::: info ℹ️
Spring Boot 内部使用该基础设施来自动配置服务器。自动配置的 `WebServerFactoryCustomizer` beans 的顺序是 `0`，并且会在任何用户定义的自定义器之前处理，除非它具有显式的顺序来指明其他的处理顺序
:::

一旦你通过自定义器访问了 `WebServerFactory`，你可以使用它来配置特定的部分，比如连接器、服务器资源或服务器本身——所有这些都可以通过特定服务器的 API 来完成

此外，Spring Boot 提供了：

| Server | Servlet stack | Reactive stack |
|-|-|-|
| Tomcat | `TomcatServletWebServerFactory` | `TomcatReactiveWebServerFactory` |
| Jetty | `JettyServletWebServerFactory` | `JettyReactiveWebServerFactory` |
| Undertow | `UndertowServletWebServerFactory` | `UndertowReactiveWebServerFactory` |
| Reactor | N/A | `NettyReactiveWebServerFactory` |

作为最后的手段，你也可以声明你自己的 `WebServerFactory` bean，这将覆盖 Spring Boot 提供的工厂。当你这样做时，自动配置的自定义器仍然会应用到你的自定义工厂中，所以在使用此选项时要小心

## **向应用程序添加 Servlet、Filter 或 Listener**

在 Servlet 栈应用程序中，也就是使用 `spring-boot-starter-web` 时，有两种方式可以将 `Servlet`、`Filter`、`ServletContextListener` 以及 Servlet API 支持的其他监听器添加到你的应用程序

- **通过 Spring Bean 添加 Servlet、Filter 或 Listener**
- **通过 classpath 扫描添加 Servlets、Filters 和 Listeners**

### **通过 Spring Bean 添加 Servlet、Filter 或 Listener**

为了通过 Spring Bean 添加 `Servlet`、`Filter` 或 Servlet `*Listener`，你必须为它们提供一个 `@Bean` 定义。这样做对于想要注入配置或依赖的场景非常有用。然而，你必须非常小心，确保它们不会导致过早初始化过多的其他 Bean，因为它们必须在应用程序生命周期的很早阶段就被安装到容器中。例如，最好避免让它们依赖于 `DataSource` 或 JPA 配置等 Bean。你可以通过将 Bean 设置为在首次使用时懒初始化，而不是在初始化时加载，来解决这种限制。

在 Filters 和 Servlets 的情况下，你还可以通过 `FilterRegistrationBean` 或 `ServletRegistrationBean` 来添加映射和初始化参数，作为或附加到底层组件

::: info ℹ️
如果没有在 Filter 注册时指定 `dispatcherType`，默认使用 `REQUEST`，这与 Servlet 规范中的默认调度类型一致
:::

与其他 Spring Bean 一样，你可以定义 Servlet、Filter Bean 的加载顺序。确保查看 [**Registering Servlets, Filters, and Listeners as Spring Beans**](https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.embedded-container.servlets-filters-listeners.beans) 部分，了解如何控制 Bean 的顺序

**禁用 Servlet 或 Filter 的注册**

如前所述，任何 `Servlet` 或 `Filter` bean 都会自动注册到 servlet 容器中。要禁用特定 `Filter` 或 `Servlet` bean 的注册，可以为其创建一个注册 bean 并将其标记为禁用，如下所示：

```Java
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class MyFilterConfiguration {

        @Bean
        public FilterRegistrationBean<MyFilter> registration(MyFilter filter) {
                FilterRegistrationBean<MyFilter> registration = new FilterRegistrationBean<>(filter);
                registration.setEnabled(false);
                return registration;
        }

}
```

### **通过 classpath 扫描添加 Servlets、Filters 和 Listeners**

通过在 `@Configuration` 类上使用 `@ServletComponentScan` 注解，并指定包含要注册的组件的包，可以自动将带有 `@WebServlet`、`@WebFilter` 和 `@WebListener` 注解的类注册到嵌入式 Servlet 容器中。默认情况下，`@ServletComponentScan` 会从注解所在的类的包开始扫描

## **配置访问日志**

可以通过各自的命名空间为 Tomcat、Undertow 和 Jetty 配置访问日志。

例如，以下设置使用[自定义模式](https://tomcat.apache.org/tomcat-10.1-doc/config/valve.html#Access_Logging)在 Tomcat 上记录访问日志

```Plaintext
server.tomcat.basedir=my-tomcat
server.tomcat.accesslog.enabled=true
server.tomcat.accesslog.pattern=%t %a %r %s (%D microseconds)
```

::: info ℹ️
日志的默认位置是相对于 Tomcat 基目录的 `logs` 目录。默认情况下，`logs` 目录是一个临时目录，因此你可能需要固定 Tomcat 的基准目录或使用日志的绝对路径。在前面的示例中，日志位于相对于应用程序工作目录的 `my-tomcat/logs` 中
:::

Undertow 的访问日志可以以类似的方式进行配置，如下所示：

```Plaintext
server.undertow.accesslog.enabled=true
server.undertow.accesslog.pattern=%t %a %r %s (%D milliseconds)
server.undertow.options.server.record-request-start-time=true
```

请注意，除了启用访问日志并配置其模式外，还启用了记录请求开始时间。这在访问日志模式中包含响应时间（`%D`）时是必需的。日志存储在相对于应用程序工作目录的 `logs` 目录中。你可以通过设置 `server.undertow.accesslog.dir` 属性来自定义此位置

最后，Jetty 的访问日志配置如下：

```Plaintext
server.jetty.accesslog.enabled=true
server.jetty.accesslog.filename=/var/log/jetty-access.log
```

默认情况下，日志被重定向到 `System.err`。更多详情，请参见 Jetty 文档。

## **在前端代理服务器后运行**

如果你的应用程序运行在代理、负载均衡器后面，或者在云中，请求信息（如主机、端口、协议等）可能会在传输过程中发生变化。你的应用程序可能运行在 `10.10.10.10:8080`，但 HTTP 客户端应该只看到 `example.org`。

[RFC7239 “Forwarded Headers”](https://tools.ietf.org/html/rfc7239) 定义了 `Forwarded` HTTP 头部；代理可以使用这个头部提供有关原始请求的信息。你可以配置你的应用程序读取这些头部，并在创建链接并发送给客户端时，自动使用这些信息，比如在 HTTP 302 响应、JSON 文档或 HTML 页面中。有一些非标准的头部，比如 `X-Forwarded-Host`、`X-Forwarded-Port`、`X-Forwarded-Proto`、`X-Forwarded-Ssl` 和 `X-Forwarded-Prefix`。

如果代理添加了常用的 `X-Forwarded-For` 和 `X-Forwarded-Proto` 头部，设置 `server.forward-headers-strategy` 为 `NATIVE` 就足以支持这些头部。使用此选项，Web 服务器本身会原生支持此功能；你可以查看它们的具体文档来了解具体的行为。

如果这还不够，Spring 框架提供了一个 [`ForwardedHeaderFilter`](https://docs.spring.io/spring-framework/reference/6.1/web/webmvc/filters.html#filters-forwarded-headers)（用于 servlet 栈）和一个 [`ForwardedHeaderTransformer`](https://docs.spring.io/spring-framework/reference/6.1/web/webflux/reactive-spring.html#webflux-forwarded-headers)（用于反应栈）。你可以通过将 `server.forward-headers-strategy` 设置为 `FRAMEWORK` 来在应用程序中使用它们

::: tip 💡
如果你使用 Tomcat 并且在代理处终止 SSL，应该将 `server.tomcat.redirect-context-root` 设置为 `false`。这允许在执行任何重定向之前先处理 `X-Forwarded-Proto` 头部。
:::

::: info ℹ️
如果你的应用程序运行在[支持的云平台](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/cloud/CloudPlatform.html#enum-constant-summary)中，`server.forward-headers-strategy` 属性默认为 `NATIVE`。在其他情况下，默认为 `NONE`。
:::

### **自定义 Tomcat 的代理配置**

如果你使用 Tomcat，你还可以配置用于携带“转发”信息的头部名称，如下所示：

```Plaintext
server.tomcat.remoteip.remote-ip-header=x-your-remote-ip-header
server.tomcat.remoteip.protocol-header=x-your-protocol-header
```

Tomcat 还配置了一个正则表达式，用于匹配需要信任的内部代理。请参阅[附录中的 ](https://docs.spring.io/spring-boot/appendix/application-properties/index.html#application-properties.server.server.tomcat.remoteip.internal-proxies)[`server.tomcat.remoteip.internal-proxies`](https://docs.spring.io/spring-boot/appendix/application-properties/index.html#application-properties.server.server.tomcat.remoteip.internal-proxies)[ 条目](https://docs.spring.io/spring-boot/appendix/application-properties/index.html#application-properties.server.server.tomcat.remoteip.internal-proxies)，了解其默认值。你可以通过在 `application.properties` 中添加条目来定制该阀门的配置，如下所示：

```Plaintext
server.tomcat.remoteip.internal-proxies=192\.168\.\d{1,3}\.\d{1,3}
```

::: info ℹ️
你可以通过将 `internal-proxies` 设置为空来信任所有代理（但不要在生产环境中这样做）。
:::

你还可以通过关闭自动配置来完全控制 Tomcat 的 `RemoteIpValve` 配置（方法是设置 `server.forward-headers-strategy=NONE`），然后使用 `WebServerFactoryCustomizer` bean 添加一个新的阀门实例

## **启用 Tomcat 的多连接器**

你可以将 `org.apache.catalina.connector.Connector` 添加到 `TomcatServletWebServerFactory` 中，这样可以允许多个连接器，包括 HTTP 和 HTTPS 连接器，如下例所示：

```Java
import org.apache.catalina.connector.Connector;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class MyTomcatConfiguration {

        @Bean
        public WebServerFactoryCustomizer<TomcatServletWebServerFactory> connectorCustomizer() {
                return (tomcat) -> tomcat.addAdditionalTomcatConnectors(createConnector());
        }

        private Connector createConnector() {
                Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
                connector.setPort(8081);
                return connector;
        }

}
```

## **启用 Tomcat 的 MBean 注册表**

嵌入式 Tomcat 的 MBean 注册表默认是禁用的。这是为了最小化 Tomcat 的内存占用。如果你希望使用 Tomcat 的 MBeans，例如使其能够被 Micrometer 用来暴露度量信息，你必须使用 `server.tomcat.mbeanregistry.enabled` 属性来启用它，如下例所示：

```Plaintext
server.tomcat.mbeanregistry.enabled=true
```

## **启用 Undertow 的多监听器**

将 `UndertowBuilderCustomizer` 添加到 `UndertowServletWebServerFactory`，并向构建器添加一个监听器，如下例所示：

```Java
import io.undertow.Undertow.Builder;

import org.springframework.boot.web.embedded.undertow.UndertowServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class MyUndertowConfiguration {

        @Bean
        public WebServerFactoryCustomizer<UndertowServletWebServerFactory> undertowListenerCustomizer() {
                return (factory) -> factory.addBuilderCustomizers(this::addHttpListener);
        }

        private Builder addHttpListener(Builder builder) {
                return builder.addHttpListener(8080, "0.0.0.0");
        }

}
```

## **使用 @ServerEndpoint 创建 WebSocket 端点**

如果你想在使用嵌入式容器的 Spring Boot 应用程序中使用 `@ServerEndpoint`，你必须声明一个 `ServerEndpointExporter` 的 @Bean，如下所示：

```Java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration(proxyBeanMethods = false)
public class MyWebSocketConfiguration {

        @Bean
        public ServerEndpointExporter serverEndpointExporter() {
                return new ServerEndpointExporter();
        }

}
```

上面示例中的 @Bean 会将所有 `@ServerEndpoint` 注解的 bean 注册到底层的 WebSocket 容器中。当部署到独立的 servlet 容器时，这个角色由 servlet 容器初始化器执行，`ServerEndpointExporter` bean 就不再需要了