---
description: '推荐使用构造函数注入和@ComponentScan发现bean。将应用程序类置于顶层包，可用@SpringBootApplication隐式包含扫描。所有组件如@Component等自动注册为Spring Bean。'
lastUpdated: '2026-06-20 12:15:29'
head:
  - - meta
    - name: 'og:title'
      content: 'Spring Beans 和依赖注入'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '推荐使用构造函数注入和@ComponentScan发现bean。将应用程序类置于顶层包，可用@SpringBootApplication隐式包含扫描。所有组件如@Component等自动注册为Spring Bean。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/beans.html'
---
# Spring Beans 和依赖注入

您可以自由使用任何标准的 Spring Framework 技术来定义 bean 及其依赖项注入。我们通常推荐使用构造函数注入来连接依赖项，并使用 `@ComponentScan` 来发现 bean。

如果按照上面的建议结构化代码（将应用程序类放在顶层包中），可以在不带参数的情况下添加 `@ComponentScan`，或使用隐式包含该功能的 `@SpringBootApplication` 注解。应用程序中的所有组件（如 `@Component`、`@Service`、`@Repository`、`@Controller` 等）都会自动注册为 Spring Bean。

以下示例展示了一个使用构造函数注入获取所需 `RiskAssessor` bean 的 `@Service` Bean：

```Java
import org.springframework.stereotype.Service;

@Service
public class MyAccountService implements AccountService {

        private final RiskAssessor riskAssessor;

        public MyAccountService(RiskAssessor riskAssessor) {
                this.riskAssessor = riskAssessor;
        }

        // ...

}
```

如果一个 Bean 有多个构造函数，你需要用 `@Autowired` 注解标记你希望 Spring 使用的那个构造函数：

```Java
import java.io.PrintStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyAccountService implements AccountService {

        private final RiskAssessor riskAssessor;

        private final PrintStream out;

        @Autowired
        public MyAccountService(RiskAssessor riskAssessor) {
                this.riskAssessor = riskAssessor;
                this.out = System.out;
        }

        public MyAccountService(RiskAssessor riskAssessor, PrintStream out) {
                this.riskAssessor = riskAssessor;
                this.out = out;
        }

        // ...

}
```

::: tip 💡
注意，使用构造函数注入可以使 riskAssessor 字段被标记为 final，表明它之后无法被更改。
:::