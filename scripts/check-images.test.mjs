import assert from 'node:assert/strict';
import { test } from 'node:test';
import http from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { extractImages, extractConfigImages, duration, targetFor, checkTarget, run } from './check-images.mjs';

test('extracts Markdown references, HTML and metadata, excluding code examples', () => {
    const source = `---
title: 测试文章
head:
  - - meta
    - property: og:image
      content: https://example.com/cover.png
---
# Heading
文字
![nested](https://example.com/a(b).png)
![ref][picture]
<img src="/a.png" srcset="/b.png 1x, /c.png 2x">
\`![inline](https://example.com/ignore.png)\`
\`\`\`md
![code](https://example.com/ignore2.png)
\`\`\`
[picture]: https://example.com/ref.png
`;
    const images = extractImages(source, '/docs/article.md');
    assert.equal(images.length, 6);
    assert.ok(images.every(image => image.title === '测试文章'));
    assert.equal(images.find(image => image.url.includes('a(b)')).line, 10);
    assert.match(images[0].context, /文字/);
    assert.ok(images.some(image => image.url.endsWith('/ref.png')));
    assert.ok(images.some(image => image.url.endsWith('/cover.png')));
});

test('resolves durations and local/public paths', () => {
    assert.equal(duration('24h'), 86400000);
    assert.equal(duration('30m'), 1800000);
    for (const value of ['0h', '-1h', 'abc', 'Infinityh']) assert.throws(() => duration(value));
    assert.equal(targetFor({ file: '/docs/a/post.md', url: '../foo%20bar.png?v=2#x' }, '/docs'), '/docs/foo bar.png');
    assert.equal(targetFor({ file: '/docs/a/post.md', url: '/logo.png' }, '/docs'), '/docs/public/logo.png');
});

test('HTTP checks, timeout, deduplication, success caching and failure retries', async t => {
    const requests = new Map();
    const server = http.createServer((req, res) => {
        requests.set(req.url, (requests.get(req.url) || 0) + 1);
        if (req.url === '/slow') return;
        if (req.url === '/redirect') { res.writeHead(302, { Location: '/ok' }); res.end(); return; }
        if (req.url === '/bad') { res.writeHead(404); res.end(); return; }
        if (req.url === '/html') { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end('<html>login</html>'); return; }
        res.writeHead(200, { 'Content-Type': 'image/png' }); res.end('image');
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    t.after(() => { server.closeAllConnections(); server.close(); });
    const base = `http://127.0.0.1:${server.address().port}`;
    assert.equal((await checkTarget(`${base}/redirect`)).ok, true);
    assert.equal((await checkTarget(`${base}/html`)).ok, false);
    assert.equal((await checkTarget(`${base}/slow`, { timeout: 30 })).ok, false);
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'image-check-'));
    t.after(() => fs.rm(dir, { recursive: true, force: true }));
    const docs = path.join(dir, 'docs');
    const output = path.join(dir, 'reports');
    await fs.mkdir(docs);
    await fs.writeFile(path.join(docs, 'one.md'), `# One\n![ok](${base}/ok)\n![bad](${base}/bad)`);
    await fs.writeFile(path.join(docs, 'two.md'), `# Two\n![ok](${base}/ok)\n![bad](${base}/bad)`);
    const options = { docs, output, interval: duration('24h'), timeout: 1000, concurrency: 2 };
    const first = await run(options);
    assert.equal(first.uniqueImages, 2);
    assert.equal(first.checked, 2);
    assert.equal(first.failures.length, 2);
    assert.deepEqual(first.failures.map(item => item.title), ['One', 'Two']);
    const count = requests.get('/ok');
    const second = await run(options);
    assert.equal(second.cached, 1);
    assert.equal(requests.get('/ok'), count);
    assert.equal(requests.get('/bad'), 2);
    assert.equal((await run({ ...options, force: true })).checked, 2);
    const entries = JSON.parse(await fs.readFile(path.join(output, 'cache.json'), 'utf8')).entries;
    entries[`${base}/ok`].checkedAt = Date.now() - duration('2d');
    await fs.writeFile(path.join(output, 'cache.json'), JSON.stringify({ version: 1, entries }));
    assert.equal((await run(options)).checked, 2);
    assert.match(await fs.readFile(path.join(output, 'report.md'), 'utf8'), /图片上下文/);
    assert.equal((await checkTarget(path.join(dir, 'missing.png'))).ok, false);
});


test('includes static theme images and excludes script sources', () => {
    const images = extractConfigImages(`logo: 'https://example.com/logo.png',\nsrc: 'https://example.com/script.js',\nsrc: '/icon.svg'`, '/docs/.vitepress/config.ts');
    assert.deepEqual(images.map(image => image.url), ['https://example.com/logo.png', '/icon.svg']);
    assert.equal(images[1].line, 3);
});
