# Java - FAQ

## IDE

### idea Cannot find declaration to go to ，ctrl+左键无法进入代码

打开 `File | Project Structure`

![](https://file.wulicode.com/doc/20230510/1683698147525.png)

打开 `Modules | java`, 选中 `src`(代码目录), 右键设置为 `Sources`(源代码) 即可

![](https://file.wulicode.com/doc/20230510/1683698235271.png)

### 对比

### 和 PHP 异同

- 建议每个自定义类都添加一个 toString 方法

## JDK

### Homebrew 支持的 JDK

- Temurin, 前身 AdoptOpenJDK

https://adoptium.net/

AdoptOpenJDK从长远考虑，加入到ADOPTIUM，成为Eclipse Temurin。它被设定为用于苛刻的生产环境，换句话说AdoptOpenJDK改名了，叫做Eclipse Temurin, 包含 LTS, 以及最近的多个版本

```
brew search --desc --eval-all temurin
==> Formulae

==> Casks
temurin11: (Eclipse Temurin 11) JDK from the Eclipse Foundation (Adoptium)
temurin17: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin18: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin19: (Eclipse Temurin Java Development Kit) JDK from the Eclipse Foundation (Adoptium)
temurin8: (Eclipse Temurin 8) JDK from the Eclipse Foundation (Adoptium)
```

- Semeru(IBM 免费运行环境)

https://developer.ibm.com/languages/java/semeru-runtimes

IBM Smeru Runtime是使用OpenJDK类库和Eclipse OpenJ9 JVM构建的免费生产二进制文件，它提供了在最需要的时候运行Java应用程序的功能和性能。

```
brew search semeru
==> Formulae
semgrep

==> Casks
semeru-jdk-open                semeru-jdk11-open              semeru-jdk17-open              semeru-jdk8-open
```

- Oracle JDK(官方, 最新)

https://www.oracle.com/java/technologies/downloads/

在一个 Oracle JDK 的生命周期内 (指的是下一个版本的 JDK 推出之前) 可以免费商用

- Oracle OpenJDK

https://openjdk.org/

和其他家的 OPENJDK 没什么差别

```
$ brew search openjdk
==> Formulae
openjdk ✔          openjdk@11         openjdk@17         openjdk@8
```

- Microsoft OpenJDK

https://www.microsoft.com/openjdk

```
$ brew search microsoft-openjdk
```

- Zulu(JDK7)

```
$ brew search zulu

==> Casks
zulu          zulu11        zulu13        zulu15        zulu17        zulu7         zulu8         zulufx
```

- Java6 (苹果维护)

```
$ brew info java6
==> java6: 1.6.0_65-b14-468,2019,041-88384-20191011-3d8da658-dca4-4a5b-b67c-26e686876403
https://support.apple.com/kb/DL1572
Not installed
From: https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-versions.git
==> Name
Apple Java 6 Standard Edition Development Kit
==> Description
Legacy runtime for the Java programming language
==> Artifacts
JavaForOSX/JavaForOSX.pkg/Payload/Library/Java/JavaVirtualMachines/1.6.0.jdk -> /Library/Java/JavaVirtualMachines/1.6.0.jdk (Generic Artifact)
==> Caveats
java6 has been officially discontinued upstream.
It may stop working correctly (or at all) in recent versions of macOS.
```