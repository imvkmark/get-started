# 日历和事件相关扩展 - Datetime

## 介绍

这些函数允许你从运行 PHP 的服务器获取时间和日期,你可以通过各种方式来处理这些日期.日期和时间信息在内部以 64
为数字存储,所以可以想到的任何时间的日期都是支持的(包括公元前纪年), 所有的时间都是基于内部的服务器设置.

## 安装

这些函数在 PHP5.2.0 中被支持.这也可以在 PHP5.1.X 中被支持,所以暂时不讨论,这些都是高级的东西,不讨论支持的方法,只是讨论高级的功能

## 配置

date.default_latitude “31.7667” PHP_INI_ALL 默认纬度

date.default_longitude “35.2333” PHP_INI_ALL 默认经度

date.sunrise_zenith “90.83” PHP_INI_ALL 默认日出天顶

date.sunset_zenith “90.83” PHP_INI_ALL 默认日落天顶

date.timezone "" PHP_INI_ALL 默认的时区

前四个配置选项目前仅用于 date_sunrise() 和 date_sunset()

## 函数

1. DateTime

从服务器获取时间或者使用函数来格式化时间 由于数据是以 64 位数字保存,所以数据可以延伸到负数的年份,所以时间可以延伸到
-2920 亿年前到 2920 亿年之前

```php
DateTime {

     /* 常量 */

     const string ATOM = "Y-m-d\TH:i:sP" ;

     const string COOKIE = "l, d-M-y H:i:s T" ;

     const string ISO8601 = "Y-m-d\TH:i:sO" ;

     const string RFC822 = "D, d M y H:i:s O" ;

     const string RFC850 = "l, d-M-y H:i:s T" ;

     const string RFC1036 = "D, d M y H:i:s O" ;

     const string RFC1123 = "D, d M Y H:i:s O" ;

     const string RFC2822 = "D, d M Y H:i:s O" ;

     const string RFC3339 = "Y-m-d\TH:i:sP" ;

     const string RSS = "D, d M Y H:i:s O" ;

     const string W3C = "Y-m-d\TH:i:sP" ;

     /* 方法 */

     public __construct ([ string $time = "now" [, DateTimeZone $timezone = NULL ]] )
     DateTime date_create ([ string $time = "now" [, DateTimeZone $timezone = NULL ]] )
          建立DateTime对象
          $time      指定的时间, 支持的格式:支持的时间和日期格式
          $timezone  DateTimeZone对象.

     public DateTime add ( DateInterval $interval )
     DateTime date_add ( DateTime $object , DateInterval $interval )
          [5.3.0]添加一定数量的时间间隔, DateInterval 对象
          添加一定的年份,月份,天数,小时,分钟数,秒数到 DateTime 对象
          $interval
               DateInterval对象

     public static DateTime createFromFormat ( string $format , string $time [, DateTimeZone $timezone ] )
     DateTime date_create_from_format ( string $format , string $time [, DateTimeZone $timezone ] )
          [5.3.0]返回一个根据指定格式格式化的对象
          $format       date可以指定的格式 PHP格式化时间支持的字串
          $time         根据格式指定的时间

     public DateInterval diff ( DateTime $datetime2 [, bool $absolute = false ] )
     DateInterval date_diff ( DateTime $datetime1 , DateTime $datetime2 [, bool $absolute = false ] )
          [5.3.0]返回两个datetime对象之间的时间差, 返回一个DateInterval对象
          $datetime2     datetime对象

     public string format ( string $format )
     string date_format ( DateTime $object , string $format )
          根据指定的格式返回格式化的字串
          $format     可以指定的格式 PHP格式化时间支持的字串

     public static array getLastErrors ( void )
     array date_get_last_errors ( void )
          [5.3.0]返回分析字串时候的最后一个错误记录

     public int getOffset ( void )
     int date_offset_get ( DateTime $object )
          返回时区偏移

     public int getTimestamp ( void )
     int date_timestamp_get ( DateTime $object )
          [5.3.0]获取unix时间戳

     public DateTimeZone getTimezone ( void )
     DateTimeZone date_timezone_get ( DateTime $object )
          获取timezone对象

     public DateTime modify ( string $modify )
     DateTime date_modify ( DateTime $object , string $modify )
          修改dateTime对象
          $modify  修改对象所根据的字串 PHP时间支持的时间和日期格式

     public static DateTime __set_state ( array $array )
          var_dump 调用的 __set_state对象

     public DateTime setDate ( int $year , int $month , int $day )
     DateTime date_date_set ( DateTime $object , int $year , int $month , int $day )
          根据指定的日期重置当前对象

     public DateTime setISODate ( int $year , int $week [, int $day = 1 ] )
     DateTime date_isodate_set ( DateTime $object , int $year , int $week [, int $day = 1 ] )
          根据ISO 8601 标准这只 date对象
          $year      指定的年份
          $week      指定的周
          $day       指定的一周的第几天
     public DateTime setTime ( int $hour , int $minute [, int $second = 0 ] )
     DateTime date_time_set ( DateTime $object , int $hour , int $minute [, int $second = 0 ] )
          设置时间

     public DateTime setTimestamp ( int $unixtimestamp )
     DateTime date_timestamp_set ( DateTime $object , int $unixtimestamp )
          [5.3.0]基于unix时间戳来重置对象

     public DateTime setTimezone ( DateTimeZone $timezone )
     DateTime date_timezone_set ( DateTime $object , DateTimeZone $timezone )
          设置时区
          $timezone     dateTimeZone对象

     public DateTime sub ( DateInterval $interval )
     DateTime date_sub ( DateTime $object , DateInterval $interval )
          [5.3.0]减少指定的时间, 月份,小时,通过 dateInterval对象
          $interval      dateInterval对象

     public DateTime __wakeup ( void )
}
```

