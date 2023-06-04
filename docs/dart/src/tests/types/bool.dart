import 'package:test/test.dart';

void main() {
  test('bool def', () {
    var x = true;
    expect(x == true, equals(true));
  });

  test('not bool value in if', () {
    // 16 进制的表示方法
    // Error: A value of type 'int' can't be assigned to a variable of type 'bool'
    // if (hex) {
    //   print('error');
    // }
  });

  test('type', () {
    var a = true;
    expect(a.runtimeType.toString(), equals('bool'));
  });
}
