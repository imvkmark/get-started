import 'package:test/test.dart';

void main() {
  // 一组不同元素的无序集合
  test('def', () {
    // 集合需要显式声明, 否则可能和 Map 字面量语法冲突

    // 显式定义
    var defDispay = <String>{'my', 'her', 'he'};

    // 隐式定义
    var defHidden = {'my', 'her', 'he'};

    // 类型定义
    Set<String> defType = {'he', 'my'};

    // 长度变为 4
    defHidden.add('qa');

    // 添加相同元素, 长度不变
    defHidden.addAll(defType);

    expect(defHidden.length, equals(4));
  });

  test('const set', () {
    var defConst = const <String>{};
    expect(() {
      // 不支持对常量进行修改, 会抛出异常
      defConst.add('my');
    }, throwsUnsupportedError);
  });

  test('merge', () {
    var defFish = <String>{'haima', 'wugui'};

    var defBird;
    // 支持扩展符和空扩展符号
    // 因为空可以为任意值, 所以空可以追加到列表或者集合
    Set<String> defAnimals = {'cow', ...defFish, ...?defBird};
    expect(defAnimals.length, equals(3));
  });
}
