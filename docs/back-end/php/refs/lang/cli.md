---
description: 'PHP命令行（CLI）模式允许在终端直接执行PHP脚本，无需依赖Web服务器。它支持参数传递（通过$argv数组接收），常用于批量处理、定时任务、开发工具和脚本自动化。提供交互模式（php -a）逐行执行代码。内置参数如-f指定脚本文件，-r直接执行单行代码。与Web环境相比，CLI模式无HTTP相关变量，运行环境更纯粹。'
lastUpdated: '2026-06-17 19:04:21'
head:
  - - meta
    - name: 'og:title'
      content: '命令行'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'PHP命令行（CLI）模式允许在终端直接执行PHP脚本，无需依赖Web服务器。它支持参数传递（通过$argv数组接收），常用于批量处理、定时任务、开发工具和脚本自动化。提供交互模式（php -a）逐行执行代码。内置参数如-f指定脚本文件，-r直接执行单行代码。与Web环境相比，CLI模式无HTTP相关变量，运行环境更纯粹。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/refs/lang/cli.html'
---
# 命令行

PHP 命令行（PHP CLI，Command Line Interface）是 PHP 的命令行运行模式，允许在终端或命令提示符中直接执行 PHP 脚本，无需依赖 Web 服务器。

主要特点和用途：

- 直接运行脚本：通过 `php 脚本文件名.php` 命令执行，适合批量处理、定时任务等场景
- 无需浏览器：输出直接显示在终端，便于调试和查看结果
- 支持参数传递：可通过命令行向脚本传递参数，使用 `$argv` 数组接收
- 常用于开发工具、后台任务、脚本自动化、服务器管理脚本等
- 提供交互模式：输入 `php -a` 可进入交互式环境，逐行执行 PHP 代码

与 Web 环境相比，CLI 模式下没有 HTTP 相关变量，运行环境更纯粹，适合处理不需要 Web 服务器参与的任务。

PHP 命令行模式允许通过命令行执行 PHP 脚本，并支持传递参数，主要分为以下几类：

1. **内置参数**：PHP 解释器自带的选项

   - `f`：指定要执行的脚本文件，如 `php -f script.php`
   - `r`：直接执行单行 PHP 代码，如 `php -r "echo 'Hello';"`
   - `c`：指定 php.ini 配置文件路径
   - `d`：临时设置配置项，如 `php -d memory_limit=128M script.php`
   - `l`：检查脚本语法是否正确
2. **用户自定义参数**：脚本中通过 `$argv` 和 `$argc` 接收

   - `$argv`：数组，包含所有参数（第一个元素是脚本名）
   - `$argc`：整数，表示参数总数  
   示例：`php script.php 10 20` 中，`$argv` 为 `[script.php, 10, 20]`，`$argc` 为 3

常见使用场景：

- 定时任务（如通过 crontab 执行数据备份脚本）
- 命令行工具开发（如自定义脚手架、部署工具）
- 批量处理任务（如数据导入导出、日志分析）
- 脚本测试与调试（快速验证代码片段）
- 后台进程运行（如守护进程处理队列任务）