1. DateTimeZone

时区对象

```
DateTimeZone {

     /* 常量 */

     const integer AFRICA = 1 ;

     const integer AMERICA = 2 ;

     const integer ANTARCTICA = 4 ;
          南极洲

     const integer ARCTIC = 8 ;
          北极

     const integer ASIA = 16 ;

     const integer ATLANTIC = 32 ;
          大西洋

     const integer AUSTRALIA = 64 ;

     const integer EUROPE = 128 ;

     const integer INDIAN = 256 ;

     const integer PACIFIC = 512 ;
          太平洋

     const integer UTC = 1024 ;

     const integer ALL = 2047 ;

     const integer ALL_WITH_BC = 4095 ;

     const integer PER_COUNTRY = 4096 ;

     /* 方法 */

     public __construct ( string $timezone )
     DateTimeZone timezone_open ( string $timezone )
          建立一个Datetimezone对象
          $timezone     php支持的timezone列表 PHP 支持的时区列表

     public array getLocation ( void )
     array timezone_location_get ( DateTimeZone $object )
          [5.3.0]从时区对象获取时区信息
               country_code   国别代码
               latitude       纬度
               longitude      经度
               comments       备注信息

     public string getName ( void )
     string timezone_name_get ( DateTimeZone $object )
          获取时区的名称

     public int getOffset ( DateTime $datetime )
     int timezone_offset_get ( DateTimeZone $object , DateTime $datetime )
          获取相对于GMT的时间差

     public array getTransitions ([ int $timestamp_begin [, int $timestamp_end ]] )
     array timezone_transitions_get ( DateTimeZone $object [, int $timestamp_begin [, int $timestamp_end ]] )
          获取所有时区的转变

     public static array listAbbreviations ( void )
     array timezone_abbreviations_list ( void )
          返回包含dst, offset, timezonename 的缩写

     public static array listIdentifiers ([ int $what = DateTimeZone::ALL [, string $country = NULL ]] )
     array timezone_identifiers_list ([ int $what = DateTimeZone::ALL [, string $country = NULL ]] )
          列出所有的时区
          $what
               本类中定义的常量
          $country
               ISO 3166-1中指定的国别代码
}
```

1. DateInterval [5.3.0] 日期间隔的表示法

