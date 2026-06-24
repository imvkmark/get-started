---
description: 'Laravel中设置Session的`expire_on_close`选项为`true`，可使浏览器关闭时Session立即失效。通过调整`lifetime`配置可控制Session存活时长，同时修改`remember`的过期时间以延长用户登录状态。'
lastUpdated: '2026-06-21 20:39:51'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel - Session'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel中设置Session的`expire_on_close`选项为`true`，可使浏览器关闭时Session立即失效。通过调整`lifetime`配置可控制Session存活时长，同时修改`remember`的过期时间以延长用户登录状态。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/primer/session.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/f0944f0d4a4b123257109ed677d00eee.png'
---
# Laravel - Session

Laravel session lifetime 的概念

## Session

💡 如果 \`expire_on_close\` 设置为 \`false\` 的话，\`lifetime\` 有效，如果 \`expire_on_close\` 设置为\`true\` 的话，\`lifetime\` 的意义是最长的会话时间

### Lifetime

生命周期 `config('session.lifetime')` 的默认时长是两个小时, 通过动态的修改这个参数可以设置用户 session 的时长

### ExpireOnClose - 关闭浏览器时候 session 失效

配置 : `session.expire_on_close`

此项在浏览器关闭的时候清理掉 session

### 情景 1:

当 `expire_on_close` 设置为 `true` 时, 用户登录之后, 服务端 session 存储的最长时间为设定的 `lifetime` 的时间(当使用 redis 作为缓存的时候)

这种设置当 chrome 浏览器设置为 `启动` 时 `继续上一次打开的网页` 时候是无效的

![](https://file.wulicode.com/feishu-images/f0944f0d4a4b123257109ed677d00eee.png)

[Chrome doesn't delete session cookies](https://stackoverflow.com/questions/10617954/chrome-doesnt-delete-session-cookies)

### 情景 2:

当设置了 `lifetime` 的时候, 最长的会话时间则为 `lifetime` 的时间, 如果我们通过配置修改了 `lifetime` 的时间, 必须要保证这个时间比默认的时间要短, 否则会出现客户端未过期, 但是服务端已经过期的情况

## 更改 remember 的时间

当我们使用 `Auth::login($user, $remember)` 去进行登录的时候, 默认是永久的记录(5 年的时间) , 将 `remember_{type}_hash..` 这个 cookie 写在客户端, 当 session 失效的时候通过这个凭证来重新唤醒 session

[Cookie Expires and Max-Age attributes now have upper limit - Chrome Developers](https://developer.chrome.com/blog/cookie-max-age-expires/)

从Chrome M104版本（2022年8月）开始，cookie 的过期日期不能超过400天。这个变化不会影响会话cookie，即没有使用Max-Age或Expires显式设置过期日期的cookie，因为这些cookie在浏览会话结束时被清除。

你应该先获取 cookie 队列值，然后重置 cookie 过期时间。

```PHP
$rememberTokenExpireMinutes = 20;

// 首先获取 记住我 这个 Cookie 的名字, 这个名字一般是随机生成的,
// First, get remember me cookie name. This is randomly generated.
$rememberTokenName = \Auth::getRecallerName();

$cookieJar = $this->guard()->getCookieJar();

$cookieValue = $cookieJar->queued($rememberTokenName)->getValue();

$cookieJar->queue($rememberTokenName, $cookieValue, $rememberTokenExpireMinutes);

$jumpUrl = '/user/xxxx';

return $this->authenticated($request, $this->guard()->user())
    ?: redirect()->intended($jumpUrl);
```

在 Laravel 9 可以设置单独的 remember 时间

```PHP
<?php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
        'remember' => 43800    // Set remember me duration here
    ],
],
```