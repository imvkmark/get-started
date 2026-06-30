---
description: 'javax.swing.JMenu是Swing的菜单组件，提供构造方法创建菜单，支持通过add()等管理菜单项，可添加ActionListener处理事件，设置字体、图标等属性，并继承AbstractButton、JComponent等方法。'
lastUpdated: '2026-06-30 09:46:03'
head:
  - - meta
    - name: 'og:title'
      content: 'javax.swing.JMenu'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'javax.swing.JMenu是Swing的菜单组件，提供构造方法创建菜单，支持通过add()等管理菜单项，可添加ActionListener处理事件，设置字体、图标等属性，并继承AbstractButton、JComponent等方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/swing-jmenu.html'
---
# javax.swing.JMenu

## 构造方法

`JMenu()`

创建一个没有标题的空菜单。

`JMenu(String s)`

创建一个具有指定标题的菜单。

`JMenu(Action a)`

创建一个与指定操作相关联的菜单。

`JMenu(String s, boolean b)`

创建一个具有指定标题和启用/禁用选项的菜单。

---

## JMenu 的方法

### 菜单项管理

`JMenuItem add(JMenuItem menuItem)`

将指定的菜单项添加到菜单中。

`JMenuItem add(String s)`

创建一个具有指定标题的新菜单项并添加到菜单中。

`JMenuItem add(Action a)`

创建一个基于指定动作的菜单项并添加到菜单中。

`void addSeparator()`

在菜单中添加一个分隔符。

`void insert(JMenuItem menuItem, int index)`

将指定的菜单项插入到指定索引位置。

`void insertSeparator(int index)`

在指定索引位置插入一个分隔符。

`void remove(JMenuItem item)`

移除指定的菜单项。

`void remove(int index)`

移除指定索引的菜单项。

`void removeAll()`

移除菜单中的所有项目。

`JMenuItem getItem(int index)`

获取指定索引位置的菜单项。

`int getItemCount()`

返回菜单中的菜单项数量。

---

### 菜单事件处理

`void addMenuListener(MenuListener l)`

为菜单添加一个菜单监听器。

`void removeMenuListener(MenuListener l)`

从菜单中移除一个菜单监听器。

`MenuListener[] getMenuListeners()`

返回所有添加到菜单的菜单监听器。

---

### 菜单属性设置

`void setPopupMenuVisible(boolean b)`

设置菜单的弹出菜单是否可见。

`boolean isPopupMenuVisible()`

判断菜单的弹出菜单是否可见。

`void setEnabled(boolean b)`

设置菜单是否可用。

`boolean isEnabled()`

判断菜单是否可用。

`void setDelay(int d)`

设置菜单显示子菜单的延迟时间（毫秒）。

`int getDelay()`

获取菜单显示子菜单的延迟时间。

`void setMenuLocation(int x, int y)`

设置弹出菜单的显示位置。

---

## 继承方法

继承自 `javax.swing.JMenuItem` 的方法：

`void setText(String text)`

设置菜单项的文本。

`String getText()`

获取菜单项的文本。

`void setActionCommand(String command)`

设置菜单项的操作命令。

`String getActionCommand()`

获取菜单项的操作命令。

继承自 `javax.swing.AbstractButton` 的方法：

`void setSelected(boolean b)`

设置按钮是否选中。

`boolean isSelected()`

判断按钮是否选中。

`void addActionListener(ActionListener l)`

为按钮添加动作监听器。

继承自 `java.awt.Container` 的方法：

`void add(Component comp)`

将组件添加到容器中。

`void remove(Component comp)`

从容器中移除组件。

继承自 `java.lang.Object` 的方法：

`boolean equals(Object obj)`

判断是否与指定对象相等。

`String toString()`

返回对象的字符串表示形式。

`int hashCode()`

返回对象的哈希码。