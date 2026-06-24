---
description: 'Spring Boot 可以与 ‘经典’ Java 开发工具一起使用，也可以安装为命令行工具。无论选择哪种方式，您都需要 Java SDK v17 或更高版本。开始之前，可以使用以下命令检查 Java 版本：如果您是 Java 开发的新手或想试用 Spring Boot，建议先尝试 Spring Boot CLI（命令行工具）。否则，请继续阅读“经典”安装说明。Spring Boot 可以像其他标准 Java 库一样使用。只需将合适的 spring-boot-*.jar 文件添加到类路径即可。Spring Boot 不需要任何特殊工具集成，因此您可以使用任何 IDE 或文本编辑'
lastUpdated: '2025-12-06 15:09:00'
head: 
  - - meta
    - name: 'og:title'
      content: '安装 SpringBoot'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Spring Boot 可以与 ‘经典’ Java 开发工具一起使用，也可以安装为命令行工具。无论选择哪种方式，您都需要 Java SDK v17 或更高版本。开始之前，可以使用以下命令检查 Java 版本：如果您是 Java 开发的新手或想试用 Spring Boot，建议先尝试 Spring Boot CLI（命令行工具）。否则，请继续阅读“经典”安装说明。Spring Boot 可以像其他标准 Java 库一样使用。只需将合适的 spring-boot-*.jar 文件添加到类路径即可。Spring Boot 不需要任何特殊工具集成，因此您可以使用任何 IDE 或文本编辑'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/spring-boot/install.html'
---
# 安装 SpringBoot





Spring Boot 可以与 ‘经典’ Java 开发工具一起使用，也可以安装为命令行工具。无论选择哪种方式，您都需要 Java SDK v17 或更高版本。开始之前，可以使用以下命令检查 Java 版本：

```shell
$ java -version
```

