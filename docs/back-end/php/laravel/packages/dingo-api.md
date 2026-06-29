---
description: 'Laravel结合Dingo API与JWT实现API认证。安装Dingo和JWT插件，配置API类型、前缀、版本及Debug模式，设置认证并注册中间件。添加路由后，通过JWT实现auth认证（含前提、认证方式和限制）。'
lastUpdated: '2026-06-17 22:33:02'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel API 结合 Dingo API 和 JWT'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel结合Dingo API与JWT实现API认证。安装Dingo和JWT插件，配置API类型、前缀、版本及Debug模式，设置认证并注册中间件。添加路由后，通过JWT实现auth认证（含前提、认证方式和限制）。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/php/laravel/packages/dingo-api.html'
---
# Laravel API 结合 Dingo API 和 JWT

::: info 📖
<p>扩展阅读</p><ul><li>[JWT(JSON Web Tokens) 介绍 ](/development/software/spec/jwt.md)</li></ul>
:::

## 介绍

关于`API`的开发 不得不提的就是可以利用`Dingo`来构建更加强大的`API` 这样我们可以更好的去实现`API`认证和请求;JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在用户和服务器之间传递安全可靠的信息。

## 安装插件

### 安装 dinggo Api

首先当然是去[安装页面](https://github.com/dingo/api/wiki/Installation) 根据提供的包进行下载 在`laravel`项目中就是`require`这个`package`, 然后 `composer update -vvv`

```Plaintext
"dingo/api": "1.0.*@dev"
```

接着在`laravel`项目的`config`的`app.php`去添加 `ServiceProvider`

```Plaintext
'providers' => [
    Dingo\Api\Provider\LaravelServiceProvider::class
]
```

再去生成相应的配置文件

```Plaintext
$ php artisan vendor:publish --provider="Dingo\Api\Provider\LaravelServiceProvider"
```

### 安装 Jwt

如果需要实现`jwt` 同样的也是去 [安装页面](https://jwt-auth.readthedocs.io/en/develop/laravel-installation/), 配置 composer.json 文件, 然后运行 `composer update -vvv`在整理这篇文章的时候, 1.0 已经发布. 而 0.5 版本中有些不兼容的问题, , 在安装以及设置上需要注意

```Plaintext
"tymon/jwt-auth": "1.0.*",
```

(**Laravel 5.4 or below**)

添加对应的服务:

```Plaintext
Tymon\JWTAuth\Providers\LaravelServiceProvider::class
```

配置的 `alias`

```Plaintext
'JWTAuth'    => Tymon\JWTAuth\Facades\JWTAuth::class,
'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class,
```

生成配置文件

```Plaintext
$ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

生成 `jwt key`

```Plaintext
$ php artisan jwt:secret
```

## 使用

### 配置 Dinggo Api

这个时候我们是在开发的环境下 还需对`Dingo`进行相应的配置 在`.env`文件里

```Plaintext
# 类型
API_STANDARDS_TREE=vnd
# 前缀
API_PREFIX=api
# 版本
API_VERSION=v1
# 开启 Debug 模式
API_DEBUG=true
```

### 配置认证

我们可以实现一个 `jwt` 的 `auth` 认证 在 `config/api.php` 里配置

```Plaintext
'auth' => [
    'basic'=>function($app){
        return new  Dingo\Api\Auth\Provider\Basic($app['auth']);
    },
    'jwt'=>function($app){
        return new  Dingo\Api\Auth\Provider\JWT($app['Tymon\JWTAuth\JWTAuth']);
    }
],
```

这样我们就实现了在`Dingo`的`jwt`认证

### 注册中间件

既然是`auth`认证我们就需要先注册刚配置好的认证 即在`Kernel`文件里添加

```Plaintext
'jwt.auth'        => 'Tymon\JWTAuth\Http\Middleware\Check',
'jwt.refresh'     => 'Tymon\JWTAuth\Http\Middleware\RefreshToken',
```

### 添加路由

在`laravel 5.2`以后的版本我们可以直接放在 `routes/api.php` 里

```Plaintext
$api = app('Dingo\Api\Routing\Router');
```

为了区分 我们可以在`app`目录下新建`Api`目录, 然后再新建`Controllers`和在`Http`目录一样 在这里用来管理`api`的控制器在这个目录下新建一个基本的控制器 `BaseController`

```Plaintext
<?php
namespace App\Api\Controllers;
use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;
class BaseController extends Controller
{
    use Helpers;
}
```

此时我们再去创建对数据的`api`时就可以继承这个控制器并可以使用 `Dingo Api` 的 `Helpers` 函数.比如在此目录下创建`PostsController`这样我们就可以在 `routes.php` 里根据 `Dingo` 提供的方法去定义`api`

```Plaintext
$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function ($api) {
    $api->group([
        'namespace' => 'App\Api\Controllers'
    ], function ($api) {
        $api->get('lessons','PostsController@index');
        $api->get('lessons/{id}','PostsController@show');
    });
});
```

在`PostsController`的`index`返回所有数据 那么再去访问 `http://localhost:8000/api/lessons` 就可以看到所有的数据了 > 在这里使用 dinggo 的方法路由, 这和框架定义路由方式不太一样

当然和之前的一样 我们需要对数据字段进行映射 那么我们可以在`Api`目录下新建`Transformer`目录 然后在这个目录下新建`PostTransformer`

```Plaintext
<?php
namespace App\Api\Transformer;
use App\Post;
use League\Fractal\TransformerAbstract;
class PostTransformer extends TransformerAbstract
{
    public function transform(Post $post)
    {
        return [
            'title' => $post['title'],
            'content' => $post['body'],
            'is_free' => (boolean)$ppost['free']
        ];
    }
}
```

在这里我们是可以使用`Dingo API`的`Transformer`即`TransformerAbstract`这样写完我们就可以在控制器里去重新返回所有信息

```Plaintext
public function index()
{
    $lessons =  Post::all();
    return $this->collection($post,new PostTransformer());
}
```

> 这里的PostTransformer是 App\Api\Transformer\PostTransformer

当然还有之前的`show`方法 因为他的返回状态信息之前都是自己写的 其实在`Dingo`里也有相应的方法

```Plaintext
public function show($id)
{
    $lesson = Lesson::find($id);
    if(! $lesson){
        return $this->response->errorNotFound('Lesson not found');
    }
    return $this->item($lesson,new LessonTransformer());
}
```

## 结合Jwt的auth认证

### Auth 认证的前提

User 模型需要实现 `Tymon\JWTAuth\Contracts\JWTSubject`

```Plaintext
use Tymon\JWTAuth\Contracts\JWTSubject as JWTSubjectAuthenticatable;
class User extends Model implements JWTSubjectAuthenticatable
{
    use Authenticatable;
    ...
    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Eloquent model method
    }
    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
             'user' => [
                'id' => $this->id,
                ...
             ]
        ];
    }
}
```

### Jwt 认证

在`App\Api\Controllers`目录下新建`AuthController`并继承之前定义好的`BaseController`在`jwt`的[创建token的页面](https://github.com/tymondesigns/jwt-auth/wiki/Creating-Tokens) 我们就可以使用它的`authenticate`方法

```Plaintext
public function authenticate(Request $request)
{
    // grab credentials from the request
    $credentials = $request->only('email','password');
    try {
        // attempt to verify the credentials and create a token for the user
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
    } catch (JWTException $e) {
        // something went wrong whilst attempting to encode the token
        return response()->json(['error' => 'could_not_create_token'], 500);
    }
    // all good so return the token
    return response()->json(compact('token'));
}
```

为了执行这个方法 可以去路由中定义

```Plaintext
$api->version('v1', function ($api) {
    $api->group(['namespace' => 'App\Api\Controllers'], function ($api) {
        $api->post('user/login','AuthController@authenticate');
        $api->post('user/register','AuthController@register');
    });
});
```

这个时候再去查看一下我们的路由的话就会看到新定义的`post`路由为了验证请求的结果 我们可以使用`postman`这个`chrome`工具 去请求 `http://localhost:8000/api/user/login` 这个时候是会返回`{"error":"invalid_credentials"}`为了能够正确通过我们可以在`body`部分给出用户邮箱和密码(用户可用`thinker`创建一个) 这个时候就会正确返回一个`token`这个`token`就是用来保护有`jwt`认证下的信息

### 添加 jwt 认证限制

我们可以为`Post`的数据添加一个`middleware`

```Plaintext
$api->group(['middleware'=>'jwt.auth'],function ($api){
    $api->get('posts',PostsController@index');
    $api->get('posts/{id}','PostsController@show');
});
```

所以这个时候如果我们没有之前`authenticate`返回的`token`的话 我们是无法访问`api/posts`和`api/post/{id}`的只有加上返回的`token`我们才能继续访问到之前的数据信息 如`/api/posts?token=xxxxxx`既然只有登录的用户才能访问到这些资源 那么我们是不是也可以去拿到登录的用户在`jwt`的`Authentication`里就提供了`getAuthenticatedUser`这个方法 所以为了查看效果 可以去注册一条路由

```Plaintext
$api->group(['middleware'=>'jwt.auth'],function ($api){
    $api->get('user/me','AuthController@getAuthenticatedUser');
});
```

接着在`AuthController`里去定义这个方法

```Plaintext
public function getAuthenticatedUser()
{
    try {
        if (! $user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }
    } catch (TokenExpiredException $e) {
        return response()->json(['token_expired'], $e->getStatusCode());
    } catch (TokenInvalidException $e) {
        return response()->json(['token_invalid'], $e->getStatusCode());
    } catch (JWTException $e) {
        return response()->json(['token_absent'], $e->getStatusCode());
    }
    // the token is valid and we have found the user via the sub claim
    return response()->json(compact('user'));
}
```

所以说这时候去访问 `http://localhost:8000/api/user/me?token=xxx` 就可以拿到当前登录的用户信息了

## 相关链接

- [Dingo/api](https://github.com/dingo/api)
- [Dingo/api 配置页面](https://github.com/dingo/api/wiki/Configuration)
- [tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth)
- [JSON Web Token - 在Web应用间安全地传递信息](http://blog.leapoahead.com/2015/09/06/understanding-jwt/)