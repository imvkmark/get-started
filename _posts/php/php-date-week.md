---
title: "关于 Php 的周计算"
date: 2022-04-20 19:01:02
toc: true
categories:
- ["Php","语言参考"]
---

对于周计算(周榜)会在年底的时候出现了问题, 所以这里重新看了下关于周的定义并且重新改写了周函数, 如果不知道周定义, 函数的写法依旧会出现问题.

Php 的周定义是 ISO Week

我们看下定义
> ISO周日历系统是ISO 8601日期和时间标准的一部分，是一种闰周历系统。这个系统主要用在政府和商务的会计年度，用以维持时序。这个系统依据格里历的年度中特定的一个周日，决定该年是否要增加一个星期。
> 格里历的置闰循环是400年97个闰日，包含20,871个完整的星期。在每个循环中有71年会有额外的第53周，一年的平均长度是52.1775周；平均每个月有4.348125个星期。
> 一个ISO周数年（也可以简称为ISO年）有52或53个完整的星期，也就是以364天或371天取代了常用的365或366天。这额外增加出来的一个星期称为闰周，然而在ISO 8601并没有这个名词。每个星期从星期一开始。每年的第一个星期包含当年的第一个星期四（并且总是包含1月4日）。ISO周的年编号因此会稍微偏离1月1日几天。

这里有几个定义, 我们拿一个来进行说明, 详细[查看 wiki](https://zh.wikipedia.org/wiki/ISO%E9%80%B1%E6%97%A5%E6%9B%86)

![](https://file.wulicode.com/note/2021/11-11/15-55-19025.png)

下面是实现代码:



```php
/**
 * 根据日期返回每年的周数
 * 例如 2020-01-01 会返回 [2019,52] 周, 用于统计部分
 * @param string $date  日期
 * @param int    $start 默认以那一天作为第一天的开始
 * @return array
 */
public static function week(string $date, $start = Carbon::MONDAY): array
{
    /** @var Carbon $carbon */
    $carbon = Carbon::createFromFormat('Y-m-d', $date)->startOfWeek($start);
    $startWeek = (clone $carbon)->subDays($carbon->dayOfWeek - 1);
    $endWeek   = (clone $carbon)->addDays((7 - $carbon->dayOfWeek) % 7);
    if ($endWeek->format('W') === '01') {
        return [$endWeek->year, $endWeek->format('W')];
    }
    else {
        return [$startWeek->year, $startWeek->format('W')];
    }
}
```

