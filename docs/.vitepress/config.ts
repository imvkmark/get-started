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
            { text: "Php", link: "/php/" },
            { text: "Man", link: "/man/" },
            { text: "C++", link: "/cpp/cpp-qt5-cookbook/0-tree" },
        ],
    },
    {
        text: "开发",
        activeMatch: `^/web|development/`,
        items: [
            { text: "Web开发", link: "/web/" },
            { text: "工具资源", link: "/development/tools/sdkman" },
            { text: "手机端", link: "/mobile/design/site" },
            { text: "运维", link: "/ops/centos/upgrade-at-7" },
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
                    { text: 'Tools', link: 'https://tools.wulicode.com' },
                    { text: 'Blog(Temp)', link: 'http://blog.wulicode.com' },
                    { text: 'Vant Demo', link: 'https://vant-demo.wulicode.com' },
                    { text: 'Element Plus Demo', link: 'https://element-plus-demo.wulicode.com' },
                    { text: 'Html Get Started', link: 'https://html-get-started.wulicode.com' },
                ]
            },
            {
                text: 'Framework',
                items: [
                    { text: 'Poppy Framework', link: 'https://weiran.tech' }
                ]
            },
            {
                text: '项目',
                items: [
                    { text: 'UniStory·优映', link: 'https://unistory.cn/' },
                    { text: '产品大牛', link: 'https://pmdaniu.com' },
                    { text: 'Wulihub', link: 'https://wulihub.com.cn' },
                ]
            }
        ],
    },
    { text: "关于", link: "/about-me" },
];

