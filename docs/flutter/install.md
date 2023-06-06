# Flutter 安装和环境设置

## 安装

从以下地址下载最新包, 并安装 [在 macOS 上安装和配置 Flutter 开发环境](https://flutter.cn/docs/get-started/install/macos)

```
$ cd ~/development
$ wget https://storage.flutter-io.cn/flutter_infra_release/releases/stable/macos/flutter_macos_3.7.12-stable.zip
$ unzip flutter_macos_3.7.12-stable.zip
```

加入环境变量, 打开 `~/.zshrc`, 这是为了能够可以在命令行访问到 flutter 命令

```
# PATH_OF_FLUTTER_GIT_DIRECTORY 替换为上一步的 flutter 安装路径
$ export PATH="$PATH:[PATH_OF_FLUTTER_GIT_DIRECTORY]/bin"
```

因为 flutter 依赖 dart, 使用以下命令行检测 dart/flutter

```
$ which flutter dart
/Users/duoli/Documents/program/flutter/bin/flutter
/Users/duoli/Documents/program/flutter/bin/dart
```

首次安装之后需要运行

```
$ flutter doctor -v
```

来对系统进行检测, 下面是检测结果

```
[✓] Flutter (Channel master, 2.13.0-0.0.pre.1009, on macOS 12.3.1 21E258 darwin-x64, locale zh-Hans-CN)
[!] Android toolchain - develop for Android devices (Android SDK version 31.0.0-rc1)
    ✗ cmdline-tools component is missing
      Run `path/to/sdkmanager --install "cmdline-tools;latest"`
      See https://developer.android.com/studio/command-line for more details.
    ✗ Android license status unknown.
      Run `flutter doctor --android-licenses` to accept the SDK licenses.
      See https://flutter.dev/docs/get-started/install/macos#android-setup for more details.
[!] Xcode - develop for iOS and macOS (Xcode 13.3.1)
    ✗ CocoaPods installed but not working.
        You appear to have CocoaPods installed but it is not working.
        This can happen if the version of Ruby that CocoaPods was installed with is different from the one being used to invoke it.
        This can usually be fixed by re-installing CocoaPods.
      To re-install see https://guides.cocoapods.org/using/getting-started.html#installation for instructions.
[✓] Chrome - develop for the web
[✓] Android Studio (version 2021.2)
[✓] IntelliJ IDEA Ultimate Edition (version 2022.1)
[✓] IntelliJ IDEA Ultimate Edition (version 2022.1)
[✓] VS Code (version 1.66.2)
[✓] VS Code (version 1.62.0-insider)
[✓] Connected device (2 available)
[✓] HTTP Host Availability
```

### 加速 pub 源, storage, git 的访问

`.bashrc`, `.zshrc` 中配置详细

```
# pub
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

# git to upgrade flutter
export FLUTTER_GIT_URL=https://mirrors.tuna.tsinghua.edu.cn/git/flutter-sdk.git
```

更多源可以访问 [Using Flutter in China | Flutter](https://docs.flutter.dev/community/china)

### 更换 Storage 源[清华源]

Flutter 安装时需要从 Google Storage 下载文件，如您的网络访问 Google 受阻，建议更换镜像。使用方法为设置环境变量 FLUTTER_STORAGE_BASE_URL，并指向 TUNA 镜像站。

```
$ export FLUTTER_STORAGE_BASE_URL="https://mirrors.tuna.tsinghua.edu.cn/flutter"
```

若希望长期使用 TUNA 镜像：

```
$ echo 'export FLUTTER_STORAGE_BASE_URL="https://mirrors.tuna.tsinghua.edu.cn/flutter"' >> ~/.bashrc
```

这样运行以下命令便可更新 flutter

```
source ~/.bashrc
```

此外 Flutter 开发中还需要用到 Dart 语言的包管理器 Pub，其镜像使用方法参见Pub 镜像安装帮助。

### 升级和频道切换

升级

```
# 列出所有的频道
$ flutter channel
Flutter channels:
* master
  beta
  stable

# 更换频道
$ flutter channel stable
git: 分支 'stable' 设置为跟踪 'origin/stable'。
Successfully switched to flutter channel 'stable'.
To ensure that you're on the latest build from this channel, run 'flutter upgrade'

# 升级
$ flutter upgrade

# 自检
$ flutter doctor -v
```

## Android

### 设置 Android SDK

**设置 Android SDK 路径**

```
$ echo 'export ANDROID_HOME="/path/to/android/sdk/"' >> ~/.bashrc
```

**更新 Flutter 需要的SDK**这里的版本可能会有不同, 这里有以下提示

```
Flutter requires Android SDK 28 and the Android BuildTools 28.0.3
    To update using sdkmanager, run:
        "/path/to/android-sdk/tools/bin/sdkmanager" "platforms;android-28" "build-tools;28.0.3"
```

```
$ /path/to/android-sdk/tools/bin/sdkmanager "platforms;android-28""build-tools;28.0.3"
Warning: File /Users/duoli/.android/repositories.cfg could not be loaded.
[=======================================] 100% Unzipping... android-9/zipalign
```

**License**

```
$ flutter doctor --android-licenses
```

### 安装 Flutter Plugin & Dart Plugin

[Install The Plugins](https://flutter.dev/docs/get-started/editor#installing-the-plugins)

1. 打开 Android Studio.
2. 打开插件 `Preferences > Plugins on macOS, File > Settings > Plugins on Windows & Linux`
3. 选择 Flutter plugin 并且点击安装.
4. 点击 Yes 当提示安装 Dart 插件的时候.
5. 安装完成之后根据提示重启.

### 安装命令行工具

搜索 Android SDK, 安装 SDK Command-line Tools

![](https://file.wulicode.com/doc/20230515/1684121531648.png)

## iOS

### 设置 iOS toolchain

**libimobiledevice**

```
$ brew update
$ brew install --HEAD usbmuxd
$ brew link usbmuxd
$ brew install --HEAD libimobiledevice
$ brew install ideviceinstaller
```

**ios-deploy**

```
$ brew install ios-deploy
```

**CocoaPods**

> CocoaPods installed but not working
>

```
$ brew install cocoapods
$ brew reinstall cocoapods
$ brew link --overwrite cocoapods
```

## FAQ

### Flutter 编译时Running Gradle task ‘assembleDebug’… 卡住

修改项目android文件夹中 build.gradle文件如下（使用阿里的镜像）：

```groovy
buildscript {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.3'
    }
}
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google' }
    }
}
```

### Dash Document

Dash 是一个优秀的本地文档查询工具, 通过添加 feed 就可以在本地添加快速搜索

```
https://master-api.flutter.dev/offline/flutter.xml
```

位置 `Dash → Setting → Download → Add Feed Xml`

![](https://file.wulicode.com/doc/20230515/1684121504320.png)

查询结果如下所示

![](https://file.wulicode.com/doc/20230515/1684121485979.png)