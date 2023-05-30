<?php

namespace Php;

class XorEncrypt
{
    public function xor(string $str, $key = 'secret'): string
    {
        $len = strlen($str);
        for ($i = 0; $i < $len; $i++) {
            $str[$i] = chr(ord($str[$i]) ^ ord($key[$i % strlen($key)]));
        }
        return $str;
    }
}
