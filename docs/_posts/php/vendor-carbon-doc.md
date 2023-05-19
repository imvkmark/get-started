---
title: "[转+] Carbon 中文文档"
date: 2022-04-20 19:01:10
toc: true
categories:
- ["Php","扩展"]
---

原文地址 : [Carbon中文文档](https://segmentfault.com/a/1190000012716974)


## 介绍
Carbon 是php的日期处理类库（A simple PHP API extension for DateTime.）。<br />`Carbon` 继承自PHP的 `DateTime` 类
```php
<?php
namespace Carbon;
class Carbon extends \DateTime
{
    // code here
}
```
Carbon 继承了PHP的 Datetime 类，所以 Carbon 中没有涉及到的，但在 Datetime 中已经实现的方法都是可以使用的。<br />Carbon 类声明在 Carbon 命名空间下，可以通过引入命名空间的方式来代替每次输入完整的类名。
```
<?php
use Carbon\Carbon;
```
> Note:如果在使用 Carbon 时，没有专门设置时区的话，默认使用 America/Toronto 的时区。

要特别留意是否使用了正确的时区，比如 Carbon 的所有差异比较都使用 UTC 或者系统设定的时区。
```
<?php
$dtToronto = Carbon::createFromDate(2012, 1, 1, 'America/Toronto');
$dtVancouver = Carbon::createFromDate(2012, 1, 1, 'America/Vancouver');
echo $dtVancouver->diffInHours($dtToronto); // 3
```
以上进行的时间比较是在提供的 Carbon 实例所在的时区下完成的。例如作者所在的时区为 东京时间减13 小时，因此在下午一点后。`Carbon::now(‘Asia/Tokyo’)->isToday()` 将会返回 false ，如果在调用 `now()` 时设置时区为东京时区，接下来的操作都使用东京时区是说不过去的。所以在与 `now()` 创建的实例进行比较时，默认是在当前时区下完成的。

## 初始化
有好几种方式可以创建 Carbon 的实例，但是大家应该更倾向于通过这种语义化的静态方法来实现。
```
<?php
$carbon = new Carbon();                  // equivalent to Carbon::now()
$carbon = new Carbon('first day of January 2008', 'America/Vancouver');
echo get_class($carbon);                 // 'Carbon\Carbon'
$carbon = Carbon::now(-5);
```
值得注意的是，Carbon 构造器的第二个参数被增强到了不仅限于是 DateTimeZone 实例，还可以是 String、Integer (表示相对于GMT的偏移值)。举个栗子来说明下 now() 方法。
```
<?php
$now = Carbon::now();
$nowInLondonTz = Carbon::now(new DateTimeZone('Europe/London'));
// or just pass the timezone as a string
$nowInLondonTz = Carbon::now('Europe/London');
// or to create a date with a timezone of +1 to GMT during DST then just pass an integer
echo Carbon::now(1)->tzName;             // Europe/London
```
你将会喜欢上用 parse() 方法来代替原有繁琐的构造方式
```
<?php
echo (new Carbon('first day of December 2008'))->addWeeks(2);     // 2008-12-15 00:00:00
echo Carbon::parse('first day of December 2008')->addWeeks(2);    // 2008-12-15 00:00:00
```
类似 now() 这样直接返回 Carbon 实例的方法还有 today(), tomorrow(),yesterday()，他们都接受一个 timezone 类型的参数，最后得到的结果时间部分都是 00:00:00
```
<?php
$now = Carbon::now();
echo $now;                               // 2016-06-24 15:18:34
$today = Carbon::today();
echo $today;                             // 2016-06-24 00:00:00
$tomorrow = Carbon::tomorrow('Europe/London');
echo $tomorrow;                          // 2016-06-25 00:00:00
$yesterday = Carbon::yesterday();
echo $yesterday;                         // 2016-06-23 00:00:00
```
下面是一些其他的 creatXXX() 形式的静态方法。绝大多数静态方法的参数是可传可不传的，如果不传的话会使用方法预设的默认值，这些预设值一般都是针对当前日期、时间、时区的。如果为传递某个必要参数，会抛出一个 InvalidArgumentException 类型的异常，用 DateTime::getLastErrors() 方法可以得到异常的详细信息。
```
<?php
Carbon::createFromDate($year, $month, $day, $tz);
Carbon::createFromTime($hour, $minute, $second, $tz);
Carbon::create($year, $month, $day, $hour, $minute, $second, $tz);
```
createFromDate() 默认返回当前时间，createFromTime()日期默认是今天。crete() 所有为 null 的参数都将默认为当前对应的时间。同样，时区也默认是当前时区。如果只设置了小时数没有设置分秒那么分秒默认是 0
```
<?php
$xmasThisYear = Carbon::createFromDate(null, 12, 25);  // Year defaults to current year
$Y2K = Carbon::create(2000, 1, 1, 0, 0, 0);
$alsoY2K = Carbon::create(1999, 12, 31, 24);
$noonLondonTz = Carbon::createFromTime(12, 0, 0, 'Europe/London');
// A two digit minute could not be found
try { 
    Carbon::create(1975, 5, 21, 22, -2, 0); 
} catch(InvalidArgumentException $x) { 
    echo $x->getMessage(); 
}
```
```
<?php
Carbon::createFromFormat($format, $time, $tz);
```
createFromFormat() 与php的DateTime::createFromFormat。不同之处是 $dt 参数可以是 DateTImeZone 的实例或者一个时区的字符串。并且可以会返回参数异常的提示。从createXX()的源码可以看出，他们都调用了createFromFormat()方法。
```
<?php
echo Carbon::createFromFormat('Y-m-d H', '1975-05-21 22')->toDateTimeString(); // 1975-05-21 22:00:00
```
最后提到的这两个create方法都是处理Unix时间戳的。第一个将会返回一个等于预期时间戳的 Carbon 实例，时区可以设置也可以选用默认值。第二个方法，createFromTimestampUTC() 与第一个不同的是时区将始终是 UTC(GMT) .第一个方法的第二个示例，只是为了让这个函数的用法展现的更加明确。Negative timestamps are also allowed.
```
<?php
echo Carbon::createFromTimestamp(-1)->toDateTimeString();                        // 1969-12-31 18:59:59
echo Carbon::createFromTimestamp(-1, 'Europe/London')->toDateTimeString();       // 1970-01-01 00:59:59
echo Carbon::createFromTimeStampUTC(-1)->toDateTimeString();                     // 1969-12-31 23:59:59
```
copy() 方法可以copy一个已经存在的 Carbon 实例。对copy生成实例进行修改并不会影响被copy对象的本身。
```
<?php
$dt = Carbon::now();
echo $dt->diffInYears($dt->copy()->addYear());  // 1
// $dt was unchanged and still holds the value of Carbon:now()
```
最后，当你正在使用的 DateTime 实例是通过实例化其他继承了 DateTime 库而得到的，别怕！通过下边的方式仍然可以极其友好创建 Carbon 实例。
```
<?php
$dt = new \DateTime('first day of January 2008'); // <== instance from another API
$carbon = Carbon::instance($dt);
echo get_class($carbon);                               // 'Carbon\Carbon'
echo $carbon->toDateTimeString();                      // 2008-01-01 00:00:00
```
关于毫秒的一些处理。php自带的 DateTime 类也可以设置毫秒，但是在进行日期的数学预算时并不会考虑毫秒。从 Carbon 1.12.0版本起，实例化、copy也能像 format() 方法一样支持毫秒（PHP默认的只有 Datetime::format() 支持毫秒）。
```
<?php
$dt = Carbon::parse('1975-05-21 22:23:00.123456');
echo $dt->micro;                                       // 123456
echo $dt->copy()->micro;                               // 123456
```
获取PHP支持的有效时间取值范围：最早时间、最晚时间
```
<?php
echo Carbon::maxValue();                               // '2038-01-18 22:14:07'
echo Carbon::minValue();                               // '1901-12-13 15:45:52'
```

## 本地化
Carbon中，formatLocalized() 方法通过调用 strftime() 方法，弥补了php底层的 DateTime 类不支持区域化设置的缺陷。如果你已经通过使用 setlocale() 方法设置过当前区域，formatLocalized($format) 方法将会按照设置的区域格式进行返回。
```
<?php
setlocale(LC_TIME, 'German');
echo $dt->formatLocalized('%A %d %B %Y');          // Mittwoch 21 Mai 1975
setlocale(LC_TIME, '');
echo $dt->formatLocalized('%A %d %B %Y');          // Wednesday 21 May 1975
```
diffForHumans() 的结果也会被转化成区域语言。通过Carbon::setLocale() 方法可以设置 Carbon 的区域语言。
```
<?php
Carbon::setLocale('de');
echo Carbon::now()->addYear()->diffForHumans();    // in 1 Jahr
Carbon::setLocale('en');
```
> 注意:如果在linux系统中转换出现了问题，请仔细检查安装在本地或生产系统中语言环境。

```
locale -a 列举出所有可用的语言环境
sudo locale-gen zh_CN.utf8 安装新的语言环境
sudo dpkg-reconfigure locales 配置启用新的语言环境，并重启
```

## 测试 Aids
通过测试方法可以得到一个模拟或真实的 Carbon 实例。只有在一下情况下，主动提供的 Carbon 实例才会被特殊处理：

- 调用静态方法 now()，例如： Varbon::now()
- 传给 construct 或 parse() 方法的是 null (或空字符串)，例如：new Carbon(null)
- 当传给 construct 或 parse()的是字符串 now，例如：new Carbon(‘now’)
```
$knownDate = Carbon::create(2001, 5, 21, 12);          // create testing date
Carbon::setTestNow($knownDate);                        // set the mock (of course this could be a real mock object)
echo Carbon::now();                                    // 2001-05-21 12:00:00
echo new Carbon();                                     // 2001-05-21 12:00:00
echo Carbon::parse();                                  // 2001-05-21 12:00:00
echo new Carbon('now');                                // 2001-05-21 12:00:00
echo Carbon::parse('now');                             // 2001-05-21 12:00:00
var_dump(Carbon::hasTestNow());                        // bool(true)
Carbon::setTestNow();                                  // clear the mock
var_dump(Carbon::hasTestNow());                        // bool(false)
echo Carbon::now();
```
有用的例子：
```
class SeasonalProduct
{
    protected $price;
    public function __construct($price)
    {
        $this->price = $price;
    }
    public function getPrice() {
        $multiplier = 1;
        if (Carbon::now()->month == 12) {
            $multiplier = 2;
        }
        return $this->price * $multiplier;
    }
}
$product = new SeasonalProduct(100);
Carbon::setTestNow(Carbon::parse('first day of March 2000'));
echo $product->getPrice();                                             // 100
Carbon::setTestNow(Carbon::parse('first day of December 2000'));
echo $product->getPrice();                                             // 200
Carbon::setTestNow(Carbon::parse('first day of May 2000'));
echo $product->getPrice();                                             // 100
Carbon::setTestNow();
```
一些相关的用法也可以得到一个模拟的 now 实例，返回相应的模拟数据。
```
$knownDate = Carbon::create(2001, 5, 21, 12);          // create testing date
Carbon::setTestNow($knownDate);                        // set the mock
echo new Carbon('tomorrow');                           // 2001-05-22 00:00:00  ... notice the time !
echo new Carbon('yesterday');                          // 2001-05-20 00:00:00
echo new Carbon('next wednesday');                     // 2001-05-23 00:00:00
echo new Carbon('last friday');                        // 2001-05-18 00:00:00
echo new Carbon('this thursday');                      // 2001-05-24 00:00:00
Carbon::setTestNow();
```
以下是当前支持的时间转换字

- this
- net
- last
- this
- next
- last
- tomorrow
- yesterday
- +
- -
- first
- last
- ago

值得注意的是像 next() , previous() 和 modify() 方法等相关的修改会把日期的时间部分设置成 00:00:00 。

## 获取
获取器通过PHP的 __get() 方式实现。可以直接通过一下方式直接获取到属性的值。
```
$dt = Carbon::parse('2012-9-5 23:26:11.123789');
// These getters specifically return integers, ie intval()
var_dump($dt->year);                                         // int(2012)
var_dump($dt->month);                                        // int(9)
var_dump($dt->day);                                          // int(5)
var_dump($dt->hour);                                         // int(23)
var_dump($dt->minute);                                       // int(26)
var_dump($dt->second);                                       // int(11)
var_dump($dt->micro);                                        // int(123789)
var_dump($dt->dayOfWeek);                                    // int(3)
var_dump($dt->dayOfYear);                                    // int(248)
var_dump($dt->weekOfMonth);                                  // int(1)
var_dump($dt->weekOfYear);                                   // int(36)
var_dump($dt->daysInMonth);                                  // int(30)
var_dump($dt->timestamp);                                    // int(1346901971)
var_dump(Carbon::createFromDate(1975, 5, 21)->age);          // int(41) calculated vs now in the same tz
var_dump($dt->quarter);                                      // int(3)
// Returns an int of seconds difference from UTC (+/- sign included)
var_dump(Carbon::createFromTimestampUTC(0)->offset);         // int(0)
var_dump(Carbon::createFromTimestamp(0)->offset);            // int(-18000)
// Returns an int of hours difference from UTC (+/- sign included)
var_dump(Carbon::createFromTimestamp(0)->offsetHours);       // int(-5)
// Indicates if day light savings time is on
var_dump(Carbon::createFromDate(2012, 1, 1)->dst);           // bool(false)
var_dump(Carbon::createFromDate(2012, 9, 1)->dst);           // bool(true)
// Indicates if the instance is in the same timezone as the local timezone
var_dump(Carbon::now()->local);                              // bool(true)
var_dump(Carbon::now('America/Vancouver')->local);           // bool(false)
// Indicates if the instance is in the UTC timezone
var_dump(Carbon::now()->utc);                                // bool(false)
var_dump(Carbon::now('Europe/London')->utc);                 // bool(false)
var_dump(Carbon::createFromTimestampUTC(0)->utc);            // bool(true)
// Gets the DateTimeZone instance
echo get_class(Carbon::now()->timezone);                     // DateTimeZone
echo get_class(Carbon::now()->tz);                           // DateTimeZone
// Gets the DateTimeZone instance name, shortcut for ->timezone->getName()
echo Carbon::now()->timezoneName;                            // America/Toronto
echo Carbon::now()->tzName;                                  // America/Toronto
```

## 设置
Setters 通过PHP的 __set() 方法实现。值得注意的是，通过这种方式设置时间戳时，时区不会相对于时间戳而改变。如果需要改变时区的话，需要针对时区单独设置。
```
$dt = Carbon::now();
$dt->year = 1975;
$dt->month = 13;             // would force year++ and month = 1
$dt->month = 5;
$dt->day = 21;
$dt->hour = 22;
$dt->minute = 32;
$dt->second = 5;
$dt->timestamp = 169957925;  // This will not change the timezone
// Set the timezone via DateTimeZone instance or string
$dt->timezone = new DateTimeZone('Europe/London');
$dt->timezone = 'Europe/London';
$dt->tz = 'Europe/London';
```

## 快捷设置 (Fluent Setters)
此处 Setters 方法的参数是必选参数，Carbon 提供了更多种设置方式可供使用。值得注意的是，所有对于时区的修改都会影响整个到 Carbon 实例。对时间戳进行修改时不会自动转换到时间戳对应的时区。
```
$dt = Carbon::now();
$dt->year(1975)->month(5)->day(21)->hour(22)->minute(32)->second(5)->toDateTimeString();
$dt->setDate(1975, 5, 21)->setTime(22, 32, 5)->toDateTimeString();
$dt->setDateTime(1975, 5, 21, 22, 32, 5)->toDateTimeString();
$dt->timestamp(169957925)->timezone('Europe/London');
$dt->tz('America/Toronto')->setTimezone('America/Vancouver');
```

## 检查属性是否调用
当尝试调用 Carbon 实例的属性时，会首先检查该属性是否存在，存在返回 true，不存在返回 false。
```
var_dump(isset(Carbon::now()->iDoNotExist));       // bool(false)
var_dump(isset(Carbon::now()->hour));              // bool(true)
var_dump(empty(Carbon::now()->iDoNotExist));       // bool(true)
var_dump(empty(Carbon::now()->year));              // bool(false)
```

## 字串格式化
所有类似 toXXXString() 这样的方法都依赖于DateTime::format()。__toString() 方法允许 Carbon 实例被打印时以一种可读性更好的方式被打印出来。
```
$dt = Carbon::create(1975, 12, 25, 14, 15, 16);
var_dump($dt->toDateTimeString() == $dt);          // bool(true) => uses __toString()
echo $dt->toDateString();                          // 1975-12-25
echo $dt->toFormattedDateString();                 // Dec 25, 1975
echo $dt->toTimeString();                          // 14:15:16
echo $dt->toDateTimeString();                      // 1975-12-25 14:15:16
echo $dt->toDayDateTimeString();                   // Thu, Dec 25, 1975 2:15 PM
// ... of course format() is still available
echo $dt->format('l jS \\of F Y h:i:s A');         // Thursday 25th of December 1975 02:15:16 PM
```
另外可以默认设置 __toString() 方法所要显示的时间日期格式。
```
Carbon::setToStringFormat('jS \o\f F, Y g:i:s a');
echo $dt;                                          // 25th of December, 1975 2:15:16 pm
Carbon::resetToStringFormat();
echo $dt;                                          // 1975-12-25 14:15:16
```
> 如果需要设定特定的语言显示，请参考 Localization 部分。


## 通用格式化
下面是对 DateTime 类提供的通用格式的一些封装。
```
$dt = Carbon::now();
// $dt->toAtomString() is the same as $dt->format(DateTime::ATOM);
echo $dt->toAtomString();      // 1975-12-25T14:15:16-05:00
echo $dt->toCookieString();    // Thursday, 25-Dec-1975 14:15:16 EST
echo $dt->toIso8601String();   // 1975-12-25T14:15:16-0500
echo $dt->toRfc822String();    // Thu, 25 Dec 75 14:15:16 -0500
echo $dt->toRfc850String();    // Thursday, 25-Dec-75 14:15:16 EST
echo $dt->toRfc1036String();   // Thu, 25 Dec 75 14:15:16 -0500
echo $dt->toRfc1123String();   // Thu, 25 Dec 1975 14:15:16 -0500
echo $dt->toRfc2822String();   // Thu, 25 Dec 1975 14:15:16 -0500
echo $dt->toRfc3339String();   // 1975-12-25T14:15:16-05:00
echo $dt->toRssString();       // Thu, 25 Dec 1975 14:15:16 -0500
echo $dt->toW3cString();       // 1975-12-25T14:15:16-05:00
```

## 比较
通过以下方式可以对两个 Carbon 实例进行简单的比较。牢记这些比较都是在UTC时区下完成的。
```
echo Carbon::now()->tzName;                        // America/Toronto
$first = Carbon::create(2012, 9, 5, 23, 26, 11);
$second = Carbon::create(2012, 9, 5, 20, 26, 11, 'America/Vancouver');
echo $first->toDateTimeString();                   // 2012-09-05 23:26:11
echo $first->tzName;                               // America/Toronto
echo $second->toDateTimeString();                  // 2012-09-05 20:26:11
echo $second->tzName;                              // America/Vancouver
var_dump($first->eq($second));                     // bool(true)
var_dump($first->ne($second));                     // bool(false)
var_dump($first->gt($second));                     // bool(false)
var_dump($first->gte($second));                    // bool(true)
var_dump($first->lt($second));                     // bool(false)
var_dump($first->lte($second));                    // bool(true)
$first->setDateTime(2012, 1, 1, 0, 0, 0);
$second->setDateTime(2012, 1, 1, 0, 0, 0);         // Remember tz is 'America/Vancouver'
var_dump($first->eq($second));                     // bool(false)
var_dump($first->ne($second));                     // bool(true)
var_dump($first->gt($second));                     // bool(false)
var_dump($first->gte($second));                    // bool(false)
var_dump($first->lt($second));                     // bool(true)
var_dump($first->lte($second));                    // bool(true)
```
如果要判断当前实例对应的时间，是否在其他两个实例对应的时间之间，可以用 between() 方法。如果提供了第三个参数，并且为 true，将会进行 >= 和  和  <br />这些方法会在两个时间差值后增加一写描述，可能类似下边这四种：

- When comparing a value in the past to default now:
   - 1 hour ago
   - 5 months ago
- When comparing a value in the future to default now:
   - 1 hour from now
   - 5 months from now
- When comparing a value in the past to another value:
   - 1 hour before
   - 5 months before
- When comparing a value in the future to another value:
   - 1 hour after
   - 5 months after

你也可以传递第二个参数去掉类似 ago，from now 这种修饰符，类似这样的用法 diffForHumans(Carbon $other, true) 等。
```
// The most typical usage is for comments
// The instance is the date the comment was created and its being compared to default now()
echo Carbon::now()->subDays(5)->diffForHumans();               // 5 days ago
echo Carbon::now()->diffForHumans(Carbon::now()->subYear());   // 1 year after
$dt = Carbon::createFromDate(2011, 8, 1);
echo $dt->diffForHumans($dt->copy()->addMonth());              // 1 month before
echo $dt->diffForHumans($dt->copy()->subMonth());              // 1 month after
echo Carbon::now()->addSeconds(5)->diffForHumans();            // 5 seconds from now
echo Carbon::now()->subDays(24)->diffForHumans();              // 3 weeks ago
echo Carbon::now()->subDays(24)->diffForHumans(null, true);    // 3 weeks
```
你也通过在 diffForHumans() 被调用前，使用 Carbon::setLocale(‘fr’) 来改变语言设置。详细请参考 localization 部分。

## 修改
Carbon argument.这些方法组对修改当前实例很有帮助。你会注意到 startOfXXX()，next()，和 previous() 方法将会设置时间为 00:00:00，另外 endOfXXX() 方法将会设置时间为 23:59:59 。
```
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfDay();                            // 2012-01-31 00:00:00
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->endOfDay();                              // 2012-01-31 23:59:59
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfMonth();                          // 2012-01-01 00:00:00
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->endOfMonth();                            // 2012-01-31 23:59:59
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfYear();                           // 2012-01-01 00:00:00
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->endOfYear();                             // 2012-12-31 23:59:59
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfDecade();                         // 2010-01-01 00:00:00
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->endOfDecade();                           // 2019-12-31 23:59:59
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfCentury();                        // 2000-01-01 00:00:00
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->endOfCentury();                          // 2099-12-31 23:59:59
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->startOfWeek();                           // 2012-01-30 00:00:00
var_dump($dt->dayOfWeek == Carbon::MONDAY);        // bool(true) : ISO8601 week starts on Monday
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->endOfWeek();                             // 2012-02-05 23:59:59
var_dump($dt->dayOfWeek == Carbon::SUNDAY);        // bool(true) : ISO8601 week ends on Sunday
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->next(Carbon::WEDNESDAY);                 // 2012-02-01 00:00:00
var_dump($dt->dayOfWeek == Carbon::WEDNESDAY);     // bool(true)
$dt = Carbon::create(2012, 1, 1, 12, 0, 0);
echo $dt->next();                                  // 2012-01-08 00:00:00
$dt = Carbon::create(2012, 1, 31, 12, 0, 0);
echo $dt->previous(Carbon::WEDNESDAY);             // 2012-01-25 00:00:00
var_dump($dt->dayOfWeek == Carbon::WEDNESDAY);     // bool(true)
$dt = Carbon::create(2012, 1, 1, 12, 0, 0);
echo $dt->previous();                              // 2011-12-25 00:00:00
$start = Carbon::create(2014, 1, 1, 0, 0, 0);
$end = Carbon::create(2014, 1, 30, 0, 0, 0);
echo $start->average($end);                        // 2014-01-15 12:00:00
// others that are defined that are similar
//   firstOfMonth(), lastOfMonth(), nthOfMonth()
//   firstOfQuarter(), lastOfQuarter(), nthOfQuarter()
//   firstOfYear(), lastOfYear(), nthOfYear()
```

## 常量
Carbon 中定义了以下常量。
```
// These getters specifically return integers, ie intval()
var_dump(Carbon::SUNDAY);                          // int(0)
var_dump(Carbon::MONDAY);                          // int(1)
var_dump(Carbon::TUESDAY);                         // int(2)
var_dump(Carbon::WEDNESDAY);                       // int(3)
var_dump(Carbon::THURSDAY);                        // int(4)
var_dump(Carbon::FRIDAY);                          // int(5)
var_dump(Carbon::SATURDAY);                        // int(6)
var_dump(Carbon::YEARS_PER_CENTURY);               // int(100)
var_dump(Carbon::YEARS_PER_DECADE);                // int(10)
var_dump(Carbon::MONTHS_PER_YEAR);                 // int(12)
var_dump(Carbon::WEEKS_PER_YEAR);                  // int(52)
var_dump(Carbon::DAYS_PER_WEEK);                   // int(7)
var_dump(Carbon::HOURS_PER_DAY);                   // int(24)
var_dump(Carbon::MINUTES_PER_HOUR);                // int(60)
var_dump(Carbon::SECONDS_PER_MINUTE);              // int(60)
```
```
$dt = Carbon::createFromDate(2012, 10, 6);
if ($dt->dayOfWeek === Carbon::SATURDAY) {
    echo 'Place bets on Ottawa Senators Winning!';
}
```

## CarbonInterval 类
Carbon 类继承了PHP 的DateInterval类。
```
<?php
class CarbonInterval extends \DateInterval
{
    // code here
}
```
你也可以通过一下方法创建一个实例。
```
echo CarbonInterval::year();                           // 1 year
echo CarbonInterval::months(3);                        // 3 months
echo CarbonInterval::days(3)->seconds(32);             // 3 days 32 seconds
echo CarbonInterval::weeks(3);                         // 3 weeks
echo CarbonInterval::days(23);                         // 3 weeks 2 days
echo CarbonInterval::create(2, 0, 5, 1, 1, 2, 7);      // 2 years 5 weeks 1 day 1 hour 2 minutes 7 seconds
```
如果你继承的 DateInterval 实例来自其他类库，别怕，通过 instance() 这种友好的方式你手动可以创建一个 CarbonInterval 实例。
```
$di = new \DateInterval('P1Y2M'); // <== instance from another API
$ci = CarbonInterval::instance($di);
echo get_class($ci);                                   // 'Carbon\CarbonInterval'
echo $ci;                                              // 1 year 2 months
```
其他的一些辅助方法，但要注意这些辅助方法处理周时，只有天会被保存下来。并且是在当前实例的总天数基础上计算周。
```
echo CarbonInterval::year()->years;                    // 1
echo CarbonInterval::year()->dayz;                     // 0
echo CarbonInterval::days(24)->dayz;                   // 24
echo CarbonInterval::days(24)->daysExcludeWeeks;       // 3
echo CarbonInterval::weeks(3)->days(14)->weeks;        // 2  <-- days setter overwrites the current value
echo CarbonInterval::weeks(3)->weeks;                  // 3
echo CarbonInterval::minutes(3)->weeksAndDays(2, 5);   // 2 weeks 5 days 3 minutes
```
也有一个方便的 `forHumans()`，在调用 `__toString()` 方法时，自动执行，并打印出可读性更好的时间格式。
```
CarbonInterval::setLocale('fr');
echo CarbonInterval::create(2, 1)->forHumans();        // 2 ans 1 mois
echo CarbonInterval::hour()->seconds(3);               // 1 heure 3 secondes
CarbonInterval::setLocale('en');
```
当然，你可以通过 `CarbonInterval::setLocale('fr')` 来改变语言显示。

## 其他

### 处理 UTC 时间
```php
// utc 时间
$tz             = '2022-10-01T08:08:24.473Z';
$utcCarbon      = Carbon::parse($tz);

// 东八区时间  2022-10-01 16:08:24
$localeDatetime = $utcCarbon->timezone('Asia/Shanghai')->toDateTimeString();
```

