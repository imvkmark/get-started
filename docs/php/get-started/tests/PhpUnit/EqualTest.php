<?php


namespace Tests\PhpUnit;

use PHPUnit\Framework\TestCase;

class EqualTest extends TestCase
{

    /**
     * @return void
     */
    public function testArray()
    {
        $this->assertEquals(3, [], '数组不等于标量');
    }
}
