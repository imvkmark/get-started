# XML 操作 - Dom

这个DOM扩展允许你操作 XML 文档通过 PHP 5 的DOM API

## 安装

此扩展需要libxml PHP扩展

## 定义常量

## 函数

### DOMAttr — The DOMAttr class

DOMAttr类读取DOMElement对象中的属性

```
DOMAttr  extends DOMNode  {

    /* 属性 */

    public readonly string $name ;

    public readonly DOMElement $ownerElement ;

    public readonly bool $schemaTypeInfo ;

    public readonly bool $specified ;

    public string $value ;

    /* 方法 */

    public __construct ( string $name [, string $value ] )
        建立一个 DOMAttr 对象, 这个对象是只读的, 需要建立一个可读写的node, 使用 DOMDocument::createAttribute

    public bool isId ( void )
        检测属性是否是一个定义的ID

    /* 继承的方法 */

    DOMNode{}
}
```

### DOMCdataSection — The DOMCdataSection class

Dom的Cdata属性

```
DOMCdataSection  extends DOMText  {

    /* Methods */

    public __construct ( string $value )
        // 建立一个新的 CDATA node

    /* Inherited methods */

    public bool DOMText::isWhitespaceInElementContent ( void )

    public DOMText DOMText::splitText ( int $offset )
}
```

### DOMCharacterData — The DOMCharacterData class

用来操控文档数据节点,没有直接应用这个类的节点,但是其他节点继承了这个类

```
DOMCharacterData  extends DOMNode  {

    /* 属性 */
    public string $data ;

    readonly public int $length ;

    /* 方法 */

    void appendData ( string $data )
        添加数据放到节点的后边

    void deleteData ( int $offset , int $count )
        从节点中删除数据

    void insertData ( int $offset , string $data )
        删除数据

    void replaceData ( int $offset , int $count , string $data )
        替换数据

    string substringData ( int $offset , int $count )
        截取数据

    /* 继承的方法 */
    DOMNode{}

}
```

### DOMComment — The DOMComment class

```
DOMComment  extends DOMCharacterData  {

    /* 方法 */

    public __construct ([ string $value ] )
        建立注释类

}
```

### DOMDocument — The DOMDocument class

```
DOMDocument  extends DOMNode  {

    /* 属性 */

    readonly public string $actualEncoding ;

    readonly public DOMConfiguration $config ;

    readonly public DOMDocumentType $doctype ;

    readonly public DOMElement $documentElement ;

    public string $documentURI ;

    public string $encoding ;

    public bool $formatOutput ;

    readonly public DOMImplementation $implementation ;

    public bool $preserveWhiteSpace  = true ;

    public bool $recover ;

    public bool $resolveExternals ;

    public bool $standalone ;

    public bool $strictErrorChecking  = true ;

    public bool $substituteEntities ;

    public bool $validateOnParse  = false ;

    public string $version ;

    readonly public string $xmlEncoding ;

    public bool $xmlStandalone ;

    public string $xmlVersion ;

    /* 方法 */

    public __construct ([ string $version [, string $encoding ]] )
        建立一个新的DomDocument对象

    public DOMAttr createAttribute ( string $name )
        建立一个新属性

    public DOMAttr createAttributeNS ( string $namespaceURI , string $qualifiedName )
        建立一个具有命名空间的属性

    public DOMCDATASection createCDATASection ( string $data )
        建立CDATA 部分

    public DOMComment createComment ( string $data )
        建立注释

    public DOMDocumentFragment createDocumentFragment ( void )
        建立文档碎片

    public DOMElement createElement ( string $name [, string $value ] )
        建立元素

    public DOMElement createElementNS ( string $namespaceURI , string $qualifiedName [, string $value ] )
        建立命名空间的元素

    public DOMEntityReference createEntityReference ( string $name )
        创建实体引用

    public DOMProcessingInstruction createProcessingInstruction ( string $target [, string $data ] )
        创建PI

    public DOMText createTextNode ( string $content )
        建立text节点

    public DOMElement getElementById ( string $elementId )
        通过ID获取节点

    public DOMNodeList getElementsByTagName ( string $name )
        通过名称获取节点列表

    public DOMNodeList getElementsByTagNameNS ( string $namespaceURI , string $localName )
        通过名称和命名空间获取列表

    public DOMNode importNode ( DOMNode $importedNode [, bool $deep ] )
        导入节点到当前文档

    public mixed load ( string $filename [, int $options = 0 ] )
        从文件加载XML文档
        [Attention] 使用斜线(/)的Unix风格的路径可能会导致windows平台的错误,如果这样,调用realpath()函数来注意这个事情

    public bool loadHTML ( string $source [, int $options = 0 ] )
        加载HTML字串

    public bool loadHTMLFile ( string $filename [, int $options = 0 ] )
        加载HTML文件
        [Attention] 使用斜线(/)的Unix风格的路径可能会导致windows平台的错误,如果这样,调用realpath()函数来注意这个事情

    public mixed loadXML ( string $source [, int $options = 0 ] )
        加载XML字串

    public void normalizeDocument ( void )
        标准化文档

    public bool registerNodeClass ( string $baseclass , string $extendedclass )
        注册扩展类, 使用基本的节点类型

    public bool relaxNGValidate ( string $filename )
        运行 relaxNG 验证

    public bool relaxNGValidateSource ( string $source )
        relaxNG 验证字串

    public int save ( string $filename [, int $options ] )
        保存为文件

    public string saveHTML ([ DOMNode $node = NULL ] )
        保存为html字串

    public int saveHTMLFile ( string $filename )
        保存到HTML文件

    public string saveXML ([ DOMNode $node [, int $options ]] )
        返回xml字串

    public bool schemaValidate ( string $filename )
        语法验证文件

    public bool schemaValidateSource ( string $source )

        语法验证字串

    public bool validate ( void )
        验证

    public int xinclude ([ int $options ] )
        XIncludes

    /* 继承的方法 */

    DOMNode{}
}
```

