# 国际化与字符编码支持 - Enchant

这是一个PHP绑定的库, 提供了一个统一的拼写库 enchant拼写函数库是和PHP绑定的Enchant库,Enchant是个顶级的拼写库,但是对中文没有任何用处 本函数中有两种资源,一种理解成代理(broker)另一种是字典库(dictionary)

## 安装

[Attention] 在加载本库的同时需要加载glib库 [5.3]本版中默认绑定了本库,低于5.3的版本需要自己编译二进制的库

## 配置

## 定义常量

## 函数

`array enchant_broker_describe ( resource $broker )`

枚举Enchant提供者的名称和基本信息,同样的信息也在phpinfo函数中出现

`bool enchant_broker_dict_exists ( resource $broker , string $tag )`

使用一个非空标签来检测一个字典是否存在

`bool enchant_broker_free_dict ( resource $dict )`

释放词典资源操控者和字库

`bool enchant_broker_free ( resource $broker )`

释放字库

`string enchant_broker_get_error ( resource $broker )`

返回词典代理的最后一次错误

`resource enchant_broker_init ( void )`

创建一个具有访问能力的新的词典控制

`mixed enchant_broker_list_dicts ( resource $broker )`

返回一系列的可用的词典

`resource enchant_broker_request_dict ( resource $broker , string $tag )`

使用一个标签和词库控制来建立一个新的词库资源

`resource enchant_broker_request_pwl_dict ( resource $broker , string $filename )`

通过pwl文件来建立一个词库

`bool enchant_broker_set_ordering ( resource $broker , string $tag , string $ordering )`

声明语言的偏好词典

`void enchant_dict_add_to_personal ( resource $dict , string $word )`

添加一个词到个人词典

`void enchant_dict_add_to_session ( resource $dict , string $word )`

添加一个词到指定的词典,他将添加到活动的字符检测session

`bool enchant_dict_check ( resource $dict , string $word )`

检测一个词拼写是否正确

`mixed enchant_dict_describe ( resource $dict )`

返回一个词典的详细信息

`string enchant_dict_get_error ( resource $dict )`

返回session拼写的最后一个错误

`bool enchant_dict_is_in_session ( resource $dict , string $word )`

检测词语是否在session拼写中

`bool enchant_dict_quick_check ( resource $dict , string $word [, array &$suggestions ] )`

检测单次是否被正确拼写然后提供相关的建议

`void enchant_dict_store_replacement ( resource $dict , string $mis , string $cor )`

添加一个词的校正,添加的校正的词可能会出现在建议列表的前端

`array enchant_dict_suggest ( resource $dict , string $word )`

根据词典和单词来提供建议