# 2. 语法概览

> https://dart.cn/guides/language/language-tour

## 2.1 Hello, World

<<< @/dart/src/guides/lang/hello.dart

## 2.2 变量定义

不需要显式的生命类型

<<< @/dart/src/guides/lang/variables.dart

### 2.2.1 变量的定义

除了 null 之外, 所有的类型都是对象, 以下是建议的定义方式

```dart

var name = 'duoli';
```

### 2.2.2 空安全

定义空的变量(未启用空安全)

```
int? lineNumber;

// assert 在生产环境会被忽略, 开发过程中如果数据不符会抛出异常
assert(lineCount == null);
```

启用空安全之后所有的变量必须设置初始值

```dart

int lineNumber = 1;
```

### 2.2.3 延迟初始化变量

延迟初始化变量使用 `late` 修饰符

- 声明非空但不在声明时候初始化(例如有一些耗费资源的操作)
- 延迟初始化

```
late String description;
```

### 2.2.4 final 和 const

定义之后均不可更改
final 可以用在实例变量(类属性)中, const 则不可以

```dart{2}
class Point{
    final x;
    
    // 创建常量值
    final bar = const 3.14;
    final foo = const [];
}

```

```

const bar = 10000;
const foo = bar * 3.14;

// 不可以被更改
var foo = const 3.14;
```

> 如果使用 const 修饰类中的变量，则必须加上 static 关键字，即 static const

## 2.3 内置类型

### 2.3.1 Numbers

```

var x = 1;
var hex = 0xEABCDE;

var f = 1.1;
var exp = 1.42e5;

num x = 1; // x 同时有 int 和 double 两个 value
x += 2.5;

// 整数字面量可以赋值给 double
double z = 1;
```

下面是数字和字符串的转换

```
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

常量的定义, 操作数是常量, 则结果也是编译时常量, 也是说只有常量的拼合才能为常量

```
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;
```

### 2.3.2 字符串

```
var s = 'string'

var s = "hello world"

var h = 'hello'
var s = '$h world'

var s = '${h.substring(1, 2)} world' 

var h = s + 'some' // + 拼合

var mlines = """
多行的数据
"""

var mlines = '''
多行的数据
'''

var s = r'I am raw string \n, not escaped'
```

### 2.3.3 布尔类型

布尔值需要显示的调用, 而不允许, `if(nonbooleanValue)` 此类的调用

### 2.3.4 Lists

```
var list = [1, 2, 3]
```

## 2.4 函数

标准函数, 建议函数要添加类型参数声明

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

函数是对象, 并且类型为 Function

### 2.4.1 参数

**命名参数**

```
// Sets the [bold] and [hidden] flags ...
void enableFlags({bool? bold, bool? hidden}) {...}
```

使用命名

```
enableFlags(bold: true, hidden: false);
```

设置默认值

```
// Sets the [bold] and [hidden] flags ...
void enableFlags({bool? bold = true, bool? hidden = false}) {...}

