<?php

namespace Tests\ControlStructure;


use PHPUnit\Framework\TestCase;

class WhileTest extends TestCase
{
    public function testDecrease()
    {
        $f         = 5;
        $loopTimes = 0;

        while ($f--) {
            $loopTimes++;
        }
        $this->assertEquals(5, $loopTimes);

        // 这里执行到 -1
        $this->assertEquals(-1, $f);

        $f         = 5;
        $loopTimes = 0;
        while ($f) {
            $f--;
            $loopTimes++;
        }
        $this->assertEquals(5, $loopTimes);

    }
}