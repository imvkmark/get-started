# vitepress

## FAQ

### VueCompilerError: Element is missing end tag.

查看代码中是否存在 `<code>` 等未关闭的标签, 一般是编写 md 文件不规范, 以至标签未关闭导致的错误

> VueCompilerError: Element is missing end tag.

```
1  |  <template><h1 id="pstack" tabindex="-1"><a class="header-anchor" href="#pstack" aria-hidden="true">#</a> pstack</h1>
2  |  <p>显示每个进程的栈跟踪</p>
3  |  <p><strong>pstack命令</strong> 可显示每个进程的栈跟踪。<code>pstack</code> 命令必须由相应进程的属主或 <code>root</code> 运行。可以使用 <kbd>pstack<code>来确定进程挂起的位置。此命令允许使用的唯一选项是要检查的进程的</code>PID`。</p>
   |                                                                                                       ^
4  |  <p>命令软件包下载地址：https://packages.debian.org/sid/pstack</p>
5  |  <h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2>
```