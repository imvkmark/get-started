# 安装

## 使用 brew 安装

```
$ brew tap dart-lang/dart
```

> 这里根据需要选择是否进行代理

```
$ proxy
$ brew install dart -vv
$ unproxy
```

升级

```
$ brew upgrade dart
```

许多工具，如编辑器，要求您指定Dart SDK安装目录。通过 homebrew 安装之后，可以使用

```bash
echo `{brew --prefix}`/opt/dart/libexec
```

查看路径

## 和 Flutter 一起安装