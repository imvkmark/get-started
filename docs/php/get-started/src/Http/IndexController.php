<?php

namespace Php\Http;

use Illuminate\Support\Str;
use Php\Classes\CommentParser;
use ReflectionClass;
use ReflectionException;
use Symfony\Component\Finder\Finder;

/**
 * 首页
 */
class IndexController
{
    /**
     * 首页(自动输出)
     */
    public function index()
    {
        $finder = new Finder();
        // find all files in the current directory
        $finder->files()->in(__DIR__);

        $parser = new CommentParser();

        // check if there are any search results
        if ($finder->hasResults()) {
            foreach ($finder as $file) {
                $classname = '\\Php\\Http\\' . $file->getBasename('.php');
                try {
                    $ref     = new ReflectionClass($classname);
                    $methods = $ref->getMethods();
                    $prefix  = Str::kebab(Str::before($file->getBasename('.php'), 'Controller'));
                    foreach ($methods as $method) {
                        $path   = $prefix . '/' . Str::kebab($method->getName());
                        $parsed = $parser->parseMethod($method->getDocComment());
                        $title  = $parsed['description'] ?: $path;
                        echo <<<HTML
<a href="http://0.0.0.0:8074/{$path}" target="_blank">{$title}</a> <br>
HTML;
                    }
                } catch (ReflectionException $e) {
                    echo $e->getMessage();
                }
            }
        }

    }

}