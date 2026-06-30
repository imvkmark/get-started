---
description: 'java.awt.EventQueue是AWT事件队列的核心类，负责事件的管理、调度与分发。它支持通过`invokeLater`和`invokeAndWait`调度任务到EDT，并允许自定义事件处理及异常捕获，确保GUI线程安全。'
lastUpdated: '2026-06-30 09:45:34'
head:
  - - meta
    - name: 'og:title'
      content: 'java.awt.EventQueue - AWT 事件队列'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.awt.EventQueue是AWT事件队列的核心类，负责事件的管理、调度与分发。它支持通过`invokeLater`和`invokeAndWait`调度任务到EDT，并允许自定义事件处理及异常捕获，确保GUI线程安全。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/awt-eventqueue.html'
---
# java.awt.EventQueue - AWT 事件队列

`java.awt.EventQueue` 是 AWT (Abstract Window Toolkit) 的事件调度机制，用于管理事件的队列和分发。

所有的 GUI 事件（如鼠标点击、键盘输入、窗口操作等）都会被放入事件队列中，并由 AWT 的事件分发线程 (EDT) 顺序地分发给相应的事件处理程序。

主要功能：

- 确保线程安全地调度事件。
- 支持自定义事件的发布。
- 提供延迟任务的执行能力。

每个 AWT 应用程序在启动时都会自动创建一个 `EventQueue` 实例，并将其与 `AWT` 的事件分发线程（EDT, Event Dispatch Thread）关联。所有的事件（例如用户输入或窗口状态改变）都会进入这个队列，并且从队列中取出交给处理函数。

## **方法**

### **事件管理**

| **方法名称** | **描述** |
|-|-|
| `void postEvent(AWTEvent event)` | 将指定的事件放入事件队列中。 |
| `AWTEvent getNextEvent()` | 从队列中取出下一个事件，如果队列为空则阻塞等待。 |
| `boolean peekEvent()` | 检查队列中是否有事件，但不移除它们。 |
| `AWTEvent peekEvent(int id)` | 检查队列中是否存在指定事件 ID 的事件，但不移除它们。 |

### **事件调度**

| **方法名称** | **描述** |
|-|-|
| `static void invokeLater(Runnable r)` | 将指定的任务放入事件队列，并在未来某个时间点由事件分发线程执行。 |
| `static void invokeAndWait(Runnable r)` | 将指定的任务放入事件队列并等待任务完成，适用于需要立即执行的场景（线程安全）。 |

### **异常处理**

| **方法名称** | **描述** |
|-|-|
| `static void setDefaultExceptionHandler(Consumer<Throwable> handler)` | 设置默认的未捕获异常处理器，用于处理事件队列中的未处理异常。 |
| `static Consumer<Throwable> getDefaultExceptionHandler()` | 获取当前的默认未捕获异常处理器。 |

### **事件队列控制**

| **方法名称** | **描述** |
|-|-|
| `static boolean isDispatchThread()` | 检查当前线程是否是事件分发线程 (EDT)。 |

---

## **常见用法**

### **调度任务**

使用 `invokeLater` 和 `invokeAndWait` 可以调度任务到事件分发线程：

```Java
// 将任务放入事件队列，由事件分发线程异步执行
EventQueue.invokeLater(() -> System.out.println("Task executed later"));

// 将任务放入事件队列，并等待任务完成
EventQueue.invokeAndWait(() -> System.out.println("Task executed and waited"));
```

### 自定义事件处理

通过 postEvent 向队列中添加自定义事件：

```Java
AWTEvent myEvent = new AWTEvent(new Object(), 1001) {}; // 自定义事件
EventQueue eventQueue = Toolkit.getDefaultToolkit().getSystemEventQueue();
eventQueue.postEvent(myEvent);
```

### 处理异常

设置默认异常处理器：

```Java
EventQueue.setDefaultExceptionHandler(e -> {
    System.err.println("Unhandled exception in EDT: " + e.getMessage());
});
```

EventQueue 是 Java GUI 程序的核心工具之一，确保了事件在单一线程中有序处理，从而简化了多线程开发的复杂性。