---
title: "使用 VS 编译简单的C程序 - Using Microsoft Visual Studio for Simple C Programs"
date: 2022-04-20 22:09:02
toc: true
categories:
- ["Lang","C"]
---

To edit your C program:

编辑C语言程序

1. From the main menu select File -> New -> Project

新建项目
2. In the New Project window:

Under Project types, select Win32 - Win32 Console Application

Name your project, and specify a location for your project directory

Click 'OK', then 'next'

选择win32程序
3. In the Application Wizard:

Select Console application

Select Empty project

Deselect Precompiled header

选择编译项目,取消预编译头部
4. Once the project has been created, in the window on the left hand side you should see three folders:

Header Files

Resource Files

Source Files

目录文件
5. Right-click on Source Files and Select Add-> New Item

Select Code, and give the file a name

The default here will be a file with a _.cpp extension (for a C++ file). After creating the file, save it as a _.c file.

建立C文件

To compile and run:

编译和运行C语言程序

1. Press the green play button.

点击绿色按钮来运行
2. By default, you will be running in debug mode and it will run your code and bring up the command window.

默认的是在debug模式来运行,并且在命令行窗口来运行

To prevent the command window from closing as soon as the program finishes execution, add the following line to the end of your main function:

getchar();

为了避免窗口在结束之后立即关闭,添加getchar();函数到main函数的底部

This library function waits for any input key, and will therefore keep your console window open until a key is pressed.

这个函数等待输入文件,并且保持window的打开状态,直到你按了一个键盘键

