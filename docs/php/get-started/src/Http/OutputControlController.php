<?php

namespace Php\Http;

/**
 * 输出控制
 */
class OutputControlController
{
    /**
     * 输出控制->实时输出
     * @return mixed
     */
    public function obFlush()
    {
        // 关闭 php 缓存，或者在 flush 前 ob_flush();
        ob_end_flush();
        // ie下 需要先发送256个字节, firefox 1024, chrome 2048
        echo str_repeat(' ', 1024);
        set_time_limit(0);
        $i = 0;
        while (true) {
            echo 'Now Index is :' . $i++ . '<br>';
            flush(); // 把缓存推送到浏览器去
            sleep(1);
        }
    }

    /**
     * 输出控制->绝对刷送
     * @return mixed
     */
    public function obImplicitFlush()
    {
        ob_implicit_flush();
        ob_end_flush();
        $i = 0;
        while (true) {
            echo 'Now Index is :' . $i++ . '<br>';
            sleep(1);
        }
    }

    /**
     * 输出控制->列出输出处理程序
     */
    public function obListHandlers()
    {

        ob_start("ob_gzhandler");
        echo '<code style="white-space: pre-wrap">';
        var_dump(ob_list_handlers());
        echo '</code>';
        ob_end_flush();
    }

}