---
description: 'JMenuBar()创建一个新的空菜单栏。void add(JMenu menu)将指定的菜单添加到菜单栏。void remove(JMenu menu)从菜单栏中移除指定的菜单。void remove(int index)根据索引从菜单栏中移除菜单。int getMenuCount()返回菜单栏中菜单的数量。JMenu getMenu(int index)根据索引获取菜单栏中的菜单。void setMargin(Insets m)设置菜单栏的边距。Insets getMargin()获取菜单栏的边距。void setBord'
lastUpdated: '2025-12-06 15:32:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'javax.swing.JMenuBar'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JMenuBar()创建一个新的空菜单栏。void add(JMenu menu)将指定的菜单添加到菜单栏。void remove(JMenu menu)从菜单栏中移除指定的菜单。void remove(int index)根据索引从菜单栏中移除菜单。int getMenuCount()返回菜单栏中菜单的数量。JMenu getMenu(int index)根据索引获取菜单栏中的菜单。void setMargin(Insets m)设置菜单栏的边距。Insets getMargin()获取菜单栏的边距。void setBord'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/desktop/swing-jmenubar.html'
---
# javax.swing.JMenuBar



## 构造方法

`JMenuBar()`

创建一个新的空菜单栏。

_________________

## JMenuBar 的方法

### 菜单管理

`void add(JMenu menu)`

将指定的菜单添加到菜单栏。

`void remove(JMenu menu)`

从菜单栏中移除指定的菜单。

`void remove(int index)`

根据索引从菜单栏中移除菜单。

`int getMenuCount()`

返回菜单栏中菜单的数量。

`JMenu getMenu(int index)`

根据索引获取菜单栏中的菜单。

### 布局与外观

`void setMargin(Insets m)`

设置菜单栏的边距。

`Insets getMargin()`

获取菜单栏的边距。

`void setBorder(Border border)`

设置菜单栏的边框。

`Border getBorder()`

获取菜单栏的边框。

`void setUI(MenuBarUI ui)`

设置菜单栏的外观（UI）对象。

`MenuBarUI getUI()`

获取菜单栏的外观（UI）对象。

### 键盘快捷键管理

`void setHelpMenu(JMenu menu)`

设置帮助菜单（可能不在所有平台上支持）。

`JMenu getHelpMenu()`

获取帮助菜单。

`void setSelectionModel(SingleSelectionModel model)`

设置菜单栏的选择模型。

`SingleSelectionModel getSelectionModel()`

获取菜单栏的选择模型。

_________________

## 继承方法

继承自  `javax.swing.JComponent`  的方法：

`void setForeground(Color fg)`

设置菜单栏的前景色。

`void setBackground(Color bg)`

设置菜单栏的背景色。

`void setFont(Font font)`

设置菜单栏的字体。

`void setVisible(boolean visible)`

设置菜单栏的可见性。

继承自  `java.awt.Container`  的方法：

`void add(Component comp)`

将组件添加到容器中。

`void remove(Component comp)`

从容器中移除组件。

`Component getComponent(int index)`

根据索引获取容器中的组件。

继承自  `java.lang.Object`  的方法：

`boolean equals(Object obj)`

判断是否与指定对象相等。

`String toString()`

返回对象的字符串表示形式。

`int hashCode()`

返回对象的哈希码。

