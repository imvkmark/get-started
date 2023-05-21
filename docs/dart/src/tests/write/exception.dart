import 'package:test/test.dart';

void main() {
  test('.parse() fails on invalid input', () {
    expect(() => int.parse('X'), throwsFormatException);
  });
}
