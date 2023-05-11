---
outline : 'deep'
---

# 2. 语法概览

## 语言概览

### Hello, World

<<< @/dart/guides/src/hello.dart

### 变量

不需要显式的生命类型

<<< @/dart/guides/src/variables.dart

### 流程控制

```dart
for (final object in flybyObjects) {
  print(object);
}
```

### 函数

标准函数

```dart
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

箭头函数, Java 中是瘦箭头(->)

```
flybyObjects.where((name) => name.contains('turn')).forEach(print);
```

### 注释

```dart
// 单行注释

/// 文档注释

/*
 多行注释
 */
```

### 导入

```dart
import 'dart:math';

import 'package:test/test.dart'

import 'path/to/my_other_file.dart'
```

### 类

```dart
class Spacecraft {
  String name;
  DateTime? launchDate;

  // 只读非 final 属性
  int? get launchYear => launchDate?.year;

  // 携带语法糖的构造器
  Spacecraft(this.name, this.launchDate) {
    // Initialization code goes here.
  }

  // 指向默认的命名构造器
  Spacecraft.unlaunched(String name) : this(name, null);

  // 方法
  void describe() {
    print('Spacecraft: $name');
    // Type promotion doesn't work on getters.
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

### 枚举

```dart
enum PlanetType { terrestrial, gas, ice }
```

增强型枚举

```dart
/// 枚举太阳系中的行星和他们的属性
enum Planet {
  mercury(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  venus(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  // ···
  uranus(planetType: PlanetType.ice, moons: 27, hasRings: true),
  neptune(planetType: PlanetType.ice, moons: 14, hasRings: true);

  /// 实例生成器
  const Planet(
      {required this.planetType, required this.moons, required this.hasRings});

  /// 所有实例变量都是 final 类型
  final PlanetType planetType;
  final int moons;
  final bool hasRings;

  /// 增强型的 Getter
  bool get isGiant =>
      planetType == PlanetType.gas || planetType == PlanetType.ice;
}
```

增强型枚举的引用

```dart
final yourPlanet = Planet.earth;

if (!yourPlanet.isGiant) {
  print('Your planet is not a "giant planet".');
}
```

### 继承(扩展类)

```dart
class Orbiter extends Spacecraft {
  double altitude;

  Orbiter(super.name, DateTime super.launchDate, this.altitude);
}
```

### Mixins

类似于 php 中的 trait

```dart
mixin Piloted {
  int astronauts = 1;

  void describeCrew() {
    print('Number of astronauts: $astronauts');
  }
}
```

使用的时候写在类定义的一行中, 使用 with

```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ···
}
```

### 接口和抽象类

Dart 没有 `interface` 关键字, 所有的类都可以是 `interface` 被实现, dart 中成为这种实现方式是隐式接口

```dart
class MockSpaceship implements Spacecraft {
  // ···
}
```

为了把类和其他类做区别, 可以创建抽象类, 抽象类中可以包含抽象方法

```dart
abstract class Describable {
  void describe();

  void describeWithEmphasis() {
    print('=========');
    describe();
    print('=========');
  }
}
```

### 异步

使用 `async` 和 `await` 可以避免回调地狱, 并使代码具有可读性

```dart
const oneSecond = Duration(seconds: 1);
// ···
Future<void> printWithDelay(String message) async {
  await Future.delayed(oneSecond);
  print(message);
}
```

这个示例可以让代码看起来比较清爽, 如果不知道不清爽的代码, 也就不必知道了

```dart
Future<void> createDescriptions(Iterable<String> objects) async {
  for (final object in objects) {
    try {
      var file = File('$object.txt');
      if (await file.exists()) {
        var modified = await file.lastModified();
        print(
            'File for $object already exists. It was modified on $modified.');
        continue;
      }
      await file.create();
      await file.writeAsString('Start describing $object in this file.');
    } on IOException catch (e) {
      print('Cannot create description for $object: $e');
    }
  }
}
```

使用 `async*` 关键字, 可以为你提供一个可读性更好的方式去生成 Stream

```
Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (final object in objects) {
    await Future.delayed(oneSecond);
    yield '${craft.name} flies by $object';
  }
}
```

### 异常

使用 `throw` 关键字抛出一个异常

```dart
if (astronauts == 0) {
  throw StateError('No astronauts.');
}
```

```dart{7}
Future<void> describeFlybyObjects(List<String> flybyObjects) async {
  try {
    for (final object in flybyObjects) {
      var description = await File('$object.txt').readAsString();
      print(description);
    }
  } on IOException catch (e) {
    print('Could not describe object: $e');
  } finally {
    flybyObjects.clear();
  }
}
```














































































