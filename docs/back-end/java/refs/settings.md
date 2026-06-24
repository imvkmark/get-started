---
description: '该文档介绍了Settings的参考内容，涵盖快速预览、设置详情、简单值、插件分组，以及服务器、镜像、代理、资料和激活资料等配置，并解释了QA release与snapshot版本的区别。'
lastUpdated: '2026-06-18 00:00:48'
head:
  - - meta
    - name: 'og:title'
      content: 'Settings 参考 '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档介绍了Settings的参考内容，涵盖快速预览、设置详情、简单值、插件分组，以及服务器、镜像、代理、资料和激活资料等配置，并解释了QA release与snapshot版本的区别。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/java/refs/settings.html'
---
# Settings 参考

## 介绍

### 快速预览

`settings.xml` 文件中的 `settings` 元素包含了用于配置 Maven 执行的各种值。与 `pom.xml` 类似，它也用于设置一些 Maven 配置，但它的设置不应该捆绑到任何特定项目，也不应该分发给其他受众。这些设置通常包括本地仓库的位置、备用远程仓库服务器、身份验证信息等。

`settings.xml` 文件可以存在于两个位置：

- **Maven 安装目录**：`${maven.home}/conf/settings.xml`
- **用户的安装目录**：`${user.home}/.m2/settings.xml`

第一个 `settings.xml` 文件通常被称为**全局设置**，而第二个 `settings.xml` 文件则称为**用户设置**。如果两个文件同时存在，它们的内容会合并，并且用户指定的 `settings.xml` 文件的配置将优先。

**提示**：如果需要从头创建用户特定的设置，最简单的方法是将 Maven 安装目录中的全局设置文件复制到 `${user.home}/.m2` 目录中。Maven 的默认 `settings.xml` 是一个带有注释和示例的模板，因此可以很快根据需要调整。

下面是 `settings` 下的主要元素的概述：

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <offline/>
  <pluginGroups/>
  <servers/>
  <mirrors/>
  <proxies/>
  <profiles/>
  <activeProfiles/>
</settings>
```

`settings.xml` 文件的内容可以通过以下表达式进行插值：

- `${user.home}` 以及所有其他系统属性
- `${env.HOME}` 等环境变量

需要注意的是，在 `settings.xml` 中的配置文件（profiles）中定义的属性**不能**用于插值。

## 设置详情

### 简单的值

settings.xml 文件中的一半顶级 `settings` 元素是简单的值，代表了构建系统中的一系列全时活跃的元素。

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository>${user.home}/.m2/repository</localRepository>
  <interactiveMode>true</interactiveMode>
  <offline>false</offline>
  ...
</settings>
```

- **localRepository**: 此值表示构建系统的本地仓库路径，默认路径为 `${user.home}/.m2/repository`。该元素在主构建服务器中特别有用，允许所有登录用户使用一个公共的本地仓库进行构建。
- **interactiveMode**: 如果 Maven 应该尝试与用户进行交互以获取输入，则设置为 true，否则为 `false`。默认为 `true`。设置为 `false` 时，Maven 将不会在构建过程中要求用户提供输入。
- **offline**: 如果构建系统应以离线模式运行，则设置为 `true`，默认值为 `false`。该元素对于无法连接远程仓库的构建服务器非常有用，可能是由于网络设置或安全原因导致。

### 插件分组

该元素包含一个 `pluginGroup` 元素列表，每个元素都包含一个 groupId。当使用插件并且命令行中未提供 groupId 时，Maven 会在这个列表中搜索插件。默认情况下，该列表自动包含 `org.apache.maven.plugins` 和 `org.codehaus.mojo`

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <pluginGroups>
    <pluginGroup>org.eclipse.jetty</pluginGroup>
  </pluginGroups>
  ...
