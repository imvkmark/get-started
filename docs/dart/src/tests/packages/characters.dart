import 'package:characters/characters.dart';
import 'package:test/test.dart';

/**
 * 需要首先添加
 * dart pub add characters
 */
void main() {
  test('emoji', () {
    // 使用 characters 可以更好的处理多字节字符
    var str = 'hi 🇨🇳';

    // will bi `The end of the string: �`
    print('The end of the string: ${str.substring(str.length - 1)}');
    expect(str.characters.last, equals('🇨🇳'));
  });
}
