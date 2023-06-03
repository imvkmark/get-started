# sdkman - 管理多个 sdk 的工具

![](https://file.wulicode.com/doc/20230519/1684481219301.png)

网址 : https://sdkman.io/

快速安装

```shell
$ curl -s "https://get.sdkman.io" | bash
```

## 介绍

是在大多数基于 Unix 的系统上管理多个SDK版本的工具。它提供了一个方便的命令行界面（CLI）和API来安装，切换，删除和列出sdk相关信息。以下是一些特性:

- By Developers, for Developers
  安装SDK不再需要去各种下载页面去下载,解压,以及设置xxx_HOME或者PATH环境变量.
- 多平台
  可以在任何基于UNIX的平台上运行：Mac OSX，Linux，Cygwin，Solaris和FreeBSD。 Powershell CLI版本适用于Windows用户。
- 全套JAVA支持
  为Java，Groovy，Scala，Kotlin 和 Ceylon 等 JVM安装软件开发工具包。 Ant，Gradle，Grails，Maven，SBT，Spark，Spring Boot，Vert.x以及其他许多支持。
- APIs
  使用开放的Broker REST API可以轻松地编写新的客户端。服务提供商可以通过安全的 API发布自己的版本
- 轻量
  只需要有 `curl`, `zip`, `unzip`, 就可以在 bash中通过命令使用.还可和ZSH一起使用.

## 安装

执行如下命令

```shell
$ curl -s "https://get.sdkman.io" | bash
```

执行完毕后打开新窗口 或者 运行 `source "/Users/duoli/.sdkman/bin/sdkman-init.sh"`

```
$ sdk version

SDKMAN!
script: 5.18.1
native: 0.2.9
```

默认情况下，sdkman 安装在 HOME 下的 `.sdkman` 子目录中：

```shell
$ ls ~/.sdkman 
archives   bin        candidates contrib    etc        ext        src        tmp        var
```

### Beta 频道

如果未安装可以使用

```shell
$ curl -s "https://beta.sdkman.io" | bash
```

安装

已经安装了, 编辑 `~/.sdkman/etc/config` 如下设置

```
sdkman_beta_channel=true
```

打开新窗口运行

```
$ sdk selfupdate force
```

即可, 如果想回稳定版, 关闭 `sdkman_beta_channel` 在运行相同的步骤

### 卸载

移除 sdkman 目录

```
rm -rf ~/.sdkman
```

最后一个步骤是编辑  `.bashrc`, `.bash_profile` 或者 `.profile`. 如果是 zsh 则是 `.zshrc` 文件

移除以下内容(这个是安装之后自动添加的激活 sdkman 的脚本)

```
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
```

### 安装到自定义目录

设置自定义环境变量 `SDKMAN_DIR`

```shell
$ export SDKMAN_DIR="/usr/local/sdkman" && curl -s "https://get.sdkman.io" | bash
```

### 安装但是不修改 shell 配置

```shell
$ curl -s "https://get.sdkman.io?rcupdate=false" | bash
```

## 使用

### 安装 SDK

**稳定版**

以 Java 为例

```shell
$ sdk install java
```

会看到如下输出

```
Downloading: java 17.0.7-tem

In progress...

######################################################################## 100.0%

Repackaging Java 17.0.7-tem...

Done repackaging...
Cleaning up residual files...

Installing: java 17.0.7-tem
Done installing!


Setting java 17.0.7-tem as default.
```

**安装指定版本**

```shell
$ sdk install scala 3.2.2
```

**安装本地版本**

安装预览版或者本地已经有的版本

```shell
$ sdk install groovy 3.0.0-SNAPSHOT /path/to/groovy-3.0.0-SNAPSHOT
$ sdk install java 17-zulu /Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

### 删除版本

```shell
$ sdk uninstall scala 3.2.2
```

### 列出候选包

```shell
$ sdk list
```

```
================================================================================
Available Candidates
================================================================================
q-quit                                  /-search down
j-down                                  ?-search up
k-up                                    h-help
--------------------------------------------------------------------------------
...
--------------------------------------------------------------------------------
Java (17.0.7-tem)        https://projects.eclipse.org/projects/adoptium.temurin/

Java Platform, Standard Edition (or Java SE) is a widely used platform for
development and deployment of portable code for desktop and server environments.
Java SE uses the object-oriented Java programming language. It is part of the
Java software-platform family. Java SE defines a wide range of general-purpose
APIs – such as Java APIs for the Java Class Library – and also includes the Java
Language Specification and the Java Virtual Machine Specification.

$ sdk install java
--------------------------------------------------------------------------------
...
```

### 列出软件版本

```shell
$ sdk list java
```

```
 Temurin       |     | 20           | tem     |            | 20-tem
               |     | 20.0.1       | tem     |            | 20.0.1-tem
               |     | 19.0.2       | tem     |            | 19.0.2-tem
               |     | 19.0.1       | tem     |            | 19.0.1-tem
               | >>> | 17.0.7       | tem     | installed  | 17.0.7-tem
               |     | 17.0.6       | tem     |            | 17.0.6-tem
               |     | 8.0.345      | tem     |            | 8.0.345-tem
================================================================================
Omit Identifier to install default version 17.0.7-tem:
    $ sdk install java
Use TAB completion to discover available versions
    $ sdk install java [TAB]
Or install a specific version by Identifier:
    $ sdk install java 17.0.7-tem
Hit Q to exit this list view
================================================================================
```

### 使用版本

```shell
$ sdk use scala 3.2.2
```

### 默认版本

```shell
$ sdk default scala 3.2.2
```

### 当前版本

```
$ sdk current java

Using java version 17.0.7-tem
```

```
sdk current

Using:

java: 17.0.7-tem
```

### Env 命令

想要在每次访问项目时切换到特定的 JDK 或 SDK 吗？这可以通过项目基本目录中的 `.sdkmanrc` 文件来实现。该文件可以通过发出以下命令自动生成：

```
$ sdk env init
```

会生成如下的配置文件

```
# Enable auto-env through the sdkman_auto_env config
# Add key=value pairs of SDKs to use below
java=17.0.7-tem
```

该文件预先填充了当前使用的JDK版本，但可以根据需要包含任意数量的受支持SDK的键值对。要切换到`.sdkmanrc`文件中的配置，只需发出以下命令：

```shell
$ sdk env
```

会看到

```
Using java version 17.0.7-tem in this shell.
```

你的路径现在也已更新，可以在您当前的 shell 中使用这些SDK中的任何一个。离开项目时，您可能希望将SDK重置为其默认版本。这可以通过输入以下命令来实现：

```shell
$ sdk env clear
```

检出新项目后，你可能会丢失项目的 `.sdkmanrc` 文件中指定的某些SDK。要安装这些缺少的SDK，只需键入：

```
$ sdk env install

Downloading: java 17.0.7-tem

In progress...

######################################################################## 100,0%

Repackaging Java 17.0.7-tem...

Done repackaging...

Installing: java 17.0.7-tem
Done installing!
```

当你 `cd` 进入目录时，是否要自动切换SDK版本？这可以通过在 SDKMAN 配置中设置 `sdkman_auto_env=true` 来实现。请注意，这还会在离开目录时将所有特定于项目的SDK重置为其默认版本

### 升级版本

```
$ sdk upgrade springboot
Upgrade:
springboot (1.2.4.RELEASE, 1.2.3.RELEASE < 3.1.0)
```

```
$ sdk upgrade
```

### SDKMAN! 版本

```shell
$ sdk version
```

### 离线模式

```
$ sdk offline enable
Forced offline mode enabled.

$ sdk offline disable
Online mode re-enabled!
```

在离线模式下运行时，大多数命令仍将工作，即使它们将在缩减的容量中运行。`list` 命令就是一个例子，它将只显示当前安装和活动的版本(S)：

```
$ sdk list groovy
------------------------------------------------------------
Offline Mode: only showing installed groovy versions
------------------------------------------------------------
> 2.4.4
* 2.4.3
------------------------------------------------------------
* - installed
> - currently in use
------------------------------------------------------------
```

### 更新 SDKMAN!

更新

```shell
$ sdk selfupdate
```

重新安装

```shell
$ sdk selfupdate force
```

### 更新

```
$ sdk update

Adding new candidates(s): kotlin
```

### 刷新

应该很少有必要刷新SDKMAN！的本地状态。`flush` 命令有助于实现这一点，因此您不需要删除任何目录。 手动删除像`.sdkman/tmp`目录这样的目录将损坏 SDKMAN！总是使用flush命令来代替！

```
$ sdk flush
```

### 主目录

在脚本中使用 SDKMAN 时，获取SDK所在位置的绝对路径通常很有用(类似于JAVA_HOME命令在MacOS上的工作方式)。为此，我们有 `home` 命令

```
$ sdk home java 17.0.7-tem
/home/myuser/.sdkman/candidates/java/17.0.7-tem
```

### 帮助

```
$ sdk help

$ sdk help list
```

### 配置

配置可以在 `~/.sdkman/etc/config` 文件中找到。要编辑配置，可以发出 `sdk config` 命令在系统编辑器中编辑该文件。以下配置可用：

```
# make sdkman non-interactive, preferred for CI environments
sdkman_auto_answer=true|false

# check for newer versions and prompt for update
sdkman_selfupdate_feature=true|false

# disables SSL certificate verification
# https://github.com/sdkman/sdkman-cli/issues/327
# HERE BE DRAGONS....
sdkman_insecure_ssl=true|false

# configure curl timeouts
sdkman_curl_connect_timeout=5
sdkman_curl_continue=true
sdkman_curl_max_time=10

# subscribe to the beta channel
sdkman_beta_channel=true|false

# enable verbose debugging
sdkman_debug_mode=true|false

# enable colour mode
sdkman_colour_enable=true|false

# enable automatic env
sdkman_auto_env=true|false

# enable rosetta2 compatibility for apple silicon
sdkman_rosetta2_compatible=true|false

# enable bash or zsh auto-completion
sdkman_auto_complete=true|false
```

## 可用的 JDK

### [Corretto](https://aws.amazon.com/corretto/) (Amazon)

Amazon Corretto 是Open Java开发工具包(OpenJDK)的免费、多平台、随时可生产的发行版。Corretto提供长期支持，包括性能增强和安全修复。Amazon在数千个生产服务上运行Corretto，并且Corretto被认证为与Java
SE标准兼容。使用Corretto，您可以在流行的操作系统上开发和运行Java应用程序，包括Linux、Windows和MacOS。

`$ sdk install java x.y.z-amzn`

### [Dragonwell](http://dragonwell-jdk.io/) (Alibaba)

Dragon Well作为OpenJDK的下游版本，是阿里巴巴内部的OpenJDK实现。它针对运行在100,000多台服务器上的在线电子商务、金融和物流应用程序进行了优化。阿里巴巴Dragonwell是以极高的伸缩性运行这些分布式Java应用程序的引擎。

`$ sdk install java x.y.z-albba`

### [GraalVM](https://www.graalvm.org/) (Oracle)

GraalVM 是一个通用的虚拟机，用于运行用基于Java、Scala、Groovy、Kotlin、Clojure等基于JVM的语言以及基于LLVM的语言(如C和C++)编写的应用程序。
GraalVM 消除了编程语言之间的隔离，并实现了共享运行时中的互操作性。它可以独立运行，也可以在 OpenJDK、Node.js 或 Oracle 数据库的环境中运行。

`$ sdk install java x.y.z-grl`

### [Java SE Development Kit](https://www.oracle.com/java/) (Oracle)

此专有Java开发工具包是Oracle Corporation以二进制产品形式发布的Java Platform标准版的实现，面向Linux、MacOS或Windows上的Java开发人员。
JDK包括一个私有JVM和一些其他资源，用于完成Java应用程序的开发。它是在Oracle免费条款和条件许可下分发的

`$ sdk install java x.y.z-oracle`

### [Liberica](https://bell-sw.com/) (Bellsoft)

Liberica是一个100%开源的Java实现。它是由 BellSoft 贡献的OpenJDK构建的，经过了彻底的测试，并通过了OpenJDK许可下提供的JCK。所有受支持的Liberica版本也都包含JavaFX。

`$ sdk install java x.y.z-librca`

### [Liberica NIK](https://bell-sw.com/pages/liberica-native-image-kit) (Bellsoft)

Liberica Native Image Kit是一个实用程序，它可以在封闭的假设下将基于JVM的应用程序提前转换为完全编译的本机可执行文件，几乎可以瞬间启动。
它兼容各种平台，包括基于轻量级 MUSL 的阿尔卑斯Linux，优化了资源消耗，最大限度地减少了静态占用。

`$ sdk install java x.y.z-nik`

### [Mandrel](https://github.com/graalvm/mandrel) (Red Hat)

Mandrel专注于 GraalVM 的本机映像组件，以便为Quarkus用户为其应用程序生成本机映像提供一种简单的方法。
使用Quarkus的开发人员应该能够从Java源代码一直到Linux上运行的精简、本机、平台相关的应用程序。此功能对于在云本地应用程序开发模型中部署到容器至关重要。

`$ sdk install java x.y.z-mandrel`


### [OpenJDK](https://jdk.java.net/) (jdk.java.net)

OpenJDK(Open Java Development Kit)是Java平台标准版(Java SE)的免费开源实现。
这是 Sun 公司2006年开始努力的结果。
该实现在GNU通用公共许可证(GNU GPL)版本2下获得许可，但有一个链接例外。如果没有GPL链接例外，链接到Java类库的组件将受到GPL许可证条款的约束。
OpenJDK是从版本7开始的Java SE的官方参考实现。

`$ sdk install java x.y.z-open`

### [OpenJDK](https://www.microsoft.com/openjdk) (Microsoft)

Microsoft版本的OpenJDK是OpenJDK的免费发行版，它是开源的，任何人都可以免费部署到任何地方。

它包括对x64服务器上的Java 11以及MacOS、Linux和Windows上的桌面环境上的Java 11以及Linux和Windows上的AArch64/ARM64的长期支持(LTS)二进制文件。

微软还发布了适用于所有三大操作系统以及x64和AArch64(M1/ARM64)架构的Java 16二进制文件。

`$ sdk install java x.y.z-ms`

### [SapMachine](https://sap.github.io/SapMachine/) (SAP)

SapMachine是OpenJDK项目的下游版本。

它用于为希望使用OpenJDK运行其应用程序的SAP客户和合作伙伴构建和维护受SAP支持的OpenJDK版本。SAP致力于确保Java平台的持续成功。

`$ sdk install java x.y.z-sapmchn`

### [Semeru](https://developer.ibm.com/languages/java/semeru-runtimes/) (IBM)

Smeru Runtime 使用 OpenJDK 的类库，以及Eclipse OpenJ9 Java虚拟机，使开发人员能够构建和部署Java应用程序，这些应用程序将快速启动，提供出色的性能，同时使用更少的内存。

`$ sdk install java x.y.z-sem`

### [Temurin](https://projects.eclipse.org/projects/adoptium.temurin) (Eclipse)

以前称为 AdoptOpenJDK 的 Eclipse Adoptium Temurin™ 项目提供了支持构建运行时二进制文件和相关技术的代码和过程，这些运行时二进制文件和相关技术是高性能的、企业级的、跨平台的、开放源码许可的，并且经过Java
SE TCK测试，可在整个Java生态系统中通用。

`$ sdk install java x.y.z-tem`

### [Trava](https://github.com/TravaOpenJDK/trava-jdk-11-dcevm) (Trava)

TravaOpenJDK 是面向开发人员的OpenJDK。它基于dcevm并使用集成的HotswapAgent，因此允许在运行时通过方法和字段添加或更新高级热交换类。

`$ sdk install java x.y.z-trava`

### [Zulu](https://www.azul.com/downloads/zulu/) (Azul Systems)

Azul Zulu 是Java标准版(“SE”)规范的开源实现。它是 OpenJDK 开放源码项目的二进制版本。Zulu 提供了 Java 应用程序运行所需的 Java 运行时环境。

`$ sdk install java x.y.z-zulu`

## 可用的 SDK

### Apache ActiveMQ (Classic) (5.17.1)

[https://activemq.apache.org/](https://activemq.apache.org/)

ApacheActiveMQ® 是一种流行的开源、多协议、基于Java的消息代理。它支持行业标准协议，因此用户可以从各种语言和平台的客户选择中获益。从用JavaScript、C、C++、Python、.Net等编写的客户端进行连接。使用无处不在的AMQP协议集成您的多平台应用程序。使用基于WebSockets的
STOMP 在您的Web应用程序之间交换消息。使用MQTT管理您的物联网设备。支持您现有的JMS基础设施和其他基础设施。ActiveMQ提供了支持任何消息传递用例的能力和灵活性。

`$ sdk install activemq`

* * *

### Ant (1.10.13)

[https://ant.apache.org/](https://ant.apache.org/)

ApacheAnt 是一个 Java
库和命令行工具，其任务是将构建文件中描述的流程驱动为相互依赖的目标和扩展点。Ant的主要已知用法是构建Java应用程序。Ant提供了许多内置任务，允许编译、组装、测试和运行Java应用程序。Ant还可以有效地用于构建非Java应用程序，例如C或C++应用程序。更广泛地说，Ant可以用来引导任何类型的流程，这些流程可以用目标和任务来描述。

`$ sdk install ant`

* * *

### AsciidoctorJ (2.5.8)

[http://asciidoctor.org/](http://asciidoctor.org/)

AsciidoctorJ是用于在JVM上运行Asciidoctor的官方库。使用AsciidoctorJ，您可以转换AsciiDoc内容或分析从Java和其他JVM语言解析的AsciiDoc文档。

`$ sdk install asciidoctorj`

* * *

### Ballerina (swan-lake-p3)

[https://ballerina.io/](https://ballerina.io/)

开源编程语言和平台，让云时代的应用程序程序员可以轻松编写能够正常工作的软件。

`$ sdk install ballerina`

* * *

### Bld (1.7.0)

[https://rife2.com/bld](https://rife2.com/bld)

BLD是一个构建系统，它允许您用纯Java编写构建逻辑。之所以创建BLD，是因为我们对构建工具并不真正感兴趣。我们用它们因为我们必须这样做，但我们更愿意继续编写真正的代码。

`$ sdk install bld`

* * *

### Bpipe (0.9.11)

[http://bpipe.org](http://bpipe.org/)

BPIPE是用于运行计算管道和工作流的框架

`$ sdk install bpipe`

* * *

### BTrace (2.2.0)

[https://github.com/btraceio/btrace](https://github.com/btraceio/btrace)

BTrace是用于Java平台的安全、动态的跟踪工具。BTrace可用于动态跟踪正在运行的Java程序(类似于OpenSolaris的DTrace 应用程序和操作系统)。BTrace动态检测目标应用程序的类以注入字节码跟踪代码。

`$ sdk install btrace`

* * *

### Concurnas (1.14.020)

[https://concurnas.com/](https://concurnas.com/)

ConcurNas是一种开源的JVM编程语言，旨在构建可靠、可扩展、高性能的并发、分布式和并行系统。

`$ sdk install concurnas`

* * *

### ConnOR (1.4.1)

[https://github.com/helpermethod/connor](https://github.com/helpermethod/connor)

Connor 是 ConnectOffsetReset 的缩写，是用于重置 Kafka Connect 源连接器偏移量的命令行工具。

`$ sdk install connor`

* * *

### Coursier (Coming soon!)

[https://get-coursier.io](https://get-coursier.io/)

Coursier 是 Scala 应用程序和构件管理器。它可以安装Scala应用程序并设置您的Scala开发环境。它还可以下载和缓存来自Web的人工制品。

`$ sdk install coursier`

* * *

### CUBA CLI (2.2.0)

[https://cuba-platform.com](https://cuba-platform.com/)

CUBA CLI 是一个开源命令行实用程序，使您能够轻松创建基于 CUBA 平台的项目

`$ sdk install cuba`

* * *

### CXF (3.2.5)

[https://cxf.apache.org/](https://cxf.apache.org/)

ApacheCXF是一个开源服务框架。CXF帮助您使用前端编程API(如JAX-WS和JAX-RS)构建和开发服务。这些服务可以使用各种协议，如SOAP、XML/HTTP、REST 风格的
HTTP或CORBA，并使用各种传输方式，如HTTP、JMS或JBI。

`$ sdk install cxf`

* * *

### docToolchain (2.2.1)

[https://doctoolchain.github.io/docToolchain/](https://doctoolchain.github.io/docToolchain/)

DocToolchain 是软件体系结构的文档即代码方法的实现，外加一些额外的自动化。DocToolchain的基础是软件文档应与代码以及软件体系结构的arc42模板以相同的方式处理的哲学。

`$ sdk install doctoolchain`

* * *

### Flink (1.17.0)

[https://flink.apache.org/](https://flink.apache.org/)

ApacheFlink是一个开源的、统一的流处理和批处理框架。它是一个分布式处理引擎，用于在无界和有界数据流。

它设计为在所有常见的集群环境中运行，以内存中的速度和任何规模执行计算。

`$ sdk install flink`

* * *

### Gaiden (1.3)

[http://kobo.github.io/gaiden/](http://kobo.github.io/gaiden/)

Gaiden 是一个使用Markdown轻松创建文档的工具。

`$ sdk install gaiden`

* * *

### Gradle (8.1.1)

[http://gradle.org/](http://gradle.org/)

Gradle是一个构建自动化工具，它构建在ApacheAnt和ApacheMaven概念之上，并引入了一种基于Groovy的领域特定语言(DSL)
而不是声明项目配置的更传统的XML形式。

Gradle使用有向无环图(DAG)来确定可以运行任务。

`$ sdk install gradle`

* * *

### Gradle profiler (0.19.0)

[https://github.com/gradle/gradle-profiler](https://github.com/gradle/gradle-profiler)

为Gradle版本收集性能分析和基准测试信息的工具

`$ sdk install gradleprofiler`

* * *

### Grails (5.3.2)

[https://grails.org/](https://grails.org/)

Grails是一个强大的Web框架，对于Java平台来说，由于约定重于配置，旨在提高开发人员的工作效率
默认和固执己见的API。它与JVM顺利集成，允许您立即提高工作效率，同时提供强大的功能，包括集成的ORM、特定于域的语言、运行时和编译时元编程以及异步编程。

`$ sdk install grails`

* * *

### Groovy (4.0.12)

[http://www.groovy-lang.org/](http://www.groovy-lang.org/)

Groovy是一种强大的、可选类型的动态语言，具有静态类型和静态编译功能，用于Java平台，旨在实现开发人员的工作效率归功于简洁、熟悉和易于学习的语法。它与任何Java程序顺利集成，并立即交付给您的应用程序强大的功能，包括脚本编写功能、领域特定语言创作、运行时和编译时元编程以及功能编程。

`$ sdk install groovy`

* * *

### GroovyServ (1.2.0)

[https://kobo.github.io/groovyserv/](https://kobo.github.io/groovyserv/)

GroovyServ显著减少了运行Groovy的JVM的启动时间。这取决于您的环境，但在大多数情况下，速度要快10到20倍 而不是普通的Groovy。

`$ sdk install groovyserv`

* * *

### hadoop (3.3.5)

[https://hadoop.apache.org/](https://hadoop.apache.org/)

ApacheHadoop™®项目为可靠、可扩展的分布式计算开发了开源软件，它是一个支持分布式处理的框架使用简单的编程模型跨计算机集群的大型数据集。它旨在从单台服务器扩展到数千台机器，每台机器提供本地计算和存储。

`$ sdk install hadoop`

* * *

### Helidon CLI (Coming soon!)

[https://helidon.io](https://helidon.io/)

Helidon CLI 允许您通过从一组原型中选择来轻松创建一个 Helidon 项目。它还支持执行连续操作的开发人员循环编译和应用程序重新启动，因此您可以轻松地迭代源代码更改。

`$ sdk install helidon`

* * *

### http4k (4.0.0.0)

[http://http4k.org/](http://http4k.org/)

Http4k 是用 Kotlin 构建HTTP应用程序的功能工具包

`$ sdk install http4k`

* * *

### Infrastructor (0.3.1)

[http://infrastructor.io/](http://infrastructor.io/)

Infrastructor 是一个用Groovy编写的开源服务器配置工具

`$ sdk install infrastructor`

* * *

### Jarviz (0.3.0)

[https://github.com/kordamp/jarviz](https://github.com/kordamp/jarviz)
Jarviz是一个JAR分析器工具。您可以从JAR获取元数据，如清单、清单条目、字节码版本、声明性服务等。

`$ sdk install jarviz`

* * *

### JBake (2.6.7)

[http://jbake.org/](http://jbake.org/)

JBake 是一个面向开发人员和设计人员的基于Java的、开源的静态站点/博客生成器。

`$ sdk install jbake`

* * *

### JBang (0.107.0)

[http://github.com/maxandersen/jbang/](http://github.com/maxandersen/jbang/)

JBang 使得使用 Java 编写脚本变得很容易。它允许您使用单个文件进行代码和依赖项管理，并允许您直接运行它。

`$ sdk install jbang`

* * *

### JDK Mission Control (8.1.1.51-zulu)

[https://www.oracle.com/java/technologies/jdk-mission-control.html](https://www.oracle.com/java/technologies/jdk-mission-control.html)


Java Flight Recorder 和 JDK Mission Control 共同创建了一个完整的工具链，以持续收集低级和详细的运行时信息，使 事后事件分析。JDK任务控制是一套高级工具，可以对大量数据进行高效和详细的分析由
Java Flight Recorder 收集。该工具链使开发人员和管理员能够从本地运行的Java应用程序收集和分析数据，或者部署在生产环境中。

`$ sdk install jmc`

* * *

### Apache JMeter (5.5)

[https://jmeter.apache.org/](https://jmeter.apache.org/)

ApacheJMeter™应用程序是开源软件，是一个100%纯Java应用程序，旨在加载测试功能行为和测量性能。确实是最初是为测试Web应用程序而设计的，但后来扩展到了其他测试功能。

`$ sdk install jmeter`

* * *

### Joern (1.1.997)

[https://joern.io/](https://joern.io/)

Joern是一个用于分析源代码、字节码和二进制可执行文件的平台。它生成代码属性图(CPG)
，这是代码的图形表示跨语言代码分析。代码属性图存储在自定义图形数据库中。这允许使用在基于Scala的领域特定查询语言。开发Joern的目标是为静态漏洞发现和研究提供有用的工具程序分析。

`$ sdk install joern`

* * *

### JReleaser (1.6.0)

[https://jreleaser.org](https://jreleaser.org/)

JReleaser是一款面向Java项目的发布自动化工具。它的目标是简化创建版本并将构件发布到多个包管理器，同时提供可定制的选项。

`$ sdk install jreleaser`

* * *

### Karaf (4.2.8)

[https://karaf.apache.org/](https://karaf.apache.org/)

ApacheKaraf是一个多态、轻量级、功能强大的企业级应用程序运行时。它为您提供所有生态系统和引导选项对您的应用程序的需求。它在本地或云上运行。多态是指Karaf可以托管任何类型的应用程序：WAR、OSGi、Spring等等更多。

`$ sdk install karaf`

* * *

### kcctl (1.0.0.Beta3)

[https://github.com/kcctl/kcctl](https://github.com/kcctl/kcctl)

一个现代、直观的Kafka Connect命令行客户端。依靠kubectl的习惯用法和语义，它允许您注册和检查连接器，删除它们、重新启动它们等。

`$ sdk install kcctl`

* * *

### ki (0.5.2)

[https://github.com/Kotlin/kotlin-interactive-shell](https://github.com/Kotlin/kotlin-interactive-shell)

Kotlin REPL的可扩展实现，具有丰富的功能集，包括自动完成、语法突出显示、类型推理和maven依赖。

`$ sdk install ki`

* * *

### Kobweb (0.9.12)

[https://kobweb.varabyte.com](https://kobweb.varabyte.com/)

Kobweb是一个建立在Compose for Web之上的固有的Kotlin Web框架。CLI提供了帮助设置和管理项目的命令。

`$ sdk install kobweb`

* * *

### Kotlin (1.8.20)

[https://kotlinlang.org/](https://kotlinlang.org/)

Kotlin是一种运行在Java虚拟机上的静态类型编程语言，也可以编译为 JavaScript 源代码。

`$ sdk install kotlin`

* * *

### kscript (4.2.2)

[https://github.com/holgerbrandl/kscript](https://github.com/holgerbrandl/kscript)

在基于 *NIX 的系统上增强了对Kotlin的脚本支持。KSCRIPT提供了一种易于使用、非常灵活且几乎零开销的编写解决方案使用Kotlin的自含式微型应用程序。

`$ sdk install kscript`

* * *

### ktlint (Coming soon!)

[https://github.com/pinterest/ktlint](https://github.com/pinterest/ktlint)

Ktlint 是一个 anti-bikeshedding 的 Kotlin Lintert，内置了格式化程序。

`$ sdk install ktlint`

* * *

### ktx (0.1.2)

[https://github.com/mpetuska/ktx](https://github.com/mpetuska/ktx)

用于Kotlin和JVM的npx！安装和执行JAR或Kotlin脚本，就像安装和执行任何其他命令行实用程序一样。

`$ sdk install ktx`

* * *

### Layrry (1.0.0.Final)

[https://github.com/moditect/layrry/](https://github.com/moditect/layrry/)

Layrry-模块化Java应用程序的启动器和API。它允许基于Maven构件坐标(模块化)要包括的 jar 包。Layrry 利用 Java 模块系统的模块层概念，允许在应用程序同时运行，以及在应用程序运行时动态添加和删除模块。

`$ sdk install layrry`

* * *

### Leiningen (2.10.0-1)

[http://leiningen.org/](http://leiningen.org/)

Leiningen 是使用 Clojure的最简单方式。它侧重于项目自动化和声明性配置，不会妨碍您的工作，让您可以专注于你的密码。

`$ sdk install leiningen`

* * *

### Maven (3.9.2)

[https://maven.apache.org/](https://maven.apache.org/)

ApacheMaven是一个软件项目管理和理解工具。基于项目对象模型(POM)的概念，Maven可以管理项目的构建，来自中心信息的报告和文档。

`$ sdk install maven`

* * *

### MCS (0.3.4)

[https://github.com/mthmulders/mcs](https://github.com/mthmulders/mcs)

从命令行搜索Maven中央存储库！使用MCS，您可以找到构件并生成所需的pom.xml片段，以便直接用在Maven项目

`$ sdk install mcs`

* * *

### Micronaut (3.9.1)

[http://micronaut.io/](http://micronaut.io/)

Microronaut是一个用于JVM的开源微服务框架

`$ sdk install micronaut`

* * *

### Mule Flow Diagrams (0.11.0)

[https://github.com/manikmagar/mule-flow-diagrams/](https://github.com/manikmagar/mule-flow-diagrams/)

Mule流程图是一个开源工具，它允许您为Mule配置生成流依赖图和图。

`$ sdk install mulefd`

* * *

### Maven Daemon (1.0-m6-m39)

[https://github.com/apache/maven-mvnd](https://github.com/apache/maven-mvnd)

Mvnd项目旨在为基于maven的构建提供守护程序基础设施。它借鉴了Gradle和Takari的技术，提供了一种简单高效的系统。

`$ sdk install mvnd`

* * *

### MyBatis Migrations (3.3.11)

[https://mybatis.org/migrations/](https://mybatis.org/migrations/)

MyBatis架构迁移系统(简称MyBatis Migrations)寻求为任何数据库(新的或现有的)提供数据库迁移，并使数据库的当前状态易于访问和理解。安装此候选程序提供了用于管理数据库迁移的迁移命令

`$ sdk install mybatis`

* * *

### Neo4j-Migrations (2.3.1)

[https://neo4j.com/labs/neo4j-migrations/](https://neo4j.com/labs/neo4j-migrations/)

Neo4j-Migrations是一个数据库迁移和重构工具，它允许在受控和可重复的环境中运行Cypher脚本和编程重构针对一个或多个Neo4j数据库的特性。

`$ sdk install neo4jmigrations`

* * *

### Pierrot (0.10.7)

[https://agorapulse.github.io/pierrot/](https://agorapulse.github.io/pierrot/)

Pierrot可以帮助您使用单个命令管理多个GitHub存储库。

`$ sdk install pierrot`

* * *

### Pomchecker (1.9.0)

[https://github.com/kordamp/pomchecker/](https://github.com/kordamp/pomchecker/)

Pomchecker-检查POM文件是否符合发布到 Maven Central 所需的最低规则。它还可以检查POM表是否为有效的BOM表文件。

`$ sdk install pomchecker`

* * *

### Quarkus CLI (3.0.3.Final)

[http://quarkus.io](http://quarkus.io/)

Quarkus是一个Kubernetes Native Java框架，专为OpenJDK HotSpot和GraalVM量身定做，采用同类最佳的Java库和标准。

`$ sdk install quarkus`

* * *

### sbt (1.8.3)

[http://www.scala-sbt.org/](http://www.scala-sbt.org/)

SBT是用于Scala和Java项目的开源构建工具，类似于Java的Maven或Ant。它的主要特点是：本机支持编译Scala代码和与许多Scala测试框架集成；使用DSL构建用Scala编写的描述；使用Ivy(
支持Maven格式)进行依赖管理存储库)；持续编译、测试和部署；与Scala解释器集成以实现快速迭代和调试；支持混合Java/Scala项目

`$ sdk install sbt`

* * *

### Scala (3.2.2)

[http://www.scala-lang.org/](http://www.scala-lang.org/)

Scala是一种面向一般软件应用程序的编程语言。Scala完全支持函数式编程和非常强大的静态类型系统。这允许用Scala编写的程序非常简洁，因此比其他通用编程语言的大小更小。Scala源代码旨在编译成Java字节码，这样得到的可执行代码就可以在Java虚拟机上运行。Java库可以直接在Scala代码中使用反过来说。Scala是面向对象的，并使用花括号语法。Scala具有函数式编程语言的许多特性，包括Currying、类型推理不变性、惰性求值和模式匹配。它还具有支持代数数据类型、协方差和逆方差的高级类型系统，高阶类型和匿名类型。Scala的其他特性包括操作符重载、可选参数、命名参数、原始字符串和不进行检查异常。

`$ sdk install scala`

* * *

### Scala CLI (1.0.0-RC2)

[https://scala-cli.virtuslab.org](https://scala-cli.virtuslab.org/)

Scala CLI 是一个用于与 Scala 语言交互的命令行工具。它允许您编译、运行、测试和打包您的Scala代码(以及更多！)

`$ sdk install scalacli`

* * *

### SchemaCrawler (16.19.7)

[https://www.schemacrawler.com](https://www.schemacrawler.com/)

SchemaCrawler是一个免费的数据库模式发现和理解工具。SchemaCrawler很好地混合了用于数据治理的有用特性。您可以搜索用于使用正则表达式的数据库架构对象，并以可读文本格式输出架构和数据。输出用于数据库文档，并被设计为与其他数据库模式不同。SchemaCrawler还生成架构图。您可以在任何标准脚本中执行脚本针对您的数据库的语言。您可以使用LINT发现潜在的模式设计问题。

`$ sdk install schemacrawler`

* * *

### Skeletal (0.15.0)

[https://github.com/cbmarcum/skeletal](https://github.com/cbmarcum/skeletal)

Skeletal 是一个工具，它允许您为该工具具有模板的任何框架或库创建新的项目结构。

`$ sdk install skeletal`

* * *

### Spark (3.3.2)

[https://spark.apache.org/](https://spark.apache.org/)

ApacheSpark是一个开源的集群计算框架。Spark提供了一个使用隐式数据并行性对整个集群进行编程的接口，并且容错。

`$ sdk install spark`

* * *

### Spring Boot (3.1.0)

[http://projects.spring.io/spring-boot/](http://projects.spring.io/spring-boot/)

Spring Boot 对构建可投入生产的 Spring应用程序持不变的看法。它更倾向于约定而不是配置，旨在让你运行起来跑得越快越好。

`$ sdk install springboot`

* * *

### Sshoogr (0.9.25)

[https://github.com/aestasit/sshoogr](https://github.com/aestasit/sshoogr)

Shoogr是一个基于Groovy的DSL和命令行工具，用于通过 SSH 处理远程服务器

`$ sdk install sshoogr`

* * *

### Taxi (1.35.0)

[https://taxilang.org](https://taxilang.org/)

Taxi 是一种用于记录数据(如数据模型)和API合同的语言。它以语义描述数据，允许强大的工具发现并基于其含义来映射数据，而不是基于字段的名称。

`$ sdk install taxi`

* * *

### Apache Tomcat (10.1.8)

[https://tomcat.apache.org/](https://tomcat.apache.org/)

ApacheTomcat® 软件是 Java Servlet、Java Server Pages、Java Expression Language 和Java WebSocket技术的开源实现。

`$ sdk install tomcat`

* * *

### ToolKit (0.6.7)

[https://github.com/IoT-Technology/IoT-Toolkit](https://github.com/IoT-Technology/IoT-Toolkit)

ToolKit 是一个客户端命令行工具，支持多种物联网协议，如MQTT和COAP。它为物联网开发提供了命令行客户端工具。

`$ sdk install toolkit`

* * *

### Vert.x (4.4.0)

[http://vertx.io/](http://vertx.io/)

Vert.x是用于在JVM上构建反应式应用程序的工具包。

`$ sdk install vertx`

* * *

### VisualVM (2.1.6)

[https://visualvm.github.io/](https://visualvm.github.io/)

VisualVM是一个提供可视化界面的工具，用于在Java虚拟机上运行Java应用程序时查看有关这些应用程序的详细信息。

`$ sdk install visualvm`

* * *

### Webtau (1.53)

[https://github.com/testingisdocumenting/webtau](https://github.com/testingisdocumenting/webtau)

Webtau(Web测试自动化的缩写)是一个测试API、命令行工具和一个编写单元、集成和端到端测试的框架。测试可以跨越多个应用层，如REST-API、 Graph
QL、浏览器、数据库和CLI。一组一致的匹配器和测试概念适用于所有测试层。

使用REPL模式加速测试开发。利用丰富的报告功能大幅缩短故障调查时间。

`$ sdk install webtau`

* * *

### Znai (1.51.1)

[https://github.com/testingisdocumenting/znai](https://github.com/testingisdocumenting/znai)

使用 Znai 构建实用的、可维护的、美观的用户指南。即时页面导航。本地搜索。多种集成以与Python、Java、 OpenAPI等。将入门部分转换为幻灯片，供您的研讨会使用。使用自行部署的
Znai 中心管理多个文档。

`$ sdk install znai`

## FAQ

### m1 下开启 rosetta2 兼容模式

在 m1 下，默认 rosetta2 兼容模式是关闭的，因此在 m1 上只能列出来 arm64 版本的 SDK。

以 java SDK 为例:

```
$ sdk list java

================================================================================
Available Java Versions for macOS ARM 64bit
================================================================================
 Vendor        | Use | Version      | Dist    | Status     | Identifier
--------------------------------------------------------------------------------
 Corretto      |     | 17.0.2.8.1   | amzn    |            | 17.0.2.8.1-amzn     
 Java.net      |     | 19.ea.13     | open    |            | 19.ea.13-open       
               |     | 19.ea.12     | open    |            | 19.ea.12-open       
               |     | 19.ea.11     | open    |            | 19.ea.11-open       
               |     | 19.ea.10     | open    |            | 19.ea.10-open       
               |     | 19.ea.4.lm   | open    |            | 19.ea.4.lm-open     
               |     | 18           | open    |            | 18-open             
               |     | 18.ea.35     | open    |            | 18.ea.35-open       
               |     | 17.0.2       | open    |            | 17.0.2-open         
               | >>> | 11.0.2       | open    | local only | 11.0.2-open         
```

以上是支持 macos + arm64 的 JDK。

如果要开启 rosetta2 兼容模式，需要修改 sdkman 的配置，`vi ~/.sdkman/etc/config`:

```diff
sdkman_insecure_ssl=false
- sdkman_rosetta2_compatible=false	
+ sdkman_rosetta2_compatible=true	
sdkman_selfupdate_feature=true
```

更改完毕后打开新窗口即可

此时再执行 `list java` 就能看到更多的安装选项了

```
$ sdk list java

================================================================================
Available Java Versions for macOS 64bit
================================================================================
 Vendor        | Use | Version      | Dist    | Status     | Identifier
--------------------------------------------------------------------------------
 Corretto      |     | 17.0.2.8.1   | amzn    |            | 17.0.2.8.1-amzn     
               |     | 11.0.14.10.1 | amzn    |            | 11.0.14.10.1-amzn   
               |     | 11.0.14.9.1  | amzn    |            | 11.0.14.9.1-amzn    
               |     | 8.322.06.2   | amzn    |            | 8.322.06.2-amzn     
               |     | 8.322.06.1   | amzn    |            | 8.322.06.1-amzn     
 Gluon         |     | 22.0.0.3.r17 | gln     |            | 22.0.0.3.r17-gln    
               |     | 22.0.0.3.r11 | gln     |            | 22.0.0.3.r11-gln    
 GraalVM       |     | 22.0.0.2.r17 | grl     |            | 22.0.0.2.r17-grl    
               |     | 22.0.0.2.r11 | grl     |            | 22.0.0.2.r11-grl    
               |     | 21.3.1.r17   | grl     |            | 21.3.1.r17-grl      
               |     | 21.3.1.r11   | grl     |            | 21.3.1.r11-grl      
               |     | 21.2.0.r16   | grl     |            | 21.2.0.r16-grl      
               |     | 21.2.0.r11   | grl     |            | 21.2.0.r11-grl      
               |     | 20.3.5.r11   | grl     |            | 20.3.5.r11-grl      
               |     | 19.3.6.r11   | grl     |            | 19.3.6.r11-grl      
 Java.net      |     | 19.ea.13     | open    |            | 19.ea.13-open       
               |     | 19.ea.12     | open    |            | 19.ea.12-open       
               |     | 19.ea.11     | open    |            | 19.ea.11-open       
               |     | 19.ea.10     | open    |            | 19.ea.10-open       
               |     | 19.ea.4.lm   | open    |            | 19.ea.4.lm-open     
               |     | 19.ea.1.pma  | open    |            | 19.ea.1.pma-open    
               |     | 18           | open    |            | 18-open             
               |     | 18.ea.35     | open    |            | 18.ea.35-open       
               |     | 17.0.2       | open    |            | 17.0.2-open         
               | >>> | 11.0.2       | open    |            | 11.0.2-open  
```