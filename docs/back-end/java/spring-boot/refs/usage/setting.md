---
description: '配置类可以导入其他配置类以实现模块化组合，还能导入XML配置文件以整合传统配置方式，提升灵活性。'
lastUpdated: '2026-06-20 12:15:26'
head:
  - - meta
    - name: 'og:title'
      content: '配置类'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '配置类可以导入其他配置类以实现模块化组合，还能导入XML配置文件以整合传统配置方式，提升灵活性。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/setting.html'
---
# 配置类

Spring Boot 偏好使用基于 Java 的配置。尽管可以使用 `SpringApplication` 结合 XML 配置源，但我们通常建议将主配置源作为一个单独的 `@Configuration` 类。通常，定义主方法的类是作为主要 `@Configuration` 类的好选择

::: tip 💡
互联网上有许多使用 XML 配置的 Spring 配置示例。如果可能，尽量使用等效的基于 Java 的配置。查找 `Enable*` 注解是一个很好的起点
:::

## **导入额外的配置类**

你不必将所有的 `@Configuration` 放在一个类中。可以使用 `@Import` 注解来导入额外的配置类。或者，你可以使用 `@ComponentScan` 来自动扫描所有 Spring 组件，包括 `@Configuration` 类。

## **导入 XML 配置**

如果你必须使用基于 XML 的配置，我们建议你仍然从一个 `@Configuration` 类开始。然后可以使用 `@ImportResource` 注解来加载 XML 配置文件。