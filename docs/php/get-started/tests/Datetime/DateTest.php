<?php

namespace Tests\Datetime;

use PHPUnit\Framework\TestCase;

class DateTest extends TestCase
{

    public function testStr()
    {
        $this->assertTrue('2020-06-02 04:05:04' > '2020-06-02 04:05:03');
        $this->assertTrue('2020-06-02 04:05:04' > '2020-06-02 04:05:02');
    }
}