// 调用
enableFlags(hidden: true);
```

命名参数的强制参数, 强制参数仍然可以为空

```
const Scrollbar({super.key, required Widget? child});
```

**位置参数**

> 其他语言中的可选参数以及默认值

```dart
String say(String from, String msg, [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}
```

### 2.4.2 Main 函数

每个 Dart 程序都必须有一个 `main()` 顶级函数作为程序的入口，` main()` 函数返回值为 `void` 并且有一个 `List<String>`
类型的可选参数。

### 2.4.3 函数是对象

> 可以赋值给变量或者传递

### 2.4.4 匿名函数/Lambda 表达式/闭包

没有名称的函数

```
([[类型] 参数[, …]]) {
  函数体;
};
```

闭包函数可以使用箭头函数简写

```
list.map(item) => item.toUpperCase()
```

### 2.4.5 返回

没有值默认返回 null

### 2.4.5 函数作用域

因为函数可以嵌套, 所以内层可以访问外层的参数

## 2.5 运算符

### 2.5.1 算术运算符

### 2.5.2 比较运算符

### 2.5.3 类型运算符

`as` : 类型转换/提示
`is` : 实例判定
`is!` : 实例判定

### 2.5.4 赋值运算符

`??=` : 当变量为 `null` 的时候才进行赋值

### 2.5.5 按位和移位运算符

`>>>` :    无符号右移

### 2.5.6 条件表达式

`??` : null 赋值表达式, 竟然和 php 有异曲同工之妙

### 2.5.7 级联运算符

`..` : 可以在同一个对象上连续调用多个方法, 这个相当于 php 的对象操作符号, 链式操作

这里的前提是不能返回 void/null, 只能返回对象相关值

```
$a  = new Object()
$a->some()
  ->other();
```

```dart

var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

如果级联操作的对象可以为空，则使用空短化级联(`?..`)用于第一次操作。从什么 `?..` 开始保证不会在该空对象上尝试任何级联操作

```
querySelector('#confirm') // Get an object.
  ?..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'))
  ..scrollIntoView();
```

级联运算符可以嵌套

## 2.6 流程控制

### 2.6.1 if/else

### 2.6.2 for

```
for (final object in flybyObjects) {
  print(object);
}
```

for - in

```
for (final c in callbacks) {
  c();
}
```

对象的 forEach

```
var collection = [1, 2, 3];
collection.forEach(print); // 1 2 3
```

### 2.6.3 while

### 2.6.4 Break/Continue

使用 break 可以中断循环

continue 可以进入下一次循环

### 2.6.5 Switch 和 Case

### 2.6.6 断言

断言用于 调试过程中的错误中断, 生产环境不能运行

## 2.7 异常

### 2.7.1 抛出异常

使用 `throw` 关键字抛出一个异常

```
if (astronauts == 0) {
  throw StateError('No astronauts.');
}
```

抛出任意异常(不推荐)

```
throw 'Out of llamas!';
```

异常可以再次抛出

```dart{7}
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}
```

### 2.7.2 捕获异常

```dart{7}
Future<void> describeFlybyObjects(List<String> flybyObjects) async {
  try {
    for (final object in flybyObjects) {
      var description = await File('$object.txt').readAsString();
      print(description);
    }
  } on IOException catch (e, s) {
    // 异常对象
    print('Could not describe object: $e');
    // StackTrace 对象
    print('Stack trace:\n $s');
  } finally {
    flybyObjects.clear();
  }
}
```

和 java 不同的是 Dart 的所有异常都是非必检异常，方法不必声明会抛出哪些异常，并且你也不必捕获任何异常

### 2.7.3 Finally

永远都会执行的语句

```
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

## 2.8 类

支持 mixin 继承机制

```dart
class Spacecraft {
  String name; // 未初始化的实例变量均未 null
  DateTime? launchDate; // 声明, 可为 null

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
      int years = DateTime
          .now()
          .difference(launchDate)
          .inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

### 2.8.1 类成员

使用 `.` 来调用, php 使用 `->`

`?.` 表示 非 null 调用

### 2.8.2 使用构造函数

可以不使用 new 语法

```
var p1 = Point(1, 2);
```

支持常量构造

```
var p1 = const Point(1, 2);
```

常量上下文中可以省略内部常量标识

```dart
// 非常多的常量标识符
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};

// 仅仅一个常量
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
```

### 2.8.3 获取对象的类型

```
object.runtimeType
```

### 2.8.4 实例变量

final 变量

final 仅仅可以赋值一次

### 2.8.5 构造函数

同名函数为构造函数

```
class Point {
  double x = 0;
  double y = 0;

  Point(double x, double y) {
    // See initializing formal parameters for a better way
    // to initialize instance variables.
    this.x = x;
    this.y = y;
  }
}
```

当命名冲突的时候 使用 this 才有意义

**final 初始化**

构造中初始化的参数可以用于初始化非空或 final 修饰的变量

```
class Point {
  final double x;
  final double y;

  // Sets the x and y instance variables
  // before the constructor body runs.
  Point(this.x, this.y);
}
```

**构造函数不会被继承**

子类不会继承父类的构造函数, 如果子类没有声明构造函数, 则只会有一个无参数构造函数

**命名式构造函数**

```
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  // Named constructor
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

子类不能继承父类的命名式构造函数, 如果子类中需要, 则需要显式声明

**调用父类非默认构造函数**

- 默认调用父类匿名无参数构造方法

调用流程

- 初始化列表
- 父类的无参数构造函数
- 当前类的构造函数

如果父类没有匿名无参数构造函数，那么子类必须调用父类的其中一个构造函数，为子类的构造函数指定一个父类的构造函数只需在构造函数体前使用 `:`
指定

```dart
class Person {
  String? firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson().
  Employee.fromJson(super.data) : super.fromJson() {
    print('in Employee');
  }
}

void main() {
  var employee = Employee.fromJson({});
  print(employee);
  // Prints:
  // in Person
  // in Employee
  // Instance of 'Employee'
}
```

传递给父类构造函数的参数不能使用 this 关键字

**超类参数**

超类参数使用 `super` 来调用

**初始化列表**

初始化列表是在构造函数执行前的语句, 语句中不能使用 this 关键字

```dart
import 'dart:math';

class Point {
  final double x;
  final double y;
  final double distanceFromOrigin;

  Point(double x, double y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}

void main() {
  var p = Point(2, 3);
  print(p.distanceFromOrigin);
}
```

**构造函数重定向**

可以理解为初始化列表的一种应用形式

```dart
class Point {
  double x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(double x) : this(x, 0);
}
```

**常量构造函数**

使用 const 关键字来确保实例变量均为 final 来实现该功能

**工厂构造函数**

使用 factory 标识符表示构造函数实例并非总是返回新的实例对象, 比如缓存对象或者子类型

- 工厂构造函数中无法访问 `this`

### 2.8.6 方法

**实例方法**

**操作符方法**

可以实现两个对象的操作, 使用 operator 标识符来进行标记

```dart
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);

  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  @override
  bool operator ==(Object other) =>
      other is Vector && x == other.x && y == other.y;

  @override
  int get hashCode => Object.hash(x, y);
}

void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  assert(v + w == Vector(4, 5));
  assert(v - w == Vector(0, 1));
}
```

**Getter 和 Setter 方法**

非 final 属性还有一个 setter 方法, 并且可以使用 get/set 关键字为属性添加额外的方法, 这里可以理解成 setter 方法的副作用

```
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  double get right => left + width;
  set right(double value) => left = value - width;
  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}
