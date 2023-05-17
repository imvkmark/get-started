# PHP基本扩展 - SPL - 各种类及接口

## ArrayObject

使用数组的方式来操作对象

```php
ArrayObject implements IteratorAggregate , ArrayAccess , Serializable , Countable {
    /* 常量 */
    const integer STD_PROP_LIST = 1 ;
    const integer ARRAY_AS_PROPS = 2 ;
    /* 方法 */
    public __construct ([ mixed $input [, int $flags = 0 [, string $iterator_class = "ArrayIterator" ]]] )
    public void append ( mixed $value )
    public void asort ( void )
    public int count ( void )
    public array exchangeArray ( mixed $input )
        更换操作对象

    public array getArrayCopy ( void )
    public int getFlags ( void )
        获取标记(定义的属性读取方式)

    public ArrayIterator getIterator ( void )
        通过一个实例获取一个新的迭代器

    public string getIteratorClass ( void )
        获取迭代器的类名称

    public void ksort ( void )
    public void natcasesort ( void )
    public void natsort ( void )
    public bool offsetExists ( mixed $index )
    public mixed offsetGet ( mixed $index )
    public void offsetSet ( mixed $index , mixed $newval )
    public void offsetUnset ( mixed $index )
    public void serialize ( void )
    [5.3]序列化

    public void setFlags ( int $flags )
    public void setIteratorClass ( string $iterator_class )
    public void uasort ( callable $cmp_function )
    public void uksort ( callable $cmp_function )
    public void unserialize ( string $serialized )
    [5.3]反序列化
}
```

## SplObserver

## SplSubject