const sidebar = {
    "/web": [
        { text: "Web开发", link: "/web/" },
        {
            text: "Http",
            items: [
                createLink("缓存策略说明", "/web/http/cache"),
                createLink("FAQ", "/web/http/faq"),
            ],
        },
        {
            text: "Html",
            items: [createLink("Favicon", "/web/html/favicon")],
        },
        {
            text: "Api",
            items: [createLink("ClientHeight/OffsetHeight 解释", "/web/api/element-client-offset")],
        },
        {
            text: "Css",
            items: [createLink("FAQ", "/web/css/faq")],
        },
        {
            text: "技术",
            items: [
                createLink("请求加速最佳实践", "/web/tech/best-practice"),
                createLink("安装 Sentry 进行错误/性能跟踪", "/web/tech/use-sentry-collect-trace-and-exception")
            ],
        },
    ],
    "/javascript": [
        {
            text: "入门",
            items: [createLink("说明", "/javascript/")],
        },
        {
            text: "文档",
            items: [createLink("使用 jsdoc 编写 api 文档", "/javascript/tech/use-jsdoc-write-document.md")],
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
                { text: 'Mac 安装 LNMP', link: '/php/install/mac-lnmp' },
                { text: 'CentOS 安装 LNMP+', link: '/php/install/centos7-lnmp-plus' },
                { text: 'RockyLinux 安装 RNMP+', link: '/php/install/rockylinux-rnmp' },
                { text: '使用 PECL 安装扩展', link: '/php/install/pecl-install-extension' },
            ]
        },
        {
            text: 'Laravel ',
            items: [
                { text: 'Eloquent 和 Migrate', link: '/php/laravel/eloquent-migrate.md' },
                { text: '升级记录 FAQ', link: '/php/laravel/upgrade-faq.md' },
            ]
        },
        {
            text: 'IDE',
            items: [
                { text: 'PHPUnit 在 PhpStorm 中的使用', link: '/php/ide/phpstorm-run-phpunit.md' },
                { text: 'PhpStorm 使用 Xdebug 调试', link: '/php/ide/phpstorm-use-xdebug.md' },
                { text: 'PhpStorm 中运行 TestSuit', link: '/php/ide/phpstorm-run-testsuit.md' },
            ]
        },
        {
            text: 'Packages',
            items: [
                { text: 'Carbon', link: '/php/packages/carbon-carbon' },
            ]
        },
        {
            text: '其他',
            items: [
                { text: '使用 Clockwork 调试 Php 应用', link: '/php/tech/using-clockwork-extension-for-debug.md' },
                { text: 'FAQ', link: '/php/tech/faq.md' },
            ]
        },
        {
            text: 'Hyperf',
            items: [
                { text: '入门', link: '/php/hyperf/' },
                { text: '注解', link: '/php/hyperf/core-annotation' },
                { text: 'Aop', link: '/php/hyperf/core-aop' },
                { text: 'FAQ', link: '/php/hyperf/faq' },
            ]
        },
    ],
    "/php/refs": [
        {
            text: '语言参考',
            items: [
                { text: '流程控制', link: '/php/refs/language/control-structures' },
            ]
        },
        {
            text: '影响 PHP 行为的扩展',
            items: [
                { text: '错误处理', link: '/php/refs/affect-php-behaviour/error-handling' },
                { text: '输出控制', link: '/php/refs/affect-php-behaviour/output-control' },
            ]
        },
        {
            text: '压缩与归档扩展',
            items: [
                { text: 'Bzip2', link: '/php/refs/compress-archive/bzip2' },
                { text: 'LZF', link: '/php/refs/compress-archive/lzf' },
                { text: 'Phar', link: '/php/refs/compress-archive/phar' },
                { text: 'Rar', link: '/php/refs/compress-archive/rar' },
                { text: 'Zip', link: '/php/refs/compress-archive/zip' },
                { text: 'Zlib', link: '/php/refs/compress-archive/zlib' },
            ]
        },
        {
            text: '加密扩展',
            items: [
                { text: 'Hash', link: '/php/refs/cryptography/hash' },
                { text: 'Mcrypt', link: '/php/refs/cryptography/mcrypt' },
                { text: 'MHash', link: '/php/refs/cryptography/mhash' },
                { text: 'OpenSSL', link: '/php/refs/cryptography/openssl' },
            ]
        },
        {
            text: '数据库扩展',
            items: [
                { text: 'DBA', link: '/php/refs/database/dba' },
                { text: 'PDO', link: '/php/refs/database/pdo' },
                { text: 'MySQLi', link: '/php/refs/database/db-mysqli' },
            ]
        },
        {
            text: '日期与时间相关扩展',
            items: [
                { text: 'Calendar', link: '/php/refs/date-time/calendar' },
                { text: 'DateTime', link: '/php/refs/date-time/datetime' },
            ]
        },
        {
            text: '文件系统相关扩展',
            items: [
                { text: 'Direct IO', link: '/php/refs/filesystem/direct-io' },
                { text: '目录', link: '/php/refs/filesystem/directories' },
                { text: 'Fileinfo', link: '/php/refs/filesystem/fileinfo' },
                { text: '文件系统', link: '/php/refs/filesystem/filesystem' },
            ]
        },
        {
            text: '图像生成和处理',
            items: [
                { text: 'Exif', link: '/php/refs/filesystem/direct-io' },
            ]
        },
        {
            text: '国际化',
            items: [
                { text: 'Enchant', link: '/php/refs/international/enchant' },
                { text: 'Gettext', link: '/php/refs/international/gettext' },
                { text: 'iconv', link: '/php/refs/international/iconv' },
                { text: 'intl', link: '/php/refs/international/intl' },
            ]
        },
        {
            text: '数学扩展',
            items: [
                { text: 'BC Math', link: '/php/refs/mathematical/bcmath' },
                { text: 'Math', link: '/php/refs/mathematical/math' },
            ]
        },
        {
            text: '其他基本扩展',
            items: [
                { text: 'Json', link: '/php/refs/other-basic/json' },
                { text: 'Misc 杂项', link: '/php/refs/other-basic/misc' },
                { text: 'SPL', link: '/php/refs/other-basic/spl' },
                { text: 'SPL-interfaces', link: '/php/refs/other-basic/spl-interfaces' },
                { text: 'SPL-迭代器', link: '/php/refs/other-basic/spl-iterators' },
                { text: 'SPL-其他类和接口', link: '/php/refs/other-basic/spl-misc-classes-interfaces' },
                { text: 'Urls', link: '/php/refs/other-basic/urls' },
                { text: 'Yaml', link: '/php/refs/other-basic/yaml' },
                { text: 'Pecl', link: '/php/refs/pecl/' },
            ]
        },
        {
            text: '其他服务',
            items: [
                { text: 'CURL', link: '/php/refs/other-services/curl' },
                { text: '网络', link: '/php/refs/other-services/network' },
            ]
        },
        {
            text: '预定义类和接口',
            items: [
                { text: 'WeakReference', link: '/php/refs/predefined-interfaces-classes/weakreference' },
            ]
        },
        {
            text: '进程控制',
            items: [
                { text: 'EIO', link: '/php/refs/process-control/eio' },
            ]
        },
        {
            text: '服务器指定扩展',
            items: [
                { text: 'Apache', link: '/php/refs/server-specific/apache' },
            ]
        },
        {
            text: '文本处理',
            items: [
                { text: 'BBCode', link: '/php/refs/text-processing/bbcode' },
                { text: 'PCRE', link: '/php/refs/text-processing/pcre' },
                { text: 'POSIX', link: '/php/refs/text-processing/posix' },
                { text: '字符串', link: '/php/refs/text-processing/string' },
            ]
        },
        {
            text: '变量和类型',
            items: [
                { text: '数组', link: '/php/refs/variables-types/array' },
                { text: 'CType', link: '/php/refs/variables-types/ctype' },
                { text: 'Filter', link: '/php/refs/variables-types/filter' },
                { text: '函数处理', link: '/php/refs/variables-types/function-handling' },
                { text: '变量处理', link: '/php/refs/variables-types/variable-handling' },
            ]
        },
        {
            text: 'XML',
            items: [
                { text: 'DOM', link: '/php/refs/xml/dom' },
            ]
        },
    ],
    "/python": [
        {
            text: "介绍",
            items: [
                createLink("说明", "/python/"),
                createLink("使用镜像, 加速安装", "/python/install/use-mirror-to-speed"),
            ],
        },
        {
            text: "入门",
            items: [
                createLink("问答环节", "/python/1_intro/1-qa"),
                createLink("如何运行", "/python/1_intro/2-run"),
            ],
        },
        {
            text: "类型和运算",
            items: [
                createLink("介绍 python 对象类型", "/python/2_types/4-types"),
                createLink("数值类型", "/python/2_types/5-number"),
            ],
        },
        {
            text: "Awesome",
            items: [createLink("Pydash 中文文档", "/python/a_vendor/pydash")],
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
                createLink("目录", "/cpp/cpp-qt5-cookbook/0-tree"),
                createLink("1. 外观和自定义", "/cpp/cpp-qt5-cookbook/1-appearance-custom"),
                createLink("2. 状态和特效", "/cpp/cpp-qt5-cookbook/2-property"),
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
            items: [createLink("MAC 下安装和配置 android-sdk", "/mobile/android/install-sdk-at-mac.md")],
        },
        {
            text: "iOS",
            items: [createLink("iOS - FAQ", "/mobile/ios/faq")],
        },
        {
            text: "其他",
            items: [createLink("使用模拟器调试手机浏览器", "/mobile/tech/debug-with-chrome.md")],
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
            text: "CentOS",
            items: [
                createLink("升级和完善 CentOS 7", "/ops/centos/upgrade-at-7"),
                createLink("常用脚本", "/ops/centos/tools"),
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
            ],
        },
        {
            text: "Nginx",
            items: [
                createLink("在 RockyLinux9 上安装 Nginx", "/ops/nginx/install-at-rockylinux9.md"),
            ],
        },
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
        socialLinks: [{ icon: "github", link: "https://github.com/imvkmark" }],
        editLink: {
            pattern: "https://github.com/imvkmark/get-started/edit/master/docs/:path",
        },
        footer: {
            message: 'Released under the CC License.<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鲁ICP备13016276号-7</a>',
            copyright: 'Copyright © 2015-present 多厘'
        }
    },
});
