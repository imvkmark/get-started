<?php

namespace Tests\Classes;

use Php\XorEncrypt;
use PHPUnit\Framework\TestCase;

class XorEncryptTest extends TestCase
{
    public function testEncrypt()
    {
        $xor = new XorEncrypt();
        $val = $xor->xor('abcdefgh');
        $this->assertEquals('abcdefgh', $xor->xor($val));

        $val = $xor->xor('中文');
        $this->assertEquals('中文', $xor->xor($val));
    }

}
