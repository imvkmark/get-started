# Laravel 之表单验证类 (Form Requests)

> 本文基于 laravel 6.x

## 表单验证

只要你曾经在使用 Laravel 框架的过程中试图找到有关用户输入验证的最佳实践, 你就应该了解这是一个争论最多并且几乎没有达成共识的话题. 我们可以在控制器中进行验证,
可以在单独的一个服务层进行验证, 可以在模型中进行验证, 当然还可以在 Javascript 中进行验证 (这只是一个玩笑, 谁都知道不能只依赖于客户端的验证). 但是, 哪一种做法才是最佳的呢?

Laravel 引入的表单请求 (Form Request) 特性提供了集规范性 (差不多就是 "最佳实践" 的意思) 和便捷性 (这是比之前任何一种选择都更强大也更便捷的方式) 于一体的, 在
Laravel 中执行数据检查和验证的新手段.

### Form Requests 使表单验证不再让人头痛

Laravel 带来了 Form Requests, 这是一种特殊的类型, 用于在提交表单时进行数据的检查和验证. 每个 Form Request 类至少包含一个  `rules()`  方法, 这个方法返回一组验证规则.
除此之外还必须包含一个  `authorize()`  方法, 该方法返回一个布尔值, 代表是否允许用户执行本次请求.

Laravel 会在解析 POST 路由之前自动把用户输入的信息传递给相应的表单请求, 因此我们的所有验证逻辑都可以移到独立于控制器和模型之外的 FormRequest 对象中.

### 实践

#### 控制器

```php
<?php
    
namespace App\Http\Controllers;

use App\Http\Requests\FriendFormRequest;
use Illuminate\Routing\Controller;
use Response;
use View;

class FriendsController  extends Controller
{
    public function getAddFriend()
    {
        return view('friends.add');
    }

    public function addFriend(FriendFormRequest $request)
    {
        return Response::make('Friend added!');
    }
}
```

#### 创建 FormRequest

```php
<?php

    namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Response;

class FriendFormRequest  extends FormRequest
{
    public function rules()
    {
        return [
            'first_name' =>  'required',
            'email_address' =>  'required|email'
        ];
    }

    public function authorize()
    {
        // 只允许登陆用户
        // 返回 \Auth::check();
        // 允许所有用户登入
        return true;
    }

    // 可选: 重写基类方法
    public function forbiddenResponse()
    {
        // 这个是可选的, 当认证失败时返回自定义的 HTTP 响应.
        // (框架默认的行为是带着错误信息返回到起始页面)
        // 可以返回 Response 实例, 视图, 重定向或其它信息
        return Response::make('Permission denied foo!', 403);
    }

    // 可选: 重写基类方法
    public function response()
    {
        // 如果需要自定义在验证失败时的行为, 可以重写这个方法
        // 了解有关基类中这个方法的默认行为,可以查看:
        // https://github.com/laravel/framework/blob/master/src/Illuminate/Foundation/Http/FormRequest.php
    }
}
```

接下来, 用  `php artisan serve`  或者你自己喜欢的方式启动服务器. 提交表单, 你可以看到我们并没有往控制器中添加任何一行验证逻辑, 但是验证规则已经生效了.

### 其它实践

如果对 "新增" 和 "编辑" 有不同的规则, 或者根据不同的输入进行不同的验证, 要怎么办呢? 这里有几个可以参考的例子, 虽然还不能确定这些就是 "最佳实践":

#### 采用条件判断逻辑

`rules()`  作为一个方法而不是属性, 带来的好处就是你可以在方法中添加判断逻辑:

```php
<?php

class UserFormRequest  extends FormRequest
{
    protected $rules = [      
        'email_address' =>  'required',
        'password' =>  'required|min:8',
    ];

    public function rules()
    {
        $rules =  $this->rules;

        // 根据不同的情况, 添加不同的验证规则
        if ($someTestVariableShowingThisIsLoginInsteadOfSignup)
        {
            $rules['password'] =  'min:8';
        }

        return $rules;
    }
}
```

#### 自定义校验

除了上面的方式, 如果需要对验证逻辑进行更深入的控制, 可以重写提供校验对象实例的方法. 下面是一个简单的实例

```php
class FriendFormRequest  extends FormRequest
{
    public function validateResolved(ValidationService  $service)
    {
        $validator =  $service->getValidator($this->input());

        // 可选: 通过新的 ->after() 方法来进行自定义
        $validator->after(function()  use ($validator)) {
            // 在这里可以做更多更深入的校验

            $validator->errors()->add('field', 'new error);
		}
	}
}
```

### 其它可自定义的参数:

