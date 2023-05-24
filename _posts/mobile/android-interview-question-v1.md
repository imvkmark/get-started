---
title: "Android 面试题 v1.0"
date: 2022-08-06 17:30:27
toc: true
categories:
- ["手机端","Android"]
---

<a name="06a2cd83-0803-4251-bb44-ee23c569cde5"></a>



## Android 问题
<a name="0d4aa76a-10d0-4379-8a41-b456bf261d39"></a>
### 1. activity启动模式
1、standard：标准模式：如果在mainfest中不设置就默认standard；standard就是新建一个Activity就在栈中新建一个activity实例； 2、singleTop：栈顶复用模式：与standard相比栈顶复用可以有效减少activity重复创建对资源的消耗，但是这要根据具体情况而定，不能一概而论； 3、singleTask：栈内单例模式，栈内只有一个activity实例，栈内已存activity实例，在其他activity中start这个activity，Android直接把这个实例上面其他activity实例踢出栈GC掉； 4、singleInstance :堆内单例：整个手机操作系统里面只有一个实例存在就是内存单例；
<a name="447f0bbf-0e00-40f5-9341-7fd62de7b51d"></a>
### 2. 生命周期
App正在运行中。突然来电话。生命周期如何变化**onPause-onStop**电话挂断后，如何变化**onRestart-onStart-onResume**
<a name="c7db7a27-ceb3-475c-a314-19bfa7b04a8f"></a>
### 3. 自定义View
**View的绘制流程：OnMeasure()——>OnLayout()——>OnDraw()**第一步：OnMeasure()：测量视图大小。从顶层父View到子View递归调用measure方法，measure方法又回调OnMeasure。 第二步：OnLayout()：确定View位置，进行页面布局。从顶层父View向子View的递归调用view.layout方法的过程，即父View根据上一步measure子View所得到的布局大小和布局参数，将子View放在合适的位置上。 第三步：OnDraw()：绘制视图。ViewRoot创建一个Canvas对象，然后调用OnDraw()。六个步骤：①、绘制视图的背景；②、保存画布的图层（Layer）；③、绘制View的内容；④、绘制View子视图，如果没有就不用； ⑤、还原图层（Layer）；⑥、绘制滚动条。
<a name="f019a780-2c3e-4fa4-9820-8e6093c8e117"></a>
### 4. SQlite
基本使用一个类，两个方法 数据库增加字段
<a name="340b40c6-e593-4b9a-abb2-554458859105"></a>
### 5. Handler
Android中主线程是不能进行耗时操作的，子线程是不能进行更新UI的。所以就有了handler，它的作用就是实现线程之间的通信。 handler整个流程中，主要有四个对象，handler，Message,MessageQueue,Looper。当应用创建的时候，就会在主线程中创建handler对象， 我们通过要传送的消息保存到Message中，handler通过调用sendMessage方法将Message发送到MessageQueue中，Looper对象就会不断的调用loop()方法 不断的从MessageQueue中取出Message交给handler进行处理。从而实现线程之间的通信。
<a name="bb9dcc03-d02a-4562-b8fd-658fabc5c9cb"></a>
### 6. Service
<a name="4d34db41-0951-43c1-b32e-acf2c67a8e7e"></a>
### 一：启动方式及生命周期：
service 启动方式有两种，一种是通过startService()方式进行启动，另一种是通过bindService()方式进行启动。不同的启动方式他们的生命周期是不一样. 1、通过startService()这种方式启动的service，生命周期是这样：调用startService() --> onCreate()--> onStartConmon()--> onDestroy()。 2、通过bindService()方式进行绑定，这种方式绑定service，生命周期走法：bindService-->onCreate()-->onBind()-->unBind()-->onDestroy() **
<a name="77fa548d-c5a8-4492-b1af-bc2167779a96"></a>
### 二：IntentService

- IntentService是Service的子类，是一个异步的，会自动停止的服务，很好解决了传统的Service中处理完耗时操作忘记停止并销毁Service的问题
- 生成一个默认的且与线程相互独立的工作线程执行所有发送到onStartCommand()方法的Intent,可以在onHandleIntent()中处理.
- 串行队列,每次只运行一个任务,不存在线程安全问题,所有任务执行完后自动停止服务,不需要自己手动调用stopSelf()来停止.
<a name="a2c800a5-1537-481e-a3ab-6f75d2678612"></a>
### 7. 内存

- * **一：内存溢出（OOM）和内存泄露（对象无法被回收）的区别。 ****内**存溢出 out of memory：是指程序在申请内存时，没有足够的内存空间供其使用，出现out of memory；比如申请了一个integer,但给它存了long才能存下的数，那就是内存溢出。内存溢出通俗的讲就是内存不够用。 内存泄露 memory leak：是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但内存泄露堆积后果很严重，无论多少内存,迟早会被占光**二：内存泄露原因：**一、Handler 引起的内存泄漏。 解决：将Handler声明为静态内部类，就不会持有外部类SecondActivity的引用，其生命周期就和外部类无关， 如果Handler里面需要context的话，可以通过弱引用方式引用外部类 二、单例模式引起的内存泄漏。 解决：Context是ApplicationContext，由于ApplicationContext的生命周期是和app一致的，不会导致内存泄漏 三、非静态内部类创建静态实例引起的内存泄漏。 解决：把内部类修改为静态的就可以避免内存泄漏了 四、非静态匿名内部类引起的内存泄漏。 解决：将匿名内部类设置为静态的。 五、注册/反注册未成对使用引起的内存泄漏。 注册广播接受器、EventBus等，记得解绑。 六、资源对象没有关闭引起的内存泄漏。 在这些资源不使用的时候，记得调用相应的类似close（）、destroy（）、recycler（）、release（）等方法释放。 七、集合对象没有及时清理引起的内存泄漏。 通常会把一些对象装入到集合中，当不使用的时候一定要记得及时清理集合，让相关对象不再被引用。
<a name="7072f833-1764-4eab-8adf-43ac1ce385c9"></a>
### 8. 适配
1.你都有哪些适配方法

