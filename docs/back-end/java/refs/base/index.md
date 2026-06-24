---
description: 'java.base 是 Java 平台模块系统（Project Jigsaw）在 Java 9 中引入的一个核心模块。这个模块包含了 Java SE 平台的最基本API，包括 Java 语言的核心库、关键包以及平台的其他基础部分。java.base 是所有其他 Java 模块的基础，其他模块可以直接或者间接依赖于 java.base。以下是 java.base 模块包含的一些主要包和服务：服务部分由于 java.base 是 Java SE 平台的基石，它被设计为自动导入到所有 Java 程序中，无需显式声明依赖关系'
lastUpdated: '2025-12-06 15:01:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'java.base'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.base 是 Java 平台模块系统（Project Jigsaw）在 Java 9 中引入的一个核心模块。这个模块包含了 Java SE 平台的最基本API，包括 Java 语言的核心库、关键包以及平台的其他基础部分。java.base 是所有其他 Java 模块的基础，其他模块可以直接或者间接依赖于 java.base。以下是 java.base 模块包含的一些主要包和服务：服务部分由于 java.base 是 Java SE 平台的基石，它被设计为自动导入到所有 Java 程序中，无需显式声明依赖关系'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/base/index.html'
---
# java.base



`java.base`  是 Java 平台模块系统（Project Jigsaw）在 Java 9 中引入的一个核心模块。这个模块包含了 Java SE 平台的最基本API，包括 Java 语言的核心库、关键包以及平台的其他基础部分。 `java.base`  是所有其他 Java 模块的基础，其他模块可以直接或者间接依赖于  `java.base` 。<br />
以下是  `java.base`  模块包含的一些主要包和服务：

<table><tbody>
  <tr>
    <td>包名</td>
    <td>描述</td>
  </tr>
  <tr>
    <td>java.util</td>
    <td>包含集合框架、遗留的 collection 类、事件模型、日期和时间设施、国际化和各种实用工具类。</td>
  </tr>
  <tr>
    <td>java.io</td>
    <td>提供了用于输入、输出操作的流类、文件系统操作和序列化机制。</td>
  </tr>
  <tr>
    <td>java.nio</td>
    <td>提供了缓冲区类和用于非阻塞 I/O 操作的其他类，定义了高级 I/O 功能。</td>
  </tr>
  <tr>
    <td>java.math</td>
    <td>提供了用于执行任意精度整数运算（BigInteger）和十进制精度浮点运算（BigDecimal）的类。</td>
  </tr>
  <tr>
    <td>java.net</td>
    <td>提供了实现网络应用所需的类，如 URL、Socket 和 URLConnection。</td>
  </tr>
  <tr>
    <td>java.time</td>
    <td>包含日期、时间、时刻和时钟操作的全新 API，代替了旧的 java.util.Date。</td>
  </tr>
  <tr>
    <td>java.security</td>
    <td>提供了安全框架和公钥基础设施（PKI）的实现。</td>
  </tr>
  <tr>
    <td>java.text</td>
    <td>提供了处理文本、日期、数字和消息格式化的类。</td>
  </tr>
  <tr>
    <td>java.sql</td>
    <td>提供了访问和处理存储在数据源（通常是关系数据库）中的数据的 API。</td>
  </tr>
  <tr>
    <td>java.rmi</td>
    <td>提供了远程方法调用（RMI）的类和接口。</td>
  </tr>
  <tr>
    <td>java.logging</td>
    <td>提供了 Java 日志记录框架的实现。</td>
  </tr>
  <tr>
    <td>java.xml</td>
    <td>提供了用于 XML 处理的类。</td>
  </tr>
  <tr>
    <td>java.scripting</td>
    <td>提供用于在 Java 应用程序中嵌入脚本语言的框架。</td>
  </tr>
  <tr>
    <td>java.desktop</td>
    <td>提供了用于与桌面交互的类，例如 AWT 和 Swing。</td>
  </tr>
  <tr>
    <td>java.prefs</td>
    <td>提供了访问和修改用户首选项的 API。</td>
  </tr>
</tbody></table>

服务部分

<table><tbody>
  <tr>
    <td>服务名称</td>
    <td>描述</td>
  </tr>
  <tr>
    <td>java.util.spi.ResourceBundleControlProvider</td>
    <td>允许应用程序为 ResourceBundle 提供自定义 ResourceBundleControl 实例的服务提供者接口。</td>
  </tr>
  <tr>
    <td>java.util.spi.ToolProvider</td>
    <td>服务提供者接口，允许应用程序注册它们提供的工具，以便可以被工具调用框架使用。</td>
  </tr>
  <tr>
    <td>java.util.spi.LocaleNameProvider</td>
    <td>允许应用程序为特定的语言环境提供区域设置敏感的名称的服务提供者接口。</td>
  </tr>
  <tr>
    <td>java.util.spi.LocaleServiceProvider</td>
    <td>允许应用程序为特定的语言环境提供 LocaleSensitive 服务实现的服务提供者接口。</td>
  </tr>
  <tr>
    <td>java.security.Provider</td>
    <td>安全服务提供者注册其服务的抽象层。</td>
  </tr>
  <tr>
    <td>java.nio.file.spi.FileSystemProvider</td>
    <td>服务提供者接口，允许应用程序安装并使用自定义文件系统实现。</td>
  </tr>
</tbody></table>

由于  `java.base`  是 Java SE 平台的基石，它被设计为自动导入到所有 Java 程序中，无需显式声明依赖关系

## java.lang

<table><tbody>
  <tr>
    <td>java.lang</td>
    <td>提供了构成 Java 编程语言核心的类和接口，如 Object、String、Math 等。</td>
  </tr>
  <tr>
    <td>java.lang.reflect</td>
    <td>提供了用于获取关于类和对象的反射信息的类。</td>
  </tr>
  <tr>
    <td>java.lang.invoke</td>
    <td>提供了用于动态类型语言支持的底层方法句柄操作。</td>
  </tr>
  <tr>
    <td>java.lang.module</td>
    <td>提供了模块化系统的 API。</td>
  </tr>
</tbody></table>

[java.lang.Runnable - 任务/线程的可执行接口](lang-runnable.md)

[java.lang.Math - 数学运算](lang-math.md)

[java.lang.StrictMath - 遵循 IEEE 754 标准的数学计算方法](lang-strict-math.md)

[java.lang.String](lang-string.md)

