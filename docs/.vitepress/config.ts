import { defineConfig } from "vitepress";

const createLink = (title: string, url: string) => {
    return { text: title, link: url };
};

const nav = [
    {
        text: "语言",
        activeMatch: `^/dart|python|javascript|php|java|flutter|man/`,
        items: [
            { text: "Dart", link: "/dart/guides/1-lang" },
            { text: "Python", link: "/python/" },
            { text: "Javascript", link: "/javascript/" },
            { text: "Java", link: "/java/" },
            { text: "Flutter", link: "/flutter/" },
            {
                text: "Php", items: [
                    createLink('介绍', '/php/'),
                    createLink('Laravel', '/php/laravel/faq'),
                    createLink('函数参考', '/php/refs/language/intro'),
                ]
            },
            { text: "Man", link: "/man/" },
            { text: "C++", link: "/cpp/" },
        ],
    },
    {
        text: "开发",
        activeMatch: `^/web|development/`,
        items: [
            { text: "Web", link: "/web/" },
            { text: "手机端", link: "/mobile/design/site" },

            {
                text: 'Ops',
                items: [
                    createLink('运维', '/ops/'),
                    createLink('Nginx', '/ops/nginx/'),
                    createLink('Bash', '/ops/bash/'),
                ]
            },
            {
                text: '开发',
                items: [
                    createLink('Git', '/development/git/faq'),
                    createLink('IDE', '/development/ide/jetbrains-plugins'),
                    createLink('相关', '/development/tools/sdkman'),
                ]
            },
            { text: "部门", link: "/department/test/auto-seldom" },
        ],
    },
    {
        text: "数据库", activeMatch: `^/database/`, items: [
            createLink('MySQL', '/database/mysql/'),
            createLink('Redis', '/database/redis/01-command-data.md'),
        ]
    },
    { text: "Awesome", link: "/awesome/" },
    {
        text: "更多",
        items: [
            {
                text: 'Wulicode',
                items: [
                    createLink('Tools', 'https://tools.wulicode.com'),
                    createLink('Blog(Temp)', 'http://blog.wulicode.com'),
                    createLink('Vant Demo', 'https://vant-demo.wulicode.com'),
                    createLink('Element Plus Demo', 'https://element-plus-demo.wulicode.com'),
                    createLink('Html Get Started', 'https://html-get-started.wulicode.com'),
                ]
            },
            {
                text: 'Framework',
                items: [
                    createLink('Poppy Framework', 'https://weiran.tech')
                ]
            },
            {
                text: '项目',
                items: [
                    createLink('UniStory·优映', 'https://unistory.cn/'),
                    createLink('产品大牛', 'https://pmdaniu.com'),
                    createLink('Wulihub', 'https://wulihub.com.cn'),
                ]
            },
            {
                text: 'Wait List',
                items: [
                    createLink('WIP', '/wait-list'),
                    createLink('学习指南', '/guide'),
                ]
            }
        ],
    },
    { text: "关于", link: "/about-me" },
];

