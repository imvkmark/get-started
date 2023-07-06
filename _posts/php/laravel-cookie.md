---
title: "「译」 使用 Laravel 访问前端 Cookie"
date: 2022-04-14 22:26:31
toc: true
categories:
  - [ "Php","Laravel","Tips 记录" ]
---

原文地址: [Accessing Front-End Cookies with Laravel](https://pineco.de/accessing-front-end-cookies-laravel/)

**在我们的应用程序中，我们可以在JS端设置cookie，但我们也希望在后端使用。我们可以使用**`**$_COOKIE**`**
全局魔术变量，但如果我们使用Laravel，我们会使用它提供的方法。让我们下Laravel中是如何使用的**

## 在前端设置Cookie

在这篇文章中，我们关注现有的cookie。如果对如何从 JavasScript
处理它们感兴趣，请阅读[文档](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)。

现在，假设我们有一个带有“  _is-collapsed_  ”键的现有cookie 。我们想检查后端的值，以便在服务器端执行某些操作。

## Laravel和Cookies

我们可以通过 `request()->cookie()` 方法或使用 `Cookie` Facade 来访问我们的cookie 。

问题是，如果我们想要访问我们在前端设置的 cookie，我们会得到 `null`。但是我们使用 `$_COOKIE` 变量，我们可以访问它，这证明
cookie 是存在的。那问题在什么地方呢？

默认情况下，框架带有用于加密cookie的中间件。如果我们从后端设置一个cookie，它会自动加密，因此Laravel可以读取它。从JS我们没有任何加密，这就是我们无法从框架中访问它们的原因。

## 如何解决这个问题？

在 _app/Http/Kernel.php_ 中, 在 web 中间件分组中(5.2+)，我们可以找到 `EncryptCookies::class`  行。通过注释这个中间件，可以关闭
cookie 的自动加密，但这种方法不是我们想要的解决方案。

建议的方法是使用中间件并添加一些不需要加密的排除项，Laravel无论怎样都应该访问它们。我们可以在
_app/Http/Middlewares/EncryptCookies.php._ 插入中间件的排除项。

```
/**
 * The names of the cookies that should not be encrypted.
 *
 * @var array
 */
protected $except = [
    'is-collapsed',
];
```

通过将 cookie 的名称添加到 except 数组，我们可以使用 Cookie Facade 或 `request()->cookie()` 方法读取cookie 。

如果您对更多信息感兴趣，请查看 [文档](https://laravel.com/docs/5.4/requests#cookies)
或查看有关 [加密如何工作](https://laravel.com/docs/5.4/responses#cookies-and-encryption) 的章节。

