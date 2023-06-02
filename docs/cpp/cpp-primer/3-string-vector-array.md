# C++ Primer - 3. 字符串, 向量和数组

## 3.1 using 声明
声明格式



```
using namespace::name;
```
每个名字都需要独立的 `using` 声明;

头文件不应该包含 using 声明;

## 3.2 标准库类型 string
使用
```
#include <string>
using std::string;
```

### 定义和初始化 string 对象
```
string s1;           默认初始化
string s2(s1);       s2 = s1
string s2 = s1;      s2 = s1;
string s3("value")   s3 是字面值 "value" 的副本, 除去字面值后的空字符串
string s3 = "value"
string s4(10,'s')    重复 10 次 s
```

### string 对象上的操作
```
os<<s           将 s 写入到输出流 os 中, 返回os
is>>s           从 is 中读取字符串赋给 s, 字符串以空白分割, 返回is
getline(is, s)  从 is 中读取一行赋给 s, 返回 is
s.empty()       判定字串 s 是否为空
s.size()        返回 s 中字符的个数
s[n]            返回字串中第 n 个引用
s1+s2           返回连接后的结果
s1=s2           赋值
s1==s2          判断是否相等
s1!=s2          判断不等
<,<=,>, >=      利用字典顺序来进行比较
```
一个继续读入的示例
```
#include <iostream>
using std::cin;
using std::cout;
using std::endl;
using std::string;
int main()
{
    // 反复读取, 知道文件末尾
    string word;
    while (cin >> word) {
        cout << word << endl;
    }
    return 0;
    
    // 读取一行, 然后继续输入
    string line;
    while (getline(cin, line)) {
        cout << line << endl;
    }
}
```
**string::size_type 类型**

`s.size()` 返回的是 `string::size_type` 类型. 我们可以使用auto来初始化这个变量
```
auto len = s.size();
```
**字面值/常量 和 string 类型的连接**

当把string对象和字符字面值及字符串字面值混在一条语句中使用时, 必须确保每个加法运算符(+)的两侧的运算对象至少有一个是 `string`

### 处理string对象中的字符
C++标准库头文件将 c 中的 `name.h` 命名为 `cname`, 一般来说, c++程序应该使用名为 `cname` 的头文件而不是 `name.h` 的形式, 标准库的名字总能在命名空间 `std` 中找到

cctype 头文件的函数
```
isalnum(c)          是字母/数字为 true
isalpha(c)          是字母为 true
iscntrl(c)          是控制字符为 true
isdigit(c)          c是数字时候为 true
isgraph(c)          不是空格单可打印时候为 true
islower(c)          是小写字母时候为 true
isprint(c)          可打印字符时候为 true
ispunct(c)          为标点符号时为 true
isspace(c)          为空白是为 true
isupper(c)          是大写字母为 true
isxdigit(c)         是16进制时为 true
tolower(c)          转换为小写字母
toupper(c)          转换为大写字母
```
**for循环字符中的数据**
```
for (auto c : str) {
    cout << c << endl;
}
```

## 3.3 标准库类型 vector
这里按照我的意思可以把他理解成多维数组

### 定义和初始化 vector 对象
```
vector<T> v1                空 vector, 执行默认初始化
vector<T> v2(v1)            复制, v1 复制给 v2
vector<T> v2 = v1           同上
vector<T> v3(n, val)        包含了 n 个重复的元素, 每个元素都是 val
vector<T> v4(n)             包含了 n 个初始化对象
vector<T> v5{a,b,c...}      通过枚举来初始化
vector<T> v5={a,b,c...}     同上
```

### vector 支持的操作
vector 对象的下标运算符可以用来访问已经存在的元素, 但是不能用于添加元素, 添加元素可以使用 `v.push_back()`
```
v.empty()               检测是否包含元素
v.size()                返回 v 的个数
v.push_back(t)          添加一个 值是 t 的元素
v[n]                    返回 n 位置元素的引用
v1 = v2                 赋值/拷贝
v1 = {a, b, c...}       列表赋值
v1 == v2                元素相等且位置相同
v1 != v2                比较
<, <=, >, >=            比较
```

### size_type 的写法
要使用 size_type, 需首先指定它是由那种类型定义的. vector 对象的类型总是包含着元素的类型
```
vector<int>::size_type
```

### ? 疑问
以下这句话在报错误
> too few template argements
> `vector<unsigned> scores(11, 0);`


## 3.4 迭代器

### 使用迭代器
**标准迭代器的运算符**
```
*iter                   返回迭代器所指类型的引用(解引用)      
iter->mem               获取 mem 的成员, 同 (*iter).mem
++iter                  令 iter 指示容器中的下一个元素
--iter                  令 iter 指示容器中的上一个元素
iter1 == iter2
iter1 != iter2
```
**迭代器类型**
```
vector<int>::iterator it;       能够读写
string::iterator it2            能够读写
vector<int>::iterator it3       常量指针, 能读, 不能写
string::const_iterator it4      常量指针, 能读, 不能写
```
> 但凡是使用了迭代器的循环体, 都不要向迭代器所属的容器添加元素


### 迭代器运算
```
iter + n                前移多少个元素
iter - n                后移若干元素
iter += n
iter -= n
iter1 - iter2           相减结果是他们之间的距离
>, >=, <, <=            迭代器的关系比较欲奴三幅
```
迭代器的差的类型名是 `difference_type` , 这是一个带符号的整形数值.

## 3.5 数组
数组是存在相同对象的容器, 并且大小固定

### 定义和初始化
形如 a[b], a 是数组的名字, b 是数量, b必须大于 0, b必须是一个常量表达式, 默认初始化会令数组含有未定义的值.
```
constexpr unsigned sz = 42;
int arr[10];
int * parr[sz];
```
**显式初始化**
```
const unsigned sz = 3
int ia[sz] = {0, 1, 2}
int ib[] = {0, 1, 2}
int ic[5] = {0, 1, 2}   
    等价于 {0, 1, 2, 0, 0}
string id[3] = {"Hello", "World"}
    等价于 {"Hello", "World", ""}
```

### 访问数组元素
数组下标类型一般是 `size_t` 类型

