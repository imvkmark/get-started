# [WIP]单元测试

> `test` 提供了在 dart 中编写和运行测试的方法
> ----[test 包文档](https://pub.flutter-io.cn/documentation/test/latest/)

安装

详细步骤 : https://pub.flutter-io.cn/packages/test/install

```
$ dart pub get test --dev
```

## 编写测试

测试使用顶级的 `test()` 函数, 测试断言使用 `expect()`

[1-write.dart](https://github.com/imvkmark/dart-get-started/blob/58626365d1ca8b56e62d03eb8d1bc067e826f830/7_tests/src/1-write.dart#L57-L57)
```dart
import 'package:test/test.dart';

void main() {
  test('String.trim() removes surrounding whitespace', () {
    var string = '  foo ';
    expect(string.trim(), equals('foo'));
  });
}
```

运行结果: 

```
00:00 +0: String.trim() removes surrounding whitespace
00:00 +1: All tests passed!
```


测试支持分组函数 `group()`, 每个分组的描述都会添加到测试描述的开头

```dart
import 'package:test/test.dart';

void main() {
  group('int', () {
    test('.remainder() returns the remainder of division', () {
      expect(11.remainder(3), equals(2));
    });

    test('.toRadixString() returns a hex string', () {
      expect(11.toRadixString(16), equals('b'));
    });
  });
}
```

运行结果: 
```
00:00 +0: int .remainder() returns the remainder of division
00:00 +1: int .toRadixString() returns a hex string
00:00 +2: All tests passed!
```


## 运行测试

### 分片测试

### 乱序测试

### 选择测试报告

### 收集代码覆盖率

### 在特定平台上限制测试

### 平台选择器

### 在 Node.js 上运行测试

## 异步测试

## 测试配置

## 测试标签

## Debugging

## 浏览器/虚拟机 混合测试

## 对其他包的支持

## 深度阅读
