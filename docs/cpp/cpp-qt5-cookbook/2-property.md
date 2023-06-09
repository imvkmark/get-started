# C++ / Qt5 Cookbook - 2. 状态和特效

### 2.1 属性动态

```
// 属性动态特效
QPropertyAnimation *animation = new QPropertyAnimation(ui->pushButton, "geometry");
animation->setDuration(3000);
animation->setStartValue(ui->pushButton->geometry());
animation->setEndValue(QRect(200, 200, 100, 50));
// 持续时间和启动
// -1 for 无限
animation->setLoopCount(4);
animation->start();
```

QT 提供了几个不同的子系统来创建 gui 的动画

- Timer: 定时器, 根据时间点来重复一些东西
- Timeline : 一个时间区域内的动画.
- 动画框架
- 状态框架 : 定义了一组类改变图形状态, 从一个状态更换到另外一个状态.
- 图形视图框架 : 例如 2D

### 2.2 使用渐近曲线控制属性动画

```
//  时间线特效
QEasingCurve curve;
curve.setType(QEasingCurve::OutBounce);
curve.setAmplitude(1.00);
curve.setOvershoot(1.70);
curve.setPeriod(0.3);
animation->setEasingCurve(curve);
// 持续时间和启动
// -1 for 无限
animation->setLoopCount(4);
animation->start();
```

- amplitude : 振幅
- overshoot : 超出
- period : 设置一个小值来获得高频度, 设置大值来获得一个小频度

**动作曲线**

