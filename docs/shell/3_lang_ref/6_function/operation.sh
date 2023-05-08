#!/usr/bin/env bash

calc() {
    PS3="choose the oper: "
    select oper in + - \* /; do                # 生成操作符选择菜单
        echo -n "enter first num: " && read x  # 读取输入参数
        echo -n "enter second num: " && read y # 读取输入参数
        exec
        case ${oper} in
        "+")
            return $((${x} + ${y}))
            ;;
        "-")
            return $((${x} - ${y}))
            ;;
        "*")
            return $((${x} * ${y}))
            ;;
        "/")
            return $((${x} / ${y}))
            ;;
        *)
            echo "${oper} is not support!"
            return 0
            ;;
        esac
        break
    done
}
calc

# $? 获取 calc 函数返回值
echo "the result is: $?"

# Output: (注: 这个是交互数据, 需要命令行运行)
# 1) +
# 2) -
# 3) *
# 4) /
# choose the oper: 1
# enter first num: 2
# enter second num: 3
# the result is: 5
