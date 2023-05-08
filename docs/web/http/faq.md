# Http - FAQ

## Get 的最大的限制字符数

如果使用的是GET方法，则最多限制为2,048个字符，减去实际路径中的字符数。但是，POST方法不受用于提交名称/值对的URL大小的限制。这些 `KV对` 在报头中传输，而不是在URL中传输。

- [Maximum URL length is 2,083 characters in Internet Explorer](https://support.microsoft.com/en-us/topic/maximum-url-length-is-2-083-characters-in-internet-explorer-174e7c8a-6666-f4e0-6fd6-908b53c12246)