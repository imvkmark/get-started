<?php

namespace Tests\Text;

use PHPUnit\Framework\TestCase;

class PcreTest extends TestCase
{

    public function testReplace(): void
    {
        $str = '    TAB SPACE';
        $this->assertEquals('TABSPACE', preg_replace('/\s+/', '', $str));
    }

    public function testMatchD(): void
    {
        $fun = function ($str) {
            preg_match_all('/.*(\D)/', $str, $end);
            return $end[1][0] ?? 'b';
        };

        $this->assertEquals('b', $fun('111111'));
        $this->assertEquals('a', $fun('a11111'));
        $this->assertEquals('a', $fun('1a1111'));
        $this->assertEquals('a', $fun('11111a'));

        $this->assertEquals('a', $fun('ua11111'));
        $this->assertEquals('a', $fun('u1a1111'));
        $this->assertEquals('a', $fun('111u11a'));
    }


}