如果您是 Java 开发的新手或想试用 Spring Boot，建议先尝试 [Spring Boot CLI](https://docs.spring.io/spring-boot/installing.html#getting-started.installing.cli)（命令行工具）。否则，请继续阅读“经典”安装说明。

##  **Java 开发人员的安装说明** 

Spring Boot 可以像其他标准 Java 库一样使用。只需将合适的  `spring-boot-*.jar`  文件添加到类路径即可。Spring Boot 不需要任何特殊工具集成，因此您可以使用任何 IDE 或文本编辑器。Spring Boot 应用程序的运行和调试方式与普通 Java 程序相同。

尽管可以手动复制 Spring Boot JAR 文件，我们通常建议使用支持依赖管理的构建工具（如 Maven 或 Gradle）。

###  **Maven 安装** 

Spring Boot 兼容 Apache Maven 3.6.3 及更高版本。如果尚未安装 Maven，可按照 [maven.apache.org](https://maven.apache.org/) 的说明进行安装。

::: tip  <img src="https://file.wulicode.com/notion/2d/2db3d63e764b2dcb380975c0a95af0a7.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  在许多操作系统中，可以使用包管理器安装 Maven。例如：

  - macOS 使用 Homebrew： `brew install maven` 
  - Ubuntu 用户： `sudo apt-get install maven` 
  - Windows 用户（使用 [Chocolatey](https://chocolatey.org/)）：在管理员权限下运行  `choco install maven` 
:::

Spring Boot 依赖使用  `org.springframework.boot`  组 ID。典型的 Maven POM 文件从  `spring-boot-starter-parent`  项目继承，并声明一个或多个 [starter](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.starters) 依赖项。Spring Boot 还提供了一个可选的 [Maven 插件](https://docs.spring.io/spring-boot/maven-plugin/index.html)，用于创建可执行的 JAR 文件。

更多关于 Spring Boot 和 Maven 的入门信息可以在 [Maven 插件的参考指南](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/html/) 中找到。

###  **Gradle 安装** 

Spring Boot 兼容 Gradle 7.x（7.5 或更高版本）和 8.x。如果尚未安装 Gradle，可按照 [gradle.org](https://gradle.org/) 的说明进行安装。

Spring Boot 依赖项可以通过 org.springframework.boot 组声明。项目通常会声明一个或多个 starter 依赖项。Spring Boot 提供了一个实用的 Gradle 插件，用于简化依赖声明并创建可执行的 JAR 文件。

::: tip  <img src="https://file.wulicode.com/notion/2d/2db3d63e764b2dcb380975c0a95af0a7.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">   **Gradle Wrapper** 


Gradle Wrapper 提供了一种“获取” Gradle 的方式，以便在构建项目时使用。Wrapper 是一个小的脚本和库，您可以将其与代码一起提交以引导构建过程。详情请参阅 [Gradle Wrapper 用户指南](https://docs.gradle.org/current/userguide/gradle_wrapper.html)。
:::

更多关于 Spring Boot 和 Gradle 的入门信息可以在 [Gradle 插件的参考指南](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) 中找到。

##  **安装 Spring Boot CLI** 

Spring Boot CLI 是一个命令行工具，可以快速原型开发 Spring 应用程序。虽然使用 Spring Boot 不需要 CLI，但它是快速启动 Spring 应用程序的便捷方式，无需 IDE。

###  **手动安装** 

您可以从以下位置下载 Spring CLI 发行版：

- [spring-boot-cli-3.3.5-bin.zip](https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/3.3.5/spring-boot-cli-3.3.5-bin.zip)
- [spring-boot-cli-3.3.5-bin.tar.gz](https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/3.3.5/spring-boot-cli-3.3.5-bin.tar.gz)

下载后，解压文件，并按照 [INSTALL.txt](https://raw.githubusercontent.com/spring-projects/spring-boot/v3.3.5/spring-boot-project/spring-boot-tools/spring-boot-cli/src/main/content/INSTALL.txt) 中的说明操作。解压后的文件夹中  `bin/`  目录下有一个  `spring`  脚本（Windows 为  `spring.bat` ），也可以使用  `java -jar`  命令运行  `.jar`  文件（脚本可帮助您正确设置类路径）。

###  **使用 SDKMAN! 安装** 

SDKMAN! (The Software Development Kit Manager) 是一个软件开发工具包管理器，可用于管理多个二进制 SDK 版本，包括 Groovy 和 Spring Boot CLI。通过 [sdkman.io](https://sdkman.io/) 获取 SDKMAN!，并使用以下命令安装 Spring Boot：

```shell
$ sdk install springboot
$ spring --version
Spring CLI v3.3.5
```

如果开发 CLI 功能并希望使用您构建的版本，可以使用以下命令：

```shell
$ sdk install springboot dev /path/to/spring-boot/spring-boot-cli/target/spring-boot-cli-3.3.5-bin/spring-3.3.5/
$ sdk default springboot dev
$ spring --version
Spring CLI v3.3.5
```

上述指令安装了名为  `dev`  的本地  `spring`  实例，指向您的目标构建位置，因此每次重新构建 Spring Boot 时， `spring`  都会保持最新。

可以通过以下命令查看版本列表：

```shell
$ sdk ls springboot

================================================================================
Available Springboot Versions
================================================================================
> + dev
* 3.3.5

================================================================================
+ - local version
* - installed
> - currently in use
================================================================================
```

###  **macOS Homebrew 安装** 

如果您使用 macOS 和 Homebrew，可通过以下命令安装 Spring Boot CLI：

```shell
$ brew tap spring-io/tap
$ brew install spring-boot
```

Homebrew 会将  `spring`  安装到  `/usr/local/bin`

::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  
如果未找到 formula(组件)，可能需要更新 Homebrew： `brew update` 

:::

###  **MacPorts 安装** 

如果您在 Mac 上使用 [MacPorts](https://www.macports.org/)，可通过以下命令安装 Spring Boot CLI：

```shell
$ sudo port install spring-boot-cli
```

###  **命令行补全** 

Spring Boot CLI 包括为 [BASH](https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29) 和 [zsh](https://en.wikipedia.org/wiki/Z_shell) 提供命令补全的脚本。可以手动  `source`  脚本（zsh 为  `_spring` ），或将其放在您的个人或系统范围的 bash 补全初始化中。对于 Debian 系统，系统范围脚本位于  `<installation location>/shell-completion/<bash|zsh>`  中，启动新 shell 时会自动执行该目录中的所有脚本。使用 SDKMAN! 安装后，可以使用以下命令手动运行补全脚本：

```shell
$ . ~/.sdkman/candidates/springboot/current/shell-completion/bash/spring
$ spring <HIT TAB HERE>
  encodepassword  help  init  shell  version
```

::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  
通过 Homebrew 或 MacPorts 安装 Spring Boot CLI 时，命令行补全脚本会自动注册到 shell。

:::

###  **Windows Scoop 安装** 

如果您在 Windows 上使用 [Scoop](https://scoop.sh/)，可以通过以下命令安装 Spring Boot CLI：

```shell
$ scoop bucket add extras
$ scoop install springboot
```

Scoop 将 spring 安装到  `~/scoop/apps/springboot/current/bin` 。

::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  
如果未找到应用程序清单，可能需要更新 Scoop： `scoop update` 

:::



