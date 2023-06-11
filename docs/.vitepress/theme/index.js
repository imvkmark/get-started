import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import 'viewerjs/dist/viewer.min.css';
import './index.scss'
import imageViewer from 'vitepress-plugin-image-viewer';
import { useData, useRoute } from 'vitepress';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
    },
    setup() {
        // Get frontmatter and route
        const { frontmatter } = useData();
        const route = useRoute();

        // Obtain configuration from: https://giscus.app/
        giscusTalk({
            repo: 'imvkmark/get-started',
            repoId: 'R_kgDOJfaw1A',
            categoryId: 'DIC_kwDOJfaw1M4CW2uA',
            mapping: 'title', // default: `pathname`
            inputPosition: 'top', // default: `top`
        }, {
            frontmatter, route
        });

        imageViewer(route);
    }
};