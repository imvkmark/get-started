import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";


const nav = [
    {
        text: "AI",
        activeMatch: `^/ai/`,
        items: [
            { text: "入门", link: "/ai/primer/awesome" },
            { text: "OpenSpec", link: "/ai/openspec/1-core" },
            { text: "Claude Code", link: "/ai/claude-code/01-can" },
            { text: "Gstack 学习路线图", link: "/ai/extend-reading/gstack" },
        ],
    },
    {
        text: "后端",
        activeMatch: `^/back-end/`,
        items: [
            { text: "Java", link: "/back-end/java/" },
            { text: "Php", link: "/back-end/php/" },
            { text: "Python", link: "/back-end/python/" },
            { text: "Ruby", link: "/back-end/ruby/" },
        ],
    },
    {
        text: "数据库",
        activeMatch: `^/database/`,
        items: [
            { text: '入门', link: '/database/primer/' },
            { text: 'MySQL', link: '/database/mysql/' },
            { text: 'Redis', link: '/database/redis/' },
            { text: 'Mongo', link: '/database/mongo/' },
            {
                items: [
                    { text: '📚 Redis Document', link: '/database/redis/docs' },
                ]
            },
        ]
    },
    {
        text: "开发",
        activeMatch: `^/development/`,
        link: "/development/",
    },
    {
        text: "前端",
        activeMatch: `^/front-end/`,
        items: [
            { text: "RoadMap", link: "/front-end/roadmap/index" },
            { text: "App", link: "/front-end/app/" },
            { text: "Javascript", link: "/front-end/javascript/index" },
            { text: "Web", link: "/front-end/web/" },
        ],
    },
    {
        text: "Ops",
        activeMatch: `^/ops/`,
        items: [
            { text: "运维", link: "/ops/index" },
            { text: "Mac", link: "/ops/mac/index" },
            { text: "Linux", link: "/ops/linux/index" },
            { text: "Nginx", link: "/ops/nginx/index" },
            { text: "Man", link: "/ops/man/index" },
            { text: "Bash", link: "/ops/bash/index" },
        ],
    },
    {
        text: "更多",
        items: [
            {
                text: 'Wulicode',
                items: [
                    { text: 'Vant Demo', link: 'https://vant-demo.wulicode.com' },
                    { text: 'Element Plus Demo', link: 'https://element-plus-demo.wulicode.com' },
                    { text: 'Html Get Started', link: 'https://html-get-started.wulicode.com' },
                ]
            },
            {
                text: 'Framework',
                items: [
                    { text: 'Weiran/Poppy Framework', link: 'https://weiran.tech' }
                ]
            },
            {
                text: '项目',
                items: [
                    { text: 'UniStory·优映', link: 'https://unistory.cn/' },
                    { text: '产品大牛', link: 'https://pmdaniu.com' },
                    { text: 'Wulihub', link: 'https://wulihub.com.cn' },
                ]
            },
            { text: "关于", link: "/about/project" },
        ],
    },
];


const vitePressConfig = {
    title: "Wulicode",
    description: "Wulicode 知识学习站",
    head: [
        [
            'script',
            {
                async: "true",
                src: 'https://www.googletagmanager.com/gtag/js?id=G-6STKYFNBZK'
            }, ''
        ],
        [
            'script', {},
            `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6STKYFNBZK');
          `
        ]
    ],
    sitemap: {
        hostname: 'https://www.wulicode.com'
    },
    themeConfig: {
        logo: 'https://file.wulicode.com/static/images/logo.png',
        siteTitle: false,
        outline: {
            level: 'deep',
            label: '大纲'
        },
        lastUpdated: {},
        search: {
            provider: 'algolia',
            options: {
                appId: '742146PIMW',
                apiKey: '135afb8e4131b81b106ec88c99365f6e',
                indexName: 'wulicode',
                searchParameters: {
                    hitsPerPage: 20
                }
            }
        },
        nav,
        socialLinks: [{ icon: "github", link: "https://github.com/imvkmark/get-started" }],
        footer: {
            message: 'Released under the CC License.<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鲁ICP备13016276号-7</a>',
            copyright: 'Copyright © 2015-present 多厘'
        }
    },
};

const vitePressSidebarOptions = {
    documentRootPath: '/docs'
};

