<?php

namespace Tests\Other;

use PHPUnit\Framework\TestCase;

class NetworkTest extends TestCase
{

    public function testIp2Long()
    {
        $ranges = [
            ['1.0.0.0', '127.255.255.255'],   // 16777216-2147483647
            ['128.0.0.0', '191.255.255.255'], // 2147483648-3221225471
            ['192.0.0.0', '224.255.255.255'], // 3221225472-3774873599
            ['192.0.0.0', '223.255.255.255'], // 3221225472-3758096383
            ['240.0.0.0', '247.255.255.255'], // 4026531840-4160749567
            ['248.0.0.0', '255.255.255.255'], // 4160749568-4294967295
        ];
        foreach ($ranges as $range) {
            $this->assertGreaterThan(0, ip2long($range[0]));
            $this->assertGreaterThan(0, ip2long($range[1]));
        }
    }
}