```
DateInterval {

     /* 属性 */

     public integer $y ;

     public integer $m ;

     public integer $d ;

     public integer $h ;

     public integer $i ;

     public integer $s ;

     public integer $invert ;

     public mixed $days ;

     /* 方法 */

     public __construct ( string $interval_spec )
          建立一个新的 DateInterval对象
          $interval_spec
               指定的规格, 这个格式开始于字符 "P" , 每一个区域是一个 integer 数值, 然后跟着一个designator, 如果区域包含时间元素, 指定的时间开始于T字符
               Y     years
               M     months
               D     days
               W     weeks.不要和D一起使用
               H     hours
               M     minutes
               S     seconds

     public static DateInterval createFromDateString ( string $time )
         [alias] date_interval_create_from_date_string()
          通过相对的时间部分建立一个DateInteval对象
          $time          相对时间部分

     public string format ( string $format )
          [alias]date_interval_format()
          格式化当前的 interval对象
          $format     每一个参数都使用%前缀
          %     %
          Y/y     至少两位年份
          M/m     月份/没有前缀
          D/d     日子/无前缀
          a       日期总数
          H/h     小时/无前缀
          I/i     分钟/无前缀
          S/s     秒钟/无前缀
          R       符号, - 表示 负的, + 表示正数
          r       符号, - 表示负的, 空表示正数
}
```

1. DatePeriod

```
DatePeriod implements Traversable {

     /* 常量 */

     const integer EXCLUDE_START_DATE = 1 ;

     /* 方法 */

     public__construct ( DateTime $start , DateInterval $interval , int $recurrences [, int $options ] )

     public__construct ( DateTime $start , DateInterval $interval , DateTime $end [, int $options ] )

     public__construct ( string $isostr [, int $options ] )
          建立datePeriod 对象
          $start         开始日期
          $interval      DateInterval对象
          $recurrences   反复次数
          $end           结束日期
          $isostr        包含ISO间隔的时间
          $options       选项:可以设置成的常量

}
```

Sample:

! https://file.wulicode.com/note/2021/11-11/15-59-30547.png

`bool checkdate ( int $month , int $day , int $year )`

验证一个格里高日期

```
 $month     [1-12]
 $day       在指定的天数范围内
 $year      [132767]
```

`string date_default_timezone_get ( void )` 以字串形式返回当前的默认时区设置 检测顺序:

- 用 date_default_timezone_set()函数设定的时区（如果设定了的话）
- TZ 环境变量（如果非空） [5.4 删除]
- date.timezone 配置选项（如果设定了的话）
- 自己推测（如果操作系统支持） [5.4 删除]
- 如果以上选择都不成功，则返回 UTC

`bool date_default_timezone_set ( string $timezone_identifier )`

设定用于一个脚本中所有日期时间函数的默认时区

```
 $timezone_identfier
     PHP 支持的时区列表
```

`array date_parse_from_format ( string $format , string $date )`

返回给定日期的详细信息

```
 $format     格式
 $date       日期
```

`array date_parse ( string $date )`

返回给定详细信息的关联数组

`array date_sun_info ( int $time , float $latitude , float $longitude )`

返回指定经纬度的日出日落时间和黄昏开始结束时间.

```
 $time       unix时间戳
 $latitude   纬度
 $longitude  经度
```

`mixed date_sunrise ( int $timestamp [, int $format [, float $latitude [, float $longitude [, float $zenith [, float $gmt_offset ]]]]] )`

返回给定的日期和地点的日出时间

```
 $timestamp     unix时间戳
 $format
      SUNFUNCS_RET_STRING       字串形式
      SUNFUNCS_RET_DOUBLE       浮点数形式
      SUNFUNCS_RET_TIMESTAMP    unix时间戳形式
 $latitude      北纬
 $longitude     东经
 $zenith        日中时间
 $gmtoffset     gmt偏移,指定的偏移小时时间
```

`mixed date_sunset ( int $timestamp [, int $format [, float $latitude [, float $longitude [, float $zenith [, float $gmt_offset ]]]]] )`

指定日期和地点的日落时间, 参数同上

`string date ( string $format [, int $timestamp ] )`

格式化一个本地时间

```
$format     PHP格式化时间支持的字串
$timestamp  默认是现在时间
```

`array getdate ([ int $timestamp ] )`

根据 timestamp 去掉包含有日期信息的结合数组

```
[seconds] => 40               秒
[minutes] => 58               分
[hours]   => 21               小时
[mday]    => 17               在月份中的第几天
[wday]    => 2                一周中的第几天
[mon]     => 6                月份
[year]    => 2003             年份
[yday]    => 167              一年中的第几天
[weekday] => Tuesday          星期几的完整表示
[month]   => June             月份的完整表示
[0]       => 1055901520       unix时间戳
```

