---
description: '@SpringBootApplication注解集成了三项功能：启用自动配置、组件扫描，以及通过@SpringBootConfiguration注册额外Bean或导入配置。它简化了SpringBoot应用的配置，是开发中的核心注解。'
lastUpdated: '2026-06-20 12:15:32'
head:
  - - meta
    - name: 'og:title'
      content: '使用 @SpringBootApplication 注解'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '@SpringBootApplication注解集成了三项功能：启用自动配置、组件扫描，以及通过@SpringBootConfiguration注册额外Bean或导入配置。它简化了SpringBoot应用的配置，是开发中的核心注解。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/spring-boot-application-annotation.html'
---
# 使用 @SpringBootApplication 注解

许多 Spring Boot 开发者希望他们的应用使用自动配置、组件扫描，并能在“应用程序类”上定义额外的配置。一个 `@SpringBootApplication` 注解可以启用这三个功能，即：

- `@EnableAutoConfiguration`：启用 Spring Boot 的自动配置机制。
- `@ComponentScan`：启用应用所在包的 @Component 扫描（参见最佳实践）。
- `@SpringBootConfiguration`：在上下文中注册额外的 Bean 或导入其他配置类的能力。它是 Spring 标准 `@Configuration` 的替代选项，有助于在集成测试中进行配置检测。

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Same as @SpringBootConfiguration @EnableAutoConfiguration @ComponentScan
@SpringBootApplication
public class MyApplication {

        public static void main(String[] args) {
                SpringApplication.run(MyApplication.class, args);
        }

}
```

::: info ℹ️
`@SpringBootApplication` 还提供了别名，用于自定义 `@EnableAutoConfiguration` 和 `@ComponentScan` 的属性
:::

::: info ℹ️
`这些功能都不是强制性的，你可以选择用任何它启用的特性来替换该单一注解`
:::

例如，你可能不希望在应用中使用组件扫描或配置属性扫描：

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;

@SpringBootConfiguration(proxyBeanMethods = false)
@EnableAutoConfiguration
@Import({ SomeConfiguration.class, AnotherConfiguration.class })
public class MyApplication {

        public static void main(String[] args) {
                SpringApplication.run(MyApplication.class, args);
        }

}
```

在此示例中，MyApplication 与其他 Spring Boot 应用程序类似，不同之处在于 `@Component` 注解的类和 `@ConfigurationProperties` 注解的类不会被自动检测，用户定义的 Bean 是通过显式导入的（见 `@Import`）。