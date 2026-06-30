---
description: 'javax.swing 是 Java 的图形用户界面（GUI）开发工具包，提供丰富的轻量级组件，如 JButton、JTextField、JLabel、JPanel、JTable 等，用于构建跨平台桌面应用程序。'
lastUpdated: '2026-06-30 09:45:43'
head:
  - - meta
    - name: 'og:title'
      content: 'javax.swing - GUI 开发工具包'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'javax.swing 是 Java 的图形用户界面（GUI）开发工具包，提供丰富的轻量级组件，如 JButton、JTextField、JLabel、JPanel、JTable 等，用于构建跨平台桌面应用程序。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/swing.html'
---
# javax.swing - GUI 开发工具包

## `javax.swing` 常用组件一览

| **类别** | **组件** | **描述** |
|-|-|-|
| **顶层容器** | `JFrame` | 主窗口，支持标题、菜单栏和内容区域 |
|   | `JDialog` | 对话框窗口，可模态或非模态 |
|   | `JApplet` | 小程序窗口，嵌入在网页中运行（已过时） |
|   | `JWindow` | 无边框窗口，通常用于自定义外观 |
| **基础组件** | `JButton` | 按钮组件，捕获用户点击事件 |
|   | `JLabel` | 标签组件，用于显示文本或图像 |
|   | `JTextField` | 单行文本输入框，用于简单文本输入 |
|   | `JTextArea` | 多行文本输入框，用于复杂文本输入 |
|   | `JCheckBox` | 复选框组件，支持多选操作 |
|   | `JRadioButton` | 单选按钮，与 |
|   | `JComboBox` | 下拉列表框，用户可选择一个选项 |
|   | `JList` | 列表框，可显示和选择多个选项 |
|   | `JTable` | 表格组件，显示和编辑二维数据 |
|   | `JTree` | 树形结构组件，显示分层数据 |
| **高级组件** | `JTabbedPane` | 选项卡组件，用于切换不同的内容面板 |
|   | `JSplitPane` | 分割面板，支持调整两个内容区域的大小 |
|   | `JScrollPane` | 滚动面板，用于显示超出区域的内容 |
|   | `JToolBar` | 工具栏，提供快速访问常用操作的功能 |
| **布局管理器** | `BorderLayout` | 分为东、南、西、北、中五个区域布局 |
|   | `FlowLayout` | 顺序排列组件，类似单词排列 |
|   | `GridLayout` | 网格布局，均匀分布组件 |
|   | `BoxLayout` | 支持水平或垂直排列的布局 |
|   | `GroupLayout` | 支持复杂分组的布局，适合高级用户界面 |
| **自定义绘图** | `Graphics` | 基本绘图类 |
|   | `Graphics2D` | 支持高级图形操作，例如变换和抗锯齿 |
| **事件处理** | `ActionListener` | 处理按钮、菜单等动作事件 |
|   | `MouseListener` | 处理鼠标事件 |
|   | `KeyListener` | 处理键盘事件 |
|   | `ChangeListener` | 监听组件状态的改变 |

[javax.swing.JFrame](https://swing-jframe.md)

[javax.swing.JLabel](https://swing-jlable.md)

[javax.swing.JFileChooser](https://swing-jfilechooser.md)

[javax.swing.JMenuBar](https://swing-jmenubar.md)

[javax.swing.JMenu](https://swing-jmenu.md)

[javax.swing.JMenuItem](https://swing-jmenuitem.md)

[javax.swing.ImageIcon](https://swing-imageicon.md)