![](https://file.wulicode.com/yuque/202208/04/22/535037Hk9IJP.jpg?x-oss-process=image/resize,h_622)

### 2.3 创建动画组

```
// create group
QPropertyAnimation *animation1 = new QPropertyAnimation(ui->pushButton_1, "geometry");
animation1->setDuration(3000);
animation1->setStartValue(ui->pushButton_1->geometry());
animation1->setEndValue(QRect(200, 200, 100, 50));
QPropertyAnimation *animation2 = new QPropertyAnimation(ui->pushButton_2, "geometry");
animation2->setDuration(3000);
animation2->setStartValue(ui->pushButton_2->geometry());
animation2->setEndValue(QRect(200, 200, 100, 50));
QPropertyAnimation *animation3 = new QPropertyAnimation(ui->pushButton_3, "geometry");
animation3->setDuration(3000);
animation3->setStartValue(ui->pushButton_3->geometry());
animation3->setEndValue(QRect(200, 200, 100, 50));
animation1->setEasingCurve(curve);
animation2->setEasingCurve(curve);
animation3->setEasingCurve(curve);
// add group
QParallelAnimationGroup *group = new QParallelAnimationGroup();
group->addAnimation(animation1);
group->addAnimation(animation2);
group->addAnimation(animation3);
group->start();
```

更多说明:

QParallelAnimationGroup : 平行特效, 同时运行

QSequentialAnimationGroup : 序列特效

### 2.4 创建嵌套的动画组

```
// 定义动作
QPropertyAnimation *animation1 = new QPropertyAnimation(ui->pushButton, "geometry");
animation1->setDuration(3000);
animation1->setStartValue(ui->pushButton->geometry());
animation1->setEndValue(QRect(50, 50, 100, 50));
QPropertyAnimation *animation2 = new QPropertyAnimation(ui->pushButton_2, "geometry");
animation2->setDuration(3000);
animation2->setStartValue(ui->pushButton_2->geometry());
animation2->setEndValue(QRect(150, 50, 100, 50));
QPropertyAnimation *animation3 = new QPropertyAnimation(ui->pushButton_3, "geometry");
animation3->setDuration(3000);
animation3->setStartValue(ui->pushButton_3->geometry());
animation3->setEndValue(QRect(250, 50, 100, 50));
QPropertyAnimation *animation4 = new QPropertyAnimation(ui->pushButton_4, "geometry");
animation4->setDuration(3000);
animation4->setStartValue(ui->pushButton_4->geometry());
animation4->setEndValue(QRect(50, 200, 100, 50));
QPropertyAnimation *animation5 = new QPropertyAnimation(ui->pushButton_5, "geometry");
animation5->setDuration(3000);
animation5->setStartValue(ui->pushButton_5->geometry());
animation5->setEndValue(QRect(150, 200, 100, 50));
QPropertyAnimation *animation6 = new QPropertyAnimation(ui->pushButton_6, "geometry");
animation6->setDuration(3000);
animation6->setStartValue(ui->pushButton_6->geometry());
animation6->setEndValue(QRect(250, 200, 100, 50));
// 定义动效曲线
QEasingCurve curve;
curve.setType(QEasingCurve::OutBounce);
curve.setAmplitude(1.00);
curve.setOvershoot(1.70);
curve.setPeriod(0.30);
// 应用动效曲线
animation1->setEasingCurve(curve);
animation2->setEasingCurve(curve);
animation3->setEasingCurve(curve);
animation4->setEasingCurve(curve);
animation5->setEasingCurve(curve);
animation6->setEasingCurve(curve);
// 定义动效分组
QParallelAnimationGroup *group1 = new QParallelAnimationGroup();
group1->addAnimation(animation1);
group1->addAnimation(animation2);
group1->addAnimation(animation3);
QParallelAnimationGroup *group2 = new QParallelAnimationGroup();
group2->addAnimation(animation4);
group2->addAnimation(animation5);
group2->addAnimation(animation6);
// 序列动效分组
QSequentialAnimationGroup *groupAll = new QSequentialAnimationGroup();
groupAll->addAnimation(group1);
groupAll->addAnimation(group2);
groupAll->start();
```

### 2.5 状态转换

```
// 状态
QStateMachine *machine = new QStateMachine(this);
// 状态定义
QState *s1 = new QState();
s1->assignProperty(ui->state_label, "text", "当前状态:A");
s1->assignProperty(ui->pushButton, "geometry", QRect(50,200,100, 50));
QState *s2 = new QState();
s2->assignProperty(ui->state_label, "text", "当前状态:B");
s2->assignProperty(ui->pushButton, "geometry", QRect(200,50,140, 100));
// 变换特效
QPropertyAnimation *animation = new QPropertyAnimation(ui->pushButton, "geometry");
animation->setEasingCurve(QEasingCurve::OutBounce);
// 定义事件
QEventTransition *t1 = new QEventTransition(ui->change_state, QEvent::MouseButtonPress);
t1->setTargetState(s2);
t1->addAnimation(animation);
s1->addTransition(t1);
QEventTransition *t2 = new QEventTransition(ui->change_state, QEvent::MouseButtonPress);
t2->setTargetState(s1);
t2->addAnimation(animation);
s2->addTransition(t2);
// 添加状态
machine->addState(s1);
machine->addState(s2);
// 设置初始状态
machine->setInitialState(s1);
// 开始运行
machine->start();
```

### 2.6 状态变形, 动画 In QML

```
// 透明度循环播放
SequentialAnimation on opacity {
  NumberAnimation {
      to :0.0;
      duration:200;
  }
  NumberAnimation {
      to :1.0;
      duration:200;
  }
  loops: Animation.Infinite
}
   
// 无限旋转
NumberAnimation on rotation {
  from:0;
  to:360;
  duration: 2000;
  loops: Animation.Infinite;
}
// 颜色无限循环
SequentialAnimation on color {
  ColorAnimation {
      to: "yellow";
      duration: 1000
  }
  ColorAnimation {
      to: "red";
      duration: 1000
  }
  ColorAnimation {
      to: "blue";
      duration: 1000
  }
  loops: Animation.Infinite;
}
```

特效说明

Anchor   : 锚点动画

Color    : 颜色动画

Number   : 数值动画

Parent   : 父元素动画

Path     : 路径动画

Property : 属性动画

Rotation : 旋转动画

Vector3D : 3D动画

### 2.7 动画插件属性

### 2.8 图片精灵动画

