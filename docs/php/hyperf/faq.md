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