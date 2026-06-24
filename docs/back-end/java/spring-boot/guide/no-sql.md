---
description: 'SpringBoot 提供了 NoSQL 支持，其 Data Redis Starter 默认使用 Lettuce，但可通过排除该依赖并添加 Jedis 来切换，且无需指定版本。示例展示了 Maven 中的依赖配置。'
lastUpdated: '2026-06-20 12:16:51'
head:
  - - meta
    - name: 'og:title'
      content: 'NoSQL'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'SpringBoot 提供了 NoSQL 支持，其 Data Redis Starter 默认使用 Lettuce，但可通过排除该依赖并添加 Jedis 来切换，且无需指定版本。示例展示了 Maven 中的依赖配置。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/guide/no-sql.html'
---
# NoSQL

Spring Boot 提供了许多支持 NoSQL 技术的 starters。本节解答了使用 Spring Boot 与 NoSQL 时可能出现的问题。

## 使用 Jedis 替代 **Lettuce**

默认情况下，Spring Boot 的 starter（`spring-boot-starter-data-redis`）使用 [Lettuce](https://github.com/lettuce-io/lettuce-core/)。你需要排除该依赖并改为包含 [Jedis](https://github.com/xetorthio/jedis/) 的依赖。Spring Boot 管理这两种依赖，因此你可以切换到 Jedis 而无需指定版本。

以下示例展示了如何在 Maven 中实现这一点：

```XML
<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
        <exclusions>
                <exclusion>
                        <groupId>io.lettuce</groupId>
                        <artifactId>lettuce-core</artifactId>
                </exclusion>
        </exclusions>
</dependency>
<dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
</dependency>
```

以下示例展示了如何在 Gradle 中实现这一点

```Groovy
dependencies {
        implementation('org.springframework.boot:spring-boot-starter-data-redis') {
            exclude group: 'io.lettuce', module: 'lettuce-core'
        }
        implementation 'redis.clients:jedis'
        // ...
}
```