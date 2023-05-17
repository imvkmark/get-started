# 压缩与归档扩展 - lzf

## 介绍

LZF是一个非常快的压缩算法, 目的是节省空间和和较少的速度花费, 这个能够在速度和空间上优化时间编译, 这需要liblzf库

## 安装

```
pecl install lzf
```

并且在PHP中启用

```
extension=lzf.so
```

## 配置

没有配置

## 函数

`string lzf_compress ( string $data )`

压缩数据到字串

`string lzf_decompress ( string $data )`

解压缩编码的字串到字串

`int lzf_optimized_for ( void )`

返回数据优化的目的

- 0 - 为了压缩
- 1 - 为了优化