- `$redirect`: 校验失败时要重定向到的 URI.
- `$redirectRoute`: 校验失败时要重定向到的路由.
- `$redirectAction`: 校验失败时要重定向到的方法.
- `$dontFlash`: 重定向时不要传递的输入项的键 (默认值: ['password', 'password_confirmation']).

## validateResolved 验证流程

![image.png](https://file.wulicode.com/yuque/202212/05/17/2010pR90HPWs.png?x-oss-process=image/resize,h_548)

在创建 FormRequest 的时候, Taylor 还编写了一个接口 (ValidatesWhenResolved) 和一个 trait (ValidatesWhenResolvedTrait), 都是用于对控制器方法进行校验的. 这种校验会在IOC
容器对该方法的依赖项解析成功时调用.

所以, 如果你读过我的[上一篇文章](http://www.ofcss.com/2015/02/10/laravel-5-0-form-requests.html), 你已经了解了 FormRequest 对象, 通过 IOC 的依赖注入机制注入到方法,
可以取消相关方法的执行. 假如表单提交的数据不能通过校验, 与该表单对应的 POST route 会被负责校验它的 FormRequest 类取消执行.

这带来的一个结果就是: "触发 IOC 容器的 FormRequest 调用校验方法" 这个操作可以被分离为一个单独的接口,
名为  [ValidatesWhenResolved](https://github.com/illuminate/contracts/blob/master/Validation/ValidatesWhenResolved.php). 借助这一点, 我们也可以创建类似
FormRequest 的类, 在执行控制器方法 (理论上非控制器也可以) 之前对请求进行拦截, 并决定它能否通过校验.

> 说明: 如果一个请求校验失败的话, 路由或方法其实没有真正取消. FormRequest 只是抛出了一个 HTTP 异常, 该异常随后以 JSON 格式返回, 或者被重定向到处理异常的页面.
> 理论上来说, 你不实现这个接口, 而只是简单地在控制器的构造函数中进行校验并抛出异常也是一样的. 但是借助这个接口, 我们可以保持代码清洁, 并且可以在一个命名的方法中来执行校验.


官方文档:[https://github.com/illuminate/contracts/blob/master/Validation/ValidatesWhenResolved.php](https://github.com/illuminate/contracts/blob/master/Validation/ValidatesWhenResolved.php)

```php
<?php

namespace Illuminate\Contracts\Validation;

interface ValidatesWhenResolved
{
    /**
     * Validate the given class instance.
     *
     * @return void
     */
    public function validateResolved();
}
```

通过该接口可知, 实现这个接口只需要实现一个方法  `validateResolved()`. 事实上, 对于实现这个方法的类, 我们只需要知道一点, 就是当 IOC 容器解析到它的时候,
会调用  `validateResolved()`  这个方法. 接下来我们就来创建一个并非 FormRequest 扩展类但是却实现了这个接口的类:

### 在控制器中不使用 FormRequest 进行校验

```php
<?php

namespace App\Http\Controllers;

use App\Random\RandomAccess;
use Illuminate\Routing\Controller;
use Response;

class ValidatedController  extends Controller
{
    public function random(RandomAccess  $ram)
    {
        return Response::make('You made it!');
    }
}
```

上面是一个简单的控制器. 有了路由之后, 我们来创建一个不继承 FormRequest 的验证类:

```php
<?php

namespace App\Random;

use Exception;
use Illuminate\Contracts\Validation\ValidatesWhenResolved;
use Illuminate\Http\Request;

class RandomAccess  implements ValidatesWhenResolved
{
    public function __construct(Request  $request)
    {
        $this->request =  $request;
    }

    public function validateResolved()
    {
        // Test for an even vs. odd remote port
        if (($this->request->server->get('REMOTE_PORT') / 2) % 2 > 0)
        {
            throw new Exception("WE DON'T LIKE ODD REMOTE PORTS");
        }
    }
}
```

现在控制器方法就被拦截并且随机抛出异常 (取决于请求访问的端口是奇数还是偶数, 这恐怕是有史以来最没实用价值的一个例子了, 哈哈).

如你所见, 这里没有用到什么神奇的东西,  `validateResolved()`  方法是否返回 true 或者 false 并不重要. 你当然可以通过 `ValidatesWhenResolvedTrait` 这个 trait 来实现
FormRequest 中的  `failedValidation()`  的部分流程, 而在上面的例子中, 只需要抛出异常就可以了.

### 真实案例

你肯定不会像上面的例子里那样去随机抛出异常. 本文探讨的这些新特性最终看起来有点像以前的 route filters. 但我还是怀疑它们在实际中能有多少应用场景. 不管怎么说,
要是你想给你的控制器注入什么东西的话, 或者可以让它实现 ValidatesWhenResolved 接口或者使用 ValidatesWhenResolvedTrait, 这样它就能通过注入进行自动校验,
不用额外去调用一个校验方法了.