const sidebar = {
    "/javascript": [
        {
            text: "入门",
            items: [createLink("说明", "/javascript/")],
        },
        {
            text: "数据类型",
            items: [createLink("null, undefined, bool", "/javascript/core/2-types/2-null-undefined-bool.md")],
        },
        {
            text: "文档",
            items: [
                createLink("使用 jsdoc 编写 api 文档", "/javascript/tech/use-jsdoc-write-document.md"),
                createLink("Eslint 入门", "/javascript/tech/eslint"),
                createLink("怎样在 JavaScript 中检测 null", "/javascript/core/usage/type-null-how-to-check.md"),
                createLink("Axios 入门", "/javascript/core/tech/axios")
            ],
        },
        {
            text: "Npm/包管理",
            items: [
                createLink("说明", "/javascript/npm/"),
                createLink("npm 和 package.json", "/javascript/npm/npm-and-package-json"),
                createLink("RHEL8 安装 nodejs", "/javascript/npm/install-at-rhel8.md"),
                createLink("Node 更换源使用国内镜像", "/javascript/npm/pkg-use-mirror.md"),
                createLink("使用 pnpm 替代 yarn, npm", "/javascript/npm/pkg-use-pnpm.md"),
                createLink("发布 npm 包 - FAQ", "/javascript/npm/publish-faq.md"),
                createLink("NPM 版本控制", "/javascript/npm/version-intro.md"),
                createLink("nvm：管理 Node.js 版本", "/javascript/npm/version-manager-nvm.md"),
            ],
        },
        {
            text: "React",
            items: [
                createLink("Redux DevTool 工具", "/javascript/react/redux-devtools-intro"),
                createLink("基于 Umi 的最佳实践", "/javascript/react/umi-best-practice.md"),
                createLink("基于 Umi/AntDesign 的最佳实践", "/javascript/react/umi-antd-best-practice.md"),
            ],
        },
        {
            text: "Taro",
            items: [
                createLink("FAQ", "/javascript/taro/faq"),
            ],
        },
    ],
    "/java": [
        {
            text: "入门",
            items: [
                createLink("说明", "/java/"),
                createLink("安装 JDK", "/java/tech/install"),
            ],
        },
        {
            text: "基础版",
            items: [
                createLink("1. Java 概述", "/java/core-basic/1-lang"),
                createLink("2. Java 运行环境", "/java/core-basic/2-design-env"),
                createLink("3. Java 基本结构", "/java/core-basic/3-basic-struct"),
                createLink("4. 对象和类", "/java/core-basic/4-class-object"),
                createLink("5. 继承", "/java/core-basic/5-extend"),
                createLink("6. 接口, lambda, 内部类", "/java/core-basic/6-interface-lambda-inner"),
                createLink("7. 异常断言和日志", "/java/core-basic/7-exception-assert-log"),
                createLink("8. 泛型", "/java/core-basic/8-generic"),
                createLink("9. 集合", "/java/core-basic/9-collection"),
            ],
        },
        {
            text: "Gradle",
            items: [
                createLink("1. 关于 Gradle", "/java/gradle/1-intro"),
                createLink("2. 开始使用", "/java/gradle/2-get-started"),
                createLink("6. 使用依赖项", "/java/gradle/6-working-with-dependencies"),
            ],
        },
        {
            text: "JUnit",
            items: [
                createLink("1. 概览", "/java/junit/1-overview"),
                createLink("2. 编写测试", "/java/junit/2-write-tests"),
            ],
        },
        {
            text: "FAQ",
            items: [createLink("FAQ", "/java/faq.md")],
        },
    ],
    "/php": [
        {
            text: '安装',
            items: [
                createLink('Mac 安装 LNMP', '/php/install/mac-lnmp'),
                createLink('CentOS 7 安装 LNMP', '/php/install/centos7-lnmp-plus'),
                createLink('RockyLinux 安装 LNMP', '/php/install/rocky-lnmp'),
                createLink('使用 PECL 安装扩展', '/php/install/pecl-install-extension'),
            ]
        },
        {
            text: 'Composer',
            items: [
                createLink('安装和加速', '/php/composer/install-and-use-mirror'),
                createLink('怎样创建 PSR-4 的 Php 包', '/php/composer/create-psr4-package.md'),
            ]
        },
        {
            text: 'Packages',
            items: [
                createLink('Carbon', '/php/packages/carbon-carbon'),
                createLink('dotenv - PHP 版本的 .env', '/php/packages/vlucas-phpdotenv.md'),
            ]
        },
        {
            text: '其他',
            items: [
                createLink('使用 Clockwork 调试 Php 应用', '/php/tech/using-clockwork-extension-for-debug.md'),
                createLink('Php 获取到的 Headers', '/php/tech/http-headers'),
                createLink('FAQ', '/php/faq.md'),
            ]
        },
        {
            text: 'Hyperf',
            items: [
                createLink('入门', '/php/hyperf/'),
                createLink('注解', '/php/hyperf/core-annotation'),
                createLink('Aop', '/php/hyperf/core-aop'),
                createLink('FAQ', '/php/hyperf/faq'),
            ]
        },
    ],
    "/php/laravel": [
        {
            text: 'Laravel 学习',
            items: [
                createLink('入门笔记', '/php/laravel/learn-note'),
                createLink('Eloquent 和 Migrate', '/php/laravel/eloquent-migrate.md'),
                createLink('表单验证类 (Form Requests)', '/php/laravel/form-requests.md'),
            ]
        },
        {
            text: '源码阅读',
            items: [
                createLink('初始 : (1) 入口文件 index', '/php/laravel/source-read-index'),
            ]
        },

        createLink('FAQ', '/php/laravel/faq.md'),
    ],
    "/php/refs": [
        {
            text: '语言参考',
            items: [
                createLink('入门', '/php/refs/language/intro'),
                createLink('流程控制', '/php/refs/language/control-structures'),
            ]
        },
        {
            text: '影响 PHP 行为的扩展',
            items: [
                createLink('错误处理', '/php/refs/affect-php-behaviour/error-handling'),
                createLink('输出控制', '/php/refs/affect-php-behaviour/output-control'),
            ]
        },
        {
            text: '压缩与归档扩展',
            items: [
                createLink('Bzip2', '/php/refs/compress-archive/bzip2'),
                createLink('LZF', '/php/refs/compress-archive/lzf'),
                createLink('Phar', '/php/refs/compress-archive/phar'),
                createLink('Rar', '/php/refs/compress-archive/rar'),
                createLink('Zip', '/php/refs/compress-archive/zip'),
                createLink('Zlib', '/php/refs/compress-archive/zlib'),
            ]
        },
        {
            text: '加密扩展',
            items: [
                createLink('Hash', '/php/refs/cryptography/hash'),
                createLink('Mcrypt', '/php/refs/cryptography/mcrypt'),
                createLink('MHash', '/php/refs/cryptography/mhash'),
                createLink('OpenSSL', '/php/refs/cryptography/openssl'),
            ]
        },
        {
            text: '数据库扩展',
            items: [
                createLink('DBA', '/php/refs/database/dba'),
                createLink('PDO', '/php/refs/database/pdo'),
                createLink('MySQLi', '/php/refs/database/db-mysqli'),
            ]
        },
        {
            text: '日期与时间相关扩展',
            items: [
                createLink('Calendar', '/php/refs/date-time/calendar'),
                createLink('DateTime', '/php/refs/date-time/datetime'),
            ]
        },
        {
            text: '文件系统相关扩展',
            items: [
                createLink('Direct IO', '/php/refs/filesystem/direct-io'),
                createLink('目录', '/php/refs/filesystem/directories'),
                createLink('Fileinfo', '/php/refs/filesystem/fileinfo'),
                createLink('文件系统', '/php/refs/filesystem/filesystem'),
            ]
        },
        {
            text: '图像生成和处理',
            items: [
                createLink('Exif', '/php/refs/filesystem/direct-io'),
            ]
        },
        {
            text: '国际化',
            items: [
                createLink('Enchant', '/php/refs/international/enchant'),
                createLink('Gettext', '/php/refs/international/gettext'),
                createLink('iconv', '/php/refs/international/iconv'),
                createLink('intl', '/php/refs/international/intl'),
            ]
        },
        {
            text: '数学扩展',
            items: [
                createLink('BC Math', '/php/refs/mathematical/bcmath'),
                createLink('Math', '/php/refs/mathematical/math'),
            ]
        },
        {
            text: '其他基本扩展',
            items: [
                createLink('Json', '/php/refs/other-basic/json'),
                createLink('Misc 杂项', '/php/refs/other-basic/misc'),
                createLink('SPL', '/php/refs/other-basic/spl'),
                createLink('SPL-interfaces', '/php/refs/other-basic/spl-interfaces'),
                createLink('SPL-迭代器', '/php/refs/other-basic/spl-iterators'),
                createLink('SPL-其他类和接口', '/php/refs/other-basic/spl-misc-classes-interfaces'),
                createLink('Urls', '/php/refs/other-basic/urls'),
                createLink('Yaml', '/php/refs/other-basic/yaml'),
                createLink('Pecl', '/php/refs/pecl/'),
            ]
        },
        {
            text: '其他服务',
            items: [
                createLink('CURL', '/php/refs/other-services/curl'),
                createLink('网络', '/php/refs/other-services/network'),
            ]
        },
        {
            text: '预定义类和接口',
            items: [
                createLink('WeakReference', '/php/refs/predefined-interfaces-classes/weakreference'),
            ]
        },
        {
            text: '进程控制',
            items: [
                createLink('EIO', '/php/refs/process-control/eio'),
            ]
        },
        {
            text: '服务器指定扩展',
            items: [
                createLink('Apache', '/php/refs/server-specific/apache'),
            ]
        },
        {
            text: '文本处理',
            items: [
                createLink('BBCode', '/php/refs/text-processing/bbcode'),
                createLink('PCRE', '/php/refs/text-processing/pcre'),
                createLink('POSIX', '/php/refs/text-processing/posix'),
                createLink('字符串', '/php/refs/text-processing/string'),
            ]
        },
        {
            text: '变量和类型',
            items: [
                createLink('数组', '/php/refs/variables-types/array'),
                createLink('CType', '/php/refs/variables-types/ctype'),
                createLink('Filter', '/php/refs/variables-types/filter'),
                createLink('函数处理', '/php/refs/variables-types/function-handling'),
                createLink('变量处理', '/php/refs/variables-types/variable-handling'),
            ]
        },
        {
            text: 'XML',
            items: [
                createLink('DOM', '/php/refs/xml/dom'),
            ]
        },
    ],
    "/python": [
        {
            text: "介绍",
            items: [
                createLink("说明", "/python/"),
                createLink("使用镜像, 加速安装", "/python/install/use-mirror-to-speed"),
                createLink("CentOS 安装 Python", "/python/install/at-centos"),
            ],
        },
        {
            text: "类型和运算",
            items: [
                createLink("目录", "/python/python-manual/toc"),
                createLink("第一章 : 问答环节", "/python/python-manual/1-qa"),
                createLink("第二 三章 运行程序", "/python/python-manual/2-3-run"),
                createLink("第四章 介绍 python 对象类型", "/python/python-manual/4-object-type"),
                createLink("第五章 数值类型", "/python/python-manual/5-int"),
            ],
        },
        {
            text: "模块",
            items: [
                createLink("urllib - Url 处理模块", "/python/library/internet-urllib"),
                createLink("Pydash 中文文档", "/python/package/pydash"),
                createLink("Pipenv 管理环境", "/python/package/pipenv"),
                createLink("requirement.txt 介绍", "/python/tech/requirement-usage"),
            ],
        },
    ],
    "/dart": [
        {
            text: "语言",
            items: [
                createLink("1. 语言介绍", "/dart/guides/1-lang"),
                createLink("2. 语法概览", "/dart/guides/2-lang-tour"),
            ],
        },
        {
            text: "测试",
            items: [createLink("单元测试", "/dart/tests/")],
        },
    ],
    "/cpp": [
        {
            text: "C++ / Qt5 Cookbook",
            items: [
                createLink("目录", "/cpp/cpp-qt5-cookbook/toc"),
                createLink("1. 外观和自定义", "/cpp/cpp-qt5-cookbook/1-appearance-custom"),
                createLink("2. 状态和特效", "/cpp/cpp-qt5-cookbook/2-property"),
            ],
        },
        {
            text: "C++ Primer",
            items: [
                createLink("目录", "/cpp/cpp-primer/toc"),
                createLink("1. 开始", "/cpp/cpp-primer/1-start"),
                createLink("2. 变量和基本类型", "/cpp/cpp-primer/2-vars"),
                createLink("3. 字符串, 向量和数组", "/cpp/cpp-primer/3-string-vector-array.md"),
                createLink("4. 表达式", "/cpp/cpp-primer/4-expression"),
                createLink("5. 语句", "/cpp/cpp-primer/5-sentence"),
                createLink("6. 函数", "/cpp/cpp-primer/6-function"),
            ],
        },
    ],
    "/flutter": [
        {
            text: "入门",
            items: [
                createLink("1. 介绍", "/flutter/"),
                createLink("2. 安装", "/flutter/install"),
            ],
        },
    ],
    "/development": [
        {
            text: "开发工具",
            items: [
                createLink("SDKMAN!", "/development/tools/sdkman"),
                createLink("Homebrew", "/development/tools/homebrew"),
                createLink("ApiDoc", "/development/tools/apidoc"),
                createLink("jenv - 管理 Java 环境", "/development/tools/jenv"),
            ],
        },


        {
            text: "运营相关",
            items: [
                createLink("robots 文档", "/development/op/robots"),
                createLink("SEO 和 蜘蛛", "/development/op/seo-and-crawler"),
            ],
        },
        {
            text: "设计",
            items: [
                createLink("UI 交互手册", "/development/design/pc-ui-interact"),
            ],
        },
        {
            text: "正则表达式",
            items: [
                createLink("正则手册", "/development/regex/"),
                createLink("正则匹配中文", "/development/regex/zh-match"),
            ],
        },
        {
            text: "其他",
            items: [
                createLink("开发常用术语", "/development/tech/knowledge"),
                createLink("代码审核", "/development/tech/code-review"),
                createLink("Ip, 掩码, IP 段", "/development/tech/ip-mask-range"),
                createLink("FAQ", "/development/tech/faq"),
            ],
        },
    ],
    "/development/git": [
        createLink("Cheat Sheet", "/development/git/cheat-sheet"),
        createLink("使用 husky 让代码更优雅规范", "/development/git/commit-grace-use-husky.md"),
        {
            text: "Git Flow",
            items: [
                createLink("一个成功的 Git 分支模型", "/development/git/flow-branch-model.md"),
                createLink("Git-Flow 工作规范流程", "/development/git/flow-intro"),
            ],
        },
        createLink(".gitignore 文件说明", "/development/git/gitignore"),
        createLink("使用 subtree 管理多包", "/development/git/subtree-to-multi-packages.md"),
        createLink("FAQ", "/development/git/faq"),
    ],
    "/development/ide": [
        {
            text: "Jetbrains",
            items: [
                createLink("Jetbrains 系常用扩展", "/development/ide/jetbrains-plugins"),
                createLink("使用 Copyright", "/development/ide/jetbrains-copyright"),
                createLink("使用 Upsource", "/development/ide/jetbrains-upsource-to-cr"),
                createLink("在 IDE 中使用 SVN", "/development/ide/jetbrains-use-svn"),
                createLink("Jetbrains - FAQ", "/development/ide/jetbrains-faq"),
            ],
        },
        {
            text: "PhpStorm",
            items: [
                createLink("PhpStorm Tips", "/development/ide/phpstorm-tips"),
                createLink('PHPUnit 在 PhpStorm 中的使用', '/development/ide/phpstorm-run-phpunit.md'),
                createLink('PhpStorm 使用 Xdebug 调试', '/development/ide/phpstorm-use-xdebug.md'),
                createLink('PhpStorm 中运行 TestSuit', '/development/ide/phpstorm-run-testsuit.md'),
                createLink('使用 PhpStorm 开发 Laravel', '/development/ide/phpstorm-develop-laravel.md'),
            ],
        },
        {
            text: "WebStorm",
            items: [
                createLink("WebStorm Tips", "/development/ide/webstorm-faq"),
            ],
        },
        {
            text: "DataGrip",
            items: [
                createLink("DataGrip FAQ", "/development/ide/datagrip-faq"),
            ],
        },
        {
            text: "VsCode",
            items: [
                createLink('VsCode 常用插件', '/development/ide/vscode-plugins'),
            ],
        },
    ],
    "/department": [
        {
            text: "测试",
            items: [
                createLink("Seldom 自动化测试", "/department/test/auto-seldom"),
            ],
        },
    ],
    "/awesome/development-environment": [
        {
            text: "开发环境",
            items: [createLink("Git Add-ons", "/awesome/development-environment/git-addons")],
        },
    ],
    "/awesome/language": [
        {
            text: "编程语言",
            items: [
                createLink("Php", "/awesome/language/php"),
                createLink("&nbsp;&nbsp;└ Laravel", "/awesome/language/php-laravel")
            ],
        },
    ],
    "/mobile": [
        {
            text: "设计",
            items: [createLink("设计站点", "/mobile/design/site")],
        },
        {
            text: "Android",
            items: [
                createLink("MAC 下安装和配置 android-sdk", "/mobile/android/install-sdk-at-mac.md"),
                createLink("Android Gradle 自动化打包", "/mobile/android/auto-build-use-gradle.md"),
                createLink("面试题 v1", "/mobile/android/interview-question-v1.md"),
            ],
        },
        {
            text: "iOS",
            items: [
                createLink("iOS - 介绍", "/mobile/ios/"),
                createLink("iOS - FAQ", "/mobile/ios/faq"),
                createLink("Universal Links", "/mobile/ios/universal-links"),
                createLink("CocoaPods 介绍", "/mobile/ios/cocoapods"),
            ],
        },
        {
            text: "其他",
            items: [
                createLink("使用模拟器调试手机浏览器", "/mobile/tech/debug-with-chrome.md"),
                createLink("App 的崩溃率标准", "/mobile/tech/standard-for-best-app.md"),
                createLink("「Cocoa and Object-C Cookbook」", "/mobile/ios/book-cocoa-and-oc-cookbook/"),
                createLink("「Learning Cocoa with Objective-C」", "/mobile/ios/book-learning-cocoa-with-oc/"),
            ],
        },
    ],
    "/man/command": [
        {
            text: "命令",
            items: [
                createLink("ab", "/man/command/ab.1"),
                createLink("ac", "/man/command/ac.1"),
                createLink("autojump", "/man/command/autojump.1"),
                createLink("chmod", "/man/command/chmod.1"),
                createLink("chown", "/man/command/chown.1"),
                createLink("localectl", "/man/command/localectl.1"),
                createLink("ssh-keygen", "/man/command/ssh-keygen.1"),
                createLink("tee", "/man/command/tee.1"),
                createLink("truncate", "/man/command/truncate.1"),
            ],
        },
    ],
    "/man/conf": [
        {
            text: "配置(5)",
            items: [
                createLink("conf", "/man/conf/nscd.conf.5"),
            ],
        },
    ],
    "/man/other": [
        {
            text: "其他(5)",
            items: [
                createLink("conf", "/man/other/wrk.9"),
            ],
        },
    ],
    "/man/system": [
        {
            text: "系统(8)",
            items: [
                createLink("nscd", "/man/system/nscd.8"),
                createLink("useradd", "/man/system/useradd.8"),
            ],
        },
    ],
    "/ops": [
        {
            text: "运维",
            link: '/ops/'
        },
        {
            text: "CentOS",
            items: [
                createLink("升级和完善 CentOS 7", "/ops/centos/upgrade-at-7"),
                createLink("常用脚本", "/ops/centos/tools"),
                createLink("firewalld 常用命令", "/ops/centos/firewalld"),
                createLink("FAQ", "/ops/centos/faq"),
            ],
        },
        {
            text: "Rocky Linux",
            items: [
                createLink("RockyLinux 设置中文语言支持", "/ops/rockylinux/install-zh-cn-langpack.md"),
            ],
        },
        {
            text: "Ubuntu",
            items: [
                createLink("FAQ", "/ops/ubuntu/faq"),
            ],
        },
        {
            text: "Docker",
            items: [
                createLink("在 CentOS7 中使用 Docker", "/ops/docker/install-at-centos7.md"),
            ],
        },
        {
            text: "Docker 开发指南",
            items: [
                createLink("目录", "/ops/docker-guide/toc"),
            ],
        },
        {
            text: "ELK",
            items: [
                createLink("在 CentOS 7 上安装", "/ops/elk/install-at-centos7"),
                createLink("ES 插件 : IK 中文分词", "/ops/elk/es-ik"),
                createLink("ES 语法", "/ops/elk/es-query-schema"),
                createLink("在 Docker 上安装", "/ops/elk/install-use-docker"),
                createLink("使用 filebeat 搜集日志", "/ops/elk/use-filebeat-collect-nginx-log"),
            ],
        },
    ],
    "/ops/software": [
        {
            text: "Supervisor",
            items: [
                createLink("supervisor 介绍", "/ops/software/supervisor/introduction"),
                createLink("CentOS 安装/升级 supervisor", "/ops/software/supervisor/install-at-centos"),
                createLink("Mac 安装 supervisor", "/ops/software/supervisor/install-at-mac"),
            ],
        },
        {
            text: "Canal",
            items: [
                createLink("Canal 简介", "/ops/software/canal/"),
                createLink("Canal 快速入门", "/ops/software/canal/quickstart"),
                createLink("Deployer", "/ops/software/canal/deployer"),
                createLink("Canal For ElasticSearch 适配器", "/ops/software/canal/client-sync-es"),
                createLink("Client Adapter", "/ops/software/canal/client-adapter"),
            ],
        },
        {
            text: "Curl",
            items: [
                createLink("安装最新的 cURL ", "/ops/software/curl/install-latest-at-centos"),
                createLink("curl 请求另外一台机器", "/ops/software/curl/visit-another-host.md"),
            ],
        },
        {
            text: "软件",
            items: [
                createLink("在 CentOS 上安装 Svn", "/ops/software/svn/install-at-centos"),
                createLink("日志切割(logrotate)操作梳理", "/ops/software/logrotate/introduction.md"),
                createLink("设置 SSH 免密码访问服务器", "/ops/software/ssh/use-ssh-login-and-deploy.md"),
                createLink("使用 docker 安装 sentry", "/ops/software/sentry/install-use-docker-at-centos.md"),
                createLink("expect 介绍", "/ops/software/expect/introduction.md"),
            ],
        },
    ],
    "/database/mysql": [
        createLink('介绍', '/mysql/'),
        {
            text: "优化",
            items: [
                createLink("索引优化分析：性能分析", "/mysql/optimize/optimize-explain.md"),
            ],
        },
        {
            text: "MySQL CookBook",
            items: [
                createLink("使用 Mysql 客户端", "/database/mysql/mysql-cookbook/1-2-client"),
                createLink("从表中查询数据", "/database/mysql/mysql-cookbook/3-7-table-query"),
                createLink("表管理", "/database/mysql/mysql-cookbook/4-table-mgr"),
                createLink("与字符串共舞", "/database/mysql/mysql-cookbook/5-string"),
                createLink("使用日期和时间", "/database/mysql/mysql-cookbook/6-date-time"),
                createLink("聚合函数", "/database/mysql/mysql-cookbook/8-9-aggregate-function"),
                createLink("数据导入导出", "/database/mysql/mysql-cookbook/10-dump-import"),
            ],
        },
        createLink('FAQ', '/database/mysql/faq'),
    ],
    "/database/redis": [
        createLink('通用命令，数据结构和内部编码，单线程架构', '/database/redis/01-command-data.md'),
        createLink('字符串类型', '/database/redis/02-string.md'),
        createLink('Hash类型', '/database/redis/03-hash.md'),
        createLink('列表，集合与有序集合', '/database/redis/04-list-collection.md'),
        createLink('瑞士军刀之慢查询，Pipeline和发布订阅', '/database/redis/05-slow-pipeline-subscribe.md'),
        createLink('瑞士军刀之bitmap，HyperLoglog和GEO', '/database/redis/06-bitmap-hll-geo.md'),
        createLink('Redis持久化', '/database/redis/07-persist.md'),
        createLink('Redis主从复制', '/database/redis/08-redis-main-copy.md'),
        createLink('Redis Sentinel', '/database/redis/09-sentinel.md'),
        createLink('Redis原生命令搭建集群', '/database/redis/10-cluster-building.md'),
        createLink('使用redis-trib.rb工具搭建集群', '/database/redis/11-cluster-trib.md'),
        createLink('Redis Cluster', '/database/redis/12-cluster.md'),
        createLink('Redis缓存的使用和设计', '/database/redis/13-cache.md'),
    ],
    "/ops/nginx": [
        createLink("介绍", "/ops/nginx/"),
        createLink("在 RockyLinux9 上安装 Nginx", "/ops/nginx/install-at-rockylinux9.md"),
        createLink('add_header 指令技巧', '/ops/nginx/add-header.md'),
        createLink('阻止无意义的请求', '/ops/nginx/block-known-bad-requests.md'),
        createLink('配置缓存', '/ops/nginx/cache-control.md'),
        createLink('主域 - 添加或者移除 www', '/ops/nginx/canonicalize-host-name-add-remove-www.md'),
        createLink('Nginx 编译参数', '/ops/nginx/compile.md'),
        createLink('nginx 优化连接数', '/ops/nginx/connection-num.md'),
        createLink('配置 CORS 跨域', '/ops/nginx/cors.md'),
        createLink('Nginx 目录建议', '/ops/nginx/directory-suggest.md'),
        createLink('学习使用 echo 模块', '/ops/nginx/echo.md'),
        createLink('强制使用小写的 url 地址', '/ops/nginx/enforce-lower-case-urls.md'),
        createLink('使用 nginx-http-concat', '/ops/nginx/http-concat.md'),
        createLink('配置默认主页、目录浏览', '/ops/nginx/http-index.md'),
        createLink('状态码配置和错误文件', '/ops/nginx/http-status.md'),
        createLink('配置 HTTPS', '/ops/nginx/https.md'),
        createLink('Nginx 日志', '/ops/nginx/log.md'),
        createLink('stub_status : 提供访问基础信息', '/ops/nginx/module-stub-status.md'),
        createLink('OpenResty 介绍', '/ops/nginx/openresty.md'),
        createLink('配置泛域名转发', '/ops/nginx/pan-domain.md'),
        createLink('proxy_pass url 反向代理', '/ops/nginx/proxy_pass.md'),
        createLink('统计 Nginx 访问量', '/ops/nginx/pv.md'),
        createLink('屏蔽指定的 user_agent 的访问', '/ops/nginx/shield-agent.md'),
        createLink('配置图片防盗链', '/ops/nginx/verify-referer.md'),
        createLink('常见问题', '/ops/nginx/faq.md'),
    ],
    "/ops/bash": [
        {
            text: "教程",
            items: [
                createLink("介绍", "/ops/bash/"),
                createLink('1.简介', '/ops/bash/1-intro.md'),
                createLink('2.基本语法', '/ops/bash/2-basic.md'),
                createLink('5.变量', '/ops/bash/5-variables.md'),
                createLink('6.字符串', '/ops/bash/6-string.md'),
                createLink('7.运算符', '/ops/bash/7-arithmetic.md'),
                createLink('12.条件判断', '/ops/bash/12-condition.md'),
                createLink('13.循环语句', '/ops/bash/13-loop.md'),
                createLink('14.函数', '/ops/bash/14-function.md'),
                createLink('15.数组', '/ops/bash/15-array.md'),
            ],
        },
        createLink("FAQ", "/ops/bash/faq"),

    ],
    "/web": [
        { text: "Web开发", link: "/web/" },
        {
            text: "Http",
            items: [
                createLink("缓存策略说明", "/web/http/cache"),
                createLink("前端跨域整理", "/web/http/cors-intro"),
            ],
        },
        {
            text: "Html",
            items: [
                createLink("Favicon", "/web/html/favicon")
            ],
        },
        {
            text: "Api",
            items: [
                createLink("ClientHeight/OffsetHeight 解释", "/web/api/element-client-offset")
            ],
        },
        {
            text: "Css",
            items: [
                createLink("从浏览器的渲染原理讲CSS性能", "/web/css/css-performance-from-the-browsers-rendering"),
                createLink("FAQ", "/web/css/faq"),
            ],
        },
        {
            text: "技术",
            items: [
                createLink("使用 BrowserSync 来实现内容变动之后的实时刷新", "/web/tech/browser-sync"),
                createLink("请求加速最佳实践", "/web/tech/best-practice"),
                createLink("安装 Sentry 进行错误/性能跟踪", "/web/tech/use-sentry-collect-trace-and-exception")
            ],
        },
        { text: "FAQ", link: "/web/faq" },
    ],
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Wulicode",
    description: "语言语法学习站",
    head: [
        [
            'script',
            {
                "async": "true",
                'src': 'https://www.googletagmanager.com/gtag/js?id=G-6STKYFNBZK'
            }
        ],
        [
            'script',
            {},
            `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6STKYFNBZK');
          `
        ]
    ],
    themeConfig: {
        logo: 'https://file.wulicode.com/static/images/logo.png',
        siteTitle: false,
        outline: {
            level: 'deep',
            label: '大纲'
        },
        search: {
            provider: "local",
        },
        nav,
        sidebar,
        socialLinks: [{ icon: "github", link: "https://github.com/imvkmark/get-started" }],
        editLink: {
            pattern: "https://github.com/imvkmark/get-started/edit/master/docs/:path",
        },
        footer: {
            message: 'Released under the CC License.<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鲁ICP备13016276号-7</a>',
            copyright: 'Copyright © 2015-present 多厘'
        }
    },
});
