# PHP基本扩展 - SPL (PHP标准库)

**介绍**

SPL是用于解决典型问题(standard problems)的一组接口与类的集合。

**安装**

此扩展只能在php 5.0以后使用

此扩展从PHP 5.3.0 不再被关闭,会一直有效.成为php内核组件一部份

**配置**

**函数**

**数据结构**

SPL 提供了一系列的标准数据结构, 他们根据他们的底层实现进行分组, 这些通常定义他们公共的程序方式

> Doubly Linked Lists(双联列表)
>
>
> 双联列表是一系列的可以互联的双向链接节点. 迭代器的操作, 双向结束, 添加或者删除节点耗费的时间是O(1)当底层结构是DLL, 他提供了一种好的方法来执行队列和堆栈
>
> SplDoublyLinkedList
>
> SplStack
>
> SplQueue
>
> **Heaps(堆)**
>
> "堆" 是树形结构数据, 他满足堆属性. 父节点的值一定大于或等于子节点的值。堆被认为在计算机算法中起到重要作用，并被用于各种编程语言，例如c++、Java等中
>

> SplHeap
>
>
> SplMaxHeap
>
> SplMinHeap
>

> SplPriorityQueue
>
>
> **Arrays(数组)**
>
> 数组使用连续的方式存储数据, 通过索引访问, 不要和PHP数组混淆, PHP数组事实上是基于有序hash表的实现
>
> SplFixedArray
>
> **Map**
>
> Map 是保存键/值数据, PHP数组可以认为是 数字/字串 => 值 的对应, SPL提供了一个对象->数据的Map, 这个 Map 能够使用为对象系列
>
> SplObjectStorage
>

**迭代器**

[PHP基本扩展 - SPL - Iterators(迭代器)](./spl-iterators.md)

ArrayIterator

RecursiveArrayIterator

EmptyIterator

IteratorIterator

AppendIterator

CachingIterator

RecursiveCachingIterator

FilterIterator

CallbackFilterIterator

RecursiveCallbackFilterIterator

RecursiveFilterIterator

ParentIterator

RegexIterator

RecursiveRegexIterator

InfiniteIterator

LimitIterator

NoRewindIterator

MultipleIterator

RecursiveIteratorIterator

RecursiveTreeIterator

DirectoryIterator

FilesystemIterator

GlobIterator

RecursiveDirectoryIterator

**接口**

[PHP基本扩展 - SPL - 接口](./spl-interfaces.md)

> Countable
>
>
> OuterIterator
>
> RecursiveIterator
>
> SeekableIterator
>

**异常**

LogicException

BadFunctionCallException

BadMethodCallException

DomainException

InvalidArgumentException

LengthException

OutOfRangeException

RuntimeException

OutOfBoundsException

OverflowException

RangeException

UnderflowException

UnexpectedValueException

**SPL函数**

`array class_implements ( mixed $class [, bool $autoload ] )`

返回指定的类实现的所有接口, 返回一个数组, 包含了指定类及父类实现的所有接口的名称

`array class_parents ( mixed $class [, bool $autoload ] )`

返回指定类的父类

`array class_uses ( mixed $class [, bool $autoload = true ] )`

[5.4.0] 返回给定的类引用的类[暂时这样理解]

`int iterator_apply ( Traversable $iterator , callable $function [, array $args ] )`

为迭代器中的每个元素调用一个用户自定义函数

`int iterator_count ( Traversable $iterator )`

计算迭代器中元素的个数

`array iterator_to_array ( Traversable $iterator [, bool $use_keys = true ] )`

将迭代器中的元素拷贝到数组

`void spl_autoload_call ( string $class_name )`

尝试调用所有已注册的函数来装在请求类, 手动设置函数来装在类或者接口

`string spl_autoload_extensions ([ string $file_extensions ] )`

注册并返回 spl_autoload 函数使用的默认文件扩展名

`array spl_autoload_functions ( void )`

返回所有已注册的__autoload()函数

`bool spl_autoload_register ([ callback $autoload_function ] )`

将函数注册到SPL __autoload函数栈中。如果该栈中的函数尚未激活，则激活它们

`bool spl_autoload_unregister ( mixed $autoload_function )`

注销已注册的__autoload()函数

`void spl_autoload ( string $class_name [, string $file_extensions ] )`

__autoload()函数的默认实现

`array spl_classes ( void )`

返回当前所有可用的 SPL 类的数组

`string spl_object_hash ( object $obj )`

返回指定对象的hash id

**文件处理**

> SplFileInfo
>
>
> SplFileObject
>
> SplTempFileObject
>

**各种类及接口**

[PHP基本扩展 - SPL - 各种类及接口](./spl-misc-classes-interfaces.md)

> ArrayObject
>
>
> SplObserver
>
> SplSubject
>