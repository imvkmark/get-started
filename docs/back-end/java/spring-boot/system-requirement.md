---
description: 'Spring Boot 3.3.5 需要至少 Java 17，并兼容最高至 Java 23 的版本。同时，Spring Framework 6.1.14 或更高版本也是必需的。Spring Boot 3.3.5 明确支持以下构建工具：Spring Boot 支持以下嵌入式 Servlet 容器：另外还可以将 Spring Boot 应用程序部署到任何兼容 Servlet 5.0+ 的容器中Spring Boot 应用程序可以使用 GraalVM 22.3 或更高版本转换为原生镜像。可以通过 GraalVM 提供的 native-image 工具或 Gradle/Mave'
lastUpdated: '2025-12-06 15:09:00'
head: 
  - - meta
    - name: 'og:title'
      content: '系统要求'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Spring Boot 3.3.5 需要至少 Java 17，并兼容最高至 Java 23 的版本。同时，Spring Framework 6.1.14 或更高版本也是必需的。Spring Boot 3.3.5 明确支持以下构建工具：Spring Boot 支持以下嵌入式 Servlet 容器：另外还可以将 Spring Boot 应用程序部署到任何兼容 Servlet 5.0+ 的容器中Spring Boot 应用程序可以使用 GraalVM 22.3 或更高版本转换为原生镜像。可以通过 GraalVM 提供的 native-image 工具或 Gradle/Mave'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/spring-boot/system-requirement.html'
---
# 系统要求



Spring Boot 3.3.5 需要至少 Java 17，并兼容最高至 Java 23 的版本。同时，Spring Framework 6.1.14 或更高版本也是必需的。

Spring Boot 3.3.5 明确支持以下构建工具：

<table><tbody>
  <tr>
    <td>Build Tool</td>
    <td>Version</td>
  </tr>
  <tr>
    <td>Maven</td>
    <td>3.6.3 or later</td>
  </tr>
  <tr>
    <td>Gradle</td>
    <td>7.x (7.5 or later) and 8.x</td>
  </tr>
</tbody></table>

##  **Servlet 容器** 

Spring Boot 支持以下嵌入式 Servlet 容器：

<table><tbody>
  <tr>
    <td>Name</td>
    <td>Servlet Version</td>
    <td>ps.说明</td>
  </tr>
  <tr>
    <td>Tomcat 10.1 (10.1.25 or later)</td>
    <td>6.0</td>
    <td>默认嵌入式容器，广泛使用，性能稳定</td>
  </tr>
  <tr>
    <td>Jetty 12.0</td>
    <td>6.0</td>
    <td>适合需要较小内存占用和快速启动的应用</td>
  </tr>
  <tr>
    <td>Undertow 2.3</td>
    <td>6.0</td>
    <td>轻量级、高性能的容器，适用于需要非阻塞 IO 的应用</td>
  </tr>
</tbody></table>

另外还可以将 Spring Boot 应用程序部署到任何兼容 Servlet 5.0+ 的容器中

##  **GraalVM 原生镜像** 

Spring Boot 应用程序可以使用 GraalVM 22.3 或更高版本转换为原生镜像。

可以通过 GraalVM 提供的 native-image 工具或 Gradle/Maven 的原生构建插件来创建镜像。此外，还可以使用 Paketo buildpack 的 native-image 功能来生成原生镜像。

支持的 GraalVM 版本包括：

<table><tbody>
  <tr>
    <td>Name</td>
    <td>Version</td>
  </tr>
  <tr>
    <td>GraalVM Community</td>
    <td>22.3</td>
  </tr>
  <tr>
    <td>Native Build Tools</td>
    <td>0.10.3</td>
  </tr>
</tbody></table>