// https://vitepress.dev/reference/site-config
export default defineConfig(withSidebar(vitePressConfig, [
    {
        documentRootPath: 'docs/',
        collapsed: false,
        includeRootIndexFile: true,
        scanStartPath: 'ai',
        basePath: '/ai/',
        resolvePath: '/ai/',
        useTitleFromFileHeading: true,
        sortFolderTo: 'bottom',
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'about',
        basePath: '/about/',
        resolvePath: '/about/',
        useTitleFromFileHeading: true
    },

    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'back-end/java/',
        basePath: '/back-end/java/',
        resolvePath: '/back-end/java/',
        useTitleFromFileHeading: true,
        sortFolderTo: 'bottom',
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'back-end/php/',
        basePath: '/back-end/php/',
        resolvePath: '/back-end/php/',
        useTitleFromFileHeading: true,
        sortFolderTo: 'bottom',
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'back-end/python/',
        basePath: '/back-end/python/',
        resolvePath: '/back-end/python/',
        useTitleFromFileHeading: true,
        sortFolderTo: 'bottom',
    },
    /*
    |--------------------------------------------------------------------------
    | 数据库
    |--------------------------------------------------------------------------
    */
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'database/mysql',
        basePath: '/database/mysql/',
        resolvePath: '/database/mysql/',
        useTitleFromFileHeading: true
    },

    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'database/redis/docs',
        basePath: '/database/redis/docs',
        resolvePath: '/database/redis/docs',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'database/redis',
        basePath: '/database/redis/',
        resolvePath: '/database/redis/',
        useTitleFromFileHeading: true,
        sortFolderTo: 'bottom',
        excludeByGlobPattern: [
            'docs/'
        ]
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        includeRootIndexFile: true,
        scanStartPath: 'database/mongo',
        basePath: '/database/mongo/',
        resolvePath: '/database/mongo/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'database/',
        basePath: '/database/',
        resolvePath: '/database/',
        useTitleFromFileHeading: true,
        includeRootIndexFile: true,
        includeFolderIndexFile: true,
        excludeByGlobPattern: [
            'redis', 'mongo', 'mysql'
        ]
    },
    /*
    |--------------------------------------------------------------------------
    | 开发
    |--------------------------------------------------------------------------
    */
    {
        documentRootPath: 'docs/',
        collapsed: false,
        includeRootIndexFile: true,
        includeFolderIndexFile: true,
        scanStartPath: 'development',
        basePath: '/development/',
        resolvePath: '/development/',
        sortFolderTo: 'bottom',
        useTitleFromFileHeading: true
    },
    /*
    |--------------------------------------------------------------------------
    | 前端
    |--------------------------------------------------------------------------
    */
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'front-end/app',
        basePath: '/front-end/app/',
        resolvePath: '/front-end/app/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'front-end/javascript',
        basePath: '/front-end/javascript/',
        resolvePath: '/front-end/javascript/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'front-end/web',
        basePath: '/front-end/web/',
        resolvePath: '/front-end/web/',
        includeRootIndexFile: true,
        includeFolderIndexFile: true,
        sortFolderTo: 'bottom',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'front-end/roadmap',
        basePath: '/front-end/roadmap/',
        resolvePath: '/front-end/roadmap/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'front-end',
        basePath: '/front-end/',
        resolvePath: '/front-end/',
        useTitleFromFileHeading: true,
        excludeByGlobPattern: [
            'javascript/', 'roadmap/'
        ],
    },
    /*
    |--------------------------------------------------------------------------
    | 运维
    |--------------------------------------------------------------------------
    */
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'ops/mac',
        basePath: '/ops/mac/',
        resolvePath: '/ops/mac/',
        useTitleFromFileHeading: true,
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'ops/linux',
        basePath: '/ops/linux/',
        resolvePath: '/ops/linux/',
        useTitleFromFileHeading: true,
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'ops/nginx',
        basePath: '/ops/nginx/',
        resolvePath: '/ops/nginx/',
        useTitleFromFileHeading: true,
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'ops/man/',
        basePath: '/ops/man/',
        resolvePath: '/ops/man/',
        useTitleFromFileHeading: true,
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'ops/bash/',
        basePath: '/ops/bash/',
        resolvePath: '/ops/bash/',
        useTitleFromFileHeading: true,
    },
    {
        documentRootPath: 'docs/',
        collapsed: false,
        scanStartPath: 'ops',
        basePath: '/ops/',
        resolvePath: '/ops/',
        useTitleFromFileHeading: true,
        excludeByGlobPattern: [
            'mac/', 'linux/', 'nginx/', 'bash/', 'man/'
        ],
    },
]));