</settings>
```

例如，基于上述设置，Maven 命令行可以使用简化的命令来执行 `org.eclipse.jetty:jetty-maven-plugin:run`：

```XML
mvn jetty:run
```

### 服务器

下载和部署的仓库是由 POM 的 `repositories` 和 `distributionManagement` 元素定义的。然而，某些设置（如 `username` 和 `password`）不应与 `pom.xml` 一起分发。此类信息应存在于构建服务器上的 settings.xml 文件中。

这确保了敏感信息不会泄露在项目文件中，而是保存在本地构建环境中，以维护安全性。

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <servers>
    <server>
      <id>server001</id>
      <username>my_login</username>
      <password>my_password</password>
      <privateKey>${user.home}/.ssh/id_dsa</privateKey>
      <passphrase>some_passphrase</passphrase>
      <filePermissions>664</filePermissions>
      <directoryPermissions>775</directoryPermissions>
      <configuration></configuration>
    </server>
  </servers>
  ...
</settings>
```

在 settings.xml 文件中，服务器的认证信息和权限设置通过以下元素进行配置：

- **id**: 表示服务器的 ID（与登录用户无关），这个 ID 要与 Maven 尝试连接的仓库或镜像的 id 元素相匹配。
- **username**, **password**: 一对元素，分别表示登录所需的用户名和密码。
- **privateKey**, **passphrase**: 另一对元素，指定私钥的路径（默认值为 `${user.home}/.ssh/id_dsa`）以及相应的密码短语（如果需要）。目前，这些值必须以明文形式在 `settings.xml` 中设置，未来可能会外部化这些敏感信息。
- **filePermissions**, **directoryPermissions**: 当在部署过程中创建仓库文件或目录时，指定其权限。每个元素的合法值为表示 \*nix 文件权限的三位数字，例如 664 或 775。

**注意**: 如果使用私钥登录服务器，请确保省略 `<password>` 元素。否则，Maven 将忽略私钥并使用密码进行登录。

**密码加密**

