# 日历和事件相关扩展 - Calendar

## 介绍

历法扩展集包括了一系列用于在不同历法间进行转换的函数，它是以Julian Day计数为中介或标准来进行的。Julian Day计数是以公元前的4713年的1月1日为起点的一种计数法。为了在不同历法间进行转换，你首先要转换成Julian Day计数，然后再转换为你所需要的历法。Julian Day计数和Julian历法是非常不同的！

## 安装

win 已经内建了支持, linux 需要在编译 PHP 时加上 –enable-calendar

## 配置

此扩展没有定义配置

## 函数

`int cal_days_in_month ( int $calendar , int $month , int $year )`

返回某个历法中某年某月的天数

```
$calendar
      CAL_GREGORIAN
      CAL_JULIAN
      CAL_JEWISH
      CAL_FRENCH
 $month
 $year
```

`array cal_from_jd ( int $jd , int $calendar )`

函数根据给定的Julian day的jd 天数转换成特定历法calendar中的日期,返回数组用来储存值

```
$jd       Julian day, 天数
$calendar 支持的历法常量
```

`array cal_info ([ int $calendar = -1 ] )`

历法信息以一个数组的形式返回，包含的元素有历法名称，历法代码，月份，月份的缩写和单月的最多天数

```
$calendar     支持的历法的种类,默认是所有
```

`int cal_to_jd ( int $calendar , int $month , int $day , int $year )`

从一个指定的历法算出Julian day

`int easter_date ([ int $year ] )`

得到指定年份的复活节午夜时候的unix时间戳

```
$year     1970年至2037年之间的数字形式的年份。
```

`int easter_days ([ int $year [, int $method = CAL_EASTER_DEFAULT ]] )`

返回指定年份的3月21日到复活节之间的天数，如果没有指定年份，默认是当年

```
 $year   正整数形式的年份
 $method
      当设置为CAL_EASTER_ROMAN时可以用Gregorian历法来计算1582－1752之间的复活节日期
```

`int frenchtojd ( int $month , int $day , int $year )`

从一个French Republican历法的日期得到Julian Day计数 年份所能用的范围是1到14（Gregorian历法的1792年9月22日到1806年9月22日）

```
 $month  [1-13]
 $day    [1-30]
 $year   [1-14]
```

`int gregoriantojd ( int $month , int $day , int $year )`

转变一个Gregorian历法日期到Julian Day计数

```
 $month     [1-12]
 $day       [1-31]
 $year      [-4714-9999]
```

`mixed jddayofweek ( int $julianday [, int $mode = CAL_DOW_DAYNO ] )` 返回星期几

```
 $julianday
 $mode
      CAL_DOW_DAYNO      数字形式  [Sunday-Monday]
      CAL_DOW_SHORT      返回缩写形式的字串形式
      CAL_DOW_LONG       返回字串形式
```

`string jdmonthname ( int $julianday , int $mode )`

返回月份的名称

```
 $mode
CAL_MONTH_GREGORIAN_SHORT
 Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
CAL_MONTH_GREGORIAN_LONG
 January, February, March, April, May, June, July, August, September, October, November, December
CAL_MONTH_JULIAN_SHORT
 Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
CAL_MONTH_JULIAN_LONG
 January, February, March, April, May, June, July, August, September, October, November, December
CAL_MONTH_JEWISH
 Tishri, Heshvan, Kislev, Tevet, Shevat, AdarI, AdarII, Nisan, Iyyar, Sivan, Tammuz, Av, Elul
CAL_MONTH_FRENCH
 Vendemiaire, Brumaire, Frimaire, Nivose, Pluviose, Ventose, Germinal, Floreal, Prairial, Messidor, Thermidor, Fructidor, Extra
```

`string jdtofrench ( int $juliandaycount )` 转变一个Julian Day计数到French Republican历法的日期

`string jdtogregorian ( int $julianday )` 转变一个Julian Day计数为Gregorian历法日期

`string jdtojewish ( int $julianday [, bool $hebrew = false [, int $fl = 0 ]] )` 转换一个Julian天数为Jewish历法的日期

```
 $julianday
 $hebrew         如果hebrew设置为true, 参数 fl, 可用于希伯来语的格式
 $fl
      CAL_JEWISH_ADD_ALAFIM_GERESH
      CAL_JEWISH_ADD_ALAFIM
      CAL_JEWISH_ADD_GERESHAYIM
```

`string jdtojulian ( int $julianday )`

转变一个Julian Day 计数到以“月/日/年”形式显示的 Julian 历法的日期

`int jdtounix ( int $jday )`

转换 Julian Day 为一个Unix 时间戳.

`int jewishtojd ( int $month , int $day , int $year )`

转换一个Jewish历法到Julian Day 计数

`int juliantojd ( int $month , int $day , int $year )`

转变一个Julian 历法的日期 为 Julian Day 计数

`int unixtojd ([ int $timestamp = time() ] )`

转变 unix 时间戳为 Julian Day 技术