<?php

namespace Tests\Oop;

use Php\Oop\LateStaticBinding\Father;
use PHPUnit\Framework\TestCase;

/**
 * 后期静态绑定
 */
class LateStaticBindingTest extends TestCase
{

    public function testStatic()
    {
        $this->assertEquals(Father::class, Father::test());
    }
}