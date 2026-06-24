---
description: 'java.awt（Abstract Window Toolkit，抽象窗口工具包）是 Java 中用于构建图形用户界面 (GUI) 应用程序的核心包之一。它提供了一系列类和接口，用于处理用户界面组件、事件处理、图形绘制、布局管理和输入设备交互等任务。java.awt 包含的组件包括按钮、标签、文本框、窗口、对话框等，并支持与底层操作系统的交互。java.awt 包中的类可以根据其设计用途分为以下几类：组件类、事件处理类、布局管理器类、图形与颜色类、输入与输出类、其他辅助类等。这些类代表用户界面组件，用户通过这些组件与程序进行交互。这些类与 AWT 事件模型相关，用于处理用户交互'
lastUpdated: '2025-12-06 15:03:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'java.jwt - 抽象窗口工具包 / GUI'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.awt（Abstract Window Toolkit，抽象窗口工具包）是 Java 中用于构建图形用户界面 (GUI) 应用程序的核心包之一。它提供了一系列类和接口，用于处理用户界面组件、事件处理、图形绘制、布局管理和输入设备交互等任务。java.awt 包含的组件包括按钮、标签、文本框、窗口、对话框等，并支持与底层操作系统的交互。java.awt 包中的类可以根据其设计用途分为以下几类：组件类、事件处理类、布局管理器类、图形与颜色类、输入与输出类、其他辅助类等。这些类代表用户界面组件，用户通过这些组件与程序进行交互。这些类与 AWT 事件模型相关，用于处理用户交互'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/desktop/jwt.html'
---
# java.jwt - 抽象窗口工具包 / GUI



###  `java.awt`  包简介

`java.awt` （Abstract Window Toolkit，抽象窗口工具包）是 Java 中用于构建图形用户界面 (GUI) 应用程序的核心包之一。它提供了一系列类和接口，用于处理用户界面组件、事件处理、图形绘制、布局管理和输入设备交互等任务。 `java.awt`  包含的组件包括按钮、标签、文本框、窗口、对话框等，并支持与底层操作系统的交互。

###  `java.awt`  包中的 Class 列表及分组

`java.awt`  包中的类可以根据其设计用途分为以下几类：组件类、事件处理类、布局管理器类、图形与颜色类、输入与输出类、其他辅助类等。

### 1.  **组件类** 

这些类代表用户界面组件，用户通过这些组件与程序进行交互。

<table><tbody>
  <tr>
    <td> <strong>Class</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <code>Button</code> </td>
    <td>表示一个按钮，用于触发用户事件。</td>
  </tr>
  <tr>
    <td> <code>Canvas</code> </td>
    <td>提供一个自定义绘制区域，用户可以在其上绘制图形。</td>
  </tr>
  <tr>
    <td> <code>Checkbox</code> </td>
    <td>复选框组件，用户可以选择或取消选择该组件。</td>
  </tr>
  <tr>
    <td> <code>CheckboxGroup</code> </td>
    <td>用于创建一组互斥的复选框（即单选按钮组）。</td>
  </tr>
  <tr>
    <td> <code>Choice</code> </td>
    <td>下拉列表，允许用户从多个选项中进行选择。</td>
  </tr>
  <tr>
    <td> <code>Component</code> </td>
    <td>是所有 AWT 组件类的超类。</td>
  </tr>
  <tr>
    <td> <code>Container</code> </td>
    <td>是能够包含其他组件的组件，例如面板、窗口等。</td>
  </tr>
  <tr>
    <td> <code>Label</code> </td>
    <td>显示文本的静态组件，用户不能编辑。</td>
  </tr>
  <tr>
    <td> <code>List</code> </td>
    <td>列表框组件，显示多个可选择的选项。</td>
  </tr>
  <tr>
    <td> <code>Scrollbar</code> </td>
    <td>用于垂直或水平滚动内容的滚动条组件。</td>
  </tr>
  <tr>
    <td> <code>TextComponent</code> </td>
    <td>文本输入组件的超类。</td>
  </tr>
  <tr>
    <td> <code>TextField</code> </td>
    <td>单行文本输入组件。</td>
  </tr>
  <tr>
    <td> <code>TextArea</code> </td>
    <td>多行文本输入组件。</td>
  </tr>
  <tr>
    <td> <code>Window</code> </td>
    <td>表示一个窗口，用于显示图形用户界面。</td>
  </tr>
  <tr>
    <td> <code>Frame</code> </td>
    <td>是一个顶层窗口，带有边框、标题栏和关闭按钮。</td>
  </tr>
  <tr>
    <td> <code>Panel</code> </td>
    <td>一个通用的容器组件，用于将组件分组。</td>
  </tr>
  <tr>
    <td> <code>Dialog</code> </td>
    <td>对话框窗口，通常用于显示短时间的消息或与用户进行交互。</td>
  </tr>
  <tr>
    <td> <code>Menu</code> </td>
    <td>菜单项的容器，用于实现菜单栏中的下拉菜单。</td>
  </tr>
  <tr>
    <td> <code>MenuBar</code> </td>
    <td>是用于容纳多个菜单项的组件，通常显示在窗口顶部。</td>
  </tr>
  <tr>
    <td> <code>MenuItem</code> </td>
    <td>菜单中的单个条目。</td>
  </tr>
  <tr>
    <td> <code>PopupMenu</code> </td>
    <td>弹出式菜单，用于右键单击时显示上下文相关的操作。</td>
  </tr>
  <tr>
    <td> <code>FileDialog</code> </td>
    <td>显示一个用于选择文件的对话框窗口。</td>
  </tr>
</tbody></table>

### 2.  **事件处理类** 

这些类与 AWT 事件模型相关，用于处理用户交互，如鼠标点击、键盘输入等。

