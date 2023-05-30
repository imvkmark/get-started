<?php

namespace Tests\VariableType;


use PHPUnit\Framework\TestCase;

class ConstTest extends TestCase
{
    /**
     * PhpVersion >= 7.4
     */
    public function testPhpVersion(): void
    {
        $this->assertGreaterThanOrEqual(70400, PHP_VERSION_ID);
    }
}