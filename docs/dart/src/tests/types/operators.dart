import 'package:test/test.dart';

void main() {
  test('算术运算符', () {
    // 除并取整
    expect(35 ~/ 3, equals(11));

    // 取余
    expect(35 % 3, equals(2));
  });
}
