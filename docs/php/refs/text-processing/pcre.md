# 文本处理 - PCRE

Perl 兼容性的正则表达式 > 1. 必须用分隔符闭合 > 2. 分隔符可以使任意非字母数字, 除反斜杠()和空字节之外的非空白 ascii 字符, 如果分隔符 在表达式中使用，需要使用反斜线进行转义

## 安装

PHP 的 Windows 版本已内建对此扩展的支持

## 配置

`pcre.backtrack_limit`100000

[php 5.2.0]PHP_INI_ALL PCRE的回溯限制

`pcre.recursion_limit`100000

[php 5.2.0]PHP_INI_ALL PCRE的递归限制

## 常量

| 常量                         | 说明                                                                                                                              | 开始    |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------|-------|
| PREG_PATTERN_ORDER         | 结果按照”规则”排序，仅用于 mk://function.preg-match-all.html， 即$matches[0]是完整规则的匹配结果， matches[1]是第一个子组匹配的结果，等等。                             | since ||PREGSETORDER|结果按照” 集合” 排序，仅用于[pregmatchall()](mk : //function.preg − match − all.html)，即matches[0]保存第一次匹配结果的所有结果(包含子组)信息, $matches[1]保存第二次的结果信息，等等。 |  |
| PREG_OFFSET_CAPTURE        | 查看PREG_SPLIT_OFFSET_CAPTURE的描述。                                                                                                 | 4.3.0 |
| PREG_SPLIT_NO_EMPTY        | 这个标记告诉 mk://function.preg-split.html进返回非空部分。                                                                                    |       |
| PREG_SPLIT_DELIM_CAPTURE   | 这个标记告诉 mk://function.preg-split.html同时捕获括号表达式匹配到的内容。                                                                            | 4.0.5 |
| PREG_SPLIT_OFFSET_CAPTURE  | 如果设置了这个标记，每次出现的匹配子串的偏移量也会被返回。注意，这会改变返回数组中的值， 每个元素都是由匹配子串作为第0个元素，它相对目标字符串的偏移量作为第1个元素的数组。这个 标记只能用于 mk://function.preg-split.html。 | 4.3.0 |
| PREG_NO_ERROR              | 没有匹配错误时调用 mk://function.preg-last-error.html 返回。                                                                                | 5.2.0 |
| PREG_INTERNAL_ERROR        | 如果有PCRE内部错误时调用 mk://function.preg-last-error.html 返回。                                                                           | 5.2.0 |
| PREG_BACKTRACK_LIMIT_ERROR | 如果调用mk://pcre.configuration.html#ini.pcre.backtrack-limit超出， 调用 mk://function.preg-last-error.html时返回。                          | 5.2.0 |
| PREG_RECURSION_LIMIT_ERROR | 如果mk://pcre.configuration.html#ini.pcre.recursion-limit超出， 调用 mk://function.preg-last-error.html时返回。                            | 5.2.0 |
| PREG_BAD_UTF8_ERROR        | 如果最后一个错误时由于异常的utf-8数据(仅在运行在 mk://reference.pcre.pattern.modifiers.html正则表达式下可用)。 导致的，调用 mk://function.preg-last-error.html返回。   | 5.2.0 |
| PREG_BAD_UTF8_OFFSET_ERROR | 如果偏移量与合法的urf-8代码不匹配(仅在运行在 mk://reference.pcre.pattern.modifiers.html正则表达式下可用)。 调用 mk://function.preg-last-error.html返回。         | 5.3.0 |
| PCRE_VERSION               | PCRE版本号和发布日期(比如： “7.0 18-Dec-2006”)。                                                                                            | 5.2.4 |

## 函数

`mixed preg_filter ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &$count ]] )`

[5.3.0+]preg_filter()等价于 [preg_replace()](mk://function.preg-replace.html) 除了它仅仅返回(可能经过转化)与目标匹配的结果.
这个函数怎样工作的更详细信息请阅读 [preg_replace()](mk://function.preg-replace.html)文档.

`array preg_grep ( string $pattern , array $input [, int $flags = 0 ] )`

返回给定数组input中与模式pattern 匹配的元素组成的数组. - $flags 如果设置为PREG_GREP_INVERT, 这个函数返回输入数组中与 给定模式pattern不匹配的元素组成的数组.

`int preg_last_error ( void )`

返回最后一次PCRE正则执行的错误代码。

`int preg_match_all ( string $pattern , string $subject [, array &$matches [, int $flags = PREG_PATTERN_ORDER [, int $offset = 0 ]]] )`

搜索subject中所有匹配pattern给定正则表达式 的匹配结果并且将它们以flag指定顺序输出到matches中. 在第一个匹配找到后, 子序列继续从最后一次匹配位置搜索.

- *flags*−*PREGATTERNRDER结果排序为*matches[0]保存完整模式的所有匹配, *matches*[1]*保存第一个子组的所有匹配*−*PREGETRDER结果排序为*matches[0]
  包含第一次匹配得到的所有匹配(包含子组)， $matches[1]是包含第二次匹配到的所有匹配(包含子组)的数组，以此类推。

  *P*

  *O*

  *S*

  *O*

    - PREG_OFFSET_CAPTURE 如果这个标记被传递，每个发现的匹配返回时会增加它相对目标字符串的偏移量。

`int preg_match ( string $pattern , string $subject [, array &$matches [, int $flags = 0 [, int $offset = 0 ]]] )`

搜索subject与pattern给定的正则表达式的一个匹配.

`string preg_quote ( string $str [, string $delimiter = NULL ] )`

preg_quote()需要参数 str 并向其中 每个正则表达式语法中的字符前增加一个反斜线。 这通常用于你有一些运行时字符串 需要作为正则表达式进行匹配的时候。

![https://file.wulicode.com/note/2021/11-11/15-57-16384.png](https://file.wulicode.com/note/2021/11-11/15-57-16384.png)

`mixed preg_replace_callback ( mixed $pattern , callable $callback , mixed $subject [, int $limit = -1 [, int &$count ]] )`

这个函数的行为除了 可以指定一个 callback 替代 replacement 进行替换 字符串的计算，其他方面等同于 preg_replace()。

- $callback 一个回调函数，在每次需要替换时调用，调用时函数得到的参数是从subject 中匹配到的结果。回调函数返回真正参与替换的字符串。

`mixed preg_replace ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &$count ]] )`

搜索subject中匹配pattern的部分， 以replacement进行替换。

`array preg_split ( string $pattern , string $subject [, int $limit = -1 [, int $flags = 0 ]] )`

通过一个正则表达式分隔给定字符串.