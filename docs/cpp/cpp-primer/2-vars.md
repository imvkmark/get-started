# C++ Primer - 2. 变量和基本类型

## 2.1 基本内置类型




### 2.1.1 算术类型
**类型**

算术类型包含 整形(整数,字符, 布尔类型) 和浮点型
```
bool        : 布尔类型
char        : 字符 (8 bit)
wchar_t     : 宽字符 (16 bit)
char16_t    : Unicode 字符 (16 bit)
char32_t    : Unicode 字符 (32 bit)
short       : 短整型 (16 bit)
int         : 整形 (16 bit)
long        : 长整形 (32 bit)
long long   : 长整形 (64 bit)
float       : 单精度浮点数 (6 位有效数字)
double      : 双精度浮点数 (10 位有效数字)
long double : 扩展精度浮点数 (10 位有效数字)
```
**机器实现**

计算机使用比特序列存储数据, 一个 字节`Byte` 使用 8 `bit`来表示, 一个字由 4 字节 或者 8 字节 表示.

**带符号类型和无符号类型**

`unsigned` : 无符号, 用来修饰 `int`, `short`, `long`, `long long`
> 和其他整形不同, 字符型被分为3种 ,`char`, `signed char`, `unsigned char`, 但是字符串


### 2.1.2 类型转换

- 赋值给无符号类型的值超过表示的范围, 结果是初始值对无符号类型表示数值总数取模后的余数.
- 复制给带符号类型一个超出它标识范围的值时候, 结果是 `未定义(undefined)`;

### 2.1.3 字面值常量
**整形和浮点型**
```
20       /* 整数 */
024      /* 八进制 */
0x14     /* 十六进制 */
```
**字符和字符串**
```
'a'       // 字符字面值
"Hello"   // 字符串字面值
```
**转义序列**
```
\n          换行符
\t          横向制表符
\a          报警符号
\v          纵向制表符
\b          退格符
\"          双引号
\\          反斜线
\?          问号
\'          单引号
\r          回车符
\f          进纸符
// 泛化的转义序列
// \x 后紧跟一个或多个十六进制数字
// \ 后跟 1,2,3 个八进制数字
\x4d        M
\40         空格
\115        M
```
**指定字面值类型**

示例:
```
L'a'            宽字符型字面值
u8"hi!"         utf-8 字符串
42ULL           无符号整形字面值
1E-3F           单精度浮点型
3.14159L        扩展精度浮点型字面值
```
后缀和前缀
```
# 前缀
u         char16_t
U         char32_t
L         wchar_t
u8        char(仅仅用于字符串字面常量)
# 后缀
u/U       unsigned
l/L       long
ll/LL     long long
```

## 2.2 变量

### 2.2.1 变量定义
初始化不是复制, 初始化的含义是创建变量时赋予其一个初始值, 复制的含义是把当前的值擦除, 而以新的值来替代

C++11 中可以使用花括号来初始化变量 `{}`, 但是如果我们使用列表初始化且初始值存在丢失信息的风险时候编译器将报错.

定义于任何函数在函数体内的内置类型变量`不被初始化(uninitialized)`

### 2.2.2 变量声明和定义的关系
`声明(declaration)` 使得名字为程序所知, 一个文件如果想使用别处定义的名字必须包含对那个名字的声明. 而`定义(defination)`负责创建与名字关联的实体.
```
// declaration
extern int i;
extern int a = 1024; // Error 这个是定义, 不是声明
// defination
int j;
```

### 2.2.3 标识符
关键字
```
alignas
alignof
asm
auto
bool
break
case
catch
char
char16_t
char32_t
class
const
constexpr
const_cast
continue
decltype
default
delete
do
double
dynamic_cast
else
enum
explicit
export
extern
false
float
for
friend
goto
if
inline
int
long
mutable
namespace
new
noexcept
nullptr
operator
private
protected
public
register
reinterpret_cast
return
short
singned
sizeof
static
static_assert
static_cast
struct
switch
template
this
thread_local
throw
true
try
typedef
typeid
typename
union
unsigned
using
virtual
void
volatile
wchar_t
while
```
操作符替代名
```
and
bitand
compl
not_eq
or_eq
xor_eq
and_eq
bitor
not
or
xor
```

