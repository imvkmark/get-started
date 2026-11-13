import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import MarkdownIt from 'markdown-it';
import { parse as parseYaml } from 'yaml';

const markdown = new MarkdownIt({ html: true });
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function duration(value) {
    const match = /^(\d+(?:\.\d+)?)(ms|s|m|h|d)$/.exec(value);
    if (!match) throw new Error(`无效时间 ${value}，示例：24h、30m、2d`);
    const ms = Number(match[1]) * { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 }[match[2]];
    if (ms <= 0 || ms > 2147483647) throw new Error('时间必须大于 0 且不超过 24 天');
    return ms;
}

export function extractImages(source, file) {
    const lines = source.split('\n');
    const front = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
    const metadata = front ? (parseYaml(front[1]) || {}) : {};
    // Preserve line numbers while keeping YAML out of the Markdown parser.
    const body = front ? front[0].replace(/[^\n]/g, ' ') + source.slice(front[0].length) : source;
    const tokens = markdown.parse(body, {});
    const heading = tokens.findIndex(token => token.type === 'heading_open' && token.tag === 'h1');
    const title = String(metadata.title || (heading >= 0 && tokens[heading + 1]?.content) || path.basename(file, '.md'));
    const images = [];
    function add(url, line) {
        if (typeof url !== 'string' || !url.trim() || /^(data:|blob:|#)/i.test(url)) return;
        images.push({ title, file, line: line + 1, url: url.trim(), context: lines.slice(Math.max(0, line - 2), line + 3).join('\n') });
    }
    function html(content, start) {
        for (const match of content.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
            const line = start + content.slice(0, match.index).split('\n').length - 1;
            for (const attr of match[0].matchAll(/\s(src|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
                const value = markdown.utils.unescapeAll(attr[2] ?? attr[3] ?? attr[4]);
                if (attr[1].toLowerCase() === 'srcset') {
                    if (!value.startsWith('data:')) for (const candidate of value.split(',')) add(candidate.trim().split(/\s+/)[0], line);
                } else add(value, line);
            }
        }
    }
    let blockLine = 0;
    for (const token of tokens) {
        if (token.map) blockLine = token.map[0];
        if (token.type === 'html_block') html(token.content, blockLine);
        if (token.type !== 'inline') continue;
        let cursor = blockLine;
        for (const child of token.children || []) {
            if (child.type === 'softbreak' || child.type === 'hardbreak') cursor++;
            if (child.type === 'image') add(child.attrGet('src'), cursor);
            if (child.type === 'html_inline') html(child.content, cursor);
        }
    }
    function metaImages(value, key = '') {
        if (typeof value === 'string' && /^(image|src|cover|background)$/i.test(key)) {
            const line = lines.findIndex(line => line.includes(value));
            add(value, Math.max(0, line));
        } else if (Array.isArray(value)) {
            for (const item of value) metaImages(item, key);
        } else if (value && typeof value === 'object') {
            if (value.name === 'og:image' || value.property === 'og:image' || value.name === 'twitter:image') {
                const line = lines.findIndex(line => line.includes(String(value.content)));
                add(value.content, Math.max(0, line));
            }
            for (const [name, item] of Object.entries(value)) metaImages(item, name);
        }
    }
    metaImages(metadata);
    return images.filter((item, index) => images.findIndex(other => other.line === item.line && other.url === item.url) === index);
}

// Static theme image values; dynamic expressions require a running-browser check.
export function extractConfigImages(source, file) {
    const lines = source.split('\n');
    const images = [];
    for (const match of source.matchAll(/\b(logo|image|src)\s*:\s*(['"])([^'"\r\n]+)\2/g)) {
        if (match[1] === 'src' && !/\.(png|jpe?g|gif|svg|webp|avif|ico)(?:[?#]|$)/i.test(match[3])) continue;
        const line = source.slice(0, match.index).split('\n').length;
        images.push({ title: '站点主题配置', file, line, url: match[3], context: lines.slice(Math.max(0, line - 3), line + 2).join('\n') });
    }
    return images;
}

async function* documents(dir) {
    for (const entry of (await fs.readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'public') continue;
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* documents(file);
        else if (entry.isFile() && /\.md$/i.test(file)) yield file;
    }
}

export function targetFor(image, docs) {
    if (/^https?:\/\//i.test(image.url)) return new URL(image.url).href;
    if (image.url.startsWith('//')) return new URL(`https:${image.url}`).href;
    if (/^[a-z][a-z\d+.-]*:/i.test(image.url)) throw new Error('不支持的图片协议');
    const clean = decodeURIComponent(image.url.split(/[?#]/)[0]);
    return image.url.startsWith('/') ? path.resolve(docs, 'public', `.${clean}`) : path.resolve(path.dirname(image.file), clean);
}

export async function checkTarget(target, { timeout = 15000 } = {}) {
    try {
        if (!/^https?:\/\//i.test(target)) {
            const stat = await fs.stat(target);
            return stat.isFile() && stat.size > 0 ? { ok: true, status: 'local' } : { ok: false, error: '本地图片为空或不是文件' };
        }
        // Use GET because some image hosts reject HEAD. Cancel the body after headers.
        const response = await fetch(target, { redirect: 'follow', signal: AbortSignal.timeout(timeout), headers: { 'User-Agent': 'Wulicode-Image-Checker/1.0', Accept: 'image/*' } });
        const type = response.headers.get('content-type') || '';
        const result = { ok: response.ok, status: response.status, contentType: type, finalUrl: response.url };
        if (!response.ok) result.error = `HTTP ${response.status}`;
        else if (/text\/html|application\/json/i.test(type)) {
            result.ok = false;
            result.error = `返回 ${type}，不是图片`;
        } else if (response.headers.get('content-length') === '0') {
            result.ok = false;
            result.error = '图片响应为空';
        }
        await response.body?.cancel();
        return result;
    } catch (error) {
        return { ok: false, error: `${error.name}: ${error.message}` };
    }
}

async function readCache(file) {
    try {
        const value = JSON.parse(await fs.readFile(file, 'utf8'));
        return value.version === 1 && value.entries ? value.entries : {};
    } catch (error) {
        if (error.code !== 'ENOENT') console.warn(`缓存读取失败，将重新检查：${error.message}`);
        return {};
    }
}

export async function run(options) {
    const { docs, output, interval, concurrency, timeout, force } = options;
    await fs.mkdir(output, { recursive: true });
    const cacheFile = path.join(output, 'cache.json');
    const cache = await readCache(cacheFile);
    const groups = new Map();
    const failures = [];
    let articles = 0;
    function collect(images) {
        for (const image of images) {
            try {
                const target = targetFor(image, docs);
                if (!groups.has(target)) groups.set(target, []);
                groups.get(target).push(image);
            } catch (error) { failures.push({ ...image, error: error.message }); }
        }
    }
    for await (const file of documents(docs)) {
        articles++;
        collect(extractImages(await fs.readFile(file, 'utf8'), file));
    }
    for (const name of ['config.ts', 'config.mts', 'config.js', 'config.mjs']) {
        const file = path.join(docs, '.vitepress', name);
        try { collect(extractConfigImages(await fs.readFile(file, 'utf8'), file)); }
        catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    console.log(`扫描 ${articles} 篇文章，${groups.size} 个唯一图片地址。`);
    const jobs = [...groups.entries()];
    const nextCache = {};
    let index = 0, checked = 0, cached = 0;
    await Promise.all(Array.from({ length: concurrency }, async () => {
        while (index < jobs.length) {
            const [target, occurrences] = jobs[index++];
            const previous = cache[target];
            const now = Date.now();
            const remote = /^https?:\/\//i.test(target);
            if (!force && remote && previous?.ok && now >= previous.checkedAt && now - previous.checkedAt < interval) {
                nextCache[target] = previous;
                cached++;
                continue;
            }
            const result = await checkTarget(target, { timeout });
            checked++;
            if (result.ok && remote) nextCache[target] = { ...result, checkedAt: Date.now() };
            if (!result.ok) for (const image of occurrences) failures.push({ ...image, ...result, target });
            if (checked % 100 === 0) console.log(`已检查 ${checked}，缓存命中 ${cached}，失败引用 ${failures.length}`);
        }
    }));
    failures.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
    const report = { generatedAt: new Date().toISOString(), intervalMs: interval, articles, uniqueImages: groups.size, checked, cached, failures: failures.map(image => ({ ...image, file: path.relative(root, image.file) })) };
    const fence = text => { const marker = '`'.repeat(Math.max(3, ...[...text.matchAll(/`+/g)].map(match => match[0].length + 1))); return `${marker}\n${text}\n${marker}`; };
    const content = ['# 网站图片检查报告', '', `生成时间：${report.generatedAt}`, '', `文章：${articles}；唯一图片：${groups.size}；本次检查：${checked}；有效缓存：${cached}；失败引用：${failures.length}`, '', ...report.failures.flatMap(image => [
        `## ${image.title.replace(/[\r\n]/g, ' ')}`, '', `文章位置：${image.file}:${image.line}`, '', `图片地址：${image.url}`, '', `失败原因：${image.error}`, '', '图片上下文：', '', fence(image.context), '',
    ])];
    if (!failures.length) content.push('所有已发现的图片均可访问（含周期内缓存结果）。', '');
    await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    await fs.writeFile(path.join(output, 'report.md'), content.join('\n'));
    const temporary = `${cacheFile}.${process.pid}.tmp`;
    await fs.writeFile(temporary, JSON.stringify({ version: 1, entries: nextCache }, null, 2) + '\n');
    await fs.rename(temporary, cacheFile);
    console.log(`检查完成：${checked} 个检查，${cached} 个缓存，${failures.length} 处失败。报告：${path.join(output, 'report.md')}`);
    return report;
}

async function main() {
    const { values } = parseArgs({ options: {
        docs: { type: 'string', default: 'docs' }, output: { type: 'string', default: '.image-check' },
        interval: { type: 'string', default: '24h' }, timeout: { type: 'string', default: '15s' },
        concurrency: { type: 'string', default: '8' }, force: { type: 'boolean', default: false },
        watch: { type: 'boolean', default: false }, help: { type: 'boolean', default: false },
    } });
    if (values.help) {
        console.log('用法：pnpm images:check [--interval 24h] [--watch] [--force]\n  --docs docs            Markdown 根目录\n  --output .image-check  缓存和报告目录\n  --interval 24h         成功缓存有效期及持续巡检周期\n  --timeout 15s          单次网络请求超时\n  --concurrency 8        并发请求数\n  --force                忽略成功缓存\n  --watch                立即检查，然后按周期持续检查\n退出码：0 无失败；1 存在失败；2 执行错误。');
        return;
    }
    const options = { docs: path.resolve(root, values.docs), output: path.resolve(root, values.output), interval: duration(values.interval), timeout: duration(values.timeout), concurrency: Number(values.concurrency), force: values.force };
    if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 100) throw new Error('并发数必须为 1–100 的整数');
    do {
        const report = await run(options);
        if (!values.watch) { process.exitCode = report.failures.length ? 1 : 0; break; }
        console.log(`将在 ${values.interval} 后再次检查；按 Ctrl+C 停止。`);
        await new Promise(resolve => setTimeout(resolve, options.interval));
    } while (values.watch);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    main().catch(error => { console.error(error); process.exitCode = 2; });
}
