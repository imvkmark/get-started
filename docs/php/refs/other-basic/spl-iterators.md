# PHP基本扩展 - SPL - Iterators(迭代器)

## ArrayIterator

这个迭代器允许你删除或者修改键/值 当你遍历数组或者对象的时候

当你想遍历相同的数组多次, 你需要实例化一个 ArrayObject 并且建立一个 ArrayIterator 实例 来引用 foreach 循环或者手动调用 getIterator() 方法

```php
ArrayIterator implements ArrayAccess , SeekableIterator , Countable , Serializable {
    /* 方法 */
    public void append ( mixed $value )

          添加元素
    public void asort ( void )

          根据值排序数组
    public __construct ([ mixed $array = array() [, int $flags = 0 ]] )
    public int count ( void )

          获取数组中元素的数量
    public mixed current ( void )

          获取当前值
    public array getArrayCopy ( void )

          获取数组的复制
    public void getFlags ( void )

          获取当前的标志
    public mixed key ( void )

          当前键
    public void ksort ( void )

          根据键排序
    public void natcasesort ( void )

          大小写不敏感的自然排序
    public void natsort ( void )

          大小写敏感的自然排序
    public void next ( void )

          移动到下一个
    public void offsetExists ( string $index )

          是否存在这个索引
    public mixed offsetGet ( string $index )

          获取索引所在的值
    public void offsetSet ( string $index , string $newval )

          设置索引所在的值
    public void offsetUnset ( string $index )

          unset 掉这个值
    public void rewind ( void )

          重置
    public void seek ( int $position )

          寻找位置
    public string serialize ( void )

          [5.3]序列化数组
    public void setFlags ( string $flags )

          设置标志
    public void uasort ( string $cmp_function )

          用户值排序
    public void uksort ( string $cmp_function )

          用户键排序
    public string unserialize ( string $serialized )

          [5.3]反序列化
    public bool valid ( void )

          检测是否存在更多的值
}
```

1.1 RecursiveArrayIterator
2 EmptyIterator

本函数可能不工作

```php
EmptyIterator  implements Iterator  {

    /* 方法 */

    public void current ( void )

    public void key ( void )

    public void next ( void )

    public void rewind ( void )

    public void valid ( void )
}
```

3 IteratorIterator

迭代封装器允许转换任何可以转换的东西到迭代器, 最重要的是要明白大多数类没有实现迭代器功能的最有可能的原因是没有实现完整的迭代器特性. 技术应该避免出现错误或者异常信息.

```php
IteratorIterator implements OuterIterator {
     /* 方法 */
     public __construct ( Traversable $iterator )

          将可以转换的建立成一个迭代器
     public mixed current ( void )

          当前值
     public Traversable getInnerIterator ( void )

          内部迭代器
     public scalar key ( void )

          键
     public void next ( void )

          移动到下一个元素
     public void rewind ( void )

          重置
     public bool valid ( void )

          是否可用

```

3.1 AppendIterator

附加迭代器,该附加迭代器不会破坏原有数组中的键值关系.

