---
description: 'JLabel()创建一个没有文本或图标的 JLabel。JLabel(String text)使用指定文本创建一个 JLabel。JLabel(Icon icon)使用指定图标创建一个 JLabel。JLabel(String text, int horizontalAlignment)使用指定文本和水平对齐方式创建一个 JLabel。JLabel(Icon icon, int horizontalAlignment)使用指定图标和水平对齐方式创建一个 JLabel。JLabel(String text, Icon icon, int horizon'
lastUpdated: '2025-12-06 15:31:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'javax.swing.JLabel'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JLabel()创建一个没有文本或图标的 JLabel。JLabel(String text)使用指定文本创建一个 JLabel。JLabel(Icon icon)使用指定图标创建一个 JLabel。JLabel(String text, int horizontalAlignment)使用指定文本和水平对齐方式创建一个 JLabel。JLabel(Icon icon, int horizontalAlignment)使用指定图标和水平对齐方式创建一个 JLabel。JLabel(String text, Icon icon, int horizon'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/desktop/swing-jlable.html'
---
# javax.swing.JLabel



## 构造方法

`JLabel()`

创建一个没有文本或图标的  `JLabel` 。

`JLabel(String text)`

使用指定文本创建一个  `JLabel` 。

`JLabel(Icon icon)`

使用指定图标创建一个  `JLabel` 。

`JLabel(String text, int horizontalAlignment)`

使用指定文本和水平对齐方式创建一个  `JLabel` 。

`JLabel(Icon icon, int horizontalAlignment)`

使用指定图标和水平对齐方式创建一个  `JLabel` 。

`JLabel(String text, Icon icon, int horizontalAlignment)`

使用指定文本、图标和水平对齐方式创建一个  `JLabel`

_________________

## JLabel 的方法

### 文本与图标设置

`void setText(String text)`

设置标签的文本。

`String getText()`

获取标签的文本。

`void setIcon(Icon icon)`

设置标签的图标。

`Icon getIcon()`

获取标签的图标。

`void setDisabledIcon(Icon icon)`

设置当标签被禁用时显示的图标。

`Icon getDisabledIcon()`

获取当标签被禁用时显示的图标。

`void setIconTextGap(int gap)`

设置图标和文本之间的间距。

`int getIconTextGap()`

获取图标和文本之间的间距。

### 对齐与显示设置

`void setHorizontalAlignment(int alignment)`

设置水平对齐方式。

`int getHorizontalAlignment()`

获取水平对齐方式。

`void setVerticalAlignment(int alignment)`

设置垂直对齐方式。

`int getVerticalAlignment()`

获取垂直对齐方式。

`void setHorizontalTextPosition(int textPosition)`

设置文本相对于图标的水平位置。

`int getHorizontalTextPosition()`

获取文本相对于图标的水平位置。

`void setVerticalTextPosition(int textPosition)`

设置文本相对于图标的垂直位置。

`int getVerticalTextPosition()`

获取文本相对于图标的垂直位置。

### 显示属性

`void setEnabled(boolean enabled)`

设置标签是否可用。

`boolean isEnabled()`

判断标签是否可用。

`void setOpaque(boolean opaque)`

设置是否填充标签的背景。

`boolean isOpaque()`

判断标签是否填充背景。

_________________

## 继承方法

继承自  `javax.swing.JComponent`  的方法：

`void setForeground(Color fg)`

设置前景色。

`Color getForeground()`

获取前景色。

`void setBackground(Color bg)`

设置背景色。

`Color getBackground()`

获取背景色。

`void setFont(Font font)`

设置字体。

`Font getFont()`

获取字体。

继承自  `java.awt.Component`  的方法：

`void setBounds(int x, int y, int width, int height)`

设置组件的边界。

`void setVisible(boolean visible)`

设置组件的可见性。

`boolean isVisible()`

判断组件是否可见。

继承自  `java.lang.Object`  的方法：

`String toString()`

返回标签的字符串表示形式。

`boolean equals(Object obj)`

判断是否与指定对象相等。

`int hashCode()`

返回对象的哈希码。

###  **说明** 

-  `JLabel`  的方法分为设置文本、图标的内容与对齐方式，以及组件的外观和事件控制。
- 许多方法继承自  `JComponent`  或  `Container` ，提供了对组件更细粒度的操作支持。

