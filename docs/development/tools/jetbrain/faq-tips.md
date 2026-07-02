---
description: 'JetBrains IDE 提供了丰富的快捷键与工具，涵盖文本处理（区块选择、大小写切换、拼写修复）、代码导航（跳转至声明、方法、错误位置）、代码编写（变量提取、语法转换、生成文档）以及缓存加速、主题设置等，显著提升开发效率。'
lastUpdated: '2026-07-02 19:23:12'
head:
  - - meta
    - name: 'og:title'
      content: 'Jetbrains 系 IDE 常用技巧'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'JetBrains IDE 提供了丰富的快捷键与工具，涵盖文本处理（区块选择、大小写切换、拼写修复）、代码导航（跳转至声明、方法、错误位置）、代码编写（变量提取、语法转换、生成文档）以及缓存加速、主题设置等，显著提升开发效率。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/development/tools/jetbrain/faq-tips.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/d4deea4ee460ae72eee560c64a5e981c.gif'
---
# Jetbrains 系 IDE 常用技巧

## 文本处理

### 选择多个单词或一段文本

- [Multiple cursors and selection ranges | PhpStorm](https://www.jetbrains.com/help/phpstorm/multicursor.html#multiple_words)

![](https://file.wulicode.com/feishu-images/d4deea4ee460ae72eee560c64a5e981c.gif)

按下 `Alt+J`, 将光标所在位置的单词选择下一个并且添加到当前的选择项中, 重复以上步骤添加更多单词.

按下 `Shift+Alt+J` 移除最后一个添加的单词.

**Mac 快捷键**

按下 `Ctrl+G`, 添加新位置

按下 `Shift+Ctrl+G`移除最后的添加项

### 鼠标区块选择

- [Multiple cursors and selection ranges | PhpStorm](https://www.jetbrains.com/help/phpstorm/multicursor.html#use-mouse-to-select-rectangular-fragments-of-text-in-normal-selection-mode)

按下 `Alt` , 有些情况下需要按住 `Alt + Shift` , 并且拖动鼠标来选择多行区域. 你还可以通过拖动来创建一个包含跨多行选择的文本的选择框

![](https://file.wulicode.com/feishu-images/feb25ff4cee54bd649c0b562ff465099.png)

### 添加, 删除 & 复制行

![](https://file.wulicode.com/feishu-images/13102246061e8f264ca0313907ab80b5.gif)

### 切换大小写

![](https://file.wulicode.com/feishu-images/3a350858f16ecdbf6bf447291548d265.gif)

选中文本并, 使用 `Ctrl+Shift+U`来切换选中文本的大小写.

你可以使用 `Edit | Toggle Case` 操作

[Mac]使用 `Cmd+Shift+U` 来切换选中文本的大小写.

### 拼写修复

![](https://file.wulicode.com/feishu-images/5f87bae4b6f6c7391e7ee280a1e0def7.gif)

要解决你的代码的错误拼写，随时随地把光标放在拼写错误的单词，并按下 Alt+Enter 键来调用

**intention actions** 的对话框，然后选择 *Typo: Rename to…*

PhpStorm 将通过包含文本字段的弹出窗口提示您为该单词提供正确的拼写，或者提供自动填充列表，其中包含可供选择的拼写建议供您选择。如果您不喜欢自动填充列表中的任何内容，则可以开始键入以提供您自己的单词拼写。

在修复拼写错误时最好利用 PhpStorm，因为它会在整个代码库中重命名符号（变量，方法，类等）的每一次使用，从而完成所有繁重的工作。

## IDE

### 滚动到项目面板的文件位置

![](https://file.wulicode.com/feishu-images/4c485d28e222dd8e081e7712774aa1be.gif)

要在项目面板中找到当前文件，请按 *Scroll from source* 按钮在项目树中找到该文件并将其滚动到可见位置。

- [Project Tool Window](https://www.jetbrains.com/help/phpstorm/2016.3/project-tool-window.html#d846472e675)

### 自动滚动到项目文件位置

![](https://file.wulicode.com/feishu-images/2150fc5f28d37efe23fa942626b1bd1c.gif)

此提示按钮在提示＃3 的头部位置。

要自动显示项目面板中的任何文件，请 在面板设置中启用 **Autoscroll from Source** 选项。切换到文件和在项目树中显示活动文件。

**Autoscroll to Source**

选项将自动打开在项目面板中选择的任何文件，这样只需单击即可打开文件。

- [Project Tool Window](https://www.jetbrains.com/help/phpstorm/2016.3/project-tool-window.html#title_bar_context_menu)

### 从历史记录粘贴

![](https://file.wulicode.com/feishu-images/3b132cc09535d748ccdf84282df0251f.gif)

### 代码模板

![](https://file.wulicode.com/feishu-images/109985909b23162ffe9a63a5eb0471f0.gif)

代码模板（在其他编辑器中也称为片段）允许您轻松地将常用的代码构造插入到代码中。

只需键入缩写，然后按 Tab 键将其展开为完整的代码构造。模板可以包含一个或多个变量或占位符以插入代码，按 Tab 键将光标移动到下一个变量/占位符。

按 Cmd/Ctrl+J 查看 *Insert Live Template(代码模板)* 弹出对话框，其中列出了当前文件语言的所有可用代码模板。也可以通过 **Code | Insert Live Template…** 菜单项操作

### 自定义代码模板

![](https://file.wulicode.com/feishu-images/6aa66a87aa1b7b6ace68f9de6d71f428.gif)

PhpStorm 允许您创建自己的代码模板（代码片段）以优化您的工作流程。

打开设置对话框并进入 **Editor | Live Templates**，你可以看到按语言分组的可用代码模板。要添加新模板，请单击 +（加号）按钮，然后选择 *Live Template* 。指定缩写（你输入的文本的缩写，将扩展为完整的代码段）和描述。

然后在 *Template text* 字段中提供完整的代码段  。您可以在模板中以 `$<variable name>` 格式和 `$END` 变量作为特殊变量，指示在扩展模板之后光标的最终位置以及为所有变量提供的值。

接下来，单击 *Define* 以指定模板所用的语言以及可用的上下文。

现在可以使用模板了。打开文件并键入先前指定的缩写，然后单击 Tab 以展开模板。光标将定位在第一个变量上，提供一个值然后点击 Tab 以继续浏览所有可用变量。光标的最终位置将是 `$END` 变 量的位置

**示例模板**

以下是可以添加到自己的工作流程的一些示例模板：

**test: Test 方法**

```Plaintext
/*
 * @test 
 */
public function it_$NAME$()
{
$END$
}
```

**dd: Dump & Die**

```Plaintext
die(var_dump($END$));
```

**bsinput: Bootstrap 表单输入**

```Plaintext
<div class="form-group">
    <label for="$ID$">$LABEL$</label>
    <input class="form-control" id="$ID$">
</div>
```

**log: Console 日志**

```Plaintext
console.log($END$);
```

### 操作导航

![](https://file.wulicode.com/feishu-images/6a97b1a434fe4bb25455e762346414f3.gif)

PhpStorm 允许您直接导航到所需的操作，而无需浏览菜单和工具栏，只使用键盘。它将操作定义为：

主菜单和各种上下文菜单的命令，通过主工具栏和工具窗口的工具栏按钮执行的命令。

按 Cmd+Shift+A（Ctrl+Shift+A on Windows/Linux）以显示 *Actions* 弹出窗口，该弹出窗口允许你按名称搜索操作。

### Ctrl + Tab 切换文档

按下 `Ctrl + Tab` , 切换当前已经打开的文档

![](https://file.wulicode.com/feishu-images/91e6c491bc70b6d77d743953d1c3b2e4.gif)

### 缓存加速

> 隐藏不想被搜到的缓存文件

由于项目采用的CI框架,目录结构分离得也比较清晰,加之项目前后台也规划分离得挺合理,所以在开发过程中完全可以在在IDE下排除之 `PhpStorm - File - Make Dicrectory As - Excluded` 

这样可以在一定程度上减少干扰提高开发效率。如果想将 Excluded 的目录再 Include 到项目中可以在 (`File | Settings | Directories`  )选择对应目录取消掉 Excluded 即可

### Solarized 主题

我经常使用的一款主题 - [Solarized](https://ethanschoonover.com/solarized/)

![](https://file.wulicode.com/feishu-images/a8bf3a78427e10781018641da7e73d50.png)

### 高亮使用

![](https://file.wulicode.com/feishu-images/a0a4e12795f872a413a8017a06c69b4a.gif)

将光标放在符号上，按 Cmd+Shift+F7 (Ctrl+Shift+F7 on Windows/Linux) 以突出显示当前文件中符号的用法。符号的读取和写入用法将使用活动颜色方案提供的不同颜色显示。

要将光标跳转到符号的 下一个/上一个 匹配项，Mac 使用 Cmd+G/Cmd+Shift+G, 在 Windows/Linux 上按 F3/Shift+F3。

按 Esc 键停止突出显示用法。

### 作为 Table 编辑

![](https://file.wulicode.com/feishu-images/4a89a0c109235e73245895f30702104e.gif)

PhpStorm 可以在表格中编辑 CSV（或其他分隔符分隔文件）。

只需打开 CSV 文件并从上下文菜单中选择 **Edit as Table…** 即可打开表格弹出窗口。根据输入数据配置表弹出窗口，然后单击 **OK** 以表格形式查看数据。

这使数据更易于阅读，可以轻松插入列，并允许您使用特定列对数据进行排序;

### 选择范围扩大/缩小

![](https://file.wulicode.com/feishu-images/4ac158afbaa4998c51576b631a0082a5.gif)

按 Alt+Up (Ctrl+W on Windows/Linux) 将选择从光标位置扩展到包含代码的上下文。

从上面的示例中，所做的选择如下：

1. Variable name (excluding ‘\$’)
2. Variable element (including ‘\$’)
3. Expression
4. Line
5. Foreach body
6. Foreach block
7. If body
8. If block
9. Method body
10. Method block
11. Class body
12. Class block
13. File contents

按 Alt+Down(Ctrl+Shift+W) 缩小选择。

- [Selecting Text in the Editor](https://www.jetbrains.com/help/phpstorm/2017.1/selecting-text-in-the-editor.html#d156046e139)

### 格式化代码

![](https://file.wulicode.com/feishu-images/d93008e3fe667217c3eb4e90ec31e1fe.gif)

PhpStorm 可以帮助确保你的代码符合你遵循的任何编码标准。按 Cmd+Alt+L (Ctrl+Alt+L on Windows/Linux) 重新格式化当前选择的源代码或整个文件（如果未选择任何内容）。

请务必在首选项中配置首选代码样式，上面的示例设置为使用 PSR2 标准。你可以轻松的配置 PhpStorm 使用 PSR1/2 标准, 在首选项中打开 **Editor | Code Style | PHP** 并点击 **Set from… | Predefined Style | PSR1/PSR2**.

在上面的示例中看到更改的内容并不容易，因此我将其包含在此处。起始代码没有遵循 PSR2 标准，看起来像这样：

```PHP
class Example {
    public function __construct() {
        $array = array(1,2,3);
        if (count($array) > 3)
        {
            foreach ($array as $item)
                echo $item;
        }
    }
}
```

然后重新格式化以符合 PSR2 标准，看起来像这样：

```PHP
class Example
{
    public function __construct()
    {
        $array = [1,2,3];
        if (count($array) > 3) {
            foreach ($array as $item) {
                echo $item;
            }
        }
    }
}
```

### 跳转到错误位置

![](https://file.wulicode.com/feishu-images/d222ce4f319609c7fb4cd36449b97baa.gif)

按 F2 键将光标跳转到文件中的下一个错误。按 Shift+F2 跳转到上一个错误。

### 正则测试

![](https://file.wulicode.com/feishu-images/3ee7aed3410897761fecb6129e3a5809.gif)

使用 PHPStorm，你可以测试正则表达式而无需离开 IDE。

首先，将光标放在包含正则表达式的字符串上，然后按 Alt+Enter 调用 *intention actions* 并选择**Inject language or reference** ，然后 从列表中选择 **RegExp (Regular Expression)** 。这允许 PHPStorm 将字符串标识为正则表达式。

然后，使用 Alt+Enter 再次调用 *intention actions* ，您应该看到不同的选项列表， 从列表中选择

**Check RegExp** ，然后会出现一个弹出窗口。

在此弹出窗口中，您可以编辑正则表达式并提供示例字符串以与其进行比较。

- [Regular Expression Syntax Reference](https://www.jetbrains.com/help/phpstorm/2017.1/regular-expression-syntax-reference.html#d395449e834)

### 使用结构化语法包裹

![](https://file.wulicode.com/feishu-images/6b7b1cca1e56645a34ec5c0326768991.gif)

PhpStorm 可以帮助完成使用语法结构（如 if 语句和  foreach 循环）包裹代码的常见操作  。

按 Cmd/Ctrl+Alt+T 调用 *Surround With* 弹出窗口，或导航到 **Code | Surround With…**，然后从列表中选择所需的语言结构。

当前行将在所选构造中被包围，在调用 Surround With 弹出窗口之前围绕多行进行选择。

### 拆开或者移除语法块

![](https://file.wulicode.com/feishu-images/ff62e4bd4f10b45bcb91158c7e56ebae.gif)

和 [使用结构化语法包裹]相反  ，PhpStorm 可以帮助删除围绕一段代码的语言结构。

将光标放在要分解或删除的构造中的表达式上，然后按 Cmd/Ctrl+Shift+Delete 或导航到 **Code | Unwrap/Remove…** 将出现一个弹出窗口，其中列出了基于当前上下文的所有可用操作。

将鼠标悬停在其中一个列表项上将允许您预览将应用的更改，指示将删除代码的哪些部分以及将保留哪些部分。选择列表项以将重构应用于您的代码。

Unwrap/Remove 重构器也可用于 HTML 标签！

### 在官网查看文档

![](https://file.wulicode.com/feishu-images/0437fd7f5fc28eb81b92a87ec8d38da9.gif)

要查看内置官网的在线文档，请将光标放在符号上，然后按 `Shift+F1` 。这将在官网打开相关函数或者类的文档

或者单独按 F1（Windows 上的 Ctrl+Q）以查看 PhpStorm 内部的文档

### 在注释中的代码自动补全

![](https://file.wulicode.com/feishu-images/174813fd38d57b23c68221ad22e56126.gif)

除了能够在编写代码时提供代码完成建议，PhpStorm 还可以在注释内提供建议。按 Ctrl+Space 可调用代码完成操作。

由于评论没有任何上下文，因此与评论之外的建议相比，完成建议将受到限制; 建议列表主要使用当前文件中的关键字填充。

### 把一个字串拆分为 2 行

![](https://file.wulicode.com/feishu-images/33db82b28ed43fa79c94419b65ca3515.gif)

要将字符串拆分为多行，请将光标放在字符串内的任意位置，然后按 `Ctrl/Command+Enter`。

PhpStorm 会将字符串拆分为两个单独的字符串，并添加代码以将它们连接在一起。

### 复制配置项路径

右键设置菜单, 可以复制设置路径, 写文档巨好用

![](https://file.wulicode.com/feishu-images/3e7682136c2df7707760ef8ba83dda16.png)

## 代码 / 类 / 方法 / 参数

### 导航到类

![](https://file.wulicode.com/feishu-images/9c43355d45ce2354c5b7d55821a766d4.gif)

按 Cmd+O 调用 “Open Class” 对话框并开始输入以查找项目中的任何类。

这是一种非常快速和精确的导航方法，不应该被忽视。

**模糊搜索**

如果搜索项返回的结果太多，您可以使用 *模糊搜索*   添加到搜索项中并缩小结果范围。PhpStorm 将识别搜索词中的任何大写字母，并尝试将这些字母与使用 CamelCasing 命名的类相关联。如上面的录屏所示， `HomepageController` 可以通过搜索 `Homepage` 或模糊搜索 “HomeCont” 来打开。如果仍然返回太多结果，则命名空间可以包含在搜索项中。示例中的完全限定类名称  `App\Http\Controllers\HomepageController`，因此可以尝试搜索 `Contr\Home`，它将匹配类名的 `Controllers\HomepageController` 部分，甚至可以搜索 ‘A’ 来进行更有创意的搜索

**Windows/Linux 快捷键**

按 Ctrl+N 调用 `Open Class` 对话框。

### 搜索类方法

![](https://file.wulicode.com/feishu-images/330853858ce5bd5954391d14c9775ca1.gif)

要快速跳转到打开文件中的方法或属性，请按 `Ctrl+F12`

打开 *File Structure* 窗口，然后可以 *模糊搜索* 想要的方法。

文件结构窗口也可以通过在菜单中切换到 **Navigate | File Structure** 来打开。

这比使用 `Ctrl + F` 搜索更准确，因为搜索是一个简单的文本搜索，它将找到成员用法和成员声明，几乎总是导致你在到达定义之前按几次 Enter 键。文件结构视图总是直接将您带到方法定义的位置.

**Mac 快捷键**

按下 `Cmd + F12` 来打开文件结构窗口

### 跳转到 上一个/下一个 方法

![](https://file.wulicode.com/feishu-images/5c32148011a60e2c63995f5191507050.gif)

按下 `Alt+Up/Alt+Down` 来跳转到当前类中的上一个/下一个方法

这些操作可以在 **Navigate | Next Method / Previous Method** 找到

**PS:**

你可以通过相同的快捷键跳转到 上一个/下一个 Html 标签

**Mac 快捷键**

按下 `Ctrl+Up/Ctrl+Down` 来跳转到上一个/下一个方法

### 查看文档

![](https://file.wulicode.com/feishu-images/d7cb3ca014431f9e47eef2aae51c9a05.gif)

当鼠标在方法上, 按下 `Ctrl+Q` 弹出 *快速文档窗口*, 并且显示该方法对应的文档, 按 `Esc` 关闭弹出窗口.

对于内置的 PHP 方法, 按下 `Shift+F1`在浏览器中在 [php.net](http://www.php.net/) 打开该方法的函数介绍

这些操作在如下菜单中

- **View | Quick Documentation Lookup**
- **View | External documentation**

**Mac 快捷键**

按 `F1` 以显示快速文档弹出窗口。

按 `Shift+F1` 打开外部文档

### 显示参数信息

![](https://file.wulicode.com/feishu-images/35aa9e338f429f47e5e9ec8105db4717.gif)

很难记住一个函数的参数顺序, 例如 haystack / needle 的先后顺序.

将鼠标定位在函数调用的圆括号内，并按 `Ctrl+P` 显示函数的参数。

这在知道调用函数而不知道参数是什么的时候很有用，或者在查看代码时想要确定哪个参数是什么值。

参数信息操作在 :

- **View | Parameter Info**

**Mac 快捷键**

按下 `Cmd+P` 来显示函数参数

### 跳转到匹配的括号

![](https://file.wulicode.com/feishu-images/6e50a12bc5fdabf3016df4853ce8b11b.gif)

来跳转到匹配的括号

将鼠标放到代码块内的任何位置，并按 `Ctrl+Shift+M` 将光标跳转到匹配的大括号中。

括号包括 `{}`,`[]`, `()` 和 HTML 标签。

**Mac 快捷键**

按 `Ctrl+M` 来跳转到匹配的括号

`Shift+Enter` 在当前行后添加新行.

`Ctrl+Alt+Enter` 在当前行前添加新行.

`Ctrl+D` 复制当前行.

当鼠标没有选择内容的时候按下 `Ctrl+C/X` 来复制/剪切 当前行到粘贴板.

按下 `Ctrl+Y` 来删除当前行.

**Mac 快捷键**

`Shift+Enter` 在当前行后添加新行.

`Cmd+Alt+Enter` 在当前行前添加新行.

`Cmd+D` 复制当前行.

当鼠标没有选择内容的时候按下 `Cmd+C/X` 来复制/剪切 当前行到粘贴板.

按下 `Cmd+Backspace` 来删除当前行.

### 跳转到声明/定义位置

![](https://file.wulicode.com/feishu-images/755d7840ace3f5be68d343bf73d4b79e.gif)

要导航到标识（变量，方法，类等）的定义位置，请按住 Ctrl 键，同时将鼠标指针悬停在符号上以将其转换为超链接，然后单击标识跳转到定义的位置。

您也可以在光标位于标识上时按 **`Ctrl+B`**，或在菜单中点击 **Navigate | Declaration**

**Mac 快捷键**

按住 Cmd 键并单击以导航到定义位置。按 Cmd+B 导航到定义位置。

PhpStorm 在剪贴板中保存一个最近条目的列表。按 `Cmd+Shift+V` 查看剪贴板条目列表。

剪贴板历史也可以从菜单中打开: **`Edit | Paste from history`**

添加一些内容到粘贴板会添加到列表的顶部. 从粘贴板中粘贴以往的历史记录也会把这条记录在历史记录中置顶.

可以通过选择条目并按 `Delete` 键从历史记录列表中删除条目。

**Windows/Linux**

使用 `Ctrl+Shift+V` 查看剪贴板历史条目.

- [Cutting, Copying and Pasting](https://www.jetbrains.com/help/phpstorm/2016.3/cutting-copying-and-pasting.html#d972203e480)

### 打开类的指定行

![](https://file.wulicode.com/feishu-images/f7d6f5ddab1c682abfa0cf074da7efce.gif)

这个技巧建立在上一个技巧之上

使用 `Open Class`（或`Open File`）打开对话框时，可以使用 `:123` 为搜索查询添加后缀，以跳转到所选文件中指定的行号。

当在 PhpUnit，CI 服务器 或错误监视服务中引发错误并且您希望从堆栈跟踪导航到文件和行号时，这非常有用。

- [Navigating to Class, File or Symbol by Name](https://www.jetbrains.com/help/phpstorm/2016.3/navigating-to-class-file-or-symbol-by-name.html#tips)

### 找到类/方法的使用位置

![](https://file.wulicode.com/feishu-images/13c8702372318c84d34f6398284452aa.gif)

PhpStorm 可以在整个项目中找到标识符的所有使用位置; 这包括引用和实例化类的所有地方，调用方法的任何地方，字段写入和读取的所有位置等。

要查找标识符的所有用法，请按住 Cmd 键（Ctrl for Windows / Linux），然后将鼠标悬停在符号声明上以将其转换为超链接，然后单击标识符以打开 *Usages popup* ，其中将列出标识符的用法。

红色图标强调了正在写一个值到标识符的用法

绿色图标显示从标识符读取数据的用法

或者，将光标放在符号声明上，然后按  Alt+F7  查找用法并在 *Find* 面板中打开它们。或者导航到**Edit | Find | Find Usages** 来查找使用位置。

这与导航到声明相同; 所以你可以用 Cmd/Ctrl 点击一个符号用法来导航到标识符声明，然后用 Cmd/Ctrl 点击标识符声明来导航到它的任何一个用法。

### 查看文件的位置

![](https://file.wulicode.com/feishu-images/c5d66dee45ff8bcf1743950c04468265.gif)

要在工具面板（项目面板，结构面板等）中选择当前正在编辑的元素（方法，属性，文件等），请按 Alt+F1 以调用 *Select In* 弹出窗口，然后选择要打开元素的面板在。

或者在菜单中打开 **Navigate | Select In…**

### 折叠区块

打开 IDE, 选择需要分组的代码, 按下 `Cmd + Opt + T`, 选择 `region ... end region comments`然后代码则被

```Plaintext
//endregion
.. your code here
//endregion
```

这部分代码在导航中可以被导航到

![](https://file.wulicode.com/feishu-images/b3a3a4c64e0bf1ad2d44a1d058170a1d.png)

## 代码编写

### 变量提取

![](https://file.wulicode.com/feishu-images/aed83a8d9522e318365cfd5d6f7ddb31.gif)

PhpStorm 的 *extract to variable* 功能是一个非常有用的工具，可以提供任何重构任务帮助。它允许您抽象变量后面的表达式，并且足够聪明以识别代码中表达式的其他用法，以便能够用变量替换每个其他用法。

按 Ctrl+T (Windows/Linux: Ctrl+Shift+Alt+T) 调用 *Refactor This* 弹出窗口，或选择 **Refactor | Refactor This**，然后 从列表中选择 **4. Variable…** 或者，按 Cmd+Alt+V/Ctrl+Alt+V 直接调用光标下符号的提取到变量操作。

### 替换单引号/双引号

![](https://file.wulicode.com/feishu-images/b26f44d199890230c012e1b74fb0ecf6.gif)

要在单引号和双引号之间切换字符串，请将光标放在字符串内的任意位置，然后按 Alt+Enter 以调用

**intention actions**

菜单，然后从菜单中选择 `Replace quotes`。

PhpStorm 还将识别字符串中是否有引号并使用黑色标记对其进行转义以防止格式错误的代码。

### 转换比较的位置

![](https://file.wulicode.com/feishu-images/3305773e2e105554d35512f8548988cb.gif)

要将比较运算符两侧的值相互交换，请将光标放在运算符上，然后按 Alt+Enter 调用

**intention actions** 菜单，然后选择 *Flip ‘X’*。

某些运算符更改参数的顺序可以更改条件的语义，因此在这种情况下，PhpStorm 将在菜单中显示

*(change semantics)*

警告。当您看到此警告时，请确保您的条件仍然有意义

### If / Switch 语法切换

![](https://file.wulicode.com/feishu-images/ff7db03bc980ce0cca54b0e79d09d289.gif)

PhpStorm 使您能够将 `if` 块转换为 `switch` 语句，反之亦然。

只需将光标放在 `if` 块上，然后按 `Alt+Enter` 调用 *建议动作* 菜单，然后从列表中选择 **Replace ‘if’ with ‘switch’** 。您甚至可以将操作应用于 `switch` 语句以将其转换为 `if` 块。

请注意，只有当 `if` 块中的每个语句都使用 **equality(相等)** 条件时，才会使用 *建议动作*

- [Working With Switch and If Statements in PhpStorm 2016.1](https://blog.jetbrains.com/phpstorm/2016/05/working-with-switch-and-if-statements-in-phpstorm-2016-1/)

### 合并行

![](https://file.wulicode.com/feishu-images/114d09c06bd60ffa46d603aa3945b60b.gif)

按 Ctrl+Shift+J 将光标下方的行连接到当前行的末尾。

PhpStorm 还将格式化代码以遵循配置的编码标准

### 行内变量

![](https://file.wulicode.com/feishu-images/845bfa30f13c117135b8ada724052d57.gif)

与提取变量相反，*inline variable* 重构允许您将变量的用法替换为变量的基础值/表达式。

按 Ctrl+T (Windows/Linux: Ctrl+Shift+Alt+T) 调用 *Refactor This* 弹出窗口，或在菜单中选择**Refactor | Refactor This** ，然后 从列表中选择 **0. Inline…** 或者，按  Cmd+Alt+N/Ctrl+Alt+N 直接调用光标下符号的内联变量操作

## PHP

### 生成 PHPDoc 文档

![](https://file.wulicode.com/feishu-images/466725e11c2976ed969b93f93a7f2166.gif)

要让 PhpStorm 生成 docblock，请将光标放在方法上，然后按 Alt+Enter 调用 **intention actions** 菜单，然后选择 *Generate PHPDoc for function*.

PhpStorm 将为 `@param` 每个参数添加标签，并从提供的类型提示中包含其数据类型。

`@return` 如果指定了返回类型，它也会添加一个标记，或者它检测到该函数返回的非空值。

如果 PhpStorm 无法准确检测标签的数据类型，它将使用数据类型 `mixed` 或完全省略数据类型。在这些情况下，请记住自己提供数据类型，如果不准确，请更正。

如果函数参数发生更改，PhpStorm 还可以为您更新 docblock，只需再次调用 intent actions 菜单并选择 *Update PHPDoc Comment*

### 转换数组语法

![](https://file.wulicode.com/feishu-images/9718056e7493ad846dc02d70b6f8f447.gif)

要将传统数组 `array()` 语法转换为简写 `[]` 语法，请将光标放在数组上，然后按 Alt+Enter 调用

**intention actions**

对话框，然后选择 *Convert array to short syntax* 选项

如果数组具有嵌套数组，PhpStorm 将递归更新所有子数组

### 初始化字段

![](https://file.wulicode.com/feishu-images/ee7073511558c9bf5a5f771b420e8d6f.gif)

通常，传递给构造函数的参数存储在属性中，以供类的其余部分使用。PhpStorm 可以使用构造函数的方法参数创建这些属性，只需几个键击操作即可。

将光标放在构造函数的参数列表中的任意位置，然后按 Alt+Enter 以调用 **intention actions** 菜单，然后选择 *Initialize fields*。系统将提示您要选择初始化的字段,   您可以选择一个或多个字段，或按 `Ctrl/Cmd+A` 选择列表中的每个字段。

PhpStorm 将为每个选定的字段创建一个新的私有属性，并在它的相应参数后命名，并使用值初始化它。它还将设置 docblock 并尝试标识识别的字段的数据类型。

## HTML

### Emmet

![](https://file.wulicode.com/feishu-images/64b7a72f1659b42e378c9397f0976ad1.gif)

PhpStorm 已经内置了对

[Emmet](http://emmet.io/)

缩写的支持; 只需在 HTML 文件中键入类似 CSS 的缩写，然后按 `Tab` 键将其展开为完整标记。

- Emmet Support
- [Emmet](http://emmet.io/)

### Emmet 预览

![](https://file.wulicode.com/feishu-images/781d074937a527142283ef0fed4a3c73.gif)

打开设置对话框并导航到 **Editor | Emmet | HTML**,检查 *Enable abbreviation preview(启用缩写预览)*

设置。然后 PhpStorm 将在编写 Emmet 缩写时显示生成预览的弹出窗口。

- [Emmet](http://emmet.io/)

### 重命名模型

![](https://file.wulicode.com/feishu-images/2bc5fcea623a8177e22d4edd8ae7c561.gif)

按 Ctrl+T (Windows/Linux: Ctrl+Shift+Alt+T)   调用 *Refactor This* 弹出窗口，或在菜单中选择**Refactor | Refactor This**。

或者，按 Shift+F6 直接调用光标下标识的重命名操作。

对于某些符号，如全局范围中的变量，PhpStorm 将调用重命名对话框，而不是 *in-place(实时)*

重命名符号。对于其他符号，例如类方法，PhpStorm 将在 *Find tool window* 中预览更改，以便您在应用它们之前查看将要进行的更改。