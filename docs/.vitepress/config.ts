import { defineConfig } from "vitepress";

const createLink = (title: string, url: string) => {
    return { text: title, link: url };
};

const nav = [
    {
        text: "语言",
        activeMatch: `^/(dart)|(python)|(javascript)/`,
        items: [
            { text: "Dart", link: "/dart/" },
            { text: "Python", link: "/python/" },
            { text: "Javascript", link: "/javascript/" },
            { text: "Java", link: "/java/" },
        ],
    },
    {
        text: "Php",
        activeMatch: `^/php/(swoole|hyperf)/`,
        items: [
            { text: "Swoole", link: "/php/swoole/" },
            { text: "Hyperf", link: "/php/hyperf/" },
        ],
    },
    { text: "Web开发", link: "/web/" },
    { text: "Vitepress", link: "/vitepress/markdown-examples" },
];

const sidebar = {
    "/vitepress": [
        {
            text: "Examples",
            items: [
                createLink("Markdown", "/vitepress/markdown-examples"),
                createLink("Api", "/vitepress/api-examples"),
            ],
        },
    ],
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
                createLink("1. Java 概述", "/java/core-basic/1-lang.md"),
                createLink("2. Java 运行环境", "/java/core-basic/2-design-env.md"),
                createLink("3. Java 基本结构", "/java/core-basic/3-basic-struct.md"),
                createLink("4. 对象和类", "/java/core-basic/4-class-object.md"),
                createLink("5. 继承", "/java/core-basic/5-extend.md"),
                createLink("6. 接口, lambda, 内部类", "/java/core-basic/6-interface-lambda-inner.md"),
                createLink("7. 异常断言和日志", "/java/core-basic/7-exception-assert-log.md"),
            ],
        },
        {
            text: "FAQ",
            items: [createLink("FAQ", "/java/faq.md")],
        },
    ],
    "/php": [
        {
            text: 'Hyperf',
            items: [
                { text: '入门', link: '/php/hyperf/' },
                { text: '注解', link: '/php/hyperf/core-annotation' },
                { text: 'Aop', link: '/php/hyperf/core-aop' },
                { text: 'FAQ', link: '/php/hyperf/faq' },
            ]
        },
        {
            text: 'Swoole',
            items: [
                { text: '入门', link: '/php/swoole/' },
            ]
        }
    ],

    "/python": [
        {
            text: "介绍",
            items: [createLink("说明", "/python/")],
        },
        {
            text: "入门",
            items: [
                createLink("问答环节", "/python/1_intro/1-qa.md"),
                createLink("如何运行", "/python/1_intro/2-run.md"),
            ],
        },
        {
            text: "类型和运算",
            items: [
                createLink("介绍 python 对象类型", "/python/2_types/4-types.md"),
                createLink("数值类型", "/python/2_types/5-number.md"),
            ],
        },
        {
            text: "Awesome",
            items: [createLink("Pydash 中文文档", "/python/a_vendor/pydash.md")],
        },
    ],
    "/dart": [
        {
            text: "介绍",
            items: [
                createLink("说明", "/dart/"),
                createLink("入门", "/dart/1_intro/"),
                createLink("介绍", "/dart/1_intro/intro"),
                createLink("命令", "/dart/1_intro/dart-command"),
                createLink("pubspec", "/dart/1_intro/pubspec"),
                createLink("FAQ", "/dart/1_intro/faq"),
            ],
        },
        {
            text: "测试",
            items: [createLink("单元测试", "/dart/7_tests/")],
        },
    ],
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "语言学习",
    description: "语言语法学习站",
    themeConfig: {
        search: {
            provider: "local",
        },
        // https://vitepress.dev/reference/default-theme-config
        nav,

        sidebar,

        socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
    },
});
