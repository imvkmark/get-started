<?php

namespace Tests\ControlStructure;

use PHPUnit\Framework\TestCase;

class ForeachTest extends TestCase
{
    public function testLoop()
    {
        $var    = 11000;
        $values = [];
        foreach ([0.65, 0.35] as $value) {
            $values[] = $var * $value;
        }
        /*
        var_dump($values);
        array(2) {
            [0]=>  float(7150)
            [1]=>  float(3850)
        }
         */

        $newValues = [];
        foreach ($values as $value) {
            $newValues[] = (int) ($value);
        }
        /*
        var_dump($newValues);
        array(2) {
            [0]=>  int(7150)
            [1]=>  int(3849)
        }
         */
        $this->assertLessThan($var, array_sum($newValues));
    }
}