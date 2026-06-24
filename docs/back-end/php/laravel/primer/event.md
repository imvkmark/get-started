---
description: '在Laravel中，通过Event类定义事件，使用监听器（Listener）处理逻辑。通过EventServiceProvider注册事件与监听器的映射，或使用Event::listen方法手动绑定。触发条件通过event()辅助函数或Event::dispatch实现，当事件被触发时，所有绑定的监听器依次执行处理函数。'
lastUpdated: '2026-06-21 20:39:43'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel - Event(事件) '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在Laravel中，通过Event类定义事件，使用监听器（Listener）处理逻辑。通过EventServiceProvider注册事件与监听器的映射，或使用Event::listen方法手动绑定。触发条件通过event()辅助函数或Event::dispatch实现，当事件被触发时，所有绑定的监听器依次执行处理函数。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/primer/event.html'
---
# Laravel - Event(事件)

### 设置监听事件

在 `app/Providers/EventServiceProvider` 中设置需要监听的事件

```PHP
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

```PHP
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

```PHP
\Event::fire('admin.login_ip_banned', [$this->ip, \Auth::user()]);
```