```

**抽象方法**

在抽象类中定义方法

### 2.8.7 抽象类

使用 abstract 标识可以成为抽象类, 抽象类常常会

### 2.8.8 隐式接口

每个类都是接口, 这个在这里可以理解为 class 就是 接口, 类可以多重实现

### 2.8.9 扩展一个类

extends, 继承

**重写类成员**
重写类方法等可以使用 @override 注解来表示

必须遵循以下规范

- 返回类型一致
- 参数一致
- 如果存在位置参数, 则也必须一致
- 方法类型必须一致

可以使用 covariant 来缩小代码中那些符合类型安全的方法参数或实例变量的类型

**noSuchMethod 方法**

如果调用了不存在方法将触发 noSuchMethod 方法,
查看 [更多资料](https://github.com/dart-lang/language/blob/main/archive/feature-specifications/nosuchmethod-forwarding.md)

### 2.8.10 扩展方法

可以向现有库添加功能, 这个是一个比较灵活的功能, 更多[查看](https://dart.cn/guides/language/extension-methods)

### 2.8.11 枚举类型

enums, 用于定义一些固定数量的常量值

Enum 类不能被继承, 实现, 混入, 实例化

**声明**

> 支持尾部 `,`

```dart
enum Color { red, green, blue, }
```

**增强的枚举类型**

- 实例字段必须是 final, 由 mixin 混入的字段
- 实例话构造必须以 const 修饰
- 工厂构造只能返回已知的一个枚举实例
- 不能继承其他类
- 不能重载 index, hashCode, ==
- 不能声明 values 字段
- 实例必须要首先进行声明, 且至少声明一个枚举实例

**使用**

像访问静态变量一样访问枚举

使用 index 获取索引值

```
Color.red.index == 0;

List<Color> colors = Color.values;
assert(colors[0] == Color.blue) 
```

### 2.8.12 mixin

使用 with 关键词, 和 php 的 trait 类似

```dart
class Musician extends Performer with Musical {
  // ···
}
```

未声明构造函数, 使用 mixin 关键词替代 class
dart

```
mixin Musical {

}
```

使用 on 来限定哪些类可以使用

```dart
class Musician {
  // ...
}
mixin MusicalPerformer on Musician {
  // ...
}

