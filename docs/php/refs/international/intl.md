# [WIP]国际化与字符编码支持 - Intl

国际化扩展是对 ICU 的封装, 并且启用PHP编程者以 UCA 一致性的方式来格式化脚本 国际化扩展根据本地的大小写配置来提供字串比较功能

Collator: 字串对比 Number Formatter: 根据本地化的格式来格式化数字 Message Formatter: 信息格式化, Normalizer: 标准化组件 Locale: 本地化组件

## 安装

PHP 5.3 中集成了这个组件, php5.2.4+可运行 默认绑定了此扩展,[5.2.4]+支持,但是需要自己编译

## 配置

`intl.default_locale`

PHP_INI_ALL 默认的本地化设置

## 函数

### Collator

根据本地配置,提供了字串比较和数组排序的能力

```
Collator {

    __construct ( string $locale )
          建立一个收集器
          $locale   收集器使用的本地规则, 可以传递规则, 如果是'', 'root' 将启用UCA规则

    bool asort ( array &$arr [, int $sort_flag ] )
    bool collator_asort ( Collator $coll , array &$arr [, int $sort_flag ] )
          数组键值排序

    int compare ( string $str1 , string $str2 )
    int collator_compare ( Collator $coll , string $str1 , string $str2 )
          Unicode字串比较

    static Collator::create ( string $locale )
    Collatorcollator_create ( string $locale )
         建立一个收集器,用于以后的字串比较

    int getAttribute ( int $attr )
    int collator_get_attribute ( Collator $coll , int $attr )
         获取收集器的属性信息

    int getErrorCode ( void )
    int collator_get_error_code ( Collator $coll )
         获取最近的错误码

    string getErrorMessage ( void )
    string collator_get_error_message ( Collator $coll )
         获取上一个错误信息

    string getLocale ([ int $type ] )
    string collator_get_locale ( Collator $coll , int $type )
         获取收集器的本地名称.

    string getSortKey ( string $str )
    string collator_get_sort_key ( Collator $coll , string $str )
         获取字串的排序键

    int getStrength ( void )
    int collator_get_strength ( Collator $coll )
          获取strength

    bool setAttribute ( int $attr , int $val )
    bool collator_set_attribute ( Collator $coll , int $attr , int $val )
          设置属性

    bool setStrength ( int $strength )
    bool collator_set_strength ( Collator $coll , int $strength )
          设置strength

    bool sortWithSortKeys ( array &$arr )
    bool collator_sort_with_sort_keys ( Collator $coll , array &$arr )
          使用指定的收集器和键值进行排序

    bool sort ( array &$arr [, int $sort_flag ] )
    bool collator_sort ( Collator $coll , array &$arr [, int $sort_flag ] )
          根据当前的本地规则进行排序, 类似于PHP的 sort()函数

}
```

### NumberFormatter

程序存储和操作数据是独立于地域的, 但是显示是基于指定地域的,所以你可以根据不同的地区来显示不同的数字表示方法.NumberFormatter 是基于地域的

