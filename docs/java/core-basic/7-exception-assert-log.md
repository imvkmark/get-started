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

// page 312

## 7.2 断言

## 7.3 日志




























































































