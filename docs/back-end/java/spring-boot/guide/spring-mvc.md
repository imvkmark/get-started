---
description: '该内容描述了Spring MVC的核心功能，包括构建JSON和XML的REST服务，自定义Jackson的ObjectMapper及@ResponseBody渲染，处理多部分文件上传，以及关闭DispatcherServlet和默认MVC配置，自定义ViewResolvers与“whitelabel”错误页面。'
lastUpdated: '2026-06-20 12:16:48'
head:
  - - meta
    - name: 'og:title'
      content: 'Spring MVC'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该内容描述了Spring MVC的核心功能，包括构建JSON和XML的REST服务，自定义Jackson的ObjectMapper及@ResponseBody渲染，处理多部分文件上传，以及关闭DispatcherServlet和默认MVC配置，自定义ViewResolvers与“whitelabel”错误页面。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/guide/spring-mvc.html'
---
# Spring MVC

Spring Boot 提供了一些包含 Spring MVC 的启动器。请注意，一些启动器是通过依赖于 Spring MVC 而非直接包含它来实现的。本节解答了有关 Spring MVC 和 Spring Boot 的常见问题

## 编写一个 JSON REST 服务

任何 Spring Boot 应用中的 Spring `@RestController` 只要 classpath 中存在 Jackson2，默认就会渲染 JSON 响应，如以下示例所示:

```Java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

        @RequestMapping("/thing")
        public MyThing thing() {
                return new MyThing();
        }

}
```

只要 `MyThing` 可以被 Jackson2 序列化（对于普通的 POJO 或 Groovy 对象来说是成立的），那么访问 `localhost:8080/thing` 时，默认会返回其 JSON 表示。需要注意的是，在浏览器中，你可能有时会看到 XML 响应，这是因为浏览器通常会发送偏好 XML 的 Accept 请求头。

## 编写一个 XML REST 服务

如果 classpath 中包含 Jackson 的 XML 扩展（`jackson-dataformat-xml`），可以使用它来渲染 XML 响应。前面用于 JSON 的示例同样适用于 XML 渲染。要使用 Jackson 的 XML 渲染器，请将以下依赖项添加到项目中

```XML
<dependency>
        <groupId>com.fasterxml.jackson.dataformat</groupId>
        <artifactId>jackson-dataformat-xml</artifactId>
</dependency>
```

如果 Jackson 的 XML 扩展不可用，但项目中包含了 JAXB，可以通过将 MyThing 注解为 `@XmlRootElement` 来渲染 XML，如以下示例所示

```Java
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MyThing {

        private String name;

        public String getName() {
                return this.name;
        }

        public void setName(String name) {
                this.name = name;
        }

}
```

需要确保项目中包含 JAXB 库，例如添加以下依赖项

```XML
<dependency>
        <groupId>org.glassfish.jaxb</groupId>
        <artifactId>jaxb-runtime</artifactId>
</dependency>
```

::: info ℹ️
要使服务器渲染 XML 而不是 JSON，可能需要发送 `Accept: text/xml` 请求头（或者使用浏览器进行请求
:::

## 自定义 Jackson 的 ObjectMapper

Spring MVC（客户端和服务器端）使用 `HttpMessageConverters` 在 HTTP 交换中协商内容转换。如果 classpath 中存在 Jackson，系统会自动配置由 `Jackson2ObjectMapperBuilder` 提供的默认转换器实例。

默认创建的 `ObjectMapper`（或用于 Jackson XML 转换器的 `XmlMapper`）实例具有以下自定义属性：

- `MapperFeature.DEFAULT_VIEW_INCLUSION` 被禁用
- `DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES` 被禁用
- `SerializationFeature.WRITE_DATES_AS_TIMESTAMPS` 被禁用
- `SerializationFeature.WRITE_DURATIONS_AS_TIMESTAMPS` 被禁用

Spring Boot 还提供了一些功能，使自定义这些行为变得更容易。

可以通过环境来配置 `ObjectMapper` 和 `XmlMapper` 实例。Jackson 提供了大量开关功能，这些功能可用于配置其处理过程的各个方面。这些功能被描述为 Jackson 中的多个枚举，它们与环境中的属性一一对应：

