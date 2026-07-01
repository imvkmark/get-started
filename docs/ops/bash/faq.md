---
description: '在root用户下任何命令都报错bash: bpprecmdinvokecmd和bpinteractivemode: command not found。解决方法：编辑.bashrc文件，末尾添加`unset PROMPT_COMMAND`，保存后执行`source /.bashrc`即可。'
lastUpdated: '2026-07-01 20:02:24'
head:
  - - meta
    - name: 'og:title'
      content: 'Bash - FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在root用户下任何命令都报错bash: bpprecmdinvokecmd和bpinteractivemode: command not found。解决方法：编辑.bashrc文件，末尾添加`unset PROMPT_COMMAND`，保存后执行`source /.bashrc`即可。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com/ops/bash/faq.html'
---
# Bash - FAQ

## 解决 : bash: \_\_bp_precmd_invoke_cmd: command not found bash

[bash how to remove "\_\_bp_precmd_invoke_cmd" error?](https://superuser.com/questions/1007647/bash-how-to-remove-bp-precmd-invoke-cmd-error)

今天在登录上服务器之后在 root 用户下无论输入什么命令均会提示

```Plaintext
bash: __bp_precmd_invoke_cmd: command not found
bash: __bp_interactive_mode: command not found
```

解决方法:

编辑 `.bashrc` , 在行尾添加

```Bash
unset PROMPT_COMMAND
```

保存之后, 激活 `.bashrc`

```Bash
source ~/.bashrc
```

然后问题就解决了