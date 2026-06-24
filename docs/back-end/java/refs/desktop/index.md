---
description: '以下是 java.desktop 模块中所有包的列表，以及每个包的简要解释：该表列出了 java.desktop 模块中的所有包，并对每个包的功能做了简要说明这些服务提供了 java.desktop 模块的扩展点，允许开发人员添加对新的图像格式、音频格式、MIDI 设备以及打印服务的支持。这种服务提供者接口（SPI）机制使 Java 应用程序可以灵活扩展和增强对多媒体、打印和其他桌面相关服务的支持。'
lastUpdated: '2025-12-06 15:02:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'java.desktop'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '以下是 java.desktop 模块中所有包的列表，以及每个包的简要解释：该表列出了 java.desktop 模块中的所有包，并对每个包的功能做了简要说明这些服务提供了 java.desktop 模块的扩展点，允许开发人员添加对新的图像格式、音频格式、MIDI 设备以及打印服务的支持。这种服务提供者接口（SPI）机制使 Java 应用程序可以灵活扩展和增强对多媒体、打印和其他桌面相关服务的支持。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/java/refs/desktop/index.html'
---
# java.desktop



> 定义了 AWT 和 Swing 用户界面工具包，此外还包括用于无障碍访问、音频、图像处理、打印和 JavaBeans 的 API。该模块中的文档包括指向外部概述、教程、示例、指南、媒体格式规范和其他类似文档的链接。这些链接仅为读者提供信息，不作其他用途。这些外部资源中的信息，无论其托管方或作者如何，均不属于 Java 平台 API 规范的一部分，除非明确声明为规范的一部分

## java.applet

> Applet 是一种运行在 Web 浏览器中的 Java 应用程序，最初设计用于在网页中嵌入动态内容

## java.awt

> 包含创建用户界面以及绘制图形和图像所需的所有类

<table><tbody>
  <tr>
    <td>Package Name</td>
    <td>Explanation</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt</code></strong> </td>
    <td>包含抽象窗口工具包 (AWT)，提供了基本的 GUI 组件、布局管理器和图形功能。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.color</code></strong> </td>
    <td>用于处理颜色空间和颜色转换的类。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.datatransfer</code></strong> </td>
    <td>支持数据传输功能的类，例如剪贴板和拖放功能。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.dnd</code></strong> </td>
    <td>提供拖放（Drag and Drop）功能的类和接口。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.event</code></strong> </td>
    <td>定义了处理 GUI 组件事件的接口和类（如鼠标、键盘、窗口事件等）。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.font</code></strong> </td>
    <td>提供与字体处理相关的类和接口，支持字体的渲染和布局。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.geom</code></strong> </td>
    <td>提供几何图形处理的类和接口，例如点、线、形状、矩阵等。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.im</code></strong> </td>
    <td>输入法框架，支持国际化文本输入。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.im.spi</code></strong> </td>
    <td>为输入法实现者提供的服务提供者接口（SPI）。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.image</code></strong> </td>
    <td>包含用于图像处理的类和接口，例如图像的创建、操作和转换。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.image.renderable</code></strong> </td>
    <td>定义了可渲染图像和图形对象的接口。</td>
  </tr>
  <tr>
    <td> <strong><code>java.awt.print</code></strong> </td>
    <td>提供打印功能的类和接口，支持打印页面的格式化和输出。</td>
  </tr>
</tbody></table>

[java.jwt - 抽象窗口工具包 / GUI](jwt.md)

## javax.swing

> 用于构建  **图形用户界面（GUI）**  应用程序。它提供了丰富的组件和工具，支持跨平台的用户界面开发，并且是 Java 的主要 GUI 库之一

<table><tbody>
  <tr>
    <td> <strong><code>javax.swing</code></strong> </td>
    <td>提供轻量级 GUI 组件的类，例如按钮、文本框、表格、树等，基于 AWT。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.border</code></strong> </td>
    <td>定义了 Swing 组件的边框类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.colorchooser</code></strong> </td>
    <td>提供颜色选择对话框的支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.event</code></strong> </td>
    <td>提供 Swing 组件的事件处理支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.filechooser</code></strong> </td>
    <td>提供文件选择对话框的支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.plaf</code></strong> </td>
    <td>提供用于创建可插拔外观和感觉（Look and Feel）的类和接口。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.plaf.basic</code></strong> </td>
    <td>Swing 组件的基本外观和感觉的实现类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.plaf.metal</code></strong> </td>
    <td>Swing 中&ldquo;Metal&rdquo;外观和感觉的实现类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.plaf.multi</code></strong> </td>
    <td>提供可以组合多个外观的外观和感觉实现类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.plaf.nimbus</code></strong> </td>
    <td>Swing 中 Nimbus 外观和感觉的实现类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.table</code></strong> </td>
    <td>提供表格组件（JTable）的类和接口，支持表格模型和渲染。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.text</code></strong> </td>
    <td>提供文本组件的类和接口，包括文本编辑、文档模型等。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.text.html</code></strong> </td>
    <td>提供处理 HTML 内容的支持，允许在 Swing 组件中渲染 HTML。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.text.html.parser</code></strong> </td>
    <td>提供 HTML 解析器，用于解析和处理 HTML 文档。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.text.rtf</code></strong> </td>
    <td>提供 RTF（Rich Text Format）文本支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.tree</code></strong> </td>
    <td>提供树形组件（JTree）的类和接口，支持树形模型和渲染。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.undo</code></strong> </td>
    <td>提供撤销和重做功能的支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.swing.event</code></strong> </td>
    <td>事件相关类，支持处理 Swing 组件的事件。</td>
  </tr>
