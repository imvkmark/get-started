---
description: 'FFmpeg是一款视频转换工具，支持多种格式。例如，使用命令`ffmpeg -i file.mov -r 15 file.gif`可将Mac录屏的mov文件转换为gif，其中-r指定帧率。'
lastUpdated: '2026-06-18 08:41:42'
head:
  - - meta
    - name: 'og:title'
      content: 'ffmpeg(1) - FFmpeg 视频转换器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'FFmpeg是一款视频转换工具，支持多种格式。例如，使用命令`ffmpeg -i file.mov -r 15 file.gif`可将Mac录屏的mov文件转换为gif，其中-r指定帧率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/man/command/ffmpeg-1.html'
---
# ffmpeg(1) - FFmpeg 视频转换器

[ffmpeg(1): FFmpeg video converter - Linux man page (die.net)](https://linux.die.net/man/1/ffmpeg)

```Plaintext
ffmpeg [[infile options][-i infile]]... {[outfile options] outfile}...
```

## 示例

转换 mac 录屏文件到 gif

```Bash
$ ffmpeg -i file.mov -r 15 file.gif
```