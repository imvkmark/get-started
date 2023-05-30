<?php

namespace Tests\VariableType;

use Php\CaseClass;
use PHPUnit\Framework\TestCase;

class ObjectTest extends TestCase
{
    public function testSetGet(): void
    {
        $set = (new CaseClass())->getset();
        $this->assertEquals('getSet', $set);
    }
}