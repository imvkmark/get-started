---
description: '本模块定义AWT和Swing等用户界面工具包，以及无障碍、音频、图像处理、打印和JavaBeans API。包含Applet规范，并提供java.awt系列包（如color、datatransfer、dnd、event等）的说明。文档附带外部链接供参考，非API规范部分。'
lastUpdated: '2026-06-30 10:33:10'
head:
  - - meta
    - name: 'og:title'
      content: 'java.desktop - 桌面端'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本模块定义AWT和Swing等用户界面工具包，以及无障碍、音频、图像处理、打印和JavaBeans API。包含Applet规范，并提供java.awt系列包（如color、datatransfer、dnd、event等）的说明。文档附带外部链接供参考，非API规范部分。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/back-end/java/refs/desktop/index.html'
---
# java.desktop - 桌面端

> 定义了 AWT 和 Swing 用户界面工具包，此外还包括用于无障碍访问、音频、图像处理、打印和 JavaBeans 的 API。该模块中的文档包括指向外部概述、教程、示例、指南、媒体格式规范和其他类似文档的链接。这些链接仅为读者提供信息，不作其他用途。这些外部资源中的信息，无论其托管方或作者如何，均不属于 Java 平台 API 规范的一部分，除非明确声明为规范的一部分

## java.applet

> Applet 是一种运行在 Web 浏览器中的 Java 应用程序，最初设计用于在网页中嵌入动态内容

## java.awt

> 包含创建用户界面以及绘制图形和图像所需的所有类

| Package Name | Explanation |
|-|-|
| **`java.awt`** | 包含抽象窗口工具包 (AWT)，提供了基本的 GUI 组件、布局管理器和图形功能。 |
| **`java.awt.color`** | 用于处理颜色空间和颜色转换的类。 |
| **`java.awt.datatransfer`** | 支持数据传输功能的类，例如剪贴板和拖放功能。 |
| **`java.awt.dnd`** | 提供拖放（Drag and Drop）功能的类和接口。 |
| **`java.awt.event`** | 定义了处理 GUI 组件事件的接口和类（如鼠标、键盘、窗口事件等）。 |
| **`java.awt.font`** | 提供与字体处理相关的类和接口，支持字体的渲染和布局。 |
| **`java.awt.geom`** | 提供几何图形处理的类和接口，例如点、线、形状、矩阵等。 |
| **`java.awt.im`** | 输入法框架，支持国际化文本输入。 |
| **`java.awt.im.spi`** | 为输入法实现者提供的服务提供者接口（SPI）。 |
| **`java.awt.image`** | 包含用于图像处理的类和接口，例如图像的创建、操作和转换。 |
| **`java.awt.image.renderable`** | 定义了可渲染图像和图形对象的接口。 |
| **`java.awt.print`** | 提供打印功能的类和接口，支持打印页面的格式化和输出。 |

<cite doc-id="OW8Aw7q3mibZ9HkXwfvcQtx6nif" file-type="wiki" title="java.jwt - 抽象窗口工具包 - GUI" type="doc"></cite>

## javax.swing

> 用于构建 **图形用户界面（GUI）** 应用程序。它提供了丰富的组件和工具，支持跨平台的用户界面开发，并且是 Java 的主要 GUI 库之一

| **`javax.swing`** | 提供轻量级 GUI 组件的类，例如按钮、文本框、表格、树等，基于 AWT。 |
|-|-|
| **`javax.swing.border`** | 定义了 Swing 组件的边框类。 |
| **`javax.swing.colorchooser`** | 提供颜色选择对话框的支持。 |
| **`javax.swing.event`** | 提供 Swing 组件的事件处理支持。 |
| **`javax.swing.filechooser`** | 提供文件选择对话框的支持。 |
| **`javax.swing.plaf`** | 提供用于创建可插拔外观和感觉（Look and Feel）的类和接口。 |
| **`javax.swing.plaf.basic`** | Swing 组件的基本外观和感觉的实现类。 |
| **`javax.swing.plaf.metal`** | Swing 中“Metal”外观和感觉的实现类。 |
| **`javax.swing.plaf.multi`** | 提供可以组合多个外观的外观和感觉实现类。 |
| **`javax.swing.plaf.nimbus`** | Swing 中 Nimbus 外观和感觉的实现类。 |
| **`javax.swing.table`** | 提供表格组件（JTable）的类和接口，支持表格模型和渲染。 |
| **`javax.swing.text`** | 提供文本组件的类和接口，包括文本编辑、文档模型等。 |
| **`javax.swing.text.html`** | 提供处理 HTML 内容的支持，允许在 Swing 组件中渲染 HTML。 |
| **`javax.swing.text.html.parser`** | 提供 HTML 解析器，用于解析和处理 HTML 文档。 |
| **`javax.swing.text.rtf`** | 提供 RTF（Rich Text Format）文本支持。 |
| **`javax.swing.tree`** | 提供树形组件（JTree）的类和接口，支持树形模型和渲染。 |
| **`javax.swing.undo`** | 提供撤销和重做功能的支持。 |
| **`javax.swing.event`** | 事件相关类，支持处理 Swing 组件的事件。 |

