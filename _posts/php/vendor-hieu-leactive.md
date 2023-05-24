---
title: "[WIP][Plugin]判断导航元素的 active 状态 (hieu-leactive)"
date: 2022-04-20 19:01:06
toc: true
categories:
- ["Php","Laravel","vendor"]
---

[Laravel Active](https://github.com/letrunghieu/active) 用全新的API重写，并以新的主版本发布。这个文档解释了新API，并给出了一些例子。




### 安装
这个版本只与 Laravel 5 兼容。通过 Composer 来安装这个包
```bash
composer require hieu-le/active
```
添加服务提供者到 `config/app.php`  的  `providers` 数组
> 译者 : Laravel 5.5+ 之后的包可以自动发现, 不必添加这个 ServiceProvider

```php
HieuLe\Active\ActiveServiceProvider::class,
```
如果您想要使用 alias，请在 `config/app.php` 中的 `aliases` 数组中注册。
> 译者 : Laravel 5.5+会自动注册

```php
'Active' => HieuLe\Active\Facades\Active::class,
```

### 基于条件来获取活动类名
Usage:

- 



Use the alias: `Active::getClassIf($condition, $activeClass = 'active', $inactiveClass = '')`

- 



Use the application container: `app('active')->getClassIf($condition, $activeClass = 'active', $inactiveClass = '')`

- 



Use the helper function: `active_class($condition, $activeClass = 'active', $inactiveClass = '')`

Explanation: if the `$condition` is true, the value of `$activeClass` is returned, otherwise the value of `$inactiveClass` is returned. The package comes with several methods to help you create conditions easier. You will get the class as a string as the result of these API.
```
active_class(true); // 'active'
active_class(false); // ''
active_class(if_uri([$currentUri]), 'selected'); // 'selected'
active_class(if_uri_pattern([$pattern1, $pattern2]), 'active', 'other'); // 'other'
```

### 检测当前 URI 地址
All of checking methods return boolean result (`true` or `false`). You can use the result in the condition of `active_class` or write your own expression.

#### Check the whole URI
Usage:

- 



Use the alias: `Active::checkUri(array $uris)`

- 



Use the application container: `app('active')->checkUri(array $uris)`

- 



Use the helper function: `if_uri(array $uris)`

Explanation: you give an array of URI, the package will return true if the current URI is in your array. Remember that an URI does not begin with the slash (`/`) except the root.

#### Check the URI with some patterns
Usage:

- 



Use the alias: `Active::checkUriPattern(array $patterns)`

- 



Use the application container: `app('active')->checkUriPattern(array $patterns)`

- 



Use the helper function: `if_uri_pattern(array $patterns)`

Explanation: you give an array of patterns, the package will return true if the current URI matches one of the given pattern. Asterisks may be used in the patterns to indicate wildcards.

#### Check the query string
Usage:

- 



Use the alias: `Active::checkQuery($key, $value)`

- 



Use the application container: `app('active')->checkQuery($key, $value)`

- 



Use the helper function: `if_query($key, $value)`

Explanation: the package will return `true` if one of the following condition is true:

- 



The current query string contains a parameter named `$key` with any value and the value of `$value` is `false`.

- 



The current query string does not contain a parameter named `$key` and the value of `$value` is `null`.

- 



The current query string contains a parameter named `$key` whose value is a string equals to `$value`.

- 



The current query string contains a parameter named `$key` whose value is an array that contain the `$value`.
```
// the current query string is ?x=1&y[0]=a&y[1]=b
if_query('x', null); // true
if_query('x', 1); // true
if_query('x', 2); // false
if_query('y', 'a'); // true
if_query('y', 'c'); // false
if_query('z', null); // false
```

### 检测当前路由

#### Check the exact route name
Usage:

- 



Use the alias: `Active::checkRoute(array $routes)`

- 



Use the application container: `app('active')->checkRoute(array $routes)`

- 



Use the helper function: `if_route(array $routes)`

Explanation: you give an array of route names, the package will return true if the name of the current route (which can be null) is in your array.

#### Check the route name with some patterns
Usage:

- 



Use the alias: `Active::checkRoutePattern(array $patterns)`

- 



Use the application container: `app('active')->checkRoutePattern(array $patterns)`

- 



Use the helper function: `if_route_pattern(array $patterns)`

Explanation: you give an array of patterns, the package will return true if the name of the current route (which can be null) matches one of the given pattern. Asterisks may be used in the patterns to indicate wildcards.

#### Check the route parameter value
Usage:

- 



Use the alias: `Active::checkRouteParam($key, $value)`

- 



Use the application container: `app('active')->checkRouteParam($key, $value)`

- 



Use the helper function: `if_route_param($key, $value)`

Explanation: the package will return `true` if one of the following condition is true:

- 



The current route contains a parameter named `$key` whose value is `$value`.

- 



The current route does not contain a parameter named `$key` and the value of `$value` is `null`.

Read more about route parameter in the Laravel [documentation](https://goo.gl/TQwr7P).

### 获取当前值

#### Get the current action
Usage:

- 



Use the alias: `Active::getAction()`

- 



Use the application container: `app('active')->getAction()`

- 



Use the helper function: `current_action()`

Explanation: if the current route is bound to a class method, the result will be a string like `App\Http\Controllers\YourController@yourMethod`. If the route is bound to a closure, the result will be the `Closure` string.

#### Get the current controller class
Usage:

- 



Use the alias: `Active::getController()`

- 



Use the application container: `app('active')->getController()`

- 



Use the helper function: `current_controller()`

Explanation: if the current route is bound to a class method, the result will be the full qualified class name of the controller class, like `App\Http\Controllers\YourController`. If the route is bound to a closure, the result will be the `Closure` string.

#### Get the current controller method
Usage:

- 



Use the alias: `Active::getMethod()`

- 



Use the application container: `app('active')->getMethod()`

- 



Use the helper function: `current_method()`

Explanation: if the current route is bound to a class method, the result will be the name of the controller method. like `yourMethod`. If the route is bound to a closure, the result will be the empty string.

### Example
The example below illustrate the usage of this package in a sidebar with Bootstrap [link group](http://getbootstrap.com/components/#list-group-linked):
```html
<div class="list-group">
    <a href="" class="list-group-item {{ active_class(if_route('users.list') && if_query('active', 1)) }}">
        Active users
    </a>
    <a href="#" class="list-group-item {{ active_class(if_route('users.list') && if_query('active', 0)) }}">
        Inactive users
    </a>
    <a href="#" class="list-group-item  {{ active_class(if_action('App\Http\Controllers\UserController@getNewUser')) }}">
        Add users
    </a>
</div>
```

