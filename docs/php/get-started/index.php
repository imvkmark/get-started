<?php


include __DIR__ . '/vendor/autoload.php';

use Bramus\Router\Router;
use Illuminate\Support\Str;
use Symfony\Component\Finder\Finder;

// Create Router instance
$router = new Router();

$finder = new Finder();
// find all files in the current directory
$finder->files()->in(__DIR__ . '/src/Http');

// check if there are any search results
if ($finder->hasResults()) {
    foreach ($finder as $file) {
        $classname = '\\Php\\Http\\' . $file->getBasename('.php');
        try {
            $ref     = new ReflectionClass($classname);
            $methods = $ref->getMethods();
            $prefix  = Str::kebab(Str::before($file->getBasename('.php'), 'Controller'));
            foreach ($methods as $method) {
                $path = $prefix . '/' . Str::kebab($method->getName());
                $router->get($path, $classname . '@' . $method->getName());
            }
        } catch (ReflectionException $e) {
            echo $e->getMessage();
        }
    }
}
// Define routes
$router->get('/', '\Php\Http\IndexController@index');

// Run it!
$router->run();