### DOMDocumentFragment — The DOMDocumentFragment class

```
DOMDocumentFragment  extends DOMNode  {

    /* 方法 */

    public bool appendXML ( string $data )
        添加原始xml数据

    /* 继承的方法 */
    DOMNode
}
```

### DOMDocumentType — The DOMDocumentType class

```
DOMDocumentType  extends DOMNode  {

    /* 属性 */

    readonly public string $publicId ;

    readonly public string $systemId ;

    readonly public string $name ;

    readonly public DOMNamedNodeMap $entities ;

    readonly public DOMNamedNodeMap $notations ;

    readonly public string $internalSubset ;

    /* 继承的方法 */
    DOMNode

}
```

### DOMElement — The DOMElement class

```
DOMElement  extends DOMNode  {

    /* 属性 */

    readonly public bool $schemaTypeInfo ;

    readonly public string $tagName ;

    /* 方法 */

    public __construct ( string $name [, string $value [, string $namespaceURI ]] )
        创建 新的 DOMElement 对象

    public string getAttribute ( string $name )
        获取属性值

    public DOMAttr getAttributeNode ( string $name )
        获取属性节点

    public DOMAttr getAttributeNodeNS ( string $namespaceURI , string $localName )
        返回具有命名空间的属性节点

    public string getAttributeNS ( string $namespaceURI , string $localName )
        返回具有命名空间的属性

    public DOMNodeList getElementsByTagName ( string $name )
        通过标签名获取dom节点

    public DOMNodeList getElementsByTagNameNS ( string $namespaceURI , string $localName )
        通过标签名获取标签节点

    public bool hasAttribute ( string $name )
        检测是否存在某属性

    public bool hasAttributeNS ( string $namespaceURI , string $localName )
        是否具有命名空间的某属性

    public bool removeAttribute ( string $name )
        移除属性

    public bool removeAttributeNode ( DOMAttr $oldnode )
        移除属性节点

    public bool removeAttributeNS ( string $namespaceURI , string $localName )
        移除具有命名空间的属性

    public DOMAttr setAttribute ( string $name , string $value )
        设置属性

    public DOMAttr setAttributeNode ( DOMAttr $attr )
        设置属性节点

    public DOMAttr setAttributeNodeNS ( DOMAttr $attr )
        设置具有命名空间的属性

    public void setAttributeNS ( string $namespaceURI , string $qualifiedName , string $value )

    public void setIdAttribute ( string $name , bool $isId )

    public void setIdAttributeNode ( DOMAttr $attr , bool $isId )

    public void setIdAttributeNS ( string $namespaceURI , string $localName , bool $isId )

    /* 继承的方法 */

    DOMNode

}
```

### DOMEntity — The DOMEntity class

```
DOMEntity  extends DOMNode  {

    /* 属性 */

    readonly public string $publicId ;

    readonly public string $systemId ;

    readonly public string $notationName ;

    public string $actualEncoding ;

    readonly public string $encoding ;

    readonly public string $version ;

    /* 继承的方法 */
    DOMNode
}
```

### DOMEntityReference — The DOMEntityReference class

```
DOMEntityReference  extends DOMNode  {

    /* 属性 */

    /* 方法 */

    public __construct ( string $name )

    /* 继承的方法 */

    DOMNode
}
```

### DOMException — The DOMException class

```
DOMException  extends Exception  {

    /* 属性 */

    readonly public int $code ;

    /* 继承的方法 */

    Exception{}

}
```

### DOMImplementation — The DOMImplementation class

```
DOMImplementation  {

    /* 属性 */

    /* 方法 */

    __construct ( void )

    public DOMDocument createDocument ([ string $namespaceURI = NULL [, string $qualifiedName = NULL [, DOMDocumentType $doctype = NULL ]]] )
        建立一个DOMDocument对象

    public DOMDocumentType createDocumentType ([ string $qualifiedName = NULL [, string $publicId = NULL [, string $systemId = NULL ]]] )
         建立文档类型

    public bool hasFeature ( string $feature , string $version )
         检测是否有特性
}
```

