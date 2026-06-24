---
description: '本内容涉及使用Spring Security进行测试的方法，以及如何为切片测试组织@Configuration类，旨在提升测试的针对性与配置管理效率。'
lastUpdated: '2026-06-20 12:16:54'
head:
  - - meta
    - name: 'og:title'
      content: '测试 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本内容涉及使用Spring Security进行测试的方法，以及如何为切片测试组织@Configuration类，旨在提升测试的针对性与配置管理效率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/guide/testing.html'
---
# 测试

Spring Boot 提供了丰富的测试工具和支持类，并且包含一个专用的测试起步依赖（**starter**），以简化测试相关的依赖管理和配置。本节将回答关于 Spring Boot 测试的一些常见问题

## **使用 Spring Security 进行测试**

Spring Security 支持以特定用户身份运行测试。例如，以下代码片段中的测试将以具有 `ADMIN` 角色的已认证用户身份运行。

```Java
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(UserController.class)
class MySecurityTests {

        @Autowired
        private MockMvc mvc;

        @Test
        @WithMockUser(roles = "ADMIN")
        void requestProtectedUrlWithUser() throws Exception {
                this.mvc.perform(get("/"));
        }

}
```

Spring Security 提供了对 Spring MVC 测试的全面集成，这也可以用于在使用 `@WebMvcTest` 和 `MockMvc` 进行控制器测试时

有关 Spring Security 测试支持的更多详细信息，请参阅 Spring Security 的[参考文档](https://docs.spring.io/spring-security/reference/6.3/servlet/test/index.html)

## **为切片测试组织 @Configuration 类**

切片测试通过限制 Spring Framework 的组件扫描，仅扫描特定类型的组件来工作。对于那些不是通过组件扫描创建的 Bean，例如使用 `@Bean` 注解创建的 Bean，切片测试无法将它们包括或排除在应用上下文之外。以下是一个示例：

```Java
import org.apache.commons.dbcp2.BasicDataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration(proxyBeanMethods = false)
public class MyConfiguration {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.authorizeHttpRequests((requests) -> requests.anyRequest().authenticated());
                return http.build();
        }

        @Bean
        @ConfigurationProperties("app.datasource.second")
        public BasicDataSource secondDataSource() {
                return DataSourceBuilder.create().type(BasicDataSource.class).build();
        }

}
```

对于具有上述 `@Configuration` 类的 `@WebMvcTest` 测试，你可能期望 `SecurityFilterChain` Bean 出现在应用上下文中，以便测试控制器端点是否得到了正确的安全保护。然而，`MyConfiguration` 不会被 `@WebMvcTest` 的组件扫描过滤器所拾取，因为它不匹配过滤器指定的任何类型。你可以通过在测试类上使用 `@Import(MyConfiguration.class)` 显式地包含该配置。这将加载 `MyConfiguration` 中的所有 Bean，包括不需要在测试 Web 层时使用的 `BasicDataSource` Bean。将配置类拆分成两个类将允许只导入安全配置。

```Java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration(proxyBeanMethods = false)
public class MySecurityConfiguration {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.authorizeHttpRequests((requests) -> requests.anyRequest().authenticated());
                return http.build();
        }

}
```

```Java
import org.apache.commons.dbcp2.BasicDataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class MyDatasourceConfiguration {

        @Bean
        @ConfigurationProperties("app.datasource.second")
        public BasicDataSource secondDataSource() {
                return DataSourceBuilder.create().type(BasicDataSource.class).build();
        }

}
```

当将所有配置放在单一配置类中时，可能会在需要包含特定领域的 Bean 进行切片测试时造成低效。相反，将应用程序的配置结构化为多个细粒度的类，每个类包含特定领域的 Bean，可以让你仅在特定的切片测试中导入它们，从而提高效率