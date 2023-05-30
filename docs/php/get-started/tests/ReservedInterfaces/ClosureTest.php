<?php

namespace Tests\ReservedInterfaces;

use PHPUnit\Framework\TestCase;

class ClosureTest extends TestCase
{
    private string $interVar = 'inter';

    public function testCopy()
    {
        $message = 'hello';

        // 继承 $message, 可以考虑定义为值复制的形式来定义的函数
        // 闭包的父作用域是定义该闭包的函数
        $copy = function () use ($message) {
            return $message;
        };
        $this->assertEquals('hello', $copy());
        $message = 'world';
        $this->assertEquals('hello', $copy());
        $message = 'go';
        $this->assertEquals('go', $message);

    }

    public function testRef()
    {
        // 引用定义, 这样在变量变化之后, 函数中也取的是最新的数据
        $ref = function () use (&$message) {
            return $message;
        };
        $this->assertEquals('world', $ref());
        $message = 'hello';
        $this->assertEquals('hello', $ref());
    }

    public function testBind()
    {
        // 默认当前类的作用域在匿名函数中可见
        $defaultBind = function () {
            return $this->interVar;
        };
        $this->assertEquals('inter', $defaultBind());

        // $this 在静态匿名函数中不可用
        // $static = static function () {
        //     return $this;
        // };

        // 创建无 $this 的闭包是不被支持的
        // Unbinding $this of closure is deprecated ..
        // \Closure::bind(function(){
        //     var_dump($this);
        // }, null);
        $closure = function () {
            return get_class($this);
        };
        // 重新绑定, 返回一个新的 Closure 对象
        $bindClosure = $closure->bindTo(new ClosureBind());
        $this->assertEquals('Closure', get_class($bindClosure));
    }

    // 静态匿名函数无法绑定到类中
    public function testStatic()
    {
        $plus = static function ($a, $b) {
            return $a + $b;
        };
        $this->assertEquals(3, $plus(1, 2));
    }
}