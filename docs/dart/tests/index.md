# 单元测试

- 文档地址 : https://pub.dev/documentation/test/latest/
- 安装步骤 : https://pub.dev/packages/test/install

> `test` 提供了在 dart 中编写和运行测试的方法

```
$ dart pub get test --dev
```

## 编写测试

测试使用顶级的 `test()` 函数, 测试断言使用 `expect()`

<<< @/dart/src/tests/write/sample.dart

运行结果:

```
00:00 +0: String.trim() removes surrounding whitespace
00:00 +1: All tests passed!
```

测试支持分组函数 `group()`, 每个分组的描述都会添加到测试描述的开头

<<< @/dart/src/tests/write/group.dart

运行结果:

```
00:00 +0: int .remainder() returns the remainder of division
00:00 +1: int .toRadixString() returns a hex string
00:00 +2: All tests passed!
```

任何来自 [matcher](https://pub.flutter-io.cn/documentation/matcher/latest/matcher/matcher-library.html)
包的匹配器都可以与 `expect()` 一起使用来进行复杂的验证：

<<< @/dart/src/tests/write/complex.dart

运行结果:

```
00:00 +0: .split() splits the string on the delimiter
00:00 +1: All tests passed!
```

同时还还可以使用 `throwsA()` 函数或 `throwsFormatException` 等匹配器来测试异常：

<<< @/dart/src/tests/write/exception.dart

运行结果:

```
00:00 +0: .parse() fails on invalid input
00:00 +1: All tests passed!
```

可以使用 `setUp()` 和 `tearDown()` 函数在测试之间处理/关闭共享代码。 `setUp()`
回调将在组或测试套件中的每个测试之前运行，`tearDown()`
将在测试之后运行。即使测试失败，`tearDown()` 也将运行，以确保正确清理

```dart
import 'package:test/test.dart';

void main() {
  late HttpServer server;
  late Uri url;
  setUp(() async {
    server = await HttpServer.bind('localhost', 0);
    url = Uri.parse('http://${server.address.host}:${server.port}');
  });

  tearDown(() async {
    await server.close(force: true);
    server = null;
    url = null;
  });

  // ...
}
```

## 运行测试

可以使用 `dart test path/to/test.dart` 在单个测试文件上运行（Dart 2.10 以上版本 - 以前的 sdk 版本必须使用 `pub run test`
代替 `dart test`）。

![](https://rawgit.flutter-io.cn/dart-lang/test/master/pkgs/test/image/test1.gif)

可以使用 `dart test path/to/dir` 同时运行多个测试。

![](https://rawgit.flutter-io.cn/dart-lang/test/master/pkgs/test/image/test2.gif)

也可以通过使用 `dart path/to/test.dart` 调用来仅在 Dart VM 上运行测试，但这样不会加载完整的测试运行器，并且会缺少一些功能。

测试运行器将任何以 `_test.dart` 结尾的文件视为测试文件。如果不传递任何路径，它将运行 `test/` 目录中的所有测试文件，可以一次性测试整个应用程序

可以使用 `dart test -n "test name"`
通过名称选择要运行的特定测试用例。将字符串解释为正则表达式，并且只会运行描述（包括任何组描述）与该正则表达式匹配的测试。另外还可以使用 `-N`
标志来运行名称包含纯文本字符串的测试。

默认情况下，测试在 Dart VM 中运行，但也可以通过传递 `dart test -p chrome path/to/test.dart` 在浏览器中运行它们. test
会负责启动浏览器并加载测试，所有结果都将在命令行上报告，就像
VM 测试一样。实际上，甚至可以使用单个命令在两个平台上运行测试：`dart test -p "chrome,vm" path/to/test.dart`

### 测试路径查询

支持测试路径上的一些查询参数，这些参数允许你在这些路径内仅过滤要运行的测试。这些过滤器与传递的任何全局选项合并，并且所有过滤器都必须匹配才能运行测试。

- name：与 `--name` 相同（简单的包含检查）。 这是唯一支持多个条目的选项
- full-name：对测试名称要求完全匹配
- line：匹配测试套件中来自此行的任何测试
- col：匹配测试套件中来自此列的任何测试

示例用法：`dart test "path/to/test.dart?line=10&col=2"`

#### 行/列匹配语义

line 和 col 过滤器针对从调用测试函数的当前堆栈跟踪进行匹配，如果跟踪中的任何帧都满足以下所有条件，则视为匹配：

- URI 地址 与根测试套件 uri 匹配, 这意味着它不会与导入的库中的行匹配。
- 如果传递了 line 和 col，则必须都与 _同一帧(WIP)_ 匹配
- 要匹配的特定行和列由创建堆栈跟踪的工具定义。这通常意味着它们是基于 1 的而不是基于 0 的，但这个包括不控制确切的语义，它们可能会因平台实现而变化。

### 分片测试

还可以使用 `--total-shards` 和 `--shard-index` 参数将测试分片，从而将测试套件拆分并分开运行。例如，如果想要运行测试套件的 3
个分片，可以如下运行它们：

```
dart test --total-shards 3 --shard-index 0 path/to/test.dart
dart test --total-shards 3 --shard-index 1 path/to/test.dart
dart test --total-shards 3 --shard-index 2 path/to/test.dart
```

这将运行测试套件中的所有测试，但每个分片只会运行其中的一部分。如果有一个大型测试套件并想将测试运行并行化以使其运行得更快，则这很有用。

### 乱序测试

可以使用 `--test-randomize-ordering-seed` 参数将测试顺序洗牌。可以使用特定的种子（确定性）或每次运行的随机种子来洗牌测试。例如，考虑以下测试运行：

```
dart test --test-randomize-ordering-seed=12345
dart test --test-randomize-ordering-seed=random
```

设置 `--test-randomize-ordering-seed=0` 与不指定它效果相同，意味着测试顺序将保持不变。

### 选择测试报告

可以使用 `--reporter=<option>` 命令行选项调整测试结果的输出格式。默认格式是 `compact` 紧凑输出格式(单行输出)
，随着测试运行而持续更新。但是，当在 GitHub Actions CI
上运行（通过检查
GITHUB_ACTIONS 环境变量是否为 true 检测到）时，默认格式更改为 github 输出格式 - 为该 CI/CD 系统定制的报告者。

`--reporter` 的可用选项包括：

- compact：单行，持续更新
- expanded：每次更新一行
- github：GitHub Actions 的自定义报告类型
- json：机器可读格式；参见 https://dart.cn/go/test-docs/json_reporter.md

### 收集代码覆盖率

要收集代码覆盖率，可以使用 `--coverage <directory>` 参数运行测试。指定的目录可以是绝对路径或相对路径。如果指定路径处不存在目录，将创建目录。如果存在目录并冲突，则会被覆盖

此选项将在套件级别启用代码覆盖率收集，并在指定的目录中输出结果覆盖率文件。然后可以使用 `package:coverage` `format_coverage`
文件格式化这些文件

目前仅为在 Dart VM 或 Chrome 上运行的测试实现了覆盖率收集

以下是如何运行测试并将收集的覆盖率格式化为 LCOV 的示例：

_官方_

```
## Run Dart tests and output them at directory `./coverage`:
dart run test --coverage=./coverage

## Activate package `coverage` (if needed):
dart pub global activate coverage

## Format collected coverage to LCOV (only for directory "lib")
dart pub global run coverage:format_coverage --packages=.dart_tool/package_config.json --report-on=lib --lcov -o ./coverage/lcov.info -i ./coverage

## Generate LCOV report:
genhtml -o ./coverage/report ./coverage/lcov.info

## Open the HTML coverage report:
open ./coverage/report/index.html
```

_另一个_

```
dart test --coverage coverage
format_coverage -i coverage -o lcov.info --lcov
```

- LCOV 是一个 GNU 工具，它在运行特定测试用例时提供有关程序实际执行（即“覆盖”）的哪些部分的信息。
- genhtml 是 LCOV 工具之一。
- 有关更多信息，请参阅 LCOV 项目：https://github.com/linux-test-project/lcov
- 有关 Homebrew LCOV 公式，请参阅：https://formulae.brew.sh/formula/lcov

> ps: 图示
![](https://file.wulicode.com/note/2023/5-21/lcov-sample.png)

### 限制在特定平台上测试

有些测试文件只有在特定平台上才有意义。它们可能使用 `dart:html` 或 `dart:io`，可能测试 Windows 的特定文件系统行为，或者可能使用仅在
Chrome 中可用的功能。`@TestOn`
注释很容易声明测试文件应在哪些平台上运行。只需在文件顶部放置它，在任何库或导入声明之前：

```
@TestOn('vm')

import 'dart:io';

import 'package:test/test.dart';

void main() {
  // ...
}
```

`@TestOn` 所传递的字符串被称为 `平台选择器`，它指定测试可在哪些平台上运行。它可以是平台名称，也可以是更复杂的像涉及这些平台名称的
Dart 的布尔表达式

还可以通过在包配置文件中添加 [test_on](https://github.com/dart-lang/test/blob/master/pkgs/test/doc/configuration.md#test_on)
字段来声明整个包只在特定平台上工作

### 平台选择器

平台选择器使用 [boolean_selector](https://pub.flutter-io.cn/packages/boolean_selector) 包定义的布尔选择器(boolean
selector syntax)语法，这是 Dart
表达式语法的子集，仅支持布尔运算。定义了以下标识符：

- `vm`：测试是否在命令行 Dart VM 上运行。
- `chrome`：测试是否在 Google Chrome 上运行。
- `firefox`：测试是否在 Mozilla Firefox 上运行。
- `safari`：测试是否在 Apple Safari 上运行。
- `ie`：测试是否在 Microsoft Internet Explorer 上运行。
- `node`：测试是否在 Node.js 上运行。
- `dart-vm`：测试是否在任何上下文的 Dart VM 上运行。它与 `!js` 完全相同。
- `browser`：测试是否在任何浏览器中运行。
- `js`：测试是否已编译为 JS。这与 `!dart-vm` 完全相同。
- `blink`：测试是否在使用 Blink 渲染引擎的浏览器中运行。
- `windows`：测试是否在 Windows 上运行。这只有在 vm 或 node 为 true 时才为真。
- `mac-os`：测试是否在 MacOS 上运行。这只有在 vm 或 node 为 true 时才为真。
- `linux`：测试是否在 Linux 上运行。这只有在 vm 或 node 为 true 时才为真。
- `android`：测试是否在 Android 上运行。如果 vm 为 false，则此选项也为 false，这意味着如果测试在 Android 浏览器上运行，则此选项不为真。
- `ios`：测试是否在 iOS 上运行。如果 vm 为 false，则此选项也为 false，这意味着如果测试在 iOS 浏览器上运行，则此选项不为真。
- `posix`：测试是否在 POSIX 操作系统上运行。这相当于 `!windows`

例如，如果要在每个浏览器上运行测试，但除了 Chrome，可以写 `@TestOn('browser && !chrome')`

### 在 Node.js 上运行测试

测试运行器还支持通过传递 `--platform node` 将测试编译成 JavaScript 并在 Node.js 上运行。请注意，Node
既无法访问 `dart:html` 也无法访问 `dart:io`，因此将使用 js
包调用任何特定于平台的 API。但是，当测试用于 JavaScript 代码的 API 时，它可能很有用。

测试运行器在系统路径上查找名为 node（在 Mac OS 或 Linux 上）或 node.exe（在 Windows 上）的可执行文件。在编译 Node.js
测试时，它传递 `-Dnode=true`
， 因此测试可以使用 `const bool.fromEnvironment('node')` 确定是否在 Node 上运行。它还会设置 `--server-mode`
，这将告诉编译器 `dart:html` 不可用。

如果存在顶级 node_modules 目录，则在 Node.js 上运行的测试可以从该目录导入模块。

## 异步测试

使用 `async/await` 编写的测试将自动工作。测试运行器在返回的 Future 完成之前不会将测试视为完成。

```
import 'dart:async';

import 'package:test/test.dart';

void main() {
  test('Future.value() returns the value', () async {
    var value = await Future.value(10);
    expect(value, equals(10));
  });
}
```

### 未捕获的异步错误

在测试正在运行的区域内抛出的任何未捕获的异步错误都将导致测试被视为失败。如果未捕获的异步错误在执行后被抛出，则可能导致之前被视为已完成且通过的测试变为失败。如果测试套件内的所有测试用例都已完成，则可能会遗漏一些错误，或者在某些情况运行中才出现错误。

通过在完成之前确保所有[未来都有错误处理程序](https://dart.cn/guides/libraries/futures-error-handling#potential-problem-failing-to-register-error-handlers-early)
来避免未捕获的异步错误。

### Future 匹配器

对于更高级的异步性，有许多有用的函数和匹配器。`completion()` 匹配器可用于测试 `Futures`；它确保测试在 `Future`
完成之前不会结束，并对该 `Future` 的值运行匹配器。

```dart
import 'dart:async';

import 'package:test/test.dart';

void main() {
  test('Future.value() returns the value', () {
    expect(Future.value(10), completion(equals(10)));
  });
}
```

`throwsA()` 匹配器和各种 `throwsExceptionType` 匹配器既可以用于同步回调，也可以用于异步 `Future`。它们确保抛出了特定类型的异常

```dart
import 'dart:async';

import 'package:test/test.dart';

void main() {
  test('Future.error() throws the error', () {
    expect(Future.error('oh no'), throwsA(equals('oh no')));
    expect(Future.error(StateError('bad state')), throwsStateError);
  });
}
```

`expectAsync()` 函数嵌套另一个函数，有两个作用。首先，它断言包装的函数被调用了特定次数，如果调用次数过多，将导致测试失败；其次，它会阻止测试完成，直到函数被调用了规定次数

```dart
import 'dart:async';

import 'package:test/test.dart';

void main() {
  test('Stream.fromIterable() emits the values in the iterable', () {
    var stream = Stream.fromIterable([1, 2, 3]);
    stream.listen(expectAsync1((number) {
      expect(number, inInclusiveRange(1, 3));
    }, count: 3));
  });
}
```

### Stream 匹配器

test 包提供了一组强大的匹配器，用于处理异步流。它们表达能力强，可组合，并且使得编写关于流输出的值的复杂结果预期变得容易

例如：

```dart
import 'dart:async';

import 'package:test/test.dart';

void main() {
  test('process emits status messages', () {
    // Dummy data to mimic something that might be emitted by a process.
    var stdoutLines = Stream.fromIterable([
      'Ready.',
      'Loading took 150ms.',
      'Succeeded!'
    ]);

    expect(stdoutLines, emitsInOrder([
      // Values match individual events.
      'Ready.',

      // Matchers also run against individual events.
      startsWith('Loading took'),

      // Stream matchers can be nested. This asserts that one of two events are
      // emitted after the "Loading took" line.
      emitsAnyOf(['Succeeded!', 'Failed!']),

      // By default, more events are allowed after the matcher finishes
      // matching. This asserts instead that the stream emits a done event and
      // nothing else.
      emitsDone
    ]));
  });
}
```

Stream matcher 同样可以匹配 async 包中的 StreamQueue 类，该类允许从流中请求事件，而不是将事件推送给消费者。匹配器将消费匹配的事件，但不会影响队列的其余部分，因此测试仍可以使用它，而普通的
Stream 只能有一个订阅者。

例如:

```dart
import 'dart:async';

import 'package:async/async.dart';
import 'package:test/test.dart';

void main() {
  test('process emits a WebSocket URL', () async {
    // Wrap the Stream in a StreamQueue so that we can request events.
    var stdout = StreamQueue(Stream.fromIterable([
      'WebSocket URL:',
      'ws://localhost:1234/',
      'Waiting for connection...'
    ]));

    // Ignore lines from the process until it's about to emit the URL.
    await expectLater(stdout, emitsThrough('WebSocket URL:'));

    // Parse the next line as a URL.
    var url = Uri.parse(await stdout.next);
    expect(url.host, equals('localhost'));

    // You can match against the same StreamQueue multiple times.
    await expectLater(stdout, emits('Waiting for connection...'));
  });
}

```

以下是可用的内置流匹配器：

- [emits()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/emits.html) 匹配单个数据事件
- [emitsError()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/emitsError.html) 匹配单个错误事件
- [emitsDone](https://pub.flutter-io.cn/documentation/test_api/latest/expect/emitsDone.html) 匹配单个完成事件
- [mayEmit()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/mayEmit.html) 在不需要匹配的情况下消费匹配内部匹配器的事件
- [mayEmitMultiple()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/mayEmitMultiple.html) 与 mayEmit()
  类似，但它尽可能多地将事件与匹配器匹配
- [emitsAnyOf()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/emitsAnyOf.html) 消费与几个可能的匹配器之一（或多个）匹配的事件
- [emitsInOrder()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/emitsInOrder.html) 消费连续匹配多个匹配器的事件
- [emitsInAnyOrder()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/emitsInAnyOrder.html) 与
  emitsInOrder() 类似，但允许匹配器以任意顺序匹配
- [neverEmits()](https://pub.flutter-io.cn/documentation/test_api/latest/expect/neverEmits.html) 匹配在不匹配内部匹配器的情况下完成的流

另外还可以使用 StreamMatcher() 定义自定义流匹配器

## 使用自定义的 html 运行测试

默认情况下，测试运行器将为浏览器测试生成自己的空 HTML 文件。但是，需要自定义 HTML 的测试可以创建自己的文件。这些文件有三个要求：

它们的名称必须与测试的名称相同，并将 .dart 替换为 .html。如果您希望在所有测试中重用 HTML 文件，还可以提供指向 HTML
文件的配置路径。请参见下面的 `提供自定义 HTML 模板`。

它们必须包含带有 `rel="x-dart-test"` 和指向测试脚本的 href 属性的链接标签。

它们必须包含 `<script src="packages/test/dart.js"></script>`。

例如，如果您有一个名为 `custom_html_test.dart` 的测试，您可能会编写以下 HTML 文件：

```html
<!doctype html>
<!-- custom_html_test.html -->
<html>
<head>
    <title>Custom HTML Test</title>
    <link rel="x-dart-test" href="custom_html_test.dart">
    <script src="packages/test/dart.js"></script>
</head>
<body>
// ...
</body>
</html>
```

### 提供自定义 HTML 模板

如果你希望在所有测试中共用同一个 HTML 文件，可以在配置文件中提供 `custom_html_template_path`
配置选项。该文件应遵循上述规则，只是在你希望模板处理器插入它的位置添加一个 `{{testScript}}` 而不是链接标签。

另外还可以选择使用任意数量的 `{{testName}}` 占位符，它们可以被测试文件名替换。

模板不能命名为任何测试文件，因为这会与使用自定义 HTML 机制发生冲突。在这种情况下，将引发错误。

例如 :

```yaml
custom_html_template_path: html_template.html.tpl
```

```html
<!doctype html>
<!-- html_template.html.tpl -->
<html>
<head>
    <title>{{testName}} Test</title>
    {{testScript}}
    <script src="packages/test/dart.js"></script>
</head>
<body>
// ...
</body>
</html>
```

## 测试配置

### 跳过测试

如果测试、组或整个套件尚未工作，并且您只希望它停止运行，可以将其标记为 `skipped`
。将不会运行该测试，并且（如果提供）将打印该原因。通常，跳过测试表示它们应该运行，但暂时不可用。如果它们与平台根本不兼容，则应使用 `@TestOn/testOn`

要跳过测试套件，请在文件顶部放置 `@Skip` 注释：

```dart
@Skip('currently failing (see issue 1234)')
import 'package:test/test.dart';

void main() {
  // ...
}
```

传递的参数应该描述为什么跳过测试。也可以不必编写，但是记录为什么不运行是一个好的习惯

可以通过传递 `skip` 参数来跳过组和单个测试。这可以是 `true` 或 `描述为什么跳过测试的字符串`

例如：

```dart
import 'package:test/test.dart';

void main() {
  group('complicated algorithm tests', () {
    // ...
  }, skip: "the algorithm isn't quite right");

  test('error-checking test', () {
    // ...
  }, skip: 'TODO: add error-checking.');
}
```

### 超时

默认情况下，在 30 秒的不活动期后，测试将超时。超时适用于死锁或测试停止进展的情况，它不保证测试用例或测试套件在任何设定时间内完成。

可以在每个测试、组或套件的基础上配置超时。要更改测试套件的超时，请在文件顶部放置 `@Timeout` 注释：

```dart
@Timeout(Duration(seconds: 45))
import 'package:test/test.dart';

void main() {
  // ...
}
```

除了设置绝对超时之外，还可以使用 `@Timeout.factor` 设置相对于默认值的超时。例如，`@Timeout.factor(1.5)` 将超时设置为默认值的一倍半，即
45 秒。

可以使用 `timeout` 参数为测试和组设置超时。该参数采用与注释相同的 `Timeout` 对象。例如：

```dart
import 'package:test/test.dart';

void main() {
  group('slow tests', () {
    // ...

    test('even slower test', () {
      // ...
    }, timeout: Timeout.factor(2));
  }, timeout: Timeout(Duration(minutes: 1)));
}
```

嵌套超时从最外层到最内层逐个应用。这甚至意味着 `更慢的测试`, 以上例子将花费两分钟超时，因为它将组的超时乘以 2

### 指定平台的配置

有时测试可能需要对不同平台进行不同的配置。Windows 可能会比其他平台慢得多，或者您的 DOM 操作可能在 Safari
上尚未正常工作。对于这些情况，可以使用 `@OnPlatform`
注释和在`test()` 和 `group()` 上使用 `onPlatform` 参数

例如：

```dart
@OnPlatform({
  // Give Windows some extra wiggle-room before timing out.
  'windows': Timeout.factor(2)
})
import 'package:test/test.dart';

void main() {
  test('do a thing', () {
    // ...
  }, onPlatform: {
    'safari': Skip('Safari is currently broken (see #1234)')
  });
}
```

注释和参数都需要一个映射。映射的键是平台选择器，它们描述了专用配置适用的平台。他的值是可用于套件的一些相同注释类的实例：Skip
和 Timeout。值也可以是这些值的列表。

如果有多个平台匹配，则从第一个到最后一个按顺序应用配置，就像它们在嵌套组中一样。这意味着对于基于持续时间的超时这样的配置，最后一个匹配的值会得到匹配

你还可以使用包配置文件设置全局平台特定的配置

### 测试标签

标签是你可以与测试、组和套件关联的短字符串。它们没有任何内置含义，但是它们仍然非常有用：你可以使用它们与自定义配置相关联，或者可以使用它们轻松过滤测试，以便仅运行需要的测试。

使用 `@Tags` 注释为套件定义标签，使用 `tags` 命名参数为 `test()` 和 `group()` 定义标签。

例如：

```dart
@Tags(['browser'])
import 'package:test/test.dart';

void main() {
  test('successfully launches Chrome', () {
    // ...
  }, tags: 'chrome');

  test('launches two browsers at once', () {
    // ...
  }, tags: ['chrome', 'firefox']);
}
```

如果测试在运行过程中遇到在包配置文件中未声明的标签，它将打印警告，因此请确保在该文件中包含所有标签。另外还可以使用该文件为标签提供默认配置，例如超时前将所有浏览器测试时间加倍。

可以通过传递命令行标志来基于标签过滤测试。 `--tags` 或 `-t` 标志将导致测试运行器仅运行具有给定标签的测试，`--exclude-tags`
或 `-x` 标志将导致测试运行器仅运行没有给定标签的测试,
例如, 你可以使用 `--tags "(chrome || firefox) && !slow"` 来选择更快的 chrome/firefox 测试.

请注意，标签必须是有效的 Dart 标识符，尽管它们也可以包含连字符

### 完整包配置

对于跨多个文件或整个包应用的配置，test 支持一个名为 `dart_test.yaml` 的配置文件。在其最简单的情况下，此文件可以包含可以作为命令行参数传递的相同类型的配置：

```yaml
# This package's tests are very slow. Double the default timeout.
timeout: 2x

# This is a browser-only package, so test on chrome by default.
platforms: [ chrome ]
```

配置文件设置了新的默认值。这些默认值仍然可以通过命令行参数覆盖，就像内置默认值一样。在上面的示例中，您仍可以传递 `--platform firefox`
以在 Firefox 上运行。

配置文件可以做得比仅仅设置全局默认值更多。有关更多详细信息，请参阅[完整文档](https://github.com/dart-lang/test/blob/master/pkgs/test/doc/configuration.md)

### 编译标记

测试运行不支持用于控制编译的通用标志，例如 `-D` 定义或像 `--no-sound-null-safety`
这样的标志。在大多数情况下，最好避免编写依赖于细粒度编译器配置的测试。例如，要在声音和无声空安全之间选择，请优先为每个测试选择一个具有默认期望行为的语言版本 -
选择小于
2.12 的语言版本以禁用声音空安全，选择大于 2.12 的语言版本以启用声音空安全。在细粒度配置无法避免的情况下，方法因平台而异。

在浏览器和 node 测试的编译中，可以通过向 `dart compile js` 传递参数（使用 `--dart2js-args` 选项）来配置编译。

针对虚拟机（VM）不支持细粒度的编译配置。任何对整个 VM 的运行时行为产生影响的配置（例如，使用非 const 值时的 -D
定义和运行时行为实验）都将影响测试运行和用于运行测试套件的隔离器。可能会导致测试运行器不兼容的实验可能会在使用 `pub run test`
时使用 `DART_VM_OPTIONS` 环境变量运行，或者在使用 `dart test` 时在 `test` 子命令之前将它们传递给 `dart` 命令。

## Debugging

使用平台内置的开发工具，可以交互式调试测试。在浏览器上运行的测试可以使用浏览器的开发控制台来检查文档、设置断点并逐步调试代码。在Dart
VM上运行的测试可以使用Dart
Observatory的测试。

调试时的第一步是将 `--pause-after-load` 标志传递给测试运行器。这会在每个测试套件加载后暂停浏览器，这样您就有时间打开开发工具并设置断点。对于Dart
VM，它会打印远程调试器URL。

设置断点后，单击网页中间的大箭头或在终端中按Enter开始运行测试。遇到断点时，运行器会在控制测试运行的终端中打开自己的调试控制台。您可以在其中输入 `restart`
，以便尽可能多地重新运行测试，以便弄清楚发生了什么。

通常，浏览器测试在隐藏的 iframe 中运行。但是，在调试时，当前测试套件的 iframe
将扩展填满浏览器窗口，以便您可以查看并与它呈现的任何HTML交互。请注意，Dart动画可能仍然在iframe后面可见；要隐藏它，只需将背景颜色添加到页面的HTML中即可。

## 浏览器/虚拟机 混合测试

为浏览器编写的代码通常需要与某种类型的服务器进行通信。也许你正在测试你的应用程序提供的HTML，也许你正在编写一个使用WebSockets进行通信的库。我们称运行在浏览器和VM上的代码的测试为混合测试。

混合测试使用两个函数之一 `spawnHybridCode()` 和 `spawnHybridUri()`.这两个函数都会产生 Dart VM 隔离区，可以导入 `dart:io`
和其他 VM-only
库。唯一的区别是隔离区的代码来自哪里:
`spawnHybridCode()` 接受实际的Dart代码，而 `spawnHybridUri()` 接受URL。它们都返回一个与混合隔离区进行通信的
StreamChannel。例如:

```dart
// ## test/web_socket_server.dart

// The library loaded by spawnHybridUri() can import any packages that your
// package depends on, including those that only work on the VM.
import 'package:shelf/shelf_io.dart' as io;
import 'package:shelf_web_socket/shelf_web_socket.dart';
import 'package:stream_channel/stream_channel.dart';

// Once the hybrid isolate starts, it will call the special function
// hybridMain() with a StreamChannel that's connected to the channel
// returned spawnHybridCode().
hybridMain(StreamChannel channel) async {
  // Start a WebSocket server that just sends "hello!" to its clients.
  var server = await io.serve(webSocketHandler((webSocket) {
    webSocket.sink.add('hello!');
  }), 'localhost', 0);

  // Send the port number of the WebSocket server to the browser test, so
  // it knows what to connect to.
  channel.sink.add(server.port);
}


// ## test/web_socket_test.dart

@TestOn('browser')
import 'dart:html';

import 'package:test/test.dart';

void main() {
  test('connects to a server-side WebSocket', () async {
    // Each spawnHybrid function returns a StreamChannel that communicates with
    // the hybrid isolate. You can close this channel to kill the isolate.
    var channel = spawnHybridUri('web_socket_server.dart');

    // Get the port for the WebSocket server from the hybrid isolate.
    var port = await channel.stream.first;

    var socket = WebSocket('ws://localhost:$port');
    var message = await socket.onMessage.first;
    expect(message.data, equals('hello!'));
  });
}
```

![](https://rawgit.flutter-io.cn/dart-lang/test/master/pkgs/test/image/hybrid.png)

注意 : 一旦你开始编写混合测试, 确保添加依赖 `stream_channel`

## 对其他包的支持

### build_runner

如果您使用 `package:build_runner` 构建包，则需要在 `dev_dependencies` 中添加对 `build_test`
的依赖，然后就可以使用 `pub run build_runner test` 命令运行测试。

要向 `package:test` 提供参数，您需要使用 `--`
参数将它们与构建参数分开。例如，在发布模式下运行所有Web测试看起来像这样 `pub run build_runner test --release -- -p vm`

### term_glyph

term_glyph 包提供了带有 ASCII 替代方案的 Unicode 符号的
getter。test确保在使用Windows运行时配置为生成ASCII，其中不支持Unicode。这确保测试库可以在POSIX操作系统上使用Unicode而不会破坏Windows用户

## 深度阅读

查看 API 文档以获取有关所有可用于测试的函数的详细信息。

测试运行器还支持基于 JSON 的机器可读报告器。这个报告器允许将测试运行器包装，并以自定义方式呈现其进度(例如，在IDE中)
。有关更多详细信息，请参阅协议文档。
