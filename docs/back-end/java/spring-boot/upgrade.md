---
description: '关于如何从早期版本升级 Spring Boot 的说明，可以在项目 Wiki 上找到。请通过发布说明中的链接，找到您希望升级到的版本。升级说明通常是发布说明中的第一个项目。如果您的版本落后于多个版本，请确保也查看您跳过的版本的发布说明。如果您是从 Spring Boot 1.x 版本升级，请查看项目 Wiki 上的迁移指南，其中提供了详细的升级说明。同时，请查看发布说明，了解每个版本中的“新功能和亮点”。在升级到新功能版本时，某些属性可能已被重命名或移除。Spring Boot 提供了一种方法，可以分析应用程序的环境并在启动时打印诊断信息，还可以在运行时暂时迁移属性。要启用此功'
lastUpdated: '2025-12-06 15:09:00'
head: 
  - - meta
    - name: 'og:title'
      content: '升级 SpringBoot'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '关于如何从早期版本升级 Spring Boot 的说明，可以在项目 Wiki 上找到。请通过发布说明中的链接，找到您希望升级到的版本。升级说明通常是发布说明中的第一个项目。如果您的版本落后于多个版本，请确保也查看您跳过的版本的发布说明。如果您是从 Spring Boot 1.x 版本升级，请查看项目 Wiki 上的迁移指南，其中提供了详细的升级说明。同时，请查看发布说明，了解每个版本中的“新功能和亮点”。在升级到新功能版本时，某些属性可能已被重命名或移除。Spring Boot 提供了一种方法，可以分析应用程序的环境并在启动时打印诊断信息，还可以在运行时暂时迁移属性。要启用此功'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/spring-boot/upgrade.html'
---
# 升级 SpringBoot



关于如何从早期版本升级 Spring Boot 的说明，可以在项目 [Wiki](https://github.com/spring-projects/spring-boot/wiki) 上找到。请通过[发布说明](https://github.com/spring-projects/spring-boot/wiki#release-notes)中的链接，找到您希望升级到的版本。

升级说明通常是发布说明中的第一个项目。如果您的版本落后于多个版本，请确保也查看您跳过的版本的发布说明。

##  **从 1.x 版本升级** 

如果您是从 Spring Boot 1.x 版本升级，请查看项目 Wiki 上的[迁移指南](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Migration-Guide)，其中提供了详细的升级说明。同时，请查看[发布说明](https://github.com/spring-projects/spring-boot/wiki)，了解每个版本中的“新功能和亮点”。

##  **升级到新功能版本** 

在升级到新功能版本时，某些属性可能已被重命名或移除。Spring Boot 提供了一种方法，可以分析应用程序的环境并在启动时打印诊断信息，还可以在运行时暂时迁移属性。要启用此功能，请将以下依赖项添加到您的项目中：

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-properties-migrator</artifactId>
	<scope>runtime</scope>
</dependency>
```

::: warning  <img src="https://file.wulicode.com/notion/94/940b6740677601898d5f8e890f046fc8.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  
请注意，像 @PropertySource 这样在环境中较晚添加的属性将不会被考虑在内

:::

::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  
完成迁移后，请确保从项目的依赖项中移除该模块

:::

##  **升级 Spring Boot CLI** 

要升级现有的 CLI 安装，请使用相应的包管理器命令（例如， `brew upgrade` ）。如果您是手动安装 CLI，请按照[标准说明](https://docs.spring.io/spring-boot/installing.html#getting-started.installing.cli.manual-installation)进行操作，并记得更新您的  `PATH`  环境变量，删除任何旧的引用