```
NumberFormatter {
    __construct ( string  $locale , int $style [, string  $pattern ] )
    static NumberFormatter::create ( string  $locale , int $style [, string  $pattern ] )
    NumberFormatter numfmt_create ( string $locale , int $style [, string $pattern ] )
          建立一个格式器

    string formatCurrency ( float  $value , string  $currency )
    string numfmt_format_currency ( NumberFormatter $fmt , float  $value , string $currency )
          格式化货币

    string format ( number $value [, int $type ] )
    string numfmt_format ( NumberFormatter $fmt , number $value [, int $type ] )
          格式化数字

    int getAttribute ( int $attr )
    int numfmt_get_attribute ( NumberFormatter $fmt , int $attr )
          获取属性

    int getErrorCode ( void )
    int numfmt_get_error_code ( NumberFormatter $fmt )
          获取错误代码

    string getErrorMessage ( void )
    string numfmt_get_error_message ( NumberFormatter $fmt )
          获取错误信息

    string getLocale ([ int $type ] )
    string numfmt_get_locale ( NumberFormatter $fmt [, int $type ] )
          获取本地名称

    string getPattern ( void )
    string numfmt_get_pattern ( NumberFormatter $fmt )
          获取格式基准

    string getSymbol ( int $attr )
    string numfmt_get_symbol ( NumberFormatter $fmt , int $attr )
          获取格式的标示符

    string getTextAttribute ( int $attr )
    string numfmt_get_text_attribute ( NumberFormatter $fmt , int $attr )
          获取文本属性

    float parseCurrency ( string  $value , string  &$currency [, int &$position ] )
    float numfmt_parse_currency ( NumberFormatter $fmt , string $value , string &$currency [, int &$position ] )
          解析货币格式

    mixed parse ( string  $value [, int $type [, int &$position ]] )
    mixed numfmt_parse ( NumberFormatter $fmt , string $value [, int $type [, int &$position ]] )
          把字串根据指定的格式解析为数值

    bool setAttribute ( int $attr , int $value )
    bool numfmt_set_attribute ( NumberFormatter $fmt , int $attr , int $value )
          设置一个数值关联属性

    bool setPattern ( string  $pattern )
    bool numfmt_set_pattern ( NumberFormatter $fmt , string $pattern )
          设置格式

    bool setSymbol ( int $attr , string  $value )
    bool numfmt_set_symbol ( NumberFormatter $fmt , int $attr , string $value )
          设置格式标示符

    bool setTextAttribute ( int $attr , string  $value )
    bool numfmt_set_text_attribute ( NumberFormatter $fmt , int $attr , string $value )
          设置文本属性.

}
```

### Locale

Locale 是一个用来获取语言,文化区域行为的标识,

```
Locale  {

    /* 方法 */

    public static string acceptFromHttp ( string $header )
    string locale_accept_from_http ( string $header )
          // 根据浏览器发送的头部找出支持哪种语言

    public static string canonicalize ( string $locale )
          // 规范化本地字串

    public static string composeLocale ( array $subtags )
    string locale_compose ( array $subtags )
        //  ~~

    public static bool filterMatches ( string $langtag , string $locale [, bool $canonicalize = false ] )
    bool locale_filter_matches ( string $langtag , string $locale [, bool $canonicalize = false ] )
        // 检测语言标签是否匹配本地

    public static array getAllVariants ( string $locale )
    array locale_get_all_variants ( string $locale )
        // 从指定输入的本地信息中获取变体

    public static string getDefault ( void )
    string locale_get_default ( void )
        // 获取默认的 locale 值

    public static string getDisplayLanguage ( string $locale [, string $in_locale ] )
    string locale_get_display_language ( string $locale [, string $in_locale ] )
        // 返回合适的本地显示名称

    public static string getDisplayName ( string $locale [, string $in_locale ] )
    string locale_get_display_name ( string $locale [, string $in_locale ] )
        // 获取输入的合适显示名字

    public static string getDisplayRegion ( string $locale [, string $in_locale ] )
    string locale_get_display_region ( string $locale [, string $in_locale ] )
        // 显示区域

    public static string getDisplayScript ( string $locale [, string $in_locale ] )
    string locale_get_display_script ( string $locale [, string $in_locale ] )
        // 获取显示脚本

    public static string getDisplayVariant ( string $locale [, string $in_locale ] )
    string locale_get_display_variant ( string $locale [, string $in_locale ] )
        // 获取合适的本地化显示的名称

    public static array getKeywords ( string $locale )
    array locale_get_keywords ( string $locale )

    public static string getPrimaryLanguage ( string $locale )
    string locale_get_primary_language ( string $locale )

    public static string getRegion ( string $locale )
    string locale_get_region ( string $locale )

    public static string getScript ( string $locale )
    string locale_get_script ( string $locale )

    public static string lookup ( array $langtag , string $locale [, bool $canonicalize = false [, string $default ]] )
    string locale_lookup ( array $langtag , string $locale [, bool $canonicalize = false [, string $default ]] )
        // 获取接近的区域显示

    public static array parseLocale ( string $locale )
    array locale_parse ( string $locale )
        // 解析

    public static bool setDefault ( string $locale )
    bool locale_set_default ( string $locale )
        // 设置默认的运行本地环境
}
```

### Normalizer