### 2.2.4 名字的作用域
作用域访问示例, 主要学到的是 `::reused` 可以访问全局变量
```
#include <iostream>
int resused = 42;
int main 
{
    // 这里是 20
    int resued = 20;
    std::cout << ::reused << std::endl;
    
    // 这里是 42 
    std::cout << ::reused << std::endl;
}
```

## 2.3 符合类型
复合类型是基于其他类型定义的类型.

### 2.3.1 引用
引用形如 `&var` 的形式, 并且必须被初始化

引用类型的初始值必须是一个对象

引用类型的初始值必须和被引用着类型相同

### 2.3.2 指针
定义指针类型的方法将声明符号写成 `*var` 的形式;

获取对象的地址采用 `&` 取址符;

引用不是对象, 没有实际地址, 不能定义指向引用的指针;

利用指针访问对象 使用解引用符`*`

使用修饰符和变量名连在一起使用.

**空指针**
```
// 最好是用 nullptr 初始化指针, 避免使用 NULL;
int *p1 = nullptr;     // 等价于 int *p1 = 0;
int *p2 = 0;           // p2 为字面常量
int *p3 = null;        // 等价于 int *p3 = 0;
```
指针和引用都能提供对其他对象的间接访问
> 引用本身并非一个对象, 一旦定义了引用, 就无法另其再绑定到另外的对象, 之后每次使用这个引用都是访问他最初绑定的对象
> 指针和其他非引用变量一样给指针复制就是令他存放一个新的地址, 从而指向一个新的对象.
> 非法指针会引发不可预计的效果, 所以不要使用非法指针.


### 2.3.3 理解符合类型的声明
从右向左读

## 2.4 Const 限定符
const  相比来说是常量, 并且必须要初始化(这点和PHP不同), 运行过程中不得变更.

const 默认在本文件内有效.

多个文件共享 const 对象, 必须在变量的定义之前添加 `extern` 关键字

常量可以被引用

### 2.4.1 const 的引用 (待复习)

### 2.4.2 指针和 const (待复习)

### 2.4.3 顶层 const   (待复习)

### 2.4.4 常量表达式
常量表达式指的是 值不会改变并且在编译过程就能得到计算结果的表达式.

允许将变量声明为 `constexpr` 类型来由编译器来验证变量的值是否是一个常量表达式

`constexpr` 声明中如果定义了一个指针, 限定符 `constexpr` 仅仅对指针有效

## 2.5 处理类型

### 2.5.1 类型别名
定义
```
// 类型别名
typedef double wages;
// 别名声明
using SI = Sales_item;
```

### 2.5.2 auto 类型说明符
auto 类型说明符, 让编译器替我们去分析表达式所属的类型.

### 2.5.3 decltype 类型指示符
选择并返回操作数的数据类型.

## 2.6 自定义数据结构

### 2.6.1 定义Sales_data 类型
```
struct Sales_data {
    std::string bookNo;
}
```

### 2.6.2 编写自己的头文件
预处理器中使用头文件保护符
```
#ifndef SALE_DATA_H
#define SALE_DATA_H
struct Sales_data {
    ...
}
#endif
```

## PS.基本程序实例

## 基本文件



```c
// 头文件
#include <iostream>
// 命名空间
using namespace std;
// 程序从这里开始执行
int main() {
    // 输出内容
    cout << "Hello, World!" << endl;
    // 终止函数, 并且返回 0
    return 0;
}
```

## 分号和块
`;` 语句结束符号

`{}` 逻辑连接语句

## 标识符
标识符不允许出现 @, $, %

## 保留字
```
asm		       
auto	       
bool	       
break	       
case	       
catch	       
char	       
class	       
const	       
const_cast	   
continue	   
default	       
delete	       
do	           
double	       
dynamic_cast
else	    
enum	    
explicit	
export	    
extern  	
false	    
float	    
for	    
friend	    
goto	    
if	        
inline	    
int	    
long	    
mutable	
namespace	
new	                
operator	        
private	            
protected	        
public	            
register	        
reinterpret_cast	
return	            
short	            
signed	            
sizeof	            
static	            
static_cast	        
struct	            
switch	            
template
this
throw
true
try
typedef
typeid
typename
union
unsigned
using
virtual
void
volatile
wchar_t
while
```

## 注释
单行注释 //

多行注释 /* ...  */