! https://file.wulicode.com/note/2021/11-11/15-59-41150.png

`mixed gettimeofday ([ bool $return_float ] )`

取得当前时间

```
[sec] => 1073504408          秒
[usec] => 238215             微秒
[minuteswest] => 0           格林威治向西的分钟数
[dsttime] => 1               夏时令校正的类型
```

! https://file.wulicode.com/note/2021/11-11/15-59-52176.png

`string gmdate ( string $format [, int $timestamp ] )`

格式化一个 GMT 日期/时间

`int gmmktime ([ int $hour [, int $minute [, int $second [, int $month [, int $day [, int $year [, int $is_dst ]]]]]]] )`

返回 gmt 时间戳

`string gmstrftime ( string $format [, int $timestamp ] )`

格式化时间

`int idate ( string $format [, int $timestamp ] )`

将本地世家日期格式化为整数

```
$format    只接受一个字符作为format参数.
```

`array localtime ([ int $timestamp [, bool $is_associative ]] )`

取得本地时间

```
 $timestamp          默认是 time()
 $is_associative     是否关联数组
[tm_sec] => 24
[tm_min] => 3
[tm_hour] => 19
[tm_mday] => 3
[tm_mon] => 3
[tm_year] => 105
[tm_wday] => 0
[tm_yday] => 92
[tm_isdst] => 1
```

! https://file.wulicode.com/note/2021/11-11/16-00-07003.png

`mixed microtime ([ bool $get_as_float ] )`

返回 unix 时间戳和微秒数

`int mktime ([ int $hour [, int $minute [, int $second [, int $month [, int $day [, int $year [, int $is_dst ]]]]]]] )`

取得一个日期的 unix 时间戳

`string strftime ( string $format [, int $timestamp ] )`

根据区域设置格式化本地时间/日期

```
$format
    %a - 当前区域星期几的简写
    %A - 当前区域星期几的全称
    %b - 当前区域月份的简写
    %B - 当前区域月份的全称
    %c - 当前区域首选的日期时间表达
    %C - 世纪值（年份除以 100 后取整，范围从 00 到 99）
    %d - 月份中的第几天，十进制数字（范围从 01 到 31）
    %D - 和 %m/%d/%y 一样
    %e - 月份中的第几天，十进制数字，一位的数字前会加上一个空格（范围从 ' 1' 到 '31'）
    %g - 和 %G 一样，但是没有世纪
    %G - 4 位数的年份，符合 ISO 星期数（参见 %V）。和 %V 的格式和值一样，只除了如果 ISO 星期数属于前一年或者后一年，则使用那一年。
    %h - 和 %b 一样
    %H - 24 小时制的十进制小时数（范围从 00 到 23）
    %I - 12 小时制的十进制小时数（范围从 00 到 12）
    %j - 年份中的第几天，十进制数（范围从 001 到 366）
    %m - 十进制月份（范围从 01 到 12）
    %M - 十进制分钟数
    %n - 换行符
    %p - 根据给定的时间值为 `am' 或 `pm'，或者当前区域设置中的相应字符串
    %r - 用 a.m. 和 p.m. 符号的时间
    %R - 24 小时符号的时间
    %S - 十进制秒数
    %t - 制表符
    %T - 当前时间，和 %H:%M:%S 一样
    %u - 星期几的十进制数表达 [1,7]，1 表示星期一
```

`array strptime ( string $date , string $format )`

解析由 strftime 商城的时间/日期

```
[tm_sec] => 24
[tm_min] => 3
[tm_hour] => 19
[tm_mday] => 3
[tm_mon] => 3
[tm_year] => 105
[tm_wday] => 0
[tm_yday] => 92
[tm_isdst] => 1
```

`int strtotime ( string $time [, int $now ] )`

将任何英文的文本的日期解析为 unix 时间戳

`int time ( void )`

返回 unix 时间戳

`string timezone_name_from_abbr ( string $abbr [, int $gmtOffset = -1 [, int $isdst = -1 ]] )`

从缩写返回时区的完整名称

```
 $abbr          缩写
 $gmtOffset     偏移秒数
 $isdst         夏时令
```

`string timezone_version_get ( void )`

获取 timezone 数据库的版本号

## 扩展

- [关于 Php 的周计算](../usage/datetime-week.md)