# C++ Primer - 5. 语句


## 5.1 简单语句
注意空语句
```
while (iter != svec.end()) ;   // 这里的空语句是有害的
    ++iter;
```

## 5.2 语句作用域
定义在控制结构当中的变量只在相应的语句的内部可见, 一旦语句结束, 变量也就超出其作用范围了;

## 5.6 异常
stdexcept 定义的异常类
```
exception        最常见的问题
runtime_err      只有在运行时候才能检测出问题
range_error      运行时错误:生成结果超过值域
overflow_error   运行时错误:上部溢出
underflow_error  运行时错误:下部溢出
logic_error      程序逻辑错误
domain_error     逻辑错误:参数对应的结果值不存在
invalid_argument 逻辑错误:无效参数
length_error     逻辑错误:视图创建一个超出该类型最大长度的对象
out_of_range     逻辑错误:使用一个超出有效范围的值
```

