import { defineConfig } from "vitepress";

const createLink = (title: string, url: string) => {
    return { text: title, link: url };
};

const nav = [
    {
        text: "语言",
        activeMatch: `^/dart|python|javascript|php|java|flutter/`,
        items: [
            { text: "Dart", link: "/dart/guides/1-lang" },
            { text: "Python", link: "/python/" },
            { text: "Javascript", link: "/javascript/" },
            { text: "Java", link: "/java/" },
            { text: "Flutter", link: "/flutter/" },
            { text: "Php", link: "/php/" },
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
];

const sidebar = {
    "/web": [
        { text: "Web开发", link: "/web/" },
        {
            text: "Http",
            items: [createLink("FAQ", "/web/http/faq.md")],
        },
    ],
    "/javascript": [
        {
            text: "入门",
            items: [createLink("说明", "/javascript/")],
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
                { text: '使用 PECL 安装扩展', link: '/php/install/pecl-install-extension' },
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
            text: "正则表达式",
            items: [
                createLink("正则手册", "/development/regex/"),
                createLink("正则匹配中文", "/development/regex/zh-match"),
            ],
        },
    ],
    "awesome/development-environment": [
        {
            text: "开发环境",
            items: [createLink("Git Add-ons", "/development-environment/git-addons")],
        },
    ],
    "mobile": [
        {
            text: "设计",
            items: [createLink("设计站点", "/mobile/design/site")],
        },
    ],
    "ops": [
        {
            text: "CentOS",
            items: [
                createLink("升级和完善 CentOS 7", "/ops/centos/upgrade-at-7"),
                createLink("常用脚本", "/ops/centos/tools"),
            ],
        },
        {
            text: "Curl",
            items: [
                createLink("安装最新的 cURL ", "/ops/curl/install-latest-at-centos"),
            ],
        },
        {
            text: "Supervisor",
            items: [
                createLink("安装/升级 supervisor", "/ops/supervisor/install-supervisor-at-centos"),
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
    },
});
