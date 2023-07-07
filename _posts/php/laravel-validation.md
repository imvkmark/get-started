---
title: "「译」 Laravel 5 验证请求, 如何在更新时候处理验证"
date: 2022-04-14 22:27:32
toc: true
categories:
- ["Php","Laravel"]
---



原文地址: [Laravel 5 Validation Request, how to handle validation on update?](https://laracasts.com/discuss/channels/requests/laravel-5-validation-request-how-to-handle-validation-on-update)

我喜欢 Laravel 5 的验证模式, 我可以很轻松的使用如下代码进行权限验证



```
public function authorize(Authenticator $auth)
{
    return $auth->user()->hasRole('administrator');
}
```
以上没有问题, 但是我遇到了另外一个问题, 这是当你更新记录的时候, 怎样处理这些规则呢?在更新邮箱的时候我需要如下的规则 `'email' => 'unique:users,email_address,10'`, 这样代码规则是这样的 
```
public function rules()
{
    return [
        'email' => 'required|unique:users,id,?????',
        'tags' => 'required'
    ];
}
```
谁能够帮我下!

你可以使用 `$this->method()` 来获取方法名, 使用 `switch` 语句, 来返回需要的特定规则
```
public function rules()
{
    $user = User::find($this->users);
    switch($this->method())
    {
        case 'GET':
        case 'DELETE':
        {
            return [];
        }
        case 'POST':
        {
            return [
                'user.name.first' => 'required',
                'user.name.last'  => 'required',
                'user.email'      => 'required|email|unique:users,email',
                'user.password'   => 'required|confirmed',
            ];
        }
        case 'PUT':
        case 'PATCH':
        {
            return [
                'user.name.first' => 'required',
                'user.name.last'  => 'required',
                'user.email'      => 'required|email|unique:users,email,'.$user->id,
                'user.password'   => 'required|confirmed',
            ];
        }
        default:break;
    }
}
```
