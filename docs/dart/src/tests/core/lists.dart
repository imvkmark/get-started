import 'package:test/test.dart';

void main() {
  test('list merge', () {
    var list = [
      'hello',
      'world',
    ];
    // 获取
    expect(list[1], equals('world'));

    // 重设
    list[1] = 'nihao';
    expect(list[1], equals('nihao'));

    // 长度
    expect(list.length, equals(2));
  });
}
