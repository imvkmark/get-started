# 安装

Mac 使用 brew 安装

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