### DOMNamedNodeMap — The DOMNamedNodeMap class

```
DOMNamedNodeMap  implements Traversable  {

    /* 属性 */

    readonly public int $length ;

    /* 方法 */

    DOMNode getNamedItem ( string $name )
        根据名称获取node

    DOMNode getNamedItemNS ( string $namespaceURI , string $localName )
        根据名称获取node节点

    DOMNode item ( int $index )
        根据索引获取条目
}
```

### DOMNode — The DOMNode class

```
DOMNode  {

    /* 属性 */

    public readonly string $nodeName ;

    public string $nodeValue ;

    public readonly int $nodeType ;

    public readonly DOMNode $parentNode ;

    public readonly DOMNodeList $childNodes ;

    public readonly DOMNode $firstChild ;

    public readonly DOMNode $lastChild ;

    public readonly DOMNode $previousSibling ;

    public readonly DOMNode $nextSibling ;

    public readonly DOMNamedNodeMap $attributes ;

    public readonly DOMDocument $ownerDocument ;

    public readonly string $namespaceURI ;

    public string $prefix ;

    public readonly string $localName ;

    public readonly string $baseURI ;

    public readonly string $textContent ;

    /* 方法 */

    public DOMNode appendChild ( DOMNode $newnode )
        附加子元素

    public string C14N ([ bool $exclusive [, bool $with_comments [, array $xpath [, array $ns_prefixes ]]]] )
        规范化节点->字串

    public int C14NFile ( string $uri [, bool $exclusive [, bool $with_comments [, array $xpath [, array $ns_prefixes ]]]] )
        规范化节点->文件

    public DOMNode cloneNode ([ bool $deep ] )
        克隆节点

    public int getLineNo ( void )
        获取行号

    public string getNodePath ( void )
        获取节点路径

    public bool hasAttributes ( void )
        是否存在属性

    public bool hasChildNodes ( void )
        是否存在子节点

    public DOMNode insertBefore ( DOMNode $newnode [, DOMNode $refnode ] )
        之前插入

    public bool isDefaultNamespace ( string $namespaceURI )
        是否是默认的命名空间

    public bool isSameNode ( DOMNode $node )
        是否是相同的节点

    public bool isSupported ( string $feature , string $version )
         是否支持某个特性

    public string lookupNamespaceURI ( string $prefix )
         查看命名空间

    public string lookupPrefix ( string $namespaceURI )
         查看命名空间的前缀

    public void normalize ( void )
         规范化

    public DOMNode removeChild ( DOMNode $oldnode )
         移除节点

    public DOMNode replaceChild ( DOMNode $newnode , DOMNode $oldnode )
         替换节点
}
```

### DOMNodeList — The DOMNodeList class

```
DOMNodeList  implements Traversable  {

    /* 属性 */

    readonly public int $length ;

    /* 方法 */

    DOMNode DOMNodelist::item ( int $index )
        获取节点
}
```

### DOMNotation — The DOMNotation class

```
DOMNotation  extends DOMNode  {

    /* 属性 */

    readonly public string $publicId ;

    readonly public string $systemId ;

    /* 继承的方法 */

    DOMNode{}
}
```

### DOMProcessingInstruction — The DOMProcessingInstruction class

```
DOMProcessingInstruction  extends DOMNode  {

    /* 属性 */

    readonly public string $target ;

    public string $data ;

    /* 方法 */

    public __construct ( string $name [, string $value ] )

    /* 继承的方法 */

    DOMNode
}
```

### DOMText — The DOMText class

```
DOMText  extends DOMCharacterData  {

    /* 属性 */

    readonly public string $wholeText ;

    /* 方法 */

    public __construct ([ string $value ] )

    public bool isWhitespaceInElementContent ( void )
        是否包含空白

    public DOMText splitText ( int $offset )
        在指定的位置将这个节点一分为二

    /* 继承的方法 */

    DOMNode{}
}
```

### DOMXPath — The DOMXPath class

```
DOMXPath  {

    /* 属性 */

    public DOMDocument $document ;

    /* 方法 */

    public __construct ( DOMDocument $doc )
       建立一个DOMXPath 对象

    public mixed evaluate ( string $expression [, DOMNode $contextnode [, bool $registerNodeNS = true ]] )
         执行给定的XPath表达式并且返回结果

    public DOMNodeList query ( string $expression [, DOMNode $contextnode [, bool $registerNodeNS = true ]] )
        查询 DOMNode列表

    public bool registerNamespace ( string $prefix , string $namespaceURI )
        注册命名空间

    public void registerPhpFunctions ([ mixed $restrict ] )
        注册PHP函数作为Xpath函数
}
```

### DOM 函数

`DOMElement dom_import_simplexml ( SimpleXMLElement $node )`

从 SimpleXMLElement中转换为 DOMElement 对象