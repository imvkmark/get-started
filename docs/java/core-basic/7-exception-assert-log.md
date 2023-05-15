---
outline : 'deep'
---

# 7. 异常, 断言, 日志

## 7.1 处理错误

错误问题的可能性

- 用户输入错误
- 设备错误
- 物理限制
- 代码错误

### 7.1.1 异常分类

异常的层次结构

![](https://file.wulicode.com/doc/20230511/1683804166945.png)

RuntimeException(非检查型异常, 还包含 Error)

- 错误的强制类型转换
- 数组访问越界
- 访问 null 指针

其他异常(检查型异常)

- 文件访问越界
- 试图打开一个不存在的文件
- 查找一个不存在的类

### 7.1.2 声明检查型异常

```
public FileInputStream(String name) throws FileNotFoundException
```

有可能抛出多个检查型异常类型

```java
class MyAnimation
{
    public Image loadImage(String s) throws FileNotFoundException, EOFException
    {
        // some statement
    }
}

```

如果超类方法中没有抛出任何检查型异常, 子类也不能抛出任何检查型异常

### 7.1.3 如何抛出异常

```
throw new EOFException();
```

### 7.1.4 创建异常类

包含两个构造器, 一个是默认的构造器, 一个是包含详细描述信息的构造器

```java
class FileFormatException extends IOException 
{
    public FileFormatException() {}
    public FileFormatException(String gripe)
        super(gripe); 
    }
}
```

## 7.2 捕获异常

### 7.2.1 捕获异常

```
try {
    code
    more code 
    more cone
} catch (ExceptionType e) {
    handler for this type 
}
```

### 7.2.2 捕获多个异常

```

try {
    code that might throw exceptions
} catch (FileNotFoundException e) {
    emergency action for missing files
} catch (UnknownHostException e | OtherHostException e) {
    emergency action for unknown hosts
} catch (IOException e) {
    emergency action for all other I/O problems
}
```

### 7.2.3 再次抛出异常与异常链

### 7.2.4 finally 子句

不管是否有异常被捕获, finally 子句中的代码都会执行

### 7.2.5 try-with-Resources

继承了 AutoCloseable 和 Closeable 的接口可以

```java
try (var in = new Scanner(new FileInputStream("/usr/share/dict/words"), StandardCharsets.UTF_8)) {
    while (in.hasNext ())
    System.out.println(in.next ()); 
}
```

### 7.2.6 分析堆栈轨迹元素

堆栈轨迹(stack trace), 使用 StackWalker 来进行分析

```java
Stacklalker walker=Stackialker.getInstance(); 
walker.forEach(frame -> analyze frame)
```

## 7.3 使用异常的技巧

- 异常处理不能代替测试, 异常会耗时的多
- 不要过分的细化异常
- 充分利用异常层次结构, 自定义自己的异常
- 不要压制异常
- 检测错误的时候, 苛刻比放任更好
- 不要羞于传递异常

## 7.4 使用断言

### 7.4.1 使用断言

断言允许在测试期间进行一些检查, 在生产环境中自动删除这些检查

```
assert condition : expression;
```

要想断言x 是 一个非负数，只需要简单地使用 下面这条语句

```
assert x >= 0;
```

或者将 x 的实际值传递给 AssertionError 对象，以便以后显示

```
assert x >= 0 : x;
```

### 7.4.2 启用和禁用断言

默认禁用断言, 使用以下命令启用

```
java -enableassertions MyApp
```

可以在类或者整个包中启用断言

```
java -ea:MyClass -ea:com.mycompany.mylib MyApp
```

可以采用 `-disableassertions` 或 `-da` 来禁用断言

```
java -ea:... -da:MyCLass MyApp
```

### 7.4.3 使用断言完成参数检查

- 不可恢复
- 只在开发/测试阶段打开

### 7.4.4 使用断言提供假设文档

参考文档

https://docs.oracle.com/javase/8/docs/technotes/guides/language/assert.html

## 7.5 日志

### 7.5.1 基本日志

```
Logger.getGlobal().info("File -> Openmenuitemselected") ;
```

### 7.5.2 高级日志

自定义 logger

```
private static final Logger myLogger = Logger.getLogger("com.mycompany.myapp");
```

日志级别

```
SEVERE
WARNING
INFO
CONFIG
FINE
FINER
FINEST
```

### 7.5.3 修改日志管理器配置

修改日志管理器配置, 配置文件位于 `conf/logging.properties`, 如果要想使用另外一个配置文件

```
java -Djava.util.logging.config.file=configFile MainClass
```

如果要再控制台上看到 FINE 级别的消息, 需要进行以下设置

```
java.util.logging.ConsoleHandler.level = FINE
```

如果想定义日志属性, 可以在代码中调用, 但是必须重新初始化日志管理器

```
// 重新设置属性
Systen.setProperty("java.util.Loging.config.file", file)

// 重新初始化日志管理器
LogManager.getLogManager().readconfiguration()
```

### 7.5.4 本地化

### 7.5.5 处理器

日志会发送到处理器, 处理器来处理这些日志信息

### 7.5.6 过滤器

### 7.5.7 格式化器

### 7.5.8 日志技巧


## 7.6 调试技巧

- 打印数据
- 单独测试
- junit(https://junit.org/junit5/)
- 日志代理
- 利用堆栈
- 将错误计入文件
- 使用 -verbose 来观察输出结果
- 使用 javac - Xlint sourceFiles 来找出代码的常见问题
- 使用 jconsole 来监控虚拟机的性能结果











































































