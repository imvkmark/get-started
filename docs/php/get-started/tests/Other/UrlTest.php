<?php

namespace Tests\Other;

use PHPUnit\Framework\TestCase;

class UrlTest extends TestCase
{

    public function testBuild(): void
    {
        $params = [
            'a' => ['b', 'c', 'd'],
        ];
        $string = urldecode(http_build_query($params));
        $this->assertEquals('a[0]=b&a[1]=c&a[2]=d', $string);

        $params = [
            'boards' => [
                ['from' => 'her'],
                ['from' => 'you'],
                ['from' => 'my'],
            ],
        ];
        $string = urldecode(http_build_query($params));
        $this->assertEquals('boards[0][from]=her&boards[1][from]=you&boards[2][from]=my', $string);

    }


    public function testParseUrl(): void
    {
        $url    = 'https://test-oss.aliyun.com/uploads/date/time/file.png';
        $parsed = parse_url($url);
        $this->assertEquals('/uploads/date/time/file.png', $parsed['path']);
    }
}