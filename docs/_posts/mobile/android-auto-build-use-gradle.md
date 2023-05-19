---
title: "Android Gradle 自动化打包"
date: 2022-08-06 17:25:42
toc: true
categories:
- ["手机端","Android"]
---

目的：通过一行命令实现 Android 打包，生成 apk


## 一、Gradle 环境配置


### 1、jdk 环境需要配置好（这点不在赘述）

配置 Gradle 之前要确保安装了 Java 环境,要求在 JDK 1.6 以上,并且配置了环境变量 JAVA_HOME,查看 Java 版本可以在终端输入


### 2、Gradle 环境变量：


#### windows 配置 gradle 环境变量

（1）找到自己 Android Studio 目录下的 gradle 文件（也可以打单独下载：[下载地址](https://services.gradle.org/distributions/)，记得要下载 all 版本的,里面包含了 Gradle SDK 所有相关的内容,包括源代码、文档、示例等）。地址例如：（C:FilesStudio-4.1） 按照配置 JDK 那样首先将其编辑到系统变量 GRADLE_HOME：<br />![Untitled.png](https://file.wulicode.com/yuque/202208/24/23/1133FjZi0pyx.png)

（2）步骤一完成以后将 GRADLE_HOME 添加到系统变量，如下图

![Untitled 1.png](https://file.wulicode.com/yuque/202208/24/23/1134lMA48qor.png)<br />（3）命令窗口 输入 gradle -version， 如果可以显示版本信息即为环境配置成功


#### Mac 配置 gradle 环境变量：

（1）下载获取路径同 windows，将下载的 gradle 解压到指定路径，例如（/Users/android/Documents/AndroidStudio/gradle-4.6）

（2）打开.bash_profile 文件

```
open -e .bash_profile
```

（3）将 GRADLE_HOME 的值替换成你的 Gradle 路径，在.bash_profile 文件中输入下面内容

```
GRADLE_HOME=/Users/android/Documents/AndroidStudio/gradle-4.6export GRADLE_HOMEexport PATH=$PATH:$GRADLE_HOME/bin
```

（4）保存.bash_profile 文件,在终端上执行更新.bash_profile 文件

```
source ~/.bash_profile
```

（5）验证。在终端上执行 gradle -version，如下图所示，代表成功

![Untitled 2.png](https://file.wulicode.com/yuque/202208/24/23/1134PAby4kfK.png?x-oss-process=image/resize,h_239)

image.png


## 二、Gradle 代码配置


### 1、APP 目录下的 build.gradle

这个文件是我们经常用的配置性文件，配置签名信息，渠道信息，配置各种第三方库以及依赖等等，如下：

```
  defaultConfig{ } 默认配置，是ProductFlavor类型
　sourceSets{ } 源文件目录设置，是AndroidSourceSet类型。
　buildTypes{ } BuildType类型
　signingConfigs{ } 签名配置，SigningConfig类型
　productFlavors{ } 产品风格配置，ProductFlavor类型
　testOptions{ } 测试配置，TestOptions类型
　aaptOptions{ } aapt配置，AaptOptions类型
　lintOptions{ } lint配置，LintOptions类型
　dexOptions{ } dex配置，DexOptions类型
　compileOptions{ } 编译配置，CompileOptions类型
　packagingOptions{ } PackagingOptions类型
　jacoco{ } JacocoExtension类型。 用于设定 jacoco版本
　splits{ } Splits类型
```


### 2、signingConfigs 签名配置

配置签名信息：

```
signingConfigs {
        release {
            keyAlias 'dadi'//别名
            keyPassword 'dadipsw'//别名密码
            storeFile file('../dianjing.jks')//jks路径
            storePassword 'dadipsw'//密码
            v1SigningEnabled true//v1签名
            v2SigningEnabled true//v2签名
        }

//        debug {
//            keyAlias 'dadi'//别名
//            keyPassword 'dadipsw'//别名密码
//            storeFile file('../dianjing.jks')//jks路径
//            storePassword 'dadipsw'//密码
//            v1SigningEnabled true//v1签名
//            v2SigningEnabled true//v2签名
//        }
}
```


### 3、apk 输出路径

通常情况下生成的 apk 默认是 项目 ，我们可以通过设定 applicationVariants.all 指定 apk 输出的文件位置

```
buildTypes {//配置发布版本和测试版本的一些配置以及混淆文件等
        release {
            shrinkResources true// 去除无用资源
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        debug {
//            debuggable true//不采用签名
            signingConfig signingConfigs.release//用release签名
        }

        //输出位置
        applicationVariants.all {
            //获取当前时间的"YYYY-MM-dd"格式。
            def createTime = new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone("GMT+08:00"))
            //输入到指定文件夹
         it.getPackageApplication().outputDirectory = new File('/Users/android/project/LXGame/app/build/outputs/GradleApks' + "/${createTime}")
        }
    }
```


## 三、Gradle 命令打包

进入项目根路径下<br />![Untitled 3.png](https://file.wulicode.com/yuque/202208/24/23/11357OvTaxbG.png)


或者是在 Android studio Terminal 中输入命令：

```
1:编译所有productFlavor及对应所有buildType的apk：
　　gradle assemble  //仅仅执行项目打包所必须的任务集
　　gradle build          //执行项目打包所必须的任务集,以及执行自动化测试,所以会较慢
   如果当前Project包含多个Module,在Project根目录执行gradle assemble会编译所有的Module
2:编译指定productFlavor及buildType的apk
　　gradle assemble[productFlavor][buildType]  //如果缺失某参数,则会把该参数的所有配置都进行编译,即如果运行gradle assembleflavor,则会编译出flavor所有buildType的apk
　　例如：
　 gradle assemble
　 gradle assembleflavorRelease
　 gradle assembleflavorDebug
   注意：gradle支持命令缩写，上面两个命令也可以写成如下格式
   $gradle a
   $gradle ass
   $gradle aR
   $gradle assflavorR
   $gradle aD
   $gradle assflavorD
```

打包成功<br />![Untitled 4.png](https://file.wulicode.com/yuque/202208/24/23/1135iqsQF8B7.png)<br />输出到指定文件夹

