---
title: "php-excel-reader - 简单的excel 读取类"
date: 2022-04-20 19:01:11
toc: true
categories:
- ["Php","扩展"]
---

## 基本资料
项目地址: [GitHub](https://github.com/amade/php-excel-reader)<br />原文地址: [http://code.google.com/p/php-excel-reader/downloads/list](http://code.google.com/p/php-excel-reader/downloads/list)


## 建立读取类
```
$data = new Spreadsheet_Excel_Reader("test.xls");
```
为了节省大工作表的内存开销,像其中的字体,颜色等等额外信息将不被获取
```
$data = new Spreadsheet_Excel_Reader("test.xls",false);
```
如果想使用其他编码则直接传递第三个参数
```
$data = new Spreadsheet_Excel_Reader("test.xls",true,"UTF-16");
```

## 输出工作表文本
简单的方法在浏览器中输出一个工作表就是使用下边的方法,这个方法将生成一个使用内嵌css样式的表格来格式化可用的表格.
```
$data->dump($row_numbers=false,$col_letters=false,$sheet=0,$table_class='excel')
```

## 访问表格值
这是个推荐的函数来访问数据,比依靠数据格式来访问要可靠的多<br />取出某个固定工作表中的单元格中格式化的值
```
$data->val($row,$col)
```
你也可是使用列名称来代替数值,这样往往好一些
```
$data->val(10,'AZ')
```
访问不同工作表中的数据.
```
$data->val($row,$col,$sheet_index)
```

## 工作表信息
获取工作表中的列数和行数
```
$data->rowcount($sheet_index=0)
$data->colcount($sheet_index=0)
```

## 单元格信息
获取数据的类型:数值|日期|未知
```
$data->type($row,$col,$sheet=0)
```
单元格中存储的原生信息.例如一个单元格中根据格式显示的是123.5,但是实际存储的是123.456,原生访问的是原始值.
```
$data->raw($row,$col,$sheet=0)
```
如果单元格中存在超链接.可以取回链接
```
$data->hyperlink($row,$col,$sheet=0)
```
获取行域和列域
```
$data->rowspan($row,$col,$sheet=0)
$data->colspan($row,$col,$sheet=0)
```

## 格式化详情
style方法取回可用的格式化信息,并且返回一个包含所有属性的css字串
```
$data->style($row,$col,$sheet=0)
```
格式化的字串
```
$data->format($row,$col,$sheet=0)
```
单元格的位置
```
$data->align($row,$col,$sheet=0)
```
背景色
```
$data->bgColor($row,$col,$sheet=0)
```
表格边框类型的可能值

- Thin
- Medium
- Dashed
- Dotted
- Thick
- Double
- Hair
- Medium dashed
- Thin dash-dotted
- Medium dash-dotted
- Thin dash-dot-dotted
- Medium dash-dot-dotted
- Slanted medium dash-dotted
```
$data->borderLeft($row,$col,$sheet=0)
$data->borderRight($row,$col,$sheet=0)
$data->borderTop($row,$col,$sheet=0)
$data->borderBottom($row,$col,$sheet=0)
```
获取边框的颜色
```
$data->borderLeftColor($row,$col,$sheet=0)
$data->borderRightColor($row,$col,$sheet=0)
$data->borderTopColor($row,$col,$sheet=0)
$data->borderBottomColor($row,$col,$sheet=0)
```
字体颜色,这个可能是被格式化的或者是单元格的属性
```
$data->color($row,$col,$sheet=0)
```
其他字体属性
```
$data->bold($row,$col,$sheet=0) // Boolean
$data->italic($row,$col,$sheet=0) // Boolean
$data->underline($row,$col,$sheet=0) // Boolean
$data->height($row,$col,$sheet=0) // Number in pixels
$data->font($row,$col,$sheet=0) // Font name
```