新特性 - 服务器密码和密钥加密在 2.1.0 以后可用, [查看详情](https://maven.apache.org/guides/mini/guide-encryption.html)

### 镜像

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <mirrors>
    <mirror>
      <id>planetmirror.com</id>
      <name>PlanetMirror Australia</name>
      <url>http://downloads.planetmirror.com/pub/maven2</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  ...
</settings>
```

- **id, name**: 这些元素表示镜像的唯一标识符和用户友好的名称。`id` 用于区分不同的镜像元素，并在连接到镜像时从 `<servers>` 部分选择相应的凭据。
- **url**: 镜像的基础 URL。构建系统将使用此 URL 来连接到仓库，而不是使用原始仓库的 URL。
- **mirrorOf**: 表示此镜像所对应的仓库的 id。例如，要指向 Maven 中央仓库 (`https://repo.maven.apache.org/maven2/`) 的镜像，将此元素设置为 `central`。还可以进行更高级的映射，如 `repo1,repo2` 或 `*,!inhouse`。此值不能与镜像的 `id` 相匹配。

欲了解更多关于镜像的内容，请阅读 [Mirror Settings 指南](https://maven.apache.org/guides/mini/guide-mirror-settings.html)

### 代理

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <proxies>
    <proxy>
      <id>myproxy</id>
      <active>true</active>
      <protocol>http</protocol>
      <host>proxy.somewhere.com</host>
      <port>8080</port>
      <username>proxyuser</username>
      <password>somepassword</password>
      <nonProxyHosts>*.google.com|ibiblio.org</nonProxyHosts>
    </proxy>
  </proxies>
  ...
</settings>
```

- **id**: 这是该代理的唯一标识符，用于区分不同的 `proxy` 元素。
- **active**: 如果此代理处于活动状态，则为 `true`。这对于声明一组代理非常有用，但同一时间只能有一个代理处于活动状态。
- **protocol, host, port**: 代理的协议、主机和端口，分别拆分为独立的元素，格式为 `protocol://host:port`。
- **username, password**: 这两个元素成对出现，表示用于验证该代理服务器的登录名和密码
- **nonProxyHosts**: 这是一个不应通过代理访问的主机列表。列表的分隔符取决于预期的代理服务器类型；上面的示例使用管道（|）分隔，逗号分隔也是常见的做法。

### 资料

`settings.xml` 文件中的 `profile` 元素是 `pom.xml` 文件中 `profile` 元素的简化版本。它仅包含以下四个元素：`activation`、`repositories`、`pluginRepositories` 和 `properties`。这些元素的设计目的是关注整个构建系统（这是 `settings.xml` 文件的作用），而不是单个项目对象模型（POM）设置

如果来自 `settings.xml` 的配置文件处于活动状态，其值将覆盖 `pom.xml` 或 `profiles.xml` 文件中具有相同 ID 的任何配置文件

**激活**

激活是配置文件的关键。与 POM 文件中的配置文件类似，配置文件的强大之处在于它能够仅在特定条件下修改某些值；这些条件通过一个 `activation` 元素来指定

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <profiles>
    <profile>
      <id>test</id>
      <activation>
        <activeByDefault>false</activeByDefault>
        <jdk>1.5</jdk>
        <os>
          <name>Windows XP</name>
          <family>Windows</family>
          <arch>x86</arch>
          <version>5.1.2600</version>
        </os>
        <property>
          <name>mavenVersion</name>
          <value>2.0.3</value>
        </property>
        <file>
          <exists>${basedir}/file2.properties</exists>
          <missing>${basedir}/file1.properties</missing>
        </file>
      </activation>
      ...
    </profile>
  </profiles>
  ...
</settings>
```

激活发生在满足所有指定条件时，尽管不要求同时满足所有条件。

- **jdk**: `activation` 元素内置了一个基于 `jdk` 的检查。如果测试是在符合前缀的 JDK 版本下运行的，该配置文件将被激活。例如，上述示例中的 `1.5.0_06` 将匹配此规则。也支持范围匹配。请参阅 [maven-enforcer-plugin](https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html) 了解支持的版本范围的更多细节。
- **os**: os 元素可以定义一些与操作系统相关的特定属性。请参阅 [maven-enforcer-plugin](https://maven.apache.org/plugins/maven-enforcer-plugin/rules/requireOS.html) 了解操作系统值的更多细节
- **property**: 如果 Maven 检测到某个属性（该属性可以在 `POM` 文件中通过 `${name}` 引用）的 `name=value` 对，配置文件将被激活
- **file**: 最后，某个文件名的存在或缺失也可以激活配置文件。

激活元素并不是唯一的激活配置文件的方式。`settings.xml` 文件中的 `activeProfile` 元素可能包含配置文件的 `id`。它们也可以通过命令行中的 `-P` 参数后跟逗号分隔的列表显式激活（例如，`-P test`）。

要查看特定构建中将会激活哪个配置文件，可以使用 `maven-help-plugin`

```XML
mvn help:active-profiles
```

**属性**

Maven 属性是值的占位符，类似于 Ant 中的属性。它们的值可以通过 `${X}` 的方式在POM中的任何地方访问，其中 `X` 是属性名。Maven 属性有五种不同的形式，所有这些都可以从`settings.xml`文件中访问：

- **`env.X`**: 以 “env.” 为前缀的变量将返回Shell的环境变量。例如，`${env.PATH}`包含环境变量`$path`（在Windows中为`%PATH%`）。
- **`project.x`**: POM中的点号（.）表示路径将包含对应元素的值。例如：`<project><version>1.0</version></project>` 可以通过 `${project.version}` 访问。
- **`settings.x`**: settings.xml中的点号（.）表示路径将包含对应元素的值。例如：`<settings><offline>false</offline></settings>` 可以通过 `${settings.offline}` 访问。
- **Java系统属性**: 通过 `java.lang.System.getProperties()` 可访问的所有属性都可以作为POM属性使用，例如 `${java.home}`。
- **`x`**: 在 `<properties />` 元素中或外部文件中设置的值，可以通过 `${someVar}` 使用。

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <profiles>
    <profile>
      ...
      <properties>
        <user.install>${user.home}/our-project</user.install>
      </properties>
      ...
    </profile>
  </profiles>
  ...
</settings>
```

在激活情况下, 属性 `${user.install}` 在pom 中是可访问的

**仓库**

仓库是远程的项目集合，Maven 用它们来填充构建系统的本地仓库。Maven 从这个本地仓库中调用其插件和依赖项。不同的远程仓库可能包含不同的项目，在激活的配置文件下，Maven可以在这些仓库中搜索匹配的发布或快照工件。

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <profiles>
    <profile>
      ...
      <repositories>
        <repository>
          <id>codehausSnapshots</id>
          <name>Codehaus Snapshots</name>
          <releases>
            <enabled>false</enabled>
            <updatePolicy>always</updatePolicy>
            <checksumPolicy>warn</checksumPolicy>
          </releases>
          <snapshots>
            <enabled>true</enabled>
            <updatePolicy>never</updatePolicy>
            <checksumPolicy>fail</checksumPolicy>
          </snapshots>
          <url>http://snapshots.maven.codehaus.org/maven2</url>
          <layout>default</layout>
        </repository>
      </repositories>
      <pluginRepositories>
        <pluginRepository>
          <id>myPluginRepo</id>
          <name>My Plugins repo</name>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>false</enabled>
          </snapshots>
          <url>https://maven-central-eu....com/maven2/</url>
        </pluginRepository>
      </pluginRepositories>
      ...
    </profile>
  </profiles>
  ...
</settings>
```

- **releases**, **snapshots**：这些是针对每种工件类型（发布或快照）的策略。通过这两个设置，POM可以独立地调整单个仓库内每种类型的策略。例如，你可以选择只启用快照下载，可能用于开发目的。
- **enabled**: 用于指定是否启用该仓库的(`releases` or `snapshots`)类型。值为 `true` 或 `false`。
- **updatePolicy**: 此元素指定更新尝试的频率。Maven 将比较本地 POM 的时间戳（存储在仓库的 maven-metadata文件中）与远程版本。可选值包括：`always`（总是），`daily`（默认，每天一次），`interval:X`（X是以分钟为单位的整数）或 `never`（不更新，只在本地没有的情况下下载）。
- **checksumPolicy**: 当Maven将文件部署到仓库时，它也会部署相应的校验文件。你可以选择忽略（`ignore`）、失败（`fail`）或在校验码丢失或不正确时警告（`warn`）。
- **layout**: 如前面所述，仓库通常遵循共同的布局。Maven 2有其默认布局，但Maven 1.x有不同的布局。使用此元素来指定布局是 `default` 还是 `legacy`

**插件仓库**

仓库主要包含两种类型的工件。第一种是作为其他工件的依赖项使用的工件，这类工件占据了大多数，并通常位于中央仓库（central）中。另一种是插件。Maven插件本身也是一种特殊的工件。由于这个原因，插件仓库可以与其他仓库分开管理（虽然我还没有听到一个有说服力的理由这么做）。无论如何，`pluginRepositories` 元素块的结构与 `repositories`元素类似。每个 `pluginRepository` 元素都指定了 Maven 可以找到新插件的远程位置

### 激活资料

```XML
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <activeProfiles>
    <activeProfile>env-test</activeProfile>
  </activeProfiles>
</settings>
```

`settings.xml` 的最后一部分是 `activeProfiles` 元素。它包含了一组 `activeProfile` 元素，每个元素都有一个 `profile` `id` 的值。任何被定义为 `activeProfile` 的 `profile` `id` 将会被激活，而不管环境设置如何。如果没有找到匹配的 `profile` `id`，则不会发生任何事情。例如，如果`env-test`是一个 `activeProfile`，那么在 `pom.xml`（或`profile.xml`）中具有相应 `id` 的配置文件将会被激活。如果没有找到这样的配置文件，执行将会继续正常进行

## QA

### release 和 snapshot 版本的区别

1. 版本号中的 release 和 snapshot 区别就是，snapshot 是在版本号后面添加 `-SNAPSHOT` 字符
2. release 版本的话，一旦包被下载到本地了，Maven 是不会重新下载的
3. 使用的是 SNAPSHOT 版本的话，每次在构建的时候都会从定义的新仓库中下载新的版本
4. 不允许你将 release 版本多次发布，如果你需要进行再次发布的话，你需要修改版本号