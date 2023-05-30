<?php

namespace Tests\Math;

use PHPUnit\Framework\TestCase;

class MathTest extends TestCase
{
    /**
     * 文字长度处理
     */
    public function testRand(): void
    {
        for ($i = 0; $i < 100; $i++) {
            var_dump(mt_rand(0, 10000) / 100);
        }
    }

}