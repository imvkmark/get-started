<?php

namespace Tests\Other;

use PHPUnit\Framework\TestCase;

class JsonTest extends TestCase
{
    /**
     * 序列化小数
     * @return void
     */
    public function testFloat()
    {
        ini_set('serialize_precision', 17);
        $this->assertEquals(17, ini_get('serialize_precision'));
        $params = [
            'amount' => 2.1,
        ];
        $encode = json_encode($params);
        $this->outputVariables($encode);
    }
}