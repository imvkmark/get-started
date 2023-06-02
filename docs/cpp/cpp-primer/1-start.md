# C++ Primer - 1. 开始

## 1.1 简单的 C++ 程序




### 程序范式

- 返回类型
- 函数名称 `main`
- 形参
- 函数体
- 返回值
```
int main() 
{
    return 0;
}
```

### 后缀名
`.cc`, `.cxx`, `.cpp`, `.cp`, `.C`

## 1.2 输入, 输出

### 标准输出
iostream 包含 istream, ostream,
```
// 输入
std::cin >> v1;
// 输出
std::cout << v1;
```

### 命名空间
```
#include "iostream"
use std::cout 
int main 
{
    cout << v1;
}
```

## 1.3 注释
```
// 单行注释
/* 
 * 多行注释示例
 * 多行注释不得嵌套
 */
```

## 1.4 控制语句

### 1.4.1 while
```
#include "iostream"
int main 
{
    int sum = 0, val = 1;
    while (val <= 10) {
        sum += val;
        ++val;
    }
    std::cout << "Sum 1 to 10 Result is " << sum << std::endl;
}
```

### 1.4.2 for
```
#include "iostream"
int main 
{
    int for_sum = 0;
    for (int val = 1; val <= 10; val++) {
        for_sum += val;
    }
    std::cout << "Sum 1 to 10 Result is " << for_sum << std::endl;
}
```

### 1.4.3 读取不定量的数据
```
#include "iostream"
int main 
{
    int cin_value = 0, cin_sum = 0;
    while (std::cin >> cin_value) {
        cin_sum += cin_value;
        std::cout << "Sum Result is " << cin_sum << std::endl;
    }
}
```

### 1.4.4 if
```
#include "iostream"
int main 
{
    // current_val 是正在统计的数
    // val 是读入的新值
    int if_current_val = 0, if_val = 0;
    // 我觉得这里理解成双层循环更容易理解下
    if (std::cin >> if_current_val) {
        int if_cnt = 1;
        while (std::cin >> if_val) {
            if (if_val == if_current_val) {
                ++if_cnt;
            } else {
                std::cout << if_current_val << " occurs "
                          << if_cnt << " times " << std::endl;
                if_current_val = if_val;
                if_cnt = 1;
            }
        }
        std::cout << if_current_val << " occurs "
                  << if_cnt << " times " << std::endl;
    }
}
```

## 1.5 类

### 头文件
**后缀名**

`.h` 后缀名

**引入**
```
// 标准库引入
#include <iostream>
// 非标准库引入
#include "Sales_item.h"
```

