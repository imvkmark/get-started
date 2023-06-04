import 'package:test/test.dart';

void main() {
  // 一组不同元素的无序集合
  test('def', () {
    // 隐形定义
    var defHidden = {'my': 'duoli', 'her': 'qa', 'he': 'mark'};

    // 显式定义
    var defDisplay = <String, String>{
      'my': 'duoli',
      'her': 'qa',
      'you': 'mark'
    };

    // 类型定义
    defHidden.addAll(defDisplay);

    expect(defHidden.length, equals(4));

    expect(defHidden['her'], equals('qa'));

    // 获取空数据
    expect(defHidden['null'], equals(null));
  });

  test('const', () {
    var defConst = const {'my': 'duoli'};

    // 不支持修改常量
    expect(() {
      defConst.addAll({'you': 'mark'});
    }, throwsUnsupportedError);
  });

  test('merge', () {
    // 隐形定义
    var defHidden = {'my': 'duoli', 'her': 'qa', 'he': 'mark'};

    var defNull;
    // 扩展符合并, 支持 null 添加
    var defDisplay = <String, String>{
      'my': 'duoli',
      'her': 'qa',
      'you': 'mark',
      ...defHidden,
      ...?defNull
    };

    expect(defDisplay.length, equals(4));
  });
}
