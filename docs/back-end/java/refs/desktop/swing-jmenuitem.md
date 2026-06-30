---
description: 'javax.swing.JMenuItem 是 Swing 菜单项组件，支持构造方法创建实例，提供设置动作、事件、属性（如助记符、快捷键）及外观的方法，并继承自 AbstractButton 和 Object 类的方法。'
lastUpdated: '2026-06-30 09:46:11'
head:
  - - meta
    - name: 'og:title'
      content: 'javax.swing.JMenuItem'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'javax.swing.JMenuItem 是 Swing 菜单项组件，支持构造方法创建实例，提供设置动作、事件、属性（如助记符、快捷键）及外观的方法，并继承自 AbstractButton 和 Object 类的方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/swing-jmenuitem.html'
---
# javax.swing.JMenuItem

## 构造方法

`JMenuItem()`

创建一个空的菜单项，没有文本或图标。

`JMenuItem(String text)`

创建一个具有指定文本的菜单项。

`JMenuItem(String text, Icon icon)`

创建一个具有指定文本和图标的菜单项。

`JMenuItem(String text, int mnemonic)`

创建一个具有指定文本和助记符的菜单项。

`JMenuItem(Action a)`

创建一个基于指定 `Action` 的菜单项。

---

## JMenuItem 的方法

### 菜单项的动作和事件

`void setAction(Action a)`

设置与菜单项关联的 `Action` 。

`Action getAction()`

获取与菜单项关联的 `Action` 。

`void setActionCommand(String command)`

设置菜单项的动作命令。

`String getActionCommand()`

获取菜单项的动作命令。

`void addActionListener(ActionListener l)`

为菜单项添加动作监听器。

`void removeActionListener(ActionListener l)`

移除菜单项的动作监听器。

---

### 菜单项的属性设置

`void setText(String text)`

设置菜单项的文本。

`String getText()`

获取菜单项的文本。

`void setIcon(Icon icon)`

设置菜单项的图标。

`Icon getIcon()`

获取菜单项的图标。

`void setEnabled(boolean b)`

设置菜单项是否启用。

`boolean isEnabled()`

判断菜单项是否启用。

`void setSelected(boolean b)`

设置菜单项是否选中。

`boolean isSelected()`

判断菜单项是否选中。

---

### 助记符和快捷键

`void setMnemonic(int mnemonic)`

设置菜单项的助记符。

`int getMnemonic()`

获取菜单项的助记符。

`void setAccelerator(KeyStroke keyStroke)`

设置菜单项的快捷键。

`KeyStroke getAccelerator()`

获取菜单项的快捷键。

---

### 菜单项的外观设置

`void setMargin(Insets margin)`

设置菜单项的边距。

`Insets getMargin()`

获取菜单项的边距。

`void setHorizontalTextPosition(int textPosition)`

设置文本的水平对齐方式。

`int getHorizontalTextPosition()`

获取文本的水平对齐方式。

`void setVerticalTextPosition(int textPosition)`

设置文本的垂直对齐方式。

`int getVerticalTextPosition()`

获取文本的垂直对齐方式。

`void setHorizontalAlignment(int alignment)`

设置菜单项的水平对齐方式。

`int getHorizontalAlignment()`

获取菜单项的水平对齐方式。

`void setVerticalAlignment(int alignment)`

设置菜单项的垂直对齐方式。

`int getVerticalAlignment()`

获取菜单项的垂直对齐方式。

---

## 继承方法

### 继承自 `javax.swing.AbstractButton` 的方法：

`void setPressedIcon(Icon icon)`

设置按钮按下时显示的图标。

`void setToolTipText(String text)`

设置按钮的工具提示文本。

继承自 `java.awt.Component` 的方法：

`void setBackground(Color color)`

设置组件的背景颜色。

`void setForeground(Color color)`

设置组件的前景颜色。

### 继承自 `java.lang.Object` 的方法：

`boolean equals(Object obj)`

判断是否与指定对象相等。

`int hashCode()`

返回对象的哈希码。

`String toString()`

返回对象的字符串表示形式