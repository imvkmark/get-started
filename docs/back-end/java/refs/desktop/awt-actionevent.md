---
description: 'java.awt.ActionEvent是AWT事件处理中的动作事件类，用于表示用户触发的动作（如按钮点击）。其方法包括构造方法、基本信息获取（如命令字符串、时间戳）以及修饰键检查（如Ctrl、Shift）。常见用法：1. 通过getActionCommand()获取事件命令字符串；2. 使用getModifiers()检查修饰键状态；3. 调用getWhen()获取事件发生时间。'
lastUpdated: '2026-06-30 09:45:30'
head:
  - - meta
    - name: 'og:title'
      content: 'java.awt.ActionEvent 方法'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.awt.ActionEvent是AWT事件处理中的动作事件类，用于表示用户触发的动作（如按钮点击）。其方法包括构造方法、基本信息获取（如命令字符串、时间戳）以及修饰键检查（如Ctrl、Shift）。常见用法：1. 通过getActionCommand()获取事件命令字符串；2. 使用getModifiers()检查修饰键状态；3. 调用getWhen()获取事件发生时间。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/awt-actionevent.html'
---
# java.awt.ActionEvent 方法

## **1. 介绍**

`ActionEvent` 是 Java AWT 事件模型中的一个类，用于描述由用户操作（例如按钮点击或菜单选择）触发的动作事件。

该类继承自 `AWTEvent` ，并包含有关事件源、命令字符串、修饰键状态等信息。

---

## **2. 方法**

### **构造方法**

| **方法名称** | **描述** |
|-|-|
| `ActionEvent(Object source, int id, String command)` | 创建一个指定源、ID 和命令字符串的 |
| `ActionEvent(Object source, int id, String command, int modifiers)` | 额外包含修饰键状态的构造方法。 |
| `ActionEvent(Object source, int id, String command, long when, int modifiers)` | 包含事件时间的构造方法。 |

---

### **基本信息**

| **方法名称** | **描述** |
|-|-|
| `String getActionCommand()` | 获取与此事件关联的命令字符串（如按钮的文本或操作名称）。 |
| `int getModifiers()` | 获取此事件的修饰键状态（例如 |
| `long getWhen()` | 获取事件发生的时间（自纪元以来的毫秒数）。 |

---

### **修饰键检查**

| **方法名称** | **描述** |
|-|-|
| `boolean isShiftDown()` | 检查是否按下了 |
| `boolean isControlDown()` | 检查是否按下了 |
| `boolean isMetaDown()` | 检查是否按下了 |
| `boolean isAltDown()` | 检查是否按下了 |
| `boolean isAltGraphDown()` | 检查是否按下了 |

---

## **3. 常见用法**

### **1. 获取事件的命令字符串**

```Java
@Override
public void actionPerformed(ActionEvent e) {
    String command = e.getActionCommand();
    System.out.println("Action Command: " + command);
}
```

### 2. 检查修饰键状态

```Java
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

```Java
@Override
public void actionPerformed(ActionEvent e) {
    long eventTime = e.getWhen();
    System.out.println("Event occurred at: " + eventTime);
}
```

ActionEvent 是处理用户动作事件（如按钮点击）的核心组件，结合 ActionListener 接口，可以实现对用户操作的响应。