| Enum | Property | Values |
|-|-|-|
| `com.fasterxml.jackson.databind.cfg.EnumFeature` | `spring.jackson.datatype.enum.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.databind.cfg.JsonNodeFeature` | `spring.jackson.datatype.json-node.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.databind.DeserializationFeature` | `spring.jackson.deserialization.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.core.JsonGenerator.Feature` | `spring.jackson.generator.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.databind.MapperFeature` | `spring.jackson.mapper.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.core.JsonParser.Feature` | `spring.jackson.parser.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.databind.SerializationFeature` | `spring.jackson.serialization.<feature_name>` | `true`, `false` |
| `com.fasterxml.jackson.annotation.JsonInclude.Include` | `spring.jackson.default-property-inclusion` | `always`, `non_null`, `non_absent`, `non_default`, `non_empty` |

例如，要启用格式化打印，可以设置 `spring.jackson.serialization.indent_output=true`。注意，由于使用了[宽松绑定](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding)，不需要使 `indent_output` 的大小写与对应的枚举常量（即 `INDENT_OUTPUT`）大小写匹配

这种基于环境的配置会应用于自动配置的 `Jackson2ObjectMapperBuilder` bean，并适用于通过该构建器创建的所有映射器，包括自动配置的 `ObjectMapper` bean。

可以通过一个或多个 `Jackson2ObjectMapperBuilderCustomizer` bean 来自定义上下文的 `Jackson2ObjectMapperBuilder`。这些自定义器 bean 是有顺序的（Spring Boot 自带的自定义器的顺序为 `0`），从而允许在 Boot 自定义化之前和之后应用额外的自定义化。

类型为 `com.fasterxml.jackson.databind.Module` 的所有 bean 会自动注册到自动配置的 `Jackson2ObjectMapperBuilder` 中，并应用于其创建的任何 `ObjectMapper` 实例。这提供了一种全局机制，当你向应用程序添加新功能时，可以通过这种机制贡献自定义模块。

如果你想完全替换默认的 `ObjectMapper`，可以定义该类型的一个 `@Bean`，或者如果你更喜欢基于构建器的方法，可以定义一个 `Jackson2ObjectMapperBuilder` 类型的 `@Bean`。在定义 `ObjectMapper` bean 时，建议将其标记为 `@Primary`，因为它会替换自动配置的 `ObjectMapper`，而后者是 `@Primary`。注意，在任何一种情况下，这都会禁用对 `ObjectMapper` 的所有自动配置。

如果你提供了任何 `@Bean` 类型为 `MappingJackson2HttpMessageConverter` 的 bean，它们将替换 MVC 配置中的默认值。此外，还提供了一个类型为 `HttpMessageConverters` 的便捷 bean（如果你使用默认的 MVC 配置，它总是可用的）。该便捷 bean 提供了一些有用的方法，可以访问默认和用户增强的消息转换器。

