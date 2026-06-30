---
description: 'java.base 是 Java 9 引入的核心模块，包含 Java SE 平台最基础 API，如 java.util、java.io、java.nio、java.math、java.net、java.time 等包，提供集合、I/O、网络、数学、时间等核心功能。所有其他 Java 模块均直接或间接依赖于此模块。'
lastUpdated: '2026-06-30 09:50:47'
head:
  - - meta
    - name: 'og:title'
      content: 'java.base - 基础'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.base 是 Java 9 引入的核心模块，包含 Java SE 平台最基础 API，如 java.util、java.io、java.nio、java.math、java.net、java.time 等包，提供集合、I/O、网络、数学、时间等核心功能。所有其他 Java 模块均直接或间接依赖于此模块。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/base/index.html'
---
# java.base - 基础

`java.base` 是 Java 平台模块系统（Project Jigsaw）在 Java 9 中引入的一个核心模块。这个模块包含了 Java SE 平台的最基本API，包括 Java 语言的核心库、关键包以及平台的其他基础部分。 `java.base` 是所有其他 Java 模块的基础，其他模块可以直接或者间接依赖于 `java.base` 。  
  
以下是 `java.base` 模块包含的一些主要包和服务：

| 包名 | 描述 |
|-|-|
| java.util | 包含集合框架、遗留的 collection 类、事件模型、日期和时间设施、国际化和各种实用工具类。 |
| java.io | 提供了用于输入、输出操作的流类、文件系统操作和序列化机制。 |
| java.nio | 提供了缓冲区类和用于非阻塞 I/O 操作的其他类，定义了高级 I/O 功能。 |
| java.math | 提供了用于执行任意精度整数运算（BigInteger）和十进制精度浮点运算（BigDecimal）的类。 |
| java.net | 提供了实现网络应用所需的类，如 URL、Socket 和 URLConnection。 |
| java.time | 包含日期、时间、时刻和时钟操作的全新 API，代替了旧的 java.util.Date。 |
| java.security | 提供了安全框架和公钥基础设施（PKI）的实现。 |
| java.text | 提供了处理文本、日期、数字和消息格式化的类。 |
| java.sql | 提供了访问和处理存储在数据源（通常是关系数据库）中的数据的 API。 |
| java.rmi | 提供了远程方法调用（RMI）的类和接口。 |
| java.logging | 提供了 Java 日志记录框架的实现。 |
| java.xml | 提供了用于 XML 处理的类。 |
| java.scripting | 提供用于在 Java 应用程序中嵌入脚本语言的框架。 |
| java.desktop | 提供了用于与桌面交互的类，例如 AWT 和 Swing。 |
| java.prefs | 提供了访问和修改用户首选项的 API。 |

服务部分

| 服务名称 | 描述 |
|-|-|
| java.util.spi.ResourceBundleControlProvider | 允许应用程序为 ResourceBundle 提供自定义 ResourceBundleControl 实例的服务提供者接口。 |
| java.util.spi.ToolProvider | 服务提供者接口，允许应用程序注册它们提供的工具，以便可以被工具调用框架使用。 |
| java.util.spi.LocaleNameProvider | 允许应用程序为特定的语言环境提供区域设置敏感的名称的服务提供者接口。 |
| java.util.spi.LocaleServiceProvider | 允许应用程序为特定的语言环境提供 LocaleSensitive 服务实现的服务提供者接口。 |
| java.security.Provider | 安全服务提供者注册其服务的抽象层。 |
| java.nio.file.spi.FileSystemProvider | 服务提供者接口，允许应用程序安装并使用自定义文件系统实现。 |

由于 `java.base` 是 Java SE 平台的基石，它被设计为自动导入到所有 Java 程序中，无需显式声明依赖关系

## java.lang

| java.lang | 提供了构成 Java 编程语言核心的类和接口，如 Object、String、Math 等。 |
|-|-|
| java.lang.reflect | 提供了用于获取关于类和对象的反射信息的类。 |
| java.lang.invoke | 提供了用于动态类型语言支持的底层方法句柄操作。 |
| java.lang.module | 提供了模块化系统的 API。 |

[java.lang.Runnable - 任务-线程的可执行接口](/back-end/java/refs/base/lang-runnable.md)

[java.lang.Math - 数学运算](/back-end/java/refs/base/lang-math.md)

[java.lang.StrictMath - 遵循 IEEE 754 标准的数学计算方法](/back-end/java/refs/base/lang-strict-math.md)

[java.lang.String](/back-end/java/refs/base/lang-string.md)