</tbody></table>

[javax.swing - GUI 开发工具包](swing.md)

## Packages

以下是  `java.desktop`  模块中所有包的列表，以及每个包的简要解释：

<table><tbody>
  <tr>
    <td>Package Name</td>
    <td>Explanation</td>
  </tr>
  <tr>
    <td> <strong><code>javax.accessibility</code></strong> </td>
    <td>提供支持无障碍功能的类和接口，帮助开发残障人士友好的应用程序。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio</code></strong> </td>
    <td>提供用于读写图像（例如 PNG、JPEG、GIF）的 I/O 类和接口。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.event</code></strong> </td>
    <td>提供图像读写操作中事件处理的支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.metadata</code></strong> </td>
    <td>支持图像文件元数据的类和接口。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.plugins.bmp</code></strong> </td>
    <td>专门用于 BMP 格式图像的类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.plugins.jpeg</code></strong> </td>
    <td>专门用于 JPEG 格式图像的类。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.spi</code></strong> </td>
    <td>提供图像 I/O 的服务提供者接口，用于扩展图像处理功能。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.stream</code></strong> </td>
    <td>提供用于图像输入输出的低级别流接口。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.print</code></strong> </td>
    <td>提供用于打印的 API，包括打印服务和打印属性。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.print.attribute</code></strong> </td>
    <td>定义了打印属性和属性集的类和接口。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.print.attribute.standard</code></strong> </td>
    <td>定义了标准的打印属性，例如页面大小、打印方向等。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.print.event</code></strong> </td>
    <td>提供打印操作中的事件处理支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.midi</code></strong> </td>
    <td>提供 MIDI 音乐处理的 API，支持 MIDI 消息、设备和事件的处理。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.midi.spi</code></strong> </td>
    <td>MIDI 服务提供者接口，用于扩展 MIDI 功能。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.sampled</code></strong> </td>
    <td>提供数字音频处理的 API，支持音频采样、播放和录制。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.sampled.spi</code></strong> </td>
    <td>数字音频服务提供者接口，用于扩展音频处理功能。</td>
  </tr>
</tbody></table>

该表列出了  `java.desktop`  模块中的所有包，并对每个包的功能做了简要说明

## 服务

<table><tbody>
  <tr>
    <td> <strong>Service</strong> </td>
    <td> <strong>Explanation</strong> </td>
  </tr>
  <tr>
    <td> <strong><code>javax.print.PrintServiceLookup</code></strong> </td>
    <td>用于查找可用的打印服务。该服务提供访问系统可用的打印机资源。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.midi.MidiDeviceProvider</code></strong> </td>
    <td>用于 MIDI 设备的服务提供者接口（SPI）。允许查找和访问系统中的 MIDI 设备。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.midi.SoundbankReader</code></strong> </td>
    <td>用于 MIDI Soundbank 的服务提供者接口，能够从文件、URL 等读取 MIDI Soundbank（音色库）。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.midi.spi.MidiFileReader</code></strong> </td>
    <td>用于读取 MIDI 文件的服务提供者接口。允许系统中扩展支持 MIDI 文件格式。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.midi.spi.MidiFileWriter</code></strong> </td>
    <td>用于写入 MIDI 文件的服务提供者接口。允许扩展 MIDI 文件的写入支持。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.sampled.spi.AudioFileReader</code></strong> </td>
    <td>用于读取音频文件的服务提供者接口。可以扩展系统支持的音频文件类型（如 WAV、AIFF 等）。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.sampled.spi.AudioFileWriter</code></strong> </td>
    <td>用于写入音频文件的服务提供者接口。能够扩展音频文件的写入功能，支持多种音频格式。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.sampled.spi.FormatConversionProvider</code></strong> </td>
    <td>用于音频格式转换的服务提供者接口。允许将音频数据从一种格式转换为另一种格式（如 PCM 到 MP3）。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.sound.sampled.spi.MixerProvider</code></strong> </td>
    <td>用于混音器的服务提供者接口。允许系统查找、选择和使用不同的音频混音器。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.spi.ImageReaderSpi</code></strong> </td>
    <td>用于读取图像文件的服务提供者接口。可以扩展以支持额外的图像格式（如 PNG、JPEG）。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.spi.ImageWriterSpi</code></strong> </td>
    <td>用于写入图像文件的服务提供者接口。支持额外的图像格式写入功能扩展。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.spi.ImageTranscoderSpi</code></strong> </td>
    <td>用于图像转换的服务提供者接口。支持图像从一种格式转换为另一种格式的扩展功能。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.spi.ImageInputStreamSpi</code></strong> </td>
    <td>用于提供自定义图像输入流实现的服务提供者接口。</td>
  </tr>
  <tr>
    <td> <strong><code>javax.imageio.spi.ImageOutputStreamSpi</code></strong> </td>
    <td>用于提供自定义图像输出流实现的服务提供者接口。</td>
  </tr>
  <tr>
    <td> <strong><code>java.beans.beancontext.BeanContextServiceProvider</code></strong> </td>
    <td>为 BeanContext 提供服务的接口。BeanContext 是一种用于 JavaBeans 组件间通信和协作的容器。</td>
  </tr>
</tbody></table>

### 总结

这些服务提供了  `java.desktop`  模块的扩展点，允许开发人员添加对新的图像格式、音频格式、MIDI 设备以及打印服务的支持。这种服务提供者接口（SPI）机制使 Java 应用程序可以灵活扩展和增强对多媒体、打印和其他桌面相关服务的支持。



