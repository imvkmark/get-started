---
description: 'javax.swing.JFrame是Swing窗口容器。其构造方法可设置标题；窗口管理包括设置大小、位置、关闭操作；外观设置可调整背景色、边框等；图标设置通过setIconImage定义窗口图标；内容管理使用getContentPane添加组件；其他操作如可见性、布局设置、窗口监听等。'
lastUpdated: '2026-06-30 09:45:55'
head:
  - - meta
    - name: 'og:title'
      content: 'javax.swing.JFrame'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'javax.swing.JFrame是Swing窗口容器。其构造方法可设置标题；窗口管理包括设置大小、位置、关闭操作；外观设置可调整背景色、边框等；图标设置通过setIconImage定义窗口图标；内容管理使用getContentPane添加组件；其他操作如可见性、布局设置、窗口监听等。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/swing-jframe.html'
---
# javax.swing.JFrame

## 构造方法

`JFrame()`

创建一个没有标题的默认 `JFrame` 实例。

`JFrame(String title)`

创建一个具有指定标题的 `JFrame` 实例。

`JFrame(GraphicsConfiguration gc)`

创建一个默认的 `JFrame` ，并使用指定的 `GraphicsConfiguration` 。

`JFrame(String title, GraphicsConfiguration gc)`

创建一个具有指定标题并使用指定 `GraphicsConfiguration` 的 `JFrame`

## 窗口管理

`void setDefaultCloseOperation(int operation)`

设置用户在此窗口上发出 "close" 窗口事件时默认执行的操作。

`int getDefaultCloseOperation()`

返回用户在此窗口上发出 "close" 窗口事件时执行的默认操作。

`void setTitle(String title)`

设置窗口的标题。

`String getTitle()`

获取窗口的标题。

---

## 外观设置

`void setExtendedState(int state)`

设置窗口的扩展状态（最大化、最小化等）。

`int getExtendedState()`

获取窗口的扩展状态。

`void setResizable(boolean resizable)`

设置此窗口是否可调整大小。

`boolean isResizable()`

判断此窗口是否可调整大小。

`void setUndecorated(boolean undecorated)`

设置此窗口是否没有装饰。

`boolean isUndecorated()`

判断此窗口是否没有装饰。

---

## 图标设置

`void setIconImage(Image image)`

设置窗口的图标图像。

`Image getIconImage()`

获取窗口的图标图像。

---

## 内容管理

`Container getContentPane()`

获取此窗口的内容窗格。

`void setContentPane(Container contentPane)`

设置此窗口的内容窗格。

`JRootPane getRootPane()`

获取此窗口的根窗格。

`void setGlassPane(Component glassPane)`

设置此窗口的玻璃窗格。

`Component getGlassPane()`

获取此窗口的玻璃窗格。

`JLayeredPane getLayeredPane()`

获取此窗口的分层窗格。

`void setLayeredPane(JLayeredPane layeredPane)`

设置此窗口的分层窗格。

---

## 其他操作

`void dispose()`

释放窗口及其所有子组件的资源。

`boolean isActive()`

判断此窗口是否为活动窗口。

`void setVisible(boolean visible)`

设置窗口的可见性。

`boolean isVisible()`

判断窗口是否可见。

`JFrame` 的方法主要分为设置窗口属性（如标题、图标、菜单栏）和控制窗口行为（如可见性、关闭操作）。

此外， `JFrame` 继承了多层父类的方法，如 `java.awt.Frame` , `java.awt.Window` , 和 `java.awt.Component` ，提供了对窗口和组件的更细粒度控制