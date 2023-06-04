import 'package:test/test.dart';

void main() {
  test('list syntax', () {
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

    // 对数组进行扩展
    var list2 = ['dart', 'lang'];
    var list3 = ['hello', ...list2];
    expect(list3.length, equals(3));

    // ? 可以合并 null 的异常数据
    var list5;
    var list4 = ['hello', ...?list5];
    expect(list4.length, equals(1));
  });

  test('const list', () {
    var list = const [1, 2, 3];
    expect(() {
      // 不支持对下标进行修改, 会抛出未支持错误
      list[1] = 4;
    }, throwsUnsupportedError);
  });
  test('if append', () {
    var list = const [1, 2, if (true) 4];
    expect(list.length, 3);
  });

  test('for append', () {
    var list = [1, 2, 3];

    var listStr = ['#0', for (var i in list) '#$i'];
    expect(listStr[1], equals('#1'));
  });
}