有关更多详细信息，请参阅 [自定义 @ResponseBody 渲染](https://docs.spring.io/spring-boot/how-to/spring-mvc.html#howto.spring-mvc.customize-responsebody-rendering) 部分以及 [`WebMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration.java) 源代码

## 自定义 @ResponseBody 的渲染

Spring 使用 `HttpMessageConverters` 来渲染 `@ResponseBody`（或 `@RestController` 的响应）。你可以通过在 Spring Boot 上下文中添加适当类型的 bean 来贡献额外的转换器。如果你添加的 bean 类型是默认情况下已经包含的类型（例如用于 JSON 转换的 `MappingJackson2HttpMessageConverter`），它会替换默认值。提供了一个类型为 `HttpMessageConverters` 的便捷 bean，并且在你使用默认 MVC 配置时总是可用的。该便捷 bean 提供了一些有用的方法，用于访问默认的和用户增强的消息转换器（例如，如果你想将它们手动注入到自定义的 `RestTemplate` 中，这将非常有用）。

与常规 MVC 使用一样，你提供的任何 `WebMvcConfigurer` bean 也可以通过覆盖 `configureMessageConverters` 方法来贡献转换器。然而，与常规 MVC 不同的是，你仅需提供额外需要的转换器（因为 Spring Boot 使用相同的机制贡献默认值）。最后，如果你通过提供自己的 `@EnableWebMvc` 配置选择退出默认的 Spring Boot MVC 配置，你可以完全掌控并使用 `WebMvcConfigurationSupport` 的 `getMessageConverters` 方法手动完成所有操作。

有关更多详细信息，请参阅 [`WebMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration.java) 源代码。

## 处理多部分文件上传

Spring Boot 支持使用 Servlet 5 的 `jakarta.servlet.http.Part` API 来上传文件。默认情况下，Spring Boot 为 Spring MVC 配置了每个文件最大 1MB 的大小限制，以及单个请求中文件数据总量最大为 10MB 的限制。你可以通过使用 `MultipartProperties` 类中公开的属性来覆盖这些默认值，包括中间数据存储的位置（例如 `/tmp` 目录）以及超过阈值时将数据刷新到磁盘的行为。例如，如果你希望文件大小不受限制，可以将 `spring.servlet.multipart.max-file-size` 属性设置为 `-1`。

Multipart 支持在你希望在 Spring MVC 控制器的处理方法中将多部分编码的文件数据作为 `@RequestParam` 注解的 `MultipartFile` 类型参数接收时非常有用。

有关更多详细信息，请参阅 [`MultipartAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/MultipartAutoConfiguration.java) 源代码。

::: info ℹ️
建议使用容器内置的多部分上传支持，而不是引入诸如 Apache Commons File Upload 这样的额外依赖项
:::

## 关闭 Spring MVC 的 DispatcherServlet

默认情况下，所有内容都从应用程序的根路径 (`/`) 提供服务。如果你希望映射到其他路径，可以按以下方式配置：

```Java
spring.mvc.servlet.path=/mypath
```

如果你有额外的 Servlets，可以为每个 Servlet 声明一个 `Servlet` 类型的 `@Bean` 或 `ServletRegistrationBean`，Spring Boot 会自动将它们透明地注册到容器中。通过这种方式注册的 Servlets，可以映射到 `DispatcherServlet` 的子上下文，而无需直接触发它

自行配置 `DispatcherServlet` 的情况并不常见，但如果确实需要这样做，你还必须提供一个 `DispatcherServletPath` 类型的 `@Bean`，以指定自定义 `DispatcherServlet` 的路径。

## 关闭默认的 MVC 配置

最简单的方式完全控制 MVC 配置是提供你自己的带有 `@EnableWebMvc` 注解的 `@Configuration` 类。这样做会将所有的 MVC 配置交由你自行处理

## 自定义 ViewResolvers

`ViewResolver` 是 Spring MVC 的核心组件，它将 `@Controller` 中的视图名称翻译为实际的 `View` 实现。需要注意的是，`ViewResolver` 主要用于 UI 应用，而不是 REST 风格的服务（在渲染 `@ResponseBody` 时不会使用 View）。有许多 `ViewResolver` 的实现可供选择，Spring 本身对你使用哪一种并不持特定意见。而 Spring Boot 会根据 classpath 和应用上下文的内容自动为你安装一个或多个 `ViewResolver`。`DispatcherServlet` 会使用应用上下文中找到的所有 `ViewResolver`，按顺序尝试，直到获得结果。如果你添加了自己的 `ViewResolver`，需要注意它的顺序以及它在解析链中的位置。

`WebMvcAutoConfiguration` 添加的 `ViewResolver`

- `InternalResourceViewResolver` 名为 defaultViewResolver，用于定位可以通过 `DefaultServlet` 渲染的物理资源（包括静态资源和 JSP 页面，若你使用这些）。它会在视图名称前后添加前缀和后缀，然后在 servlet 上下文中查找具有该路径的物理资源（默认的前缀和后缀均为空，但可以通过 `spring.mvc.view.prefix` 和 `spring.mvc.view.suffix` 进行外部配置）。你可以通过提供同类型的 bean 来覆盖它。
- `BeanNameViewResolver` 名为 beanNameViewResolver，是解析链中的有用成员，会拾取与被解析 `View` 同名的任何 bean。通常无需覆盖或替换它。
- `ContentNegotiatingViewResolver` 名为 viewResolver，仅当存在类型为 `View` 的 bean 时才添加。它是一个复合解析器，委托给其他解析器，并尝试与客户端发送的 “Accept” HTTP 头匹配。如果需要详细了解，可以查看关于 [`ContentNegotiatingViewResolver`](https://spring.io/blog/2013/06/03/content-negotiation-using-views)[ 的博客](https://spring.io/blog/2013/06/03/content-negotiation-using-views)或源码。你可以通过定义名为 viewResolver 的 bean 来关闭自动配置的 `ContentNegotiatingViewResolver`。
- `ThymeleafViewResolver`, 名为 thymeleafViewResolver，会通过在视图名称周围添加前缀和后缀来查找资源。前缀为 `spring.thymeleaf.prefix`，后缀为 `spring.thymeleaf.suffix`，默认值分别为 `classpath:/templates/` 和 `.html`。可通过提供同名 bean 覆盖。
- `FreeMarkerViewResolver` 名为 freeMarkerViewResolver，会通过在视图名称周围添加前缀和后缀在加载路径中查找资源。前缀和后缀的配置分别为 `spring.freemarker.prefix` 和 `spring.freemarker.suffix`，默认值分别为空和 `.ftlh`。可通过提供同名 bean 覆盖。
- `GroovyMarkupViewResolver` 名为 groovyMarkupViewResolver，通过在视图名称周围添加前缀和后缀查找资源。前缀为 `spring.groovy.template.prefix`，后缀为 `spring.groovy.template.suffix`，默认值分别为 `classpath:/templates/` 和 `.tpl`。可通过提供同名 bean 覆盖。
- `MustacheViewResolver` 名为 mustacheViewResolver，通过在视图名称周围添加前缀和后缀查找资源。前缀为 `spring.mustache.prefix`，后缀为 `spring.mustache.suffix`，默认值分别为 `classpath:/templates/` 和 `.mustache`。可通过提供同名 bean 覆盖

**更多信息请参考以下部分**

•        [`WebMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration.java)

•        [`ThymeleafAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/thymeleaf/ThymeleafAutoConfiguration.java)

•        [`FreeMarkerAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/freemarker/FreeMarkerAutoConfiguration.java)

•        [`GroovyTemplateAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/groovy/template/GroovyTemplateAutoConfiguration.java)

## 自定义 “whitelabel” 错误页面

Spring Boot 提供了一个“whitelabel”错误页面，当浏览器客户端遇到服务器错误时会显示该页面（而对于 JSON 和其他媒体类型的机器客户端，会收到合适的错误代码和响应）。

::: info ℹ️
设置 `server.error.whitelabel.enabled=false` 可以关闭默认错误页面。此时，将恢复所使用的 servlet 容器的默认行为。不过需要注意，Spring Boot 仍会尝试解析错误视图，因此建议你添加自定义错误页面，而不是完全禁用它。
:::

如何覆盖默认错误页面取决于你使用的模板引擎。例如：如果使用 Thymeleaf，可以添加一个 `error.html` 模板, 如果使用 FreeMarker，可以添加一个 `error.ftlh` 模板

通常，需要提供一个名为 error 的视图，或者在 `@Controller` 中处理 `/error` 路径。

如果没有替换默认配置，应用上下文中应该会有一个 `BeanNameViewResolver`，因此可以通过定义一个名为 `error` 的 `@Bean` 来实现自定义错误处理。更多选项可以参考 [`ErrorMvcAutoConfiguration`](https://github.com/spring-projects/spring-boot/tree/v3.3.5/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/servlet/error/ErrorMvcAutoConfiguration.java)

有关如何在 servlet 容器中注册错误处理程序的详细信息，请参阅 [错误处理](https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.spring-mvc.error-handling) 部分