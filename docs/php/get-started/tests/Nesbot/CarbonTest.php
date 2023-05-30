<?php

namespace Tests\Nesbot;


use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class CarbonTest extends TestCase
{
    /**
     * Diff 测试
     */
    public function testDiff(): void
    {
        $last30Min = Carbon::now()->subMinutes(30);
        $this->assertEquals(-30, Carbon::now()->diffInMinutes($last30Min, false));

        $feature30Min = Carbon::now()->addMinutes(31);
        $this->assertEquals(30, Carbon::now()->diffInMinutes($feature30Min, false));

        $ago = Carbon::now()->diffInDays(Carbon::createFromFormat('Y-m-d', '2017-09-09'), false);
        $this->assertGreaterThan($ago, 0);
    }

    public function testTz()
    {
        $tz             = '2022-10-01T08:08:24.473Z';
        $utcCarbon      = Carbon::parse($tz);
        $localeDatetime = $utcCarbon->timezone('Asia/Shanghai')->toDateTimeString();
        $this->assertEquals('2022-10-01 16:08:24', $localeDatetime);
    }

    /**
     * 解析日期
     */
    public function testParse(): void
    {
        $date = '2017-05-08';
        $this->assertEquals('20170508', Carbon::parse($date)->format('Ymd'), 'Carbon Parse Error');

        $date = '2017/05/08';
        $this->assertEquals('20170508', Carbon::parse($date)->format('Ymd'), 'Carbon Parse Error');

        $date = '2017/5/8';
        $this->assertEquals('20170508', Carbon::parse($date)->format('Ymd'), 'Carbon Parse Error');

        $datetime = '2017-05-08 02:05:22';
        $this->assertEquals('20170508020522', Carbon::parse($datetime)->format('Ymdhis'), 'Carbon Parse Error');

        $this->assertEquals('20170508020522', Carbon::make($datetime)->format('Ymdhis'), 'Carbon Parse Error');

        $date = '';
        $this->assertEquals(Carbon::parse($date)->format('Ymd'), Carbon::now()->format('Ymd'), 'Carbon Parse Error');
    }

    public function testCompare(): void
    {
        $now     = Carbon::now();
        $nowCopy = Carbon::now();
        $result  = $now->addMinutes(5)->greaterThan($nowCopy);
        $this->assertTrue($result);

        $this->assertFalse('2019-06-08 23:00:00' > '2019-06-09 02:00:00');
    }

    public function testFormat()
    {
        $carbon = Carbon::createFromFormat('Y-m-d', '2021-01-04');
        $w      = $carbon->format('W');
        var_dump($w);
    }
}