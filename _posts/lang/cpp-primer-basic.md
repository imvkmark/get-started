---
title: "C++ Primer - ps - 02. 基本程序实例"
date: 2022-04-14 22:14:20
toc: true
categories:
- ["Lang","C++","阅读: C++ Primer"]
---

### 基本文件



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

### 分号和块
`;` 语句结束符号

`{}` 逻辑连接语句

### 标识符
标识符不允许出现 @, $, %

### 保留字
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

### 注释
单行注释 //

多行注释 /* ...  */

