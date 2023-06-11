# 6. 使用依赖项

## 6.1 术语

## 6.2 基础学习

### 6.2.1 什么是依赖管理

### 6.2.2 声明存储库

Gradle 可以基于 `Maven`、`Ivy` 或平面目录格式解析一个或多个存储库中的依赖项。有关更多信息，请查看所有类型存储库的完整参考

#### 声明公开可用的存储库

构建软件的组织可能希望利用公共二进制存储库来下载和使用开源依赖项。流行的公共存储库包括 Maven Central 和 Google Android 存储库。Gradle为这些广泛使用的存储库提供了内置的速记符号

!["借助速记符号声明存储库"](https://file.wulicode.com/doc/20230611/1686488175142.png "借助速记符号声明存储库")

在底层，Gradle从由速记符号定义的公共存储库的相应URL中解析依赖项。所有的速记符号都可以通过 RepositoryHandler API 获得。或者，您可以拼出存储库的URL，以便进行更细粒度的控制

**Maven Central 库**

Maven Central是一个流行的存储库，托管供Java项目使用的开放源码库。

要为你的构建声明 Maven Central 存储库，请将以下内容添加到脚本中

::: code-group

```groovy [build.gradle]
repositories {
    mavenCentral()
}
```

```kotlin [build.gradle.kts]
repositories {
    mavenCentral()
}
```

:::

**Google Maven 存储库**

Google 存储库托管 Android特定的组件，包括 Android SDK。有关使用示例，请参阅相关的 Android文档。

要声明 Google Maven 存储库，将以下代码添加到构建脚本中:

::: code-group

```groovy [build.gradle]
repositories {
    google()
}
```

```kotlin [build.gradle.kts]
repositories {
    google()
}
```

:::

#### 通过URL声明自定义存储库

大多数企业项目都设置了仅在内部网内可用的二进制存储库。内部存储库使团队能够发布内部二进制文件，设置用户管理和安全措施，并确保正常运行时间和可用性。如果您希望声明一个不太流行但公开可用的存储库，那么指定自定义URL也很有帮助。

通过调用 RepositoryHandler API上可用的相应方法，可以将具有自定义url的存储库指定为 Maven 或 Ivy 存储库。Gradle 支持 `http` 或 `https`
以外的其他协议作为自定义URL的一部分，例如 `file`,
`sftp` 或 `s3`。有关完整的报道，请参见支持的存储库类型部分。

另外还可以通过使用 `ivy{}` 存储库来定义自己的存储库布局，因为它们可以非常灵活的在存储库中组织模块.

#### 声明多个存储库

可以为解析依赖关系定义多个存储库。如果某些依赖项仅在一个存储库中可用，而在另一个存储库中不可用，则声明多个存储库是有帮助的。您可以混合参考部分中描述的任何类型的存储库

这个例子演示了如何为一个项目声明各种命名的和自定义的URL存储库:

::: code-group

```groovy [build.gradle]
repositories {
    mavenCentral()
    maven {
        url "https://repo.spring.io/release"
    }
    maven {
        url "https://repository.jboss.org/maven2"
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    mavenCentral()
    maven {
        url = uri("https://repo.spring.io/release")
    }
    maven {
        url = uri("https://repository.jboss.org/maven2")
    }
}
```

:::

::: info

声明的顺序决定了 Gradle 将如何在运行时检查依赖项。如果 Gradle 在特定存储库中找到模块描述符，它将尝试从同一存储库中下载该模块的所有构件。您可以了解有关依赖项下载的内部工作原理的更多信息

:::

**严格限制声明的存储库**

Maven POM 元数据可以引用其他存储库。这些将被 Gradle 忽略，它只会使用在构建本身中声明的存储库。

::: info

这是一种可再现性保护，也是一种安全保护。如果没有它，依赖项的更新版本可能会将工件从任何地方拉到构建中。

:::

#### 支持的存储库类型

Gradle支持大量的依赖源，包括格式和连接方式。你可以从以下内容解决依赖:

- 不同的格式
    - 与 Maven 兼容的工件存储库(例如:Maven Central)
    - Ivy兼容的工件存储库(包括自定义布局)
    - 本地(扁平)目录

- 不同的连接方式
    - 身份验证存储库
    - 各种远程协议，如 HTTPS、SFTP、AWS S3 和 Google Cloud Storage

**扁平目录存储库**

一些项目可能更喜欢将依赖项存储在共享驱动器上或作为项目源代码的一部分，而不是二进制存储库产品。如果要使用(扁平)文件系统目录作为存储库，只需键入：

::: code-group

```groovy [build.gradle]
repositories {
    flatDir {
        dirs 'lib'
    }
    flatDir {
        dirs 'lib1', 'lib2'
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    flatDir {
        dirs("lib")
    }
    flatDir {
        dirs("lib1", "lib2")
    }
}
```

:::

这将添加存储库，这些存储库在一个或多个目录中查找依赖项

这种类型的存储库不支持任何元数据格式，如 Ivy XML 或 Maven POM 文件。相反，Gradle 将基于构件的存在动态生成模块描述符(没有任何依赖信息)。

::: info

由于 Gradle 更喜欢使用其描述符是从实际元数据创建而不是生成的模块，因此扁平目录存储库不能用于用构建中声明的其他存储库中的真实元数据覆盖构件

例如，如果 Gradle 在平面目录存储库中只找到 jmxri-1.2.1.jar，但在另一个支持元数据的存储库中找到 jmxri-1.2.1.pom，它将使用第二个存储库来提供模块

对于使用本地构件覆盖远程构件的用例，可以考虑使用 Ivy 或 Maven 存储库，其URL指向本地目录

:::

如果你只使用平面目录存储库，则不需要设置依赖项的所有属性

**本地存储库**

以下各节介绍存储库格式、Maven或Ivy。可以将它们声明为本地存储库，使用本地文件系统路径来访问它们

扁平目录存储库的不同之处在于，它们确实尊重一种格式并包含元数据

当配置这样的存储库时，Gradle 完全绕过它的依赖缓存，因为不能保证内容在两次执行之间不会改变。由于该限制，它们可能会对性能产生影响

它们还使构建的重现性更难实现，它们的使用应该仅限于修补或原型制作

#### Maven存储库

许多组织在内部 Maven 存储库中托管依赖项，只能在公司网络中访问。Gradle 可以通过URL声明Maven存储库

要添加自定义Maven存储库，您可以这样做

::: code-group

```groovy [build.gradle]
repositories {
    maven {
        url "https://repo.mycompany.com/maven2"
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    maven {
        url = uri("https://repo.mycompany.com/maven2")
    }
}
```

:::

**设置复合 Maven 存储库**

有时，存储库会将pom发布到一个位置，而将jar和其他工件发布到另一个位置。要定义这样一个存储库，你可以这样做:

::: code-group

```groovy [build.gradle]
repositories {
    maven {
        // Look for POMs and artifacts, such as JARs, here
        url "http://repo2.mycompany.com/maven2"
        // Look for artifacts here if not found at the above location
        artifactUrls "http://repo.mycompany.com/jars"
        artifactUrls "http://repo.mycompany.com/jars2"
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    maven {
        // Look for POMs and artifacts, such as JARs, here
        url = uri("http://repo2.mycompany.com/maven2")
        // Look for artifacts here if not found at the above location
        artifactUrls("http://repo.mycompany.com/jars")
        artifactUrls("http://repo.mycompany.com/jars2")
    }
}
```

:::

Gradle 将查看 POM 和 JAR 的基本url位置。如果在那里找不到JAR，则使用额外的工件来查找JAR

**访问授权验证的 Maven 存储库**

您可以为受不同类型身份验证保护的 Maven 存储库指定凭据。

有关身份验证选项，请参阅支持的存储库传输协议

**Local Maven 仓库**

Gradle 可以使用本地 Maven 存储库中提供的依赖项。声明此存储库对于使用一个项目发布到本地 Maven 存储库并在另一个项目中使用 Gradle 的构件的团队是有益的

::: info

Gradle 将解析的依赖项存储在自己的缓存中。构建不需要声明本地 Maven 存储库，即使您解析来自基于 Maven 的远程存储库的依赖项

在将Maven local添加为存储库之前，您应该确保这确实是必需的

:::

要将 Local Maven 缓存声明为存储库，请在构建脚本中添加以下内容：

::: code-group

```groovy [build.gradle]
repositories {
    maven {
        mavenLocal()
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    maven {
        mavenLocal()
    }
}
```

:::

Gradle 使用与 Maven 相同的逻辑来标识 Local Maven缓存的位置。如果在`settings.xml`
中定义了本地存储库位置，则将使用此位置。在 `<home directory of the current user>/.m2` 中的 `settings.xml` 优先于 `M2_HOME/conf` 中的 `settings.xml`
。如果没有 `settings.xml` 可用，Gradle 将使用默认位置 `<home directory of the current user>/.m2/repository`。

#### MavenLocal()

作为一般建议，您应该避免将 `mavenLocal()` 添加为存储库。使用 `mavenLocal()` 有不同的问题，你应该知道:

- Maven 将其用作缓存，而不是存储库，这意味着它可以包含部分模块
    - 例如，如果 Maven 从未下载过给定模块的源文件或javadoc文件，Gradle也不会找到它们，因为一旦找到模块，Gradle就会在单个存储库中搜索文件
- 作为本地存储库，Gradle不信任其内容，因为：
    - 工件的源不能被跟踪，这是一个正确性和安全性问题
    - 工件很容易被覆盖，这是一个安全性、正确性和可再现性问题
- 为了减轻元数据和/或工件可能被更改的事实，Gradle不会对本地存储库执行任何缓存
    - 因此，您的构建会变慢
    - 考虑到存储库的顺序很重要，首先添加 mavenLocal() 意味着所有构建都会变慢

有一些情况下，你可能不得不使用 `mavenLocal()`:

- 对于与Maven的互操作性
    - 例如，项目A是用 Maven 构建的，项目B是用Gradle构建的，您需要在开发期间共享工件
    - 最好使用内部功能齐全的存储库
    - 如果这是不可能的，您应该将其限制为仅本地构建

- 为了与Gradle本身的互操作性
    - 在多存储库环境中，您希望检查对项目a的更改是否与项目B一起工作
    - 对于这个用例，最好使用组合构建
    - 如果由于某种原因，复合构建和功能完整的存储库都不可能，那么 `mavenLocal()` 是最后的选择

在所有这些警告之后，如果您最终使用mavenLocal()，请考虑将其与存储库过滤器结合使用。这将确保它只提供预期的内容，而不是其他内容。

#### lvy 存储库

组织可能决定在内部Ivy存储库中托管依赖项。Gradle可以通过URL声明Ivy存储库。

**定义具有标准布局的Ivy存储库**

要使用标准布局声明Ivy存储库，不需要额外的定义项。你只需要声明URL

::: code-group

```groovy [build.gradle]
repositories {
    ivy {
        url "http://repo.mycompany.com/repo"
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    ivy {
        url = uri("http://repo.mycompany.com/repo")
    }
}
```

:::

**定义Ivy存储库的命名布局**

您可以通过使用已命名的布局来指定您的存储库符合Ivy或Maven的默认布局

::: code-group

```groovy [build.gradle]
repositories {
    ivy {
        url "http://repo.mycompany.com/repo"
        layout "maven"
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    ivy {
        url = uri("http://repo.mycompany.com/repo")
        layout("maven")
    }
}
```

:::

有效的命名布局值是'gradle'(默认)，'maven'和'ivy'
请参阅API文档中的 IvyArtifactRepository.layout(java.lang.String) 了解这些命名布局的详细信息

**为Ivy存储库定义自定义模式布局**

要定义一个非标准布局的Ivy存储库，你可以为存储库定义一个 `pattern` 布局:

::: code-group

```groovy [build.gradle]
repositories {
    ivy {
        url "http://repo.mycompany.com/repo"
        patternLayout {
            artifact "[module]/[revision]/[type]/[artifact].[ext]"
        }
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    ivy {
        url = uri("http://repo.mycompany.com/repo")
        patternLayout {
           artifact("[module]/[revision]/[type]/[artifact].[ext]")
        }
    }
}
```

:::

要定义一个从不同位置获取Ivy文件和工件的Ivy存储库，您可以定义单独的模式来定位Ivy文件和工件:

为存储库指定的每个`artifact`或`ivy`都会添加一个要使用的额外模式。模式按照定义的顺序使用

::: code-group

```groovy [build.gradle]
repositories {
    ivy {
        url "http://repo.mycompany.com/repo"
        patternLayout {
            artifact "3rd-party-artifacts/[organisation]/[module]/[revision]/[artifact]-[revision].[ext]"
            artifact "company-artifacts/[organisation]/[module]/[revision]/[artifact]-[revision].[ext]"
            ivy "ivy-files/[organisation]/[module]/[revision]/ivy.xml"
        }
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    ivy {
        url = uri("http://repo.mycompany.com/repo")
        patternLayout {
            artifact("3rd-party-artifacts/[organisation]/[module]/[revision]/[artifact]-[revision].[ext]")
            artifact("company-artifacts/[organisation]/[module]/[revision]/[artifact]-[revision].[ext]")
            ivy("ivy-files/[organisation]/[module]/[revision]/ivy.xml")
        }
    }
}
```

:::

可选的是，具有模式布局的存储库可以以 Maven 风格布局其 `organisation` 部分，用正斜杠代替点作为分隔符。例如，组织`my.company`将被表示为`my/company`

::: code-group

```groovy [build.gradle]
repositories {
    ivy {
        url "http://repo.mycompany.com/repo"
        patternLayout {
            artifact "[organisation]/[module]/[revision]/[artifact]-[revision].[ext]"
            m2compatible = true
        }
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    ivy {
        url = uri("http://repo.mycompany.com/repo")
        patternLayout {
            artifact("[organisation]/[module]/[revision]/[artifact]-[revision].[ext]")
            setM2compatible(true)
        }
    }
}
```

:::

**访问经过身份验证的Ivy存储库**

您可以为基本身份验证保护的Ivy存储库指定凭据

::: code-group

```groovy [build.gradle]
repositories {
    ivy {
        url "http://repo.mycompany.com"
        credentials {
            username "user"
            password "password"
        }
    }
}
```

```kotlin [build.gradle.kts]
repositories {
    ivy {
        url = uri("http://repo.mycompany.com")
        credentials {
            username = "user"
            password = "password"
        }
    }
}
```

:::

有关身份验证选项，请参阅支持的存储库传输协议

#### 存储库内容过滤(todo)

#### 支持的元数据源

#### 插件存储库与构建存储库

#### 集中存储库声明

#### 支持的存储库传输协议

#### HTTP(S)身份验证方案配置

#### AWS S3 存储库配置

#### Google Cloud 存储库设置

#### 处理凭据

