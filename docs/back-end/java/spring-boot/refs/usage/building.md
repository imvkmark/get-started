---
description: '将应用程序打包用于生产环境涉及构建优化、依赖管理、环境配置、资源压缩及代码混淆，确保应用性能、安全性和稳定性，输出可部署的产物。'
lastUpdated: '2026-06-20 12:15:44'
head:
  - - meta
    - name: 'og:title'
      content: '将应用程序打包用于生产环境 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '将应用程序打包用于生产环境涉及构建优化、依赖管理、环境配置、资源压缩及代码混淆，确保应用性能、安全性和稳定性，输出可部署的产物。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/spring-boot/refs/usage/building.html'
---
# 将应用程序打包用于生产环境

当您的 Spring Boot 应用程序准备好部署到生产环境时，有多种选项可用于打包和优化应用程序。有关这些功能的详细信息，请参阅文档中的 [打包 Spring Boot 应用程序](https://docs.spring.io/spring-boot/reference/packaging/index.html) 部分。

要添加额外的“生产就绪”功能，例如健康检查、审计、度量的 REST 或 JMX 端点，您可以考虑添加 `spring-boot-actuator`。详细信息请参阅 [Actuator](https://docs.spring.io/spring-boot/how-to/actuator.html) 章节