```
Normalizer  {

    /* 方法 */
    public static bool isNormalized ( string $input [, string $form = Normalizer::FORM_C ] )
    bool normalizer_is_normalized ( string $input [, string $form = Normalizer::FORM_C ] )
        // 检测指定的字串是否为给定的标准格式

    public static string normalize ( string $input [, string $form = Normalizer::FORM_C ] )
    string normalizer_normalize ( string $input [, string $form = Normalizer::FORM_C ] )
        // 返回标准的的格式
}
```

### [WIP]MessageFormatter

### [WIP]IntlCalendar

### [WIP]IntlTimeZone

### [WIP]IntlDateFormatter

```
IntlDateFormatter  {

    /* 方法 */

    public __construct ( string $locale , int $datetype , int $timetype [, mixed $timezone = NULL [, mixed $calendar = NULL [, string $pattern = '' ]]] )

    public static IntlDateFormatter create ( string $locale , int $datetype , int $timetype [, mixed $timezone = NULL [, mixed $calendar = NULL [, string $pattern = '' ]]] )
    IntlDateFormatter datefmt_create ( string $locale , int $datetype , int $timetype [, mixed $timezone = NULL [, mixed $calendar = NULL [, string $pattern = '' ]]] )

        // 建立一个日期格式化器

    public string format ( mixed $value )
    string datefmt_format ( IntlDateFormatter $fmt , mixed $value )
        // 格式化时间为一个字串

    public static string formatObject ( object $object [, mixed $format = NULL [, string $locale = NULL ]] )
    public static string datefmt_format_object ( object $object [, mixed $format = NULL [, string $locale = NULL ]] )
        // 这个静态函数允许格式化一个 IntlCalendar 和 DateTime 对象, 但是不需要实例化一个对象.

    int getCalendar ( void )
    int datefmt_get_calendar ( IntlDateFormatter $fmt )
        // 获取 intlDateFormatter 使用的 calendar类型

    public int getDateType ( void )
    int datefmt_get_datetype ( IntlDateFormatter $fmt )
        // 获取格式器支持的 Date 类型

    public int getErrorCode ( void )
    int datefmt_get_error_code ( IntlDateFormatter $fmt )

    public string getErrorMessage ( void )
    string datefmt_get_error_message ( IntlDateFormatter $fmt )

    public string getLocale ([ int $which ] )
    string datefmt_get_locale ( IntlDateFormatter $fmt [, int $which ] )

    public string getPattern ( void )
    string datefmt_get_pattern ( IntlDateFormatter $fmt )

    public int getTimeType ( void )
    int datefmt_get_timetype ( IntlDateFormatter $fmt )

    public string getTimeZoneId ( void )
    string datefmt_get_timezone_id ( IntlDateFormatter $fmt )

    public IntlCalendar getCalendarObject ( void )
    IntlCalendar datefmt_get_calendar_object ( void )

    public IntlTimeZone getTimeZone ( void )
    IntlTimeZone datefmt_get_timezone ( void )

    public bool isLenient ( void )
    bool datefmt_is_lenient ( IntlDateFormatter $fmt )

    public array localtime ( string $value [, int &$position ] )
    array datefmt_localtime ( IntlDateFormatter $fmt , string $value [, int &$position ] )

    public int parse ( string $value [, int &$position ] )
    int datefmt_parse ( IntlDateFormatter $fmt , string $value [, int &$position ] )

    bool setCalendar ( mixed $which )
    bool datefmt_set_calendar ( IntlDateFormatter $fmt , mixed $which )

    public bool setLenient ( bool $lenient )
    bool datefmt_set_lenient ( IntlDateFormatter $fmt , bool $lenient )

    public bool setPattern ( string $pattern )
    bool datefmt_set_pattern ( IntlDateFormatter $fmt , string $pattern )

    public bool setTimeZoneId ( string $zone )
    bool datefmt_set_timezone_id ( IntlDateFormatter $fmt , string $zone )
        [5.5.0] 废弃

    public boolean setTimeZone ( mixed $zone )
    boolean datefmt_set_timezone ( mixed $zone )
        [5.5.0]设置格式化的时区
}
```

### [WIP]ResourceBundle

### [WIP]Spoofchecker

### [WIP]Transliterator

### [WIP]UConverter

### [WIP]Grapheme

### [WIP]IDN

### [WIP]IntlException

### [WIP]intl