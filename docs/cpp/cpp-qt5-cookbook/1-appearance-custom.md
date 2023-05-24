# C++ / Qt5 Cookbook - 1. 外观和自定义

### 1.1 IDE 界面说明

![](https://file.wulicode.com/yuque/202208/04/14/5639FhsC04Zn.jpg?x-oss-process=image/resize,h_764)

```
1   : 菜单栏
2   : 插件
3   : 模式选择
4   : 快速构建
5   : 编辑器
6   : 编辑器工具栏
7   : 对象选择器
8   : 属性编辑器
9   : 动作编辑 / 信号编辑
10  : 输出面板
      - 解决方案
      - 搜索结果
      - 应用输出
```

### 1.2 样式定义

**样式**

```
/*整体样式*/
* {
    border:1px solid #ccc;
}
/*指定button样式*/
QPushButton{
    border:1px solid red;
}
/*单个button 样式*/
QPushButton#submit{
    border:1px solid blue;
}
```

### 1.3 布局和样式

layout 不能赋值样式, 将其转换为 QWidget 可以设置样式

```
/* 主要样式 */
#centralWidget { 
    background: rgba(32, 80, 96, 100); 
}
/* 渐变色 */
#topPanel2 { 
    background-color:qlineargradient(spread:reflect, x1:0.5, y1:0, x2:0, y2:0,  stop:0 rgba(91, 204, 233, 100), stop:1 rgba(32,80,96,100));
}
/* 鼠标滑过颜色 */
QPushButton{
    color: white;
    background-color: #27a9e3;
    border-
    border-radius: 3px;
}
QPushButton:hover { 
    background-color: #66c011; 
}
```

**样式中使用资源**

使用 `.qrc` 文件来管理资源文件

- 添加前缀
- 添加文件

> 最好能够在文件目录好好的组织图片资源, 这样实现位置和 qrc 定义的统一性

予记:

![](https://file.wulicode.com/yuque/202208/04/14/5639Cg3MKzUQ.jpg?x-oss-process=image/resize,h_622)

### 1.4 自定义属性和子控制

**伪类**

```
QPushButton 
    : hover
    : pressed
    : active
    : disabled
    : enabled
    : open
    : flat
```

**自定义属性**

样式定义, 注意这里的 `QPushButton` 和 `属性`之间不得存在空格

```
// 不得存在空格
QPushButton[pagematches=true] {
    background:red
}
```

代码中对属性的定义

```
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    // 这里设置自定义按钮的属性
    // pushButton 是 UI 中 pushButton 的 ID
    ui->pushButton->setProperty("pagematches", true);
}
```

指定的类

```
QSpinBox::down-button{
    
}
```

### 1.5 使用 QML 编写样式

QML 是 Qt Meta Language/Qt Model Language 是基于 js 的用户标记语言.

#### 1.5.1 快速应用

创建一个窗口并且调用 MainForm UI

```
import QtQuick 2.6
import QtQuick.Window 2.2
Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")
    MainForm {
        anchors.fill: parent
        mouseArea.onClicked: {
            console.log(qsTr('Clicked on background. Text: "' + textEdit.text + '"'))
        }
    }
}
```

main.cpp

```
...
    QQmlApplicationEngine engine;
    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));
...
```

#### 1.5.2 编辑界面

![](https://file.wulicode.com/yuque/202208/04/14/5640U4ohQaUm.jpg?x-oss-process=image/resize,h_754)

```
1    : 导航区域
2    : 库 (可以自定义自己的QML组件)
3    : 资源
4    : 导入, 导入不同的QML模块, 比如蓝牙, webkit, 定位.
5    : 状态面板
6    : 属性面板
7    : 画布
```

#### 1.5.3 暴露QML对象给C++ (需要复习)

这个地方需要 c++ 类的知识, 我现在不会, 需要复习/学习过之后才能看懂, 现在看不懂, 出错也不能够调整, 😌

