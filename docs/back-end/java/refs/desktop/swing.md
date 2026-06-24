---
description: ''
lastUpdated: '2025-12-06 15:03:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'javax.swing - GUI 开发工具包'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: ''
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/desktop/swing.html'
---
# javax.swing - GUI 开发工具包



##  `javax.swing`  常用组件一览

<table><tbody>
  <tr>
    <td> <strong>类别</strong> </td>
    <td> <strong>组件</strong> </td>
    <td> <strong>描述</strong> </td>
  </tr>
  <tr>
    <td> <strong>顶层容器</strong> </td>
    <td> <code>JFrame</code> </td>
    <td>主窗口，支持标题、菜单栏和内容区域</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JDialog</code> </td>
    <td>对话框窗口，可模态或非模态</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JApplet</code> </td>
    <td>小程序窗口，嵌入在网页中运行（已过时）</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JWindow</code> </td>
    <td>无边框窗口，通常用于自定义外观</td>
  </tr>
  <tr>
    <td> <strong>基础组件</strong> </td>
    <td> <code>JButton</code> </td>
    <td>按钮组件，捕获用户点击事件</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JLabel</code> </td>
    <td>标签组件，用于显示文本或图像</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JTextField</code> </td>
    <td>单行文本输入框，用于简单文本输入</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JTextArea</code> </td>
    <td>多行文本输入框，用于复杂文本输入</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JCheckBox</code> </td>
    <td>复选框组件，支持多选操作</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JRadioButton</code> </td>
    <td>单选按钮，与 </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JComboBox</code> </td>
    <td>下拉列表框，用户可选择一个选项</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JList</code> </td>
    <td>列表框，可显示和选择多个选项</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JTable</code> </td>
    <td>表格组件，显示和编辑二维数据</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JTree</code> </td>
    <td>树形结构组件，显示分层数据</td>
  </tr>
  <tr>
    <td> <strong>高级组件</strong> </td>
    <td> <code>JTabbedPane</code> </td>
    <td>选项卡组件，用于切换不同的内容面板</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JSplitPane</code> </td>
    <td>分割面板，支持调整两个内容区域的大小</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JScrollPane</code> </td>
    <td>滚动面板，用于显示超出区域的内容</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>JToolBar</code> </td>
    <td>工具栏，提供快速访问常用操作的功能</td>
  </tr>
  <tr>
    <td> <strong>布局管理器</strong> </td>
    <td> <code>BorderLayout</code> </td>
    <td>分为东、南、西、北、中五个区域布局</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>FlowLayout</code> </td>
    <td>顺序排列组件，类似单词排列</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>GridLayout</code> </td>
    <td>网格布局，均匀分布组件</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>BoxLayout</code> </td>
    <td>支持水平或垂直排列的布局</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>GroupLayout</code> </td>
    <td>支持复杂分组的布局，适合高级用户界面</td>
  </tr>
  <tr>
    <td> <strong>自定义绘图</strong> </td>
    <td> <code>Graphics</code> </td>
    <td>基本绘图类</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>Graphics2D</code> </td>
    <td>支持高级图形操作，例如变换和抗锯齿</td>
  </tr>
  <tr>
    <td> <strong>事件处理</strong> </td>
    <td> <code>ActionListener</code> </td>
    <td>处理按钮、菜单等动作事件</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>MouseListener</code> </td>
    <td>处理鼠标事件</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>KeyListener</code> </td>
    <td>处理键盘事件</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td> <code>ChangeListener</code> </td>
    <td>监听组件状态的改变</td>
  </tr>
</tbody></table>

[javax.swing.JFrame](swing-jframe.md)

[javax.swing.JLabel](swing-jlable.md)

[javax.swing.JFileChooser](swing-jfilechooser.md)

[javax.swing.JMenuBar](swing-jmenubar.md)

[javax.swing.JMenu](swing-jmenu.md)

[javax.swing.JMenuItem](swing-jmenuitem.md)

[javax.swing.ImageIcon ](swing-imageicon.md)

