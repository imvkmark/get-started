---
title: "laravel - 学习 - 事件监听"
date: 2022-04-14 22:13:05
toc: true
categories:
- ["Php","Laravel"]
---

### 设置监听事件
在 `app/Providers/EventServiceProvider` 中设置需要监听的事件



```
class EventServiceProvider extends ServiceProvider {
    protected $listen = [
        'admin.login_ip_banned' => [
            'App\Handlers\Events\Admin\LoginIpBannedLog',
        ],
        'admin.login_ok' => [
            'App\Handlers\Events\Admin\LoginOkLog',
        ],
    ];
    // ...
}
```

### 设置处理函数
`LoginIpBannedLog`
```
class LoginIpBannedLog {
    // 处理事件的函数
    public function handle($ip, $user) {
        PamLog::create([
            'account_id' => $user->account_id,
            'account_name' => $user->account_name,
            'account_type' => $user->account_type,
            'log_type' => 'error',
            'log_ip'  => $ip,
            'log_content' => 'ip 禁止登陆',
        ]);
    }
}
```

### 设置触发条件
在需要触发的时候触发条件, 并用数组传入需要传递的值

`\Event::fire('admin.login_ip_banned', [$this->ip, \Auth::user()]);`

