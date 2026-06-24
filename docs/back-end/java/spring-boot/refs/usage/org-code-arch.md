---
description: '建议使用“默认”包组织代码结构，并准确定位主应用程序类，以简化配置和避免包路径问题。'
lastUpdated: '2026-06-20 12:15:22'
head:
  - - meta
    - name: 'og:title'
      content: '组织代码结构'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '建议使用“默认”包组织代码结构，并准确定位主应用程序类，以简化配置和避免包路径问题。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/org-code-arch.html'
---
# 组织代码结构

Spring Boot 不要求特定的代码布局来工作。然而，有一些最佳实践可以帮助改进开发过程。

::: tip 💡
如果你希望基于领域强制执行一种结构，可以查看 [**Spring Modulith**](https://spring.io/projects/spring-modulith#overview)
:::

## **使用“默认”包**

当一个类没有包含 `package` 声明时，它被视为位于“默认包”中。一般不推荐使用“默认包”，并且应该避免使用。它可能会为使用 `@ComponentScan`、`@ConfigurationPropertiesScan`、`@EntityScan` 或 `@SpringBootApplication` 注解的 Spring Boot 应用程序带来一些问题，因为每个 JAR 文件中的所有类都会被读取

::: tip 💡
我们建议遵循 Java 推荐的包命名规范，并使用反向域名（例如 `com.example.project`）。
:::

## **定位主应用程序类**

我们通常建议将主应用程序类放置在根包中，位于其他类之上。`@SpringBootApplication` 注解通常放在主类上，它隐式定义了某些项目的“基础搜索包”。例如，如果你正在编写一个 JPA 应用程序，`@SpringBootApplication` 注解类所在的包将用于搜索 `@Entity` 项目。使用根包还可以使组件扫描仅适用于你的项目

::: tip 💡
如果你不想使用 `@SpringBootApplication`，它所导入的 `@EnableAutoConfiguration` 和 `@ComponentScan` 注解也定义了该行为，因此你也可以单独使用这些注解。
:::

以下是一个典型的布局示例：

```Plaintext
com
 +- example
     +- myapplication
         +- MyApplication.java
         |
         +- customer
         |   +- Customer.java
         |   +- CustomerController.java
         |   +- CustomerService.java
         |   +- CustomerRepository.java
         |
         +- order
             +- Order.java
             +- OrderController.java
             +- OrderService.java
             +- OrderRepository.java
```

`MyApplication.java` 文件会声明主方法，并包含基本的 `@SpringBootApplication` 注解，如下所示：

```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApplication {

        public static void main(String[] args) {
                SpringApplication.run(MyApplication.class, args);
        }

}
```