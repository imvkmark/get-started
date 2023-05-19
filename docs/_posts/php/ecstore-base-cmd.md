---
title: "base 命令行 cmd"
date: 2022-04-14 22:09:24
toc: true
categories:
- ["Php","源码阅读","ecstore"]
---

使用及命令说明

---

windows:<br />cmd.bat

linux:<br />php cmd<br />由于(命令行读取文件/PHP读取文件)有缓存, 所以需要每次更新文件需要重新运行命令行<br />app/base/cmd help<br />exit                                    退出<br />man                                     显示帮助<br />sh                                      执行操作系统命令<br />mkconfig                                创建config文件<br />ls                                      列出所有应用<br />cd                                      切换当前应用<br />install                                 安装应用<br />uninstall                               卸载应用<br />update                                  升级应用程序<br />trace                                   打开/关闭性能检测<br />status                                  显示系统状态<br />search                                  在程序库中搜索<br />createproject                           创建新项目<br />kvrecovery                              kvstore数据恢复<br />cacheclean                              清除缓存<br />configcompat                            config兼容配置检测

应用提供的命令： -------------------------------------------------------

base:queue list                         列出所有队列任务<br />base:queue flush                        立即执行所有队列任务<br />base:queue exec                         执行指定的队列任务<br />base:queue clear //todo                 清除所有队列任务<br />base:queue active //todo                激活某任务<br />base:queue disable //todo               暂停某任务<br />base:task list                          列出所有计划任务<br />base:task exec                          按计划执行任务<br />dev:check check //todo                  执行代码检查<br />dev:doc update                          执行测试用例<br />dev:new app                             创建一个app<br />dev:project create                      创建新项目<br />dev:show services                       显示注册的Service<br />dev:show viewtags                       显示所有可用模板标签<br />dev:show classfile                      显示类的文件地址<br />dev:show depends                        生成已安装的app依赖关系图, Graphviz格式<br />dev:test do                             执行测试用例

原生php命令 ----------------------------------------------------------------

输入命令如果以分号[;]结尾，则被认为是一条php语句.  例如:<br />  1> $a = 2;<br />     int(2)<br />  2> pow($a,8);<br />     int(256)<br />cmd help -v         <br />    显示帮助文件的参数<br />cmd dev:show services | grep "^view_helper"<br />    谁提供的模版插件<br />app/base/cmd dev:show depends | dot -Tjpg -odepends.jpg<br />    查看依赖关系<br />    # dot 命令在win 上的程序为 : [http://www.graphviz.org/Download.php](http://www.graphviz.org/Download.php)<br />trace on/off<br />    打开性能trace 跟踪



编写新功能

---


- 文件一般放置在 appdir/lib/command/file.php
- 文件继承自   base_shell_prototype
- 函数以   command_ 开头
- 命令运行 appdir:classsuffix command   arg0 arg1
- 和函数同名的为 说明
- 和函数同名另外加 _options 的变量为 说明

以下为一个示例文件:   [http://www.ec-os.net/advance/base/cmd.html](http://www.ec-os.net/advance/base/cmd.html)<br />class myapp_command_hello extends base_shell_prototype{

    var $command_world = 'Helloworld';<br />    var $command_world_options = array(<br />            'quietly'=>array('title'=>'项目模板','short'=>'q'),<br />            'from'=>array('title'=>'项目模板','need_value'=>1),<br />        );<br />    function command_world(){<br />        $options = $this->get_options();<br />        if($options['quietly']){<br />            echo "hello, xxx\n";<br />        }else{<br />            echo "hello, world\n\t\t --from {$options['from']}\n";<br />        }<br />    }<br />}

cmd update 命令的调用说明

---



![](https://file.wulicode.com/yuque/202208/04/14/4915ukfUhnRV.png?x-oss-process=image/resize,h_793)


查看 app 依赖关系

---

cmd dev:show depends | dot -Tjpg -odepends.jpg<br />由于dot 命令需要   [http://www.graphviz.org/](http://www.graphviz.org/)  的支持, 需要下载安装并将 dot 放入到环境变量中 PATH 中

运行这个命令会在 base 目录下生成一个文件 [depends.jpg]

![](https://file.wulicode.com/yuque/202208/04/14/4915KOfkRVnY.jpg?x-oss-process=image/resize,h_155)

