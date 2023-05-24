---
title: "基础学习"
date: 2022-06-16 18:43:04
toc: true
categories:
- ["Php","语言参考","基础笔记"]
---

version_compare(zend_version(), "2-dev", "ge");

---

第三个参数是操作符参数,而不是另外一个版本

---

pear私有变量是以'_'开头的变量

---

PHP4中的is_a()函数不推荐使用,推荐使用 instanceof

---

PHP5中可以通过foreach()循环的参数加上引用符号,让你在遍历数组的时候更改数组的值

---

变量的间接引用

$name = 'john';

$$name = 'Rename John';

echo $john;

显示  Rename John

---

超全局变量

$_GET   一个包含所有PHP从客户浏览器接受的GET变量的数组

$_POST 一个包含所有PHP从客户浏览器接收的POST变量的数组

$_COOKIE 一个包含所有PHP从客户浏览器接收的cookies的数组

$_ENV     一个包含环境变量的数组

$_SERVER 一个存放web服务器变量的数组

---

PHP特殊字符串

双引号

| \\n | 换行符 |
| --- | --- |
| \\t | 制表符 |
| \\" | 双引号 |
| \\\\ | 反斜线 |
| \\0 | ASCII 0 null |
| \\r | 回到行的开始位置 |
| \\$ | 标准的$符号,不会被当成变量 |
| \\[0-7]{1,3} | 用8进制写的字符, |
| \\x[0-9A-Fa-f]{1,2}	 | 用16进制写的字符, |
| \\u{[0-9A-Fa-f]+} | 匹配正则表达式的字符序列是 unicode 码位， 该码位能作为 UTF-8 的表达方式输出字符串 |

单引号

| \\' | 单引号 |
| --- | --- |
| \\\\ | 反斜线 |

定界符



```
<<<END
.........
......
END
```
字符偏移量

字符的偏移最好为了区分数组使用{}来实现

$c = 'Jhon';

$c{2} // 标明第三个字符

数组

array(1 => 'jhon', 'mark', 'Joseph') 相当于 array(1=>'jhon', 2=>'mark', 3=>'Joseph')

---

对象

self::调用静态变量和静态方法

$this->调用变量和方法

---

PHP5面向对象编程和设计模式

__call()方法
```
class HelloWorld
{
     function display( $count )
     {
          for ( $i = 1 ; $i <= $count ; $i ++) {
               echo 'I say HelloWorld ' . $i . ' times<br/>' ;
          }
          return $count ;
     }
}
 
class HelloWorldDelegator
{
     private $obj ;
     function __construct()
     {
          $this ->obj = new HelloWorld();
     }
     function __call( $method , $args )
     {
          return call_user_func_array( array ( $this ->obj, $method ), $args );
     }
}
 
$obj = new HelloWorldDelegator();
$obj ->display( 6 );
```

---

PHP5面向对象编程和设计模式

ArrayAccess接口
```
class doUser implements ArrayAccess {
private $db ;
function offsetExists( $name )
{
     return $this ->db->userExists( $name );
}
function offsetGet( $name )
{
     return $this ->db->userGet( $name );
}
function offsetSet( $name , $value )
{
     return $this ->db->userSet( $name , $value );
}
function offsetUnset( $name )
{
     return $this ->db->userDelete( $name );
}
}
$douser = new doUser();
echo $douser [ 'jhon' ];
```

---

PHP5面向对象编程和设计模式

迭代器
```
class NumberSquared implements Iterator
{
private$start , $end , $cur ;
public function__construct( $start , $end )
{
     $this->start = $start ;
     $this->end   = $end ;
}
public function rewind()
{
     $this->cur = $this ->start;
}
public function key()
{
     return $this ->cur;
}
public function current()
{
     return pow( 3 , $this ->cur);
}
public function next()
{
     return $this ->cur++;
}
public function valid()
{
     return $this ->cur <= $this ->end;
}
}
$obj = new NumberSquared( 4 , 9 );
foreach ( $obj as $key => $value ) {
     echo $key . '---' . $value . '<br/>' ;
}
```

---

PHP的自定义错误显示函数

set_error_handler — 设定一个用户自定义的错误处理函数

这个函数遵循以下的命名规范.
```
handler ( int $errno , string $errstr [, string $errfile [, int $errline [, array $errcontext ]]] )
set_error_handler( 'display_error' );
function display_error( $type , $msg , $file , $line )
{
     echo $type . '<br/>' ;
     echo $msg . '<br/>' ;
     echo $file . '<br/>' ;
     echo $line . '<br/>' ;
}
```

---

PHP文件上传

这个一般是我的弱点,自己没怎么试过..
```
$_FILES['INPUT_NAME']的参数
name             字段中文件的名称
type             类型
tmp_name         临时文件的名称
error            错误
size             文件的大小
error 的参数
0      UPLOAD_ERR_OK
1      UPLOAD_ERR_INI_SIZE
2      UPLOAD_ERR_FORM_SIZE
3      UPLOAD_ERR_PARTIAL
4      UPLOAD_ERR_NO_FILE
```

