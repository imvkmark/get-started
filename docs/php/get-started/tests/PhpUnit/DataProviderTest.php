<?php


namespace Tests\PhpUnit;

use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{

    /**
     * @dataProvider plusProvider
     * @return void
     */
    public function testPlus($first, $second, $result)
    {
        $this->assertEquals($result, $first + $second);
    }

    public function plusProvider(): array
    {
        return [
            [1, 2, 3],
            [4, 5, 9],
            [4, 5, 8],
        ];
    }
}
