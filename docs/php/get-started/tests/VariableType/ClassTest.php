<?php

namespace Tests\VariableType;


use Php\VariableType\ClassChainDemo;
use PHPUnit\Framework\TestCase;

class ClassTest extends TestCase
{
    /**
     * 文字长度处理
     */
    public function testChain()
    {
        $name = (new ClassChainDemo())->setName('duoli')->name();
        $this->assertEquals('duoli', $name);
    }
}