---
description: 'java.lang.Runnable 是 Java 中用于表示任务或线程可执行的核心接口。它是实现多线程编程的基础，通过将代码封装为一个任务并交由线程执行，可以实现并发操作。void run()封装任务逻辑的抽象方法，由线程调用执行在 Java 8 中，Runnable 被标记为函数式接口，因此可以使用 Lambda 简化实现：Runnable 是 Java 多线程编程的核心接口之一，通过灵活的任务封装和简单的接口设计，为并发操作提供了基础支持'
lastUpdated: '2025-12-06 15:01:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'java.lang.Runnable - 任务/线程的可执行接口'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'java.lang.Runnable 是 Java 中用于表示任务或线程可执行的核心接口。它是实现多线程编程的基础，通过将代码封装为一个任务并交由线程执行，可以实现并发操作。void run()封装任务逻辑的抽象方法，由线程调用执行在 Java 8 中，Runnable 被标记为函数式接口，因此可以使用 Lambda 简化实现：Runnable 是 Java 多线程编程的核心接口之一，通过灵活的任务封装和简单的接口设计，为并发操作提供了基础支持'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/base/lang-runnable.html'
---
# java.lang.Runnable - 任务/线程的可执行接口



#  介绍

`java.lang.Runnable`  是 Java 中用于表示任务或线程可执行的核心接口。它是实现多线程编程的基础，通过将代码封装为一个任务并交由线程执行，可以实现并发操作。

_________________

##  **1. 核心特点** 

-  **单方法接口** ： `Runnable`  是一个函数式接口，仅包含一个抽象方法  `run()` 。
-  **任务封装** ： `Runnable`  的实现类通常包含要在线程中运行的任务逻辑。
-  **线程运行** ：通过将实现了  `Runnable`  接口的对象传递给  `Thread`  构造方法，线程可以执行该任务。

_________________

##  **2. 方法** 

`void run()`

封装任务逻辑的抽象方法，由线程调用执行

##  **3. 使用方式** 

###  **1. 创建一个**  **`Runnable`**  **实现类** 

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Task is running in: " + Thread.currentThread().getName());
    }
}

// 使用方式
Runnable task = new MyRunnable();
Thread thread = new Thread(task);
thread.start();
```

### 2. 使用匿名类

```java
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Running in thread: " + Thread.currentThread().getName());
    }
});
thread.start();
```

### 3. 使用 Lambda 表达式

在 Java 8 中，Runnable 被标记为函数式接口，因此可以使用 Lambda 简化实现：

```java
Thread thread = new Thread(() -> System.out.println("Task running with Lambda in: " + Thread.currentThread().getName()));
thread.start();
```

### 4. 典型应用场景

- 多线程编程：通过 Runnable 实现任务并交由多个线程并发运行。
- 后台任务：在应用程序中运行非阻塞操作，如文件下载、数据库查询等。
- 定时任务：与调度器配合使用，实现周期性或延迟的任务执行

### 5. 常见注意事项

- 线程安全：如果多个线程共享同一个 Runnable 实例，需要确保代码逻辑是线程安全的。
- 线程生命周期： `run()`  方法执行完毕后，线程生命周期即结束。
- 避免直接调用  `run()` ：调用  `run()`  方法仅在当前线程中执行任务，而不会创建新的线程

Runnable 是 Java 多线程编程的核心接口之一，通过灵活的任务封装和简单的接口设计，为并发操作提供了基础支持



