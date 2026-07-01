---
description: '使用GET方法时，URL长度最多为2048个字符（需扣除路径字符），而POST方法不受此限制，因为键值对通过报头传输。例如，Internet Explorer的URL最大长度为2083个字符。'
lastUpdated: '2026-07-01 10:04:33'
head:
  - - meta
    - name: 'og:title'
      content: 'Internet - FAQ '
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用GET方法时，URL长度最多为2048个字符（需扣除路径字符），而POST方法不受此限制，因为键值对通过报头传输。例如，Internet Explorer的URL最大长度为2083个字符。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/http/extend-reading/faq.html'
---
# Internet - FAQ

## Http

### Get 的最大的限制字符数

如果使用的是GET方法，则最多限制为2,048个字符，减去实际路径中的字符数。但是，POST方法不受用于提交名称/值对的URL大小的限制。这些 `KV对` 在报头中传输，而不是在URL中传输。

- [Maximum URL length is 2,083 characters in Internet Explorer](https://support.microsoft.com/en-us/topic/maximum-url-length-is-2-083-characters-in-internet-explorer-174e7c8a-6666-f4e0-6fd6-908b53c12246)