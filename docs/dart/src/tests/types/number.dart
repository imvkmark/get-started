import 'package:test/test.dart';

void main() {
  test('number - parse', () {
    var x = 1;
    expect(x, equals(1));

    expect(int.parse('1'), equals(1));

    expect(double.parse('1.1'), equals(1.1));
  });

  test('hex', () {
    // 16 进制的表示方法
    var hex = 0xA;
    expect(hex.toInt(), equals(10));
  });
}