1. 7.0、8.0手机都有哪些适配
<a name="1f19ee02-b2cf-41ab-bca0-a86a9ae82738"></a>
### 9. ANR
ANR全名Application Not Responding, 也就是"应用无响应". 当操作在一段时间内系统无法处理时, 系统层面会弹出上图那样的ANR对话框. 产生原因： (1)5s内无法响应用户输入事件(例如键盘输入, 触摸屏幕等). (2)BroadcastReceiver在10s内无法结束 (3)Service 20s内无法结束（低概率） 解决方式： (1)不要在主线程中做耗时的操作，而应放在子线程中来实现。如onCreate()和onResume()里尽可能少的去做创建操作。 (2)应用程序应该避免在BroadcastReceiver里做耗时的操作或计算。 (3)避免在Intent Receiver里启动一个Activity，因为它会创建一个新的画面，并从当前用户正在运行的程序上抢夺焦点。 (4)service是运行在主线程的，所以在service中做耗时操作，必须要放在子线程中。
<a name="164cf9f8-ec91-4731-a562-5f9234e985e6"></a>
### 10. 开发过程中遇到的问题
1、你在开发中所遇到的异常有哪些？从频率由高到低列举五个 个人认为：

NullPointerException  空指针（一定是第一个）

ArrayIndexOutOfBoundsException 数组越界

IllegalArgumentException  方法的参数错误

ClassNotFoundException

ActivityNotFoundException

ClassCastException

NumberFormatException 等遇到异常你一般的解决思路是什么？

你所解决额比较棘手的问题有哪些？
<a name="93f52143-ad6b-4949-b4d8-cede047e5759"></a>
### 11. 第三方问题

1. 支付
2. 即时通讯
3. 第三方登录流程
<a name="eb13591a-db65-49d1-95ff-b49dd1807d44"></a>
## JAVA
<a name="9c01c8b8-4e42-4a05-92d5-45034bfcdf94"></a>
### 一、线程中sleep和wait的区别
(1)这两个方法来自不同的类，sleep是来自Thread，wait是来自Object； (2)sleep方法没有释放锁，而wait方法释放了锁。 (3)wait,notify,notifyAll只能在同步控制方法或者同步控制块里面使用，而sleep可以在任何地方使用。
<a name="df243dd4-7ecf-4fa5-b89d-4806eea5efd3"></a>
### 二、Thread中的start()和run()方法有什么区别
start()方法是用来启动新创建的线程，而start()内部调用了run()方法，这和直接调用run()方法是不一样的，如果直接调用run()方法，则和普通的方法没有什么区别。
<a name="2cd14d7c-7b4b-4dd5-948d-80af7eb5576c"></a>
### 三、关键字final和static是怎么使用的。
final: 1、final变量即为常量，只能赋值一次。 2、final方法不能被子类重写。 3、final类不能被继承。 static： （1）、static变量：对于静态变量在内存中只有一个拷贝（节省内存），JVM只为静态分配一次内存， 在加载类的过程中完成静态变量的内存分配，可用类名直接访问（方便），当然也可以通过对象来访问（但是这是不推荐的）。 （2）、static代码块 static代码块是类加载时，初始化自动执行的。 （3）、static方法 static方法可以直接通过类名调用，任何的实例也都可以调用，因此static方法中不能用this和super关键字， 不能直接访问所属类的实例变量和实例方法(就是不带static的成员变量和成员成员方法)，只能访问所属类的静态成员变量和成员方法。
<a name="06ccf69a-2d24-4016-a4da-db660a250a20"></a>
### 四、Java中重载和重写的区别：
1、重载：一个类中可以有多个相同方法名的，但是参数类型和个数都不一样。这是重载。

2、重写：子类继承父类，则子类可以通过实现父类中的方法，从而新的方法把父类旧的方法覆盖。
<a name="9f5c6587-bf6d-4f70-82fd-15d365a49236"></a>
### 五、 线程池了解么？有几种？应用场景？
Executors类提供了一系列工厂方法用来创建线程池。这些线程是适用于不同的场景。

- newCachedThreadPool()：无界可自动回收线程池，查看线程池中有没有以前建立的线程，如果有则复用，如果没有则建立一个新的线程加入池中，池中的线程超过60s不活动则自动终止。适用于生命 周期比较短的异步任务。
- newFixedThreadPool(int nThreads)：固定大小线程池，与newCachedThreadPool()类似，但是池中持有固定数目的线程，不能随时创建线程，如果创建新线程时，超过了固定 线程数，则放在队列里等待，直到池中的某个线程被移除时，才加入池中。适用于很稳定、很正规的并发线程，多用于服务器。
- newScheduledThreadPool(int corePoolSize)：周期任务线程池，该线程池的线程可以按照delay依次执行线程，也可以周期执行。
- newSingleThreadExecutor()：单例线程池，任意时间内池中只有一个线程。

