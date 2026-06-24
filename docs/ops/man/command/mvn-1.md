---
description: 'mvn是启动Maven系统的命令，archetype:generate是一个用于从项目模板创建新项目的Maven插件目标，通过交互式方式选择原型并生成项目骨架。'
lastUpdated: '2026-06-18 08:44:03'
head:
  - - meta
    - name: 'og:title'
      content: 'mvn(1) - 启动 Maven 系统的命令'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'mvn是启动Maven系统的命令，archetype:generate是一个用于从项目模板创建新项目的Maven插件目标，通过交互式方式选择原型并生成项目骨架。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//ops/man/command/mvn-1.html'
---
# mvn(1) - 启动 Maven 系统的命令

[man mvn (1): Command to start the Maven system](https://manpages.org/mvn)

```Plaintext
mvn [options] [<goal(s)>] [<phase(s)>]
```

## 命令

### **`archetype:generate`**

::: info ℹ️
https://maven.apache.org/archetype/maven-archetype-plugin/generate-mojo.html
:::

**完整名称**

org.apache.maven.plugins:maven-archetype-plugin:3.3.0:generate

**描述**

从原型生成新项目或者更新使用部分原型的项目, 如果项目完全生成，则在与其 artifactId 对应的目录中生成。如果项目使用部分原型进行更新，则在当前目录中完成

**archetypeArtifactId**

## 选项

```Plaintext
-am, --also-make                        
    如果指定了项目列表，也会构建该列表所需的项目
    
-amd, --also-make-dependents             
    如果指定了项目列表，也会构建依赖于列表中项目的项目
    
-B, --batch-mode                         
    以非交互（批处理）模式运行（禁用输出颜色）
    
-b, --builder <arg>                      
    要使用的构建策略的ID
    
-C, --strict-checksums                   
    如果校验和不匹配，则构建失败
   
-c, --lax-checksums                      
    如果校验和不匹配，则发出警告
    
    --color <arg>                        
    定义输出的颜色模式。支持的模式有“auto”（自动）、“always”（始终）、“never”（从不）。
    
-cpu, --check-plugin-updates             
    无效，仅为向后兼容而保留
    
-D, --define <arg>                       
    定义用户属性
    
-e, --errors                             
    生成执行错误消息
    
-emp, --encrypt-master-password <arg>    
    加密主安全密码
    
-ep, --encrypt-password <arg>            
    加密服务器密码
    
-f, --file <arg>                         
    强制使用备用的POM文件（或包含pom.xml的目录）
    
-fae, --fail-at-end                      
    仅在之后使构建失败；允许所有未受影响的构建继续进行
    
-ff, --fail-fast                         
    在反应堆构建中遇到第一个失败时停止
    
-fn, --fail-never                        
    无论项目结果如何，从不使构建失败
    
-gs, --global-settings <arg>             
    全局设置文件的备用路径
    
-gt, --global-toolchains <arg>           
    全局工具链文件的备用路径
    
-h, --help                               
    显示帮助信息
    
-itr, --ignore-transitive-repositories    
    如果设置，Maven将忽略由传递依赖引入的远程仓库。
    
-l, --log-file <arg>                     
    所有构建输出将写入的日志文件（禁用输出颜色）
    
-llr, --legacy-local-repository          
    不支持：使用此选项将导致Maven调用失败。
    
-N, --non-recursive                      
    不递归到子项目中
    
-npr, --no-plugin-registry               
    无效，仅为向后兼容而保留
    
-npu, --no-plugin-updates                
    无效，仅为向后兼容而保留
   
-nsu, --no-snapshot-updates              
    抑制快照更新
    
-ntp, --no-transfer-progress             
    下载或上传时不显示传输进度
    
-o, --offline                            
    离线工作
    
-P, --activate-profiles <arg>            
    要激活的配置文件的逗号分隔列表
    
-pl, --projects <arg>                    
    要构建的指定反应堆项目的逗号分隔列表，而非所有项目。项目可以通过[groupId]:artifactId或其相对路径指定
    
-q, --quiet                              
    安静输出——仅显示错误
    
    --raw-streams                        
    忽略（Maven4选项）
    
-rf, --resume-from <arg>                 
    从指定项目恢复反应堆
    
-s, --settings <arg>                     
    用户设置文件的备用路径
    
-t, --toolchains <arg>                   
    用户工具链文件的备用路径
    
-T, --threads <arg>                      
    线程数，例如4（整数）或2C/2.5C（整数/浮点数），其中C表示核心数乘以相应数值
    
-U, --update-snapshots                   
    强制检查远程仓库中缺失的发布版本和更新的快照版本
    
-up, --update-plugins                    
    无效，仅为向后兼容而保留

-v, --version                            
    显示版本信息

-V, --show-version                       
    显示版本信息且不停止构建

-X, --debug                              
    生成执行调试输出
```