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
            { text: "资源", link: "/development/tools/sdkman" },
            { text: "手机端", link: "/mobile/design/site" },
            { text: "MySQL", link: "/mysql/" },
            {
                text: 'Ops',
                items: [
                    createLink('运维', '/ops/'),
                    createLink('Nginx', '/ops/nginx'),
                ]
            },
            { text: "部门", link: "/department/test/auto-seldom" },
        ],
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
            items: [createLink("说明", "/java/")],
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
                createLink('CentOS 安装 LNMP+', '/php/install/centos7-lnmp-plus'),
                createLink('RockyLinux 安装 RNMP+', '/php/install/rockylinux-rnmp'),
                createLink('使用 PECL 安装扩展', '/php/install/pecl-install-extension'),
            ]
        },
        {
            text: 'Laravel ',
            items: [
                createLink('Eloquent 和 Migrate', '/php/laravel/eloquent-migrate.md'),
                createLink('FAQ', '/php/laravel/faq.md'),
            ]
        },
        {
            text: 'IDE',
            items: [
                createLink('PHPUnit 在 PhpStorm 中的使用', '/php/ide/phpstorm-run-phpunit.md'),
                createLink('PhpStorm 使用 Xdebug 调试', '/php/ide/phpstorm-use-xdebug.md'),
                createLink('PhpStorm 中运行 TestSuit', '/php/ide/phpstorm-run-testsuit.md'),
                createLink('使用 PhpStorm 开发 Laravel', '/php/ide/phpstorm-develop-laravel.md'),
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
            text: "IDE",
            items: [
                createLink("Jetbrains 系常用扩展", "/development/ide/jetbrains-plugins"),
                createLink("PhpStorm Tips", "/development/ide/phpstorm-tips"),
                createLink("WebStorm Tips", "/development/ide/webstorm-tips"),
            ],
        },

        {
            text: "运营相关",
            items: [
                createLink("robots 文档", "/development/op/robots"),
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
            text: "软件",
            items: [
                createLink("安装最新的 cURL ", "/ops/curl/install-latest-at-centos"),
                createLink("curl 请求另外一台机器", "/ops/curl/visit-another-host.md"),
                createLink("supervisor 介绍", "/ops/supervisor/introduction"),
                createLink("CentOS 安装/升级 supervisor", "/ops/supervisor/install-at-centos"),
                createLink("Mac 安装 supervisor", "/ops/supervisor/install-at-mac"),
                createLink("在 CentOS 上安装 Svn", "/ops/svn/install-at-centos"),
                createLink("日志切割(logrotate)操作梳理", "/ops/logrotate/introduction.md"),
                createLink("设置 SSH 安全通过密钥,免密码登录服务器或拉取代码", "/ops/ssh/use-ssh-login-and-deploy.md"),
                createLink("CentOS 使用 docker 安装 sentry", "/ops/sentry/install-use-docker-at-centos.md"),
            ],
        },
    ],
    "/mysql": [
        {
            text: "介绍",
            link: '/mysql/'
        },
        {
            text: "优化",
            items: [
                createLink("索引优化分析：性能分析", "/mysql/optimize/optimize-explain.md"),
            ],
        },
        {
            text: "MySQL CookBook",
            items: [
                createLink("使用 Mysql 客户端", "/mysql/mysql-cookbook/1-2-client"),
                createLink("从表中查询数据", "/mysql/mysql-cookbook/3-7-table-query"),
                createLink("表管理", "/mysql/mysql-cookbook/4-table-mgr"),
                createLink("与字符串共舞", "/mysql/mysql-cookbook/5-string"),
                createLink("使用日期和时间", "/mysql/mysql-cookbook/6-date-time"),
                createLink("聚合函数", "/mysql/mysql-cookbook/8-9-aggregate-function"),
                createLink("数据导入导出", "/mysql/mysql-cookbook/10-dump-import"),
            ],
        },
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
