<?php

namespace Php\Oop\LateStaticBinding;

class Father extends Top
{
    public static function who(): string
    {
        return __CLASS__;
    }
}