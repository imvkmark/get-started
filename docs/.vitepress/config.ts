import { defineConfig } from 'vitepress'

const createLink = (title: string, url: string) => {
    return { text: title, link: url }
}

const nav = [
    { text: 'Vitepress', link: '/vitepress/markdown-examples' },
    { text: 'Dart', link: '/dart/' },
];

const sidebar = {
    '/vitepress': [
        {
            text: 'Examples',
            items: [
                createLink('Markdown', '/vitepress/markdown-examples'),
                createLink('Api', '/vitepress/api-examples'),
            ]
        }
    ],
    '/dart': [
        {
            text: '入门',
            items: [
                createLink('介绍', '/dart/1_intro/intro'),
                createLink('命令', '/dart/1_intro/dart-command'),
                createLink('pubspec', '/dart/1_intro/pubspec'),
                createLink('FAQ', '/dart/1_intro/faq'),
            ]
        },
        {
            text: '测试',
            items: [
                createLink('单元测试', '/dart/7_tests/'),
            ]
        }
    ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "语言学习",
    description: "语言语法学习站",
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        nav,

        sidebar,

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
