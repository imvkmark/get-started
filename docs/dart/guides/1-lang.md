# 1. 语言介绍

Dart 定义为客户端语言, 可以跨平台, 高性能开发, 是 Flutter 基础

## 1.1 语言优势

- 类型安全, 灵活
- 健全的空值安全

查看一个实例

<<< @/dart/guides/src/hello.dart

资源网站

- https://dart.cn/
- https://dart.dev/

## 1.2 获取 SDK

当前仅仅介绍在 Mac 使用

```shell
$ brew tap dart-lang/dart
```

> 这里根据需要选择是否进行代理

```shell
$ proxy
$ brew install dart -vv
$ unproxy
```

升级

```shell
$ brew upgrade dart
```

切换版本, 切换前需要保证版本存在, 如果不确定有哪些版本可以进行搜索

```shell
$ brew search dart
==> Formulae
dart-lang/dart/dart ✔       dart-lang/dart/dart@2.13    dart-lang/dart/dart@2.2     dart-lang/dart/dart@2.8
...
dart-lang/dart/dart@2.12    dart-lang/dart/dart@2.18    dart-lang/dart/dart@2.7     dirt

$ brew install dart@2.18
$ brew unlink dart@<old> && brew unlink dart@<new> && brew link dart@<new>
```

许多工具，如编辑器，要求您指定Dart SDK安装目录。通过 homebrew 安装之后，可以使用

```bash
$ echo `{brew --prefix}`/opt/dart/libexec
/usr/local/opt/dart/libexec
```

查看路径

## 1.3 cli

```
# 安装包
dart pub add {pkg_name}

# 安装 dev 包
dart pub add {pkg_name} --dev
```

## 1.4 库

- `dart:core` : 核心库, 提供内置类型, 集合与其他核心功能
- `dart:collection` : 更丰富的集合类型，诸如队列、链接列表、哈希图和二叉树
- `dart:convert` : 在不同的数据表示形式之间进行转换, 例如 json, utf-8
- `dart:math` : 数学函数, 随机数
- `dart:io` : 为非 Web 应用程序提供的文件、套接字、HTTP 和其他 I/O 支持
- `dart:async` : 异步编程
- `dart:typed_data` : 有效处理固定大小的数据和 SIMD 的数据类型的列表
- `dart:ffi` : c 风格的外部函数接口
- `dart:isolate` : 使用 isolates 的并发编程
- `dart:html` : 基于 web 的浏览器和 dom 以及其他资源的交互

## 1.5 包管理

pubspec 描述文件来支持包的封装

> 文档地址 : https://dart.cn/tools/pub/pubspec

name

包名, 正则格式为 `[a-z0-9_]` , 同时确保不是一个 [dart 的保留字](https://dart.cn/guides/language/language-tour#keywords), 命名保证名字唯一, 精炼, 浅显易懂,
为了保证精炼, 可以在[发布包的网站](https://pub.flutter-io.cn/packages)上来查询是否唯一

## 1.6 平台支持/Flutter

![](https://file.wulicode.com/doc/20230512/1683847908202.png)


- 原生
- web 平台





























