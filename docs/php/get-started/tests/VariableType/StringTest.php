<?php

namespace Tests\VariableType;

use Php\Emoji;
use PHPUnit\Framework\TestCase;

class StringTest extends TestCase
{
    /**
     * 文字长度处理
     */
    public function testLength(): void
    {
        $str1 = '我和😀';
        $this->assertEquals(3, Emoji::length($str1));

        $str2 = '我和🇨🇳';
        $this->assertEquals(3, Emoji::length($str2));

        $str3 = '我和 ';
        $this->assertEquals(3, Emoji::length($str3));
    }

    public function testSet(): void
    {
        $str = 'abc';
        $this->assertEquals('b', $str[1]);

        $str[1] = 'a';
        $this->assertEquals('aac', $str);
    }

    public function testExplode(): void
    {
        $str = 'abc';
        [$arg] = explode('|', $str);
        $this->assertEquals('abc', $arg);
    }

    /**
     * 检查 0 在字符串中出现的次数
     * @return void
     */
    public function testCount(): void
    {
        $idfa = '9C287922-EE26-4501-94B5-DDE6F83E1475';
        $item = count_chars($idfa);
        $this->assertEquals(1, $item[ord('0')] ?? 0);
    }
}