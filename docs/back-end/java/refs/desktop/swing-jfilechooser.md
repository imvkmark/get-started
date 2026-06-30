---
description: 'javax.swing.JFileChooser 是 Swing 的文件选择组件，提供构造方法创建实例，支持文件选择与处理、目录与文件过滤，以及外观与行为设置，并继承父类方法。'
lastUpdated: '2026-06-30 09:45:51'
head:
  - - meta
    - name: 'og:title'
      content: 'javax.swing.JFileChooser'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'javax.swing.JFileChooser 是 Swing 的文件选择组件，提供构造方法创建实例，支持文件选择与处理、目录与文件过滤，以及外观与行为设置，并继承父类方法。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/swing-jfilechooser.html'
---
# javax.swing.JFileChooser

## 构造方法

`JFileChooser()`

创建一个默认的 `JFileChooser` ，使用用户的默认目录。

`JFileChooser(String currentDirectoryPath)`

创建一个 `JFileChooser` ，使用指定的当前目录路径。

`JFileChooser(File currentDirectory)`

创建一个 `JFileChooser` ，使用指定的当前目录。

`JFileChooser(FileSystemView fsv)`

创建一个 `JFileChooser` ，使用指定的 `FileSystemView` 。

`JFileChooser(String currentDirectoryPath, FileSystemView fsv)`

创建一个 `JFileChooser` ，使用指定的当前目录路径和 `FileSystemView` 。

`JFileChooser(File currentDirectory, FileSystemView fsv)`

创建一个 `JFileChooser` ，使用指定的当前目录和 `FileSystemView` 。

---

## JFileChooser 的方法

### 文件选择与处理

`int showOpenDialog(Component parent)`

显示“打开文件”对话框。

`int showSaveDialog(Component parent)`

显示“保存文件”对话框。

`int showDialog(Component parent, String approveButtonText)`

显示带自定义批准按钮的对话框。

`File getSelectedFile()`

获取用户选择的文件。

`void setSelectedFile(File file)`

设置用户选择的文件。

`File[] getSelectedFiles()`

获取用户选择的多个文件。

`void setSelectedFiles(File[] files)`

设置用户选择的多个文件。

### 目录与文件过滤

`void setCurrentDirectory(File dir)`

设置当前目录。

`File getCurrentDirectory()`

获取当前目录。

`void setFileFilter(FileFilter filter)`

设置文件过滤器。

`FileFilter getFileFilter()`

获取当前使用的文件过滤器。

`void setFileSelectionMode(int mode)`

设置文件选择模式（文件、目录或两者）。

`int getFileSelectionMode()`

获取文件选择模式。

`void setMultiSelectionEnabled(boolean b)`

设置是否允许多选。

`boolean isMultiSelectionEnabled()`

判断是否允许多选。

`void setFileHidingEnabled(boolean b)`

设置是否隐藏隐藏文件。

`boolean isFileHidingEnabled()`

判断是否隐藏隐藏文件。

---

### 外观与行为设置

`void setDialogTitle(String title)`

设置对话框的标题。

`String getDialogTitle()`

获取对话框的标题。

`void setApproveButtonText(String text)`

设置批准按钮的文本。

`String getApproveButtonText()`

获取批准按钮的文本。

`void setControlButtonsAreShown(boolean b)`

设置是否显示控制按钮。

`boolean getControlButtonsAreShown()`

判断是否显示控制按钮。

`void setDialogType(int dialogType)`

设置对话框的类型（打开、保存或自定义）。

`int getDialogType()`

获取对话框的类型。

---

## 继承方法

继承自 `javax.swing.JComponent` 的方法：

`void setForeground(Color fg)`

设置前景色。

`void setBackground(Color bg)`

设置背景色。

`void setFont(Font font)`

设置字体。

继承自 `java.awt.Component` 的方法：

`void setBounds(int x, int y, int width, int height)`

设置组件的边界。

`void setVisible(boolean visible)`

设置组件的可见性。

`boolean isVisible()`

判断组件是否可见。

继承自 `java.lang.Object` 的方法：

`boolean equals(Object obj)`

判断是否与指定对象相等。

`String toString()`

返回对象的字符串表示形式。

`int hashCode()`

返回对象的哈希码。