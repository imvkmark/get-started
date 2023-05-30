<?php

namespace Tests\VariableType;


use PHPUnit\Framework\TestCase;

class ArrayTest extends TestCase
{

    public function testMerge(): void
    {
        $item1 = [
            1 => 'Y',
        ];
        $item2 = [
            9 => 'N',
        ];

        $this->assertArrayNotHasKey(9, array_merge($item1, $item2));
    }

    /**
     * 文字长度处理
     */
    public function testReset(): void
    {
        $arr = [
            'f' => 'n',
        ];
        $this->assertIsNotArray(reset($arr));
    }

    public function testDiff(): void
    {
        $formerKey = array_keys([
            'hot_num' => 4,
        ]);
        $updateKey = array_keys([
            'password' => '2333',
        ]);
        $diffKeys  = array_diff($updateKey, $formerKey);
        $this->assertEquals('password', reset($diffKeys));

        $total       = [1, 3, 5, 7, 9, 10];
        $append      = [1, 4, 5, 7, 11];
        $appendDiff  = array_diff($append, $total);
        $appendDiff2 = array_diff($total, $append);
        $this->assertCount(2, $appendDiff);
        $this->assertCount(3, $appendDiff2);
    }

    public function testDiffKey(): void
    {
        $diffs = array_diff_key([
            'password' => '2333',
        ], [
            'hot_num' => 4,
        ]);
        $this->assertEquals('2333', $diffs['password']);
    }

    /**
     * flip 之后保留哪个
     */
    public function testFlip(): void
    {
        $arr = [
            'a' => '1',
            'b' => '1',
        ];
        $rev = array_flip($arr);
        $this->assertEquals('b', $rev['1']);
    }

    /**
     * 向数组头部追加数据
     */
    public function testUnshift(): void
    {
        $items = [
            'fun' => 'fun-v',
        ];
        $items = array_merge([
            'order' => 'order-v',
        ], $items);
        $this->assertCount(2, $items);
    }

    public function testPlus(): void
    {
        $arrayA = [
            'a' => -1,
            'b' => -2,
        ];
        $arrayB = [
            'b' => 2,
            'c' => 3,
        ];
        // question 面试题目, 数组相加的时候会出现的bug 问题
        $result = $arrayA + $arrayB;
        $this->assertEquals(-2, $result['b']);
    }


    public function testIsset(): void
    {
        $af = $d['a']['f'] ?? 'none';
        $this->assertEquals('none', $af, 'Isset Check');
    }

    public function testInArray(): void
    {
        $in = in_array('4', [2, 4], true);
        $this->assertFalse($in);
    }


    public function testPush(): void
    {
        $arr   = [];
        $arr[] = 1;
        $this->assertEquals([1], $arr);
    }

    public function testChunk(): void
    {
        $items = array_chunk([1, 2, 3, 4], 3);
        $this->assertCount(1, $items[1]);
    }


    /**
     * 数组中的数据
     * @return void
     */
    public function testIntersect(): void
    {
        $arr = [
            [1, 2, 3, 4],
            [3, 1, 6, 9],
            [1, 8],
            [1, 0, 9],
        ];
        $res = array_intersect(...$arr);
        $this->assertEquals(1, $res[0]);
    }

    /**
     * 数组迭代减少, 使用回调函数
     */
    public function testReduce(): void
    {
        $extensions = [
            'excel' => ['xlsx', 'xlsb', 'xls', 'xlsm'],
            'doc'   => ['docx', 'dotx'],
            'pdf'   => ['pdf'],
            'ppt'   => ['pptx', 'ppt', 'pps', 'potx', 'ppsm'],
        ];

        $values = array_reduce($extensions, function ($carry, $item) {
            return array_merge($carry, $item);
        }, []);
        $this->assertCount(12, $values);
    }


    public function testEnd(): void
    {
        $ends = ['a', 'b', 'c'];
        $this->assertEquals('c', end($ends));
    }

    public function testPushAndPop(): void
    {
        $stack = [];
        $this->assertCount(0, $stack);

        $stack[] = 'foo';
        $this->assertEquals('foo', $stack[count($stack) - 1]);
        $this->assertCount(1, $stack);

        $this->assertEquals('foo', array_pop($stack));
        $this->assertCount(0, $stack);
    }
}