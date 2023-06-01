import 'package:test/test.dart';

void main() {
  test('int to string', () {
    expect(1.toString(), equals('1'));
  });
  test('double to string', () {
    expect(3.14159265.toStringAsFixed(2), '3.14');
  });
  test('substring', () {
    var hello = 'dartlang';
    expect('${hello.substring(1)}', equals('artlang'));
    expect('${hello.substring(1, 2)}', equals('a'));
  });
}