class SingerDancer extends Musician with MusicalPerformer {
  // ...
}
```

### 2.8.13 类变量和方法

使用 static 可以声明类方法和变量

## 2.9 泛型

### 2.9.1 泛型的优点

- 帮助代码提示
- 减少代码重复(使用泛型来做构造函数)

### 2.9.2 使用集合字面量

```
var names = <String>[];    // list
var uNames = <String>{}    // set
var uaNames = <String, String>{} // map
```

### 2.9.3 将其作为构造函数

用来构建需要的数据

```
var nameSet = Set<String>.from(names);
var views = Map<int, View>();
```

### 2.9.4 泛型集合以及他们包含的类型

dart 的泛型是固化的, java 的泛型是擦除的

### 2.9.5 限制参数化类型

有时候使用泛型的时候可能会想限制可作为参数的泛型乏味, 也就是参数必须是指定的类型的子类, 这个时候可以使用 extends 关键词

```dart
class Foo<T extends Object> {
  // Any type provided to Foo for T must be non-nullable.
}
```

### 2.9.6 使用泛型方法

方法和参数可以使用类型参数, 用来标识数据的传入和返回的统一性约定

## 2.10 库和可见性

import 和 library 可以创建一个模块化和可共享的代码库

- 下划线开头的成员在代码库中可见
- 每个程序都是一个库, 即使没有使用 library 指定
- dart 的库可以使用 [包工具](https://dart.cn/guides/packages) 来发布或者部署

### 2.10.1 使用库

使用 `import` 来指定命名空间来导入

```dart
// 内置的库
import 'dart:math';

// 封装包
import 'package:test/test.dart';

// 文件系统路径
import 'path/to/my_other_file.dart';
```

**指定库前缀**

如果导入的两个库有冲突, 可以使用 as 来重命名

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;
```

**导入一部分**

使用 show/hide 关键字

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

**延迟加载**

当前只有 js 支持, Flutter 和 DartVM 均不支持

使用 `deferred as` 关键字来标识需要延时加载的代码库

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

实际调用的时候先调用 loadLibrary 函数加载库

```dart
Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

**library 关键词**

指定 library 级别的 文档注释和元注解, 放到文档的起始位置

```dart
/// A really great test library.
@TestOn('browser')
library;
```

### 2.10.2 实现库

访问 [创建依赖库包](https://dart.cn/guides/libraries/create-library-packages) 可以获取有关如何实现库包的建议，包括：

- 如何组织库的源文件。
- 如何使用 export 命令
- 何时使用 part 命令
- 如何使用导入和导出命令实现多平台的库支持

## 2.11 异步

Future 和 Stream 对象的函数是异步的, 在耗时操作执行完毕前直接返回而无需等待

使用 `async` 和 `await` 可以避免回调地狱, 并使代码具有可读性, 从而实现异步编程

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

### 2.11.1 处理 Future

- 使用 await , async 转换为同步函数
- 使用 Future Api

await 表达式的返回值通常是一个 Future 对象；如果不是的话也会自动将其包裹在一个 Future 对象里。 Future 对象代表一个“承诺”，
await 表达式会阻塞直到需要的对象返回

### 2.11.2 声明异步函数

- 使用 async 关键字标记
- 返回值是 Future, 如果没有返回值, 设置返回类型为 `Future<void>`

### 2.11.3 处理 Stream

如果想取值

- 使用 async 关键字和一个异步循环 (`await for`)
- 使用 Stream API

## 2.12 生成器

- 同步生成器, 返回一个 Iterable 对象
- 异步生成器, 返回一个 Stream 对象

## 2.13 可调用类

通过实现类的 call 方法从而实现类的可调用

## 2.14 隔离区

所有的 dart 代码在一个 isolate 中运行, 而非线程, 每个 isolate 都有个单独的执行线程, 并且相互之间不可共享

## 2.15 Typedefs

类型别名, 是引入某一类型的简便方法, 因为关键字是 `typedef`, 所以通常称为 **typedef**

```
typedef IntList = List<int>;
IntList il = [1, 2, 3];
```

类型别名可以有类型参数

## 2.16 元数据

或者称之为注解

注解可以自定义

## 2.17 注释

```dart
// 单行注释

/// 文档注释

/*
 多行注释
 */
```
































































