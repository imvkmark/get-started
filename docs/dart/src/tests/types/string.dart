import 'package:test/test.dart';

void main() {
  test('int to string', () {
    expect(1.toString(), equals('1'));
  });
  test('double to string', () {
    expect(3.14159265.toStringAsFixed(2), '3.14');
  });

  // substring 的截取方式 和 php 以及 java 都不同
  test('substring', () {
    var dl = 'dartlang';
    expect(dl.substring(1), equals('artlang'));
  });

  test('字符串拼接/组合', () {
    var dl = 'dartlang';
    // 使用 + 进行字符组合
    expect('hello ' + dl, equals('hello dartlang'));

    // 不使用 + , 换行也可拼接
    expect(
        'hello '
        'dartlang',
        equals('hello dartlang'));

    // 可以进行快捷运算
    expect('${dl.substring(1)}', equals('artlang'));
    expect('${dl.substring(1, 2)}', equals('a'));

    // 可以进行快捷输出
    expect('I love $dl', equals('I love dartlang'));

    // 创建多行
    dl = '''
more line string
''';
    expect(dl, equals('more line string\n'));

    // 多行的组合形式
    dl = """more
line""";
    expect(dl.indexOf('\n') > 0, equals(true));

    dl = r'MY\nLOVE';
    expect(dl.indexOf(r'\n') > 0, equals(true));
  });
}
