---
description: 'ActionEvent 是 Java AWT 事件模型中的一个类，用于描述由用户操作（例如按钮点击或菜单选择）触发的动作事件。该类继承自 AWTEvent，并包含有关事件源、命令字符串、修饰键状态等信息。ActionEvent 是处理用户动作事件（如按钮点击）的核心组件，结合 ActionListener 接口，可以实现对用户操作的响应。'
lastUpdated: '2025-12-06 15:03:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'java.awt.ActionEvent 方法'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'ActionEvent 是 Java AWT 事件模型中的一个类，用于描述由用户操作（例如按钮点击或菜单选择）触发的动作事件。该类继承自 AWTEvent，并包含有关事件源、命令字符串、修饰键状态等信息。ActionEvent 是处理用户动作事件（如按钮点击）的核心组件，结合 ActionListener 接口，可以实现对用户操作的响应。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/desktop/awt-actionevent.html'
---
# java.awt.ActionEvent 方法



##  **1. 介绍** 

`ActionEvent`  是 Java AWT 事件模型中的一个类，用于描述由用户操作（例如按钮点击或菜单选择）触发的动作事件。

该类继承自  `AWTEvent` ，并包含有关事件源、命令字符串、修饰键状态等信息。

_________________

##  **2. 方法** 

###  **构造方法** 

<table><tbody>
  <tr>
    <td> <strong>方法名称</strong> </td>
    <td> <strong>描述</strong> </td>
  </tr>
  <tr>
    <td> <code>ActionEvent(Object source, int id, String command)</code> </td>
    <td>创建一个指定源、ID 和命令字符串的 </td>
  </tr>
  <tr>
    <td> <code>ActionEvent(Object source, int id, String command, int modifiers)</code> </td>
    <td>额外包含修饰键状态的构造方法。</td>
  </tr>
  <tr>
    <td> <code>ActionEvent(Object source, int id, String command, long when, int modifiers)</code> </td>
    <td>包含事件时间的构造方法。</td>
  </tr>
</tbody></table>

_________________

###  **基本信息** 

<table><tbody>
  <tr>
    <td> <strong>方法名称</strong> </td>
    <td> <strong>描述</strong> </td>
  </tr>
  <tr>
    <td> <code>String getActionCommand()</code> </td>
    <td>获取与此事件关联的命令字符串（如按钮的文本或操作名称）。</td>
  </tr>
  <tr>
    <td> <code>int getModifiers()</code> </td>
    <td>获取此事件的修饰键状态（例如 </td>
  </tr>
  <tr>
    <td> <code>long getWhen()</code> </td>
    <td>获取事件发生的时间（自纪元以来的毫秒数）。</td>
  </tr>
</tbody></table>

_________________

###  **修饰键检查** 

<table><tbody>
  <tr>
    <td> <strong>方法名称</strong> </td>
    <td> <strong>描述</strong> </td>
  </tr>
  <tr>
    <td> <code>boolean isShiftDown()</code> </td>
    <td>检查是否按下了 </td>
  </tr>
  <tr>
    <td> <code>boolean isControlDown()</code> </td>
    <td>检查是否按下了 </td>
  </tr>
  <tr>
    <td> <code>boolean isMetaDown()</code> </td>
    <td>检查是否按下了 </td>
  </tr>
  <tr>
    <td> <code>boolean isAltDown()</code> </td>
    <td>检查是否按下了 </td>
  </tr>
  <tr>
    <td> <code>boolean isAltGraphDown()</code> </td>
    <td>检查是否按下了 </td>
  </tr>
</tbody></table>

_________________

##  **3. 常见用法** 

###  **1. 获取事件的命令字符串** 

```java
@Override
public void actionPerformed(ActionEvent e) {
    String command = e.getActionCommand();
    System.out.println("Action Command: " + command);
}
```

### 2. 检查修饰键状态

```java
@Override
public void actionPerformed(ActionEvent e) {
    if (e.isShiftDown()) {
        System.out.println("Shift key is pressed.");
    }
    if (e.isControlDown()) {
        System.out.println("Control key is pressed.");
    }
}
```

### 3. 获取事件发生时间

```java
@Override
public void actionPerformed(ActionEvent e) {
    long eventTime = e.getWhen();
    System.out.println("Event occurred at: " + eventTime);
}
```

ActionEvent 是处理用户动作事件（如按钮点击）的核心组件，结合 ActionListener 接口，可以实现对用户操作的响应。