<table><tbody>
  <tr>
    <td> <strong>Class</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <code>AWTEvent</code> </td>
    <td>AWT 事件的超类，表示所有事件对象的基类。</td>
  </tr>
  <tr>
    <td> <code>ActionEvent</code> </td>
    <td>表示用户的动作事件，如按钮点击或菜单项选择。</td>
  </tr>
  <tr>
    <td> <code>AdjustmentEvent</code> </td>
    <td>表示调整事件，如滚动条的滚动。</td>
  </tr>
  <tr>
    <td> <code>FocusEvent</code> </td>
    <td>焦点事件，表示组件获得或失去焦点。</td>
  </tr>
  <tr>
    <td> <code>InputEvent</code> </td>
    <td>所有用户输入事件（键盘和鼠标）的基类。</td>
  </tr>
  <tr>
    <td> <code>KeyEvent</code> </td>
    <td>键盘事件，表示键盘上的按键按下或释放。</td>
  </tr>
  <tr>
    <td> <code>MouseEvent</code> </td>
    <td>鼠标事件，表示鼠标点击、移动、拖动等操作。</td>
  </tr>
  <tr>
    <td> <code>WindowEvent</code> </td>
    <td>窗口事件，表示窗口的状态变化，如关闭、最小化、激活等。</td>
  </tr>
  <tr>
    <td> <code>EventQueue</code> </td>
    <td>AWT 事件队列，管理和调度事件的队列。负责将事件从事件源传递到事件处理程序，确保线程安全。</td>
  </tr>
</tbody></table>

[java.awt.EventQueue - AWT 事件队列](awt-eventqueue.md)

[java.awt.ActionEvent 方法](awt-actionevent.md)

### 3.  **布局管理器类** 

这些类控制组件在容器中的布局和排列方式。

<table><tbody>
  <tr>
    <td> <strong>Class</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <code>BorderLayout</code> </td>
    <td>容器的组件按东、南、西、北、中区域布局。</td>
  </tr>
  <tr>
    <td> <code>FlowLayout</code> </td>
    <td>按顺序排列组件，默认从左到右排列。</td>
  </tr>
  <tr>
    <td> <code>GridBagLayout</code> </td>
    <td>更复杂的网格布局，允许组件跨越多行或多列。</td>
  </tr>
  <tr>
    <td> <code>GridLayout</code> </td>
    <td>容器内的组件按规则的网格布局排列。</td>
  </tr>
  <tr>
    <td> <code>CardLayout</code> </td>
    <td>容器的组件以卡片形式切换，只显示一个组件。</td>
  </tr>
</tbody></table>

### 4.  **图形与颜色类** 

这些类处理图形绘制、颜色处理和其他相关操作。

<table><tbody>
  <tr>
    <td> <strong>Class</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <code>Graphics</code> </td>
    <td>提供基本的绘制操作，如绘制线条、矩形、图像等。</td>
  </tr>
  <tr>
    <td> <code>Color</code> </td>
    <td>表示颜色，支持 RGB 和 alpha 通道。</td>
  </tr>
  <tr>
    <td> <code>Font</code> </td>
    <td>表示用于文本绘制的字体。</td>
  </tr>
  <tr>
    <td> <code>FontMetrics</code> </td>
    <td>提供与字体和字符测量相关的操作。</td>
  </tr>
  <tr>
    <td> <code>Image</code> </td>
    <td>表示用于在屏幕上显示的图像。</td>
  </tr>
  <tr>
    <td> <code>Toolkit</code> </td>
    <td>提供与本地系统资源交互的工具，如图像加载、剪贴板等。</td>
  </tr>
</tbody></table>

### 5.  **输入与输出类** 

这些类处理输入设备（如键盘、鼠标）的操作和系统剪贴板的使用。

<table><tbody>
  <tr>
    <td> <strong>Class</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <code>Clipboard</code> </td>
    <td>表示系统剪贴板，允许程序与剪贴板进行交互。</td>
  </tr>
  <tr>
    <td> <code>ClipboardOwner</code> </td>
    <td>指示类实现剪贴板所有权接口。</td>
  </tr>
  <tr>
    <td> <code>KeyboardFocusManager</code> </td>
    <td>处理键盘焦点的管理，控制当前焦点的组件。</td>
  </tr>
  <tr>
    <td> <code>MouseInfo</code> </td>
    <td>提供有关鼠标设备的信息，如鼠标位置。</td>
  </tr>
</tbody></table>

### 6.  **其他辅助类** 

这些类用于提供额外的支持功能，如矩形、维度、点等几何结构的处理。

<table><tbody>
  <tr>
    <td> <strong>Class</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <code>Dimension</code> </td>
    <td>表示宽度和高度的尺寸类。</td>
  </tr>
  <tr>
    <td> <code>Point</code> </td>
    <td>表示平面上的 x 和 y 坐标。</td>
  </tr>
  <tr>
    <td> <code>Rectangle</code> </td>
    <td>表示矩形的几何形状。</td>
  </tr>
  <tr>
    <td> <code>Insets</code> </td>
    <td>表示容器边距，即容器与其内容之间的空白区域。</td>
  </tr>
  <tr>
    <td> <code>Cursor</code> </td>
    <td>表示鼠标光标的图形和行为。</td>
  </tr>
  <tr>
    <td> <code>Robot</code> </td>
    <td>允许程序生成本地系统输入事件，如鼠标和键盘事件。</td>
  </tr>
</tbody></table>

### 总结

`java.awt`  包提供了丰富的 GUI 组件、事件处理机制、布局管理器和图形绘制支持，能够满足图形用户界面的基本需求。通过这些类和接口，Java 程序员可以创建跨平台的桌面应用程序，并控制用户界面组件的布局和行为。



