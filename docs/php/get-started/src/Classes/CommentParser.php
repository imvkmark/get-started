<?php

namespace Php\Classes;

/**
 * Php document comment parser
 */
class CommentParser
{
    /**
     * Parse php doc
     * @param string $data phpdoc 文档
     * @return array
     */
    public function parseContent(string $data): array
    {
        $result = [];

        preg_match_all('/\/\*\*\s*?\n(.*?)\*\/\s*?\n\s*?(?:public)\s*?function\s*?([a-z0-9_-]*?)\(/si', $data, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $result[$match[2]] = $this->parseMethod($match[1]);
        }

        return $result;
    }

    /**
     * 解析方法
     * @param string $doc php doc 文档
     * @return array
     */
    public function parseMethod(string $doc): array
    {
        $result = [
            'params' => [],
        ];

        $result['description'] = trim(preg_replace('/(?:[ \t]*\*[ \t]*@(.*?)\n|[ \t]*\*[ \t]*)/si', '', $doc), '/ ' . PHP_EOL);

        preg_match_all('/@([a-z0-9_-]+)\s*(.*?)\n/si', $doc, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $line = "@{$match[1]} " . $match[2];

            $type = $match[1];
            if ($type === 'param' || $type === 'property') {
                $param              = [
                    'type'     => $type,
                    'var_type' => $this->parseVarType($line),
                    'var_name' => $this->parseVarName($line),
                    'var_desc' => $this->parseVarDesc($line),
                ];
                $result['params'][] = $param;
            }
            elseif ($type === 'throws') {
                $result['throws'] = $match[2];
            }
            elseif ($type === 'verify') {
                $result['verify'] = $match[1];
            }
            else {
                $result['params'][] = [
                    'type'  => $match[1],
                    'value' => $match[2],
                ];
            }
        }

        return $result;
    }

    /**
     * 解析变量类型
     * @param string $str 单行注释
     * @return string
     */
    private function parseVarType(string $str): string
    {
        if (preg_match('/@[a-z]+\s+([\\a-z|]+)\s+\$/i', $str, $match)) {
            return trim($match[1]);
        }

        return '';
    }

    /**
     * 解析变量名称
     * @param string $str 单行注释
     * @return string
     */
    private function parseVarName(string $str): string
    {
        if (preg_match('/\s+(\$[a-z0-9]+)\s*/i', $str, $match)) {
            return $match[1];
        }

        return '';
    }

    /**
     * 解析变量描述
     * @param string $str 单行注释
     * @return string
     */
    private function parseVarDesc(string $str): string
    {
        if (preg_match('/\s+\$[a-z0-9]+\s(.*+)/i', $str, $match)) {
            return trim($match[1]);
        }

        return '';
    }
}