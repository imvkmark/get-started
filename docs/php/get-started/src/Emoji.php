<?php

namespace Php;


class Emoji
{
	/**
	 * 限制输出
	 * @param string $value 需要截取的字串
	 * @param int    $limit 限制长度
	 * @param string $end   是否加入剩余字符标识
	 * @return string
	 */
	public static function limit($value, $limit = 100, $end = '...'): string
	{
		$match     = self::toArray($value);
		$sliced    = array_slice($match, 0, $limit);
		$endLength = self::length($end);
		if (count($sliced) < (count($match) - $endLength)) {
			return implode('', $sliced) . $end;
		}
		return implode('', $sliced);
	}

	/**
	 * 返回长度
	 * @param string $value 需要检验的字串
	 * @return int
	 */
	public static function length($value): int
	{
		$match = self::toArray($value);
		return count($match);
	}

	/**
	 * 返回字串数组
	 * @param string $value 需要检验的字串
	 * @return array
	 */
	private static function toArray($value): array
	{
		// https://unicode.org/Public/emoji/12.1/emoji-sequences.txt
		if (preg_match_all('/' .
			/* Emoji_Flag_Sequence
            * ---------------------------------------- */
			"[\u{1f1e6}-\u{1f1ff}][\u{1f1e6}-\u{1f1ff}]" . '|' .
			"\u{1f3f4}\u{e0067}\u{e0062}[\u{e0065}\u{e0073}\u{e0077}][\u{e006e}\u{e0063}\u{e006c}][\u{e0067}\u{e0074}\u{e0073}]\u{e007f}" . '|' .

			/* Basic Emoji
			 * ---------------------------------------- */
			"[\u{203C}-\u{2B55}]" . '|' .
			"[\u{1F004}-\u{1fa95}]" . '|' .
			"[\u{00A9}-\u{00ae}]" . '|' .

			/* Emoji_Keycap_Sequence
			 * ---------------------------------------- */
			"[\u{0023}-\u{0039}]" . '|' .

			/* 中文字符
			 * ---------------------------------------- */
			"[\x{4e00}-\x{9fa5}]" . '|' .

			/* 其他特殊字符
			 * ---------------------------------------- */
			'.' .
			'/u', $value, $matches)) {
			return $matches[0];
		}
		return [];
	}
}
