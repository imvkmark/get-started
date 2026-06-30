---
description: 'javax.swing.ImageIcon 是Java Swing中用于加载和管理图像图标的类。它支持从文件、URL或字节数组创建图标，并提供获取图像尺寸、像素信息等方法。可绘制图标到组件，支持序列化以便存储或网络传输，同时包含描述属性方便调试和识别。'
lastUpdated: '2026-06-30 09:45:47'
head:
  - - meta
    - name: 'og:title'
      content: 'javax.swing.ImageIcon'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'javax.swing.ImageIcon 是Java Swing中用于加载和管理图像图标的类。它支持从文件、URL或字节数组创建图标，并提供获取图像尺寸、像素信息等方法。可绘制图标到组件，支持序列化以便存储或网络传输，同时包含描述属性方便调试和识别。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/swing-imageicon.html'
---
# javax.swing.ImageIcon

ImageIcon 是处理和显示图像的基础类，通常用于 Swing 应用程序中的按钮、标签等组件的图标设置

## 创建与管理

`ImageIcon(Image image)`

使用指定的 `Image` 创建一个 `ImageIcon` 实例。

`ImageIcon(String filename)`

使用文件路径创建一个 `ImageIcon` 实例

```Java
ImageIcon icon = new ImageIcon("path/to/image.png");

JLabel label = new JLabel(icon);  // 将图标添加到标签
frame.add(label);                 // 将标签添加到窗口
```

`ImageIcon(URL location)`

使用指定的 URL 创建一个 `ImageIcon` 实例。

`ImageIcon(byte[] imageData)`

使用字节数组中的图像数据创建一个 `ImageIcon` 实例。

`void setImage(Image image)`

设置此 `ImageIcon` 的图像

```Java
icon.setImage(newImage);  // 更新图标的图像
label.repaint();          // 触发重绘
```

---

## 获取信息

`Image getImage()`

返回此 `ImageIcon` 的图像。

`int getIconWidth()`

返回此图标的宽度。

`int getIconHeight()`

返回此图标的高度。

---

## 绘制操作

`void paintIcon(Component c, Graphics g, int x, int y)`

将此图标绘制到指定位置

```Java
@Override
public void paintComponent(Graphics g) {
    super.paintComponent(g);
    icon.paintIcon(this, g, 10, 10);  // 在 (10, 10) 位置绘制图标
}
```

---

## 序列化与描述

`String toString()`

返回此图标的字符串表示形式。

`AccessibleContext getAccessibleContext()`

获取与此图标关联的 `AccessibleContext` 。