[http://www.php.net/manual/en/appenditerator.construct.php](http://www.php.net/manual/en/appenditerator.construct.php)

在迭代器之间循环迭代

```php
AppendIterator extends IteratorIterator implements OuterIterator {
     /* 方法 */
     public __construct ( void )

     public void append ( Iterator $iterator )

          添加迭代器
     public mixed current ( void )

          获取当前值
     public void getArrayIterator ( void )

          获取数组迭代器, 用来存储 AppendIterator::append() 添加的迭代器
     public Iterator getInnerIterator ( void )

          返回当前的内部迭代器
     public int getIteratorIndex ( void )

          返回当前内部迭代器的索引, 比如说附加了两个迭代器,一个迭代器的索引是0,另外一个就是1,这样的.
     public scalar key ( void )

          获取当前的键
     public void next ( void )

          移动到下一个元素

          如果是指的另外的一个迭代器,将重置另外的迭代器
     public void rewind ( void )

          重置
     public bool valid ( void )

          返回当前元素的有效性
}
```

> [Attention]
>
>
> 当使用 iterator_to_array() 函数需要将迭代器转换为数组的时候,需要将可选选项 use_key 设为false,否则的话,内部迭代器将会覆盖掉返回的数组,(
> 也就是将返回第一次内部迭代器循环的数据),如果返回的话,没有必要保留原始键值
>

CachingIterator

通过Iterator迭代器支持缓存的迭代器

```php
CachingIterator extends IteratorIterator implements OuterIterator , ArrayAccess , Countable {
    /* 常量 */
    const integer CALL_TOSTRING = 1 ;        // 转换所有元素->字串
    const integer CATCH_GET_CHILD = 16 ;     // 在访问子元素的时候不要抛出异常 
    const integer TOSTRING_USE_KEY = 2 ;     // 转换字串的时候使用 key
    const integer TOSTRING_USE_CURRENT = 4 ; // 使用 current 来转成字串
    const integer TOSTRING_USE_INNER = 8 ;   // 使用 inner 来转换字串
    const integer FULL_CACHE = 256 ;         // 缓存所有读取的数据
    /* 方法 */
    public __construct ( Iterator $iterator [, string $flags = self::CALL_TOSTRING ] )
    public int count ( void )

       // 数量
    public void current ( void )
        // 返回当前元素
    public void getCache ( void )
        // 获取缓存
    public void getFlags ( void )
        // 获取 flags
    public Iterator getInnerIterator ( void )
        // 获取内部迭代器
    public void hasNext ( void )
        // 检查是否存在另一个元素
    public scalar key ( void )

       // 键
    public void next ( void )

       // 下一个
    public void offsetExists ( string $index )
        // 存在这个索引
    public void offsetGet ( string $index )
        // 获取索引
    public void offsetSet ( string $index , string $newval )
        // 设置索引
    public void offsetUnset ( string $index )
        // unset
    public void rewind ( void )
    public void setFlags ( bitmask $flags )

       // 设置标识
    public void __toString ( void )
    public void valid ( void )
        // 是否可用
}
```

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

目录访问迭代器提供了一个访问文件系统目录的的接口

```php
DirectoryIterator  extends SplFileInfo  implements SeekableIterator  {

    /* 方法 */

    public __construct ( string $path )
        通过给定的路径建立一个新的目录迭代器

    public DirectoryIterator current ( void )
        获取当前的迭代器条目

    public int getATime ( void )
        返回当前目录的最近一次的访问时间

    public string getBasename ([ string $suffix  ] )
        获取文件全名,如果给定后缀名,则去掉后缀显示

    public int getCTime ( void )
        获取文件inode最后一次被修改的时间,返回unix 时间戳

    public string getExtension ( void )
        获取扩展

    public string getFilename ( void )
        获取当前条目的文件名称,和Basename不使用参数相同

    public int getGroup ( void )
        获取当前条目的组的id

    public int getInode ( void )
        获取当前条目的inode值

    public int getMTime ( void )
        文件上一次修改的unix时间戳

    public int getOwner ( void )
        文件所有者id

    public string getPath ( void )
        当前条目的路径,没有后缀 '/'

    public string getPathname ( void )
        获取文件的路径和文件名称,也就是说文件的完整位置

    public int getPerms ( void )
        当前文件的权限,以十进制形式返回

    public int getSize ( void )
        以字节形式返回文件的大小

    public string getType ( void )
        返回文件的类型,返回值有dir/file/link

    public bool isDir ( void )
        检测当前条目是否是目录

    public bool isDot ( void )
        检测当前条目是当前目录(.)或者是上级目录(..)

    public bool isExecutable ( void )
        检测文件是否是可执行文件

    public bool isFile ( void )
        检测是否是文件

    public bool isLink ( void )
        检测当前条目是否是快捷方式

    public bool isReadable ( void )
        检测当前条目是否可读

    public bool isWritable ( void )
        检测当前条目是否可写

    public string key ( void )
        返回键值

    public void next ( void )
        句柄下移一位

    public void rewind ( void )
        重置句柄

    public void seek ( int $position )
        移动到指定位置

    public string __toString ( void )
        以字串形式返回当前的迭代器条目

    public bool valid ( void )
        检测当前值是否可用
}
```

FilesystemIterator
GlobIterator
RecursiveDirectoryIterator