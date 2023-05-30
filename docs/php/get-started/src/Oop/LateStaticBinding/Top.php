<?php

namespace Php\Oop\LateStaticBinding;

class Top
{
    public static function who(): string
    {
        return __CLASS__;
    }

    public static function test(): string
    {
        // 后期静态绑定从这里开始
        return static::who();
    }
}