<cite doc-id="Y40PwpvyrirzjbkGiGNcnofjntg" file-type="wiki" title="javax.swing - GUI 开发工具包" type="doc"></cite>

## Packages

以下是 `java.desktop` 模块中所有包的列表，以及每个包的简要解释：

| Package Name | Explanation |
|-|-|
| **`javax.accessibility`** | 提供支持无障碍功能的类和接口，帮助开发残障人士友好的应用程序。 |
| **`javax.imageio`** | 提供用于读写图像（例如 PNG、JPEG、GIF）的 I/O 类和接口。 |
| **`javax.imageio.event`** | 提供图像读写操作中事件处理的支持。 |
| **`javax.imageio.metadata`** | 支持图像文件元数据的类和接口。 |
| **`javax.imageio.plugins.bmp`** | 专门用于 BMP 格式图像的类。 |
| **`javax.imageio.plugins.jpeg`** | 专门用于 JPEG 格式图像的类。 |
| **`javax.imageio.spi`** | 提供图像 I/O 的服务提供者接口，用于扩展图像处理功能。 |
| **`javax.imageio.stream`** | 提供用于图像输入输出的低级别流接口。 |
| **`javax.print`** | 提供用于打印的 API，包括打印服务和打印属性。 |
| **`javax.print.attribute`** | 定义了打印属性和属性集的类和接口。 |
| **`javax.print.attribute.standard`** | 定义了标准的打印属性，例如页面大小、打印方向等。 |
| **`javax.print.event`** | 提供打印操作中的事件处理支持。 |
| **`javax.sound.midi`** | 提供 MIDI 音乐处理的 API，支持 MIDI 消息、设备和事件的处理。 |
| **`javax.sound.midi.spi`** | MIDI 服务提供者接口，用于扩展 MIDI 功能。 |
| **`javax.sound.sampled`** | 提供数字音频处理的 API，支持音频采样、播放和录制。 |
| **`javax.sound.sampled.spi`** | 数字音频服务提供者接口，用于扩展音频处理功能。 |

该表列出了 `java.desktop` 模块中的所有包，并对每个包的功能做了简要说明

## 服务

| **Service** | **Explanation** |
|-|-|
| **`javax.print.PrintServiceLookup`** | 用于查找可用的打印服务。该服务提供访问系统可用的打印机资源。 |
| **`javax.sound.midi.MidiDeviceProvider`** | 用于 MIDI 设备的服务提供者接口（SPI）。允许查找和访问系统中的 MIDI 设备。 |
| **`javax.sound.midi.SoundbankReader`** | 用于 MIDI Soundbank 的服务提供者接口，能够从文件、URL 等读取 MIDI Soundbank（音色库）。 |
| **`javax.sound.midi.spi.MidiFileReader`** | 用于读取 MIDI 文件的服务提供者接口。允许系统中扩展支持 MIDI 文件格式。 |
| **`javax.sound.midi.spi.MidiFileWriter`** | 用于写入 MIDI 文件的服务提供者接口。允许扩展 MIDI 文件的写入支持。 |
| **`javax.sound.sampled.spi.AudioFileReader`** | 用于读取音频文件的服务提供者接口。可以扩展系统支持的音频文件类型（如 WAV、AIFF 等）。 |
| **`javax.sound.sampled.spi.AudioFileWriter`** | 用于写入音频文件的服务提供者接口。能够扩展音频文件的写入功能，支持多种音频格式。 |
| **`javax.sound.sampled.spi.FormatConversionProvider`** | 用于音频格式转换的服务提供者接口。允许将音频数据从一种格式转换为另一种格式（如 PCM 到 MP3）。 |
| **`javax.sound.sampled.spi.MixerProvider`** | 用于混音器的服务提供者接口。允许系统查找、选择和使用不同的音频混音器。 |
| **`javax.imageio.spi.ImageReaderSpi`** | 用于读取图像文件的服务提供者接口。可以扩展以支持额外的图像格式（如 PNG、JPEG）。 |
| **`javax.imageio.spi.ImageWriterSpi`** | 用于写入图像文件的服务提供者接口。支持额外的图像格式写入功能扩展。 |
| **`javax.imageio.spi.ImageTranscoderSpi`** | 用于图像转换的服务提供者接口。支持图像从一种格式转换为另一种格式的扩展功能。 |
| **`javax.imageio.spi.ImageInputStreamSpi`** | 用于提供自定义图像输入流实现的服务提供者接口。 |
| **`javax.imageio.spi.ImageOutputStreamSpi`** | 用于提供自定义图像输出流实现的服务提供者接口。 |
| **`java.beans.beancontext.BeanContextServiceProvider`** | 为 BeanContext 提供服务的接口。BeanContext 是一种用于 JavaBeans 组件间通信和协作的容器。 |

### 总结

这些服务提供了 `java.desktop` 模块的扩展点，允许开发人员添加对新的图像格式、音频格式、MIDI 设备以及打印服务的支持。这种服务提供者接口（SPI）机制使 Java 应用程序可以灵活扩展和增强对多媒体、打印和其他桌面相关服务的支持。