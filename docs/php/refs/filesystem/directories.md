# 文件系统相关扩展 - Directories

目录函数

安装

PHP核心,无需安装

配置

## 常量

DIRECTORY_SEPARATOR
目录分隔符 PATH_SEPARATOR 路径分隔符

## 函数

这里的Directory 实例使用 dir() 函数建立, 不使用new操作符, 这里的目录函数和相关的函数通用.但是这个函数不能和opendir()函数返回的句柄通用, opendir返回的是一个资源, 但是dir()返回的是一个对象.

```
Directory {    /* 属性 */    public string $path ;         打开的目录    public resource $handle ;         可以被 readdir(), rewinddir(), closedir() 函数操作的句柄    /* 方法 */    public void close ([ resource $dir_handle ] )    void closedir ( resource $dir_handle )         关闭目录句柄         关闭opendir()函数打开的目录访问句柄    public string read ([ resource $dir_handle ] )    string readdir ( resource $dir_handle )         从目录句柄中读取条目    public void rewind ([ resource $dir_handle ] )    void rewinddir ( resource $dir_handle )         将dir_handle 指定的目录流重置到目录的开头}
```

`bool chdir ( string $directory )`

改变PHP的当前目录, 改变当前的工作目录,如果更改了目录,则包含的文件基于更改的目录

`bool chroot ( string $directory )`

将当前进程的根目录改变为 directory [Attention]本函数仅在系统支持且运行于 CLI，CGI 或嵌入 SAPI 版本时才能正确工作。此外本函数还需要 root 权限

`Directory dir ( string $directory [, resource $context ] )` 返回一个Directory 类, 一个伪面向对象机制来读取一个目录

`string getcwd ( void )`

获取当前的工作目录, 可以使用这个函数来替代__FILE__获取当前工作目录,或者文件目录.

`resource opendir ( string $path [, resource $context ] )`

打开一个目录,返回一个资源句柄

`array scandir ( string $directory [, int $sorting_order [, resource $context ]] )`

列出指定路径中的文件和目录