---
description: 'SpringBoot为AOP提供自动配置，默认使用CGLib代理。可通过设置spring.aop.proxy-target-class=false改用JDK代理。若AspectJ在类路径中，自动启用其自动代理，无需显式添加@EnableAspectJAutoProxy注解。'
lastUpdated: '2026-06-20 12:16:09'
head:
  - - meta
    - name: 'og:title'
      content: 'AOP 面向切面编程'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SpringBoot为AOP提供自动配置，默认使用CGLib代理。可通过设置spring.aop.proxy-target-class=false改用JDK代理。若AspectJ在类路径中，自动启用其自动代理，无需显式添加@EnableAspectJAutoProxy注解。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/core-features/aop.html'
---
# AOP 面向切面编程

Spring Boot 为面向切面编程（AOP）提供了自动配置。您可以在 [Spring 框架参考文档](https://docs.spring.io/spring-framework/reference/6.1/core/aop-api.html)中了解更多关于 AOP 的信息。

默认情况下，Spring Boot 的自动配置会将 Spring AOP 配置为使用 **CGLib** 代理。如果您想改为使用 **JDK** 代理，可以将 `spring.aop.proxy-target-class` 设置为 `false`。

如果 **AspectJ** 在类路径中，Spring Boot 的自动配置会自动启用 AspectJ 自动代理，因此不需要显式添加 `@EnableAspectJAutoProxy` 注解