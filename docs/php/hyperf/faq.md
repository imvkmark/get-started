# Hyperf - FAQ

## 枚举无法显示信息

使用枚举设定信息的时候, 引号必须是 `"`, 而不能是 `'`

```php{8}
/**
 * @Constants
 */
class Resp extends AbstractConstants
{

    /**
     * @Message("framework.resp__success")
     */
    public const SUCCESS = 0;
}
```

## 命令行使用 `$signature` 时候的 argument 的冒号必须有前后空格

```php{6}
/**
 * @Command
 */
class HoppyCommand extends HyperfCommand
{
    protected $signature = 'app:hoppy {action : handle}';
}
```

## 使用 socket 时候出现 Hyperf\HttpMessage\Exception\NotFoundHttpException

```
Hyperf\HttpMessage\Exception\NotFoundHttpException: Not Found(0)
in /webdata/www/dev_game/vendor/hyperf/http-server/src/CoreMiddleware.php:173
...
```

这个地方我是使用的是 nginx 转发, 这个地方使用 socket 进行转发的时候

> WebSocket hande shake failed, because the class does not exists

鉴权失败, 抛出的错误, 直接考虑鉴权

具体详细在错误中抛出